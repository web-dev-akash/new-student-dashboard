import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import PropTypes from "prop-types";

export const PrivateRouter = ({ children }) => {
  const mode = useSelector((state) => state.mode);
  if (mode !== "user") {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

PrivateRouter.propTypes = {
  children: PropTypes.element.isRequired,
};
