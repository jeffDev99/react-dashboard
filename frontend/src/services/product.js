import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../configs/api";
import { data } from "autoprefixer";

const useGetProducts = (limit, page) => {
  if (!limit && !page) return;
  const queryFn = () => api.get(`/products?limit=${limit}&page=${page}`);
  const queryKey = ["products"];
  return useQuery({ queryKey, queryFn, suspense: true });
};

const useGetMainProduct = (name) => {
  const queryFn = () =>
    api.get(`/products${name ? `?name=${name}` : ""}`).catch((err) => {
      if (err.response.status === 400) {
        return { data: { data: [] } };
      }
      throw err;
    });
  const queryKey = ["product"];
  return useQuery({ queryKey, queryFn, suspense: true });
};

const useCreateProduct = () => {
  const querClient = useQueryClient();
  const mutationFn = (data) => api.post("/products", data);
  const onSuccess = async () => {
    await querClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
const useUpdateProduct = (id) => {
  const querClient = useQueryClient();
  const mutationFn = (data) => api.put(`/products/${id}`, data);
  const onSuccess = async () => {
    await querClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};

const useDeleteProduct = (id) => {
  const querClient = useQueryClient();
  const mutationFn = (data) => api.delete(`/products/${id}`, data);
  const onSuccess = async () => {
    await querClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
export { useGetProducts, useCreateProduct, useUpdateProduct, useGetMainProduct, useDeleteProduct };
