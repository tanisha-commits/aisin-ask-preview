const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.primary-nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Open navigation':'Close navigation');nav.classList.toggle('is-open',!open);document.body.classList.toggle('menu-open',!open)});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('is-open');document.body.classList.remove('menu-open');menuButton?.setAttribute('aria-expanded','false')}));

const navTriggers=[...document.querySelectorAll('.nav-trigger')];
const megaPanels=[...document.querySelectorAll('.mega-panel')];
const closeMegaNavigation=()=>{navTriggers.forEach(trigger=>trigger.setAttribute('aria-expanded','false'));megaPanels.forEach(panel=>panel.classList.remove('is-open'))};
navTriggers.forEach(trigger=>trigger.addEventListener('click',event=>{
  if(window.innerWidth<=900){const destination=trigger.dataset.nav==='products'?'#products':'#about';document.querySelector(destination)?.scrollIntoView({behavior:'smooth'});nav?.classList.remove('is-open');document.body.classList.remove('menu-open');menuButton?.setAttribute('aria-expanded','false');return}
  event.stopPropagation();
  const panel=document.querySelector(`[data-panel="${trigger.dataset.nav}"]`);
  const willOpen=trigger.getAttribute('aria-expanded')!=='true';
  closeMegaNavigation();
  if(willOpen){trigger.setAttribute('aria-expanded','true');panel?.classList.add('is-open')}
}));
let megaCloseTimer;
navTriggers.forEach(trigger=>{
  const openFromHover=()=>{if(window.innerWidth<=900)return;window.clearTimeout(megaCloseTimer);closeMegaNavigation();trigger.setAttribute('aria-expanded','true');document.querySelector(`[data-panel="${trigger.dataset.nav}"]`)?.classList.add('is-open')};
  trigger.addEventListener('mouseenter',openFromHover);
  trigger.addEventListener('focus',openFromHover);
});
document.querySelector('.site-header')?.addEventListener('mouseleave',()=>{megaCloseTimer=window.setTimeout(closeMegaNavigation,120)});
megaPanels.forEach(panel=>panel.addEventListener('mouseenter',()=>window.clearTimeout(megaCloseTimer)));
megaPanels.forEach(panel=>panel.addEventListener('click',event=>event.stopPropagation()));
document.addEventListener('click',closeMegaNavigation);
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const active=navTriggers.find(trigger=>trigger.getAttribute('aria-expanded')==='true');closeMegaNavigation();active?.focus()}});

const explorer=document.querySelector('[data-product-explorer]');
if(explorer){const tabs=[...explorer.querySelectorAll('[role="tab"]')];const image=explorer.querySelector('[data-product-image]');const name=explorer.querySelector('[data-product-name]');const copy=explorer.querySelector('[data-product-copy]');const activate=tab=>{tabs.forEach(item=>{const active=item===tab;item.classList.toggle('is-active',active);item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1});image.classList.add('is-changing');window.setTimeout(()=>{image.src=tab.dataset.image;image.alt=tab.dataset.alt;name.textContent=tab.dataset.name;copy.textContent=tab.dataset.copy;image.classList.remove('is-changing')},160)};tabs.forEach((tab,index)=>{tab.tabIndex=index===0?0:-1;tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;tabs[next].focus();activate(tabs[next])})})}

const form=document.querySelector('.contact form');
form?.addEventListener('submit',async event=>{event.preventDefault();const status=form.querySelector('.form-status');if(!form.checkValidity()){form.reportValidity();status.textContent='Please complete the required fields.';return}const data=new FormData(form);const summary=`AISIN ASK enquiry\nName: ${data.get('name')}\nCompany: ${data.get('company')||'Not provided'}\nPhone or email: ${data.get('contact')}\nEnquiry type: ${data.get('type')}`;try{await navigator.clipboard.writeText(summary);status.textContent='Enquiry summary copied. Paste it into your approved AISIN ASK contact channel.'}catch{status.textContent=summary}});

