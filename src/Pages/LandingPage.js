import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Card, Input } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import "./Landingpage.css";
import Login from './Login';
import defaultImages from './LandingData';
import FooterPage from './FooterPage';

const { Search } = Input;
const { Meta } = Card;
const { Header, Content } = Layout;

const items = (navigate) => [
    { key: '0', label: 'Sign In', onClick: () => navigate('/login') },
    { key: '1', label: <UserOutlined style={{ fontSize: '24px' }} /> },
    { key: '2', label: <LogoutOutlined style={{ fontSize: '24px' }} /> }
];

const Landingpage = () => {
    const navigate = useNavigate();
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredImages, setFilteredImages] = useState(defaultImages);

    const handleSearch = (value) => {
        setSearchQuery(value);
        filterImages(value);
    };

    const filterImages = (query) => {
        const filtered = defaultImages.filter(item =>
            item.city.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredImages(filtered);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoginVisible(true);
        }, 4000); // Show the login modal after 4 seconds

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    const handleLoginClose = () => {
        setIsLoginVisible(false);
    };

    return (
        <Layout>

            <Login visible={isLoginVisible} onClose={handleLoginClose} />
            <Content
                style={{
                    padding: '0 24px',
                    marginTop: '64px', // Space for fixed header
                }}
            >
                <Login />
                <div className="background">
                    <Search
                        style={{ marginTop: "30px", width: "70%" }}
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        className='landingSearch'
                        value={searchQuery}
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div className="cards-container">
                    {filteredImages.length > 0 ?
                        filteredImages.map((item) => (
                            <Card
                                key={item.id}
                                hoverable
                                className="card-item"
                                cover={<img alt={item.city} src={item.url} />}
                            >
                                <Meta
                                    title={item.city}
                                    description={
                                        <div>
                                            <p><strong>Area:</strong> {item.area}</p>
                                            <p><strong>Price:</strong> {item.price}</p>
                                            <p><strong>Description:</strong> {item.Description}</p>
                                            <p><strong>Key Factors:</strong> {item.keyFactors}</p>
                                        </div>
                                    }
                                />
                            </Card>
                        ))
                        :
                        <p>No results found</p>
                    }
                </div>
            </Content>



        </Layout>
    );
};

export default Landingpage;
