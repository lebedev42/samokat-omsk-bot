module.exports = {
  apps: [
    {
      name: "bot-serve",
      script: "./samokat-omsk-bot/dist/index.js",
      watch: false,
      force: true,
      port: 4500,
      env: {
        PORT: 4500,
        HOST: "http://213.226.125.203",
        BOT_TOKEN: "6714470565:AAERLZfe1ZGkdzYi4stsvvKNS4qrB7Jyuj4",
        NODE_ENV: "production"
      }
    },
    {
      name: "bot",
      script: "./samokat-omsk-bot/dist/bot/index.js",
      watch: false,
      force: true,
      port: 4501,
      env: {
        PORT: 4501,
        NODE_ENV: "production",
        HOST: "http://213.226.125.203",
        BOT_TOKEN: "6714470565:AAERLZfe1ZGkdzYi4stsvvKNS4qrB7Jyuj4"
      }
    }
  ]
};
