import { useGetCats } from "../../hooks/catHooks";
import CatCard from "../../components/homePage/CatCard";
import CatCarousel from "../../components/homePage/CatCarousel";

const HomePage = () => {
  const { cats, isLoading, isError, error } = useGetCats();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <section className="hero-section">
        <CatCarousel />
      </section>
      <section className="cat-list-section">
        {cats.map((cat) => (
          <CatCard cat={cat} />
        ))}
      </section>
    </>
  );
};

export default HomePage;
