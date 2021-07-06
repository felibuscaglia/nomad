module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": Number(process.env.DB_PORT),
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": [
        "dist/**/*.model.js"
     ],
    "migrationsTableName": "migration",
    "migrations": [
        "dist/migration/**/*.js"
     ],
    "cli": {
        "migrationsDir": "src/migration"
    },
    "synchronize": false
}