# INSTALL DOCKER (docs.docker)

# Create a postgres database on docker

docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# download postbird
