import React from "react";

import { toUpperCase, rentalType } from "helpers";
import RentalAssets from "./RentalAssets";

const RentalDetailsInfo = props => {
  const { category, title, city, bedrooms, shared, description } = props;
  return (
    <div className="rental">
      <h2 className={`rental-type ${category}`}>
        {rentalType(shared)} {category}
      </h2>
      <div className="rental-owner">
        <img
          src="https://api.adorable.io/avatars/285/abott@adorable.png"
          alt="owner"
        />
        <span>{rental.user && rental.user.username}</span>
      </div>
      <h1 className="rental-title">{title}</h1>
      <h2 className="rental-city">{toUpperCase(city)}</h2>
      <div className="rental-room-info">
        <span>
          <i className="fa fa-building" />
          {bedrooms} bedrooms
        </span>
        <span>
          <i className="fa fa-user" /> {bedrooms + 4} guests
        </span>
        <span>
          <i className="fa fa-bed" /> {bedrooms + 2} beds
        </span>
      </div>
      <p className="rental-description">{description}</p>
      <hr />
      <RentalAssets />
    </div>
  );
};

export default RentalDetailsInfo;
