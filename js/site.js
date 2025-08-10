async function loadLatest(selector, count){
  try{
    const res = await fetch('/data/market-insights.json', { cache: 'no-store' });
    const data = await res.json();
    const grid = document.querySelector(selector);
    grid.innerHTML='';
    data.sort((a,b)=> a.date < b.date ? 1 : -1);
    data.slice(0, count||6).forEach(a=>{
      const el = document.createElement('div');
      el.className='card';
      el.innerHTML = `
        <h3><a href="/article.html?slug=${encodeURIComponent(a.slug)}">${a.title}</a></h3>
        <p class="subtle">${a.date} • ${(a.tags||[]).map(t=>`#${t}`).join(' ')}</p>
        <p>${a.summary}</p>
        <a class="btn" href="/article.html?slug=${encodeURIComponent(a.slug)}">Read</a>
      `;
      grid.appendChild(el);
    });
  }catch(e){
    console.error(e);
    document.querySelector(selector).innerHTML='<p class="subtle">Could not load latest posts.</p>';
  }
}