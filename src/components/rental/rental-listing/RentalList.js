import React from "react";

import RentalCard from "./RentalCard";

class RentalList extends React.Component {
  renderRentals = () => {
    return this.props.rentals.map((rental, i) => (
      <RentalCard key={i} rental={rental} />
    ));
  };

  render() {
    return <div className="row">{this.renderRentals()}</div>;
  }
}
export default RentalList;
