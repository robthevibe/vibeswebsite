<script>
  import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="page-wrapper">
  <main class="page-content">
    <div class="container">
      <slot />
    </div>
  </main>

  <Footer />
</div>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(
      -45deg,
      #d8f3dc,
      #fefae0,
      #faedcd,
      #e9f5db
    );
    background-size: 400% 400%;
    animation: gradientFlow 20s ease infinite;
    color: #08323a;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  }

  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
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
    padding: 4rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.25rem;
  }
</style>