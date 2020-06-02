
db.createUser({
  user: "setuptalker",
  pwd: "SetupTalker!0",
  roles: [
    { role: "readWrite", db: "setuptalk" }
  ]
})
