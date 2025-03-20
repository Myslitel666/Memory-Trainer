<script>
  import { ThemeProvider } from "svelte-elegant";
</script>

<ThemeProvider>
  <div class="app">
    <main>
      <slot />
    </main>
  </div>
</ThemeProvider>
