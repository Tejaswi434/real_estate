import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css'; // Make sure to import Ant Design styles
import { HomeOutlined, DollarCircleOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons'; // Import Ant Design icons

const { Header: AntHeader } = Layout;

const Header = () => { 
const navigate = useNavigate(); // Correct way to use useNavigate
  return (
    <AntHeader style={{ backgroundColor: '#0d416b', padding: '0 20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="logo" style={{ float: 'left', marginRight: '20px' }}>
        <h2 style={{ color: '#fff', margin: '0', fontSize: '24px', fontWeight: 'bold' }}>Real Estate Lokam</h2>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px', backgroundColor: '#0d416b', borderBottom: 'none', float: 'right' }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />} style={{ marginRight: '20px' }}>
          <Link to="/" style={{ color: '#fff', fontWeight: 'bold' }}>Home</Link>
        </Menu.Item>
        <Menu.Item key="financial-assistant" icon={<DollarCircleOutlined />} style={{ marginRight: '20px' }}>
          <Link to="/financial-assistant" style={{ color: '#fff', fontWeight: 'bold' }}>Financial Assistant</Link>
        </Menu.Item>
        <Menu.Item key="wishlist" icon={<HeartOutlined />} style={{ marginRight: '20px' }}
        >
          <Link to="/wishlist" style={{ color: '#fff', fontWeight: 'bold' }}>Wishlist</Link>
        </Menu.Item> 
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/profile" style={{ color: '#fff', fontWeight: 'bold' }}>Profile</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;