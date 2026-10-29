import getLocationIQCoords from "./locatioinIQ";
import getGeoapifyCoords from "./geoapify";
import getNominatimCoords from "./nominatim";

let res;

const getCoords = async (location: string) => {
    try {
        console.log("nomi");
        res = await getNominatimCoords(location);
        console.log(res)
        if (!res) {
            console.log("geo");
            res = await getGeoapifyCoords(location);
            console.log(res)
        }
        if (!res) {
            console.log("loc");
            res = await getLocationIQCoords(location);
            console.log(res)
        }
        if (!res) {
            return null;
        }

        return {success:true , error:null , res}
    } catch (error) {
        return {success: false , error: JSON.stringify(error) , res:null}
    }
};

export default getCoords;
