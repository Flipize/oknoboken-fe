import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <img src="/assets/Black_forest_banner_1.jpg" className="img-fluid" />
      <div className="centered logo">
        Lizetta<span className="von">von</span>Smil
      </div>
    </div>
  );
};

export default Banner;
