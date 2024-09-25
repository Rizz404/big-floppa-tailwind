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
import { useLogout } from "../../hooks/authHooks";

const UserProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState<{
    file?: File;
    preview: string;
  } | null>(null);
  const { user } = useAuth();
  const { mutate, isPending } = useUpdateUserProfile();
  const { mutate: logout, isPending: isPendingLogout } = useLogout();

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
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2">
        {user?.profile && user?.profile.profilePicture ? (
          <img
            src={user?.profile.profilePicture as string}
            alt="profile picture"
          />
        ) : (
          <img
            src="https://i.pinimg.com/236x/3c/e7/57/3ce757e67dce98bac2c3320c3f979ccc.jpg"
            alt="hehe"
          />
        )}
        <div className="flex flex-col gap-4">
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
        </div>
      </form>
      <Button type="button" onClick={() => logout()} disabled={isPendingLogout}>
        Logout
      </Button>
    </div>
  );
};
export default UserProfilePage;
