import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import { CustomAxiosError, PaginatedResponse } from "../types/Response";
import { User } from "../types/User";

export const useGetUsers = () => {
  const { data, ...rest } = useQuery<PaginatedResponse<User>, CustomAxiosError>(
    {
      queryKey: ["users"],
      queryFn: async () => {
        return (await axiosInstance.get("/users")).data;
      },
    }
  );

  return {
    users: data?.data || [],
    paginationState: data?.paginationState,
    additionalInfo: data?.additionalInfo,
    ...rest,
  };
};
