import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const socket = useSocket();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessages]);

  return { messages };
};

export default useListenMessages;