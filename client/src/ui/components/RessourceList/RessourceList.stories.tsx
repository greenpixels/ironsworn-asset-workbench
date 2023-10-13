/** @format */

import type { Meta, StoryObj } from "@storybook/react";
import { RessourceList, RessourceType } from "./RessourceList";
import { HawkMockAssetCard } from "../AssetCardViewer/Mocks";
import { RessourceMetadata } from "@shared/types/Metadata";

const meta: Meta<typeof RessourceList> = {
  component: RessourceList,
};

export default meta;
type Story = StoryObj<typeof RessourceList>;

const creatorMock: RessourceMetadata = {
  created_on: new Date(),
  original: false,
  username: "ironswornPlayer154",
  likes: 100,
  isLiked: false,
};

const entriesMock: Array<{
  ressource: RessourceType;
  meta: RessourceMetadata;
}> = [];
for (let i = 0; i < 100; i++)
  entriesMock.push({
    ressource: HawkMockAssetCard,
    meta: {
      ...creatorMock,
      likes: Math.round(Math.random() * 100),
      isLiked: Math.random() > 0.7,
      original: Math.random() > 0.8,
    },
  });

export const Default: Story = {
  args: {
    entries: entriesMock,
    type: "asset card",
  },
};
