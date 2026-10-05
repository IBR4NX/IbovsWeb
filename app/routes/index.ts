import { Router } from "express";

import categoriesRouter from "./categories";
import citiesRouter from "./cities";
import dashboardRouter from "./dashboard";
import productsRouter from "./products";

const router = Router();

router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/cities", citiesRouter);
router.use("/dashboard", dashboardRouter);

export default router;
