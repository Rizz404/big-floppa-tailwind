import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCatById, useUpsertCat } from "../../../hooks/catHooks";
import { upsertCatSchema, UpsertCatSchema } from "../../../lib/zod/catSchema";
import { useGetBreeds } from "../../../hooks/breedHooks";
import { useDropzone } from "react-dropzone";

const CatUpsert = () => {
  const [images, setImages] = useState<{
    files: File[];
    previews: string[];
  } | null>(null);
  const { catId } = useParams();

  const { data, isLoading, isError, error } = useGetCatById({
    catId,
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm<UpsertCatSchema>({
    resolver: zodResolver(upsertCatSchema),
  });
  const { mutate, isPending } = useUpsertCat({ catId });
  const {
    breeds,
    isLoading: isLoadingBreeds,
    isError: isErrorBreeds,
    error: errorBreeds,
  } = useGetBreeds();

  const onDrop = (acceptedFiles: File[]) => {
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));

    setImages({
      files: acceptedFiles,
      previews,
    });

    setValue("catPictures", acceptedFiles, {
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

  const onSubmit: SubmitHandler<UpsertCatSchema> = (data) => {
    mutate(data);
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        catBreed: data.catBreed.id,
        catPictures: data.catPictures as unknown as File[],
      });

      if (data.catPictures) {
        const previews = data.catPictures.map(
          (catPictureObj) => catPictureObj.url
        );
        setImages({
          files: [],
          previews, // Pastikan preview dari gambar yang ada ditampilkan
        });
      }
    }
  }, [data, reset]);

  if (isLoadingBreeds) {
    return <span>Loading</span>;
  }

  if (isErrorBreeds) {
    return <span>{errorBreeds.message}</span>;
  }

  if (catId) {
    if (isLoading) {
      return <span>Loading</span>;
    }

    if (isError) {
      return <span>{error.message}</span>;
    }
  }

  return (
    <div className="cat-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col base-gap">
        <TextField
          label="Name"
          placeholder="name"
          {...register("name")}
          errorMessage={errors.name?.message}
        />
        <TextField
          label="Age"
          placeholder="age"
          {...register("age", { valueAsNumber: true })}
          errorMessage={errors.age?.message}
        />
        <TextField
          label="Description"
          placeholder="description"
          {...register("description")}
          errorMessage={errors.description?.message}
        />
        <div>
          <label htmlFor="breed">Breed</label>
          <select {...register("catBreed")}>
            {breeds.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select {...register("gender")}>
            {["MALE", "FEMALE"].map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <TextField
          label="Price"
          placeholder="price"
          {...register("price", { valueAsNumber: true })}
          errorMessage={errors.price?.message}
        />
        <TextField
          label="Quantity"
          placeholder="quantity"
          {...register("quantity", { valueAsNumber: true })}
          errorMessage={errors.quantity?.message}
        />
        <div>
          <label htmlFor="status">Status</label>
          <select {...register("status")}>
            {["AVAILABLE", "SOLD", "ADOPTED"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="file-uploader">
          <label>Image</label>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} {...register("catPictures")} />
            <p>
              Drag 'n' drop your profile picture here, or click to select file
            </p>
          </div>
          {images &&
            images.files.map((file, index) => (
              <p key={index}>{file.name}</p>
            ))}{" "}
          <p>{errors.catPictures?.message?.toString()}</p>
        </div>

        <Button type="submit" disabled={isPending || isSubmitting}>
          Submit
        </Button>
      </form>

      <div className="list-image-container">
        {images?.previews.map((image, index) => (
          <img key={index} src={image} alt={image} />
        ))}
      </div>
      <DevTool control={control} />
    </div>
  );
};
export default CatUpsert;
