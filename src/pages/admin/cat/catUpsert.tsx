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
import SelectOption from "../../../components/ui/SelectOption";
import FileInput from "../../../components/ui/FileInput";

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
    <div className="form-with-image-container">
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
        <SelectOption
          label="Breed"
          options={breeds.map((breed) => ({
            label: breed.name,
            value: breed.id,
          }))}
          optionPlaceHolder="Select Breed"
          {...register("catBreed")}
          errorMessage={errors.catBreed?.message}
        />
        <SelectOption
          label="Gender"
          options={[
            {
              label: "Male",
              value: "MALE",
            },
            {
              label: "Female",
              value: "FEMALE",
            },
          ]}
          optionPlaceHolder="Select Gender"
          {...register("gender")}
          errorMessage={errors.gender?.message}
        />

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
        <SelectOption
          label="Status"
          options={[
            {
              label: "Available",
              value: "AVAILABLE",
            },
            {
              label: "Sold",
              value: "SOLD",
            },
            {
              label: "Addopted",
              value: "ADDOPTED",
            },
          ]}
          optionPlaceHolder="Select Status"
          {...register("gender")}
          errorMessage={errors.gender?.message}
        />

        {/* <div className="file-uploader">
          <label>Image</label>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} {...register("catPictures")} />
            <p>
              Drag 'n' drop your profile picture here, or click to select file
            </p>
          </div>
          {images &&
            images.files.map((file, index) => <p key={index}>{file.name}</p>)}
          <p>{errors.catPictures?.message?.toString()}</p>
        </div> */}
        <FileInput
          label="Cat Pictures"
          onDropFiles={onDrop}
          accept={{
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
          }}
          errorMessage={errors.catPictures?.message}
          placeholder="Upload cat image"
          imageNames={images?.files.map((file) => file.name)}
        />
        <Button type="submit" disabled={isPending || isSubmitting}>
          Submit
        </Button>
      </form>

      <div className="image-list-container flex-col base-gap">
        {images?.previews.map((image, index) => (
          <img key={index} src={image} alt={image} />
        ))}
      </div>
      <DevTool control={control} />
    </div>
  );
};
export default CatUpsert;
