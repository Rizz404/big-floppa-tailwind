import { Link, useNavigate } from "react-router-dom";
import { useGetTransactions } from "../../../hooks/transactionHooks";

const TransactionIndex = () => {
  const navigate = useNavigate();
  const { transactions, isLoading, isError, error } = useGetTransactions();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="admin-panel-header flex-between">
        <h2 className="font-heading">Transactions Management</h2>
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
        Add new transaction
      </button>
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr className="table-row-header">
              <th className="table-header-cell">No</th>
              <th className="table-header-cell">Admin Fee</th>
              <th className="table-header-cell">Shipping Service Fee</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Subtotal</th>
              <th className="table-header-cell">Total</th>
              <th className="table-header-cell">Transaction Date</th>
              <th className="table-header-cell">Buyer</th>
              <th className="table-header-cell">Seller</th>
              <th className="table-header-cell">Payment Method</th>
              <th className="table-header-cell">Created At</th>
              <th className="table-header-cell">Updated At</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="table-row"
                onClick={() => navigate(`upsert/${transaction.id}`)}
              >
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{transaction.adminFee}</td>
                <td className="table-cell">{transaction.shippingServiceFee}</td>
                <td className="table-cell">{transaction.status}</td>
                <td className="table-cell">{transaction.subTotal}</td>
                <td className="table-cell">{transaction.total}</td>
                <td className="table-cell">
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </td>
                <td className="table-cell">
                  {transaction.buyer
                    ? transaction.buyer.username
                    : "Under development"}
                </td>
                <td className="table-cell">
                  {transaction.seller
                    ? transaction.seller.username
                    : "Under development"}
                </td>
                <td className="table-cell">{transaction.paymentMethod.name}</td>
                <td className="table-cell">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
                <td className="table-cell">
                  {new Date(transaction.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TransactionIndex;
