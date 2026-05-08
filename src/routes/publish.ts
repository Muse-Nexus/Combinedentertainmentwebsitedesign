import { Router, type Request } from "express";
import type {
  ProviderId,
  PublishRequest,
  SocialPlatform,
  SocialPublisherAdapter,
} from "../adapters/types.js";
import type {
  ConnectionsStore,
  PublicConnection,
} from "../lib/connections-store.js";
import type { RuntimeStore } from "../lib/runtime-store.js";
import type { ProviderRegistry } from "../providers/types.js";

const supportedPlatforms = new Set<SocialPlatform>([
  "instagram",
  "facebook",
  "tiktok",
  "youtube",
  "linkedin",
  "twitter",
  "threads",
  "pinterest",
  "bluesky",
]);

export type PublishRouterOptions = {
  adapter: SocialPublisherAdapter;
  runtimeStore: RuntimeStore;
  connectionsStore?: ConnectionsStore;
  providerRegistry?: ProviderRegistry;
};

export function createPublishRouter(options: PublishRouterOptions): Router {
  const router = Router();

  router.post("/v1/publish", async (request, response, next) => {
    const parsed = parsePublishRequest(request.body);

    if (!parsed.ok) {
      response.status(400).json({
        ok: false,
        error: {
          code: "invalid_request",
          message: parsed.message,
        },
      });
      return;
    }

    const resolvedConnection = await resolvePublishConnection(
      request,
      parsed.value,
      options.connectionsStore,
    );

    if (resolvedConnection.kind === "missing") {
      response.status(404).json({
        ok: false,
        error: {
          code: "connection_not_found",
          message: `No active connection found for accountId "${parsed.value.accountId}".`,
        },
      });
      return;
    }

    const publishRequest =
      resolvedConnection.kind === "found"
        ? {
            ...parsed.value,
            accountId: resolvedConnection.connection.id,
            connectionId: resolvedConnection.connection.id,
            provider: resolvedConnection.connection.provider,
          }
        : parsed.value;

    const job = await options.runtimeStore.createPendingPublish(publishRequest);

    try {
      const provider =
        publishRequest.provider && options.providerRegistry
          ? options.providerRegistry.get(publishRequest.provider)
          : undefined;
      const result = provider
        ? await provider.publishPost(publishRequest)
        : await options.adapter.publishPost(publishRequest);

      try {
        await options.runtimeStore.markPublishSucceeded(job.id, result);
      } catch (error) {
        console.error("Failed to persist successful publish job", error);
      }

      response.status(202).json({
        ...result,
        jobId: job.id,
      });
    } catch (error) {
      await options.runtimeStore.markPublishFailed(
        job.id,
        error instanceof Error ? error : new Error("Unexpected publish error"),
      );
      next(error);
    }
  });

  return router;
}

type ResolveConnectionResult =
  | { kind: "found"; connection: PublicConnection }
  | { kind: "missing" }
  | { kind: "not_configured" };

async function resolvePublishConnection(
  request: Request,
  publishRequest: PublishRequest,
  connectionsStore: ConnectionsStore | undefined,
): Promise<ResolveConnectionResult> {
  if (!connectionsStore) return { kind: "not_configured" };

  const apiKeyId = apiKeyIdFromRequest(request);
  const lookupId = publishRequest.connectionId ?? publishRequest.accountId;
  const connections = await connectionsStore.list(apiKeyId);
  const connection = connections.find((candidate) => candidate.id === lookupId);

  if (!connection) {
    return publishRequest.platform === "bluesky" || publishRequest.connectionId
      ? { kind: "missing" }
      : { kind: "not_configured" };
  }

  if (
    connection.provider !== publishRequest.platform &&
    publishRequest.platform === "bluesky"
  ) {
    return { kind: "missing" };
  }

  return { kind: "found", connection };
}

function apiKeyIdFromRequest(request: Request): string {
  const headerKey = request.headers["x-api-key"];
  const authHeader = request.headers["authorization"] ?? "";
  const bearer =
    typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : "";
  const key = Array.isArray(headerKey) ? headerKey[0] : headerKey;
  return key || bearer || "unknown";
}

type ParseResult =
  | { ok: true; value: PublishRequest }
  | { ok: false; message: string };

function parsePublishRequest(body: unknown): ParseResult {
  if (!isRecord(body)) {
    return { ok: false, message: "Request body must be a JSON object." };
  }

  if (typeof body.accountId !== "string" || body.accountId.trim() === "") {
    return { ok: false, message: "accountId is required." };
  }

  if (
    typeof body.platform !== "string" ||
    !supportedPlatforms.has(body.platform as SocialPlatform)
  ) {
    return { ok: false, message: "platform is unsupported or missing." };
  }

  if (typeof body.text !== "string" || body.text.trim() === "") {
    return { ok: false, message: "text is required." };
  }

  if (
    body.mediaUrls !== undefined &&
    (!Array.isArray(body.mediaUrls) ||
      body.mediaUrls.some((url) => typeof url !== "string"))
  ) {
    return { ok: false, message: "mediaUrls must be an array of strings." };
  }

  if (
    body.scheduledAt !== null &&
    body.scheduledAt !== undefined &&
    typeof body.scheduledAt !== "string"
  ) {
    return {
      ok: false,
      message: "scheduledAt must be a string, null, or omitted.",
    };
  }

  if (body.pageId !== undefined && typeof body.pageId !== "string") {
    return { ok: false, message: "pageId must be a string when provided." };
  }

  if (body.provider !== undefined && typeof body.provider !== "string") {
    return { ok: false, message: "provider must be a string when provided." };
  }

  if (body.connectionId !== undefined && typeof body.connectionId !== "string") {
    return { ok: false, message: "connectionId must be a string when provided." };
  }

  const value: PublishRequest = {
    accountId: body.accountId,
    platform: body.platform as SocialPlatform,
    text: body.text,
    mediaUrls: body.mediaUrls,
    scheduledAt: body.scheduledAt ?? null,
  };

  if (body.pageId) value.pageId = body.pageId;
  if (body.provider) value.provider = body.provider as ProviderId;
  if (body.connectionId) value.connectionId = body.connectionId;

  return { ok: true, value };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
