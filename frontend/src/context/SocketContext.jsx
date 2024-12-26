import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

// const SocketContext = createContext();

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
// 	const { authUser } = useAuthContext();

// 	useEffect(() => {
// 		if (authUser) {
// 			const socket = io("http://localhost:3000/", {
// 				query: {
// 					userId: authUser._id,
// 				},
// 			});

// 			setSocket(socket);

// 			return () => socket.close();
// 		} else {
// 			if (socket) {
// 				socket.close();
// 				setSocket(null);
// 			}
// 		}
// 	}, [authUser]);

//   return (
//     <SocketContext.Provider value={socket }>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => useContext(SocketContext);
