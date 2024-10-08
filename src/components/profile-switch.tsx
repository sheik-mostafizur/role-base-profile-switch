import { useContext } from "react";
import { AuthContext } from "../context";
import { role } from "../ROLE";

export const ProfileSwitch = () => {
  const { auth, handleProfileMode } = useContext(AuthContext);

  return (
    <>
      <h1>Welcome! now you are a {auth.profileMode} mode.</h1>
      <div>
        <button onClick={() => handleProfileMode(role.guest)}>Guest</button>
        <button onClick={() => handleProfileMode(role.authenticated)}>
          Authenticated
        </button>
        <button onClick={() => handleProfileMode(role.owner)}>OWNER</button>
        <button onClick={() => handleProfileMode(role.admin)}>ADMIN</button>
      </div>
    </>
  );
};
