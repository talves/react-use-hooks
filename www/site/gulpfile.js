import gulp from "gulp";
const { watch, series } = gulp;

import BrowserSync from "browser-sync";
import execa from "execa";

const browserSync = BrowserSync.create();

// print output of commands into the terminal
const stdio = "inherit";

async function toast() {
  await execa("toast", ["incremental", "."], { stdio });
  browserSync.reload();
}

function clean(cb) {
  // place code for your default task here
  console.log("In clean");
  cb();
}

async function css() {
  await execa(
    "postcss",
    [
      "--config",
      "legacy-commonjs",
      "src/index.css",
      "-o",
      "public/styles.css",
      "--env",
      "production",
    ],
    { stdio }
  );
  // await execa("yarn", ["copy:css"], { stdio });
  browserSync.reload("*.css");
}

function watchAll(cb) {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
    serveStatic: ["./public"],
    serveStaticOptions: {
      extensions: ["html"], // pretty urls
    },
  });
  watch("src/**/*.css", css);
  watch(
    ["src/**/*.js", "src/**/*.mdx", "content/**/*.mdx", "data/**/*.json"],
    series(clean, css, toast)
  );
  cb();
}

const defaultTask = series(css, toast, watchAll);

export { watchAll, css, toast };
export default defaultTask;
