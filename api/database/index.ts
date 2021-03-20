import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (dbName: string = null): Promise<Connection> => {

  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test'
        ? `./database/database.test.${dbName}.sqlite`
        : defaultOptions.database
    })
  );
}