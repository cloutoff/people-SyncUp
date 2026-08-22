import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Users,
  BarChart3,
  TrendingUp,
  Clock,
  Building2,
  Terminal,
  ArrowRight,
  Shield,
  GitBranch,
  Database,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const features = [
  {
    icon: BarChart3,
    title: "Position Analytics",
    desc:
      "Headcount distribution, departmental breakdowns, and year-over-year growth — all rendered in real time.",
  },
  {
    icon: GitBranch,
    title: "Promotion Tracking",
    desc:
      "Map every promotion event across teams, measure velocity, and surface patterns in advancement cycles.",
  },
  {
    icon: Clock,
    title: "Career Timelines",
    desc:
      "Drill into any employee's journey: every role transition, reporting relationship, and tenure duration.",
  },
  {
    icon: Database,
    title: "Role Intelligence",
    desc:
      "Maintain a clean view of role history, departmental assignments, and the change reasons behind every move.",
  },
];

const stats = [
  { label: "Roles Modeled", value: "12+" },
  { label: "Departments", value: "6" },
  { label: "Journeys Tracked", value: "25+" },
  { label: "Promotions", value: "14" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen glass-bg overflow-hidden">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={stagger}
        className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28"
      >
        {/* Decorative blurred orbs */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -top-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-20 right-0 size-80 rounded-full bg-chart-5/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-chart-2/6 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-primary">
              <Terminal className="size-3.5" />
              Workforce Intelligence for Engineering Teams
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-5 bg-clip-text text-transparent">
              Sync
            </span>{" "}
            Up
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Visualize position history, track promotions, and map employee
            careers across your organization — with an interface built for
            teams that ship fast.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              size="lg"
              className="gap-2 px-7 text-sm font-semibold shadow-lg shadow-primary/20"
              onClick={() => navigate("/dashboard")}
            >
              Get Started
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-subtle gap-2 px-7 text-sm"
              onClick={() => navigate("/dashboard")}
            >
              <Shield className="size-4" />
              Open Dashboard
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Stats ────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-4 sm:px-6 lg:px-8 pb-12"
      >
        <div className="mx-auto max-w-3xl glass-strong rounded-2xl px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─── Features ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              One Dashboard for the Full Workforce Picture
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              Every metric, chart, and career timeline your team needs to make
              better people decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6 flex gap-4 items-start hover:scale-[1.015] transition-transform"
              >
                <div className="size-10 rounded-xl bg-primary/12 text-primary flex items-center justify-center shrink-0">
                  <f.icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl glass-strong rounded-3xl px-8 py-12 text-center"
        >
          <Building2 className="size-8 text-primary mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Ready to get your org in sync?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Sign in to access real-time charts, employee journey maps, and
            promotion analytics — all from a single control plane.
          </p>
          <Button
            size="lg"
            className="mt-6 gap-2 px-8 text-sm font-semibold shadow-lg shadow-primary/20"
            onClick={() => navigate("/dashboard")}
          >
            Launch Sync Up
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border/40 px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-xs text-muted-foreground">
          Sync Up · Workforce Position History &amp; Performance
        </p>
      </footer>
    </div>
  );
}
