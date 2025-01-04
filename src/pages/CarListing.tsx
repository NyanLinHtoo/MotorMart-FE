import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Divider } from "antd";
import { CarOutlined, FilterOutlined } from "@ant-design/icons";
import CarCard from "../components/CarCard";
import FilterBox from "../components/FilterBox";
import ApiService from "../api_service/apiService";
import { CarPagination } from "../types/cartype";

const CarListing = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [cars, setCars] = useState<CarPagination | null>(null);
  const [totalCars, setTotalCars] = useState(0);
  const [filters, setFilters] = useState<{
    brand_id?: number;
    model_id?: number;
  }>({});
  const carsPerPage = 24;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await ApiService.getCarWithPagin(
          currentPage,
          carsPerPage,
          filters
        );
        setCars(response.data);
        setTotalCars(response.data.total);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, [currentPage, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowDetails = (id: number) => {
    navigate(`/cars/${id}`);
  };

  const handleSearch = (newFilters: {
    brand_id?: number;
    model_id?: number;
  }) => {
    setFilters(newFilters); // Update filters state
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="min-h-[80vh] mx-auto px-4 py-8">
      <FilterBox title="Search Cars" onSearch={handleSearch} />

      <Divider orientation="left" className="my-8">
        <span className="text-xl font-bold text-gray-700 flex items-center">
          <CarOutlined className="mr-2 text-blue-500" />
          Available Cars
          <FilterOutlined className="ml-2 text-gray-500" />
        </span>
      </Divider>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars && cars.cars.length > 0 ? (
          cars.cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onButtonClick={() => handleShowDetails(car.id)}
            />
          ))
        ) : (
          <div className="text-center col-span-4 mt-24">
            <p className="text-gray-500">No cars found matching your search.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        {totalCars > carsPerPage ? (
          <Pagination
            current={currentPage}
            total={totalCars}
            pageSize={carsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CarListing;
