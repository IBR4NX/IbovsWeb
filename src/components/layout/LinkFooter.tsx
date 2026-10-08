import { Link } from "react-router-dom";


// const cities = [
//   { name: "صنعاء", slug: "sanaa" },
//   { name: "عدن", slug: "aden" },
//   { name: "تعز", slug: "taiz" },
//   { name: "إب", slug: "ibb" },
//   { name: "الحديدة", slug: "hodeidah" },
//   { name: "حضرموت", slug: "hadramout" },
// ];

// const categories = [
//   { name: "الأرز", slug: "rice" },
//   { name: "القمح", slug: "wheat" },
//   { name: "الدقيق", slug: "flour" },
//   { name: "السكر", slug: "sugar" },
//   { name: "الزيوت", slug: "oil" },
//   { name: "المشتقات النفطية", slug: "fuel" },
// ];
const cities = [
  { name: "صنعاء", slug: "صنعاء" },
  { name: "عدن", slug: "عدن" },
  { name: "تعز", slug: "تعز" },
  { name: "إب", slug: "إب" },
  { name: "الحديدة", slug: "الحديدة" },
  { name: "حضرموت", slug: "حضرموت" },
];

const categories = [
  { name: "الأرز", slug: "الأرز" },
  { name: "القمح", slug: "قمح" },
  { name: "الدقيق", slug: "دقيق" },
  { name: "السكر", slug: "سكر" },
  { name: "الزيوت", slug: "زيوت" },
];
export default function LinkFooter() {

  return (

        <div className="grid gap-8 text-lg sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <h2 className="text-2xl font-semibold">أسعار المحافظات</h2>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-muted-foreground">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/cities/${city.slug}`}
                  className="w-1/4 underline min-w-fit underline-offset-2  hover:text-blue-700"
                >
                  أسعار {city.name}
                </Link>
              ))}
            </div>

            <Link
              to="/cities"
              className="mt-4 text-xl inline-block font-medium underline underline-offset-2   hover:text-blue-700"
            >
              جميع المحافظات
            </Link>
          </div>

          {/* Categories */}
          <div>
            <h1 className="text-2xl font-semibold">
              أسعار المنتجات
            </h1>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-muted-foreground">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/product/${category.slug}`}
                  className="w-fit underline-offset-2 underline  hover:text-blue-700"
                >
                  أسعار {category.name}
                </Link>
              ))}
            </div>

            <Link
              to="/categories"
              className="mt-4 text-xl inline-block font-medium  underline-offset-2  underline hover:text-blue-700"
            >
              جميع الفئات
            </Link>
          </div>

        </div>
  );
}

