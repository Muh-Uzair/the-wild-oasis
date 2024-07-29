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
import { Toaster } from "react-hot-toast";
import BookingDetailsPG from "./pages/BookingDetailsPG";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import ProtectedRoute from "./ui/ProtectedRoute";
import DarkModeProvider from "./ui/DarkModeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

// COMPONENT START///////////////////////////////////////////////
export default function App() {
  // JSX//////////////////////////////////////////
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  {" "}
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashboardPG />} />
              <Route path="bookings" element={<BookingsPG />} />
              <Route path="bookings/:id" element={<BookingDetailsPG />} />
              <Route path="checkin/:id" element={<CheckinBooking />} />
              <Route path="cabins" element={<CabinsPG />} />
              <Route path="users" element={<UsersPG />} />
              <Route path="settings" element={<SettingsPG />} />
              <Route path="account" element={<AccountPG />} />
            </Route>
            <Route path="login" element={<LoginPG />} />
            <Route path="*" element={<PageNotFoundPG />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 25px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
