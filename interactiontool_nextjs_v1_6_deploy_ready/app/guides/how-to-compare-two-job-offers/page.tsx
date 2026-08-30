import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: "How to Compare Two Job Offers Without Looking at Salary Alone",
  description: "A practical framework for comparing two job offers using recurring compensation, time, commute, benefits, direct costs and break-even value.",
};

export default function Page() {
  return (
    <GuideLayout
      title={"How to Compare Two Job Offers Without Looking at Salary Alone"}
      intro={"The higher salary is not automatically the better offer. A useful comparison separates recurring money, one-time money, hidden costs, and the time required to earn it."}
    >
      <section><h2>1. Separate recurring compensation from one-time money</h2><p>Start with base salary, expected bonus, annual equity, employer retirement contributions and employer-paid benefits. Keep a signing bonus separate because it can make year one look unusually strong without improving the ongoing deal.</p></section>
<section><h2>2. Subtract costs created by the job</h2><p>Commuting can add vehicle, transit, toll, parking and food costs. A role may also create additional childcare, clothing, licensing or other expenses. These costs reduce the financial value you actually keep from the offer.</p></section>
<section><h2>3. Compare committed time, not just scheduled work hours</h2><p>Work hours tell only part of the story when one role requires a long commute. Add expected commute time to annual work time so you can compare how much of your year each job consumes.</p></section>
<section><h2>4. Calculate effective value per committed hour</h2><p>One useful normalization is annual financial value divided by total committed work-and-commute hours. This does not claim your commute has a cash wage; it simply shows how much modeled financial value each hour of committed time corresponds to.</p></section>
<section><h2>5. Find the break-even point</h2><p>Instead of asking whether the new offer is good or bad, ask what base salary would make the new role match your current job under the assumptions you entered. That threshold can make negotiation much more concrete.</p></section>
<section><h2>6. Test different deal structures</h2><p>A salary increase is not the only way to improve an offer. Fewer office days, more PTO, a larger bonus or a stronger retirement contribution may also move the model. The best negotiation path depends on which variable changes the outcome most.</p></section>
    </GuideLayout>
  );
}
