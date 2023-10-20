import { findDocument, updateDocument } from "./documentsDb.js";
import io from "./server.js";

io.on("connection", (socket) => {
    console.log('Client Connected. ID:', socket.id);

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
