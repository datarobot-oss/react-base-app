import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UseCasesTab = ({ useCases, useCasesFailed }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Use Cases</CardTitle>
      </CardHeader>
      <CardContent>
        {useCasesFailed && <p className="body-secondary">Could not load use cases.</p>}
        {!useCasesFailed && !useCases && <p className="body-secondary">Loading…</p>}
        {useCases?.length === 0 && <p className="body-secondary">No use cases yet.</p>}
        {useCases?.length > 0 && (
          <ul className="flex flex-col divide-y divide-border">
            {useCases.map((useCase) => (
              <li key={useCase.id}>
                <a
                  href={useCase.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 py-2 hover:text-primary"
                >
                  <div>
                    <p className="body font-medium">{useCase.name ?? useCase.id}</p>
                    {useCase.description && (
                      <p className="body-secondary mt-0.5">{useCase.description}</p>
                    )}
                  </div>
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

export default UseCasesTab;
