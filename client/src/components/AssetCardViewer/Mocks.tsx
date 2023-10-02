/** @format */

import { AssetCard } from "@shared/types/AssetCard";

export const HawkMockAssetCard = {
  category: "companion",
  description: "Your hawk can aid you while it is aloft.",
  has_name_field: true,
  health: 3,
  properties: [
    {
      description:
        "When you Undertake a Journey, or when you Resupply by hunting for small game, add +1.",
      indents: 0,
      title: "Far-seeing",
      is_upgradeable: false,
    },
    {
      description:
        "When you Secure an Advantage +edge using your hawk to harass and distract your foes, add +1 and take +1 momentum on a hit.",
      indents: 0,
      title: "Fierce",
      is_upgradeable: true,
    },
    {
      description:
        "When you Face Danger +wits to detect an approaching threat, or when you Enter the Fray +wits against an ambush, add +2.",
      title: "Vigilant",
      indents: 0,
      is_upgradeable: true,
    },
  ],
  title: "Hawk",
  custom_fields: [],
} satisfies AssetCard;

export const IroncladMockAssetCard = {
  category: "combat talent",
  description: "If you wear armor...",
  has_name_field: false,
  properties: [
    {
      description: "When you equip or adjust your armor, choose one.",
      indents: 0,
      is_upgradeable: false,
      title: "",
    },
    {
      description:
        "When you Endure Harm in a fight, add +1 and take +1 momentum on a hit.",
      indents: 1,
      is_upgradeable: false,
      title: "Lightly armored",
    },
    {
      description:
        "Mark encumbered. When you Endure Harm in a fight, add +2 and take +1 momentum on a hit.",
      indents: 1,
      is_upgradeable: false,
      title: "Geared for war",
    },
    {
      description: "When you Clash while you are geared for war, add +1.",
      indents: 0,
      is_upgradeable: true,
      title: "",
    },
    {
      description:
        "When you Compel in a situation where strength of arms is a factor, add +2.",
      indents: 0,
      is_upgradeable: true,
      title: "",
    },
  ],
  health: 0,
  title: "Ironclad",
  custom_fields: ["LIGHTLY ARMORED", "GEARED FOR WAR"],
} satisfies AssetCard;

export const FletcherMockAssetCard = {
  category: "combat talent",
  description: "",
  has_name_field: false,
  properties: [
    {
      description:
        "When you Secure an Advantage by crafting arrows of fine quality, add +1. Then, take +1 supply or +1 momentum on a hit.",
      indents: 0,
      is_upgradeable: false,
      title: "",
    },
    {
      description:
        "When you Resupply by recovering or gathering arrows after a battle, add +2.",
      indents: 0,
      is_upgradeable: true,
      title: "",
    },
    {
      description:
        "When you craft a single arrow designated for a specific foe, envision the process and materials, and roll +wits. On a strong hit, take both. On a weak hit, choose one.",
      indents: 0,
      is_upgradeable: true,
      title: "",
    },
    {
      description:
        "When a shooter uses the arrow to Strike or Clash against this foe, reroll any dice (one time only).",
      indents: 1,
      is_upgradeable: false,
      title: "Seeker",
    },
    {
      description:
        "When a shooter uses the arrow to inflict harm against this foe, inflict +1d6 harm (one time only).",
      indents: 1,
      is_upgradeable: false,
      title: "Ravager",
    },
  ],
  health: 0,
  title: "Fletcher",
  custom_fields: [],
} satisfies AssetCard;
