import Footer from "@/components/layout/Footer";
import { Seo } from "@/lib/seo";

export default function Notfound() {
    return <div className="fllex flex-cokl items-center bg-background justify-center pt-10 min-w-screen min-h-screen">
        <Seo
            canonicalPath="/notfound"
            title="الصفحة غير موجودة"
            description="الصفحة المطلوبة غير موجودة. يمكنك الرجوع إلى صفحة أسعار المنتجات في اليمن أو الصفحة الرئيسية."
            noindex
        />
        <div onClick={()=>location.href="/"} className="text-center">
            <h1 className="text-4xl font-bold mb-4">الصفحة غير موجودة</h1>
            <p className="text-xl mb-6">الرابط الذي فتحته غير متاح حالياً.</p>
            <p className="mb-6">يمكنك الرجوع للصفحة الرئيسية أو فتح صفحة الأسعار للبحث عن منتج أو مدينة.</p>
            <div className="mb-6">
                <p className="mb-2"><strong>تحقق من الرابط:</strong> قد يكون هناك خطأ في اسم الصفحة.</p>
                <p className="mb-2"><strong>العودة للرئيسية:</strong> انتقل إلى <a href="/" className="text-blue-500 hover:underline">الصفحة الرئيسية</a>.</p>
                <p className="mb-2"><strong>البحث عن الأسعار:</strong> افتح <a href="/prices" className="text-blue-500 hover:underline">صفحة الأسعار</a>.</p>
            </div>
        </div>
        <Footer/>
    </div>
}
