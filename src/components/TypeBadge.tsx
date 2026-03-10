"use client";
import { PokemonType } from "@/utils";
import { TYPE_COLORS } from "@/utils";

interface Props {
  type: PokemonType;
  size?: "xs" | "sm" | "md";
  lang?: "fr" | "en";
}

export const TYPE_NAMES_FR: Record<PokemonType, string> = {
  Normal: "Normal", Fire: "Feu", Water: "Eau", Electric: "Électrik",
  Grass: "Plante", Ice: "Glace", Fighting: "Combat", Poison: "Poison",
  Ground: "Sol", Flying: "Vol", Psychic: "Psy", Bug: "Insecte",
  Rock: "Roche", Ghost: "Spectre", Dragon: "Dragon", Dark: "Ténèbres",
  Steel: "Acier", Fairy: "Fée",
};

// Official Pokémon type symbols — based on official game icons
export const TYPE_ICONS: Record<PokemonType, React.ReactNode> = {

  // FIRE: flamme avec base arrondie
  Fire: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 1.5C9 1.5 7 5 7 7C7 7 5.5 6 5.5 4C5.5 4 3 6.5 3 9.5C3 13 5.6 16 9 16C12.4 16 15 13 15 9.5C15 6.5 12.5 4.5 12 4C12 4 12 6 10.5 7C10.5 7 11 4 9 1.5Z"/>
    </svg>
  ),

  // ICE: flocon de neige avec branches et embranchements
  Ice: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <line x1="9" y1="1.5" x2="9" y2="16.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="1.5" y1="9" x2="16.5" y2="9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15" y1="3" x2="3" y2="15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="9" y1="1.5" x2="6.5" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="1.5" x2="11.5" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="16.5" x2="6.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="16.5" x2="11.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1.5" y1="9" x2="4.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1.5" y1="9" x2="4.5" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16.5" y1="9" x2="13.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16.5" y1="9" x2="13.5" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  // GHOST: fantôme avec yeux
  Ghost: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M3.5 16V8C3.5 4.9 6 2.5 9 2.5C12 2.5 14.5 4.9 14.5 8V16L12.2 14.2L9 16L5.8 14.2Z"/>
      <circle cx="6.8" cy="8.5" r="1.4" fill="rgba(0,0,0,0.45)"/>
      <circle cx="11.2" cy="8.5" r="1.4" fill="rgba(0,0,0,0.45)"/>
    </svg>
  ),

  // GROUND: sol avec lignes de terrain + montagne
  Ground: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M2 12L6 6L9 9L12 5L16 12Z"/>
      <rect x="2" y="12.5" width="14" height="3.5" rx="1"/>
      <line x1="2" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  ),

  // FIGHTING: poing fermé avec jointures
  Fighting: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <rect x="4.5" y="5" width="2.5" height="3.5" rx="1.2"/>
      <rect x="7.3" y="4" width="2.5" height="4" rx="1.2"/>
      <rect x="10.1" y="5" width="2.5" height="3.5" rx="1.2"/>
      <rect x="4.5" y="8" width="8.5" height="5" rx="2"/>
      <rect x="2" y="9.5" width="4" height="2.5" rx="1.2"/>
    </svg>
  ),

  // NORMAL: cercle avec anneau
  Normal: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" strokeWidth="2.8"/>
      <circle cx="9" cy="9" r="2.8"/>
    </svg>
  ),

  // STEEL: bouclier / feuille d'acier
  Steel: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 2L15 5V10C15 13.5 12 16 9 16.5C6 16 3 13.5 3 10V5Z"/>
      <path d="M9 5L12.5 6.5V10C12.5 12.3 11 14 9 14.5C7 14 5.5 12.3 5.5 10V6.5Z" fill="rgba(0,0,0,0.2)"/>
    </svg>
  ),

  // POISON: deux bulles + éclaboussure
  Poison: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <circle cx="7" cy="6" r="3"/>
      <circle cx="12" cy="8" r="2"/>
      <ellipse cx="9" cy="14" rx="6" ry="2.5"/>
      <ellipse cx="9" cy="11.5" rx="2.5" ry="2"/>
    </svg>
  ),

  // GRASS: trois herbes / feuilles pointues
  Grass: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 15V9"/>
      <path d="M9 9C9 9 5 8 4 4C4 4 8 4 9 9Z"/>
      <path d="M9 11C9 11 13 10 14 6C14 6 10 6 9 11Z"/>
      <path d="M9 13C9 13 6 11 5.5 8C5.5 8 8.5 9 9 13Z" opacity="0.7"/>
      <line x1="9" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M9 9C9 9 5 8 4 4C4 4 8 4 9 9Z"/>
      <path d="M9 11C9 11 13 10 14 6C14 6 10 6 9 11Z"/>
    </svg>
  ),

  // FAIRY: fleur / étoile à 4 branches avec cercles
  Fairy: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <ellipse cx="9" cy="4.5" rx="2.5" ry="3.5"/>
      <ellipse cx="9" cy="13.5" rx="2.5" ry="3.5"/>
      <ellipse cx="4.5" cy="9" rx="3.5" ry="2.5"/>
      <ellipse cx="13.5" cy="9" rx="3.5" ry="2.5"/>
      <circle cx="9" cy="9" r="2.5"/>
    </svg>
  ),

  // DRAGON: tête de dragon / ailes stylisées
  Dragon: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 2C9 2 4 5 4 9C4 11 5 12.5 6.5 13.5L9 16L11.5 13.5C13 12.5 14 11 14 9C14 5 9 2 9 2Z"/>
      <path d="M2 6L5.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M16 6L12.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M9 7L9 12" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  // PSYCHIC: étoile à 8 branches style engrenage
  Psychic: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 1.5L10.5 6.5L15.5 5L12 9L15.5 13L10.5 11.5L9 16.5L7.5 11.5L2.5 13L6 9L2.5 5L7.5 6.5Z"/>
      <circle cx="9" cy="9" r="2" fill="rgba(0,0,0,0.2)"/>
    </svg>
  ),

  // ROCK: cristal / gem avec facettes
  Rock: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <polygon points="9,2 14,6 14,12 9,16 4,12 4,6"/>
      <polygon points="9,2 14,6 9,7 4,6" fill="rgba(0,0,0,0.15)"/>
      <polygon points="9,7 14,6 14,12 9,16" fill="rgba(0,0,0,0.1)"/>
    </svg>
  ),

  // ELECTRIC: éclair
  Electric: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M11.5 1.5L5.5 9.5H10L6.5 16.5L14.5 7H10Z"/>
    </svg>
  ),

  // WATER: goutte d'eau
  Water: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M9 1.5L14.5 10.5C14.5 13.8 12 16.5 9 16.5C6 16.5 3.5 13.8 3.5 10.5Z"/>
    </svg>
  ),

  // FLYING: oiseau stylisé / aile avec courbe
  Flying: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M2 10C2 10 5 5 9 5C13 5 16 8 16 8L9 7Z"/>
      <path d="M5 9.5C5 9.5 6.5 13.5 9 13.5C11.5 13.5 13 9.5 13 9.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),

  // BUG: insecte avec ailes et pattes
  Bug: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <ellipse cx="9" cy="11" rx="3.5" ry="4"/>
      <ellipse cx="9" cy="6.5" rx="2" ry="2"/>
      <path d="M6 8.5C4.5 7 2.5 7.5 2 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M12 8.5C13.5 7 15.5 7.5 16 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M5.5 11.5C4 11.5 2.5 12.5 2.5 14" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M12.5 11.5C14 11.5 15.5 12.5 15.5 14" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // DARK: lune + étoiles
  Dark: (
    <svg viewBox="0 0 18 18" fill="currentColor">
      <path d="M13 4C11 4 9.5 4.8 8.5 6C11 6.5 13 8.8 13 11.5C13 13.5 12 15.2 10.5 16.2C11.2 16.4 12 16.5 13 16.5C16 16.5 17.5 14 16.5 10.5C15.8 7.5 14.5 4 13 4Z"/>
      <circle cx="5" cy="5" r="1.5"/>
      <circle cx="2.5" cy="10" r="1.5"/>
      <circle cx="6" cy="14.5" r="1.5"/>
    </svg>
  ),

};

