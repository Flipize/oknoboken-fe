import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <h1 className="h1-text-font text-center p-[10px] mb-4">404 - Sidan hittades inte</h1>
      <p className="mb-4">Sidan du försöker komma åt finns inte</p>
      <Link to="/" className="regular-text-font">
        Tillbaka till startsidan
      </Link>
    </div>
  );
}

export default NotFound;
