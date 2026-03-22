import { parseCurriculumPayload } from "@/lib/curriculum/schema";
import type { CurriculumPayloadV1 } from "@/lib/curriculum/schema";
import { STARTUP_STAGE_DEFINITIONS } from "@/lib/curriculum/stages";

/** Report `data` shape we read from `signup_reports.report` (aligned with signup ReportDashboard). */
export type ReportDataSnapshot = {
  inputsSnapshot?: {
    idea?: string | null;
    problem?: string | null;
    target_customer?: string | null;
  };
  timeToMvp?: {
    label?: string;
    rationale?: string;
    lowWeeks?: number;
    highWeeks?: number;
  };
};

export type DashboardTaskRow = {
  id: string;
  label: string;
  completed: boolean;
  priority?: "high" | "medium" | "low";
};

export type SectionProgressRow = {
  name: string;
  progress: number;
};

export type PlatformDashboardDto = {
  sessionId: string;
  journeyProgressPercent: number;
  welcomeUserName: string;
  currentIdeaTitle: string;
  currentIdeaDescription: string;
  currentIdeaPhaseLabel: string;
  topTasks: DashboardTaskRow[];
  todaysFocusTasks: DashboardTaskRow[];
  sectionProgress: SectionProgressRow[];
  nextMilestone: {
    milestoneName: string;
    dueDate: string;
    daysRemaining: number;
    description: string;
  };
};

export function parseCompletedIds(raw: unknown): Set<string> {
  if (!raw) return new Set();
  if (Array.isArray(raw)) {
    return new Set(
      raw.filter((x): x is string => typeof x === "string" && x.length > 0)
    );
  }
  return new Set();
}

export function flattenTasksFromPayload(
  curriculum: CurriculumPayloadV1
): Array<{
  id: string;
  title: string;
  category?: string;
  stageIndex: number;
}> {
  const out: Array<{
    id: string;
    title: string;
    category?: string;
    stageIndex: number;
  }> = [];
  for (const stage of curriculum.stages) {
    for (const t of stage.tasks) {
      out.push({
        id: t.id,
        title: t.title,
        category: t.category,
        stageIndex: stage.stageIndex,
      });
    }
  }
  return out;
}

export function computeProgressPercent(opts: {
  completedIds: Set<string>;
  allTaskIds: string[];
  unlockedStageMax: number;
}): number {
  const { completedIds, allTaskIds, unlockedStageMax } = opts;
  const total = allTaskIds.length;
  if (total > 0) {
    const done = allTaskIds.filter((id) => completedIds.has(id)).length;
    return Math.min(100, Math.round((done / total) * 100));
  }
  return Math.min(100, Math.round((unlockedStageMax / 6) * 100));
}

