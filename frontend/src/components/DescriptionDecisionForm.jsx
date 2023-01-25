import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import plusIcon from "../assets/plus.svg";
import { AuthContext } from "../_services/AuthContext";
import { minDate } from "../services/dateFunctions";

function DescriptionDecisionForm({
  createDecision,
  setCreateDecision,
  inputImpacted,
  setInputImpacted,
  inputExpert,
  setInputExpert,
  setStep,
  setUsersConcerned,
  usersConcerned,
}) {
  const { auth } = useContext(AuthContext);
  const [myUsers, setMyUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setMyUsers(res.data);
      });
  }, []);

  function checkUsers(username, concerned) {
    const [firstname, lastname] = username.split(" ");
    const userFound = myUsers.find(
      (user) => user.firstname === firstname && user.lastname === lastname
    );
    if (userFound && concerned === "impacted") {
      if (createDecision.impacted.includes(username)) {
        setMessage(`${username} est dejà dans les impactés`);
      } else {
        setCreateDecision({
          ...createDecision,
          impacted: [...createDecision.impacted, inputImpacted],
        });
        setUsersConcerned([
          ...usersConcerned,
          {
            user_status: "impacted",
            user_id: userFound.id,
            decision_id: 1,
          },
        ]);
        setInputImpacted("");
        setMessage("");
      }
    } else if (userFound && concerned === "expert") {
      if (createDecision.experts.includes(username)) {
        setMessage(`${username} est dejà dans les experts`);
      } else {
        setCreateDecision({
          ...createDecision,
          experts: [...createDecision.experts, inputExpert],
        });
        setUsersConcerned([
          ...usersConcerned,
          {
            user_status: "experts",
            user_id: userFound.id,
            decision_id: 1,
          },
        ]);
        setInputExpert("");
        setMessage("");
      }
    } else {
      setInputExpert("");
      if (username.length > 0) {
        setMessage(`${username} n'existe pas !`);
      } else {
        setMessage(`Veuillez choisir une personne dans la liste !`);
      }
    }
  }
  return (
    <>
      <section className="flex gap-2 w-full justify-evenly">
        <div className="flex flex-col gap-1 items-center w-1/2">
          <h2 className="font-bold">Impactés</h2>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="@Impactés"
              name="impacted"
              list="impact"
              className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2 w-full"
              value={inputImpacted}
              onChange={(event) => setInputImpacted(event.target.value)}
            />
            <button
              className="absolute right-0 h-full"
              type="button"
              onClick={() => {
                checkUsers(inputImpacted, "impacted");
              }}
            >
              <img src={plusIcon} alt="Plus" className="max-h-6 w-auto" />
            </button>
            <datalist id="impact">
              {myUsers.map(({ id, firstname, lastname }) => (
                <option
                  aria-label="User possibility"
                  key={id}
                  value={`${firstname} ${lastname}`}
                />
              ))}
            </datalist>
          </div>
          <ul className="flex gap-1 flex-wrap self-start md:my-16 w-full">
            {createDecision.impacted.map((impactElement) => (
              <li
                className="text-[#0C3944] text-xl rounded-full text-center px-4 py-2 font-bold border border-black"
                key={impactElement}
              >
                {`#${
                  impactElement.charAt(0).toUpperCase() + impactElement.slice(1)
                }`}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1 items-center w-1/2">
          <h2 className="font-bold">Experts</h2>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="@Experts"
              name="expert"
              list="expert"
              className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2 w-full"
              value={inputExpert}
              onChange={(event) => setInputExpert(event.target.value)}
            />
            <button
              className="absolute right-0 h-full"
              type="button"
              onClick={() => {
                checkUsers(inputExpert, "expert");
              }}
            >
              <img src={plusIcon} alt="Plus" className="max-h-6 w-auto" />
            </button>
            <datalist id="expert">
              {myUsers.map(({ id, firstname, lastname }) => (
                <option
                  aria-label="User possibility"
                  key={id}
                  value={`${firstname} ${lastname}`}
                />
              ))}
            </datalist>
          </div>
          <ul className="flex gap-1 flex-wrap self-start md:my-16 w-full">
            {createDecision.experts.map((expertElement) => (
              <li
                className="text-[#0C3944] text-xl rounded-full text-center px-4 py-2 font-bold border border-black"
                key={expertElement}
              >
                {`#${
                  expertElement.charAt(0).toUpperCase() + expertElement.slice(1)
                }`}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <form className="flex flex-col gap-2 md:gap-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="decision">
              <h2 className="font-bold text-center">Titre de la décision</h2>
            </label>
            <input
              type="text"
              name="decision"
              id="decision"
              className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2"
              value={createDecision.title}
              onChange={(event) =>
                setCreateDecision((old) => ({
                  ...old,
                  title: event.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="deadline">
              <h2 className="font-bold text-center">Date limite</h2>
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2"
              value={createDecision.date}
              min={minDate}
              onChange={(event) => {
                setCreateDecision((old) => ({
                  ...old,
                  date: event.target.value,
                }));
              }}
            />
          </div>
        </div>
        <label htmlFor="description">
          <h2 className="font-bold text-center">Description</h2>
        </label>
        <textarea
          name="description"
          id="description"
          className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2 h-56 md:h-96 w-full"
          value={createDecision.description}
          onChange={(event) =>
            setCreateDecision((old) => ({
              ...old,
              description: event.target.value,
            }))
          }
        />
        <button
          type="submit"
          className="font-bold text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap bg-[#9B084F] text-white"
          onClick={(e) => {
            e.preventDefault();
            if (createDecision.impacted.length < 1) {
              setMessage("Veuillez ajouter au moins une personne impacté");
            } else if (createDecision.experts.length < 1) {
              setMessage("Veuillez ajouter au moins une personne experte");
            } else if (createDecision.title.length < 1) {
              setMessage("Veuillez ajouter un titre");
            } else if (createDecision.date.length < 1) {
              setMessage("Veuillez définir une date limite");
            } else if (createDecision.description.length < 1) {
              setMessage("Veuillez ajouter une déscription pour la décision");
            } else {
              setMessage("");
              setStep((old) => old + 1);
            }
          }}
        >
          Suivant
        </button>
        {message.length > 0 && (
          <p className="text-lg text-red-600 text-center">{message}</p>
        )}
      </form>
    </>
  );
}
DescriptionDecisionForm.propTypes = {
  createDecision: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    impacted: PropTypes.arrayOf(PropTypes.string),
    experts: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setCreateDecision: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setInputExpert: PropTypes.func.isRequired,
  setInputImpacted: PropTypes.func.isRequired,
  inputImpacted: PropTypes.string.isRequired,
  inputExpert: PropTypes.string.isRequired,
  setUsersConcerned: PropTypes.func.isRequired,
  usersConcerned: PropTypes.arrayOf(
    PropTypes.shape({
      user_status: PropTypes.string,
      user_id: PropTypes.number,
    })
  ).isRequired,
};

export default DescriptionDecisionForm;
