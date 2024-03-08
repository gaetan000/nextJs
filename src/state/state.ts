import { create } from 'zustand'

interface Session {
    id: string
}

interface SessionsState {
    plannedSessions: Session["id"][]
    planSession: (sessionId: Session["id"]) => void
    unplanSession: (sessionId: Session["id"]) => void
}
export const useSessionStore = create<SessionsState>((set) => ({
    plannedSessions: [],
    planSession: (sessionId) => set((state) => ({ plannedSessions: [...state.plannedSessions, sessionId]})),
    unplanSession: (sessionId) => set((state) => ({ plannedSessions: state.plannedSessions.filter(id => id !== sessionId) })),
}))
