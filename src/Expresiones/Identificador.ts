import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Simbol } from "../Simbols/Simbol";
import { Exception } from "../utils/Exception";

/**
 * @class Nodo expresion identificador que obtendra el valor de una variable
 */
export class Identificador extends Node {
    identifier: String;
    /**
     * @constructor Retorna el objeto identificador creado
     * @param identifier nombre de la variable
     * @param line Linea del identificador
     * @param column Columna del identificador
     */
    constructor(identifier: String, line: Number, column: Number) {
        // tipo null porque aun no se el tipo
        super(null, line, column);
        this.identifier = identifier;
    }

    execute(table: Table, tree: Tree) {
        let variable: Simbol;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Exception('Semantico',
                'No se ha encontrado la variable ' + this.identifier,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        this.type = variable.type;
        return variable.value;
    }
}