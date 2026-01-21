// Minimal Mermaid lexer grammar for diagram-as-code syntax highlighting
lexer grammar MermaidMini;

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
// DIAGRAM TYPE DECLARATIONS
// =====================================

// Flowchart/Graph
GRAPH: 'graph';
FLOWCHART: 'flowchart';
GRAPH_TD: 'TD' | 'TB';  // Top to Bottom
GRAPH_BT: 'BT';         // Bottom to Top
GRAPH_LR: 'LR';         // Left to Right
GRAPH_RL: 'RL';         // Right to Left

// Sequence Diagram
SEQUENCE_DIAGRAM: 'sequenceDiagram';
PARTICIPANT: 'participant';
ACTOR: 'actor';
ACTIVATE: 'activate';
DEACTIVATE: 'deactivate';
NOTE: 'Note';
LOOP: 'loop';
ALT: 'alt';
ELSE: 'else';
OPT: 'opt';
PAR: 'par';
AND: 'and';
CRITICAL: 'critical';
BREAK: 'break';
END: 'end';
AUTONUMBER: 'autonumber';

// Class Diagram
CLASS_DIAGRAM: 'classDiagram';
CLASS: 'class';
INTERFACE: '<<interface>>';
ABSTRACT: '<<abstract>>';
ENUMERATION: '<<enumeration>>';
NAMESPACE: 'namespace';

// State Diagram
STATE_DIAGRAM: 'stateDiagram' | 'stateDiagram-v2';
STATE: 'state';
START_STATE: '[*]';
CHOICE: '<<choice>>';
FORK: '<<fork>>';
JOIN: '<<join>>';

// Entity Relationship Diagram
ER_DIAGRAM: 'erDiagram';

// Gantt Chart
GANTT: 'gantt';
TITLE: 'title';
DATE_FORMAT: 'dateFormat';
SECTION: 'section';
EXCLUDES: 'excludes';
INCLUDES: 'includes';
TODAYMARKER: 'todayMarker';

// Pie Chart
PIE: 'pie';
SHOW_DATA: 'showData';

// User Journey
JOURNEY: 'journey';
TASK: 'task';

// Git Graph
GIT_GRAPH: 'gitGraph';
COMMIT: 'commit';
BRANCH: 'branch';
CHECKOUT: 'checkout';
MERGE: 'merge';
CHERRY_PICK: 'cherry-pick';

// Requirement Diagram
REQUIREMENT_DIAGRAM: 'requirementDiagram';
REQUIREMENT: 'requirement';
ELEMENT: 'element';
FUNCTIONAL_REQUIREMENT: 'functionalRequirement';
INTERFACE_REQUIREMENT: 'interfaceRequirement';
PERFORMANCE_REQUIREMENT: 'performanceRequirement';
PHYSICAL_REQUIREMENT: 'physicalRequirement';
DESIGN_CONSTRAINT: 'designConstraint';

// =====================================
// RELATIONSHIPS & ARROWS
// =====================================

// Flowchart arrows and connections
ARROW_SOLID: '-->';
ARROW_DOTTED: '-.->';
ARROW_THICK: '==>';
ARROW_OPEN: '---';
ARROW_DOTTED_OPEN: '-.-';
ARROW_THICK_OPEN: '===';
ARROW_CIRCLE: '--o';
ARROW_CROSS: '--x';
ARROW_BIDIRECTIONAL: '<-->';

// Sequence diagram arrows
SEQ_SOLID_ARROW: '->>';
SEQ_DOTTED_ARROW: '-->>';
SEQ_SOLID_LINE: '->';
SEQ_DOTTED_LINE: '-->';
SEQ_SOLID_CROSS: '-x';
SEQ_DOTTED_CROSS: '--x';
SEQ_SOLID_OPEN: '-)';
SEQ_DOTTED_OPEN: '--)';

