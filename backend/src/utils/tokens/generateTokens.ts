import jwt from "jsonwebtoken";

interface User {
  userId: string;
  userEmail: string;
  isVerified: boolean;
  role: string;
  status: string;
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
