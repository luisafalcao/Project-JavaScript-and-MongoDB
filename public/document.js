import { emitTextEditor, selectDocument, emitDeleteDocument } from "./socket-front-document.js";

const params = new URLSearchParams(window.location.search);
const docName = params.get('nome');

const textEditor = document.getElementById('text-editor');
const docTitle = document.getElementById('document-title');
const deleteDocBtn = document.getElementById('delete-document')

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

deleteDocBtn.addEventListener('click', () => {
    emitDeleteDocument(docName)
})

function alertAndRedirect(name) {
    if (name === docName) {
        alert(`Documento ${name} excluído!`);
        window.location.href = "/"
    }
}

export { refreshTextEditor, alertAndRedirect }