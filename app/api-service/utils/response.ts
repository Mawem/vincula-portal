import { AxiosError, AxiosResponse } from "axios";

export const handleResponse = (response: AxiosResponse) => {
  return response;
};

export const handleError = (error: AxiosError) => {
  //toast and notification from user
  if (error.response) {
    console.error("Request failed with status code", error.response.status);
  } else if (error.request) {
    console.error("Request failed with no response received");
  } else {
    console.error("Request failed with error", error.message);
  }
  return Promise.reject(error);
};
