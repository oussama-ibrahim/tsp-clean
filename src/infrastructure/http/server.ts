import express from 'express';
import cors from 'cors';
import bp from 'body-parser';
import { locationRoutes } from './routers/location';
import { initDb } from '../db/initDb';
import { EntityManager } from '@mikro-orm/postgresql';

function server(port: number) {
  const app = express();
  app.use(cors({ origin: '*' }));
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: true }));
  (async () => {
    const db = await initDb();
    app.use('/api/v1/locations', locationRoutes(db as EntityManager));
  })();

  app.listen(port, () => console.log(`Server is listening on port ${port}`));
}

export { server };
