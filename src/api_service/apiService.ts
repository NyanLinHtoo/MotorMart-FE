import axios from "axios";
import { API_URL } from "../util/constant";
import { LoginPayload, RegisterPayload } from "../types/login";
import { BookingType } from "../types/booking";

const token = localStorage.getItem("jwt_token");
const token_header = {
  Authorization: `Bearer ${token}`,
};

const ApiService = {
  getCarListing: async () => {
    const response = await axios.get(API_URL + "/cars");
    return response;
  },

  getCarWithPagin: async (
    page: number = 1,
    limit: number = 25,
    filters?: { brand_id?: number; model_id?: number }
  ) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters?.brand_id) {
      params.append("brand_id", filters.brand_id.toString());
    }

    if (filters?.model_id) {
      params.append("model_id", filters.model_id.toString());
    }

    const response = await axios.get(`${API_URL}/cars?${params.toString()}`);
    return response;
  },

  getCarModel: async (brand_id: number) => {
    const response = await axios.get(API_URL + "/carmodels/" + brand_id);
    return response;
  },

  getCarDetail: async (id: number) => {
    const response = await axios.get(API_URL + "/cars/" + id);
    return response;
  },

  getCarBrandsWithPagin: async (page: number = 1, limit: number = 25) => {
    const response = await axios.get(
      API_URL + "/carbrands?page=" + page + "&limit=" + limit
    );
    return response;
  },

  getCarBrandsWithName: async (name: string) => {
    const response = await axios.get(API_URL + "/carbrands?keyword=" + name);
    return response;
  },

  getAllCarBrands: async (page: number = 1, limit: number = 50000) => {
    const response = await axios.get(
      API_URL + "/carbrands?page=" + page + "&limit=" + limit
    );
    return response;
  },

  loginUser: async (payload: LoginPayload) => {
    const response = await axios.post(API_URL + "/auth/login", payload);
    return response;
  },

  registerUser: async (payload: RegisterPayload) => {
    const response = await axios.post(API_URL + "/auth/signup", payload);
    return response;
  },

  postCarOrder: async (payload: any) => {
    const response = await axios.post(API_URL + "/order", payload, {
      headers: token_header,
    });
    return response;
  },

  orderListByCurrentUser: async () => {
    const response = await axios.get(API_URL + "/order", {
      headers: token_header,
    });
    return response;
  },

  postCarBooking: async (payload: BookingType) => {
    const response = await axios.post(API_URL + "/booking", payload, {
      headers: token_header,
    });
    return response;
  },

  getBookingList: async () => {
    const response = await axios.get(API_URL + "/booking/user/", {
      headers: token_header,
    });
    return response;
  },
};

export default ApiService;
