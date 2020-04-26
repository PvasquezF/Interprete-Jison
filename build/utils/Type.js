"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types;
(function (types) {
    types[types["NUMERIC"] = 0] = "NUMERIC";
    types[types["STRING"] = 1] = "STRING";
    types[types["BOOLEAN"] = 2] = "BOOLEAN";
    types[types["VOID"] = 3] = "VOID";
})(types = exports.types || (exports.types = {}));
/**
 *
 * @class Permite llevar el control de los tipos del lenguaje
 */
class Type {
    /**
     *
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     *
     */
    constructor(type) {
        this.type = type;
    }
    toString() {
        if (this.type === types.BOOLEAN) {
            return 'boolean';
        }
        else if (this.type === types.NUMERIC) {
            return 'numeric';
        }
        else if (this.type === types.STRING) {
            return 'string';
        }
    }
}
exports.Type = Type;
