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
import { useEffect, useState } from "react";
import { UserAddress } from "../../types/UserAddress";

const UserAddressPage = () => {
  const { mutate, isPending } = useCreateUserAddress();
  const [address, setAddress] = useState<UserAddress | null>(null);
  const { mutate: updateUserAddress, isPending: isPendingUpdate } =
    useUpdateUserAddress();
  const { userAddresses, isLoading, isError, error } =
    useGetUserAddressesByUser({});
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<UserAddressSchema>({
    resolver: zodResolver(userAddressSchema),
  });

  const onSubmit: SubmitHandler<UserAddressSchema> = (data) => {
    if (address) {
      updateUserAddress({ addressId: address.id, address: data });
      setAddress(null);
    } else {
      mutate(data);
    }
    console.log(data);
    console.log(address);
    setIsOpen(false);
  };

  const handleUpdateAddress = (address: UserAddress) => {
    setAddress(address);
    setIsOpen(true);
  };

  useEffect(() => {
    if (address) {
      setValue("country", address.country);
      setValue("province", address.province);
      setValue("city", address.city);
      setValue("district", address.district);
      setValue("village", address.village);
      setValue("fullAddress", address.fullAddress);
      setValue("isPrimaryAddress", address.isPrimaryAddress);
    }
  }, [address, setValue]);

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
            {...register("village")}
            errorMessage={errors.village?.message}
          />
          <TextField
            placeholder="input your full addresss"
            label="Full Address"
            {...register("fullAddress")}
            errorMessage={errors.fullAddress?.message}
          />
          <div className="self-end">
            <label htmlFor="is-primary-address" className="mr-2">
              Use it as primary address
            </label>
            <input type="checkbox" {...register("isPrimaryAddress")} />
            <span>{errors.isPrimaryAddress?.message}</span>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || isPending || isPendingUpdate}
          >
            Submit
          </Button>
        </form>
      </Modal>

      <div>
        {userAddresses.map((userAddress) => (
          <div key={userAddress.id} className="mt-4 rounded border px-4 py-2">
            <p className="text-sm">
              Rumah {""}
              {userAddress.isPrimaryAddress && (
                <span className="rounded border bg-slate-200 p-1">Utama</span>
              )}
            </p>
            <p className="text-sm">{userAddress.city}</p>
            <p className="text-sm font-semibold">{userAddress.fullAddress}</p>
            <div className="mt-2 flex items-center gap-2">
              <Button type="button" size="sm">
                Share
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => handleUpdateAddress(userAddress)}
              >
                Ubah Alamat
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default UserAddressPage;
