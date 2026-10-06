import PricesScopePage from "./PricesScopePage";

export default function ProductPricesPage() {
  return (
    <PricesScopePage
      canonicalPath="/product"
      description={(productName) =>
        `تابع أحدث أسعار ${productName} في اليمن حسب المدينة والفئة، مع نتائج مخصصة لهذا المنتج فقط.`
      }
      emptyLabel="لا توجد أسعار متاحة لهذا المنتج حالياً."
      fixedFilterKey="search"
      invalidLabel="اسم المنتج غير صحيح."
      loadingLabel={(productName) => `جارٍ تحميل أسعار ${productName}...`}
      paramName="productName"
      summary={(productName) =>
        `تعرض الصفحة أسعار ${productName} المتاحة في اليمن، ويمكنك استخدام فلتر المدينة لمعرفة السعر في صنعاء أو تعز أو عدن عند توفر البيانات.`
      }
      title={(productName) => `سعر ${productName} اليوم في اليمن`}
    />
  );
}
