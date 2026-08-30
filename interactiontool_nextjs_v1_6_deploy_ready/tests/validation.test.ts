import { describe, expect, it } from "vitest";
import { defaultModel } from "@/lib/defaults";
import { validateModel } from "@/lib/calculator";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

describe("pre-launch validation parity", () => {
  it("rejects negative direct costs", () => {
    const model = clone(defaultModel);
    model.offer.parking = -5;
    model.offer.tolls = -2;
    const result = validateModel(model);

    expect(result.errors.some((e) => e.includes("parking cost"))).toBe(true);
    expect(result.errors.some((e) => e.includes("tolls"))).toBe(true);
  });

  it("rejects negative compensation values", () => {
    const model = clone(defaultModel);
    model.offer.bonus = -1000;
    model.offer.equity = -5000;
    const result = validateModel(model);

    expect(result.errors.some((e) => e.includes("bonus"))).toBe(true);
    expect(result.errors.some((e) => e.includes("annual equity"))).toBe(true);
  });

  it("warns about implausibly large retirement input", () => {
    const model = clone(defaultModel);
    model.offer.salary = 100000;
    model.offer.retire = 40000;
    const result = validateModel(model);

    expect(result.warnings.some((w) => w.includes("30% of salary"))).toBe(true);
  });
});
