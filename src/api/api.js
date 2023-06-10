import axios from "axios";

import qs  from "qs";
import { BASE_URL } from "./url_config";

export const api = axios.create({
   baseURL: `${BASE_URL}`,
   withCredentials: true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});
api.defaults.paramsSerializer = params => qs.stringify(params, {arrayFormat: 'repeat'})
api.interceptors.request.use(
   (config) => {
      if (!config.headers.Authorization) {
         const token = JSON.parse(localStorage.getItem("token"));
         console.log(token, '-------------------------------asdfasdfasdfasdf');
         if (token) {
            // config.headers.Authorization = `Bearer ${token.accessToken}`;
         }
      }

      return config;
   },
   (error) => Promise.reject(error)
);
