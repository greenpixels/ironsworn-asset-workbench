// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { AssetCardEditor } from './AssetCardEditor';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof AssetCardEditor> = {
	component: AssetCardEditor,
};

export default meta;
type Story = StoryObj<typeof AssetCardEditor>;

export const Default: Story = {};
