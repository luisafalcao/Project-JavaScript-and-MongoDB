import { insertDocumentLink, removeDocumentLink } from "./index.js";

const socket = io();

socket.emit("get_documents", (documents) => {
    documents.forEach(document => {
        insertDocumentLink(document.name);
    })
});

function emitAddDocument(name) {
    socket.emit('add_document', name)
}

socket.on("add_document_interface", (name) => {
    insertDocumentLink(name);
})

socket.on("existing_document", (name) => {
    alert(`O documento ${name} já existe`)
})

socket.on("delete_document_success", (name) => {
    removeDocumentLink(name)
})

export { emitAddDocument }