export type FinancingLender = {
  name: string;
  accent: string;
  note: string;
  fit: string;
  compare: string;
  reminder: string;
};

export const FINANCING_LENDERS: FinancingLender[] = [
  { name: "LightStream", accent: "#1d5d8f", note: "Personal loans for home improvement", fit: "Useful for homeowners comparing a fixed-rate personal-loan structure for a defined project amount.", compare: "Compare APR, term, monthly payment, fees, and total repayment—not only the advertised rate.", reminder: "Rates, terms, approval, and availability are determined by LightStream and may depend on credit profile and application details." },
  { name: "SoFi", accent: "#151515", note: "Online lending and financial products", fit: "A digital-first option for applicants who prefer to review personal-loan information online.", compare: "Look at the full repayment schedule and whether the monthly payment remains comfortable alongside the rest of your budget.", reminder: "SoFi makes its own lending decisions; LoveMeAfter does not approve, price, or service the loan." },
  { name: "LendingPoint", accent: "#167b68", note: "Personal loan options", fit: "A lender homeowners may compare when they need a project amount and repayment structure that fits their individual profile.", compare: "Review origination fees, net proceeds, APR, payment date, and the total amount repaid.", reminder: "Offers and eligibility are personal to the applicant and can vary by state and current lender policy." },
  { name: "Best Egg", accent: "#d26c2e", note: "Personal loan marketplace partner", fit: "An option to investigate when comparing an unsecured personal-loan path for a home project.", compare: "Confirm whether the amount deposited covers the written scope after any applicable fees.", reminder: "The lender's disclosures control. A prequalification result is not a guarantee of approval or final terms." },
  { name: "Upgrade", accent: "#5b3a94", note: "Personal loans and credit options", fit: "Can be part of a comparison for homeowners looking for a defined monthly-payment approach.", compare: "Compare the payment against the actual project schedule and keep a buffer for approved change orders or maintenance.", reminder: "Rates, fees, and approval requirements vary. Read the offer before accepting it." },
  { name: "Prosper", accent: "#007c83", note: "Online personal loans", fit: "A recognized online option homeowners may see when comparing personal-loan offers.", compare: "Pay attention to term length: a lower monthly payment can mean a higher total cost over time.", reminder: "Prosper and its lending partners set the offer and terms; LoveMeAfter cannot promise approval." },
  { name: "OneMain Financial", accent: "#1f4d7a", note: "Personal lending options", fit: "A branch-supported lender some homeowners may prefer when they value a more direct service path.", compare: "Ask about secured versus unsecured structures, fees, term, payment, and any collateral implications.", reminder: "Availability and product details vary by location and applicant. Confirm the current disclosures directly." },
  { name: "Axos Bank", accent: "#23677c", note: "Digital banking and lending", fit: "A digital banking and lending option to include in a broader financing comparison.", compare: "Compare the complete cost of credit and make sure the chosen term matches the useful life of the improvement.", reminder: "Axos Bank determines eligibility and terms. Current lender disclosures always take precedence." },
];
