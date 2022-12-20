import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DescriptionDecisionDetails from "../components/DescriptionDecisionDetails";
import Comment from "../components/Comment";
import cat from "../images/cat.jpg";
import { AuthContext } from "../_services/AuthContext";

export default function Decision() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState({
    title: "",
    publish_date: "",
    deadline: "",
    start_content: "",
    middle_decision: "",
    final_decision: "",
    impact: "",
    risk: "",
    advantage: "",
    userId: "",
    statusId: "",
  });
  let statusStep = 1;
  // Reformatting dates received from DB and also putting the current date
  const publishDate = new Date(content.publish_date);
  const deadlineDate = new Date(content.deadline);
  const currentDate = new Date();

  // calculating to have the durationPercentage of time from publishDate to deadlineDate
  const totalDuration = deadlineDate.getTime() - publishDate.getTime();
  const elapsedDuration = currentDate.getTime() - publishDate.getTime();

  // calculating to get a durationPercentage of this
  const durationPercentage = (elapsedDuration / totalDuration) * 100;
  // this condition defines which step of the status are we in. if above 50%, step 2, if above 75%, step 3
  if (durationPercentage >= 80) {
    statusStep = 5;
  } else if (durationPercentage >= 60) {
    statusStep = 4;
  } else if (durationPercentage >= 40) {
    statusStep = 3;
  } else if (durationPercentage >= 20) {
    statusStep = 2;
  }
  console.warn(statusStep);
  // i divide the totalDuration by 4 to get the duration of each status
  const statusDuration = totalDuration / 4;
  // Adding the statusDuration timestamp to the publishDate "x" times (depends of which status it is)
  const currentStatusDuration =
    publishDate.getTime() + statusDuration * statusStep;

  const statusDate = new Date(currentStatusDuration);
  console.warn(statusDate);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
      });
  }, [id]);

  // return only the first 10 characters of the date  ( mettre au début : {formatDate(content.publish_date)}
  //  et à la fin {formatDate(content.deadline)} à la place des dates
  // const formatDate = (date) => {
  //  return date.slice(0, 10);
  // };

  return (
    <div className="flex flex-col md:flex-row md:w-2/3 mx-auto w-full">
      <main className="flex flex-col md:my-16 w-full md:w-2/3 border-r-2 my-4">
        <h1 className="text-2xl md:text-5xl font-bold text-[#0C3944]">
          {content.title}
        </h1>
        <section id="author" className="flex items-center gap-2 mx-2 md:mx-0">
          <img src={cat} alt="cat" className="w-12 h-12 rounded-full" />
          <div className="flex gap-1">
            <p className="text-sm">par</p>
            <h2 className="text-sm font-bold">Cat</h2>
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
        <section id="comments" className="flex flex-col md:my-20">
          <h2 className="text-xl font-bold text-[#0C3944] pb-1 border-b-2 w-2/3 my-4 mx-2 md:mx-0">
            Commentaires
          </h2>
          {/* add comment */}
          <div className="flex flex-col">
            <textarea
              className="h-24 border-2 border-gray-300 rounded-lg my-4 mr-4 ml-4 md:ml-0 p-2"
              placeholder="Ajouter un commentaire"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-slate-400 text-white rounded-lg px-4 py-2 w-56 ml-auto mr-4 font-bold"
              onClick={() => {
                setComments([...comments, inputComment]);
                setInputComment("");
              }}
            >
              Ajouter un commentaire
            </button>
          </div>
          <Comment
            icon={cat}
            comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
        nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eu aliquam nisl
        nisl sit amet nisl. Sed tincidunt, nisl eget ultricies tincidunt, nisl
        nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl."
          />
          {comments.map((comment) => (
            <Comment key={comment} icon={cat} comment={comment} />
          ))}
        </section>
      </main>
      <aside className="md:my-16 flex flex-col ml-2 gap-3 bg-white ">
        <div className="flex rotate-180 absolute h-[40%] my-10">
          <Progress.Line
            vertical
            percent={durationPercentage}
            strokeColor="#C1E94E"
            showInfo={false}
            status="active"
          />
        </div>
        <div id="timeline" className="flex flex-col">
          <h1 className="font-bold text-base">Dates à retenir</h1>
          <ol className="p-7">
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">07.12.2022</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Date de publication
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">13.12.2022</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Title of section 1
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">19.12.2022</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Title of section 2
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">25.12.2022</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Title of section 3
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">31.12.2022</p>
              </div>
              <div className="mt-0.5 ml-4 pb-5">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Deadline
                </h4>
              </div>
            </li>
          </ol>
        </div>
        <div id="impacted">
          <h1 className="font-bold text-base mb-4">Personnes impactées</h1>
          {/* this ul will be filled with the impacted people */}
          <ul className="flex gap-1 flex-wrap self-start" />
        </div>
        <div id="experts">
          <h1 className="font-bold text-base mb-4">Personnes expertes</h1>
          {/* this ul will be filled with the experts people */}
          <ul className="flex gap-1 flex-wrap self-start" />
        </div>
      </aside>
    </div>
  );
}

Decision.propTypes = {
  createDecision: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    impacted: PropTypes.arrayOf(PropTypes.string),
    experts: PropTypes.arrayOf(PropTypes.string),
    impacts: PropTypes.string,
    advantages: PropTypes.string,
    risks: PropTypes.string,
  }).isRequired,
};
