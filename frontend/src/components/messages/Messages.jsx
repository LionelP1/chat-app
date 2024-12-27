import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import { useSocket } from "../../context/SocketContext";
import useSocketMessages from "../../hooks/useSocketMessages";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useSocketMessages(); // Set up socket message listener
  const lastMessageRef = useRef();

  // Debug: Log messages to ensure they are being fetched
  console.log("Messages Logged:", messages);

  useEffect(() => {
    // Scroll to the last message when messages update
    if (lastMessageRef.current) {
      setTimeout(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        // Show loading skeletons while fetching messages
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id || message.timestamp} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        // Show a message when no messages are present
        <p className="text-center">No messages yet! Start the conversation.</p>
      )}
    </div>
  );
};

export default Messages;








// import { useEffect, useRef } from "react";
// import useGetMessages from "../../hooks/useGetMessages";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import Message from "./Message";
// import { useSocket } from "../../context/SocketContext";
// import useSocketMessages from "../../hooks/useSocketMessages";



// const Messages = () => {
//   const { messages, loading } = useGetMessages();
//   useSocketMessages();
//   const lastMessageRef = useRef();

//   console.log("Messages:", messages);
//   useEffect(() => {
//     if (lastMessageRef.current) {
//       setTimeout(() => {
//         lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     }
//   }, [messages]);

// 	console.log("Messages:", messages);

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {loading ? (
//         // Show loading skeletons while fetching messages
//         [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
//       ) : messages.length > 0 ? (
//         messages.map((message) => (
//           <div key={message._id || message.timestamp} ref={lastMessageRef}>
//             <Message message={message} />
//           </div>
//         ))
//       ) : (
//         // Show a message when no messages are present
//         <p className="text-center">No messages yet! Start the conversation.</p>
//       )}
//     </div>
//   );
// };

// export default Messages;

// const Messages = () => {
// 	const { messages, loading } = useGetMessages();
// 	useListenMessages();
// 	const lastMessageRef = useRef();

// 	useEffect(() => {
// 		setTimeout(() => {
// 			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
// 		}, 100);
// 	}, [messages]);

// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			{!loading &&
// 				messages.length > 0 &&
// 				messages.map((message) => (
// 					<div key={message._id} ref={lastMessageRef}>
// 						<Message message={message} />
// 					</div>
// 				))}

// 			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
// 			{!loading && messages.length === 0 && (
// 				<p className='text-center'>Send a message to start the conversation</p>
// 			)}
// 		</div>
// 	);
// };
// export default Messages;