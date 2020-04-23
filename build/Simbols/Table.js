"use strict";
/**
 * @class En esta clase es donde vamos a guardar y obtener las variables y funciones
 */
class Table {
    /**
     * @constructor Crea una nueva tabla
     * @param Previous Tabla anterior para manejar los ambitos
     */
    constructor(Previous) {
        this.Previous = Previous;
        this.Variables = new Map();
    }
    /**
     *
     * @method setVariable Almacena una variable, si ya existe arroja error
     * @param simbol Simbolo que contiene la informacion de la variable a almacenar
     */
    setVariable(simbol) {
        let env;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === simbol.identifier) {
                    return `La variable ${key} ya ha sido declarada.`;
                }
            }
        }
        return null;
    }
    /**
     *
     * @method getVariable Obtiene una variable dentro de la tabla de simbolos
     * @param identifier Nombre de la variable a obtener
     */
    getVariable(identifier) {
        let env;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === identifier) {
                    return env.Variables.get(key);
                }
            }
        }
        return null;
    }
}
