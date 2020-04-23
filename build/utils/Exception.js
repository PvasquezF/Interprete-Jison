"use strict";
/**
 * @class Nodo para almacenar errores ya sean lexicos, sintacticos o semanticos
 */
class Exception {
    /**
     * Devuelve un objeto con un nuevo objeto excepcion
     * @param type Tipo de error, e.g. (lexico, sintactico, semantico)
     * @param description Descripcion del error, e.g. (No se encontro la variable X)
     * @param line Fila donde ocurrio el error
     * @param column Columna donde ocurrio el error
     */
    constructor(type, description, line, column) {
        this.type = type;
        this.description = description;
        this.line = line;
        this.column = column;
    }
}
