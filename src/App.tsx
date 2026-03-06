import { useEffect, useState } from 'react'
import './App.css'
import { ROOMS, START_ROOM_ID, type Room } from './rooms'

const STORAGE_KEY = 'urban-explorer.currentRoom'

function getInitialRoomId(): string {
  if (typeof window === 'undefined') return START_ROOM_ID

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && ROOMS[saved]) {
    return saved
  }
  return START_ROOM_ID
}

function App() {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null)

  useEffect(() => {
    setCurrentRoomId(getInitialRoomId())
  }, [])

  useEffect(() => {
    if (!currentRoomId) return

    if (currentRoomId === START_ROOM_ID) {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, currentRoomId)
    }
  }, [currentRoomId])

  if (!currentRoomId) {
    return (
      <div className="app">
        <div className="game-shell">
          <main className="room-card">
            <p className="room-description">Entering the house…</p>
          </main>
        </div>
      </div>
    )
  }

  const room: Room | undefined = ROOMS[currentRoomId]

  if (!room) {
    return (
      <div className="app">
        <div className="game-shell">
          <main className="room-card">
            <h2 className="room-title">Lost in the Floorplan</h2>
            <p className="room-description">
              The path you followed doesn&apos;t seem to exist anymore. Try restarting your exploration.
            </p>
            <button
              type="button"
              className="primary-button"
              onClick={() => setCurrentRoomId(START_ROOM_ID)}
            >
              Return to the street
            </button>
          </main>
        </div>
      </div>
    )
  }

  const handleOptionClick = (targetRoomId: string) => {
    setCurrentRoomId(targetRoomId)
  }

  const handleRestart = () => {
    setCurrentRoomId(START_ROOM_ID)
  }

  return (
    <div className="app">
      <div className="game-shell">
        <header className="game-header">
          <div>
            <h1 className="game-title">Urban Explorer</h1>
            <p className="game-tagline">An abandoned house. One night. No turning back… mostly.</p>
          </div>
          <button type="button" className="secondary-button" onClick={handleRestart}>
            Restart from street
          </button>
        </header>

        <main className="room-card">
          <h2 className="room-title">{room.title}</h2>
          <p className="room-description">{room.description}</p>

          <div className="divider" />

          <div className="options">
            {room.options.map((option) => (
              <button
                key={option.id}
                type="button"
                className="option-button"
                onClick={() => handleOptionClick(option.targetRoomId)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </main>

        <footer className="game-footer">
          <span className="footer-text">Your current room is saved to this browser. Come back if you dare.</span>
        </footer>
      </div>
    </div>
  )
}

export default App
