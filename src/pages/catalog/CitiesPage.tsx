import {
  CatalogManager,
  type CatalogField,
} from "@/components/catalog/CatalogManager";
import type { City } from "@/features/catalog/adminTypes";
import { Seo } from "@/lib/seo";

const fields: CatalogField<City>[] = [
  { key: "name", label: "اسم المدينة", type: "text", required: true },
  { key: "is_active", label: "حالة المدينة", type: "switch", updateOnly: true },
];

export default function CitiesPage() {
  return (
    <>
      <Seo
        canonicalPath="/catalog/cities"
        title="إدارة المدن"
        description="صفحة داخلية لإدارة المدن التي تظهر في أسعار Markets YE."
        noindex
      />
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
    </>
  );
}
