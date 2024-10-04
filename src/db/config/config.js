module.exports = {
    knowhow: {
        dialect: 'mysql',
        database: process.env["DATABASE.DEFAULT.MASTER.DB"],
        port: process.env["DATABASE.DEFAULT.MASTER.PORT"],
        timezone: '+09:00',
        pool: {
            max: 20,
            idle: 30000,
        },
        dialectOptions: {
            timezone: '+09:00'
        },
        replication: {
            read: [
                {
                    host: process.env["DATABASE.DEFAULT.MASTER.HOST"],
                    username: process.env["DATABASE.DEFAULT.MASTER.USER"],
                    password: process.env["DATABASE.DEFAULT.MASTER.PASSWORD"],
                }
            ],
            write: {
                host: process.env["DATABASE.DEFAULT.MASTER.HOST"],
                username: process.env["DATABASE.DEFAULT.MASTER.USER"],
                password: process.env["DATABASE.DEFAULT.MASTER.PASSWORD"],
            }
        }
    }
}