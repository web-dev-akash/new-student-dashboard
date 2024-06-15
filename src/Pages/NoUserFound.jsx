import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setMode } from "../Redux/action";

export const NoUserFound = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMode(""));
  }, []);
  return (
    <div
      className="email-not-found"
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
        fontSize: "15px",
      }}
    >
      <p
        style={{
          marginBottom: "15px",
        }}
      >
        This Email is not registered with us. <br />
        Please use a registered Email Address
      </p>
      <div style={{ width: "90%" }}>
        <Link
          id="submit-btn"
          to={"/"}
          onClick={() => localStorage.removeItem("wise_email")}
          style={{ maxWidth: "400px" }}
        >
          Try Again
        </Link>
        <Link
          style={{ maxWidth: "400px" }}
          to={"/"}
          id="submit-btn"
          onClick={() => {
            window.open(
              `https://wa.me/919717094422?text=${encodeURIComponent(
                "Please send me my registered email"
              )}`,
              "_blank"
            );
          }}
        >
          Get Your Registered Email
        </Link>
      </div>
    </div>
  );
};
