"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Exception_1 = require("../utils/Exception");
/**
 * @class Nodo expresion identificador que obtendra el valor de una variable
 */
class Identificador extends Node_1.Node {
    /**
     * @constructor Retorna el objeto identificador creado
     * @param identifier nombre de la variable
     * @param line Linea del identificador
     * @param column Columna del identificador
     */
    constructor(identifier, line, column) {
        // tipo null porque aun no se el tipo
        super(null, line, column);
        this.identifier = identifier;
    }
    execute(table, tree) {
        let variable;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Exception_1.Exception('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        this.type = variable.type;
        return variable.value;
    }
}
exports.Identificador = Identificador;
