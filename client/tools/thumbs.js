/**
 * Util that generates thumbnails for images in /public/pics
 *
 * Generates JSON with the following format:
 * {
 *   "thumbs": {
 *    "hotel-1.jpg": "<BASE_64_of_1x10 thumb>",
 *   }
 * }
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const sourceDir = path.resolve(__dirname, '..' ,'public', 'pics');
const mocksDir = path.resolve(__dirname, '..', 'src/infra/store', 'thumbs');
const thumbsFileName = 'thumbs.json';


/**
 * Generates a Base 64 of 10x10 thumbnail for a given file
 */
function generateThumbForFile(filePath) {
  return new Promise((resolve, reject) => {
    sharp(filePath)
      .resize({ width: 10 })
      .toBuffer((err, buffer) => {
        if (err) reject(err);

        // Convert thumbnail buffer to base64 string
        const thumbBase64 = buffer.toString('base64');

        resolve(thumbBase64);
      });
  });
}

/**
 * Promise wrapper around fs.readdirSync
 */
function readDir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) reject(err);

      resolve(files);
    });
  });
}



async function generateThumbnails() {
  const files = await readDir(sourceDir);

  const resultTuples = await Promise.all(
    files.map(async file => {
      // Only process image files
      if (/\.(jpg|jpeg|png|gif)$/i.test(file) === false ) {
        return
      }

      /**
       * Print file name in console with replacement of previous line
       */
      console.log(`🏞️  Generating thumbnail for ${file}`);

      const filePath = path.resolve(sourceDir, file);

      const thumb = await generateThumbForFile(filePath);

      return [file, thumb]
    })
  )

  return Object.fromEntries(resultTuples);
}

const thumbs = await generateThumbnails();

console.log(`🏁  Writing thumbnails to ${mocksDir}/${thumbsFileName}`);

fs.writeFileSync(
  path.resolve(mocksDir, thumbsFileName),
  JSON.stringify({ thumbs }, null, 2)
);

console.log(`🎉  Done!`);






