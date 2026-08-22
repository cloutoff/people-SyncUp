// ─── Types ───────────────────────────────────────────────────────────

export type Employee = {
  employee_id: string;
  employee_name: string;
  join_date: string;
  employment_status: "Active" | "Inactive" | "On Leave";
};

export type PersonJourney = {
  employee_id: string;
  employee_name: string;
  department: string;
  role_title: string;
  reports_to: string;
  start_date: string;
  end_date: string | null;
  change_reason: string;
};

export type Role = {
  role_id: string;
  department: string;
  role_title: string;
  event_date: string;
  event_type: string;
  previous_role: string;
  description: string;
};

export type OrgEvent = {
  event_date: string;
  event_category: string;
  subject: string;
  result: string;
  description: string;
};

// ─── Employees ───────────────────────────────────────────────────────

export const employees: Employee[] = [
  { employee_id: "E001", employee_name: "Sarah Chen", join_date: "2019-03-15", employment_status: "Active" },
  { employee_id: "E002", employee_name: "Marcus Johnson", join_date: "2020-01-10", employment_status: "Active" },
  { employee_id: "E003", employee_name: "Elena Rodriguez", join_date: "2018-07-22", employment_status: "Active" },
  { employee_id: "E004", employee_name: "David Kim", join_date: "2021-06-01", employment_status: "Active" },
  { employee_id: "E005", employee_name: "Aisha Patel", join_date: "2017-11-05", employment_status: "Active" },
  { employee_id: "E006", employee_name: "James Wilson", join_date: "2022-02-14", employment_status: "Active" },
  { employee_id: "E007", employee_name: "Lisa Nakamura", join_date: "2019-09-30", employment_status: "On Leave" },
  { employee_id: "E008", employee_name: "Robert Davis", join_date: "2020-04-18", employment_status: "Active" },
  { employee_id: "E009", employee_name: "Maria Garcia", join_date: "2016-08-12", employment_status: "Active" },
  { employee_id: "E010", employee_name: "Thomas Brown", join_date: "2021-10-25", employment_status: "Inactive" },
  { employee_id: "E011", employee_name: "Yuki Tanaka", join_date: "2019-05-03", employment_status: "Active" },
  { employee_id: "E012", employee_name: "Priya Sharma", join_date: "2023-01-09", employment_status: "Active" },
  { employee_id: "E013", employee_name: "Michael O'Brien", join_date: "2018-02-28", employment_status: "Active" },
  { employee_id: "E014", employee_name: "Fatima Al-Hassan", join_date: "2022-07-11", employment_status: "Active" },
  { employee_id: "E015", employee_name: "Chris Anderson", join_date: "2020-12-01", employment_status: "Active" },
];

// ─── Person Journeys ─────────────────────────────────────────────────

