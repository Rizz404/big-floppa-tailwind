import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  useGetPaymentMethodById,
  useUpsertPaymentMethod,
} from "../../../hooks/paymentMethodHooks";
import {
  upsertPaymentMethodSchema,
  UpsertPaymentMethodSchema,
} from "../../../lib/zod/paymentMethodSchema";

const PaymentMethodUpsert = () => {
  const { paymentMethodId } = useParams();

  const { data, isLoading, isError, error } = useGetPaymentMethodById({
    paymentMethodId,
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    control,
  } = useForm<UpsertPaymentMethodSchema>({
    resolver: zodResolver(upsertPaymentMethodSchema),
  });
  const { mutate, isPending } = useUpsertPaymentMethod({ paymentMethodId });

  const onSubmit: SubmitHandler<UpsertPaymentMethodSchema> = (data) => {
    mutate(data);
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  if (paymentMethodId) {
    if (isLoading) {
      return <span>Loading</span>;
    }

    if (isError) {
      return <span>{error.message}</span>;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col base-gap">
        <TextField
          label="Name"
          placeholder="name"
          {...register("name")}
          errorMessage={errors.name?.message}
        />
        <TextField
          label="Fee"
          placeholder="fee"
          {...register("paymentFee", { valueAsNumber: true })}
          errorMessage={errors.paymentFee?.message}
        />
        <TextField
          label="Description"
          placeholder="description"
          {...register("description")}
          errorMessage={errors.description?.message}
        />

        <Button type="submit" disabled={isPending || isSubmitting}>
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default PaymentMethodUpsert;
