import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utils/Type";
import {types} from "../utils/Type";
export abstract class Node {
    line: Number;
    column: Number;
    type: Type;

    /**
     * @abstract Metodo que sirver para ejecutar una instruccion o expresion
     * si fuera instruccion devuelve nulo y si fuera expresion devuelve un valor
     */
    abstract execute(table: Table, tree: Tree): any;
 
    /**
     * 
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param type Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param line Linea de la instruccion o expresion
     * @param column Columna de la instruccion o expresion
     */
    constructor(type: Type, line: Number, column: Number) {
        this.type = type;
        this.line = line;
        this.column = column;
    }
}