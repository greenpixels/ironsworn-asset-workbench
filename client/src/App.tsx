/** @format */

import { useState } from "react";
import { Breadcrumb, Button, Layout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { Sidebar } from "./components/Sidebar/Sidebar";

const { Header, Content } = Layout;

export function App() {
  const [showDrawer, setShowDrawer] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      <Header className="bg-[#43454b] flex pl-0 text-white w-full">
        <Button
          type="text"
          className="my-auto text-white ml-4"
          icon={<MenuOutlined />}
          onClick={() => setShowDrawer(!showDrawer)}
        />

        <span className="mx-8 text-lg my-auto font-bold font-mono">
          Ironbench
        </span>
      </Header>
      <div className="flex relative h-full">
        <Sidebar id="test" showDrawer={showDrawer} />
        <Layout className="h-full w-full" style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              { title: "home" },
              ...location.pathname
                .split("/")
                .slice(1)
                .map((segment) => {
                  return { title: segment };
                }),
            ]}
          />
          <Content
            className="w-full"
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default { App };
