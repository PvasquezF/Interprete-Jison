import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";

/**
 * @class Genera un nuevo nodo expresion para realizar operaciones relacionales
 */
export class Relational extends Node {
    leftOperator: Node;
    rightOperator: Node;
    Operator: String;

    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param leftOperator Nodo expresion izquierdo
     * @param rightOperator Nodo expresion derecho
     * @param Operator Operador
     * @param line linea de la operacion
     * @param column columna de la operacion
     */
    constructor(leftOperator: Node, rightOperator: Node, Operator: String, line: Number, column: Number) {
        super(new Type(types.BOOLEAN), line, column);
        this.leftOperator = leftOperator;
        this.rightOperator = rightOperator;
        this.Operator = Operator;
    }

    execute(table: Table, tree: Tree) {
        const LeftResult = this.leftOperator.execute(table, tree);
        if (LeftResult instanceof Exception) {
            return LeftResult;
        }
        const RightResult = this.rightOperator.execute(table, tree);
        if (RightResult instanceof Exception) {
            return RightResult;
        }

        if (this.Operator === '<') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult < RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MENOR QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '>') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult > RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MAYOR QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '>=') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult >= RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MAYOR IGUAL se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '<=') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult <= RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MENOR IGUAL se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '!=') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult != RightResult;
            } else if (this.leftOperator.type.type === types.STRING && this.rightOperator.type.type === types.STRING) {
                return LeftResult != RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en DIFERENTE QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '==') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult == RightResult;
            } else if (this.leftOperator.type.type === types.STRING && this.rightOperator.type.type === types.STRING) {
                return LeftResult == RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en IGUAL IGUAL se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else {
            const error = new Exception('Semantico',
                `Error, Operador desconocido`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
    }
}