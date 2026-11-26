(() => {
  const homePickNode=document.getElementById('home-pick-data');
  if(homePickNode){
    let items=[];
    try{items=JSON.parse(homePickNode.textContent||'[]')}catch{}
    if(items.length){
      const shuffle=values=>{const copy=[...values];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy};
      document.querySelectorAll('.cat-strip .strip-list').forEach(list=>{const cards=shuffle(Array.from(list.children));cards.forEach((card,index)=>{if(index<5)list.append(card);else card.remove()})});
      const chosen=shuffle(items)[0];
      const categories={society:'사회',economy:'경제',sports:'스포츠',culture:'문화',world:'국제',local:'지역',education:'교육·청소년',feature:'기획'};
      const categoryNode=article=>{const el=document.createElement('span');el.className='eyebrow';const dot=document.createElement('i');dot.setAttribute('aria-hidden','true');el.append(dot,document.createTextNode(categories[article.category]||article.category||''));return el};
      const coverNode=(article,className='')=>{const wrap=document.createElement('div');wrap.className=`cover-wrap ${className}`.trim();const src=String(article.cover||'');if(src&&/^(https?:\/\/|\/(?!\/))/i.test(src)&&!/[<>"']/.test(src)){const img=document.createElement('img');img.className='cover-image';img.src=src;img.alt=article.cover_alt||`${article.title}${article.demo?' - 시연용 표지 일러스트':' - 기사 대표 이미지'}`;img.loading='lazy';wrap.append(img)}else{const fallback=document.createElement('div');fallback.className='cover-fallback';fallback.setAttribute('aria-hidden','true');fallback.textContent=categories[article.category]||'';wrap.append(fallback)}return wrap};
      const hero=document.querySelector('.lead-main .hero-article');
      if(hero){const link=document.createElement('a');link.href=`/article/${encodeURIComponent(chosen.slug)}/`;link.className='hero-article';link.append(coverNode(chosen,'hero-cover'));const copy=document.createElement('div');copy.className='hero-copy';copy.append(categoryNode(chosen));const title=document.createElement('h1');title.textContent=chosen.title||'';copy.append(title);const summary=document.createElement('p');summary.textContent=chosen.summary||'';copy.append(summary);const meta=document.createElement('div');meta.className='hero-meta';meta.textContent=`${chosen.dateLabel||''} · ${chosen.author||'새벽누리 편집부'}`;copy.append(meta);link.append(copy);hero.replaceWith(link)}
      const sidebar=document.querySelector('.lead-aside');
      if(sidebar){sidebar.querySelectorAll('.side-top').forEach(node=>node.remove());shuffle(items.filter(article=>article.slug!==chosen.slug)).slice(0,2).forEach((article,index)=>{const link=document.createElement('a');link.href=`/article/${encodeURIComponent(article.slug)}/`;link.className='side-top';link.append(coverNode(article));const number=document.createElement('span');number.className='story-index';number.textContent=`0${index+1}`;link.append(number,categoryNode(article));const title=document.createElement('h3');title.textContent=article.title||'';link.append(title);const summary=document.createElement('p');summary.textContent=article.summary||'';link.append(summary);sidebar.append(link)})}
    }
  }
  const menu=document.querySelector('[data-menu]'),nav=document.querySelector('#main-nav');
  if(menu&&nav)menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
  const modal=document.getElementById('search-modal');let prevFocus;
  function toggle(show){if(!modal)return;modal.classList.toggle('show',show);modal.setAttribute('aria-hidden',String(!show));document.body.style.overflow=show?'hidden':'';if(show){prevFocus=document.activeElement;setTimeout(()=>modal.querySelector('input')?.focus(),50)}else prevFocus?.focus?.()}
  document.querySelectorAll('[data-open-search]').forEach(el=>el.addEventListener('click',()=>toggle(true)));
  document.querySelectorAll('[data-close-search]').forEach(el=>el.addEventListener('click',()=>toggle(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
  document.querySelectorAll('[data-copy-link], [data-share]').forEach(b=>b.addEventListener('click',async()=>{const url=location.href;try{if(b.matches('[data-share]')&&navigator.share){await navigator.share({title:b.dataset.shareTitle||document.title,url});return}await navigator.clipboard.writeText(url);const before=b.innerHTML;b.textContent='링크 복사 완료';setTimeout(()=>b.innerHTML=before,1500)}catch{}}));
  const dataNode=document.getElementById('search-data');if(dataNode){const news=JSON.parse(dataNode.textContent);const results=document.getElementById('search-results'),count=document.getElementById('search-count'),query=document.getElementById('query'),form=document.getElementById('full-search');const params=new URLSearchParams(location.search);query.value=params.get('q')||'';let current='all';const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));const labels={school:'학교',local:'지역',society:'사회',culture:'문화',feature:'기획'};
    function draw(){const q=query.value.trim().toLocaleLowerCase('ko-KR');const filtered=news.filter(x=>(current==='all'||x.category===current)&&[x.title,x.summary,x.author,labels[x.category]].join(' ').toLocaleLowerCase('ko-KR').includes(q));count.innerHTML=`<b>${q?`‘${esc(query.value.trim())}’ 검색 결과`:'전체 기사'} · ${filtered.length}건</b><span>최신순</span>`;results.innerHTML=filtered.length?filtered.map(x=>`<a class="news-card news-card--tile" href="${encodeURI(x.href)}"><div class="cover-wrap">${x.cover?`<img class="cover-image" src="${esc(x.cover)}" alt="시연용 일러스트" loading="lazy">`:''}</div><div class="news-card-copy"><span class="eyebrow"><i></i>${esc(labels[x.category])}</span><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><div class="news-meta">${esc(x.author)} · ${esc(x.date)}</div></div></a>`).join(''):'<p class="empty-state">검색 결과가 없습니다. 다른 검색어로 다시 찾아보세요.</p>'}
    form.addEventListener('submit',e=>{e.preventDefault();history.replaceState(null,'','/search/'+(query.value.trim()?`?q=${encodeURIComponent(query.value.trim())}`:''));draw()});document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{current=b.dataset.category;document.querySelectorAll('[data-category]').forEach(x=>x.classList.toggle('active',x===b));draw()}));draw();
  }
})();

/* 새벽누리 v17 — 푸터에 기자 전용 로그인 열 추가. 기존 기능은 그대로 유지. */
(() => {
  const footer = document.querySelector('.footer .footer-grid');
  if (!footer || footer.querySelector('.footer-pressroom')) return;
  const linkGroups = footer.querySelectorAll(':scope > .footer-links');
  if (linkGroups.length < 2) return;

  const column = document.createElement('div');
  column.className = 'footer-links footer-pressroom';
  const heading = document.createElement('h3');
  heading.textContent = '기자 전용';
  const link = document.createElement('a');
  link.href = 'https://dawnuri-pressroom.maskstage-festival-2026.workers.dev/';
  link.rel = 'noopener noreferrer';
  link.textContent = '기자실 로그인 ↗';
  link.setAttribute('aria-label', '새벽누리 기자실 로그인 페이지로 이동');
  column.append(heading, link);
  linkGroups[1].insertAdjacentElement('afterend', column);

  const style = document.createElement('style');
  style.textContent = `
  /* 새벽누리 푸터 v17: 기존 제호, 링크, 기사 분야와 나란히 표시 */
  .footer .footer-grid{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,.9fr) minmax(0,1.25fr) minmax(0,.82fr);column-gap:32px;row-gap:26px;align-items:start}
  .footer .footer-grid>div:first-child{grid-column:1;grid-row:1;min-width:0}
  .footer .footer-grid>.footer-links:nth-child(2){grid-column:2;grid-row:1;grid-template-columns:repeat(2,minmax(0,1fr))}
  .footer .footer-grid>.footer-links:nth-child(3){grid-column:3;grid-row:1;grid-template-columns:repeat(3,minmax(0,1fr))}
  .footer .footer-grid>.footer-pressroom{grid-column:4;grid-row:1;display:flex;flex-direction:column;align-items:flex-start;gap:15px;min-width:0}
  .footer .footer-grid>.footer-pressroom h3{margin:0 0 3px}
  .footer .footer-grid>.footer-pressroom a{color:#c1d9e7;font-size:13px;line-height:1.5;text-decoration:underline;text-underline-offset:5px;white-space:normal}
  .footer .footer-grid>.footer-pressroom a:hover,.footer .footer-grid>.footer-pressroom a:focus-visible{color:#fff}
  .footer .footer-grid>.footer-cta{grid-column:1/-1;grid-row:2;border-top:1px solid rgba(201,222,235,.19);padding-top:22px;min-width:0}
  @media(max-width:1050px){
    .footer .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:29px 34px}
    .footer .footer-grid>div:first-child{grid-column:1;grid-row:1}
    .footer .footer-grid>.footer-links:nth-child(2){grid-column:2;grid-row:1}
    .footer .footer-grid>.footer-links:nth-child(3){grid-column:1;grid-row:2}
    .footer .footer-grid>.footer-pressroom{grid-column:2;grid-row:2}
    .footer .footer-grid>.footer-cta{grid-column:1/-1;grid-row:3}
  }
  @media(max-width:650px){
    .footer .footer-grid{grid-template-columns:minmax(0,1fr);gap:29px}
    .footer .footer-grid>div:first-child{grid-column:1;grid-row:1}
    .footer .footer-grid>.footer-links:nth-child(2){grid-column:1;grid-row:2}
    .footer .footer-grid>.footer-links:nth-child(3){grid-column:1;grid-row:3;grid-template-columns:repeat(2,minmax(0,1fr))}
    .footer .footer-grid>.footer-pressroom{grid-column:1;grid-row:4}
    .footer .footer-grid>.footer-cta{grid-column:1;grid-row:5}
  }`;
  document.head.appendChild(style);
})();
