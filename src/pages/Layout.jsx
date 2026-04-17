import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

/**
 * Layout wrapper — renders Navbar + page content via Outlet.
 * Cleaner route architecture using React Router nested routes.
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Toast />
    </div>
  );
}
