import type { ReactNode } from "react";

/* Hand-drawn SVG diagrams. Strokes and text use currentColor so they follow
   light/dark mode; the accent colour marks the part each diagram is about. */

type Variant = "compact" | "full";

function Defs({ p }: { p: string }) {
  return (
    <defs>
      <marker id={`${p}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
      </marker>
      <marker id={`${p}-b`} className="text-brand" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

function Box({
  x, y, w, h, lines, brand, dashed,
}: {
  x: number; y: number; w: number; h: number; lines: (string | [string, "bold" | "muted"])[]; brand?: boolean; dashed?: boolean;
}) {
  const start = y + h / 2 - ((lines.length - 1) * 15) / 2 + 4;
  return (
    <g className={brand ? "text-brand" : undefined}>
      <rect
        x={x} y={y} width={w} height={h} rx={8}
        fill="currentColor" fillOpacity={brand ? 0.08 : 0.04}
        stroke="currentColor" strokeOpacity={brand ? 0.85 : 0.35} strokeWidth={1.25}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      {lines.map((l, i) => {
        const [text, style] = typeof l === "string" ? [l, undefined] : l;
        return (
          <text
            key={i} x={x + w / 2} y={start + i * 15} textAnchor="middle" fontSize={12}
            fontWeight={style === "bold" ? 600 : 400}
            className={style === "muted" ? "text-muted-foreground" : "text-foreground"}
            fill="currentColor"
          >
            {text}
          </text>
        );
      })}
    </g>
  );
}

function Line({
  p, d, brand, both, dashed,
}: { p: string; d: string; brand?: boolean; both?: boolean; dashed?: boolean }) {
  const m = `url(#${p}-${brand ? "b" : "a"})`;
  return (
    <path
      d={d} fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeOpacity={brand ? 0.9 : 0.6} strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={m} markerStart={both ? m : undefined}
      className={brand ? "text-brand" : "text-foreground"}
    />
  );
}

function Label({ x, y, children, anchor = "middle", size = 11 }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; size?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill="currentColor" className="text-muted-foreground">
      {children}
    </text>
  );
}

const svgClass = "text-foreground h-auto w-full";

/* ---------- F13 Datastore: one search, two tenants ---------- */

const F13_CLAIM =
  "The same search run by users in two tenants. Access is checked in the API and enforced again inside the search engine, so each person only gets documents they are allowed to see.";

function F13Compact() {
  const p = "f13c";
  return (
    <svg viewBox="0 0 340 255" role="img" aria-label={F13_CLAIM} className={svgClass}>
      <Defs p={p} />
      <Box x={0} y={40} w={88} h={52} lines={["Tenant A", "user"]} />
      <Box x={0} y={163} w={88} h={52} lines={["Tenant B", "user"]} />
      <Line p={p} d="M88 66 H118" />
      <Line p={p} d="M88 189 H118" />
      <Box x={118} y={16} w={104} h={223} brand lines={[]} />
      <g className="text-brand">
        <text x={170} y={50} textAnchor="middle" fontSize={12} fontWeight={600} fill="currentColor">Checked twice</text>
      </g>
      <Box x={130} y={80} w={80} h={30} lines={["API"]} />
      <Box x={130} y={128} w={80} h={44} lines={["Search", "engine"]} />
      <Line p={p} d="M222 66 H252" brand />
      <Line p={p} d="M222 189 H252" brand />
      <Box x={252} y={40} w={88} h={52} lines={["A's own", "documents"]} />
      <Box x={252} y={163} w={88} h={52} lines={["B's own", "documents"]} />
    </svg>
  );
}

function F13Full() {
  const p = "f13f";
  return (
    <svg viewBox="0 0 720 330" role="img" aria-label={F13_CLAIM} className={svgClass}>
      <Defs p={p} />
      <Box x={0} y={40} w={120} h={70} lines={["User in", "Tenant A"]} />
      <Box x={0} y={220} w={120} h={70} lines={["User in", "Tenant B"]} />

      <Line p={p} d="M120 75 H190" />
      <Label x={155} y={67}>search</Label>
      <Line p={p} d="M120 255 H190" />
      <Label x={155} y={247}>search</Label>

      <Box x={190} y={20} w={140} h={290} lines={[]} />
      <text x={260} y={48} textAnchor="middle" fontSize={13} fontWeight={600} fill="currentColor">API</text>
      <Label x={260} y={66}>checks who is asking</Label>
      <Box x={196} y={115} w={128} h={28} lines={["Token valid (OIDC)"]} />
      <Box x={196} y={151} w={128} h={28} lines={["Role allowed (RBAC)"]} />
      <Box x={196} y={187} w={128} h={28} lines={["Tenant matches"]} />

      <Line p={p} d="M330 75 H400" brand />
      <Label x={365} y={67}>+ identity</Label>
      <Line p={p} d="M330 255 H400" brand />
      <Label x={365} y={247}>+ identity</Label>

      <Box x={400} y={20} w={140} h={290} brand lines={[]} />
      <g className="text-brand">
        <text x={470} y={48} textAnchor="middle" fontSize={13} fontWeight={600} fill="currentColor">Search engine</text>
      </g>
      <Label x={470} y={66}>enforces it again</Label>
      <text textAnchor="middle" fontSize={12} fill="currentColor">
        <tspan x={470} y={128}>Document-level</tspan>
        <tspan x={470} y={146}>security keeps only</tspan>
        <tspan x={470} y={164}>documents this user</tspan>
        <tspan x={470} y={182}>may see</tspan>
      </text>

      <Line p={p} d="M540 75 H600" brand />
      <Label x={570} y={67}>filtered</Label>
      <Line p={p} d="M540 255 H600" brand />
      <Label x={570} y={247}>filtered</Label>

      <Box x={600} y={40} w={120} h={70} lines={["Tenant A's", "documents only"]} />
      <Box x={600} y={220} w={120} h={70} lines={["Tenant B's", "documents only"]} />
    </svg>
  );
}

/* ---------- SanCopilot: where the model sits in the flow ---------- */

const SAN_CLAIM =
  "A question reaches the copilot from the web app or the Outlook add-in. It passes an access check and an input guardrail before the model sees it, and the model answers from the firm's documents with sources cited. Out-of-scope questions are declined politely.";

function SanCompact() {
  const p = "sanc";
  return (
    <svg viewBox="0 0 340 255" role="img" aria-label={SAN_CLAIM} className={svgClass}>
      <Defs p={p} />
      <Box x={20} y={8} w={300} h={40} lines={["Consultant's question"]} />
      <Line p={p} d="M170 48 V72" />
      <Box x={20} y={72} w={300} h={40} brand lines={["Access check + input guardrail"]} />
      <Line p={p} d="M170 112 V136" brand />
      <Box x={20} y={136} w={300} h={40} lines={["Claude searches the firm's documents"]} />
      <Line p={p} d="M170 176 V200" />
      <Box x={20} y={200} w={300} h={40} lines={["Answer, streamed, sources cited"]} />
    </svg>
  );
}

function SanFull() {
  const p = "sanf";
  return (
    <svg viewBox="0 52 656 200" role="img" aria-label={SAN_CLAIM} className={svgClass}>
      <Defs p={p} />
      <Box x={0} y={64} w={100} h={32} lines={["Web app"]} />
      <Box x={0} y={114} w={100} h={32} lines={["Outlook add-in"]} />
      <Line p={p} d="M100 80 H112 V105 H124" />
      <path d="M100 130 H112 V105" fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.5} className="text-foreground" />

      <Box x={124} y={75} w={100} h={60} brand lines={[["Access check", "bold"], ["(role-based)", "muted"]]} />
      <Line p={p} d="M224 105 H248" brand />
      <Box x={248} y={75} w={100} h={60} brand lines={[["Input guardrail", "bold"], ["(in scope?)", "muted"]]} />
      <Line p={p} d="M348 105 H372" />
      <Box x={372} y={60} w={140} h={90} lines={[["Reasoning loop", "bold"], "Claude on Bedrock", ["search, read, draft", "muted"]]} />
      <Line p={p} d="M512 105 H536" />
      <Box x={536} y={75} w={120} h={60} lines={[["Answer, streamed", "bold"], ["with sources cited", "muted"]]} />

      <Line p={p} d="M442 150 V200" both />
      <Label x={434} y={179} anchor="end">search</Label>
      <Box x={380} y={200} w={124} h={40} lines={["Firm documents", ["(Knowledge Base)", "muted"]]} />

      <Line p={p} d="M298 135 V200" brand dashed />
      <Label x={290} y={172} anchor="end">out of scope</Label>
      <Box x={233} y={200} w={130} h={40} dashed lines={["Declines politely,", ["suggests questions", "muted"]]} />
    </svg>
  );
}

const diagrams = {
  "f13-isolation": { compact: F13Compact, full: F13Full, caption: F13_CLAIM },
  "sancopilot-flow": { compact: SanCompact, full: SanFull, caption: SAN_CLAIM },
} as const;

export type DiagramName = keyof typeof diagrams;
export const diagramNames = Object.keys(diagrams) as [DiagramName, ...DiagramName[]];

export function Diagram({ name, variant }: { name: DiagramName; variant: Variant }) {
  const d = diagrams[name];
  const Svg = d[variant];
  if (variant === "compact") return <Svg />;
  return (
    <figure className="mt-8 rounded-lg border p-4 sm:p-6">
      <Svg />
      <figcaption className="text-muted-foreground mt-4 text-sm leading-relaxed">{d.caption}</figcaption>
    </figure>
  );
}
