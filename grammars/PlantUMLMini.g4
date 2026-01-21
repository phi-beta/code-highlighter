// Minimal PlantUML lexer grammar for diagram-as-code syntax highlighting
lexer grammar PlantUMLMini;

// =====================================
// UNIVERSAL BRACKETS (ALWAYS REQUIRED)
// =====================================
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';

// =====================================
// PLANTUML DIAGRAM DIRECTIVES
// =====================================

// Start/End markers
START_UML: '@startuml';
END_UML: '@enduml';
START_SALT: '@startsalt';
END_SALT: '@endsalt';
START_DITAA: '@startditaa';
END_DITAA: '@endditaa';
START_DOT: '@startdot';
END_DOT: '@enddot';
START_MINDMAP: '@startmindmap';
END_MINDMAP: '@endmindmap';
START_WBS: '@startwbs';
END_WBS: '@endwbs';
START_GANTT: '@startgantt';
END_GANTT: '@endgantt';
START_JSON: '@startjson';
END_JSON: '@endjson';
START_YAML: '@startyaml';
END_YAML: '@endyaml';

// =====================================
// DIAGRAM TYPE KEYWORDS
// =====================================

// Sequence Diagram
PARTICIPANT: 'participant';
ACTOR: 'actor';
BOUNDARY: 'boundary';
CONTROL: 'control';
ENTITY: 'entity';
DATABASE: 'database';
COLLECTIONS: 'collections';
QUEUE: 'queue';
ACTIVATE: 'activate';
DEACTIVATE: 'deactivate';
AUTONUMBER: 'autonumber';

// Class Diagram
CLASS: 'class';
INTERFACE: 'interface';
ABSTRACT: 'abstract';
ENUM: 'enum';
PACKAGE: 'package';
NAMESPACE: 'namespace';
EXTENDS: 'extends';
IMPLEMENTS: 'implements';

// Component Diagram
COMPONENT: 'component';
NODE: 'node';
CLOUD: 'cloud';
FRAME: 'frame';
RECTANGLE: 'rectangle';
STORAGE: 'storage';
ARTIFACT: 'artifact';

// State Diagram
STATE: 'state';
START: '[*]';
CHOICE: '<<choice>>';
FORK: '<<fork>>';
JOIN: '<<join>>';

// Use Case
USECASE: 'usecase';

// Activity Diagram
START_ACTIVITY: 'start';
STOP: 'stop';
END: 'end';
IF: 'if';
THEN: 'then';
ELSE: 'else';
ELSEIF: 'elseif';
ENDIF: 'endif';
WHILE: 'while';
ENDWHILE: 'endwhile';
REPEAT: 'repeat';
BACKWARD: 'backward';
FORK_AGAIN: 'fork again';
END_FORK: 'end fork';

// =====================================
// MODIFIERS & STEREOTYPES
// =====================================