// Class diagram relationships
INHERITANCE: '<|--';
COMPOSITION: '*--';
AGGREGATION: 'o--';
ASSOCIATION: '--';
DEPENDENCY: '..>';
REALIZATION: '..|>';
LINK: '--';

// ER diagram relationships
ER_ZERO_OR_ONE: '|o--';
ER_EXACTLY_ONE: '||--';
ER_ZERO_OR_MORE: '}o--';
ER_ONE_OR_MORE: '}|--';

// =====================================
// STYLING & CONFIGURATION
// =====================================

STYLE: 'style';
CLASS_DEF: 'classDef';
CLASS_ASSIGN: ':::';
LINK_STYLE: 'linkStyle';
CLICK: 'click';
CALLBACK: 'callback';
CALL: 'call';
HREF: 'href';

// Direction keywords
DIRECTION: 'direction';
TB: 'TB';
BT: 'BT';
LR: 'LR';
RL: 'RL';

// =====================================
// MODIFIERS & KEYWORDS
// =====================================

AS: 'as';
OVER: 'over';
LEFT_OF: 'left of';
RIGHT_OF: 'right of';
OVER_OF: 'over';

// Visibility modifiers
PUBLIC: '+';
PRIVATE: '-';
PROTECTED: '#';
INTERNAL: '~';

// =====================================
// NODE SHAPES (for flowcharts)
// =====================================

// These are defined by their delimiters
ROUND_EDGE_START: '(';
ROUND_EDGE_END: ')';
STADIUM_START: '([';
STADIUM_END: '])';
SUBROUTINE_START: '[[';
SUBROUTINE_END: ']]';
CYLINDER_START: '[(';
CYLINDER_END: ')]';
CIRCLE_START: '((';
CIRCLE_END: '))';
ASYMMETRIC_START: '>';
FLAG_START: '>]';
RHOMBUS_START: '{';
RHOMBUS_END: '}';
HEXAGON_START: '{{';
HEXAGON_END: '}}';
PARALLELOGRAM_START: '[/';
PARALLELOGRAM_END: '/]';
PARALLELOGRAM_ALT_START: '[\\';
PARALLELOGRAM_ALT_END: '\\]';
TRAPEZOID_START: '[/';
TRAPEZOID_END: '\\]';
DOUBLE_CIRCLE_START: '(((';
DOUBLE_CIRCLE_END: ')))';

// =====================================
// SUBGRAPHS
// =====================================

SUBGRAPH: 'subgraph';
END_SUBGRAPH: 'end';

// =====================================
// COLORS
// =====================================

HEX_COLOR: '#' [0-9A-Fa-f]{3,8};

// =====================================
// COMMENTS
// =====================================

COMMENT: '%%' ~[\r\n]*;

// =====================================
// LITERALS
// =====================================

STRING_DOUBLE: '"' (ESC | ~["\\\r\n])* '"';
STRING_SINGLE: '\'' (ESC | ~['\\\r\n])* '\'';
STRING_BACKTICK: '`' (~[`\r\n])* '`';
NUMBER: [0-9]+ ('.' [0-9]+)?;
DATE: [0-9]{4} '-' [0-9]{2} '-' [0-9]{2};

// =====================================
// OPERATORS & PUNCTUATION
// =====================================

COLON: ':';
SEMICOLON: ';';
COMMA: ',';
DOT: '.';
PIPE: '|';
AMPERSAND: '&';
QUESTION: '?';
EXCLAMATION: '!';
EQUALS: '=';

// =====================================
// IDENTIFIERS
// =====================================

// Allow hyphens in middle but not at the end to avoid consuming arrow prefixes
IDENTIFIER: [a-zA-Z_] ([a-zA-Z0-9_-]* [a-zA-Z0-9_])?;

// =====================================
// WHITESPACE
// =====================================

WS: [ \t\r\n]+;
NEWLINE: '\r'? '\n';

// =====================================
// FRAGMENTS
// =====================================

fragment ESC: '\\' [btnfr"'\\];