function truncate(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function deriveWelcomeName(idea: string | null | undefined): string {
  const raw = (idea ?? "").trim();
  if (!raw) return "Founder";
  const first = raw.split(/\s+/).slice(0, 3).join(" ");
  return truncate(first, 32);
}

function extractReportData(report: unknown): ReportDataSnapshot | null {
  if (!report || typeof report !== "object") return null;
  const r = report as { data?: ReportDataSnapshot };
  return r.data ?? null;
}

function assignPriorities(
  tasks: DashboardTaskRow[],
  startIndex: number
): DashboardTaskRow[] {
  return tasks.map((t, i) => {
    const p = ((i + startIndex) % 3) as 0 | 1 | 2;
    const priority: "high" | "medium" | "low" =
      p === 0 ? "high" : p === 1 ? "medium" : "low";
    return { ...t, priority };
  });
}

function buildSectionProgressFromCurriculum(
  curriculum: CurriculumPayloadV1,
  completedIds: Set<string>
): SectionProgressRow[] {
  return curriculum.stages.map((stage) => {
    const tasks = stage.tasks;
    if (tasks.length === 0) {
      return { name: stage.title, progress: 0 };
    }
    const done = tasks.filter((t) => completedIds.has(t.id)).length;
    return {
      name: stage.title,
      progress: Math.round((done / tasks.length) * 100),
    };
  });
}

function buildSectionProgressFallback(unlockedStageMax: number): SectionProgressRow[] {
  return STARTUP_STAGE_DEFINITIONS.map((def) => ({
    name: def.title,
    progress: def.stageIndex <= unlockedStageMax ? 100 : 0,
  }));
}

export function buildPlatformDashboardDto(params: {
  sessionId: string;
  report: unknown;
  curriculumPayload: unknown | null;
  curriculumStatus: string | null;
  unlockedStageMax: number;
  completedTaskIdsRaw: unknown;
}): PlatformDashboardDto {
  const {
    sessionId,
    report,
    curriculumPayload,
    curriculumStatus,
    unlockedStageMax,
    completedTaskIdsRaw,
  } = params;

  const data = extractReportData(report);
  const idea = data?.inputsSnapshot?.idea?.trim() ?? "";
  const problem = data?.inputsSnapshot?.problem?.trim() ?? "";
  const welcomeUserName = deriveWelcomeName(idea || problem || null);
  const currentIdeaTitle = idea ? truncate(idea, 48) : "Your startup";
  const currentIdeaDescription: string =
    problem || idea || "Add your problem and idea in the signup flow.";
  const time = data?.timeToMvp;

  const phaseLabel =
    curriculumStatus === "ready" && curriculumPayload
      ? (() => {
          const p = parseCurriculumPayload(curriculumPayload);
          if (p.success && p.data.targetStageIndex) {
            return `Stage ${p.data.targetStageIndex} focus`;
          }
          return `Stage ${Math.min(6, unlockedStageMax)} focus`;
        })()
      : `Stage ${Math.min(6, unlockedStageMax)} focus`;

  const completedIds = parseCompletedIds(completedTaskIdsRaw);

  let curriculum: CurriculumPayloadV1 | null = null;
  if (curriculumStatus === "ready" && curriculumPayload) {
    const parsed = parseCurriculumPayload(curriculumPayload);
    if (parsed.success) curriculum = parsed.data;
  }

  const flat = curriculum ? flattenTasksFromPayload(curriculum) : [];
  const allTaskIds = flat.map((t) => t.id);
  const journeyProgressPercent = computeProgressPercent({
    completedIds,
    allTaskIds,
    unlockedStageMax,
  });

  const toTaskRow = (t: (typeof flat)[0]): DashboardTaskRow => ({
    id: t.id,
    label: t.title,
    completed: completedIds.has(t.id),
  });

  const incomplete = flat.filter((t) => !completedIds.has(t.id));
  const source = incomplete.length > 0 ? incomplete : flat;

  const topBase =
    source.length > 0
      ? source.slice(0, 5).map(toTaskRow)
      : [
          {
            id: "no-curriculum-tasks",
            label: "Generate your curriculum from the signup report when ready.",
            completed: false,
          },
        ];

  const focusBase =
    source.length > 0
      ? source.slice(0, 3).map(toTaskRow)
      : [
          {
            id: "no-focus-tasks",
            label: "Roadmap tasks will appear after curriculum is ready.",
            completed: false,
          },
        ];

  const topTasks = assignPriorities(topBase, 0);
  const todaysFocusTasks = assignPriorities(focusBase, 1);

  const sectionProgress = curriculum
    ? buildSectionProgressFromCurriculum(curriculum, completedIds)
    : buildSectionProgressFallback(unlockedStageMax);

  const milestoneName = time?.label?.trim() || "Next milestone";
  const description =
    time?.rationale?.trim() ||
    "Use the roadmap to work through the next concrete steps.";
  const low = time?.lowWeeks;
  const high = time?.highWeeks;
  const dueDate =
    typeof low === "number" && typeof high === "number"
      ? `~${low}–${high} weeks`
      : "Planning";
  const weeks = typeof high === "number" ? high : typeof low === "number" ? low : 8;
  const daysRemaining = Math.min(90, Math.max(1, Math.round(weeks * 7)));

  return {
    sessionId,
    journeyProgressPercent,
    welcomeUserName,
    currentIdeaTitle,
    currentIdeaDescription: truncate(currentIdeaDescription, 220),
    currentIdeaPhaseLabel: phaseLabel,
    topTasks,
    todaysFocusTasks,
    sectionProgress,
    nextMilestone: {
      milestoneName,
      dueDate,
      daysRemaining,
      description: truncate(description, 200),
    },
  };
}
