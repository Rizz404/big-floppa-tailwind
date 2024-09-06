import { Link, useNavigate } from "react-router-dom";
import { useGetCats } from "../../../hooks/catHooks";
import { CAT_TABLE_HEADERS } from "../../../constants/catConstant";
import Button from "../../../components/ui/Button";

const CatIndex = () => {
  const navigate = useNavigate();
  const { cats, isLoading, isError, error } = useGetCats();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="admin-panel-header flex-between">
        <h2 className="font-heading">Cats Management</h2>
        <div className="breadcrumb">
          <Link to="home">home</Link> /{" "}
          <Link to="payment-methods">payment-methods</Link>
        </div>
      </div>
      <Button type="button" onClick={() => navigate("upsert")}>
        Add new cat
      </Button>
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr className="table-row-header">
              <th className="table-header-cell">No</th>
              {CAT_TABLE_HEADERS.map((key, index) => (
                <th className="table-header-cell" key={index}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {cats.map((cat, index) => (
              <tr
                key={cat.id}
                className="table-row"
                onClick={() => navigate(`upsert/${cat.id}`)}
              >
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{cat.name}</td>
                <td className="table-cell">{cat.age}</td>
                <td className="table-cell">{cat.gender}</td>
                <td className="table-cell">{cat.description}</td>
                <td className="table-cell">{cat.price}</td>
                <td className="table-cell">{cat.quantity}</td>
                <td className="table-cell">{cat.status}</td>
                <td className="table-cell">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="table-cell">
                  {new Date(cat.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CatIndex;
