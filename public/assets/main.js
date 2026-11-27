(() => {
  const homePickNode=document.getElementById('home-pick-data');
  if(homePickNode){
    let items=[];
    try{items=JSON.parse(homePickNode.textContent||'[]')}catch{}
    if(items.length){
      const shuffle=values=>{const copy=[...values];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy};
      document.querySelectorAll('.cat-strip .strip-list').forEach(list=>{const cards=shuffle(Array.from(list.children));cards.forEach((card,index)=>{if(index>=3){card.remove();return}list.append(card);if(!card.querySelector('.cover-wrap .cover-image')){card.querySelector('.cover-wrap')?.remove();const copy=card.querySelector('.news-card-copy');const title=copy?.querySelector('h3');if(copy&&title){copy.replaceChildren(title);card.style.display='block'}}})});
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

/* 새벽누리 하단 푸터: 분야, 기자실, 안내 링크와 단체 정보 */
(() => {
  const footer=document.querySelector('.footer');
  const grid=footer?.querySelector('.footer-grid');
  if(!footer||!grid||footer.querySelector('.footer-category-nav'))return;
  const groups=Array.from(grid.querySelectorAll(':scope > .footer-links'));
  const pages=groups[0];
  const categories=groups.find(group=>group.querySelector('h3')?.textContent.trim()==='기사 분야')||groups[1];
  const categoryLinks=Array.from(categories?.querySelectorAll('a')||[]).map(a=>a.cloneNode(true));
  const pageLinks=Array.from(pages?.querySelectorAll('a')||[]).map(a=>a.cloneNode(true));
  const contact=footer.querySelector('.footer-contact-card .light-link');
  if(contact){const link=contact.cloneNode(true);link.textContent='기사 제보';pageLinks.push(link)}
  const categoryNav=document.createElement('nav');
  categoryNav.className='footer-category-nav';
  categoryNav.setAttribute('aria-label','기사 분야 바로가기');
  categoryLinks.forEach(link=>categoryNav.append(link));
  const account=document.createElement('div');
  account.className='footer-account-row';
  account.setAttribute('aria-label','기자실 계정');
  const pressroom=grid.querySelector('.footer-pressroom');
  const login=pressroom?.querySelector('a');
  if(login)account.append(login.cloneNode(true));
  const utility=document.createElement('nav');
  utility.className='footer-utility-nav';
  utility.setAttribute('aria-label','새벽누리 안내');
  pageLinks.forEach(link=>utility.append(link));
  groups.forEach(group=>group.remove());
  pressroom?.remove();
  grid.insertAdjacentElement('afterend',categoryNav);
  if(account.childElementCount)categoryNav.insertAdjacentElement('afterend',account);
  (account.childElementCount?account:categoryNav).insertAdjacentElement('afterend',utility);
  const meta=footer.querySelector('.footer-registration-info');
  const details=meta?.querySelector('.footer-registration-info-details');
  if(meta&&details){
    const oldValues=Array.from(details.querySelectorAll('span')).map(n=>n.textContent.trim());
    const number=oldValues.find(s=>/\d{3}-\d{2}-\d{5}/.test(s))?.match(/\d{3}-\d{2}-\d{5}/)?.[0]||'104-82-79386';
    meta.querySelector('.footer-registration-info-heading')?.remove();
    details.replaceChildren();
    const rows=[
      [['단체명','새벽누리'],['발행인','김우림']],
      [['고유번호',number],['문의','dawnuri.nw@gmail.com']]
    ];
    rows.forEach(items=>{
      const row=document.createElement('div');
      row.className='footer-registration-line';
      items.forEach(([label,value])=>{
        const span=document.createElement('span');
        span.textContent=label+': '+value;
        row.append(span);
      });
      details.append(row);
    });
  }
  const style=document.createElement('style');
  style.textContent=".footer .footer-grid{display:block!important;grid-template-columns:1fr!important;gap:0!important}\n.footer .footer-grid>div:first-child{max-width:640px;margin:0 auto 30px;text-align:center}\n.footer .footer-grid>div:first-child .footer-brand{display:inline-block;margin-bottom:8px}\n.footer .footer-grid>div:first-child .foot-desc{margin-top:12px!important}\n.footer-category-nav{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px;margin:0 auto 24px;max-width:none}\n.footer-category-nav a{display:flex;align-items:center;justify-content:center;min-height:44px;padding:7px 5px;border:1px solid rgba(207,227,238,.35);border-radius:10px;color:#e4f2f8;font-family:inherit;font-size:12px;font-weight:600;letter-spacing:inherit;line-height:1.4;white-space:nowrap;transition:background .18s,border-color .18s}\n.footer-category-nav a:hover,.footer-category-nav a:focus-visible{background:rgba(119,202,221,.12);border-color:#79cde0;color:#fff}\n.footer-account-row{display:flex;justify-content:center;margin:0 auto 24px}\n.footer-account-row a{display:inline-flex;align-items:center;justify-content:center;min-width:220px;min-height:48px;padding:9px 25px;border:1px solid rgba(235,247,252,.8);border-radius:999px;color:#fff;font-family:inherit;font-size:13px;font-weight:600;letter-spacing:inherit;line-height:1.5}\n.footer-account-row a:hover,.footer-account-row a:focus-visible{background:rgba(255,255,255,.1);color:#fff}\n.footer-utility-nav{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:0;margin:0 auto 28px;padding:0}\n.footer-utility-nav a{padding:5px 15px;color:#c8dbe4;font-family:inherit;font-size:13px;font-weight:400;letter-spacing:inherit;line-height:1.5}\n.footer-utility-nav a+a{border-left:1px solid rgba(220,237,244,.35)}\n.footer-utility-nav a:hover,.footer-utility-nav a:focus-visible{color:#fff;text-decoration:underline;text-underline-offset:4px}\n.footer-lower .footer-registration-info{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:6px!important;grid-column:2!important;grid-row:1!important;padding:0!important;margin:0!important;border:0!important;text-align:center!important;opacity:1!important}\n.footer-registration-info-heading{display:none!important}\n.footer-lower .footer-registration-info-details{display:grid!important;gap:5px!important;width:100%!important;font-size:13px!important;line-height:1.7!important;color:#a9bdc6!important}\n.footer-registration-info-details .footer-registration-line{display:flex!important;flex-wrap:wrap!important;justify-content:center!important;gap:4px 12px!important;width:100%!important;text-align:center!important}\n.footer-registration-info-details .footer-registration-line>span{display:inline-block!important;width:auto!important;text-align:center!important}\n.footer-registration-line>span+span:before{content:\"|\";margin-right:12px;color:rgba(220,237,244,.4)}\n.footer-lower-tagline{text-align:right}\n@media(max-width:760px){\n .footer .footer-grid>div:first-child{margin-bottom:24px}\n .footer-category-nav{grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin-bottom:20px}\n .footer-category-nav a{min-height:40px;padding:6px 3px;font-size:11px}\n .footer-account-row{margin-bottom:20px}\n .footer-utility-nav{margin-bottom:24px}\n .footer-utility-nav a{padding:6px 10px}\n .footer-lower .footer-registration-info{grid-column:1!important;grid-row:auto!important;align-items:flex-start!important;text-align:left!important}\n .footer-registration-info-details .footer-registration-line{justify-content:flex-start!important;text-align:left!important}\n .footer-registration-info-details .footer-registration-line>span{text-align:left!important}\n .footer-lower-tagline{text-align:left}\n}\n@media(max-width:420px){.footer-category-nav{grid-template-columns:repeat(2,minmax(0,1fr))}}";
  document.head.appendChild(style);
})();
