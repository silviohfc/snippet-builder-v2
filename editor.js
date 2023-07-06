require.config({ paths: { vs: "monaco-editor/min/vs" } });

var editor;
var testEditor;

require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("code-editor"), {
    value: [
      "function x() {",
      '\tconsole.log("Replace me with your code!");',
      "}",
    ].join("\n"),
    language: "javascript",
    automaticLayout: true,
  });

  testEditor = monaco.editor.create(
    document.getElementById("test-code-editor"),
    {
      value: "",
      language: "javascript",
      automaticLayout: true,
    }
  );
});
