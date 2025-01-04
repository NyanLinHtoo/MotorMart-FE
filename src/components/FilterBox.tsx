import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Select } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import ApiService from "../api_service/apiService";
import { CarModel } from "../types/carmodel";
import { CarBrand } from "../types/carbrands";

interface FilterBoxProps {
  title: string;
  onSearch: (filters: { brand_id?: number; model_id?: number }) => void;
}

const FilterBox = ({ title, onSearch }: FilterBoxProps) => {
  const [form] = Form.useForm();
  const [brand, setBrand] = useState<string | null>(null);
  const [brandsList, setBrandsList] = useState<
    { label: string; value: number }[]
  >([]);
  const [modelsList, setModelsList] = useState<
    { label: string; value: number }[]
  >([]);

  const getCarBrands = async () => {
    try {
      const response = await ApiService.getAllCarBrands();
      const options = response.data.carbrands.map((brand: CarBrand) => ({
        label: brand.name,
        value: brand.id,
      }));
      setBrandsList(options);
    } catch (error) {
      console.error("Error fetching car brands:", error);
    }
  };

  const getCarModels = async (brand_id: number) => {
    try {
      const response = await ApiService.getCarModel(brand_id);
      const options = response.data.map((model: CarModel) => ({
        label: model.title,
        value: model.id,
      }));
      setModelsList(options);
    } catch (error) {
      console.error("Error fetching car models:", error);
    }
  };

  useEffect(() => {
    getCarBrands();
  }, []);

  useEffect(() => {
    if (brand) {
      getCarModels(Number(brand));
    } else {
      setModelsList([]); // Clear models list if no brand is selected
    }
  }, [brand]);

  const onFinish = (values: { brand_id?: number; model_id?: number }) => {
    onSearch(values);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-screen-lg mx-auto mb-5">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-4 flex items-center justify-center">
        <FilterOutlined className="text-white mr-3 text-2xl" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="p-6 space-y-4"
        onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item name="brand_id" label="Car Brand">
              <Select
                allowClear
                showSearch
                placeholder="Select car brands"
                options={brandsList}
                onChange={(value) => setBrand(value)}
                className="w-full"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item name="model_id" label="Car Model">
              <Select
                allowClear
                showSearch
                placeholder="Select car model"
                options={modelsList}
                className="w-full"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                className="w-full mt-7 bg-indigo-600 hover:bg-indigo-700 rounded-lg">
                Search Cars
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FilterBox;
