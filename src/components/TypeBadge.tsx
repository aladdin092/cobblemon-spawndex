"use client";
import { PokemonType, TYPE_COLORS } from "@/utils";

interface Props {
  type: PokemonType;
  size?: "xs" | "sm" | "md";
}

export function TypeBadge({ type, size = "sm" }: Props) {
  const bg = TYPE_COLORS[type] ?? "#888";
  const px = size === "md" ? "10px 16px" : size === "xs" ? "1px 5px" : "2px 8px";
  const fs = size === "md" ? "13px" : size === "xs" ? "9px" : "11px";
  return (
    <span
      style={{
        background: bg,
        color: "#fff",
        padding: px,
        borderRadius: "20px",
        fontSize: fs,
        fontWeight: 700,
        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        display: "inline-block",
        lineHeight: 1.5,
      }}
    >
      {type}
    </span>
  );
}
