# Build and Run "Success-tracker" inside a Container

This guide will help you build and run the "Success-tracker" web application inside a container using either Podman or Docker. The application requires a pre-built production distribution using Node.js, which can be achieved by running the command 'npm run ng build --prod'. This will create a './dist' directory containing all the static production sources that will be used as the content of the container.

Before you proceed, ensure that you have Docker or Podman installed on your system. You can find installation instructions at http://podman.io or http://docker.io.

## Build

To build the container, follow these steps from the root directory of this project:

1. Open your terminal or command prompt.

2. Run the following command:

For Podman:
```
podman build -t success-tracker .
```

For Docker:
```
docker build -t success-tracker .
```

This command will create a container image named "success-tracker" and store it in your local container registry. To verify that the image has been successfully built, run:

For Podman:
```
podman images
```

For Docker:
```
docker images
```

## Run

To run the "Success-tracker" container and make it accessible on port 80, execute the following command:

For Podman:
```
podman run -d -p 80:3000 --name success-tracker success-tracker:latest
```

For Docker:
```
docker run -d -p 80:3000 --name success-tracker success-tracker:latest
```

This command will start the container in the background (-d), map port 3000 of the container to port 80 of your host machine (-p), and give the container the name "success-tracker" (--name).

Now, you should have the "Success-tracker" web application running inside a container, accessible through port 80 on your host machine. You can access the application in your web browser by visiting http://localhost:80.

Remember to stop and remove the container when you're done using the application:

For Podman:
```
podman stop success-tracker
podman rm success-tracker
```

For Docker:
```
docker stop success-tracker
docker rm success-tracker
```

That's it! You've successfully built and run the "Success-tracker" application inside a container.