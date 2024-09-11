import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import UserIndex from "./pages/admin/user/UserIndex";
import HomePage from "./pages/user/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import UserUpsert from "./pages/admin/user/UserUpsert";
import BreedIndex from "./pages/admin/breed/BreedIndex";
import BreedUpsert from "./pages/admin/breed/BreedUpsert";
import PaymentMethodIndex from "./pages/admin/paymentMethod/PaymentMethodIndex";
import PaymentMethodUpsert from "./pages/admin/paymentMethod/PaymentMethodUpsert";
import ShippingServiceIndex from "./pages/admin/shippingService/ShippingServiceIndex";
import ShippingServiceUpsert from "./pages/admin/shippingService/ShippingServiceUpsert";
import CatIndex from "./pages/admin/cat/catIndex";
import OrderIndex from "./pages/admin/order/orderIndex";
import TransactionIndex from "./pages/admin/transaction/TransactionIndex";
import CatUpsert from "./pages/admin/cat/catUpsert";
import CatDetailPage from "./pages/user/CatDetailPage";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/cat/:catId" element={<CatDetailPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users">
          <Route index element={<UserIndex />} />
          <Route path="upsert/:userId?" element={<UserUpsert />} />
        </Route>

        <Route path="breeds">
          <Route index element={<BreedIndex />} />
          {/* * Opsional tuh gini */}
          <Route path="upsert/:breedId?" element={<BreedUpsert />} />
        </Route>

        <Route path="payment-methods">
          <Route index element={<PaymentMethodIndex />} />
          <Route
            path="upsert/:paymentMethodId?"
            element={<PaymentMethodUpsert />}
          />
        </Route>

        <Route path="shipping-services">
          <Route index element={<ShippingServiceIndex />} />
          <Route
            path="upsert/:shippingServiceId?"
            element={<ShippingServiceUpsert />}
          />
        </Route>

        <Route path="cats">
          <Route index element={<CatIndex />} />
          <Route path="upsert/:catId?" element={<CatUpsert />} />
        </Route>

        <Route path="orders">
          <Route index element={<OrderIndex />} />
          <Route
            path="upsert/:shippingServiceId?"
            element={<ShippingServiceUpsert />}
          />
        </Route>

        <Route path="transactions">
          <Route index element={<TransactionIndex />} />
          <Route
            path="upsert/:shippingServiceId?"
            element={<ShippingServiceUpsert />}
          />
        </Route>
      </Route>
    </>
  )
);

export default App;
