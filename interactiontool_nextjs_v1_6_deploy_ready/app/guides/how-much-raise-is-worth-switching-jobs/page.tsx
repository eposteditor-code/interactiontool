import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: "How Much of a Raise Is Worth Switching Jobs?",
  description: "Estimate the raise needed to justify changing jobs by accounting for commute, time, benefits, direct costs and recurring compensation.",
};

export default function Page() {
  return (
    <GuideLayout
      title={"How Much of a Raise Is Worth Switching Jobs?"}
      intro={"There is no universal percentage raise that makes a job switch worthwhile. The useful number is the raise required for the new role to beat your current situation after the differences are modeled."}
    >
      <section><h2>Why a percentage rule can mislead</h2><p>A 10% or 20% raise may sound meaningful, but the result can change quickly if the new job adds a commute, longer hours, weaker benefits or substantial out-of-pocket costs.</p></section>
<section><h2>Start with ongoing annual value</h2><p>Compare recurring compensation rather than focusing on the first-year total. Signing bonuses are useful, but they should not permanently lower the salary threshold you use to judge the ongoing offer.</p></section>
<section><h2>Add the time difference</h2><p>If the new job requires hundreds of additional commute or work hours each year, a salary increase can disappear when you compare financial value per hour of committed time.</p></section>
<section><h2>Use a break-even salary</h2><p>A break-even salary answers a clearer question: what new base salary would make the offer match the current job's effective financial value per committed hour? Amounts above that threshold improve the model; amounts below it trail under the same assumptions.</p></section>
<section><h2>Turn the break-even number into a negotiation target</h2><p>The exact target does not need to come only from salary. You can test whether an extra remote day, additional PTO, a stronger bonus or retirement contribution reduces the base salary required to reach parity.</p></section>
    </GuideLayout>
  );
}
