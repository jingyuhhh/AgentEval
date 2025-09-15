// routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Shopping from "./components/Shopping/Shopping";
import ProductDetail from "./components/Shopping/components/ProdcutDetail/ProductDetail";
import CartDetail from "./components/Shopping/components/CartDetail/CartDetail";
import Checkout from "./components/Shopping/components/Checkout/Checkout";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import TaskInfoBanner from "./components/TaskInfoBanner/TaskInfoBanner";
import VideoPlatform from "./components/VideoPlatform/VideoPlatform";
import TaskVideoPlayer from "./components/TaskVideoPlayer/TaskVideoPlayer";
import TaskStartRedirect from "./components/TaskStartRedirect";
import { useLocation } from "react-router-dom";
import { End } from "./components/TaskCompletionModal/components/End/End";
import { PopupProvider } from "./Provider/PopupProvider";

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAgent = searchParams.get("agent") === "true";

  return (
    <div style={{ position: "relative" }}>
      {!isAgent && <TaskInfoBanner />}
      {/* <QuestionMark /> */}
      {children}
    </div>
  );
};

const AppRoutes = () => (
  <PopupProvider interval={25000}>
    <Routes>
      <Route
        path="/task/0"
        element={
          <PageWrapper>
            <End />
          </PageWrapper>
        }
      />
      <Route path="/task/:id" element={<TaskStartRedirect />} />
      <Route
        path="/task/:id/shopping"
        element={
          <PageWrapper>
            <Shopping />
          </PageWrapper>
        }
      />
      <Route
        path="/task/:id/productDetail/:productId"
        element={
          <PageWrapper>
            <ProductDetail />
          </PageWrapper>
        }
      />
      <Route
        path="/task/:id/cart"
        element={
          <PageWrapper>
            <CartDetail />
          </PageWrapper>
        }
      />
      <Route
        path="/task/:id/checkout"
        element={
          <PageWrapper>
            <Checkout />
          </PageWrapper>
        }
      />
      <Route
        path="/task/:id/store"
        element={
          <PageWrapper>
            <SocialMedia />
          </PageWrapper>
        }
      />
      <Route
        path="/task/:id/video"
        element={
          <PageWrapper>
            <VideoPlatform />
          </PageWrapper>
        }
      />
      <Route
        path="/task/:id/taskvideo"
        element={
          <PageWrapper>
            <TaskVideoPlayer />
          </PageWrapper>
        }
      />
      <Route path="*" element={<Navigate to="/task/1" replace />} />
    </Routes>
  </PopupProvider>
);

export default AppRoutes;
