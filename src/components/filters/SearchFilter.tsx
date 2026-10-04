import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchFilter({ value, onChange }: SearchFilterProps) {
  return (
    <div className="relative md:col-span-2">
      <label htmlFor="product-search" className="mb-1.5 block text-sm font-medium">
        البحث
      </label>
      <Search className="pointer-events-none absolute top-9 right-3 size-4 text-muted-foreground" />
      <Input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="ابحث عن منتج..."
        className="h-10 pe-10"
      />
    </div>
  );
}
