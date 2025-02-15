import { Archivo, Localidad } from "../interfaces/types";

export const getLocalidades = async (): Promise<Localidad[]> => {
    try {
        const response = await fetch('https://api.github.com/repos/carlosascari/Mexico.json/contents/Yucat%C3%A1n?ref=master');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const archivos: Archivo[] = await response.json();
        const localidades: Localidad[] = [];

        for (const archivo of archivos) {
            if (archivo.name.endsWith('.json')) {
                try {
                    const localidadResponse = await fetch(archivo.download_url);

                    if (localidadResponse.ok) {
                        const datosLocalidad: Localidad = await localidadResponse.json();
                        const localidadProcesada:Localidad = {
                            clave: archivo.name,
                            nombre: datosLocalidad.nombre || archivo.name.replace('.json', ''),
                        }
                        localidades.push(localidadProcesada);
                        // console.log(`Localidad cargada: ${archivo.name}`);
                    } else {
                        console.warn(`No se pudo cargar ${archivo.name}`);
                    }
                } catch (fetchError) {
                    console.error(`Error al cargar ${archivo.name}:`, fetchError);
                }
            }
        }

        // console.log(`Total de localidades cargadas: ${localidades.length}`);
        return localidades;

    } catch (error) {
        console.error('Error al obtener las localidades:', error);
        throw error;
    }
}