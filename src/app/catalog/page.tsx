"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api";

export default function CatalogPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchCars({ page: 1 }),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <main>
      <h1>Catalog</h1>

      <ul>
        {data?.cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model}
          </li>
        ))}
      </ul>
    </main>
  );
}