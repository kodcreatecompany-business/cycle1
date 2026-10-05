// c = part centre in image pixels, s = zoom when focused, e = exploded offset, r = exploded tilt
export const PARTS = {
  frame:      { c: [650, 430],  s: 1.1,  e: [0, 0],      r: 0 },
  frontWheel: { c: [1075, 760], s: 1.35, e: [270, 70],   r: 6 },
  rearWheel:  { c: [250, 690],  s: 1.35, e: [-270, 70],  r: -6 },
  drivetrain: { c: [470, 815],  s: 2.6,  e: [20, 230],   r: 8 },
  handlebar:  { c: [890, 110],  s: 1.5,  e: [90, -210],  r: -5 },
  saddle:     { c: [415, 195],  s: 3,    e: [-150, -200], r: 7 },
};
export const TARGET = [860, 540];

export const CHAPTERS = [
  { part: null, title: "Take it apart. See what you ride.", body: "The VESCO Downtown mountain bike, pulled apart one piece at a time. Scroll to begin.", chips: [] },
  { part: "frame", title: "The frame holds everything together", body: "A gloss white frame with black VESCO and Downtown graphics. Every other part bolts to it, so it sets the look of the bike and how it feels on the road.", chips: ["Gloss white finish", "Pro Bike badge", "Black graphics"] },
  { part: "frontWheel", title: "Front wheel and fender", body: "A spoked rim wrapped in a knobby Hartex Xtra Action tyre. Orange reflectors on the spokes make you visible from the side at night, and the black fender keeps mud off your clothes.", chips: ["Hartex Xtra Action tyre", "Spoke reflectors", "Rim brake"] },
  { part: "rearWheel", title: "Rear wheel and fender", body: "The same chunky tread as the front, so grip stays even. The rear hub takes the drive from the chain, and the fender stops spray reaching your back.", chips: ["Knobby tread", "Spoke reflectors", "Rear fender"] },
  { part: "drivetrain", title: "Crankset, chain and pedals", body: "Your legs turn the pedals, the pedals turn the chainring, and the chain carries that power to the rear wheel. A side kickstand holds the bike upright when you park.", chips: ["Chain drive", "Flat pedals", "Kickstand"] },
  { part: "handlebar", title: "Handlebar, stem and brakes", body: "A wide flat bar with grips, brake levers and cables, plus a front reflector. The stem sets the bar height and reach so your wrists and shoulders stay relaxed.", chips: ["Flat bar", "Brake levers", "Front reflector"] },
  { part: "saddle", title: "Saddle and seatpost", body: "A padded saddle on an adjustable seatpost. Loosen the clamp, slide it to your leg length, and tighten it again.", chips: ["Padded saddle", "Adjustable height"] },
  { part: null, title: "Put it back together", body: "Every piece has a job. Now you know what each one does.", chips: [], cta: true },
];
