<section class="about">
  <div class="about-text">
    <h2 class="about-title">About me</h2>
    <div class="about-box">
      <p>
        Originally from England (please don’t hold that against me), I moved with my family to New Zealand about five years ago, after a short stint in Hong Kong along the way. I’ve spent most of my adult life working in the creative industries, starting out as a photography assistant before moving into location scouting on some of Hollywood’s biggest films. One of my best dinner party stories is always the time Tom Cruise completely lost it at me because someone dared to use a leaf blower nearby. Or, when I had to break it to Michael Bay that the car parked in the middle of his set was, in fact, his.
      </p>

      <p>
        The truth is, it’s been a really fun job, but working 90-hour weeks eventually takes its toll and isn’t really compatible with having a young family, at least not if you want to be an active part of their lives. I decided it was time for a change and went back to university to retrain. I’ve always been interested in programming, ever since I first started making silly little animations in Flash with ActionScript. What I love is that coding is both a battle and a joy: the constant problem-solving keeps you on your toes but makes the wins even more rewarding. I’m hoping to combine the technical skills I’ve gained at university with my creative sensibility and the soft skills I developed in the film industry.
      </p>

      <p>
        I know there will be plenty of candidates applying for roles and internships this summer, and some are probably 15 years younger. But what I bring is drive, passion, and a genuine eagerness to learn. My previous career instilled in me a work ethic that’s almost impossible to shake, and I’m committed to giving my all to any role I take on. I enjoy working with people, pride myself on being a strong communicator, and have developed a keen attention to detail. If you’re looking for someone who can build great client relationships, pick things up quickly, and give 100% to the job, then I’m your guy.
      </p>
    </div>
  </div>

  <div class="photos">
    <img src="/robexplore.png" alt="Hiking in the mountains" />
    <img src="/robexploretwo.png" alt="Portrait" />
    <img src="/robwork.png" alt="Scenery" />
  </div>
</section>

<style>
.about {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;  
  align-items: start;
  justify-content: center;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 3rem;
}

.about-title {
  font-family: 'heading', sans-serif;
  font-size: 8rem;
  margin-bottom: 1rem;
  margin-top: -3rem;
  color: #444;
}

.about-box {
  background: #fffdf8;
  border-radius: 0.8rem;
  padding: 3rem;
  padding-top: 1rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.about-box p {
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 1.5rem;
}

.photos {
  position: relative;
  width: 100%;
  height: 550px;                
  display: flex;
  justify-content: flex-start;
  margin-left: 3rem;          
}

.photos img {
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 0;            
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  object-fit: cover;
  transition: transform 0.3s ease;
  z-index: 1;
}


.photos img:nth-child(1) {
  top: 0;
  left: 40px;
  transform: rotate(-4deg);
}
.photos img:nth-child(2) {
  top: 180px;
  left: 100px;
  transform: rotate(3deg);
}
.photos img:nth-child(3) {
  top: 360px;
  left: 60px;
  transform: rotate(-2deg);
}


.photos img:hover {
  transform: scale(1.05) rotate(0deg);
  z-index: 10;
}

@media (max-width: 900px) {
  .about {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .photos {
    position: static;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-left: 0;
    height: auto;
  }

  .photos img {
    position: static;
    width: 45%;
    height: auto;
    transform: none;
  }

  .about-title {
    text-align: center;
  }
}
@media (max-width: 1200px) {
  .about-title {
    font-size: 10vw;
  }
}

</style>
