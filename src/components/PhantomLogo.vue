<template>
  <v-card
    v-ripple
    class="ma-8 mb-4 py-4 pb-8"
    color="accent lighten-5"
    elevation="0"
    rounded="xl"
    style=""
  >
    <div>
      <v-img
        class="mx-auto unselectable"
        height="192px"
        src="@/assets/logo_phantom.png"
        style="filter: drop-shadow(-15px 15px 15px rgba(0,0,0,0.15)); user-select: none; pointer-events: none;"
        width="192px"
      />
    </div>
    <div
      class="text-center text-caption primary--text"
      style="user-select: none;"
    >Arkwaifu - Phantom
    </div>
  </v-card>
</template>
<script>
  export default {
    name: 'PhantomLogo'
  }
</script>
