import { ExpressAdapter } from '../../shared/adapters/express.adapter';
import { MovieController } from '../../controller/MovieController.controller';

import { Router } from 'express'

const routes = Router()

routes.get("/", ExpressAdapter.create(MovieController.listMovies));
routes.get("/:id", ExpressAdapter.create(MovieController.getMovie));
routes.post("/", ExpressAdapter.create(MovieController.createMovie));
routes.put("/:id", ExpressAdapter.create(MovieController.updateMovie));
routes.delete("/:id", ExpressAdapter.create(MovieController.deleteMovie));

export { routes }
