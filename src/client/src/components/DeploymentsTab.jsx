import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DeploymentsTab = ({ deployments, deploymentsFailed }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployments</CardTitle>
      </CardHeader>
      <CardContent>
        {deploymentsFailed && <p className="body-secondary">Could not load deployments.</p>}
        {!deploymentsFailed && !deployments && <p className="body-secondary">Loading…</p>}
        {deployments?.length === 0 && <p className="body-secondary">No deployments yet.</p>}
        {deployments?.length > 0 && (
          <ul className="flex flex-col divide-y divide-border">
            {deployments.map((deployment) => (
              <li key={deployment.id}>
                <a
                  href={deployment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 py-2 body hover:text-primary"
                >
                  {deployment.label ?? deployment.id}
                  <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default DeploymentsTab;
