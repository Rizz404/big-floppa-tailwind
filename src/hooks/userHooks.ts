import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { User } from "../types/User";
import { CreateUserSchema } from "../lib/zod/userSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

export const useGetUsers = () => {
  const { data, ...rest } = useQuery<PaginatedResponse<User>, CustomAxiosError>(
    {
      queryKey: ["users"],
      queryFn: async () => {
        return (await axiosInstance.get("/users")).data;
      },
    }
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
