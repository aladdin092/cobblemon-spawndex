"use client";
import { useState, useEffect, useRef } from "react";
import { FilterState, Rarity, TimeOfDay, Weather, Dimension, PokemonType, Lang } from "@/types";
import { RARITY_LABELS, RARITY_BG, TIME_ICONS, WEATHER_ICONS, DIM_ICONS, TYPE_COLORS } from "@/utils";
import { TYPE_ICONS, TYPE_NAMES_FR } from "./TypeBadge";

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  lang: Lang;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

const RARITIES: Rarity[] = ["common", "uncommon", "rare", "ultra_rare", "legendary_rare"];
const TIMES: TimeOfDay[] = ["day", "night", "morning", "dawn", "any"];
const WEATHERS: Weather[] = ["clear", "rain", "snow", "thunderstorm", "fog"];
const DIMS: Dimension[] = ["overworld", "nether", "end"];
const TYPES: PokemonType[] = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];

const RARITY_TEXT: Record<Rarity, string> = {
  common: "#fff", uncommon: "#fff", rare: "#fff", ultra_rare: "#111", legendary_rare: "#fff",
};
const RARITY_LABELS_FR: Record<Rarity, string> = {
  common: "Commun", uncommon: "Peu commun", rare: "Rare",
  ultra_rare: "Ultra Rare", legendary_rare: "Légendaire",
};
const TIME_LABELS: Record<string, { fr: string; en: string }> = {
  day: { fr: "Jour", en: "Day" }, night: { fr: "Nuit", en: "Night" },
  morning: { fr: "Matin", en: "Morning" }, dawn: { fr: "Aube", en: "Dawn" },
  any: { fr: "Tous", en: "Any" },
};
const WEATHER_LABELS: Record<string, { fr: string; en: string }> = {
  clear: { fr: "Beau", en: "Clear" }, rain: { fr: "Pluie", en: "Rain" },
  snow: { fr: "Neige", en: "Snow" }, thunderstorm: { fr: "Orage", en: "Storm" },
  fog: { fr: "Brouillard", en: "Fog" },
};
const DIM_LABELS: Record<string, { fr: string; en: string }> = {
  overworld: { fr: "Overworld", en: "Overworld" },
  nether: { fr: "Nether", en: "Nether" },
  end: { fr: "End", en: "End" },
};

function Chip({ label, selected, onClick, selectedBg, selectedColor }: {
  label: string; selected: boolean; onClick: () => void;
  selectedBg?: string; selectedColor?: string;
}) {
  return (
    <button onClick={onClick} style={{
      padding: "4px 10px", borderRadius: 20,
      border: `1px solid ${selected ? (selectedBg ?? "var(--accent)") : "var(--border)"}`,
      background: selected ? (selectedBg ?? "var(--accent)") : "var(--bg3)",
      color: selected ? (selectedColor ?? "#fff") : "var(--text2)",
      fontSize: 12, fontWeight: 600, cursor: "pointer",
      whiteSpace: "nowrap", transition: "all 0.15s", fontFamily: "inherit",
    }}>
      {label}
    </button>
  );
}

