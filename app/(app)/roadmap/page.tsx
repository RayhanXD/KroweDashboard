import { KroweCard, OverlineLabel } from "@/components/krowe";
import { createClient } from "@/lib/supabase/server";
import { parseCurriculumPayload } from "@/lib/curriculum/schema";
import {
  TASK_CATEGORY_LABELS,
  type TaskCategoryId,
} from "@/lib/curriculum/taskCategories";
import { getOptionalPublicSignupUrl } from "@/lib/env";
import { Lock, Map } from "lucide-react";

export const dynamic = "force-dynamic";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isSessionId(value: string | undefined): value is string {
  return typeof value === "string" && UUID_RE.test(value.trim());
}

type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function RoadmapPage({ searchParams }: PageProps) {
  const { session_id: rawSessionId } = await searchParams;
  const sessionId = isSessionId(rawSessionId) ? rawSessionId.trim() : null;
  const signupUrl = getOptionalPublicSignupUrl();

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-3xl">
        <KroweCard className="p-6">
          <OverlineLabel>Roadmap</OverlineLabel>
          <h1 className="mt-2 text-xl font-bold text-gray-900">No session selected</h1>
          <p className="mt-2 text-gray-600">
            Open this page from the signup app after your report is ready, using{" "}
            <strong>Continue to dashboard</strong>
            {signupUrl ? (
              <>
                {" "}
                (
                <a href={signupUrl} className="font-medium text-orange-600 underline">
                  go to signup
                </a>
                )
              </>
            ) : null}
            .
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Or add <code className="rounded bg-gray-100 px-1">?session_id=…</code> to the URL.
          </p>
        </KroweCard>
      </div>
    );
  }

  const supabase = await createClient();

  const [{ data: curriculum }, { data: progress }] = await Promise.all([
    supabase
      .from("signup_curricula")
      .select("payload, status")
      .eq("session_id", sessionId)
      .maybeSingle(),
    supabase
      .from("signup_roadmap_progress")
      .select("unlocked_stage_max")
      .eq("session_id", sessionId)
      .maybeSingle(),
  ]);

  const unlockedStageMax = progress?.unlocked_stage_max ?? 1;

  if (!curriculum?.payload || curriculum.status !== "ready") {
    return (
      <div className="mx-auto max-w-3xl">
        <KroweCard className="p-6">
          <OverlineLabel>Roadmap</OverlineLabel>
          <h1 className="mt-2 text-xl font-bold text-gray-900">Curriculum not ready</h1>
          <p className="mt-2 text-gray-600">
            Your personalized curriculum is still generating. Check back after your signup report
            finishes.
          </p>
        </KroweCard>
      </div>
    );
  }

  const parsed = parseCurriculumPayload(curriculum.payload);
  if (!parsed.success) {
    return (
      <div className="mx-auto max-w-3xl">
        <KroweCard className="p-6">
          <OverlineLabel>Roadmap</OverlineLabel>
          <p className="mt-2 text-red-600">Could not read curriculum data.</p>
        </KroweCard>
      </div>
    );
  }

  const stages = parsed.data.stages;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100">
          <Map className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <OverlineLabel>Roadmap</OverlineLabel>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Your startup journey</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stages unlock as you progress. You can work on tasks in stages up to{" "}
            <span className="font-medium text-gray-700">{unlockedStageMax}</span>.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const stageLocked = stage.stageIndex > unlockedStageMax;
          return (
            <KroweCard key={stage.stageIndex} className="overflow-hidden p-0">
              <div
                className={`border-b border-gray-100 px-5 py-4 ${stageLocked ? "bg-gray-50" : "bg-white"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Stage {stage.stageIndex}
                    </p>
                    <h2 className="text-lg font-semibold text-gray-900">{stage.title}</h2>
                    <p className="mt-1 text-sm text-gray-600">{stage.summary}</p>
                  </div>
                  {stageLocked && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700">
                      <Lock className="h-3.5 w-3.5" />
                      Locked
                    </span>
                  )}
                </div>
              </div>
              <ul className="divide-y divide-gray-100">
                {stage.tasks.map((task) => {
                  const catLabel =
                    TASK_CATEGORY_LABELS[task.category as TaskCategoryId] ??
                    task.category;
                  return (
                    <li
                      key={task.id}
                      className={`px-5 py-3 ${stageLocked ? "opacity-50" : ""}`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                          {catLabel}
                        </span>
                        <p className="font-medium text-gray-900">{task.title}</p>
                      </div>
                      {task.description ? (
                        <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </KroweCard>
          );
        })}
      </div>
    </div>
  );
}
