import { Route, Routes } from "react-router-dom";
import CreateDecision from "./pages/CreateDecision";
import Decision from "./pages/Decision";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./_services/AuthContext";

function App() {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  };
  const token = getCookie("token");
  return (
    <AuthProvider>
      <div className="App">
        {token ? <Header /> : null}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {token ? (
            <Route path="/" element={<Dashboard />}>
              <Route path="decisions/create" element={<CreateDecision />} />
              <Route path="decisions/:id" element={<Decision />} />
            </Route>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
