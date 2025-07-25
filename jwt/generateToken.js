import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // must be true in production
    sameSite: "None", // <-- required for cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
export default createTokenAndSaveCookie;
