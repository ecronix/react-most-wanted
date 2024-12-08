export const getGeocodeAddress = (
  address: any,
  onSuccess: (data: any, results: any, status: any) => void,
  onError: (status: any) => void
) => {
  //@ts-ignore
  let geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address }, (results: any[], status: string) => {
    if (status === "OK" && onSuccess && onSuccess instanceof Function) {
      onSuccess(
        {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        },
        results,
        status
      );
    } else {
      if (onError && onError instanceof Function) {
        onError(status);
      }
    }
  });
};

export const getLocation = (
  config?: PositionOptions
): Promise<{ coords: { latitude: number; longitude: number } }> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 3000,
      ...config,
    });
  });
};
