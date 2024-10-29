import api from "../configs/api";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  const mutationFn = (data) => api.post("/auth/register", data);
  return useMutation({ mutationFn });
};

const useLogin = () => {
  const mutationFn = (data) => api.post("/auth/login", data);
  return useMutation({ mutationFn });
};
export { useRegister, useLogin };
