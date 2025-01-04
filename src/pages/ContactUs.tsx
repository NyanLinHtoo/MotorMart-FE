import { Form, Input, Button, Typography } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    toast.success("Thank you for your message! We will contact you soon.");
    form.resetFields();
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-8 text-center">
            <h2 className="text-white mb-2 text-2xl font-bold">Contact Us</h2>
            <Text className="text-gray-200">
              Have questions? We'd love to hear from you.
            </Text>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Contact Form */}
            <div>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4">
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}>
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Your name"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}>
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="Your email"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}>
                  <Input
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="Your phone number"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    { required: true, message: "Please enter your message" },
                  ]}>
                  <TextArea
                    placeholder="How can we help you?"
                    rows={4}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-slate-600 hover:bg-cyan-700 rounded-lg">
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <Title level={3} className="text-gray-800">
                Get in Touch
              </Title>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <PhoneOutlined className="text-cyan-600 text-xl" />
                  <div>
                    <Text strong className="block">
                      Phone
                    </Text>
                    <Text className="text-gray-600">+1 (234) 567-8900</Text>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MailOutlined className="text-cyan-600 text-xl" />
                  <div>
                    <Text strong className="block">
                      Email
                    </Text>
                    <Text className="text-gray-600">info@carshowroom.com</Text>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <HomeOutlined className="text-cyan-600 text-xl" />
                  <div>
                    <Text strong className="block">
                      Address
                    </Text>
                    <Text className="text-gray-600">
                      123 Showroom Street, Auto City, AC 12345
                    </Text>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Title level={4} className="text-gray-800">
                  Business Hours
                </Title>
                <div className="space-y-2">
                  <Text className="block">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </Text>
                  <Text className="block">Saturday: 10:00 AM - 4:00 PM</Text>
                  <Text className="block">Sunday: Closed</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
