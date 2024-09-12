import axios, { AxiosResponse } from "axios";
import { handleError, handleResponse } from "./response";
interface Model {
  [key: string]: any;
}

interface ApiProvider {
  getAll(resource: string, query?: string, token?: string | null): Promise<AxiosResponse>;
  getById(resource: string, id: number, token?: string | null): Promise<AxiosResponse>;
  post(resource: string, model: Model, token?: string | null): Promise<AxiosResponse>;
  put(resource: string, model: Model, token?: string | null): Promise<AxiosResponse>;
  patch(resource: string, model: Model, token?: string | null): Promise<AxiosResponse>;
  remove(resource: string, id: number, token?: string | null): Promise<AxiosResponse>;
}

const BASE_URL = 'https://app.vincu.la/api/v1';

console.log('BASE URL:   -----> ', BASE_URL);
const apiProvider: ApiProvider = {
  getAll: (resource: string, query: string, token: string | null) => {
    const req_config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    console.log('BASE URL:   -----> ', `${BASE_URL}/${resource}${query ? `?${query}` : ""}`);
    console.log(req_config);
    return axios
      .get(
        `${BASE_URL}/${resource}${query ? `?${query}` : ""}`,
        token ? req_config : {},
      )
      .then(handleResponse)
      .catch(handleError);
  },
  getById: (resource: string, id: number, token: string | null) => {
    const req_config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return axios
      .get(`${BASE_URL}/${resource}/${id}`, token ? req_config : {})
      .then(handleResponse)
      .catch(handleError);
  },
  post: (resource: string, model: Model, token: string | null) => {
    console.log('POST request to: ', BASE_URL);
    const req_config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return axios
      .post(`${BASE_URL}/${resource}`, model, token ? req_config : {})
      .then(handleResponse)
      .catch(handleError);
  },
  put: (resource: string, model: Model, token: string | null) => {
    const req_config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .put(`${BASE_URL}/${resource}`, model, token ? req_config : {})
      .then(handleResponse)
      .catch(handleError);
  },
  patch: (resource: string, model: Model, token: string | null) => {
    const req_config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return axios
      .put(`${BASE_URL}/${resource}`, model, token ? req_config : {})
      .then(handleResponse)
      .catch(handleError);
  },
  remove: (resource: string, id: number, token: string | null) => {
    const req_config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .delete(`${BASE_URL}/${resource}?id=${id}`, req_config ?? {})
      .then(handleResponse)
      .catch(handleError);
  },
};

export default apiProvider;
