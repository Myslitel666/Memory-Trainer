<script>
  import Button from "../../components/Button.svelte";
  import { goto } from "$app/navigation";

  function navigate() {
    goto("/home");
  }
</script>

<div class="content">
  <p>Are you ready to play?</p>
  <div class="mgn-top">
    <Button
      width="11rem"
      onClick={() => {
        navigate();
      }}>Ready to Go!</Button
    >
  </div>
</div>

<style>
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }

  .mgn-top {
    margin-top: 1rem;
  }

  #sqnc {
    position: absolute;
  }
</style>