export const personJourneys: PersonJourney[] = [
  // Sarah Chen — Engineering → Senior → Lead
  { employee_id: "E001", employee_name: "Sarah Chen", department: "Engineering", role_title: "Software Engineer", reports_to: "Aisha Patel", start_date: "2019-03-15", end_date: "2021-06-01", change_reason: "Hire" },
  { employee_id: "E001", employee_name: "Sarah Chen", department: "Engineering", role_title: "Senior Software Engineer", reports_to: "Aisha Patel", start_date: "2021-06-01", end_date: "2023-01-15", change_reason: "Promotion" },
  { employee_id: "E001", employee_name: "Sarah Chen", department: "Engineering", role_title: "Engineering Lead", reports_to: "Maria Garcia", start_date: "2023-01-15", end_date: null, change_reason: "Promotion" },

  // Marcus Johnson — Marketing → Senior
  { employee_id: "E002", employee_name: "Marcus Johnson", department: "Marketing", role_title: "Marketing Analyst", reports_to: "Thomas Brown", start_date: "2020-01-10", end_date: "2022-04-01", change_reason: "Hire" },
  { employee_id: "E002", employee_name: "Marcus Johnson", department: "Marketing", role_title: "Senior Marketing Analyst", reports_to: "Thomas Brown", start_date: "2022-04-01", end_date: null, change_reason: "Promotion" },

  // Elena Rodriguez — HR → HR Manager
  { employee_id: "E003", employee_name: "Elena Rodriguez", department: "Human Resources", role_title: "HR Specialist", reports_to: "Lisa Nakamura", start_date: "2018-07-22", end_date: "2021-09-01", change_reason: "Hire" },
  { employee_id: "E003", employee_name: "Elena Rodriguez", department: "Human Resources", role_title: "HR Manager", reports_to: "Lisa Nakamura", start_date: "2021-09-01", end_date: null, change_reason: "Promotion" },

  // David Kim — Design
  { employee_id: "E004", employee_name: "David Kim", department: "Design", role_title: "UI/UX Designer", reports_to: "Robert Davis", start_date: "2021-06-01", end_date: null, change_reason: "Hire" },

  // Aisha Patel — Engineering Director
  { employee_id: "E005", employee_name: "Aisha Patel", department: "Engineering", role_title: "Software Engineer", reports_to: "Michael O'Brien", start_date: "2017-11-05", end_date: "2019-08-01", change_reason: "Hire" },
  { employee_id: "E005", employee_name: "Aisha Patel", department: "Engineering", role_title: "Senior Engineer", reports_to: "Michael O'Brien", start_date: "2019-08-01", end_date: "2021-03-15", change_reason: "Promotion" },
  { employee_id: "E005", employee_name: "Aisha Patel", department: "Engineering", role_title: "Engineering Manager", reports_to: "Maria Garcia", start_date: "2021-03-15", end_date: "2023-06-01", change_reason: "Promotion" },
  { employee_id: "E005", employee_name: "Aisha Patel", department: "Engineering", role_title: "Engineering Director", reports_to: "Maria Garcia", start_date: "2023-06-01", end_date: null, change_reason: "Promotion" },

  // James Wilson — Sales
  { employee_id: "E006", employee_name: "James Wilson", department: "Sales", role_title: "Sales Associate", reports_to: "Chris Anderson", start_date: "2022-02-14", end_date: "2023-08-01", change_reason: "Hire" },
  { employee_id: "E006", employee_name: "James Wilson", department: "Sales", role_title: "Senior Sales Associate", reports_to: "Chris Anderson", start_date: "2023-08-01", end_date: null, change_reason: "Promotion" },

  // Lisa Nakamura — HR Director
  { employee_id: "E007", employee_name: "Lisa Nakamura", department: "Human Resources", role_title: "HR Coordinator", reports_to: "Maria Garcia", start_date: "2019-09-30", end_date: "2021-01-15", change_reason: "Hire" },
  { employee_id: "E007", employee_name: "Lisa Nakamura", department: "Human Resources", role_title: "HR Manager", reports_to: "Maria Garcia", start_date: "2021-01-15", end_date: "2023-03-01", change_reason: "Promotion" },
  { employee_id: "E007", employee_name: "Lisa Nakamura", department: "Human Resources", role_title: "HR Director", reports_to: "Maria Garcia", start_date: "2023-03-01", end_date: null, change_reason: "Promotion" },

  // Robert Davis — Design Director
  { employee_id: "E008", employee_name: "Robert Davis", department: "Design", role_title: "Senior Designer", reports_to: "Maria Garcia", start_date: "2020-04-18", end_date: "2022-07-01", change_reason: "Hire" },
  { employee_id: "E008", employee_name: "Robert Davis", department: "Design", role_title: "Design Director", reports_to: "Maria Garcia", start_date: "2022-07-01", end_date: null, change_reason: "Promotion" },

  // Maria Garcia — CEO
  { employee_id: "E009", employee_name: "Maria Garcia", department: "Executive", role_title: "VP Engineering", reports_to: "N/A", start_date: "2016-08-12", end_date: "2020-01-01", change_reason: "Hire" },
  { employee_id: "E009", employee_name: "Maria Garcia", department: "Executive", role_title: "CEO", reports_to: "N/A", start_date: "2020-01-01", end_date: null, change_reason: "Promotion" },

  // Thomas Brown — Marketing Director
  { employee_id: "E010", employee_name: "Thomas Brown", department: "Marketing", role_title: "Marketing Specialist", reports_to: "Yuki Tanaka", start_date: "2021-10-25", end_date: "2023-05-01", change_reason: "Hire" },
  { employee_id: "E010", employee_name: "Thomas Brown", department: "Marketing", role_title: "Marketing Manager", reports_to: "Yuki Tanaka", start_date: "2023-05-01", end_date: null, change_reason: "Promotion" },

  // Yuki Tanaka — Marketing Director
  { employee_id: "E011", employee_name: "Yuki Tanaka", department: "Marketing", role_title: "Content Strategist", reports_to: "Maria Garcia", start_date: "2019-05-03", end_date: "2021-10-01", change_reason: "Hire" },
  { employee_id: "E011", employee_name: "Yuki Tanaka", department: "Marketing", role_title: "Marketing Director", reports_to: "Maria Garcia", start_date: "2021-10-01", end_date: null, change_reason: "Promotion" },

  // Priya Sharma — Junior Developer
  { employee_id: "E012", employee_name: "Priya Sharma", department: "Engineering", role_title: "Junior Software Engineer", reports_to: "Sarah Chen", start_date: "2023-01-09", end_date: null, change_reason: "Hire" },

  // Michael O'Brien — VP Engineering
  { employee_id: "E013", employee_name: "Michael O'Brien", department: "Engineering", role_title: "Engineering Manager", reports_to: "Maria Garcia", start_date: "2018-02-28", end_date: "2020-06-01", change_reason: "Hire" },
  { employee_id: "E013", employee_name: "Michael O'Brien", department: "Engineering", role_title: "VP Engineering", reports_to: "Maria Garcia", start_date: "2020-06-01", end_date: null, change_reason: "Promotion" },

  // Fatima Al-Hassan — Sales Rep
  { employee_id: "E014", employee_name: "Fatima Al-Hassan", department: "Sales", role_title: "Sales Representative", reports_to: "Chris Anderson", start_date: "2022-07-11", end_date: null, change_reason: "Hire" },

  // Chris Anderson — Sales Director
  { employee_id: "E015", employee_name: "Chris Anderson", department: "Sales", role_title: "Sales Manager", reports_to: "Maria Garcia", start_date: "2020-12-01", end_date: "2023-01-15", change_reason: "Hire" },
  { employee_id: "E015", employee_name: "Chris Anderson", department: "Sales", role_title: "Sales Director", reports_to: "Maria Garcia", start_date: "2023-01-15", end_date: null, change_reason: "Promotion" },
];

