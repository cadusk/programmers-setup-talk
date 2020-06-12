# SetupTalk
Repositório para armazenar os fontes do backend e frontend do Projeto SetupTalk


## Required software
In dev environment, mongodb runs as docker container.
- Virtualbox
- Vagrant

After installing Virtualbox and Vagrant, run the following commands:
```
$ cd vagrant
$ vagrant up
```

If all went well, by the end of the execution you should be able to mongodb by
connecting to localhost:27017. For details about database name and credentials,
refer to configuration files in `db/` folder.

# BACK-END SETUP
## Follow "Required software" instructions
- Considering that the "vagrant up" has been completed and DB is up and running, run the following commands:
```
$ cd backend
$ npm install
$ yarn dev
```

### POST request:
- http://localhost:3333/topics

**Parameters:**
```
name: string
description: string
```

### GET request:
- http://localhost:3333/topics

```
Example of return:
[
    "topics": 
        {
            "_id": "5ed71c938f49a1034c11521c",
            "name": "First Topic",
            "description": "this is the first description",
            "votes": 0,
            "__v": 0
        },
        {
            "_id": "6ed44c938f49a7676c11521c",
            "name": "Second Topic",
            "description": "this is the another description",
            "votes": 0,
            "__v": 0
        }
]
```

### DELETE request:
- http://localhost:3333/topics/:id
```
Returns the object of the deleted topic
```


### POST request (To update the Vote of a specific Topic):
- http://localhost:3333/topics/:id/voteup

```
    Return is an json object with all values of the updated topic (vote is automatically increased by 1).
    Example:
    {
        "_id": "5ed71c938f49a1034c11521c",
        "name": "React/Angular",
        "description": "frontend frameworks",
        "votes": 8,
        "__v": 0
    }
```

### PATCH request (To update the name and description of a topic based on its id):
- http://localhost:3333/topics/:id

**Parameters:**
```
name: string
description: string


Return is an json object with all values of the updated topic.
Example:
{
    "_id": "5ed71c938f49a1034c11521c",
    "name": "New name",
    "description": "rrr",
    "votes": 8,
    "__v": 0
}
```


# FRONT-END SETUP
## Follow "Required software" and "BACK-END SETUP" instructions.
- Considering both have been done, run following commands:

```
$ cd frontend
$ npm install
$ npm start
```

## Setting environment variables.

### In the project root, create a file called ```.env``` and copy the environment variables from the .env.example

### Declaring a variable: 

```
REACT_APP_VARIABLE_NAME=value
```

### **The environment variable must begin with REACT_APP, otherwise will be ignored.**
### Using environment variable: 

```
process.env.REACT_APP_VARIABLE_NAME
```

### **If after declaration is not working, consider to stop the application and run it again.**

## Creating a repository.
### To create a repository go to ```src/repo```.
### Once created, extend the Repository class and pass the API URL into constructor, then implement only the specific methods in the created repository.