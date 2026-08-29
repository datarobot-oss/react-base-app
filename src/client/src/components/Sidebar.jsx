import { LayoutGrid, ListChecks, MessageSquare, Rocket } from "lucide-react";

import { cn } from "@/lib/utils";

import logo from "../assets/dr-logo-for-light-bg.svg";
import smallLogo from "../assets/favicon.png";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "chat", label: "Chat", icon: MessageSquare },
  { key: "deployments", label: "Deployments", icon: Rocket },
  { key: "use-cases", label: "Use Cases", icon: ListChecks },
];

const CONNECTION_DOT = {
  connected: "bg-success",
  disconnected: "bg-destructive",
  checking: "bg-muted-foreground",
};

const Sidebar = ({ activeTab, onTabChange, connectionStatus, connectionLabel }) => {
  return (
    <aside className="flex w-60 shrink-0 flex-col gap-6 border-r border-sidebar-border bg-sidebar px-4 py-6 text-sidebar-foreground">
      <div className="flex items-center gap-2 px-2">
        <img src={smallLogo} width={24} height={24} alt="" />
        <div>
          <p className="body font-medium leading-tight">Node.js & React</p>
          <p className="caption-01 leading-tight text-muted-foreground">App template</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onTabChange(key)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2.5 py-2 text-left body transition-colors",
              activeTab === key
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "hover:bg-sidebar-accent/60"
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-2 border-t border-sidebar-border px-2 pt-4">
        <img src={logo} alt="DataRobot" className="h-5" />
        <span
          className={cn("ml-auto size-2 rounded-full", CONNECTION_DOT[connectionStatus])}
          title={connectionLabel}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
