
#Pour créer le container.

Cloner ou mettre à jour les sources.
```
Modifier le ficher /scr/shared/config.js
```
puis:
```
docker build --no-cache -t front .
```
et pour démarrer
```
docker run --name frontend -d -p 80:80 front:latest
```


# pactng-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
