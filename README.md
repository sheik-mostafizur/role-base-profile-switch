# Role-Based Profile Switch Mode

This project demonstrates a role-based profile switch system using React, TypeScript, and React Router. Users are categorized into different roles, and based on their role, they are routed to specific pages. The available roles are:

- **Guest**
- **Authenticated User**
- **Owner**
- **Admin**

The routing logic is dynamically handled by `AuthContext` and the `profileMode` which maps to the user's role.

## Project Structure

```
.
├── App.css
├── App.tsx
├── assets
│   └── react.svg
├── components
│   └── profile-switch.tsx       # Component to handle profile switching
├── context
│   └── index.tsx                # Contains AuthContext for handling user state
├── index.css
├── main.tsx
├── pages                        # Pages corresponding to different roles
│   ├── admin.tsx                # Admin home page
│   ├── authenticated.tsx        # Authenticated user home page
│   ├── guest-home.tsx           # Guest home page
│   └── owner.tsx                # Owner home page
├── ROLE.ts                      # Defines role constants
├── routes
│   └── index.tsx                # Main routing logic based on role
└── vite-env.d.ts
```

### `routes/index.tsx`

This file contains the logic to switch between different routes based on the user’s role, defined in the `AuthContext`. It uses React Router's `Routes` and `Route` components to conditionally render pages based on the `auth.profileMode`.

```typescript
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
```

### Role Definitions in `ROLE.ts`

```typescript
export const role = {
  guest: "guest",
  authenticated: "authenticated",
  owner: "owner",
  admin: "admin",
};
```

## How It Works

- **AuthContext**: Stores the user's authentication state, including the `profileMode` that determines which set of routes to display.
- **Profile Modes**: Based on the value of `profileMode`, different sets of routes are activated:
  - `guest`: Displays the `GuestHome` page.
  - `authenticated`: Displays the `AuthenticatedHome` page.
  - `owner`: Displays the `OwnerHome` page.
  - `admin`: Displays the `AdminHome` page.
- **Dynamic Routing**: The app dynamically switches between routes based on the user's role.

## Getting Started

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the app in the browser at `http://localhost:3000/`.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static typing and better developer experience.
- **React Router**: For routing based on user roles.
- **Vite**: For fast development server and build setup.
