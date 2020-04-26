"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Exception_1 = require("../utils/Exception");
const Type_1 = require("../utils/Type");
/**
 * @class Genera un nuevo nodo expresion para realizar operaciones logicas
 */
class Logic extends Node_1.Node {
    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param leftOperator Nodo expresion izquierdo
     * @param rightOperator Nodo expresion derecho
     * @param Operator Operador
     * @param line linea de la operacion
     * @param column columna de la operacion
     */
    constructor(leftOperator, rightOperator, Operator, line, column) {
        super(new Type_1.Type(Type_1.types.BOOLEAN), line, column);
        this.leftOperator = leftOperator;
        this.rightOperator = rightOperator;
        this.Operator = Operator;
    }
    execute(table, tree) {
        if (this.rightOperator !== null) {
            const LeftResult = this.leftOperator.execute(table, tree);
            if (LeftResult instanceof Exception_1.Exception) {
                return LeftResult;
            }
            const RightResult = this.rightOperator.execute(table, tree);
            if (RightResult instanceof Exception_1.Exception) {
                return RightResult;
            }
            if (this.Operator === '||') {
                if (this.leftOperator.type.type === Type_1.types.BOOLEAN && this.rightOperator.type.type === Type_1.types.BOOLEAN) {
                    return LeftResult || RightResult;
                }
                else {
                    const error = new Exception_1.Exception('Semantico', `Error de tipos en OR se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`, this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operator === '&&') {
                if (this.leftOperator.type.type === Type_1.types.BOOLEAN && this.rightOperator.type.type === Type_1.types.BOOLEAN) {
                    return LeftResult > RightResult;
                }
                else {
                    const error = new Exception_1.Exception('Semantico', `Error de tipos en AND se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`, this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new Exception_1.Exception('Semantico', `Error, Operador desconocido`, this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
        else {
            const LeftResult = this.leftOperator.execute(table, tree);
            if (LeftResult instanceof Exception_1.Exception) {
                return LeftResult;
            }
            if (this.Operator === '!') {
                if (this.leftOperator.type.type === Type_1.types.BOOLEAN) {
                    return !LeftResult;
                }
                else {
                    const error = new Exception_1.Exception('Semantico', `Error de tipos en el operador not se esta tratando de operar ${this.leftOperator.type.type}`, this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new Exception_1.Exception('Semantico', `Error, Operador desconocido`, this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
    }
}
exports.Logic = Logic;
