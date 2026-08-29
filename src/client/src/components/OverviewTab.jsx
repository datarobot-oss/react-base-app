import { ChevronRight, ExternalLink, ListChecks, Rocket } from "lucide-react";

import ApiExplorer from "@/components/ApiExplorer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RESOURCE_LINKS = [
  { label: "Template source", url: "https://github.com/datarobot-oss/react-base-app" },
  {
    label: "App templates guide",
    url: "https://docs.datarobot.com/en/docs/wb-apps/app-templates/index.html",
  },
  {
    label: "Custom Applications API reference",
    url: "https://docs.datarobot.com/en/docs/api/reference/public-api/custom_applications.html",
  },
];

const OverviewTab = ({ deployments, useCases, onNavigate }) => {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="body max-w-[62ch] leading-relaxed">
            This template connects a Node.js and React app to the DataRobot platform. Your
            application token is injected automatically, so you don't need to handle
            authentication yourself.
          </p>
          <p className="body-secondary max-w-[62ch] leading-relaxed">
            To get started, add routes in{" "}
            <code className="caption-01 rounded bg-muted px-1 py-0.5 font-mono">server.js</code>,
            call the DataRobot API through the built-in proxy endpoints, and try them in the API
            Explorer below.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <button type="button" onClick={() => onNavigate("deployments")} className="text-left">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center gap-3">
              <Rocket className="size-5 text-muted-foreground" />
              <div className="flex flex-1 flex-col">
                <span className="heading-05">
                  {deployments === null ? "-" : (deployments?.length ?? "…")}
                </span>
                <span className="body-secondary">Deployments</span>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </button>

        <button type="button" onClick={() => onNavigate("use-cases")} className="text-left">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center gap-3">
              <ListChecks className="size-5 text-muted-foreground" />
              <div className="flex flex-1 flex-col">
                <span className="heading-05">
                  {useCases === null ? "-" : (useCases?.length ?? "…")}
                </span>
                <span className="body-secondary">Use Cases</span>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </button>
      </div>

      <ApiExplorer />

      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col divide-y divide-border">
            {RESOURCE_LINKS.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 py-2 body hover:text-primary"
                >
                  {link.label}
                  <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
