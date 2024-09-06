import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  createUserSchema,
  CreateUserSchema,
  USER_ROLE_ZOD,
} from "../../../lib/zod/userSchema";
import { useCreateUser, useGetUserById } from "../../../hooks/userHooks";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const UserUpsert = () => {
  const { userId } = useParams();

  const { data, isLoading, isError, error } = useGetUserById({ userId });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const { mutate, isPending } = useCreateUser();

  const onSubmit: SubmitHandler<CreateUserSchema> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (userId && data) {
      reset(data);
    }
  }, [data, reset, userId]);

  if (userId) {
    if (isLoading) {
      return <span>Loading</span>;
    }
    if (isError) {
      return <span>{error.message}</span>;
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="admin-upsert-form flex-col base-gap"
      >
        <TextField
          label="Username"
          {...register("username")}
          placeholder="username"
          errorMessage={errors.username?.message}
        />
        <TextField
          label="Email"
          {...register("email")}
          placeholder="email"
          errorMessage={errors.email?.message}
        />
        <TextField
          type="password"
          label="Password"
          {...register("password")}
          placeholder="password"
          errorMessage={errors.password?.message}
        />
        <div>
          <label htmlFor="role">role</label>
          <select {...register("role")}>
            {USER_ROLE_ZOD.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
          <span>{errors.role?.message}</span>
        </div>
        <div>
          <label htmlFor="isVerified">Verify</label>
          <input type="checkbox" {...register("isVerified")} />
          <span>{errors.isVerified?.message}</span>
        </div>

        <Button type="submit" disabled={isPending || isSubmitting}>
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default UserUpsert;
