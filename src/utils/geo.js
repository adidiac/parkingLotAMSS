
export const getCoordinates = async (locationName)=>{
    const url = `https://api.geoapify.com/v1/geocode/search?text=${locationName}&apiKey=b5b8555521e541e89c40f77cc9fb9ae2`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const result = await response.json();
    const lat=result.data?.features[0].properties.lat ?? 0;
    const lon=result.data?.features[0].properties.lon ?? 0;

    return {lat,lon};
}
export const getMap=(lon,lat)=>{
    return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${lon},${lat}&zoom=11&apiKey=b5b8555521e541e89c40f77cc9fb9ae2`
}
