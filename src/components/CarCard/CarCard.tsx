"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Car } from "@/types/car";
import styles from "./CarCard.module.css";

type CarCardProps = {
  car: Car;
};

export default function CarCard({ car }: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const city = car.location.city;
  const country = car.location.country;

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          className={styles.image}
        />

        <button
          type="button"
          className={styles.favoriteBtn}
          onClick={toggleFavorite}
          aria-label="Add to favorites"
        >
          <svg className={styles.heartIcon}>
            <use
              href={
                isFavorite
                  ? "/sprite.svg#icon-fill-heart"
                  : "/sprite.svg#icon-heart"
              }
            />
          </svg>
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.topRow}>
          <h2 className={styles.name}>
            {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
            {car.year}
          </h2>

          <p className={styles.price}>${car.rentalPrice}</p>
        </div>

        <div className={styles.details}>
          <span className={styles.detail}>{city}</span>
          <span className={styles.separator}>|</span>
          <span className={styles.detail}>{country}</span>
          <span className={styles.separator}>|</span>
          <span className={styles.detail}>{car.rentalCompany}</span>
          <span className={styles.separator}>|</span>
          <span className={styles.detail}>
            {car.type.charAt(0) + car.type.slice(1).toLowerCase()}
          </span>
          <span className={styles.separator}>|</span>
          <span className={styles.detail}>
            {car.mileage.toLocaleString("en-US")} km
          </span>
        </div>

        <Link
          href={`/catalog/${car.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Read more
        </Link>
      </div>
    </li>
  );
}
