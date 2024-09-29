import { Navigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import useBuyCat from "../../hooks/useBuyCat";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuyCatNow, buyCatNow } from "../../lib/zod/catSchema";
import { useBuyCatById } from "../../hooks/catHooks";
import SelectOption from "../../components/ui/SelectOption";
import { useGetPaymentMethods } from "../../hooks/paymentMethodHooks";
import { useGetShippingServices } from "../../hooks/shippingServiceHooks";

const BuyNowPage = () => {
  const { catSelected } = useBuyCat();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<BuyCatNow>({
    resolver: zodResolver(buyCatNow),
    defaultValues: { amount: catSelected?.amount },
  });

  const { mutate, isPending } = useBuyCatById({ catId: catSelected?.cat.id });
  const { shippingServices } = useGetShippingServices();
  const { paymentMethods } = useGetPaymentMethods();

  const onSubmit: SubmitHandler<BuyCatNow> = (data) => {
    mutate(data);
  };

  return catSelected ? (
    <section className="buy-now-section">
      <form onSubmit={handleSubmit(onSubmit)} className="buy-now-form">
        <div className="left-container">
          <h4>Cat Selected</h4>
          <div className="cat-selected-container base-gap flex-col">
            <p>Cat Owner: {catSelected.cat.user.username}</p>
            <div className="cat-selected">
              {catSelected.cat.catPictures && (
                <img
                  src={catSelected.cat.catPictures[0].url}
                  alt={catSelected.cat.catPictures[0].url}
                />
              )}
              <div>
                <p>{catSelected.cat.catBreed.name}</p>
                <p>{catSelected.cat.name}</p>
                <span>Rp {catSelected.cat.price}</span>
                <div className="flex-between base-gap">
                  <TextField
                    label="Amount"
                    type="number"
                    {...register("amount", { valueAsNumber: true })}
                    errorMessage={errors.amount?.message}
                  />
                  <SelectOption
                    label="Shipping Service"
                    optionPlaceHolder="Select Shipping Service"
                    options={shippingServices.map((shippingService) => ({
                      label: shippingService.name,
                      value: shippingService.id,
                    }))}
                    {...register("shippingServiceId")}
                    errorMessage={errors.shippingServiceId?.message}
                  />
                </div>
              </div>
            </div>
          </div>
          <SelectOption
            label="Payment Method"
            optionPlaceHolder="Select Payment Method"
            options={paymentMethods.map((paymentMethod) => ({
              label: paymentMethod.name,
              value: paymentMethod.id,
            }))}
            {...register("paymentMethodId")}
            errorMessage={errors.paymentMethodId?.message}
          />
          <div>
            <h4>Address</h4>
            {}
          </div>
        </div>
        <div className="right-container">
          <div className="transaction-card">
            <div className="promo">Promo</div>
            <div className="shopping-summary">{}</div>
            <div className="transaction-price">
              Total Price {catSelected.cat.price * catSelected.amount}
            </div>
            <p className="total-charge"></p>
            <Button type="submit" disabled={isPending || isSubmitting}>
              Pay
            </Button>
          </div>
        </div>
      </form>
    </section>
  ) : (
    <Navigate to="/" replace />
  );
};
export default BuyNowPage;
