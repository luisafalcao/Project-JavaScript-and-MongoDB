import io from "./server.js";

const documents = [
    {
        name: "JavaScript",
        text: "texto JS"
    },
    {
        name: "Node",
        text: "texto Node"
    },
    {
        name: "Socket.io",
        text: "texto Socket"
    },
]

io.on("connection", (socket) => {
    console.log('Client Connected. ID:', socket.id);

    socket.on("select_document", (docName, returnText) => {
        socket.join(docName);
        
        const document = findDocument(docName);

        if (document) {
            returnText(document.text)
        }
    });

    socket.on("text_editor", ({ text, docName }) => {
        const document = findDocument(docName);

        if (document) {
            document.text = text;
            
            socket.to(docName).emit("clients_text_editor", text);
        }
    });

});

function findDocument(name) {
    const document = documents.find((document) => {
        return document.name === name
    });

    return document;
}