/** @format */

import { useState } from "react";
import { AssetCard } from "../../types/Card";
import { AssetCardViewer } from "../../components/AssetCardViewer/AssetCardViewer";
import { AssetCardForm } from "../../components/AssetCardForm/AssetCardForm";

export function AssetCardEditor() {
    const [card, setCard] = useState<AssetCard>({
        category: "ritual",
        description: "",
        has_name_field: false,
        properties: [],
        health: 0,
        title: "",
    });
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                columnGap: "2em",
                rowGap: "1em",
            }}
        >
            <AssetCardViewer card={card} scale={1} />
            <AssetCardForm card={card} setCard={setCard} />
        </div>
    );
}
