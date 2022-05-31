import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true } // created at when or updated when
);
userSchema.pre("save", async function (next) {
  //when user creates an account, this function converts simple password to bcrypt hash password.
  //if user does not update password, do not update password and pass it with next()
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 8);
});
const User = mongoose.model("User", userSchema);
export default User;
