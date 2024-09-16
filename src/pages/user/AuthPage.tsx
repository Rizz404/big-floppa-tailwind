import { useState } from "react";
import { useLogin, useRegister } from "../../hooks/authHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginSchema,
  loginSchema,
  RegisterSchema,
  registerSchema,
} from "../../lib/zod/authSchema";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { mutate: mutateRegister } = useRegister();
  const { mutate: mutateLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    if (isLogin) {
      mutateLogin(data as LoginSchema);
    } else {
      mutateRegister(data);
    }
  };

  return (
    <section className="auth-section">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col base-gap">
        <div className={`username-field ${isLogin ? "hidden" : "visible"}`}>
          <TextField
            {...register("username")}
            label="Username"
            placeholder="Masukkan username"
            errorMessage={errors.username?.message}
          />
        </div>
        <TextField
          {...register("email")}
          label="Email"
          placeholder="Masukkan email"
          errorMessage={errors.email?.message}
        />
        <TextField
          type="password"
          {...register("password")}
          label="Password"
          placeholder="Masukkan password"
          errorMessage={errors.password?.message}
        />
        <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
        <span>
          {isLogin ? "Already have an account? " : "Don't have an account? "}
          <Button
            type="button"
            size="sm"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </span>
      </form>
    </section>
  );
};

export default AuthPage;
