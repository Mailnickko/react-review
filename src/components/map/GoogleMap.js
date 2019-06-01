import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Circle
} from "react-google-maps";
import Cacher from "services/cacher";

const MapComponent = props => {
  const { coordinates, isError, isLocationLoaded } = props;
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
      options={{ disableDefaultUI: isError }}
    >
      {isLocationLoaded && !isError && (
        <Circle center={coordinates} radius={500} />
      )}
      {isLocationLoaded && isError && (
        <InfoWindow options={{ maxWidth: 300 }} position={coordinates}>
          <div>Whoops, we cannot find that location!</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const withGeocode = WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.cache = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false,
        isLocationLoaded: false
      };
    }

    componentWillMount() {
      this.getGeoCodedLocation();
    }

    geocodeLocation(location) {
      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (res, status) => {
          if (status === "OK") {
            const geometry = res[0].geometry.location;
            const coordinates = {
              lat: geometry.lat(),
              lng: geometry.lng()
            };

            this.cache.cacheValue(location, coordinates);
            resolve(coordinates);
          } else {
            reject("Error");
          }
        });
      });
    }

    updateCoords(coordinates) {
      this.setState({
        coordinates,
        isLocationLoaded: true
      });
    }

    getGeoCodedLocation = () => {
      const location = this.props.location;

      if (this.cache.getCacheValue(location)) {
        this.updateCoords(this.cache.getCacheValue(location));
      } else {
        this.geocodeLocation(location)
          .then(coordinates => {
            this.updateCoords(coordinates);
          })
          .catch(err => {
            this.setState({
              isError: true,
              isLocationLoaded: true
            });
            console.log("Geocode Error: ", err);
          });
      }
    };

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
};

const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));

export default MapWithGeocode;
