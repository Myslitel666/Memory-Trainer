<script>
  import { ThemeProvider } from "svelte-elegant";
  import Header from "$lib/layout/Header.svelte";
</script>

<ThemeProvider>
  <div class="app">
    <main>
      <Header />
      <slot />
    </main>
  </div>
</ThemeProvider>
