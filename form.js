var registeredCompletionItemProvider;

$("document").ready(() => {
  const actualTheme = getTheme();

  if (!actualTheme) saveTheme("light");

  updateTheme();
  updateSavedSnippets();

  $("#themeSwitch").on("click", function () {
    const isDarkTheme = $(this).is(":checked");

    isDarkTheme ? saveTheme("dark") : saveTheme("light");

    updateTheme();
  });

  $("#button-save").on("click", function () {
    const inputName = $("#inputName");
    const inputTrigger = $("#inputTrigger");
    const inputDescription = $("#inputDescription");
    const codeEditor = $("#code-editor");

    inputName.removeClass("is-invalid");
    inputTrigger.removeClass("is-invalid");
    inputDescription.removeClass("is-invalid");
    codeEditor.removeClass("border-danger");

    const nameValue = inputName.val().trim();
    const triggerValue = inputTrigger.val().trim();
    const descriptionValue = inputDescription.val().trim();
    const codeValue = editor.getValue();

    if (!nameValue || !triggerValue || !descriptionValue || !codeValue) {
      if (!nameValue) inputName.addClass("is-invalid");
      if (!triggerValue) inputTrigger.addClass("is-invalid");
      if (!descriptionValue) inputDescription.addClass("is-invalid");
      if (!codeValue) codeEditor.addClass("border-danger");
      return;
    }

    inputName.val("");
    inputTrigger.val("");
    inputDescription.val("");
    editor.setValue("");

    localStorage.setItem(
      triggerValue,
      JSON.stringify({
        name: nameValue,
        description: descriptionValue,
        code: codeValue,
      })
    );

    updateSavedSnippets();
  });

  $("#buttonTestBuild").on("click", function () {
    if (testEditor) testEditor.dispose();

    if (registeredCompletionItemProvider)
      registeredCompletionItemProvider.dispose();

    disableLanguageLibs();
    registerSnippets();
    createTestEditor();
    generateSnippetsCode();
  });

  $("#buttonCopy").on("click", function () {
    copyGeneratedSnippets();
  });
});

function updateSavedSnippets() {
  let savedSnippetElements = "";

  for (const trigger of Object.keys(localStorage)) {
    if (trigger === "sys_theme_config") continue;
    savedSnippetElements = savedSnippetElements.concat(
      `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>` +
        `<div class="list-group-item d-flex p-0 justify-content-between">
          <button type="button" class="btn w-100 triggerButton">
            ${trigger}
          </button>
          <button class="btn btn-danger rounded-0 deleteButton">
            <i class="bi bi-trash3"></i>
          </button>
        </div>`
    );
  }

  $(".list-group").html(savedSnippetElements);
  $(".deleteButton").hide();

  $(".list-group .triggerButton").on("click", function () {
    updateForm(this);
  });

  $(".list-group .deleteButton").on("click", function () {
    const trigger = $(this).parent().children(".triggerButton").text().trim();
    localStorage.removeItem(trigger);

    updateSavedSnippets();
  });

  $(".list-group-item").on("mouseover", function () {
    $(this).children(".deleteButton").show();
  });

  $(".list-group-item").on("mouseout", function () {
    $(this).children(".deleteButton").hide();
  });
}

function getTheme() {
  return localStorage.getItem("sys_theme_config");
}

function saveTheme(theme) {
  return localStorage.setItem("sys_theme_config", theme);
}

function updateTheme() {
  if (!editor)
    return setTimeout(() => {
      updateTheme();
    }, 50);

  const actualTheme = getTheme();

  if (actualTheme === "light") {
    $("#themeSwitch").prop("checked", false);
    editor._themeService.setTheme("vs-light");
    document.documentElement.setAttribute("data-bs-theme", "light");
  } else {
    $("#themeSwitch").prop("checked", true);
    editor._themeService.setTheme("vs-dark");
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function registerSnippets() {
  const completionTriggerKeywords = [];

  for (const [trigger, config] of Object.entries(localStorage)) {
    if (trigger === "sys_theme_config") continue;

    const parsedConfig = JSON.parse(config);

    completionTriggerKeywords.push({
      label: trigger,
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: parsedConfig.code,
      description: parsedConfig.description,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    });
  }

  // TODO: Linguagem dinamica
  registeredCompletionItemProvider =
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: (model, position) => {
        const wordBeforePosition = model.getWordUntilPosition({
          lineNumber: position.lineNumber,
          column: position.column - 1,
        });

        const wordUntilPosition = model.getWordUntilPosition(position);
        if (
          wordBeforePosition.word.trim() === "" ||
          wordUntilPosition.word.trim() === ""
        ) {
          const keywords = completionTriggerKeywords;

          const suggestions = keywords.map((id) => ({
            label: id.label,
            kind: id.kind,
            description: id.description,
            documentation: id.description,
            insertText: id.insertText,
            detail: id.description,
            insertTextRules: id.insertTextRules,
            range: {
              startLineNumber: position.lineNumber,
              startColumn: wordUntilPosition.startColumn,
              endLineNumber: position.lineNumber,
              endColumn: wordUntilPosition.endColumn - 1,
            },
          }));
          return { suggestions };
        }
      },
    });
}

function disableLanguageLibs() {
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    noLib: true,
    allowNonTsExtensions: true,
  });
}

function createTestEditor() {
  // TODO: Linguagem dinamica
  testEditor = monaco.editor.create(
    document.getElementById("test-code-editor"),
    {
      value: "",
      language: "javascript",
      suggest: {
        showFields: false,
        showFunctions: false,
        showMethods: false,
        showProperties: false,
        showClasses: false,
        showConstructors: false,
        showInterfaces: false,
        showTypeParameters: false,
        showUnits: false,
        showModules: false,
        showUsers: false,
        showVariables: false,
        showWords: false,
        showStructs: false,
        showKeywords: false,
        showSnippets: true,
      },
      automaticLayout: true,
    }
  );
}

function updateForm(triggerElement) {
  const trigger = $(triggerElement).text().trim();
  const snippet = localStorage.getItem(trigger);

  if (!snippet) return alert("Snippet not found.");

  const parsedSnippet = JSON.parse(snippet);
  const inputName = $("#inputName");
  const inputTrigger = $("#inputTrigger");
  const inputDescription = $("#inputDescription");

  inputTrigger.val(trigger);
  inputName.val(parsedSnippet.name);
  inputDescription.val(parsedSnippet.description);
  editor.setValue(parsedSnippet.code);
}

function generateSnippetsCode() {
  const snippetsArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("sys_")) {
      continue;
    }

    const value = localStorage.getItem(key);
    const object = JSON.parse(value);

    const newSnippet = {
      [object.name]: {
        prefix: key,
        body: object.code,
        description: object.description,
      },
    };

    snippetsArray.push(newSnippet);
  }

  const arrayText = JSON.stringify(snippetsArray, null, 2);
  $("#textAreaGeneratedCode").val(arrayText);
}

function copyGeneratedSnippets() {
  const snippetsCode = $("#textAreaGeneratedCode").val();
  navigator.clipboard.writeText(snippetsCode);

  $("#buttonCopy").text("Copied to clipboard!");

  setTimeout(() => {
    $("#buttonCopy").text("Copy");
  }, 1000);
}
