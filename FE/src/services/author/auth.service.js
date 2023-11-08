import axios from "axios";

export const signUpService = async (signUpPayLoad) => {
  return await axios.post(
    `http://localhost:3000/user/create-User`,
    signUpPayLoad
  );
};

export const signInService = async (email, password) => {
  return await axios.post(`http://localhost:3000/user/sign-In`, {
    email,
    password,
  });
};
