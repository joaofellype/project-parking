export default () => ({
    environment:process.env.NODE_ENV,
    tabom:process.env.JWT_SECRET,
    database: {
      uri: process.env.MONGO_URI,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306
    },
    redis:{
        host:process.env.REDIS_HOST,
        port:parseInt(process.env.REDIS_PORT),
        password:process.env.REDIS_PASSWORD
    },
    email:{
        host:process.env.EMAIL_HOST,
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },
    jwt:{
        secret: process.env.JWT_SECRET
    }
 })