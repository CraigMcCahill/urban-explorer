import { useEffect, useState } from "react";
import "./App.css";
import {
  INVENTORY_ITEMS,
  ROOMS,
  START_ROOM_ID,
  type ItemId,
  type Room,
} from "./rooms";

const ROOM_STORAGE_KEY = "urban-explorer.currentRoom";
const INVENTORY_STORAGE_KEY = "urban-explorer.inventory";
const MAX_INVENTORY_ITEMS = 2;

function App() {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [inventory, setInventory] = useState<ItemId[]>([]);
  const [hasChosenInventory, setHasChosenInventory] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setCurrentRoomId(START_ROOM_ID);
      return;
    }

    const storedRoomId = window.localStorage.getItem(ROOM_STORAGE_KEY);
    const storedInventoryRaw =
      window.localStorage.getItem(INVENTORY_STORAGE_KEY);

    let storedInventory: ItemId[] = [];
    if (storedInventoryRaw) {
      try {
        const parsed = JSON.parse(storedInventoryRaw) as string[];
        if (Array.isArray(parsed)) {
          storedInventory = parsed.filter((id): id is ItemId =>
            ["headlamp", "mask", "spray", "crowbar"].includes(id),
          );
        }
      } catch {
        // ignore parse errors and start fresh
      }
    }

    if (storedInventory.length > 0) {
      setInventory(storedInventory);
      setHasChosenInventory(true);
    }

    if (storedRoomId && ROOMS[storedRoomId]) {
      setCurrentRoomId(storedRoomId);
    } else if (storedInventory.length > 0) {
      setCurrentRoomId(START_ROOM_ID);
    } else {
      setCurrentRoomId(null);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hasChosenInventory) return;

    window.localStorage.setItem(
      INVENTORY_STORAGE_KEY,
      JSON.stringify(inventory),
    );
  }, [inventory, hasChosenInventory]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!currentRoomId || !hasChosenInventory) return;

    if (currentRoomId === START_ROOM_ID) {
      window.localStorage.removeItem(ROOM_STORAGE_KEY);
    } else {
      window.localStorage.setItem(ROOM_STORAGE_KEY, currentRoomId);
    }
  }, [currentRoomId, hasChosenInventory]);

  const handleToggleItem = (id: ItemId) => {
    setInventory((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      }

      if (prev.length >= MAX_INVENTORY_ITEMS) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const handleConfirmInventory = () => {
    if (inventory.length !== MAX_INVENTORY_ITEMS) return;

    setHasChosenInventory(true);
    setCurrentRoomId(START_ROOM_ID);
  };

  const handleRestart = () => {
    setInventory([]);
    setHasChosenInventory(false);
    setCurrentRoomId(null);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ROOM_STORAGE_KEY);
      window.localStorage.removeItem(INVENTORY_STORAGE_KEY);
    }
  };

  if (!hasChosenInventory) {
    const remaining = MAX_INVENTORY_ITEMS - inventory.length;

    return (
      <div className="app">
        <div className="game-shell">
          <header className="game-header">
            <div>
              <h1 className="game-title">Urban Explorer</h1>
              <p className="game-tagline">
                You have your phone and a backpack. What else will you take?
              </p>
            </div>
          </header>

          <main className="room-card inventory-card">
            <h2 className="room-title">Pack Your Gear</h2>
            <p className="room-description">
              Choose {MAX_INVENTORY_ITEMS} items to carry with you into the
              house. What you bring will change which paths are open to you.
            </p>

            <div className="inventory-grid">
              {INVENTORY_ITEMS.map((item) => {
                const selected = inventory.includes(item.id);
                const disabled =
                  !selected && inventory.length >= MAX_INVENTORY_ITEMS;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`inventory-item${
                      selected ? " inventory-item--selected" : ""
                    }`}
                    onClick={() => handleToggleItem(item.id)}
                    disabled={disabled}
                  >
                    <div className="inventory-item-name">{item.name}</div>
                    <div className="inventory-item-description">
                      {item.description}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="inventory-footer-row">
              <span className="inventory-hint">
                {remaining > 0
                  ? `Choose ${remaining} more item${
                      remaining === 1 ? "" : "s"
                    }.`
                  : "You’re ready to step into the dark."}
              </span>
              <button
                type="button"
                className="primary-button"
                onClick={handleConfirmInventory}
                disabled={inventory.length !== MAX_INVENTORY_ITEMS}
              >
                Enter the house
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!currentRoomId) {
    return (
      <div className="app">
        <div className="game-shell">
          <main className="room-card">
            <p className="room-description">Entering the house…</p>
          </main>
        </div>
      </div>
    );
  }

  const room: Room | undefined = ROOMS[currentRoomId];

  if (!room) {
    return (
      <div className="app">
        <div className="game-shell">
          <main className="room-card">
            <h2 className="room-title">Lost in the Floorplan</h2>
            <p className="room-description">
              The path you followed doesn&apos;t seem to exist anymore. Try
              restarting your exploration.
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
    );
  }

  return (
    <div className="app">
      <div className="game-shell">
        <header className="game-header">
          <div>
            <h1 className="game-title">Urban Explorer</h1>
            <p className="game-tagline">
              An abandoned house. One night. No turning back… mostly.
            </p>
          </div>
          <button
            type="button"
            className="secondary-button"
            onClick={handleRestart}
          >
            Restart & repack gear
          </button>
        </header>

        <main className="room-card">
          <h2 className="room-title">{room.title}</h2>
          <p className="room-description">{room.description}</p>

          <div className="divider" />

          <div className="options">
            {room.options.map((option) => {
              const hasRequiredItems =
                !option.requiredItems ||
                option.requiredItems.every((id) => inventory.includes(id));

              const requirementLabel =
                option.requiredItems && option.requiredItems.length > 0
                  ? `Requires: ${option.requiredItems
                      .map(
                        (id) =>
                          INVENTORY_ITEMS.find((it) => it.id === id)?.name ??
                          id,
                      )
                      .join(", ")}`
                  : null;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`option-button${
                    hasRequiredItems ? "" : " option-button--disabled"
                  }`}
                  onClick={() =>
                    hasRequiredItems && setCurrentRoomId(option.targetRoomId)
                  }
                  disabled={!hasRequiredItems}
                >
                  <span className="option-main-label">{option.label}</span>
                  {requirementLabel && (
                    <span className="option-requirement">
                      {requirementLabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </main>

        <footer className="game-footer">
          <span className="footer-text">
            Your current room and gear are saved to this browser. Come back if
            you dare.
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;

