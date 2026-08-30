export type JobInput = {
  salary: number;
  bonus: number;
  signing: number;
  equity: number;
  retire: number;
  benefits: number;
  hours: number;
  workdays: number;
  office: number;
  pto: number;
  commuteMin: number;
  commuteMiles: number;
  costMile: number;
  parking: number;
  tolls: number;
  food: number;
  childcare: number;
  other: number;
};

export type ModelInput = {
  current: JobInput;
  offer: JobInput;
  timeValue: number;
};

export type JobResult = {
  actualDays: number;
  annualWorkHours: number;
  officeDays: number;
  commuteHours: number;
  commuteMiles: number;
  directCosts: number;
  recurringComp: number;
  financialValue: number;
  committedHours: number;
  effective: number;
  year1Value: number;
};
