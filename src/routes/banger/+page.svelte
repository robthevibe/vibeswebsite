<script>
  import bangers from "$lib/data/bangers.json";

  
  function getTodayLocalISO() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function getEmbedUrl(url) {
    if (url.includes("watch?v=")) {
      return `https://www.youtube.com/embed/${url.split("v=")[1].split("&")[0]}`;
    }
    if (url.includes("youtu.be/")) {
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
    }
    return url;
  }

  const today = getTodayLocalISO();
  const banger = bangers.find((item) => item.date === today);
</script>

{#if banger}
  <h1>Banger of The Day</h1>
  <h2>{banger.title}</h2>
  <h3>{formatDate(banger.date)}</h3>

  <div class="video-container">
    <div class="video">
      <iframe
        src={getEmbedUrl(banger.url)}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    </div>

    <p>{banger.blurb}</p>
  </div>
{:else}
  <h1>No Banger Today 😢</h1>
  <p>Check back tomorrow for a new tune.</p>
{/if}

<style>
  h1 {
    font-family: 'heading', sans-serif;
    font-size: 8em;   
    margin-bottom: 1rem;
    margin-top: 0;
    display: flex;
    justify-content: center;
    color: #444;
    text-align: center;
  }

  h2, h3 {
    display: flex;
    justify-content: center;
    font-family: "Poppins", "Inter", sans-serif;
    text-align: center;
  }

 
  .video-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 560px; 
    margin: 0 auto;
  }

  
  .video {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; 
    height: 0;
  }

  .video iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .video-container p {
    font-family: "Poppins", "Inter", sans-serif;
    margin-top: 1rem;
    text-align: center;
  }

   @media (max-width: 1200px) {
    h1 {
      font-size: 10vw;
    }
  }
   @media (max-width: 1200px) {
    h2,h3 {
      font-size: 3vw;
    }
  }
</style>
