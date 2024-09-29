import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { Transaction } from "../types/Transaction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UpsertTransactionSchema } from "../lib/zod/transactionSchema";
import { BasePaginationParams } from "../types/Query";

export const useUpsertTransaction = ({
  transactionId,
}: {
  transactionId?: string;
}) => {
  const navigate = useNavigate();

  return useMutation<
    MutationResponse<Transaction>,
    CustomAxiosError,
    UpsertTransactionSchema
  >({
    mutationKey: ["create", "payment-method"],
    mutationFn: async (data) => {
      if (transactionId) {
        return (
          await axiosInstance.patch(`/transactions/${transactionId}`, data)
        ).data;
      }
      return (await axiosInstance.post("/transactions", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/admin/transactions");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useGetTransactions = ({
  page,
  limit,
  order,
}: BasePaginationParams) => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<Transaction>,
    CustomAxiosError
  >({
    queryKey: ["transactions", page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get("/transactions", {
          params: { page, limit, order },
        })
      ).data;
    },
  });

  return {
    transactions: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetTransactionById = ({
  transactionId,
}: {
  transactionId?: string;
}) => {
  return useQuery<Transaction, CustomAxiosError>({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      return (await axiosInstance.get(`/transactions/${transactionId}`)).data;
    },
    enabled: !!transactionId,
  });
};

export const useDeleteTransactionById = ({
  transactionId,
}: {
  transactionId?: string;
}) => {
  return useMutation<MutationResponse<Transaction>, CustomAxiosError, void>({
    mutationKey: ["delete", "transaction", transactionId],
    mutationFn: async () => {
      return (await axiosInstance.delete(`/transactions/${transactionId}`))
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
