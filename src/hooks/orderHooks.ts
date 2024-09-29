import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { Order } from "../types/Order";
import { toast } from "react-toastify";
import { BasePaginationParams } from "../types/Query";

export const useGetOrders = ({ page, limit, order }: BasePaginationParams) => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<Order>,
    CustomAxiosError
  >({
    queryKey: ["orders", page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get("/orders", { params: { page, limit, order } })
      ).data;
    },
  });

  return {
    orders: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetOrderItemsByOrderId = ({
  orderId,
  page,
  limit,
  order,
}: BasePaginationParams & { orderId?: string }) => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<Order>,
    CustomAxiosError
  >({
    queryKey: ["orders", orderId, page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get(`/orders/${orderId}`, {
          params: { page, limit, order },
        })
      ).data;
    },
    enabled: !!orderId,
  });

  return {
    orders: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetOrderById = ({ orderId }: { orderId?: string }) => {
  return useQuery<Order, CustomAxiosError>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      return (await axiosInstance.get(`/orders/${orderId}`)).data;
    },
    enabled: !!orderId,
  });
};

export const useUpdateOrderById = ({ orderId }: { orderId?: string }) => {
  return useMutation<MutationResponse<Order>, CustomAxiosError, Order>({
    mutationKey: ["patch", "order", orderId],
    mutationFn: async (data) => {
      return (await axiosInstance.patch(`/orders/${orderId}`, data)).data;
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

export const useDeleteOrderById = ({ orderId }: { orderId?: string }) => {
  return useMutation<MutationResponse<Order>, CustomAxiosError, void>({
    mutationKey: ["delete", "order", orderId],
    mutationFn: async () => {
      return (await axiosInstance.delete(`/orders/${orderId}`)).data;
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
