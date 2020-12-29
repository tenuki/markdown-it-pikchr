import type MarkdownIt from "markdown-it";
// @ts-ignore
import Token from "markdown-it/lib/token";
import {pikchrex, PikchrResultType} from "pikchr";


function default_render(result: PikchrResultType): string {
    const output = result.output.replace('svg',
        `svg width="${result.width}" height="${result.height}"`);
    // return `<pre style="visibility: hidden"></pre><div style="width: 100px;">${output}</div>`;
    return `<pre style="visibility: hidden"></pre><div style="width: 100px;">${output}</div>`;
}


interface PikchrPluginOptions {
    render_f: (result: PikchrResultType) => string;
}

const PikchrPlugin = (md: MarkdownIt, opts?: PikchrPluginOptions) => {
    const tempFence = md.renderer.rules.fence!.bind(md.renderer.rules)!;
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const chunks = (token.info || ``).match(/^(\S+)(\s+(.+))?/);
        if (!chunks || !chunks.length) {
            return tempFence(tokens, idx, options, env, slf);
        }
        const lang = chunks[1];

        const code = token.content.trim();

        const dark_mode = lang === "pikchr-darkmode";
        const pikchr = lang === "pikchr";

        if (pikchr || dark_mode) {
            const render_f = opts?(opts.render_f || default_render): default_render;
            const result = pikchrex(code, {dark_mode});
            return render_f(result);
        }
        return tempFence(tokens, idx, options, env, slf);
    };

    // const tempRender = md.renderer.render.bind(md.renderer);
    // md.renderer.render = (tokens: Token[], options: any, env: any) => {
    //     return `${tempRender(tokens, options, env)}`;
    // };
};
export default PikchrPlugin;
