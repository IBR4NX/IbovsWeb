import PriceCard from "./PriceCard";
import type { PriceRecord } from "../../features/types/prices";

interface PriceListProps {
  items: PriceRecord[];
  labels: {
    price: string;
    quantity: string;
    updated: string;
  };
}



export default function PriceList({ items, labels }: PriceListProps) {
  return (
    <section className="space-y-5">


      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={`${item.product_id}-${item.city_id}`}
            className="transition-transform duration-200 hover:-translate-y-0.5"
          >
            <PriceCard item={item} labels={labels} />
          </div>
        ))}
      </div>
    </section>
  );
}

