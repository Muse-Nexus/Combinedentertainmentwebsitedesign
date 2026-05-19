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
const LS_KEY = 'strolling-page-config';

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
    { id: 'b2', src: '/media/brenton/patriotic-stilt.jpg', alt: 'Brenton and Jolie in patriotic costumes at Maui resort' },
    { id: 'b3', src: '/media/brenton/gameshow-crowd2.jpg', alt: 'Brenton with crowd at outdoor event' },
    { id: 'b4', src: '/media/brenton/fourth-of-july.jpg', alt: 'Brenton and Jolie 4th of July celebration' },
    { id: 'b5', src: '/media/brenton/table-magic.jpg', alt: 'Brenton performing close-up magic at restaurant table' },
    { id: 'b6', src: '/media/brenton/lawn-magic.jpg', alt: 'Brenton producing fire at outdoor gala' },
    { id: 'b7', src: '/media/brenton/balloon-crew.jpg', alt: 'Full crew with giant balloon sculptures on stilts' },
  ],
  joliePhotos: [
    { id: 'j1', src: '/media/strolling/rainbow-clown-stilts.jpg', alt: 'Rainbow clown stilt performer with kids' },
    { id: 'j2', src: '/media/strolling/strolling-portrait.jpg', alt: 'Stilt performer portrait at resort' },
    { id: 'j3', src: '/media/strolling/superhero-stilts.jpg', alt: 'Superhero stilt costume at corporate event' },
    { id: 'j4', src: '/media/strolling/fire-dancing.jpg', alt: 'Fire dancer performing at luau' },
    { id: 'j5', src: '/media/strolling/moth-stilt-costume.jpg', alt: 'Moth fairy stilt costume at festival' },
    { id: 'j6', src: '/media/strolling/silver-white-stilt.jpg', alt: 'Elegant silver stilt costume at wedding' },
  ],
};

function loadConfig(): PageConfig {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_CONFIG;
}

function saveConfig(cfg: PageConfig) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(cfg)); } catch {}
}

