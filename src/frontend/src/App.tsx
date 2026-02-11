import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import HandymanRegistrationPage from './pages/HandymanRegistrationPage';
import HireHandymanPage from './pages/HireHandymanPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminGuard from './pages/admin/AdminGuard';

const rootRoute = createRootRoute({
  component: () => <Outlet />
});

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: SiteLayout
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: HomePage
});

const registrationRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/register',
  component: HandymanRegistrationPage
});

const hireRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/hire',
  component: HireHandymanPage
});

const servicesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/services',
  component: ServicesPage
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: AboutPage
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/contact',
  component: ContactPage
});

const privacyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/privacy',
  component: PrivacyPolicyPage
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminGuard>
      <AdminDashboardPage />
    </AdminGuard>
  )
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    registrationRoute,
    hireRoute,
    servicesRoute,
    aboutRoute,
    contactRoute,
    privacyRoute
  ]),
  adminRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
