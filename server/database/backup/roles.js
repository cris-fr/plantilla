db.createRole(
    {
        role: "admin users",
        privileges: [
            {
                resource: { db: "crud", collection: "user" },
                actions: [ "find", "insert", "update" ]
            }
        ],
        roles: [
             { role: "userAdminAnyDataBase", db: "admin" },
             { role: "readWrite", db: "admin" }
        ]
    });

    db.createRole({
        role: "user standard",
        privileges: [
            {
                resource: { db: "ejemploCRUD", collection: "user" },
                actions: ["find", "insert", "update"]
            },
            {
                resource: { db: "ejemploCRUD", collection: "product" },
                actions: ["find", "insert", "update"]
            }
        ],
        roles: []
    });