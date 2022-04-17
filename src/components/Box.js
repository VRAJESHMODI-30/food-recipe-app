import React from "react";

const Box = (props) => {
  const { itemName, recipe, itemNumber, ingredients, imageUrl } = props;
  const url =
    "https://st.depositphotos.com/1077687/4512/v/950/depositphotos_45127421-stock-illustration-cook-book-design.jpg";
  return (
    <div className="my-3 rounded">
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
          src={imageUrl ? imageUrl : url}
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
        </div>
      </div>
    </div>
  );
};

export default Box;
