/**
 * @class Nodo para almacenar errores ya sean lexicos, sintacticos o semanticos
 */
export class Exception{
    type: String;
    description: String;
    line: Number;
    column: Number;

    /**
     * Devuelve un objeto con un nuevo objeto excepcion
     * @param type Tipo de error, e.g. (lexico, sintactico, semantico)
     * @param description Descripcion del error, e.g. (No se encontro la variable X)
     * @param line Fila donde ocurrio el error
     * @param column Columna donde ocurrio el error
     */
    constructor(type: String, description: String, line: Number, column: Number) {
        this.type = type;
        this.description = description;
        this.line = line;
        this.column = column;
    }

    toString(){
        return `${this.type} ${this.description} ${this.line} ${this.column}`;
    }
}