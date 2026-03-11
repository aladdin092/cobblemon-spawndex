module.exports = [
"[project]/cobblemon-dex/src/utils/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DIM_ICONS",
    ()=>DIM_ICONS,
    "RARITY_BG",
    ()=>RARITY_BG,
    "RARITY_LABELS",
    ()=>RARITY_LABELS,
    "RARITY_ORDER",
    ()=>RARITY_ORDER,
    "RARITY_TEXT",
    ()=>RARITY_TEXT,
    "TIME_ICONS",
    ()=>TIME_ICONS,
    "TYPE_COLORS",
    ()=>TYPE_COLORS,
    "WEATHER_ICONS",
    ()=>WEATHER_ICONS,
    "fetchAllPokemon",
    ()=>fetchAllPokemon,
    "generateCaptureGuide",
    ()=>generateCaptureGuide,
    "getAllBiomes",
    ()=>getAllBiomes,
    "getBestSpawnRate",
    ()=>getBestSpawnRate,
    "getHighestRarity",
    ()=>getHighestRarity,
    "statColor",
    ()=>statColor
]);
const RARITY_ORDER = {
    common: 1,
    uncommon: 2,
    rare: 3,
    ultra_rare: 4,
    legendary_rare: 5
};
const RARITY_LABELS = {
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    ultra_rare: "Ultra Rare",
    legendary_rare: "Legendary"
};
const RARITY_BG = {
    common: "#78c850",
    uncommon: "#a890f0",
    rare: "#4890d0",
    ultra_rare: "#f8d030",
    legendary_rare: "#ff7330"
};
const RARITY_TEXT = {
    common: "#fff",
    uncommon: "#fff",
    rare: "#fff",
    ultra_rare: "#111",
    legendary_rare: "#fff"
};
const TYPE_COLORS = {
    Normal: "#A8A878",
    Fire: "#F08030",
    Water: "#6890F0",
    Electric: "#F8D030",
    Grass: "#78C850",
    Ice: "#98D8D8",
    Fighting: "#C03028",
    Poison: "#A040A0",
    Ground: "#E0C068",
    Flying: "#A890F0",
    Psychic: "#F85888",
    Bug: "#A8B820",
    Rock: "#B8A038",
    Ghost: "#705898",
    Dragon: "#7038F8",
    Dark: "#705848",
    Steel: "#B8B8D0",
    Fairy: "#EE99AC"
};
const TIME_ICONS = {
    any: "🕐",
    day: "☀️",
    night: "🌙",
    morning: "🌅",
    dawn: "🌄",
    dusk: "🌆"
};
const WEATHER_ICONS = {
    any: "🌤",
    clear: "☀️",
    rain: "🌧️",
    snow: "❄️",
    thunderstorm: "⛈️",
    fog: "🌫️",
    wind: "💨"
};
const DIM_ICONS = {
    overworld: "🌿",
    nether: "🔥",
    end: "⭐"
};
function getHighestRarity(pokemon) {
    if (!pokemon.spawns.length) return "legendary_rare";
    return pokemon.spawns.reduce((highest, spawn)=>{
        return RARITY_ORDER[spawn.rarity] > RARITY_ORDER[highest] ? spawn.rarity : highest;
    }, pokemon.spawns[0].rarity);
}
function getBestSpawnRate(pokemon) {
    if (!pokemon.spawns.length) return 0;
    return Math.max(...pokemon.spawns.map((s)=>s.spawnRate));
}
function getAllBiomes(pokemon) {
    return [
        ...new Set(pokemon.spawns.flatMap((s)=>s.biomes))
    ];
}
function statColor(value) {
    if (value >= 100) return "#3fb950";
    if (value >= 70) return "#58a6ff";
    if (value >= 50) return "#f8d030";
    return "#ff7330";
}
function generateCaptureGuide(pokemon) {
    const r = getHighestRarity(pokemon);
    let g = `=== CAPTURE GUIDE: ${pokemon.name.toUpperCase()} ===\n\n`;
    g += `Types: ${pokemon.types.join(" / ")}\n`;
    g += `Rarity: ${RARITY_LABELS[r]}\n`;
    g += `Catch Rate: ${pokemon.catchRate}/255\n\n`;
    if (pokemon.spawns.length) {
        g += `SPAWN LOCATIONS:\n`;
        pokemon.spawns.forEach((s, i)=>{
            g += `\n[Spawn ${i + 1}]\n`;
            g += `• Biomes: ${s.biomes.join(", ")}\n`;
            g += `• Time: ${s.time}\n`;
            g += `• Weather: ${s.weather}\n`;
            g += `• Levels: ${s.minLevel}–${s.maxLevel}\n`;
            g += `• Dimension: ${s.dimension}\n`;
            if (s.structures.length) g += `• Structures: ${s.structures.join(", ")}\n`;
            g += `• ${s.conditions}\n`;
        });
    }
    g += `\nHUNT TIPS:\n`;
    pokemon.huntTips.forEach((t)=>g += `  ${t}\n`);
    if (pokemon.evolutions.length > 1) {
        g += `\nEVOLUTION CHAIN:\n`;
        pokemon.evolutions.forEach((e)=>{
            if (e.method !== "base") g += `  ${e.from} → ${e.to}: ${e.detail}\n`;
        });
    }
    g += `\nNotes: ${pokemon.notes}\n\n--- Cobblemon Spawn Dex ---`;
    return g;
}
async function fetchAllPokemon() {
    const res = await fetch("/data/pokemon.json");
    if (!res.ok) throw new Error("Failed to load pokemon.json");
    return res.json();
}
}),
"[project]/cobblemon-dex/src/components/TypeBadge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TYPE_ICONS",
    ()=>TYPE_ICONS,
    "TYPE_NAMES_FR",
    ()=>TYPE_NAMES_FR,
    "TypeBadge",
    ()=>TypeBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/utils/index.ts [app-ssr] (ecmascript)");
"use client";
;
;
const TYPE_NAMES_FR = {
    Normal: "Normal",
    Fire: "Feu",
    Water: "Eau",
    Electric: "Électrik",
    Grass: "Plante",
    Ice: "Glace",
    Fighting: "Combat",
    Poison: "Poison",
    Ground: "Sol",
    Flying: "Vol",
    Psychic: "Psy",
    Bug: "Insecte",
    Rock: "Roche",
    Ghost: "Spectre",
    Dragon: "Dragon",
    Dark: "Ténèbres",
    Steel: "Acier",
    Fairy: "Fée"
};
const TYPE_ICONS = {
    // FIRE: flamme avec base arrondie
    Fire: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 1.5C9 1.5 7 5 7 7C7 7 5.5 6 5.5 4C5.5 4 3 6.5 3 9.5C3 13 5.6 16 9 16C12.4 16 15 13 15 9.5C15 6.5 12.5 4.5 12 4C12 4 12 6 10.5 7C10.5 7 11 4 9 1.5Z"
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 24,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // ICE: flocon de neige avec branches et embranchements
    Ice: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "9",
                    y1: "1.5",
                    x2: "9",
                    y2: "16.5",
                    stroke: "currentColor",
                    strokeWidth: "2.2",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 32,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "1.5",
                    y1: "9",
                    x2: "16.5",
                    y2: "9",
                    stroke: "currentColor",
                    strokeWidth: "2.2",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 33,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "3",
                    y1: "3",
                    x2: "15",
                    y2: "15",
                    stroke: "currentColor",
                    strokeWidth: "2.2",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 34,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "15",
                    y1: "3",
                    x2: "3",
                    y2: "15",
                    stroke: "currentColor",
                    strokeWidth: "2.2",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 35,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "9",
                    y1: "1.5",
                    x2: "6.5",
                    y2: "4.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 36,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "9",
                    y1: "1.5",
                    x2: "11.5",
                    y2: "4.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 37,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "9",
                    y1: "16.5",
                    x2: "6.5",
                    y2: "13.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 38,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "9",
                    y1: "16.5",
                    x2: "11.5",
                    y2: "13.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 39,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "1.5",
                    y1: "9",
                    x2: "4.5",
                    y2: "6.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 40,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "1.5",
                    y1: "9",
                    x2: "4.5",
                    y2: "11.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 41,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "16.5",
                    y1: "9",
                    x2: "13.5",
                    y2: "6.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 42,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "16.5",
                    y1: "9",
                    x2: "13.5",
                    y2: "11.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 43,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 31,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // GHOST: fantôme avec yeux
    Ghost: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M3.5 16V8C3.5 4.9 6 2.5 9 2.5C12 2.5 14.5 4.9 14.5 8V16L12.2 14.2L9 16L5.8 14.2Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 50,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "6.8",
                    cy: "8.5",
                    r: "1.4",
                    fill: "rgba(0,0,0,0.45)"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 51,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "11.2",
                    cy: "8.5",
                    r: "1.4",
                    fill: "rgba(0,0,0,0.45)"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 52,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 49,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // GROUND: sol avec lignes de terrain + montagne
    Ground: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M2 12L6 6L9 9L12 5L16 12Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 59,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "12.5",
                    width: "14",
                    height: "3.5",
                    rx: "1"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 60,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "2",
                    y1: "11",
                    x2: "16",
                    y2: "11",
                    stroke: "currentColor",
                    strokeWidth: "1",
                    opacity: "0.3"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 61,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 58,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // FIGHTING: poing fermé avec jointures
    Fighting: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "4.5",
                    y: "5",
                    width: "2.5",
                    height: "3.5",
                    rx: "1.2"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 68,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "7.3",
                    y: "4",
                    width: "2.5",
                    height: "4",
                    rx: "1.2"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 69,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "10.1",
                    y: "5",
                    width: "2.5",
                    height: "3.5",
                    rx: "1.2"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 70,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "4.5",
                    y: "8",
                    width: "8.5",
                    height: "5",
                    rx: "2"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 71,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "9.5",
                    width: "4",
                    height: "2.5",
                    rx: "1.2"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 72,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 67,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // NORMAL: cercle avec anneau
    Normal: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "9",
                    cy: "9",
                    r: "7",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2.8"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 79,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "9",
                    cy: "9",
                    r: "2.8"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 80,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 78,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // STEEL: bouclier / feuille d'acier
    Steel: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 2L15 5V10C15 13.5 12 16 9 16.5C6 16 3 13.5 3 10V5Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 5L12.5 6.5V10C12.5 12.3 11 14 9 14.5C7 14 5.5 12.3 5.5 10V6.5Z",
                    fill: "rgba(0,0,0,0.2)"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 88,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // POISON: deux bulles + éclaboussure
    Poison: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "7",
                    cy: "6",
                    r: "3"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 95,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "12",
                    cy: "8",
                    r: "2"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 96,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "9",
                    cy: "14",
                    rx: "6",
                    ry: "2.5"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 97,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "9",
                    cy: "11.5",
                    rx: "2.5",
                    ry: "2"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 98,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 94,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // GRASS: trois herbes / feuilles pointues
    Grass: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 15V9"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 105,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 9C9 9 5 8 4 4C4 4 8 4 9 9Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 106,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 11C9 11 13 10 14 6C14 6 10 6 9 11Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 107,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 13C9 13 6 11 5.5 8C5.5 8 8.5 9 9 13Z",
                    opacity: "0.7"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 108,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "9",
                    y1: "9",
                    x2: "9",
                    y2: "15",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 109,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 9C9 9 5 8 4 4C4 4 8 4 9 9Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 110,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 11C9 11 13 10 14 6C14 6 10 6 9 11Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 111,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 104,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // FAIRY: fleur / étoile à 4 branches avec cercles
    Fairy: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "9",
                    cy: "4.5",
                    rx: "2.5",
                    ry: "3.5"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 118,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "9",
                    cy: "13.5",
                    rx: "2.5",
                    ry: "3.5"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 119,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "4.5",
                    cy: "9",
                    rx: "3.5",
                    ry: "2.5"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 120,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "13.5",
                    cy: "9",
                    rx: "3.5",
                    ry: "2.5"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 121,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "9",
                    cy: "9",
                    r: "2.5"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 122,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 117,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // DRAGON: tête de dragon / ailes stylisées
    Dragon: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 2C9 2 4 5 4 9C4 11 5 12.5 6.5 13.5L9 16L11.5 13.5C13 12.5 14 11 14 9C14 5 9 2 9 2Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 129,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M2 6L5.5 9.5",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 130,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16 6L12.5 9.5",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 131,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 7L9 12",
                    stroke: "rgba(0,0,0,0.25)",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 132,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 128,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // PSYCHIC: étoile à 8 branches style engrenage
    Psychic: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9 1.5L10.5 6.5L15.5 5L12 9L15.5 13L10.5 11.5L9 16.5L7.5 11.5L2.5 13L6 9L2.5 5L7.5 6.5Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 139,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "9",
                    cy: "9",
                    r: "2",
                    fill: "rgba(0,0,0,0.2)"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 140,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 138,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // ROCK: cristal / gem avec facettes
    Rock: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                    points: "9,2 14,6 14,12 9,16 4,12 4,6"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 147,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                    points: "9,2 14,6 9,7 4,6",
                    fill: "rgba(0,0,0,0.15)"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 148,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                    points: "9,7 14,6 14,12 9,16",
                    fill: "rgba(0,0,0,0.1)"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 149,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 146,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // ELECTRIC: éclair
    Electric: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M11.5 1.5L5.5 9.5H10L6.5 16.5L14.5 7H10Z"
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 155,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // WATER: goutte d'eau
    Water: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 1.5L14.5 10.5C14.5 13.8 12 16.5 9 16.5C6 16.5 3.5 13.8 3.5 10.5Z"
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 162,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // FLYING: oiseau stylisé / aile avec courbe
    Flying: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M2 10C2 10 5 5 9 5C13 5 16 8 16 8L9 7Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 170,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M5 9.5C5 9.5 6.5 13.5 9 13.5C11.5 13.5 13 9.5 13 9.5",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 171,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 169,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // BUG: insecte avec ailes et pattes
    Bug: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "9",
                    cy: "11",
                    rx: "3.5",
                    ry: "4"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 178,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "9",
                    cy: "6.5",
                    rx: "2",
                    ry: "2"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 179,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M6 8.5C4.5 7 2.5 7.5 2 6",
                    stroke: "currentColor",
                    strokeWidth: "1.8",
                    fill: "none",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 180,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12 8.5C13.5 7 15.5 7.5 16 6",
                    stroke: "currentColor",
                    strokeWidth: "1.8",
                    fill: "none",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 181,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M5.5 11.5C4 11.5 2.5 12.5 2.5 14",
                    stroke: "currentColor",
                    strokeWidth: "1.8",
                    fill: "none",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 182,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12.5 11.5C14 11.5 15.5 12.5 15.5 14",
                    stroke: "currentColor",
                    strokeWidth: "1.8",
                    fill: "none",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 183,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 177,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // DARK: lune + étoiles
    Dark: (size = 18)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 18 18",
            width: size,
            height: size,
            fill: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M13 4C11 4 9.5 4.8 8.5 6C11 6.5 13 8.8 13 11.5C13 13.5 12 15.2 10.5 16.2C11.2 16.4 12 16.5 13 16.5C16 16.5 17.5 14 16.5 10.5C15.8 7.5 14.5 4 13 4Z"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 190,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "5",
                    cy: "5",
                    r: "1.5"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 191,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "2.5",
                    cy: "10",
                    r: "1.5"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 192,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "6",
                    cy: "14.5",
                    r: "1.5"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                    lineNumber: 193,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
            lineNumber: 189,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
};
function TypeBadge({ type, size = "sm", lang = "en" }) {
    const bg = __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_COLORS"][type] ?? "#888";
    const label = lang === "fr" ? TYPE_NAMES_FR[type] : type;
    const icon = TYPE_ICONS[type];
    const iconSize = size === "md" ? 17 : size === "xs" ? 11 : 13;
    const fs = size === "md" ? "13px" : size === "xs" ? "9px" : "11px";
    const gap = size === "xs" ? 2 : 4;
    const padT = size === "md" ? 6 : size === "xs" ? 2 : 3;
    const padB = size === "md" ? 6 : size === "xs" ? 2 : 3;
    const padL = size === "md" ? 8 : size === "xs" ? 4 : 6;
    const padR = size === "md" ? 12 : size === "xs" ? 6 : 9;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
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
            lineHeight: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    width: iconSize,
                    height: iconSize,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))"
                },
                children: icon(iconSize)
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            size !== "xs" && label
        ]
    }, void 0, true, {
        fileName: "[project]/cobblemon-dex/src/components/TypeBadge.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
}),
"[project]/cobblemon-dex/src/components/RarityBadge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RarityBadge",
    ()=>RarityBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/utils/index.ts [app-ssr] (ecmascript)");
