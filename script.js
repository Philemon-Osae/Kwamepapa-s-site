document.addEventListener("DOMContentLoaded", function(){

  const bookBtn = document.getElementById("bookBtn");
  if(bookBtn){
    bookBtn.addEventListener("click", function(){
      window.open("https://wa.me/233503498510?text=Hi%20Kwamepapaa%20-%20I'm%20from%20your%20website%20and%20want%20to%20book%20you","_blank");
    });
  }

  const cards = document.querySelectorAll(".card");
  const revealObs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add("visible"); });
  }, {threshold:0.15});
  cards.forEach(c=> revealObs.observe(c));

  const progress = document.getElementById("progress");
  const toTop = document.getElementById("toTop");
  const navLinks = document.querySelectorAll("nav a");
  const sections = ["home","about","services","rentals","quote","faq","contact"].map(id=>document.getElementById(id));

  window.addEventListener("scroll", function(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + "%";
    toTop.classList.toggle("show", h.scrollTop > 400);

    let current = sections[0].id;
    sections.forEach(sec=>{
      if(sec.getBoundingClientRect().top <= 100) current = sec.id;
    });
    navLinks.forEach(a=> a.classList.toggle("active", a.getAttribute("href") === "#"+current));
  });
  toTop.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));

  const phrases = ["Just Groovings", "Pocket & Feel", "Artist || Brand Ambassador || CELEBRITY DRUMMER🥁"];
  const tagEl = document.getElementById("rotatingTag");
  let pi = 0, ci = 0, deleting = false;
  function typeLoop(){
    const word = phrases[pi];
    ci += deleting ? -1 : 1;
    tagEl.textContent = word.slice(0, ci);
    let delay = deleting ? 40 : 90;
    if(!deleting && ci === word.length){ delay = 1400; deleting = true; }
    else if(deleting && ci === 0){ deleting = false; pi = (pi+1) % phrases.length; delay = 300; }
    setTimeout(typeLoop, delay);
  }
  typeLoop();

  const notesWrap = document.getElementById("notes");
  const symbols = ["♪","♫","♬","♩"];
  for(let i=0;i<14;i++){
    const n = document.createElement("div");
    n.className = "note";
    n.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    n.style.left = Math.random()*100 + "%";
    n.style.fontSize = (14 + Math.random()*20) + "px";
    n.style.animationDuration = (6 + Math.random()*8) + "s";
    n.style.animationDelay = (Math.random()*8) + "s";
    notesWrap.appendChild(n);
  }

  /* live availability badge */
  const availBadge = document.getElementById("availBadge");
  if(availBadge){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const now = new Date();
    availBadge.innerHTML = '<span class="dot"></span>Booking open for ' + months[now.getMonth()] + ' ' + now.getFullYear();
  }

  /* quote calculator */
  const quoteChecks = document.querySelectorAll('#quoteList input[type="checkbox"]');
  const qTotalEl = document.getElementById("qTotal");
  const quoteBtn = document.getElementById("quoteBtn");
  const discountNote = document.getElementById("discountNote");
  function updateQuote(){
    let total = 0;
    const items = [];
    quoteChecks.forEach(cb=>{
      if(cb.checked){
        total += Number(cb.getAttribute("data-price"));
        items.push(cb.getAttribute("data-label"));
      }
    });
    qTotalEl.textContent = "GH₵" + total;
    discountNote.classList.toggle("show", items.length >= 2);
    const msg = items.length
      ? "Hi Kwamepapaa - I'd like a quote for: " + items.join(", ") + ". Estimated total: GH₵" + total
      : "Hi Kwamepapaa - I'd like to get a quote";
    quoteBtn.href = "https://wa.me/233503498510?text=" + encodeURIComponent(msg);
  }
  quoteChecks.forEach(cb=> cb.addEventListener("change", updateQuote));
  updateQuote();

  /* share button */
  const shareBtn = document.getElementById("shareBtn");
  if(shareBtn){
    shareBtn.addEventListener("click", async ()=>{
      const shareData = { title: document.title, text: "Check out Kwamepapaa's page:", url: window.location.href };
      try{
        if(navigator.share){ await navigator.share(shareData); }
        else{
          await navigator.clipboard.writeText(window.location.href);
          shareBtn.textContent = "✅ Link Copied!";
          setTimeout(()=> shareBtn.textContent = "🔗 Share This Page", 2000);
        }
      }catch(err){ /* user cancelled share */ }
    });
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-item").forEach(item=>{
    item.querySelector(".faq-q").addEventListener("click", ()=>{
      item.classList.toggle("open");
    });
  });
});