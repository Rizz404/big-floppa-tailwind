import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { CartItem } from "../types/CartItem";
import { BasePaginationParams } from "../types/Query";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";
import { Order } from "../types/Order";

export const useAddCarItemToCart = () => {
  return useMutation<
    MutationResponse<CartItem>,
    CustomAxiosError,
    { catId: string; quantity?: number }
  >({
    mutationKey: ["post", "add-cart-item"],
    mutationFn: async (data) => {
      return (await axiosInstance.post("/carts/user", data)).data;
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

export const useCartCheckout = () => {
  return useMutation<
    MutationResponse<Order>,
    CustomAxiosError,
    {
      paymentMethodId: string;
      selectedCartItemIds: string[];
      shippingServiceIds: string[];
    }
  >({
    mutationKey: ["post", "cart-checkout"],
    mutationFn: async (data) => {
      return (await axiosInstance.post("/carts/user/checkout", data)).data;
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

export const useGetUserCartItems = ({
  page,
  limit,
  order,
}: BasePaginationParams) => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<CartItem>,
    CustomAxiosError
  >({
    queryKey: ["cart-items", page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get("/carts/user", {
          params: { page, limit, order },
        })
      ).data;
    },
  });

  return {
    cartItems: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useUpdateCartItemById = ({
  cartItemId,
}: {
  cartItemId?: string;
}) => {
  return useMutation<
    MutationResponse<CartItem>,
    CustomAxiosError,
    { quantity: number }
  >({
    mutationKey: ["patch", "update-cart-item"],
    mutationFn: async (data) => {
      return (await axiosInstance.post(`/cartItems/${cartItemId}`, data)).data;
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

export const useDeleteCartItemById = ({
  cartItemId,
}: {
  cartItemId?: string;
}) => {
  return useMutation<MutationResponse<CartItem>, CustomAxiosError, void>({
    mutationKey: ["delete", "delete-cart-item"],
    mutationFn: async (data) => {
      return (await axiosInstance.post(`/cartItems/${cartItemId}`, data)).data;
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
