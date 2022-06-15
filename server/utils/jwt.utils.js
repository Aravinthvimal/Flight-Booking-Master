import jwt from "jsonwebtoken";

export const verifyJwt = (token) => {
  console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);

  const SECRET_KEY = process.env.JWT_SECRET;

  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, function (err, payload) {
      if (err) {
        reject(err);
      }

      resolve(payload);
    });
  });
};

export const signJwt = (userId) => {
  console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);

  const SECRET_KEY = process.env.JWT_SECRET;

  return new Promise((resolve, reject) => {
    jwt.sign(
      { userId },
      SECRET_KEY,
      { expiresIn: "1h" },
      function (err, token) {
        if (err) {
          reject(err);
        }

        resolve(token);
      }
    );
  });
};
