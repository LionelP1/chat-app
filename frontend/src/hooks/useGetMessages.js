import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				console.log("Fetched messages:", data); 
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;


// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";
// const useGetMessages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulating fetching messages
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch("/api/messages");
//         const data = await response.json();

//         if (Array.isArray(data)) {
//           setMessages(data);
//         } else {
//           console.error("Fetched messages data is not an array");
//           setMessages([]); // Set empty array if the data isn't an array
//         }
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         setMessages([]); // Set empty array if there was an error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, []);

//   return { messages, loading };
// };

// export default useGetMessages;