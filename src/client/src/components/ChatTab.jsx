import { useState } from "react";
import { ArrowUp } from "lucide-react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";

const ChatTab = ({ model }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || sending || !model) return;

    const nextMessages = [...messages, { role: "user", content: prompt }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);
    setError(null);

    try {
      const response = await axios.post("api/chat", { model, messages: nextMessages });
      const reply = response.data?.choices?.[0]?.message?.content ?? "";
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Error sending chat message:", err);
      setError("Could not get a response. Try again.");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardContent className="flex max-h-96 flex-col gap-3 overflow-y-auto py-2">
          {messages.length === 0 && (
            <p className="body-secondary">Ask the LLM Gateway something to get started.</p>
          )}
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col gap-0.5">
              <span className="caption-01 text-muted-foreground">
                {message.role === "user" ? "You" : "Assistant"}
              </span>
              <p className="body whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}
          {sending && <p className="body-secondary">Generating response…</p>}
        </CardContent>
      </Card>

      {error && <p className="body-secondary text-destructive">{error}</p>}

      <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message the LLM Gateway…"
          rows={1}
          className="body max-h-32 flex-1 resize-none bg-transparent leading-6 outline-none"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={sending || !input.trim() || !model}
          aria-label="Send message"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-50"
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatTab;
