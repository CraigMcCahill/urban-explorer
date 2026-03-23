export type ItemId =
  | "headlamp"
  | "mask"
  | "spray"
  | "crowbar"
  | "iron-key"
  | "silver-crucifix";

export type InventoryItem = {
  id: ItemId;
  name: string;
  description: string;
  canStartWith: boolean;
};

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "headlamp",
    name: "Headlamp",
    description: "See in the dark while keeping your hands free.",
    canStartWith: true,
  },
  {
    id: "mask",
    name: "Respirator mask",
    description: "Protection against asbestos dust and black mould.",
    canStartWith: true,
  },
  {
    id: "spray",
    name: "Aerosol can",
    description: "You are an artist as well.",
    canStartWith: true,
  },
  {
    id: "crowbar",
    name: "Small crowbar",
    description: "For stubborn doors, windows, and last-resort defense.",
    canStartWith: true,
  },
  {
    id: "iron-key",
    name: "Iron key",
    description: "Cold, old, and too heavy to be for anything friendly.",
    canStartWith: false,
  },
  {
    id: "silver-crucifix",
    name: "Silver crucifix",
    description:
      "A cold silver holy symbol. It feels like it watches you back.",
    canStartWith: false,
  },
];

export type RoomOption = {
  id: string;
  label: string;
  targetRoomId: string;
  requiredItems?: ItemId[];
  grantedItems?: ItemId[];
};

export type Room = {
  id: string;
  title: string;
  description: string;
  options: RoomOption[];
};

