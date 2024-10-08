import { useContext } from "react";
import { ProfileSwitch } from "../components/profile-switch";
import { AuthContext } from "../context";

export const AuthenticatedHome = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <h1>{auth.profileMode} Home</h1>
      <ProfileSwitch />
    </div>
  );
};
