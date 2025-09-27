<script>
  import Footer from '$lib/components/footer.svelte';
  import Menu from '$lib/components/menu.svelte';
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="page-wrapper">
  <Menu />

  <main class="page-content">
    <slot /> 
  </main>


</div>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;

    
    background: linear-gradient(-45deg,
      #d8f3dc,
      #fefae0,
      #faedcd,
      #e9f5db
    );
    background-size: 400% 400%;
    animation: gradientFlow 20s ease infinite;
  }

  @keyframes gradientFlow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @font-face {
    font-family: 'heading';
    src: url('/VitamiinTrial/VitamiinTrial-Black.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
  }

  .page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
  }

  .page-content {
    flex: 1; 
  }
</style>