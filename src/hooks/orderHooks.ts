import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { Order } from "../types/Order";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { UpsertOrderSchema } from "../lib/zod/OrderSchema";

// export const useUpsertOrder = ({
//   orderId,
// }: {
//   orderId?: string;
// }) => {
//   const navigate = useNavigate();

//   return useMutation<
//     MutationResponse<Order>,
//     CustomAxiosError,
//     UpsertOrderSchema
//   >({
//     mutationKey: ["create", "order"],
//     mutationFn: async (data) => {
//       if (orderId) {
//         return (
//           await axiosInstance.patch(`/orders/${orderId}`, data)
//         ).data;
//       }
//       return (await axiosInstance.post("/orders", data)).data;
//     },
//     onSuccess: (response) => {
//       toast.success(response.message);
//       navigate("/admin/orders");
//     },
//     onError: (error) => {
//       toast.error(error.response?.data.message);
//       console.log(error.response?.data.message);
//     },
//   });
// };

export const useGetOrders = () => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<Order>,
    CustomAxiosError
  >({
    queryKey: ["orders"],
    queryFn: async () => {
      return (await axiosInstance.get("/orders")).data;
    },
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
