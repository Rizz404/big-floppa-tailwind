import { useNavigate, useParams } from "react-router-dom";
import { useBuyCatById, useGetCatById } from "../../hooks/catHooks";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import { useState } from "react";
import useBuyCat from "../../hooks/useBuyCat";
import { Cat } from "../../types/Cat";

const CatDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { catId } = useParams();
  const { setCatSelected } = useBuyCat();
  const navigate = useNavigate();

  const { data: cat, isLoading, isError, error } = useGetCatById({ catId });
  const {} = useBuyCatById({ catId });

  const handleBuyNow = () => {
    if (cat) {
      setCatSelected({ amount: quantity, cat });
    }
    setQuantity(0);
    navigate("/buy-now");
  };

  const renderDetails = (cat: Cat) => {
    const labelAndValues = [
      { label: "Umur", value: cat.age },
      { label: "Gender", value: cat.gender },
    ];

    return labelAndValues.map(({ label, value }, index) => (
      <p key={index} className="">
        {label}: <span className="font-semibold">{value}</span>
      </p>
    ));
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <section className="grid grid-cols-3 gap-4">
      {cat && (
        <>
          <div className="">
            <img
              src={cat.catPictures && cat.catPictures[selectedImage].url}
              alt="cat pictures"
              className="max-h-[400px] w-full rounded object-center"
            />
            <div className="mt-2 flex w-full flex-wrap items-center gap-2">
              {cat.catPictures?.map((catPicture, index) => (
                <img
                  src={catPicture.url}
                  alt={catPicture.filename}
                  className={`size-16 cursor-pointer rounded object-center ${selectedImage === index ? "border-2 border-orange-500" : ""}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-bold">
                {cat.name || "Kucing Tanpa Nama"}
              </h3>
              <Button type="button" size="sm" className="mt-1">
                {cat.catBreed.name}
              </Button>
              <p className="mt-4 text-3xl">Rp{cat.price.toFixed(2)}</p>
            </div>
            <div className="">
              <div className="flex items-center gap-8 border-y px-4 py-2">
                {["Details", "Additional Information"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`relative text-orange-500 after:absolute after:-bottom-[2px] after:left-1/2 after:h-[2px] after:w-[120%] after:origin-center after:-translate-x-1/2 after:scale-x-0 after:bg-orange-500 after:transition-transform after:duration-300 hover:after:scale-x-100`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                {renderDetails(cat)}
                <p className="mt-2">{cat.description}</p>
              </div>
            </div>
            <div className="flex items-start justify-between border-y px-4 py-2">
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pinimg.com/736x/a5/7c/4d/a57c4da3ebe79f2a4692d8b79443a82c.jpg"
                  alt="hehe"
                  className="size-12 rounded-full object-center"
                />
                <div>
                  <p>{cat.user.username}</p>
                  <p>4.8 (2,5 rb)</p>
                  <p>± 48 menit pesanan diproses</p>
                </div>
              </div>
              <Button type="button">Follow</Button>
            </div>
          </div>
          <div className="rounded border border-orange-500 p-8">
            <div>
              <div className="rounded border p-4">
                <p className="font-bold">Atur jumlah dan catatan</p>
                <div className="flex items-center gap-2">
                  <TextField
                    type="number"
                    className="mt-2 w-1/2"
                    value={quantity}
                    onChange={(e) => setQuantity(+e.target.value)}
                  />
                  <p className="">
                    Stock available: <span>{cat.quantity}</span>
                  </p>
                </div>
                <p className="mt-2">
                  Max order: <span>{Math.floor(cat.quantity / 2)}</span>
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p>Subtotal</p>
                <p className="text-xl font-semibold">
                  Rp{quantity * cat.price}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-end gap-2">
                <Button type="button">Add to cart</Button>
                <Button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={quantity <= 0}
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CatDetailPage;
