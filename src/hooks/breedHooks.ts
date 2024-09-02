import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import {
  CustomAxiosError,
  MutationResponse,
  PaginatedResponse,
} from "../types/Response";
import { Breed } from "../types/Breed";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UpsertBreedSchema } from "../lib/zod/breedSchema";

export const useUpsertBreed = ({ breedId }: { breedId?: string }) => {
  const navigate = useNavigate();

  return useMutation<
    MutationResponse<Breed>,
    CustomAxiosError,
    UpsertBreedSchema
  >({
    mutationKey: ["create", "cat-breed"],
    mutationFn: async (data) => {
      if (breedId) {
        return (await axiosInstance.patch(`/cat-breeds/${breedId}`, data)).data;
      }
      return (await axiosInstance.post("/cat-breeds", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/admin/cat-breeds");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
    },
  });
};

export const useGetBreeds = () => {
  const { data, ...rest } = useQuery<
    PaginatedResponse<Breed>,
    CustomAxiosError
  >({
    queryKey: ["cat-breeds"],
    queryFn: async () => {
      return (await axiosInstance.get("/cat-breeds")).data;
    },
  });

  return {
    breeds: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};

export const useGetBreedById = ({ breedId }: { breedId: string }) => {
  return useQuery<Breed, CustomAxiosError>({
    queryKey: ["breed", breedId],
    queryFn: async () => {
      return (await axiosInstance.get(`/breeds/${breedId}`)).data;
    },
  });
};
