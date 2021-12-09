import { Sequelize } from "sequelize-typescript";
import config from "@/config";
import { SequelizeStorage, Umzug } from "umzug";

export const sequelize = new Sequelize(
  process.env.USE_POSTGRES === "true"
    ? {
        dialect: "postgres",
        host: config.postgres.host,
        port: config.postgres.port,
        username: config.postgres.user,
        password: config.postgres.password,
        database: config.postgres.db,
        logging: config.logging,
        models: [__dirname + "/models/**.model.**"],
      }
    : {
        dialect: "sqlite",
        storage: config.sqlite.storage || "SQLite.db",
        logging: config.logging,
        models: [__dirname + "/models/**.model.**"],
      }
);

export const migrations = new Umzug({
  migrations: {
    glob: ["migrations/*", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "MigrationsMeta",
  }),
  logger: console,
});

export const seeders = new Umzug({
  migrations: {
    glob: ["seeders/*", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    tableName: "SeedersMeta",
  }),
  logger: console,
});

export const connect = async (count = 0) => {
  count += 1;
  sequelize
    .authenticate()
    .then(async () => {
      console.log("DB connected");
      if (process.env.FORCE_DB === "true") {
        await sequelize.sync({ force: true });
        await migrations.runAsCLI(["up"]);
        await seeders.runAsCLI(["up"]);
      }
    })
    .catch((error) => {
      if (count <= 10) {
        setTimeout(async () => {
          await connect(count);
        }, 1000);
      }
      console.log("error connect db:", error.message);
    });
};
