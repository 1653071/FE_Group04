const functions = require("firebase-functions");
const express = require("express");
var admin = require("firebase-admin");
var serviceAccount = require("./permisson.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://begroup04-3faad-default-rtdb.firebaseio.com",
});

const app = express();
const db = admin.firestore();
const cors = require("cors");
app.use(cors({ origin: true }));
// Route

app.get("/hotels/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("hotels").doc(req.params.id);
      let product = await document.get();
      let response = product.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});
app.get("/hotels", (req, res) => {
  (async () => {
    try {
      let query = db.collection("hotels");
      let response = [];
      await query.get().then((querySnapShot) => {
        let docs = querySnapShot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            name: doc.data().name,
            address: doc.data().address,
            picture: doc.data().picture,
            description: doc.data().description,
            phone: doc.data().phone,
            type: doc.data().type,
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});
app.get("/users", (req, res) => {
  (async () => {
    try {
      let query = db.collection("users");
      let response = [];
      await query.get().then((querySnapShot) => {
        let docs = querySnapShot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            name: doc.data().name,
            username: doc.data().username,
            isEnabled: doc.data().isEnabled,
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

app.post("/user/login", (req, res) => {
  (async () => {
    try {
      let username = req.body.username;
      let password = req.body.password;
      let query = db
        .collection("users")
        .where("username", "==", username)
        .where("password", "==", password);
      let response = {};

      await query.get().then((querySnapShot) => {
        let docs = querySnapShot.docs;
        if (docs.length == 0) {
          const selectedItem = {
            statusLogin: false,
          };
          response = selectedItem;

          return response;
        }
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            name: doc.data().name,
            username: doc.datausername,
            statusLogin: true,
          };
          response = selectedItem;
        }
        return response;
      });

      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});
app.put("/users/banned/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("users").doc(req.params.id);
      await document.update({
        isEnabled: false,
      });
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});
app.put("/users/unbanned/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("users").doc(req.params.id);
      await document.update({
        isEnabled: true,
      });
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});
app.get("/users/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("users").doc(req.params.id);
      let user = await document.get();
      let response = user.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

// // get comment
app.post("/comment/create", (req, res) => {
  (async () => {
    try {
      const document = await db.collection("comment").add({
        comment: req.body.comment,
        name: req.body.name,
        userID: req.body.userID,
        hotelID: req.body.hotelID,
      });
      return res.status(200).send("Add successful");
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});
app.delete("/comment/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("comment").doc(req.params.id);
      await document.delete(document);

      return res.status(200).send("Delete successful");
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});
app.get("/comment/:hotelid", (req, res) => {
  (async () => {
    try {
      const hotelid = req.params.hotelid;
      const document = db.collection("comment");
      const query = document.where("hotelID", "==", hotelid);
      const response = [];
      await query.get().then((querySnapShot) => {
        let docs = querySnapShot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            comment: doc.data().comment,
            name: doc.data().name,
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
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
