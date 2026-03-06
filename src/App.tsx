import "./App.css";
import {
  INVENTORY_ITEMS,
  ROOMS,
  START_ROOM_ID,
  type Room,
} from "./rooms";
import {
  MAX_INVENTORY_ITEMS,
  useGameStore,
} from "./store";

function App() {
  const hasSeenIntro = useGameStore((s) => s.hasSeenIntro);
  const hasChosenInventory = useGameStore((s) => s.hasChosenInventory);
  const currentRoomId = useGameStore((s) => s.currentRoomId);
  const inventory = useGameStore((s) => s.inventory);
  const isInventoryOpen = useGameStore((s) => s.isInventoryOpen);
  const recentlyAcquiredItems = useGameStore((s) => s.recentlyAcquiredItems);

  const continueFromIntro = useGameStore((s) => s.continueFromIntro);
  const toggleGearItem = useGameStore((s) => s.toggleGearItem);
  const confirmInventory = useGameStore((s) => s.confirmInventory);
  const restart = useGameStore((s) => s.restart);
  const setCurrentRoomId = useGameStore((s) => s.setCurrentRoomId);
  const setInventoryOpen = useGameStore((s) => s.setInventoryOpen);
  const chooseRoomOption = useGameStore((s) => s.chooseRoomOption);

  if (!hasSeenIntro) {
    return (
      <div className="app">
        <div className="game-shell">
          <header className="game-header">
            <div>
              <h1 className="game-title">Urban Explorer</h1>
              <p className="game-tagline">
                Willow House, East London. Tonight, the camera comes with you.
              </p>
            </div>
          </header>

          <main className="room-card intro-card">
            <h2 className="room-title">Before You Enter</h2>
            <p className="room-description">
              You are an urban explorer – breaking into abandoned buildings to
              film and document the interior. You've been chased by security
              guards, almost impaled falling onto railings, and had a knife
              pulled on you by a drug addict. Your channel has thousands of
              likes and subscribers, but you've never seen a ghost and so you
              keep adventuring.
            </p>
            <p className="room-description">
              Recently you've heard a story about an abandoned old mansion in
              East London. Built by Sir Edward Dallow in the 18th century,
              Willow House originally stood in its own grounds before being
              swallowed a century later by the Victorian urban sprawl. The house
              always had something of a sinister reputation – Sir Edward himself
              was a libertine of the very worst kind and fled the county after
              rumours of the murder of a serving girl.
            </p>
            <p className="room-description">
              In the nineteenth century the house was subdivided into slum
              dwellings and became a place of vice and misery. By the twentieth
              century the building had been bought by the council and was used
              as an orphanage. The establishment closed in the nineteen
              nineties, amongst accusations of abuse with victims talking of a
              hidden room underneath the house. A police investigation found
              nothing to substantiate these claims but the building has remained
              boarded up and abandoned since.
            </p>
            <p className="room-description">
              Tonight you plan to tool up and enter Willow House under the cover
              of darkness.
            </p>

            <div className="inventory-footer-row">
              <span className="inventory-hint">
                You have your phone and a backpack. Time to choose the rest of
                your gear.
              </span>
              <button
                type="button"
                className="primary-button"
                onClick={continueFromIntro}
              >
                Continue
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
              {INVENTORY_ITEMS.filter((item) => item.canStartWith).map((item) => {
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
                    onClick={() => toggleGearItem(item.id)}
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
                  : "You're ready to step into the dark."}
              </span>
              <button
                type="button"
                className="primary-button"
                onClick={confirmInventory}
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
          <div className="header-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setInventoryOpen(true)}
            >
              View gear
            </button>
            <button
              type="button"
              className="secondary-button secondary-button--danger"
              onClick={restart}
            >
              Restart & repack gear
            </button>
          </div>
        </header>

        <main className="room-card">
          <h2 className="room-title">{room.title}</h2>
          <p className="room-description">{room.description}</p>

          <div className="divider" />

          {recentlyAcquiredItems.length > 0 && (
            <div className="loot-banner">
              <span className="loot-label">You pick up:</span>
              <span className="loot-items">
                {recentlyAcquiredItems
                  .map(
                    (id) =>
                      INVENTORY_ITEMS.find((item) => item.id === id)?.name ??
                      id,
                  )
                  .join(", ")}
              </span>
            </div>
          )}

          <div className="options">
            {room.options.map((option) => {
              const hasRequiredItems =
                !option.requiredItems ||
                option.requiredItems.every((id) => inventory.includes(id));

              const alreadyHasGrantedItems =
                option.grantedItems &&
                option.grantedItems.length > 0 &&
                option.grantedItems.every((id) => inventory.includes(id));

              if (
                alreadyHasGrantedItems &&
                option.grantedItems &&
                option.targetRoomId === room.id
              ) {
                return null;
              }

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
                  onClick={() => chooseRoomOption(option, hasRequiredItems)}
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

        {isInventoryOpen && (
          <div
            className="inventory-modal-backdrop"
            onClick={() => setInventoryOpen(false)}
          >
            <div
              className="inventory-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Current gear"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="inventory-modal-header">
                <div>
                  <h2 className="inventory-modal-title">Current gear</h2>
                  <p className="inventory-modal-subtitle">
                    Phone and backpack are always with you. The rest is what
                    you&apos;ve chosen and found.
                  </p>
                </div>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setInventoryOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="inventory-modal-body">
                {inventory.length === 0 ? (
                  <p className="inventory-empty">
                    You&apos;re traveling light. Some paths may be harder to
                    take.
                  </p>
                ) : (
                  <ul className="inventory-list">
                    {inventory.map((id) => {
                      const item = INVENTORY_ITEMS.find(
                        (entry) => entry.id === id,
                      );
                      if (!item) return null;

                      return (
                        <li key={id} className="inventory-list-item">
                          <div className="inventory-list-pill">
                            <span className="inventory-list-name">
                              {item.name}
                            </span>
                            <span className="inventory-list-description">
                              {item.description}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
