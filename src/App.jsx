import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/*
  MTP ACADEMY — ARCHIVO PRINCIPAL
  ---------------------------------
  Para editar rápido:
  1. SITE: datos generales, logo y foto del mentor.
  2. MONTHLY_RESULTS: resultados por mes.
  3. RESULT_GALLERY: todas las imágenes/resultados/certificados.
  4. VIP_PROGRAM: texto del grupo VIP.

  IMPORTANTE SOBRE IMÁGENES:
  En React/Vite, todo lo que está dentro de /public se sirve desde la raíz.
  Ejemplo real:
  public/images/logo-mtp.jpg  =>  /images/logo-mtp.jpg
  public/images/resultados/foto.png  =>  /images/resultados/foto.png
*/

const SITE = {
  brand: "MTP Academy",
  mentor: "Adriel Lostalo",
  domain: "www.adriellostalo.com",
  applicationUrl: "https://www.adriellostalo.com",
  instagram: "@adriellostalo",
  assets: {
    logo: "/images/logo-mtp.jpg",
    mentor: "/images/mentor-adriel.png",
    background: "/images/bg-trading.jpg",
  },
  stats: [
    { value: "4+", label: "Años de experiencia", sub: "Estrategia propia probada en distintas condiciones de mercado.", icon: "clock" },
    { value: "+50K", label: "USD en retiros", sub: "Retiros acumulados en estudiantes de primera generación.", icon: "wallet" },
    { value: "5 cifras", label: "Meses alcanzados", sub: "Resultados sólidos con disciplina y gestión profesional.", icon: "trend" },
    { value: "VIP", label: "Escalación avanzada", sub: "Grupo privado para estudiantes con mejor desempeño.", icon: "crown", gold: true },
  ],
};

const MONTHLY_RESULTS = {
  Febrero: {
    title: "Resultado final del mes de Febrero",
    profit: 14.36,
    winRate: 76,
    trades: 17,
    wins: 13,
    losses: 2,
    be: 2,
    summary: "Mes fuerte para la primera generación, con alta efectividad, pocas pérdidas y una ganancia mensual destacada.",
    bullets: ["17 trades totales", "13 trades ganados", "Solo 2 trades perdidos", "14.36% de ganancia mensual"],
  },
  Marzo: {
    title: "Resultados finales mes de Marzo",
    profit: 4.8,
    winRate: 72.7,
    trades: 16,
    wins: 8,
    losses: 3,
    be: 5,
    summary: "Un mes donde se priorizó proteger capital, tomar entradas selectivas y respetar el plan operativo.",
    bullets: ["72.7% win rate real", "Solo 3 pérdidas en 16 operaciones", "5 trades protegidos en break-even", "4.8% profit del mes"],
  },
  Abril: {
    title: "Seguimiento operativo de Abril",
    profit: 6.3,
    winRate: 78.5,
    trades: 14,
    wins: 7,
    losses: 1,
    be: 6,
    summary: "Abril refleja una operativa paciente: días sin trade, sesiones protegidas en BE y entradas puntuales.",
    bullets: ["Semana 1: +1.8% con sesión en vivo", "Semana 2: +3% en tres entradas", "Semana 3: semana de protección en BE", "Semana 4 y 5: continuidad con control de riesgo"],
    weeks: [
      { week: "Semana 1", days: [{ day: "Lunes", result: "BE", type: "be" }, { day: "Martes", result: "+0.8%", type: "win" }, { day: "Miércoles 1", result: "No trade", type: "none" }, { day: "Jueves 2", result: "+1% · sesión en vivo", type: "win" }, { day: "Viernes 3", result: "No trade", type: "none" }] },
      { week: "Semana 2", days: [{ day: "Domingo 5", result: "No trade", type: "none" }, { day: "Lunes 6", result: "+1%", type: "win" }, { day: "Martes 7", result: "No trade", type: "none" }, { day: "Miércoles 8", result: "+1%", type: "win" }, { day: "Jueves 9", result: "+1%", type: "win" }, { day: "Viernes 10", result: "No trade", type: "none" }] },
      { week: "Semana 3", days: [{ day: "Domingo 12", result: "No trade", type: "none" }, { day: "Lunes 13", result: "BE", type: "be" }, { day: "Martes 14", result: "BE", type: "be" }, { day: "Miércoles 15", result: "BE", type: "be" }, { day: "Jueves 16", result: "BE", type: "be" }] },
      { week: "Semana 4", days: [{ day: "Domingo 19", result: "No trade", type: "none" }, { day: "Lunes 20", result: "+0.5%", type: "win" }, { day: "Martes 21", result: "+1%", type: "win" }, { day: "Miércoles 22", result: "BE", type: "be" }, { day: "Jueves 23", result: "No trade", type: "none" }, { day: "Viernes 24", result: "BE", type: "be" }] },
      { week: "Semana 5", days: [{ day: "Domingo 26", result: "No trade", type: "none" }, { day: "Lunes 27", result: "BE", type: "be" }, { day: "Martes 28", result: "SL -1%", type: "loss" }, { day: "Miércoles 29", result: "TP +1%", type: "win" }] },
    ],
  },
};

