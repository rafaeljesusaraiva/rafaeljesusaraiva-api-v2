# Rafael Jesus Saraiva API

Api for the website [rafaeljesusaraiva.pt](https://rafaeljesusaraiva.pt).  
Repo to check out: https://github.com/GeekyAnts/express-typescript-postgres

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

To create a new micro-service, make a directory and run the following commands:

```bash
npm init -y
npm i express
npm i -D typescript ts-node @types/node @types/express nodemon
npx tsc --init
```

Use the following `tsconfig.json`:

```
{
  "compilerOptions": {
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,

    "module": "commonjs" /* Specify what module code is generated. */,
    // "rootDir": "./src" /* Specify the root folder within your source files. */,
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
