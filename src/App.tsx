
import { Flex, Layout, Menu, Typography } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "/",
    label: (
      <Link to="/">Заказы</Link>
    ),
  },
  {
    key: "/products",
    label: (
      <Link to="/products">Товары</Link>
    ),
  }
]

const { Title } = Typography


const App = () => {

  const {pathname} = useLocation()

  

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Link to="/">
          <Flex align="center" gap={6}>
            <InboxOutlined style={{ color: "#ffffff", fontSize: "30px" }} />
            <Title style={{ margin: 0, color: "#ffffff" }} level={1}>
              OrderPoint
            </Title>
          </Flex>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0, marginLeft: 20 }}
          selectedKeys={[pathname]}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        OrderPoint ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;
