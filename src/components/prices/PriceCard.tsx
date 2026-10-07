import type { PriceRecord } from "@/features/catalog/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PriceCardProps {
  item: PriceRecord;
  labels: {
    price: string;
    quantity: string;
    updated: string;
  };
}

function formatNumber(value: string | number): string {
  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString("ar-YE", {
      maximumFractionDigits: 2,
    })
    : String(value);
}

function formatDate(value: string): string {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString("ar-YE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
}

export default function PriceCard({ item, labels }: PriceCardProps) {
  return (
    <Card className="overflow-hidden border-border bg-card shadow-sm">
      <CardContent className="p-4 sm:p-5">

        {/* Product + Price */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="break-words text-2xl font-bold leading-7 text-foreground">
              {item.product_name}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-md text-md font-medium"
              >
                {item.category_name}
              </Badge>

              <span className="text-md text-muted-foreground">
                {item.city_name}
              </span>
            </div>
          </div>

          <div className="shrink-0 text-end">

            <p className="mt-0.5 text-2xl font-black tabular-nums tracking-tight text-primary sm:text-3xl">
              {formatNumber(item.price)}
            </p>

            <p className="text-xs font-medium text-muted-foreground">
              ريال
            </p>
          </div>
        </div>

        <Separator className="my-5" />

        {/* Details */}
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {labels.quantity}
            </p>

            <p className="mt-1 text-base font-bold text-foreground">
              {formatNumber(item.quantity)}
              <span className="ms-1 text-sm font-medium text-muted-foreground">
                {item.unit}
              </span>
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {labels.updated}
            </p>

            <p className="mt-1 text-sm font-semibold leading-6 text-foreground">
              {formatDate(item.updated_at)}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
