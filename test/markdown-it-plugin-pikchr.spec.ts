import {expect} from "chai";
import {describe, it} from "mocha";
import MarkdownIt from "markdown-it";
import PikchrPlugin from "../src/markdown-it-plugin-pikchr";
import {PikchrResultType} from "pikchr";


// @ts-ignore

const ArrowArrowSVG = `<svg width="152" height="12" xmlns='http://www.w3.org/2000/svg' viewBox="0 0 152.64 12.96">
<polygon points="74,6 62,10 62,2" style="fill:rgb(0,0,0)"/>
<path d="M2,6L68,6"  style="fill:none;stroke-width:2.16;stroke:rgb(0,0,0);" />
<polygon points="146,6 134,10 134,2" style="fill:rgb(0,0,0)"/>
<path d="M74,6L140,6"  style="fill:none;stroke-width:2.16;stroke:rgb(0,0,0);" />
</svg>
`

const ArrowArrowDIV = `<div style="width: 100px;">${ArrowArrowSVG}</div>`


const VeryBasicExample_Src = 'line; box "Hello," "World!"; arrow';
const VeryBasicExample_Output = `<svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 260.64 76.32">
<path d="M2,38L74,38"  style="fill:none;stroke-width:2.16;stroke:rgb(0,0,0);" />
<path d="M74,74L182,74L182,2L74,2Z"  style="fill:none;stroke-width:2.16;stroke:rgb(0,0,0);" />
<text x="128" y="28" text-anchor="middle" fill="rgb(0,0,0)" dominant-baseline="central">Hello,</text>
<text x="128" y="48" text-anchor="middle" fill="rgb(0,0,0)" dominant-baseline="central">World!</text>
<polygon points="254,38 242,42 242,33" style="fill:rgb(0,0,0)"/>
<path d="M182,38L248,38"  style="fill:none;stroke-width:2.16;stroke:rgb(0,0,0);" />
</svg>
`

const xmlns = "xmlns='http://www.w3.org/2000/svg'";

describe("Basic testing", function () {
    const mdi = new MarkdownIt();
    mdi.use(PikchrPlugin);

    it("regular mode", function () {
        const result = mdi.render(`
# Markdown header
Some *Markdown* text before the code fences.
\`\`\`pikchr
arrow; arrow
\`\`\``);
        const expected = `<pre style="visibility: hidden"></pre>`+ArrowArrowDIV;
        // let result2 = result.slice(result.length-expected.length);
        expect(result.slice(result.indexOf(xmlns))).to.equal(expected.slice(expected.indexOf(xmlns)));
    });

    it("dark mode", function () {
        const result = mdi.render(`\`\`\`pikchr-darkmode
${VeryBasicExample_Src}
\`\`\``);
        let dark =( VeryBasicExample_Output+'</div>').replace(/0,0,0/g, '255,255,255');

        var resultpart2 = result.slice(result.length-dark.length);
        resultpart2 = resultpart2.slice(resultpart2.indexOf('xmlns=\'http://www.w3.org/2000/svg\''));
        dark = dark.slice(dark.indexOf('xmlns=\'http://www.w3.org/2000/svg\''))
        expect(resultpart2).to.equal(dark);
    });

    it("empty diagram", function () {
        const result = mdi.render(`
# Markdown header
Some *Markdown* text before the code fences.
\`\`\`pikchr
\`\`\``);
        const empty = `<h1>Markdown header</h1>
<p>Some <em>Markdown</em> text before the code fences.</p>
<pre style="visibility: hidden"></pre><div style="width: 100px;"><!-- empty pikchr diagram -->
</div>`;
        expect(result).to.equal(empty);
    });

    it("other diagram", function () {
        const result = mdi.render(`
# Markdown header
Some *Markdown* text before the code fences.
\`\`\`javascript
\`\`\``);
        const empty = `<h1>Markdown header</h1>
<p>Some <em>Markdown</em> text before the code fences.</p>
<pre><code class="language-javascript"></code></pre>
`;
        expect(result).to.equal(empty);
    });

    it("no language", function () {
        const result = mdi.render(`
# Markdown header
Some *Markdown* text before the code fences.
\`\`\`
\`\`\``);
        const empty = `<h1>Markdown header</h1>
<p>Some <em>Markdown</em> text before the code fences.</p>
<pre><code></code></pre>
`;
        expect(result).to.equal(empty);
    });
});


describe("Testing Options", function () {
    const mdi = new MarkdownIt();
    mdi.use(PikchrPlugin, {render_f:renderf});

    function renderf(result: PikchrResultType):string {
        expect(result.width).to.equal(152);
        expect(result.height).to.equal(12);
        expect(result.output.slice(result.output.indexOf(xmlns))).to.equal(
                                        ArrowArrowSVG.slice(ArrowArrowSVG.indexOf(xmlns)));
        return "nada";
    }

    it("regular mode", function () {
        const result = mdi.render(`
# Markdown header
Some *Markdown* text before the code fences.
\`\`\`pikchr
arrow; arrow
\`\`\``);
        expect(result).to.include("nada");
    });
});
