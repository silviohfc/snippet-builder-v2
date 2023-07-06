require.config({ paths: { vs: 'monaco-editor/min/vs' } });

var editor;

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('code-editor'), {
    value: ['function x() {', '\tconsole.log("Replace me with your code!");', '}'].join('\n'),
    language: 'javascript',
    automaticLayout: true
  });
});