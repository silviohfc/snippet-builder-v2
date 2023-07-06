$('document').ready(() => {
  const actualTheme = getTheme()

  if (!actualTheme) saveTheme('light')

  updateTheme()
  updateSavedSnippets()

  $('#themeSwitch').on('click', function() {
    const isDarkTheme = $(this).is(':checked')

    isDarkTheme ? saveTheme('dark') : saveTheme('light')

    updateTheme()
  })

  $('.list-group button').on('click', function() {
    const trigger = $(this).text()
    const snippet = localStorage.getItem(trigger)

    if (!snippet) return alert("Snippet not found.")

    const parsedSnippet = JSON.parse(snippet)
    const inputTrigger = $('#inputTrigger')
    const inputDescription = $('#inputDescription')

    inputTrigger.val(trigger)
    inputDescription.val(parsedSnippet.description)
    editor.setValue(parsedSnippet.code)
  })

  $('#button-save').on('click', function() {
    const inputTrigger = $('#inputTrigger')
    const inputDescription = $('#inputDescription')
    const codeEditor = $('#code-editor')
    
    inputTrigger.removeClass('is-invalid')
    inputDescription.removeClass('is-invalid')
    codeEditor.removeClass('border-danger')
  
    const triggerValue = inputTrigger.val().trim()
    const descriptionValue = inputDescription.val().trim()
    const codeValue = editor.getValue()
  
    if (!triggerValue || !descriptionValue || !codeValue) {
      if (!triggerValue) inputTrigger.addClass('is-invalid')
      if (!descriptionValue) inputDescription.addClass('is-invalid')
      if (!codeValue) codeEditor.addClass('border-danger')
      return
    }
  
    inputTrigger.val('')
    inputDescription.val('')
    editor.setValue('')
  
    localStorage.setItem(triggerValue, JSON.stringify({
      description: descriptionValue,
      code: codeValue
    }))
  
    updateSavedSnippets()
  })
})

function updateSavedSnippets() {
  let savedSnippetElements = ""

  for (const trigger of Object.keys(localStorage)) {
    if (trigger === 'sys_theme_config') continue
    savedSnippetElements = savedSnippetElements.concat(`<button type="button" class="list-group-item list-group-item-action">${trigger}</button>`)
  }

  $('.list-group').html(savedSnippetElements)
}

function getTheme() {
  return localStorage.getItem('sys_theme_config')
}

function saveTheme(theme) {
  return localStorage.setItem('sys_theme_config', theme)
}

function updateTheme() {
  if (!editor) return setTimeout(() => {
    updateTheme()
  }, 50);

  const actualTheme = getTheme()

  if (actualTheme === 'light') {
    $('#themeSwitch').prop('checked', false);
    editor._themeService.setTheme('vs-light')
    document.documentElement.setAttribute('data-bs-theme','light')
  } else {
    $('#themeSwitch').prop('checked', true);
    editor._themeService.setTheme('vs-dark')
    document.documentElement.setAttribute('data-bs-theme','dark')
  }
}
