import { Link, useNavigate } from "react-router-dom";
import { useGetBreeds } from "../../../hooks/breedHooks";

const BreedIndex = () => {
  const navigate = useNavigate();
  const { breeds, isLoading, isError, error } = useGetBreeds();

  return (
    <>
      <div className="admin-panel-header flex-between">
        <h2 className="font-heading">Breeds Management</h2>
        <div className="breadcrumb">
          <Link to="home">home</Link> / <Link to="user">user</Link>
        </div>
      </div>
      <button
        type="button"
        className="button button-primary"
        onClick={() => navigate("create")}
      >
        Add new breed
      </button>
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr className="table-row-header">
              <th className="table-header-cell">No</th>
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Author</th>
              <th className="table-header-cell">Description</th>
              <th className="table-header-cell">Image</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {breeds.map((breed, index) => (
              <tr
                key={breed.id}
                className="table-row"
                onClick={() => navigate(`upsert/${breed.id}`)}
              >
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{breed.name}</td>
                <td className="table-cell">{breed.author.username}</td>
                <td className="table-cell">{breed.description}</td>
                <td className="table-cell">
                  <img
                    src={breed.image as string}
                    alt="cat-image"
                    className="table-cell-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default BreedIndex;
