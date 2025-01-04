import React from "react";
import { Card, Button, Tag } from "antd";
import { CarOutlined } from "@ant-design/icons";
import { CarType } from "../types/cartype";

interface CarCardProps {
  car: CarType;
  onButtonClick: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onButtonClick }) => {
  const {
    plate_no,
    price,
    cargallery_image_path,
    total_seats,
    carbrand_country_code,
    carmodel_title,
  } = car;

  return (
    <Card
      hoverable
      cover={
        <div>
          <img
            alt={plate_no || "N/A"}
            src={cargallery_image_path}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      }
      className="shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl">
      <Card.Meta
        title={
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">
              {carmodel_title || "N/A"}
            </span>
            <Tag color="blue" className="ml-2">
              Available
            </Tag>
          </div>
        }
        description={
          <p className="text-gray-500 line-clamp-2">
            Total Seats - {total_seats} | {carbrand_country_code}
          </p>
        }
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-600">
          $ {price || "0"}
        </div>
        <Button
          type="primary"
          icon={<CarOutlined />}
          onClick={onButtonClick}
          className="bg-indigo-600 hover:bg-indigo-700 rounded-lg ">
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default CarCard;
