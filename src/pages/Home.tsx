import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CarOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Carousel } from "antd";
import { CarBrand } from "../types/carbrands";
import CarCard from "../components/CarCard";
import ApiService from "../api_service/apiService";
import { CarType } from "../types/cartype";
import { backgroundColors, images, testimonials } from "../util/dataContstant";

const contentStyle: React.CSSProperties = {
  width: "100%",
  height: "600px",
  objectFit: "cover",
};

const whyChooseUs = [
  {
    title: "Quality Cars",
    description: "We offer high-quality cars that meet your expectations.",
    icon: <CarOutlined />,
    img: "/carImages/quality_cars.webp",
  },
  {
    title: "Affordable Prices",
    description: "Find the best deals and offers on our vehicles.",
    icon: <StarOutlined />,
    img: "/carImages/affordable_prices.jpg",
  },
  {
    title: "Eco-Friendly",
    description: "Drive the future with our eco-friendly cars.",
    icon: <EnvironmentOutlined />,
    img: "/carImages/eco_friendly.jpg",
  },
  {
    title: "Safety First",
    description: "Your safety is our top priority with every vehicle.",
    icon: <SafetyCertificateOutlined />,
    img: "/carImages/safety_first.webp",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [carBrands, setCarBrands] = useState<CarBrand[] | null>([]);
  const [featureCars, setFeatureCars] = useState<CarType[] | null>([]);

  const getFeatureCarsList = async () => {
    try {
      const response = await ApiService.getCarListing();
      const cars = response.data.cars;

      // Sort the cars by `created_at` in descending order (latest first)
      const sortedCars = cars.sort(
        (a: { created_at: string }, b: { created_at: string }) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Take the first 6 cars from the sorted list
      const latestFeatureCars = sortedCars.slice(0, 6);

      setFeatureCars(latestFeatureCars);
    } catch (error) {
      console.error("Error fetching car list:", error);
    }
  };

  const getCarBrandList = async () => {
    try {
      const response = await ApiService.getCarBrandsWithPagin();

      // Take the first 8 cars from the sorted list
      const latestCarsBrands = response.data.carbrands.slice(0, 10);
      setCarBrands(latestCarsBrands);
    } catch (error) {
      console.error("Error fetching car list:", error);
    }
  };

  useEffect(() => {
    getFeatureCarsList();
    getCarBrandList();
  }, []);

  return (
    <div className="bg-gray-50">
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.src}
              alt={image.alt}
              style={contentStyle}
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>

      <div className="pt-12">
        <div>
          <h2 className="text-slate-500 text-3xl font-bold italic text-center mb-8">
            Feature Cars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
            {featureCars &&
              featureCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onButtonClick={() => navigate(`/cars/${car.id}`)}
                />
              ))}
          </div>
          <div className="text-center my-12">
            <Link to="/cars">
              <Button type="primary" size="large">
                See More Cars
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 py-16">
          <h2 className="text-slate-500 text-3xl font-bold italic text-center mb-8">
            Explore Our Car Brands
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 px-4">
            {carBrands &&
              carBrands.map((brand, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={
                      // `${BRAND_URL}${brand.brand_logo}` ||
                      `${brand.brand_logo}` || "https://via.placeholder.com/100"
                    }
                    alt={`${brand.name} logo`}
                    className="w-24 h-24 rounded-full object-fit shadow-lg hover:scale-105 transform transition duration-300 mb-2"
                  />
                  <span className="text-center text-sm text-gray-700">
                    {brand.name}
                  </span>
                </div>
              ))}
          </div>
          <div className="text-center my-12">
            <Link to="/brands">
              <Button type="primary" size="large">
                See More Brands
              </Button>
            </Link>
          </div>
        </div>

        <div className="py-16 bg-slate-900">
          <h2 className="text-white text-3xl font-bold italic text-center mb-8">
            What Our Customers Say
          </h2>
          <Carousel autoplay dots className="mx-auto">
            {testimonials.map((testimonial, index) => {
              const bgColor = backgroundColors[index % backgroundColors.length];
              return (
                <div key={index} className="p-2">
                  <div
                    className={`${bgColor} shadow-md rounded-lg p-6 flex flex-col items-center text-center pb-8`}>
                    <Avatar
                      size={64}
                      icon={<UserOutlined />}
                      className="mb-4"
                    />
                    <p className="font-bold text-lg text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                    <blockquote className="italic text-gray-700 mt-4">
                      {testimonial.quote}
                    </blockquote>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="bg-gray-100 py-10">
          <h2 className="text-slate-600 text-4xl font-bold italic text-center mb-12">
            Why Choose Us
          </h2>
          <div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 justify-items-center px-4"
            style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="w-full"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}>
                <Card
                  className="transition-transform transform hover:shadow-xl"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "white",
                  }}
                  title={null}
                  bordered={false}
                  cover={
                    <div
                      style={{
                        height: "200px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "linear-gradient(135deg, #f0f4ff, #d9e9ff)",
                      }}>
                      <img
                        alt={item.title}
                        src={item.img}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px 10px 0 0",
                        }}
                      />
                    </div>
                  }
                  hoverable>
                  <Card.Meta
                    title={
                      <h3 className="text-lg font-bold text-gray-800 text-center">
                        {item.title}
                      </h3>
                    }
                    description={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          padding: "10px",
                        }}>
                        <p
                          style={{
                            flexGrow: 1,
                            color: "gray",
                            textAlign: "center",
                          }}>
                          {item.description}
                        </p>
                        <div style={{ textAlign: "center", marginTop: "10px" }}>
                          <Button
                            type="primary"
                            icon={item.icon}
                            style={{
                              padding: "0 20px",
                              borderRadius: "20px",
                            }}>
                            Learn More
                          </Button>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16 bg-gradient-to-br from-gray-800 via-slate-900 to-black">
          <div className="text-center py-12">
            <p className="text-xl font-semibold text-gray-300 pb-5">
              Ready to drive away with your dream car?
            </p>
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 border-none text-white px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
