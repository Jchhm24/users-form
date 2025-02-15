import React, { useEffect, useState } from "react";
import { getLocalidades } from "../services/apiLocalidades";
import { Localidad, Municipio } from "../interfaces/types";
import { getMunicipios } from "../services/apiMunicipios";

export const UserForm = () => {
    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    const [selectedLocalidad, setSelectedLocalidad] = useState<string>("");
    const [municipios, setMunicipios] = useState<Municipio[]>([]);

    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const response = await getLocalidades();
                setLocalidades(response);
            } catch (error) {
                console.error("Error al obtener las localidades:", error);
            }
        };

        fetchLocalidades();
    }, []);

    // TODO: Para el debugging, imprime las localidades en la consola o los municipios
    useEffect(() => {
        console.log("Localidades del state:", localidades);
    }, [localidades]);

    const handleLocalidadChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedLocalidad(event.target.value);
        // console.log('Localidad seleccionada:', event.target.value)
        try {
            const response = await getMunicipios(event.target.value);
            setMunicipios(response);
            // console.log('Municipios cargados:', response)
        } catch (error) {
            console.error("Error al obtener los municipios:", error);
        }
    };

    return (
        <div>
            <label htmlFor="localidad" className="block mb-2">
                Localidad
            </label>
            {localidades.length > 0 ? (
                <select
                    id="localidad"
                    value={selectedLocalidad}
                    onChange={handleLocalidadChange}
                    className="text-black w-full p-2 border">
                    <option value="0">Selecciona la localidad</option>
                    {localidades.map((localidad) => (
                        <option
                            key={localidad.clave}
                            value={localidad.nombre}
                            className="text-black">
                            {localidad.nombre || "Sin nombre"}
                        </option>
                    ))}
                </select>
            ) : (
                <p>Cargando las localidades</p>
            )}

            <label htmlFor="municipio">Municipio:</label>

            {municipios.length > 0 ? (
                <select
                    id="municipio"
                    className="text-black w-full p-2 border">
                      <option value="0"> Selecciona un municipio</option>
                    
                      {municipios.map((municipio)=> (
                        <option key={municipio.clave} value={municipio.nombre}>
                            {municipio.nombre || "Sin nombre"}
                        </option>
                      ) )}  
                </select>
            ) : (
                <p>
                    Selecciona una localidad, para poder seleccionar un
                    municipio
                </p>
            )}
        </div>
    );
};
