import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPG from "./pages/DashboardPG";
import BookingsPG from "./pages/BookingsPG";
import CabinsPG from "./pages/CabinsPG";
import UsersPG from "./pages/UsersPG";
import SettingsPG from "./pages/SettingsPG";
import AccountPG from "./pages/AccountPG";
import LoginPG from "./pages/LoginPG";
import PageNotFoundPG from "./pages/PageNotFoundPG";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPG />} />
            <Route path="bookings" element={<BookingsPG />} />
            <Route path="cabins" element={<CabinsPG />} />
            <Route path="users" element={<UsersPG />} />
            <Route path="settings" element={<SettingsPG />} />
            <Route path="account" element={<AccountPG />} />
          </Route>
          <Route path="login" element={<LoginPG />} />
          <Route path="*" element={<PageNotFoundPG />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
