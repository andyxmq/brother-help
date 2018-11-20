<template>
  <div class="root">
      <div class="card-img">
        <canvas canvas-id="shareCanvas" style="width:750rpx;height:900rpx"></canvas>
      </div>
  </div>
</template>

<script>
import { wxPromisify } from '@/utils/index.js'
export default {
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const ctx = wx.createCanvasContext('shareCanvas')
      ctx.setFillStyle('red')
      ctx.fillRect(0, 0, 750, 900)
      ctx.fillText('这是一个测试页面', 30, 30, 400)
      ctx.stroke()
      ctx.draw(true, this.exportImg)
      // const wxGetImageInfo = wxPromisify(wx.getImageInfo)
      // wxGetImageInfo({
      //   src: 'https://imgcdn.sdk.cn/article/s_JAQSOB7aFItUCc2aIh.jpg'
      // }).then(res => {
      //   console.log(res, 'res')
      //   const ctx = wx.createCanvasContext('shareCanvas')
      //   ctx.drawImage(res.path, 0, 0, 600, 900)
      //   ctx.draw()
      // })
    },
    exportImg () {
      console.log('aaaa')
      const wxCanvasToTempFilePath = wxPromisify(wx.canvasToTempFilePath)
      const wxSaveImageToPhotosAlbum = wxPromisify(wx.saveImageToPhotosAlbum)
      wxCanvasToTempFilePath({
        canvasId: 'shareCanvas'
      }, this).then(res => {
        console.log(res, 'res')
        return wxSaveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
      }).then(res1 => {
        console.log(res1, 'res1')
        wx.showToast({
          title: '以保存到相册'
        })
      })
    }
  }
}
</script>

<style>
  .card-img {
    display: inline-block;
  }
</style>
