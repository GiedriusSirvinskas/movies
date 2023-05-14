import Login from "./Login";
import { AuthContext } from "./../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div className="home">
      {!loggedIn ? (
        <div className="home-card">
          <p>Žiūri filmus?</p>
          <p>
            Tada <Link to="/login">prisijunk!</Link>
          </p>
        </div>
      ) : (
        <div className="home-card">
          <p>Prisijungei?</p>
          <p>
            Tada <Link to="/list">važiuojam!</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
