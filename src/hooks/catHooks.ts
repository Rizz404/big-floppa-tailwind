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
// import { UpsertCatSchema } from "../lib/zod/catSchema";

// export const useUpsertCat = ({ catId }: { catId?: string }) => {
//   const navigate = useNavigate();

//   return useMutation<MutationResponse<Cat>, CustomAxiosError, UpsertCatSchema>({
//     mutationKey: ["create", "cat"],
//     mutationFn: async (data) => {
//       if (catId) {
//         return (await axiosInstance.patch(`/cats/${catId}`, data))
//           .data;
//       }
//       return (await axiosInstance.post("/cats", data)).data;
//     },
//     onSuccess: (response) => {
//       toast.success(response.message);
//       navigate("/admin/cats");
//     },
//     onError: (error) => {
//       toast.error(error.response?.data.message);
//       console.log(error.response?.data.message);
//     },
//   });
// };

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
