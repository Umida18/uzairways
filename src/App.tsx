import { ConfigProvider } from "antd";
import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { SuperAdmins } from "./pages/superAdminPage/admins";
import { Tickets } from "./pages/adminPage/tickets";
import { Flights } from "./pages/adminPage/flights";
import { useState } from "react";
import { Layout } from "./components/superAdminLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Airplanes } from "./pages/adminPage/airplanes";
import { AdminLayout } from "./components/adminLayout";
import MainLayout from "./pages/homePage/mainPage";
import LoginPage from "./login/login";
import FlightsPage from "./pages/homePage/Tickets/Tickets";
import { FloorProvider } from "./pages/homePage/mainPage/FloorContext";
import { BuyTicket } from "./pages/homePage/buyTicket/buyTicket";
import { FlightsProvider } from "./context/FlightsContext";
import { Users } from "./pages/adminPage/users";
import DashboardPage from "./components/layout/layout";
import { ProfileSettings } from "./components/profileSettings";
import { OrdersHistory } from "./components/ordersHistory";
import About from "./pages/homePage/about/about";
import Question from "./pages/homePage/question/question";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/users" />;
  }
  return children;
};
const cache = createCache({ key: "custom" });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 4 * 60 * 1000,
      cacheTime: 0,
      retry: 0,
    },
  },
});

function App() {
  const [isAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#479fe1",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <CacheProvider value={cache}>
            {/* <Provider store={store}> */}
            <FloorProvider>
              <FlightsProvider>
                <Routes>
                  <Route path="/" element={<MainLayout />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<LoginPage />} />
                  <Route path="/flightsPage" element={<FlightsPage />} />
                  <Route path="/buyTicket" element={<BuyTicket />} />
                  <Route path="/dashboardPage" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfileSettings />} />
                  <Route path="/dashboardPage" element={<OrdersHistory />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/question" element={<Question />} />
                  {/* <Route path="/dashboardPage" element={<DashboardPage />} /> */}

                  <Route
                    path="/superAdmin/"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Layout>
                          <Outlet />
                        </Layout>
                      </ProtectedRoute>
                    }
                  >
                    <Route path="admins" element={<SuperAdmins />} />
                  </Route>
                </Routes>
                <Routes>
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <AdminLayout>
                          <Outlet />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  >
                    {/* <Route path="admins" element={<Admins />} /> */}
                    <Route path="users" element={<Users />} />
                    <Route path="tickets" element={<Tickets />} />
                    <Route path="flights" element={<Flights />} />
                    <Route path="airplanes" element={<Airplanes />} />
                  </Route>
                </Routes>
              </FlightsProvider>
            </FloorProvider>
            {/* </Provider> */}
          </CacheProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
