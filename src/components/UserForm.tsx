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
        <form
            action=""
            className="flex flex-col gap-1 w-2/8 h-full p-4 shadow-md rounded-2xl border border-gray-300">
            <h1 className="font-bold text-2xl mb-3">Registro de usuarios</h1>

            <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="labels-form">
                    Nombre
                    <input type="text" name="nombre" className="input-form" />
                </label>
                <label htmlFor="apellidos" className="labels-form">
                    Apellidos
                    <input
                        type="text"
                        name="apellidos"
                        className="input-form"
                    />
                </label>
                <label htmlFor="direccion" className="labels-form">
                    Dirección
                    <input
                        type="text"
                        name="direccion"
                        className="input-form"
                    />
                </label>
            </div>

            <label htmlFor="localidad" className="labels-form">
                Localidad:
                {localidades.length > 0 ? (
                    <select
                        id="localidad"
                        value={selectedLocalidad}
                        onChange={handleLocalidadChange}
                        className="select-form">
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
                    <p className="font-normal">Cargando las localidades ...</p>
                )}
            </label>

            <label htmlFor="municipio" className="labels-form">
                Municipio:
                {municipios.length > 0 ? (
                    <select id="municipio" className="select-form">
                        <option value="0"> Selecciona un municipio</option>

                        {municipios.map((municipio) => (
                            <option
                                key={municipio.clave}
                                value={municipio.nombre}>
                                {municipio.nombre || "Sin nombre"}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p className="font-normal">
                        Selecciona una localidad, para poder seleccionar un
                        municipio
                    </p>
                )}
            </label>

            <button type="submit" className="bg-blue-500 text-white py-1 px2 rounded-full underline-none cursor-pointer">
                Enviar
            </button>
        </form>
    );
};
