import React from "react";

import { GOOGLE_API_KEY } from "helpers/keys";
import MapWithGeocode from "components/map/GoogleMap";

class RentalMap extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <MapWithGeocode
        googleMapURL={`
        https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    );
  }
}

export default RentalMap;
