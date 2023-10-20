import { documentsCollection } from "./dbConnect.js";

function findDocument(name) {
    const document = documentsCollection.findOne({
        name
    })

    return document;
}

function updateDocument(name, text) {
    const update = documentsCollection.updateOne({
        name
    }, {
        $set: {
            text
        }
    });

    return update
}

export { findDocument, updateDocument }