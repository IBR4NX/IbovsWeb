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
      summary={(cityName) =>
        `هذه الصفحة تعرض أسعار المنتجات المتاحة في ${cityName} فقط، مع إمكانية تضييق النتائج حسب الفئة أو اسم المنتج.`
      }
      title={(cityName) => `أسعار المنتجات في ${cityName} اليوم`}
    />
  );
}
