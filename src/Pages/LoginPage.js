import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';

const { Option } = Select;

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
/*main*/
const LoginPage = ({ visible, onClose }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [firstname, setFirstName] = useState("")
  const [secondname, setSecondName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [pincode, setPincode] = useState("")
  const [city, setCity] = useState("")
  const [Role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  // enabling the submit button 
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleFormChange = () => {
    const values = Form.getFieldsValue();
    const allFieldsFilled = Object.values(values).every(value => value !== undefined && value !== '');
    setIsSubmitDisabled(!allFieldsFilled);
  };


  const showRegisterModal = () => {
    setIsLoginVisible(false);
    setIsRegisterModalVisible(true);
  };

  const handleLoginCancel = () => {
    setIsLoginVisible(false);
    onClose(); // Notify parent to close modal
  };


  const handleRegisterCancel = () => {
    setIsRegisterModalVisible(false);
    setIsLoginVisible(false);
  };
  const handleUsernameKeyPress = (event) => {
    // Allow only alphabetic characters and prevent all others
    if (/[^a-zA-Z]/.test(event.key)) {
      event.preventDefault();
    }
  };


  const submitting = () => {

    console.log(isRegisterModalVisible);
    console.log(firstname);
    console.log(Role);
    console.log(isRegisterModalVisible);
    console.log(city);




  }
  return (
    <Modal
      title={isLoginVisible ? "Login" : "Register"}
      visible={visible}
      onCancel={handleLoginCancel}
      footer={null}
      onOk={() => { }}
    >
      {isLoginVisible ? (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onValuesChange={handleFormChange}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              onKeyPress={handleUsernameKeyPress} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox style={{ marginRight: '12px' }}>Remember me</Checkbox>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ margin: 0 }}>
              Don't you have an account?
              <span
                style={{ color: '#1890ff', cursor: 'pointer', marginLeft: '8px' }}
                onClick={showRegisterModal}
              >
                Register
              </span>
            </p>
          </Form.Item>
        </Form>
      ) : (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: 'Please input your first name!' },
              { pattern: /^[A-Za-z]+$/, message: 'First name can only contain alphabets!' },
            ]}
          >
            <Input type="text" onKeyPress={handleUsernameKeyPress} onChange={(e) => { setFirstName(e.target.value) }} />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: 'Please input your last name!' },
              { pattern: /^[A-Za-z]+$/, message: 'Last name can only contain alphabets!' },
            ]}
          >
            <Input onKeyPress={handleUsernameKeyPress} onChange={(e) => { setSecondName(e.target.value) }} />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { message: 'Phone number must be exactly 10 digits!' },
            ]}
          >
            <Input maxLength={10} onKeyPress={(e) => { if (/[^0-9]/.test(e.key)) e.preventDefault(); }} onChange={(e) => { setPhoneNumber(e.target.value) }} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: 'Email must end with @gmail.com'
            }
            ]}
          >
            <Input onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Item>
          <Form.Item
            label="Pincode"
            name="pincode"
            rules={[
              { required: true, message: 'Please input your pincode!' },
              { pattern: /^[0-9]{6}$/, message: 'Pincode must be exactly 6 digits!' },
            ]}
          >
            <Input maxLength="6" type="InputNumber" onKeyPress={(e) => { if (/[^0-9]/.test(e.key)) e.preventDefault(); }}
              onChange={(e) => { setPincode(e.target.value) }} />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please select your city!' }]}
          >
            <Select
              placeholder="Select a city"

              onClick={(value) => { setCity(value) }}   >
              <Option value="newYork" >New York</Option>
              <Option value="losAngeles" >Los Angeles</Option>
              <Option value="chicago" >Chicago</Option>
              <Option value="houston" >Houston</Option>
              <Option value="miami">Miami</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Checkbox.Group onClick={(value) => { setRole(value) }}>
              <Checkbox value="buyer" >Buyer</Checkbox>
              <Checkbox value="seller">Seller</Checkbox>
              <Checkbox value="agent">Agent</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/,
                message: 'Password must be 8-12 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character!'
              }
            ]}
          >
            <Input.Password maxLength={12} onClick={(e) => { setPassword(e.target.value) }} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === getFieldValue('password')) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password maxLength={12} onChange={(e) => { setConfirmPassword(e.target.value) }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={submitting} >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default LoginPage;
