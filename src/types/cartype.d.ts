export interface CarPagination {
  total: number;
  cars: CarType[] | [];
}

export interface CarType {
  id: number;
  plate_no: "" | null;
  total_seats: number;
  price: number;
  carmodel_title: string;
  carbrand_name: string;
  carbrand_country_code: string;
  carbrand_logo: string;
  cargallery_image_path: string;
}
