import { Request, Response, Router } from "express";

import pool from "../../database";
import { InternalErrorResponse, NotFoundResponse, SuccessResponse } from "../../core/ApiResponse";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("select * from get_cities($1::boolean);", [req.query.includeInactive === "true"]);
    if (result.rows.length > 0) return new SuccessResponse("successful", result.rows).send(res);
    return new NotFoundResponse("No cities found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to get cities").send(res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const result = await pool.query("select * from create_city($1::varchar);", [name]);
    if (result.rows.length > 0) return new SuccessResponse("successful", result.rows[0]).send(res);
    return new NotFoundResponse("City was not created").send(res);
  } catch {
    return new InternalErrorResponse("Failed to create city").send(res);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { name, is_active } = req.body;
    const result = await pool.query(
      "select * from update_city($1::uuid, $2::varchar, $3::boolean);",
      [req.params.id, name ?? null, is_active ?? null],
    );
    if (result.rows.length > 0) return new SuccessResponse("successful", result.rows[0]).send(res);
    return new NotFoundResponse("City not found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to update city").send(res);
  }
});

export default router;
