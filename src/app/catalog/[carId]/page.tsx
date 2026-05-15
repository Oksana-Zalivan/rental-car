import { fetchCarById } from "@/lib/api";
import BookingForm from "@/components/BookingForm/BookingForm";
import styles from "./page.module.css";

type CarDetailsPageProps = {
  params: Promise<{
    carId: string;
  }>;
};

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = await params;

  const car = await fetchCarById(carId);

  const conditions = car.rentalConditions ?? [];
  const features = car.features ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={styles.image}
          />

          <BookingForm carId={carId} />
        </div>

        <div className={styles.infoCard}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              {car.brand} {car.model}, {car.year}
            </h1>

            <span className={styles.article}>
              Article: {car.id.slice(0, 4)}
            </span>
          </div>

          <p className={styles.location}>
            {car.location.city}, {car.location.country}
          </p>

          <p className={styles.price}>${car.rentalPrice}</p>

          <p className={styles.description}>{car.description}</p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Rental Conditions:</h2>

            <ul className={styles.list}>
              {conditions.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Car Specifications:</h2>

            <ul className={styles.list}>
              <li className={styles.item}>Year: {car.year}</li>

              <li className={styles.item}>Type: {car.type}</li>

              <li className={styles.item}>
                Fuel Consumption: {car.fuelConsumption}
              </li>

              <li className={styles.item}>Engine: {car.engineSize}</li>

              <li className={styles.item}>
                Mileage: {car.mileage.toLocaleString("en-US")} km
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Features</h2>

            <ul className={styles.list}>
              {features.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
