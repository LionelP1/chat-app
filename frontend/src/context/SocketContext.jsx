import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
	const { authUser } = useAuthContext();



  useEffect(() => {
    if (authUser) {
      console.log("Initializing socket connection...");
      const socketConnection = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
      });

      socketConnection.on("connect", () => {
        console.log("Socket connected:", socketConnection.id);
      });

      socketConnection.on("connect_error", (error) => {
        console.error("Socket connection failed:", error);
      });

      socketConnection.emit("register", authUser._id);
      setSocket(socketConnection);

      return () => {
        console.log("Closing socket connection...");
        socketConnection.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        console.log("No authUser found. Closing socket connection...");
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
