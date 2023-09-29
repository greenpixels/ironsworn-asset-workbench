/** @format */

import { useEffect, useRef, useState } from "react";
import { Alert, Button, Spin } from "antd";
import { AssetCard } from "../../types/Card";
import { useInView } from "../../helpers/hooks/useInView";
import { generatePngDataFromAssetCard } from "../../helpers/Converters";
import OriginalContentWarning from "../OriginalContentWarning/OriginalContentWarning";

type AssetCardViewerProps = {
    card: AssetCard;
    scale: number;
    hideDownload?: boolean;
    isOriginal?: boolean;
    hideOriginalBanner?: boolean;
    onClick?: () => void;
};

export function AssetCardViewer({
    hideDownload = false,
    hideOriginalBanner = false,
    ...props
}: AssetCardViewerProps) {
    const [src, setSrc] = useState<string>("");
    const [loaded, setLoaded] = useState(false);
    const [hideOriginalWarning, setHideOriginalWarning] = useState(false);
    const imageWidth = 750;
    const imageHeight = 1050;
    const containerWidth = 300 * props.scale;
    const containerHeight = imageHeight * (containerWidth / imageWidth);
    const cardSizeStyle = {
        width: containerWidth + "px",
        height: containerHeight + "px",
        maxWidth: containerWidth + "px",
        maxHeight: containerHeight + "px",
    };
    const ref = useRef(null);
    const inViewport = useInView(ref, "0px");
    useEffect(() => {
        if (!inViewport) return;
        generatePngDataFromAssetCard(props.card).then((sourceString) => {
            setSrc(sourceString);
        });
    }, [props.card, inViewport]);

    return (
        <div ref={ref} className={"flex mx-auto"} onClick={props.onClick}>
            <div className={"flex flex-wrap flex-col gap-2"}>
                <div style={cardSizeStyle}>
                    <Spin tip="Loading" size="large" spinning={!loaded}>
                        <img
                            draggable={false}
                            style={{
                                ...cardSizeStyle,
                                objectFit: "contain",
                                background: "#F5F5F5",
                            }}
                            src={src}
                            width={containerWidth}
                            height={containerHeight}
                            onLoad={() => {
                                setLoaded(true);
                            }}
                            loading="lazy"
                        />
                        {!hideOriginalWarning &&
                            !hideOriginalBanner &&
                            props.isOriginal && (
                                <Alert
                                    banner
                                    showIcon
                                    className={"absolute bottom-0 w-full"}
                                    message={<b>Original</b>}
                                    description={
                                        <OriginalContentWarning
                                            onHide={() =>
                                                setHideOriginalWarning(true)
                                            }
                                        />
                                    }
                                    type="warning"
                                />
                            )}
                    </Spin>
                </div>
                {!hideDownload && (
                    <>
                        <Button
                            ghost
                            href={src}
                            target={"_blank"}
                            download={`asset-card-${props.card.category}-${props.card.title}`}
                            type="primary"
                        >
                            Download Image
                        </Button>
                        <Button
                            href={
                                "data:text/json;charset=utf-8," +
                                encodeURIComponent(JSON.stringify(props.card))
                            }
                            target={"_blank"}
                            download={`asset-card-${props.card.category}-${props.card.title}.json`}
                        >
                            Download JSON
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
