export enum types {
    NUMERIC,
    STRING,
    BOOLEAN,
    VOID
}

/**
 * 
 * @class Permite llevar el control de los tipos del lenguaje
 */
export class Type{
    type : types;

    /**
     * 
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     * 
     */
    constructor(type: types){
        this.type = type;
    }

    toString(){
        if(this.type === types.BOOLEAN){
            return 'boolean';
        }else if(this.type === types.NUMERIC){
            return 'numeric';
        }else if(this.type === types.STRING){
            return 'string';
        }
    }
}