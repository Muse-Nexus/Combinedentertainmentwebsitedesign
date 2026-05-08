import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import type { PublishRequest } from "../src/adapters/types.js";
import { createTestAdapter } from "./helpers.js";

describe("POST /v1/publish", () => {
  it("queues a publish request", async () => {
    const app = createApp({ apiKeys: ["test-key"], adapter: createTestAdapter() });

    const response = await request(app)
      .post("/v1/publish")
      .set("x-api-key", "test-key")
      .send({
        accountId: "acct_test",
        platform: "instagram",
        text: "Post copy here",
        mediaUrls: ["https://example.com/image.jpg"],
        scheduledAt: null
      })
      .expect(202);

    expect(response.body).toMatchObject({
      ok: true,
      provider: "blotato",
      providerPostId: "test_acct_test",
      status: "queued"
    });
    expect(response.body.jobId).toEqual(expect.stringMatching(/^job_/));
  });

  it("preserves optional provider routing fields", async () => {
    let capturedRequest: PublishRequest | undefined;
    const app = createApp({
      apiKeys: ["test-key"],
      adapter: {
        ...createTestAdapter(),
        async publishPost(publishRequest) {
          capturedRequest = publishRequest;
          return {
            ok: true,
            provider: publishRequest.provider ?? "blotato",
            providerPostId: `test_${publishRequest.accountId}`,
            status: "queued"
          };
        }
      }
    });

    await request(app)
      .post("/v1/publish")
      .set("x-api-key", "test-key")
      .send({
        accountId: "acct_test",
        platform: "facebook",
        text: "Post copy here",
        pageId: "page_123",
        provider: "meta",
        connectionId: "conn_123"
      })
      .expect(202);

    expect(capturedRequest).toMatchObject({
      accountId: "acct_test",
      platform: "facebook",
      text: "Post copy here",
      pageId: "page_123",
      provider: "meta",
      connectionId: "conn_123",
      scheduledAt: null
    });
  });

  it("allows mediaUrls to be omitted", async () => {
    const app = createApp({ apiKeys: ["test-key"], adapter: createTestAdapter() });

    const response = await request(app)
      .post("/v1/publish")
      .set("x-api-key", "test-key")
      .send({
        accountId: "acct_test",
        platform: "instagram",
        text: "Post copy here"
      })
      .expect(202);

    expect(response.body).toMatchObject({
      ok: true,
      provider: "blotato",
      providerPostId: "test_acct_test",
      status: "queued"
    });
  });

  it("still returns the provider result if success persistence fails after provider queueing", async () => {
    const app = createApp({
      apiKeys: ["test-key"],
      adapter: createTestAdapter(),
      runtimeStore: {
        async createPendingPublish(request) {
          return {
            id: "job_test",
            accountId: request.accountId,
            platform: request.platform,
            text: request.text,
            mediaUrls: request.mediaUrls ?? [],
            scheduledAt: request.scheduledAt ?? null,
            status: "queued",
            provider: "blotato",
            providerPostId: null,
            errorMessage: null,
            createdAt: "2026-05-04T00:00:00.000Z",
            updatedAt: "2026-05-04T00:00:00.000Z"
          };
        },
        async markPublishSucceeded() {
          throw new Error("Supabase PATCH publish_jobs failed: 503: unavailable");
        },
        async markPublishFailed() {
          throw new Error("mark failed should not be called for post-success persistence errors");
        },
        async listJobs() {
          return [];
        },
        async listPosts() {
          return [];
        }
      }
    });

    const response = await request(app)
      .post("/v1/publish")
      .set("x-api-key", "test-key")
      .send({
        accountId: "acct_test",
        platform: "instagram",
        text: "Post copy here",
        mediaUrls: [],
        scheduledAt: null
      })
      .expect(202);

    expect(response.body).toMatchObject({
      ok: true,
      provider: "blotato",
      providerPostId: "test_acct_test",
      status: "queued",
      jobId: "job_test"
    });
  });

  it("rejects invalid publish requests", async () => {
    const app = createApp({ apiKeys: ["test-key"], adapter: createTestAdapter() });

    const response = await request(app)
      .post("/v1/publish")
      .set("x-api-key", "test-key")
      .send({ platform: "instagram" })
      .expect(400);

    expect(response.body.ok).toBe(false);
    expect(response.body.error.code).toBe("invalid_request");
  });
});
