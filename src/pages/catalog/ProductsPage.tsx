import { useEffect, useState } from "react";

import { CatalogManager, type CatalogField } from "@/components/catalog/CatalogManager";
import { getCatalogItems } from "@/features/catalog/catalogApi";
import type { Category, Product } from "@/features/catalog/adminTypes";

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCatalogItems<Category>("/categories", { includeInactive: false })
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const fields: CatalogField<Product>[] = [
    { key: "name", label: "اسم المنتج", type: "text", required: true },
    { key: "category_id", label: "الفئة", type: "select", required: true, options: categories.map((category) => ({ value: category.id, label: category.name })) },
    { key: "description", label: "وصف المنتج", type: "textarea" },
    { key: "quantity", label: "الكمية", type: "number", required: true },
    { key: "unit", label: "الوحدة", type: "text", required: true },
    { key: "is_active", label: "حالة المنتج", type: "switch", updateOnly: true },
  ];

  return <CatalogManager<Product> title="المنتجات" singular="منتج" description="أدخل المنتج باختيار فئة نشطة ثم الاسم والوصف والكمية والوحدة." resource="/products" fields={fields} columns={[{ key: "name", label: "المنتج" }, { key: "category_name", label: "الفئة" }, { key: "description", label: "الوصف" }, { key: "quantity", label: "الكمية" }, { key: "unit", label: "الوحدة" }, { key: "is_active", label: "الحالة" }]} />;
}
