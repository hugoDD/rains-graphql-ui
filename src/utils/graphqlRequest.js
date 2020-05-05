import { Message } from 'element-ui'
import service from './request'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const graphqlRequest = {
  // refresh(url, params) {
  //   params['grant_type'] = 'refresh_token'
  //   return refresh_service.post(url, params, {
  //     transformRequest: [
  //       params => {
  //         return tansParams(params)
  //       }
  //     ],
  //     headers: {
  //       Authorization: 'Basic ZmViczoxMjM0NTY='
  //     }
  //   })
  // },
  graphql(params, variablesData) {
    return service.post('/graphql', {
      query: params,
      variables: variablesData
    })
  },
  graphqlDownload(params, variablesData, filename) {
    NProgress.start()
    return service.post('/graphql', {
      query: params,
      variables: variablesData
    }, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/download'
      }
    })
      .then(r => {
        const content = r.data
        const blob = new Blob([content])
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = filename
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, filename)
        }
        NProgress.done()
      })
      .catch(r => {
        console.error(r)
        NProgress.done()
        Message({
          message: '下载失败',
          type: 'error',
          duration: 5 * 1000
        })
      })
  }
}

export default graphqlRequest
