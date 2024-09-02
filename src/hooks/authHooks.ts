import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import { CustomAxiosError, MutationResponse } from "../types/Response";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { toast } from "react-toastify";
import { User } from "../types/User";
import { LoginSchema, RegisterSchema } from "../lib/zod/authSchema";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<MutationResponse<User>, CustomAxiosError, RegisterSchema>({
    mutationKey: ["register"],
    mutationFn: async (data) => {
      return (await axiosInstance.post("/auth/register", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  return useMutation<
    MutationResponse<User> & { accessToken: string },
    CustomAxiosError,
    LoginSchema
  >({
    mutationKey: ["register"],
    mutationFn: async (data) => {
      return (await axiosInstance.post("/auth/login", data)).data;
    },
    onSuccess: async (response) => {
      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setUser(response.data);
      setToken(response.accessToken);
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  return useMutation<
    MutationResponse<{ message: string }>,
    CustomAxiosError,
    void
  >({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return (await axiosInstance.post("/auth/logout")).data;
    },
    onSuccess: async (response) => {
      navigate("/");
      setUser(null);
      setToken(null);
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};
