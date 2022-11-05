import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
  },
  name: {
    firstName: String,
    LastName: String,
  },
  address: [
    {
      houseNo: Number,
      street: String,
      landmark: String,
      city: String,
      country: String,
      pinCode: Number,
    },
  ],
});

const user = mongoose.model("User", userSchema);
export default user;
