import { describe, expect, it } from "vitest";
import { TASK_CATEGORY_IDS } from "@/lib/curriculum/taskCategories";
import type { CurriculumPayloadV1 } from "@/lib/curriculum/schema";
import {
  computeProgressPercent,
  flattenTasksFromPayload,
  parseCompletedIds,
} from "./buildDashboardDto";

const cat = TASK_CATEGORY_IDS[0];

function minimalCurriculum(): CurriculumPayloadV1 {
  const stages = Array.from({ length: 6 }, (_, i) => {
    const stageIndex = i + 1;
    return {
      stageIndex,
      title: `Stage ${stageIndex}`,
      summary: "s",
      tasks: [
        {
          id: `t-${stageIndex}`,
          title: `Task ${stageIndex}`,
          description: "d",
          category: cat,
        },
      ],
    };
  });
  return {
    curriculumVersion: "1",
    sessionId: "00000000-0000-4000-8000-000000000001",
    generatedAt: new Date().toISOString(),
    stages,
  };
}

describe("parseCompletedIds", () => {
  it("parses string array", () => {
    const s = parseCompletedIds(["a", "b", ""]);
    expect(s.has("a")).toBe(true);
    expect(s.has("b")).toBe(true);
    expect(s.size).toBe(2);
  });

  it("returns empty for nullish", () => {
    expect(parseCompletedIds(null).size).toBe(0);
    expect(parseCompletedIds(undefined).size).toBe(0);
  });
});

describe("computeProgressPercent", () => {
  it("uses completed / total when tasks exist", () => {
    expect(
      computeProgressPercent({
        completedIds: new Set(["a", "b"]),
        allTaskIds: ["a", "b", "c", "d"],
        unlockedStageMax: 1,
      })
    ).toBe(50);
  });

  it("falls back to unlocked stage when no tasks", () => {
    expect(
      computeProgressPercent({
        completedIds: new Set(),
        allTaskIds: [],
        unlockedStageMax: 3,
      })
    ).toBe(50);
  });

  it("caps at 100", () => {
    expect(
      computeProgressPercent({
        completedIds: new Set(["a"]),
        allTaskIds: ["a"],
        unlockedStageMax: 6,
      })
    ).toBe(100);
  });
});

describe("flattenTasksFromPayload", () => {
  it("flattens stage tasks with stageIndex", () => {
    const c = minimalCurriculum();
    const flat = flattenTasksFromPayload(c);
    expect(flat).toHaveLength(6);
    expect(flat[0]).toMatchObject({
      id: "t-1",
      title: "Task 1",
      stageIndex: 1,
    });
  });
});
