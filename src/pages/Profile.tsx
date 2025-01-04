import { useEffect, useState } from "react";
import { Card, Divider, Empty, Tabs } from "antd";
import {
  UserOutlined,
  MailOutlined,
  CarOutlined,
  ScheduleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import ApiService from "../api_service/apiService";
import { OrderList } from "../types/orders";
import { BookingTypeList } from "../types/booking";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [orderLists, setOrderLists] = useState<OrderList | null>(null);
  const [bookingLists, setBookingLists] = useState<BookingTypeList | null>(
    null
  );
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);

  const getOrderListByCurrentUser = async () => {
    try {
      const response = await ApiService.orderListByCurrentUser();
      setOrderLists(response.data);
      setTotalOrders(response.data.total);
    } catch (error: any) {
      console.error(
        "Error fetching order list:",
        error.response?.data || error.message
      );
    }
  };

  const getBookingListByCurrentUser = async () => {
    try {
      const response = await ApiService.getBookingList();
      setBookingLists(response.data);
      setTotalBookings(response.data.total);
    } catch (error: any) {
      console.error(
        "Error fetching booking list:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getOrderListByCurrentUser();
    getBookingListByCurrentUser();
  }, []);

  const renderOrderHistory = () =>
    orderLists && orderLists.orders.length > 0 ? (
      <div className="space-y-4">
        {orderLists.orders.map((order) => (
          <Card
            key={order.id}
            size="small"
            className="hover:shadow-md transition-all border-l-4 border-slate-500">
            <div className="flex items-center">
              {order.cargallery_image_path && (
                <img
                  src={order.cargallery_image_path}
                  alt={order.carmodel_title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-gray-800">
                    {order.carmodel_title}
                  </h3>
                  <img
                    src={order.carbrand_logo}
                    alt={order.carbrand_name}
                    className="h-8 w-8"
                  />
                </div>
                <div className="text-gray-600 space-y-1">
                  <p>
                    <strong>Order #:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Plate Number:</strong> {order.plate_no}
                  </p>
                  <p>
                    <strong>Price:</strong> ${order.price?.toFixed(2)}
                  </p>
                  <p>
                    <strong>Ordered on:</strong>{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    ) : (
      <Empty description="No orders yet" />
    );

  const renderBookingHistory = () =>
    bookingLists && bookingLists.bookings.length > 0 ? (
      <div className="space-y-4">
        {bookingLists.bookings.map((booking) => (
          <Card
            key={booking.id}
            size="small"
            className="hover:shadow-md transition-all border-l-4 border-blue-500">
            <div className="flex items-center">
              {booking.cargallery_image_path && (
                <img
                  src={booking.cargallery_image_path}
                  alt={booking.carmodel_title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-gray-800">
                    {booking.carmodel_title}
                  </h3>
                  <img
                    src={booking.carbrand_logo}
                    alt={booking.carbrand_name}
                    className="h-8 w-8"
                  />
                </div>
                <div className="text-gray-600 space-y-1">
                  <p>
                    <strong>Booking #:</strong> {booking.id}
                  </p>
                  <p>
                    <strong>Preferred Date:</strong>{" "}
                    {new Date(booking.preferred_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Preferred Time:</strong>{" "}
                    {new Date(booking.preferred_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <strong>Booked on:</strong>{" "}
                    {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    ) : (
      <Empty description="No bookings yet" />
    );

  return (
    <div className="max-w-screen min-h-[90vh] mx-auto p-6 bg-gray-100">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <Card
            className="shadow-lg rounded-xl sticky top-6"
            cover={
              <div className="bg-gradient-to-r from-slate-700 to-slate-900 h-24 rounded-t-xl"></div>
            }>
            <div className="text-center -mt-12">
              <div className="border-4 border-white rounded-full inline-block mb-4">
                <UserOutlined className="text-5xl text-white bg-slate-500 rounded-full p-4" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.username}
              </h2>
              <div className="flex justify-center items-center text-gray-600 mt-2">
                <MailOutlined className="mr-2 text-blue-500" />
                <p>{user.email}</p>
              </div>
              <div className="flex justify-center items-center text-gray-600 mt-2">
                <PhoneOutlined className="mr-2 text-blue-500" />
                <p>{user.phonenumber}</p>
              </div>

              <Divider />

              <div className="text-left space-y-3 text-gray-700">
                <div className="flex items-center">
                  <CarOutlined className="mr-3 text-blue-500" />
                  <span>Total Orders: {totalOrders}</span>
                </div>
                <div className="flex items-center">
                  <ScheduleOutlined className="mr-3 text-green-500" />
                  <span>Total Bookings: {totalBookings}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Order and Booking History */}
        <div className="md:col-span-2">
          <Card className="shadow-lg rounded-xl ">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: (
                    <span>
                      <CarOutlined />
                      Order History
                    </span>
                  ),
                  children: (
                    <div className="max-h-[70vh] overflow-y-auto">
                      {renderOrderHistory()}
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <span>
                      <ScheduleOutlined />
                      Booking History
                    </span>
                  ),
                  children: (
                    <div className="max-h-[70vh] overflow-y-auto">
                      {renderBookingHistory()}
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
