import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { Breed, BreedFollower } from "../types/Breed";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UpsertBreedSchema } from "../lib/zod/breedSchema";
import { BasePaginationParams } from "../types/Query";

export const useUpsertBreed = ({ breedId }: { breedId?: string }) => {
  const navigate = useNavigate();

  return useMutation<
    MutationResponse<Breed>,
    CustomAxiosError,
    UpsertBreedSchema
  >({
    mutationKey: ["post", "patch", "cat-breed"],
    mutationFn: async (data) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined || value !== null) {
          formData.append(key, value);
        }
      });

      if (breedId) {
        return (await axiosInstance.patch(`/cat-breeds/${breedId}`, formData))
          .data;
      }
      return (await axiosInstance.post("/cat-breeds", formData)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/admin/breeds", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useGetBreeds = ({ page, limit, order }: BasePaginationParams) => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<Breed>,
    CustomAxiosError
  >({
    queryKey: ["cat-breeds", page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get("/cat-breeds", {
          params: { page, limit, order },
        })
      ).data;
    },
  });

  return {
    breeds: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetBreedById = ({ breedId }: { breedId?: string }) => {
  return useQuery<Breed, CustomAxiosError>({
    queryKey: ["breed", breedId],
    queryFn: async () => {
      return (await axiosInstance.get(`/cat-breeds/${breedId}`)).data;
    },
    enabled: !!breedId,
  });
};

export const useDeleteBreedById = ({ breedId }: { breedId?: string }) => {
  return useMutation<MutationResponse<Breed>, CustomAxiosError, void>({
    mutationKey: ["delete", "cat-breed", breedId],
    mutationFn: async () => {
      return (await axiosInstance.delete(`/cat-breeds/${breedId}`)).data;
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

export const useGetBreedsFollowed = ({
  page,
  limit,
  order,
}: BasePaginationParams) => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<BreedFollower>,
    CustomAxiosError
  >({
    queryKey: ["cat-breeds-followed", page, limit, order],
    queryFn: async () => {
      return (
        await axiosInstance.get("/cat-breeds-followed", {
          params: { page, limit, order },
        })
      ).data;
    },
  });

  return {
    breedsFollowed: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useFollowBreedById = ({ breedId }: { breedId?: string }) => {
  return useMutation<MutationResponse<BreedFollower>, CustomAxiosError, void>({
    mutationKey: ["post", "cat-breed-followed", breedId],
    mutationFn: async () => {
      return (await axiosInstance.delete(`/cat-breeds-followed/${breedId}`))
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

export const useDeleteBreedFollowedById = ({
  breedId,
}: {
  breedId?: string;
}) => {
  return useMutation<MutationResponse<BreedFollower>, CustomAxiosError, void>({
    mutationKey: ["delete", "cat-breed-followed", breedId],
    mutationFn: async () => {
      return (await axiosInstance.delete(`/cat-breeds-followed/${breedId}`))
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
