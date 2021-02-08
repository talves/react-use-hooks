const playwright = require("playwright-aws-lambda");

const buildUri = ({ queryStringParameters = {} }) => {
  const {
    ogpath = "https://use-hooks.alves.dev/og/",
    tag = ["notag"],
    id = "og-image",
    title = "No Title, Yet!",
    name = "No One",
    width,
    height,
    mode,
    slug,
  } = queryStringParameters;

  let tags = "";
  if (typeof tag === "string") {
    const queryTags = tag.split(", ");
    queryTags.forEach((t) => (tags = `${tags}&tag=${t}`));
  } else {
    tag.forEach((t) => (tags = `${tags}&tag=${t}`));
  }
  const dimensions = width && height ? `&width=${width}&height=${height}` : "";
  const colorMode = mode ? `&mode=${mode}` : "";
  const slugPath = slug ? `&slug=${slug}` : "";

  return {
    id,
    path: `${ogpath}?id=${id}&name=${name}&title=${title}${tags}${dimensions}${colorMode}${slugPath}`,
  };
};

const getBoundingSize = (uri) => {
  const ogBox = document.getElementById(uri.id);
  if (typeof ogBox === "undefined" || ogBox === null)
    return { x: 0, y: 0, width: 1920, height: 1080 };
  const { x, y, width, height } = ogBox.getBoundingClientRect();
  return { x, y, width, height };
};

/* In the case you need emojis in your titles (uncomment) */
async function loadFonts() {
  try {
    await playwright.loadFont(
      "https://rawcdn.githack.com/googlefonts/noto-emoji/41708e907f229968abcdc8ec4c59832e109ff1e8/fonts/NotoColorEmoji.ttf"
    );
    await playwright.loadFont(
      "https://rawcdn.githack.com/googlefonts/noto-fonts/31de21ec51b4b54309bd48b9e4b3693fdfe47bcc/alpha/NotoSansHistoric-Regular.ttf"
    );

    console.log("FontsLoaded");
  } catch (error) {
    console.log(error);
  }
}
loadFonts();

exports.handler = async function (event) {
  try {
    const uri = buildUri(event);
    console.log("uri", uri.path);
    const browser = await playwright.launchChromium();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    });
    await page.goto(uri.path);

    // await new Promise((resolve) => setTimeout(resolve, "200"));
    await page.waitForSelector(`#${uri.id}`, { timeout: 1000 });
    const boundingRect = await page.evaluate(getBoundingSize, uri);
    const screenshotBuffer = await page.screenshot({ clip: boundingRect });
    await browser.close();
    const base64Image = screenshotBuffer.toString("base64");

    return {
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Length": `${screenshotBuffer.length}`,
      },
      body: base64Image,
    };
  } catch (error) {
    console.log(error);
    return { statusCode: error.statusCode || 500, body: error.message };
  }
};

exports.buildUri = buildUri;
