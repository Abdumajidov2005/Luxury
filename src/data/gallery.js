import { img } from '../utils/images';

/**
 * `layout` controls the tile shape in the editorial grid:
 * 'tall' spans two rows, 'wide' spans two columns, undefined is a regular tile.
 */
export const GALLERY = [
  { ...img('unsplash', '1750802384184-cee359741961', 'A glowing tent illuminated at night'), layout: 'tall' },
  { ...img('unsplash', '1731082627921-77d00a9e5ab7', 'A large white tent on a green field') },
  { ...img('unsplash', '1697462248369-254119899872', 'A small cabin with a fire pit in the yard') },
  { ...img('pexels', '2887786', 'Aerial view of a foggy valley surrounded by forested mountains'), layout: 'wide' },
  { ...img('unsplash', '1657903567170-1781df4fa6cb', 'A canvas tent standing in the woods'), layout: 'tall' },
  { ...img('unsplash', '1761782791727-3994283faa88', 'Modern A-frame living room with a forest view') },
  { ...img('unsplash', '1758243488339-10c80d530943', 'A lake surrounded by misty green hills') },
  { ...img('unsplash', '1782297154878-760efaf985f4', 'Illuminated A-frame cabins in a snowy forest') },
  { ...img('unsplash', '1676776293065-491f727ca415', 'A dome tent on a wooden deck') },
];
