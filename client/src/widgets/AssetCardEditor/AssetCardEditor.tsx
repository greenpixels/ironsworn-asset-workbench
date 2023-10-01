/** @format */

import { useEffect, useState } from "react";
import { AssetCardViewer } from "../../components/AssetCardViewer/AssetCardViewer";
import { AssetCardForm } from "../../components/AssetCardForm/AssetCardForm";
import { AssetCard } from "../../../../shared/types/AssetCard";

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
  const [cardScale, setCardScale] = useState(1);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleWindowResize = () => {
    const width = window.innerWidth;
    if (width) {
      const small = 400;
      const medium = 1000;
      if (width <= small) {
        setCardScale(0.66);
      } else if (width <= medium) {
        setCardScale(1);
      } else {
        setCardScale(1.25);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: "2em",
        rowGap: "1em",
      }}
    >
      <AssetCardViewer card={card} scale={cardScale} />
      <AssetCardForm card={card} setCard={setCard} />
    </div>
  );
}
