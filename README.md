# markdown-it-plugin-pikchr

[![Actions Status](https://github.com/tenuki/markdown-it-pikchr/workflows/On%20Commit%20Build%20and%20Tests/badge.svg)](https://github.com/tenuki/markdown-it-pikchr/actions)
[![Actions Status](https://github.com/tenuki/markdown-it-pikchr/workflows/On%20new%20release%20Build%20and%20Tests/badge.svg)](https://github.com/tenuki/markdown-it-pikchr/actions)

### How to add Pikchr support to Markdown-It

Use `markdown-it-pikchr` as a regular plugin.

```sh
npm install markdown-it markdown-it-pikchr
```

Configure the markdown-it instance:

```javascript
// node.js, "classic" way:
var pikchr = require('markdown-it-pikchr');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
    md.use(pikchr);
var result = md.render(aMarkdownDocument);
```

Document including:

    ```pikchr
    arrow right 200% "Markdown" "Source"
    box rad 10px "Markdown" "Formatter" "(markdown.c)" fit
    arrow right 200% "HTML+SVG" "Output"
    arrow <-> down 70% from last box.s
    box same "Pikchr" "Formatter" "(pikchr.c)" fit
    ```


----
Code based on: https://github.com/christianvoigt/argdown/tree/master/packages/argdown-markdown-it-plugin
