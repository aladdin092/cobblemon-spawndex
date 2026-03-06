"use client";
import { FilterState, Rarity, TimeOfDay, Weather, Dimension, Lang } from "@/types";
import { RARITY_LABELS, RARITY_BG, TIME_ICONS, WEATHER_ICONS, DIM_ICONS } from "@/utils";

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  lang: Lang;
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

const RARITIES:  Rarity[]    = ["common", "uncommon", "rare", "ultra_rare", "legendary_rare"];
const TIMES:     TimeOfDay[] = ["day", "night", "morning", "dawn", "any"];
const WEATHERS:  Weather[]   = ["clear", "rain", "snow", "thunderstorm", "fog"];
const DIMS:      Dimension[] = ["overworld", "nether", "end"];

const RARITY_LABELS_FR: Record<Rarity, string> = {
  common: "Commun", uncommon: "Peu commun", rare: "Rare",
  ultra_rare: "Ultra Rare", legendary_rare: "Légendaire",
};

const RARITY_SELECTED_TEXT: Record<Rarity, string> = {
  common: "#fff", uncommon: "#fff", rare: "#fff", ultra_rare: "#111", legendary_rare: "#fff",
};

const TIME_LABELS_FR: Record<string, string> = {
  any: "tout", day: "jour", night: "nuit", morning: "matin", dawn: "aube", dusk: "crépuscule",
};

const WEATHER_LABELS_FR: Record<string, string> = {
  clear: "soleil", rain: "pluie", snow: "neige", thunderstorm: "orage", fog: "brouillard",
};

const DIM_LABELS_FR: Record<string, string> = {
  overworld: "surface", nether: "nether", end: "end",
};

export function FilterBar({ filters, onChange, lang }: Props) {
  const hasAny = [filters.rarity, filters.time, filters.weather, filters.dimension].some((a) => a.length > 0);

  function Chip({
    label, selected, onClick, selBg, selColor,
  }: { label: string; selected: boolean; onClick: () => void; selBg?: string; selColor?: string }) {
    return (
      <button onClick={onClick} style={{
        padding: "3px 10px", borderRadius: "20px", cursor: "pointer",
        fontFamily: "inherit", fontSize: "12px", fontWeight: 600, transition: "all .15s", whiteSpace: "nowrap",
        border: `1px solid ${selected ? (selBg ?? "var(--accent)") : "var(--border)"}`,
        background: selected ? (selBg ?? "var(--accent)") : "var(--bg3)",
        color: selected ? (selColor ?? "#fff") : "var(--text2)",
      }}>
        {label}
      </button>
    );
  }

  return (
    <div className="filters-bar">
      <div className="filters-inner">

        {/* Rarity */}
        <div className="filter-group">
          <span className="filter-label">{lang === "fr" ? "Rareté" : "Rarity"}</span>
          <div className="filter-chips">
            {RARITIES.map((r) => (
              <Chip key={r}
                label={lang === "fr" ? RARITY_LABELS_FR[r] : RARITY_LABELS[r]}
                selected={filters.rarity.includes(r)}
                selBg={RARITY_BG[r]} selColor={RARITY_SELECTED_TEXT[r]}
                onClick={() => onChange({ ...filters, rarity: toggle(filters.rarity, r) })}
              />
            ))}
          </div>
        </div>

        <div className="divider-v" />

        {/* Time */}
        <div className="filter-group">
          <span className="filter-label">{lang === "fr" ? "Heure" : "Time"}</span>
          <div className="filter-chips">
            {TIMES.map((t) => (
              <Chip key={t}
                label={`${TIME_ICONS[t] ?? ""} ${lang === "fr" ? TIME_LABELS_FR[t] : t}`}
                selected={filters.time.includes(t)}
                onClick={() => onChange({ ...filters, time: toggle(filters.time, t) })}
              />
            ))}
          </div>
        </div>

        <div className="divider-v" />

        {/* Weather */}
        <div className="filter-group">
          <span className="filter-label">{lang === "fr" ? "Météo" : "Weather"}</span>
          <div className="filter-chips">
            {WEATHERS.map((w) => (
              <Chip key={w}
                label={`${WEATHER_ICONS[w] ?? ""} ${lang === "fr" ? WEATHER_LABELS_FR[w] : w}`}
                selected={filters.weather.includes(w)}
                onClick={() => onChange({ ...filters, weather: toggle(filters.weather, w) })}
              />
            ))}
          </div>
        </div>

        <div className="divider-v" />

        {/* Dimension */}
        <div className="filter-group">
          <span className="filter-label">{lang === "fr" ? "Dimension" : "Dimension"}</span>
          <div className="filter-chips">
            {DIMS.map((d) => (
              <Chip key={d}
                label={`${DIM_ICONS[d] ?? ""} ${lang === "fr" ? DIM_LABELS_FR[d] : d}`}
                selected={filters.dimension.includes(d)}
                onClick={() => onChange({ ...filters, dimension: toggle(filters.dimension, d) })}
              />
            ))}
          </div>
        </div>

        {hasAny && (
          <button className="btn btn-sm"
            onClick={() => onChange({ ...filters, rarity: [], time: [], weather: [], dimension: [] })}>
            ✕ {lang === "fr" ? "Effacer" : "Clear"}
          </button>
        )}
      </div>
    </div>
  );
}