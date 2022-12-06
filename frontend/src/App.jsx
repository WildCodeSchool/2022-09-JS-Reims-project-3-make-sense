import { Route, Routes } from "react-router-dom";
import CreateDecision from "./pages/CreateDecision";
import Decision from "./pages/Decision";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/create-decision" element={<CreateDecision />} />
        <Route path="/decision" element={<Decision />} />
      </Routes>
    </div>
  );
}

export default App;
