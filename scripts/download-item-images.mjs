// Run this once: node scripts/download-item-images.mjs
// Downloads Minecraft item PNGs into public/items/

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const OUT_DIR = join(process.cwd(), "public", "items");
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// All unique items from pokemon.json (Pokémon items from PokeAPI, Minecraft items from MC assets)
const ITEMS = [
  "Ability Shield","Absorb Bulb","Acacia Log","Air Balloon","Amethyst Shard","Apple",
  "Armadillo Scute","Aspear Berry","Auspicious Armor","Babiri Berry","Bamboo","Basalt",
  "Berry Juice","Big Root","Black Augurite","Black Belt","Black Glasses","Black Sludge",
  "Blaze Powder","Blaze Rod","Blue Ice","Blue Wool","Bluk Berry","Bone","Bone Block",
  "Bone Meal","Bread","Bright Powder","Brown Mushroom","Brown Wool","Cactus","Cake",
  "Calcite","Candle","Carrot","Cell Battery","Charcoal","Charcoal Stick","Charti Berry",
  "Cheri Berry","Chesto Berry","Chilan Berry","Chople Berry","Chorus Fruit","Clay Ball",
  "Cleanse Tag","Coal","Coarse Dirt","Coba Berry","Colbur Berry","Cooked Chicken",
  "Dark Oak Sapling","Dawn Stone","Deep Sea Scale","Deep Sea Tooth","Diamond","Diamond Sword",
  "Dirt","Dragon Fang","Dragon Scale","Dragon's Breath","Dubious Disc","Dusk Stone",
  "Echo Shard","Egg","Electirizer","Electric Seed","Emerald","Ender Pearl","Everstone",
  "Eviolite","Expert Belt","Eye of Ender","Fairy Feather","Feather","Fire Stone","Flame Orb",
  "Flint","Float Stone","Focus Band","Galarica Nuts","Ghast Tear","Glow Ink Sac",
  "Gold Nugget","Grassy Seed","Gravel","Grip Claw","Gunpowder","Haban Berry","Hard Stone",
  "Heart of the Sea","Honey Bottle","Honeycomb","Ice Stone","Ink Sac","Iron Ball",
  "Iron Helmet","Iron Ingot","Iron Nugget","Iron Sword","Jack o'Lantern","Kasib Berry",
  "Kebia Berry","Kelp","King's Rock","Lagging Tail","Leaf Stone","Leather","Leftovers",
  "Life Orb","Light Ball","Light Blue Wool","Light Clay","Lily Pad","Lucky Egg",
  "Luminous Moss","Magma Cream","Magmarizer","Magnet","Malicious Armor","Medicinal Leek",
  "Melon Seeds","Mental Herb","Metal Coat","Metal Powder","Metronome","Miracle Seed",
  "Misty Seed","Moon Stone","Mud","Muscle Band","Mystic Water","Name Tag","Nanab Berry",
  "Nautilus Shell","Nether Star","Never-Melt Ice","Oak Log","Oak Sapling","Occa Berry",
  "Ochre Froglight","Oran Berry","Oval Stone","Passho Berry","Payapa Berry",
  "Pearlescent Froglight","Peat Block","Pecha Berry","Persim Berry","Phantom Membrane",
  "Pinap Berry","Poison Barb","Poppy","Potato","Prism Scale","Prismarine Crystal",
  "Prismarine Shard","Protector","Psychic Seed","Pufferfish","Pumpkin Seeds","Quick Claw",
  "Quick Powder","Rabbit Hide","Rabbit's Foot","Raw Beef","Raw Chicken","Raw Cod",
  "Raw Copper","Raw Iron","Raw Mutton","Raw Porkchop","Raw Rabbit","Raw Salmon",
  "Rawst Berry","Razor Claw","Razor Fang","Razz Berry","Reaper Cloth","Red Apricorn",
  "Red Mushroom","Redstone","Relic Coin","Revival Herb","Rindo Berry","Roasted Leek",
  "Rocky Helmet","Room Service","Rose","Roseli Berry","Rotten Flesh","Sacred Ash","Sand",
  "Sharp Beak","Shed Shell","Shell Bell","Shiny Stone","Shuca Berry","Silk Scarf",
  "Silver Powder","Slimeball","Smoke Ball","Snowball","Soft Sand","Soothe Bell","Spell Tag",
  "Spider Eye","Stick","Sticky Barb","Stone","Stone Axe","String","Sugar","Sun Stone",
  "Sunflower","Sweet Berries","Tanga Berry","Terracotta","Throat Spray","Thunder Stone",
  "Toxic Orb","Turtle Scute","Twisted Spoon","Up-Grade","Verdant Froglight","Vine",
  "Wacan Berry","Water Stone","Wepear Berry","Wheat Seeds","White Wool","Wide Lens",
  "Wise Glasses","Yache Berry",
];

