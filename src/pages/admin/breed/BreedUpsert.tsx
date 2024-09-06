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
import { useDropzone } from "react-dropzone";

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });

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

        <div className="profile-pict-upload-container">
          <label>Image</label>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} {...register("image")} />
            <p>
              Drag 'n' drop your profile picture here, or click to select file
            </p>
          </div>
          {image && <p>{image?.file?.name}</p>}
          <p>{errors.image?.message?.toString()}</p>
        </div>

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
