import { Request, Response, Router } from "express";

import pool from "../../database";
import {
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/ApiResponse";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { categoryId, cityId, search, includeInactive } = req.query;
    const result = await pool.query(
      "select * from get_products($1::uuid, $2::uuid, $3::text, $4::boolean);",
      [
        categoryId ?? null,
        cityId ?? null,
        search ?? null,
        includeInactive === "true",
      ],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }

    return new NotFoundResponse("No products found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to get products").send(res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { category_id, name, description, quantity, unit } = req.body;
    const result = await pool.query(
      "select * from create_product($1::uuid, $2::varchar, $3::text, $4::decimal, $5::varchar);",
      [category_id, name, description ?? null, quantity, unit],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows[0]).send(res);
    }

    return new NotFoundResponse("Product was not created").send(res);
  } catch {
    return new InternalErrorResponse("Failed to create product").send(res);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { category_id, name, description, quantity, unit, is_active } = req.body;
    const result = await pool.query(
      "select * from update_product($1::uuid, $2::uuid, $3::varchar, $4::text, $5::decimal, $6::varchar, $7::boolean);",
      [
        req.params.id,
        category_id ?? null,
        name ?? null,
        description ?? null,
        quantity ?? null,
        unit ?? null,
        is_active ?? null,
      ],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows[0]).send(res);
    }

    return new NotFoundResponse("Product not found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to update product").send(res);
  }
});

export default router;
