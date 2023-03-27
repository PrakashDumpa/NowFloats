import "./index.css";
import { NavLink } from "react-router-dom";

const BookItem = (props) => {
  const { bookInfo } = props;
  const { author, imageLink, title, country, language, _id } = bookInfo;
  return (
    <li className="col-12 col-md-4 col-sm-6  p-4">
      <NavLink to={`/book/${_id}`} className="nav-item">
        <div className="book_card">
          <div className="col-5 image_Container">
            <img className="w-100 h-100" src={imageLink} alt={title} />
          </div>
          <div className="flexGrow">
            {title.length > 30 ? (
              <h1 className="h4 mb-3 headingColor">{title.slice(0, 30)}...</h1>
            ) : (
              <h1 className="h4 mb-3 headingColor">{title}</h1>
            )}
            <div className="d-flex justify-content-between align-items-center text-secondary mb-2">
              <p className="m-0">Author: </p>
              <p className=" m-0 h6">{author}</p>
            </div>
            <div className="d-flex justify-content-between  text-secondary mb-2">
              <p className="m-0">Country: </p>
              <p className="m-0 h6">{country}</p>
            </div>
            <div className="d-flex justify-content-between  text-secondary mb-2">
              <p className="m-0">language: </p>
              <p className=" m-0 h6">{language}</p>
            </div>
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default BookItem;
