export default function Footer() {
  return (
    <footer className="py-14 bg-cream-card border-t border-cream-border text-center px-4">
      <div className="font-serif text-gradient-gold text-2xl mb-1">Melly</div>
      <p className="text-ink-faint text-xs font-sans uppercase tracking-[0.3em] mb-6">
        École Pierre · Lyon
      </p>

      <div className="h-px max-w-24 mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-6" />

      <p className="text-ink-faint font-sans text-xs">
        Merci pour votre générosité et votre soutien ♡
      </p>
      <p className="text-ink-faint/60 font-sans text-xs mt-2">
        © {new Date().getFullYear()} — Paiements sécurisés par Stripe
      </p>
    </footer>
  );
}
