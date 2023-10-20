import { emitAddDocument } from "./socket-front-index.js"

const documentsList = document.getElementById('documents-list');
const form = document.getElementById('add-document-form')
const inputDocument = document.getElementById('input-document')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    emitAddDocument(inputDocument.value);

    inputDocument.value = "";
})

function insertDocumentLink(docName) {
    documentsList.innerHTML += `
        <a href="document.html?nome=${docName}" class="list-group-item list-group-item-action" id="document-${docName}">
            ${docName}
        </a>
    `
}

function removeDocumentLink(docName) {
    const documento = document.getElementById(`document-${docName}`)
    documentsList.removeChild(documento);
}

export { insertDocumentLink, removeDocumentLink }