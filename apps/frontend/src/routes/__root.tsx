import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootComponent = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/form">Form</Link>
        <Link to="/login">Login</Link>
      </div>
      <Outlet />
      {process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools />}
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
