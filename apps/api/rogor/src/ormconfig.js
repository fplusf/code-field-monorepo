const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

export const typeOrmConfig = {
  type: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: 5432,
  host: DB_HOST,
  database: DB_DATABASE,
  synchronize: true,
  entities: ['src/entity/**/*.ts'],
  autoLoadEntities: true,
  logging: true,
  // entities: ['/dist/**/*.entity{ .ts,.js}'],
  migrations: ['/dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
  cli: {
    entitiesDir: 'src/**/*.entity{ .ts,.js}',
    migrationsDir: 'src/migrations',
  },
};

module.exports = typeOrmConfig;
