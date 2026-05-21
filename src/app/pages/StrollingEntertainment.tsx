import React, { useRef, useState, useEffect, useCallback } from 'react';
import { AlphaVideoPlayer } from '../components/AlphaVideoPlayer';
import { Layout } from '../components/Layout';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ACTIVE_VARIANT: 'float-center' | 'hero-bg' = 'float-center';
const LS_KEY = 'strolling-page-config-v4';

// ── Types ──────────────────────────────────────────────────────────────────
interface PhotoItem {
  id: string;
  src: string;
  alt: string;
}

interface PageConfig {
  brentonPhotos: PhotoItem[];
  joliePhotos: PhotoItem[];
  headlineBrenton: string;
  subheadBrenton: string;
  headlineJolie: string;
  subheadJolie: string;
}

// ── Defaults ───────────────────────────────────────────────────────────────
const DEFAULT_CONFIG: PageConfig = {
  headlineBrenton: 'Magic Brent — Walk-Around Magic & Gameshow',
  subheadBrenton: 'Table magic that stops conversation, gameshow energy that owns the room. Brenton works the crowd so you don\'t have to.',
  headlineJolie: 'Cirque Jolie — Stilt Walking & Fire Dancing',
  subheadJolie: 'Rainbow stilts, fire fans, costumed characters — Jolie transforms any venue into a spectacle people talk about for years.',
  brentonPhotos: [
    { id: 'b1', src: '/media/brenton/gameshow-crowd.jpg', alt: 'Brenton running walk-around gameshow for huge Lahaina street crowd' },
    { id: 'b2', src: '/media/brenton/gameshow-1.jpg', alt: 'Brenton hosting Halloween street gameshow with costumed crowd in Lahaina' },
    { id: 'b3', src: '/media/brenton/crowd-2.jpg', alt: 'Brenton with crowd at outdoor event' },
    { id: 'b4', src: '/media/brenton/magic-1.jpg', alt: 'Brenton performing close-up magic for a family at a restaurant table' },
    { id: 'b5', src: '/media/brenton/table-magic.jpg', alt: 'Brenton performing close-up magic at restaurant table' },
    { id: 'b6', src: '/media/brenton/lawn-magic.jpg', alt: 'Brenton producing fire at outdoor gala' },
    { id: 'b7', src: '/media/brenton/balloon-crew.jpg', alt: 'Full crew with giant balloon sculptures on stilts' },
  ],
  joliePhotos: [
    { id: 'j1', src: '/media/strolling/clown-stilt-rainbow.jpg', alt: 'Rainbow clown stilt performer with kids' },
    { id: 'j2', src: '/media/brenton/patriotic-stilt.jpg', alt: 'Jolie on stilts in patriotic stars & stripes costume at Maui resort' },
    { id: 'j3', src: '/media/strolling/superhero-stilt.jpg', alt: 'Superhero stilt costume at corporate event' },
    { id: 'j4', src: '/media/strolling/fire-dancing.jpg', alt: 'Fire dancer performing at luau' },
    { id: 'j5', src: '/media/strolling/moth-stilt-costume.jpg', alt: 'Moth fairy stilt costume at festival' },
    { id: 'j6', src: '/media/strolling/silver-white-stilt.jpg', alt: 'Elegant silver stilt costume at wedding' },
  ],
};

// Edit mode + localStorage persistence are dev-only.
// In production we always render DEFAULT_CONFIG so the source code is the
// single source of truth — no stale per-browser overrides leaking through.
const EDIT_ENABLED = import.meta.env.DEV;

function loadConfig(): PageConfig {
  if (!EDIT_ENABLED) return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_CONFIG;
}

function saveConfig(cfg: PageConfig) {
  if (!EDIT_ENABLED) return;
  try { localStorage.setItem(LS_KEY, JSON.stringify(cfg)); } catch {}
}

