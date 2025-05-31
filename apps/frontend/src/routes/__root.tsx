import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const RootComponent = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <Outlet />
      {process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools />}
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
