// <##☆##> SubmissionTable <##☆##>

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Submission } from "../types";

interface Props {
  submissions: Submission[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  loadingId?: string | null;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleString("ar-EG", {
    dateStyle: "short",
    timeStyle: "short",
  });

const formatPrice = (value: number) => `${value.toFixed(2)} ر.ي`;

export function SubmissionTable({
  submissions,
  onApprove,
  onReject,
  loadingId,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>المنتج</TableHead>
          <TableHead>المدينة</TableHead>
          <TableHead>المستخدم</TableHead>
          <TableHead>السعر</TableHead>
          <TableHead>ملاحظة</TableHead>
          <TableHead>التاريخ</TableHead>
          <TableHead className="text-left">إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((s) => (
          <TableRow key={s.id}>
            <TableCell>{s.product_name}</TableCell>
            <TableCell>{s.city_name}</TableCell>
            <TableCell>{s.user_name}</TableCell>
            <TableCell>{formatPrice(s.price)}</TableCell>
            <TableCell className="max-w-xs truncate">{s.note ?? "—"}</TableCell>
            <TableCell>{formatDate(s.submitted_at)}</TableCell>
            <TableCell className="text-left space-x-2 space-x-reverse">
              <Button
                size="sm"
                onClick={() => onApprove(s.id)}
                disabled={loadingId === s.id}
              >
                موافقة
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onReject(s.id)}
                disabled={loadingId === s.id}
              >
                رفض
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}