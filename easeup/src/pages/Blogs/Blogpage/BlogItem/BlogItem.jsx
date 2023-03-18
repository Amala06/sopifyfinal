import React from "react";
import "./BlogItem.css";
import { Link, NavLink } from "react-router-dom";
const BlogItem = ({
  blog: {
    id,
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    category,
    cover,
  },
}) => {
  return (
    <>

    
          {/* Ye chote wale blogs he search filter ke neeche wale  */}
      <div className="BI_mainContaier">
        <div className="BI_subContainer">
          <div className="BI_card">
            <img className="BI_cardImg" src={cover} alt="" srcset="" />
            <Link className="blogItem-link" to={`${id}`}>
              <p className="BI_cardTitle">{title}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
