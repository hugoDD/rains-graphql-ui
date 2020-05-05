<template>
  <div v-loading="loading" :style="'height:'+ height">
    <div class="app-container" style="width: 100%;height: 100%">
      <iframe :src="altairUrl_ui" frameborder="no" style="width: 100%;height: 91%" scrolling="auto" />
    </div>
  </div>
</template>
<script>
// import iFrame from '@/components/iFrame'
import { altairUrl } from '@/settings'

export default {
  // components: { iFrame },
  data() {
    return {
      height: document.documentElement.clientHeight - 87.7 + 'px',
      loading: true,
      altairUrl_ui: altairUrl
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.loading = false
    }, 500)
    window.onresize = () => {
      this.height = document.documentElement.clientHeight - 87.7 + 'px'
    }
  }
  // ,
  // methods: {
  //   refresh(u) {
  //     this.altairUrl_ui = u
  //   }
  // }
}
</script>
