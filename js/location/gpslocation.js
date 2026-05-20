export function getCurrentLocation(callback) {

    navigator.geolocation.getCurrentPosition(
        (position) => {

            callback(
                position.coords.latitude,
                position.coords.longitude
            );

        },
        (error) => {
            alert("Location access denied");
        }
    );
}