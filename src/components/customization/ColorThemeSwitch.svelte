<script lang="ts">
  import { toggleThemeMode } from "../../stores/ThemeStore.js";
  import Switch from "../input/Switch.svelte";
  import { onMount } from "svelte";
  import "../../styles/app.css";

  import Light from "./Light.svelte";
  import Dark from "./Dark.svelte";

  let isChecked = false;

  onMount(() => {
    //В дальнейшем он должен подхватывать своё состояние
    if (isChecked) {
      isChecked = true;
    }
  });
</script>

<div>
  <Switch onClick={toggleThemeMode} bind:isChecked>
    <div slot="activeIcon" style:display="flex">
      <Dark />
    </div>
    <div slot="disabledIcon" style:display="flex">
      <Light />
    </div>
  </Switch>
</div>
