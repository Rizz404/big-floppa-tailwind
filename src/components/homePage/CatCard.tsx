import { BiBookmark, BiCartAdd } from "react-icons/bi";
import { Cat } from "../../types/Cat";
import { useNavigate } from "react-router-dom";

interface CatCardProps {
  cat: Cat;
}

const catStatusStyles = {
  AVAILABLE: "bg-green-500",
  SOLD: "bg-red-500",
  ADOPTED: "bg-yellow-500",
};

const CatCard = ({ cat }: CatCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cat/${cat.id}`)}
      className="flex cursor-pointer flex-col justify-between rounded-md shadow-md transition duration-300 ease-out hover:-translate-y-2"
    >
      <div className="relative">
        {cat.catPictures && (
          <img
            src={
              cat?.catPictures[0]?.url ||
              "https://i.pinimg.com/236x/e6/6e/55/e66e5584f16ed29d34fde4897ab2deb6.jpg"
            }
            alt={cat.name || "Kucing"}
            className="min-h-[244px] w-full rounded-md object-cover"
          />
        )}
        <span
          className={`absolute right-0 top-0 rounded-md ${catStatusStyles[cat.status]} p-1 text-xs font-medium text-white`}
        >
          {cat.status}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium capitalize">
            {cat.name || "Kucing Tanpa Nama"}
          </h3>
          <p className="rounded border border-slate-400 p-1 text-sm hover:border-green-500">
            {cat.catBreed.name}
          </p>
        </div>
        <div className="mt-2 flex flex-col">
          <span className="font-bold">Rp{cat.price.toFixed(2)}</span>
          <span>{cat.age} tahun</span>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 text-2xl">
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
