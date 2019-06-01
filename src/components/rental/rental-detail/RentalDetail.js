import React from "react";
import { connect } from "react-redux";
import RentalMap from "./RentalMap";

import RentalDetailsInfo from "./RentalDetailsInfo";
import * as actions from "actions";

class RentalDetail extends React.Component {
  componentDidMount() {
    const rentalID = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalID));
  }

  render() {
    const { selectedRental } = this.props;
    const { image, city, street } = selectedRental;
    return (
      (selectedRental._id && (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={image} alt="" />
              </div>
              <div className="col-md-6">
                <RentalMap location={`${city}, ${street}`} />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <RentalDetailsInfo {...selectedRental} />
              </div>
              <div className="col-md-4"> BOOKING</div>
            </div>
          </div>
        </section>
      )) || <div>Loading...</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedRental: state.selectedRental.data
  };
};

export default connect(mapStateToProps)(RentalDetail);
