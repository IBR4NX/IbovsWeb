import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchFilter({ value, onChange }: SearchFilterProps) {
  return (
    <div className=" col-span-4">
      <label htmlFor="product-search" className="mb-1.5 block text-sm font-medium">
        البحث
      </label>
      <InputGroup className="h-10">
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          id="product-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="ابحث عن منتج..."
        />
      </InputGroup>
    </div>
  );
}
