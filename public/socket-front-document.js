import { refreshTextEditor } from "./document.js";

const socket = io();

function selectDocument(name) {
    socket.emit("select_document", name, (text) => {
        refreshTextEditor(text);
    })
}

function emitTextEditor(data) {
    socket.emit("text_editor", data);
}

socket.on("clients_text_editor", (text) => {
    refreshTextEditor(text);
});

export { emitTextEditor, selectDocument }