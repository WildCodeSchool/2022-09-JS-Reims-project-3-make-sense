import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import avatar from "../assets/profile_pic_default.svg";
import { AuthContext } from "../_services/AuthContext";

function DashboardCard({ decisionTitle, author, id, profilePicture }) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = async () => {
    await fetch(`http://localhost:5000/decisions/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/decision/${data.id}`);
      });
  };

  return (
    <section className="bg-white rounded-xl p-4 flex flex-col justify-evenly shadow-2xl my-4 w-full md:w-72 h-56">
      <h1 className="font-bold text-blue-dianne text-lg">{decisionTitle}</h1>
      <div className="flex flex-col">
        <figure className="flex justify-between mt-4 items-center gap-2">
          <img
            src={profilePicture || avatar}
            alt="avatar"
            className="max-h-12 w-auto rounded-full"
          />
          <figcaption className="text-sm text-slate-600 font-bold">{`par ${author}`}</figcaption>
          <button
            type="button"
            className="bg-[#9B084F] text-white rounded-md px-4 py-2 ml-auto"
            onClick={() => {
              handleClick();
            }}
          >
            Voir
          </button>
        </figure>
      </div>
    </section>
  );
}

DashboardCard.propTypes = {
  decisionTitle: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  profilePicture: PropTypes.string.isRequired,
};

export default DashboardCard;
