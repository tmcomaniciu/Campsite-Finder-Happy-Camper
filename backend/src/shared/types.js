/**
 * @typedef {Object} UserType
 * @property {string} _id
 * @property {string} email
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 */

/**
 * @typedef {Object} CampsiteType
 * @property {string} _id
 * @property {string} userId
 * @property {string} name
 * @property {string} city
 * @property {string} state
 * @property {string} description
 * @property {string} type
 * @property {number} adultCount
 * @property {number} childCount
 * @property {string[]} facilities
 * @property {number} pricePerNight
 * @property {number} starRating
 * @property {string[]} imageUrls
 * @property {Date} lastUpdated
 * @property {BookingType[]} bookings
 */

/**
 * @typedef {Object} BookingType
 * @property {string} _id
 * @property {string} userId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {number} adultCount
 * @property {number} childCount
 * @property {Date} checkIn
 * @property {Date} checkOut
 * @property {number} totalCost
 */

/**
 * @typedef {Object} CampsiteSearchResponse
 * @property {HotelType[]} data
 * @property {Object} pagination
 * @property {number} pagination.total
 * @property {number} pagination.page
 * @property {number} pagination.pages
 */
