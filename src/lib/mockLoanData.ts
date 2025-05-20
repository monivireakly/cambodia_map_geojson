export interface LoanInfo {
  provinceName: string;
  totalLoans: number;
  averageLoanAmount: number;
  defaultRate: number;
  loanTypes: Record<string, number>;
}

export const mockLoanData: LoanInfo[] = [
  {
    provinceName: "Bantey Meanchey",
    totalLoans: 1205,
    averageLoanAmount: 5500,
    defaultRate: 0.03,
    loanTypes: { agricultural: 600, smallBusiness: 400, personal: 205 }
  },
  {
    provinceName: "Battambang",
    totalLoans: 2500,
    averageLoanAmount: 7200,
    defaultRate: 0.025,
    loanTypes: { agricultural: 1500, smallBusiness: 700, personal: 300 }
  },
  {
    provinceName: "Kampong Cham",
    totalLoans: 1800,
    averageLoanAmount: 6500,
    defaultRate: 0.035,
    loanTypes: { agricultural: 900, smallBusiness: 600, personal: 300 }
  },
  {
    provinceName: "Kampong Chhnang",
    totalLoans: 950,
    averageLoanAmount: 4800,
    defaultRate: 0.04,
    loanTypes: { agricultural: 500, smallBusiness: 300, personal: 150 }
  },
  {
    provinceName: "Kampong Speu",
    totalLoans: 1100,
    averageLoanAmount: 5200,
    defaultRate: 0.038,
    loanTypes: { agricultural: 600, smallBusiness: 350, personal: 150 }
  },
  {
    provinceName: "Kampong Thom",
    totalLoans: 1300,
    averageLoanAmount: 5800,
    defaultRate: 0.032,
    loanTypes: { agricultural: 700, smallBusiness: 400, personal: 200 }
  },
  {
    provinceName: "Kampot",
    totalLoans: 1400,
    averageLoanAmount: 6200,
    defaultRate: 0.028,
    loanTypes: { agricultural: 750, smallBusiness: 450, personal: 200 }
  },
  {
    provinceName: "Kandal",
    totalLoans: 2200,
    averageLoanAmount: 6800,
    defaultRate: 0.026,
    loanTypes: { agricultural: 1100, smallBusiness: 800, personal: 300 }
  },
  {
    provinceName: "Koh Kong",
    totalLoans: 800,
    averageLoanAmount: 4500,
    defaultRate: 0.045,
    loanTypes: { agricultural: 400, smallBusiness: 250, personal: 150 }
  },
  {
    provinceName: "Kratie",
    totalLoans: 900,
    averageLoanAmount: 4900,
    defaultRate: 0.042,
    loanTypes: { agricultural: 450, smallBusiness: 300, personal: 150 }
  },
  {
    provinceName: "Mondulkiri",
    totalLoans: 600,
    averageLoanAmount: 4200,
    defaultRate: 0.048,
    loanTypes: { agricultural: 300, smallBusiness: 200, personal: 100 }
  },
  {
    provinceName: "Phnom Penh",
    totalLoans: 3500,
    averageLoanAmount: 8500,
    defaultRate: 0.022,
    loanTypes: { agricultural: 500, smallBusiness: 2000, personal: 1000 }
  },
  {
    provinceName: "Preah Vihear",
    totalLoans: 750,
    averageLoanAmount: 4600,
    defaultRate: 0.046,
    loanTypes: { agricultural: 400, smallBusiness: 250, personal: 100 }
  },
  {
    provinceName: "Prey Veng",
    totalLoans: 1600,
    averageLoanAmount: 6000,
    defaultRate: 0.034,
    loanTypes: { agricultural: 800, smallBusiness: 500, personal: 300 }
  },
  {
    provinceName: "Pursat",
    totalLoans: 1000,
    averageLoanAmount: 5000,
    defaultRate: 0.039,
    loanTypes: { agricultural: 550, smallBusiness: 300, personal: 150 }
  },
  {
    provinceName: "Ratanakiri",
    totalLoans: 700,
    averageLoanAmount: 4300,
    defaultRate: 0.047,
    loanTypes: { agricultural: 350, smallBusiness: 250, personal: 100 }
  },
  {
    provinceName: "Siem Reap",
    totalLoans: 2000,
    averageLoanAmount: 6500,
    defaultRate: 0.03,
    loanTypes: { agricultural: 1000, smallBusiness: 700, personal: 300 }
  },
  {
    provinceName: "Preah Sihanouk",
    totalLoans: 1500,
    averageLoanAmount: 6300,
    defaultRate: 0.036,
    loanTypes: { agricultural: 300, smallBusiness: 900, personal: 300 }
  },
  {
    provinceName: "Stung Treng",
    totalLoans: 650,
    averageLoanAmount: 4400,
    defaultRate: 0.049,
    loanTypes: { agricultural: 350, smallBusiness: 200, personal: 100 }
  },
  {
    provinceName: "Svay Rieng",
    totalLoans: 1200,
    averageLoanAmount: 5400,
    defaultRate: 0.037,
    loanTypes: { agricultural: 650, smallBusiness: 350, personal: 200 }
  },
  {
    provinceName: "Takeo",
    totalLoans: 1700,
    averageLoanAmount: 6100,
    defaultRate: 0.033,
    loanTypes: { agricultural: 900, smallBusiness: 500, personal: 300 }
  },
  {
    provinceName: "Oddar Meanchey",
    totalLoans: 850,
    averageLoanAmount: 4700,
    defaultRate: 0.043,
    loanTypes: { agricultural: 450, smallBusiness: 280, personal: 120 }
  },
  {
    provinceName: "Kep",
    totalLoans: 500,
    averageLoanAmount: 4100,
    defaultRate: 0.05,
    loanTypes: { agricultural: 200, smallBusiness: 200, personal: 100 }
  },
  {
    provinceName: "Pailin",
    totalLoans: 450,
    averageLoanAmount: 4000,
    defaultRate: 0.051,
    loanTypes: { agricultural: 200, smallBusiness: 180, personal: 70 }
  },
  {
    provinceName: "Tbong Khmum",
    totalLoans: 1300,
    averageLoanAmount: 5700,
    defaultRate: 0.035,
    loanTypes: { agricultural: 700, smallBusiness: 400, personal: 200 }
  }
]; 