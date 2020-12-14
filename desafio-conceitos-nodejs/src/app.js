const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validadeRepositoryId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid repository id.' });
    }

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex === -1) {
        return response.status(400).json({ error: 'Repository not found.' });
    }

    request.repositoryIndex = repositoryIndex

    return next();
}

app.use('/repositories/:id', validadeRepositoryId)

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { title = '', url = '', techs = '', likes = 0 } = request.body;

    const repository = {
        id: uuid(),
        title,
        url,
        techs,
        likes
    };

    repositories.push(repository);

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;

    const { title, url, techs } = request.body;

    const repository = {
        id,
        title,
        url,
        techs
    };

    Object.assign(repositories[request.repositoryIndex], repository)

    return response.json(repositories[request.repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
    repositories.splice(request.repositoryIndex, 1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    repositories[request.repositoryIndex].likes++;
    return response.json(repositories[request.repositoryIndex]);
});

module.exports = app;
