// Minimal CSS lexer grammar (simplified)
lexer grammar CSSMini;

// CSS Keywords and Values
KEYWORD: ('important'|'inherit'|'initial'|'unset'|'revert'|'auto'|'none'|'normal'|'all');

// CSS Functions (common ones) - match the function name only
FUNCTION: ('url'|'calc'|'var'|'rgb'|'rgba'|'hsl'|'hsla'|'linear-gradient'|'radial-gradient'|'repeat-linear-gradient'|'repeat-radial-gradient'|'matrix'|'translate'|'scale'|'rotate'|'skew'|'translateX'|'translateY'|'scaleX'|'scaleY'|'rotateX'|'rotateY'|'rotateZ'|'translate3d'|'scale3d'|'rotate3d'|'perspective'|'blur'|'brightness'|'contrast'|'drop-shadow'|'grayscale'|'hue-rotate'|'invert'|'opacity'|'saturate'|'sepia');

// Comments
COMMENT_BLOCK: '/*' .*? '*/';

// Strings
STRING_DOUBLE: '"' (ESC | ~["\\\r\n])* '"';
STRING_SINGLE: '\'' (ESC | ~['\\\r\n])* '\'';

// URLs (special case)
URL: 'url(' WS* (STRING_DOUBLE | STRING_SINGLE | ~[)]+) WS* ')';

// Colors
HEX_COLOR: '#' [0-9A-Fa-f]+ ;
NAMED_COLOR: ('aliceblue'|'antiquewhite'|'aqua'|'aquamarine'|'azure'|'beige'|'bisque'|'black'|'blanchedalmond'|'blue'|'blueviolet'|'brown'|'burlywood'|'cadetblue'|'chartreuse'|'chocolate'|'coral'|'cornflowerblue'|'cornsilk'|'crimson'|'cyan'|'darkblue'|'darkcyan'|'darkgoldenrod'|'darkgray'|'darkgreen'|'darkkhaki'|'darkmagenta'|'darkolivegreen'|'darkorange'|'darkorchid'|'darkred'|'darksalmon'|'darkseagreen'|'darkslateblue'|'darkslategray'|'darkturquoise'|'darkviolet'|'deeppink'|'deepskyblue'|'dimgray'|'dodgerblue'|'firebrick'|'floralwhite'|'forestgreen'|'fuchsia'|'gainsboro'|'ghostwhite'|'gold'|'goldenrod'|'gray'|'green'|'greenyellow'|'honeydew'|'hotpink'|'indianred'|'indigo'|'ivory'|'khaki'|'lavender'|'lavenderblush'|'lawngreen'|'lemonchiffon'|'lightblue'|'lightcoral'|'lightcyan'|'lightgoldenrodyellow'|'lightgray'|'lightgreen'|'lightpink'|'lightsalmon'|'lightseagreen'|'lightskyblue'|'lightslategray'|'lightsteelblue'|'lightyellow'|'lime'|'limegreen'|'linen'|'magenta'|'maroon'|'mediumaquamarine'|'mediumblue'|'mediumorchid'|'mediumpurple'|'mediumseagreen'|'mediumslateblue'|'mediumspringgreen'|'mediumturquoise'|'mediumvioletred'|'midnightblue'|'mintcream'|'mistyrose'|'moccasin'|'navajowhite'|'navy'|'oldlace'|'olive'|'olivedrab'|'orange'|'orangered'|'orchid'|'palegoldenrod'|'palegreen'|'paleturquoise'|'palevioletred'|'papayawhip'|'peachpuff'|'peru'|'pink'|'plum'|'powderblue'|'purple'|'red'|'rosybrown'|'royalblue'|'saddlebrown'|'salmon'|'sandybrown'|'seagreen'|'seashell'|'sienna'|'silver'|'skyblue'|'slateblue'|'slategray'|'snow'|'springgreen'|'steelblue'|'tan'|'teal'|'thistle'|'tomato'|'turquoise'|'violet'|'wheat'|'white'|'whitesmoke'|'yellow'|'yellowgreen'|'transparent');

// Numbers and units
NUMBER: DIGIT+ ('.' DIGIT+)?;
UNIT: NUMBER ('px'|'em'|'rem'|'ex'|'ch'|'vw'|'vh'|'vmin'|'vmax'|'%'|'cm'|'mm'|'in'|'pt'|'pc'|'deg'|'grad'|'rad'|'turn'|'s'|'ms'|'Hz'|'kHz'|'dpi'|'dpcm'|'dppx'|'fr');
PERCENTAGE: NUMBER '%';

// At-rules
AT_RULE: '@' [a-zA-Z-]+ ;

// Selectors
CLASS_SELECTOR: '.' [a-zA-Z_-] [a-zA-Z0-9_-]* ;
ID_SELECTOR: '#' [a-zA-Z_-] [a-zA-Z0-9_-]* ;
PSEUDO_CLASS: ':' [a-zA-Z_-] [a-zA-Z0-9_-]* ('(' ~[)]* ')')?;
PSEUDO_ELEMENT: '::' [a-zA-Z_-] [a-zA-Z0-9_-]* ;

// Properties (common CSS properties) - includes the colon
PROPERTY: ('color'|'background'|'background-color'|'background-image'|'background-position'|'background-repeat'|'background-size'|'background-attachment'|'border'|'border-color'|'border-style'|'border-width'|'border-radius'|'border-top'|'border-right'|'border-bottom'|'border-left'|'margin'|'margin-top'|'margin-right'|'margin-bottom'|'margin-left'|'padding'|'padding-top'|'padding-right'|'padding-bottom'|'padding-left'|'width'|'height'|'min-width'|'min-height'|'max-width'|'max-height'|'display'|'position'|'top'|'right'|'bottom'|'left'|'float'|'clear'|'overflow'|'overflow-x'|'overflow-y'|'visibility'|'opacity'|'z-index'|'font'|'font-family'|'font-size'|'font-weight'|'font-style'|'font-variant'|'line-height'|'text-align'|'text-decoration'|'text-transform'|'text-indent'|'letter-spacing'|'word-spacing'|'white-space'|'vertical-align'|'list-style'|'list-style-type'|'list-style-position'|'list-style-image'|'table-layout'|'border-collapse'|'border-spacing'|'caption-side'|'empty-cells'|'cursor'|'outline'|'outline-color'|'outline-style'|'outline-width'|'content'|'quotes'|'counter-reset'|'counter-increment'|'box-shadow'|'text-shadow'|'transform'|'transform-origin'|'transition'|'transition-property'|'transition-duration'|'transition-timing-function'|'transition-delay'|'animation'|'animation-name'|'animation-duration'|'animation-timing-function'|'animation-delay'|'animation-iteration-count'|'animation-direction'|'animation-fill-mode'|'animation-play-state'|'flex'|'flex-direction'|'flex-wrap'|'flex-flow'|'justify-content'|'align-items'|'align-content'|'order'|'flex-grow'|'flex-shrink'|'flex-basis'|'align-self'|'grid'|'grid-template'|'grid-template-areas'|'grid-template-rows'|'grid-template-columns'|'grid-area'|'grid-row'|'grid-column'|'grid-gap'|'grid-row-gap'|'grid-column-gap'|'box-sizing'|'gap') ':';

// CSS Custom Properties (variables) - includes the colon
CUSTOM_PROPERTY: '--' [a-zA-Z0-9_-]+ ':';

// Identifiers and element names
IDENTIFIER: [a-zA-Z_-] [a-zA-Z0-9_-]* ;
ELEMENT: [a-zA-Z] [a-zA-Z0-9]* ;

// Important declaration
IMPORTANT: '!' WS* 'important';

// Punctuation and brackets
LPAREN: '(';
RPAREN: ')';
PUNCT: [{}[];,>+~*="'];

// Whitespace
WS: [ \t\r\n]+ ;

fragment DIGIT: [0-9];
fragment ESC: '\\' . ;
