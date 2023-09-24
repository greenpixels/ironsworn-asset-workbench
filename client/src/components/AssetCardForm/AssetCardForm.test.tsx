import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { AssetCardForm } from './AssetCardForm';
import { AssetCard } from '../../types/Card';
import { test, describe, vi, expect, beforeAll, beforeEach } from 'vitest';

const mockCard: AssetCard = {
	category: 'combat talent',
	description: '',
	has_name_field: false,
	health: 2,
	properties: [
		{ description: '', indents: 0, is_upgradeable: false, title: '' },
		{ description: '', indents: 0, is_upgradeable: false, title: '' },
	],
	title: '',
};

describe('Testing AssetCardForm Render', () => {
	beforeAll(() => {
		cleanup();
		render(
			<AssetCardForm
				card={mockCard}
				setCard={vi.fn()}
			/>
		);
	});

	test('Should find card', async () => {
		const element = await screen.findByTestId('asset-card-form');
		expect(element).not.toBeNull();
	});

	test('Should find category control', async () => {
		const element = await screen.findByTestId('asset-card-form-category');
		expect(element).not.toBeNull();
	});

	test('Should find title control', async () => {
		const element = await screen.findByTestId('asset-card-form-title');
		expect(element).not.toBeNull();
	});

	test('Should find name control', async () => {
		const element = await screen.findByTestId('asset-card-form-name');
		expect(element).not.toBeNull();
	});

	test('Should find description control', async () => {
		const element = await screen.findByTestId('asset-card-form-description');
		expect(element).not.toBeNull();
	});

	test('Should find health control', async () => {
		const element = await screen.findByTestId('asset-card-form-health');
		expect(element).not.toBeNull();
	});

	test('Should find add-property control', async () => {
		const element = await screen.findByTestId('asset-card-form-add-property');
		expect(element).not.toBeNull();
	});

	test('Should find both properties', async () => {
		const elements = await screen.findAllByTestId('asset-card-form-property');
		expect(elements.length).toBe(2);
	});

	test('Should have remove-control in both properties', async () => {
		const elements = await screen.findAllByTestId(
			'asset-card-form-property-remove'
		);
		expect(elements.length).toBe(2);
	});

	test('Should have indents-control in both properties', async () => {
		const elements = await screen.findAllByTestId(
			'asset-card-form-property-indents'
		);
		expect(elements.length).toBe(2);
	});

	test('Should have upgrade-control in both properties', async () => {
		const elements = await screen.findAllByTestId(
			'asset-card-form-property-upgrade'
		);
		expect(elements.length).toBe(2);
	});

	test('Should have title-control in both properties', async () => {
		const elements = await screen.findAllByTestId(
			'asset-card-form-property-title'
		);
		expect(elements.length).toBe(2);
	});

	test('Should have description-control in both properties', async () => {
		const elements = await screen.findAllByTestId(
			'asset-card-form-property-description'
		);
		expect(elements.length).toBe(2);
	});
});

describe('Testing setCard-Prop in Category-Select', () => {
	const mockSetter = vi.fn();
	const user = userEvent.setup();

	beforeEach(() => {
		cleanup();
		mockSetter.mockClear();
	});

	test('Should render ritual option and fire its onChange event with the changed card', async () => {
		render(
			<AssetCardForm
				card={mockCard}
				setCard={mockSetter}
			/>
		);

		const element = await screen.findByTestId('asset-card-form-category');
		user.click(element.firstElementChild!);

		const option = await screen.findByTitle('Ritual');
		expect(option).not.toBeNull();

		user.hover(option);
		user.click(option);
		await waitFor(async () => {
			return expect(mockSetter).toHaveBeenCalledWith({
				...mockCard,
				category: 'ritual',
			});
		});
	});

	test('Should render companion option and fire its onChange event with the changed card', async () => {
		render(
			<AssetCardForm
				card={mockCard}
				setCard={mockSetter}
			/>
		);

		const element = await screen.findByTestId('asset-card-form-category');
		user.click(element.firstElementChild!);

		const option = await screen.findByTitle('Companion');
		expect(option).not.toBeNull();

		user.hover(option);
		user.click(option);
		await waitFor(async () => {
			return expect(mockSetter).toHaveBeenCalledWith({
				...mockCard,
				category: 'companion',
			});
		});
	});

	test('Should render combat talent option and fire its onChange event with the changed card', async () => {
		render(
			<AssetCardForm
				// We need to set the initial value to something other than "combat talent" on order to trigger onChange
				card={{ ...mockCard, category: 'path' }}
				setCard={mockSetter}
			/>
		);

		const element = await screen.findByTestId('asset-card-form-category');
		user.click(element.firstElementChild!);

		const option = await screen.findByTitle('Combat Talent');
		expect(option).not.toBeNull();

		user.hover(option);
		user.click(option);
		await waitFor(async () => {
			return expect(mockSetter).toHaveBeenCalledWith({
				...mockCard,
				category: 'combat talent',
			});
		});
	});

	test('Should render path option and fire its onChange event with the changed card', async () => {
		render(
			<AssetCardForm
				card={mockCard}
				setCard={mockSetter}
			/>
		);

		const element = await screen.findByTestId('asset-card-form-category');
		user.click(element.firstElementChild!);

		const option = await screen.findByTitle('Path');
		expect(option).not.toBeNull();

		user.hover(option);
		user.click(option);
		await waitFor(async () => {
			return expect(mockSetter).toHaveBeenCalledWith({
				...mockCard,
				category: 'path',
			});
		});
	});
});
