import ReactDOMServer from 'react-dom/server';
import { AssetCard } from '../types/Card';
import { CardTemplate } from '../components/AssetCardViewer/CardTemplate';

export function convertJsxToHtmlString(jsx: JSX.Element) {
	return ReactDOMServer.renderToStaticMarkup(jsx);
}

export function convertSvgToPng(svgDataURL: string): Promise<string> {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	const svgImage = new Image();
	svgImage.src = svgDataURL;

	return new Promise((resolve) => {
		svgImage.onload = () => {
			canvas.width = svgImage.width;
			canvas.height = svgImage.height;

			ctx!.drawImage(svgImage, 0, 0);

			const pngDataURL = canvas.toDataURL('image/png');
			canvas.remove();
			svgImage.remove();

			resolve(pngDataURL);
		};
	});
}

export function convertHtmlStringToSvg(
	html: string,
	width: number,
	height: number
) {
	return (
		'data:image/svg+xml,' +
		encodeURIComponent(
			`
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${height}px">
                <foreignObject width="100%" height="100%">
                    <div xmlns="http://www.w3.org/1999/xhtml" width="100%" height="100%">
                        ${html}
                    </div>
                </foreignObject>
            </svg>
            `
		)
	);
}

export async function generatePngDataFromAssetCard(assetcard: AssetCard) {
	const width = 750;
	const height = 1050;
	const cardSvg = createSvgFromJSX(
		width,
		height,
		CardTemplate(assetcard, width, height)
	);
	return convertSvgToPng(cardSvg);
}

export function createSvgFromJSX(
	width: number,
	height: number,
	jsx: JSX.Element
) {
	const jsxTemplate = jsx;
	const htmlString = convertJsxToHtmlString(jsxTemplate);
	return convertHtmlStringToSvg(htmlString, width, height);
}
