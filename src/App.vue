<template>
  <div id="app" class="min-h-screen">
    <header
      class="h-14 shadow-xl border-b-2 w-full flex items-center justify-center"
    >
      <a>
        <img class="h-8" src="/assets/contractuo-logo.svg" alt="logo" />
      </a>
    </header>

    <main class="pt-2 flex justify-center">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {};
</script>
