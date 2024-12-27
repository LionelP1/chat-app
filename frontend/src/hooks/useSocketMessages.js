// import { useEffect } from "react";
// import { useSocket } from "../context/SocketContext"; // Custom context for socket
// import useConversation from "../zustand/useConversation";

// const useSocketMessages = () => {
//   const { socket } = useSocket();
//   const addMessage = useConversation((state) => state.addMessage);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (newMessage) => {
//       addMessage(newMessage); // Add new message to the store
//     };

//     // Listen to the `newMessage` event
//     socket.on("newMessage", handleNewMessage);

//     // Clean up the listener
//     return () => {
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [socket, addMessage]);
// };

// export default useSocketMessages;


import { useEffect } from "react";
import { useSocket } from "../context/SocketContext"; // Custom context for socket
import useConversation from "../zustand/useConversation";

const useSocketMessages = () => {
  const { socket } = useSocket();
  const addMessage = useConversation((state) => state.addMessage);

  useEffect(() => {
    if (!socket) return;

    // Debug: Confirm socket connection
    console.log("Socket connected:", socket?.connected);

    const handleNewMessage = (newMessage) => {
      console.log("New message received:", newMessage);
      addMessage(newMessage); // Add new message to the store
    };

    // Listen to the `newMessage` event
    socket.on("newMessage", handleNewMessage);

    // Clean up the listener
    return () => {
      console.log("Cleaning up socket listeners");
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, addMessage]);
};

export default useSocketMessages;