if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-ready');const sections=[...document.querySelectorAll('main>section:not(.hero)')];sections.forEach(section=>section.classList.add('section-reveal'));const items=[...document.querySelectorAll('.section-reveal,[data-reveal],.range-list article')];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.1,rootMargin:'0px 0px -6%'});items.forEach(item=>observer.observe(item))}

const heroVideo=document.querySelector('.hero video');
if(heroVideo){const videoObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!document.hidden)heroVideo.play().catch(()=>{});else heroVideo.pause()},{threshold:.1});videoObserver.observe(heroVideo);document.addEventListener('visibilitychange',()=>{if(document.hidden)heroVideo.pause();else if(heroVideo.getBoundingClientRect().bottom>0)heroVideo.play().catch(()=>{})})}

const about=document.querySelector('[data-about]');
if(about){const tabs=[...about.querySelectorAll('[data-about-tab]')];const image=about.querySelector('[data-about-image]');tabs.forEach((tab,index)=>{tab.tabIndex=index? -1:0;tab.addEventListener('click',()=>{tabs.forEach(item=>{item.setAttribute('aria-selected',String(item===tab));item.tabIndex=item===tab?0:-1});image.classList.add('is-changing');window.setTimeout(()=>{image.src=tab.dataset.image;image.alt=tab.dataset.alt;image.classList.remove('is-changing')},160);about.querySelector('[data-about-fact-one]').textContent=tab.dataset.one;about.querySelector('[data-about-detail-one]').textContent=tab.dataset.detailOne;about.querySelector('[data-about-fact-two]').textContent=tab.dataset.two;about.querySelector('[data-about-detail-two]').textContent=tab.dataset.detailTwo;about.querySelector('[data-about-caption]').textContent=tab.dataset.caption});tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();const next=tabs[(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];next.focus();next.click()})})}

const news=document.querySelector('[data-news]');
if(news){const viewport=news.querySelector('.news-viewport');const cards=[...news.querySelectorAll('.news-card')];const step=direction=>{const distance=cards[0].getBoundingClientRect().width+16;const atEnd=viewport.scrollLeft+viewport.clientWidth>=viewport.scrollWidth-distance/2;const atStart=viewport.scrollLeft<=distance/2;if(direction>0&&atEnd)viewport.scrollTo({left:0,behavior:'smooth'});else if(direction<0&&atStart)viewport.scrollTo({left:viewport.scrollWidth,behavior:'smooth'});else viewport.scrollBy({left:distance*direction,behavior:'smooth'})};news.querySelector('[data-news-next]').addEventListener('click',()=>step(1));news.querySelector('[data-news-prev]').addEventListener('click',()=>step(-1));let timer;const start=()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.hidden||timer)return;timer=setInterval(()=>step(1),30000)};const stop=()=>{clearInterval(timer);timer=null};news.addEventListener('mouseenter',stop);news.addEventListener('mouseleave',start);news.addEventListener('focusin',stop);news.addEventListener('focusout',event=>{if(!news.contains(event.relatedTarget))start()});document.addEventListener('visibilitychange',()=>document.hidden?stop():start());const observer=new IntersectionObserver(entries=>{entries[0].isIntersecting?start():stop()},{threshold:.2});observer.observe(news)}

const resourceHover=document.querySelector('[data-resource-hover]');
if(resourceHover&&resourceHover.querySelector('.resource-hover-media img')){const media=resourceHover.querySelector('.resource-hover-media');const image=media.querySelector('img');resourceHover.querySelectorAll('.resource-list a').forEach(link=>{const show=()=>{image.src=link.dataset.image;media.classList.add('is-visible')};link.addEventListener('mouseenter',show);link.addEventListener('focus',show);link.addEventListener('mouseleave',()=>media.classList.remove('is-visible'));link.addEventListener('blur',()=>media.classList.remove('is-visible'))})}

const siteLoader=document.querySelector('.site-loader');
const revealSite=()=>{document.body.classList.remove('is-loading');siteLoader?.classList.add('is-complete');window.setTimeout(()=>siteLoader?.remove(),320)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>window.setTimeout(revealSite,120),{once:true});else window.setTimeout(revealSite,120);
