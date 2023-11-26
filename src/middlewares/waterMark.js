import sharp from 'sharp'
import { readFile, writeFile } from 'fs/promises'
import asyncHandler from 'express-async-handler'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const putWatermark = asyncHandler(async (req, res, next) => {
  const pics = req.files
  // console.log(pics);
  const newPics = []
  for (let pic of pics) {
    const { path } = pic
    newPics.push(path)
  }
  const waterMarked = []
  for (let one of newPics) {
    const newPic = sharp(await readFile(one))
      .composite([
        {
          input: await readFile(
            resolve(
              path.join(
                __dirname,
                '../images/watermark/image-200x200-removebg-preview.png',
              ),
            ),
          ),
          left: 50,
          top: 50,
        },
      ])
      .png()
      .toBuffer()
    waterMarked.push(newPic)
    fs.unlinkSync(one)
  }
  for (let i = 0; i < waterMarked.length; i++) {
    await writeFile(resolve(newPics[i]), await waterMarked[i])
    }
    next()
})

export { putWatermark }
