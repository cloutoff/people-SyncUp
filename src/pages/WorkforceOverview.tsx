import { useMemo, useState } from "react";
import { GlassKpiCard, GlassCard } from "@/components/GlassCard";
import {
  getKPIData,
  getPositionDistribution,
  getPositionByYear,
  getPromotionTrends,
  departments,
} from "@/data/workforce";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingUp, Briefcase, Building2, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  Cell,
} from "recharts";

const CHART_COLORS = [
  "oklch(0.72 0.16 200)",
  "oklch(0.70 0.15 170)",
  "oklch(0.65 0.14 150)",
  "oklch(0.74 0.15 50)",
  "oklch(0.68 0.17 310)",
  "oklch(0.72 0.12 250)",
  "oklch(0.65 0.13 100)",
  "oklch(0.70 0.14 200)",
];

const DEPT_COLORS: Record<string, string> = {
  Engineering: "oklch(0.72 0.16 200)",
  Marketing: "oklch(0.70 0.15 170)",
  "Human Resources": "oklch(0.65 0.14 150)",
  Design: "oklch(0.74 0.15 50)",
  Sales: "oklch(0.68 0.17 310)",
  Executive: "oklch(0.72 0.12 250)",
};

const GRID_STROKE = "rgba(255, 255, 255, 0.06)";
const TICK_FILL = "rgba(255, 255, 255, 0.4)";

function GlassTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-4 py-3 text-sm shadow-xl">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          <span className="inline-block size-2 rounded-full mr-2" style={{ backgroundColor: p.color }} />
          {p.name}: <span className="font-medium text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function WorkforceOverview() {
  const [selectedDept, setSelectedDept] = useState<string>("all");

  const deptFilter = selectedDept === "all" ? undefined : selectedDept;

  const kpi = useMemo(() => getKPIData(deptFilter), [deptFilter]);
  const distribution = useMemo(() => getPositionDistribution(deptFilter), [deptFilter]);
  const positionByYear = useMemo(() => getPositionByYear(deptFilter), [deptFilter]);
  const promotionTrends = useMemo(() => getPromotionTrends(deptFilter), [deptFilter]);

  // Build stacked dept data for position by year
  const yearChartDepts = useMemo(() => {
    const set = new Set<string>();
    positionByYear.forEach((row) => {
      Object.keys(row).forEach((k) => {
        if (k !== "year") set.add(k);
      });
    });
    return Array.from(set);
  }, [positionByYear]);

  return (
    <div className="space-y-6">
      {/* Department Filter */}
      <div className="glass-card p-4 flex items-center gap-3">
        <Filter className="size-4 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">Filter by Department</span>
        <Select value={selectedDept} onValueChange={setSelectedDept}>
          <SelectTrigger className="w-52 glass-subtle">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedDept !== "all" && (
          <button
            onClick={() => setSelectedDept("all")}
            className="text-xs text-primary hover:underline"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassKpiCard
          title="Total Employees"
          value={kpi.totalEmployees}
          subtitle="Across all positions"
          icon={<Users className="size-5" />}
          trend="up"
        />
        <GlassKpiCard
          title="Active"
          value={kpi.activeEmployees}
          subtitle="Currently active"
          icon={<Briefcase className="size-5" />}
          trend="neutral"
        />
        <GlassKpiCard
          title="Total Promotions"
          value={kpi.promotions}
          subtitle="All-time"
          icon={<TrendingUp className="size-5" />}
          trend="up"
        />
        <GlassKpiCard
          title="Departments"
          value={kpi.deptCount}
          subtitle="Active departments"
          icon={<Building2 className="size-5" />}
          trend="neutral"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Position Distribution */}
        <GlassCard>
          <h3 className="text-sm font-semibold text-foreground mb-1">Position Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Current headcount by role title</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={distribution}
                layout="vertical"
                margin={{ left: 10, right: 20, top: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: TICK_FILL }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={140}
                  tick={{ fontSize: 11, fill: TICK_FILL }}
                />
                <Tooltip content={<GlassTooltip />} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
                  {distribution.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Position by Year — Stacked Bar */}
        <GlassCard>
          <h3 className="text-sm font-semibold text-foreground mb-1">Headcount by Year</h3>
          <p className="text-xs text-muted-foreground mb-4">Department-level headcount over time</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={positionByYear} margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: TICK_FILL }} />
                <YAxis tick={{ fontSize: 11, fill: TICK_FILL }} />
                <Tooltip content={<GlassTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: TICK_FILL }}
                  iconSize={10}
                />
                {yearChartDepts.map((dept) => (
                  <Bar
                    key={dept}
                    dataKey={dept}
                    stackId="a"
                    fill={DEPT_COLORS[dept] || "oklch(0.70 0.12 200)"}
                    fillOpacity={0.8}
                    radius={dept === yearChartDepts[yearChartDepts.length - 1] ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Promotion Trends */}
      <GlassCard>
        <h3 className="text-sm font-semibold text-foreground mb-1">Promotion Trends</h3>
        <p className="text-xs text-muted-foreground mb-4">Number of promotions per year</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={promotionTrends} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="promoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.16 200)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.72 0.16 200)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: TICK_FILL }} />
              <YAxis tick={{ fontSize: 11, fill: TICK_FILL }} allowDecimals={false} />
              <Tooltip content={<GlassTooltip />} />
              <Area
                type="monotone"
                dataKey="promotions"
                stroke="oklch(0.72 0.16 200)"
                strokeWidth={2.5}
                fill="url(#promoGradient)"
                dot={{ r: 4, fill: "oklch(0.72 0.16 200)", stroke: "rgba(22, 24, 40, 0.8)", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "oklch(0.72 0.16 200)", stroke: "rgba(22, 24, 40, 0.8)", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
