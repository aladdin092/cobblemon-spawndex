"use client";

type Lang = "fr" | "en";

interface BiomeLocation {
  mod: string;
  places: string[];
}

interface BiomeInfo {
  name: string;
  icon: string;
  dimension: string;
  description_fr: string;
  description_en: string;
  locations: BiomeLocation[];
  color: string;
}

const MOD_COLORS: Record<string, string> = {
  "Vanilla Minecraft": "#3fb950",
  "Cobblemon": "#58a6ff",
  "Oh The Biomes You'll Go": "#f8a830",
  "Terralith": "#c070ff",
  "Wythers' Overhauled Overworld": "#ff7b4f",
  "BetterNether": "#ff4500",
  "Incendium": "#ff2020",
  "Cinderscapes": "#808080",
  "Gardens of the Dead": "#208040",
};

const MOD_ICON: Record<string, string> = {
  "Vanilla Minecraft": "🟩",
  "Cobblemon": "🔵",
  "Terralith": "🟣",
  "Oh The Biomes You'll Go": "🟠",
  "Wythers' Overhauled Overworld": "🟤",
  "BetterNether": "🔴",
  "Incendium": "🔴",
  "Cinderscapes": "⚪",
  "Gardens of the Dead": "🌿",
};

const BIOME_DATA: BiomeInfo[] = [
  { name: "Arid", icon: "🏜️", dimension: "overworld", color: "#e8a838", description_fr: "Zones sèches et sablonneuses, savanes.", description_en: "Dry sandy areas and savannas.", locations: [{ mod: "Vanilla Minecraft", places: ["All Sandy biomes", "All Savanna biomes"] }] },
  { name: "Badlands", icon: "🟤", dimension: "overworld", color: "#c8682a", description_fr: "Mesas rouges et terres arides colorées.", description_en: "Red mesas and colorful arid lands.", locations: [{ mod: "Vanilla Minecraft", places: ["All Badlands biomes"] }, { mod: "Terralith", places: ["Ashen Savanna", "Red Oasis", "Warped Mesa", "White Mesa"] }, { mod: "Wythers' Overhauled Overworld", places: ["Danakil Desert"] }] },
  { name: "Beach", icon: "🏖️", dimension: "overworld", color: "#f8d030", description_fr: "Plages de sable au bord de l'océan.", description_en: "Sandy beaches along the ocean.", locations: [{ mod: "Vanilla Minecraft", places: ["All Beach biomes"] }, { mod: "Wythers' Overhauled Overworld", places: ["Guelta", "Sand Dunes"] }] },
  { name: "Cave", icon: "🕳️", dimension: "overworld", color: "#5a5a7a", description_fr: "Grottes souterraines de tous types.", description_en: "Underground caves of all types.", locations: [{ mod: "Vanilla Minecraft", places: ["Dripstone Caves", "Lush Caves"] }, { mod: "Terralith", places: ["Andesite Caves", "Desert Caves", "Diorite Caves", "Fungal Caves", "Granite Caves", "Infested Caves", "Thermal Caves", "Underground Jungle"] }] },
  { name: "Cold", icon: "🧊", dimension: "overworld", color: "#88ccee", description_fr: "Biomes froids : océans froids, taigas, toundras, pics.", description_en: "Cold biomes: cold oceans, taigas, tundras, peaks.", locations: [{ mod: "Cobblemon", places: ["All Cold Ocean biomes", "All Freezing biomes", "All Peak biomes", "All Taiga biomes", "All Tundra biomes"] }, { mod: "Oh The Biomes You'll Go", places: ["All BYG Cold biomes"] }, { mod: "Wythers' Overhauled Overworld", places: ["Berry Bog"] }] },
  { name: "Deep Dark", icon: "🌑", dimension: "overworld", color: "#1a1a2e", description_fr: "Les profondeurs obscures, domaine du Warden.", description_en: "The deep dark, domain of the Warden.", locations: [{ mod: "Vanilla Minecraft", places: ["Deep Dark"] }, { mod: "Terralith", places: ["Crystal Caves", "Deep Caves", "Frostfire Caves", "Mantle Caves", "Tuff Caves"] }, { mod: "Wythers' Overhauled Overworld", places: ["Deep Dark Forest", "Deep Dark Incursion"] }] },
  { name: "Desert", icon: "🌵", dimension: "overworld", color: "#f0c040", description_fr: "Déserts de sable chaud et sec.", description_en: "Hot dry sandy deserts.", locations: [{ mod: "Vanilla Minecraft", places: ["Desert"] }, { mod: "Oh The Biomes You'll Go", places: ["All BYG desert biomes"] }, { mod: "Terralith", places: ["Ancient Sands", "Desert Canyon", "Desert Oasis", "Desert Spires", "Lush Desert", "Red Oasis"] }, { mod: "Wythers' Overhauled Overworld", places: ["All Wythers' desert biomes", "Badlands Desert", "Desert Island", "Outback Desert", "Red Desert", "Sandy Jungle"] }] },
  { name: "Floral", icon: "🌸", dimension: "overworld", color: "#ff9ec8", description_fr: "Biomes fleuris et colorés.", description_en: "Floral and colorful biomes.", locations: [{ mod: "Vanilla Minecraft", places: ["Cherry Grove", "Flower Forest", "Meadow", "Sunflower Plains"] }, { mod: "Oh The Biomes You'll Go", places: ["All BYG Floral biomes", "Amaranth Fields", "Rose Fields", "Skyris Vale", "Cherry Blossom Forest", "Orchard"] }, { mod: "Terralith", places: ["Blooming Plateau", "Blooming Valley", "Lavender Forest", "Lavender Valley", "Sakura Grove", "Sakura Valley"] }, { mod: "Wythers' Overhauled Overworld", places: ["Autumnal Flower Forest", "Flowering Pantanal", "Jacaranda Savanna", "Sakura Forest", "Spring Flower Fields"] }] },
  { name: "Forest", icon: "🌲", dimension: "overworld", color: "#3fb950", description_fr: "Forêts tempérées de tous types.", description_en: "Temperate forests of all types.", locations: [{ mod: "Vanilla Minecraft", places: ["All Forest biomes", "Cherry Grove"] }, { mod: "Terralith", places: ["Alpha Islands", "Blooming Valley", "Forested Highlands", "Lavender Forest", "Mirage Isles", "Sakura Grove", "Temperate Highlands"] }, { mod: "Wythers' Overhauled Overworld", places: ["Birch Taiga", "Boreal Forest Red", "Boreal Forest Yellow", "Subtropical Forest", "Tangled Forest", "Tropical Forest"] }] },
  { name: "Freezing", icon: "❄️", dimension: "overworld", color: "#b0e0ff", description_fr: "Biomes glaciaux extrêmes.", description_en: "Extreme frozen biomes.", locations: [{ mod: "Vanilla Minecraft", places: ["Frozen River", "Jagged Peaks", "Snowy Beach", "Snowy Plains", "Snowy Slopes"] }, { mod: "Cobblemon", places: ["All Frozen Ocean biomes", "All Glacial biomes", "All Snowy Forest biomes"] }, { mod: "Oh The Biomes You'll Go", places: ["All BYG Snowy biomes", "Cardinal Tundra"] }, { mod: "Terralith", places: ["Emerald Peaks", "Scarlet Mountains", "Skylands Winter", "Snowy Badlands"] }, { mod: "Wythers' Overhauled Overworld", places: ["Crimson Tundra", "Frozen Island", "Snowy Canyon", "Snowy Peaks", "Snowy Tundra"] }] },
  { name: "Freshwater", icon: "🏞️", dimension: "overworld", color: "#58a6ff", description_fr: "Rivières, marais et zones d'eau douce.", description_en: "Rivers, swamps and freshwater areas.", locations: [{ mod: "Cobblemon", places: ["All River biomes", "All Swamp biomes"] }, { mod: "Wythers' Overhauled Overworld", places: ["Desert Lakes", "Guelta", "Tropical Forest River"] }] },
  { name: "Grassland", icon: "🌾", dimension: "overworld", color: "#78c850", description_fr: "Plaines et savanes ouvertes.", description_en: "Open plains and savannas.", locations: [{ mod: "Cobblemon", places: ["All Plains biomes", "All Savanna biomes"] }] },
  { name: "Hills", icon: "⛰️", dimension: "overworld", color: "#a0a060", description_fr: "Collines et hautes terres.", description_en: "Hills and highlands.", locations: [{ mod: "Vanilla Minecraft", places: ["All Hills biomes"] }, { mod: "Cobblemon", places: ["All Highlands biomes"] }, { mod: "Terralith", places: ["Blooming Valley", "Forested Highlands", "Lavender Valley", "Lush Valley", "Sakura Valley", "Temperate Highlands"] }, { mod: "Wythers' Overhauled Overworld", places: ["Autumnal Crags", "Ayers Rock", "Icy Crags", "Taiga Crags", "Windswept Jungle"] }] },
  { name: "Island", icon: "🏝️", dimension: "overworld", color: "#40c8a0", description_fr: "Îles isolées et champignons.", description_en: "Isolated islands and mushroom fields.", locations: [{ mod: "Vanilla Minecraft", places: ["Mushroom Fields"] }, { mod: "Cobblemon", places: ["All Tropical Island biomes"] }, { mod: "Oh The Biomes You'll Go", places: ["Lush Stacks"] }, { mod: "Terralith", places: ["Alpha Islands", "Alpha Islands Winter", "Mirage Isles"] }, { mod: "Wythers' Overhauled Overworld", places: ["Cold Island", "Desert Island", "Frigid Island", "Frozen Island", "Jungle Island", "Mediterranean Island", "Temperate Island", "Tropical Island"] }] },
  { name: "Jungle", icon: "🌴", dimension: "overworld", color: "#00a040", description_fr: "Jungles denses et tropicales.", description_en: "Dense tropical jungles.", locations: [{ mod: "Vanilla Minecraft", places: ["All Jungle biomes"] }, { mod: "Terralith", places: ["Underground Jungle"] }, { mod: "Wythers' Overhauled Overworld", places: ["Dripleaf Swamp", "Eucalyptus Deanei Forest", "Highland Tropical Rainforest", "Jungle Canyon", "Subtropical Forest", "Tropical Forest", "Tropical Island", "Tropical Rainforest"] }] },
  { name: "Lush", icon: "🌿", dimension: "overworld", color: "#50e878", description_fr: "Grottes luxuriantes et biomes verdoyants.", description_en: "Lush caves and verdant biomes.", locations: [{ mod: "Vanilla Minecraft", places: ["Lush Caves"] }, { mod: "Oh The Biomes You'll Go", places: ["Lush Stacks"] }, { mod: "Terralith", places: ["Underground Jungle"] }, { mod: "Wythers' Overhauled Overworld", places: ["Lichenous Caves", "Lush Dripstone Caves", "Lush Shroom Caves"] }] },
  { name: "Magical", icon: "✨", dimension: "overworld", color: "#c070ff", description_fr: "Forêts sombres et biomes enchantés.", description_en: "Dark forests and enchanted biomes.", locations: [{ mod: "Vanilla Minecraft", places: ["Dark Forest"] }, { mod: "Oh The Biomes You'll Go", places: ["All BYG Magical biomes", "Skyris Vale"] }, { mod: "Wythers' Overhauled Overworld", places: ["All Wythers' Dark Forest biomes", "Lantern River", "Mushroom Island", "Snowy Thermal Taiga"] }, { mod: "Terralith", places: ["Amethyst Canyon", "Amethyst Rainforest", "Mirage Isles", "Moonlight Grove", "Moonlight Valley"] }] },
  { name: "Mountain", icon: "🏔️", dimension: "overworld", color: "#8888aa", description_fr: "Hautes montagnes et sommets.", description_en: "High mountains and summits.", locations: [{ mod: "Vanilla Minecraft", places: ["All Mountain biomes"] }, { mod: "Cobblemon", places: ["All Hill biomes"] }, { mod: "Terralith", places: ["Stony Spires", "Volcanic Peaks", "Windswept Spires", "Yosemite Cliffs"] }, { mod: "Wythers' Overhauled Overworld", places: ["Tibesti Mountains", "Tropical Volcano", "Tsingy Forest", "Volcano"] }] },
  { name: "Ocean", icon: "🌊", dimension: "overworld", color: "#1560a0", description_fr: "Tous les océans et zones côtières.", description_en: "All oceans and coastal areas.", locations: [{ mod: "Vanilla Minecraft", places: ["All Ocean biomes"] }, { mod: "Cobblemon", places: ["All Coast biomes", "All Cold Ocean biomes", "All Deep Ocean biomes", "All Frozen Ocean biomes", "All Lukewarm Ocean biomes", "All Warm Ocean biomes"] }] },
  { name: "Plains", icon: "🌱", dimension: "overworld", color: "#90d050", description_fr: "Plaines ouvertes et prairies.", description_en: "Open plains and meadows.", locations: [{ mod: "Vanilla Minecraft", places: ["Plains", "Sunflower Plains"] }, { mod: "Cobblemon", places: ["All Highlands biomes"] }, { mod: "Oh The Biomes You'll Go", places: ["All BYG Plains biomes"] }, { mod: "Terralith", places: ["Brushland", "Steppe", "Valley Clearing"] }, { mod: "Wythers' Overhauled Overworld", places: ["Berry Bog", "Forest Edge", "Spring Flower Fields", "Tropical Grassland"] }] },
  { name: "River", icon: "🏞️", dimension: "overworld", color: "#4090f0", description_fr: "Rivières et cours d'eau.", description_en: "Rivers and waterways.", locations: [{ mod: "Vanilla Minecraft", places: ["All River biomes"] }, { mod: "Wythers' Overhauled Overworld", places: ["Guelta", "Tropical Forest River"] }] },
  { name: "Savanna", icon: "🌅", dimension: "overworld", color: "#d8a030", description_fr: "Savanes chaudes et sèches.", description_en: "Hot dry savannas.", locations: [{ mod: "Vanilla Minecraft", places: ["All Savanna biomes"] }, { mod: "Terralith", places: ["Arid Highlands", "Ashen Savanna", "Brushland", "Desert Oasis", "Fractured Savanna", "Red Oasis", "Savanna Badlands"] }, { mod: "Wythers' Overhauled Overworld", places: ["Granite Canyon", "Tropical Forest Canyon", "Tropical Forest"] }] },
  { name: "Sky", icon: "☁️", dimension: "overworld", color: "#c8e8ff", description_fr: "Îles célestes flottantes (Terralith).", description_en: "Floating sky islands (Terralith).", locations: [{ mod: "Terralith", places: ["Skylands Autumn", "Skylands Spring", "Skylands Summer", "Skylands Winter"] }] },
  { name: "Snowy Forest", icon: "🌨️", dimension: "overworld", color: "#d0eeff", description_fr: "Forêts enneigées et taigas glacées.", description_en: "Snowy forests and icy taigas.", locations: [{ mod: "Vanilla Minecraft", places: ["Grove", "Snowy Taiga"] }, { mod: "Terralith", places: ["Alpine Grove", "Ice Marsh", "Siberian Grove", "Snowy Maple Forest", "Snowy Shield", "Wintry Forest", "Wintry Lowlands"] }, { mod: "Wythers' Overhauled Overworld", places: ["Deep Snowy Taiga", "Snowy Fen", "Snowy Thermal Taiga"] }] },
  { name: "Spooky", icon: "🕸️", dimension: "overworld", color: "#6a0dad", description_fr: "Forêts sombres et inquiétantes.", description_en: "Dark and eerie forests.", locations: [{ mod: "Vanilla Minecraft", places: ["Dark Forest"] }, { mod: "Oh The Biomes You'll Go", places: ["All BYG Spooky biomes", "Ebony Woods"] }, { mod: "Wythers' Overhauled Overworld", places: ["All Wythers' Dark Forest biomes", "Ancient Taiga", "Bayou", "Tangled Forest"] }] },
  { name: "Swamp", icon: "🐊", dimension: "overworld", color: "#486830", description_fr: "Marécages et mangroves.", description_en: "Swamps and mangroves.", locations: [{ mod: "Vanilla Minecraft", places: ["Mangrove Swamp", "Swamp"] }, { mod: "Oh The Biomes You'll Go", places: ["All BYG Swamp biomes"] }, { mod: "Wythers' Overhauled Overworld", places: ["All Wythers' Swamp biomes", "Billabong", "Orchid Swamp"] }, { mod: "Terralith", places: ["Ice Marsh"] }] },
  { name: "Taiga", icon: "🌲", dimension: "overworld", color: "#208040", description_fr: "Taigas boréales et forêts de conifères.", description_en: "Boreal taigas and conifer forests.", locations: [{ mod: "Vanilla Minecraft", places: ["All Taiga biomes", "Grove"] }, { mod: "Terralith", places: ["Alpine Grove", "Ice Marsh", "Moonlight Grove", "Siberian Taiga", "Snowy Maple Forest"] }, { mod: "Wythers' Overhauled Overworld", places: ["Ancient Taiga", "Birch Taiga", "Boreal Forest Red", "Fen", "Forested Highlands", "Larch Taiga", "Old Growth Taiga Crags", "Temperate Rainforest", "Thermal Taiga"] }] },
  { name: "Temperate", icon: "🍃", dimension: "overworld", color: "#60b840", description_fr: "Forêts et plaines tempérées.", description_en: "Temperate forests and plains.", locations: [{ mod: "Cobblemon", places: ["All Forest biomes", "All Plains biomes"] }] },
  { name: "Tundra", icon: "🌬️", dimension: "overworld", color: "#a8d8e8", description_fr: "Toundras froides et désolées.", description_en: "Cold desolate tundras.", locations: [{ mod: "Vanilla Minecraft", places: ["Ice Spikes", "Snowy Plains"] }, { mod: "Oh The Biomes You'll Go", places: ["Cardinal Tundra"] }, { mod: "Terralith", places: ["Cold Shrubland", "Gravel Desert", "Rocky Shrubland", "Snowy Badlands", "Yellowstone"] }, { mod: "Wythers' Overhauled Overworld", places: ["Crimson Tundra", "Frigid Island", "Ice Cap", "Icy Crags", "Snowy Tundra", "Tundra"] }] },
  { name: "Volcanic", icon: "🌋", dimension: "overworld", color: "#ff4500", description_fr: "Zones volcaniques et cratères de lave.", description_en: "Volcanic zones and lava craters.", locations: [{ mod: "Terralith", places: ["Mantle Caves", "Volcanic Crater", "Volcanic Peaks"] }, { mod: "Wythers' Overhauled Overworld", places: ["Icy Volcano", "Tropical Volcano", "Volcano", "Volcanic Chamber", "Volcanic Crater"] }] },
  { name: "Overworld", icon: "🌍", dimension: "overworld", color: "#4caf50", description_fr: "Tous les biomes de l'Overworld.", description_en: "All Overworld biomes.", locations: [{ mod: "Vanilla Minecraft", places: ["All Overworld biomes"] }] },
  { name: "Nether Basalt", icon: "🪨", dimension: "nether", color: "#808080", description_fr: "Deltas de basalte dans le Nether.", description_en: "Basalt deltas in the Nether.", locations: [{ mod: "Vanilla Minecraft", places: ["Basalt Deltas"] }, { mod: "Cinderscapes", places: ["Blackstone Shales"] }, { mod: "Incendium", places: ["Ash Barrens", "Volcanic Deltas", "Withered Forest"] }] },
  { name: "Nether Crimson", icon: "🍄", dimension: "nether", color: "#cc2244", description_fr: "Forêts cramoisies du Nether.", description_en: "Crimson forests of the Nether.", locations: [{ mod: "Vanilla Minecraft", places: ["Crimson Forest"] }, { mod: "BetterNether", places: ["Crimson Glowing Woods", "Crimson Pinewood", "Nether Swampland"] }, { mod: "Oh The Biomes You'll Go", places: ["Crimson Gardens"] }, { mod: "Gardens of the Dead", places: ["Whistling Woods"] }] },
  { name: "Nether Desert", icon: "💀", dimension: "nether", color: "#d4a050", description_fr: "Déserts de sable d'âme dans le Nether.", description_en: "Soul sand deserts in the Nether.", locations: [{ mod: "Vanilla Minecraft", places: ["Soul Sand Valley"] }, { mod: "BetterNether", places: ["Gravel Desert"] }, { mod: "Oh The Biomes You'll Go", places: ["Quartz Desert", "Warped Desert"] }, { mod: "Incendium", places: ["Infernal Dunes", "Weeping Valley"] }] },
  { name: "Nether Fungus", icon: "🟣", dimension: "nether", color: "#7040a0", description_fr: "Forêts de champignons du Nether.", description_en: "Mushroom forests of the Nether.", locations: [{ mod: "Vanilla Minecraft", places: ["Crimson Forest", "Warped Forest"] }, { mod: "BetterNether", places: ["Mushroom Forest", "Old Fungiwoods", "Old Warped Woods"] }, { mod: "Oh The Biomes You'll Go", places: ["Crimson Gardens", "Embur Bog", "Glowstone Garden", "Wailing Garth"] }, { mod: "Cinderscapes", places: ["Luminous Grove"] }] },
  { name: "Nether Wasteland", icon: "🔥", dimension: "nether", color: "#ff4500", description_fr: "Les Déchets du Nether — biome principal.", description_en: "Nether Wastes — the main Nether biome.", locations: [{ mod: "Vanilla Minecraft", places: ["Nether Wastes"] }, { mod: "BetterNether", places: ["Magma Land", "Poor Nether Grasslands"] }, { mod: "Oh The Biomes You'll Go", places: ["Brimstone Caverns", "Magma Wastes"] }, { mod: "Cinderscapes", places: ["Ashy Shoals", "Quartz Cavern"] }, { mod: "Incendium", places: ["Ash Barrens", "Toxic Heap"] }] },
  { name: "Nether Warped", icon: "💠", dimension: "nether", color: "#00b8a9", description_fr: "Forêts déformées turquoise du Nether.", description_en: "Turquoise warped forests of the Nether.", locations: [{ mod: "Vanilla Minecraft", places: ["Warped Forest"] }, { mod: "BetterNether", places: ["Nether Jungle", "Old Warped Woods"] }, { mod: "Oh The Biomes You'll Go", places: ["Wailing Garth", "Warped Desert"] }] },
  { name: "End", icon: "⭐", dimension: "end", color: "#b39ddb", description_fr: "L'End — dimension finale.", description_en: "The End — final dimension.", locations: [{ mod: "Vanilla Minecraft", places: ["All End biomes"] }] },
];

