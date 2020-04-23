"use strict";
/**
 * Permite imprimir expresiones en la consola
 */
class Print extends Node {
    /**
     * @constructor Retorna el objeto Print
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(expression, line, column) {
        super(new Type(types.VOID), line, column);
        this.expression = expression;
    }
    execute(table, tree) {
        const value = this.expression.execute(table, tree);
        console.log(value);
        return null;
    }
}
