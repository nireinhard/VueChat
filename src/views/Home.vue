<template>
  <div class="home">
    {{ chats }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  computed: mapState({
      chats: state => state.chats.chats
  })
}
</script>
