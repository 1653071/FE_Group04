const functions = require("firebase-functions");
const express = require("express");
var admin = require("firebase-admin");
var serviceAccount = require("./permisson.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://begroup04-3faad-default-rtdb.firebaseio.com"
});

const app = express();
const db=  admin.firestore();
const cors = require("cors");
app.use(cors({origin:true}));
// Route
app.get('/hotels/:id', (req,res)=>{
    (async () => {
        try{
             const document = db.collection('hotels').doc(req.params.id);
             let product= await document.get();
             let response = product.data();
             return res.status(200).send(response);
        }
        catch (error){
            return res.status(500).send(error);
        }   
    })();
});
app.get('/hotels', (req,res)=>{
    (async () => {
        try{
             let query = db.collection('hotels');
             let response =[];
             await query.get().then(querySnapShot => { 
                 let docs = querySnapShot.docs;
                 for (let doc of docs){
                     const selectedItem = {
                         id: doc.id,
                         name: doc.data().name,
                         address: doc.data().address,
                         picture: doc.data().picture,
                         description: doc.data().description,
                         phone: doc.data().phone,
                         type: doc.data().type
                     }
                     response.push(selectedItem);
                 }
                 return response;
             });
             return res.status(200).send(response);
        }
        catch (error){
            return res.status(500).send(error);
        }   
    })();
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.app = functions.https.onRequest(app);