export function TypeBadge({ type, size = "sm", lang = "en" }: Props) {
  const bg = TYPE_COLORS[type] ?? "#888";
  const label = lang === "fr" ? TYPE_NAMES_FR[type] : type;
  const icon = TYPE_ICONS[type];

  const iconSize = size === "md" ? 17 : size === "xs" ? 11 : 13;
  const fs = size === "md" ? "13px" : size === "xs" ? "9px" : "11px";
  const gap = size === "xs" ? 2 : 4;

  const padT = size === "md" ? 6 : size === "xs" ? 2 : 3;
  const padB = size === "md" ? 6 : size === "xs" ? 2 : 3;
  const padL = size === "md" ? 8 : size === "xs" ? 4 : 6;
  const padR = size === "md" ? 12 : size === "xs" ? 6 : 9;

  return (
    <span style={{
      background: bg,
      color: "#fff",
      padding: `${padT}px ${padR}px ${padB}px ${padL}px`,
      borderRadius: "20px",
      fontSize: fs,
      fontWeight: 700,
      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
      display: "inline-flex",
      alignItems: "center",
      gap,
      lineHeight: 1,
    }}>
      <span style={{
        width: iconSize,
        height: iconSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))",
      }}>
        {icon}
      </span>
      {size !== "xs" && label}
    </span>
  );
}
