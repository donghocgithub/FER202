import "./Banner.css";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import image5 from "../../assets/image5.png";

export default function Banner() {
  return (
    <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={image5} className="d-block w-100 banner-img" alt="Pizza slide 1" />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="display-6 fw-bold">Neapolitan Pizza</h1>
            <p>If you are looking for a traditional Italian pizza, the Neapolitan is the best option!</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={image2} className="d-block w-100 banner-img" alt="Pizza slide 2" />
        </div>
        <div className="carousel-item">
          <img src={image3} className="d-block w-100 banner-img" alt="Pizza slide 3" />
        </div>
        <div className="carousel-item">
          <img src={image1} className="d-block w-100 banner-img" alt="Pizza slide 4" />
        </div>
        <div className="carousel-item">
          <img src={image4} className="d-block w-100 banner-img" alt="Pizza slide 5" />
        </div>
      </div>

      
      <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

     
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="3"></button>
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="4"></button>
      </div>
    </div>
  );
}
