<template>
  <div>
    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
      <div v-show="showScanConfirmation" class="scan-confirmation">
        Готово
      </div>
      <div class="loading-indicator" v-if="loading">
        Загрузка...
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream },
  props: {
    writeoff: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      camera: 'auto',
      result: null,
      showScanConfirmation: false,
      loading: false,
    }
  },

  methods: {

    async onInit (promise) {
      this.loading = true;
      try {
        await promise
      } catch (e) {
        console.error(e)
      } finally {
        this.showScanConfirmation = this.camera === "off";
        this.loading = false;
      }
    },

    async onDecode (content) {
      if (this.writeoff) {
        const res = content.split('purse?user=')[1];
        this.pause();
        await this.timeout(500);
        if (res) {
          this.$emit('create', res);
        }
      } else {
        const res = content.split('discount?')[1];
        const [user, sale] = res.split('&');
        this.pause();
        await this.timeout(500);
        if (user && sale) {
          this.$emit('create', user, sale);
        }
      }

      this.unpause()
    },

    unpause () {
      this.camera = 'auto'
    },

    pause () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>