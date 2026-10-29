import axios from "axios";

type GeoCoords = {
  lat: number;
  lon: number;
};

const getLocationIQCoords = async (
  location: string
): Promise<GeoCoords | null> => {
  try {
    const response = await axios.get(
      "https://us1.locationiq.com/v1/search",
      {
        params: {
          key: process.env.LOCATION_IQ_API_KEY,
          q: location,
          format: "json",
          limit: 1,
        },
      }
    );

    const result = response.data?.[0];

    // Location not found
    if (!result) {
      return null;
    }

    return {
      lat: Number(result.lat),
      lon: Number(result.lon),
    };
  } catch (error) {
    console.error("LocationIQ error:", error);
    return null;
  }
};

export default getLocationIQCoords;