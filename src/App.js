import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined, TeamOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './logo.jpg';
import Resume from './pages/Resume'
import FormPage from './pages/FormPage';

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
      <Menu.Item key="/pages/Resume" icon={<FileOutlined />}>
        <Link to="/pages/Resume">Resume</Link>
      </Menu.Item>
      <Menu.Item key="/pages/FormPage" icon={<TeamOutlined />}>
        <Link to="/pages/FormPage">Crew</Link>
      </Menu.Item>
      <Menu.Item key="/shipments-management.html" icon={<InboxOutlined />}>
        <a href="/shipments-management.html" target="_blank" rel="noopener noreferrer">
          Shipments
        </a>
      </Menu.Item>
    </Menu>
  );
};

const Dashboard = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh', padding: '0px' }}>
        <Sider>
          <div className="logo" />
          <div style={{ padding: '16px', color: '#fff' }}>Dashboard</div>
          <Sidebar />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, display: 'flex', alignItems: 'center' }}>
            <div className="logo">
              <img
                src={logo}
                alt="Logo"
                style={{ height: '70px', marginRight: '16px', marginLeft: '30px', paddingTop: '30px' }}
              />
            </div>
            <h2 style={{ margin: 0, flex: 1, textAlign: 'center', paddingBottom: '12px' }}>Admin Dashboard</h2>
            <Avatar size="large" icon={<UserOutlined />} style={{ marginLeft: 'auto', paddingBottom: '25px' }} />
          </Header>
          <Content style={{ margin: '16px' }}>
            <Routes>
              {/* Other routes */}
              <Route path="/pages/Resume" element={<Resume />} />
              <Route path="/pages/FormPage" element={<FormPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Dashboard;
