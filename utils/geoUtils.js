function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth radius in meters

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
}

// Define “nearby” properly
function isNearby(r1, r2, radius = 500) {
    const distance = calculateDistance(
        r1.latitude,
        r1.longitude,
        r2.latitude,
        r2.longitude
    );



    console.log(`Distance between reports: ${distance.toFixed(2)} meters`); // 👈 RIGHT HERE

    return distance <= radius;
}

module.exports = { isNearby, calculateDistance };