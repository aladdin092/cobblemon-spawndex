"use client";
import { Rarity } from "@/types";
import { RARITY_BG, RARITY_TEXT, RARITY_LABELS } from "@/utils";

interface Props {
  rarity: Rarity;
  size?: "sm" | "md";
}

export function RarityBadge({ rarity, size = "sm" }: Props) {
  return (
    <span
      style={{
        background: RARITY_BG[rarity],
        color: RARITY_TEXT[rarity],
        padding: size === "md" ? "4px 12px" : "2px 7px",
        borderRadius: "10px",
        fontSize: size === "md" ? "12px" : "10px",
        fontWeight: 700,
        fontFamily: "var(--font-display)",
        letterSpacing: "0.3px",
        display: "inline-block",
      }}
    >
      {RARITY_LABELS[rarity]}
    </span>
  );
}
