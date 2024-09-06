import { Link, useNavigate } from "react-router-dom";
import { useGetPaymentMethods } from "../../../hooks/paymentMethodHooks";

const PaymentMethodIndex = () => {
  const navigate = useNavigate();
  const { paymentMethods, isLoading, isError, error } = useGetPaymentMethods();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="admin-panel-header flex-between">
        <h2 className="font-heading">PaymentMethods Management</h2>
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
        Add new paymentMethod
      </button>
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr className="table-row-header">
              <th className="table-header-cell">No</th>
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Fee</th>
              <th className="table-header-cell">Description</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {paymentMethods.map((paymentMethod, index) => (
              <tr
                key={paymentMethod.id}
                className="table-row"
                onClick={() => navigate(`upsert/${paymentMethod.id}`)}
              >
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{paymentMethod.name}</td>
                <td className="table-cell">{paymentMethod.paymentFee}</td>
                <td className="table-cell">{paymentMethod.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default PaymentMethodIndex;
