import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Users,
  BarChart3,
  TrendingUp,
  Clock,
  Building2,
  Sparkles,
  ArrowRight,
  Shield,
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
    title: "Position Overview",
    desc: "Visual breakdowns of headcount, distribution, and hiring trends across departments.",
  },
  {
    icon: TrendingUp,
    title: "Promotion Insights",
    desc: "Track promotion velocity, departmental growth, and career progression patterns.",
  },
  {
    icon: Clock,
    title: "Career Timelines",
    desc: "Interactive employee timelines showing every role transition and tenure.",
  },
  {
    icon: Users,
    title: "Employee Journeys",
    desc: "Full career path visualization with years-in-role analytics and history.",
  },
];

const stats = [
  { label: "Roles Tracked", value: "12+" },
  { label: "Departments", value: "6" },
  { label: "Career Paths", value: "15+" },
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
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-20 right-0 size-80 rounded-full bg-chart-5/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-chart-2/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              Workforce Intelligence Platform
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            See Your Workforce
            <br />
            <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
              Clearly
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Interactive dashboards for position overview, career tracking, and
            promotion analytics — built for HR leaders who move fast.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="gap-2 px-7 text-sm font-semibold shadow-lg shadow-primary/20"
              onClick={() => navigate("/auth?returnTo=/dashboard")}
            >
              Get Started
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-subtle gap-2 px-7 text-sm"
              onClick={() => navigate("/auth?returnTo=/dashboard")}
            >
              <Shield className="size-4" />
              View Dashboard
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
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{s.value}</p>
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
              Everything You Need to Understand Your People
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              Deep analytics across every dimension of your workforce.
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
                  <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
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
            Ready to transform your workforce data?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Sign in to access interactive charts, employee journeys, and real-time
            analytics across your organization.
          </p>
          <Button
            size="lg"
            className="mt-6 gap-2 px-8 text-sm font-semibold shadow-lg shadow-primary/20"
            onClick={() => navigate("/auth?returnTo=/dashboard")}
          >
            Launch Dashboard
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border/40 px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-xs text-muted-foreground">
          Workforce Analytics Dashboard · Built with Glassmorphism
        </p>
      </footer>
    </div>
  );
}
