import { Link, useNavigate } from "react-router-dom";
import { useGetUsers } from "../../../hooks/userHooks";
import { Profile, User } from "../../../types/User";
import Button from "../../../components/ui/Button";

const UsersIndex = () => {
  const navigate = useNavigate();
  const { users, isLoading, isError, error } = useGetUsers();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const excludedFields: (keyof User)[] = [
    "id",
    "oauthId",
    "password",
    "profile",
  ];
  const allKeysUser: (keyof Omit<
    User,
    "id" | "oauthId" | "password" | "profile"
  >)[] = [
    ...new Set(
      users.flatMap(
        (user) =>
          Object.keys(user) as (keyof Omit<
            User,
            "id" | "oauthId" | "password" | "profile"
          >)[]
      )
    ),
  ].filter((key) => !excludedFields.includes(key));

  const formatValue = (
    key: keyof User,
    value: string | boolean | Date | Profile | null
  ) => {
    if (key === "createdAt" || key === "updatedAt") {
      return new Date(value as Date).toLocaleString();
    }

    if (typeof value === "boolean") {
      return value === true ? "yes" : "no";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return value || "";
  };

  return (
    <>
      <div className="admin-panel-header flex-between">
        <h2 className="font-heading">Users Management</h2>
        <div className="breadcrumb">
          <Link to="home">home</Link> / <Link to="user">user</Link>
        </div>
      </div>
      <Button type="button" onClick={() => navigate("upsert")}>
        Add new user
      </Button>
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr className="table-row-header">
              <th className="table-header-cell">No</th>
              {allKeysUser.map((key, index) => (
                <th className="table-header-cell" key={index}>
                  {key}
                </th>
              ))}
              <th className="table-header-cell">Profile picture</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="table-row"
                onClick={() => navigate(`upsert/${user.id}`)}
              >
                <td className="table-cell">{index + 1}</td>
                {allKeysUser.map((key) => (
                  <td key={key} className="table-cell">
                    {formatValue(key, user[key])}
                  </td>
                ))}
                <td className="table-cell">
                  {user.profile.profilePicture ? (
                    <img
                      src={user.profile.profilePicture}
                      alt="user photo"
                      className="table-cell-image"
                    />
                  ) : (
                    <img
                      src="https://i.pinimg.com/236x/36/73/b2/3673b220d40793ab3bdb0114aca65803.jpg"
                      alt="user photo"
                      className="table-cell-image"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default UsersIndex;
