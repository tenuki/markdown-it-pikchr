# markdown-it-plugin-pikchr

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
var result = md.render('# markdown-it rulezz!');
```
