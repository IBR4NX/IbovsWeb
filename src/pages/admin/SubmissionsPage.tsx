// <##☆##> Submissions Page <##☆##>

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Seo } from "@/lib/seo";
import { submissionsApi } from "@/features/submissions/api";
import { CreateSubmissionDialog } from "@/features/submissions/components/CreateSubmissionDialog";
import { RejectDialog } from "@/features/submissions/components/RejectDialog";
import { SubmissionTable } from "@/features/submissions/components/SubmissionTable";
import type {
  CreateSubmissionInput,
  Submission,
} from "@/features/submissions/types";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [rejectId, setRejectId] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    try {
      setLoading(true);
      setSubmissions(await submissionsApi.getAll());
    } catch {
      toast.error("فشل تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleCreate = async (input: CreateSubmissionInput) => {
    try {
      await submissionsApi.create(input);
      toast.success("تمت إضافة الطلب");
      setCreateOpen(false);
      loadAll();
    } catch {
      toast.error("فشل إضافة الطلب");
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setLoadingId(id);
      await submissionsApi.approve(id);
      toast.success("تمت الموافقة");
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch {
      toast.error("فشلت الموافقة");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRejectConfirm = async (reason: string) => {
    if (!rejectId) return;
    try {
      setLoadingId(rejectId);
      await submissionsApi.reject(rejectId, { reason });
      toast.success("تم رفض الطلب");
      setSubmissions((prev) => prev.filter((s) => s.id !== rejectId));
      setRejectId(null);
    } catch {
      toast.error("فشل رفض الطلب");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Seo
        canonicalPath="/admin/submissions"
        title="إدارة طلبات الأسعار"
        description="مراجعة طلبات الأسعار المعلقة والموافقة عليها أو رفضها."
        noindex
      />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">طلبات الأسعار</h1>
            <p className="text-muted-foreground text-sm">
              راجع الطلبات المعلقة ووافق أو ارفض.
            </p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>إضافة طلب</Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-10">جارٍ التحميل...</p>
        ) : submissions.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">
            لا توجد طلبات حالياً.
          </p>
        ) : (
          <SubmissionTable
            submissions={submissions}
            onApprove={handleApprove}
            onReject={setRejectId}
            loadingId={loadingId}
          />
        )}
      </div>

      <CreateSubmissionDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
      />

      <RejectDialog
        open={!!rejectId}
        onOpenChange={(open) => !open && setRejectId(null)}
        onConfirm={handleRejectConfirm}
      />
    </>
  );
}