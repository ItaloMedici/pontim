const RANDOM_IMAGE_API = "https://picsum.photos/150/100" as const;

export async function fetchRandomImage() {
  return fetch(RANDOM_IMAGE_API)
    .then((res) => res.url)
    .catch(() => RANDOM_IMAGE_API);
}
