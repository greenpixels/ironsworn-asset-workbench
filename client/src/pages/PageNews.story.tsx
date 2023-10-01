/** @format */

// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import { PageNews } from "./PageNews";

const meta: Meta<typeof PageNews> = {
  component: PageNews,
};

export default meta;
type Story = StoryObj<typeof PageNews>;

export const Default: Story = {};
