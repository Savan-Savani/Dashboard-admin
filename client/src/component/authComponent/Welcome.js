import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Button } from "antd";
import logo from "../../image/logo1.png";

import {
  DashboardTwoTone,
  LeftCircleTwoTone,
  RightCircleTwoTone,
  SnippetsTwoTone,
  SmileTwoTone,
  SlidersTwoTone,
  BuildTwoTone
} from "@ant-design/icons";
import "./css/welcome.css";
import "antd/dist/antd.css";
import PageRoute from "../../Routes/PageRoute";

const Welcome = () => {
  const { Header, Sider, Content } = Layout;

  const [collapsed, setCollapsed] = useState(window.innerWidth < 820);

  let navigate = useNavigate();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const checkUser = () => {
    return true;
  };

  const loginForm = () => {
    navigate({ pathname: "/login" });
    localStorage.clear()
  };

  let location = useLocation();
  var [defaultKey, setdefaultKey] = useState();

  useEffect(() => {
    setdefaultKey(location.pathname);
  }, [location]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "#d9edff" }}>
        <div>
          <img src={logo} className="main_logo" />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[defaultKey]} style={{ background: "#d9edff" }}>
          {localStorage.getItem("type") !== "employee" ? (
            <>
              <Menu.Item
                key="/dashboard/dashboard"
                icon={<DashboardTwoTone />}
                hidden={checkUser}
              >
                <Link to="/dashboard/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/product" icon={<BuildTwoTone />}>
                <Link to="/dashboard/product">Product</Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/employee" icon={<SmileTwoTone />}>
                <Link to="/dashboard/employee">Employee</Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/billing" icon={<SnippetsTwoTone />}>
                <Link to="/dashboard/billing">Billing</Link>
              </Menu.Item>
            </>
          ) : null}
          <Menu.Item
            key="/dashboard/production"
            icon={<SlidersTwoTone />}
          >
            <Link to="/dashboard/production">Production</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ textAlign: "left" }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="trigger" onClick={toggle}>
              {collapsed ? <RightCircleTwoTone /> : <LeftCircleTwoTone />}
            </div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: "auto 1em" }}
              onClick={loginForm}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <PageRoute />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Welcome;
