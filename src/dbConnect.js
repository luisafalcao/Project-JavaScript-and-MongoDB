import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://luisavaz:83AoxJ06Dum9ltDY@cluster0.byytued.mongodb.net/?retryWrites=true&w=majority")

let documentsCollection;

try {
    await client.connect();

    const db = client.db("websockets");
    documentsCollection = db.collection("documents");

    console.log("Conectado ao banco de dados")
} catch (err) {
    console.log(err);
}

export { documentsCollection }