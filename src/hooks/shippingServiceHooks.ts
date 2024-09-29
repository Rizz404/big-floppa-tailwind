import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { ShippingService } from "../types/ShippingService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UpsertShippingServiceSchema } from "../lib/zod/shippingServiceSchema";
import { BasePaginationParams } from "../types/Query";

export const useUpsertShippingService = ({
  shippingServiceId,
}: {
  shippingServiceId?: string;
}) => {
  const navigate = useNavigate();

  return useMutation<
    MutationResponse<ShippingService>,
    CustomAxiosError,
    UpsertShippingServiceSchema
  >({
    mutationKey: ["create", "shipping-service"],
    mutationFn: async (data) => {
      if (shippingServiceId) {
        return (
          await axiosInstance.patch(
            `/shipping-services/${shippingServiceId}`,
            data,
          )
        ).data;
      }
      return (await axiosInstance.post("/shipping-services", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/admin/shipping-services");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useGetShippingServices = ({
  page,
  limit,
  order,
}: BasePaginationParams) => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<ShippingService>,
    CustomAxiosError
  >({
    queryKey: ["shipping-services", page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get("/shipping-services", {
          params: { page, limit, order },
        })
      ).data;
    },
  });

  return {
    shippingServices: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetShippingServiceById = ({
  shippingServiceId,
}: {
  shippingServiceId?: string;
}) => {
  return useQuery<ShippingService, CustomAxiosError>({
    queryKey: ["shippingService", shippingServiceId],
    queryFn: async () => {
      return (
        await axiosInstance.get(`/shipping-services/${shippingServiceId}`)
      ).data;
    },
    enabled: !!shippingServiceId,
  });
};

export const useDeleteOrderById = ({
  shippingServiceId,
}: {
  shippingServiceId?: string;
}) => {
  return useMutation<MutationResponse<ShippingService>, CustomAxiosError, void>(
    {
      mutationKey: ["delete", "shipping-service", shippingServiceId],
      mutationFn: async () => {
        return (
          await axiosInstance.delete(`/shipping-services/${shippingServiceId}`)
        ).data;
      },
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.response?.data.message);
        console.log(error.response?.data.message);
      },
    },
  );
};
