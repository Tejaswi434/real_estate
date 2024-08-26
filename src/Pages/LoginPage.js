import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select, message } from "antd";
import axios from "axios";
import Header from "./Buyers/Header";
import { useNavigate } from "react-router-dom";
import HeaderPage from "./HeaderPage";
const { Option } = Select;

/*main*/
const LoginPage = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [secondname, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [Role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  // enabling the submit button
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleFormChange = () => {
    const values = Form.getFieldsValue();
    const allFieldsFilled = Object.values(values).every(
      (value) => value !== undefined && value !== ""
    );
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
  const [messageApi, contextHolder] = message.useMessage();
  const submitting = (values) => {
    console.log(values);

    axios
      .post("http://172.17.15.213:8001/api/users/register", values)
      .then((res) => {
        // message.success("Registration successful!", res);
        messageApi.open({
          type: "success",
          content: "Registration successful!",
          duration: 3,
        });
        //form.resetFields(); // Reset form fields after successful submission
        setIsRegisterModalVisible(false);
        setIsLoginVisible(true); // Close the modal after successful submission
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "Registration Failed!",
          duration: 3,
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onLogin = (values) => {
    console.log(values);

    axios
      .post("http://172.17.15.213:8001/api/users/login", values)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Login successful!",
          duration: 3,
        });
        console.log(res);

        localStorage.setItem("token", res.data.token);

        onClose();
        navigate('/buyer')
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "Login Failed!",
          duration: 3,
        });
      });
  };
  return (
    <>
      <HeaderPage />
      {contextHolder}
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
            onFinish={onLogin}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="Email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <p style={{ margin: 0 }}>
                Don't you have an account?
                <span
                  style={{
                    color: "#1890ff",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
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
            onFinish={submitting}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="First Name"
              name="FirstName"
              rules={[
                { required: true, message: "Please input your first name!" },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: "First name can only contain alphabets!",
                },
              ]}
            >
              <Input
                type="text"
                onKeyPress={handleUsernameKeyPress}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="LastName"
              rules={[
                { required: true, message: "Please input your last name!" },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: "Last name can only contain alphabets!",
                },
              ]}
            >
              <Input
                onKeyPress={handleUsernameKeyPress}
                onChange={(e) => {
                  setSecondName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="PhoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
                { message: "Phone number must be exactly 10 digits!" },
              ]}
            >
              <Input
                maxLength={10}
                onKeyPress={(e) => {
                  if (/[^0-9]/.test(e.key)) e.preventDefault();
                }}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Email must end with @gmail.com",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Pincode"
              name="Pincode"
              rules={[
                { required: true, message: "Please input your pincode!" },
                {
                  pattern: /^[0-9]{6}$/,
                  message: "Pincode must be exactly 6 digits!",
                },
              ]}
            >
              <Input
                maxLength="6"
                type="InputNumber"
                onKeyPress={(e) => {
                  if (/[^0-9]/.test(e.key)) e.preventDefault();
                }}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="City"
              rules={[{ required: true, message: "Please select your city!" }]}
            >
              <Select
                placeholder="Select a city"
                onClick={(value) => {
                  setCity(value);
                }}
              >
                <Option value="Vizag">Vizag</Option>
                <Option value="Vizianagaram">Vizianagaram</Option>
                <Option value="BHogapuram">BHogapuram</Option>
                <Option value="Srikakulam">Srikakulam</Option>
                <Option value="Munjeru">Munjeru</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            <Form.Item
              label="Role"
              name="Role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Checkbox.Group
                onClick={(value) => {
                  setRole(value);
                }}
              >
                <Checkbox value="buyer">Buyer</Checkbox>
                <Checkbox value="seller">Seller</Checkbox>
                <Checkbox value="agent">Agent</Checkbox>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Password"
              name="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/,
                  message:
                    "Password must be 8-12 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character!",
                },
              ]}
            >
              <Input.Password
                maxLength={12}
                onClick={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit1
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default LoginPage;