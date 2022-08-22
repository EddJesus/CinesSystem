import { ExpressAdapter } from '../../shared/adapters/express.adapter';
import { CineController } from '../../controller/CineController.controller';

import { Router } from 'express'

const routes = Router()

routes.get("/", ExpressAdapter.create(CineController.listCines));
routes.get("/:id", ExpressAdapter.create(CineController.getCine));
routes.post("/", ExpressAdapter.create(CineController.createCine));
routes.put("/:id", ExpressAdapter.create(CineController.updateCine));
routes.delete("/:id", ExpressAdapter.create(CineController.deleteCine));

export { routes }
