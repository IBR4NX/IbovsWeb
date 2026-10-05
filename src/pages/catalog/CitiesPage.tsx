import {
  CatalogManager,
  type CatalogField,
} from "@/components/catalog/CatalogManager";
import type { City } from "@/features/catalog/adminTypes";

const fields: CatalogField<City>[] = [
  { key: "name", label: "اسم المدينة", type: "text", required: true },
  { key: "is_active", label: "حالة المدينة", type: "switch", updateOnly: true },
];

export default function CitiesPage() {
  return (
    <CatalogManager<City>
      title="المدن"
      singular="مدينة"
      description="أضف المدن المتاحة للكتالوج وحدّث حالتها."
      resource="/cities"
      fields={fields}
      columns={[
        { key: "name", label: "المدينة" },
        { key: "is_active", label: "الحالة" },
      ]}
    />
  );
}
