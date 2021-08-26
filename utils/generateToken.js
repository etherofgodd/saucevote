import jwt from "jsonwebtoken";

export const generateToken = (id, voterId) => {
  return jwt.sign(
    {
      id,
      voterId,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "30d",
    }
  );
};
