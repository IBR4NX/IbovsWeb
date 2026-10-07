import PricesScopePage from "./PricesScopePage";

export default function CatalogPricesPage() {
  return (
    <PricesScopePage
      canonicalPath="/catalog"
      description={(categoryName) =>
        `تابع أحدث أسعار منتجات ${categoryName} في اليمن، مع إمكانية التصفية حسب المدينة والبحث داخل التصنيف.`
      }
      emptyLabel="لا توجد أسعار متاحة لهذا التصنيف حالياً."
      fixedFilterKey="categoryName"
      invalidLabel="اسم التصنيف غير صحيح."
      loadingLabel={(categoryName) => `جارٍ تحميل أسعار ${categoryName}...`}
      paramName="categoryName"
      title={(categoryName) => `أسعار ${categoryName}`}
    />
  );
}
