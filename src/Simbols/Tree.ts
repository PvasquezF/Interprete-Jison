import {Node} from "../Abstract/Node";
import {Exception} from "../utils/Exception";
/**
 * @class Almacena el ast y ademas la lista de excepciones
 */
export class Tree {
    instructions: Array<Node>
    excepciones: Array<Exception>
    console: Array<String>

    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instructions AST generado por la gramatica
     */
    constructor(instructions: Array<Node>) {
        this.instructions = instructions;
        this.excepciones = new Array<Exception>();
        this.console = new Array<String>();
    }
}