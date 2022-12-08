import cat from "../images/cat.jpg";
import Louen from "../images/Louen.jpg";
import Tracteur from "../images/Tracteur.jpg";
import Heri from "../images/Heri.jpg";
import Marty from "../images/Marty.jpg";
import Rick from "../images/Rick.jpg";
import DescriptionDecisionDetails from "../components/DescriptionDecisionDetails";

export default function Decision() {
  return (
    <div className="flex flex-col md:flex-row md:w-2/3 mx-auto">
      <main className="flex flex-col md:my-16 w-full md:w-2/3 border-r-2">
        <h1 className="text-2xl md:text-5xl font-bold text-[#0C3944]">
          Title of the decision
        </h1>
        <section id="author" className="flex items-center gap-2">
          <img src={cat} alt="cat" className="w-12 h-12 rounded-full" />
          <div className="flex gap-1">
            <p className="text-sm">par</p>
            <h2 className="text-sm font-bold">Cat</h2>
          </div>
        </section>
        <DescriptionDecisionDetails title="Les détails de la décision" />
        <DescriptionDecisionDetails title="Impact sur l'organisation" />
        <DescriptionDecisionDetails title="Bénéfices 👍" />
        <DescriptionDecisionDetails title="Risques potentiels 🚨" />
      </main>
      <aside className="md:my-16 flex flex-col ml-2 gap-3 bg-white">
        <div id="timeline" className="flex flex-col">
          <h1 className="font-bold text-base">Date à retenir</h1>
          <ol className="border-l border-gray-300">
            <li>
              <div className="flex flex-start items-center pt-3">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3" />
                <p className="text-gray-500 text-sm">01.07.2021</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Title of section 1
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3" />
                <p className="text-gray-500 text-sm">13.09.2021</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Title of section 2
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3" />
                <p className="text-gray-500 text-sm">25.11.2021</p>
              </div>
              <div className="mt-0.5 ml-4 pb-5">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Title of section 3
                </h4>
              </div>
            </li>
          </ol>
        </div>
        <div id="impacted">
          <h1 className="font-bold text-base mb-4">Personnes impactées</h1>
          <div className="flex">
            <img
              src={Heri}
              alt="user"
              className="object-fill rounded-full w-10 h-10 hover:z-10"
            />
            <img
              src={Louen}
              alt="user"
              className="object-fill rounded-full w-10 h-10 -ml-2 hover:z-10"
            />
            <img
              src={Tracteur}
              alt="user"
              className="object-fill rounded-full w-10 h-10 -ml-2 hover:z-10"
            />
          </div>
        </div>
        <div id="experts">
          <h1 className="font-bold text-base mb-4">Personnes impactées</h1>
          <div className="flex">
            <img
              src={Rick}
              alt="user"
              className="object-fill rounded-full w-10 h-10 hover:z-10"
            />
            <img
              src={Marty}
              alt="user"
              className="object-fill rounded-full w-10 h-10 -ml-2 hover:z-10"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
