import React from 'react'
import { useUserList } from '../context/UserListContext'

// TODO: PARA QUE FUNCIONE ESTE COMPONENTE TIENE QUE ESTAR DENTRO DEL PROVIDER DE USER, SINO NO FUNCIONARÁ

export const ListUsers = () => {
    const { userList } = useUserList()
    
    return (
    <section className='flex-1 w-full flex flex-col gap-8'>
        <h2 className='text-center text-xl font-bold tracking-wider' >
            Lista de usuarios
        </h2>

        {userList.length === 0 
            ? <p className='text-center'>No hay usuarios por mostrar aun ...</p>
            : <article className='flex flex-col gap-4'>
                {userList.map((user) => 
                    <div key={user.id} className='w-full p-4 shadow-md rounded-2xl border border-gray-300' >
                        <p className='text-lg font-semibold'>Nombre: {user.nombre} {user.apellidos}</p>
                        <p className='text-gray-500'>Direcion: {user.direccion}</p>
                        <p className='text-gray-500'>{user.localidad}, {user.municipio}</p>
                    </div>
                )}
            </article>
        }

    </section>
  )
}