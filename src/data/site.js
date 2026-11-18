import { img } from '../utils/images';

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'stays', label: 'Stays' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const CONTACT = {
  address: 'Chimgan Valley, Tashkent Region, Uzbekistan',
  phone: '+998 71 200 45 45',
  phoneHref: 'tel:+998712004545',
  email: 'hello@luxuryglamping.uz',
  hours: 'Reservations daily, 09:00 – 21:00',
};

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/', icon: 'pinterest' },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
];

export const HERO = {
  image: img(
    'unsplash',
    '1632367294096-4e77d53c4ae9',
    'A canvas glamping tent in an open meadow with mountains behind it'
  ),
  stats: [
    { value: '06', label: 'Signature stays' },
    { value: '480', label: 'Hectares of wild land' },
    { value: '4.9', label: 'Average guest rating' },
  ],
};

export const ABOUT = {
  main: img(
    'unsplash',
    '1769952055704-6e355af01435',
    'Guests relaxing outside a canvas tent at the camp'
  ),
  detail: img(
    'unsplash',
    '1782846484501-d4b1c5b57953',
    'Warm a-frame cabin interior with a large window onto the forest'
  ),
  values: [
    {
      title: 'Low-impact by design',
      text: 'Raised platforms, solar power and spring water — the land stays as we found it.',
    },
    {
      title: 'Hosted, never hovered',
      text: 'A personal host plans every detail, then leaves you to the silence.',
    },
    {
      title: 'Local at heart',
      text: 'Shepherds, farmers and guides from the valley shape every experience.',
    },
  ],
};

export const BOOKING_IMAGE = img(
  'unsplash',
  '1601918774946-25832a4be0d6',
  'A timber house tucked between tall green trees'
);

export const NEWSLETTER_IMAGE = img(
  'pexels',
  '2437289',
  'Sunrise over misty valleys and forested mountains'
);