// ─── Roles ───────────────────────────────────────────────────────────

export const roles: Role[] = [
  { role_id: "R001", department: "Engineering", role_title: "Software Engineer", event_date: "2019-03-15", event_type: "Creation", previous_role: "N/A", description: "Entry-level software engineering role" },
  { role_id: "R002", department: "Engineering", role_title: "Senior Software Engineer", event_date: "2020-06-01", event_type: "Promotion Track", previous_role: "Software Engineer", description: "Advanced IC role with mentorship duties" },
  { role_id: "R003", department: "Engineering", role_title: "Engineering Lead", event_date: "2022-09-15", event_type: "Promotion Track", previous_role: "Senior Software Engineer", description: "Tech lead with team management" },
  { role_id: "R004", department: "Marketing", role_title: "Marketing Analyst", event_date: "2020-01-10", event_type: "Creation", previous_role: "N/A", description: "Data-driven marketing role" },
  { role_id: "R005", department: "Marketing", role_title: "Senior Marketing Analyst", event_date: "2022-04-01", event_type: "Promotion Track", previous_role: "Marketing Analyst", description: "Senior analyst with strategy ownership" },
  { role_id: "R006", department: "Human Resources", role_title: "HR Specialist", event_date: "2018-07-22", event_type: "Creation", previous_role: "N/A", description: "HR operations and employee relations" },
  { role_id: "R007", department: "Human Resources", role_title: "HR Manager", event_date: "2021-09-01", event_type: "Promotion Track", previous_role: "HR Specialist", description: "People management and policy" },
  { role_id: "R008", department: "Design", role_title: "UI/UX Designer", event_date: "2021-06-01", event_type: "Creation", previous_role: "N/A", description: "Design thinking and prototyping" },
  { role_id: "R009", department: "Sales", role_title: "Sales Associate", event_date: "2022-02-14", event_type: "Creation", previous_role: "N/A", description: "Client acquisition and relationship" },
  { role_id: "R010", department: "Executive", role_title: "CEO", event_date: "2020-01-01", event_type: "Promotion Track", previous_role: "VP Engineering", description: "Company-wide leadership" },
  { role_id: "R011", department: "Engineering", role_title: "Engineering Director", event_date: "2023-06-01", event_type: "Promotion Track", previous_role: "Engineering Manager", description: "Strategic engineering leadership" },
  { role_id: "R012", department: "Human Resources", role_title: "HR Director", event_date: "2023-03-01", event_type: "Promotion Track", previous_role: "HR Manager", description: "Strategic people operations" },
];

