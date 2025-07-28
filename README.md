# Task Admin Frontend

Task Admin application, developed with Angular 20, to manage tasks. It uses Task Admin Backend as backend (developed with Node.js and Express).

## Lint errors

To start a linter to prevent some errors:

```bash
npm run lint
```

## 1.- Working in development mode:

### - Create application within Docker Container:

```bash
npm run create-app:desa
```

App is available in: http://localhost:4200

### - Stop app container:

```bash
docker stop task-admin-frontend-desa
```

### - Run existing app container:

```bash
docker start task-admin-frontend-desa
```

## 2.- Working in production mode:

### - Create application within Docker Container:

```bash
npm run create-app:prod
```

App is available in: http://localhost:8080

### - Stop app container:

```bash
docker stop task-admin-frontend-prod
```

### - Run existing app container:

```bash
docker start task-admin-frontend-prod
```

## Running unit tests

To execute unit tests use the following command:

```bash
npm run test
```
