import React, { useContext, useEffect } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, LogoutOutlined, LoginOutlined, TagOutlined,StarOutlined   } from '@ant-design/icons';
import { Layout, Menu, theme, Avatar, Dropdown, Space } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { Mycontext } from '../../App';
import './Dashboard.css';

const { Header, Content } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(' Dashboard1', '', <PieChartOutlined />),
  getItem('Add', 'add', <DesktopOutlined />),
  getItem('Orders', 'orders', <TeamOutlined />),
  getItem('List', 'list', <FileOutlined />),
  getItem('Category', 'category', <TagOutlined />),
  getItem('Reviews', 'reviews', <StarOutlined    />),
];

const Dashboard = () => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const { setIsHeaderShow, setIsNavberShow } = useContext(Mycontext);

  useEffect(() => {
    setIsHeaderShow(false);
  }, [setIsHeaderShow, setIsNavberShow]);

  const userMenu = (
    <Menu>
      <Menu.Item key="login" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to="/login">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header-content">
        <div className="logo">My Logo</div>
        <Dropdown overlay={userMenu}>
          <Space>
            <Avatar icon={<UserOutlined />} className="avatar" />
          </Space>
        </Dropdown>
      </Header>
      <Menu mode="horizontal" theme="dark" className="header-menu " >
        {items.map(item => (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
