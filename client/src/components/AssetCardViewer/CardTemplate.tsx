import { AssetCard } from '../../types/Card';

export function CardTemplate(card: AssetCard, width: number, height: number) {
	return (
		<div
			style={{
				border: '1px solid black',
				width: width + 'px',
				height: height + 'px',
				background: 'white',
				display: 'flex',
				flexDirection: 'column',
				boxSizing: 'border-box',
				fontSize: '1.1em',
				fontFamily: 'Georgia',
			}}
		>
			<div
				style={{
					width: '125px',
					height: '125px',
					borderRadius: '9999px',
					border: '0.5em solid white',
					backgroundColor: '#3e3e3e',
					position: 'absolute',
					right: '2em',
					top: '2em',
				}}
			/>
			<span
				style={{
					fontSize: '2.25em',
					padding: '0.5em 0.5em 0.25em 0.5em',
					width: '100%',
					fontWeight: '700',
					backgroundColor: '#3e3e3e',
					color: 'white',
				}}
			>
				{card.category.toLocaleUpperCase()}
			</span>
			<span
				style={{
					fontSize: '3em',
					padding: '0.5em 0.5em 0.5em 0.5em',
					width: '100%',
					fontWeight: '700',
					color: 'black',
				}}
			>
				{card.title.toLocaleUpperCase()}
			</span>
			<div
				style={{
					paddingLeft: '1em',
					paddingRight: '1em',
					display: 'flex',
					flexDirection: 'column',
					fontSize: '2em',
					rowGap: '0.5em',
				}}
			>
				{card.has_name_field && (
					<span
						style={{
							width: '100%',
							borderBottom: '1px solid black',
							paddingBottom: '0.25em',
						}}
					>
						Name:
					</span>
				)}
				<span>{card.description}</span>
				{card.properties.map((property) => {
					return (
						<div
							style={{
								display: 'flex',
								columnGap: '1em',
								paddingLeft: property.indents * 2 + 'em',
							}}
						>
							<span
								style={{
									marginTop: '0.2em',
									fontSize: '0.66em',
									scale: property.indents > 0 ? '50%' : '100%',
								}}
							>
								{property.is_upgradeable ? '⚪' : '⚫'}
							</span>
							<span>
								{property.title && <b>{property.title}: </b>}
								{property.description}
							</span>
						</div>
					);
				})}
				{card.health > 0 && (
					<div
						style={{
							position: 'absolute',
							boxSizing: 'content-box',
							bottom: '1em',
							width: 'calc(100% - 2em)',
							height: '3.5em',
							border: '1px solid black',
							display: 'flex',
						}}
					>
						{['+0', '+1', '+2', '+3', '+4', '+5'].map((entry, index) => (
							<div
								style={{
									border: '1px solid black',
									height: '100%',
									flex: '1 1',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									fontWeight: 700,
									fontSize: '1.5em',
									fontFamily: 'Arial',
									color: '#5F5F5F',
								}}
							>
								{card.health >= index ? entry : '/'}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
