import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildPlatformDashboardDto } from "@/lib/platform/buildDashboardDto";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = (url.searchParams.get("session_id") || "").trim();
  if (!sessionId || !UUID_RE.test(sessionId)) {
    return NextResponse.json(
      { error: "Invalid or missing session_id" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data: reportRow, error: reportErr } = await supabase
    .from("signup_reports")
    .select("report, status")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (reportErr) {
    return NextResponse.json({ error: reportErr.message }, { status: 500 });
  }
  if (!reportRow) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const [{ data: curRow, error: curErr }, { data: progRow, error: progErr }] =
    await Promise.all([
      supabase
        .from("signup_curricula")
        .select("payload, status")
        .eq("session_id", sessionId)
        .maybeSingle(),
      supabase
        .from("signup_roadmap_progress")
        .select("unlocked_stage_max, completed_task_ids")
        .eq("session_id", sessionId)
        .maybeSingle(),
    ]);

  if (curErr || progErr) {
    return NextResponse.json(
      { error: curErr?.message || progErr?.message || "Query failed" },
      { status: 500 }
    );
  }

  const dto = buildPlatformDashboardDto({
    sessionId,
    report: reportRow.report,
    curriculumPayload: curRow?.payload ?? null,
    curriculumStatus: curRow?.status ?? null,
    unlockedStageMax: progRow?.unlocked_stage_max ?? 1,
    completedTaskIdsRaw: progRow?.completed_task_ids,
  });

  return NextResponse.json(dto);
}
