import { useState } from "react";
import rightchevron from "../assets/chevron-right.svg";
import DescriptionDecisionForm from "../components/DescriptionDecisionForm";
import InputDecisionForm from "../components/InputDecisionForm";

function CreateDecision() {
  const [createDecision, setCreateDecision] = useState({
    impacted: [],
    experts: [],
    title: "",
    date: "",
    description: "",
    impacts: "",
    advantages: "",
    risks: "",
  });
  const [inputImpacted, setInputImpacted] = useState("");
  const [inputExpert, setInputExpert] = useState("");

  const [step, setStep] = useState(1);
  return (
    <main className="w-full flex justify-evenly items-start h-[calc(100vh_-_64px)]">
      <div className="h-full flex flex-col gap-2 md:gap-4 justify-around items-start">
        <span>
          <h1 className="font-bold text-2xl md:mt-16">Créer une décision</h1>
        </span>
        <ul className="flex gap-0 md:gap-4 items-center overflow-x-auto md:mb-10">
          <li>
            <h2 className="font-bold text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap bg-[#9B084F] text-white">
              Décision
            </h2>
          </li>
          <li>
            <img
              src={rightchevron}
              alt="Right chevron"
              className="max-h-6 w-auto"
            />
          </li>
          <li>
            <h2
              className={`text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap border font-bold ${
                step >= 2
                  ? "bg-[#9B084F] text-white"
                  : "opacity-30 text-slate-600 border-slate-600"
              }`}
            >
              Impacts
            </h2>
          </li>
          <li>
            <img
              src={rightchevron}
              alt="Right chevron"
              className="max-h-6 w-auto"
            />
          </li>
          <li>
            <h2
              className={`text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap border font-bold ${
                step >= 3
                  ? "bg-[#9B084F] text-white"
                  : "opacity-30 font-bold text-slate-600 border-slate-600"
              }`}
            >
              Bénéfices
            </h2>
          </li>
          <li>
            <img
              src={rightchevron}
              alt="Right chevron"
              className="max-h-6 w-auto"
            />
          </li>
          <li>
            <h2
              className={`text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap border font-bold ${
                step === 4
                  ? "bg-[#9B084F] text-white"
                  : "opacity-30 font-bold text-slate-600 border-slate-600"
              }`}
            >
              Risques
            </h2>
          </li>
        </ul>
        <div className="md:flex md:justify-evenly w-full gap-4">
          {step === 1 && (
            <DescriptionDecisionForm
              inputImpacted={inputImpacted}
              setInputImpacted={setInputImpacted}
              inputExpert={inputExpert}
              setInputExpert={setInputExpert}
              createDecision={createDecision}
              setCreateDecision={setCreateDecision}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <InputDecisionForm
              createDecision={createDecision}
              setCreateDecision={setCreateDecision}
              setStep={setStep}
              stepName="impacts"
            />
          )}
          {step === 3 && (
            <InputDecisionForm
              createDecision={createDecision}
              setCreateDecision={setCreateDecision}
              setStep={setStep}
              stepName="advantages"
            />
          )}
          {step === 4 && (
            <InputDecisionForm
              createDecision={createDecision}
              setCreateDecision={setCreateDecision}
              setStep={setStep}
              stepName="risks"
              redirectButton
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default CreateDecision;
