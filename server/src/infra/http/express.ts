import express from "express";

import { movieRouter, cineRouter, sessionRouter } from '../routes'

const app = express();

app.use(express.json());

app.get('/v1/health', (req, res) => {
  res.send('OK');
});
app.use('/v1/movies', movieRouter.routes);
app.use('/v1/cines', cineRouter.routes);
app.use('/v1/sessions', sessionRouter.routes);

export { app }