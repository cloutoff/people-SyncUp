import { useMemo, useState } from "react";
import { GlassCard, GlassKpiCard } from "@/components/GlassCard";
import {
  employees,
  getEmployeeJourneys,
  getYearsInPosition,
  getEmployeeEvents,
  years,
  personJourneys,
  departments,
} from "@/data/workforce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Calendar,
  ArrowRight,
  TrendingUp,
  Clock,
  Trophy,
  ChevronRight,
} from "lucide-react";

// ─── Employee Selector ───────────────────────────────────────────────

function EmployeeSelector({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <User className="size-4 text-primary shrink-0" />
      <span className="text-sm font-medium text-muted-foreground">Select Employee</span>
      <Select value={selectedId} onValueChange={onSelect}>
        <SelectTrigger className="w-64 glass-subtle">
          <SelectValue placeholder="Choose an employee" />
        </SelectTrigger>
        <SelectContent>
          {employees.map((e) => (
            <SelectItem key={e.employee_id} value={e.employee_id}>
              <span className="font-medium">{e.employee_name}</span>
              <span className="ml-2 text-xs text-muted-foreground">({e.employee_id})</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ─── Position-by-Year Matrix ─────────────────────────────────────────

function PositionMatrix({ employeeId }: { employeeId: string }) {
  const journeys = getEmployeeJourneys(employeeId);
  const emp = employees.find((e) => e.employee_id === employeeId);
  if (!emp || journeys.length === 0) return null;

  const joinYear = new Date(emp.join_date).getFullYear();
  const allYears = years.filter((y) => y >= joinYear);
  if (allYears.length === 0) return null;

  // Build the matrix: for each year, find which role the employee held
  const matrix = allYears.map((y) => {
    const journey = journeys.find((j) => {
      const s = new Date(j.start_date).getFullYear();
      const e = j.end_date ? new Date(j.end_date).getFullYear() : new Date().getFullYear();
      return y >= s && y <= e;
    });
    return {
      year: y,
      role: journey?.role_title || null,
      dept: journey?.department || null,
    };
  });

  const uniqueDepts = [...new Set(journeys.map((j) => j.department))];

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-1">
        <Calendar className="size-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Position-by-Year Matrix</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Which role each employee held in each year</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground pb-2 pr-4">Employee</th>
              {allYears.map((y) => (
                <th key={y} className="text-center text-xs font-medium text-muted-foreground pb-2 px-2 min-w-[70px]">
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-xs font-medium text-foreground pr-4 py-2 truncate max-w-[120px]">
                {emp.employee_name}
              </td>
              {matrix.map((m) => (
                <td key={m.year} className="text-center px-2 py-2">
                  {m.role ? (
                    <div
                      className="glass-subtle rounded-lg px-2 py-1.5 text-[10px] font-medium text-foreground leading-tight"
                      title={`${m.role} (${m.dept})`}
                    >
                      <div className="truncate">{m.role}</div>
                      <div className="text-muted-foreground mt-0.5">{m.dept}</div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground/40">—</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

// ─── Career Timeline ─────────────────────────────────────────────────

function CareerTimeline({ employeeId }: { employeeId: string }) {
  const journeys = getEmployeeJourneys(employeeId);
  if (journeys.length === 0) return null;

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-1">
        <Clock className="size-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Career Timeline</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Chronological progression through roles</p>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-primary/20" />

        <div className="space-y-4">
          {journeys.map((j, i) => (
            <div key={i} className="relative flex gap-4 items-start">
              {/* Dot */}
              <div
                className={`relative z-10 size-9 rounded-full flex items-center justify-center shrink-0 ${
                  j.change_reason === "Promotion"
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {j.change_reason === "Promotion" ? (
                  <TrendingUp className="size-4" />
                ) : (
                  <User className="size-4" />
                )}
              </div>

              {/* Content */}
              <div className="glass-subtle rounded-xl px-4 py-3 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground">{j.role_title}</span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 ${
                      j.change_reason === "Promotion"
                        ? "border-primary/40 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {j.change_reason}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {j.department} · {j.start_date}
                  {j.end_date ? ` → ${j.end_date}` : " → Present"}
                </div>
                {j.reports_to !== "N/A" && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Reports to: {j.reports_to}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

// ─── Career Path Flow ────────────────────────────────────────────────

function CareerPath({ employeeId }: { employeeId: string }) {
  const journeys = getEmployeeJourneys(employeeId);
  if (journeys.length === 0) return null;

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-1">
        <ArrowRight className="size-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Career Path</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Visual progression path</p>
      <div className="flex flex-wrap items-center gap-2">
        {journeys.map((j, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="glass-subtle rounded-xl px-4 py-2.5 text-center">
              <p className="text-xs font-semibold text-foreground">{j.role_title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{j.department}</p>
            </div>
            {i < journeys.length - 1 && (
              <ChevronRight className="size-4 text-primary shrink-0" />
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

// ─── Years in Position ───────────────────────────────────────────────

function YearsInPosition({ employeeId }: { employeeId: string }) {
  const data = getYearsInPosition(employeeId);
  if (data.length === 0) return null;

  const totalYears = data.reduce((sum, d) => sum + d.yearsInRole, 0);

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-1">
        <Clock className="size-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Years in Each Position</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Total tenure: <span className="font-medium text-foreground">{totalYears.toFixed(1)} years</span>
      </p>
      <div className="space-y-3">
        {data.map((d, i) => {
          const maxYears = Math.max(...data.map((x) => x.yearsInRole));
          const pct = maxYears > 0 ? (d.yearsInRole / maxYears) * 100 : 0;
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground truncate max-w-[200px]">
                  {d.role_title}
                </span>
                <span className="text-xs font-semibold text-primary tabular-nums">
                  {d.yearsInRole} yr{d.yearsInRole !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

// ─── Promotion History ───────────────────────────────────────────────

function PromotionHistory({ employeeId }: { employeeId: string }) {
  const journeys = getEmployeeJourneys(employeeId);
  const promotions = journeys.filter((j) => j.change_reason === "Promotion");

  if (promotions.length === 0) {
    return (
      <GlassCard>
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="size-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Promotion History</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-2">No promotions recorded for this employee.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-1">
        <Trophy className="size-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Promotion History</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        {promotions.length} promotion{promotions.length !== 1 ? "s" : ""} on record
      </p>
      <div className="space-y-2">
        {promotions.map((p, i) => (
          <div
            key={i}
            className="glass-subtle rounded-xl px-4 py-3 flex items-center gap-3"
          >
            <div className="size-8 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <TrendingUp className="size-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">{p.role_title}</p>
              <p className="text-[10px] text-muted-foreground">
                {p.department} · {p.start_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

// ─── Main Component ──────────────────────────────────────────────────

export default function EmployeeCareerHistory() {
  const [selectedId, setSelectedId] = useState(employees[0].employee_id);

  const emp = employees.find((e) => e.employee_id === selectedId);
  const journeys = getEmployeeJourneys(selectedId);

  const statusColor =
    emp?.employment_status === "Active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : emp?.employment_status === "On Leave"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-rose-50 text-rose-700 border-rose-200";

  return (
    <div className="space-y-6">
      <EmployeeSelector selectedId={selectedId} onSelect={setSelectedId} />

      {/* Employee summary */}
      {emp && (
        <div className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="size-12 rounded-full bg-primary/15 text-primary flex items-center justify-center text-lg font-bold shrink-0">
            {emp.employee_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{emp.employee_name}</h2>
              <Badge variant="outline" className={`text-[10px] border ${statusColor}`}>
                {emp.employment_status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Joined {emp.join_date} · {journeys.length} role{journeys.length !== 1 ? "s" : ""} held
            </p>
          </div>
        </div>
      )}

      {/* Career Path + Years in Position */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CareerPath employeeId={selectedId} />
        <YearsInPosition employeeId={selectedId} />
      </div>

      {/* Position Matrix */}
      <PositionMatrix employeeId={selectedId} />

      {/* Timeline + Promotion History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CareerTimeline employeeId={selectedId} />
        <PromotionHistory employeeId={selectedId} />
      </div>
    </div>
  );
}
