/** @format */

// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { AssetCardForm } from "./AssetCardForm";
import { useState } from "react";
import { AssetCard } from "../../types/Card";

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
            });
            return (
                <div>
                    <Story args={{ card, setCard }} />
                </div>
            );
        },
    ],
};
