import PropTypes from "prop-types";
import dateDisplay from "../_services/dateDisplay";

function Comment({ icon, content, author, date }) {
  return (
    <div className="flex flex-col gap-3 bg-red-50 rounded-lg border-2 md:w-11/12 border-r-2 my-4 mx-4 md:mx-0">
      <div className="flex items-center gap-2 p-2">
        <img
          src={icon || "https://via.placeholder.com/150"}
          alt="cat"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="text-sm font-bold">{author}</h3>
          <p className="text-sm">Il y a {dateDisplay(date)}</p>
        </div>
      </div>
      <div
        id="separating-bar"
        className="border-b-2 border-gray-300 w-1/2 flex justify-center items-center"
      />
      <p className="text-sm p-2">{content}</p>
    </div>
  );
}

Comment.propTypes = {
  icon: PropTypes.string,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

Comment.defaultProps = {
  icon: null,
};

export default Comment;
