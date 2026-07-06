import { AppstoreOutlined, DatabaseOutlined, SettingOutlined } from "@ant-design/icons";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { DashboardPage } from "../features/dashboard/DashboardPage";

const { Header, Sider, Content } = Layout;

export function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#246bfe",
          borderRadius: 6,
          fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout className="app-shell">
        <Sider width={232} className="app-sidebar">
          <div className="brand">Ops Desk</div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            items={[
              { key: "dashboard", icon: <AppstoreOutlined />, label: "Dashboard" },
              { key: "records", icon: <DatabaseOutlined />, label: "Records" },
              { key: "settings", icon: <SettingOutlined />, label: "Settings" },
            ]}
          />
        </Sider>
        <Layout>
          <Header className="app-header">
            <span>Enterprise console</span>
          </Header>
          <Content className="app-content">
            <DashboardPage />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
