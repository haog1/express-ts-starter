import { Sequelize } from 'sequelize'

let sequelize: Sequelize

if (process.env?.NODE_ENV === 'test') {
  console.log('Running in test env')
  const sq = new Sequelize('sqlite::memory:')
  sequelize = sq
} else {
  const sq = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
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

  sq.authenticate()
    .then(() => {
      console.log('\x1b[36m%s\x1b[0m', '[postgress]', 'is connected...')
    })
    .catch(err => {
      console.error('Unable to connect to the database postgres:', err)
    })

  sequelize = sq
}

export { sequelize }
