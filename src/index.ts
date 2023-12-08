import "dotenv/config";
import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import qs from "qs";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/api/players", async (req, res) => {
  const { user } = req.query;

  console.error("req", user);

  const query = qs.stringify({
    filters: {
      ["tgId"]: {
        $eq: user
      }
    }
  });

  const data = await fetch(`${process.env.API_URL}/api/players?${query}`, {
    method: "GET"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  res.status(200).json(data).end();
});

app.listen(parseInt(process.env.PORT), "localhost", () => {
  console.log("Server started", process.env.PORT);
});
