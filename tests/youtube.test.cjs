const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const output = ts.transpileModule(fs.readFileSync('src/lib/youtube.ts', 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;
const context = {exports: {}, URL};
vm.runInNewContext(output, context);
const {extractYouTubeVideoId, getYouTubeEmbedUrl} = context.exports;
const id = 'dQw4w9WgXcQ';
for (const url of [`https://www.youtube.com/watch?v=${id}`, `https://youtube.com/watch?v=${id}`, `https://m.youtube.com/watch?v=${id}`, `https://youtu.be/${id}`, ...['shorts','live','embed'].map(p => `https://www.youtube.com/${p}/${id}`)]) {
  test(url, () => {
    assert.equal(extractYouTubeVideoId(url), id);
    assert.equal(getYouTubeEmbedUrl(url), `https://www.youtube-nocookie.com/embed/${id}`);
  });
}
for (const url of [null, undefined, 123, '', 'https://example.com/video', 'https://youtube.com.attacker.com/watch?v=test', 'javascript:alert(1)', 'data:text/html,hello', '<iframe src="..."></iframe>', 'random text', `http://youtube.com/watch?v=${id}`, 'https://youtu.be/short', `https://youtube.com/watch?v=${id}&v=another`, `https://user@youtube.com/watch?v=${id}`, `https://youtube.com:444/watch?v=${id}`, `https://youtu.be/${id}/extra`, 'https://youtube.com/watch?v=%3Cscript%3E']) {
  test(`reject ${url}`, () => {
    assert.equal(extractYouTubeVideoId(url), null);
    assert.equal(getYouTubeEmbedUrl(url), null);
  });
}
