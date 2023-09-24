import type { Meta, StoryObj } from '@storybook/react';

import { AssetCardViewer } from './AssetCardViewer';

const meta: Meta<typeof AssetCardViewer> = {
	component: AssetCardViewer,
};

export default meta;
type Story = StoryObj<typeof AssetCardViewer>;

export const Default: Story = {
	args: {
		card: {
			category: 'companion',
			description: 'Your hawk can aid you while it is aloft.',
			has_name_field: true,
			health: 3,
			properties: [
				{
					description:
						'When you Undertake a Journey, or when you Resupply by hunting for small game, add +1.',
					indents: 0,
					title: 'Far-seeing',
					is_upgradeable: false,
				},
				{
					description:
						'When you Secure an Advantage +edge using your hawk to harass and distract your foes, add +1 and take +1 momentum on a hit.',
					indents: 0,
					title: 'Fierce',
					is_upgradeable: true,
				},
				{
					description:
						'When you Face Danger +wits to detect an approaching threat, or when you Enter the Fray +wits against an ambush, add +2.',
					title: 'Vigilant',
					indents: 0,
					is_upgradeable: true,
				},
			],
			title: 'Hawk',
		},
	},
};