interface Props {
  biomeName: string;
  lang: Lang;
  onClose: () => void;
}

export function BiomeModal({ biomeName, lang, onClose }: Props) {
  const biome = BIOME_DATA.find(
    (b) => b.name.toLowerCase() === biomeName.toLowerCase()
  );

  if (!biome) {
    // Unknown biome — show basic info
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, maxWidth: 400, width: "100%" }} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20 }}>📍 {biomeName}</span>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: 20, cursor: "pointer" }}>✕</button>
          </div>
          <p style={{ color: "var(--text2)", fontSize: 13 }}>
            {lang === "fr" ? "Ce biome est spécifique à un modpack. Consulte la doc de ton modpack pour plus d'infos." : "This biome is specific to a modpack. Check your modpack's documentation for more info."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "var(--bg2)", border: `2px solid ${biome.color}`, borderRadius: 20, padding: 24, maxWidth: 520, width: "100%", maxHeight: "80vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <span style={{ fontSize: 52 }}>{biome.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800 }}>{biome.name}</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 2 }}>
              {lang === "fr" ? biome.description_fr : biome.description_en}
            </div>
            <span style={{
              display: "inline-block", marginTop: 6, fontSize: 11, padding: "2px 10px", borderRadius: 10, fontWeight: 700,
              background: biome.dimension === "nether" ? "#ff450020" : biome.dimension === "end" ? "#b39ddb20" : "#4caf5020",
              color: biome.dimension === "nether" ? "#ff7b4f" : biome.dimension === "end" ? "#b39ddb" : "#3fb950",
            }}>
              {biome.dimension === "nether" ? "🔥 Nether" : biome.dimension === "end" ? "⭐ End" : "🌍 Overworld"}
            </span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: 22, cursor: "pointer", alignSelf: "flex-start" }}>✕</button>
        </div>

        {/* Where to find */}
        <div style={{ fontSize: 11, fontFamily: "var(--font-display)", color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
          📍 {lang === "fr" ? "Où le trouver" : "Where to find it"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {biome.locations.map((loc) => (
            <div key={loc.mod} style={{ background: "var(--bg3)", borderRadius: 10, padding: "10px 14px", borderLeft: `3px solid ${MOD_COLORS[loc.mod] || "#888"}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: MOD_COLORS[loc.mod] || "#888" }}>
                {MOD_ICON[loc.mod] || "⚪"} {loc.mod}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {loc.places.map((place) => (
                  <span key={place} style={{ background: "var(--bg2)", padding: "2px 8px", borderRadius: 8, fontSize: 11, color: "var(--text2)" }}>
                    {place}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
