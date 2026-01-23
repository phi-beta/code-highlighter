lexer grammar SVGMini;

// SVG/XML Declaration
XML_DECLARATION: '<?xml' .*? '?>';
DOCTYPE: '<!DOCTYPE' .*? '>';

// Comments
COMMENT: '<!--' .*? '-->';

// CDATA
CDATA: '<![CDATA[' .*? ']]>';

// Processing Instructions
PROCESSING_INSTRUCTION: '<?' ~[xX] .*? '?>';

// Opening tags - SVG shape elements
TAG_OPEN_SVG: '<svg';
TAG_OPEN_RECT: '<rect';
TAG_OPEN_CIRCLE: '<circle';
TAG_OPEN_ELLIPSE: '<ellipse';
TAG_OPEN_LINE: '<line';
TAG_OPEN_POLYLINE: '<polyline';
TAG_OPEN_POLYGON: '<polygon';
TAG_OPEN_PATH: '<path';

// Opening tags - SVG text elements
TAG_OPEN_TEXT: '<text';
TAG_OPEN_TSPAN: '<tspan';
TAG_OPEN_TEXTPATH: '<textPath';

// Opening tags - SVG container elements
TAG_OPEN_G: '<g';
TAG_OPEN_DEFS: '<defs';
TAG_OPEN_SYMBOL: '<symbol';
TAG_OPEN_USE: '<use';
TAG_OPEN_MARKER: '<marker';

// Opening tags - SVG gradient and pattern elements
TAG_OPEN_LINEAR_GRADIENT: '<linearGradient';
TAG_OPEN_RADIAL_GRADIENT: '<radialGradient';
TAG_OPEN_STOP: '<stop';
TAG_OPEN_PATTERN: '<pattern';

// Opening tags - SVG filter elements
TAG_OPEN_FILTER: '<filter';
TAG_OPEN_FE_GAUSSIAN_BLUR: '<feGaussianBlur';
TAG_OPEN_FE_OFFSET: '<feOffset';
TAG_OPEN_FE_BLEND: '<feBlend';
TAG_OPEN_FE_COLOR_MATRIX: '<feColorMatrix';
TAG_OPEN_FE_COMPONENT_TRANSFER: '<feComponentTransfer';
TAG_OPEN_FE_COMPOSITE: '<feComposite';
TAG_OPEN_FE_MORPH: '<feMorphology';
TAG_OPEN_FE_FLOOD: '<feFlood';
TAG_OPEN_FE_MERGE: '<feMerge';
TAG_OPEN_FE_MERGE_NODE: '<feMergeNode';

// Opening tags - SVG clipping and masking
TAG_OPEN_CLIPPATH: '<clipPath';
TAG_OPEN_MASK: '<mask';

// Opening tags - SVG animation
TAG_OPEN_ANIMATE: '<animate';
TAG_OPEN_ANIMATE_TRANSFORM: '<animateTransform';
TAG_OPEN_ANIMATE_MOTION: '<animateMotion';
TAG_OPEN_SET: '<set';

// Opening tags - SVG other elements
TAG_OPEN_IMAGE: '<image';
TAG_OPEN_A: '<a';
TAG_OPEN_TITLE: '<title';
TAG_OPEN_DESC: '<desc';
TAG_OPEN_STYLE: '<style';
TAG_OPEN_SCRIPT: '<script';
TAG_OPEN_METADATA: '<metadata';
TAG_OPEN_FOREIGN_OBJECT: '<foreignObject';

// Generic opening tag (fallback for any tag not specifically listed)
TAG_OPEN_GENERIC: '<' [a-zA-Z_:][-a-zA-Z0-9._:]*;

// Closing tags
TAG_CLOSE: '</' [a-zA-Z_:][-a-zA-Z0-9._:]* '>';

// Self-closing tag end
SELF_CLOSING: '/>';

// Tag end
TAG_END: '>';