export const START_ROOM_ID = "front-porch";

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
      "You climb over the graffiti covered hoardings and drop down into the weeds; your boots crunch onto broken glass. Willow House looms over you, its colonnaded facade covered with creeping ivy. A wan light shines from the garret on the topmost floor, but all the other windows are firmly boarded up.\n\nTo your surprise, the front door hangs open, revealing the gloomy interior. An overgrown path leads around the side of the house to the left.",
    options: [
      {
        id: "enter-house-via-door",
        label: "Step through the front door - hallway",
        targetRoomId: "hallway",
      },
      {
        id: "take-path-around-house",
        label: "Take the path around the house - back-garden",
        targetRoomId: "back-garden",
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
    title: "Kitchen",
    description:
      "You step through the doorway into a disordered, filthy kitchen area. A tap drips into a blocked sink full of grey water, and a bloated rat scurries from inside one of the filthy pots.",
    options: [
      {
        id: "take-north-door-to-garden",
        label: "Take the door to the north into the garden - back-garden",
        targetRoomId: "back-garden",
        requiredItems: ["crowbar"],
      },
      {
        id: "take-east-door-to-dining",
        label: "Take the door east - dining-room",
        targetRoomId: "dining-room",
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
        id: "iron-door",
        label: "Try the heavy iron door with the unfamiliar keyhole",
        targetRoomId: "locked-study",
        requiredItems: ["iron-key"],
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
  attic: {
    id: "attic",
    title: "Attic",
    description:
      "The staircase creaks under your boots as you climb into a small attic room. On a small table flickers a candle, beside which lies a yellowed parchment and an iron key.",
    options: [
      {
        id: "take-iron-key",
        label: "Take the iron key - iron-key",
        targetRoomId: "attic",
        grantedItems: ["iron-key"],
      },
      {
        id: "read-parchment",
        label: "Read the parchment - attic-parchment",
        targetRoomId: "attic-parchment",
      },
      {
        id: "head-down-stairs",
        label: "Head down the stairs - attic-staircase",
        targetRoomId: "attic-staircase",
      },
    ],
  },
  "attic-parchment": {
    id: "attic-parchment",
    title: "Attic Parchment",
    description:
      'By the candle light you read these words: "O sun, to tell thee how I hate thy beams, That bring to my remembrance from what state I fell; how glorious once above thy sphere; Till pride and worse ambition threw me down,"',
    options: [
      {
        id: "back-to-attic",
        label: "Return to the attic - attic",
        targetRoomId: "attic",
      },
    ],
  },
  "attic-staircase": {
    id: "attic-staircase",
    title: "Attic Staircase",
    description:
      "Turning the corner, you are confronted with a narrow staircase leading upwards into the attic; you can see a dim flickering light above.",
    options: [
      {
        id: "climb-to-attic",
        label: "Climb the staircase - attic",
        targetRoomId: "attic",
      },
      {
        id: "back-off-to-east-landing",
        label: "Back off into the landing - east-landing",
        targetRoomId: "east-landing",
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
  "locked-study": {
    id: "locked-study",
    title: "Locked Study",
    description:
      "The iron key turns with a reluctant clunk. Inside, a narrow study waits, its desk buried in maps of the city with certain buildings angrily circled. A single chair faces the window, as if expecting you.",
    options: [
      {
        id: "leave-study",
        label: "Back out quietly and return to the landing",
        targetRoomId: "upstairs-landing",
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
        targetRoomId: "street-outside",
      },
    ],
  },
  "back-garden": {
    id: "back-garden",
    title: "Back Garden",
    description:
      "You trample through the stinging nettles between the fence and the wall of the house, reaching the moonlit, rubbish-strewn back garden. A startled fox scampers into the undergrowth.\n\nStepping over a fallen statue, you find a back door, but it is locked. If you brought the crowbar, you could open it. Or else you will have to return to the front.",
    options: [
      {
        id: "prize-backdoor",
        label: "Prise open the backdoor - kitchen",
        targetRoomId: "kitchen",
        requiredItems: ["crowbar"],
      },
      {
        id: "return-to-front",
        label: "Return to the front - front-porch",
        targetRoomId: "front-porch",
      },
    ],
  },
  hallway: {
    id: "hallway",
    title: "Hallway",
    description:
      "Stepping into the shadowy hallway you are confronted with a staircase sweeping up to a balcony above. There are closed doors to your left and right and the hallway continues into darkness.\n\nFor a moment you imagine you can see a figure standing at the balustrade looking down at you, but then it is gone; perhaps a trick of the light?",
    options: [
      {
        id: "mount-stairs",
        label: "Mount the stairs - balcony",
        targetRoomId: "balcony",
      },
      {
        id: "take-west-door",
        label: "Take the west door - parlour",
        targetRoomId: "parlour",
      },
      {
        id: "open-east-door",
        label: "Open the east door - common-room",
        targetRoomId: "common-room",
      },
      {
        id: "under-balcony",
        label: "Move under the balcony north into the hall - deeper-hallway",
        targetRoomId: "deeper-hallway",
      },
    ],
  },
  balcony: {
    id: "balcony",
    title: "Balcony",
    description:
      "Climbing the stairs you reach the balcony. Landings lead away from the balcony east and west; the stairs behind you descend back to the hallway. To the east you can faintly hear some music playing.",
    options: [
      {
        id: "music-east",
        label: "Seek the source of the music to the east - east-landing",
        targetRoomId: "east-landing",
      },
      {
        id: "investigate-west",
        label: "Investigate to the west - west-landing",
        targetRoomId: "west-landing",
      },
      {
        id: "back-downstairs",
        label: "Go back down the stairs - hallway",
        targetRoomId: "hallway",
      },
    ],
  },
  parlour: {
    id: "parlour",
    title: "Parlour",
    description:
      "The door creaks open revealing a parlour decorated with a faded mural of children at play. As the beam of your torch moves over the walls you notice that faces of the figures have been defaced.\n\nThere is a foul scent of decay emanating from a door in this room to the north.",
    options: [
      {
        id: "north-to-dining",
        label:
          "Open the door to the north and find the source of the stench - dining-room",
        targetRoomId: "dining-room",
      },
      {
        id: "back-to-hallway",
        label: "Retreat to the hallway - hallway",
        targetRoomId: "hallway",
      },
    ],
  },
  "dining-room": {
    id: "dining-room",
    title: "Dining Room",
    description:
      'Shining your torch into the room reveals a macabre sight. In the centre of the room stands a filthy dining table upon which lies a half-decayed cadaver of what appears to have been a dog amongst smeared and broken plates.\n\nGetting closer you spot a mouldering collar; confirm your suspicions the tag reads "Max". A door hangs open to the west, another to the south.',
    options: [
      {
        id: "open-door-to-kitchen",
        label: "Go through the open door - kitchen",
        targetRoomId: "kitchen",
      },
      {
        id: "go-south-to-parlour",
        label: "Go south - parlour",
        targetRoomId: "parlour",
      },
    ],
  },
  "deeper-hallway": {
    id: "deeper-hallway",
    title: "Deeper Hallway",
    description:
      'The hallway extends deeper into the gloom. Upon one wall someone has scrawled "Never did I depart" in what looks like blood.\n\nThere are doors to east and west. The eastward door is bolted with a padlock; you will need a crowbar to open it.',
    options: [
      {
        id: "go-south",
        label: "Go south down the hallway - hallway",
        targetRoomId: "hallway",
      },
      {
        id: "leave-tag",
        label: "Leave your tag on the wall - leave-tag",
        targetRoomId: "leave-tag",
        requiredItems: ["spray"],
      },
      {
        id: "east-door-to-cell",
        label: "Prise the door to the east - cell",
        targetRoomId: "cell",
        requiredItems: ["crowbar"],
      },
      {
        id: "west-door-to-storeroom",
        label: "Go through the west door - storeroom",
        targetRoomId: "storeroom",
      },
    ],
  },
  "leave-tag": {
    id: "leave-tag",
    title: "Left Your Tag",
    description:
      "You spray your name over the wall, photographing it with the existing words.",
    options: [
      {
        id: "back-to-deeper-hallway",
        label: "Back in the hallway - deeper-hallway",
        targetRoomId: "deeper-hallway",
      },
    ],
  },
  "common-room": {
    id: "common-room",
    title: "Common Room",
    description:
      'The door creaks open revealing a room filled with broken and mildewed armchairs and sofa. Heavy curtains cover the windows. The smell of damp hangs in the room.\n\nThere is a door to the north marked "Library".',
    options: [
      {
        id: "go-to-library",
        label: "Go north into the Library - library",
        targetRoomId: "library",
      },
      {
        id: "back-to-hallway",
        label: "Retreat to the hall - hallway",
        targetRoomId: "hallway",
      },
    ],
  },
  library: {
    id: "library",
    title: "Library",
    description:
      "A pile of ripped books is heaped in the centre of this room amongst overturned chairs. In the ceiling there is a gaping hole above; perhaps if you pushed some furniture together you could climb up through the hole.\n\nThere is another door to the north.",
    options: [
      {
        id: "search-library",
        label: "Search the library - search-library",
        targetRoomId: "search-library",
      },
      {
        id: "back-to-common-room",
        label: "Return to the common room - common-room",
        targetRoomId: "common-room",
      },
      {
        id: "climb-through-hole",
        label: "Climb up through the hole - bedroom-with-hole",
        targetRoomId: "bedroom-with-hole",
      },
      {
        id: "go-north-to-study",
        label: "Go north - study",
        targetRoomId: "study",
      },
    ],
  },
  "search-library": {
    id: "search-library",
    title: "Searched Library",
    description:
      'Most of the books are textbooks from the seventies and eighties and of little interest, but prising one of the shelves from the wall reveals a hidden space.\n\nThere you find a small beautifully printed antique folio entitled "Cultes des Goules". It is a slim, elegant volume and although you cannot read the French text you sense there is something forbidden and depraved contained within its pages.',
    options: [
      {
        id: "back-to-common-room",
        label: "Return to the common room - common-room",
        targetRoomId: "common-room",
      },
      {
        id: "go-north-to-study",
        label: "Go north - study",
        targetRoomId: "study",
      },
      {
        id: "climb-through-hole",
        label: "Climb up through the hole - bedroom-with-hole",
        targetRoomId: "bedroom-with-hole",
      },
    ],
  },
  study: {
    id: "study",
    title: "Study",
    description:
      "Inside this small chamber sits an upturned old desk, its drawers yanked out. In one corner is an elaborately carved fireplace.",
    options: [
      {
        id: "search-study",
        label: "Search the study - search-study",
        targetRoomId: "search-study",
      },
      {
        id: "back-to-library",
        label: "Go back into the library - library",
        targetRoomId: "library",
      },
    ],
  },
  "search-study": {
    id: "search-study",
    title: "Searched Study",
    description:
      "The desk is an ugly modern institutional thing, broken and containing nothing except old stationary. But the fireplace is a shocking thing of macabre beauty carved into the shapes of intertwining coupling skeletons and vine leaves.\n\nAs you search the chimney you discover a lever; pulling at it opens a trap door. Stairs descend down into an inky blackness below.",
    options: [
      {
        id: "back-to-library",
        label: "Go back into the library - library",
        targetRoomId: "library",
      },
      {
        id: "down-to-secret-tunnel",
        label: "Follow the steps into down into the basement - secret-tunnel",
        targetRoomId: "secret-tunnel",
      },
    ],
  },
  cell: {
    id: "cell",
    title: "Cell",
    description:
      "Finally, stubborn door breaks open, revealing a small windowless chamber. A filthy mattress lies on the bare floor. Was someone kept imprisoned here?",
    options: [
      {
        id: "back-to-deeper-hallway",
        label: "Return to the hall with a shudder - deeper-hallway",
        targetRoomId: "deeper-hallway",
      },
    ],
  },
  storeroom: {
    id: "storeroom",
    title: "Storeroom",
    description:
      "The door opens to a room filled empty, save for a bucket and mop. In the westerly wall the sound of dripping can be heard from beyond a blackened door.",
    options: [
      {
        id: "back-to-deeper-hallway",
        label: "Return to the hall - deeper-hallway",
        targetRoomId: "deeper-hallway",
      },
      {
        id: "open-to-mould-room",
        label: "Open the door to the west - mould-room",
        targetRoomId: "mould-room",
      },
    ],
  },
  "mould-room": {
    id: "mould-room",
    title: "Black Mould Room",
    description:
      "The door is stiff and only opens with a hard shove. But as you force your way in you are engulfed in a cloud of black mould.\n\nAre you wearing a respirator mask? If you are wearing your respirator, you congratulate yourself on your preparedness and step back into the hallway.",
    options: [
      {
        id: "escape-with-respirator",
        label: "Escape to the hallway - deeper-hallway",
        targetRoomId: "deeper-hallway",
        requiredItems: ["mask"],
      },
      {
        id: "escape-without-respirator",
        label: "Try to escape without a respirator - death-in-the-mould",
        targetRoomId: "death-in-the-mould",
      },
    ],
  },
  "death-in-the-mould": {
    id: "death-in-the-mould",
    title: "Death in the Black Mould",
    description:
      "Without a respirator, the mould gets into your eyes and lungs, blinding you and making you choke. You drop to your knees, struggling to breathe, and fail to notice the shadowy presence stalking you.\n\nCold hands close on your neck. Your adventure ends here.",
    options: [
      {
        id: "return-to-front-porch",
        label: "Return to the start - front-porch",
        targetRoomId: "front-porch",
      },
    ],
  },
  "west-landing": {
    id: "west-landing",
    title: "West Landing",
    description:
      "Heading into the darkness west there is a door to the north and another to the west; the corridor turns south.",
    options: [
      {
        id: "open-north-to-spare-room",
        label: "Open the door to North - spare-room",
        targetRoomId: "spare-room",
      },
      {
        id: "open-west-to-mirror-room",
        label: "Open the door to the West - mirror-room",
        targetRoomId: "mirror-room",
      },
      {
        id: "follow-landing-south",
        label: "Follow the landing south - west-landing-2",
        targetRoomId: "west-landing-2",
      },
      {
        id: "back-to-balcony",
        label: "Head back east to the balcony - balcony",
        targetRoomId: "balcony",
      },
    ],
  },
  "spare-room": {
    id: "spare-room",
    title: "Spare Room",
    description:
      "Water drips from the ceiling of this room; the bare floorboards look rotted and unsafe. There seems to be nothing of interest here - best to keep back.",
    options: [
      {
        id: "return-to-west-landing",
        label: "Return to the landing - west-landing",
        targetRoomId: "west-landing",
      },
    ],
  },
  "mirror-room": {
    id: "mirror-room",
    title: "Mirror Room",
    description:
      "This room is bare, save a full-length broken mirror in the centre of the room.",
    options: [
      {
        id: "search-mirror-room",
        label: "Search the room - search-mirror-room",
        targetRoomId: "search-mirror-room",
      },
      {
        id: "return-to-west-landing",
        label: "Return to the landing - west-landing",
        targetRoomId: "west-landing",
      },
    ],
  },
  "search-mirror-room": {
    id: "search-mirror-room",
    title: "Searched Mirror Room",
    description:
      "You notice a loose floorboard, but reaching inside you slice the palm of your hand open with a piece of broken mirror. Fresh red blood flows from your hand as you gasp with pain.\n\nAs gasp with the shock, you hear somewhere deep within the house a faint, cruel laugh.",
    options: [
      {
        id: "return-to-west-landing",
        label: "Return to the landing - west-landing",
        targetRoomId: "west-landing",
      },
    ],
  },
  "west-landing-2": {
    id: "west-landing-2",
    title: "West Landing 2",
    description:
      "The corridor turns sharply west with two closed doors to the south. From the door on the left, you can hear a child gently sobbing.",
    options: [
      {
        id: "help-the-child",
        label: "Open the left door to help the child - nursery",
        targetRoomId: "nursery",
      },
      {
        id: "open-crucifix-door",
        label: "Open the door to the right - crucifix-room",
        targetRoomId: "crucifix-room",
      },
      {
        id: "back-to-stairs",
        label: "Head back towards the stairs - west-landing",
        targetRoomId: "west-landing",
      },
    ],
  },
  "west-landing-2-no-crying": {
    id: "west-landing-2-no-crying",
    title: "West Landing 2 (No Crying)",
    description:
      "You are relieved to be back on the landing, you have no desire to go back into that room.",
    options: [
      {
        id: "open-crucifix-door",
        label: "Open the door to the right - crucifix-room",
        targetRoomId: "crucifix-room",
      },
      {
        id: "back-to-stairs",
        label: "Head back towards the stairs - west-landing",
        targetRoomId: "west-landing",
      },
    ],
  },
  nursery: {
    id: "nursery",
    title: "Nursery",
    description:
      "As you pull the door open the sobbing stops. The room is completely bare, but you are immediately filled with an uneasy feeling. The air here is icy cold, making you shiver and you can't shake the feeling something terrible happened in this room.",
    options: [
      {
        id: "back-to-landing",
        label: "Return to the landing - west-landing-2-no-crying",
        targetRoomId: "west-landing-2-no-crying",
      },
    ],
  },
  "crucifix-room": {
    id: "crucifix-room",
    title: "Crucifix Room",
    description:
      "The door opens revealing a bedroom with a single cot covered in a dustsheet. On the wall hangs a silver crucifix. You have the sudden urge to take it.",
    options: [
      {
        id: "take-silver-crucifix",
        label: "Take the silver crucifix - silver-crucifix",
        targetRoomId: "crucifix-room",
        grantedItems: ["silver-crucifix"],
      },
      {
        id: "back-to-landing",
        label: "Return to the landing: west-landing-2",
        targetRoomId: "west-landing-2",
      },
    ],
  },
  "east-landing": {
    id: "east-landing",
    title: "East Landing",
    description:
      'Stepping east following the music you find yourself on a landing with two doors to the north and east; the corridor itself turns south. The music comes from the door to the north. You recognise the song as "Three Imaginary Boys" by The Cure, a cardboard sign on the door reads "KEEP OUT".',
    options: [
      {
        id: "ignore-sign",
        label:
          "Ignore the sign and go north to find the source of the music - guest-bedroom",
        targetRoomId: "guest-bedroom",
      },
      {
        id: "east-door-to-hole-down",
        label: "Open the door to the east - bedroom-with-hole-down",
        targetRoomId: "bedroom-with-hole-down",
      },
      {
        id: "head-south-to-attic-stairs",
        label: "Head south - down the corridor - attic-staircase",
        targetRoomId: "attic-staircase",
      },
      {
        id: "back-to-balcony",
        label: "Go back west to the balcony - balcony",
        targetRoomId: "balcony",
      },
    ],
  },
  "guest-bedroom": {
    id: "guest-bedroom",
    title: "Guest Room",
    description:
      "In this room lies a sleeping bag. Next to it is a rucksack, a lit torch and a small radio playing music. Getting closer you can see that the sleeping bag is slashed and bloodstained.",
    options: [
      {
        id: "search-guest-room",
        label: "Search the room - guest-room-searched",
        targetRoomId: "guest-room-searched",
      },
      {
        id: "back-to-east-landing",
        label: "Return to the landing - east-landing",
        targetRoomId: "east-landing",
      },
    ],
  },
  "guest-room-searched": {
    id: "guest-room-searched",
    title: "Guest Room Searched",
    description:
      "Rummaging through the rucksack you find clothes, a water bottle, a leaflet for a homeless charity and a bag of coins.",
    options: [
      {
        id: "back-to-east-landing",
        label: "Return to the landing - east-landing",
        targetRoomId: "east-landing",
      },
    ],
  },
  "bedroom-with-hole": {
    id: "bedroom-with-hole",
    title: "Bedroom With Hole",
    description:
      "You drag the sofa into the library and balance a chair on it, climbing up into the hole in the ceiling. Hauling yourself up you crawl into a bedroom - your torch illuminates a door to the west.",
    options: [
      {
        id: "door-to-east-landing",
        label: "Take the door to the west - east-landing",
        targetRoomId: "east-landing",
      },
      {
        id: "climb-down-to-library",
        label: "Climb back down the hole - library",
        targetRoomId: "library",
      },
    ],
  },
  "bedroom-with-hole-down": {
    id: "bedroom-with-hole-down",
    title: "Bedroom With Hole Down",
    description:
      "Opening the door your torchlight reveals the floorboards in this room have been torn up into a gaping hole. Shining your light down you can see a heaped pile of books below.",
    options: [
      {
        id: "drop-to-library",
        label: "Drop down the hole - library",
        targetRoomId: "library",
      },
      {
        id: "return-to-east-landing",
        label: "Return to the landing - east-landing",
        targetRoomId: "east-landing",
      },
    ],
  },
  "secret-tunnel": {
    id: "secret-tunnel",
    title: "Secret Tunnel",
    description:
      "Slimy stone steps lead down into the darkness and your torch shines down onto a partially flooded tunnel below. As you descend you miss your footing and slip, dropping your mobile phone. It falls from your hand and splashes into the water below.\n\nCursing your luck, you rise to your feet and search for the phone. Do you have a headlamp, or were you just using the camera phone for illumination?",
    options: [
      {
        id: "use-headlamp-to-get-phone",
        label: "Use the headlight to climb down safely and search - get-phone",
        targetRoomId: "get-phone",
        requiredItems: ["headlamp"],
      },
      {
        id: "grope-blind",
        label: "Grope in the darkness blind - death-in-the-tunnel",
        targetRoomId: "death-in-the-tunnel",
      },
    ],
  },
  "get-phone": {
    id: "get-phone",
    title: "Phone Recovered",
    description:
      "You find your footing again and step into the water; fortunately it is not deep, only about a foot of water. Your headlamp lights the tunnel well and soon enough you pull your phone from the bilge. To your relief it is still functioning.",
    options: [
      {
        id: "return-to-study",
        label: "Cut your losses and return to the study above - study",
        targetRoomId: "study",
      },
      {
        id: "press-on-to-iron-door",
        label: "Press on through the shallow water - iron-door",
        targetRoomId: "iron-door",
      },
    ],
  },
  "death-in-the-tunnel": {
    id: "death-in-the-tunnel",
    title: "Death in the Tunnel",
    description:
      "You crawl down towards the water, stumbling, trying not to fall again. You can just see the light of the phone in the murky below; you kneel and reach into the water.\n\nUnfortunately, as you do so you fail to notice the thing stalking you in the shadows. Soon its strong icy hands are on your throat, pushing your face into the foul water and holding you there.\n\nWillow House will keep its secrets. Your adventure ends here.",
    options: [
      {
        id: "return-to-start",
        label: "Return to the start - front-porch",
        targetRoomId: "front-porch",
      },
    ],
  },
  "iron-door": {
    id: "iron-door",
    title: "Iron Door",
    description:
      "The tunnel ends a large iron door. You pull on it, but the door fails to budge. Even with a crowbar it will be impossible to force open.\n\nDo you have an iron-key?",
    options: [
      {
        id: "unlock-tomb",
        label: "Unlock the door - tomb",
        targetRoomId: "tomb",
        requiredItems: ["iron-key"],
      },
      {
        id: "leave-to-surface",
        label: "Leave this place and return to the surface - library",
        targetRoomId: "library",
      },
    ],
  },
  tomb: {
    id: "tomb",
    title: "Tomb",
    description:
      'With a loud creaking the metal door slowly swings open to reveal a damp chamber dominated by a large stone tomb raised above the water upon a dais. The tomb is carved with gargoyles supporting a heavy stone lid which has been partially pushed aside, revealing a dark interior.\n\nThe inscription reads: "Sir Aubrey de Vere, 1751 - 1789" and "Fine gold to iron corruptible". As you shine your light into the cavity of the turn you sense a presence moving behind you. Whirling round you are confronted by a tall figure cowled in black, with a skull-like visage and needle-like fangs.',
    options: [
      {
        id: "futile-fight",
        label:
          "Swing your crowbar at the fiend - futile-fight",
        targetRoomId: "futile-fight",
        requiredItems: ["crowbar"],
      },
      {
        id: "vampire-at-bay",
        label:
          "Use the sign of the cross to drive off the undead - vampire-at-bay",
        targetRoomId: "vampire-at-bay",
        requiredItems: ["silver-crucifix"],
      },
      {
        id: "attempt-flee",
        label: "Attempt to flee - hunted",
        targetRoomId: "hunted",
      },
    ],
  },
  "futile-fight": {
    id: "futile-fight",
    title: "Futile Fight",
    description:
      "You swing the short metal bar hard at the apparition, but it grasps the weapon in its unnaturally strong talons, disarming you with ease. With horrific force it brings the metal bar back down upon you, breaking your wrist and knocking you to the ground.\n\nFalling into the cold water, the beast is soon upon you, fangs sinking into your neck. Your adventure ends here.",
    options: [
      {
        id: "return-to-start",
        label: "Return to the start - front-porch",
        targetRoomId: "front-porch",
      },
    ],
  },
  hunted: {
    id: "hunted",
    title: "Hunted",
    description:
      "You turn tail running as fast you can through the dark and wading into the tunnel charging forward towards the stairs. But the thing pounces upon you, dragging you back down the stairs into the water and tearing at your throat.\n\nTonight the master of Willow House will claim another victim. Your adventure ends here.",
    options: [
      {
        id: "return-to-start",
        label: "Return to the start - front-porch",
        targetRoomId: "front-porch",
      },
    ],
  },
  "vampire-at-bay": {
    id: "vampire-at-bay",
    title: "Vampire at Bay",
    description:
      "You brandish the crucifix, forcing the foul terror back, hissing. You back away clutching the holy symbol until you climb the stairs and run for the front door.\n\nYou have survived the horrors of Willow House.",
    options: [
      {
        id: "return-to-start",
        label: "Return to the start - front-porch",
        targetRoomId: "front-porch",
      },
    ],
  },
};
