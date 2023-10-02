/** @format */

import type { Meta, StoryObj } from "@storybook/react";

import { AssetCardViewer } from "./AssetCardViewer";
import {
  FletcherMockAssetCard,
  HawkMockAssetCard,
  IroncladMockAssetCard,
} from "./Mocks";

const meta: Meta<typeof AssetCardViewer> = {
  component: AssetCardViewer,
};

export default meta;
type Story = StoryObj<typeof AssetCardViewer>;

export const Original: Story = {
  args: {
    card: HawkMockAssetCard,
    scale: 1,
    isOriginal: true,
  },
};

export const Hawk: Story = {
  args: {
    card: HawkMockAssetCard,
    scale: 1,
  },
};

export const Ironclad: Story = {
  args: {
    card: IroncladMockAssetCard,
    scale: 1,
  },
};

export const Fletcher: Story = {
  args: {
    card: FletcherMockAssetCard,
    scale: 1,
  },
};
