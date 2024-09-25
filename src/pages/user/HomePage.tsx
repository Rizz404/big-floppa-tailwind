import { useGetCats } from "../../hooks/catHooks";
import CatCard from "../../components/homePage/CatCard";
import CatCarousel from "../../components/homePage/CatCarousel";
import PopularBreed from "../../components/homePage/PopularBreed";

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
      <section className="mt-24">
        <CatCarousel />
      </section>
      <section className="mt-12">
        <PopularBreed />
      </section>
      <section className="mt-12 grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-4">
        {cats.map((cat) => (
          <CatCard cat={cat} />
        ))}
      </section>
    </>
  );
};

export default HomePage;
