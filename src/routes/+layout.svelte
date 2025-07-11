<script>
  import ThemeProvider from "../components/customization/ThemeProvider.svelte";
  import Header from "./Header.svelte";
</script>

<ThemeProvider>
  <div class="app">
    <main>
      <Header />
      <slot />
    </main>
  </div>
</ThemeProvider>
