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

#BACK-END SETUP
Considering that the "vagrant up" has been completed and DB is up and running, run the following commands:

$ cd backend
$ npm install
$ yarn dev

POST request:
http://localhost:3333/topics
Parameters: name: string
            description: string

GET request:
http://localhost:3333/topics

Example of return:
[
    {
        "_id": "5ed71c938f49a1034c11521c",
        "name": "First Topic",
        "description": "this is the first description",
        "votes": 1,
        "__v": 0
    }
]

