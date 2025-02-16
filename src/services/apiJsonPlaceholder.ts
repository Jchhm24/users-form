import { FormState, User } from "../interfaces/types";

export const createUser = async (user: FormState): Promise<User> => {
    if (!user) throw new Error("No se ha proporcionado un usuario");

    const camposRequeridos = [
        { campo: "nombre", valor: user.nombre },
        { campo: "apellidos", valor: user.apellidos },
        { campo: "direccion", valor: user.direccion },
        { campo: "localidad", valor: user.localidad },
        { campo: "municipio", valor: user.municipio },
    ];

    const campoVacio = camposRequeridos.find(
        ({ campo, valor }) => valor === ""
    );

    if (campoVacio) {
        console.error(`El campo ${campoVacio.campo} no puede estar vacío`);
        throw new Error(`El campo ${campoVacio.campo} no puede estar vacío`)
    }

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(user),
            }
        );

        if (!response.ok)
            throw new Error(
                `Error HTTP: ${response.status} - ${response.statusText}`
            );
        const data = await response.json();
        
        return data as User;
    } catch (error) {
        console.error("Error en la creación del usuario:", error);
        throw error;
    }
};
