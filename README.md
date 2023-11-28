# starter-app

* AIR api base: `https://muniair-f106.restdb.io`
* SUN api base: `https://munisun-d71a.restdb.io`
* TEMP api base: `https://munitest-16ae.restdb.io`
* Energy api base: `https://energy-1ed6.restdb.io`

# Getting started
1) Install [node.js](https://nodejs.org/en/download/) on your machine
2) Optional, but recommended: install yarn in command line `npm install --global yarn` or [yarn install](https://classic.yarnpkg.com/en/docs/install)
3) Open system terminal in project folder (windows - ctrl + R and type cmd, use `cd` to change directories from your root folder to project folder)
4) Install dependencies (run one of these commands in terminal), 

If you didn't installed yarn
```
npm install
```
If you installed yarn
```
yarn
```
5) Run the application (run one of these commands in terminal)

If you didn't installed yarn
```
npm start
```
If you installed yarn
```
yarn start
```
# Deploying application to surge

Build your application

```
npm run build
```
or with yarn
```
yarn build
```

Login to surge (use one email address and one password per domain)
```
npx surge login
```

CD to build directory and deploy your app with surge where $YOUR_DOMAIN is assigned domain if you don't know it, please ping us on slack or email

```
npx surge --domain $YOUR_DOMAIN
```
