Db.createUser({
    user: "adminCrud",
    pwd: "12345",
    roles: [
        { role: "admin users", db: "admin"}
    ]
})