import { useNavigate, useLocation } from "react-router-dom";

export function usePreserveQueryNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  return (to, options = {}) => {
    const search = location.search;
    if (typeof to === "string") {
      navigate(to.includes("?") ? to : `${to}${search}`, options);
    } else if (typeof to === "object") {
      navigate({ ...to, search: to.search || search }, options);
    }
  };
}
