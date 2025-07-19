<script>
  import { Button, Switch, TextField, AutoComplete } from "svelte-elegant";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  // Загружаем значение из localStorage или используем true по умолчанию
  let memoryItems = "";
  let typeMemory = "";
  let length = "3";

  let isInitialized = false;

  onMount(() => {
    const memoryItemsStorage = localStorage.getItem("memoryItems");
    const typeMemoryStorage = localStorage.getItem("typeMemory");

    typeMemory = typeMemoryStorage ? typeMemoryStorage : "Long-term Memory";
    memoryItems = memoryItemsStorage
      ? memoryItemsStorage
      : typeMemory === "Long-term Memory"
        ? "Words"
        : "Numbers and Letters";

    isInitialized = true;
  });

  function navigate(link) {
    goto(link);
  }
</script>

<div class="container">
  <div class="content">
    <p
      style:font-size="1.2rem"
      style:font-weight="500"
      style:margin-bottom="0.12rem"
    >
      Select Mode
    </p>
    <div class="switch-container">
      <p class="width">What are we memorizing?</p>
      <div style:margin-left="0.5rem">
        <AutoComplete
          isSelect
          label="Memory Items"
          bind:value={memoryItems}
          options={typeMemory === "Long-term Memory"
            ? ["Numbers", "Numbers and Letters", "Words"]
            : ["Numbers", "Numbers and Letters"]}
        />
      </div>
    </div>
    <div class="switch-container">
      <p class="width">Memory Type:</p>
      <div style:margin-left="0.5rem">
        <AutoComplete
          isSelect
          label="Select Type"
          bind:value={typeMemory}
          options={["Long-term Memory", "Short-Term Memory"]}
        />
      </div>
    </div>
    {#if typeMemory === "Long-term Memory" && memoryItems !== "Words" && isInitialized}
      <div class="switch-container">
        <p class="width">
          {memoryItems === "Numbers" ? "Number" : "String"} Length:
        </p>
        <div style:margin-left="0.5rem">
          <TextField
            label="Length"
            bind:value={length}
            oninput={(e) => {
              if (e) {
                // Оставляем только цифры
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                );
              }
              length = e.currentTarget.value; // Обновляем привязанное значение
            }}
          />
        </div>
      </div>
    {/if}

    <div class="mgn-top" style:width="100%">
      <Button
        width="100%"
        onClick={() => {
          localStorage.setItem("memoryItems", memoryItems);
          localStorage.setItem("typeMemory", typeMemory);
          let numericLength = parseInt(length);
          if (numericLength > 11) {
            localStorage.setItem("stringLength", "10");
          } else if (numericLength > 0 && numericLength < 11) {
            localStorage.setItem("stringLength", length);
          } else if (numericLength < 1) {
            localStorage.setItem("stringLength", "1");
          }
          if (typeMemory === "Long-term Memory") {
            navigate("/home/long-term");
          } else {
            navigate("/home/short-term");
          }
        }}>Ready to Go!</Button
      >
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .width {
    width: 6.75rem;
  }

  .mgn-top {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .switch-container {
    display: flex;
    align-items: center;
    margin-top: 0.77rem;
  }
</style>
