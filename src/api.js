// api.js

import usersData from "./data/users.json";

// Simulate API call to authenticate user
export const authenticateUser = async (username, password) => {
  const user = usersData.users.find(
    (user) => user.username === username && user.password === password
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user) {
        resolve({ success: true, user });
      } else {
        reject(new Error("Invalid credentials."));
      }
    }, 1000); // Simulate a 1-second delay to simulate API response time
  });
};