// ─── Org Events ──────────────────────────────────────────────────────

export const orgEvents: OrgEvent[] = [
  { event_date: "2023-06-01", event_category: "Promotion", subject: "Aisha Patel", result: "Promoted", description: "Aisha Patel promoted to Engineering Director" },
  { event_date: "2023-08-01", event_category: "Promotion", subject: "James Wilson", result: "Promoted", description: "James Wilson promoted to Senior Sales Associate" },
  { event_date: "2023-01-15", event_category: "Promotion", subject: "Chris Anderson", result: "Promoted", description: "Chris Anderson promoted to Sales Director" },
  { event_date: "2022-07-01", event_category: "Promotion", subject: "Robert Davis", result: "Promoted", description: "Robert Davis promoted to Design Director" },
  { event_date: "2021-10-01", event_category: "Promotion", subject: "Yuki Tanaka", result: "Promoted", description: "Yuki Tanaka promoted to Marketing Director" },
  { event_date: "2024-01-15", event_category: "Training", subject: "Engineering Team", result: "Completed", description: "Q1 2024 engineering skills workshop completed" },
  { event_date: "2024-03-01", event_category: "Reorganization", subject: "All Departments", result: "Approved", description: "Q1 reorganization plan approved by leadership" },
  { event_date: "2023-11-20", event_category: "Hiring", subject: "Priya Sharma", result: "Onboarded", description: "Junior engineer hired to support AI initiatives" },
  { event_date: "2024-02-10", event_category: "Recognition", subject: "Sarah Chen", result: "Awarded", description: "Employee of the quarter — exceptional project delivery" },
  { event_date: "2023-05-01", event_category: "Promotion", subject: "Thomas Brown", result: "Promoted", description: "Thomas Brown promoted to Marketing Manager" },
];

// ─── Derived Utilities ────────────────────────────────────────────────

/** All unique department names */
export const departments = [
  ...new Set(personJourneys.map((j) => j.department)),
].sort();

/** All unique role titles */
export const roleTitles = [
  ...new Set(personJourneys.map((j) => j.role_title)),
].sort();

/** Years present in the data */
export const years = [
  ...new Set(
    personJourneys.map((j) => new Date(j.start_date).getFullYear())
  ),
].sort((a, b) => a - b);

