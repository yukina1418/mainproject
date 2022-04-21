const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

exports.ThumbnailTrigger = async (event, context) => {
  if (event.name.includes("thumb/")) return;
  //  if (event.name.includes("thumb/s")) return;
  // if (event.name.includes("thumb/m/")) return;
  // if (event.name.includes("thumb/l/")) return;

  const option = [
    [320, "s"],
    [640, "m"],
    [1280, "l"],
  ];
  const name = event.name;
  const storage = new Storage().bucket(event.bucket);

  await Promise.all(
    option.map(([size, dir]) => {
      return new Promise((resolve, reject) => {
        storage
          .file(name)
          .createReadStream()
          .pipe(sharp().resize({ width: size }))
          .pipe(storage.file(`thumb/${dir}/${name}`).createWriteStream())
          .on("finish", () => resolve())
          .on("error", () => reject());
      });
    })
  );
};
