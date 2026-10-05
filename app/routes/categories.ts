import { Request, Response, Router } from "express";

import pool from "../../database";
import { InternalErrorResponse, NotFoundResponse, SuccessResponse } from "../../core/ApiResponse";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("select * from get_categories($1::boolean);", [req.query.includeInactive === "true"]);
    if (result.rows.length > 0) return new SuccessResponse("successful", result.rows).send(res);
    return new NotFoundResponse("No categories found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to get categories").send(res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const result = await pool.query("select * from create_category($1::varchar, $2::text);", [name, description ?? null]);
    if (result.rows.length > 0) return new SuccessResponse("successful", result.rows[0]).send(res);
    return new NotFoundResponse("Category was not created").send(res);
  } catch {
    return new InternalErrorResponse("Failed to create category").send(res);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { name, description, is_active } = req.body;
    const result = await pool.query(
      "select * from update_category($1::uuid, $2::varchar, $3::text, $4::boolean);",
      [req.params.id, name ?? null, description ?? null, is_active ?? null],
    );
    if (result.rows.length > 0) return new SuccessResponse("successful", result.rows[0]).send(res);
    return new NotFoundResponse("Category not found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to update category").send(res);
  }
});

export default router;
