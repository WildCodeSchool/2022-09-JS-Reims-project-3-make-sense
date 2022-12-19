import { useEffect, useState } from "react";
import DashboardCard from "../components/DecisionCard";

function Dashboard() {
  const [decisions, setDecisions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/decisions?status=current", {
      method: "GET",
      headers: {
        Autorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDecisions(data));
  }, []);
  return (
    <main className="flex justify-center">
      <section id="current-decision" className="w-2/3 mt-24 mb-20">
        <h1 className="font-bold text-3xl text-blue-dianne pb-12 border-b-2">
          Décisions en cours
        </h1>
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          {decisions.map((decision) => (
            <DashboardCard
              key={decision.id}
              id={decision.id}
              decisionTitle={decision.title}
              author={`${decision.firstname} ${decision.lastname}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
