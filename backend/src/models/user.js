import mongoose from "mongoose";

/**
 * @typedef {Object} userType
 * @property {string} _id
 * @property {string} email
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 */

const userScheme = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = mongoose.model < userType > ("User", userSchema);

export default User;
