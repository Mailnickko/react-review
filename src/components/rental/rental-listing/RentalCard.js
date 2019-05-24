import React from "react";
import { Link } from "react-router-dom";

const RentalCard = props => {
  const { shared, id, category } = props.rental;
  return (
    <div className="col-md-3 col-xs-6">
      <Link className="rental-detail-link" to={`/rentals/${id}`}>
        <div className="card bwm-card">
          <img
            className="card-img-top"
            src="http://via.placeholder.com/350x250"
            alt=""
          />
          <div className="card-block">
            <h6 className={`card-subtitle ${category}`}>
              {shared ? "Shared" : "Whole"} Apartment &#183; New York
            </h6>
            <h4 className="card-title">Some nice apartment</h4>
            <p className="card-text">$240 per Night &#183; Free Cancelation</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RentalCard;
