<script>
  import { page } from '$app/stores'; 
</script>

<ul>
  <li>
    <a href="/" class={$page.url.pathname === "/" ? "active" : ""}>Home</a>
  </li>
  <li>
    <a href="/" class={$page.url.pathname === "/about" ? "active" : ""}>About</a>
  </li>
  <li>
    <a href="/RobDeaconCV.pdf" download>CV</a>
  </li>
  <li>
    <a href="/" class={$page.url.pathname === "/banger" ? "active" : ""}>
      <span class="long-label">Banger of the Day</span>
      <span class="short-label">Bangers</span>
    </a>
  </li>
</ul>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 4rem 0 0 0;
    display: flex;
    gap: 2rem;
    justify-content: center;
    font-family: "Poppins", "Inter", sans-serif;
  }

  a {
    text-decoration: none;
    color: #004d40;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    transition: background 0.3s ease, color 0.3s ease;
  }

  a:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  a.active {
    background: rgba(255, 255, 255, 0.5);
    font-weight: 600;
  }

 
  .short-label {
    display: none;
  }

  @media (max-width: 500px) {
    .long-label {
      display: none;
    }
    .short-label {
      display: inline;
    }
  ul {
    padding: 1rem 0 0 0; 
    gap: 0.5rem;        
  }
}

</style>
