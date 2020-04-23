%{
    const {Primitive} = require('../Expresiones/Primitive');
    const {Arithmetic} = require('../Expresiones/Arithmetic');
    const {Relational} = require('../Expresiones/Relational');
    const {Continue} = require('../Expresiones/Continue');
    const {Break} = require('../Expresiones/Break');
    const {Logic} = require('../Expresiones/Logic');
    const {Identificador} = require('../Expresiones/Identificador');
    const {Print} = require('../Instrucciones/Print');
    const {If} = require('../Instrucciones/If');
    const {While} = require('../Instrucciones/While');
    const {Declaracion} = require('../Instrucciones/Declaracion');
    const {Asignacion} = require('../Instrucciones/Asignacion');
    const {Excepcion} = require('../utils/Exception');
    const {Type, types} = require('../utils/Type');
    const {Tree} = require('../Simbols/Tree');
%}
%lex
%options case-insensitive
entero [0-9]+
decimal {entero}("."{entero})?
stringliteral (\"[^"]*\")
identifier ([a-zA-Z_])[a-zA-Z0-9_]*
%%

\s+                   /* skip whitespace */

{decimal}             return 'decimal' 
{stringliteral}       return 'STRING_LITERAL'
"*"                   return '*'
"/"                   return '/'
";"                   return ';'
"-"                   return '-'
"+"                   return '+'
"*"                   return '*'

"<"                   return '<'
">"                   return '>'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='

"("                   return '('
")"                   return ')'  
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
"true"                return 'true'
"false"               return 'false'
"print"               return 'print'
"if"                  return 'if'
"else"                return 'else'
"break"               return 'break'
"continue"            return 'continue'
"while"               return 'while'
"numeric"             return 'numeric'
"string"              return 'string'
"boolean"             return 'boolean'
{identifier}          return 'identifier'
<<EOF>>	          return 'EOF'

/lex
%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%right '!'
%left UMENOS

%start INICIO

%%

INICIO : INSTRUCCIONES EOF {$$ = new Tree($1); return $$;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = $1; $$.push($2); }
              | INSTRUCCION               { $$ = [$1]; }
              ;

INSTRUCCION : PRINT {$$ = $1;}
            | IF {$$ = $1;}
            | WHILE {$$ = $1;}
            | DECLARACION {$$ = $1;}
            | ASIGNACION {$$ = $1;}
            | 'continue' ';' {$$ = new Continue(_$.first_line, _$.first_column)}
            | 'break' ';' {$$ = new Break(_$.first_line, _$.first_column)}
            ;


DECLARACION : TIPO identifier '=' EXPRESION ';' {$$ = new Declaracion($1, $2, $4, _$.first_line, _$.first_column);}
            ;

ASIGNACION : identifier '=' EXPRESION ';' {$$ = new Asignacion($1, $3, _$.first_line, _$.first_column);}
           ;

TIPO : 'numeric' {$$ = new Type(types.NUMERIC);}
     | 'string' {$$ = new Type(types.STRING);}
     | 'boolean' {$$ = new Type(types.BOOLEAN);}
     ;

PRINT : 'print' '(' EXPRESION ')' ';' { $$ = new Print($3, _$.first_line, _$.first_column);}
      ;

IF : 'if' CONDICION BLOQUE_INSTRUCCIONES {$$ = new If($2, $3, [], _$.first_line, _$.first_column);}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' BLOQUE_INSTRUCCIONES {$$ = new If($2, $3, $5, _$.first_line, _$.first_column);}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' IF {$$ = new If($2, $3, [$5], _$.first_line, _$.first_column);}
   ;


WHILE : 'while' CONDICION BLOQUE_INSTRUCCIONES {$$ = new While($2, $3, _$.first_line, _$.first_column);}
      ;

BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = $2;}
                     | '{' '}' {$$ = [];}
                     ;


CONDICION : '(' EXPRESION ')' {$$ = $2;}
          ;
      
EXPRESION : '-' EXPRESION %prec UMENOS	    { $$ = new Arithmetic($1, null, '-', _$.first_line, _$.first_column); }
          | '!' EXPRESION	                { $$ = new Arithmetic($1, null, '!', _$.first_line, _$.first_column); }
          | EXPRESION '+' EXPRESION		    { $$ = new Arithmetic($1, $3, '+', _$.first_line, _$.first_column); }
          | EXPRESION '-' EXPRESION		    { $$ = new Arithmetic($1, $3, '-', _$.first_line, _$.first_column); }
          | EXPRESION '*' EXPRESION		    { $$ = new Arithmetic($1, $3, '*', _$.first_line, _$.first_column); }
          | EXPRESION '/' EXPRESION	          { $$ = new Arithmetic($1, $3, '/', _$.first_line, _$.first_column); }
          | EXPRESION '<' EXPRESION		    { $$ = new Relational($1, $3, '<', _$.first_line, _$.first_column); }
          | EXPRESION '>' EXPRESION		    { $$ = new Relational($1, $3, '>', _$.first_line, _$.first_column); }
          | EXPRESION '>=' EXPRESION	    { $$ = new Relational($1, $3, '>=', _$.first_line, _$.first_column); }
          | EXPRESION '<=' EXPRESION	    { $$ = new Relational($1, $3, '<=', _$.first_line, _$.first_column); }
          | EXPRESION '==' EXPRESION	    { $$ = new Relational($1, $3, '==', _$.first_line, _$.first_column); }
          | EXPRESION '!=' EXPRESION	    { $$ = new Relational($1, $3, '!=', _$.first_line, _$.first_column); }
          | EXPRESION '||' EXPRESION	    { $$ = new Logic($1, $3, '&&', _$.first_line, _$.first_column); }
          | EXPRESION '&&' EXPRESION	    { $$ = new Logic($1, $3, '||', _$.first_line, _$.first_column); }
          | 'decimal'				    { $$ = new Primitive(new Type(types.NUMERIC), Number($1), _$.first_line, _$.first_column); }
          | 'true'				    { $$ = new Primitive(new Type(types.BOOLEAN), true, _$.first_line, _$.first_column); }
          | 'false'				    { $$ = new Primitive(new Type(types.BOOLEAN), false, _$.first_line, _$.first_column); }
          | STRING_LITERAL			    { $$ = new Primitive(new Type(types.STRING), $1.replace(/\"/g,""), _$.first_line, _$.first_column); }
          | identifier			          { $$ = new Identificador($1, _$.first_line, _$.first_column); }
          | '(' EXPRESION ')'		          { $$ = $2; }
          ;
