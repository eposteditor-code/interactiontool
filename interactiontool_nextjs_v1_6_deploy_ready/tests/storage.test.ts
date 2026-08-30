import { describe, expect, it } from "vitest";
import { defaultModel } from "@/lib/defaults";
import {
  parseComparison,
  serializeComparison,
} from "@/lib/storage";

describe("comparison persistence", () => {
  it("round-trips a valid saved comparison", () => {
    const raw = serializeComparison({
      model: defaultModel,
      step: 3,
    });

    const parsed = parseComparison(raw);

    expect(parsed?.step).toBe(3);
    expect(parsed?.model.offer.salary).toBe(
      defaultModel.offer.salary
    );
  });

  it("rejects malformed JSON", () => {
    expect(parseComparison("{bad json")).toBeNull();
  });

  it("rejects an invalid step", () => {
    const raw = JSON.stringify({
      model: defaultModel,
      step: 9,
    });

    expect(parseComparison(raw)).toBeNull();
  });

  it("rejects a value without a model", () => {
    expect(parseComparison(JSON.stringify({ step: 2 }))).toBeNull();
  });
});
