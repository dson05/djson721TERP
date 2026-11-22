const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));

if (process.env.NODE_ENV !== "production") {
   require("dotenv").config({
      path: path.resolve(__dirname, "credentialsDontPost/.env"),
   });
}

const portNumber = Number(process.env.PORT) || 7003;
const databaseName = "CMSC335DB";
const collectionName = "moviesCollection";
const uri = process.env.MONGO_CONNECTION_STRING;
let client;

async function getCollection() {
   if (!uri || /<[^>]+>/.test(uri)) {
      throw new Error("MONGO_CONNECTION_STRING needs to be configured.");
   }

   if (!client) {
      client = new MongoClient(uri, {
         serverApi: ServerApiVersion.v1,
         serverSelectionTimeoutMS: 5000,
      });
   }

   await client.connect();
   return client.db(databaseName).collection(collectionName);
}

app.get("/", async (req, res) => {
   res.send(`My Deployment`);
});

app.get("/insertMovies", async (req, res) => {
   const collection = await getCollection();

   /* Inserting several movies */
   const moviesArray = [
      { name: "Batman", year: 2021, stars: 1.5 },
      { name: "Wonder Women", year: 2005, stars: 2.0 },
      { name: "When Harry Met Sally", year: 1985, stars: 5 },
      { name: "Hulk", year: 1985, stars: 5 },
   ];
   const result = await collection.insertMany(moviesArray);
   res.send(`<h2>Inserted ${result.insertedCount} movies</h2>`);
});

app.get("/listMovies", async (req, res) => {
   const collection = await getCollection();
   const movies = await collection.find({}).toArray();
   res.render("movies", { movies });
});

app.get("/clearCollection", async (req, res) => {
   const collection = await getCollection();
   await collection.deleteMany({});
   res.send("<h2>Collection Cleared</h2>");
});

app.get("/getSummary", (req, res) => {
   const variables = { year: 2025 };
   res.render("summary", variables);
});

app.use((error, req, res, next) => {
   console.error("Request failed:", error.name, "code:", error.code, "codeName:", error.codeName);
   res.status(503).send("Unable to access the database. Check the MongoDB connection settings and try again.");
});

if (require.main === module) {
   const server = app.listen(portNumber, "0.0.0.0", () => {
      console.log(`main URL http://localhost:${portNumber}/`);
   });

   const shutdown = () => {
      server.close(async () => {
         if (client) {
            await client.close();
         }
      });
   };

   process.once("SIGTERM", shutdown);
   process.once("SIGINT", shutdown);
}

module.exports = app;
