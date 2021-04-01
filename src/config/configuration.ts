export default () => ({
  port: 3000,
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/db/migrations/*.js'],
    cli: {
      migrationsDir: 'src/db/migrations'
    },
    synchronize: false,
    logging: true
  },
});
