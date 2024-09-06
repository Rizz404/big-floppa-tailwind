import { Link, useNavigate } from "react-router-dom";
import { useGetOrders } from "../../../hooks/orderHooks";
// import { ORDER_TABLE_HEADERS } from "../../../constants/orderConstant";

const OrderIndex = () => {
  const navigate = useNavigate();
  const { orders, isLoading, isError, error } = useGetOrders();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="admin-panel-header flex-between">
        <h2 className="font-heading">Orders Management</h2>
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
        Add new order
      </button>
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr className="table-row-header">
              <th className="table-header-cell">No</th>
              <th className="table-header-cell">Username</th>
              <th className="table-header-cell">Total Cat Ordered</th>
              <th className="table-header-cell">Total Price</th>
              <th className="table-header-cell">Created At</th>
              <th className="table-header-cell">Updated At</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="table-row"
                onClick={() => navigate(`upsert/${order.id}`)}
              >
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{order.user.username}</td>
                <td className="table-cell">
                  {order.orderItems.reduce((total, cat) => {
                    return total + cat.amount;
                  }, 0)}
                </td>
                <td className="table-cell">{order.transaction.total}</td>
                <td className="table-cell">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="table-cell">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default OrderIndex;
