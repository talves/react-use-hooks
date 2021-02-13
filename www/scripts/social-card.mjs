import fs from "fs";
import path from "path";
import https from "https";
import { processMdx } from "@toastdotdev/mdx";
import imgmin from "netlify-plugin-image-optim";
import { buildUri } from "../../netlify/functions/og-create.js";
import minimist from "minimist";

const args = minimist(process.argv.slice(2), {
  default: {
    input: "www/site/content",
    output: "www/site/static/images/social",
    width: 1024,
    height: 542,
    tag: [],
    slug: "",
  },
  alias: {
    i: "input",
    o: "output",
    n: "name",
    t: "title",
    m: "mode",
    F: "force",
  },
});
// console.log(JSON.stringify(args, null, 2));

const inputPath = path.join(process.cwd(), args.input);
const outputPath = path.join(process.cwd(), args.output);

const inputExists = fs.existsSync(inputPath);
console.log(`exists: [${inputExists}] ${inputPath}`);
const outputExists = fs.existsSync(outputPath);
console.log(`exists: [${outputExists}] ${outputPath}`);

async function processFile(filepath) {
  const content = fs.readFileSync(filepath, "utf8");
  const {
    data: {
      exports: { meta: data },
    },
  } = await processMdx(content, {});
  // console.log("data:", JSON.stringify(data, null, 2));
  const nameArray = data.slug ? data.slug.split("/") : ["site-default"];

  if (Boolean(data.draft)) {
    console.warn(`[skipping-draft] ${filepath}`);
    return;
  }
  const tag = args.tag && args.tag.length ? args.tag : null;

  const options = {
    queryStringParameters: {
      name: args.name || "Tony Alves",
      title: args.title || data.title,
      width: args.width || 1200,
      height: args.height || 630,
      tag: tag || data.keywords || [],
      mode: args.mode,
      slug: args.slug || data.slug,
    },
  };

  console.log("-----------------------------------------");
  // console.log(JSON.stringify(options, null, 2));
  const uri = encodeURI(
    `https://use-hooks.alves.dev/.netlify/functions/og-create?${buildUri(
      options
    )
      .path.split("?")
      .slice(1)
      .join("")}`
  );
  console.log(encodeURI(uri));

  const outputName = `${nameArray[nameArray.length - 1]}.png`;
  const imageArray = data.image ? data.image.split("/") : [outputName];
  const imageName = imageArray[imageArray.length - 1];
  const writePath = path.join(outputPath, outputName);
  const writeExists = fs.existsSync(writePath);

  console.log(filepath);
  console.log(`exists: [${writeExists}] ${writePath}`);
  if (imageName !== outputName)
    console.warn(
      `[warning] [${outputName}] does not match image name [${imageName}]`
    );
  // console.log(data);

  /*
      Get the image from the uri
      Make sure the file doesn't exist unless the -F (--Force)
  */
  if (!writeExists || args.F) {
    const file = fs.createWriteStream(writePath);
    const request = https.get(uri, async function (response) {
      await response.pipe(file);
      // The following commented code uses sharp to compress,
      // but this image was already compressed. Use online tool instead.
      // const transform = sharp();
      // response.pipe(transform);
      // transform
      //   .png({
      //     compressionLevel: 9,
      //     adaptiveFiltering: true,
      //     force: true,
      //   })
      //   .withMetadata()
      //   .toFile(writePath, (err, info) => {
      //     console.log(info);
      //   });
    });
    console.log(`[writing] ${writePath}`);
  } else {
    console.log(`[exists] ${writePath}`);
  }

  if (args.F && writeExists) {
    console.warn(`[warning] ${imageName} was overwriting!`);
  }
}

function isValidExtension(filePath) {
  const fArray = filePath.split(".");
  const extension = fArray[fArray.length - 1];
  return ["mdx"].includes(extension);
}

async function processDir(dirpath) {
  const dir = await fs.promises.opendir(dirpath);
  for await (const dirent of dir) {
    console.log(dirent.name);
    if (isValidExtension(dirent.name))
      processFile(path.join(dirpath, dirent.name));
  }
}

function processFiles() {
  fs.stat(inputPath, async function (err, stats) {
    console.log(stats.isDirectory());
    if (stats.isDirectory()) {
      await processDir(inputPath);
    } else if (stats.isFile()) {
      if (isValidExtension(inputPath)) await processFile(inputPath);
    }
  });
}

if (inputExists && outputExists) {
  processFiles(inputPath);
  imgmin
    .onPostBuild({ constants: { PUBLISH_DIR: outputPath } })
    .then(() => console.log("Image Optimization Complete!"))
    .catch((e) => console.log(e));
}
