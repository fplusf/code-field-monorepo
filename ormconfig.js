module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['public/**/*.entity.js'],
  migrations: ['public/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
