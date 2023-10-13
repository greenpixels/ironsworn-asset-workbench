/** @format */

// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { AssetCardForm } from "./AssetCardForm";
import { AssetCard } from "@shared/types/AssetCard";
import { useState } from "react";

const meta: Meta<typeof AssetCardForm> = {
  component: AssetCardForm,
};

export default meta;
type Story = StoryObj<typeof AssetCardForm>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [card, setCard] = useState<AssetCard>({
        category: "combat talent",
        description: "",
        has_name_field: false,
        properties: [],
        health: 0,
        title: "",
        custom_fields: [],
      });
      return (
        <div>
          <Story args={{ card, setCard }} />
        </div>
      );
    },
  ],
};
