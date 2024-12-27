import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  
  messages: [],
  
  setMessages: (messages) => set({ messages }),
  
  addMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
}));

export default useConversation;

