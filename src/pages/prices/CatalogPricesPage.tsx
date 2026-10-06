import PricesScopePage from "./PricesScopePage";

export default function CatalogPricesPage() {
  return (
    <PricesScopePage
      canonicalPath="/category"
      description={(categoryName) =>
        `تابع أحدث أسعار منتجات ${categoryName} في اليمن، مع إمكانية التصفية حسب المدينة والبحث داخل التصنيف.`
      }
      emptyLabel="لا توجد أسعار متاحة لهذا التصنيف حالياً."
      fixedFilterKey="categoryName"
      invalidLabel="اسم التصنيف غير صحيح."
      loadingLabel={(categoryName) => `جارٍ تحميل أسعار ${categoryName}...`}
      paramName="categoryName"
      summary={(categoryName) =>
        `استخدم هذه الصفحة لمتابعة أسعار ${categoryName} في المدن اليمنية المتاحة، ثم اختر المدينة إذا أردت مقارنة النتائج.`
      }
      title={(categoryName) => `أسعار ${categoryName} في اليمن`}
    />
  );
}
