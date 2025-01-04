import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Typography,
  message,
  Spin,
} from "antd";
import { CarOutlined } from "@ant-design/icons";
import ApiService from "../api_service/apiService";
import { CarType } from "../types/cartype";
import { BookingType } from "../types/booking";
import { toast } from "sonner";
import dayjs from "dayjs";

const { Text } = Typography;

const Booking: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set initial form values if user exists
    if (user) {
      form.setFieldsValue({
        email: user.email || "",
        phone_number: user.phonenumber || "",
      });
    }

    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const response = await ApiService.getCarDetail(Number(id));
        setCar(response.data);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCarDetails();
  }, []);

  const postBooking = async (values: BookingType) => {
    try {
      const response = await ApiService.postCarBooking(values);
      if (response.status === 201) {
        toast.success(
          "Your test drive has been scheduled! We will confirm shortly."
        );
        form.resetFields();
        navigate("/cars");
      } else {
        message.error("Failed to place Booking, Try again later");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Unknown error");
    }
  };

  const onFinish = async (values: BookingType) => {
    const carId = parseInt(id as string);
    values.car_id = carId;
    await postBooking(values);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Car Showcase */}
          <div
            className="hidden md:block relative bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url('/api/placeholder/800/1200')`,
              backgroundBlendMode: "multiply",
            }}>
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">
                  {car?.carmodel_title || "Your Dream Car"}
                </h2>
                <p className="text-neutral-300">
                  {car?.carbrand_name
                    ? `${car.carbrand_name} Experience`
                    : "Personalized Test Drive"}
                </p>
                <div className="h-1 w-16 bg-white opacity-70"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="p-10 space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-neutral-800 mb-2">
                Schedule Test Drive
              </h1>
              <Text className="text-neutral-500">
                Discover your perfect ride
              </Text>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Form.Item
                  name="full_name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}>
                  <Input
                    placeholder="Your name"
                    className="rounded-xl border-neutral-300 focus:border-black"
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
                    placeholder="Your email"
                    className="rounded-xl border-neutral-300 focus:border-black"
                  />
                </Form.Item>

                <Form.Item
                  name="phone_number"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}>
                  <Input
                    placeholder="Your phone number"
                    className="rounded-xl border-neutral-300 focus:border-black"
                  />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    name="preferred_date"
                    label="Preferred Date"
                    rules={[
                      { required: true, message: "Please select a date" },
                    ]}>
                    <DatePicker
                      className="w-full rounded-xl border-neutral-300 focus:border-black"
                      placeholder="Select date"
                      disabledDate={(current) => {
                        const today = dayjs().endOf("day");
                        return current && current < today;
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="preferred_time"
                    label="Preferred Time"
                    rules={[
                      { required: true, message: "Please select a time" },
                    ]}>
                    <TimePicker
                      className="w-full rounded-xl border-neutral-300 focus:border-black"
                      format="HH:mm"
                      placeholder="Select time"
                      showNow={false}
                      use12Hours
                      disabledTime={() => ({
                        disabledHours: () => {
                          const hours = [];
                          for (let i = 0; i < 9; i++) hours.push(i); // Disable hours before 9 AM
                          for (let i = 18; i < 24; i++) hours.push(i); // Disable hours after 6 PM
                          return hours;
                        },
                        disabledMinutes: (hour) => {
                          // Disable all minutes for invalid hours
                          if (hour < 9 || hour >= 18)
                            return Array.from({ length: 60 }, (_, i) => i);
                          return [];
                        },
                      })}
                    />
                  </Form.Item>
                </div>

                <Form.Item name="additional_note" label="Additional Notes">
                  <Input.TextArea
                    placeholder={
                      car?.carmodel_title
                        ? `Any specific requirements for your ${car?.carmodel_title} test drive`
                        : "Additional notes or requirements"
                    }
                    rows={4}
                    className="rounded-xl border-neutral-300 focus:border-black"
                  />
                </Form.Item>

                <Form.Item className="mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<CarOutlined />}
                    className="w-full rounded-xl bg-black hover:bg-neutral-800 h-12 text-lg">
                    Book Test Drive
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
