import axios from "axios";

type GeoCoords = {
  lat: number;
  lon: number;
};

const getGeoapifyCoords = async (
  location: string
): Promise<GeoCoords | null> => {
  try {
    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/search",
      {
        params: {
          text: location,
          format: "json",
          apiKey: process.env.GEOAPIFY_API_KEY,
          limit: 1,
        },
      }
    );

    const result = response.data?.results?.[0];

    // No location found
    if (!result) {
      return null;
    }

    return {
      lat: result.lat,
      lon: result.lon,
    };
  } catch (error) {
    console.error("Geoapify error:", error);
    return null;
  }
};

export default getGeoapifyCoords;