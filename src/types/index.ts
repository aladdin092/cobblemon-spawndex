export type PokemonType =
  | "Normal" | "Fire" | "Water" | "Electric" | "Grass" | "Ice"
  | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug"
  | "Rock" | "Ghost" | "Dragon" | "Dark" | "Steel" | "Fairy";

export type Rarity = "common" | "uncommon" | "rare" | "ultra_rare" | "legendary_rare";
export type TimeOfDay = "any" | "day" | "night" | "morning" | "dawn" | "dusk";
export type Weather = "any" | "clear" | "rain" | "snow" | "thunderstorm" | "fog" | "wind";
export type Dimension = "overworld" | "nether" | "end";
export type EvolutionMethod = "base" | "level" | "stone" | "trade" | "trade_item" | "friendship" | "interaction" | "other";
export type Lang = "fr" | "en";

export interface SpawnEntry {
  biomes: string[];
  time: TimeOfDay;
  weather: Weather;
  rarity: Rarity;
  spawnRate: number;
  minLevel: number;
  maxLevel: number;
  dimension: Dimension;
  structures: string[];
  conditions: string;
}

export interface Evolution {
  from: string | null;
  to: string;
  method: EvolutionMethod;
  detail: string;
}

export interface BaseStats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface DropEntry {
  item: string;
  chance: string;
  minQty: number;
  maxQty: number;
}

export interface Pokemon {
  id: number;
  name: string;
  name_en: string;
  name_fr: string;
  slug: string;
  generation: number;
  types: PokemonType[];
  image: string;
  sprite: string;
  spawns: SpawnEntry[];
  baseStats: BaseStats;
  evolutions: Evolution[];
  huntTips: string[];
  notes: string;
  catchRate: number;
  drops: DropEntry[];
}

export interface FilterState {
  search: string;
  rarity: Rarity[];
  time: TimeOfDay[];
  weather: Weather[];
  dimension: Dimension[];
  sortBy: "id" | "name" | "rarity" | "spawnRate";
}
