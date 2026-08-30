import type { ModelInput } from "@/types/job";

export const STORAGE_KEY = "interactiontool.job-offer.v1";

export type SavedComparison = {
  model: ModelInput;
  step: number;
};

export function serializeComparison(value: SavedComparison) {
  return JSON.stringify(value);
}

export function parseComparison(raw: string): SavedComparison | null {
  try {
    const parsed = JSON.parse(raw) as Partial<SavedComparison>;
    if (!parsed.model) return null;
    if (typeof parsed.step !== "number") return null;
    if (parsed.step < 0 || parsed.step > 5) return null;
    return parsed as SavedComparison;
  } catch {
    return null;
  }
}