// ── Helpers ────────────────────────────────────────────────────────────────
// Reserved center-column width. Kept very narrow on purpose — just her torso.
// Balloons spill freely over the flanks and across the photos.
const JOLIE_W = 'clamp(90px, 9vw, 150px)';

/**
 * Section row that flanks the floating Jolie:
 *   [ left content ] [ reserved Jolie zone ] [ right content ]
 * Collapses to a single column on mobile (Jolie just sits on top).
 */
function Flank({
  left,
  right,
  className = '',
  gap = '1.5rem',
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  gap?: string;
}) {
  return (
    <div
      className={`mx-auto px-6 grid md:grid-cols-[1fr_var(--jolie-w)_1fr] grid-cols-1 ${className}`}
      style={{ maxWidth: '1500px', columnGap: gap, rowGap: '2rem' }}
    >
      <div className="min-w-0">{left}</div>
      <div className="hidden md:block" aria-hidden="true" />
      <div className="min-w-0">{right}</div>
    </div>
  );
}

const FadeInSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
};

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div key="lb-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={onClose}>
        <motion.div key="lb-img" initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.25 }} className="relative max-w-[92vw] max-h-[92vh]" onClick={e => e.stopPropagation()}>
          <img src={src} alt={alt} className="max-w-full max-h-[88vh] rounded-2xl shadow-2xl object-contain" />
          <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/60 hover:bg-black/90 text-white rounded-full text-xl font-bold transition-all">×</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Sortable photo card ────────────────────────────────────────────────────
function SortablePhoto({ item, editMode, onRemove }: { item: PhotoItem; editMode: boolean; onRemove?: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [errored, setErrored] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  if (errored) {
    return (
      <div ref={setNodeRef} style={style} className="flex flex-col items-center justify-center bg-slate-800/60 border-2 border-dashed border-slate-600 rounded-2xl text-slate-500 text-xs text-center p-4 min-h-[180px]">
        <span className="text-2xl mb-1">📸</span>
        <span className="font-mono opacity-60">{item.src.split('/').pop()}</span>
      </div>
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`relative group rounded-2xl shadow-xl overflow-hidden ${editMode ? 'ring-2 ring-coral/40 ring-offset-2 ring-offset-slate-900' : ''}`}
      >
        {/* drag handle — only visible in edit mode */}
        {editMode && (
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 z-20 w-8 h-8 flex items-center justify-center bg-black/70 rounded-lg cursor-grab active:cursor-grabbing touch-none"
            title="Drag to reorder"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white" opacity="0.8">
              <circle cx="4" cy="3" r="1.2"/><circle cx="10" cy="3" r="1.2"/>
              <circle cx="4" cy="7" r="1.2"/><circle cx="10" cy="7" r="1.2"/>
              <circle cx="4" cy="11" r="1.2"/><circle cx="10" cy="11" r="1.2"/>
            </svg>
          </div>
        )}

        {/* remove button — only in edit mode */}
        {editMode && onRemove && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); if (confirm('Remove this photo?')) onRemove(item.id); }}
            className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-red-600/90 hover:bg-red-500 text-white rounded-lg text-lg font-bold shadow-lg"
            title="Remove photo"
          >
            ×
          </button>
        )}

        <img
          src={item.src}
          alt={item.alt}
          className={`w-full h-auto block transition-transform duration-500 ${!editMode ? 'group-hover:scale-[1.03] cursor-zoom-in' : 'cursor-default'}`}
          onError={() => setErrored(true)}
          onClick={() => { if (!editMode) setLightboxOpen(true); }}
        />

        {/* hover hint (non-edit only) */}
        {!editMode && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full font-medium">
              View full photo
            </span>
          </div>
        )}
      </div>

      {lightboxOpen && <Lightbox src={item.src} alt={item.alt} onClose={() => setLightboxOpen(false)} />}
    </>
  );
}

