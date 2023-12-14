import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3000/users",
});

export const GetUsers = async () => {
  try {
    const response = await Api.get("/");
    if (response.status !== 200) {
      throw new Error("Error");
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export const GetSingleUser = async (userId) => {
  try {
    const response = await Api.get(`/${userId}`);
    if (response.status !== 200) {
      throw new Error("Error");
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const AddUsers = async (newUser) => {
  try {
    const response = await Api.post("/", newUser);
    if (response.status !== 201) {
      throw new Error("Error");
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const DeleteUser = async (userId) => {
  try {
    const response = await Api.delete(`/${userId}`);
    if (response.status !== 200) {
      throw new Error("Error");
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const EditUsers = async (userId, editedData) => {
  try {
    const request = await Api.put(`/${userId}`, editedData);
    if (request.status !== 200) {
      throw new Error("Error");
    } else {
      return request.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
