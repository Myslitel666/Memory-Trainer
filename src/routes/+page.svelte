<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  function navigate() {
    goto("/about");
  }

  onMount(() => {
    navigate();
  });
</script>