/** Position distribution: department-level when no filter, role-level when dept is filtered */
export function getPositionDistribution(dept?: string) {
  const latest = getLatestJourneyPerEmployee(dept);
  const dist: Record<string, number> = {};
  latest.forEach((j) => {
    const key = dept ? j.role_title : j.department;
    dist[key] = (dist[key] || 0) + 1;
  });
  return Object.entries(dist)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

/** Position by year: for each year, how many employees were in each department */
export function getPositionByYear(dept?: string) {
  const filtered = dept
    ? personJourneys.filter((j) => j.department === dept)
    : personJourneys;
  const result: Record<number, Record<string, number>> = {};

  years.forEach((y) => {
    result[y] = {};
  });

  filtered.forEach((j) => {
    const startYear = new Date(j.start_date).getFullYear();
    const endYear = j.end_date ? new Date(j.end_date).getFullYear() : new Date().getFullYear();

    for (let y = Math.max(startYear, Math.min(...years)); y <= Math.min(endYear, Math.max(...years)); y++) {
      if (result[y]) {
        result[y][j.department] = (result[y][j.department] || 0) + 1;
      }
    }
  });

  return years.map((y) => ({
    year: y.toString(),
    ...result[y],
  }));
}

/** Position by year broken down by role title (used when a single department is filtered) */
export function getPositionByYearByRole(dept: string) {
  const filtered = personJourneys.filter((j) => j.department === dept);
  const result: Record<number, Record<string, number>> = {};

  years.forEach((y) => {
    result[y] = {};
  });

  filtered.forEach((j) => {
    const startYear = new Date(j.start_date).getFullYear();
    const endYear = j.end_date ? new Date(j.end_date).getFullYear() : new Date().getFullYear();

    for (let y = Math.max(startYear, Math.min(...years)); y <= Math.min(endYear, Math.max(...years)); y++) {
      if (result[y]) {
        result[y][j.role_title] = (result[y][j.role_title] || 0) + 1;
      }
    }
  });

  return years.map((y) => ({
    year: y.toString(),
    ...result[y],
  }));
}

/** Promotion count by year */
export function getPromotionTrends(dept?: string) {
  const filtered = dept
    ? personJourneys.filter(
        (j) => j.department === dept && j.change_reason === "Promotion"
      )
    : personJourneys.filter((j) => j.change_reason === "Promotion");

  const result: Record<number, number> = {};
  years.forEach((y) => (result[y] = 0));

  filtered.forEach((j) => {
    const y = new Date(j.start_date).getFullYear();
    if (result[y] !== undefined) result[y]++;
  });

  return years.map((y) => ({
    year: y.toString(),
    promotions: result[y],
  }));
}

/** KPI summary */
export function getKPIData(dept?: string) {
  const filtered = dept
    ? personJourneys.filter((j) => j.department === dept)
    : personJourneys;
  const unique = new Map(filtered.map((j) => [j.employee_id, j]));
  const totalEmployees = unique.size;
  const activeEmployees = employees.filter(
    (e) =>
      e.employment_status === "Active" &&
      (dept ? filtered.some((j) => j.employee_id === e.employee_id) : true)
  ).length;

  const promotions = filtered.filter(
    (j) => j.change_reason === "Promotion"
  ).length;

  const deptCount = new Set(filtered.map((j) => j.department)).size;

  return { totalEmployees, activeEmployees, promotions, deptCount };
}

/** Latest journey per employee */
function getLatestJourneyPerEmployee(dept?: string) {
  const map = new Map<string, PersonJourney>();
  const filtered = dept
    ? personJourneys.filter((j) => j.department === dept)
    : personJourneys;

  filtered.forEach((j) => {
    const existing = map.get(j.employee_id);
    if (!existing || new Date(j.start_date) > new Date(existing.start_date)) {
      map.set(j.employee_id, j);
    }
  });
  return Array.from(map.values());
}

/** Get journeys for a specific employee, sorted by date */
export function getEmployeeJourneys(employeeId: string) {
  return personJourneys
    .filter((j) => j.employee_id === employeeId)
    .sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );
}

/** Years in each position for an employee */
export function getYearsInPosition(employeeId: string) {
  const journeys = getEmployeeJourneys(employeeId);
  return journeys.map((j) => {
    const start = new Date(j.start_date);
    const end = j.end_date ? new Date(j.end_date) : new Date();
    const years =
      Math.round(
        ((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)) *
          10
      ) / 10;
    return { ...j, yearsInRole: years };
  });
}

/** Org events for a specific employee */
export function getEmployeeEvents(employeeId: string) {
  const empName = employees.find((e) => e.employee_id === employeeId)?.employee_name;
  if (!empName) return [];
  return orgEvents.filter((e) => e.subject.includes(empName));
}
