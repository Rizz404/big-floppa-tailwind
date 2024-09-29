import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { User } from "../types/User";
import { CreateUserSchema, UpdateUserProfile } from "../lib/zod/userSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { BasePaginationParams } from "../types/Query";

export const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation<
    MutationResponse<User>,
    CustomAxiosError,
    CreateUserSchema
  >({
    mutationKey: ["create", "user"],
    mutationFn: async (data) => {
      return (await axiosInstance.post("/users", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/admin/users");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useGetUsers = ({ page, limit, order }: BasePaginationParams) => {
  const { data, ...rest } = useQuery<PaginatedResponse<User>, CustomAxiosError>(
    {
      queryKey: ["users", page, limit, order],
      queryFn: async () => {
        return (
          await axiosInstance.get("/users", { params: { page, limit, order } })
        ).data;
      },
    },
  );

  return {
    users: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetUserById = ({ userId }: { userId?: string }) => {
  return useQuery<User, CustomAxiosError>({
    queryKey: ["user", userId],
    queryFn: async () => {
      return (await axiosInstance.get(`/users/${userId}`)).data;
    },
    enabled: !!userId,
  });
};

export const useUpdateUserProfile = () => {
  const { setUser } = useAuth();

  return useMutation<
    MutationResponse<User>,
    CustomAxiosError,
    UpdateUserProfile
  >({
    mutationKey: ["patch", "user-profile"],
    mutationFn: async (data) => {
      return (await axiosInstance.patch("/users/profile", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      setUser(response.data);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};
