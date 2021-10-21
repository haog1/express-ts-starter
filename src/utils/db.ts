import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  benchmark: true,
  dialect: 'postgres',
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
})

sequelize
  .authenticate()
  .then(() => {
    console.log('\x1b[36m%s\x1b[0m', '[postgress]', 'is connected...')
  })
  .catch(err => {
    console.error('Unable to connect to the database postgres:', err)
  })

export { sequelize }
