import { ExpressAdapter } from '../../shared/adapters/express.adapter';
import { SessionController } from '../../controller/SessionController.controller';

import { Router } from 'express'

const routes = Router()

routes.get("/", ExpressAdapter.create(SessionController.listSessions));
routes.get("/:id", ExpressAdapter.create(SessionController.getSession));
routes.post("/", ExpressAdapter.create(SessionController.createSession));
routes.put("/:id", ExpressAdapter.create(SessionController.updateSession));
routes.delete("/:id", ExpressAdapter.create(SessionController.deleteSession));

export { routes }
