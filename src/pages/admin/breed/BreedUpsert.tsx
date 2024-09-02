import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetBreedById, useUpsertBreed } from "../../../hooks/breedHooks";
import {
  upsertBreedSchema,
  UpsertBreedSchema,
} from "../../../lib/zod/breedSchema";

const BreedUpsert = () => {
  const { breedId } = useParams();

  const { data, isLoading, isError, error } = useGetBreedById({ breedId });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<UpsertBreedSchema>({
    resolver: zodResolver(upsertBreedSchema),
    defaultValues: { image: { preview: data?.image as string }, ...data },
  });
  const { mutate, isPending } = useUpsertBreed({ breedId });

  const onSubmit: SubmitHandler<UpsertBreedSchema> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (breedId) {
      setValue("name", data?.name);
      setValue("description", data?.description);
    }
  }, [breedId, data?.description, data?.name, setValue]);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col base-gap">
      <TextField
        label="Name"
        {...register("name")}
        errorMessage={errors.name?.message}
      />
      <TextField
        label="Email"
        {...register("description")}
        errorMessage={errors.description?.message}
      />

      <Button type="submit" disabled={isPending || isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
export default BreedUpsert;