function Section({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 10, marginBottom: 10 }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "4px 0", marginBottom: open ? 8 : 0,
      }}>
        <span style={{ fontSize: 11, color: "var(--text2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {title}
        </span>
        <span style={{ color: "var(--text2)", fontSize: 12, transition: "transform 0.2s", display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
      </button>
      {open && children}
    </div>
  );
}

function FilterContent({ filters, onChange, lang }: { filters: FilterState; onChange: (f: FilterState) => void; lang: Lang }) {
  const hasAny = filters.rarity.length || filters.time.length ||
    filters.weather.length || filters.dimension.length || filters.types.length;
  const clearAll = () => onChange({ ...filters, rarity: [], time: [], weather: [], dimension: [], types: [], typeMode: "or" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Types */}
      <Section title={lang === "fr" ? "Types" : "Types"} defaultOpen={true}>
        {filters.types.length >= 2 && (
          <div style={{ display: "flex", gap: 4, marginBottom: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "var(--text2)" }}>
              {lang === "fr" ? "Mode :" : "Mode:"}
            </span>
            {(["or", "and"] as const).map((mode) => (
              <button key={mode} onClick={() => onChange({ ...filters, typeMode: mode })} style={{
                padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: "pointer",
                border: `1px solid ${filters.typeMode === mode ? "var(--accent)" : "var(--border)"}`,
                background: filters.typeMode === mode ? "var(--accent)" : "var(--bg3)",
                color: filters.typeMode === mode ? "#fff" : "var(--text2)",
                transition: "all 0.15s",
              }}>
                {mode === "or" ? "OU" : "ET"}
              </button>
            ))}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {TYPES.map((t) => {
            const selected = filters.types.includes(t);
            const color = TYPE_COLORS[t];
            return (
              <button key={t} onClick={() => onChange({ ...filters, types: toggle(filters.types, t) })} style={{
                padding: "3px 9px 3px 6px", borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: "pointer",
                border: `1px solid ${selected ? color : "var(--border)"}`,
                background: selected ? color : "var(--bg3)",
                color: selected ? "#fff" : "var(--text2)",
                transition: "all 0.15s",
                display: "inline-flex", alignItems: "center", gap: 4,
                fontFamily: "inherit",
              }}>
                <span style={{
                  width: 13, height: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  color: selected ? "#fff" : "var(--text2)",
                  filter: selected ? "drop-shadow(0 1px 1px rgba(0,0,0,0.3))" : "none",
                  opacity: selected ? 1 : 0.5,
                }}>
                  {TYPE_ICONS[t]()}
                </span>
                {lang === "fr" ? TYPE_NAMES_FR[t] : t}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Rarity */}
      <Section title={lang === "fr" ? "Rareté" : "Rarity"} defaultOpen={false}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {RARITIES.map((r) => (
            <Chip key={r}
              label={lang === "fr" ? RARITY_LABELS_FR[r] : RARITY_LABELS[r]}
              selected={filters.rarity.includes(r)}
              selectedBg={RARITY_BG[r]} selectedColor={RARITY_TEXT[r]}
              onClick={() => onChange({ ...filters, rarity: toggle(filters.rarity, r) })}
            />
          ))}
        </div>
      </Section>

      {/* Time */}
      <Section title={lang === "fr" ? "Heure" : "Time"} defaultOpen={false}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {TIMES.map((t) => (
            <Chip key={t}
              label={`${TIME_ICONS[t] ?? ""} ${lang === "fr" ? TIME_LABELS[t]?.fr : TIME_LABELS[t]?.en}`}
              selected={filters.time.includes(t)}
              onClick={() => onChange({ ...filters, time: toggle(filters.time, t) })}
            />
          ))}
        </div>
      </Section>

      {/* Weather */}
      <Section title={lang === "fr" ? "Météo" : "Weather"} defaultOpen={false}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {WEATHERS.map((w) => (
            <Chip key={w}
              label={`${WEATHER_ICONS[w] ?? ""} ${lang === "fr" ? WEATHER_LABELS[w]?.fr : WEATHER_LABELS[w]?.en}`}
              selected={filters.weather.includes(w)}
              onClick={() => onChange({ ...filters, weather: toggle(filters.weather, w) })}
            />
          ))}
        </div>
      </Section>

      {/* Dimension */}
      <Section title={lang === "fr" ? "Dimension" : "Dimension"} defaultOpen={false}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {DIMS.map((d) => (
            <Chip key={d}
              label={`${DIM_ICONS[d] ?? ""} ${lang === "fr" ? DIM_LABELS[d]?.fr : DIM_LABELS[d]?.en}`}
              selected={filters.dimension.includes(d)}
              onClick={() => onChange({ ...filters, dimension: toggle(filters.dimension, d) })}
            />
          ))}
        </div>
      </Section>

      {hasAny ? (
        <button onClick={clearAll} style={{
          marginTop: 4, padding: "6px 12px", borderRadius: 8,
          background: "var(--bg3)", border: "1px solid var(--border)",
          color: "var(--text2)", fontSize: 12, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit", width: "100%",
        }}>
          ✕ {lang === "fr" ? "Effacer les filtres" : "Clear filters"}
        </button>
      ) : null}
    </div>
  );
}

export function FilterBar({ filters, onChange, lang, mobileOnly, desktopOnly }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasAny = !!(filters.rarity.length || filters.time.length ||
    filters.weather.length || filters.dimension.length || filters.types.length);
  const activeCount = Number(filters.rarity.length > 0) + Number(filters.time.length > 0) +
    Number(filters.weather.length > 0) + Number(filters.dimension.length > 0) + Number(filters.types.length > 0);

  const [collapsed, setCollapsed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const MIN_WIDTH = 210;
  const MAX_WIDTH = 520;

  // Toggle collapsed class on parent
  useEffect(() => {
    const parent = wrapperRef.current?.parentElement;
    if (parent) {
      if (collapsed) parent.classList.add("collapsed");
      else parent.classList.remove("collapsed");
    }
  }, [collapsed]);

  // Drag-to-resize handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const parent = wrapperRef.current?.parentElement;
    if (!parent || collapsed) return;

    const startX = e.clientX;
    const startWidth = parent.getBoundingClientRect().width;

    const onMouseMove = (ev: MouseEvent) => {
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + ev.clientX - startX));
      parent.style.width = newWidth + "px";
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  if (desktopOnly) {
    return (
      <div ref={wrapperRef} style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
        {/* Header avec titre + bouton collapse */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "14px 0" : "14px 14px 10px",
          borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}>
          {!collapsed && (
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
              {lang === "fr" ? "Filtres" : "Filters"}
              {hasAny && (
                <span style={{ fontSize: 10, background: "var(--accent)", color: "#fff", borderRadius: 10, padding: "1px 6px", fontWeight: 700 }}>
                  {activeCount}
                </span>
              )}
            </span>
          )}
          <button
            onClick={() => {
              const parent = wrapperRef.current?.parentElement;
              if (parent) {
                parent.classList.add("animating");
                setTimeout(() => parent.classList.remove("animating"), 280);
              }
              setCollapsed(!collapsed);
            }}
            title={collapsed ? (lang === "fr" ? "Agrandir" : "Expand") : (lang === "fr" ? "Réduire" : "Collapse")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text2)", display: "flex", alignItems: "center", justifyContent: "center",
              padding: 4, borderRadius: 6,
              transition: "all 0.15s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              {collapsed
                ? <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                : <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              }
            </svg>
          </button>
        </div>

        {/* Contenu selon état */}
        {collapsed ? (
          /* Mode rétracté : icônes de types actifs + tous les types en mini */
          <div style={{ padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, overflowY: "auto" }}>
            {TYPES.map((t) => {
              const selected = filters.types.includes(t);
              const color = TYPE_COLORS[t];
              return (
                <button
                  key={t}
                  onClick={() => onChange({ ...filters, types: toggle(filters.types, t) })}
                  title={lang === "fr" ? TYPE_NAMES_FR[t] : t}
                  style={{
                    width: 30, height: 30, borderRadius: "50%", border: "none", cursor: "pointer",
                    background: selected ? color : "var(--bg3)",
                    color: selected ? "#fff" : "var(--text2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                    flexShrink: 0,
                    opacity: selected ? 1 : 0.45,
                    outline: selected ? `2px solid ${color}` : "none",
                    outlineOffset: 2,
                  }}
                >
                  <span style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {TYPE_ICONS[t]()}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          /* Mode normal : tout le contenu */
          <div style={{ padding: "10px 14px 16px", overflowY: "auto", flex: 1 }}>
            <FilterContent filters={filters} onChange={onChange} lang={lang} />
          </div>
        )}
        {/* Drag handle on the right edge */}
        {!collapsed && (
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 5,
              height: "100%",
              cursor: "col-resize",
              zIndex: 10,
              background: "transparent",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          />
        )}
      </div>
    );
  }

  if (mobileOnly) {
    return (
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", background: "none", border: "none", cursor: "pointer", padding: "10px 16px",
        }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "var(--text)" }}>
            {lang === "fr" ? "Filtres" : "Filters"}
            {hasAny && (
              <span style={{ marginLeft: 8, fontSize: 11, background: "var(--accent)", color: "#fff", borderRadius: 10, padding: "1px 7px", fontWeight: 700 }}>
                {activeCount}
              </span>
            )}
          </span>
          <span style={{ color: "var(--text2)", transition: "transform 0.2s", display: "inline-block", transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
        </button>
        {mobileOpen && (
          <div style={{ padding: "0 16px 14px" }}>
            <FilterContent filters={filters} onChange={onChange} lang={lang} />
          </div>
        )}
      </div>
    );
  }

  return null;
}
