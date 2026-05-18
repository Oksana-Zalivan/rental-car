# RentalCar

Frontend application for a car rental company built with Next.js and TypeScript.

## Live Demo

Add your Vercel link here

## GitHub Repository

Add your GitHub repository link here

---

## Technologies

- Next.js 15
- React
- TypeScript
- TanStack Query
- Axios
- CSS Modules
- React Hot Toast

---

## Features

### Home Page
- Hero section with call-to-action button
- Navigation to catalog page

### Catalog Page
- Display list of available cars
- Backend filtering:
  - by brand
  - by price
  - by mileage range
- Pagination with Load More
- Implemented using `useInfiniteQuery`
- Open car details in a new browser tab

### Car Details Page
- Detailed information about selected car
- Rental booking form
- Booking request submission to backend API
- Success notification after booking
- Car specifications and features

---

## Project Structure

```bash
src/
 ├── app/
 ├── components/
 ├── lib/
 ├── types/
 └── public/
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-link>
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

---

## Backend API

The project uses backend API provided by GoIT:

```bash
https://car-rental-api.goit.study
```

---

## Author

Developed by Oksana Zalivan