"use client";
;
;
function RarityBadge({ rarity, size = "sm" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RARITY_BG"][rarity],
            color: __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RARITY_TEXT"][rarity],
            padding: size === "md" ? "4px 12px" : "2px 7px",
            borderRadius: "10px",
            fontSize: size === "md" ? "12px" : "10px",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            letterSpacing: "0.3px",
            display: "inline-block"
        },
        children: __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RARITY_LABELS"][rarity]
    }, void 0, false, {
        fileName: "[project]/cobblemon-dex/src/components/RarityBadge.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/cobblemon-dex/src/components/PokemonCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PokemonCard",
    ()=>PokemonCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/TypeBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$RarityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/RarityBadge.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function PokemonCard({ pokemon, lang = "fr" }) {
    const rarity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHighestRarity"])(pokemon);
    const biomes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllBiomes"])(pokemon).slice(0, 1);
    const timeIcons = [
        ...new Set(pokemon.spawns.map((s)=>__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIME_ICONS"][s.time] ?? ""))
    ].join("");
    const weatherIcons = [
        ...new Set(pokemon.spawns.map((s)=>s.weather !== "any" ? __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEATHER_ICONS"][s.weather] ?? "" : "").filter(Boolean))
    ].join("");
    const dim = pokemon.spawns[0]?.dimension;
    const displayName = lang === "fr" ? pokemon.name_fr || pokemon.name_en || pokemon.name : pokemon.name_en || pokemon.name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `/pokemon/${pokemon.slug}`,
        className: "poke-card group",
        style: {
            textDecoration: "none",
            color: "inherit"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-image-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "card-num",
                        children: [
                            "#",
                            String(pokemon.id).padStart(4, "0")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            top: 8,
                            right: 10
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$RarityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RarityBadge"], {
                            rarity: rarity
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: pokemon.image,
                        alt: displayName,
                        width: 100,
                        height: 100,
                        className: "card-img",
                        unoptimized: true,
                        loading: "lazy",
                        onError: (e)=>{
                            e.currentTarget.src = pokemon.sprite;
                        }
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-name",
                        children: displayName
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "types-row",
                        children: pokemon.types.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TypeBadge"], {
                                type: t,
                                lang: lang
                            }, t, false, {
                                fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-meta",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                title: "Time",
                                children: timeIcons || "🕐"
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            weatherIcons && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                title: "Weather",
                                children: weatherIcons
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                                lineNumber: 75,
                                columnNumber: 28
                            }, this),
                            dim && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                title: "Dimension",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM_ICONS"][dim] ?? ""
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                                lineNumber: 76,
                                columnNumber: 19
                            }, this),
                            biomes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "card-biome",
                                children: [
                                    "📍 ",
                                    biomes[0]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "card-biome",
                                children: "📍 Form change"
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cobblemon-dex/src/components/PokemonCard.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/cobblemon-dex/src/components/FilterBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterBar",
    ()=>FilterBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/TypeBadge.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function toggle(arr, val) {
    return arr.includes(val) ? arr.filter((x)=>x !== val) : [
        ...arr,
        val
    ];
}
const RARITIES = [
    "common",
    "uncommon",
    "rare",
    "ultra_rare",
    "legendary_rare"
];
const TIMES = [
    "day",
    "night",
    "morning",
    "dawn",
    "any"
];
const WEATHERS = [
    "clear",
    "rain",
    "snow",
    "thunderstorm",
    "fog"
];
const DIMS = [
    "overworld",
    "nether",
    "end"
];
const TYPES = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy"
];
const RARITY_TEXT = {
    common: "#fff",
    uncommon: "#fff",
    rare: "#fff",
    ultra_rare: "#111",
    legendary_rare: "#fff"
};
const RARITY_LABELS_FR = {
    common: "Commun",
    uncommon: "Peu commun",
    rare: "Rare",
    ultra_rare: "Ultra Rare",
    legendary_rare: "Légendaire"
};
const TIME_LABELS = {
    day: {
        fr: "Jour",
        en: "Day"
    },
    night: {
        fr: "Nuit",
        en: "Night"
    },
    morning: {
        fr: "Matin",
        en: "Morning"
    },
    dawn: {
        fr: "Aube",
        en: "Dawn"
    },
    any: {
        fr: "Tous",
        en: "Any"
    }
};
const WEATHER_LABELS = {
    clear: {
        fr: "Beau",
        en: "Clear"
    },
    rain: {
        fr: "Pluie",
        en: "Rain"
    },
    snow: {
        fr: "Neige",
        en: "Snow"
    },
    thunderstorm: {
        fr: "Orage",
        en: "Storm"
    },
    fog: {
        fr: "Brouillard",
        en: "Fog"
    }
};
const DIM_LABELS = {
    overworld: {
        fr: "Overworld",
        en: "Overworld"
    },
    nether: {
        fr: "Nether",
        en: "Nether"
    },
    end: {
        fr: "End",
        en: "End"
    }
};
function Chip({ label, selected, onClick, selectedBg, selectedColor }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        style: {
            padding: "4px 10px",
            borderRadius: 20,
            border: `1px solid ${selected ? selectedBg ?? "var(--accent)" : "var(--border)"}`,
            background: selected ? selectedBg ?? "var(--accent)" : "var(--bg3)",
            color: selected ? selectedColor ?? "#fff" : "var(--text2)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.15s",
            fontFamily: "inherit"
        },
        children: label
    }, void 0, false, {
        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function Section({ title, children, defaultOpen = true }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultOpen);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            borderBottom: "1px solid var(--border)",
            paddingBottom: 10,
            marginBottom: 10
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 0",
                    marginBottom: open ? 8 : 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 11,
                            color: "var(--text2)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 0.5
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--text2)",
                            fontSize: 12,
                            transition: "transform 0.2s",
                            display: "inline-block",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)"
                        },
                        children: "▼"
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            open && children
        ]
    }, void 0, true, {
        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
function FilterContent({ filters, onChange, lang }) {
    const hasAny = filters.rarity.length || filters.time.length || filters.weather.length || filters.dimension.length || filters.types.length;
    const clearAll = ()=>onChange({
            ...filters,
            rarity: [],
            time: [],
            weather: [],
            dimension: [],
            types: [],
            typeMode: "or"
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                title: lang === "fr" ? "Types" : "Types",
                defaultOpen: true,
                children: [
                    filters.types.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 4,
                            marginBottom: 8,
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 11,
                                    color: "var(--text2)"
                                },
                                children: lang === "fr" ? "Mode :" : "Mode:"
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            [
                                "or",
                                "and"
                            ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onChange({
                                            ...filters,
                                            typeMode: mode
                                        }),
                                    style: {
                                        padding: "2px 10px",
                                        borderRadius: 20,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        border: `1px solid ${filters.typeMode === mode ? "var(--accent)" : "var(--border)"}`,
                                        background: filters.typeMode === mode ? "var(--accent)" : "var(--bg3)",
                                        color: filters.typeMode === mode ? "#fff" : "var(--text2)",
                                        transition: "all 0.15s"
                                    },
                                    children: mode === "or" ? "OU" : "ET"
                                }, mode, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 4
                        },
                        children: TYPES.map((t)=>{
                            const selected = filters.types.includes(t);
                            const color = __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_COLORS"][t];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onChange({
                                        ...filters,
                                        types: toggle(filters.types, t)
                                    }),
                                style: {
                                    padding: "3px 9px 3px 6px",
                                    borderRadius: 20,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    border: `1px solid ${selected ? color : "var(--border)"}`,
                                    background: selected ? color : "var(--bg3)",
                                    color: selected ? "#fff" : "var(--text2)",
                                    transition: "all 0.15s",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    fontFamily: "inherit"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: 13,
                                            height: 13,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                            color: selected ? "#fff" : "var(--text2)",
                                            filter: selected ? "drop-shadow(0 1px 1px rgba(0,0,0,0.3))" : "none",
                                            opacity: selected ? 1 : 0.5
                                        },
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_ICONS"][t](16)
                                    }, void 0, false, {
                                        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this),
                                    lang === "fr" ? __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_NAMES_FR"][t] : t
                                ]
                            }, t, true, {
                                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                title: lang === "fr" ? "Rareté" : "Rarity",
                defaultOpen: false,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4
                    },
                    children: RARITIES.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                            label: lang === "fr" ? RARITY_LABELS_FR[r] : __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RARITY_LABELS"][r],
                            selected: filters.rarity.includes(r),
                            selectedBg: __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RARITY_BG"][r],
                            selectedColor: RARITY_TEXT[r],
                            onClick: ()=>onChange({
                                    ...filters,
                                    rarity: toggle(filters.rarity, r)
                                })
                        }, r, false, {
                            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                            lineNumber: 147,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                title: lang === "fr" ? "Heure" : "Time",
                defaultOpen: false,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4
                    },
                    children: TIMES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                            label: `${__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIME_ICONS"][t] ?? ""} ${lang === "fr" ? TIME_LABELS[t]?.fr : TIME_LABELS[t]?.en}`,
                            selected: filters.time.includes(t),
                            onClick: ()=>onChange({
                                    ...filters,
                                    time: toggle(filters.time, t)
                                })
                        }, t, false, {
                            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                title: lang === "fr" ? "Météo" : "Weather",
                defaultOpen: false,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4
                    },
                    children: WEATHERS.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                            label: `${__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEATHER_ICONS"][w] ?? ""} ${lang === "fr" ? WEATHER_LABELS[w]?.fr : WEATHER_LABELS[w]?.en}`,
                            selected: filters.weather.includes(w),
                            onClick: ()=>onChange({
                                    ...filters,
                                    weather: toggle(filters.weather, w)
                                })
                        }, w, false, {
                            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 172,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                title: lang === "fr" ? "Dimension" : "Dimension",
                defaultOpen: false,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4
                    },
                    children: DIMS.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                            label: `${__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM_ICONS"][d] ?? ""} ${lang === "fr" ? DIM_LABELS[d]?.fr : DIM_LABELS[d]?.en}`,
                            selected: filters.dimension.includes(d),
                            onClick: ()=>onChange({
                                    ...filters,
                                    dimension: toggle(filters.dimension, d)
                                })
                        }, d, false, {
                            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            hasAny ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: clearAll,
                style: {
                    marginTop: 4,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "var(--bg3)",
                    border: "1px solid var(--border)",
                    color: "var(--text2)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    width: "100%"
                },
                children: [
                    "✕ ",
                    lang === "fr" ? "Effacer les filtres" : "Clear filters"
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                lineNumber: 197,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
function FilterBar({ filters, onChange, lang, mobileOnly, desktopOnly }) {
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasAny = !!(filters.rarity.length || filters.time.length || filters.weather.length || filters.dimension.length || filters.types.length);
    const activeCount = Number(filters.rarity.length > 0) + Number(filters.time.length > 0) + Number(filters.weather.length > 0) + Number(filters.dimension.length > 0) + Number(filters.types.length > 0);
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const wrapperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const MIN_WIDTH = 210;
    const MAX_WIDTH = 520;
    // Toggle collapsed class on parent
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const parent = wrapperRef.current?.parentElement;
        if (parent) {
            if (collapsed) parent.classList.add("collapsed");
            else parent.classList.remove("collapsed");
        }
    }, [
        collapsed
    ]);
    // Drag-to-resize handle
    const handleMouseDown = (e)=>{
        e.preventDefault();
        const parent = wrapperRef.current?.parentElement;
        if (!parent || collapsed) return;
        const startX = e.clientX;
        const startWidth = parent.getBoundingClientRect().width;
        const onMouseMove = (ev)=>{
            const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + ev.clientX - startX));
            parent.style.width = newWidth + "px";
        };
        const onMouseUp = ()=>{
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: wrapperRef,
            style: {
                display: "flex",
                flexDirection: "column",
                height: "100%",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: collapsed ? "center" : "space-between",
                        padding: collapsed ? "14px 0" : "14px 14px 10px",
                        borderBottom: "1px solid var(--border)",
                        flexShrink: 0
                    },
                    children: [
                        !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontWeight: 800,
                                fontSize: 14,
                                display: "flex",
                                alignItems: "center",
                                gap: 6
                            },
                            children: [
                                lang === "fr" ? "Filtres" : "Filters",
                                hasAny && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 10,
                                        background: "var(--accent)",
                                        color: "#fff",
                                        borderRadius: 10,
                                        padding: "1px 6px",
                                        fontWeight: 700
                                    },
                                    children: activeCount
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                    lineNumber: 272,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                            lineNumber: 269,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                const parent = wrapperRef.current?.parentElement;
                                if (parent) {
                                    parent.classList.add("animating");
                                    setTimeout(()=>parent.classList.remove("animating"), 280);
                                }
                                setCollapsed(!collapsed);
                            },
                            title: collapsed ? lang === "fr" ? "Agrandir" : "Expand" : lang === "fr" ? "Réduire" : "Collapse",
                            style: {
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--text2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 4,
                                borderRadius: 6,
                                transition: "all 0.15s"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 16 16",
                                fill: "currentColor",
                                children: collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M6 3L11 8L6 13",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                    lineNumber: 297,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M10 3L5 8L10 13",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                    lineNumber: 298,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                lineNumber: 295,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                            lineNumber: 278,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this),
                collapsed ? /* Mode rétracté : icônes de types actifs + tous les types en mini */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "10px 0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        overflowY: "auto"
                    },
                    children: TYPES.map((t)=>{
                        const selected = filters.types.includes(t);
                        const color = __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_COLORS"][t];
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onChange({
                                    ...filters,
                                    types: toggle(filters.types, t)
                                }),
                            title: lang === "fr" ? __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_NAMES_FR"][t] : t,
                            style: {
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                border: "none",
                                cursor: "pointer",
                                background: selected ? color : "var(--bg3)",
                                color: selected ? "#fff" : "var(--text2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.15s",
                                flexShrink: 0,
                                opacity: selected ? 1 : 0.45,
                                outline: selected ? `2px solid ${color}` : "none",
                                outlineOffset: 2
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 16,
                                    height: 16,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_ICONS"][t](16)
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                lineNumber: 328,
                                columnNumber: 19
                            }, this)
                        }, t, false, {
                            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                            lineNumber: 312,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 307,
                    columnNumber: 11
                }, this) : /* Mode normal : tout le contenu */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "10px 14px 16px",
                        overflowY: "auto",
                        flex: 1
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterContent, {
                        filters: filters,
                        onChange: onChange,
                        lang: lang
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                        lineNumber: 338,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 337,
                    columnNumber: 11
                }, this),
                !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onMouseDown: handleMouseDown,
                    style: {
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 5,
                        height: "100%",
                        cursor: "col-resize",
                        zIndex: 10,
                        background: "transparent",
                        transition: "background 0.15s"
                    },
                    onMouseEnter: (e)=>e.currentTarget.style.background = "var(--accent)",
                    onMouseLeave: (e)=>e.currentTarget.style.background = "transparent"
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 343,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
            lineNumber: 259,
            columnNumber: 7
        }, this);
    }
    if (mobileOnly) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: "var(--bg2)",
                borderBottom: "1px solid var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setMobileOpen(!mobileOpen),
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "10px 16px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontWeight: 800,
                                fontSize: 14,
                                color: "var(--text)"
                            },
                            children: [
                                lang === "fr" ? "Filtres" : "Filters",
                                hasAny && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        marginLeft: 8,
                                        fontSize: 11,
                                        background: "var(--accent)",
                                        color: "#fff",
                                        borderRadius: 10,
                                        padding: "1px 7px",
                                        fontWeight: 700
                                    },
                                    children: activeCount
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                                    lineNumber: 374,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                            lineNumber: 371,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: "var(--text2)",
                                transition: "transform 0.2s",
                                display: "inline-block",
                                transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)"
                            },
                            children: "▼"
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 367,
                    columnNumber: 9
                }, this),
                mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "0 16px 14px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterContent, {
                        filters: filters,
                        onChange: onChange,
                        lang: lang
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                        lineNumber: 383,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
                    lineNumber: 382,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/FilterBar.tsx",
            lineNumber: 366,
            columnNumber: 7
        }, this);
    }
    return null;
}
}),
"[project]/cobblemon-dex/src/components/TeamPlanner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamPlanner",
    ()=>TeamPlanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/TypeBadge.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const DIM_LABEL = {
    overworld: {
        fr: "Overworld",
        en: "Overworld",
        color: "#3fb950"
    },
    nether: {
        fr: "Nether",
        en: "Nether",
        color: "#ff7b4f"
    },
    end: {
        fr: "The End",
        en: "The End",
        color: "#b39ddb"
    }
};
function TeamPlanner({ allPokemon, lang = "en" }) {
    const [team, setTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        null,
        null,
        null,
        null,
        null,
        null
    ]);
    const [picking, setPicking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pickerSearch, setPickerSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("route");
    function getName(p) {
        return lang === "fr" ? p.name_fr || p.name_en || p.name : p.name_en || p.name;
    }
    function addToSlot(idx, p) {
        setTeam((t)=>{
            const n = [
                ...t
            ];
            n[idx] = p;
            return n;
        });
        setPicking(null);
        setPickerSearch("");
    }
    function removeFromSlot(idx) {
        setTeam((t)=>{
            const n = [
                ...t
            ];
            n[idx] = null;
            return n;
        });
    }
    const members = team.filter(Boolean);
    // Build optimized hunt route
    const { steps, missing } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!members.length) return {
            steps: [],
            missing: []
        };
        // For each biome, collect which pokemon spawn there + their conditions
        const biomeMap = {};
        members.forEach((p)=>{
            p.spawns?.forEach((s)=>{
                s.biomes.forEach((b)=>{
                    if (!biomeMap[b]) biomeMap[b] = [];
                    if (!biomeMap[b].find((x)=>x.p.slug === p.slug)) {
                        biomeMap[b].push({
                            p,
                            time: s.time,
                            weather: s.weather,
                            minLv: s.minLevel,
                            maxLv: s.maxLevel,
                            dimension: s.dimension
                        });
                    }
                });
            });
        });
        // Greedy algorithm: pick biomes that cover most uncovered pokemon first
        const covered = new Set();
        const steps = [];
        const allBiomes = Object.entries(biomeMap).sort((a, b)=>b[1].length - a[1].length);
        while(covered.size < members.length){
            // Find biome with most uncovered pokemon
            let best = null;
            let bestUncovered = 0;
            for (const [biome, entries] of allBiomes){
                const uncovered = entries.filter((e)=>!covered.has(e.p.slug)).length;
                if (uncovered > bestUncovered) {
                    bestUncovered = uncovered;
                    best = [
                        biome,
                        entries
                    ];
                }
            }
            if (!best || bestUncovered === 0) break;
            const [biome, entries] = best;
            entries.forEach((e)=>covered.add(e.p.slug));
            // Determine dominant dimension for this biome
            const dim = entries[0]?.dimension || "overworld";
            steps.push({
                biome,
                dimension: dim,
                pokemon: entries.map((e)=>({
                        p: e.p,
                        time: e.time,
                        weather: e.weather,
                        minLv: e.minLv,
                        maxLv: e.maxLv
                    })),
                score: entries.length
            });
        }
        // Missing = pokemon not found in any biome
        const missing = members.filter((p)=>!covered.has(p.slug));
        return {
            steps,
            missing
        };
    }, [
        members
    ]);
    // Picker filtered list
    const pickerList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!pickerSearch.trim()) return allPokemon;
        const q = pickerSearch.toLowerCase().trim().replace(/[-_''.]/g, " ");
        return allPokemon.filter((p)=>{
            const normalize = (s)=>s.toLowerCase().replace(/[-_''.]/g, " ");
            return normalize(p.name_en || "").includes(q) || normalize(p.name_fr || "").includes(q) || normalize(p.name || "").includes(q);
        });
    }, [
        allPokemon,
        pickerSearch
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "team-view",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "team-heading",
                children: [
                    "🗺️ ",
                    lang === "fr" ? "Planificateur d'équipe" : "Team Hunt Planner"
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "team-sub",
                children: lang === "fr" ? "Ajoute jusqu'à 6 Pokémon pour obtenir la route de chasse optimisée." : "Add up to 6 Pokémon to get the most optimized hunting route."
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "team-slots",
                children: team.map((p, i)=>p ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "team-slot filled",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "team-slot-remove",
                                onClick: ()=>removeFromSlot(i),
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: p.sprite,
                                alt: getName(p),
                                width: 64,
                                height: 64,
                                unoptimized: true,
                                onError: (e)=>{
                                    e.currentTarget.style.display = "none";
                                }
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                lineNumber: 141,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "team-slot-name",
                                children: getName(p)
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                lineNumber: 143,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 2,
                                    flexWrap: "wrap",
                                    justifyContent: "center"
                                },
                                children: p.types.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TypeBadge"], {
                                        type: t,
                                        size: "xs"
                                    }, t, false, {
                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                        lineNumber: 145,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                        lineNumber: 139,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "team-slot",
                        onClick: ()=>{
                            setPicking(i);
                            setPickerSearch("");
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 24,
                                    color: "var(--text2)"
                                },
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 11,
                                    color: "var(--text2)"
                                },
                                children: lang === "fr" ? "Ajouter" : "Add"
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                        lineNumber: 149,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            members.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 8,
                            margin: "20px 0 16px"
                        },
                        children: [
                            "route",
                            "missing"
                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab(t),
                                style: {
                                    padding: "6px 18px",
                                    borderRadius: 20,
                                    border: "1px solid",
                                    borderColor: tab === t ? "var(--accent)" : "var(--border)",
                                    background: tab === t ? "var(--accent)" : "var(--bg3)",
                                    color: tab === t ? "#fff" : "var(--text2)",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    cursor: "pointer",
                                    fontFamily: "var(--font-display)",
                                    transition: "all 0.15s"
                                },
                                children: t === "route" ? `🗺️ ${lang === "fr" ? "Route optimisée" : "Optimized Route"} (${steps.length})` : `❓ ${lang === "fr" ? "Introuvables" : "Not Found"} (${missing.length})`
                            }, t, false, {
                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this),
                    tab === "route" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "team-result",
                        children: steps.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: "var(--text2)",
                                textAlign: "center",
                                padding: 40
                            },
                            children: lang === "fr" ? "Aucun spawn trouvé pour cette équipe." : "No spawn data found for this team."
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                            lineNumber: 183,
                            columnNumber: 17
                        }, this) : steps.map((step, idx)=>{
                            const dimInfo = DIM_LABEL[step.dimension] || DIM_LABEL.overworld;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "var(--bg2)",
                                    border: "1px solid var(--border)",
                                    borderRadius: 12,
                                    marginBottom: 12,
                                    overflow: "hidden"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            padding: "12px 16px",
                                            background: "var(--bg3)",
                                            borderBottom: "1px solid var(--border)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: "50%",
                                                    background: "var(--accent)",
                                                    color: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontFamily: "var(--font-display)",
                                                    fontWeight: 800,
                                                    fontSize: 15,
                                                    flexShrink: 0
                                                },
                                                children: idx + 1
                                            }, void 0, false, {
                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                lineNumber: 202,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontFamily: "var(--font-display)",
                                                            fontWeight: 700,
                                                            fontSize: 16
                                                        },
                                                        children: [
                                                            "📍 ",
                                                            step.biome
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            gap: 8,
                                                            marginTop: 4,
                                                            flexWrap: "wrap"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 11,
                                                                padding: "1px 8px",
                                                                borderRadius: 10,
                                                                background: dimInfo.color + "22",
                                                                color: dimInfo.color,
                                                                fontWeight: 700,
                                                                border: `1px solid ${dimInfo.color}44`
                                                            },
                                                            children: [
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM_ICONS"][step.dimension],
                                                                " ",
                                                                lang === "fr" ? dimInfo.fr : dimInfo.en
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                lineNumber: 211,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "var(--font-display)",
                                                    fontWeight: 800,
                                                    fontSize: 20,
                                                    color: "var(--accent)"
                                                },
                                                children: [
                                                    step.score,
                                                    "/",
                                                    members.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                lineNumber: 225,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                        lineNumber: 195,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "12px 16px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8
                                        },
                                        children: step.pokemon.map(({ p, time, weather, minLv, maxLv })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12,
                                                    padding: "8px 12px",
                                                    background: "var(--bg3)",
                                                    borderRadius: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: p.sprite,
                                                        alt: getName(p),
                                                        width: 40,
                                                        height: 40,
                                                        unoptimized: true,
                                                        style: {
                                                            imageRendering: "pixelated"
                                                        },
                                                        onError: (e)=>{
                                                            e.currentTarget.style.display = "none";
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontWeight: 700,
                                                                    fontSize: 14
                                                                },
                                                                children: getName(p)
                                                            }, void 0, false, {
                                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                                lineNumber: 245,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    gap: 4,
                                                                    marginTop: 2
                                                                },
                                                                children: p.types.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TypeBadge"], {
                                                                        type: t,
                                                                        size: "xs"
                                                                    }, t, false, {
                                                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 53
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                                lineNumber: 246,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-end",
                                                            gap: 3
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: "var(--text2)"
                                                                },
                                                                children: [
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIME_ICONS"][time],
                                                                    " ",
                                                                    time === "any" ? lang === "fr" ? "Toute heure" : "Any time" : time
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                                lineNumber: 252,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: "var(--text2)"
                                                                },
                                                                children: [
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEATHER_ICONS"][weather],
                                                                    " ",
                                                                    weather === "any" ? lang === "fr" ? "N'importe" : "Any weather" : weather
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: "var(--text2)"
                                                                },
                                                                children: [
                                                                    "⚔️ Lv. ",
                                                                    minLv,
                                                                    "–",
                                                                    maxLv
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                                lineNumber: 258,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, p.slug, true, {
                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                lineNumber: 236,
                                                columnNumber: 27
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                        lineNumber: 234,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, step.biome, true, {
                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                lineNumber: 190,
                                columnNumber: 21
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                        lineNumber: 181,
                        columnNumber: 13
                    }, this),
                    tab === "missing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "team-result",
                        children: missing.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: "center",
                                padding: 40,
                                color: "var(--text2)"
                            },
                            children: [
                                "✅ ",
                                lang === "fr" ? "Tous les Pokémon sont trouvables !" : "All Pokémon are findable!"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                            lineNumber: 275,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: "var(--text2)",
                                        marginBottom: 8
                                    },
                                    children: lang === "fr" ? "Ces Pokémon n'ont pas de données de spawn — ils sont probablement obtenus par évolution ou échange." : "These Pokémon have no spawn data — they're likely obtained through evolution or trading."
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                    lineNumber: 280,
                                    columnNumber: 19
                                }, this),
                                missing.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            padding: "10px 16px",
                                            background: "var(--bg2)",
                                            border: "1px solid var(--border)",
                                            borderRadius: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: p.sprite,
                                                alt: getName(p),
                                                width: 40,
                                                height: 40,
                                                unoptimized: true,
                                                style: {
                                                    imageRendering: "pixelated"
                                                },
                                                onError: (e)=>{
                                                    e.currentTarget.style.display = "none";
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                lineNumber: 291,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: 700
                                                        },
                                                        children: getName(p)
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            gap: 4,
                                                            marginTop: 2
                                                        },
                                                        children: p.types.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TypeBadge"], {
                                                                type: t,
                                                                size: "xs"
                                                            }, t, false, {
                                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                                lineNumber: 297,
                                                                columnNumber: 47
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                lineNumber: 294,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 12,
                                                    color: "var(--text2)",
                                                    fontStyle: "italic"
                                                },
                                                children: lang === "fr" ? "Pas de spawn naturel" : "No natural spawn"
                                            }, void 0, false, {
                                                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                                lineNumber: 300,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, p.slug, true, {
                                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                        lineNumber: 286,
                                        columnNumber: 21
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                            lineNumber: 279,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                        lineNumber: 273,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true),
            members.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: "var(--text2)",
                    textAlign: "center",
                    padding: "40px 20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 48,
                            marginBottom: 12
                        },
                        children: "🗺️"
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "var(--font-display)",
                            fontSize: 18
                        },
                        children: lang === "fr" ? "Ajoute des Pokémon pour commencer" : "Add Pokémon to get started"
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                lineNumber: 314,
                columnNumber: 9
            }, this),
            picking !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "selector-modal",
                onClick: ()=>setPicking(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "selector-panel",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "var(--font-display)",
                                        fontWeight: 700,
                                        fontSize: 18
                                    },
                                    children: lang === "fr" ? "Choisir un Pokémon" : "Choose a Pokémon"
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-sm",
                                    onClick: ()=>setPicking(null),
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                            lineNumber: 326,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: pickerSearch,
                            onChange: (e)=>setPickerSearch(e.target.value),
                            placeholder: lang === "fr" ? "Chercher..." : "Search...",
                            autoFocus: true,
                            style: {
                                width: "100%",
                                padding: "8px 12px",
                                marginBottom: 10,
                                background: "var(--bg3)",
                                border: "1px solid var(--border)",
                                borderRadius: 8,
                                color: "var(--text)",
                                fontSize: 14,
                                fontFamily: "var(--font-body)",
                                outline: "none"
                            }
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "selector-grid",
                            children: pickerList.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "selector-item",
                                    onClick: ()=>addToSlot(picking, p),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: p.sprite,
                                            alt: getName(p),
                                            width: 50,
                                            height: 50,
                                            unoptimized: true,
                                            onError: (e)=>{
                                                e.currentTarget.style.display = "none";
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                            lineNumber: 349,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: getName(p)
                                        }, void 0, false, {
                                            fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                            lineNumber: 351,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, p.slug, true, {
                                    fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                                    lineNumber: 348,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                            lineNumber: 346,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                    lineNumber: 325,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
                lineNumber: 324,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cobblemon-dex/src/components/TeamPlanner.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
}),
"[project]/cobblemon-dex/src/components/ItemDex.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ItemDex",
    ()=>ItemDex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/TypeBadge.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function getItemImageUrls(itemName) {
    const pokeSlug = itemName.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
    // Minecraft items: lowercase with underscores (feather, raw_chicken, blaze_rod...)
    const mcSlug = itemName.toLowerCase().replace(/\s+/g, "_").replace(/'/g, "");
    return [
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokeSlug}.png`,
        `https://mcasset.cloud/1.21/assets/minecraft/textures/item/${mcSlug}.png`,
        `https://mcasset.cloud/1.20.1/assets/minecraft/textures/item/${mcSlug}.png`
    ];
}
function chanceToNum(chance) {
    if (!chance) return 0;
    const pct = chance.match(/^(\d+(?:\.\d+)?)%$/);
    if (pct) return parseFloat(pct[1]);
    if (chance.match(/^\d+-\d+$/)) return 100;
    return 0;
}
function chanceStyle(chance) {
    const n = chanceToNum(chance);
    if (chance.match(/^\d+-\d+$/) && !chance.includes("%")) return {
        color: "#58a6ff",
        bg: "rgba(88,166,255,0.15)"
    };
    if (n >= 25) return {
        color: "#3fb950",
        bg: "rgba(63,185,80,0.15)"
    };
    if (n >= 10) return {
        color: "#f8d030",
        bg: "rgba(248,208,48,0.15)"
    };
    if (n >= 5) return {
        color: "#ff9d00",
        bg: "rgba(255,157,0,0.15)"
    };
    return {
        color: "#ff7b7b",
        bg: "rgba(255,123,123,0.15)"
    };
}
function ItemImage({ name, size = 56 }) {
    const [idx, setIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const urls = getItemImageUrls(name);
    if (idx >= urls.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: size,
                height: size,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: size * 0.5
            },
            children: "🎒"
        }, void 0, false, {
            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: urls[idx],
        alt: name,
        width: size,
        height: size,
        style: {
            objectFit: "contain",
            imageRendering: "pixelated"
        },
        onError: ()=>setIdx((i)=>i + 1)
    }, void 0, false, {
        fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
function ItemDex({ allPokemon, lang }) {
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedItem, setSelectedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sortDroppers, setSortDroppers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("chance");
    const itemIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const index = {};
        for (const p of allPokemon){
            for (const d of p.drops || []){
                if (!d.item) continue;
                if (!index[d.item]) index[d.item] = [];
                index[d.item].push({
                    pokemon: p,
                    chance: d.chance,
                    minQty: d.minQty,
                    maxQty: d.maxQty,
                    conditions: d.conditions
                });
            }
        }
        return index;
    }, [
        allPokemon
    ]);
    const filteredItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const q = search.toLowerCase().trim();
        return Object.keys(itemIndex).filter((item)=>!q || item.toLowerCase().includes(q)).sort((a, b)=>itemIndex[b].length - itemIndex[a].length);
    }, [
        itemIndex,
        search
    ]);
    const droppers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedItem || !itemIndex[selectedItem]) return [];
        const list = [
            ...itemIndex[selectedItem]
        ];
        list.sort((a, b)=>{
            if (sortDroppers === "chance") return chanceToNum(b.chance) - chanceToNum(a.chance);
            if (sortDroppers === "dex") return a.pokemon.id - b.pokemon.id;
            const na = lang === "fr" ? a.pokemon.name_fr || a.pokemon.name_en : a.pokemon.name_en;
            const nb = lang === "fr" ? b.pokemon.name_fr || b.pokemon.name_en : b.pokemon.name_en;
            return na.localeCompare(nb);
        });
        return list;
    }, [
        selectedItem,
        itemIndex,
        sortDroppers,
        lang
    ]);
    // ── Detail view ──
    if (selectedItem) {
        const bestChance = droppers.length ? droppers.reduce((best, r)=>chanceToNum(r.chance) > chanceToNum(best.chance) ? r : best, droppers[0]) : null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "24px 28px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setSelectedItem(null),
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "var(--bg2)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "8px 16px",
                        cursor: "pointer",
                        color: "var(--text)",
                        fontSize: 14,
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        marginBottom: 28,
                        transition: "all 0.15s"
                    },
                    onMouseEnter: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                    onMouseLeave: (e)=>e.currentTarget.style.borderColor = "var(--border)",
                    children: [
                        "← ",
                        lang === "fr" ? "Tous les items" : "All items"
                    ]
                }, void 0, true, {
                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 24,
                        flexWrap: "wrap",
                        background: "var(--bg2)",
                        border: "1px solid var(--border)",
                        borderRadius: 20,
                        padding: "28px 32px",
                        marginBottom: 32
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 100,
                                height: 100,
                                flexShrink: 0,
                                background: "var(--bg3)",
                                borderRadius: 16,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemImage, {
                                name: selectedItem,
                                size: 76
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        color: "var(--text2)",
                                        fontFamily: "var(--font-display)",
                                        marginBottom: 4
                                    },
                                    children: lang === "fr" ? "Objet" : "Item"
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontFamily: "var(--font-display)",
                                        fontSize: 32,
                                        fontWeight: 800,
                                        margin: "0 0 12px"
                                    },
                                    children: selectedItem
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 16,
                                        flexWrap: "wrap"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 13,
                                                color: "var(--text2)"
                                            },
                                            children: [
                                                "🐾 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        color: "var(--text)"
                                                    },
                                                    children: droppers.length
                                                }, void 0, false, {
                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 20
                                                }, this),
                                                " Pokémon"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this),
                                        bestChance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 13,
                                                color: "var(--text2)"
                                            },
                                            children: [
                                                "⭐ ",
                                                lang === "fr" ? "Meilleure chance" : "Best chance",
                                                " :",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        color: chanceStyle(bestChance.chance).color
                                                    },
                                                    children: bestChance.chance
                                                }, void 0, false, {
                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                lang === "fr" ? "via" : "from",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        color: "var(--text)"
                                                    },
                                                    children: lang === "fr" ? bestChance.pokemon.name_fr || bestChance.pokemon.name_en : bestChance.pokemon.name_en
                                                }, void 0, false, {
                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                            lineNumber: 150,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 20,
                        flexWrap: "wrap"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 13,
                                color: "var(--text2)",
                                fontFamily: "var(--font-display)",
                                fontWeight: 700
                            },
                            children: lang === "fr" ? "TRIER :" : "SORT:"
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        [
                            "chance",
                            "dex",
                            "name"
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSortDroppers(s),
                                style: {
                                    padding: "5px 14px",
                                    borderRadius: 20,
                                    cursor: "pointer",
                                    border: `1px solid ${sortDroppers === s ? "var(--accent)" : "var(--border)"}`,
                                    background: sortDroppers === s ? "var(--accent)" : "var(--bg3)",
                                    color: sortDroppers === s ? "#fff" : "var(--text2)",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    fontFamily: "inherit",
                                    transition: "all 0.15s"
                                },
                                children: s === "chance" ? "Chance" : s === "dex" ? "№ Dex" : "A–Z"
                            }, s, false, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this),
                (()=>{
                    const grouped = {};
                    for (const r of droppers){
                        if (!grouped[r.pokemon.slug]) grouped[r.pokemon.slug] = [];
                        grouped[r.pokemon.slug].push(r);
                    }
                    const cleanCond = (cond)=>cond.replace(/biome:/gi, "").replace(/,\s*/g, ", ").trim();
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
                            gap: 14
                        },
                        children: Object.values(grouped).map((group)=>{
                            const r = group[0];
                            const displayName = lang === "fr" ? r.pokemon.name_fr || r.pokemon.name_en || r.pokemon.name : r.pokemon.name_en || r.pokemon.name;
                            const allSame = group.every((d)=>d.chance === r.chance);
                            const showVariants = group.length > 1 && !allSame;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/pokemon/${r.pokemon.slug}`,
                                style: {
                                    textDecoration: "none",
                                    color: "inherit"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 14,
                                        padding: "14px 16px",
                                        background: "var(--bg2)",
                                        border: `1px solid ${showVariants ? "rgba(248,208,48,0.25)" : "var(--border)"}`,
                                        borderRadius: 14,
                                        transition: "all 0.15s",
                                        cursor: "pointer"
                                    },
                                    onMouseEnter: (e)=>{
                                        const d = e.currentTarget;
                                        d.style.borderColor = "var(--accent)";
                                        d.style.transform = "translateY(-2px)";
                                        d.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
                                    },
                                    onMouseLeave: (e)=>{
                                        const d = e.currentTarget;
                                        d.style.borderColor = showVariants ? "rgba(248,208,48,0.25)" : "var(--border)";
                                        d.style.transform = "none";
                                        d.style.boxShadow = "none";
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 60,
                                                height: 60,
                                                flexShrink: 0,
                                                background: "var(--bg3)",
                                                borderRadius: 12,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: r.pokemon.sprite,
                                                alt: displayName,
                                                width: 52,
                                                height: 52,
                                                style: {
                                                    objectFit: "contain",
                                                    imageRendering: "pixelated"
                                                },
                                                onError: (e)=>{
                                                    e.currentTarget.style.display = "none";
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                lineNumber: 214,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                            lineNumber: 213,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                minWidth: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: "var(--text2)",
                                                        fontFamily: "var(--font-display)",
                                                        marginBottom: 2
                                                    },
                                                    children: [
                                                        "#",
                                                        String(r.pokemon.id).padStart(4, "0")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: "var(--font-display)",
                                                        fontWeight: 700,
                                                        fontSize: 14,
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        marginBottom: 4
                                                    },
                                                    children: displayName
                                                }, void 0, false, {
                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 3,
                                                        flexWrap: "wrap",
                                                        marginBottom: showVariants ? 8 : 0
                                                    },
                                                    children: r.pokemon.types.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TypeBadge"], {
                                                            type: t,
                                                            size: "xs",
                                                            lang: lang
                                                        }, t, false, {
                                                            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 53
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 25
                                                }, this),
                                                showVariants && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 5
                                                    },
                                                    children: group.map((drop, di)=>{
                                                        const { color, bg } = chanceStyle(drop.chance);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 8
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        padding: "3px 8px",
                                                                        borderRadius: 6,
                                                                        background: bg,
                                                                        border: `1px solid ${color}40`,
                                                                        fontFamily: "var(--font-display)",
                                                                        fontWeight: 800,
                                                                        fontSize: 12,
                                                                        color,
                                                                        minWidth: 44,
                                                                        textAlign: "center"
                                                                    },
                                                                    children: drop.chance
                                                                }, void 0, false, {
                                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                                    lineNumber: 237,
                                                                    columnNumber: 35
                                                                }, this),
                                                                drop.conditions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: "var(--text2)"
                                                                    },
                                                                    children: [
                                                                        "📍 ",
                                                                        cleanCond(drop.conditions)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                                    lineNumber: 241,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, di, true, {
                                                            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 33
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 27
                                                }, this),
                                                !showVariants && r.conditions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: "#f8d030",
                                                        marginTop: 3
                                                    },
                                                    children: [
                                                        "⚠️ ",
                                                        cleanCond(r.conditions)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                            lineNumber: 219,
                                            columnNumber: 23
                                        }, this),
                                        !showVariants && (()=>{
                                            const { color, bg } = chanceStyle(r.chance);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flexShrink: 0,
                                                    padding: "6px 10px",
                                                    borderRadius: 8,
                                                    background: bg,
                                                    border: `1px solid ${color}40`,
                                                    fontFamily: "var(--font-display)",
                                                    fontWeight: 800,
                                                    fontSize: 15,
                                                    color,
                                                    minWidth: 52,
                                                    textAlign: "center"
                                                },
                                                children: r.chance
                                            }, void 0, false, {
                                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                                lineNumber: 261,
                                                columnNumber: 27
                                            }, this);
                                        })()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                    lineNumber: 204,
                                    columnNumber: 21
                                }, this)
                            }, r.pokemon.slug, false, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 203,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                        lineNumber: 193,
                        columnNumber: 13
                    }, this);
                })()
            ]
        }, void 0, true, {
            fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this);
    }
    // ── Grid view ──
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "24px 28px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 28
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontFamily: "var(--font-display)",
                            fontSize: 26,
                            fontWeight: 800,
                            margin: "0 0 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: 10
                        },
                        children: [
                            "🎒 ",
                            lang === "fr" ? "Items Droppés" : "Item Drops",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 14,
                                    color: "var(--text2)",
                                    fontWeight: 400
                                },
                                children: [
                                    filteredItems.length,
                                    " items"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            maxWidth: 480
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    position: "absolute",
                                    left: 14,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    fontSize: 16,
                                    pointerEvents: "none"
                                },
                                children: "🔍"
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: search,
                                onChange: (e)=>setSearch(e.target.value),
                                placeholder: lang === "fr" ? "Rechercher un item..." : "Search an item...",
                                style: {
                                    width: "100%",
                                    padding: "12px 40px 12px 42px",
                                    background: "var(--bg2)",
                                    border: "2px solid var(--border)",
                                    borderRadius: 14,
                                    color: "var(--text)",
                                    fontSize: 15,
                                    fontFamily: "var(--font-body)",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                    boxSizing: "border-box"
                                },
                                onFocus: (e)=>e.target.style.borderColor = "var(--accent)",
                                onBlur: (e)=>e.target.style.borderColor = "var(--border)"
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSearch(""),
                                style: {
                                    position: "absolute",
                                    right: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    color: "var(--text2)",
                                    cursor: "pointer",
                                    fontSize: 20
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                lineNumber: 280,
                columnNumber: 7
            }, this),
            filteredItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "center",
                    padding: "80px 20px",
                    color: "var(--text2)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 56,
                            marginBottom: 16
                        },
                        children: "🔍"
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                        lineNumber: 312,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "var(--font-display)",
                            fontSize: 20
                        },
                        children: lang === "fr" ? "Aucun item trouvé" : "No items found"
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                        lineNumber: 313,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                lineNumber: 311,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 18
                },
                children: filteredItems.map((item)=>{
                    const count = itemIndex[item].length;
                    const bestDrop = itemIndex[item].reduce((best, r)=>chanceToNum(r.chance) > chanceToNum(best.chance) ? r : best, itemIndex[item][0]);
                    const { color } = chanceStyle(bestDrop.chance);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelectedItem(item),
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 10,
                            padding: "20px 14px 16px",
                            background: "var(--bg2)",
                            border: "1px solid var(--border)",
                            borderRadius: 16,
                            cursor: "pointer",
                            transition: "all 0.18s",
                            textAlign: "center",
                            position: "relative"
                        },
                        onMouseEnter: (e)=>{
                            const b = e.currentTarget;
                            b.style.borderColor = "var(--accent)";
                            b.style.transform = "translateY(-4px)";
                            b.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
                            b.style.background = "var(--bg3)";
                        },
                        onMouseLeave: (e)=>{
                            const b = e.currentTarget;
                            b.style.borderColor = "var(--border)";
                            b.style.transform = "none";
                            b.style.boxShadow = "none";
                            b.style.background = "var(--bg2)";
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    background: "var(--bg3)",
                                    border: "1px solid var(--border)",
                                    borderRadius: 20,
                                    padding: "2px 7px",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "var(--text2)",
                                    fontFamily: "var(--font-display)"
                                },
                                children: [
                                    "🐾 ",
                                    count
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 337,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 72,
                                    height: 72,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemImage, {
                                    name: item,
                                    size: 64
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                    lineNumber: 343,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 342,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    color: "var(--text)",
                                    lineHeight: 1.3,
                                    wordBreak: "break-word"
                                },
                                children: item
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 347,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color,
                                    fontFamily: "var(--font-display)"
                                },
                                children: [
                                    "↑ ",
                                    bestDrop.chance
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                                lineNumber: 352,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item, true, {
                        fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                        lineNumber: 326,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
                lineNumber: 318,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cobblemon-dex/src/components/ItemDex.tsx",
        lineNumber: 279,
        columnNumber: 5
    }, this);
}
}),
"[project]/cobblemon-dex/src/components/BiomeDex.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BiomeDex",
    ()=>BiomeDex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/TypeBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/utils/index.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const BIOME_DATA = [
    {
        name: "Arid",
        icon: "🏜️",
        dimension: "overworld",
        color: "#e8a838",
        description_fr: "Zones sèches et sablonneuses, savanes.",
        description_en: "Dry sandy areas and savannas.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Sandy biomes",
                    "All Savanna biomes"
                ]
            }
        ]
    },
    {
        name: "Badlands",
        icon: "🟤",
        dimension: "overworld",
        color: "#c8682a",
        description_fr: "Mesas rouges et terres arides colorées.",
        description_en: "Red mesas and colorful arid lands.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Badlands biomes"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Ashen Savanna",
                    "Red Oasis",
                    "Warped Mesa",
                    "White Mesa"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Danakil Desert"
                ]
            }
        ]
    },
    {
        name: "Beach",
        icon: "🏖️",
        dimension: "overworld",
        color: "#f8d030",
        description_fr: "Plages de sable au bord de l'océan.",
        description_en: "Sandy beaches along the ocean.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Beach biomes"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Guelta",
                    "Sand Dunes"
                ]
            }
        ]
    },
    {
        name: "Cave",
        icon: "🕳️",
        dimension: "overworld",
        color: "#5a5a7a",
        description_fr: "Grottes souterraines de tous types.",
        description_en: "Underground caves of all types.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Dripstone Caves",
                    "Lush Caves"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Andesite Caves",
                    "Desert Caves",
                    "Diorite Caves",
                    "Fungal Caves",
                    "Granite Caves",
                    "Infested Caves",
                    "Thermal Caves",
                    "Underground Jungle"
                ]
            }
        ]
    },
    {
        name: "Cold",
        icon: "🧊",
        dimension: "overworld",
        color: "#88ccee",
        description_fr: "Biomes froids : océans froids, taigas, toundras, pics.",
        description_en: "Cold biomes: cold oceans, taigas, tundras, peaks.",
        locations: [
            {
                mod: "Cobblemon",
                places: [
                    "All Cold Ocean biomes",
                    "All Freezing biomes",
                    "All Peak biomes",
                    "All Taiga biomes",
                    "All Tundra biomes"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "All BYG Cold biomes"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Berry Bog"
                ]
            }
        ]
    },
    {
        name: "Deep Dark",
        icon: "🌑",
        dimension: "overworld",
        color: "#1a1a2e",
        description_fr: "Les profondeurs obscures, domaine du Warden.",
        description_en: "The deep dark, domain of the Warden.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Deep Dark"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Crystal Caves",
                    "Deep Caves",
                    "Frostfire Caves",
                    "Mantle Caves",
                    "Tuff Caves"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Deep Dark Forest",
                    "Deep Dark Incursion"
                ]
            }
        ]
    },
    {
        name: "Desert",
        icon: "🌵",
        dimension: "overworld",
        color: "#f0c040",
        description_fr: "Déserts de sable chaud et sec.",
        description_en: "Hot dry sandy deserts.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Desert"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "All BYG desert biomes"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Ancient Sands",
                    "Desert Canyon",
                    "Desert Oasis",
                    "Desert Spires",
                    "Lush Desert",
                    "Red Oasis"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "All Wythers' desert biomes",
                    "Badlands Desert",
                    "Desert Island",
                    "Kwongan Heath",
                    "Outback Desert",
                    "Red Desert",
                    "Sandy Jungle"
                ]
            }
        ]
    },
    {
        name: "Floral",
        icon: "🌸",
        dimension: "overworld",
        color: "#ff9ec8",
        description_fr: "Biomes fleuris et colorés.",
        description_en: "Floral and colorful biomes.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Cherry Grove",
                    "Flower Forest",
                    "Meadow",
                    "Sunflower Plains"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "All BYG Floral biomes",
                    "Amaranth Fields",
                    "Rose Fields",
                    "Skyris Vale",
                    "Cherry Blossom Forest",
                    "Orchard"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Blooming Plateau",
                    "Blooming Valley",
                    "Lavender Forest",
                    "Lavender Valley",
                    "Sakura Grove",
                    "Sakura Valley"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Autumnal Flower Forest",
                    "Flowering Pantanal",
                    "Jacaranda Savanna",
                    "Sakura Forest",
                    "Spring Flower Fields"
                ]
            }
        ]
    },
    {
        name: "Forest",
        icon: "🌲",
        dimension: "overworld",
        color: "#3fb950",
        description_fr: "Forêts tempérées de tous types.",
        description_en: "Temperate forests of all types.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Forest biomes",
                    "Cherry Grove"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Alpha Islands",
                    "Blooming Valley",
                    "Forested Highlands",
                    "Lavender Forest",
                    "Mirage Isles",
                    "Sakura Grove",
                    "Temperate Highlands"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Birch Taiga",
                    "Boreal Forest Red",
                    "Boreal Forest Yellow",
                    "Subtropical Forest",
                    "Tangled Forest",
                    "Tropical Forest"
                ]
            }
        ]
    },
    {
        name: "Freezing",
        icon: "❄️",
        dimension: "overworld",
        color: "#b0e0ff",
        description_fr: "Biomes glaciaux extrêmes.",
        description_en: "Extreme frozen biomes.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Frozen River",
                    "Jagged Peaks",
                    "Snowy Beach",
                    "Snowy Plains",
                    "Snowy Slopes"
                ]
            },
            {
                mod: "Cobblemon",
                places: [
                    "All Frozen Ocean biomes",
                    "All Glacial biomes",
                    "All Snowy Forest biomes"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "All BYG Snowy biomes",
                    "Cardinal Tundra"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Emerald Peaks",
                    "Scarlet Mountains",
                    "Skylands Winter",
                    "Snowy Badlands"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Crimson Tundra",
                    "Frozen Island",
                    "Snowy Canyon",
                    "Snowy Peaks",
                    "Snowy Tundra"
                ]
            }
        ]
    },
    {
        name: "Freshwater",
        icon: "🏞️",
        dimension: "overworld",
        color: "#58a6ff",
        description_fr: "Rivières, marais et zones d'eau douce.",
        description_en: "Rivers, swamps and freshwater areas.",
        locations: [
            {
                mod: "Cobblemon",
                places: [
                    "All River biomes",
                    "All Swamp biomes"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Desert Lakes",
                    "Guelta",
                    "Tropical Forest River"
                ]
            }
        ]
    },
    {
        name: "Frozen Ocean",
        icon: "🧊",
        dimension: "overworld",
        color: "#a0d8ef",
        description_fr: "Océans gelés en surface.",
        description_en: "Frozen surface oceans.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Deep Frozen Ocean",
                    "Frozen Ocean"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Frozen Cliffs"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Deep Icy Ocean",
                    "Icy Ocean"
                ]
            }
        ]
    },
    {
        name: "Grassland",
        icon: "🌾",
        dimension: "overworld",
        color: "#78c850",
        description_fr: "Plaines et savanes ouvertes.",
        description_en: "Open plains and savannas.",
        locations: [
            {
                mod: "Cobblemon",
                places: [
                    "All Plains biomes",
                    "All Savanna biomes"
                ]
            }
        ]
    },
    {
        name: "Hills",
        icon: "⛰️",
        dimension: "overworld",
        color: "#a0a060",
        description_fr: "Collines et hautes terres.",
        description_en: "Hills and highlands.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Hills biomes"
                ]
            },
            {
                mod: "Cobblemon",
                places: [
                    "All Highlands biomes"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Blooming Valley",
                    "Forested Highlands",
                    "Lavender Valley",
                    "Lush Valley",
                    "Moonlight Valley",
                    "Sakura Valley",
                    "Temperate Highlands"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Autumnal Crags",
                    "Ayers Rock",
                    "Icy Crags",
                    "Taiga Crags",
                    "Windswept Jungle"
                ]
            }
        ]
    },
    {
        name: "Island",
        icon: "🏝️",
        dimension: "overworld",
        color: "#40c8a0",
        description_fr: "Îles isolées et champignons.",
        description_en: "Isolated islands and mushroom fields.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Mushroom Fields"
                ]
            },
            {
                mod: "Cobblemon",
                places: [
                    "All Tropical Island biomes"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "Lush Stacks"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Alpha Islands",
                    "Alpha Islands Winter",
                    "Mirage Isles"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Cold Island",
                    "Desert Island",
                    "Frigid Island",
                    "Frozen Island",
                    "Jungle Island",
                    "Mediterranean Island",
                    "Temperate Island",
                    "Tropical Island"
                ]
            }
        ]
    },
    {
        name: "Jungle",
        icon: "🌴",
        dimension: "overworld",
        color: "#00a040",
        description_fr: "Jungles denses et tropicales.",
        description_en: "Dense tropical jungles.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Jungle biomes"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Underground Jungle"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Dripleaf Swamp",
                    "Eucalyptus Deanei Forest",
                    "Highland Tropical Rainforest",
                    "Jungle Canyon",
                    "Subtropical Forest",
                    "Tropical Forest",
                    "Tropical Island",
                    "Tropical Rainforest"
                ]
            }
        ]
    },
    {
        name: "Lush",
        icon: "🌿",
        dimension: "overworld",
        color: "#50e878",
        description_fr: "Grottes luxuriantes et biomes verdoyants.",
        description_en: "Lush caves and verdant biomes.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Lush Caves"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "Lush Stacks"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Underground Jungle"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Lichenous Caves",
                    "Lush Dripstone Caves",
                    "Lush Shroom Caves"
                ]
            }
        ]
    },
    {
        name: "Magical",
        icon: "✨",
        dimension: "overworld",
        color: "#c070ff",
        description_fr: "Forêts sombres et biomes enchantés.",
        description_en: "Dark forests and enchanted biomes.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Dark Forest"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "All BYG Magical biomes",
                    "Skyris Vale"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "All Wythers' Dark Forest biomes",
                    "Lantern River",
                    "Mushroom Island",
                    "Snowy Thermal Taiga"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Amethyst Canyon",
                    "Amethyst Rainforest",
                    "Mirage Isles",
                    "Moonlight Grove",
                    "Moonlight Valley"
                ]
            }
        ]
    },
    {
        name: "Mountain",
        icon: "🏔️",
        dimension: "overworld",
        color: "#8888aa",
        description_fr: "Hautes montagnes et sommets.",
        description_en: "High mountains and summits.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Mountain biomes"
                ]
            },
            {
                mod: "Cobblemon",
                places: [
                    "All Hill biomes"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Stony Spires",
                    "Volcanic Peaks",
                    "Windswept Spires",
                    "Yosemite Cliffs"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Tibesti Mountains",
                    "Tropical Volcano",
                    "Tsingy Forest",
                    "Volcano"
                ]
            }
        ]
    },
    {
        name: "Ocean",
        icon: "🌊",
        dimension: "overworld",
        color: "#1560a0",
        description_fr: "Tous les océans et zones côtières.",
        description_en: "All oceans and coastal areas.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Ocean biomes"
                ]
            },
            {
                mod: "Cobblemon",
                places: [
                    "All Coast biomes",
                    "All Cold Ocean biomes",
                    "All Deep Ocean biomes",
                    "All Frozen Ocean biomes",
                    "All Lukewarm Ocean biomes",
                    "All Warm Ocean biomes"
                ]
            }
        ]
    },
    {
        name: "Plains",
        icon: "🌱",
        dimension: "overworld",
        color: "#90d050",
        description_fr: "Plaines ouvertes et prairies.",
        description_en: "Open plains and meadows.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Plains",
                    "Sunflower Plains"
                ]
            },
            {
                mod: "Cobblemon",
                places: [
                    "All Highlands biomes"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "All BYG Plains biomes"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Brushland",
                    "Steppe",
                    "Valley Clearing"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Berry Bog",
                    "Forest Edge",
                    "Spring Flower Fields",
                    "Tropical Grassland"
                ]
            }
        ]
    },
    {
        name: "River",
        icon: "🏞️",
        dimension: "overworld",
        color: "#4090f0",
        description_fr: "Rivières et cours d'eau.",
        description_en: "Rivers and waterways.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All River biomes"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Guelta",
                    "Tropical Forest River"
                ]
            }
        ]
    },
    {
        name: "Savanna",
        icon: "🌅",
        dimension: "overworld",
        color: "#d8a030",
        description_fr: "Savanes chaudes et sèches.",
        description_en: "Hot dry savannas.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Savanna biomes"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Arid Highlands",
                    "Ashen Savanna",
                    "Brushland",
                    "Desert Oasis",
                    "Fractured Savanna",
                    "Red Oasis",
                    "Savanna Badlands"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Granite Canyon",
                    "Tropical Forest Canyon",
                    "Tropical Forest"
                ]
            }
        ]
    },
    {
        name: "Sky",
        icon: "☁️",
        dimension: "overworld",
        color: "#c8e8ff",
        description_fr: "Îles célestes flottantes (Terralith).",
        description_en: "Floating sky islands (Terralith).",
        locations: [
            {
                mod: "Terralith",
                places: [
                    "Skylands Autumn",
                    "Skylands Spring",
                    "Skylands Summer",
                    "Skylands Winter"
                ]
            }
        ]
    },
    {
        name: "Snowy Forest",
        icon: "🌨️",
        dimension: "overworld",
        color: "#d0eeff",
        description_fr: "Forêts enneigées et taigas glacées.",
        description_en: "Snowy forests and icy taigas.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Grove",
                    "Snowy Taiga"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Alpha Islands Winter",
                    "Alpine Grove",
                    "Ice Marsh",
                    "Siberian Grove",
                    "Snowy Maple Forest",
                    "Snowy Shield",
                    "Wintry Forest",
                    "Wintry Lowlands"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Deep Snowy Taiga",
                    "Snowy Fen",
                    "Snowy Thermal Taiga"
                ]
            }
        ]
    },
    {
        name: "Spooky",
        icon: "🕸️",
        dimension: "overworld",
        color: "#6a0dad",
        description_fr: "Forêts sombres et inquiétantes.",
        description_en: "Dark and eerie forests.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Dark Forest"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "All BYG Spooky biomes",
                    "Ebony Woods"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "All Wythers' Dark Forest biomes",
                    "Ancient Taiga",
                    "Bayou",
                    "Tangled Forest"
                ]
            }
        ]
    },
    {
        name: "Swamp",
        icon: "🐊",
        dimension: "overworld",
        color: "#486830",
        description_fr: "Marécages et mangroves.",
        description_en: "Swamps and mangroves.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Mangrove Swamp",
                    "Swamp"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "All BYG Swamp biomes"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "All Wythers' Swamp biomes",
                    "Billabong",
                    "Orchid Swamp"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Ice Marsh"
                ]
            }
        ]
    },
    {
        name: "Taiga",
        icon: "🌲",
        dimension: "overworld",
        color: "#208040",
        description_fr: "Taigas boréales et forêts de conifères.",
        description_en: "Boreal taigas and conifer forests.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Taiga biomes",
                    "Grove"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Alpine Grove",
                    "Ice Marsh",
                    "Moonlight Grove",
                    "Moonlight Valley",
                    "Shield Clearing",
                    "Siberian Taiga",
                    "Snowy Maple Forest"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Ancient Taiga",
                    "Birch Taiga",
                    "Boreal Forest Red",
                    "Boreal Forest Yellow",
                    "Fen",
                    "Forested Highlands",
                    "Larch Taiga",
                    "Old Growth Taiga Crags",
                    "Temperate Rainforest",
                    "Thermal Taiga"
                ]
            }
        ]
    },
    {
        name: "Temperate",
        icon: "🍃",
        dimension: "overworld",
        color: "#60b840",
        description_fr: "Forêts et plaines tempérées.",
        description_en: "Temperate forests and plains.",
        locations: [
            {
                mod: "Cobblemon",
                places: [
                    "All Forest biomes",
                    "All Plains biomes"
                ]
            }
        ]
    },
    {
        name: "Tropical Island",
        icon: "🏝️",
        dimension: "overworld",
        color: "#20c8a0",
        description_fr: "Îles tropicales et plages chaudes.",
        description_en: "Tropical islands and warm beaches.",
        locations: [
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Tropical Beach",
                    "Tropical Island",
                    "Tropical Volcano"
                ]
            }
        ]
    },
    {
        name: "Tundra",
        icon: "🌬️",
        dimension: "overworld",
        color: "#a8d8e8",
        description_fr: "Toundras froides et désolées.",
        description_en: "Cold desolate tundras.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Ice Spikes",
                    "Snowy Plains"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "Cardinal Tundra"
                ]
            },
            {
                mod: "Terralith",
                places: [
                    "Cold Shrubland",
                    "Gravel Desert",
                    "Rocky Shrubland",
                    "Snowy Badlands",
                    "Yellowstone"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Crimson Tundra",
                    "Frigid Island",
                    "Ice Cap",
                    "Icy Crags",
                    "Snowy Tundra",
                    "Tundra"
                ]
            }
        ]
    },
    {
        name: "Volcanic",
        icon: "🌋",
        dimension: "overworld",
        color: "#ff4500",
        description_fr: "Zones volcaniques et cratères de lave.",
        description_en: "Volcanic zones and lava craters.",
        locations: [
            {
                mod: "Terralith",
                places: [
                    "Mantle Caves",
                    "Volcanic Crater",
                    "Volcanic Peaks"
                ]
            },
            {
                mod: "Wythers' Overhauled Overworld",
                places: [
                    "Icy Volcano",
                    "Tropical Volcano",
                    "Volcano",
                    "Volcanic Chamber",
                    "Volcanic Crater"
                ]
            }
        ]
    },
    {
        name: "Overworld",
        icon: "🌍",
        dimension: "overworld",
        color: "#4caf50",
        description_fr: "Tous les biomes de l'Overworld.",
        description_en: "All Overworld biomes.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All Overworld biomes"
                ]
            }
        ]
    },
    // NETHER
    {
        name: "Nether Basalt",
        icon: "🪨",
        dimension: "nether",
        color: "#808080",
        description_fr: "Deltas de basalte dans le Nether.",
        description_en: "Basalt deltas in the Nether.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Basalt Deltas"
                ]
            },
            {
                mod: "Cinderscapes",
                places: [
                    "Blackstone Shales"
                ]
            },
            {
                mod: "Incendium",
                places: [
                    "Ash Barrens",
                    "Volcanic Deltas",
                    "Withered Forest"
                ]
            }
        ]
    },
    {
        name: "Nether Crimson",
        icon: "🍄",
        dimension: "nether",
        color: "#cc2244",
        description_fr: "Forêts cramoisies du Nether.",
        description_en: "Crimson forests of the Nether.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Crimson Forest"
                ]
            },
            {
                mod: "BetterNether",
                places: [
                    "Crimson Glowing Woods",
                    "Crimson Pinewood",
                    "Nether Swampland"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "Crimson Gardens"
                ]
            },
            {
                mod: "Gardens of the Dead",
                places: [
                    "Whistling Woods"
                ]
            }
        ]
    },
    {
        name: "Nether Desert",
        icon: "💀",
        dimension: "nether",
        color: "#d4a050",
        description_fr: "Déserts de sable d'âme dans le Nether.",
        description_en: "Soul sand deserts in the Nether.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Soul Sand Valley"
                ]
            },
            {
                mod: "BetterNether",
                places: [
                    "Gravel Desert"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "Quartz Desert",
                    "Warped Desert"
                ]
            },
            {
                mod: "Incendium",
                places: [
                    "Infernal Dunes",
                    "Weeping Valley"
                ]
            }
        ]
    },
    {
        name: "Nether Fungus",
        icon: "🟣",
        dimension: "nether",
        color: "#7040a0",
        description_fr: "Forêts de champignons du Nether.",
        description_en: "Mushroom forests of the Nether.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Crimson Forest",
                    "Warped Forest"
                ]
            },
            {
                mod: "BetterNether",
                places: [
                    "Mushroom Forest",
                    "Old Fungiwoods",
                    "Old Warped Woods"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "Crimson Gardens",
                    "Embur Bog",
                    "Glowstone Garden",
                    "Wailing Garth"
                ]
            },
            {
                mod: "Cinderscapes",
                places: [
                    "Luminous Grove"
                ]
            }
        ]
    },
    {
        name: "Nether Overgrowth",
        icon: "🌱",
        dimension: "nether",
        color: "#388e3c",
        description_fr: "Zones verdoyantes rares dans le Nether.",
        description_en: "Rare green areas in the Nether.",
        locations: [
            {
                mod: "BetterNether",
                places: [
                    "Bone Reef",
                    "Nether Grasslands",
                    "Soul Plain",
                    "Sulfuric Bone Reef"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "Sythian Torrids"
                ]
            }
        ]
    },
    {
        name: "Nether Wasteland",
        icon: "🔥",
        dimension: "nether",
        color: "#ff4500",
        description_fr: "Les Déchets du Nether — biome principal.",
        description_en: "Nether Wastes — the main Nether biome.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Nether Wastes"
                ]
            },
            {
                mod: "BetterNether",
                places: [
                    "Magma Land",
                    "Poor Nether Grasslands"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "Brimstone Caverns",
                    "Magma Wastes"
                ]
            },
            {
                mod: "Cinderscapes",
                places: [
                    "Ashy Shoals",
                    "Quartz Cavern"
                ]
            },
            {
                mod: "Incendium",
                places: [
                    "Ash Barrens",
                    "Toxic Heap"
                ]
            }
        ]
    },
    {
        name: "Nether Warped",
        icon: "💠",
        dimension: "nether",
        color: "#00b8a9",
        description_fr: "Forêts déformées turquoise du Nether.",
        description_en: "Turquoise warped forests of the Nether.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "Warped Forest"
                ]
            },
            {
                mod: "BetterNether",
                places: [
                    "Nether Jungle",
                    "Old Warped Woods"
                ]
            },
            {
                mod: "Oh The Biomes You'll Go",
                places: [
                    "Wailing Garth",
                    "Warped Desert"
                ]
            }
        ]
    },
    // END
    {
        name: "End",
        icon: "⭐",
        dimension: "end",
        color: "#b39ddb",
        description_fr: "L'End — dimension finale.",
        description_en: "The End — final dimension.",
        locations: [
            {
                mod: "Vanilla Minecraft",
                places: [
                    "All End biomes"
                ]
            }
        ]
    }
];
const DIM_FILTER = [
    {
        key: "all",
        label_fr: "Tous",
        label_en: "All",
        icon: "🌐"
    },
    {
        key: "overworld",
        label_fr: "Overworld",
        label_en: "Overworld",
        icon: "🌍"
    },
    {
        key: "nether",
        label_fr: "Nether",
        label_en: "Nether",
        icon: "🔥"
    },
    {
        key: "end",
        label_fr: "End",
        label_en: "End",
        icon: "⭐"
    }
];
const MOD_COLORS = {
    "Vanilla Minecraft": "#3fb950",
    "Cobblemon": "#58a6ff",
    "Oh The Biomes You'll Go": "#f8a830",
    "Terralith": "#c070ff",
    "Wythers' Overhauled Overworld": "#ff7b4f",
    "BetterNether": "#ff4500",
    "Incendium": "#ff2020",
    "Cinderscapes": "#808080",
    "Oh The Biomes You'll Go (BYG)": "#f8a830",
    "Gardens of the Dead": "#208040"
};
function BiomeDex({ allPokemon, lang }) {
    const [selectedBiome, setSelectedBiome] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dimFilter, setDimFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    function getName(p) {
        return lang === "fr" ? p.name_fr || p.name_en || p.name : p.name_en || p.name;
    }
    // Filter biomes
    const filteredBiomes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return BIOME_DATA.filter((b)=>{
            if (dimFilter !== "all" && b.dimension !== dimFilter) return false;
            if (search.trim()) {
                const q = search.toLowerCase();
                return b.name.toLowerCase().includes(q) || b.description_fr.toLowerCase().includes(q) || b.description_en.toLowerCase().includes(q);
            }
            return true;
        });
    }, [
        dimFilter,
        search
    ]);
    // Pokemon that spawn in selected biome
    const biomePokemon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedBiome) return [];
        return allPokemon.filter((p)=>p.spawns?.some((s)=>s.biomes.some((b)=>b.toLowerCase() === selectedBiome.name.toLowerCase()))).map((p)=>{
            const spawn = p.spawns.find((s)=>s.biomes.some((b)=>b.toLowerCase() === selectedBiome.name.toLowerCase()));
            return {
                p,
                spawn
            };
        }).sort((a, b)=>{
            // Sort by rarity (rarest last)
            const rarityOrder = {
                common: 1,
                uncommon: 2,
                rare: 3,
                ultra_rare: 4,
                legendary_rare: 5
            };
            return (rarityOrder[a.spawn.rarity] || 0) - (rarityOrder[b.spawn.rarity] || 0);
        });
    }, [
        selectedBiome,
        allPokemon
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: 1400,
            margin: "0 auto",
            padding: "24px 20px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "var(--font-display)",
                            fontSize: 22,
                            fontWeight: 800,
                            marginBottom: 6
                        },
                        children: [
                            "🗺️ ",
                            lang === "fr" ? "Guide des Biomes" : "Biome Guide"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                        lineNumber: 510,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: "var(--text2)"
                        },
                        children: lang === "fr" ? "Clique sur un biome pour voir quels Pokémon y spawent et où le trouver selon ton modpack." : "Click a biome to see which Pokémon spawn there and where to find it depending on your modpack."
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                        lineNumber: 513,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                lineNumber: 509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            flex: 1,
                            minWidth: 200
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: search,
                            onChange: (e)=>setSearch(e.target.value),
                            placeholder: lang === "fr" ? "Chercher un biome..." : "Search a biome...",
                            style: {
                                width: "100%",
                                padding: "8px 14px",
                                background: "var(--bg2)",
                                border: "1px solid var(--border)",
                                borderRadius: 10,
                                color: "var(--text)",
                                fontSize: 14,
                                fontFamily: "var(--font-body)",
                                outline: "none"
                            }
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                            lineNumber: 523,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                        lineNumber: 522,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 6
                        },
                        children: DIM_FILTER.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setDimFilter(d.key),
                                style: {
                                    padding: "6px 14px",
                                    borderRadius: 20,
                                    border: `1px solid ${dimFilter === d.key ? "var(--accent)" : "var(--border)"}`,
                                    background: dimFilter === d.key ? "var(--accent)" : "var(--bg3)",
                                    color: dimFilter === d.key ? "#fff" : "var(--text2)",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    fontFamily: "var(--font-display)",
                                    transition: "all 0.15s"
                                },
                                children: [
                                    d.icon,
                                    " ",
                                    lang === "fr" ? d.label_fr : d.label_en
                                ]
                            }, d.key, true, {
                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                lineNumber: 538,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                        lineNumber: 536,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                lineNumber: 521,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 20,
                    alignItems: "flex-start"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                            gap: 8,
                            flex: selectedBiome ? "0 0 340px" : "1",
                            maxWidth: selectedBiome ? 340 : "100%",
                            transition: "all 0.2s"
                        },
                        children: filteredBiomes.map((biome)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedBiome(selectedBiome?.name === biome.name ? null : biome),
                                style: {
                                    padding: "12px 10px",
                                    background: selectedBiome?.name === biome.name ? biome.color + "33" : "var(--bg2)",
                                    border: `2px solid ${selectedBiome?.name === biome.name ? biome.color : "var(--border)"}`,
                                    borderRadius: 12,
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 6,
                                    transition: "all 0.15s",
                                    fontFamily: "var(--font-body)"
                                },
                                onMouseEnter: (e)=>{
                                    if (selectedBiome?.name !== biome.name) e.currentTarget.style.borderColor = biome.color;
                                },
                                onMouseLeave: (e)=>{
                                    if (selectedBiome?.name !== biome.name) e.currentTarget.style.borderColor = "var(--border)";
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 28
                                        },
                                        children: biome.icon
                                    }, void 0, false, {
                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                        lineNumber: 578,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: "var(--text)",
                                            textAlign: "center",
                                            lineHeight: 1.3
                                        },
                                        children: biome.name
                                    }, void 0, false, {
                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                        lineNumber: 579,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 10,
                                            padding: "1px 6px",
                                            borderRadius: 8,
                                            background: biome.dimension === "nether" ? "#ff450020" : biome.dimension === "end" ? "#b39ddb20" : "#4caf5020",
                                            color: biome.dimension === "nether" ? "#ff7b4f" : biome.dimension === "end" ? "#b39ddb" : "#3fb950",
                                            fontWeight: 700
                                        },
                                        children: biome.dimension === "nether" ? "🔥 Nether" : biome.dimension === "end" ? "⭐ End" : "🌍 OW"
                                    }, void 0, false, {
                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                        lineNumber: 583,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, biome.name, true, {
                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                lineNumber: 564,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                        lineNumber: 555,
                        columnNumber: 9
                    }, this),
                    selectedBiome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "var(--bg2)",
                                    border: `2px solid ${selectedBiome.color}`,
                                    borderRadius: 16,
                                    padding: "20px 24px",
                                    marginBottom: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 14,
                                            marginBottom: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 48
                                                },
                                                children: selectedBiome.icon
                                            }, void 0, false, {
                                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                lineNumber: 604,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontFamily: "var(--font-display)",
                                                            fontSize: 24,
                                                            fontWeight: 800
                                                        },
                                                        children: selectedBiome.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                        lineNumber: 606,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 13,
                                                            color: "var(--text2)",
                                                            marginTop: 2
                                                        },
                                                        children: lang === "fr" ? selectedBiome.description_fr : selectedBiome.description_en
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                        lineNumber: 609,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                lineNumber: 605,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedBiome(null),
                                                style: {
                                                    marginLeft: "auto",
                                                    background: "none",
                                                    border: "none",
                                                    color: "var(--text2)",
                                                    fontSize: 20,
                                                    cursor: "pointer"
                                                },
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                lineNumber: 613,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                        lineNumber: 603,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            fontFamily: "var(--font-display)",
                                            color: "var(--text2)",
                                            textTransform: "uppercase",
                                            letterSpacing: 1,
                                            marginBottom: 10
                                        },
                                        children: [
                                            "📍 ",
                                            lang === "fr" ? "Où le trouver" : "Where to find it"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                        lineNumber: 620,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8
                                        },
                                        children: selectedBiome.locations.map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: "var(--bg3)",
                                                    borderRadius: 10,
                                                    padding: "8px 12px",
                                                    borderLeft: `3px solid ${MOD_COLORS[loc.mod] || "#888"}`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            marginBottom: 4,
                                                            color: MOD_COLORS[loc.mod] || "#888"
                                                        },
                                                        children: [
                                                            loc.mod === "Vanilla Minecraft" ? "🟩" : loc.mod === "Cobblemon" ? "🔵" : loc.mod === "Terralith" ? "🟣" : loc.mod === "Oh The Biomes You'll Go" ? "🟠" : loc.mod === "Wythers' Overhauled Overworld" ? "🟤" : "⚪",
                                                            " ",
                                                            loc.mod
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                        lineNumber: 629,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: "var(--text2)",
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: 4
                                                        },
                                                        children: loc.places.map((place)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    background: "var(--bg2)",
                                                                    padding: "1px 8px",
                                                                    borderRadius: 8,
                                                                    fontSize: 11
                                                                },
                                                                children: place
                                                            }, place, false, {
                                                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                                lineNumber: 641,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                        lineNumber: 639,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, loc.mod, true, {
                                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                lineNumber: 625,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                        lineNumber: 623,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                lineNumber: 599,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "var(--font-display)",
                                    fontSize: 13,
                                    color: "var(--text2)",
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    marginBottom: 10
                                },
                                children: [
                                    "🎮 ",
                                    lang === "fr" ? `${biomePokemon.length} Pokémon spawnent ici` : `${biomePokemon.length} Pokémon spawn here`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                lineNumber: 653,
                                columnNumber: 13
                            }, this),
                            biomePokemon.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: "var(--text2)",
                                    padding: 20,
                                    textAlign: "center"
                                },
                                children: lang === "fr" ? "Aucun Pokémon trouvé pour ce biome." : "No Pokémon found for this biome."
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                lineNumber: 657,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                                    gap: 8
                                },
                                children: biomePokemon.map(({ p, spawn })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/pokemon/${p.slug}`,
                                        style: {
                                            textDecoration: "none",
                                            color: "inherit"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10,
                                                padding: "8px 12px",
                                                background: "var(--bg2)",
                                                border: "1px solid var(--border)",
                                                borderRadius: 10,
                                                transition: "all 0.15s",
                                                cursor: "pointer"
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.borderColor = "var(--accent)";
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.borderColor = "var(--border)";
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    src: p.sprite,
                                                    alt: getName(p),
                                                    width: 40,
                                                    height: 40,
                                                    unoptimized: true,
                                                    style: {
                                                        imageRendering: "pixelated"
                                                    },
                                                    onError: (e)=>{
                                                        e.currentTarget.style.display = "none";
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1,
                                                        minWidth: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 700,
                                                                fontSize: 13,
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            },
                                                            children: getName(p)
                                                        }, void 0, false, {
                                                            fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                            lineNumber: 677,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "flex",
                                                                gap: 3,
                                                                marginTop: 2
                                                            },
                                                            children: p.types.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TypeBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TypeBadge"], {
                                                                    type: t,
                                                                    size: "xs"
                                                                }, t, false, {
                                                                    fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                                    lineNumber: 681,
                                                                    columnNumber: 47
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                            lineNumber: 680,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                    lineNumber: 676,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "flex-end",
                                                        gap: 2
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 10,
                                                                padding: "1px 6px",
                                                                borderRadius: 8,
                                                                fontWeight: 700,
                                                                background: __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RARITY_BG"][spawn.rarity] + "33",
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RARITY_BG"][spawn.rarity]
                                                            },
                                                            children: spawn.rarity.replace("_", " ")
                                                        }, void 0, false, {
                                                            fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                            lineNumber: 685,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 10,
                                                                color: "var(--text2)"
                                                            },
                                                            children: [
                                                                "Lv.",
                                                                spawn.minLevel,
                                                                "–",
                                                                spawn.maxLevel
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                            lineNumber: 692,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                                    lineNumber: 684,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                            lineNumber: 664,
                                            columnNumber: 21
                                        }, this)
                                    }, p.slug, false, {
                                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                        lineNumber: 663,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                                lineNumber: 661,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                        lineNumber: 597,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
                lineNumber: 552,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cobblemon-dex/src/components/BiomeDex.tsx",
        lineNumber: 506,
        columnNumber: 5
    }, this);
}
}),
"[project]/cobblemon-dex/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$PokemonCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/PokemonCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$FilterBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/FilterBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TeamPlanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/TeamPlanner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$ItemDex$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/ItemDex.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$BiomeDex$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/BiomeDex.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cobblemon-dex/src/components/ThemeProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
const DEFAULT_FILTERS = {
    search: "",
    rarity: [],
    time: [],
    weather: [],
    dimension: [],
    types: [],
    typeMode: "or",
    sortBy: "id"
};
function HomePage() {
    const [allPokemon, setAllPokemon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_FILTERS);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("list");
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("fr");
    const BATCH = 48;
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(BATCH);
    // Reset when filters change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setVisibleCount(BATCH);
    }, [
        filters,
        lang
    ]);
    // Load more on scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            const scrolled = window.scrollY + window.innerHeight;
            const total = document.documentElement.scrollHeight;
            if (scrolled >= total - 400) {
                setVisibleCount((c)=>c + BATCH);
            }
        };
        window.addEventListener("scroll", handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", handleScroll);
    }, []);
    // Sync lang to sessionStorage so detail page can read it
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = ("TURBOPACK compile-time value", "undefined") !== "undefined" && sessionStorage.getItem("lang");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Restore scroll position when coming back from detail page
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (allPokemon.length === 0) return;
        const savedScroll = sessionStorage.getItem("scrollY");
        const savedVisible = sessionStorage.getItem("visibleCount");
        if (!savedScroll || !savedVisible) return;
        const scrollY = parseInt(savedScroll);
        const count = parseInt(savedVisible);
        setVisibleCount(count);
        sessionStorage.removeItem("scrollY");
        sessionStorage.removeItem("visibleCount");
        // Try multiple times until scroll position is reachable
        let attempts = 0;
        const tryScroll = ()=>{
            if (document.documentElement.scrollHeight >= scrollY + window.innerHeight || attempts > 20) {
                window.scrollTo({
                    top: scrollY,
                    behavior: "instant"
                });
            } else {
                attempts++;
                setTimeout(tryScroll, 50);
            }
        };
        setTimeout(tryScroll, 50);
    }, [
        allPokemon
    ]);
    const { theme, toggle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch("/data/pokemon.json").then((r)=>r.json()).then((data)=>{
            // Stream display: set data first, then mark loaded
            setAllPokemon(data);
            setLoading(false);
        }).catch(()=>setLoading(false));
    }, []);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let list = [
            ...allPokemon
        ];
        if (filters.search) {
            // trim spaces + normalize: remove hyphens/accents for fuzzy match
            const normalize = (s)=>s.toLowerCase().trim().replace(/[-_''.]/g, " ").replace(/\s+/g, " ");
            const q = normalize(filters.search);
            list = list.filter((p)=>normalize(p.name_en || "").includes(q) || normalize(p.name_fr || "").includes(q) || normalize(p.name || "").includes(q) || p.types.some((t)=>t.toLowerCase().includes(q.trim())));
        }
        if (filters.rarity.length) list = list.filter((p)=>filters.rarity.includes((0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHighestRarity"])(p)));
        if (filters.time.length) list = list.filter((p)=>p.spawns.some((s)=>filters.time.includes(s.time)));
        if (filters.weather.length) list = list.filter((p)=>p.spawns.some((s)=>filters.weather.includes(s.weather)));
        if (filters.dimension.length) list = list.filter((p)=>p.spawns.some((s)=>filters.dimension.includes(s.dimension)));
        if (filters.types.length) {
            if (filters.typeMode === "and") {
                list = list.filter((p)=>filters.types.every((t)=>p.types.includes(t)));
            } else {
                list = list.filter((p)=>filters.types.some((t)=>p.types.includes(t)));
            }
        }
        if (filters.sortBy === "id") list.sort((a, b)=>a.id - b.id);
        else if (filters.sortBy === "name") list.sort((a, b)=>{
            const na = lang === "fr" ? a.name_fr || a.name_en || a.name : a.name_en || a.name;
            const nb = lang === "fr" ? b.name_fr || b.name_en || b.name : b.name_en || b.name;
            return na.localeCompare(nb);
        });
        else if (filters.sortBy === "rarity") list.sort((a, b)=>__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RARITY_ORDER"][(0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHighestRarity"])(b)] - __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RARITY_ORDER"][(0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHighestRarity"])(a)]);
        else if (filters.sortBy === "spawnRate") list.sort((a, b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBestSpawnRate"])(b) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBestSpawnRate"])(a));
        return list;
    }, [
        allPokemon,
        filters,
        lang
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "app-root",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "header",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "header-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "logo",
                            onClick: ()=>setView("list"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo.png",
                                    alt: "SpawnDex logo",
                                    style: {
                                        width: 40,
                                        height: 40,
                                        objectFit: "contain"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "logo-text",
                                            children: "SpawnDex"
                                        }, void 0, false, {
                                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "logo-sub",
                                            children: "COBBLEMON"
                                        }, void 0, false, {
                                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "search-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "search-icon",
                                    children: "🔍"
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: lang === "fr" ? "Chercher Pokémon, type..." : "Search Pokémon, type...",
                                    value: filters.search,
                                    onChange: (e)=>setFilters((f)=>({
                                                ...f,
                                                search: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "header-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        background: "var(--bg3)",
                                        border: "1px solid var(--border)",
                                        borderRadius: 20,
                                        overflow: "hidden",
                                        flexShrink: 0
                                    },
                                    children: [
                                        "fr",
                                        "en"
                                    ].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setLang(l);
                                                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                                                ;
                                            },
                                            style: {
                                                padding: "5px 12px",
                                                border: "none",
                                                background: lang === l ? "var(--accent)" : "transparent",
                                                color: lang === l ? "#fff" : "var(--text2)",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                fontFamily: "var(--font-display)",
                                                transition: "all 0.15s"
                                            },
                                            children: l === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"
                                        }, l, false, {
                                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this),
                                [
                                    {
                                        id: "list",
                                        label: "Dex",
                                        icon: "/icon-dex.png"
                                    },
                                    {
                                        id: "team",
                                        label: "Team",
                                        icon: "/icon-team.png"
                                    },
                                    {
                                        id: "items",
                                        label: "Items",
                                        icon: "/icon-items.png"
                                    },
                                    {
                                        id: "biomes",
                                        label: "Biomes",
                                        icon: "/icon-biomes.png"
                                    }
                                ].map(({ id, label, icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `btn ${view === id ? "active" : ""}`,
                                        onClick: ()=>setView(id),
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: icon,
                                                alt: label,
                                                style: {
                                                    width: 20,
                                                    height: 20,
                                                    objectFit: "contain",
                                                    borderRadius: 4,
                                                    flexShrink: 0
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 17
                                            }, this),
                                            label
                                        ]
                                    }, id, true, {
                                        fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                        lineNumber: 229,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn",
                                    onClick: toggle,
                                    title: "Changer thème",
                                    children: theme === "dark" ? "☀️" : "🌙"
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "app-main",
                children: view === "biomes" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$BiomeDex$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BiomeDex"], {
                    allPokemon: allPokemon,
                    lang: lang
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this) : view === "team" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$TeamPlanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TeamPlanner"], {
                    allPokemon: allPokemon
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                    lineNumber: 254,
                    columnNumber: 9
                }, this) : view === "items" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$ItemDex$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemDex"], {
                    allPokemon: allPokemon,
                    lang: lang
                }, void 0, false, {
                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                    lineNumber: 256,
                    columnNumber: 9
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "filter-mobile-wrap",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$FilterBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterBar"], {
                                filters: filters,
                                onChange: setFilters,
                                lang: lang,
                                mobileOnly: true
                            }, void 0, false, {
                                fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                            lineNumber: 260,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "page-layout",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "filter-sidebar-wrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$FilterBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterBar"], {
                                        filters: filters,
                                        onChange: setFilters,
                                        lang: lang,
                                        desktopOnly: true
                                    }, void 0, false, {
                                        fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "filter-right-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sort-bar",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 13,
                                                        color: "var(--text2)"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: filtered.length
                                                        }, void 0, false, {
                                                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 15
                                                        }, this),
                                                        " Pokémon"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 13
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 6,
                                                        alignItems: "center"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: "var(--text2)",
                                                                fontWeight: 700
                                                            },
                                                            children: lang === "fr" ? "TRIER:" : "SORT:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                            lineNumber: 280,
                                                            columnNumber: 15
                                                        }, this),
                                                        [
                                                            "id",
                                                            "name",
                                                            "rarity",
                                                            "spawnRate"
                                                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setFilters((f)=>({
                                                                            ...f,
                                                                            sortBy: s
                                                                        })),
                                                                style: {
                                                                    padding: "3px 10px",
                                                                    borderRadius: "20px",
                                                                    border: `1px solid ${filters.sortBy === s ? "var(--accent)" : "var(--border)"}`,
                                                                    background: filters.sortBy === s ? "var(--accent)" : "var(--bg3)",
                                                                    color: filters.sortBy === s ? "#fff" : "var(--text2)",
                                                                    fontSize: "12px",
                                                                    fontWeight: 600,
                                                                    cursor: "pointer",
                                                                    fontFamily: "inherit",
                                                                    transition: "all 0.15s"
                                                                },
                                                                children: s === "id" ? "№ Dex" : s === "name" ? "A–Z" : s === "rarity" ? lang === "fr" ? "Rareté" : "Rarity" : "Spawn Rate"
                                                            }, s, false, {
                                                                fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                                lineNumber: 284,
                                                                columnNumber: 17
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 13
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                            lineNumber: 274,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid-container",
                                            children: loading ? Array.from({
                                                length: 12
                                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: "var(--bg2)",
                                                        border: "1px solid var(--border)",
                                                        borderRadius: "var(--radius)",
                                                        height: 230,
                                                        animation: "pulse 1.5s ease-in-out infinite",
                                                        opacity: 0.6
                                                    }
                                                }, i, false, {
                                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 17
                                                }, this)) : filtered.length > 0 ? filtered.slice(0, visibleCount).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$src$2f$components$2f$PokemonCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PokemonCard"], {
                                                    pokemon: p,
                                                    lang: lang
                                                }, p.slug, false, {
                                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 17
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "empty-state",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "empty-icon",
                                                        children: "🔍"
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontFamily: "var(--font-display)",
                                                            fontSize: 24,
                                                            marginBottom: 8,
                                                            color: "var(--text)"
                                                        },
                                                        children: lang === "fr" ? "Aucun Pokémon trouvé" : "No Pokémon found"
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cobblemon$2d$dex$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: lang === "fr" ? "Essaie d'ajuster ta recherche ou tes filtres" : "Try adjusting your search or filters"
                                                    }, void 0, false, {
                                                        fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                                lineNumber: 333,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                            lineNumber: 265,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/cobblemon-dex/src/app/page.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cobblemon-dex/src/app/page.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=cobblemon-dex_src_0f246c0c._.js.map