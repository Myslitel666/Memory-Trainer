<script>
  import { Box, Button, AutoComplete } from "svelte-elegant";
  import { Process, Info, DiagramIconPro } from "svelte-elegant/icons-elegant";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let metric = "Average";
  let memoryType = "Short Term";
  let memoryItems = "Numbers";
  let average = 0;

  function getMetric() {
    if (!browser) return; // ← Не выполнять на сервере

    if (memoryType === "Short Term" && memoryItems === "Numbers") {
      const sTNumbers = JSON.parse(localStorage.getItem("sTNumbers") || "[]");
      let sum = 0;
      for (let i = 0; i < sTNumbers.length; i++) {
        sum += sTNumbers[i];
      }
      average = sTNumbers.length === 0 ? 0 : sum / sTNumbers.length;
      average = Number(average.toFixed(2));
    }
  }

  function resetMetric() {
    if (memoryType === "Short Term" && memoryItems === "Numbers") {
      localStorage.setItem("sTNumbers", JSON.stringify([]));
    }
  }

  onMount(() => {
    getMetric();
  });

  $: if (metric && memoryType && memoryItems) {
    getMetric();
  }
</script>

<div class="page">
  <div class="box">
    <p class="header">Analytical Data</p>
    <p>
      Your progress is saved automatically in your browser. Only you can see it.
    </p>
    <div class="box-list">
      {#if metric === "Max Power"}
        <Box variant="Hoverable" maxWidth="500px" width="calc(100vw - 30px)">
          <div class="box">
            <p style:font-size="20px">Max Power</p>
            <p class="score">20.35</p>
            <div class="info-icon">
              <Info />
            </div>
          </div>
        </Box>
      {:else}
        <Box variant="Hoverable" maxWidth="500px" width="calc(100vw - 30px)">
          <div class="box">
            <p style:font-size="20px">Average</p>
            <p class="score">{average}</p>
            <div class="info-icon">
              <div class="info-icon-container">
                <Info />
              </div>
            </div>
          </div>
        </Box>
      {/if}
    </div>
    <p class="header" style:margin-top="30px">Configure Analytics</p>
    <div
      style:display="flex"
      style:align-items="center"
      style:margin-top="5px"
      style:gap="5px"
    >
      <p>Metric:</p>
      <div class="metric-autocomplete">
        <AutoComplete
          label="Metric"
          width="100%"
          bind:value={metric}
          options={["Max Power", "Average"]}
        />
      </div>
    </div>
    <div
      style:display="flex"
      style:gap="10px"
      style:margin-top="7px"
      style:margin-left="9px"
    >
      <div style:display="flex" style:align-items="center" style:gap="5px">
        <p style:margin-left="-9px" style:margin-right="9px">Type:</p>
        <div class="time-autocomplete">
          <AutoComplete
            isSelect
            bind:value={memoryType}
            label="Memory Type"
            width="100%"
            options={["Short Term", "Long Term", "Assosiative"]}
          />
        </div>
      </div>
      <div
        class="level-autocomplete"
        style:display="flex"
        style:align-items="center"
        style:gap="5px"
      >
        <p>Items:</p>
        <AutoComplete
          label="Items"
          bind:value={memoryItems}
          width="100%"
          options={[
            "Numbers",
            "Numbers and Letters",
            "Words",
            "Colors",
            "Shapes",
            "Colored Shapes",
          ]}
        />
      </div>
    </div>
    <Button
      variant="Text"
      padding="7px"
      height="40px"
      marginTop="5px"
      bgColorHover="rgb(255,0,0,0.12)"
      color="#ec1313"
      borderColor="#ec1313"
      onClick={() => {
        resetMetric();
        getMetric();
      }}
    >
      <div style:margin-top="5px" style:margin-left="-2px">
        <Process fill="#ec1313" size="35px" />
      </div>
      Reset Current Data
    </Button>
    <DiagramIconPro strokeWidth="0.03" size="200px" />
  </div>
</div>

<style>
  .metric-autocomplete {
    width: 450px;
  }

  .time-autocomplete {
    width: 200px;
  }

  .level-autocomplete {
    width: 240px;
  }

  @media (max-width: 768px) {
    .metric-autocomplete {
      width: 312px;
    }

    .time-autocomplete {
      width: 133px;
    }

    .level-autocomplete {
      width: 169px;
    }
  }

  .info-icon {
    position: absolute;
    right: 15px;
  }
  .page {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
  }

  .header {
    font-size: 24px;
    font-weight: 600;
  }

  .score {
    font-size: 45px;
    font-weight: 600;
  }

  .box-list {
    display: flex;
    flex-direction: column;
    margin-top: 3px;
  }

  .box {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding-top: 5px;
    width: 100%;
  }
</style>
