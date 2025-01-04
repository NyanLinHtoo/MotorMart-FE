import { useEffect, useState } from "react";
import { Input, Pagination } from "antd";
import ApiService from "../api_service/apiService";
import { CarBrandList } from "../types/carbrands";

const { Search } = Input;

const Brands = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [carBrands, setCarBrands] = useState<CarBrandList | null>(null);
  const [totalCarBrands, setTotalCarBrands] = useState(0);
  const brandsPerPage = 25;

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleApiSearch = async (value: string) => {
    try {
      const response = await ApiService.getCarBrandsWithName(value);
      setCarBrands(response.data);
      setTotalCarBrands(response.data.total);
      setCurrentPage(1); // Reset to the first page for search results
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      const getCarBrandList = async () => {
        try {
          const response = await ApiService.getCarBrandsWithPagin(
            currentPage,
            brandsPerPage
          );

          setCarBrands(response.data);
          setTotalCarBrands(response.data.total);
        } catch (error) {
          console.error("Error fetching car list:", error);
        }
      };
      getCarBrandList();
    }
  }, [currentPage, brandsPerPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-slate-700 text-4xl font-extrabold text-center mb-12 tracking-tight">
          Explore Our Car Brands
        </h2>

        {/* Antd Search Component */}
        <div className="max-w-md mx-auto mb-12">
          <Search
            placeholder="Search brands..."
            allowClear
            enterButton="Search"
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleApiSearch}
            className="w-full"
          />
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 mb-12">
          {carBrands &&
            carBrands.carbrands.map((brand, index) => (
              <div
                key={index}
                className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 mb-4 flex items-center justify-center rounded-full bg-white shadow-lg overflow-hidden">
                  <img
                    src={
                      `${brand.brand_logo}` || "https://via.placeholder.com/100"
                    }
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain group-hover:scale-110 transition duration-300"
                  />
                </div>
                <span className="text-center text-sm text-gray-700 font-medium group-hover:text-blue-600 transition">
                  {brand.name}
                </span>
              </div>
            ))}
        </div>

        {/* Antd Pagination */}
        {totalCarBrands >= brandsPerPage && (
          <div className="flex justify-center">
            <Pagination
              current={currentPage}
              total={totalCarBrands}
              pageSize={brandsPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        )}

        {/* No results message */}
        {carBrands && carBrands.carbrands.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No brands found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Brands;
