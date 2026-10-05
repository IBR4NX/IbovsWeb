import {
  CatalogManager,
  type CatalogField,
} from "@/components/catalog/CatalogManager";
import type { Category } from "@/features/catalog/adminTypes";

const fields: CatalogField<Category>[] = [
  { key: "name", label: "اسم الفئة", type: "text", required: true },
  { key: "description", label: "الوصف", type: "textarea" },
  { key: "is_active", label: "حالة الفئة", type: "switch", updateOnly: true },
];

export default function CategoriesPage() {
  return (
    <CatalogManager<Category>
      title="الفئات"
      singular="فئة"
      description="نظّم المنتجات ضمن فئات واضحة."
      resource="/categories"
      fields={fields}
      columns={[
        { key: "name", label: "الفئة" },
        { key: "description", label: "الوصف" },
        { key: "is_active", label: "الحالة" },
      ]}
    />
  );
}
