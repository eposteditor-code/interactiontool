import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: "Remote vs. Office Jobs: Hidden Costs People Forget to Compare",
  description: "Compare remote and office work by looking beyond salary to commuting costs, commute time, meals, childcare and the effective value of the offer.",
};

export default function Page() {
  return (
    <GuideLayout
      title={"Remote vs. Office Jobs: Hidden Costs People Forget to Compare"}
      intro={"Remote and office offers can have the same salary and still produce very different financial and time outcomes. The important comparison is the cost and time created by the work arrangement."}
    >
      <section><h2>Commute distance creates more than fuel cost</h2><p>A driving commute may involve fuel, maintenance, depreciation, parking and tolls. Transit can have fares or passes. The appropriate estimate depends on how you actually travel.</p></section>
<section><h2>Commute time belongs in the decision</h2><p>Commute time is not salary, but it is still time you cannot freely use. Adding it to committed work time can reveal a large difference between otherwise similar jobs.</p></section>
<section><h2>Office days change several variables at once</h2><p>Reducing office days can simultaneously reduce commute time, mileage, parking, tolls and extra meal costs. That is why a scenario model should recalculate the entire offer rather than assigning a simple fixed value to one remote day.</p></section>
<section><h2>Some costs are personal and should remain editable</h2><p>Childcare, clothing, meals and other office-related expenses vary widely. A calculator should let the user enter the incremental cost rather than assuming every worker has the same expense.</p></section>
<section><h2>Remote flexibility can become a negotiation lever</h2><p>If an employer cannot move enough on salary, fewer required office days can sometimes narrow the modeled gap. This does not mean remote work has one universal dollar value; it means the impact can be calculated from your own commute and cost assumptions.</p></section>
    </GuideLayout>
  );
}
