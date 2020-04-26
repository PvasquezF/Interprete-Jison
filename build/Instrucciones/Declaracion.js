"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Exception_1 = require("../utils/Exception");
const Simbol_1 = require("../Simbols/Simbol");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaracion extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type, identifier, value, line, column) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = value;
    }
    execute(table, tree) {
        const result = this.value.execute(table, tree);
        if (result instanceof Exception_1.Exception) {
            return result;
        }
        if (this.type.type != this.value.type.type) {
            const error = new Exception_1.Exception('Semantico', `No se puede declarar la variable porque los tipos no coinciden.`, this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let simbol;
        simbol = new Simbol_1.Simbol(this.type, this.identifier, result);
        const res = table.setVariable(simbol);
        if (res != null) {
            const error = new Exception_1.Exception('Semantico', res, this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
        }
        return null;
    }
}
exports.Declaracion = Declaracion;
