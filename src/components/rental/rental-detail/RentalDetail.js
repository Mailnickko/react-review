import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";

class RentalDetail extends React.Component {
  componentDidMount() {
    const rentalID = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalID));
  }

  render() {
    const { selectedRental } = this.props;
    return (
      (selectedRental.id && (
        <div>On Rental Detail {this.props.selectedRental.id}</div>
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
