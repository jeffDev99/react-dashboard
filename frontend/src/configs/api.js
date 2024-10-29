import axios from "axios";
import { getCookies } from "../utils/config";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    const Token = getCookies("Token");
    if (Token) {
      req.headers["Authorization"] = `Bearer ${Token}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// api.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     if (err.response && err.response.status === 400) {
//       return Promise.resolve({ data: [] });
//     }
//     return Promise.reject(err);
//   }
// );
export default api;
