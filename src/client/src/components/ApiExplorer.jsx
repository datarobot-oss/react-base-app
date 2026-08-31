import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// path has no leading slash - it's requested relative to the current page, since
// an absolute "/api/..." would resolve against the platform's own domain root
// instead of this app's own backend when served behind a path-prefixing proxy.
const ROUTES = [
  { path: "api/me", label: "/api/me" },
  { path: "api/version", label: "/api/version" },
  { path: "api/deployments", label: "/api/deployments" },
  { path: "api/use-cases", label: "/api/use-cases" },
  { path: "api/llm-models", label: "/api/llm-models" },
];

// Highlights JSON as an array of text/<span> nodes - no dangerouslySetInnerHTML,
// so this is safe to run on untrusted response bodies.
const JSON_TOKEN_PATTERN =
  /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

function highlightJson(jsonString) {
  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = JSON_TOKEN_PATTERN.exec(jsonString)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(jsonString.slice(lastIndex, match.index));
    }
    const token = match[0];
    let className = "text-amber-300";
    if (token.startsWith('"')) {
      className = token.endsWith(":") ? "text-sky-300" : "text-green-300";
    } else if (token === "true" || token === "false") {
      className = "text-pink-300";
    } else if (token === "null") {
      className = "text-slate-400";
    }
    nodes.push(
      <span key={key++} className={className}>
        {token}
      </span>
    );
    lastIndex = JSON_TOKEN_PATTERN.lastIndex;
  }
  if (lastIndex < jsonString.length) {
    nodes.push(jsonString.slice(lastIndex));
  }
  return nodes;
}

const ApiExplorer = () => {
  const [activePath, setActivePath] = useState(ROUTES[0].path);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  const activeLabel = ROUTES.find((route) => route.path === activePath)?.label ?? activePath;

  const handleSelect = (path) => {
    setActivePath(path);
    setResult(null);
  };

  const handleSend = async () => {
    setSending(true);
    const start = performance.now();
    try {
      const response = await axios.get(activePath, { validateStatus: () => true });
      setResult({
        status: response.status,
        ok: response.status < 400,
        ms: Math.round(performance.now() - start),
        body: JSON.stringify(response.data, null, 2),
      });
    } catch (error) {
      setResult({
        status: null,
        ok: false,
        ms: Math.round(performance.now() - start),
        body: error.message,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Explorer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-1 overflow-x-auto border-b border-border">
          {ROUTES.map((route) => (
            <button
              key={route.path}
              type="button"
              onClick={() => handleSelect(route.path)}
              className={cn(
                "shrink-0 border-b-2 px-3 py-2 font-mono caption-01 transition-colors",
                activePath === route.path
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              GET {route.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <code className="flex-1 truncate rounded-md border border-border bg-muted/40 px-3 py-2 caption-01">
            {activeLabel}
          </code>
          <Button onClick={handleSend} disabled={sending}>
            {sending ? "…" : "Send"}
          </Button>
        </div>

        <div className="min-h-32 rounded-lg bg-slate-900 p-4">
          {!result && (
            <p className="font-mono text-xs italic text-slate-500">Hit "Send" to try the endpoint.</p>
          )}
          {result && (
            <>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 font-mono text-[11px] font-bold",
                    result.ok ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                  )}
                >
                  {result.status ?? "ERR"}
                </span>
                <span className="text-xs text-slate-400">{result.ms} ms</span>
              </div>
              <pre className="whitespace-pre-wrap break-words font-mono text-xs text-slate-300">
                {highlightJson(result.body)}
              </pre>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiExplorer;
