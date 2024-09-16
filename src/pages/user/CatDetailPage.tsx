import { useNavigate, useParams } from "react-router-dom";
import { useGetCatById } from "../../hooks/catHooks";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import { useState } from "react";
import useBuyCat from "../../hooks/useBuyCat";

const CatDetailPage = () => {
  const [quantity, setQuantity] = useState(0);
  const { catId } = useParams();
  const { setCatSelected } = useBuyCat();
  const navigate = useNavigate();

  const { data: cat, isLoading, isError, error } = useGetCatById({ catId });

  const handleBuyNow = () => {
    if (cat) {
      setCatSelected({ amount: quantity, cat });
    }
    setQuantity(0);
    navigate("/buy-now");
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <section className="cat-detail-section">
      {cat && (
        <>
          <div className="cat-detail-picture">
            <img src={cat.catPictures && cat.catPictures[0].url} alt="" />
            <div className="cat-picture-preview"></div>
          </div>
          <div className="cat-detail-info">
            <h3 className="">{cat.name || "Kucing Tanpa Nama"}</h3>
            <p className="">{cat.catBreed.name}</p>
            <div className="">
              <span className="">${cat.price.toFixed(2)}</span>
              <span className="">{cat.age} tahun</span>
              <p>{cat.description}</p>
            </div>
          </div>
          <div className="cat-detail-action">
            <div className="cat-detail-action-card">
              <div className="flex-between base-gap">
                <TextField
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(+e.target.value)}
                />
                stock available {cat.quantity}
              </div>
              <p>Subtotal: {quantity * cat.price}</p>
              <div className="flex-col base-gap">
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
