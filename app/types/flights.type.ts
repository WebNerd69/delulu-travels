export interface Airline {
    name: string;
    logoUrl: string;
    minPrice: {
        currencyCode: string;
        units: number;
        nanos: number;
    };
}

export interface AirportLocation {
    id: string;
    cityName: string;
    name: string;
    type: string;
}

export interface FlightDetail {
    name: string;
    logoURL: string;
    minPrice: string;
}


 