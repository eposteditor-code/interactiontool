import { describe, expect, it } from "vitest";
import { defaultModel } from "@/lib/defaults";
import { breakEvenSalary, calculateJob } from "@/lib/calculator";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

describe("Negotiation Lab scenarios", () => {
  it("reaches parity when scenario salary equals break-even", () => {
    const model = clone(defaultModel);
    const salary = breakEvenSalary(model.current, model.offer);
    model.offer.salary = salary;

    const current = calculateJob(model.current);
    const offer = calculateJob(model.offer);

    expect(offer.effective).toBeCloseTo(current.effective, 8);
  });

  it("one fewer office day lowers the required salary", () => {
    const model = clone(defaultModel);
    const base = breakEvenSalary(model.current, model.offer);

    model.offer.office = Math.max(0, model.offer.office - 1);
    const reducedOffice = breakEvenSalary(model.current, model.offer);

    expect(reducedOffice).toBeLessThan(base);
  });

  it("adding PTO lowers the required salary", () => {
    const model = clone(defaultModel);
    const base = breakEvenSalary(model.current, model.offer);

    model.offer.pto += 5;
    const morePto = breakEvenSalary(model.current, model.offer);

    expect(morePto).toBeLessThan(base);
  });

  it("higher recurring bonus lowers break-even base salary", () => {
    const model = clone(defaultModel);
    const base = breakEvenSalary(model.current, model.offer);

    model.offer.bonus += 5000;
    const higherBonus = breakEvenSalary(model.current, model.offer);

    expect(higherBonus).toBeLessThan(base);
  });

  it("higher retirement value lowers break-even base salary", () => {
    const model = clone(defaultModel);
    const base = breakEvenSalary(model.current, model.offer);

    model.offer.retire += 3000;
    const higherRetire = breakEvenSalary(model.current, model.offer);

    expect(higherRetire).toBeLessThan(base);
  });
});
