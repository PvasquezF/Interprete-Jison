import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Declaracion extends Node {
    type: Type;
    identifier: String;
    value: Node;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type: Type, identifier: String, value: Node, line: Number, column: Number) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = value;
    }

    execute(table: Table, tree: Tree) {
        const result = this.value.execute(table, tree);
        if (result instanceof Exception) {
            return result;
        }

        if (this.type.type != this.value.type.type) {
            const error = new Exception('Semantico',
                `No se puede declarar la variable porque los tipos no coinciden.`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }

        let simbol: Simbol;
        simbol = new Simbol(this.type, this.identifier, result);
        const res = table.setVariable(simbol);
        if (res != null) {
            const error = new Exception('Semantico',
                res,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
        }
        return null;
    }
}