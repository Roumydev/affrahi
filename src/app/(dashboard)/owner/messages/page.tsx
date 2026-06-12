"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

type Contact = { id: string; name: string };
type Message = {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; name: string };
  receiver: { id: string; name: string };
};

export default function OwnerMessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [myId, setMyId] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((res) => setMyId(res.data.user.id))
      .catch(() => {});
    axios.get("/api/messages/contacts").then((res) => {
      setContacts(res.data.contacts || []);
    });
  }, []);

  useEffect(() => {
    if (!selected) return;
    axios.get("/api/messages").then((res) => {
      const filtered = res.data.messages.filter(
        (m: Message) =>
          (m.sender.id === myId && m.receiver.id === selected.id) ||
          (m.sender.id === selected.id && m.receiver.id === myId),
      );
      setMessages(filtered);
    });
  }, [selected, myId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !selected) return;
    setSending(true);
    try {
      const res = await axios.post("/api/messages", {
        receiverId: selected.id,
        content: text.trim(),
      });
      setMessages((prev) => [...prev, res.data.message]);
      setText("");
    } catch {}
    setSending(false);
  };

  return (
    <div className="w-full h-[calc(100vh-120px)] flex gap-0 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-72 border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <p className="text-xs text-gray-400 mt-1">Your clients</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-sm">
              No clients yet
            </div>
          ) : (
            contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition text-left ${
                  selected?.id === c.id
                    ? "bg-[#F9F1F3] border-r-2 border-[#8B1538]"
                    : ""
                }`}
              >
                <div className="w-10 h-10 bg-[#F9F1F3] rounded-full flex items-center justify-center font-bold text-[#8B1538] flex-shrink-0">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {c.name}
                  </p>
                  <p className="text-xs text-gray-400">Client</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 flex-col gap-3">
            <div className="p-6 bg-gray-50 rounded-full">
              <Send size={32} className="text-gray-300" />
            </div>
            <p className="font-medium">Select a client to start chatting</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F9F1F3] rounded-full flex items-center justify-center font-bold text-[#8B1538]">
                {selected.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-800">{selected.name}</p>
                <p className="text-xs text-gray-400">Client</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
              {messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                  No messages yet — say hello! 👋
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.sender.id === myId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      {/* Owner messages on RIGHT, client messages on LEFT */}
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm ${
                          isMe
                            ? "bg-[#8B1538] text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${isMe ? "text-white/60" : "text-gray-400"}`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && sendMessage()
                }
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] transition"
              />
              <button
                onClick={sendMessage}
                disabled={sending || !text.trim()}
                className="px-5 py-3 bg-[#8B1538] text-white rounded-xl hover:bg-[#6d102c] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
