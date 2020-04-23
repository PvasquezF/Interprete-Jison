import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";

/**
 * @class Genera un nuevo nodo expresion para realizar operaciones aritmeticas
 */
export class Arithmetic extends Node {
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
        // Envio null porque aun no se el tipo de la operación
        super(null, line, column);
        this.leftOperator = leftOperator;
        this.rightOperator = rightOperator;
        this.Operator = Operator;
    }

    execute(table: Table, tree: Tree) {
        if (this.rightOperator !== null) {
            const LeftResult = this.leftOperator.execute(table, tree);
            if (LeftResult instanceof Exception) {
                return LeftResult;
            }
            const RightResult = this.rightOperator.execute(table, tree);
            if (RightResult instanceof Exception) {
                return RightResult;
            }

            if (this.Operator === '+') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    return LeftResult + RightResult;
                } else if (this.leftOperator.type.type === types.STRING || this.rightOperator.type.type === types.STRING) {
                    this.type = new Type(types.STRING);
                    return LeftResult + RightResult;
                } else {
                    const error = new Exception('Semantico',
                        `Error de tipos en la suma se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            } else if (this.Operator === '-') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    return LeftResult - RightResult;
                } else {
                    console.log(this.leftOperator)
                    const error = new Exception('Semantico',
                        `Error de tipos en la resta se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            } else if (this.Operator === '*') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    return LeftResult * RightResult;
                } else {
                    const error = new Exception('Semantico',
                        `Error de tipos en la multiplicacion se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            } else if (this.Operator === '/') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    if (RightResult === 0) {
                        const error = new Exception('Semantico',
                            `Error aritmetico, La division con cero no esta permitida`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    return LeftResult / RightResult;
                } else {
                    const error = new Exception('Semantico',
                        `Error de tipos en la division se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
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
        } else {
            const LeftResult = this.leftOperator.execute(table, tree);
            if (LeftResult instanceof Exception) {
                return LeftResult;
            }
            if (this.Operator === '-') {
                if (this.leftOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    return -1*LeftResult;
                } else {
                    const error = new Exception('Semantico',
                        `Error de tipos en el operador unario se esta tratando de operar ${this.leftOperator.type.type}`,
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
}