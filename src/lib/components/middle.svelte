<script>
  import Icon from '@iconify/svelte';

  export let title = "Hi there";
  export let title2 = "my name is Rob.";
  export let subtitle = "I'm looking for an internship!";
  export let image = "/robandfrank.jpg"; 
  export let alt = "Rob at the beach with child";
</script>

<section class="intro">
  <div class="text">
    <h1>{title}</h1>
    <h2>{title2}</h2>
    <p>{subtitle}</p>


    <div class="cta-row">
      <a class="cv-button" href="/RobDeaconCV" download>
        Download my CV
      </a>

      <div class="social-links">
        <a href="https://github.com/robthevibe" target="_blank" aria-label="GitHub">
          <Icon icon="mdi:github" width="40" />
        </a>

        <a href="https://www.linkedin.com/in/rob-deacon-070705363/" target="_blank" aria-label="LinkedIn">
          <Icon icon="mdi:linkedin" width="40" />
        </a>

        <a href="mailto:robdeacon89@gmail.com" aria-label="Email">
          <Icon icon="mdi:email" width="40" />
        </a>
      </div>
    </div>
  </div>

  <div class="image">
    <img src={image} alt={alt} />
  </div>
</section>

<style>
  @font-face {
    font-family: 'heading';
    src: url('/VitamiinTrial/VitamiinTrial-Black.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
  }

  .intro {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    align-items: center;
    gap: 4rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 6rem 3rem;
  }

  .text {
    text-align: left;
  }

  h1 {
    font-family: 'heading', sans-serif;
    font-weight: 900;
    font-size: 10rem;
    line-height: 0.95;
    margin: 0;
  }

  h2 {
    font-family: 'heading', sans-serif;
    font-weight: 900;
    font-size: 5rem;
    line-height: 0.95;
    margin-top: -0.4rem;
  }

  p {
    font-family: 'heading', sans-serif;
    font-weight: 900;
    font-size: 1.75rem;
    line-height: 1.3;
    color: #333;
    margin-bottom: 2rem;
  }


  .cta-row {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .cv-button {
    display: inline-block;
    padding: 0.75rem 2rem;
    border-radius: 999px;
    border: 1px solid #d0e5d9;
    background: #fff;
    color: #004d40;
    font-family: 'heading', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }

  .cv-button:hover {
    background: #eaf4ee;
    transform: translateY(-2px);
  }

  .cv-button:active {
    transform: translateY(0);
    background: #dcefe4;
  }

  .social-links {
    display: flex;
    gap: 1rem;
  }

  .social-links a {
    color: #004d40;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .social-links a:hover {
    color: #00695c;
    transform: translateY(-2px);
  }

  .image img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    transform: translateX(2rem);
  }

  @media (max-width: 900px) {
  .intro {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .text {
    text-align: center; 
  }

  .image img {
    transform: none;
  }

  .cta-row {
    justify-content: center;
  }
}

  @media (max-width: 1332px) {
  h1 {
    font-size: 10vw; 
  }
  h2{
    font-size: 5vw;
  }
}

  @media (max-width: 950px) {
 
  p{
    font-size: 3vw;
  }
}
@media (max-width: 900px) {
  .intro {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .image img {
    transform: none;
  }

  .cta-row {
    justify-content: center;
  }
  h1 {
    font-size: 15vw;
  }
  h2{
    font-size: 7.5vw;
  }
  p{
    font-size: 4vw;
  }
}
@media (max-width: 500px) {
  .intro {
    padding: 3rem 1.5rem; 
  }
}
</style>
