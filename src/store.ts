import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import {
  INVENTORY_ITEMS,
  ROOMS,
  START_ROOM_ID,
  type ItemId,
  type RoomOption,
} from "./rooms";

const ROOM_STORAGE_KEY = "urban-explorer.currentRoom";
const INVENTORY_STORAGE_KEY = "urban-explorer.inventory";
const ADVENTURE_ENDS_PHRASE = "Your adventure ends here.";

export const MAX_INVENTORY_ITEMS = 2;

export type GameState = {
  currentRoomId: string | null;
  inventory: ItemId[];
  hasChosenInventory: boolean;
  hasSeenIntro: boolean;
  isInventoryOpen: boolean;
  recentlyAcquiredItems: ItemId[];
};

export type GameActions = {
  hydrateFromStorage: () => void;
  toggleGearItem: (id: ItemId) => void;
  confirmInventory: () => void;
  continueFromIntro: () => void;
  restart: () => void;
  setCurrentRoomId: (id: string | null) => void;
  setInventoryOpen: (open: boolean) => void;
  chooseRoomOption: (option: RoomOption, hasRequiredItems: boolean) => void;
};

function parseStoredInventory(raw: string | null): ItemId[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) return [];
    const validIds = new Set(INVENTORY_ITEMS.map((item) => item.id));
    return parsed.filter((id): id is ItemId => validIds.has(id as ItemId));
  } catch {
    return [];
  }
}

function getInitialState(): GameState {
  if (typeof window === "undefined") {
    return {
      currentRoomId: START_ROOM_ID,
      inventory: [],
      hasChosenInventory: false,
      hasSeenIntro: false,
      isInventoryOpen: false,
      recentlyAcquiredItems: [],
    };
  }

  const storedRoomId = window.localStorage.getItem(ROOM_STORAGE_KEY);
  const storedInventoryRaw = window.localStorage.getItem(INVENTORY_STORAGE_KEY);
  const storedInventory = parseStoredInventory(storedInventoryRaw);
  const hasSavedProgress = storedInventory.length > 0;

  let currentRoomId: string | null = null;
  if (storedRoomId && ROOMS[storedRoomId]) {
    currentRoomId = storedRoomId;
  } else if (hasSavedProgress) {
    currentRoomId = START_ROOM_ID;
  }

  return {
    currentRoomId,
    inventory: storedInventory,
    hasChosenInventory: hasSavedProgress,
    hasSeenIntro: hasSavedProgress,
    isInventoryOpen: false,
    recentlyAcquiredItems: [],
  };
}

export const gameStore = createStore<GameState & GameActions>()((set, get) => ({
  ...getInitialState(),

  hydrateFromStorage: () => set(getInitialState()),

  toggleGearItem: (id) =>
    set((state) => {
      const exists = state.inventory.includes(id);
      if (exists) {
        return { inventory: state.inventory.filter((item) => item !== id) };
      }
      if (state.inventory.length >= MAX_INVENTORY_ITEMS) return state;
      return { inventory: [...state.inventory, id] };
    }),

  confirmInventory: () =>
    set({
      hasChosenInventory: true,
      currentRoomId: START_ROOM_ID,
    }),

  continueFromIntro: () => set({ hasSeenIntro: true }),

  restart: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ROOM_STORAGE_KEY);
      window.localStorage.removeItem(INVENTORY_STORAGE_KEY);
    }
    set({
      inventory: [],
      hasChosenInventory: false,
      hasSeenIntro: false,
      currentRoomId: null,
      isInventoryOpen: false,
      recentlyAcquiredItems: [],
    });
  },

  setCurrentRoomId: (id) => set({ currentRoomId: id }),

  setInventoryOpen: (open) => set({ isInventoryOpen: open }),

  chooseRoomOption: (option, hasRequiredItems) => {
    if (!hasRequiredItems) return;

    const state = get();
    const currentRoom = state.currentRoomId ? ROOMS[state.currentRoomId] : null;
    const shouldRepackGear =
      option.targetRoomId === START_ROOM_ID &&
      Boolean(currentRoom?.description.includes(ADVENTURE_ENDS_PHRASE));

    if (shouldRepackGear) {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(ROOM_STORAGE_KEY);
        window.localStorage.removeItem(INVENTORY_STORAGE_KEY);
      }
      set({
        inventory: [],
        hasChosenInventory: false,
        hasSeenIntro: true,
        currentRoomId: null,
        isInventoryOpen: false,
        recentlyAcquiredItems: [],
      });
      return;
    }

    set((state) => {
      const nextInventory = [...state.inventory];
      const newly: ItemId[] = [];

      if (option.grantedItems?.length) {
        for (const id of option.grantedItems) {
          if (!nextInventory.includes(id)) {
            nextInventory.push(id);
            newly.push(id);
          }
        }
      }

      return {
        inventory: nextInventory,
        currentRoomId: option.targetRoomId,
        recentlyAcquiredItems: newly,
      };
    });
  },
}));

gameStore.subscribe((state) => {
  if (typeof window === "undefined") return;
  if (state.hasChosenInventory) {
    window.localStorage.setItem(
      INVENTORY_STORAGE_KEY,
      JSON.stringify(state.inventory),
    );
  }
  if (!state.currentRoomId || !state.hasChosenInventory) return;
  if (state.currentRoomId === START_ROOM_ID) {
    window.localStorage.removeItem(ROOM_STORAGE_KEY);
  } else {
    window.localStorage.setItem(ROOM_STORAGE_KEY, state.currentRoomId);
  }
});

export function useGameStore<T>(selector: (state: GameState & GameActions) => T): T {
  return useStore(gameStore, selector);
}
