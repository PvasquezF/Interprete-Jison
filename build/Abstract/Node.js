"use strict";
class Node {
    /**
     *
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param type Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param line Linea de la instruccion o expresion
     * @param column Columna de la instruccion o expresion
     */
    constructor(type, line, column) {
        this.type = type;
        this.line = line;
        this.column = column;
    }
}
