const { JSDOM } = require("jsdom");
async function crawlPage(currentURL) {
  console.log(`currently crawling the page: ${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        `error in fetch, status code ${resp.status} on page ${currentURL}`,
      );
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html ${contentType} response while fetch on page ${currentURL}`,
      );
      return;
    }
    console.log(await resp.text());
  } catch (err) {
    console.error(
      `Error is fetch error: ${err.message}, on page ${currentURL}`,
    );
  }
}
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  for (const link of links) {
    try {
      if (link.href.slice(0, 1) === "/") {
        // relative path
        const urlOject = new URL(baseURL + link.href);
        urls.push(urlOject.href);
      } else {
        const urlObject = new URL(link.href);
        urls.push(urlObject.href);
      }
    } catch (error) {
      console.log("invalid URL [ERROR]");
    }
  }

  return urls;
}
function normalizeURL(urlString) {
  const urlObject = new URL(urlString);
  let hostPath = `${urlObject.hostname}${urlObject.pathname}`;
  if (hostPath.endsWith("/")) {
    hostPath = hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};

