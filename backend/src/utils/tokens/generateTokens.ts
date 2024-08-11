import jwt from "jsonwebtoken";

interface User {
  userId?: string;
  userEmail?: string;
  isVerified?: boolean;
  role?: string;
  status?: string;
}

export const generateAccessToken = async ({
  userId,
  userEmail,
  isVerified,
  role,
  status,
}: User) => {
  try {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error("Missing environment variable: ACCESS_TOKEN_SECRET");
    }
    const payload = {
      userId: userId,
      userEmail: userEmail,
      isVerified: isVerified,
      role: role,
      status: status,
    };
    const accessToken = await jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return accessToken;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error; // Re-throw the error for proper handling
  }
};

export const generateForgetPassToken = async ({
  userId,
  userEmail,
  isVerified,
  role,
  status,
}: User) => {
  try {
    const FORGET_PASS_SECRET = process.env.FORGET_PASS_SECRET;
    if (!FORGET_PASS_SECRET) {
      throw new Error("Missing environment variable: FORGET_PASS_SECRET");
    }
    const payload = {
      userEmail: userEmail,
    };
    const forgetPassToken = await jwt.sign(payload, FORGET_PASS_SECRET, {
      expiresIn: "15min",
    });
    return forgetPassToken;
  } catch (error) {
    console.error("Error generating forget password token: ", error);
    throw error; // Re-throw the error for proper handling
  }
};
