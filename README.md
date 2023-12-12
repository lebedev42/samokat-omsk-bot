## Installation and local launch in DEVELOPMENT mode

1. Create `.env` file with the environment variables listed below
2. Run `yarn` in the root folder
3. Run `yarn build`
4. Run `yarn serve` and `yarn bot` separately

If you want to add several features then you can create directory `public/feature` and add to this directory your component and serve static file like in example:

`app.use('feature', express.static('feature'));`

## Environment variables in `.env` file

- `PORT` - port number for listen server
- `API_URL`
- `WEBAPP_URL` - For local development use [Ngrok tunnel](https://ngrok.com/docs/secure-tunnels#http-tunnels-host-header)
- `BOT_TOKEN` - telegram bot token
