import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  birthday: { type: Date},
  phone: { type: String },
  location: { type: String },
  measurements: {
    height: { type: String },
    bust: { type: String },
    waist: { type: String },
    hips: { type: String },
    footSize: { type: String },
  },
  documents: [
    {
      title: String,
      fileUrl: String,
      date: String,
    },
  ],
  upcomingContracts: [
    {
      title: String,
      date: String,
    },
  ],
  agencies: [
    {
      name: String,
      location: String,
      status: String,
    },
  ],
  feedbackDate: { type: Date },
  avatar: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png",
  },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
