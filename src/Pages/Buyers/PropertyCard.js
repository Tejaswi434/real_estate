import React, { useState } from "react";
import {
  Avatar,
  Card,
  Modal,
  Input,
  Select,
  Button,
  Form,
  DatePicker,
  TimePicker,
  notification,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import propertiesForSale from "./data.json";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Import the Header component

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const PropertyCard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(propertiesForSale);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedSqft, setSelectedSqft] = useState(""); // New state for SQFT filter
  const [wishlist, setWishlist] = useState([]);
  const [interested, setInterested] = useState([]); // New state for Interested properties

  const userProfile = () => {
    navigate("buyer/profile");
  };

  const showModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const showBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingOk = () => {
    setIsBookingModalOpen(false);
  };

  const handleBookingCancel = () => {
    setIsBookingModalOpen(false);
  };

  const onSearch = (value) => {
    const searchValue = value.toLowerCase();
    filterProperties(searchValue, selectedType, selectedBudget, selectedSqft);
  };

  const onFilterChange = (value) => {
    setSelectedType(value);
  };

  const onBudgetChange = (value) => {
    setSelectedBudget(value);
  };

  const onSqftChange = (value) => {
    setSelectedSqft(value); // Handle SQFT change
  };

  const filterProperties = (searchValue, type, budget, sqft) => {
    const filtered = propertiesForSale.filter((property) => {
      const matchesSearch =
        property.pin_code.includes(searchValue) ||
        property.village_name.toLowerCase().includes(searchValue);
      const matchesType = type ? property.property_type === type : true;
      const matchesBudget = budget ? property.budget === budget : true;
      const matchesSqft = sqft ? property.sqft === sqft : true; // Check SQFT filter
      return matchesSearch && matchesType && matchesBudget && matchesSqft;
    });

    setFilteredProperties(filtered);
  };

  const handleWishlistToggle = (property) => {
    if (wishlist.some((item) => item.id === property.id)) {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== property.id)
      );
      notification.open({
        message: "Removed from Wishlist",
        description: "This property has been removed from your wishlist.",
        placement: "bottomRight",
      });
    } else {
      setWishlist((prevWishlist) => [...prevWishlist, property]);
      notification.open({
        message: "Added to Wishlist",
        description: "This property has been added to your wishlist.",
        placement: "bottomRight",
      });
    }
  };

  const handleInterestedToggle = (property) => {
    if (interested.some((item) => item.id === property.id)) {
      setInterested((prevInterested) =>
        prevInterested.filter((item) => item.id !== property.id)
      );
      notification.open({
        message: "Removed from Interested",
        description: "This property has been removed from your Interested list.",
        placement: "bottomRight",
      });
    } else {
      setInterested((prevInterested) => [...prevInterested, property]);
      notification.open({
        message: "Added to Interested",
        description: "This property has been added to your Interested list.",
        placement: "bottomRight",
      });
    }
  };

  const handleRemoveFromWishlist = (propertyId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== propertyId)
    );
  };

  const handleCardClick = (propertyId) => {
    navigate(`./properties/${propertyId}`);
  };

  const applyAllFilters = () => {
    filterProperties("", selectedType, selectedBudget, selectedSqft); // Apply all filters
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* <Header /> Add the Header component */}

      {/* Search Bar */}
      <div
        style={{ display: "flex", marginTop: "40px", justifyContent: "center" }}
      >
        <Search
          style={{ width: "40%", margin: "0 auto" }}
          placeholder="Search properties by pin code or village name"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>

      {/* Filter Options */}
      <div style={{ marginBottom: "20px" }}>
        <Select
          style={{ width: "200px", marginRight: "20px" }}
          placeholder="Filter by property type"
          onChange={onFilterChange}
          allowClear
        >
          <Option value="retail">Retail</Option>
          <Option value="industrial">Industrial</Option>
          <Option value="villa">Villa</Option>
          <Option value="land">Land</Option>
          <Option value="flat">Flat</Option>
          <Option value="office space">Office Space</Option>
          <Option value="multifamily">Multifamily Housing</Option>
        </Select>

        <Select
          style={{ width: "200px", marginRight: "20px" }}
          placeholder="Filter by budget"
          onChange={onBudgetChange}
          allowClear
        >
          <Option value="10 lakhs">10 lakhs</Option>
          <Option value="20 lakhs">20 lakhs</Option>
          <Option value="25 lakhs">25 lakhs</Option>
          <Option value="30 lakhs">30 lakhs</Option>
          <Option value="40 lakhs">40 lakhs</Option>
          <Option value="45 lakhs">45 lakhs</Option>
          <Option value="50 lakhs">50 lakhs</Option>
        </Select>

        <Select
          style={{ width: "200px", marginRight: "20px" }}
          placeholder="Filter by square feet"
          onChange={onSqftChange}
          allowClear
        >
          <Option value="1000">1000 sq ft</Option>
          <Option value="1500">1500 sq ft</Option>
          <Option value="2000">2000 sq ft</Option>
          <Option value="2500">2500 sq ft</Option>
          <Option value="3000">3000 sq ft</Option>
        </Select>

        <Button type="primary" style={{ marginTop: "20px" }} onClick={applyAllFilters}>
          Apply All Filters
        </Button>
      </div>

      {/* Property List */}
      {filteredProperties.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              hoverable
              style={{ width: 300, position: "relative", cursor: "pointer" }}
              onClick={() => handleCardClick(property.id)}
              cover={
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    alt={property.title}
                    src={property.image_url}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => showModal(property)}
                  />
                  <Button
                    icon={
                      interested.some((item) => item.id === property.id) ? (
                        <StarFilled style={{ color: "gold" }} />
                      ) : (
                        <StarOutlined />
                      )
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInterestedToggle(property);
                    }}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "transparent",
                      border: "none",
                    }}
                  />
                </div>
              }
            >
              <Meta title={property.title} description={property.description} />
              <Button
                icon={
                  wishlist.some((item) => item.id === property.id) ? (
                    <HeartFilled style={{ color: "red" }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlistToggle(property);
                }}
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: "transparent",
                  border: "none",
                }}
              />
            </Card>
          ))}
        </div>
      ) : (
        <p>No properties found matching your search criteria.</p>
      )}

      {/* Property Detail Modal */}
      <Modal
        title={selectedProperty?.title}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button key="cancel" onClick={handleOk}>
            Close
          </Button>,
          <Button key="book" type="primary" onClick={showBookingModal}>
            Book Now
          </Button>,
        ]}
      >
        {selectedProperty && (
          <>
            <img
              alt={selectedProperty.title}
              src={selectedProperty.image_url}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <p>{selectedProperty.description}</p>
          </>
        )}
      </Modal>

      {/* Booking Modal */}
      <Modal
        title="Book Property"
        visible={isBookingModalOpen}
        onOk={handleBookingOk}
        onCancel={handleBookingCancel}
        footer={[
          <Button key="cancel" onClick={handleBookingCancel}>
            Cancel
          </Button>,
          <Button key="book" type="primary" onClick={handleBookingOk}>
            Confirm Booking
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Time">
            <TimePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Contact Information">
            <Input placeholder="Enter your contact details" />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default PropertyCard;