
export function geocodeAddress(address, onSuccess, onError) {

  let geocoder= new window.google.maps.Geocoder();
  geocoder.geocode({address}, (results, status) => {
    if (status === 'OK' && onSuccess && onSuccess instanceof Function) {
      onSuccess({
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      }, results, status)
    } else {
      if(onError && onError instanceof Function){
        onError(status)
      }
    }
  });
}

export const getGeolocation = (callbackSuccess, callbackError) => {

  navigator.geolocation.getCurrentPosition(
        callbackSuccess,
        callbackError,
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 3000}
      );
}
