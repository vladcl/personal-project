import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { config } from "../configs/config";

const { host, port } = config;

const api = axios.create({ baseURL: `http://${host}:${port}/api` });

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = localStorage.getItem("t");

  if (token) {
    config.headers = { ...config.headers } as AxiosHeaders;
    config.headers.set("Authorization", token);
  }

  return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(!error.response) 
            return Promise.reject({error: 'Não foi possível concluir a operação, por favor tente novamente'});

        return Promise.reject(error.response.data);
    },
);

export default api;