const RESULT_GALLERY = [
  {
    id: "fundingpips-david-1184",
    category: "rewards",
    badge: "FundingPips",
    title: "Reward procesado",
    student: "David Alonso J",
    amount: "$1,184.98",
    date: "21 Abr 2026",
    meta: "Two Step · ROI 759.6%",
    image: "/images/resultados/fundingpips-david-1184.png",
  },
  {
    id: "fundingpips-gabriel-1418",
    category: "rewards",
    badge: "FundingPips",
    title: "Reward procesado",
    student: "Gabriel B",
    amount: "$1,418.33",
    date: "13 Mar 2026",
    meta: "One Step · ROI 319.4%",
    image: "/images/resultados/fundingpips-gabriel-1418.png",
  },
  {
    id: "ftmo-anthony-13131",
    category: "rewards",
    badge: "FTMO",
    title: "Overall Rewards",
    student: "Anthony Josue Rivera Rodríguez",
    amount: "$13,131.26",
    date: "11 Mar 2026",
    meta: "Silver · Overall rewards",
    image: "/images/resultados/ftmo-anthony-13131.png",
  },
  {
    id: "fundingpips-david-bronze",
    category: "rewards",
    badge: "FundingPips",
    title: "Bronze Certificado",
    student: "David Alonso J",
    amount: "$4,549.53",
    date: "21 Abr 2026",
    meta: "Recompensas de todos los tiempos",
    image: "/images/resultados/fundingpips-david-bronze.png",
  },
  {
    id: "fundednext-david-elite",
    category: "certificates",
    badge: "FundedNext",
    title: "Elite Trader",
    student: "David Jiménez Acuña",
    amount: "50K",
    date: "13 Mar 2026",
    meta: "Stellar 2-Step Challenge P1",
    image: "/images/resultados/fundednext-david-elite.png",
  },
  {
    id: "fundednext-kevin-elite",
    category: "certificates",
    badge: "FundedNext",
    title: "Elite Trader",
    student: "Kevin González Navarro",
    amount: "50K",
    date: "15 Abr 2026",
    meta: "Stellar Lite 2-Step Challenge P1",
    image: "/images/resultados/fundednext-kevin-elite.png",
  },
  {
    id: "ftmo-jose-challenge",
    category: "challenges",
    badge: "FTMO",
    title: "Passed FTMO Challenge",
    student: "José Julián Rodríguez",
    amount: "Challenge Passed",
    date: "13 Mar 2026",
    meta: "Gestión de riesgo validada",
    image: "/images/resultados/ftmo-jose-challenge.png",
  },
  {
    id: "ftmo-david-verification",
    category: "challenges",
    badge: "FTMO",
    title: "Passed Verification",
    student: "David Alonso Acuña Jiménez",
    amount: "Verification Passed",
    date: "10 Abr 2026",
    meta: "Proceso de evaluación completado",
    image: "/images/resultados/ftmo-david-verification.png",
  },
];

const VIP_PROGRAM = {
  name: "MTP VIP",
  eyebrow: "Escalación para los mejores",
  headline: "El siguiente nivel para estudiantes que ya demostraron disciplina.",
  description: "El VIP no es para cualquiera. Es una sala avanzada pensada para estudiantes que ya entienden la estrategia, respetan el riesgo y quieren un acompañamiento más cercano para escalar resultados.",
  requirements: [
    "Haber completado la formación principal de MTP Academy.",
    "Demostrar disciplina operativa y respeto por la gestión de riesgo.",
    "Llevar bitácora, seguimiento y evidencia de ejecución.",
    "Tener mentalidad de proceso, no de apuesta rápida.",
  ],
  benefits: [
    "Sesiones avanzadas con análisis de mercado.",
    "Revisión de operaciones y errores de ejecución.",
    "Plan de escalación para fondeo y retiros.",
    "Acceso a una comunidad más selectiva.",
  ],
};

