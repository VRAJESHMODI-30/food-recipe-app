import React, { useContext } from "react";
import deleteBtn from "../images/delete.svg";
import { User } from "../context/Context";

const Deletebtn = (props) => {
  const { id } = props;
  const { deleteRecipe } = useContext(User);

  const handleDelete = () => {
    console.log("deleteing recipe...");
    deleteRecipe(id);
  };

  return (
    <div>
      <button className="btn btn-danger mx-1 my-1" onClick={handleDelete}>
        <img src={deleteBtn} alt="Edit" width="20" />
      </button>
    </div>
  );
};

export default Deletebtn;
