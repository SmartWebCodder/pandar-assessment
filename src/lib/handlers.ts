import { Request, Response, NextFunction } from "express";

class Handlers {
  errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError && ("body" in err || "query" in err)) {
      return res.status(400).json({
        error: "Bad request - Invalid input parameter(s)",
      });
    } else if (err instanceof TypeError) {
      return res.status(400).json({
        error: "Bad request - Invalid parameter",
      });
    }

    return res.status(err.status || 500).json({ error: err.message || err });
  }

  Error404Handler(req: Request, res: Response, next: NextFunction) {
    return res.status(404).json({ error: "Oops, no page found!" });
  }
}

export default new Handlers();
