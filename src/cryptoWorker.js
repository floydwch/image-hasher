import CryptoJS from 'crypto-js'

function arrayBufferToString(arrayBuffer) {
  return [...new Uint8Array(arrayBuffer)]
    .map((x) => x.toString('16').padStart(2, '0'))
    .join('')
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = async ({ data: { blob, url } }) => {
  const arrayBuffer = await blob.arrayBuffer()

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    arrayBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  )

  const pbkdf2key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new TextEncoder().encode(url),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )

  const pbkdf2 = arrayBufferToString(
    await crypto.subtle.exportKey('raw', pbkdf2key)
  )

  const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer)
  const md5 = CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Hex)

  const sha1 = arrayBufferToString(
    await crypto.subtle.digest('sha-1', arrayBuffer)
  )

  const sha256 = arrayBufferToString(
    await crypto.subtle.digest('sha-256', arrayBuffer)
  )

  const now = new Date()

  const item = {
    url,
    time: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}`,
    size: blob.size,
    md5,
    sha1,
    sha256,
    pbkdf2,
  }

  // eslint-disable-next-line no-restricted-globals
  self.postMessage(item)
}
