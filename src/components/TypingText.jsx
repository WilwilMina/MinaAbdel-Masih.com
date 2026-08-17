/*
  TypingText — cycles through role strings with a type → pause → delete loop.
  Ported from the original initTyping() IIFE.
  Props:
    words (string[])  — the roles to cycle through (defaults to the original list)
  The blinking cursor is a CSS border on the .typing span (see TypingText.css).

  The animated span is decorative: it's aria-hidden and paired with an sr-only
  copy of the full list. A screen reader pointed at a span that mutates every
  110ms announces garbage, and Google built a search snippet out of this
  element caught mid-word ("I'm a Enginee Computer Science student..."). State
  therefore starts on the first complete word rather than "", so the DOM holds
  a real word before the loop begins instead of an empty string.
*/
import { useEffect, useRef, useState } from 'react'
import './TypingText.css'

const DEFAULT_WORDS = ['Developer', 'Engineer', 'Problem Solver', 'Creator']
const TYPE_MS = 110
const DELETE_MS = 55
const PAUSE_AFTER_TYPE = 3000
const PAUSE_AFTER_DELETE = 400

function TypingText({ words = DEFAULT_WORDS }) {
  const [text, setText] = useState(words[0])
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Resume from the seeded word rather than retyping it from one character.
    let wordIndex = 0
    let charIndex = words[0].length
    let state = 'deleting'

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

    // Hold the seeded word first, matching the pause every other word gets.
    timeoutRef.current = setTimeout(tick, PAUSE_AFTER_TYPE)
    return () => clearTimeout(timeoutRef.current)
  }, [words])

  return (
    <>
      <span className="sr-only">{words.join(', ')}</span>
      <span className="typing" aria-hidden="true">{text}</span>
    </>
  )
}

export default TypingText
