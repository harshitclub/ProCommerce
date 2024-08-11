import jwt from "jsonwebtoken";

const FORGET_PASS_SECRET = process.env.FORGET_PASS_SECRET;

export const verifyForgetPassToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!FORGET_PASS_SECRET) {
      reject(new Error("Missing FORGET_PASS_SECRET environment variable"));
      return;
    }

    jwt.verify(token, FORGET_PASS_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
