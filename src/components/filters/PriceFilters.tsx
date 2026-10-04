import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FilterOption, PriceFiltersValue } from "@/features/types/prices";

import { FilterSelect } from "./FilterSelect";
import { SearchFilter } from "./SearchFilter";

interface PriceFiltersProps {
  filters: PriceFiltersValue;
  cities: FilterOption[];
  categories: FilterOption[];
  onChange: (changes: Partial<PriceFiltersValue>) => void;
  onClear: () => void;
}

export function PriceFilters({
  filters,
  cities,
  categories,
  onChange,
  onClear,
}: PriceFiltersProps) {
  const hasActiveFilters = Boolean(
    filters.search || filters.cityId || filters.categoryId,
  );

  return (
    <Card className="mb-6 py-4 shadow-sm">
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <SearchFilter
          value={filters.search}
          onChange={(search) => onChange({ search })}
        />
        <FilterSelect
          id="city-filter"
          label="المدينة"
          allLabel="كل المدن"
          options={cities}
          value={filters.cityId}
          onChange={(cityId) => onChange({ cityId })}
        />
        <FilterSelect
          id="category-filter"
          label="الفئة"
          allLabel="كل الفئات"
          options={categories}
          value={filters.categoryId}
          onChange={(categoryId) => onChange({ categoryId })}
        />
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="justify-self-start self-end"
          >
            <RotateCcw />
            إعادة تعيين
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
