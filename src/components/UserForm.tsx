import React, { useEffect, useState } from "react";
import { getLocalidades } from "../services/apiLocalidades";
import { FormState, Localidad, Municipio } from "../interfaces/types";
import { getMunicipios } from "../services/apiMunicipios";
import { createUser } from "../services/apiJsonPlaceholder";
import { useUserList } from "../context/UserListContext";

export const UserForm = () => {
    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    const [selectedLocalidad, setSelectedLocalidad] = useState<string>("");
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [formData, setFormData] = useState<FormState>({
        nombre: "",
        apellidos: "",
        direccion: "",
        localidad: "",
        municipio: "",
    });

    const { addUser } = useUserList();

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
    // useEffect(() => {
    //     console.log("Localidades del state:", localidades);
    // }, [localidades]);

    const handleLocalidadChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { value } = event.target;
        setSelectedLocalidad(value);
        setFormData((prevData) => ({
            ...prevData,
            localidad: value,
            municipio: "",
        }));
        try {
            const response = await getMunicipios(event.target.value);
            setMunicipios(response);
        } catch (error) {
            console.error("Error al obtener los municipios:", error);
        }
    };

    const onChangeValue = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await createUser(formData);
            setFormData({
                nombre: "",
                apellidos: "",
                direccion: "",
                localidad: "",
                municipio: "",
            });

            setSelectedLocalidad("");
            setMunicipios([]);

            addUser(response);
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1 w-2/8 h-full p-4 shadow-md rounded-2xl border border-gray-300">
            <h1 className="font-bold text-2xl mb-3">Registro de usuarios</h1>

            <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="labels-form">
                    Nombre
                    <input
                        type="text"
                        name="nombre"
                        className="input-form"
                        value={formData.nombre}
                        onChange={onChangeValue}
                    />
                </label>
                <label htmlFor="apellidos" className="labels-form">
                    Apellidos
                    <input
                        type="text"
                        name="apellidos"
                        className="input-form"
                        value={formData.apellidos}
                        onChange={onChangeValue}
                    />
                </label>
                <label htmlFor="direccion" className="labels-form">
                    Dirección
                    <input
                        type="text"
                        name="direccion"
                        className="input-form"
                        value={formData.direccion}
                        onChange={onChangeValue}
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
                    <select
                        id="municipio"
                        className="select-form"
                        value={formData.municipio}
                        onChange={onChangeValue}
                        name="municipio">
                        <option value=""> Selecciona un municipio</option>

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

            <button
                type="submit"
                className="bg-blue-500 text-white font-semibold p-2 rounded-full underline-none mt-3.5 cursor-pointer">
                Enviar
            </button>
        </form>
    );
};