// SVG-specific attributes (common ones)
ATTR_X: 'x' [ \t]* '=';
ATTR_Y: 'y' [ \t]* '=';
ATTR_WIDTH: 'width' [ \t]* '=';
ATTR_HEIGHT: 'height' [ \t]* '=';
ATTR_CX: 'cx' [ \t]* '=';
ATTR_CY: 'cy' [ \t]* '=';
ATTR_R: 'r' [ \t]* '=';
ATTR_RX: 'rx' [ \t]* '=';
ATTR_RY: 'ry' [ \t]* '=';
ATTR_X1: 'x1' [ \t]* '=';
ATTR_Y1: 'y1' [ \t]* '=';
ATTR_X2: 'x2' [ \t]* '=';
ATTR_Y2: 'y2' [ \t]* '=';
ATTR_POINTS: 'points' [ \t]* '=';
ATTR_D: 'd' [ \t]* '=';

// SVG style attributes
ATTR_FILL: 'fill' [ \t]* '=';
ATTR_STROKE: 'stroke' [ \t]* '=';
ATTR_STROKE_WIDTH: 'stroke-width' [ \t]* '=';
ATTR_STROKE_LINECAP: 'stroke-linecap' [ \t]* '=';
ATTR_STROKE_LINEJOIN: 'stroke-linejoin' [ \t]* '=';
ATTR_STROKE_DASHARRAY: 'stroke-dasharray' [ \t]* '=';
ATTR_OPACITY: 'opacity' [ \t]* '=';
ATTR_FILL_OPACITY: 'fill-opacity' [ \t]* '=';
ATTR_STROKE_OPACITY: 'stroke-opacity' [ \t]* '=';

// SVG transform attribute
ATTR_TRANSFORM: 'transform' [ \t]* '=';

// SVG viewBox and viewport attributes
ATTR_VIEWBOX: 'viewBox' [ \t]* '=';
ATTR_PRESERVE_ASPECT_RATIO: 'preserveAspectRatio' [ \t]* '=';

// SVG reference attributes
ATTR_ID: 'id' [ \t]* '=';
ATTR_CLASS: 'class' [ \t]* '=';
ATTR_STYLE: 'style' [ \t]* '=';
ATTR_HREF: ('href' | 'xlink:href') [ \t]* '=';

// SVG gradient attributes
ATTR_OFFSET: 'offset' [ \t]* '=';
ATTR_STOP_COLOR: 'stop-color' [ \t]* '=';
ATTR_STOP_OPACITY: 'stop-opacity' [ \t]* '=';

// SVG filter attributes
ATTR_FILTER: 'filter' [ \t]* '=';
ATTR_STD_DEVIATION: 'stdDeviation' [ \t]* '=';
ATTR_IN: 'in' [ \t]* '=';
ATTR_RESULT: 'result' [ \t]* '=';

// SVG animation attributes
ATTR_DUR: 'dur' [ \t]* '=';
ATTR_BEGIN: 'begin' [ \t]* '=';
ATTR_END: 'end' [ \t]* '=';
ATTR_REPEAT_COUNT: 'repeatCount' [ \t]* '=';
ATTR_FROM: 'from' [ \t]* '=';
ATTR_TO: 'to' [ \t]* '=';
ATTR_VALUES: 'values' [ \t]* '=';
ATTR_TYPE: 'type' [ \t]* '=';

// Generic attribute (fallback)
ATTRIBUTE_NAME: [a-zA-Z_:][-a-zA-Z0-9._:]* [ \t]* '=';

// Attribute values
STRING_DOUBLE: '"' (~["\r\n] | '\\"')* '"';
STRING_SINGLE: '\'' (~['\r\n] | '\\\'')* '\'';

// Numbers (for unquoted numeric values)
NUMBER: '-'? [0-9]+ ('.' [0-9]+)? ([eE] [+-]? [0-9]+)?;

// Text content
TEXT_CONTENT: [^<]+;

// Whitespace
WS: [ \t\r\n]+ -> channel(HIDDEN);
