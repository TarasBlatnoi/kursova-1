const imageToBase64 = (result) => {
  for (const product of result) {
    const imageBase64 = Buffer.from(product.image).toString("base64")
    product.image = imageBase64
  }
  return result
}

module.exports = { imageToBase64 }
