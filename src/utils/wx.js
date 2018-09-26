export const request = obj => new Promise((resolve, reject) => {
  wx.request({
    url: obj.url,
    data: obj.data,
    header: { 'content-type': 'application/x-www-form-urlencoded', ...obj.header },
    method: obj.method,
    success (res) {
      resolve(res.data)
    },
    fail (e) {
      reject(e)
    }
  })
})

export default {
  request
}
