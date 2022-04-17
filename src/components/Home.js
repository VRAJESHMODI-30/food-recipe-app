import React from "react";
import "../styles/Home.css";

export const Home = () => {
  return (
    <>
      <div className="outerBox"></div>
      <div className="innerBox">
        <h1 className="py-3 text-decoration-underline font">
          Welcome to CookBook
        </h1>
        <p>
          CookBook is here to help you cook delicious meals with less stress and
          more joy. We offer recipes and cooking advice for home cooks, by home
          cooks. Helping create “kitchen wins” is what we’re all about.
        </p>
      </div>
    </>
  );
};
