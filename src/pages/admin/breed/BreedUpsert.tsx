import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetBreedById, useUpsertBreed } from "../../../hooks/breedHooks";
import {
  upsertBreedSchema,
  UpsertBreedSchema,
} from "../../../lib/zod/breedSchema";
import FileInput from "../../../components/ui/FileInput";

const BreedUpsert = () => {
  const { breedId } = useParams();
  const [image, setImage] = useState<{ file?: File; preview: string } | null>(
    null
  );

  const { data, isLoading, isError, error } = useGetBreedById({ breedId });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
    control,
  } = useForm<UpsertBreedSchema>({
    resolver: zodResolver(upsertBreedSchema),
  });
  const { mutate, isPending } = useUpsertBreed({ breedId });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage((prev) => ({ ...prev, file, preview: URL.createObjectURL(file) }));
    setValue("image", file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<UpsertBreedSchema> = (data) => {
    mutate(data);
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      reset({ name: data.name, description: data.description });

      if (data.image) {
        setImage((prev) => ({ ...prev, preview: data.image as string }));
      }
    }
  }, [data, reset]);

  if (breedId) {
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
          label="Description"
          placeholder="description"
          {...register("description")}
          errorMessage={errors.description?.message}
        />

        <FileInput
          label="Image"
          onDropFiles={onDrop}
          accept={{
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
          }}
          errorMessage={errors.image?.message}
        />

        {image ? (
          <img src={image.preview} alt={image?.file?.name} />
        ) : (
          <span>Image not available</span>
        )}

        <Button type="submit" disabled={isPending || isSubmitting}>
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default BreedUpsert;
