// Express: fast and lightweight web framework for node.js
//makes it easier to make http endpoints
//cross origin request sharing CORS
// prevents errors from accessing database on different servers

import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";
import movies from "./api/movies.route.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./'));

app.use("/api/v1/reviews", reviews);
app.use("/api/v1/movies", movies);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
