import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, MenuProps, Drawer, Button } from "antd";
import { UserOutlined, MenuOutlined, CarOutlined } from "@ant-design/icons";
import UseAuth from "../auth/UseAuth";

const NavBar = () => {
  const { logout } = UseAuth();
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const items: MenuProps["items"] = [
    {
      label: (
        <a
          onClick={() => {
            navigate("/profile");
          }}>
          Profile
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a
          onClick={() => {
            logout();
            navigate("/login");
          }}>
          Logout
        </a>
      ),
      key: "3",
    },
  ];

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Navigation link component for consistent styling
  const NavMenuItem = ({ to, children, mobile = false }) => {
    const commonClasses = "transition-all duration-300 ease-in-out";
    const desktopClasses = "hover:text-blue-600";
    const mobileClasses = " hover:text-blue-600";
    const activeClasses = "font-bold text-blue-700";

    return (
      <NavLink
        to={to}
        className={({ isActive }) => `
          ${commonClasses}
          ${mobile ? mobileClasses : desktopClasses}
          ${isActive ? activeClasses : ""}
        `}
        onClick={mobile ? closeDrawer : undefined}>
        {children}
      </NavLink>
    );
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Mobile Menu Button */}
        <Button
          className="md:hidden"
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        {/* Mobile Drawer Menu */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          width="75%"
          style={{ padding: 0 }}>
          <ul className="font-medium flex flex-col p-4 space-y-4">
            <li>
              <NavMenuItem to="/" mobile>
                Home
              </NavMenuItem>
            </li>
            <li>
              <NavMenuItem to="/cars" mobile>
                Car Sale
              </NavMenuItem>
            </li>
            <li>
              <NavMenuItem to="/brands" mobile>
                Brands
              </NavMenuItem>
            </li>
            <li>
              <NavMenuItem to="/about" mobile>
                About Us
              </NavMenuItem>
            </li>
            <li>
              <NavMenuItem to="/contact" mobile>
                Contact Us
              </NavMenuItem>
            </li>
          </ul>
        </Drawer>

        {/* Logo */}
        <NavLink to="/" className="text-lg font-bold mx-2">
          <CarOutlined style={{ fontSize: "16px", color: "#08c" }} /> MotorMart
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavMenuItem to="/">Home</NavMenuItem>
            </li>
            <li>
              <NavMenuItem to="/cars">Car Sale</NavMenuItem>
            </li>
            <li>
              <NavMenuItem to="/brands">Brands</NavMenuItem>
            </li>
            <li>
              <NavMenuItem to="/about">About Us</NavMenuItem>
            </li>
            <li>
              <NavMenuItem to="/contact">Contact Us</NavMenuItem>
            </li>
          </ul>
        </div>

        {/* User Authentication Area */}
        {user ? (
          <div className="md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}>
              <Avatar
                size="large"
                icon={<UserOutlined />}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Dropdown>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="hover:text-blue-600 transition-all duration-300">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
