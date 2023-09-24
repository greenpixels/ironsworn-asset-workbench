import { Button, Card, Divider, Input, Radio, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AssetCard, AssetCardProperty } from '../../types/Card';

export interface AssetCardFormProps {
	card: AssetCard;
	setCard: (card: AssetCard) => void;
}

export function AssetCardForm(props: AssetCardFormProps) {
	const card = { ...props.card };
	return (
		<Card
			data-testid={'asset-card-form'}
			className={'flex-1'}
			title={<span>Asset Card Creator</span>}
		>
			<div className={'flex flex-wrap gap-2'}>
				<Select
					data-testid={'asset-card-form-category'}
					placeholder={'Category'}
					className={'flex-1'}
					style={{ minWidth: '200px' }}
					value={card.category}
					onChange={(value) => {
						props.setCard({ ...card, category: value });
					}}
					options={[
						{ label: 'Ritual', value: 'ritual' },
						{ label: 'Combat Talent', value: 'combat talent' },
						{ label: 'Path', value: 'path' },
						{ label: 'Companion', value: 'companion' },
					]}
				/>
				<Select
					data-testid={'asset-card-form-health'}
					placeholder={'Health'}
					className={'flex-1 max-w-xs'}
					onChange={(value) => {
						props.setCard({ ...card, health: value });
					}}
					value={card.health}
					options={[
						{ label: '0 Health', value: 0 },
						{ label: '1 Health', value: 1 },
						{ label: '2 Health', value: 2 },
						{ label: '3 Health', value: 3 },
						{ label: '4 Health', value: 4 },
						{ label: '5 Health', value: 5 },
					]}
				/>
				<Radio.Group
					data-testid={'asset-card-form-name'}
					onChange={(e) => {
						props.setCard({ ...card, has_name_field: e.target.value });
					}}
					value={card.has_name_field}
					className={'flex-1 flex-grow flex'}
				>
					<Radio.Button
						className={'flex-1'}
						value={true}
					>
						Name Field
					</Radio.Button>
					<Radio.Button
						className={'max-w-max'}
						style={{ textDecoration: 'line-through' }}
						value={false}
					>
						None
					</Radio.Button>
				</Radio.Group>

				<Input
					data-testid={'asset-card-form-title'}
					onChange={(e) => {
						props.setCard({ ...card, title: e.target.value });
					}}
					placeholder={'Asset Title'}
					value={card.title}
					className={'flex-1 min-w-full'}
				/>
				<Divider />
				<TextArea
					data-testid={'asset-card-form-description'}
					className={'flex-1'}
					placeholder="Description ..."
					value={card.description}
					onChange={(e) => {
						props.setCard({ ...card, description: e.target.value });
					}}
					autoSize={{ minRows: 3, maxRows: 3 }}
				/>

				<Divider />

				{card.properties.map((property, index) => {
					return renderProperty(property, index, card, props.setCard);
				})}

				<Button
					className={'m-auto mt-2'}
					data-testid={'asset-card-form-add-property'}
					onClick={() => addProperty(props.setCard, card)}
				>
					+ Add Property
				</Button>
			</div>
		</Card>
	);
}

function addProperty(setCard: (card: AssetCard) => void, card: AssetCard) {
	card.properties.push({
		description: '',
		indents: 0,
		is_upgradeable: false,
		title: '',
	});
	setCard(card);
}

function removeProperty(
	propertyIndex: number,
	setCard: (card: AssetCard) => void,
	card: AssetCard
) {
	card.properties.splice(propertyIndex, 1);
	setCard(card);
}

function renderProperty(
	property: AssetCardProperty,
	propertyIndex: number,
	card: AssetCard,
	setCard: (card: AssetCard) => void
) {
	return (
		<div
			data-testid={'asset-card-form-property'}
			className={'w-full flex gap-2 flex-wrap flex-grow'}
		>
			<Button
				danger
				data-testid={'asset-card-form-property-remove'}
				className={'flex-1 min-w-min max-w-min'}
				onClick={() => removeProperty(propertyIndex, setCard, card)}
			>
				Remove
			</Button>
			<Select
				data-testid={'asset-card-form-property-indents'}
				placeholder={'Indents'}
				className={'flex-1 max-w-sm'}
				value={property.indents}
				onChange={(value) => {
					editProperty('indents', value, propertyIndex, card, setCard);
				}}
				options={[
					{ label: 'No Indent', value: 0 },
					{ label: '1 Indent', value: 1 },
					{ label: '2 Indents', value: 2 },
					{ label: '3 Indents', value: 3 },
				]}
				allowClear
			/>
			<Select
				data-testid={'asset-card-form-property-upgrade'}
				placeholder={'Upgradeable ...'}
				className={'flex-1'}
				value={property.is_upgradeable}
				onChange={(value) => {
					editProperty('is_upgradeable', value, propertyIndex, card, setCard);
				}}
				options={[
					{ label: 'Can be upgraded', value: true },
					{ label: 'Can not be upgraded', value: false },
				]}
				allowClear
			/>
			<div className="flex w-full gap-2 flex-wrap">
				<Input
					data-testid={'asset-card-form-property-title'}
					value={property.title}
					onChange={(e) => {
						editProperty('title', e.target.value, propertyIndex, card, setCard);
					}}
					placeholder={'Property Title ...'}
					className={'max-w-xs'}
				/>
				<Input
					data-testid={'asset-card-form-property-description'}
					value={property.description}
					onChange={(e) => {
						editProperty(
							'description',
							e.target.value,
							propertyIndex,
							card,
							setCard
						);
					}}
					placeholder={'Property Description ...'}
					className={'flex-grow'}
				/>
			</div>
			<Divider />
		</div>
	);
}

function editProperty(
	key: keyof AssetCardProperty,
	value: AssetCardProperty[typeof key],
	propertyIndex: number,
	card: AssetCard,
	setCard: (card: AssetCard) => void
) {
	const cardCopy = { ...card };
	const cardProperty = cardCopy.properties[propertyIndex];
	(cardProperty[key] as AssetCardProperty[typeof key]) = value;
	setCard(cardCopy);
}
