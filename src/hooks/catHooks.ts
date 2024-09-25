import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { Cat, CatPicture } from "../types/Cat";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BuyCatNow, UpsertCatSchema } from "../lib/zod/catSchema";
import { BasePaginationParams } from "../types/Query";

export const useUpsertCat = ({ catId }: { catId?: string }) => {
  const navigate = useNavigate();

  return useMutation<MutationResponse<Cat>, CustomAxiosError, UpsertCatSchema>({
    mutationKey: ["post", "cat"],
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

export const useAddCatPicturesById = ({ catId }: { catId?: string }) => {
  const navigate = useNavigate();

  return useMutation<
    MutationResponse<CatPicture>,
    CustomAxiosError,
    { files: File[] }
  >({
    mutationKey: ["post", "cat-pictures", catId],
    mutationFn: async (data) => {
      return (await axiosInstance.post(`/cats/pictures/${catId}`, data)).data;
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

export const useBuyCatById = ({ catId }: { catId?: string }) => {
  const navigate = useNavigate();

  return useMutation<MutationResponse<Cat>, CustomAxiosError, BuyCatNow>({
    mutationKey: ["post", "buy"],
    mutationFn: async (data) => {
      return (await axiosInstance.post(`/cats/buy/${catId}`, data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useGetCats = ({ page, limit, order }: BasePaginationParams) => {
  const { data, ...rest } = useQuery<PaginatedResponse<Cat>, CustomAxiosError>({
    queryKey: ["cats", page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get("/cats", { params: { page, limit, order } })
      ).data;
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

export const useDeleteCatById = ({ catId }: { catId: string }) => {
  const navigate = useNavigate();

  return useMutation<MutationResponse<Cat>, CustomAxiosError, void>({
    mutationKey: ["delete", "cat", catId],
    mutationFn: async () => {
      return (await axiosInstance.delete(`/cats/${catId}`)).data;
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

export const useDeleteCatPicturesById = ({ catId }: { catId?: string }) => {
  const navigate = useNavigate();

  return useMutation<
    MutationResponse<CatPicture>,
    CustomAxiosError,
    { catPictureIds: string[] }
  >({
    mutationKey: ["delete", "cat-pictures", catId],
    mutationFn: async (data) => {
      return (await axiosInstance.post(`/cats/pictures/${catId}`, data)).data;
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
