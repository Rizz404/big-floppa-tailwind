import { BiBookmark, BiCartAdd } from "react-icons/bi";
import { Cat } from "../../types/Cat";
import { useNavigate } from "react-router-dom";

interface CatCardProps {
  cat: Cat;
}

const CatCard = ({ cat }: CatCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="cat-card" onClick={() => navigate(`/cat/${cat.id}`)}>
      <div className="cat-image-container">
        <img
          src={
            cat?.catPictures[0]?.url ||
            "https://i.pinimg.com/236x/e6/6e/55/e66e5584f16ed29d34fde4897ab2deb6.jpg"
          }
          alt={cat.name || "Kucing"}
          className="cat-image"
        />
        <span className={`cat-status ${cat.status.toLowerCase()}`}>
          {cat.status}
        </span>
      </div>
      <div className="cat-info">
        <h3 className="cat-name">{cat.name || "Kucing Tanpa Nama"}</h3>
        <p className="cat-breed">{cat.catBreed.name}</p>
        <div className="cat-details">
          <span className="cat-price">${cat.price.toFixed(2)}</span>
          <span className="cat-age">{cat.age} tahun</span>
        </div>
      </div>
      <div className="cat-interaction">
        <button type="button">
          <BiCartAdd />
        </button>
        <button type="button">
          <BiBookmark />
        </button>
      </div>
    </div>
  );
};
export default CatCard;
