import CompassOutlined from "@ant-design/icons/lib/icons/CompassOutlined";
import ExperimentOutlined from "@ant-design/icons/lib/icons/ExperimentOutlined";
import NotificationOutlined from "@ant-design/icons/lib/icons/NotificationOutlined";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu/menu";
import React from "react";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  showDrawer: boolean;
  id: string;
};

export function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  return (
    <div
      id={props.id}
      className={
        "transition ease-in-out z-10 absolute top-0 bottom-0 " +
        (!props.showDrawer
          ? "-translate-x-full opacity-0"
          : " translate-x-0 opacity-100")
      }
    >
      <Sider className="h-full relative" width={200}>
        <Menu
          mode="inline"
          className="w-full h-full absolute"
          items={[
            {
              key: "menu-news",
              icon: React.createElement(NotificationOutlined),
              label: "News",
              title: "News",
              onClick: () => {
                navigate("news");
              },
            },
            {
              key: "menu-compass",
              icon: React.createElement(CompassOutlined),
              label: "Explore",
              title: "Explore",
              children: [
                {
                  key: "menu-explore-asset-cards",
                  label: "Asset Cards",
                  onClick: () => {
                    navigate("explore/assets");
                  },
                },
              ],
            },
            {
              key: "menu-editors",

              icon: React.createElement(ExperimentOutlined),
              label: "Editors",
              title: "Editors",
              children: [
                {
                  key: "menu-asset-card-editor",
                  label: "Asset Card Editor",
                  title: "Asset Card Editor",
                  onClick: () => {
                    navigate("editors/asset");
                  },
                },
              ],
            },
          ]}
        />
        <span className="absolute bottom-0 p-2 text-center w-full text-gray-600 font-thin">
          Ironbench {APP_VERSION}
        </span>
      </Sider>
    </div>
  );
}
