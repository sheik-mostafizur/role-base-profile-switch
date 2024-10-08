import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";
import { GuestHome } from "../pages/guest-home";
import { AuthenticatedHome } from "../pages/authenticated";
import { OwnerHome } from "../pages/owner";
import { AdminHome } from "../pages/admin";
import { role } from "../ROLE";

const guestRoutes = (
  <Route>
    <Route path="/" element={<GuestHome />} />
  </Route>
);
const authenticatedRoutes = (
  <Route>
    <Route path="/" element={<AuthenticatedHome />} />
  </Route>
);
const ownerRoutes = (
  <Route>
    <Route path="/" element={<OwnerHome />} />
  </Route>
);

const adminRoutes = (
  <Route>
    <Route path="/" element={<AdminHome />} />
  </Route>
);

const RootRoutes = () => {
  const { auth } = useContext(AuthContext);

  if (auth.profileMode === role.authenticated) {
    return <Routes>{authenticatedRoutes}</Routes>;
  }
  if (auth.profileMode === role.owner) {
    return <Routes>{ownerRoutes}</Routes>;
  }

  if (auth.profileMode === role.admin) {
    return <Routes>{adminRoutes}</Routes>;
  }

  return <Routes>{guestRoutes}</Routes>;
};

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(<Route path="/*" element={<RootRoutes />} />)
);

export default router;
