import { getDocuments, addDocument, findDocument, updateDocument } from "./documentsDb.js";
import io from "./server.js";

io.on("connection", (socket) => {
    socket.on("get_documents", async (returnDocuments) => {
        const documents = await getDocuments();

        returnDocuments(documents)
    });

    socket.on("add_document", async (name) => {
        const result = await addDocument(name)

        if (result.acknowledged) {
            io.emit("add_document_interface", name)
        }
    });

    socket.on("select_document", async (docName, returnText) => {
        socket.join(docName);
        
        const document = await findDocument(docName);

        if (document) {
            returnText(document.text)
        }
    });

    socket.on("text_editor", async ({ text, docName }) => {
        const update = await updateDocument(docName, text);

        if (update.modifiedCount) {           
            socket.to(docName).emit("clients_text_editor", text);
        }
    });

});
