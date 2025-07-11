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

<svelte:head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

    * {
      font-family: "Roboto", sans-serif;
      font-weight: 300;
    }
  </style>
</svelte:head>
