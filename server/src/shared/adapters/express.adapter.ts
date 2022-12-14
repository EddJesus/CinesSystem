import { Request, Response } from 'express'

export class ExpressAdapter {
	static create (fn: any) {
		return async function (req: Request, res: Response) {
			const obj = await fn(req.params, req.body);
			res.json(obj);
		}
	}
}