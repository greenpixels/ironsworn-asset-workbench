/** @format */

import Search from "antd/es/input/Search";
import { AssetCard } from "../../types/AssetCard";
import { RessourceMetadata } from "../../types/Metadata";
import { AssetCardViewer } from "../AssetCardViewer/AssetCardViewer";
import { Card, Empty, Tooltip } from "antd";
import HeartOutlined from "@ant-design/icons/lib/icons/HeartOutlined";
import HeartFilled from "@ant-design/icons/lib/icons/HeartFilled";
import { DownloadOutlined, InfoCircleFilled } from "@ant-design/icons";
import { generatePngDataFromAssetCard } from "../../helpers/Converters";
import OriginalContentWarning from "../OriginalContentWarning/OriginalContentWarning";
import Link from "antd/es/typography/Link";

export type RessourceType = AssetCard;
type RessourceTypeLimiter = "asset card";

type RessourceListProps = {
  entries: Array<{ ressource: RessourceType; meta: RessourceMetadata }>;
  type: RessourceTypeLimiter;
};

export function RessourceList(props: RessourceListProps) {
  return (
    <div>
      <Search placeholder="Search ..." />
      {!props.entries.length ? (
        <Empty className="mt-4" />
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 mt-8">
          {props.entries.map((entry, index) => {
            return (
              <div key={index}>
                {renderListRessource(entry.ressource, entry.meta, props.type)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function renderListRessource(
  ressource: RessourceType,
  meta: RessourceMetadata,
  type: RessourceTypeLimiter
) {
  switch (type) {
    case "asset card":
      ressource = ressource as AssetCard;
      return (
        <div>
          <Card
            title={
              <div>
                <span>{ressource.title + " "}</span>
                <br />
                <span className="text-xs text-stone-400">
                  by <Link>{meta.username}</Link>
                </span>

                {meta.original && (
                  <Tooltip title={<OriginalContentWarning />} trigger="click">
                    <InfoCircleFilled className="absolute right-2 top-2 text-yellow-500" />
                  </Tooltip>
                )}
              </div>
            }
            actions={[
              renderLikes(meta.likes, meta.isLiked),
              <span
                title="Download Image"
                onClick={() =>
                  generatePngDataFromAssetCard(ressource).then((uri) => {
                    const link = document.createElement("a");
                    link.href = uri;
                    link.download = ressource.title + "-" + meta.username;
                    link.click();
                    link.remove();
                  })
                }
              >
                <DownloadOutlined />
              </span>,
            ]}
            style={{ maxWidth: "200px", minWidth: "150px" }}
            className={"mx-auto"}
          >
            <div
              className={
                "transition ease-in duration-75 hover:scale-150 cursor-pointer mx-auto justify-center flex"
              }
            >
              <AssetCardViewer card={ressource} scale={0.33} hideDownload />
            </div>
          </Card>
        </div>
      );
  }
}

function renderLikes(amount: number, isLiked: boolean) {
  const Icon = isLiked ? HeartFilled : HeartOutlined;
  return (
    <span className={isLiked ? "text-blue-500" : ""}>
      <Icon /> {amount}
    </span>
  );
}
