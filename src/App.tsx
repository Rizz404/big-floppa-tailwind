import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import UsersPage from "./pages/admin/user/UsersPage";
import HomePage from "./pages/user/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import UserCreate from "./pages/admin/user/UserCreate";
import BreedIndex from "./pages/admin/breed/BreedIndex";
import BreedUpsert from "./pages/admin/breed/BreedUpsert";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users">
          <Route index element={<UsersPage />} />
          <Route path="create" element={<UserCreate />} />
        </Route>

        <Route path="breeds">
          <Route index element={<BreedIndex />} />
          <Route path="upsert:breedId" element={<BreedUpsert />} />
        </Route>
      </Route>
    </>
  )
);

export default App;
