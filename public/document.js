import { emitTextEditor, selectDocument } from "./socket-front-document.js";

const params = new URLSearchParams(window.location.search);
const docName = params.get('nome');

const textEditor = document.getElementById('text-editor');
const docTitle = document.getElementById('document-title');

docTitle.textContent = docName || "Documento sem título"

selectDocument(docName)

textEditor.addEventListener('keyup', () => {
    emitTextEditor(
        {
            text: textEditor.value, 
            docName
        }
    )
});

function refreshTextEditor(text) {
    textEditor.value = text;
}

export { refreshTextEditor }