// ── Helpers ────────────────────────────────────────────────────────────────
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
function SortablePhoto({ item, editMode }: { item: PhotoItem; editMode: boolean }) {
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

// ── Sortable grid ──────────────────────────────────────────────────────────
function SortableGrid({ photos, onReorder, editMode }: { photos: PhotoItem[]; onReorder: (p: PhotoItem[]) => void; editMode: boolean }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (e: DragStartEvent) => setActiveId(e.active.id as string);
  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const oldIdx = photos.findIndex(p => p.id === active.id);
      const newIdx = photos.findIndex(p => p.id === over.id);
      onReorder(arrayMove(photos, oldIdx, newIdx));
    }
  };

  const activeItem = photos.find(p => p.id === activeId);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={photos.map(p => p.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map(item => (
            <SortablePhoto key={item.id} item={item} editMode={editMode} />
          ))}
        </div>
      </SortableContext>
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
  if (ACTIVE_VARIANT !== 'float-center') return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 10 }} aria-hidden="true">
      <AlphaVideoPlayer frameCount={96} fps={12} width={720} height={1280} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ height: '92vh', width: 'auto', opacity: 0.9 }} />
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
      <EditToolbar editMode={editMode} onToggle={toggleEdit} onReset={resetConfig} />

      <Layout title="Strolling Entertainment">

        {/* ── HERO ── */}
        <section className="relative py-32 bg-slate-900 overflow-hidden">
          <div className="container mx-auto px-4 relative z-20 text-center">
            <FadeInSection>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Strolling<br /><span className="text-coral">Entertainment</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
                The magic that moves through the crowd — stilt walkers, fire dancers, close-up magicians, and walk-around gameshows that turn your event into a memory.
              </p>
              <Link to="/contact" className="inline-block px-10 py-4 bg-coral text-white font-bold rounded-full hover:bg-coral/80 transition-all shadow-xl hover:scale-105">
                Book Strolling Entertainment
              </Link>
            </FadeInSection>
          </div>
        </section>

        {/* ── BRENTON SECTION ── */}
        <section className="py-24 bg-slate-900 relative z-20">
          <div className="container mx-auto px-4">
            <FadeInSection className="mb-10">
              <EditableText
                value={config.headlineBrenton}
                onChange={v => update({ headlineBrenton: v })}
                editMode={editMode}
                as="h2"
                className="text-4xl md:text-5xl font-bold mb-4 text-white"
              />
              <EditableText
                value={config.subheadBrenton}
                onChange={v => update({ subheadBrenton: v })}
                editMode={editMode}
                className="text-gray-400 text-lg max-w-3xl"
              />
            </FadeInSection>

            {editMode ? (
              <div className="mb-2">
                <p className="text-coral/70 text-xs mb-3 font-medium tracking-wide uppercase">← Drag to reorder photos</p>
                <SortableGrid
                  photos={config.brentonPhotos}
                  onReorder={photos => update({ brentonPhotos: photos })}
                  editMode={editMode}
                />
              </div>
            ) : (
              <>
                {/* Hero photo full width */}
                <FadeInSection className="mb-4">
                  <SortablePhoto item={config.brentonPhotos[0]} editMode={false} />
                </FadeInSection>
                {/* 3-col grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {config.brentonPhotos.slice(1, 4).map((item, i) => (
                    <FadeInSection key={item.id} delay={i * 0.08}>
                      <SortablePhoto item={item} editMode={false} />
                    </FadeInSection>
                  ))}
                </div>
                {/* 2-col grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.brentonPhotos.slice(4, 7).map((item, i) => (
                    <FadeInSection key={item.id} delay={i * 0.08}>
                      <SortablePhoto item={item} editMode={false} />
                    </FadeInSection>
                  ))}
                </div>
              </>
            )}

            {/* Gameshow callout */}
            <FadeInSection delay={0.2} className="mt-12">
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="text-5xl">🎮</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Gameshow Fanatics</h3>
                  <p className="text-gray-400">
                    Walk-around gameshow with a portable podium, buzzers, and Brenton as your roving host — no stage needed. Works cocktail hours, resort pools, festivals. Guests compete, laugh, and remember it forever.
                  </p>
                </div>
                <Link to="/game-show" className="shrink-0 px-6 py-3 bg-coral text-white font-bold rounded-full hover:bg-coral/80 transition-all whitespace-nowrap">
                  See Gameshow →
                </Link>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ── JOLIE SECTION ── */}
        <section className="py-24 bg-slate-950 relative z-20">
          <div className="container mx-auto px-4">
            <FadeInSection className="mb-10">
              <EditableText
                value={config.headlineJolie}
                onChange={v => update({ headlineJolie: v })}
                editMode={editMode}
                as="h2"
                className="text-4xl md:text-5xl font-bold mb-4 text-white"
              />
              <EditableText
                value={config.subheadJolie}
                onChange={v => update({ subheadJolie: v })}
                editMode={editMode}
                className="text-gray-400 text-lg max-w-3xl"
              />
            </FadeInSection>

            {editMode ? (
              <div className="mb-2">
                <p className="text-coral/70 text-xs mb-3 font-medium tracking-wide uppercase">← Drag to reorder photos</p>
                <SortableGrid
                  photos={config.joliePhotos}
                  onReorder={photos => update({ joliePhotos: photos })}
                  editMode={editMode}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {config.joliePhotos.map((item, i) => (
                  <FadeInSection key={item.id} delay={i * 0.08}>
                    <SortablePhoto item={item} editMode={false} />
                  </FadeInSection>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── PERFECT FOR ── */}
        <section className="py-24 bg-slate-950 relative z-20">
          <div className="container mx-auto px-4">
            <FadeInSection className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
              <p className="text-gray-400 text-lg">Anywhere you want jaws to drop</p>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {['Weddings','Corporate Events','Graduation Parties','Family Reunions','Company Holiday Parties','Milestone Birthdays','Resort Entertainment','Cocktail Hours','Festivals','Grand Openings','Luaus','Private Parties'].map((event, i) => (
                  <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-5 py-2.5 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all duration-300 cursor-default">
                    {event}
                  </span>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-slate-950 relative z-20">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <div className="relative bg-gradient-to-r from-coral via-burgundy to-lavender rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Make Your Event Unforgettable</h2>
                  <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                    Stilt walkers, fire dancers, strolling magicians — tell us your vision and we'll match the perfect performers to your event. Based on Maui & available for outer island events.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact" className="px-10 py-4 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">
                      Book Strolling Entertainment
                    </Link>
                    <a href="tel:8088702102" className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                      (808) 870-2102
                    </a>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

      </Layout>
    </>
  );
}
