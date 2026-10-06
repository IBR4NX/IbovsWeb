import PricesScopePage from "./PricesScopePage";

export default function CityProductPrice() {
  return (
    <PricesScopePage
      canonicalPath="/city"
      description={(cityName, productName) =>
        `تابع أحدث أسعار ${productName} في ${cityName}، مع نتائج مخصصة للمدينة والمنتج فقط.`
      }
      emptyLabel="لا توجد أسعار متاحة لهذا المنتج في هذه المدينة حالياً."
      extraFixedFilter={{
        key: "search",
        paramName: "productName",
        pathSegment: "product",
      }}
      fixedFilterKey="cityName"
      invalidLabel="اسم المدينة أو المنتج غير صحيح."
      loadingLabel={(cityName, productName) =>
        `جارٍ تحميل أسعار ${productName} في ${cityName}...`
      }
      paramName="cityName"
      summary={(cityName, productName) =>
        `هذه نتيجة مركزة لمن يبحث عن سعر ${productName} في ${cityName} تحديداً، مع بقاء فلتر الفئة متاحاً إذا احتجت تضييق النتائج.`
      }
      title={(cityName, productName) => `سعر ${productName} في ${cityName} اليوم`}
    />
  );
}
