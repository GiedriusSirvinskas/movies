import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <p>
        Bet davai pirmiausiai <Link to="/login">prisijunk!</Link>
      </p>
    </div>
  );
}

export default Login;
