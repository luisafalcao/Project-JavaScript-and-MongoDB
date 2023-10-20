import { getDocuments, addDocument, findDocument, updateDocument, deleteDocument } from "./documentsDb.js";
import io from "./server.js";

io.on("connection", (socket) => {
    socket.on("get_documents", async (returnDocuments) => {
        const documents = await getDocuments();

        returnDocuments(documents)
    });

    socket.on("add_document", async (name) => {
        const documentExists = (await findDocument(name)) !== null;

        if (documentExists) {
            socket.emit("existing_document", name)
        } else {
            const result = await addDocument(name)

        if (result.acknowledged) {
            io.emit("add_document_interface", name)
        }
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

    socket.on("delete_document", async (name) => {
        const result = await deleteDocument(name)

        if (result.deletedCount) {
            io.emit("delete_document_success", name);
        }
    })

});
