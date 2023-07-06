$('document').ready(() => {
  updateSavedSnippets()
})

$('#button-save').on('click', () => {
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

function updateSavedSnippets() {
  let savedSnippetElements = ""

  for (const trigger of Object.keys(localStorage)) {
    savedSnippetElements = savedSnippetElements.concat(`<button type="button" class="list-group-item list-group-item-action">${trigger}</button>`)
  }

  $('.list-group').html(savedSnippetElements)
}