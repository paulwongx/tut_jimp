const Jimp = require('jimp')

const resize = async () => {
  const image = await Jimp.read('./img/image1.jpeg')
  console.log(image.bitmap.width)
  await image.resize(image.bitmap.width/2, Jimp.AUTO)
  await image.writeAsync(`img/${Date.now()}_widthdiv2.png`)
}

const crop = async () => {
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg')
  await image.crop(500,500,150,150)
  await image.writeAsync(`img/${Date.now()}_crop_150x150.png`)
}

const rotate = async () => {
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg')
  await image.rotate(45)
  await image.writeAsync(`img/${Date.now()}_rotate_150x150.png`)
}

const flip = async () => {
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg')
  await image.flip(true, false) // horz, vert
  await image.writeAsync(`img/${Date.now()}_flip_150x150.png`)
}

const opacity = async () => {
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg')
  await image.opacity(0.5)
  await image.writeAsync(`img/${Date.now()}_opacity_150x150.png`)
}

const watermark = async (watermarkImage) => {
  let watermark = await Jimp.read(watermarkImage)
  watermark = watermark.resize(300,300)
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg')
  watermark = await watermark
  image.composite(watermark, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: 0.5
  })
  await image.writeAsync(`img/${Date.now()}_waterMark_150x150.png`)
}

const textOverlay = async () => {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK)
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg')
  image.print(font, 50, 50, 'Size 128px!')
  await image.writeAsync(`img/${Date.now()}_textOverlay.png`)
}

const logoCopyright = async () => {
  let bgImage = await Jimp.read('./img/bg.png')
  let img1 = await Jimp.read('./img/image1.jpeg')
  let logo = await Jimp.read('./img/tiktok-white.png')
  await logo.resize(300,Jimp.AUTO)

  let textData = {
    text: '© Photo Company Limited',
    maxWidth: bgImage.bitmap.width-(10*2), // background - margins
    maxHeight: 300, // max text height
    placementX: 10,
    placementY: bgImage.bitmap.height-300-10 // height - textHeight - margin
  }

  bgImage.composite(
    logo,
    bgImage.bitmap.width/2 - logo.bitmap.width/2, // backgroundWidth/2 - Logowidth/2
    bgImage.bitmap.height/2- logo.bitmap.height/2 // backgroundHeight/2 - Logoheight/2
    //[Jimp.BLEND_DESTINATION_OVER, 0.2, 0.2]
  )


  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
  bgImage.print(font, textData.placementX, textData.placementY, {
    text: textData.text,
    alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
  }, textData.maxWidth, textData.maxHeight)

  await bgImage.quality(100).writeAsync(`img/${Date.now()}_logoCopyright.png`)

}

const textDimensions = async () => {
  let font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
  let width = Jimp.measureText(font, 'Hi')
  let height = Jimp.measureTextHeight(font, 'Some string', 100) // 100 is max width
  // Width: H char is 23px; Hi is 30px
  // Height: 32px is 36 height; 64px is 72 height
  console.log(`Width: ${width}, Height: ${height}`)
}


//watermark('./img/tiktok-white.png')
//resize()
//textOverlay()
//logoCopyright()
textDimensions()

