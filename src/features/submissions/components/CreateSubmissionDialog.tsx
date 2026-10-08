// <##☆##> Create Submission Dialog <##☆##>

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCatalogOptions } from "@/hooks/useCatalogOptions";
import type { CreateSubmissionInput } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateSubmissionInput) => void;
  loading?: boolean;
}

const EMPTY_FORM: CreateSubmissionInput = {
  product_name: "",
  city_name: "",
  price: 0,
  note: "",
};

export function CreateSubmissionDialog({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: Props) {
  const [form, setForm] = useState<CreateSubmissionInput>(EMPTY_FORM);
  const { cities, products, loading: catalogLoading } = useCatalogOptions();

  const update = <K extends keyof CreateSubmissionInput>(
    key: K,
    value: CreateSubmissionInput[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    onSubmit(form);
    setForm(EMPTY_FORM);
  };

  const isValid =
    form.product_name.trim() && form.city_name.trim() && form.price > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة طلب سعر جديد</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="product_name">المنتج</Label>
            <Select
              value={form.product_name}
              onValueChange={(v) => update("product_name", v ?? "")}
              disabled={catalogLoading}
            >
              <SelectTrigger id="product_name">
                <SelectValue placeholder="اختر المنتج" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city_name">المدينة</Label>
            <Select
              value={form.city_name}
              onValueChange={(v) => update("city_name", v ?? "")}
              disabled={catalogLoading}
            >
              <SelectTrigger id="city_name">
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">السعر</Label>
            <Input
              id="price"
              type="number"
              value={form.price || ""}
              onChange={(e) => update("price", Number(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">ملاحظة (اختياري)</Label>
            <Textarea
              id="note"
              value={form.note ?? ""}
              onChange={(e) => update("note", e.target.value)}
              placeholder="ملاحظة..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid || loading}>
            {loading ? "جارٍ الإضافة..." : "إضافة"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
