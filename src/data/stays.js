import { img } from '../utils/images';

export const STAY_CATEGORIES = ['All', 'Forest', 'Mountain', 'Lakeside', 'Meadow'];

export const STAYS = [
  {
    id: 'forest-canvas-suite',
    name: 'Forest Canvas Suite',
    category: 'Forest',
    price: 340,
    guests: 2,
    size: '42 m²',
    bed: 'King bed',
    tagline: 'Safari canvas under old walnut trees',
    description:
      'A hand-stitched canvas suite on a raised cedar deck, wrapped in walnut and juniper. Mornings begin with birdsong and a breakfast hamper at your door.',
    details:
      'Inside: a king bed dressed in organic linen, a wood-burning stove for cool nights and an ensuite rain shower fed by mountain spring water. Outside, a private deck with a fire bowl looks straight into the forest canopy.',
    amenities: ['Private deck', 'Wood-burning stove', 'Rain shower', 'Breakfast hamper', 'Fire bowl', 'Solar power'],
    image: img('unsplash', '1657903567141-c3d4aa36c8f8', 'Canvas tent with a sofa outside in the woods'),
  },
  {
    id: 'crystal-sky-dome',
    name: 'Crystal Sky Dome',
    category: 'Mountain',
    price: 420,
    guests: 2,
    size: '36 m²',
    bed: 'King bed',
    tagline: 'Fall asleep under the Milky Way',
    description:
      'A transparent dome on a hillside platform with uninterrupted views of the night sky. Built for stargazers, romantics and anyone who loves big silence.',
    details:
      'Climate-controlled and fully private, the dome comes with a telescope, star charts and a hot tub on the terrace. Blackout curtains close at the touch of a button when the sun rises over the ridge.',
    amenities: ['Telescope', 'Hot tub', 'Climate control', 'Star chart kit', 'Blackout curtains', 'Espresso bar'],
    image: img('unsplash', '1676776292778-2ad713ec39f3', 'Clear bubble dome tent on a wooden platform'),
  },
  {
    id: 'alpine-a-frame',
    name: 'Alpine A-Frame Lodge',
    category: 'Mountain',
    price: 520,
    guests: 4,
    size: '68 m²',
    bed: '2 bedrooms',
    tagline: 'A timber hideaway for small families',
    description:
      'A two-level A-frame with a glass gable facing the peaks. Room for four, a reading loft and a fireplace made for long evenings.',
    details:
      'The ground floor opens into a kitchen and lounge with a stone fireplace; the loft holds a second bedroom tucked beneath the roof beams. A sauna barrel waits on the terrace, with snowshoes ready in winter.',
    amenities: ['Fireplace', 'Barrel sauna', 'Full kitchen', 'Reading loft', 'Mountain view', 'Ski storage'],
    image: img('unsplash', '1525113990976-399835c43838', 'Triangular A-frame house between trees'),
  },
  {
    id: 'meadow-safari-tent',
    name: 'Meadow Safari Tent',
    category: 'Meadow',
    price: 290,
    guests: 3,
    size: '38 m²',
    bed: 'King + daybed',
    tagline: 'Wildflowers right outside the door',
    description:
      'A bright, airy bell tent set alone in a meadow of wild tulips and thyme. Simple, soft and generous — the purest form of glamping.',
    details:
      'Woven rugs, a king bed and a daybed for a third guest. A private outdoor bathtub sits in the grass, and a picnic basket of local cheeses arrives every afternoon.',
    amenities: ['Outdoor bathtub', 'Daybed', 'Picnic service', 'Hammock', 'Lanterns', 'Bicycles'],
    image: img('unsplash', '1714326029322-fcc1464df757', 'White bell tent on a lush green field'),
  },
  {
    id: 'lakeside-cabin',
    name: 'Lakeside Timber Cabin',
    category: 'Lakeside',
    price: 460,
    guests: 4,
    size: '60 m²',
    bed: '2 bedrooms',
    tagline: 'Morning swims and sunset paddles',
    description:
      'A timber cabin set on the rocks above a quiet mountain lake. Wake up to mirrored water, then take the canoe out before anyone else.',
    details:
      'Floor-to-ceiling windows, a wraparound deck and a private jetty. Two bedrooms, a fully equipped kitchen and a wood-fired hot tub that looks straight over the water.',
    amenities: ['Private jetty', 'Canoe & SUP', 'Wood-fired hot tub', 'Full kitchen', 'Lake view', 'Fishing gear'],
    image: img('unsplash', '1604609165678-096d20fab1ad', 'Wooden cabin on rocks beside a lake'),
  },
  {
    id: 'pine-hideaway',
    name: 'Pine Hideaway',
    category: 'Forest',
    price: 380,
    guests: 2,
    size: '40 m²',
    bed: 'Queen bed',
    tagline: 'A secret cabin deep in the pines',
    description:
      'The most secluded stay in the valley — a small cabin with a deck, a fire pit and nothing but pine forest in every direction.',
    details:
      'Reached by a ten-minute forest trail (we carry your bags). Inside, a queen bed faces a picture window, with a reading nook, record player and a curated library of nature writing.',
    amenities: ['Total seclusion', 'Fire pit', 'Record player', 'Reading nook', 'Luggage porter', 'Forest trail'],
    image: img('unsplash', '1697807650304-907257330a3e', 'Small cabin with a deck in the woods'),
  },
];
