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
