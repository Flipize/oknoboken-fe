import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Sidan hittades inte</h1>
      <p>Sidan du försöker komma åt finns inte</p>
      <Link to="/">Tillbaka till startsidan</Link>
    </div>
  );
}

export default NotFound;
