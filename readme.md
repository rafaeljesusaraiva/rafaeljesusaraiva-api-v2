# Rafael Jesus Saraiva API

Api for the website [rafaeljesusaraiva.pt](https://rafaeljesusaraiva.pt).

## Installation

Required [node 17](https://nodejs.org/en/), NPM and PM2.

```bash
curl -qL https://www.npmjs.com/install.sh | sh
npm install pm2@latest -g
```

## Usage

To build & start all micro-services with load-balancer.

```bash
node start.js
```

To stop all instances.

```bash
node stop.js
```

## Developing

Use a IDE to program on the main folder with a console on the directory of the service being modified.

```bash
cd ./services/auth
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
