import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  useGetShippingServiceById,
  useUpsertShippingService,
} from "../../../hooks/shippingServiceHooks";
import {
  upsertShippingServiceSchema,
  UpsertShippingServiceSchema,
} from "../../../lib/zod/shippingServiceSchema";

const ShippingServiceUpsert = () => {
  const { shippingServiceId } = useParams();

  const { data, isLoading, isError, error } = useGetShippingServiceById({
    shippingServiceId,
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    control,
  } = useForm<UpsertShippingServiceSchema>({
    resolver: zodResolver(upsertShippingServiceSchema),
  });
  const { mutate, isPending } = useUpsertShippingService({ shippingServiceId });

  const onSubmit: SubmitHandler<UpsertShippingServiceSchema> = (data) => {
    mutate(data);
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  if (shippingServiceId) {
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
          {...register("fee", { valueAsNumber: true })}
          errorMessage={errors.fee?.message}
        />
        <TextField
          label="Estimation Time"
          placeholder="estimationTime"
          {...register("estimationTime")}
          errorMessage={errors.estimationTime?.message}
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
export default ShippingServiceUpsert;
