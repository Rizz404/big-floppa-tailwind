import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { UserAddress } from "../types/UserAddress";
import { UserAddressSchema } from "../lib/zod/userAddressSchema";
import { toast } from "react-toastify";
import { BasePaginationParams } from "../types/Query";

export const useCreateUserAddress = () => {
  return useMutation<
    MutationResponse<UserAddress>,
    CustomAxiosError,
    UserAddressSchema
  >({
    mutationKey: ["post", "user-addresses"],
    mutationFn: async (data) => {
      return (await axiosInstance.post("/user-addresses", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useGetUserAddresses = ({
  page,
  limit,
  order,
}: BasePaginationParams) => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<UserAddress>,
    CustomAxiosError
  >({
    queryKey: ["addresses", page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get("/user-addresses", {
          params: { page, limit, order },
        })
      ).data;
    },
  });

  return {
    userAddresses: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetUserAddressesByUser = ({
  page,
  limit,
  order,
}: BasePaginationParams) => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<UserAddress>,
    CustomAxiosError
  >({
    queryKey: ["user-addresses", page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get("/user-addresses/user", {
          params: { page, limit, order },
        })
      ).data;
    },
  });

  return {
    userAddresses: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useUpdateUserAddress = ({ addressId }: { addressId: string }) => {
  return useMutation<
    MutationResponse<UserAddress>,
    CustomAxiosError,
    UserAddressSchema
  >({
    mutationKey: ["patch", "user-addresses"],
    mutationFn: async (data) => {
      return (await axiosInstance.post(`/user-addresses/${addressId}`, data))
        .data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useDeleteUserAddressById = ({
  userAddress,
}: {
  userAddress?: string;
}) => {
  return useMutation<MutationResponse<UserAddress>, CustomAxiosError, void>({
    mutationKey: ["delete", "user-address", userAddress],
    mutationFn: async () => {
      return (await axiosInstance.delete(`/user-addresses/${userAddress}`))
        .data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};
