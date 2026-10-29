import axios from "axios";

type GeoCoords = {
  lat: number;
  lon: number;
};

const getNominatimCoords = async (
  location: string
): Promise<GeoCoords | null> => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: location,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "DeluluTravels/1.0 (rroy64330@gmail.com)",
          "Accept-Language": "en",
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
    console.error("Nominatim error:", error);
    return null;
  }
};

export default getNominatimCoords;