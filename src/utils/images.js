/**
 * Image helpers.
 * All photography is loaded from free stock CDNs (Unsplash & Pexels),
 * which both support on-the-fly resizing through a `w` query parameter.
 * This lets us serve responsive `srcSet`s without bundling heavy files.
 */

const WIDTHS = [480, 800, 1200, 1600, 2200];

const builders = {
  unsplash: (id, w) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=78`,
  pexels: (id, w) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`,
};

/** Create an image descriptor used across the data files. */
export const img = (provider, id, alt) => ({ provider, id, alt });

/** Build a single URL at a given width. */
export const imageUrl = (image, width = 1200) =>
  builders[image.provider](image.id, width);

/** Build a srcSet string, optionally capped at a max width. */
export const imageSrcSet = (image, maxWidth = 2200) =>
  WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `${builders[image.provider](image.id, w)} ${w}w`)
    .join(', ');
