import { Link, useNavigate } from "react-router-dom";
import { useGetShippingServices } from "../../../hooks/shippingServiceHooks";

const ShippingServiceIndex = () => {
  const navigate = useNavigate();
  const { shippingServices, isLoading, isError, error } =
    useGetShippingServices();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="admin-panel-header flex-between">
        <h2 className="font-heading">ShippingServices Management</h2>
        <div className="breadcrumb">
          <Link to="home">home</Link> /{" "}
          <Link to="payment-methods">payment-methods</Link>
        </div>
      </div>
      <button
        type="button"
        className="button button-primary"
        onClick={() => navigate("upsert")}
      >
        Add new shippingService
      </button>
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr className="table-row-header">
              <th className="table-header-cell">No</th>
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Fee</th>
              <th className="table-header-cell">Estimation Time</th>
              <th className="table-header-cell">Description</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {shippingServices.map((shippingService, index) => (
              <tr
                key={shippingService.id}
                className="table-row"
                onClick={() => navigate(`upsert/${shippingService.id}`)}
              >
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{shippingService.name}</td>
                <td className="table-cell">{shippingService.fee}</td>
                <td className="table-cell">{shippingService.estimationTime}</td>
                <td className="table-cell">{shippingService.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ShippingServiceIndex;
