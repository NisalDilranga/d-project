import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  message,
  Row,
  Col,
  Divider,
  Collapse,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import axios from "axios";
import EcommerceNavbar from "../Components/EcommerceNavbar";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      await axios.post("http://localhost:3000/api/contact", values);
      message.success("Your message has been sent successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      message.error("Failed to send your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // FAQ Items
  const faqItems = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all our wood crafts. Items must be returned in their original condition and packaging to qualify for a full refund.",
    },
    {
      question: "Do you offer custom woodwork services?",
      answer:
        "Yes! We specialize in custom woodwork projects. Please contact us with your specific requirements, and our craftsmen will work with you to create the perfect piece.",
    },
    {
      question: "How long does shipping usually take?",
      answer:
        "Standard shipping typically takes 5-7 business days within the continental US. Express shipping options are available at checkout for faster delivery.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most international destinations. International shipping times vary by location but generally take 10-15 business days.",
    },
  ];

  return (
    <div className="overflow-x-hidden w-full">
      <EcommerceNavbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 py-16 text-white w-full">
        <div className="container mx-auto px-4 text-center max-w-full">
          <Title level={1} className="text-white mb-0">
            Contact Us
          </Title>
          <Paragraph className="text-lg opacity-80 mt-2">
            We'd love to hear from you. Reach out to our team with any questions
            or inquiries.
          </Paragraph>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 max-w-full">
        <Row gutter={[48, 48]} className="mx-0">
          {/* Contact Information */}
          <Col xs={24} lg={10}>
            <div className="mb-8">
              <Title level={3} className="mb-6">
                Get In Touch
              </Title>
              <Paragraph className="text-lg mb-8">
                Whether you have a question about our products, custom orders,
                delivery, or anything else, our team is ready to answer all your
                questions.
              </Paragraph>

              <Card className="mb-8 shadow-md border-0 hover:shadow-lg transition-shadow duration-300">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <MailOutlined className="text-2xl mr-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-lg">Email</div>
                      <div className="text-gray-600">info@woodcrafts.com</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <PhoneOutlined className="text-2xl mr-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-lg">Phone</div>
                      <div className="text-gray-600">+1 (555) 123-4567</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <HomeOutlined className="text-2xl mr-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-lg">Address</div>
                      <div className="text-gray-600">
                        123 Wood Avenue, Craftsville, CA 90210
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <ClockCircleOutlined className="text-2xl mr-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-lg">Business Hours</div>
                      <div className="text-gray-600">
                        Monday - Friday: 9am - 6pm
                      </div>
                      <div className="text-gray-600">Saturday: 10am - 4pm</div>
                      <div className="text-gray-600">Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Title level={4} className="mb-4">
                Connect With Us
              </Title>
              <div className="flex gap-4">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<FacebookOutlined />}
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700"
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<InstagramOutlined />}
                  size="large"
                  style={{ background: "#E1306C", borderColor: "#E1306C" }}
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<TwitterOutlined />}
                  size="large"
                  className="bg-blue-400 hover:bg-blue-500"
                />
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col xs={24} lg={14}>
            <Card className="shadow-md border-0">
              <Title level={3} className="mb-6">
                Send Us a Message
              </Title>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Your name" size="large" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="Your email address" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[
                    { required: true, message: "Please enter a subject" },
                  ]}
                >
                  <Input placeholder="Subject of your message" size="large" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    { required: true, message: "Please enter your message" },
                  ]}
                >
                  <TextArea rows={6} placeholder="Your message" size="large" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    className="bg-blue-600 hover:bg-blue-700"
                    style={{ height: "50px", minWidth: "150px" }}
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Map Section */}
        <div className="mt-16 w-full">
          <Title level={3} className="mb-6 flex items-center">
            <EnvironmentOutlined className="mr-3" /> Find Us
          </Title>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            {/* Replace with actual Google Maps or other map embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203672326!2d-118.2436789!3d34.0522342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1644436331454!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Store Location"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Title level={3} className="mb-6">
            Frequently Asked Questions
          </Title>
          <Collapse className="bg-white shadow-md border-0">
            {faqItems.map((item, index) => (
              <Panel
                header={
                  <span className="text-lg font-medium">{item.question}</span>
                }
                key={index}
              >
                <Paragraph className="text-gray-600">{item.answer}</Paragraph>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-blue-50 py-16 mt-16 w-full">
        <div className="container mx-auto px-4 text-center max-w-full">
          <Title level={2} className="mb-4">
            Ready to Create Your Dream Wooden Piece?
          </Title>
          <Paragraph className="text-lg mb-8">
            From custom furniture to unique home decor, our craftsmen can bring
            your vision to life.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg"
          >
            Start Your Custom Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
