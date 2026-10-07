import { Check, Pencil, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { createCatalogItem, getCatalogItems, updateCatalogItem } from "@/features/catalog/catalogApi";
import type { CatalogEntity, CatalogPayload } from "@/features/catalog/adminTypes";

const EMPTY_VALUE = "__empty__";

type FieldType = "text" | "number" | "textarea" | "select" | "switch";

export interface SelectOption {
  label: string;
  value: string;
}

export interface CatalogField<T extends CatalogEntity> {
  key: keyof T;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: SelectOption[];
  updateOnly?: boolean;
}

interface CatalogManagerProps<T extends CatalogEntity> {
  title: string;
  description: string;
  singular: string;
  resource: string;
  fields: CatalogField<T>[];
  columns: Array<{ key: keyof T; label: string }>;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

function toPayload<T extends CatalogEntity>(
  values: Record<string, string>,
  fields: CatalogField<T>[],
): CatalogPayload {
  return fields.reduce<CatalogPayload>((payload, field) => {
    const value = values[String(field.key)] ?? "";
    payload[String(field.key)] = field.type === "number" && value
      ? Number(value)
      : field.type === "switch"
        ? value === "true"
        : value || null;
    return payload;
  }, {});
}

export function CatalogManager<T extends CatalogEntity>({
  title,
  description,
  singular,
  resource,
  fields,
  columns,
}: CatalogManagerProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const initialValues = useMemo(
    () => fields.reduce<Record<string, string>>((current, field) => {
      current[String(field.key)] = "";
      return current;
    }, {}),
    [fields],
  );

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getCatalogItems<T>(resource, { includeInactive, search });
        if (!controller.signal.aborted) setItems(result);
      } catch (loadError) {
        if (!controller.signal.aborted) setError(loadError instanceof Error ? loadError.message : "تعذر تحميل البيانات.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, search ? 300 : 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [includeInactive, resource, search]);

  const openCreate = () => {
    setEditingItem(null);
    setValues(initialValues);
    setFormError("");
    setDialogOpen(true);
  };

  const openEdit = (item: T) => {
    setEditingItem(item);
    setValues(fields.reduce<Record<string, string>>((current, field) => {
      current[String(field.key)] = formatValue(item[field.key]);
      return current;
    }, {}));
    setFormError("");
    setDialogOpen(true);
  };

  const save = async () => {
    const activeFields = fields.filter((field) => !field.updateOnly || editingItem);
    const missingField = activeFields.find(
      (field) => field.required && !values[String(field.key)]?.trim(),
    );

    if (missingField) {
      setFormError(`حقل ${missingField.label} مطلوب.`);
      return;
    }

    setSaving(true);
    setError("");
    setFormError("");
    try {
      const payload = toPayload(values, activeFields);
      const saved = editingItem
        ? await updateCatalogItem<T>(resource, editingItem.id, payload)
        : await createCatalogItem<T>(resource, payload);

      setItems((current) => editingItem
        ? current.map((item) => item.id === saved.id ? saved : item)
        : [saved, ...current]);
      setDialogOpen(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "تعذر حفظ البيانات.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main dir="rtl" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">إدارة الكتالوج</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <Button type="button" size="lg" className="h-11 w-full sm:w-auto" onClick={openCreate}>
          <Plus /> إضافة {singular}
        </Button>
      </div>

      <section className="mt-7 rounded-xl border bg-card p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <InputGroup className="h-10 flex-1">
            <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
            <InputGroupInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`ابحث في ${title}...`} />
          </InputGroup>
          <div className="flex h-10 items-center justify-between gap-3 rounded-lg border px-3 sm:justify-start">
            <Label htmlFor={`${resource}-inactive`} className="text-sm">عرض غير النشط</Label>
            <Switch id={`${resource}-inactive`} checked={includeInactive} onCheckedChange={setIncludeInactive} />
          </div>
        </div>
      </section>

      {error && <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

      <section className="mt-4">
        {loading ? <p className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">جارٍ تحميل البيانات...</p> : items.length === 0 ? <p className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">لا توجد بيانات مطابقة.</p> : <>
          <div className="grid gap-3 md:hidden">
            {items.map((item) => (
              <article key={item.id} className="rounded-xl border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0"><h2 className="truncate font-semibold">{item.name}</h2><p className="mt-1 text-xs text-muted-foreground">{item.is_active ? "نشط" : "غير نشط"}</p></div>
                  <Button variant="outline" size="sm" onClick={() => openEdit(item)}><Pencil /> تعديل</Button>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {columns.slice(1).map((column) => <div key={String(column.key)}><dt className="text-xs text-muted-foreground">{column.label}</dt><dd className="mt-1 truncate">{formatValue(item[column.key])}</dd></div>)}
                </dl>
              </article>
            ))}
          </div>
          <div className="hidden overflow-x-auto rounded-xl border bg-card md:block">
            <Table>
              <TableHeader><TableRow>{columns.map((column) => <TableHead key={String(column.key)}>{column.label}</TableHead>)}<TableHead className="w-28">الإجراء</TableHead></TableRow></TableHeader>
              <TableBody>{items.map((item) => <TableRow key={item.id}>{columns.map((column) => <TableCell key={String(column.key)}>{column.key === "is_active" ? item.is_active ? <span className="inline-flex items-center gap-1 text-green-700"><Check className="size-4" /> نشط</span> : "غير نشط" : formatValue(item[column.key])}</TableCell>)}<TableCell><Button variant="ghost" size="sm" onClick={() => openEdit(item)}><Pencil /> تعديل</Button></TableCell></TableRow>)}</TableBody>
            </Table>
          </div>
        </>}
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger render={<span />} />
        <DialogContent dir="rtl" className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          <DialogHeader><DialogTitle>{editingItem ? `تعديل ${singular}` : `إضافة ${singular}`}</DialogTitle><DialogDescription>أدخل البيانات ثم احفظ التغييرات.</DialogDescription></DialogHeader>
          <div className="grid gap-4 py-2">
            {formError && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{formError}</p>}
            {fields.filter((field) => !field.updateOnly || editingItem).map((field) => <div key={String(field.key)} className="grid gap-2"><Label htmlFor={String(field.key)}>{field.label}</Label>{field.type === "switch" ? <div className="flex h-10 items-center justify-between rounded-lg border px-3"><span className="text-sm text-muted-foreground">{values[String(field.key)] === "true" ? "نشط" : "غير نشط"}</span><Switch id={String(field.key)} checked={values[String(field.key)] === "true"} onCheckedChange={(checked) => setValues((current) => ({ ...current, [String(field.key)]: String(checked) }))} /></div> : field.type === "textarea" ? <Textarea id={String(field.key)} value={values[String(field.key)] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [String(field.key)]: event.target.value }))} /> : field.type === "select" ? <Select value={values[String(field.key)] || EMPTY_VALUE} onValueChange={(value) => setValues((current) => ({ ...current, [String(field.key)]: value === EMPTY_VALUE ? "" : value ?? "" }))}><SelectTrigger id={String(field.key)} className="w-full"><SelectValue placeholder={`اختر ${field.label}`} /></SelectTrigger><SelectContent><SelectItem value={EMPTY_VALUE}>اختر {field.label}</SelectItem>{field.options?.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select> : <Input id={String(field.key)} type={field.type} required={field.required} value={values[String(field.key)] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [String(field.key)]: event.target.value }))} />}</div>)}
          </div>
          <DialogFooter><Button type="button" disabled={saving} onClick={save}>{saving ? "جارٍ الحفظ..." : "حفظ"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
