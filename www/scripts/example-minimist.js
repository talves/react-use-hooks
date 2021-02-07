const path = require("path");
const process = require("process");

const args = require("minimist")(process.argv.slice(2), {
  default: {
    input: "www/site/content",
    output: "www/site/static/images/social",
  },
  alias: {
    i: "input",
    o: "output",
  },
});
console.log(JSON.stringify(args, null, 2));
console.log(process.cwd());
console.log(path.join(process.cwd(), args.input));
console.log(path.join(process.cwd(), args.output));
