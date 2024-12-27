import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useSocketMessages = () => {
  const { socket } = useSocket();
  const addMessage = useConversation((state) => state.addMessage);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      addMessage(newMessage);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      console.log("Cleaning up socket listeners");
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, addMessage]);
};

export default useSocketMessages;