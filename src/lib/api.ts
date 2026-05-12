import axios from "axios";
import { Car } from "@/types/car";

export const rentalCarApi = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

type FetchCarsResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};

type FetchCarsParams = {
  page?: number;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
};

export async function fetchCars(
  params: FetchCarsParams
): Promise<FetchCarsResponse> {
  const response = await rentalCarApi.get("/cars", {
    params: {
      ...params,
      limit: 12,
    },
  });

  return response.data;
}