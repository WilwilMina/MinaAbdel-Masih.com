/*
  TypingText — cycles through role strings with a type → pause → delete loop.
  Ported from the original initTyping() IIFE.
  Props:
    words (string[])  — the roles to cycle through (defaults to the original list)
  The blinking cursor is a CSS border on the .typing span (see TypingText.css).
*/
import { useEffect, useRef, useState } from 'react'
import './TypingText.css'

const DEFAULT_WORDS = ['Developer', 'Engineer', 'Problem Solver', 'Creator']
const TYPE_MS = 110
const DELETE_MS = 55
const PAUSE_AFTER_TYPE = 3000
const PAUSE_AFTER_DELETE = 400

function TypingText({ words = DEFAULT_WORDS }) {
  const [text, setText] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => {
    let wordIndex = 0
    let charIndex = 0
    let state = 'typing'

    function tick() {
      const word = words[wordIndex]

      if (state === 'typing') {
        charIndex++
        setText(word.slice(0, charIndex))
        if (charIndex === word.length) {
          timeoutRef.current = setTimeout(() => {
            state = 'deleting'
            tick()
          }, PAUSE_AFTER_TYPE)
          return
        }
        timeoutRef.current = setTimeout(tick, TYPE_MS)
        return
      }

      // deleting
      charIndex--
      setText(word.slice(0, charIndex))
      if (charIndex === 0) {
        wordIndex = (wordIndex + 1) % words.length
        state = 'typing'
        timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE)
        return
      }
      timeoutRef.current = setTimeout(tick, DELETE_MS)
    }

    tick()
    return () => clearTimeout(timeoutRef.current)
  }, [words])

  return <span className="typing">{text}</span>
}

export default TypingText
