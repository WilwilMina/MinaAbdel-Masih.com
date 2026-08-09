/*
  ChatWidget — floating assistant styled like a live-support chat.

  Two modes:
    FAQ (default)  — the original canned question buttons. Instant, free, and
                     what most visitors will use. Answers live in RESPONSES.
    Ask            — opened via "Ask other questions". Reveals a text input
                     whose messages go to POST /api/chat (Gemini, grounded in
                     src/data). Falls back to the canned answers if that fails.

  The canned path never touches the network, so the widget still works with no
  API key, no quota, and no connection.
*/
import { useEffect, useRef, useState } from 'react'
import './ChatWidget.css'

const RESPONSES = {
  who: "Mina is a Computer Science student at NC State (AI Concentration, Math Minor) with a 4.0/4.0 GPA, ranked #1 in his Computer Science class. He builds full-stack systems and AI applications — from Java compliance engines to Spring Boot + React apps to agentic AI backends.",
  projects: "A few highlights: an Access Control Compliance Engine in Java that parses 262,000+ records; a full-stack Student Productivity Tool with a Spring Boot backend and React frontend; and Rooted, an agentic AI journaling app where Mina was the AI/ML lead at the IBM × NCCU Hackathon.",
  opportunities: "Mina is seeking Summer 2027 software engineering internships — especially roles involving full-stack development, AI, and building products that solve real problems.",
  website: "Yes! Mina built this site with React and Vite, designing the layout and animations himself. He used AI tools to move faster and polish the details — he sees AI as a way to push good projects further.",
}

const QUESTIONS = [
  { key: 'who',           text: 'Who is Mina?',              icon: 'fa-user'            },
  { key: 'projects',      text: 'What has Mina built?',      icon: 'fa-diagram-project' },
  { key: 'opportunities', text: 'What is Mina looking for?', icon: 'fa-briefcase'       },
  { key: 'website',       text: 'Did Mina build this site?', icon: 'fa-robot'           },
]

const INTRO = "Hi! I'm Mina's assistant. Ask me a question below 👇"
const ASK_INTRO = "Go ahead — ask me anything about Mina's work, skills, or background."
const MAX_CHARS = 500

/* The model is told to answer in prose, but strip markdown anyway so a slip
   never renders as literal asterisks in a bubble. */
function toPlainText(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/(^|\n)\s*[*-]\s+/g, '$1• ')
    .trim()
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ who: 'bot', text: INTRO }])
  const [typing, setTyping] = useState(false)
  const [askMode, setAskMode] = useState(false)
  const [draft, setDraft] = useState('')
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  // Auto-scroll to the newest message whenever content changes.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing, open, askMode])

  useEffect(() => {
    if (askMode) inputRef.current?.focus()
  }, [askMode])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const addBot = (text) => setMessages((prev) => [...prev, { who: 'bot', text }])

  const handleQuestion = (q) => {
    if (typing) return
    setMessages((prev) => [...prev, { who: 'user', text: q.text }])
    setTyping(true)
    timerRef.current = setTimeout(() => {
      addBot(RESPONSES[q.key])
      setTyping(false)
    }, 1000)
  }

  const openAskMode = () => {
    setAskMode(true)
    addBot(ASK_INTRO)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text || typing) return

    const priorTurns = messages.slice(-6)
    setMessages((prev) => [...prev, { who: 'user', text }])
    setDraft('')
    setTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: priorTurns }),
      })
      const data = await res.json()
      if (!res.ok || !data.reply) throw new Error(data.error || 'Request failed')
      addBot(toPlainText(data.reply))
    } catch (err) {
      addBot(
        `${err.message || 'Something went wrong.'} You can still use the questions below, or email Mina at minarouma@gmail.com.`
      )
      setAskMode(false)
    } finally {
      setTyping(false)
    }
  }

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open chat">
          <i className="fa-solid fa-comment-dots"></i>
        </button>
      )}

      {open && (
        <div className="chat-window" role="dialog" aria-modal="false" aria-label="Mina's assistant">
          <div className="chat-header">
            <div className="chat-header-left">
              <span className="chat-avatar"><i className="fa-solid fa-wand-magic-sparkles"></i></span>
              <div>
                <div className="chat-title">Mina's Assistant</div>
                <div className="chat-online"><span className="dot"></span> online</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Minimize chat">
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((msg, i) => (
              <div className={`chat-message ${msg.who}`} key={i}>
                {msg.who === 'bot' && (
                  <span className="msg-avatar"><i className="fa-solid fa-wand-magic-sparkles"></i></span>
                )}
                <div className="msg-bubble">{msg.text}</div>
              </div>
            ))}

            {typing && (
              <div className="chat-message bot">
                <span className="msg-avatar"><i className="fa-solid fa-wand-magic-sparkles"></i></span>
                <div className="msg-bubble typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            {!typing && !askMode && (
              <div className="chat-options">
                {QUESTIONS.map((q) => (
                  <button className="chat-option" key={q.key} onClick={() => handleQuestion(q)}>
                    <i className={`fa-solid ${q.icon}`}></i> {q.text}
                  </button>
                ))}
                <button className="chat-option chat-option-ask" onClick={openAskMode}>
                  <i className="fa-solid fa-pen-to-square"></i> Ask other questions
                </button>
              </div>
            )}
          </div>

          {askMode && (
            <form className="chat-input-row" onSubmit={handleSend}>
              <button
                type="button"
                className="chat-back"
                onClick={() => setAskMode(false)}
                aria-label="Back to common questions"
                title="Back to common questions"
              >
                <i className="fa-solid fa-list-ul"></i>
              </button>
              <input
                ref={inputRef}
                className="chat-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={MAX_CHARS}
                placeholder="Ask about Mina…"
                aria-label="Ask a question about Mina"
                disabled={typing}
              />
              <button
                type="submit"
                className="chat-send"
                disabled={typing || !draft.trim()}
                aria-label="Send message"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}

export default ChatWidget
