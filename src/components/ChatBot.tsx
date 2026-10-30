"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useDragControls, type PanInfo } from "framer-motion";
import { GOAL, useTotal } from "@/lib/useTotal";
import { useIsMobile } from "@/lib/useIsMobile";
import { CONTACT_EMAIL, HELLOASSO_URL } from "@/lib/links";

type Ctx = { raised: number | null; progress: number };
type Entry = {
  id: string;
  label: string; // question proposée en suggestion
  keywords: string[];
  answer: (ctx: Ctx) => React.ReactNode;
};
type Message = { id: number; from: "bot" | "user"; content: React.ReactNode };

const eur = (n: number) => `${n.toLocaleString("fr-FR")} €`;

const btn =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";
const goldBtn = `${btn} bg-gradient-gold text-ink`;
const ghostBtn = `${btn} ring-1 ring-white/15 text-bone hover:bg-white/5`;

function Actions({ children }: { children: React.ReactNode }) {
  return <span className="mt-3 flex flex-wrap gap-2">{children}</span>;
}

// Base de connaissances : réponses tirées du contenu du site
const ENTRIES: Entry[] = [
  {
    id: "donner",
    label: "Comment faire un don ?",
    keywords: ["don", "donner", "payer", "paiement", "participer", "contribuer", "aider", "soutenir", "carte", "virement", "minimum"],
    answer: () => (
      <>
        C&apos;est très simple : choisissez un montant dans la section <strong>Cagnotte</strong> (dès 1 €), puis
        payez par carte via Stripe, sans créer de compte. Vous pouvez aussi passer par la collecte HelloAsso de
        l&apos;Association Pierre.
        <Actions>
          <a href="/#donation" className={goldBtn}>Faire un don</a>
          <a href={HELLOASSO_URL} target="_blank" rel="noopener noreferrer" className={ghostBtn}>HelloAsso ↗</a>
        </Actions>
      </>
    ),
  },
  {
    id: "objectif",
    label: "Où en est la cagnotte ?",
    keywords: ["objectif", "combien", "montant", "total", "collecte", "cagnotte", "recolte", "reste", "manque", "atteint"],
    answer: ({ raised, progress }) => (
      <>
        L&apos;objectif est de <strong>{eur(GOAL)}</strong>.{" "}
        {raised === null ? (
          "Le compteur est en cours de chargement."
        ) : (
          <>
            À ce jour, <strong>{eur(raised)}</strong> ont été collectés, soit {Math.round(progress)} % : il
            reste {eur(Math.max(GOAL - raised, 0))}. Merci à chaque donateur !
          </>
        )}
      </>
    ),
  },
  {
    id: "argent",
    label: "À quoi sert l'argent ?",
    keywords: ["sert", "servir", "utilise", "utilisation", "argent", "fonds", "budget", "cout", "logement", "scolarite", "frais", "pourquoi"],
    answer: () => (
      <>
        Les fonds financent son année à Lyon, de septembre 2026 à juin 2027 : <strong>650 € par mois</strong> de
        scolarité et <strong>450 € par mois</strong> de logement. En moyenne, 37 € couvrent environ une journée.
      </>
    ),
  },
  {
    id: "ecole",
    label: "C'est quoi l'École Pierre ?",
    keywords: ["ecole", "pierre", "formation", "lyon", "etudes", "rentree"],
    answer: () => (
      <>
        L&apos;<strong>École Pierre</strong> est une école chrétienne de formation créative à Lyon :
        communication, audiovisuel et musique. Melly y suivra une année complète, de septembre 2026 à juin 2027.
      </>
    ),
  },
  {
    id: "apprendre",
    label: "Qu'y apprendra-t-elle ?",
    keywords: ["apprendre", "apprendra", "cours", "programme", "mao", "composition", "technique", "vocale", "chant"],
    answer: () => (
      <>
        Technique vocale, compétences musicales, composition, musique assistée par ordinateur (MAO) et service à
        travers la louange. Son désir : revenir équipée pour servir avec justesse, créativité et excellence.
      </>
    ),
  },
  {
    id: "qui",
    label: "Qui est Melly ?",
    keywords: ["qui", "melly", "elle", "chanteuse", "histoire", "parcours", "louange", "eglise"],
    answer: () => (
      <>
        Melly est une chanteuse de louange. La musique fait partie de sa vie depuis l&apos;enfance ; elle a servi
        dans son église locale, avec <strong>Pulse Mâcon</strong> et le groupe <strong>Day and Night</strong>.
        Aujourd&apos;hui, elle répond à l&apos;appel de se former pour servir encore mieux.
        <Actions>
          <a href="/#video" className={ghostBtn}>Voir son message vidéo</a>
        </Actions>
      </>
    ),
  },
  {
    id: "securite",
    label: "Le paiement est-il sécurisé ?",
    keywords: ["securise", "securite", "fiable", "arnaque", "stripe", "donnees", "bancaire", "confiance"],
    answer: () => (
      <>
        Oui. Le paiement est entièrement géré par <strong>Stripe</strong>, l&apos;un des leaders mondiaux du
        paiement en ligne. Vos données bancaires ne transitent jamais par ce site.
      </>
    ),
  },
  {
    id: "fiscal",
    label: "Ai-je droit à un reçu fiscal ?",
    keywords: ["fiscal", "recu", "impot", "impots", "deduction", "deductible", "defiscaliser", "attestation"],
    answer: () => (
      <>
        Les dons faits directement sur ce site vont à une personne : ils n&apos;ouvrent pas droit à un reçu
        fiscal. Pour la collecte HelloAsso, renseignez-vous auprès de l&apos;Association Pierre.
      </>
    ),
  },
  {
    id: "partager",
    label: "Comment aider sans donner ?",
    keywords: ["partager", "partage", "prier", "priere", "sans", "autrement", "diffuser", "reseaux"],
    answer: () => (
      <>
        Vos prières et vos encouragements comptent énormément ! Partager la cagnotte autour de vous est aussi un
        vrai soutien.
        <Actions>
          <ShareButton />
        </Actions>
      </>
    ),
  },
  {
    id: "contact",
    label: "Contacter Melly",
    keywords: ["contact", "contacter", "mail", "email", "ecrire", "joindre", "message", "question", "rembourser", "remboursement"],
    answer: () => (
      <>
        Vous pouvez écrire directement à Melly :
        <Actions>
          <a href={`mailto:${CONTACT_EMAIL}`} className={ghostBtn}>{CONTACT_EMAIL}</a>
        </Actions>
      </>
    ),
  },
];

