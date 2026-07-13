// app/lib/store.ts

// In-memory storage (use Redis or a database in production)
export const activeConversations = new Set<string>();      // Numbers receiving auto-replies
export const agentRequests = new Set<string>();            // Numbers that have requested an agent