function toPokeSlug(name) {
  return name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
}
function toMcSlug(name) {
  return name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "_");
}

const MC_ITEM = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.1/assets/minecraft/textures/item";
const MC_BLOCK = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.1/assets/minecraft/textures/block";
const POKE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

// Manual overrides: item name → alternate slug(s) to try (checked in order)
const OVERRIDES = {
  "Ability Shield":        { item: "turtle_helmet" },
  "Acacia Log":            { block: "acacia_log" },
  "Auspicious Armor":      { item: "turtle_scute" }, // no direct sprite, closest visual
  "Basalt":                { block: "basalt_top" },
  "Black Augurite":        { item: "flint" },
  "Blue Ice":              { block: "blue_ice" },
  "Blue Wool":             { block: "blue_wool" },
  "Bone Block":            { block: "bone_block_top" },
  "Brown Mushroom":        { item: "brown_mushroom" },
  "Brown Wool":            { block: "brown_wool" },
  "Cactus":                { block: "cactus_side" },
  "Calcite":               { block: "calcite" },
  "Charcoal Stick":        { item: "stick" },
  "Coarse Dirt":           { block: "coarse_dirt" },
  "Dark Oak Sapling":      { item: "dark_oak_sapling" },
  "Dirt":                  { block: "dirt" },
  "Dragon's Breath":       { item: "dragon_breath" },
  "Eye of Ender":          { item: "ender_eye" },
  "Fairy Feather":         { item: "feather" },
  "Galarica Nuts":         { item: "amethyst_shard" },
  "Gravel":                { block: "gravel" },
  "Jack o'Lantern":        { block: "jack_o_lantern" },
  "Light Blue Wool":       { block: "light_blue_wool" },
  "Lily Pad":              { item: "lily_pad" },
  "Malicious Armor":       { item: "iron_chestplate" },
  "Medicinal Leek":        { item: "sugar_cane" },
  "Mud":                   { block: "mud" },
  "Oak Log":               { block: "oak_log" },
  "Oak Sapling":           { item: "oak_sapling" },
  "Ochre Froglight":       { block: "ochre_froglight_top" },
  "Pearlescent Froglight": { block: "pearlescent_froglight_top" },
  "Peat Block":            { block: "dirt" },
  "Poppy":                 { item: "poppy" },
  "Prismarine Crystal":    { item: "prismarine_crystals" },
  "Rabbit's Foot":         { item: "rabbit_foot" },
  "Raw Beef":              { item: "beef" },
  "Raw Chicken":           { item: "chicken" },
  "Raw Cod":               { item: "cod" },
  "Raw Mutton":            { item: "mutton" },
  "Raw Porkchop":          { item: "porkchop" },
  "Raw Rabbit":            { item: "rabbit" },
  "Raw Salmon":            { item: "salmon" },
  "Red Mushroom":          { item: "red_mushroom" },
  "Relic Coin":            { item: "gold_nugget" },
  "Roasted Leek":          { item: "baked_potato" },
  "Room Service":          { item: "white_bed" },
  "Rose":                  { block: "rose_bush_top" },
  "Sand":                  { block: "sand" },
  "Slimeball":             { item: "slime_ball" },
  "Stone":                 { block: "stone" },
  "Sunflower":             { block: "sunflower_front" },
  "Terracotta":            { block: "terracotta" },
  "Throat Spray":          { item: "glass_bottle" },
  "Verdant Froglight":     { block: "verdant_froglight_top" },
  "Vine":                  { block: "vine" },
  "White Wool":            { block: "white_wool" },
};

async function tryFetch(url) {
  try {
    const res = await fetch(url);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
  } catch {}
  return null;
}

let ok = 0, fail = 0;

for (const item of ITEMS) {
  const filename = toMcSlug(item) + ".png";
  const dest = join(OUT_DIR, filename);
  if (existsSync(dest)) { ok++; continue; }

  let buf = null;

  // Check manual override first
  const ov = OVERRIDES[item];
  if (ov) {
    if (ov.item)  buf = await tryFetch(`${MC_ITEM}/${ov.item}.png`);
    if (!buf && ov.block) buf = await tryFetch(`${MC_BLOCK}/${ov.block}.png`);
  }

  // Try PokeAPI (berries, held items)
  if (!buf) buf = await tryFetch(`${POKE_BASE}/${toPokeSlug(item)}.png`);

  // Try MC item folder
  if (!buf) buf = await tryFetch(`${MC_ITEM}/${toMcSlug(item)}.png`);

  // Try MC block folder
  if (!buf) buf = await tryFetch(`${MC_BLOCK}/${toMcSlug(item)}.png`);

  if (buf) {
    writeFileSync(dest, buf);
    console.log(`✅ ${item}`);
    ok++;
  } else {
    console.log(`❌ ${item}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} ok, ${fail} not found`);
