import React from 'react';
import { Card, Typography, Divider } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text, Title } = Typography;

function Profile() {
  const userData = [
    {
      firstName: "Ananya",
      lastName: "Singh",
      Email: "monika@gmail.com",
      phoneNo: 9568742132,
      pincode: 556891,
      city: "Vizag",
      state: "AP",
      country: "India",
      profile: "https://photos.zillowstatic.com/h_g/ISzbji3iapv59v1000000000.jpg"
    }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {userData.map((user, index) => (
        <Card
          key={index}
          style={{ width: 350, borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          cover={<img alt={`${user.firstName} ${user.lastName}`} src={user.profile} style={{ width: '50%', height: 'auto', objectFit: 'cover', marginLeft:'11px' }} />}
          actions={[
            <div >
              <MailOutlined style={{ marginRight: 8 }} />
              <Text>{user.Email}</Text>
            </div>,
            <div >
              <PhoneOutlined style={{ marginRight: 8 }} />
              <Text>{user.phoneNo}</Text>
            </div>
          ]}
        >
          <Meta
            title={<Title level={4}>{`${user.firstName} ${user.lastName}`}</Title>}
            description={(
              <div>
                <Divider />
                <div style={{ marginBottom: '10px' }}>
                  <Text strong>Pincode: </Text>{user.pincode}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Text strong>City: </Text>{user.city}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Text strong>State: </Text>{user.state}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Text strong>Country: </Text>{user.country}
                </div>
              </div>
            )}
          />
        </Card>
      ))}
    </div>
  );
}

export default Profile;