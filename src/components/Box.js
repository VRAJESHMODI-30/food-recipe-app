import React from "react";
import cardImg from "../images/myRecipe.jpg";
import Deletebtn from "./Deletebtn";
const Box = (props) => {
  const { itemName, recipe, itemNumber, ingredients, imageUrl, btn, id } =
    props;

  return (
    <div className="my-3 rounded text-start">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge bg-dark">#{itemNumber}</span>
        </div>
        <img
          src={imageUrl ? imageUrl : cardImg}
          className="card-img-top"
          alt="Loading..."
        />
        <div className="card-body">
          <h4 className="card-title text-center my-1 pb-2 fw-bolder ">
            {itemName}
          </h4>
          <p className="card-text">
            <strong className="text-decoration-underline">Ingredients:</strong>
            {"   "}
            {ingredients}
          </p>
          <p className="card-text">
            <strong className="text-decoration-underline">Recipe:</strong>
            {"   "}
            {recipe}
          </p>
          {btn && <Deletebtn id={id} />}
        </div>
      </div>
    </div>
  );
};

export default Box;
