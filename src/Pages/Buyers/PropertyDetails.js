import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Progress, Row, Col, Tooltip, Avatar } from 'antd';
import { HomeOutlined, SwapOutlined, CheckOutlined, CompassOutlined, RiseOutlined, UserOutlined } from '@ant-design/icons'; // Import icons
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const { Meta } = Card;

const PropertyDetail = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return <p>Property not found</p>;
  }

  const handleBookAppointment = () => {
    navigate(`../book-appointment/${property.id}`);
  };

  // Google Maps container style
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  // Center coordinates for the map (You need to replace these with the actual coordinates of the property)
  const center = {
    lat: property.latitude,
    lng: property.longitude
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Button at the top right */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button type="primary" onClick={handleBookAppointment}>
          Book an Appointment
        </Button>
      </div>

      {/* Main content divided into two halves */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left side: Property image and seller information */}
        <div style={{ flex: '1', paddingRight: '20px' }}>
          <Card
            cover={
              <img
                alt={property.title}
                src={property.image_url}
                style={{ objectFit: 'cover', width: '100%', height: '400px' }}
              />
            }
          >
            <Meta title={property.title} description={property.address} />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <Avatar src={property.seller_image} size={64} style={{ marginRight: '15px' }} />
              <div>
                <p><b>Seller:</b> {property.seller}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right side: Detailed property information */}
        <div style={{ flex: '1', paddingLeft: '20px' }}>
          <Card title="Property Details">
            <p><b>Price:</b> {property.budget}</p>
            <p><b>Type:</b> {property.property_type}</p>
            <p><b>Village:</b> {property.village_name}</p>
            <p><b>Pincode:</b> {property.pin_code}</p>
            <Row gutter={16} style={{ marginTop: '20px' }}>
              <Col span={8}>
                <Tooltip title="Bedrooms">
                  <HomeOutlined /> 2 Beds
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Bathrooms">
                  <HomeOutlined /> 2 Baths
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Transaction Type">
                  <SwapOutlined /> Resale
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Status">
                  <CheckOutlined /> Ready to Move
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Facing Direction">
                  <CompassOutlined /> East Facing
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Lift">
                  <RiseOutlined /> 1 Lift
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Furnished Status">
                  <UserOutlined /> Semi-Furnished
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Age of Construction">
                  <HomeOutlined /> 5 to 10 years
                </Tooltip>
              </Col>
            </Row>
          </Card>

          {/* Circular Ratings Display */}
          <Card title="Property Ratings" style={{ marginTop: '20px' }}>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-around' }}>
              {/* Environment Rating */}
              <div>
                <b>Environment</b>
                <Progress
                  type="circle"
                  percent={80} // Example: 80% represents a 4 out of 5 rating
                  format={(percent) => `${(percent / 20).toFixed(1)} / 5`} // Convert to a scale of 1 to 5
                />
              </div>

              {/* Lifestyle Rating */}
              <div>
                <b>Lifestyle</b>
                <Progress
                  type="circle"
                  percent={90} // Example: 90% represents a 4.5 out of 5 rating
                  format={(percent) => `${(percent / 20).toFixed(1)} / 5`} // Convert to a scale of 1 to 5
                />
              </div>

              {/* Connectivity Rating */}
              <div>
                <b>Connectivity</b>
                <Progress
                  type="circle"
                  percent={70} // Example: 70% represents a 3.5 out of 5 rating
                  format={(percent) => `${(percent / 20).toFixed(1)} / 5`} // Convert to a scale of 1 to 5
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Map Display */}
      <div style={{ marginTop: '20px' }}>
        <Card title="Location">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
            >
              {/* You can add additional map features here */}
            </GoogleMap>
          </LoadScript>
        </Card>
      </div>

      {/* Agent Information */}
      <div style={{ marginTop: '20px' }}>
        <Card title="Agent Information">
          <Row gutter={16}>
            <Col span={12}>
              <Card
                hoverable
                cover={<img alt="Jane Doe" src="path_to_jane_doe_image" />}
              >
                <Meta
                  avatar={<Avatar src="https://photos.zillowstatic.com/fp/e1c98c6600e18861f6924f92bf3a5518-h_l.jpg" />}
                  title="Jane Doe"
                  description="Agent specializing in Vizianagaram area"
                />
                <p><b>Contact:</b> +1 234 567 890</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                cover={<img alt="John Smith" src="path_to_john_smith_image" />}
              >
                <Meta
                  avatar={<Avatar src="path_to_john_smith_image" />}
                  title="John Smith"
                  description="Agent specializing in Vizianagaram area"
                />
                <p><b>Contact:</b> +1 234 567 891</p>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Go Back button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    </div>
  );
};

export default PropertyDetail;