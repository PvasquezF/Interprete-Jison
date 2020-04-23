import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class While extends Node {
    condition: Node;
    List: Array<Node>;

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column Columna de la sentencia while
     */
    constructor(condition: Node, List: Array<Node>, line: Number, column: Number) {
        super(null, line, column);
        this.condition = condition;
        this.List = List;
    }

    execute(table: Table, tree: Tree) {
        const newtable = new Table(table);
        let result: Node;
        do {
            result = this.condition.execute(newtable, tree);
            if (result instanceof Exception) {
                return result;
            }

            if (this.condition.type.type !== types.BOOLEAN) {
                const error = new Exception('Semantico',
                    `Se esperaba una expresion booleana para la condicion`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
            if (result) {
                for (let i = 0; i < this.List.length; i++) {
                    const res = this.List[i].execute(newtable, tree);
                    if (res instanceof Continue) {
                        break;
                    } else if (res instanceof Break) {
                        return;
                    }
                }
            }
        } while (result);
        return null;
    }
}