STEREOTYPE: '<<' [a-zA-Z_]+ '>>';
VISIBILITY: [+#\-~];

// =====================================
// RELATIONSHIPS & ARROWS
// =====================================

// Sequence diagram arrows
ARROW_RIGHT: '->';
ARROW_LEFT: '<-';
ARROW_BOTH: '<->';
ARROW_ASYNC: '-->>';
ARROW_RETURN: '-->';
ARROW_LOST: '->';
ARROW_SHORT: '-';
ARROW_DOTTED: '..>';

// Class/Component relationships  
EXTENSION: '<|--';
COMPOSITION: '*--';
AGGREGATION: 'o--';
DEPENDENCY: '<..';
REALIZATION: '<|..';
ASSOCIATION: '--';

// =====================================
// STYLING & SKINPARAM
// =====================================

SKINPARAM: 'skinparam';
STYLE: 'style';
TITLE: 'title';
HEADER: 'header';
FOOTER: 'footer';
LEGEND: 'legend';
END_LEGEND: 'endlegend';
NOTE: 'note';
AS: 'as';
OVER: 'over';
LEFT: 'left';
RIGHT: 'right';
TOP: 'top';
BOTTOM: 'bottom';

// =====================================
// COLORS & ATTRIBUTES
// =====================================

HEX_COLOR: '#' [0-9A-Fa-f]{3,8};
COLOR_NAME: ('AliceBlue'|'AntiqueWhite'|'Aqua'|'Aquamarine'|'Azure'|'Beige'|'Bisque'|'Black'|'BlanchedAlmond'|'Blue'|'BlueViolet'|'Brown'|'BurlyWood'|'CadetBlue'|'Chartreuse'|'Chocolate'|'Coral'|'CornflowerBlue'|'Cornsilk'|'Crimson'|'Cyan'|'DarkBlue'|'DarkCyan'|'DarkGoldenRod'|'DarkGray'|'DarkGreen'|'DarkKhaki'|'DarkMagenta'|'DarkOliveGreen'|'DarkOrange'|'DarkOrchid'|'DarkRed'|'DarkSalmon'|'DarkSeaGreen'|'DarkSlateBlue'|'DarkSlateGray'|'DarkTurquoise'|'DarkViolet'|'DeepPink'|'DeepSkyBlue'|'DimGray'|'DodgerBlue'|'FireBrick'|'FloralWhite'|'ForestGreen'|'Fuchsia'|'Gainsboro'|'GhostWhite'|'Gold'|'GoldenRod'|'Gray'|'Green'|'GreenYellow'|'HoneyDew'|'HotPink'|'IndianRed'|'Indigo'|'Ivory'|'Khaki'|'Lavender'|'LavenderBlush'|'LawnGreen'|'LemonChiffon'|'LightBlue'|'LightCoral'|'LightCyan'|'LightGoldenRodYellow'|'LightGray'|'LightGreen'|'LightPink'|'LightSalmon'|'LightSeaGreen'|'LightSkyBlue'|'LightSlateGray'|'LightSteelBlue'|'LightYellow'|'Lime'|'LimeGreen'|'Linen'|'Magenta'|'Maroon'|'MediumAquaMarine'|'MediumBlue'|'MediumOrchid'|'MediumPurple'|'MediumSeaGreen'|'MediumSlateBlue'|'MediumSpringGreen'|'MediumTurquoise'|'MediumVioletRed'|'MidnightBlue'|'MintCream'|'MistyRose'|'Moccasin'|'NavajoWhite'|'Navy'|'OldLace'|'Olive'|'OliveDrab'|'Orange'|'OrangeRed'|'Orchid'|'PaleGoldenRod'|'PaleGreen'|'PaleTurquoise'|'PaleVioletRed'|'PapayaWhip'|'PeachPuff'|'Peru'|'Pink'|'Plum'|'PowderBlue'|'Purple'|'Red'|'RosyBrown'|'RoyalBlue'|'SaddleBrown'|'Salmon'|'SandyBrown'|'SeaGreen'|'SeaShell'|'Sienna'|'Silver'|'SkyBlue'|'SlateBlue'|'SlateGray'|'Snow'|'SpringGreen'|'SteelBlue'|'Tan'|'Teal'|'Thistle'|'Tomato'|'Turquoise'|'Violet'|'Wheat'|'White'|'WhiteSmoke'|'Yellow'|'YellowGreen');

// =====================================
// COMMENTS
// =====================================

COMMENT_LINE: '\'' ~[\r\n]*;
COMMENT_BLOCK: '/\'' .*? '\'/';
COMMENT_MULTILINE: '/' '\'' .*? '\'' '/';

// =====================================
// LITERALS
// =====================================

STRING_DOUBLE: '"' (ESC | ~["\\\r\n])* '"';
NUMBER: [0-9]+ ('.' [0-9]+)?;

// =====================================
// OPERATORS & PUNCTUATION  
// =====================================

COLON: ':';
SEMICOLON: ';';
COMMA: ',';
DOT: '.';
EQUALS: '=';
PIPE: '|';
AT: '@';
HASH: '#';

// =====================================
// IDENTIFIERS
// =====================================

IDENTIFIER: [a-zA-Z_] [a-zA-Z0-9_]*;

// =====================================
// WHITESPACE
// =====================================

WS: [ \t\r\n]+;
NEWLINE: '\r'? '\n';

// =====================================
// FRAGMENTS
// =====================================

fragment ESC: '\\' [btnfr"'\\];
