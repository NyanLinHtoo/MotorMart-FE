import { Button, Col, Input, Row } from "antd";
import { Footer } from "antd/es/layout/layout";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const SiteFooter = () => {
  return (
    <Footer className="bg-blue-50 py-10 px-6 md:px-12">
      <div className="flex flex-wrap justify-center gap-y-8">
        {/* Section 1: Company Info */}
        <div className="md:w-1/3 w-1/2 px-8">
          <div className="text-2xl font-extrabold text-blue-900 mb-3">
            MotorMart
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            At MotorMart, we provide top-tier car sales and services. With a
            focus on reliability, excellence, and customer satisfaction, we are
            your trusted partner for premium car ownership.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="md:w-1/3 w-1/2 px-8">
          <h3 className="text-blue-800 font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>
              <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cars" className="hover:text-blue-600">Car Sale</NavLink>
            </li>
            <li>
              <NavLink to="/brands" className="hover:text-blue-600">Brands</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-blue-600">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-blue-600">Contact Us</NavLink>
            </li>
          </ul>
        </div>

        {/* Section 3: Stay Updated & Follow Us */}
        <div className="w-full md:w-1/3 px-8">
          <h3 className="text-blue-800 font-semibold mb-4">Stay Updated</h3>
          <Row justify="center">
            <Col xs={24}>
              <Input.Group compact>
                <Input
                  className="rounded-l-md"
                  style={{ width: "calc(100% - 100px)" }}
                  placeholder="Enter your email"
                />
                <Button type="primary" className="rounded-r-md">
                  Subscribe
                </Button>
              </Input.Group>
            </Col>
          </Row>

          <h3 className="text-blue-800 font-semibold mt-6 mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" aria-label="Facebook">
              <FacebookOutlined className="text-2xl text-blue-700 cursor-pointer hover:text-blue-500" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <InstagramOutlined className="text-2xl text-red-500 cursor-pointer hover:text-red-400" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <TwitterOutlined className="text-2xl text-blue-400 cursor-pointer hover:text-blue-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-8 border-t pt-4 text-center">
        <p className="text-gray-500 text-xs">
          © 2024 MotorMart by Team A. All rights reserved.
        </p>
      </div>
    </Footer>
  );
};

export default SiteFooter;
