// export interface BookingType {
//   additional_note: string;
//   car_id: number | null;
//   email: string;
//   full_name: string;
//   phone_number: string;
//   preferred_date: string;
//   preferred_time: string;
//   user_id: number;
// }

export interface BookingTypeList {
  total: number;
  bookings: BookingType[];
}

export interface BookingType {
  id: number;
  additional_note: string;
  carbrand_country_code: string;
  carbrand_logo: string;
  carbrand_name: string;
  cargallery_image_path: string;
  carmodel_title: string;
  created_at: string;
  email: string;
  phone_number: string;
  preferred_date: string;
  preferred_time: string;
  plate_no: string | number | null;
  total_seats: number | null;
  price: number;
  username: string;
  car_id: number;
  user_id: number;
}
// additional_note: "test"
// carbrand_country_code: "se"
// carbrand_logo: "http://localhost:8787/static/images/brands/volvo.jpg"
// carbrand_name: "Volvo"
// cargallery_image_path: "http://localhost:8787/static/images/cars/1733215090824488303.jpg"
// carmodel_title: "EM90"
// created_at: "2024-12-06T18:43:15.833+07:00"
// email: "furtive@gmail.com"
// id: 2
// phone_number: "0989649098"
// plate_no: null
// preferred_date: "2024-12-06T17:00:00.000Z"
// preferred_time: "2024-12-06T11:41:11.600Z"
// price: null
// total_seats: null
// username: "furtive"
