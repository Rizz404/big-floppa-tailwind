import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { Cat } from "../types/Cat";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UpsertCatSchema } from "../lib/zod/catSchema";

export const useUpsertCat = ({ catId }: { catId?: string }) => {
  const navigate = useNavigate();

  return useMutation<MutationResponse<Cat>, CustomAxiosError, UpsertCatSchema>({
    mutationKey: ["create", "cat"],
    mutationFn: async (data) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "catPictures" && Array.isArray(value)) {
          value.forEach((file) => {
            if (file instanceof File) {
              formData.append("catPictures", file);
            }
          });
        } else if (value !== undefined && value !== null) {
          formData.append(key, value as string | Blob);
        }
      });

      if (catId) {
        return (await axiosInstance.patch(`/cats/${catId}`, formData)).data;
      }
      return (await axiosInstance.post("/cats", formData)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/admin/cats");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useGetCats = () => {
  const { data, ...rest } = useQuery<PaginatedResponse<Cat>, CustomAxiosError>({
    queryKey: ["cats"],
    queryFn: async () => {
      return (await axiosInstance.get("/cats")).data;
    },
  });

  return {
    cats: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetCatById = ({ catId }: { catId?: string }) => {
  return useQuery<Cat, CustomAxiosError>({
    queryKey: ["cat", catId],
    queryFn: async () => {
      return (await axiosInstance.get(`/cats/${catId}`)).data;
    },
    enabled: !!catId,
  });
};
