import bcrypt from "bcryptjs"; // npm package to hash passwords

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 8),
    isAdmin: true,
  },
  {
    name: "Emre Katlav",
    email: "emre@example.com",
    password: bcrypt.hashSync("123456", 8),
  },
  {
    name: "Mert Ercan",
    email: "mert@example.com",
    password: bcrypt.hashSync("123456", 8),
  },
];

export default users;
