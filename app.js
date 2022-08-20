const fs = require("fs").promises;
const path = require("path");

fs.mkdir("./test/video").catch(console.error);
fs.mkdir("./test/captured").catch(console.error);
fs.mkdir("./test/duplicated").catch(console.error);

fs.readdir("./test")
  .then((data) => {
    data.map((e, i) => {
      if (path.extname(e) === ".mp4" || path.extname(e) === ".mov") {
        fs.copyFile(path.join("./test", e), path.join("./test/video", e));
        fs.rm(path.join("./test", e));
      } else if (path.extname(e) === ".png" || path.extname(e) == ".aae") {
        fs.copyFile(path.join("./test", e), path.join("./test/captured", e));
        fs.rm(path.join("./test", e));
      } else if (path.extname(e) === ".jpg") {
        if (path.basename(e, ".jpg").split("_")[1][0] === "E") {
          console.log(path.basename(e));
        } else {
          fs.copyFile(
            path.join("./test", e),
            path.join("./test/duplicated", e)
          );
          fs.rm(path.join("./test", e));
        }
      } else {
        console.log(path.basename(e));
      }
    });
  })
  .catch(console.error);
