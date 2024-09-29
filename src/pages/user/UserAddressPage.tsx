import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateUserAddress,
  useGetUserAddressesByUser,
  useUpdateUserAddress,
} from "../../hooks/userAddressHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserAddressSchema,
  userAddressSchema,
} from "../../lib/zod/userAddressSchema";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { useState } from "react";

const UserAddressPage = () => {
  const { mutate, isPending } = useCreateUserAddress();
  const { userAddresses, isLoading, isError, error } =
    useGetUserAddressesByUser({});
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<UserAddressSchema>({
    resolver: zodResolver(userAddressSchema),
  });

  const onSubmit: SubmitHandler<UserAddressSchema> = (data) => {
    mutate(data);
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <section className="">
      <Button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        Add Address
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4"
        >
          <TextField
            placeholder="input your country"
            label="Country"
            {...register("country")}
            errorMessage={errors.country?.message}
          />
          <TextField
            placeholder="input your province"
            label="Province"
            {...register("province")}
            errorMessage={errors.province?.message}
          />
          <TextField
            placeholder="input your city"
            label="City"
            {...register("city")}
            errorMessage={errors.city?.message}
          />
          <TextField
            placeholder="input your district"
            label="District"
            {...register("district")}
            errorMessage={errors.district?.message}
          />
          <TextField
            placeholder="input your village"
            label="Village"
            {...register("village", { valueAsNumber: true })}
            errorMessage={errors.village?.message}
          />
          <TextField
            placeholder="input your full addresss"
            label="Full Address"
            {...register("fullAddress")}
            errorMessage={errors.fullAddress?.message}
          />
          <Button type="submit" disabled={isSubmitting || isPending}>
            Submit
          </Button>
        </form>{" "}
      </Modal>

      <div>
        {userAddresses.map((userAddress) => (
          <div key={userAddress.id} className="user-address-list-item">
            <span>Rumah {userAddress.isPrimaryAddress ? "Utama" : ""}</span>
            <p>{userAddress.city}</p>
            <p>{userAddress.fullAddress}</p>
            <div>
              <Button type="button">Share</Button>
              <Button type="button">Ubah Alamat</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default UserAddressPage;
