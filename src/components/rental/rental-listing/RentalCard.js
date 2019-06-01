import React from "react";
import { Link } from "react-router-dom";

import { rentalType } from "helpers";

const RentalCard = props => {
  const { shared, _id, category, image, title, city } = props.rental;
  return (
    <div className="col-md-3 col-xs-6">
      <Link className="rental-detail-link" to={`/rentals/${_id}`}>
        <div className="card bwm-card">
          <img className="card-img-top" src={image} alt={title} />
          <div className="card-block">
            <h6 className={`card-subtitle ${category}`}>
              {rentalType(shared)} {category} &#183; {city}
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
