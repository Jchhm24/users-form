import { Localidad } from "../interfaces/types";

export const getMunicipios = async (nombreLocalidad : string): Promise<Localidad[]> => {
    try {
        const baseUrl = "https://raw.githubusercontent.com/carlosascari/Mexico.json/master/Yucat%C3%A1n/";
        const url = `${baseUrl}${encodeURIComponent(nombreLocalidad)}.json`; 
    
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json() || [];

    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}