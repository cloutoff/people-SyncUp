import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, Users, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import WorkforceOverview from "./WorkforceOverview";
import EmployeeCareerHistory from "./EmployeeCareerHistory";
import Admin from "./Admin";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen glass-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <header className="glass-card p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-xl bg-primary/15 flex items-center justify-center">
              <LayoutDashboard className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                <span className="text-primary">Sync</span> Up
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome{user?.name ? `, ${user.name}` : ""} — here is your workforce at a glance
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="glass-subtle cursor-pointer gap-2 self-start"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </header>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-strong h-11 p-1">
            <TabsTrigger value="overview" className="gap-2 text-sm">
              <LayoutDashboard className="size-4" />
              Position Overview
            </TabsTrigger>
            <TabsTrigger value="career" className="gap-2 text-sm">
              <Users className="size-4" />
              Employee Careers
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2 text-sm">
              <Settings className="size-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <WorkforceOverview />
          </TabsContent>

          <TabsContent value="career" className="mt-0">
            <EmployeeCareerHistory />
          </TabsContent>

          <TabsContent value="admin" className="mt-0">
            <Admin />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
