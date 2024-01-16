// For UserType
export const UserType = {
  _id: undefined,
  email: undefined,
  password: undefined,
  firstName: undefined,
  lastName: undefined,
};

// For HotelType
export const CampsiteType = {
  _id: undefined,
  userId: undefined,
  name: undefined,
  city: undefined,
  state: undefined,
  description: undefined,
  type: undefined,
  adultCount: undefined,
  childCount: undefined,
  facilities: undefined,
  pricePerNight: undefined,
  starRating: undefined,
  imageUrls: undefined,
  lastUpdated: undefined,
  bookings: undefined, // You'll need to define the structure of BookingType in JavaScript as well
};

// For BookingType
export const BookingType = {
  _id: undefined,
  userId: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  adultCount: undefined,
  childCount: undefined,
  checkIn: undefined,
  checkOut: undefined,
  totalCost: undefined,
};

// For HotelSearchResponse
export const CampsiteSearchResponse = {
  data: undefined, // This should be an array of CampsiteType objects
  pagination: {
    total: undefined,
    page: undefined,
    pages: undefined,
  },
};
