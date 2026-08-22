import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import {
  employees,
  personJourneys,
  roles,
  orgEvents,
  departments,
  type Employee,
  type PersonJourney,
  type Role,
  type OrgEvent,
} from "@/data/workforce";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Briefcase,
  CalendarClock,
  Plus,
  Search,
  Trash2,
  ShieldCheck,
  Building2,
  FileText,
} from "lucide-react";

// ─── Tab Buttons ─────────────────────────────────────────────────────

type AdminTab = "employees" | "journeys" | "roles" | "events";

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
      }`}
    >
      <Icon className="size-4" />
      {label}
      <Badge
        variant="outline"
        className={`text-[10px] ml-1 ${
          active
            ? "border-primary/30 text-primary"
            : "border-border/50 text-muted-foreground"
        }`}
      >
        {count}
      </Badge>
    </button>
  );
}

// ─── Employees Table ─────────────────────────────────────────────────

function EmployeesTab() {
  const [search, setSearch] = useState("");
  const [localEmployees, setLocalEmployees] = useState<Employee[]>(employees);
  const [showForm, setShowForm] = useState(false);
  const [newEmp, setNewEmp] = useState({
    employee_id: "",
    employee_name: "",
    join_date: "",
    employment_status: "Active" as Employee["employment_status"],
  });

  const filtered = localEmployees.filter(
    (e) =>
      e.employee_name.toLowerCase().includes(search.toLowerCase()) ||
      e.employee_id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newEmp.employee_id || !newEmp.employee_name || !newEmp.join_date) return;
    setLocalEmployees((prev) => [...prev, newEmp]);
    setNewEmp({ employee_id: "", employee_name: "", join_date: "", employment_status: "Active" });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setLocalEmployees((prev) => prev.filter((e) => e.employee_id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 glass-subtle border-0"
          />
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-3.5" />
          Add Employee
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <GlassCard variant="subtle">
          <h4 className="text-xs font-semibold text-foreground mb-3">New Employee</h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Input
              placeholder="Employee ID (e.g. E016)"
              value={newEmp.employee_id}
              onChange={(e) => setNewEmp((p) => ({ ...p, employee_id: e.target.value }))}
            />
            <Input
              placeholder="Full name"
              value={newEmp.employee_name}
              onChange={(e) => setNewEmp((p) => ({ ...p, employee_name: e.target.value }))}
            />
            <Input
              type="date"
              value={newEmp.join_date}
              onChange={(e) => setNewEmp((p) => ({ ...p, join_date: e.target.value }))}
            />
            <div className="flex gap-2">
              <Select
                value={newEmp.employment_status}
                onValueChange={(v) =>
                  setNewEmp((p) => ({ ...p, employment_status: v as Employee["employment_status"] }))
                }
              >
                <SelectTrigger className="glass-subtle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleAdd}>
                Save
              </Button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-xs">ID</TableHead>
              <TableHead className="text-xs">Name</TableHead>
              <TableHead className="text-xs">Join Date</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((e) => (
              <TableRow key={e.employee_id} className="border-border/30">
                <TableCell className="font-mono text-xs">{e.employee_id}</TableCell>
                <TableCell className="text-sm font-medium">{e.employee_name}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{e.join_date}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      e.employment_status === "Active"
                        ? "border-emerald-500/30 text-emerald-400"
                        : e.employment_status === "On Leave"
                          ? "border-amber-500/30 text-amber-400"
                          : "border-rose-500/30 text-rose-400"
                    }`}
                  >
                    {e.employment_status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive/80 hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                    onClick={() => handleDelete(e.employee_id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground text-sm">
                  No employees match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Person Journeys Table ───────────────────────────────────────────

function JourneysTab() {
  const [filter, setFilter] = useState("all");
  const filtered =
    filter === "all" ? personJourneys : personJourneys.filter((j) => j.department === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Building2 className="size-4 text-primary" />
        <span className="text-sm text-muted-foreground">Department</span>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48 glass-subtle">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-xs">Employee</TableHead>
              <TableHead className="text-xs">Department</TableHead>
              <TableHead className="text-xs">Role</TableHead>
              <TableHead className="text-xs">Start</TableHead>
              <TableHead className="text-xs">End</TableHead>
              <TableHead className="text-xs">Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((j, i) => (
              <TableRow key={i} className="border-border/30">
                <TableCell className="text-sm font-medium">{j.employee_name}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{j.department}</TableCell>
                <TableCell className="text-xs">{j.role_title}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{j.start_date}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {j.end_date || (
                    <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">
                      Present
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      j.change_reason === "Promotion"
                        ? "border-primary/30 text-primary"
                        : "border-border/50 text-muted-foreground"
                    }`}
                  >
                    {j.change_reason}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Roles Table ─────────────────────────────────────────────────────

function RolesTab() {
  return (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="text-xs">ID</TableHead>
            <TableHead className="text-xs">Role</TableHead>
            <TableHead className="text-xs">Department</TableHead>
            <TableHead className="text-xs">Event Type</TableHead>
            <TableHead className="text-xs">Previous Role</TableHead>
            <TableHead className="text-xs">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((r) => (
            <TableRow key={r.role_id} className="border-border/30">
              <TableCell className="font-mono text-xs">{r.role_id}</TableCell>
              <TableCell className="text-sm font-medium">{r.role_title}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{r.department}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">
                  {r.event_type}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">{r.previous_role}</TableCell>
              <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                {r.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Org Events Table ────────────────────────────────────────────────

function EventsTab() {
  const categoryColors: Record<string, string> = {
    Promotion: "border-primary/30 text-primary",
    Training: "border-emerald-500/30 text-emerald-400",
    Hiring: "border-cyan-500/30 text-cyan-400",
    Reorganization: "border-amber-500/30 text-amber-400",
    Recognition: "border-violet-500/30 text-violet-400",
  };

  return (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="text-xs">Date</TableHead>
            <TableHead className="text-xs">Category</TableHead>
            <TableHead className="text-xs">Subject</TableHead>
            <TableHead className="text-xs">Result</TableHead>
            <TableHead className="text-xs">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orgEvents.map((e, i) => (
            <TableRow key={i} className="border-border/30">
              <TableCell className="text-xs text-muted-foreground">{e.event_date}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${categoryColors[e.event_category] || "border-border/50 text-muted-foreground"}`}
                >
                  {e.event_category}
                </Badge>
              </TableCell>
              <TableCell className="text-sm font-medium">{e.subject}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{e.result}</TableCell>
              <TableCell className="text-xs text-muted-foreground max-w-[280px] truncate">
                {e.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("employees");

  const tabs: { key: AdminTab; icon: React.ElementType; label: string; count: number }[] = [
    { key: "employees", icon: Users, label: "Employees", count: employees.length },
    { key: "journeys", icon: Briefcase, label: "Journeys", count: personJourneys.length },
    { key: "roles", icon: ShieldCheck, label: "Roles", count: roles.length },
    { key: "events", icon: CalendarClock, label: "Org Events", count: orgEvents.length },
  ];

  return (
    <div className="space-y-6">
      {/* Admin header */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-1">
          <FileText className="size-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Administration</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Manage employee records, review career journeys, and keep your workforce data in sync.
        </p>
      </GlassCard>

      {/* Tab navigation */}
      <div className="glass-card p-2 flex flex-wrap gap-1">
        {tabs.map((t) => (
          <TabButton
            key={t.key}
            active={activeTab === t.key}
            onClick={() => setActiveTab(t.key)}
            icon={t.icon}
            label={t.label}
            count={t.count}
          />
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "employees" && <EmployeesTab />}
      {activeTab === "journeys" && <JourneysTab />}
      {activeTab === "roles" && <RolesTab />}
      {activeTab === "events" && <EventsTab />}
    </div>
  );
}
