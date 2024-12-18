
//Method to calculate the distance between two points based on thier coordonates
export function calculateDistanceCoordonates(latitudeAirport:number, longitudeAirport:number, latitudeHotel:number, longitudeHotel:number):number
{
    //Calculated using Haversine formula
    const earthRadius = 6371; //in klometers

    //Method to convert the difference of latitude and longitude coordonates ( aka distance ) from coodonates value into redians
    const toRadiansDegree = (degree:number) => degree*(Math.PI)/180;
    const degreeLatitude = toRadiansDegree(latitudeHotel-latitudeAirport);
    const degreeLongitude = toRadiansDegree(longitudeHotel-longitudeAirport);

    // Calculate the square of the jalf-chord length between the hotel and the airport.
    const alpha = Math.sin(degreeLatitude/2)*Math.sin(degreeLatitude/2)+
                  Math.cos(toRadiansDegree(latitudeAirport))* Math.cos(toRadiansDegree(latitudeHotel))* Math.sin(degreeLongitude/2)*Math.sin(degreeLongitude/2);

    // Calculate the angular distance in radians, representing the central angle between two points on the sphere, in radians
    const beta = 2 * Math.atan2(Math.sqrt(alpha), Math.sqrt(1-alpha));
    return earthRadius*beta;
}