export function getUrlParams(s: string): {
  [key: string]: string;
} {
  const url = new URL(s);
  const queryString = url.search.slice(1).split("&");

  const params: { [key: string]: string } = {};

  queryString.forEach((item) => {
      const kv = item.split("=");
      if (kv[0]) params[kv[0]] = decodeURIComponent(kv[1]);
  });
  return params;
}
