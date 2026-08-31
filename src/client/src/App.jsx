import { useEffect, useState } from "react";
import axios from "axios";

import { Badge } from "@/components/ui/badge";
import ChatTab from "@/components/ChatTab";
import DeploymentsTab from "@/components/DeploymentsTab";
import { Heading } from "@/components/ui/heading";
import OverviewTab from "@/components/OverviewTab";
import Sidebar from "@/components/Sidebar";
import UseCasesTab from "@/components/UseCasesTab";
import { cn } from "@/lib/utils";

// In dev, the Vite dev server and this app's Express server run on different
// ports, so API calls need an absolute URL. In production they're served
// from the same origin - a relative path (no leading slash) resolves
// correctly against the current page, whatever prefix a proxy served it
// under, so no baseURL is needed there.
axios.defaults.baseURL = import.meta.env.DEV ? "http://localhost:8080" : undefined;

const TAB_TITLES = {
  overview: "Overview",
  chat: "Chat",
  deployments: "Deployments",
  "use-cases": "Use Cases",
};

function useApiResource(path) {
  const [data, setData] = useState(undefined);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    axios
      .get(path)
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error(`Error fetching ${path}:`, error);
        setFailed(true);
      });
  }, [path]);

  return [data, failed];
}

const App = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [me, meFailed] = useApiResource("api/me");
  const [version, versionFailed] = useApiResource("api/version");
  const [deployments, deploymentsFailed] = useApiResource("api/deployments");
  const [useCases, useCasesFailed] = useApiResource("api/use-cases");
  const [llmModels, llmModelsFailed] = useApiResource("api/llm-models");
  const [chatModel, setChatModel] = useState("");

  const connectionStatus = meFailed ? "disconnected" : me ? "connected" : "checking";
  const connectionLabel = meFailed ? "Not connected" : me ? me.email : "Checking connection…";

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        connectionStatus={connectionStatus}
        connectionLabel={connectionLabel}
      />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <div className="flex items-center justify-between">
            <Heading level={2}>{TAB_TITLES[activeTab]}</Heading>
            <div className="flex items-center gap-3">
              {activeTab !== "chat" && (
                <div className="flex items-center gap-2" title={meFailed ? connectionLabel : undefined}>
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      connectionStatus === "connected"
                        ? "bg-success"
                        : connectionStatus === "disconnected"
                          ? "bg-destructive"
                          : "bg-muted-foreground"
                    )}
                  />
                  <span className="body-secondary">{connectionLabel}</span>
                </div>
              )}
              {activeTab === "chat" && !llmModelsFailed && llmModels?.length > 0 && (
                <select
                  value={chatModel || llmModels[0]}
                  onChange={(event) => setChatModel(event.target.value)}
                  className="caption-01 rounded-md border border-border bg-background px-2 py-0.5"
                >
                  {llmModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              )}
              {activeTab !== "chat" && version && !versionFailed && (
                <Badge variant="light-gray">API v{version.versionString}</Badge>
              )}
            </div>
          </div>

          {activeTab === "overview" && (
            <OverviewTab
              deployments={deploymentsFailed ? null : deployments}
              useCases={useCasesFailed ? null : useCases}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === "chat" && (
            <ChatTab model={chatModel || llmModels?.[0] || ""} />
          )}
          {activeTab === "deployments" && (
            <DeploymentsTab deployments={deployments} deploymentsFailed={deploymentsFailed} />
          )}
          {activeTab === "use-cases" && (
            <UseCasesTab useCases={useCases} useCasesFailed={useCasesFailed} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
