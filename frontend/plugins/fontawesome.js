import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebookF, faGithub, faLinkedinIn, faInstagram)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
