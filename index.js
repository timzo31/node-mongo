const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url)
  .then((client) => {
    console.log("Connected correctly to the server.");
    const db = client.db(dbname);

    dboper
      .insertDocument(
        db,
        { name: "4 fromages", description: "Test 4 fromages" },
        "dishes"
      )
      .then((result) => {
        console.log("Insert Document:\n", result.ops);

        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found Documents:\n", docs);

        return dboper.updateDocument(
          db,
          { name: "4 fromages" },
          { description: "Updated Test 4 fromages" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("Updated Document:\n", result.result);

        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found Updated Documents:\n", docs);

        return db.dropCollection("dihes");
      })
      .then((result) => {
        console.log("Dropped collection: ", result);

        return client.close();
      });
  })
  .catch((err) => console.log(err));

// MongoClient.connect(url, (err, client) => {
//   assert.equal(err, null);

//   console.log("Connected correctly to server");

//   const db = client.db(dbname);
//   const collection = db.collection("dishes");
//   collection.insertOne(
//     { name: "Uthappizza", description: "test" },
//     (err, result) => {
//       assert.equal(err, null);

//       console.log("After Insert:\n");
//       console.log(result.ops);

//       collection.find({}).toArray((err, docs) => {
//         assert.equal(err, null);

//         console.log("Found:\n");
//         console.log(docs);

//         db.dropCollection("dishes", (err, result) => {
//           assert.equal(err, null);

//           client.close();
//         });
//       });
//     }
//   );
// });

// MongoClient.connect(url, (err, client) => {
//   assert.equal(err, null);

//   console.log("Connected correctly to the server.");

//   const db = client.db(dbname);

//   dboper.insertDocument(
//     db,
//     { name: "Veggies", description: "Test veggies" },
//     "dishes",
//     (result) => {
//       console.log("Insert Document:\n", result.ops);

//       dboper.findDocuments(db, "dishes", (docs) => {
//         console.log("Found Documents:\n", docs);

//         dboper.updateDocument(
//           db,
//           { name: "Vadonut" },
//           { description: "Updated Test" },
//           "dishes",
//           (result) => {
//             console.log("Updated Document:\n", result.result);

//             dboper.findDocuments(db, "dishes", (docs) => {
//               console.log("Found Updated Documents:\n", docs);

//               db.dropCollection("dihes", (result) => {
//                 console.log("Dropped collection: ", result);

//                 client.close();
//               });
//             });
//           }
//         );
//       });
//     }
//   );
// });
