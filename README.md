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

## BACK-END SETUP
### **Follow "Required software" instructions**
- Considering that the "vagrant up" has been completed and DB is up and running, run the following commands:
```
$ cd backend
$ npm install
$ yarn dev
```

### - Create new Topic (POST request):
- http://localhost:3333/topics

**Parameters:**
```
name: string
description: string
```

### - Get the list of all topics (GET request):
- http://localhost:3333/topics

```
Example of return:
[
    "topics": 
        {
            "_id": "5ed71c938f49a1034c11521c",
            "name": "First Topic",
            "description": "this is the first,
            "posted_by: "thiago.velho@actminds.com",
            "votes": [],
            "__v": 0
        },
        {
            "_id": "6ed44c938f49a7676c11521c",
            "name": "Second Topic",
            "description": "this is the another,
            "posted_by: "thiago.velho@actminds.com"
            "votes": [],
            "__v": 0
        }
]
```

### - Delete a topic (DELETE request):
- http://localhost:3333/topics/:id
```
Returns the object of the deleted topic
```


### - To vote up a specific topic (POST request):
- http://localhost:3333/topics/:id/voteup

**Parameters:**
````
- within Headers:
user: <LOGGEDIN-USER-EMAIL>
````


```
Return is an json object with all values of the updated topic (vote is automatically increased by 1).
Example:
{
    "_id": "5ed71c938f49a1034c11521c",
    "name": "React/Angular",
    "description": "frontend frameworks",
    "posted_by: "thiago.velho@actminds.com"
    "votes": ["<LOGGEDIN-USER-EMAIL>"],
    "__v": 0
}
```

### - PATCH request (To update the name and description of a topic based on its id):
- http://localhost:3333/topics/:id

**Parameters:**
````
name: string
description: string
````

**Return**
- Is an json object with all values of the updated topic.
````
Example:
{
    "_id": "5ed71c938f49a1034c11521c",
    "name": "New name",
    "description": "rrr",
    "posted_by: "thiago.velho@actminds.com",
    "votes": ["someuser@actminds.com", "someuser@programmers.com"],
    "__v": 2
}
````


## FRONT-END SETUP
### Follow "Required software" and "BACK-END SETUP" instructions.
- Considering both have been done, run following commands:

```
$ cd frontend
$ npm install
$ npm start
```