import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, DatePicker, TimePicker, Form, message } from 'antd';
// import 'antd/dist/antd.css'; // Import Ant Design styles

const BookAppointment = () => {
  const { id } = useParams(); // Get property id from URL
  const [form] = Form.useForm(); // Ant Design form instance

  // State to manage form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: null,
    time: null,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle date change
  const handleDateChange = (date, dateString) => {
    setFormData((prevState) => ({
      ...prevState,
      date: dateString,
    }));
  };

  // Handle time change
  const handleTimeChange = (time, timeString) => {
    setFormData((prevState) => ({
      ...prevState,
      time: timeString,
    }));
  };

  // Handle form submission
  const handleConfirmBooking = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      message.error('Please fill in all fields.');
      return;
    }

    // You can add booking logic here (API calls, etc.)
    message.success(`Appointment booked successfully for property ID: ${id}`);
    form.resetFields(); // Reset the form after submission
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* <h2>Book an Appointment for Property ID: {id}</h2> */}
      <Form form={form} layout="vertical" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Form.Item label="First Name" required>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
          />
        </Form.Item>
        <Form.Item label="Last Name" required>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item label="Phone" required>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </Form.Item>
        <Form.Item label="Date" required>
          <DatePicker
            style={{ width: '100%' }}
            onChange={handleDateChange}
          />
        </Form.Item>
        <Form.Item label="Time" required>
          <TimePicker
            style={{ width: '100%' }}
            onChange={handleTimeChange}
            format="HH:mm"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookAppointment;