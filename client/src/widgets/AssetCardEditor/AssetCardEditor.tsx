/** @format */

import { useEffect, useState } from "react";
import { AssetCardViewer } from "../../components/AssetCardViewer/AssetCardViewer";
import { AssetCardForm } from "../../components/AssetCardForm/AssetCardForm";
import { AssetCard } from "@shared/types/AssetCard";
import useScaleBreakpoints from "../../helpers/hooks/useScaleBreakpoints";

type AssetCardEditorProps = {
  initial?: AssetCard;
};

const defaultCard = {
  category: "ritual",
  description: "This is my description ...",
  has_name_field: false,
  properties: [],
  health: 0,
  title: "Custom Title",
  custom_fields: [],
} satisfies AssetCard;

export function AssetCardEditor({
  initial = defaultCard,
}: AssetCardEditorProps) {
  const [card, setCard] = useState<AssetCard>(initial);
  const scale = useScaleBreakpoints();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: "2em",
        rowGap: "1em",
      }}
    >
      <AssetCardViewer card={card} scale={scale} />
      <AssetCardForm card={card} setCard={setCard} />
    </div>
  );
}
