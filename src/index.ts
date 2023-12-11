import "dotenv/config";
import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import dayjs from "dayjs";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

function getPlayers(data, user) {
  let currentPlayer;
  const players = data.data;

  players.sort(
    (a, b) =>
      dayjs(b.attributes.updatedAt).valueOf() -
      dayjs(a.attributes.updatedAt).valueOf()
  );

  players.sort((a, b) => b.attributes.points - a.attributes.points);

  const allPlayers = players.map((item, index) => {
    const player = {
      place: index + 1,
      name: `${item.attributes.firstName} ${item.attributes.lastName}`,
      points: item.attributes.points,
      isUser: item.attributes.tgId === parseInt(user)
    };

    if (player.isUser) {
      currentPlayer = player;
    }

    return player;
  });

  const topPlayers = allPlayers.slice(0, 10).filter((item) => !item.isUser);

  return [currentPlayer, ...topPlayers];
}

app.get("/api/players", async (req, res) => {
  const { user } = req.query;

  const data = await fetch(`${process.env.API_URL}/api/players`, {
    method: "GET"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      return getPlayers(data, user);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  res.status(200).json(data).end();
});

app.listen(parseInt(process.env.PORT), "127.0.0.1", () => {
  console.log("Server started", process.env.PORT);
});
