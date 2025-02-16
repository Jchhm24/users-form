export interface Archivo {
    name: string;
    download_url: string;
}

export interface Localidad {
    clave: string;
    nombre: string;
}

export interface Municipio {
    clave: string;
    nombre: string;
}

export interface User{
    id:number
    nombre:string
    apellidos:string
    direccion:string
    localidad:string
    municipio:string
}

export interface FormState{
    nombre:string
    apellidos:string
    direccion:string
    localidad:string
    municipio:string
}