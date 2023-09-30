/** @format */

import type { Meta, StoryObj } from "@storybook/react";

import { AssetCardViewer } from "./AssetCardViewer";
import { HawkMockAssetCard } from "./Mocks";

const meta: Meta<typeof AssetCardViewer> = {
  component: AssetCardViewer,
};

export default meta;
type Story = StoryObj<typeof AssetCardViewer>;

export const Default: Story = {
  args: {
    card: HawkMockAssetCard,
    scale: 1,
  },
};

export const Original: Story = {
  args: {
    card: HawkMockAssetCard,
    scale: 1,
    isOriginal: true,
  },
};
