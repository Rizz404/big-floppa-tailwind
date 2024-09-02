import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createUserSchema,
  CreateUserSchema,
  USER_ROLE_ZOD,
} from "../../../lib/zod/userSchema";
import { useCreateUser } from "../../../hooks/userHooks";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";

const UserCreate = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });
  const { mutate, isPending } = useCreateUser();

  const onSubmit: SubmitHandler<CreateUserSchema> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col base-gap">
      <TextField
        label="Username"
        {...register("username")}
        errorMessage={errors.username?.message}
      />
      <TextField
        label="Email"
        {...register("email")}
        errorMessage={errors.email?.message}
      />
      <TextField
        label="Password"
        {...register("password")}
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
  );
};
export default UserCreate;
