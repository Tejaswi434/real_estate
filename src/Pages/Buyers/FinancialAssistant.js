import React, { useState } from "react";
import { Form, Input, Select, Button, notification, Card, Row, Col, Typography, Divider, InputNumber } from "antd";
import { calculateEMI } from "./emiCalculator"; 
import { HomeOutlined, BankOutlined, DollarOutlined, SearchOutlined, ClockCircleOutlined } from '@ant-design/icons'; // Import icons
import './Style.css';

const { Option } = Select;
const { Title } = Typography;

const banks = [
  "SBI",
  "HDFC",
  "ICICI",
  "Axis Bank",
  "Kotak Mahindra",
  "Yes Bank",
  "PNB",
  "Bank of Baroda",
  "Union Bank of India",
  "Canara Bank"
];

const FinancialAssistant = () => {
  const [form] = Form.useForm();
  const [emiResult, setEmiResult] = useState(null);
  const [eligibility, setEligibility] = useState(null);

  const checkEligibility = (loanAmount, tenure) => {
    const maxLoanAmount = 5000000; // Max loan amount
    const minTenure = 12; // Minimum tenure in months

    if (loanAmount > maxLoanAmount) {
      return "Loan amount exceeds the maximum limit.";
    }

    if (tenure < minTenure) {
      return "Tenure should be at least 12 months.";
    }

    return "Eligible for loan.";
  };

  const handleSubmit = (values) => {
    const { buyerName, bankName, loanAmount, interestRate, tenure } = values;
    
    const emi = calculateEMI(loanAmount, interestRate, tenure);
    const eligibilityResult = checkEligibility(loanAmount, tenure);

    setEmiResult({
      buyerName,
      bankName,
      loanAmount,
      emi
    });

    setEligibility(eligibilityResult);

    notification.success({
      message: "Calculation Successful",
      description: `EMI calculated successfully for ${buyerName} with ${bankName}.`,
      placement: "bottomRight",
    });
  };

  return (
    <div className="financial-assistant-container">
      {/* Showcase Section with Continuously Moving Cards */}
      <Title level={2} style={{ color: "#000000", textAlign: "center", marginBottom: "20px" }}>
        Discover Our Offerings
      </Title>
      <div className="scrolling-container">
        <div className="scrolling-cards">
          <Card className="scrolling-card">
            <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Apply Home Loan Online</Title>
          </Card>
          <Card className="scrolling-card">
            <BankOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Loan Offers from 34+ Banks</Title>
          </Card>
          <Card className="scrolling-card">
            <DollarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Highest Loan Value </Title>
          </Card>
          <Card className="scrolling-card">
            <SearchOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Dedicated RM </Title>
          </Card>
          <Card className="scrolling-card">
            <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Fastest Loan Disbursal</Title>
          </Card>
          {/* Repeat cards for continuous effect */}
          <Card className="scrolling-card">
            <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Apply Home Loan Online</Title>
          </Card>
          <Card className="scrolling-card">
            <BankOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Loan Offers from 34+ Banks</Title>
          </Card>
          <Card className="scrolling-card">
            <DollarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Highest Loan Value & Lowest ROI</Title>
          </Card>
          <Card className="scrolling-card">
            <SearchOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Dedicated RM for Property Search</Title>
          </Card>
          <Card className="scrolling-card">
            <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4} style={{ color: "#1890ff", fontSize: '18px' }}>Fastest Loan Disbursal</Title>
          </Card>
        </div>
      </div>

      {/* Financial Assistant Form */}
      <Card title={<Title level={3}>EMI CALCULATOR</Title>} style={{ marginTop: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: "600px", margin: "0 auto" }} // Adjust form width
        >
          <Form.Item
            label="Buyer Name"
            name="buyerName"
            rules={[{ required: true, message: "Please enter the buyer's name" }]}
          >
            <Input size="large" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Bank Name"
            name="bankName"
            rules={[{ required: true, message: "Please select a bank" }]}
          >
            <Select placeholder="Select a bank" size="large" style={{ width: '100%' }}>
              {banks.map((bank) => (
                <Option key={bank} value={bank}>
                  {bank}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Loan Amount"
            name="loanAmount"
            rules={[{ required: true, message: "Please enter the loan amount" }]}
          >
            <InputNumber size="large" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Interest Rate (%)"
            name="interestRate"
            rules={[{ required: true, message: "Please enter the interest rate" }]}
          >
            <InputNumber size="large" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Tenure (months)"
            name="tenure"
            rules={[{ required: true, message: "Please enter the tenure in months" }]}
          >
            <InputNumber size="large" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
              Calculate EMI
            </Button>
          </Form.Item>
        </Form>

        {emiResult && (
          <>
            <Divider />
            <Row gutter={16} style={{ marginTop: "20px" }}>
              <Col span={24}>
                <Card title="EMI Result" style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                  <p><strong>Buyer Name:</strong> {emiResult.buyerName}</p>
                  <p><strong>Bank Name:</strong> {emiResult.bankName}</p>
                  <p><strong>Loan Amount:</strong> {emiResult.loanAmount}</p>
                  <p><strong>EMI:</strong> {emiResult.emi.toFixed(2)}</p>
                  <p><strong>Eligibility Status:</strong> {eligibility}</p>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </div>
  );
};

export default FinancialAssistant;