// src/context/SocketProvider.jsx
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", localStorage.getItem("user"));
    if (!user || user.role !== "citizen") return;
    
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
  
    socketRef.current = socket;
  
    socket.on("connect", () => {
      console.log("✅ Socket connected for citizen");
    });
  
    socket.on("broadcast", (data) => {
      console.log("📢 Received broadcast:", data);
      toast.info(`📢 ${data.message}`);
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
