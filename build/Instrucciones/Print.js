"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Type_1 = require("../utils/Type");
const Type_2 = require("../utils/Type");
/**
 * Permite imprimir expresiones en la consola
 */
class Print extends Node_1.Node {
    /**
     * @constructor Retorna el objeto Print
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(expression, line, column) {
        super(new Type_1.Type(Type_2.types.VOID), line, column);
        this.expression = expression;
    }
    execute(table, tree) {
        const value = this.expression.execute(table, tree);
        tree.console.push(value);
        return null;
    }
}
exports.Print = Print;
