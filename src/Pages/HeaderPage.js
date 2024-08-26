import React, { useEffect, useState } from 'react';
import { Layout, Menu, Card, Input } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const items =
    () => [
        { key: '0', label: 'Sign In' },
        { key: '1', label: <UserOutlined style={{ fontSize: '24px' }} /> },
        { key: '2', label: <LogoutOutlined style={{ fontSize: '24px' }} /> }
    ];

function HeaderPage() {
    return (
        <div>
            <Header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 24px',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw', // Use viewport width to ensure full width
                    zIndex: 1000,
                    height: '64px',
                    boxSizing: 'border-box', // Ensures padding is included in width
                    overflow: 'hidden' // Prevent horizontal overflow
                }}
            >
                <div className='heading'>Real Estate Management System</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={items()}
                    style={{
                        fontSize: '20px',
                        flex: 1,
                        justifyContent: 'flex-end',
                        border: 'none',
                        color: '#fff'
                    }}
                />
            </Header>

        </div>
    )
}

export default HeaderPage
