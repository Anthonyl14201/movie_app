import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";
//data access object pattern separates a data resources client interface from its data access mechaninisms. adapts a data resource to a particular client interface
//common pattern for writing programs that work with databases
const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.f1mjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port = 8000;

MongoClient.connect(uri, {
  maxPoolSize: 50,
  wtimeoutMS: 2500
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      // nothing into arrow funciton
      console.log(`listening on port ${port}`);
    });
  });
