# Task Manager Portfolio

This project contains a React/Vite frontend, an Express/Mongoose task API, and MongoDB persistence. It includes JWT authentication, task CRUD operations, caching, and task event listeners.

## Docker prerequisites

- Docker Desktop with Docker Compose v2
- Ports `5173` and `5000` available on the host

## Architecture

The root directory is the frontend. `task-manager-api` contains the backend and its models, routes, cache, and event listeners. Docker Compose runs the frontend, backend, and MongoDB on the shared `app-network` network. The browser calls the backend through `http://localhost:5000`; the backend calls MongoDB through `mongodb://mongodb:27017/taskdb`.

## Run with Docker Compose

From the project root, run:

```powershell
docker compose up --build
```

Open the application at [http://localhost:5173](http://localhost:5173). The API is available at [http://localhost:5000](http://localhost:5000), and its health check is [http://localhost:5000/health](http://localhost:5000/health).

Useful commands:

```powershell
docker compose ps
docker compose logs -f
docker compose down
```

MongoDB data is stored in the named `mongodb-data` volume, so stopping the containers does not remove the database. `docker compose down -v` removes named volumes and can delete persisted database data; use it only when intentionally resetting the database.

To use a non-default JWT secret, set `JWT_SECRET` in a local `.env` file before starting Compose. Do not commit that file.

## Practical 11 verification

After the services start, register and log in through the frontend, then create, update, and delete a task. Confirm service status and logs with `docker compose ps` and `docker compose logs -f`. To verify persistence, create a task, run `docker compose down`, start again with `docker compose up`, and check that the task remains. The frontend build can also be checked with `npm run build` from the project root.

### Suggested screenshots

1. VS Code showing both Dockerfiles and `docker-compose.yml`.
2. A terminal showing successful `docker compose up --build` output.
3. `docker compose ps` showing frontend, backend, and MongoDB running.

### Observation

Docker packages the frontend and backend with their dependencies, while Docker Compose starts the complete application and provides a shared network for service-to-service communication.

### Conclusion

The Task Management website is containerized with separate frontend, backend, and MongoDB services. The named MongoDB volume preserves data across container restarts, and the application can be started consistently with one Compose command.