// ── Editable text ──────────────────────────────────────────────────────────
function EditableText({
  value,
  onChange,
  editMode,
  className = '',
  as: Tag = 'p',
}: {
  value: string;
  onChange: (v: string) => void;
  editMode: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [editMode]); // only sync when toggling edit mode

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      contentEditable
      suppressContentEditableWarning
      onBlur={() => { if (ref.current) onChange(ref.current.textContent || ''); }}
      className={`${className} outline-none border-b-2 border-dashed border-coral/60 focus:border-coral cursor-text`}
      spellCheck={false}
    />
  );
}

// ── Media picker modal ────────────────────────────────────────────────────
function MediaPicker({ onPick, onClose, prefix }: { onPick: (item: PhotoItem) => void; onClose: () => void; prefix: string }) {
  const [tab, setTab] = useState<'browse' | 'upload'>('browse');
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [uploadBusy, setUploadBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/media-list')
      .then(r => r.json())
      .then(d => { setFiles(d.files || []); setLoading(false); })
      .catch(e => { setError(String(e)); setLoading(false); });
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  const handlePick = (src: string) => {
    const alt = prompt('Alt text (describe the photo)') || '';
    onPick({ id: `${prefix}-${Date.now()}`, src, alt });
    onClose();
  };

  const handleUpload = async (file: File) => {
    setUploadBusy(true);
    setError(null);
    try {
      // FileReader handles large files; btoa(spread) overflows for big images.
      const dataUrl: string = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () => reject(r.error || new Error('read failed'));
        r.readAsDataURL(file);
      });
      const comma = dataUrl.indexOf(',');
      const b64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, dataBase64: b64 }),
      });
      const text = await res.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch { data = { error: text }; }
      if (!res.ok) throw new Error(data.error || `upload failed (${res.status})`);
      if (!data.src) throw new Error('server did not return src');
      const alt = prompt('Alt text (describe the photo)') || file.name;
      onPick({ id: `${prefix}-${Date.now()}`, src: data.src, alt });
      onClose();
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setUploadBusy(false);
    }
  };

  const filtered = files.filter(f => f.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h3 className="text-white font-bold text-lg">Add Image</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setTab('browse')}
            className={`px-6 py-3 text-sm font-bold transition-colors ${tab === 'browse' ? 'text-coral border-b-2 border-coral' : 'text-slate-400 hover:text-white'}`}
          >Browse media</button>
          <button
            onClick={() => setTab('upload')}
            className={`px-6 py-3 text-sm font-bold transition-colors ${tab === 'upload' ? 'text-coral border-b-2 border-coral' : 'text-slate-400 hover:text-white'}`}
          >Upload new</button>
        </div>

        {error && (
          <div className="px-6 py-3 bg-red-900/40 text-red-200 text-sm border-b border-red-800">{error}</div>
        )}

        {tab === 'browse' ? (
          <div className="flex flex-col overflow-hidden">
            <div className="px-6 py-3 border-b border-slate-800">
              <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Filter by filename..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-coral outline-none"
                autoFocus
              />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <p className="text-slate-400 text-center py-12">Loading...</p>
              ) : filtered.length === 0 ? (
                <p className="text-slate-400 text-center py-12">No files match.</p>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {filtered.map(src => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => handlePick(src)}
                      className="group relative aspect-square rounded-lg overflow-hidden bg-slate-800 border border-slate-700 hover:border-coral transition-all"
                      title={src}
                    >
                      <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-x-0 bottom-0 px-1.5 py-1 bg-black/80 text-white text-[10px] truncate text-left">
                        {src.split('/').pop()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 p-8 flex flex-col items-center justify-center">
            <label className={`flex flex-col items-center justify-center w-full max-w-md aspect-[2/1] rounded-2xl border-2 border-dashed transition-all cursor-pointer ${uploadBusy ? 'opacity-50 cursor-wait border-slate-600' : 'border-coral/50 hover:border-coral hover:bg-coral/5'}`}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadBusy}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
              />
              <span className="text-5xl mb-2">{uploadBusy ? '⏳' : '⬆'}</span>
              <span className="text-white font-bold">{uploadBusy ? 'Uploading...' : 'Click to choose a file'}</span>
              <span className="text-slate-400 text-xs mt-1">PNG · JPG · WebP · GIF · AVIF</span>
              <span className="text-slate-500 text-[11px] mt-3">Saved to /public/media/uploads/</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Add-image tile (opens MediaPicker) ────────────────────────────────────
function AddImageTile({ onAdd, prefix }: { onAdd: (item: PhotoItem) => void; prefix: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex flex-col items-center justify-center min-h-[180px] rounded-2xl border-2 border-dashed border-coral/40 hover:border-coral hover:bg-coral/10 text-coral/70 hover:text-coral transition-all"
      >
        <span className="text-4xl mb-1">＋</span>
        <span className="text-xs font-bold tracking-wide uppercase">Add image</span>
      </button>
      {open && <MediaPicker onPick={onAdd} onClose={() => setOpen(false)} prefix={prefix} />}
    </>
  );
}

// ── Editable column (no DndContext — lifted to TwoColumnEditor) ───────────
function EditableColumn({
  id,
  photos,
  editMode,
  onAdd,
  onRemove,
  addPrefix,
}: {
  id: string;
  photos: PhotoItem[];
  editMode: boolean;
  onAdd?: (item: PhotoItem) => void;
  onRemove?: (id: string) => void;
  addPrefix?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <SortableContext items={photos.map(p => p.id)} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        className={`grid grid-cols-1 gap-4 rounded-2xl transition-colors ${isOver ? 'bg-coral/5 ring-2 ring-coral/30 p-2' : ''}`}
      >
        {photos.map(item => (
          <SortablePhoto key={item.id} item={item} editMode={editMode} onRemove={onRemove} />
        ))}
        {photos.length === 0 && (
          <div className="min-h-[120px] rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-sm">
            Drop photos here
          </div>
        )}
        {editMode && onAdd && addPrefix && (
          <AddImageTile onAdd={onAdd} prefix={addPrefix} />
        )}
      </div>
    </SortableContext>
  );
}

// ── Two-column editor (shared DndContext, supports cross-column drag) ─────
function TwoColumnEditor({
  config,
  update,
}: {
  config: PageConfig;
  update: (patch: Partial<PageConfig>) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const findList = (id: string): 'brenton' | 'jolie' | null => {
    if (id === 'col-brenton') return 'brenton';
    if (id === 'col-jolie') return 'jolie';
    if (config.brentonPhotos.some(p => p.id === id)) return 'brenton';
    if (config.joliePhotos.some(p => p.id === id)) return 'jolie';
    return null;
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;
    const fromList = findList(active.id as string);
    const toList = findList(over.id as string);
    if (!fromList || !toList) return;

    if (fromList === toList) {
      if (active.id === over.id) return;
      const arr = fromList === 'brenton' ? config.brentonPhotos : config.joliePhotos;
      const oldIdx = arr.findIndex(p => p.id === active.id);
      const newIdx = arr.findIndex(p => p.id === over.id);
      if (oldIdx < 0 || newIdx < 0) return;
      const moved = arrayMove(arr, oldIdx, newIdx);
      update(fromList === 'brenton' ? { brentonPhotos: moved } : { joliePhotos: moved });
    } else {
      const fromArr = fromList === 'brenton' ? config.brentonPhotos : config.joliePhotos;
      const toArr = toList === 'brenton' ? config.brentonPhotos : config.joliePhotos;
      const item = fromArr.find(p => p.id === active.id);
      if (!item) return;
      const newFrom = fromArr.filter(p => p.id !== active.id);
      const overIdx = toArr.findIndex(p => p.id === over.id);
      const insertAt = overIdx < 0 ? toArr.length : overIdx;
      const newTo = [...toArr.slice(0, insertAt), item, ...toArr.slice(insertAt)];
      const patch: Partial<PageConfig> = {};
      patch[fromList === 'brenton' ? 'brentonPhotos' : 'joliePhotos'] = newFrom;
      patch[toList === 'brenton' ? 'brentonPhotos' : 'joliePhotos'] = newTo;
      update(patch);
    }
  };

  const activeItem =
    config.brentonPhotos.find(p => p.id === activeId) ||
    config.joliePhotos.find(p => p.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={e => setActiveId(e.active.id as string)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <Flank
        gap="1.5rem"
        left={
          <div className="space-y-4">
            <FadeInSection className="md:text-left mb-2">
              <p className="text-coral uppercase tracking-[0.25em] text-xs font-bold mb-2">Magic Brent</p>
              <EditableText value={config.headlineBrenton} onChange={v => update({ headlineBrenton: v })} editMode={true} as="h2" className="text-3xl md:text-4xl font-bold mb-3 text-white leading-tight" />
              <EditableText value={config.subheadBrenton} onChange={v => update({ subheadBrenton: v })} editMode={true} className="text-gray-400 text-base" />
            </FadeInSection>
            <p className="text-coral/70 text-xs mb-1 font-medium tracking-wide uppercase">Drag to reorder · drag across columns · × to remove · + to add</p>
            <EditableColumn
              id="col-brenton"
              photos={config.brentonPhotos}
              editMode={true}
              onAdd={item => update({ brentonPhotos: [...config.brentonPhotos, item] })}
              onRemove={id => update({ brentonPhotos: config.brentonPhotos.filter(p => p.id !== id) })}
              addPrefix="b"
            />
          </div>
        }
        right={
          <div className="space-y-4">
            <FadeInSection className="md:text-right mb-2">
              <p className="text-lavender uppercase tracking-[0.25em] text-xs font-bold mb-2">Cirque Jolie</p>
              <EditableText value={config.headlineJolie} onChange={v => update({ headlineJolie: v })} editMode={true} as="h2" className="text-3xl md:text-4xl font-bold mb-3 text-white leading-tight" />
              <EditableText value={config.subheadJolie} onChange={v => update({ subheadJolie: v })} editMode={true} className="text-gray-400 text-base" />
            </FadeInSection>
            <p className="text-lavender/70 text-xs mb-1 font-medium tracking-wide uppercase text-right">Drag to reorder · drag across columns · × to remove · + to add</p>
            <EditableColumn
              id="col-jolie"
              photos={config.joliePhotos}
              editMode={true}
              onAdd={item => update({ joliePhotos: [...config.joliePhotos, item] })}
              onRemove={id => update({ joliePhotos: config.joliePhotos.filter(p => p.id !== id) })}
              addPrefix="j"
            />
          </div>
        }
      />
      <DragOverlay>
        {activeItem && (
          <div className="rounded-2xl shadow-2xl overflow-hidden ring-4 ring-coral opacity-90 rotate-1">
            <img src={activeItem.src} alt={activeItem.alt} className="w-full h-auto block" />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

// ── Sortable grid (used only by live page as static renderer) ─────────────
function SortableGrid({ photos, editMode }: { photos: PhotoItem[]; editMode: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {photos.map(item => (
        <SortablePhoto key={item.id} item={item} editMode={editMode} />
      ))}
    </div>
  );
}

// ── Edit mode toolbar ──────────────────────────────────────────────────────
function EditToolbar({ editMode, onToggle, onReset }: { editMode: boolean; onToggle: () => void; onReset: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex items-center gap-3">
      {editMode && (
        <button
          onClick={onReset}
          className="px-4 py-2.5 bg-slate-700/90 hover:bg-slate-600 text-white text-sm font-medium rounded-full shadow-lg backdrop-blur-sm transition-all border border-slate-600"
        >
          Reset to defaults
        </button>
      )}
      <button
        onClick={onToggle}
        className={`px-5 py-2.5 rounded-full shadow-xl text-sm font-bold transition-all border ${
          editMode
            ? 'bg-coral text-white border-coral hover:bg-coral/80'
            : 'bg-slate-800/90 text-white border-slate-600 hover:bg-slate-700 backdrop-blur-sm'
        }`}
      >
        {editMode ? '✓ Save Layout' : '✏️ Edit Page'}
      </button>
    </div>
  );
}

// ── Floating girl ──────────────────────────────────────────────────────────
function FloatingGirl() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden flex items-start justify-center"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      <video
        src="/media/video/jolie-balloons-v4.webm"
        autoPlay
        loop
        muted
        playsInline
        style={{
          height: '100vh',
          width: 'auto',
          maxWidth: '95vw',
          display: 'block',
          transform: 'translateX(-6vw)',
        }}
      />
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function StrollingEntertainment() {
  const [config, setConfig] = useState<PageConfig>(loadConfig);
  const [editMode, setEditMode] = useState(false);

  const update = useCallback((patch: Partial<PageConfig>) => {
    setConfig(prev => {
      const next = { ...prev, ...patch };
      saveConfig(next);
      return next;
    });
  }, []);

  const toggleEdit = () => {
    if (editMode) saveConfig(config);
    setEditMode(e => !e);
  };

  const resetConfig = () => {
    localStorage.removeItem(LS_KEY);
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <>
      <FloatingGirl />
      {EDIT_ENABLED && <EditToolbar editMode={editMode} onToggle={toggleEdit} onReset={resetConfig} />}

      <Layout title="Strolling Entertainment">
        {/* Reserve dead-zone width for the floating Jolie on every section */}
        <div style={{ ['--jolie-w' as any]: JOLIE_W }}>

        {/* ── HERO ── */}
        <section className="relative py-32 bg-slate-900 overflow-hidden">
          <Flank
            className="relative z-20"
            left={
              <FadeInSection className="md:text-left">
                <p className="text-coral/80 uppercase tracking-[0.3em] text-xs font-bold mb-4">Maui · Walk-Around · Stilts · Fire</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]">
                  Strolling<br /><span className="text-coral">Entertainment</span>
                </h1>
              </FadeInSection>
            }
            right={
              <FadeInSection delay={0.1} className="md:text-right">
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                  The magic that moves through the crowd — stilt walkers, fire dancers, close-up magicians, and walk-around gameshows that turn your event into a memory.
                </p>
                <Link to="/contact" className="inline-block px-8 py-3.5 bg-coral text-white font-bold rounded-full hover:bg-coral/80 transition-all shadow-xl hover:scale-105">
                  Book Strolling Entertainment
                </Link>
              </FadeInSection>
            }
          />
        </section>

        {/* ── BRENTON (LEFT)  │  JOLIE (RIGHT) ── */}
        <section className="py-24 bg-slate-900 relative z-20">
          {editMode ? (
            <div className="container mx-auto">
              <TwoColumnEditor config={config} update={update} />
            </div>
          ) : (
            <Flank
              gap="1.5rem"
              left={
                <div className="space-y-4">
                  <FadeInSection className="md:text-left">
                    <p className="text-coral uppercase tracking-[0.25em] text-xs font-bold mb-2">Magic Brent</p>
                    <EditableText value={config.headlineBrenton} onChange={v => update({ headlineBrenton: v })} editMode={editMode} as="h2" className="text-3xl md:text-4xl font-bold mb-3 text-white leading-tight" />
                    <EditableText value={config.subheadBrenton} onChange={v => update({ subheadBrenton: v })} editMode={editMode} className="text-gray-400 text-base" />
                  </FadeInSection>
                  {config.brentonPhotos.slice(0, 5).map((item, i) => (
                    <FadeInSection key={item.id} delay={i * 0.05}>
                      <SortablePhoto item={item} editMode={false} />
                    </FadeInSection>
                  ))}
                  <FadeInSection delay={0.2}>
                    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
                      <div className="text-4xl mb-3">🎮</div>
                      <h3 className="text-xl font-bold mb-2 text-white">Gameshow Fanatics</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Walk-around gameshow with portable podium, buzzers, and Brenton as your roving host — no stage needed.
                      </p>
                      <Link to="/game-show" className="inline-block px-5 py-2.5 bg-coral text-white font-bold rounded-full hover:bg-coral/80 transition-all text-sm">
                        See Gameshow →
                      </Link>
                    </div>
                  </FadeInSection>
                </div>
              }
              right={
                <div className="space-y-4">
                  <FadeInSection className="md:text-right">
                    <p className="text-lavender uppercase tracking-[0.25em] text-xs font-bold mb-2">Cirque Jolie</p>
                    <EditableText value={config.headlineJolie} onChange={v => update({ headlineJolie: v })} editMode={editMode} as="h2" className="text-3xl md:text-4xl font-bold mb-3 text-white leading-tight" />
                    <EditableText value={config.subheadJolie} onChange={v => update({ subheadJolie: v })} editMode={editMode} className="text-gray-400 text-base" />
                  </FadeInSection>
                  {config.joliePhotos.slice(0, 6).map((item, i) => (
                    <FadeInSection key={item.id} delay={i * 0.05}>
                      <SortablePhoto item={item} editMode={false} />
                    </FadeInSection>
                  ))}
                </div>
              }
            />
          )}
        </section>

        {/* ── PERFECT FOR ── */}
        <section className="py-24 bg-slate-950 relative z-20">
          <Flank
            left={
              <FadeInSection className="md:text-right">
                <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
                <p className="text-gray-400 text-lg mb-6">Anywhere you want jaws to drop</p>
                <div className="flex flex-wrap md:justify-end gap-2">
                  {['Weddings','Corporate Events','Graduation Parties','Family Reunions','Holiday Parties','Milestone Birthdays'].map((event, i) => (
                    <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-4 py-2 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all cursor-default">
                      {event}
                    </span>
                  ))}
                </div>
              </FadeInSection>
            }
            right={
              <FadeInSection delay={0.15}>
                <h2 className="text-4xl font-bold mb-4 opacity-0 md:opacity-100">&nbsp;</h2>
                <p className="text-gray-400 text-lg mb-6 opacity-0 md:opacity-100">&nbsp;</p>
                <div className="flex flex-wrap gap-2">
                  {['Resort Entertainment','Cocktail Hours','Festivals','Grand Openings','Luaus','Private Parties'].map((event, i) => (
                    <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-4 py-2 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all cursor-default">
                      {event}
                    </span>
                  ))}
                </div>
              </FadeInSection>
            }
          />
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-slate-950 relative z-20">
          <Flank
            gap="0"
            left={
              <FadeInSection>
                <div className="relative bg-gradient-to-br from-coral to-burgundy md:rounded-l-[2rem] rounded-[2rem] md:rounded-r-none p-10 md:p-12 h-full">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">Make Your Event Unforgettable</h2>
                  <p className="text-white/90 mb-6">
                    Stilt walkers, fire dancers, strolling magicians — tell us your vision and we'll match the perfect performers.
                  </p>
                  <Link to="/contact" className="inline-block px-8 py-3.5 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">
                    Book Strolling Entertainment
                  </Link>
                </div>
              </FadeInSection>
            }
            right={
              <FadeInSection delay={0.1}>
                <div className="relative bg-gradient-to-br from-burgundy to-lavender md:rounded-r-[2rem] rounded-[2rem] md:rounded-l-none p-10 md:p-12 h-full">
                  <p className="text-white/80 uppercase tracking-[0.25em] text-xs font-bold mb-3">Maui Based · Outer Islands Available</p>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">Call us and we'll talk through your vision.</p>
                  <a href="tel:8088702102" className="inline-block px-8 py-3.5 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                    (808) 870-2102
                  </a>
                </div>
              </FadeInSection>
            }
          />
        </section>

        </div>
      </Layout>
    </>
  );
}
