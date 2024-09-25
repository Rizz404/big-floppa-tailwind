import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useGetBreeds } from "../../hooks/breedHooks";
import { useState } from "react";

const PopularBreed = () => {
  const [page, setPage] = useState(1);
  const { breeds, isLoading, isError, error, paginationState } = useGetBreeds({
    page,
  });

  // Fungsi untuk berpindah ke halaman sebelumnya
  const handlePrevPage = () => {
    if (paginationState?.hasPrevPage) {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  // Fungsi untuk berpindah ke halaman berikutnya
  const handleNextPage = () => {
    if (paginationState?.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div>
      <h4 className="text-xl font-bold">Popular Breed</h4>
      <div className="group relative mt-2 flex flex-wrap items-center gap-2">
        {breeds.map((breed) => (
          <div
            key={breed.id}
            className="relative size-24 overflow-hidden rounded border border-slate-400"
          >
            <img
              src={breed.image as string}
              alt={breed.name}
              className="h-full w-full object-cover"
            />
            <p className="absolute bottom-0 text-nowrap rounded bg-slate-200 px-1 py-0.5 text-sm font-semibold text-orange-500">
              {breed.name}
            </p>
          </div>
        ))}
        <div className="absolute top-1/2 flex w-full items-center justify-between">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={!paginationState?.hasPrevPage} // Disable jika tidak ada halaman sebelumnya
            className="rounded-full bg-white p-1 opacity-0 transition duration-300 ease-out group-hover:opacity-100 group-hover:disabled:opacity-50"
          >
            <BsArrowLeft />
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={!paginationState?.hasNextPage} // Disable jika tidak ada halaman berikutnya
            className="rounded-full bg-white p-1 opacity-0 transition duration-300 ease-out group-hover:opacity-100 group-hover:disabled:opacity-50"
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopularBreed;
