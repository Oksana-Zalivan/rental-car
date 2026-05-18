"use client";

import { FormEvent, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { fetchBrands, fetchCars } from "@/lib/api";
import CarCard from "@/components/CarCard/CarCard";
import FilterSelect from "@/components/FilterSelect/FilterSelect";

import styles from "./CatalogPage.module.css";

const priceOptions = ["30", "40", "50", "60", "70", "80", "90", "100"];

export default function CatalogPage() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const [activeFilters, setActiveFilters] = useState({
    brand: "",
    price: "",
    minMileage: "",
    maxMileage: "",
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", activeFilters],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        brand: activeFilters.brand || undefined,
        price: activeFilters.price || undefined,
        minMileage: activeFilters.minMileage || undefined,
        maxMileage: activeFilters.maxMileage || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setActiveFilters({
      brand,
      price,
      minMileage,
      maxMileage,
    });
  };

  const handleClearFilters = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");

    setActiveFilters({
      brand: "",
      price: "",
      minMileage: "",
      maxMileage: "",
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <form className={styles.filters} onSubmit={handleSubmit}>
          <FilterSelect
            label="Car brand"
            placeholder="Choose a brand"
            options={brands}
            value={brand}
            onChange={setBrand}
            width={204}
            dropdownHeight={272}
          />

          <FilterSelect
            label="Price/ 1 hour"
            placeholder="Choose a price"
            options={priceOptions}
            value={price}
            onChange={setPrice}
            width={196}
            dropdownHeight={188}
          />

          <div className={styles.field}>
            <label className={styles.label}>Car mileage / km</label>

            <div className={styles.mileageGroup}>
              <input
                className={`${styles.mileageInput} ${styles.fromInput}`}
                placeholder="From"
                value={minMileage}
                onChange={(event) => setMinMileage(event.target.value)}
              />

              <input
                className={`${styles.mileageInput} ${styles.toInput}`}
                placeholder="To"
                value={maxMileage}
                onChange={(event) => setMaxMileage(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>

            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearFilters}
            >
              Clear filters
            </button>
          </div>
        </form>

        <ul className={styles.list}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>

        {hasNextPage && (
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </main>
  );
}
