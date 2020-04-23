"use strict";
var types;
(function (types) {
    types[types["NUMERIC"] = 0] = "NUMERIC";
    types[types["STRING"] = 1] = "STRING";
    types[types["BOOLEAN"] = 2] = "BOOLEAN";
    types[types["VOID"] = 3] = "VOID";
})(types || (types = {}));
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
}
