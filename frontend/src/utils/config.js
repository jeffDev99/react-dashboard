const setCookies = (token) => {
  document.cookie = `Token=${token}; max-age=${1 * 24 * 60 * 60}; path=/`;
};
const getCookies = (cookieName) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};
const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
export { setCookies, getCookies , deleteCookie };