const PROGRAM_MODULES = [
  { number: "01", title: "Fundamentos reales del trading", text: "Mercado, estructura, sesiones, liquidez, pares operables y lenguaje técnico sin hacerlo innecesariamente complicado.", icon: "book" },
  { number: "02", title: "Estrategia MTP", text: "Contexto, zonas, confirmaciones, entrada, invalidación, salida y gestión de la operación paso a paso.", icon: "target" },
  { number: "03", title: "Gestión profesional del riesgo", text: "Reglas para proteger capital, limitar pérdidas, calcular exposición y evitar operar por emoción.", icon: "shield" },
  { number: "04", title: "Psicotrading", text: "Control emocional, paciencia, rutina, diario de trading y hábitos para sostener consistencia.", icon: "brain" },
  { number: "05", title: "Sesiones en vivo", text: "Acompañamiento para ver cómo se aplica el sistema en tiempo real y corregir errores de ejecución.", icon: "users" },
  { number: "06", title: "Ruta de escalación", text: "De la formación principal al seguimiento avanzado, fondeo, retiros y posible acceso a MTP VIP.", icon: "crown" },
];

const MARKETS = [
  { name: "XAUUSD", text: "Oro contra dólar. Alta volatilidad, estructura limpia y oportunidades en sesiones clave.", icon: "crown" },
  { name: "BTC", text: "Criptoactivo principal. Se analiza con criterio técnico, liquidez y gestión de exposición.", icon: "bitcoin" },
  { name: "US30", text: "Índice de alto movimiento. Ideal para sesiones con momentum y lectura institucional.", icon: "bars" },
  { name: "EURUSD", text: "Par mayor con alta liquidez, ideal para validar tendencia, estructura y confirmaciones.", icon: "chart" },
];

