import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useUpdateUserProfile } from "../../hooks/userHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserProfile, updateUserProfile } from "../../lib/zod/userSchema";
import TextField from "../../components/ui/TextField";
import SelectOption from "../../components/ui/SelectOption";
import Button from "../../components/ui/Button";
import FileInput from "../../components/ui/FileInput";
import { useState } from "react";

const UserProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState<{
    file?: File;
    preview: string;
  } | null>(null);
  const { user } = useAuth();
  const { mutate, isPending } = useUpdateUserProfile();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<UpdateUserProfile>({
    resolver: zodResolver(updateUserProfile),
    ...(user && {
      defaultValues: user
        ? {
            username: user.username,
            email: user.email,
            ...(user.profile && {
              firstname: user.profile.firstname || "",
              lastname: user.profile.lastname || "",
              gender: user.profile.gender || undefined,
              age: user.profile.age ? parseInt(user.profile.age) : undefined,
              phoneNumber: user.profile.phoneNumber || "",
              bio: user.profile.bio || "",
            }),
          }
        : {},
    }),
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setProfilePicture((prev) => ({
      ...prev,
      file,
      preview: URL.createObjectURL(file),
    }));
    setValue("profilePicture", file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<UpdateUserProfile> = (data) => {
    mutate(data);
  };

  return (
    <section className="user-profile-section">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col base-gap">
        <TextField
          placeholder="input your username"
          label="Username"
          {...register("username")}
          errorMessage={errors.username?.message}
        />
        <TextField
          placeholder="input your email"
          label="Email"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <TextField
          placeholder="input your firstname"
          label="First Name"
          {...register("firstname")}
          errorMessage={errors.firstname?.message}
        />
        <TextField
          placeholder="input your lastname"
          label="Last Name"
          {...register("lastname")}
          errorMessage={errors.lastname?.message}
        />
        <SelectOption
          label="Gender"
          optionPlaceHolder="Select your gender"
          options={[
            { label: "MALE", value: "MALE" },
            { label: "FEMALE", value: "FEMALE" },
          ]}
        />
        <TextField
          placeholder="input your age"
          label="Age"
          {...register("age", { valueAsNumber: true })}
          errorMessage={errors.age?.message}
        />
        <TextField
          placeholder="input your phone number"
          label="Phone Number"
          {...register("phoneNumber")}
          errorMessage={errors.phoneNumber?.message}
        />
        <TextField
          placeholder="input your bio"
          label="Bio"
          {...register("bio")}
          errorMessage={errors.bio?.message}
        />
        <FileInput
          label="Image"
          onDropFiles={onDrop}
          accept={{
            "profilePicture/png": [".png"],
            "profilePicture/jpg": [".jpg"],
            "profilePicture/jpeg": [".jpeg"],
          }}
          errorMessage={errors.profilePicture?.message}
        />
        {profilePicture && profilePicture.preview && (
          <img src={profilePicture.preview} alt="profile-picture" />
        )}
        <Button type="submit" disabled={isSubmitting || isPending}>
          Submit
        </Button>
      </form>
    </section>
  );
};
export default UserProfilePage;
