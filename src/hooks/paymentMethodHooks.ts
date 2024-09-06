import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { PaymentMethod } from "../types/PaymentMethod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UpsertPaymentMethodSchema } from "../lib/zod/paymentMethodSchema";

export const useUpsertPaymentMethod = ({
  paymentMethodId,
}: {
  paymentMethodId?: string;
}) => {
  const navigate = useNavigate();

  return useMutation<
    MutationResponse<PaymentMethod>,
    CustomAxiosError,
    UpsertPaymentMethodSchema
  >({
    mutationKey: ["create", "payment-method"],
    mutationFn: async (data) => {
      if (paymentMethodId) {
        return (
          await axiosInstance.patch(`/payment-methods/${paymentMethodId}`, data)
        ).data;
      }
      return (await axiosInstance.post("/payment-methods", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/admin/payment-methods");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useGetPaymentMethods = () => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<PaymentMethod>,
    CustomAxiosError
  >({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      return (await axiosInstance.get("/payment-methods")).data;
    },
  });

  return {
    paymentMethods: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetPaymentMethodById = ({
  paymentMethodId,
}: {
  paymentMethodId?: string;
}) => {
  return useQuery<PaymentMethod, CustomAxiosError>({
    queryKey: ["paymentMethod", paymentMethodId],
    queryFn: async () => {
      return (await axiosInstance.get(`/payment-methods/${paymentMethodId}`))
        .data;
    },
    enabled: !!paymentMethodId,
  });
};
