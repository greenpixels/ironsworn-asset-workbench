/** @format */

// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import { App } from "./App";

const meta: Meta<typeof App> = {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof App>;

export const Default: Story = {};