const FILTERS = [
  { id: "all", label: "Todo" },
  { id: "rewards", label: "Rewards" },
  { id: "certificates", label: "Certificados" },
  { id: "challenges", label: "Challenges" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Icon({ name = "spark", className = "h-5 w-5" }) {
  const common = {
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const icons = {
    arrow: <svg {...common}><path d="M7 17 17 7" /><path d="M9 7h8v8" /></svg>,
    bars: <svg {...common}><path d="M4 20V10" /><path d="M12 20V4" /><path d="M20 20v-7" /></svg>,
    bitcoin: <svg {...common}><path d="M11 2v20" /><path d="M14 2v20" /><path d="M7 6h7.5a3 3 0 0 1 0 6H7" /><path d="M7 12h8.5a3 3 0 0 1 0 6H7" /></svg>,
    book: <svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" /></svg>,
    brain: <svg {...common}><path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5.2A3.5 3.5 0 0 0 8 18h1" /><path d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 5.2A3.5 3.5 0 0 1 16 18h-1" /><path d="M12 3v18" /></svg>,
    chart: <svg {...common}><path d="M3 3v18h18" /><path d="m6 16 4-5 4 3 5-8" /></svg>,
    check: <svg {...common}><path d="M20 6 9 17l-5-5" /></svg>,
    clock: <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
    crown: <svg {...common}><path d="m3 8 4 3 5-7 5 7 4-3-2 11H5L3 8z" /><path d="M5 19h14" /></svg>,
    dollar: <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 6v12" /><path d="M16 9a4 4 0 0 0-4-2c-2 0-3.5 1-3.5 2.5S10 12 12 12s3.5 1 3.5 2.5S14 17 12 17a5 5 0 0 1-4-2" /></svg>,
    eye: <svg {...common}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>,
    lock: <svg {...common}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>,
    menu: <svg {...common}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>,
    shield: <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-5" /></svg>,
    spark: <svg {...common}><path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6z" /><path d="M19 3v4" /><path d="M21 5h-4" /></svg>,
    star: <svg {...common}><path d="m12 2 3 6 6 .9-4.5 4.4 1.1 6.3L12 16.7 6.4 19.6l1.1-6.3L3 8.9 9 8l3-6z" /></svg>,
    target: <svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>,
    trend: <svg {...common}><path d="m3 17 6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>,
    trophy: <svg {...common}><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v6a5 5 0 0 1-10 0V4z" /><path d="M5 5H3v3a4 4 0 0 0 4 4" /><path d="M19 5h2v3a4 4 0 0 1-4 4" /></svg>,
    users: <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    wallet: <svg {...common}><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /><path d="M16 12h5" /><path d="M17 12h.01" /></svg>,
    x: <svg {...common}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
  };

  return icons[name] || icons.spark;
}

function runDataTests() {
  console.assert(Object.keys(MONTHLY_RESULTS).length >= 3, "Debe haber al menos 3 meses de resultados.");
  Object.entries(MONTHLY_RESULTS).forEach(([month, data]) => {
    console.assert(data.trades === data.wins + data.losses + data.be, `${month}: trades debe coincidir con wins + losses + BE.`);
    console.assert(Array.isArray(data.bullets) && data.bullets.length > 0, `${month}: debe tener bullets.`);
  });
  console.assert(RESULT_GALLERY.length >= 8, "La galería debe iniciar con al menos 8 resultados.");
  console.assert(VIP_PROGRAM.name === "MTP VIP", "Debe existir el programa VIP.");
}

if (typeof window !== "undefined") runDataTests();

function SectionBadge({ children, tone = "green" }) {
  return (
    <div className={cn(
      "mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.22em]",
      tone === "gold" ? "border-yellow-300/25 bg-yellow-300/10 text-yellow-100" : "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
    )}>
      <Icon name="spark" className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function GlowButton({ children, href = "#aplicar", variant = "primary" }) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-[0.18em] transition duration-300",
        variant === "gold"
          ? "bg-yellow-300 text-black shadow-[0_0_35px_rgba(255,211,92,.25)] hover:bg-white"
          : variant === "secondary"
            ? "border border-white/15 bg-white/5 text-white backdrop-blur hover:border-emerald-300/60 hover:bg-emerald-300/10"
            : "bg-emerald-400 text-black shadow-[0_0_35px_rgba(52,255,130,.35)] hover:bg-white",
      )}
    >
      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
      <span className="relative">{children}</span>
      <Icon name="arrow" className="relative h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

function SafeImage({ src, alt, className, fallbackText = "Imagen", fallbackClassName = "min-h-[280px]" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] p-8 text-center", fallbackClassName)}>
        <div>
          <Icon name="trophy" className="mx-auto h-12 w-12 text-emerald-300" />
          <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/45">{fallbackText}</p>
        </div>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

function StatCard({ icon = "spark", label, value, sub, gold = false }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        "group rounded-3xl border bg-white/[0.045] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl transition",
        gold ? "border-yellow-300/20 hover:border-yellow-300/50 hover:bg-yellow-300/[0.08]" : "border-white/10 hover:border-emerald-300/40 hover:bg-emerald-300/[0.07]",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={cn("rounded-2xl border p-3", gold ? "border-yellow-300/20 bg-yellow-300/10 text-yellow-200" : "border-emerald-300/20 bg-emerald-300/10 text-emerald-300")}>
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <Icon name="arrow" className={cn("h-5 w-5 text-white/20 transition group-hover:translate-x-1", gold ? "group-hover:text-yellow-200" : "group-hover:text-emerald-300")} />
      </div>
      <p className="text-3xl font-black tracking-tight text-white">{value}</p>
      <p className="mt-1 text-sm font-bold text-white/70">{label}</p>
      {sub && <p className="mt-3 text-xs leading-relaxed text-white/45">{sub}</p>}
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const navItems = [
    ["Inicio", "#inicio"],
    ["Resultados", "#resultados"],
    ["Pruebas", "#galeria"],
    ["Programa", "#programa"],
    ["VIP", "#vip"],
    ["Aplicar", "#aplicar"],
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-emerald-300/30 bg-black shadow-[0_0_25px_rgba(48,255,110,.25)]">
            <SafeImage src={SITE.assets.logo} alt="MTP Academy logo" className="h-full w-full object-cover" fallbackText="MTP" fallbackClassName="h-full w-full min-h-0" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-white">MTP</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-300">Academy</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="text-xs font-black uppercase tracking-[0.18em] text-white/60 transition hover:text-emerald-300">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block"><GlowButton href="#aplicar">Aplicar ahora</GlowButton></div>

        <button onClick={() => setOpen((v) => !v)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white lg:hidden" aria-label="Abrir menú">
          <Icon name={open ? "x" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 bg-black/90 lg:hidden">
            <div className="space-y-2 px-5 py-5">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-white/70 hover:bg-white/5 hover:text-emerald-300">
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function AnimatedMarketBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(42,255,99,.23),transparent_32%),radial-gradient(circle_at_80%_5%,rgba(255,211,92,.10),transparent_25%),linear-gradient(180deg,#020403_0%,#06100a_45%,#020403_100%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.12] mix-blend-screen" style={{ backgroundImage: `url(${SITE.assets.background})` }} />
      <motion.div animate={{ x: ["-10%", "5%", "-10%"], y: ["0%", "-4%", "0%"] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <motion.div animate={{ x: ["8%", "-4%", "8%"], y: ["0%", "6%", "0%"] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-24 bottom-20 h-[34rem] w-[34rem] rounded-full bg-yellow-300/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

function HeroDashboard() {
  const growthCurve = Object.entries(MONTHLY_RESULTS).map(([month, item]) => ({ month: month.slice(0, 3), profit: item.profit }));

  return (
    <motion.div initial={{ opacity: 0, scale: 0.94, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="relative">
      <div className="absolute -inset-6 rounded-[3rem] bg-emerald-400/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-black/45 p-4 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
        <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/10 to-white/[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(52,255,130,.28),transparent_35%)]" />
          <div className="absolute left-6 right-6 top-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3"><div className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,255,130,.9)]" /><p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">Live market room</p></div>
            <p className="text-xs font-black text-emerald-300">MTP</p>
          </div>
          <div className="absolute left-8 right-8 top-28">
            <div className="rounded-[2rem] border border-emerald-300/20 bg-black/55 p-7 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div><p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Primera generación</p><h3 className="mt-2 text-3xl font-black tracking-tight text-white">Performance dashboard</h3></div>
                <div className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-3 text-emerald-300"><Icon name="trophy" className="h-6 w-6" /></div>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthCurve} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <defs><linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3cff7e" stopOpacity={0.8} /><stop offset="95%" stopColor="#3cff7e" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,.45)" tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,.35)" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "rgba(0,0,0,.88)", border: "1px solid rgba(60,255,126,.25)", borderRadius: "16px", color: "white" }} formatter={(value) => [`${value}%`, "Profit"]} />
                    <Area type="monotone" dataKey="profit" stroke="#3cff7e" strokeWidth={3} fill="url(#profitGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {growthCurve.map((item) => <div key={item.month} className="rounded-2xl bg-white/5 p-4 text-center"><p className="text-2xl font-black text-white">{item.profit}%</p><p className="text-xs text-white/45">{item.month}</p></div>)}
              </div>
            </div>
          </div>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-7 left-8 right-8 rounded-3xl border border-yellow-300/20 bg-yellow-300/[0.08] p-5 backdrop-blur-xl">
            <div className="flex items-start gap-4"><div className="rounded-2xl bg-yellow-300 p-3 text-black"><Icon name="crown" className="h-5 w-5" /></div><div><p className="font-black text-white">Escala hacia MTP VIP.</p><p className="mt-1 text-sm leading-6 text-white/58">Los mejores estudiantes pueden pasar a un grupo avanzado con seguimiento más cercano.</p></div></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden pt-28 text-white">
      <AnimatedMarketBackground />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pt-20">
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <SectionBadge>Programa privado de trading</SectionBadge>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-8xl">Opera con estructura. <span className="bg-gradient-to-r from-emerald-300 via-white to-yellow-200 bg-clip-text text-transparent">Escala con criterio.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">MTP Academy es una formación integral creada por un trader con 4 años de experiencia en mercados financieros. La base es clara: estrategia, psicotrading, gestión del capital, resultados medibles y una ruta de escalación hacia un grupo avanzado VIP.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-8 flex flex-col gap-4 sm:flex-row"><GlowButton href="#aplicar">Quiero aplicar</GlowButton><GlowButton href="#galeria" variant="secondary">Ver pruebas</GlowButton></motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">{SITE.stats.map((item) => <StatCard key={item.label} {...item} />)}</motion.div>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}

function ResultsSection() {
  const [selected, setSelected] = useState("Febrero");
  const data = MONTHLY_RESULTS[selected];
  const chart = [{ label: "Ganadas", value: data.wins }, { label: "Perdidas", value: data.losses }, { label: "BE", value: data.be }];

  return (
    <section id="resultados" className="relative overflow-hidden bg-black py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(52,255,130,.16),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div><SectionBadge>Resultados y seguimiento</SectionBadge><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl">Una academia basada en datos, evidencia y proceso.</h2><p className="mt-6 text-lg leading-8 text-white/65">La primera generación se mide con operaciones, pérdidas, BE, profit mensual y certificados. El objetivo no es inflar promesas, sino mostrar una ruta de trabajo real.</p></div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4"><StatCard icon="wallet" value="+50K" label="USD retirados" sub="Estudiantes primera generación." /><StatCard icon="shield" value="BE" label="Protección" sub="Break-even como parte del sistema." /><StatCard icon="trophy" value="76%" label="Win rate febrero" sub="Mes destacado." /><StatCard icon="crown" value="VIP" label="Escalación" sub="Para mejores estudiantes." gold /></div>
        </div>
        <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"><div><p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">Panel interactivo</p><h3 className="mt-2 text-3xl font-black text-white">Resultados por mes</h3></div><div className="flex flex-wrap gap-3">{Object.keys(MONTHLY_RESULTS).map((month) => <button key={month} onClick={() => setSelected(month)} className={cn("rounded-2xl px-5 py-3 text-sm font-black uppercase tracking-[0.16em] transition", selected === month ? "bg-emerald-300 text-black shadow-[0_0_25px_rgba(52,255,130,.25)]" : "border border-white/10 bg-white/5 text-white/60 hover:border-emerald-300/40 hover:text-white")}>{month}</button>)}</div></div>
          <AnimatePresence mode="wait">
            <motion.div key={selected} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }} className="mt-8 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
              <div className="rounded-[1.7rem] border border-white/10 bg-black/45 p-6"><p className="text-sm font-black uppercase tracking-[0.2em] text-white/45">{data.title}</p><h4 className="mt-4 text-5xl font-black tracking-[-0.04em] text-white">+{data.profit}%</h4><p className="mt-3 text-white/65">{data.summary}</p><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/5 p-4"><p className="text-3xl font-black text-emerald-300">{data.trades}</p><p className="text-sm text-white/50">Trades totales</p></div><div className="rounded-2xl bg-white/5 p-4"><p className="text-3xl font-black text-emerald-300">{data.winRate}%</p><p className="text-sm text-white/50">Win rate</p></div><div className="rounded-2xl bg-white/5 p-4"><p className="text-3xl font-black text-white">{data.losses}</p><p className="text-sm text-white/50">Pérdidas</p></div><div className="rounded-2xl bg-white/5 p-4"><p className="text-3xl font-black text-white">{data.be}</p><p className="text-sm text-white/50">Break-even</p></div></div><ul className="mt-6 space-y-3">{data.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm leading-6 text-white/70"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />{bullet}</li>)}</ul></div>
              <div className="rounded-[1.7rem] border border-white/10 bg-black/45 p-6"><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={chart}><CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} /><XAxis dataKey="label" stroke="rgba(255,255,255,.45)" tickLine={false} axisLine={false} /><YAxis stroke="rgba(255,255,255,.35)" tickLine={false} axisLine={false} /><Tooltip cursor={{ fill: "rgba(255,255,255,.04)" }} contentStyle={{ background: "rgba(0,0,0,.88)", border: "1px solid rgba(60,255,126,.25)", borderRadius: "16px", color: "white" }} /><Bar dataKey="value" fill="#3cff7e" radius={[12, 12, 0, 0]} /></BarChart></ResponsiveContainer></div>{data.weeks && <div className="mt-6 grid gap-4 md:grid-cols-2">{data.weeks.map((week) => <div key={week.week} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="mb-3 font-black text-white">{week.week}</p><div className="space-y-2">{week.days.map((day) => <div key={`${week.week}-${day.day}`} className="flex items-center justify-between gap-3 rounded-xl bg-black/35 px-3 py-2 text-xs"><span className="text-white/55">{day.day}</span><span className={cn("font-black", day.type === "win" && "text-emerald-300", day.type === "loss" && "text-red-300", day.type === "be" && "text-yellow-200", day.type === "none" && "text-white/35")}>{day.result}</span></div>)}</div></div>)}</div>}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const items = useMemo(() => filter === "all" ? RESULT_GALLERY : RESULT_GALLERY.filter((item) => item.category === filter), [filter]);
  const totalRewards = RESULT_GALLERY.filter((item) => item.amount.includes("$")).length;

  return (
    <section id="galeria" className="relative overflow-hidden bg-[#030604] py-24 text-white">
      <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(60,255,126,.45)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><SectionBadge>Resultados verificados</SectionBadge><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl">Resultados reales de estudiantes y fondeos.</h2><p className="mt-6 text-lg leading-8 text-white/65">Explora recompensas procesadas, certificados, challenges aprobados y avances de estudiantes. Cada prueba está organizada por categoría y puede abrirse en grande para verla con más detalle.</p></div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3"><StatCard icon="eye" value={RESULT_GALLERY.length} label="Resultados publicados" sub="Rewards, certificados y challenges." /><StatCard icon="dollar" value={totalRewards} label="Rewards" sub="Pagos y recompensas." /><StatCard icon="crown" value="VIP" label="Escalación" sub="Mejores estudiantes." gold /></div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">{FILTERS.map((item) => <button key={item.id} onClick={() => setFilter(item.id)} className={cn("rounded-2xl px-5 py-3 text-sm font-black uppercase tracking-[0.16em] transition", filter === item.id ? "bg-emerald-300 text-black" : "border border-white/10 bg-white/5 text-white/60 hover:border-emerald-300/40 hover:text-white")}>{item.label}</button>)}</div>
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.button layout key={item.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35, delay: index * 0.03 }} onClick={() => setActive(item)} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 text-left shadow-xl shadow-black/25 backdrop-blur-xl transition hover:-translate-y-2 hover:border-emerald-300/40">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-black/40"><SafeImage src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" fallbackText={item.badge} fallbackClassName="h-full min-h-0" /><div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/80 backdrop-blur">{item.badge}</div></div>
                <div className="p-4"><p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">{item.title}</p><h3 className="mt-2 text-3xl font-black text-white">{item.amount}</h3><p className="mt-2 font-bold text-white/80">{item.student}</p><p className="mt-1 text-sm text-white/45">{item.date} · {item.meta}</p></div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl" onClick={() => setActive(null)}>
            <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }} className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#050806] p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">{active.badge}</p><h3 className="text-2xl font-black text-white">{active.amount} · {active.student}</h3></div><button onClick={() => setActive(null)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white hover:bg-white/10"><Icon name="x" /></button></div>
              <div className="max-h-[72vh] overflow-auto rounded-[1.5rem] bg-black"><SafeImage src={active.image} alt={active.title} className="mx-auto h-auto w-full object-contain" fallbackText="Imagen no encontrada en /public/images/resultados" fallbackClassName="min-h-[520px]" /></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProgramSection() {
  return (
    <section id="programa" className="relative overflow-hidden bg-black py-24 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(52,255,130,.08),transparent_32%,rgba(255,255,255,.04)_65%,transparent_100%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center"><SectionBadge>Qué incluye MTP Academy</SectionBadge><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl">Formación completa para operar con sistema y criterio.</h2><p className="mt-6 text-lg leading-8 text-white/65">La idea no es depender de señales. Es formar traders capaces de leer mercado, gestionar riesgo y ejecutar con disciplina.</p></div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{PROGRAM_MODULES.map((module, index) => <motion.div key={module.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.05 }} whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 shadow-xl shadow-black/25 backdrop-blur-xl"><div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-300/10 blur-2xl transition group-hover:bg-emerald-300/20" /><div className="relative flex items-center justify-between"><span className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">{module.number}</span><div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-emerald-300"><Icon name={module.icon} className="h-6 w-6" /></div></div><h3 className="relative mt-8 text-2xl font-black tracking-[-0.03em] text-white">{module.title}</h3><p className="relative mt-4 leading-7 text-white/62">{module.text}</p></motion.div>)}</div>
        <div className="mt-14 grid gap-5 lg:grid-cols-4">{MARKETS.map((market) => <div key={market.name} className="rounded-[2rem] border border-emerald-300/15 bg-black/35 p-6 backdrop-blur-xl"><Icon name={market.icon} className="h-8 w-8 text-emerald-300" /><h3 className="mt-5 text-2xl font-black text-white">{market.name}</h3><p className="mt-3 text-sm leading-6 text-white/58">{market.text}</p></div>)}</div>
      </div>
    </section>
  );
}

function MentorSection() {
  return (
    <section id="mentor" className="relative overflow-hidden bg-[#030604] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(52,255,130,.18),transparent_34%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
        <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"><div className="absolute -inset-5 rounded-[3rem] bg-emerald-300/15 blur-3xl" /><div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"><div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/15 to-white/[0.03]"><SafeImage src={SITE.assets.mentor} alt={`${SITE.mentor}, mentor de ${SITE.brand}`} className="h-full w-full object-cover opacity-90" fallbackText="Foto del mentor" fallbackClassName="h-full min-h-0" /></div></div></motion.div>
        <motion.div initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><SectionBadge>El mentor</SectionBadge><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl">{SITE.mentor}</h2><p className="mt-6 text-lg leading-8 text-white/68">Trader con 4 años de experiencia en los mercados financieros. Durante este camino ha desarrollado una estrategia propia, probada y optimizada en diferentes condiciones del mercado, basada en disciplina, análisis técnico, estructura operativa y gestión profesional del riesgo.</p><p className="mt-5 text-lg leading-8 text-white/68">Después de alcanzar consistencia y múltiples meses de 5 cifras, crea MTP Academy para formar traders que no dependan de la suerte, sino de un sistema, una mentalidad y una ejecución bien trabajada.</p><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-3xl font-black text-emerald-300">4+</p><p className="mt-1 text-sm text-white/55">años de experiencia</p></div><div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-3xl font-black text-emerald-300">5 cifras</p><p className="mt-1 text-sm text-white/55">meses alcanzados</p></div><div className="rounded-3xl border border-yellow-300/20 bg-yellow-300/[0.06] p-5"><p className="text-3xl font-black text-yellow-200">VIP</p><p className="mt-1 text-sm text-white/55">seguimiento avanzado</p></div></div></motion.div>
      </div>
    </section>
  );
}

function VIPSection() {
  return (
    <section id="vip" className="relative overflow-hidden bg-black py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,211,92,.20),transparent_35%),linear-gradient(180deg,#000_0%,#0b0902_100%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <div><SectionBadge tone="gold">{VIP_PROGRAM.eyebrow}</SectionBadge><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl"><span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-400 bg-clip-text text-transparent">{VIP_PROGRAM.name}</span></h2><h3 className="mt-5 text-3xl font-black leading-tight text-white">{VIP_PROGRAM.headline}</h3><p className="mt-6 text-lg leading-8 text-white/65">{VIP_PROGRAM.description}</p><div className="mt-8 flex flex-col gap-4 sm:flex-row"><GlowButton href="#aplicar" variant="gold">Aplicar al proceso</GlowButton><GlowButton href="#galeria" variant="secondary">Ver resultados</GlowButton></div></div>
          <div className="grid gap-5 md:grid-cols-2"><div className="rounded-[2rem] border border-yellow-300/20 bg-yellow-300/[0.07] p-7 backdrop-blur-xl"><div className="mb-5 flex items-center gap-3"><div className="rounded-2xl bg-yellow-300 p-3 text-black"><Icon name="lock" /></div><h3 className="text-2xl font-black">Requisitos</h3></div><div className="space-y-4">{VIP_PROGRAM.requirements.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-white/70"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-yellow-200" />{item}</div>)}</div></div><div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl"><div className="mb-5 flex items-center gap-3"><div className="rounded-2xl bg-emerald-300 p-3 text-black"><Icon name="crown" /></div><h3 className="text-2xl font-black">Beneficios</h3></div><div className="space-y-4">{VIP_PROGRAM.benefits.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-white/70"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />{item}</div>)}</div></div></div>
        </div>
      </div>
    </section>
  );
}

function ApplySection() {
  const features = ["Formación estructurada desde fundamentos hasta ejecución.", "Estrategia para XAUUSD, BTC, US30 y EURUSD.", "Psicotrading, control emocional y rutina operativa.", "Gestión de capital y reglas para proteger la cuenta.", "Seguimiento de resultados, evidencias y operaciones.", "Ruta de escalación hacia MTP VIP para estudiantes destacados."];

  return (
    <section id="aplicar" className="relative overflow-hidden bg-[#030604] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(52,255,130,.2),transparent_35%),linear-gradient(180deg,#000_0%,#061008_100%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center"><SectionBadge>Aplicación privada</SectionBadge><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">No entres a otro grupo. Entra a un proceso.</h2><p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/68">MTP Academy está pensada para personas que quieren aprender trading con estructura seria, acompañamiento y mentalidad de largo plazo. La meta es construir criterio operativo.</p></div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[.95fr_1.05fr]"><div className="rounded-[2.4rem] border border-emerald-300/25 bg-emerald-300/[0.08] p-8 shadow-[0_0_50px_rgba(52,255,130,.12)] backdrop-blur-xl"><p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">Para quién es</p><h3 className="mt-4 text-3xl font-black text-white">Personas listas para operar con reglas.</h3><div className="mt-7 space-y-4">{features.map((feature) => <div key={feature} className="flex gap-3"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><p className="leading-7 text-white/68">{feature}</p></div>)}</div></div><div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.25em] text-white/45">{SITE.brand}</p><h3 className="mt-3 text-4xl font-black text-white">Primera llamada</h3></div><div className="rounded-3xl bg-emerald-300 p-4 text-black"><Icon name="lock" className="h-8 w-8" /></div></div><p className="mt-6 leading-8 text-white/65">Agenda una revisión para conocer tu nivel, tus objetivos y si el programa se ajusta a tu etapa actual. El trading tiene riesgo, por eso el enfoque debe ser educativo, disciplinado y responsable.</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-black/35 p-5"><Icon name="star" className="h-6 w-6 text-emerald-300" /><p className="mt-4 text-sm font-bold text-white">Evaluación de perfil</p><p className="mt-2 text-sm leading-6 text-white/50">Nivel, experiencia y expectativas reales.</p></div><div className="rounded-2xl bg-black/35 p-5"><Icon name="crown" className="h-6 w-6 text-yellow-200" /><p className="mt-4 text-sm font-bold text-white">Ruta Academy → VIP</p><p className="mt-2 text-sm leading-6 text-white/50">Formación base y posible escalación avanzada.</p></div></div><div className="mt-8 flex flex-col gap-4 sm:flex-row"><GlowButton href={SITE.applicationUrl}>Aplicar en {SITE.domain}</GlowButton><GlowButton href="#vip" variant="secondary">Conocer VIP</GlowButton></div></div></div>
        <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-yellow-300/20 bg-yellow-300/[0.06] p-5 text-sm leading-7 text-yellow-50/70"><strong className="text-yellow-100">Aviso importante:</strong> el trading implica riesgo y no garantiza ganancias. Los resultados pasados, certificaciones o retiros de estudiantes no aseguran resultados futuros. Esta página debe usarse con enfoque educativo y con información verificable.</div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-10 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="text-lg font-black uppercase tracking-[0.25em]">{SITE.brand}</p><p className="mt-2 text-sm text-white/45">{SITE.domain} · {SITE.instagram}</p></div><p className="max-w-xl text-sm leading-6 text-white/45">Formación educativa en trading. No constituye asesoría financiera, recomendación de inversión ni promesa de rentabilidad.</p></div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="min-h-screen scroll-smooth bg-black font-sans selection:bg-emerald-300 selection:text-black">
      <Navbar />
      <Hero />
      <ResultsSection />
      <GallerySection />
      <ProgramSection />
      <MentorSection />
      <VIPSection />
      <ApplySection />
      <Footer />
    </main>
  );
}
