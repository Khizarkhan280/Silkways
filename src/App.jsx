import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AddBilty from "./pages/dashboard/AddBilty";
import BiltyReport from "./pages/dashboard/BiltyReport";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="add-bilty" element={<AddBilty />} />
          <Route path="bilty-report" element={<BiltyReport />} />
        </Route>
      </Route>
    </Routes>
  );
}