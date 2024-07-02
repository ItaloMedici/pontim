const UNSPLASH_RANDOM_IMAGE_API =
  "https://source.unsplash.com/random?nature" as const;

export async function fetchRandomImage() {
  return fetch(UNSPLASH_RANDOM_IMAGE_API)
    .then((res) => res.url)
    .catch(() => UNSPLASH_RANDOM_IMAGE_API);
}
