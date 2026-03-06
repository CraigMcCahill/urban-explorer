export type ItemId = "headlamp" | "mask" | "spray" | "crowbar";

export type InventoryItem = {
  id: ItemId;
  name: string;
  description: string;
};

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "headlamp",
    name: "Headlamp",
    description: "See in the dark while keeping your hands free.",
  },
  {
    id: "mask",
    name: "Respirator mask",
    description: "Protection against asbestos dust and black mould.",
  },
  {
    id: "spray",
    name: "Aerosol can",
    description: "You are an artist as well and like to tag.",
  },
  {
    id: "crowbar",
    name: "Small crowbar",
    description: "For stubborn doors, windows, and last-resort defense.",
  },
];

export type RoomOption = {
  id: string;
  label: string;
  targetRoomId: string;
  requiredItems?: ItemId[];
};

export type Room = {
  id: string;
  title: string;
  description: string;
  options: RoomOption[];
};

export const START_ROOM_ID = "street-outside";

export const ROOMS: Record<string, Room> = {
  "street-outside": {
    id: "street-outside",
    title: "Rain-Soaked Street",
    description:
      "Midnight rain needles the cracked pavement as you stand before the only lit window on the block. The house looms over you, sagging and silent, its windows boarded except for one faint, flickering glow on the upper floor.",
    options: [
      {
        id: "approach-gate",
        label: "Step through the rusted front gate",
        targetRoomId: "front-porch",
      },
      {
        id: "circle-around",
        label: "Circle around the back alley",
        targetRoomId: "back-alley",
      },
      {
        id: "walk-away",
        label: "Turn your back on the house and walk away",
        targetRoomId: "ending-walk-away",
      },
    ],
  },
  "front-porch": {
    id: "front-porch",
    title: "Front Porch",
    description:
      "Wooden boards complain under your boots. The porch smells of wet rot and cold metal. A heavy door, its paint peeled to bare wood, waits ahead. To the side, a boarded window breathes a faint draft of stale air.",
    options: [
      {
        id: "enter-foyer",
        label: "Push the front door open",
        targetRoomId: "foyer",
      },
      {
        id: "peek-window",
        label: "Peer through the gaps in the boarded window",
        targetRoomId: "parlor-window",
      },
      {
        id: "retreat-street",
        label: "Step back to the street to reconsider",
        targetRoomId: "street-outside",
      },
    ],
  },
  "back-alley": {
    id: "back-alley",
    title: "Back Alley",
    description:
      "The alley squeezes between leaning brick walls slick with moss. Trash bags slump in the shadows, and a fire escape clings to the rear of the house like broken ribs. A cellar door lies half-buried under dead leaves.",
    options: [
      {
        id: "climb-fire-escape",
        label: "Climb the fire escape toward the lit window",
        targetRoomId: "upstairs-landing",
      },
      {
        id: "cellar-door",
        label: "Pull open the warped cellar door",
        targetRoomId: "cellar-stairs",
        requiredItems: ["crowbar"],
      },
      {
        id: "return-street",
        label: "Head back to the street",
        targetRoomId: "street-outside",
      },
    ],
  },
  foyer: {
    id: "foyer",
    title: "Foyer",
    description:
      "Dust motes float in the beam of your flashlight, revealing framed photographs with their faces scratched away. A staircase curls upward into darkness. To your left, a parlor door hangs ajar. To your right, a corridor disappears into black.",
    options: [
      {
        id: "upstairs-from-foyer",
        label: "Climb the staircase toward the upper floor",
        targetRoomId: "upstairs-landing",
      },
      {
        id: "enter-parlor",
        label: "Slip into the parlor",
        targetRoomId: "parlor",
      },
      {
        id: "enter-corridor",
        label: "Follow the corridor deeper into the house",
        targetRoomId: "shadow-corridor",
      },
    ],
  },
  parlor: {
    id: "parlor",
    title: "Dusty Parlor",
    description:
      "An antique sofa slumps beneath a sheet yellowed with age. A gramophone sits silent in the corner, its horn pointed accusingly at the door. The wallpaper peels in long curls, revealing claw-like gouges in the plaster.",
    options: [
      {
        id: "play-gramophone",
        label: "Brush off the dust and crank the gramophone",
        targetRoomId: "ending-gramophone",
      },
      {
        id: "back-to-foyer",
        label: "Leave the parlor and return to the foyer",
        targetRoomId: "foyer",
      },
    ],
  },
  "parlor-window": {
    id: "parlor-window",
    title: "Watching Through the Boards",
    description:
      "You press your eye to a narrow gap. Inside, shapes shift in the darkness that your flashlight cannot quite catch. For a moment, you see your own silhouette move independently of you across the far wall.",
    options: [
      {
        id: "panic-to-street",
        label: "Stumble back to the relative safety of the street",
        targetRoomId: "street-outside",
      },
      {
        id: "commit-enter-door",
        label: "Steady yourself and go through the front door instead",
        targetRoomId: "foyer",
      },
    ],
  },
  "shadow-corridor": {
    id: "shadow-corridor",
    title: "Shadowed Corridor",
    description:
      "The corridor narrows as if the house itself is exhaling around you. Doors line the walls, their handles icy to the touch. Somewhere ahead, water drips in a slow, patient rhythm.",
    options: [
      {
        id: "enter-kitchen",
        label: "Push into the room that smells faintly of stale cooking oil",
        targetRoomId: "kitchen",
      },
      {
        id: "find-cellar-stairs",
        label: "Follow the drip downward toward a hidden stairwell",
        targetRoomId: "cellar-stairs",
        requiredItems: ["headlamp"],
      },
      {
        id: "retreat-foyer",
        label: "Retreat to the relative openness of the foyer",
        targetRoomId: "foyer",
      },
    ],
  },
  kitchen: {
    id: "kitchen",
    title: "Abandoned Kitchen",
    description:
      "Rust-flecked knives hang from a magnetic strip above a stained counter. Every cabinet door is slightly open, as if someone left in a hurry and never finished searching. The refrigerator hums faintly though no power should be running here.",
    options: [
      {
        id: "open-fridge",
        label: "Open the humming refrigerator",
        targetRoomId: "ending-fridge",
      },
      {
        id: "back-to-corridor",
        label: "Slip back into the corridor",
        targetRoomId: "shadow-corridor",
      },
    ],
  },
  "cellar-stairs": {
    id: "cellar-stairs",
    title: "Cellar Stairs",
    description:
      "Your footsteps echo as you descend the narrow steps. The air grows colder, thick with the smell of damp stone and rust. At the bottom, a concrete floor stretches into darkness cut only by your beam.",
    options: [
      {
        id: "into-cellar",
        label: "Step off the last stair into the cellar",
        targetRoomId: "cellar",
      },
      {
        id: "back-upstairs",
        label: "Think better of it and climb back up",
        targetRoomId: "shadow-corridor",
      },
    ],
  },
  cellar: {
    id: "cellar",
    title: "Flooded Cellar",
    description:
      "A thin layer of water mirrors the ceiling, broken only by a trail of wet footprints leading in a circle. Shelves buckle under the weight of mildewed boxes. Chains hang from the rafters, swaying in a breeze you cannot feel.",
    options: [
      {
        id: "follow-footprints",
        label: "Follow the footprints, matching each step",
        targetRoomId: "ending-cellar-circle",
      },
      {
        id: "retreat-stairs",
        label: "Move carefully back to the stairs",
        targetRoomId: "cellar-stairs",
      },
    ],
  },
  "upstairs-landing": {
    id: "upstairs-landing",
    title: "Upstairs Landing",
    description:
      "The upstairs hallway tilts subtly, enough to make your balance feel unreliable. Doors line both sides; at the far end, the source of the faint glow leaks from beneath a half-closed door.",
    options: [
      {
        id: "enter-lit-room",
        label: "Approach the lit door at the end of the hall",
        targetRoomId: "lit-room",
      },
      {
        id: "random-bedroom",
        label: "Try the nearest bedroom door",
        targetRoomId: "bedroom",
      },
      {
        id: "down-to-foyer",
        label: "Descend back to the foyer",
        targetRoomId: "foyer",
      },
    ],
  },
  bedroom: {
    id: "bedroom",
    title: "Collapsed Bedroom",
    description:
      "The ceiling has partially caved in, letting in the wet night air. A mattress lies split open, its stuffing spilling like pale intestines. On the cracked mirror, someone has written a single word in the dust: WELCOME.",
    options: [
      {
        id: "touch-word",
        label: "Trace the word on the mirror with your fingertip",
        targetRoomId: "ending-mirror",
      },
      {
        id: "back-to-landing",
        label: "Leave the room and return to the landing",
        targetRoomId: "upstairs-landing",
      },
    ],
  },
  "lit-room": {
    id: "lit-room",
    title: "Lit Room",
    description:
      "Bare bulbs hang from exposed wires, buzzing weakly. In the center of the room stands a table covered in yellowing photographs of the house from decades ago. In every photo, a figure stands in the window where you are now.",
    options: [
      {
        id: "study-photos",
        label: "Examine the photographs closely",
        targetRoomId: "ending-photos",
      },
      {
        id: "escape-window",
        label: "Open the window and climb back out to the fire escape",
        targetRoomId: "back-alley",
      },
    ],
  },
  "ending-walk-away": {
    id: "ending-walk-away",
    title: "Ending: The House Keeps Its Secrets",
    description:
      "You walk away, letting the rain swallow the silhouette of the house behind you. Some doors, you decide, are better left closed. Somewhere behind you, a light in an upper window flickers and finally goes out.",
    options: [
      {
        id: "play-again-from-street",
        label: "On second thought… maybe just a quick look.",
        targetRoomId: "street-outside",
      },
    ],
  },
  "ending-gramophone": {
    id: "ending-gramophone",
    title: "Ending: Needle on the Groove",
    description:
      "The record begins to spin on its own. A warped lullaby crackles through the horn as the room darkens at the edges. When the music stops, the dust on the furniture has settled around a new shape in the sofa—one seated, listening forever.",
    options: [
      {
        id: "restart-from-street",
        label: "Wake with a start back on the rain-soaked street",
        targetRoomId: "street-outside",
      },
    ],
  },
  "ending-fridge": {
    id: "ending-fridge",
    title: "Ending: Something in the Fridge",
    description:
      "Cold light spills out, far too bright for a dead appliance. The shelves are empty except for a single jar containing something like a heart, beating softly. Your own chest answers in time, then in sync, then not at all.",
    options: [
      {
        id: "restart-after-fridge",
        label: "Gasp awake on the sidewalk outside the house",
        targetRoomId: "street-outside",
      },
    ],
  },
  "ending-cellar-circle": {
    id: "ending-cellar-circle",
    title: "Ending: Walking in Circles",
    description:
      "You match each footprint perfectly. Around and around you go, until you can no longer tell which prints were yours. When your flashlight finally dies, the last thing you see are fresh, wet steps leading toward you from the dark.",
    options: [
      {
        id: "restart-after-cellar",
        label: "You jolt awake at the top of the cellar stairs",
        targetRoomId: "street-outside",
      },
    ],
  },
  "ending-mirror": {
    id: "ending-mirror",
    title: "Ending: Welcome Home",
    description:
      "As your finger traces the final letter, your reflection smiles a fraction too wide. It reaches out from the glass, palm meeting yours. When you blink, you are inside the mirror, watching someone else step into the room.",
    options: [
      {
        id: "restart-after-mirror",
        label: "Slam your eyes shut and find yourself back on the street",
        targetRoomId: "street-outside",
      },
    ],
  },
  "ending-photos": {
    id: "ending-photos",
    title: "Ending: The House Remembers",
    description:
      "In every photograph, the figure in the window lifts a camera. The last photo is a blurry shot taken from the street, of someone standing where you were moments ago. When you lower the picture, the room around you matches the image exactly.",
    options: [
      {
        id: "restart-after-photos",
        label: "Drop the photo and bolt back to the street",
        targetRoomId: "street-outside foo",
      },
    ],
  },
};
