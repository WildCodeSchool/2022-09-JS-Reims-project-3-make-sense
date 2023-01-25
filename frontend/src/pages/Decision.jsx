import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DescriptionDecisionDetails from "../components/DescriptionDecisionDetails";
import Comment from "../components/Comment";
import { AuthContext } from "../_services/AuthContext";
import ConcernedUsers from "../components/ConcernedUsers";
import { getDate, convertToFr } from "../services/dateFunctions";

export default function Decision() {
  const contentDecision = useRef("");
  const [commentAdded, setCommentAdded] = useState(false);
  const contentFinalDecision = useRef("");
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const idToNumber = parseInt(id, 10);
  const commentRef = useRef();
  const [middleDecisionForm, setMiddleDecisionForm] = useState(false);
  const [middleDecisionIsCreated, setMiddleDecisionIsCreated] = useState(false);
  const [finalDecisionForm, setFinalDecisionForm] = useState(false);
  const [finalDecisionIsCreated, setFinalDecisionIsCreated] = useState(false);
  const [content, setContent] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { statusStep, statusDuration, durationPercentage, publishDate } =
    getDate(content.publish_date, content.deadline);
  // this function will toggle or not the middle decision form when activated. (Used on "create new decision" button)
  function toggleMiddleDecisionForm() {
    setMiddleDecisionForm(!middleDecisionForm);
  }
  function toggleFinalDecisionForm() {
    setFinalDecisionForm(!finalDecisionForm);
  }
  const handleCommentSubmit = () => {
    axios
      .post(
        `http://localhost:5000/decisions/${idToNumber}/comments`,
        {
          content: commentRef.current.value,
          userId: auth.id,
          decisionId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(() => {
        commentRef.current.value = "";
        setCommentAdded(!commentAdded);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`,
          config
        );
        setContent(response.data);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id, commentAdded]);

  if (isLoaded) {
    return (
      <div className="flex flex-col md:flex-row md:w-2/3 mx-auto w-full">
        <main className="flex flex-col md:my-16 w-full md:w-2/3 border-r-2 pl-2 md:pl:0 my-8">
          <h1 className="text-2xl md:text-5xl font-bold text-[#0C3944]">
            {content.title}
          </h1>
          <section id="author" className="flex items-center gap-2 mx-2 md:mx-0">
            <img
              src={content.image_url || "https://via.placeholder.com/150"}
              alt="author"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex gap-1">
              <p className="text-sm">par</p>
              <h2 className="text-sm font-bold">{`${content.firstname} ${content.lastname}`}</h2>
            </div>
          </section>
          <DescriptionDecisionDetails
            title="Les détails de la décision"
            content={content?.start_content}
          />
          <DescriptionDecisionDetails
            title="Impact sur l'organisation"
            content={content?.impact}
          />
          <DescriptionDecisionDetails
            title="Bénéfices 👍"
            content={content?.advantage}
          />
          <DescriptionDecisionDetails
            title="Risques potentiels 🚨"
            content={content?.risk}
          />
          {middleDecisionForm && (
            <form>
              <label className="font-bold text-center">
                Contenu
                <br />
                <textarea
                  type="text"
                  name="contentDecisionTitle"
                  className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2"
                  ref={contentDecision}
                />
              </label>
              <br />
              <button
                type="submit"
                className="font-bold text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap bg-[#9B084F] text-white"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMiddleDecisionForm();
                  setMiddleDecisionIsCreated(true);
                }}
              >
                Envoyer
              </button>
            </form>
          )}
          {middleDecisionIsCreated && (
            <DescriptionDecisionDetails
              title="Decision intermédiaire"
              content={contentDecision.current.value}
            />
          )}
          {finalDecisionForm && (
            <form>
              <label className="font-bold text-center">
                Contenu
                <br />
                <textarea
                  type="text"
                  name="contentFinalDecision"
                  className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2"
                  ref={contentFinalDecision}
                />
              </label>
              <br />
              <button
                type="submit"
                className="font-bold text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap bg-[#9B084F] text-white"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFinalDecisionForm();
                  setFinalDecisionIsCreated(true);
                }}
              >
                Envoyer
              </button>
            </form>
          )}
          {finalDecisionIsCreated && (
            <DescriptionDecisionDetails
              title="Décision finale"
              content={contentFinalDecision.current.value}
            />
          )}
          <section id="comments" className="flex flex-col md:my-20">
            <h2 className="text-xl font-bold text-[#0C3944] pb-1 border-b-2 w-2/3 my-4 mx-2 md:mx-0">
              Commentaires
            </h2>
            <form
              className="flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit();
              }}
            >
              <textarea
                className="h-24 border-2 border-gray-300 rounded-lg my-4 mr-4 ml-4 md:ml-0 p-2"
                placeholder="Ajouter un commentaire"
                ref={commentRef}
              />
              <button
                type="submit"
                className="bg-slate-400 text-white rounded-lg px-4 py-2 w-56 ml-auto mr-4 font-bold"
              >
                Ajouter un commentaire
              </button>
            </form>
            {content.comment.map((oneOfComment) => (
              <Comment
                key={oneOfComment.id}
                icon={oneOfComment.image_url}
                content={oneOfComment.content}
                date={oneOfComment.date}
                author={`${oneOfComment.firstname} ${oneOfComment.lastname}`}
              />
            ))}
          </section>
        </main>
        <aside className="md:my-16 flex flex-col ml-2 gap-3 bg-white pl-6 md:pl-0 ">
          <div className="flex rotate-180 absolute h-[45%] my-14">
            {durationPercentage <= 100 ? (
              <Progress.Line
                vertical
                percent={durationPercentage}
                strokeColor="#C1E94E"
                showInfo={false}
                status="active"
              />
            ) : (
              <Progress.Line
                vertical
                percent="100"
                strokeColor="#C1E94E"
                showInfo={false}
                status="success"
              />
            )}
          </div>
          <div id="timeline" className="flex flex-col">
            <h1 className="font-bold text-base">Dates à retenir</h1>
            <ol className="p-7">
              <li>
                <div className="flex flex-start items-center pt-2">
                  <p className="text-gray-500 text-sm">
                    {convertToFr(content.publish_date)}
                  </p>
                </div>
                <div className="mt-0.5 ml-4 mb-6">
                  <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                    Décision débutée
                  </h4>
                </div>
              </li>
              <li>
                <div className="flex flex-start items-center pt-2">
                  <p className="text-gray-500 text-sm">
                    {content.publish_date !== "" &&
                      convertToFr(
                        new Date(
                          publishDate.getTime() + statusDuration
                        ).toISOString()
                      )}
                  </p>
                </div>
                <div className="mt-0.5 ml-4 mb-6">
                  <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                    Première décision prise
                  </h4>
                </div>
              </li>
              <li>
                <div className="flex flex-start items-center pt-2">
                  <p className="text-gray-500 text-sm">
                    {content.publish_date !== "" &&
                      convertToFr(
                        new Date(
                          publishDate.getTime() + statusDuration * 2
                        ).toISOString()
                      )}
                  </p>
                </div>
                <div className="mt-0.5 ml-4 mb-6">
                  <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                    Conflit sur la décision
                  </h4>
                </div>
              </li>
              <li>
                <div className="flex flex-start items-center pt-2">
                  <p className="text-gray-500 text-sm">
                    {content.publish_date !== "" &&
                      convertToFr(
                        new Date(
                          publishDate.getTime() + statusDuration * 3
                        ).toISOString()
                      )}
                  </p>
                </div>
                <div className="mt-0.5 ml-4 mb-6">
                  <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                    Décision définitive
                  </h4>
                </div>
              </li>
              <li>
                <div className="flex flex-start items-center pt-2">
                  <p className="text-gray-500 text-sm">
                    {convertToFr(content.deadline)}
                  </p>
                </div>
                <div className="mt-0.5 ml-4 pb-5">
                  <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                    Décision terminée
                  </h4>
                </div>
              </li>
            </ol>
          </div>
          <div id="impacted">
            <h1 className="font-bold text-base mb-4">Personnes impactées</h1>
            <ConcernedUsers status="impacted" concerned={content.concerned} />
          </div>
          <div id="experts">
            <h1 className="font-bold text-base mb-4">Personnes expertes</h1>
            <ConcernedUsers status="experts" concerned={content.concerned} />
          </div>
          {middleDecisionIsCreated === false && statusStep >= 2 && (
            <button
              type="button"
              className="bg-emerald-800 text-white rounded-lg px-4 py-2 w-56 ml-auto mr-4 font-bold"
              onClick={toggleMiddleDecisionForm}
            >
              Créer une décision intermédiaire
            </button>
          )}
          {finalDecisionIsCreated === false && statusStep >= 5 && (
            <button
              type="button"
              className="bg-emerald-800 text-white rounded-lg px-4 py-2 w-56 ml-auto mr-4 font-bold"
              onClick={toggleFinalDecisionForm}
            >
              Créer une décision finale
            </button>
          )}
        </aside>
      </div>
    );
  }
  return <div>loading...</div>;
}
