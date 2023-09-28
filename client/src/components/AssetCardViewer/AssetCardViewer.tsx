import { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { AssetCard } from '../../types/Card';
import { CardTemplate } from './CardTemplate';
import {
	convertHtmlStringToSvg,
	convertJsxToHtmlString,
	convertSvgToPng,
} from '../helpers/Converters';

interface AssetCardViewerProps {
	card: AssetCard;
}

const imageWidth = 750;
const imageHeight = 1050;
const containerWidth = 300;
const containerHeight = imageHeight * (containerWidth / imageWidth);
const cardSizeStyle = {
	width: containerWidth + 'px',
	height: containerHeight + 'px',
};

export function AssetCardViewer(props: AssetCardViewerProps) {
	const [src, setSrc] = useState<string>('');
	const [loaded, setLoaded] = useState(false);
	console.log(loaded);
	useEffect(() => {
		const cardSvg = createCardSvg(props.card, 750, 1050);
		convertSvgToPng(cardSvg).then((sourceString) => {
			setSrc(sourceString);
		});
	}, [props.card]);

	return (
		<div className={'flex mx-auto'}>
			<div className={'flex flex-wrap flex-col gap-2'}>
				<div style={cardSizeStyle}>
					<Spin
						tip="Loading"
						size="large"
						spinning={!loaded}
					>
						<img
							style={{
								...cardSizeStyle,
								objectFit: 'contain',
								background: 'lightgray',
							}}
							src={src}
							width={containerWidth}
							height={containerHeight}
							onLoad={() => {
								setLoaded(true);
								console.log('loaded');
							}}
							loading="lazy"
						/>
					</Spin>
				</div>

				<Button
					ghost
					href={src}
					target={'_blank'}
					download={`asset-card-${props.card.category}-${props.card.title}`}
					type="primary"
				>
					Download Image
				</Button>
				<Button
					href={
						'data:text/json;charset=utf-8,' +
						encodeURIComponent(JSON.stringify(props.card))
					}
					target={'_blank'}
					download={`asset-card-${props.card.category}-${props.card.title}.json`}
				>
					Download JSON
				</Button>
			</div>
		</div>
	);
}

function createCardSvg(card: AssetCard, width: number, height: number) {
	const jsxTemplate = CardTemplate(card, width, height);
	const htmlString = convertJsxToHtmlString(jsxTemplate);
	return convertHtmlStringToSvg(htmlString, width, height);
}
