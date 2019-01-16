### Requerimientos

- NodeJS
- NPM
- Docker

### Ejecución

- Crear un archivo `.env` basado en `.env.dist`, y especificar licencia de New Relic.
- Para entorno de desarrollo sin Docker, que no instrumenta New Relic: `npm run dev`.
- Para entorno local con Docker: `docker-compose up --build`.

### Generación de carga

```bash
end=$((SECONDS+120))
while [ $SECONDS -lt $end ]; do
    curl http://localhost:3000/users &
    curl http://localhost:3000/users/11 &
    curl http://localhost:3000/users/12 &
    curl http://localhost:3000/users/13 &
    sleep 5
done
```

