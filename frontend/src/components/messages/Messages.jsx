import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useSocketMessages from "../../hooks/useSocketMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useSocketMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (lastMessageRef.current) {
      setTimeout(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id || message.timestamp} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <p className="text-center">No messages yet! Start the conversation.</p>
      )}
    </div>
  );
};

export default Messages;