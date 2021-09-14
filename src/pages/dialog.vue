<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()

const { t } = useI18n()
</script>

<template>
  <div>
    kggkj
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
