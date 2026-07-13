// app/lib/store.ts

export const activeConversations = new Set<string>();   // Numbers currently handled by AI
export const agentRequests = new Set<string>();         // Numbers that have requested an agent
export const humanHandled = new Set<string>();          // Numbers that a human has replied to (AI stops)