const SMALL_TALK: { keywords: string[]; answer: string }[] = [
  { keywords: ["bonjour", "salut", "hello", "coucou", "bonsoir", "hey"], answer: "Bonjour ! Que voulez-vous savoir sur le projet de Melly ?" },
  { keywords: ["merci", "super", "genial", "top", "parfait"], answer: "Avec plaisir ! Merci de vous intéresser au projet de Melly." },
];

const SUGGESTIONS = ["donner", "objectif", "argent", "ecole", "qui", "fiscal", "partager", "contact"];

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ");

function findEntry(text: string): Entry | string | null {
  const words = normalize(text).split(/\s+/).filter(Boolean);
  const has = (k: string) => words.some((w) => w === k || (k.length > 3 && w.startsWith(k)));
  let best: Entry | null = null;
  let bestScore = 0;
  for (const e of ENTRIES) {
    const score = e.keywords.filter(has).length;
    if (score > bestScore) { best = e; bestScore = score; }
  }
  if (best) return best;
  const talk = SMALL_TALK.find((t) => t.keywords.some(has));
  return talk ? talk.answer : null;
}

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.origin;
    if (navigator.share) {
      try { await navigator.share({ title: "Melly — Faire partie de l'histoire", url }); } catch { /* annulé */ }
      return;
    }
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* indisponible */ }
  };
  return (
    <button type="button" onClick={share} className={goldBtn}>
      {copied ? "Lien copié !" : "Partager la cagnotte"}
    </button>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [asked, setAsked] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "bot",
      content: "Bonjour ! Je suis l'assistant de Melly. Posez-moi une question sur son projet, la cagnotte ou les dons.",
    },
  ]);
  const { raised, progress } = useTotal();
  const ctx = useRef<Ctx>({ raised, progress });
  ctx.current = { raised, progress };
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const mobile = useIsMobile();
  const dragControls = useDragControls();

  // Mobile : la feuille se ferme si on la tire assez bas (ou assez vite)
  const onSheetDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 600) setOpen(false);
  };

  // Petite bulle d'invitation, une seule fois par session
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("chat-teaser") === "1"; } catch { /* indisponible */ }
    if (seen) return;
    const show = setTimeout(() => setTeaser(true), 6000);
    const hide = setTimeout(() => setTeaser(false), 14000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    if (!open) return;
    setTeaser(false);
    try { sessionStorage.setItem("chat-teaser", "1"); } catch { /* indisponible */ }
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 250);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    // Mobile : la page derrière la feuille ne défile pas
    const prevOverflow = document.body.style.overflow;
    if (mobile) document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, mobile]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);


  const push = (from: Message["from"], content: React.ReactNode) =>
    setMessages((m) => [...m, { id: nextId.current++, from, content }]);

  const reply = (content: React.ReactNode) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); push("bot", content); }, 650 + Math.random() * 450);
  };

  const ask = (entry: Entry) => {
    if (typing) return;
    push("user", entry.label);
    setAsked((a) => (a.includes(entry.id) ? a : [...a, entry.id]));
    reply(entry.answer(ctx.current));
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    push("user", text);
    const found = findEntry(text);
    if (typeof found === "string") reply(found);
    else if (found) { setAsked((a) => (a.includes(found.id) ? a : [...a, found.id])); reply(found.answer(ctx.current)); }
    else reply(
      <>
        Je n&apos;ai pas bien compris, désolé. Essayez l&apos;une des questions ci-dessous, ou écrivez directement à
        Melly : <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-light underline underline-offset-2">{CONTACT_EMAIL}</a>
      </>
    );
  };

  const suggestions = SUGGESTIONS.filter((id) => !asked.includes(id))
    .map((id) => ENTRIES.find((e) => e.id === id)!)
    .slice(0, 4);

  return (
    <>
      {/* Bouton flottant */}
      <div className="fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6 z-[45]">
        {teaser && !open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hidden sm:block absolute bottom-full right-0 mb-3 w-max max-w-[220px] rounded-2xl rounded-br-md glass bg-night/80 px-4 py-3 text-left text-sm text-bone
                       shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] animate-rise-in"
          >
            Une question sur le projet ? Je vous réponds tout de suite.
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="chatbot-panel"
          aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant de Melly"}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-ink cursor-pointer
                     shadow-[0_12px_40px_-8px_rgba(212,175,90,0.8)] hover:scale-105 active:scale-95 transition-transform duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-night"
        >
          {!open && <span className="absolute inset-0 rounded-full bg-gold/50 animate-ping [animation-duration:2.5s]" aria-hidden="true" />}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
            className={`absolute transition-all duration-300 ${open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
            <path d="M21 12a8 8 0 01-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1121 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"
            className={`absolute transition-all duration-300 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Fenêtre de discussion : feuille glissante sur mobile, fenêtre flottante sur ordinateur */}
      <AnimatePresence>
      {open && mobile && (
        <motion.div
          key="chat-backdrop"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
        />
      )}
      {open && (
      <motion.div
        key="chat-panel"
        id="chatbot-panel"
        role="dialog"
        aria-label="Assistant de Melly"
        className="fixed z-50 inset-x-0 bottom-0 h-[min(640px,88svh)] pb-[env(safe-area-inset-bottom)] rounded-t-[1.75rem]
                   sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[390px] sm:h-[min(600px,calc(100svh-8rem))] sm:pb-0 sm:rounded-[1.75rem]
                   flex flex-col overflow-hidden bg-night-soft/95 backdrop-blur-xl ring-1 ring-white/10
                   shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] origin-bottom-right"
        initial={mobile ? { y: "100%" } : { opacity: 0, scale: 0.9, y: 16 }}
        animate={mobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
        exit={mobile ? { y: "100%" } : { opacity: 0, scale: 0.92, y: 12 }}
        transition={mobile ? { type: "spring", stiffness: 320, damping: 34 } : { type: "spring", stiffness: 380, damping: 30 }}
        drag={mobile ? "y" : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={onSheetDragEnd}
      >
        {/* Poignée de la feuille (mobile) : on la tire vers le bas pour fermer */}
        <div
          className="sm:hidden flex justify-center pt-2.5 pb-1 touch-none cursor-grab"
          onPointerDown={(e) => dragControls.start(e)}
          aria-hidden="true"
        >
          <span className="h-1.5 w-11 rounded-full bg-white/25" />
        </div>

        {/* En-tête (sert aussi de zone de glissement sur mobile) */}
        <div
          className="relative flex items-center gap-3 border-b border-line px-4 py-3.5 sm:touch-auto touch-none"
          onPointerDown={(e) => { if (mobile && !(e.target as HTMLElement).closest("button")) dragControls.start(e); }}
        >
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" aria-hidden="true" />
          <span className="relative h-10 w-10 shrink-0">
            <Image src="/images/IMG_3215.JPG" alt="" fill sizes="40px" className="rounded-full object-cover object-[center_30%] ring-2 ring-gold/50" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-night-soft" aria-hidden="true" />
          </span>
          <div className="relative min-w-0 flex-1">
            <div className="font-display text-xl leading-tight text-bone">L&apos;assistant de Melly</div>
            <div className="text-[12px] text-bone-faint">Répond instantanément</div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-label="Fermer"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-bone-muted hover:bg-white/5 hover:text-bone transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          onClick={(e) => { if ((e.target as HTMLElement).closest('a[href^="/#"]')) setOpen(false); }}
          className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
          aria-live="polite"
        >
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-rise-in`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                  m.from === "user"
                    ? "rounded-br-md bg-gradient-gold text-ink"
                    : "rounded-bl-md bg-white/[0.06] text-bone-muted ring-1 ring-white/5 [&_strong]:text-bone [&_strong]:font-medium"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start" aria-label="L'assistant écrit…">
              <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-4 ring-1 ring-white/5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">
            {suggestions.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => ask(s)}
                tabIndex={open ? 0 : -1}
                disabled={typing}
                className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-2 text-[13px] text-gold-light cursor-pointer
                           hover:bg-gold/20 disabled:opacity-50 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Saisie (16px minimum pour éviter le zoom automatique sur iPhone) */}
        <form onSubmit={send} className="flex items-center gap-2 border-t border-line p-3">
          <label htmlFor="chat-input" className="sr-only">Votre question</label>
          <input
            id="chat-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            tabIndex={open ? 0 : -1}
            placeholder="Écrivez votre question…"
            autoComplete="off"
            enterKeyHint="send"
            className="min-w-0 flex-1 rounded-full bg-white/[0.05] px-4 py-3 text-base text-bone ring-1 ring-white/10
                       placeholder:text-bone-faint focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            tabIndex={open ? 0 : -1}
            aria-label="Envoyer"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-ink cursor-pointer
                       disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
