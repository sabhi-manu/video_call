import { Link } from "react-router";
import "../app.css";

const LandingPage = () => {
  return (
    <div className="landingPageContainer">
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">Zoom Video Call</h2>

        <div className="navList">
          <p>Join as Guest</p>
          <p>Register</p>
          <button className="btn btn-outline">Login</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="landingMainContainer">
        <div className="heroText">
          <h1>
            <span>Connect</span> with your loved ones
          </h1>
          <p className="subtitle">
            Cover the distance with seamless Zoom video calls.
          </p>
            <Link to={"/home"} className="btn btn-primary">Get Started</Link>
         
        </div>

        <div className="heroImage">
          <img src="/mobile.png" alt="mobile preview" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
