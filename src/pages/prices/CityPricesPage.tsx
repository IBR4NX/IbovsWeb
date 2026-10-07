import PricesScopePage from "./PricesScopePage";

export default function CityPricesPage() {
  return (
    <PricesScopePage
      canonicalPath="/city"
      description={(cityName) =>
        `تابع أحدث أسعار المنتجات في ${cityName} حسب المنتج والفئة، مع نتائج مخصصة لهذه المدينة فقط.`
      }
      emptyLabel="لا توجد أسعار متاحة لهذه المدينة حالياً."
      fixedFilterKey="cityName"
      invalidLabel="اسم المدينة غير صحيح."
      loadingLabel={(cityName) => `جارٍ تحميل أسعار ${cityName}...`}
      paramName="cityName"
      title={(cityName) => `أسعار المنتجات في ${cityName}`}
    />
  );
}
