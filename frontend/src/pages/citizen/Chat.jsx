"use client"

import { useState, useRef, useEffect } from "react"
import { Box, Typography, Button, Paper, Stack, Avatar, CircularProgress, IconButton } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import SendIcon from "@mui/icons-material/Send"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import TextField from "@mui/material/TextField"

const questions = [
  {
    question: "Am I in safe place?",
    answer: "Please remain alert. If you feel unsafe, send an SOS immediately or move to a crowded location.",
  },
  {
    question: "What is the crime map feature",
    answer: "The crime map allows you to see all the crime happenings in your area. You can filter by type of crime.",
  },
  {
    question: "How to report a crime?",
    answer: "Go to 'Report Crime' section, then choose your location from the map or detect yor location and submit.In the next page fill in the details, and submit your report securely.",
  },
  {
    question: "I want to see the crimes in my area",
    answer: "Navigate to the 'Crime Map' section to view crime data around your location.",
  },
 
]

// Custom theme colors based on the image
const theme = {
  primary: {
    main: "#0a0a4a", // Dark navy blue
    light: "#141470",
    dark: "#050530",
  },
  secondary: {
    main: "#00e5c7", // Teal/cyan color
    light: "#33ebd2",
    dark: "#00b29d",
  },
  text: {
    primary: "#ffffff",
    secondary: "#e0e0e0",
  },
  background: {
    default: "#0a0a4a",
    paper: "#141470",
  },
}

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your safety assistant. How can I help you today?",
      type: 'bot'
    }
  ]);
  const [typing, setTyping] = useState(false)
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, typing])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleQuestionClick = (q) => {
    setMessages((prev) => [...prev, { text: q.question, type: "user" }])
    setTyping(true)

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: q.answer, type: "bot" }])
      setTyping(false)
    }, 1000) // 1 second typing delay
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    setMessages((prev) => [...prev, { text: inputMessage, type: "user" }])
    setTyping(true)
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      // Find a matching question or use default response
      const matchedQuestion = questions.find((q) => q.question.toLowerCase().includes(inputMessage.toLowerCase()))

      const botResponse = matchedQuestion
        ? matchedQuestion.answer
        : "I'm not sure how to help with that. Please try one of the quick questions below."

      setMessages((prev) => [...prev, { text: botResponse, type: "bot" }])
      setTyping(false)
    }, 1500)
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.primary.main,
        color: theme.text.primary,
      }}
    >
      {/* Top Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: theme.primary.main,
          color: theme.text.primary,
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${theme.primary.light}`
        }}
      >
        <IconButton sx={{ color: theme.text.primary, mr: 1 }} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          Chat Support
        </Typography>
        <Box sx={{ width: 40 }} /> {/* Spacer for alignment */}
      </Box>

      {/* Chat Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: 'white',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
              gap: 1,
            }}
          >
            {msg.type === "bot" && (
              <Avatar sx={{ bgcolor: theme.secondary.main }}>
                <SmartToyIcon sx={{ color: theme.primary.main }} />
              </Avatar>
            )}
            <Paper
              sx={{
                p: 1.5,
                borderRadius: 3,
                maxWidth: "75%",
                backgroundColor: msg.type === "user" ? theme.secondary.main : theme.primary.light,
                color: msg.type === "user" ? theme.primary.dark : theme.text.primary,
                boxShadow: 3,
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
            {msg.type === "user" && (
              <Avatar sx={{ bgcolor: theme.text.primary }}>
                <PersonIcon sx={{ color: theme.primary.main }} />
              </Avatar>
            )}
          </Box>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: theme.secondary.main }}>
              <SmartToyIcon sx={{ color: theme.primary.main }} />
            </Avatar>
            <Paper
              sx={{
                p: 1.5,
                borderRadius: 3,
                backgroundColor: theme.primary.light,
                boxShadow: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={15} sx={{ color: theme.secondary.main }} />
                <Typography variant="body2" sx={{ color: theme.text.primary }}>
                  Bot is typing...
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Box
        sx={{
          p: 2,
          backgroundColor: theme.primary.light,
          borderTop: `1px solid ${theme.primary.light}`,
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.primary.main,
              color: theme.text.primary,
              borderRadius: 3,
              "& fieldset": {
                borderColor: theme.primary.light,
              },
              "&:hover fieldset": {
                borderColor: theme.secondary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.secondary.main,
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: theme.text.secondary,
              opacity: 0.7,
            },
          }}
        />
        <IconButton
          onClick={handleSendMessage}
          sx={{
            backgroundColor: theme.secondary.main,
            color: theme.primary.dark,
            "&:hover": {
              backgroundColor: theme.secondary.light,
            },
            borderRadius: 2,
            p: 1,
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>

      {/* Quick Questions */}
      <Box
        sx={{
          p: 2,
          borderTop:` 1px solid ${theme.primary.light}`,
          backgroundColor: theme.primary.light,
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ color: theme.secondary.main, fontWeight: "bold" }}>
          Quick Questions:
        </Typography>
        <Stack spacing={1}>
          {questions.map((q, idx) => (
            <Button
              key={idx}
              variant="outlined"
              fullWidth
              onClick={() => handleQuestionClick(q)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                borderRadius: 2,
                borderColor: theme.secondary.main,
                color: theme.text.primary,
                backgroundColor: theme.primary.main,
                "&:hover": {
                  backgroundColor: theme.primary.light,
                  borderColor: theme.secondary.light,
                },
                py: 1,
              }}
            >
              {q.question}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default Chat