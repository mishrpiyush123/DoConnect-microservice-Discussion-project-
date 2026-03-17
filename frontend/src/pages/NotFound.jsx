import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <div className="home-box">
        <h1>404</h1>
        <p>Page not found.</p>
        <Link to="/questions" className="btn btn-primary">
          Go to Questions
        </Link>
      </div>
    </div>
  );
}

export default NotFound;