// <##☆##> Add Price Page <##☆##>

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/features/submissions/SearchAbleSelect";
import { Textarea } from "@/components/ui/textarea";
import { submissionsApi } from "@/features/submissions/api";
import { useCatalogOptions } from "@/hooks/useCatalogOptions";
import type { CreateSubmissionInput } from "@/features/submissions/types";
import { Seo } from "@/lib/seo";

const EMPTY_FORM: CreateSubmissionInput = {
  product_name: "",
  city_name: "",
  price: 0,
  note: "",
};

export default function AddPricePage() {
  const navigate = useNavigate();
  const { cities, products, loading: catalogLoading } = useCatalogOptions();
  const [form, setForm] = useState<CreateSubmissionInput>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof CreateSubmissionInput>(
    key: K,
    value: CreateSubmissionInput[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.product_name.trim() && form.city_name.trim() && form.price > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      await submissionsApi.create(form);
      toast.success("تم إرسال السعر بنجاح");
      navigate("/");
    } catch {
      toast.error("فشل إرسال السعر، حاول مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  const productOptions = products.map((p) => ({ value: p.name, label: p.name }));
  const cityOptions = cities.map((c) => ({ value: c.name, label: c.name }));

  return (
    <>
      <Seo
        canonicalPath="/add-price"
        title="إضافة سعر جديد"
        description="أضف سعر منتج في مدينة ليُراجع من فريق Markets YE."
      />

      <main
        dir="rtl"
        className="min-h-screen bg-background px-4 py-6 text-foreground"
      >
        <div className="mx-auto w-full max-w-2xl">
          <Button
            render={<Link to="/" />}
            nativeButton={false}
            type="button"
            variant="ghost"
            size="sm"
            className="mb-2 px-0 text-muted-foreground hover:bg-transparent"
          >
            <ArrowRight />
            العودة للرئيسية
          </Button>

          <h1 className="mb-2 text-2xl font-bold tracking-tight">
            إضافة سعر جديد
          </h1>
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            اختر المنتج والمدينة، أدخل السعر، وسيتم مراجعة الطلب قبل نشره.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>تفاصيل السعر</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product_name">المنتج</Label>
                  <SearchableSelect
                    id="product_name"
                    value={form.product_name}
                    onValueChange={(v) => update("product_name", v)}
                    options={productOptions}
                    placeholder="اختر المنتج"
                    searchPlaceholder="ابحث عن منتج..."
                    disabled={catalogLoading || submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city_name">المدينة</Label>
                  <SearchableSelect
                    id="city_name"
                    value={form.city_name}
                    onValueChange={(v) => update("city_name", v)}
                    options={cityOptions}
                    placeholder="اختر المدينة"
                    searchPlaceholder="ابحث عن مدينة..."
                    disabled={catalogLoading || submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">السعر</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price || ""}
                    onChange={(e) => update("price", Number(e.target.value))}
                    placeholder="0"
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">ملاحظة (اختياري)</Label>
                  <Textarea
                    id="note"
                    value={form.note ?? ""}
                    onChange={(e) => update("note", e.target.value)}
                    placeholder="أي تفاصيل إضافية..."
                    disabled={submitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isValid || submitting || catalogLoading}
                >
                  {submitting ? "جارٍ الإرسال..." : "إرسال السعر"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}