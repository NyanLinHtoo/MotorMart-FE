import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, Tag } from "antd";
import ApiService from "../api_service/apiService";
import { CarType } from "../types/cartype";
import { toast } from "sonner";

const CarDetail = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const response = await ApiService.getCarDetail(Number(id));
        setCar(response.data);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleOrderClick = () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      // Save the current URL for redirection after login
      localStorage.setItem("redirect_url", window.location.pathname);
      navigate("/login");
    } else {
      setOpen(true);
    }
  };

  const handleOk = async () => {
    await handleOrder();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOrder = async () => {
    try {
      const response = await ApiService.postCarOrder({
        ordered_car_id: parseInt(id as string),
      });
      toast.success("Order placed successfully");
      console.log(response);
      setOpen(false);
    } catch (error: any) {
      console.error("Failed to place order:", error);
      setOpen(true);
      toast.error(error.response.data.error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Spin size="large" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-gray-500 text-xl">Car details not available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="container mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate(-1)}
            type="text"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ArrowLeftOutlined />
            Back to Inventory
          </Button>
        </div>

        {/* Car Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Car Image Section */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={
                  car.cargallery_image_path
                    ? `${car.cargallery_image_path}`
                    : "https://via.placeholder.com/800x400"
                }
                alt={car.carbrand_name || "Car"}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Image Overlay Tags */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Tag color="green">In Stock</Tag>
              <Tag color="blue">{car.carbrand_name || "Premium"}</Tag>
            </div>
          </div>

          {/* Car Details Section */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              {/* Car Title and Brand */}
              <div className="flex justify-between items-center mb-6">
                {/* Car Title (Left) */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {car.carmodel_title || "Luxury Vehicle"}
                  </h1>
                </div>

                {/* Brand Logo and Name (Right) */}
                <div className="flex items-center">
                  <img
                    src={`${car.carbrand_logo}`}
                    alt={car.carbrand_name || "Brand Logo"}
                    className="w-12 h-12 object-cover rounded-full shadow-md mb-2"
                  />
                  <span className="text-gray-600 text-lg text-right ps-3">
                    {car.carbrand_name || "Luxury Brand"}
                  </span>
                </div>
              </div>

              {/* Car Specifications */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-500 mb-1">Plate Number</p>
                  <p className="font-semibold">{car.plate_no || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Country</p>
                  <p className="font-semibold">
                    {car.carbrand_country_code || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Total Seats</p>
                  <p className="font-semibold">
                    {car.total_seats || "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Vehicle Price</p>
                  <p className="font-semibold text-green-600 text-2xl">
                    ${car.price ? car.price.toLocaleString() : "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleOrderClick}
                type={user ? "primary" : "default"}
                block
                size="large"
                className={`transition-colors rounded-lg ${
                  user
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-blue-500 text-blue-500 hover:text-blue-600 hover:border-blue-600"
                }`}
              >
                {user ? "Order Now" : "Login to Order"}
              </Button>

              <Button
                onClick={() => navigate("/booking/" + id)}
                type="default"
                block
                size="large"
                className="border-gray-300 hover:border-blue-500 transition-colors rounded-lg">
                Reserve Your Test Drive!
              </Button>

              <Button
                type="primary"
                block
                size="large"
                className="border-gray-300 hover:border-blue-500 transition-colors rounded-lg"
                onClick={() => navigate("/contact")}>
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        title="Car Order Confirmation"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-500 mb-1">Plate Number</p>
            <p className="font-semibold">{car.plate_no || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Country</p>
            <p className="font-semibold">
              {car.carbrand_country_code || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Total Seats</p>
            <p className="font-semibold">{car.total_seats || "Unknown"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Vehicle Price</p>
            <p className="font-semibold text-green-600 text-2xl">
              ${car.price ? car.price.toLocaleString() : "0"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-red-500 mb-1">
            your order will be proceed within a week, car owner will contact you
            by your provided phone number in profile
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CarDetail;
