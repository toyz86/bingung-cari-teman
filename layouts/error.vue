<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>

</template>

<script>
import errorInternet from '~/components/error/errorInternet.vue';

export default {
    name: 'NuxtError',
    layout: 'default',
    props: {
        error: {
        type: Object,
        default: () => {},
        },
    },
    computed: {
        errorPage() {
        let message = _.isString(this.error.message) ? this.error.message : `${this.error.message}`;

            if (message.toLowerCase() === 'network error') {
                return errorInternet;
            }
        },
    }
}
</script>
