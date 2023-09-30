/** @format */

export type AssetCardCategory =
  | "path"
  | "companion"
  | "ritual"
  | "combat talent";

export type AssetCardProperty = {
  indents: number;
  is_upgradeable: boolean;
  title: string;
  description: string;
};

export type CardMetaInfo = {
  creator: string;
  is_original: boolean;
  likes: number;
};

export interface AssetCard {
  category: AssetCardCategory;
  title: string;
  health: number;
  has_name_field: boolean;
  description: string;
  properties: Array<AssetCardProperty>;
}
