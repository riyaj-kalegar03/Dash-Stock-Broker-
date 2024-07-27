import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <div className="logo-section">
        <h1 className="logo">Stock Broker.</h1>
      </div>
      <div className="login-section">
        {!user ? (
          <div className="log-in">
            <Login setUser={setUser} />{" "}
          </div>
        ) : (
          <Dashboard user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
