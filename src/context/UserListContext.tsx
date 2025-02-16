import React, { createContext, useContext, useState } from "react";
import { User } from "../interfaces/types";

// Definimos el contexto de la lista de usuarios
interface UserListContextType {
    userList: User[];
    addUser: (user: User) => void;
}

// Creamos el contexto
const userContext = createContext<UserListContextType | undefined>(undefined);

// Props para el provider
interface UserListProviderProps {
    children: React.ReactNode;
}

export const UserListContext = ({ children }: UserListProviderProps) => {
    
    const [userList, setUserList] = useState<User[]>([]);

    const addUser = (user: User) => {

        // Como todas las ids que nos llega de la API es 101, dentremos que hacer que incremente para las key de la lista
        user.id = userList.length + user.id
    
        setUserList(prevList => [...prevList, user]);
        //console.table(userList);
    };

    return (
        <userContext.Provider value={{userList, addUser}}>
            {children}
        </userContext.Provider>
    );
};

// Hook para consumir el contexto
export const useUserList = () => {
    const context = useContext(userContext)
    if (!context) {
        throw new Error("useUserList debe ser usado dentro de un UserListProvider");
    }

    return context
}