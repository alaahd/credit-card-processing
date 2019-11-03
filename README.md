# Credit Card Processing

A project that runs an Express Node server (RESTful API) and a create-react-app application via two separate containers, using Docker Compose.

## Run the project (Development Mode)

### 1- Stop all containets

```
docker-compose down
```

### 2- Remove any exisitng containers

```
docker-compose rm -f
```

### 3- Build the required images

```
docker-compose build
```

### 4- Run server and client containers

```
docker-compose up
```

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is spun up at `http://localhost:3000` and it proxies internally to the server using the linked name as `http://localhost:8080`.

### Notes

If you face any issue in the first load of the application, try to restart services that are not responding using the commands below:


#### Restart server

```
docker-compose restart server
```

#### Restart client

```
docker-compose restart client
```

#### To check status

```
docker-compose ps
```
