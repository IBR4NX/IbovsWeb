import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FilterOption, PriceFiltersValue } from "@/features/catalog/types";

import { FilterSelect } from "@/components/filters/FilterSelect";
import { SearchFilter } from "./ProductSearch";

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
    filters.search || filters.cityName || filters.categoryName,
  );

  return (
    <Card className="mb-6 py-4 shadow-sm">
      <CardContent className=" grid grid-cols-4 gap-2 md:grid-cols-4 relative">
        <SearchFilter
          value={filters.search}
          onChange={(search) => onChange({ search })}
        />
        <FilterSelect
          id="city-filter"
          label="المدينة"
          allLabel="كل المدن"
          options={cities}
          value={filters.cityName}
          onChange={(cityName) => onChange({ cityName })}
          getOptionValue={(city) => city.name}
        />
        <FilterSelect
          id="category-filter"
          label="الفئة"
          allLabel="كل الفئات"
          options={categories}
          value={filters.categoryName}
          onChange={(categoryName) => onChange({ categoryName })}
          getOptionValue={(category) => category.name}
        />
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            className=" absolute -top-2 left-2 self-top "
          >
            <RotateCcw />
            إعادة تعيين
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
