'use strict';
// ===============================
// PERSONALIZATION — edit this section
// ===============================
const CONFIG = {
  // Automatic email delivery requires a separately authorized email service.
  emailDelivery: { sender: 'mukeshannaiya@gmail.com', recipient: 'suryanarayanan2410@gmail.com', attachmentOnly: true },
  girlfriendName: 'Ritthika Surya Narayanan',
  apologyText: [
    "Unnodu naan irundha ovvoru\nmaniththuliyum marakka mudiyadhadhum\nmarakkaadhu kanmaniye...",
    "Tholaindhadhu nimidangal\nthottanaitha kaalam dhaan...",
    "Ennenru aandugalaai\nidhayathil kanindhidum\npaarvaiyile sila nimidam...\nbayandhorum sila nimidam...",
    "Katti anaiththapadi kanmaniye\nsila nimidam...",
    "Imaikkaname paaraamal...\nmuththangal vinaindhadhu\nmohathil sila nimidam...",
    "**Unnodu naan irundha**\n**ovvoru maniththuliyum**\n**marakkaadhu kanmaniye...**"
],
  additionalPoems: [
    [
        "Nee en vaazhkaiyil kidaitha varam; un kaigaLaip pidiththukondu dhinamum un kaadhalai pesikkonde irukka vendum.",
        "Un kangalai paarkkum ovvoru nodiyum en idhayam thudikkiradhu. Nee kaattum chella thimirum, vetkamum ennai innum adhigamaaga unnai kaadhalikka vaikkiradhu.",
        "Unakkaaga ellaavatraiyum seiven. Unnai paarkkavum, unnudan kaikorththu nadakkavum, en vaazhnal muzhuvadhum unnai en nenjil sumandhu unnudan iruppen. ❤️"
    ],
    [
        "Nee en vaazhkaiyil vandha piragu, ellaame azhagaagivittadhu. ❤️",
        "Un sirippu en sandhosham, un ninaivu en ulagam.",
        "Dhooraththil irundhaalum, en manadhukku miga arugil iruppaval needhaan.",
        "Un kaiyai pidiththa andha nodi, vaazhkai muzhuvadhum unnudan irukka vendum endru thondriyadhu.",
        "Indha jenmam podhaadhu...",
        "Meendum pirandhaalum, en kaadhal needhaan. ❤️✨"
    ]
],
  finalApology: ["I'm not asking you to forget what happened.\nI'm asking you to believe that I'm genuinely sorry.", "I can't promise I'll never make a mistake again.\nBut I can promise that I'll try harder,\nlisten better,\ncommunicate better,\nand understand you better.", "You are important to me.\nAnd I'm really sorry for hurting you."],
  memories: [
    {"photo":"assets/photo1.jpg","caption":"Silly filters, my favorite company.","alt":"A selfie together with playful puppy ears and noses.","rotation":-90,"placeholder":"a moment to keep","motif":"♡"},
    {"photo":"assets/photo2.jpg","caption":"All dressed up, still our silly selves.","alt":"A smiling selfie with pink and gold clothing and a puppy filter.","rotation":-90,"placeholder":"a moment to keep","motif":"♡"},
    {"photo":"assets/photo3.jpg","caption":"Sunshine, silly faces, and you.","alt":"An outdoor selfie in the sunshine with a playful puppy filter.","rotation":0,"placeholder":"a moment to keep","motif":"♡"},
    {"photo":"assets/photo4.jpg","caption":"Little pink hearts, one big love.","alt":"A selfie together with pink hearts floating above our heads.","rotation":0,"placeholder":"a moment to keep","motif":"♡"},
    {"photo":"assets/photo5.jpg","caption":"A little blurry. Still a favorite.","alt":"A softly blurred selfie together with a pink heart filter.","rotation":90,"placeholder":"a moment to keep","motif":"♡"}
  ],
  coupons: [
    {id:'blooms',icon:'🌷',title:'FRESH BLOOMS',description:'Valid for 1 bouquet delivery\n+ unlimited forehead kisses 💕'},
    {id:'cuddles',icon:'🧸',title:'CUDDLE PASS',description:'Valid for unlimited hugs, cuddles & one no-drama day 🥰'},
    {id:'chocolate',icon:'🍫',title:'CHOCOLATE PASS',description:'One chocolate of your choice, because you deserve something sweet ❤️'},
    {id:'date',icon:'☕',title:'DATE PASS',description:'One date planned completely by me. You just have to show up ❤️'},
    {id:'listening',icon:'💌',title:'LISTENING PASS',description:'One conversation where I listen, without interrupting, defending myself, or trying to win.'},
    {id:'peace',icon:'🌙',title:'PEACE PASS',description:'One peaceful evening together, with no arguments and no ego.'}
  ],
  musicPath:'assets/romantic-music.mp3',
  meterMessages:['Please hear me out 🥺',"Okay... I know I'm asking a lot 😭", "I promise I'm trying...", "You're making my heart feel better ❤️",'Almost there 🥺❤️','MY HEART IS HEALED ❤️']
};
// ===============================
// EXPERIENCE
// ===============================
const $ = selector => document.querySelector(selector);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const storage = {
  read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  write(key,value) { try { localStorage.setItem(key,JSON.stringify(value)); return true; } catch { return false; } }
};
const make = (tag, className, text) => { const el=document.createElement(tag); if(className) el.className=className; if(text !== undefined) el.textContent=text; return el; };
document.querySelectorAll('[data-name]').forEach(el => el.textContent=CONFIG.girlfriendName);
document.title=`For ${CONFIG.girlfriendName}, with love`;
function paragraphs(target, lines) {
  lines.forEach(line => {
    const p = make('p');
    p.style.whiteSpace = 'pre-line';
    // Support **bold text** safely without interpreting HTML.
    line.split(/(\*\*[^*]+\*\*)/g).forEach(part => {
      p.append(part.startsWith('**') && part.endsWith('**')
        ? make('strong', '', part.slice(2, -2))
        : document.createTextNode(part));
    });
    target.append(p);
  });
}
[CONFIG.apologyText, ...CONFIG.additionalPoems].forEach((lines, index) => {
  const poem = make('section', 'poem');
  poem.setAttribute('aria-label', 'Poem ' + (index + 1));
  const opening = make('span', 'poem-quote', '“');
  const closing = make('span', 'poem-quote poem-quote-close', '”');
  poem.append(opening);
  paragraphs(poem, lines);
  poem.append(closing);
  $('#letter-body').append(poem);
});
paragraphs($('#final-apology'),CONFIG.finalApology);

// Intro is skippable; the rest of the page cannot take focus behind it.
const intro=$('#intro');
let introTimer;
const introBackground=[$('.site-header'),$('main'),$('footer')];
function finishIntro(){
  if(intro.hidden || intro.classList.contains('is-leaving')) return;
  clearTimeout(introTimer);intro.classList.add('is-leaving');
  introBackground.forEach(el=>el.inert=false);document.body.classList.remove('intro-open');
  $('.hero .primary').focus({preventScroll:true});
  setTimeout(()=>{intro.hidden=true;},reducedMotion.matches?0:700);
}
if(!location.hash){intro.hidden=false;document.body.classList.add('intro-open');introBackground.forEach(el=>el.inert=true);$('#skip-intro').focus({preventScroll:true});introTimer=setTimeout(finishIntro,reducedMotion.matches?2500:5200);}
$('#skip-intro').addEventListener('click',finishIntro);
intro.addEventListener('keydown',event=>{if(event.key==='Escape')finishIntro();if(event.key==='Tab'){event.preventDefault();$('#skip-intro').focus();}});
$('.skip-link').addEventListener('click',finishIntro);

// A bounded, reusable decoration layer; no animation work in reduced motion.
function burst(origin,celebrate=false){
  if(reducedMotion.matches) return;
  const rect=origin.getBoundingClientRect();
  for(let i=0;i<(celebrate?22:7);i++){
    if($('#heart-layer').childElementCount>=45)break;
    const particle=make('span',`floating-heart burst${celebrate && i%3===0?' confetti':''}`,celebrate && i%3===0?'':'♥');
    particle.style.left=`${rect.left+rect.width/2}px`;particle.style.top=`${rect.top+rect.height/2}px`;
    particle.style.setProperty('--x',`${(Math.random()-.5)*(celebrate?480:170)}px`);particle.style.setProperty('--y',`${-70-Math.random()*(celebrate?310:140)}px`);
    $('#heart-layer').append(particle);setTimeout(()=>particle.remove(),1400);
  }
}
setInterval(()=>{
  if(reducedMotion.matches || document.hidden || !intro.hidden || $('#heart-layer').childElementCount>=16)return;
  const heart=make('span','floating-heart','♡');heart.style.left=`${Math.random()*96}%`;heart.style.fontSize=`${12+Math.random()*14}px`;heart.style.setProperty('--duration',`${6+Math.random()*4}s`);$('#heart-layer').append(heart);setTimeout(()=>heart.remove(),10500);
},1800);

let memoryIndex=0;
const cards=CONFIG.memories.map((memory,index)=>{
  const card=make('article','memory-card');card.setAttribute('aria-roledescription','slide');card.setAttribute('aria-label',`${index+1} of ${CONFIG.memories.length}`);
  const photo=make('div','photo');const fallback=make('div','photo-fallback');fallback.append(make('span','motif',memory.motif),make('small','',memory.placeholder));
  const img=make('img');img.alt=memory.alt;img.style.transform=`rotate(${memory.rotation || 0}deg)`;img.hidden=true;img.draggable=false;img.addEventListener('load',()=>{img.hidden=false;fallback.hidden=true;});img.addEventListener('error',()=>{img.hidden=true;fallback.hidden=false;});img.src=memory.photo;
  photo.append(fallback,img);card.append(photo,make('p','memory-caption',memory.caption),make('span','memory-number',`A MOMENT TO KEEP · ${String(index+1).padStart(2,'0')}`));$('#memory-cards').append(card);return card;
});
function showMemory(index){memoryIndex=(index+cards.length)%cards.length;cards.forEach((card,i)=>{card.className=`memory-card ${i===memoryIndex?'is-active':i===(memoryIndex+1)%cards.length?'is-next':'is-hidden'}`;card.setAttribute('aria-hidden',String(i!==memoryIndex));});$('#memory-count').textContent=`${String(memoryIndex+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;}
showMemory(0);
$('#prev-memory').addEventListener('click',()=>showMemory(memoryIndex-1));$('#next-memory').addEventListener('click',()=>showMemory(memoryIndex+1));
const carousel=$('.carousel');
carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();showMemory(memoryIndex+(event.key==='ArrowRight'?1:-1));}});
let drag=null;
carousel.addEventListener('pointerdown',event=>{if(!event.isPrimary||event.button!==0)return;drag={x:event.clientX,y:event.clientY,id:event.pointerId};carousel.setPointerCapture(event.pointerId);});
carousel.addEventListener('pointerup',event=>{if(!drag||event.pointerId!==drag.id)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy))showMemory(memoryIndex+(dx<0?1:-1));drag=null;});
carousel.addEventListener('pointercancel',()=>drag=null);carousel.addEventListener('lostpointercapture',()=>drag=null);

let forgiveness=0;
$('#heal-heart').addEventListener('click',()=>{
  if(forgiveness===100)return;
  forgiveness=Math.min(100,forgiveness+20);$('#meter-value').textContent=`${forgiveness}% FORGIVEN`;$('#meter').setAttribute('aria-valuenow',forgiveness);$('#meter-fill').style.transform=`scaleX(${forgiveness/100})`;$('#meter-message').textContent=CONFIG.meterMessages[forgiveness/20];
  const button=$('#heal-heart');button.classList.remove('pulse');requestAnimationFrame(()=>button.classList.add('pulse'));burst(button,forgiveness===100);
  if(forgiveness===100){button.disabled=true;button.setAttribute('aria-label','Heart meter complete');$('#reset-meter').hidden=false;}
});
$('#reset-meter').addEventListener('click',()=>{
  forgiveness=0;
  $('#meter-value').textContent='0% FORGIVEN';
  $('#meter').setAttribute('aria-valuenow','0');
  $('#meter-fill').style.transform='scaleX(0)';
  $('#meter-message').textContent=CONFIG.meterMessages[0];
  $('#heal-heart').disabled=false;
  $('#heal-heart').classList.remove('pulse');
  $('#heal-heart').setAttribute('aria-label','Add 20 percent to the playful heart meter');
  $('#reset-meter').hidden=true;
  $('#heal-heart').focus({preventScroll:true});
});
const saved=storage.read('loveCoupons.redeemed.v2',[]);
const redeemed=new Set(Array.isArray(saved)?saved.filter(id=>typeof id==='string'):[]);
CONFIG.coupons.forEach((coupon,index)=>{
  const card=make('article','coupon');card.append(make('span','coupon-icon',coupon.icon),make('h3','',coupon.title),make('p','',coupon.description));
  const bottom=make('div','coupon-bottom');const button=make('button','redeem');button.type='button';
  function render(){const used=redeemed.has(coupon.id);button.textContent=used?'REDEEMED ❤️':'REDEEM ↗';button.disabled=used;button.setAttribute('aria-label',`${used?'Redeemed':'Redeem'} ${coupon.title.toLowerCase()}`);card.classList.toggle('redeemed',used);}
  render();button.addEventListener('click',()=>{redeemed.add(coupon.id);const persisted=storage.write('loveCoupons.redeemed.v2',[...redeemed]);render();burst(button);$('#coupon-status').textContent=persisted?`${coupon.title} redeemed. Saved on this device — tell me when you'd like to use it.`:`${coupon.title} redeemed for this visit. This browser couldn't save it for next time.`;});
  bottom.append(make('small','',`WITH LOVE / ${String(index+1).padStart(2,'0')}`),button);card.append(bottom);$('#coupons-grid').append(card);
});
let selectedAnswer = null;
function answer(yes){selectedAnswer = yes;const box=$('#answer');box.replaceChildren(make('strong','',yes?`Thank you, ${CONFIG.girlfriendName}. ❤️`:'I understand. ❤️'),make('span','',yes?"I'll make sure my actions say sorry too.":"Take all the time you need.\nI just wanted you to know that\nI'm genuinely sorry."));if(yes)burst($('#yes'),true);box.focus({preventScroll:true});}
$('#yes').addEventListener('click',()=>answer(true));$('#not-yet').addEventListener('click',()=>answer(false));

const audio=$('#music');
audio.src=CONFIG.musicPath;audio.volume=.45;audio.loop=true;audio.muted=false;

function playMusic(){
  if(!audio.src) return;
  audio.muted=false;
  const result = audio.play();
  if(result && typeof result.catch === 'function') result.catch(() => {});
}

function unlockMusic(){
  audio.muted = false;
  playMusic();
}

audio.addEventListener('error', () => {
  audio.muted = false;
});

['pointerdown','touchstart','keydown','click','scroll'].forEach(eventName => {
  document.addEventListener(eventName, unlockMusic, { once: true, passive: true });
});

window.addEventListener('load',()=>{
  setTimeout(() => {
    if(audio.paused) playMusic();
  }, 700);
}, { once: true });

if('IntersectionObserver' in window && !reducedMotion.matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('pending');observer.observe(el);});}

let marriageSelectedAnswer = null;
function answerMarriage(yes){
  marriageSelectedAnswer = yes;
  const box=$('#marry-answer');
  const dateText = '08-12-2029';
  box.replaceChildren(
    make('strong','',yes?`Forever sounds perfect, ${CONFIG.girlfriendName}. 💍`:'I understand. ❤️'),
    make('span','',yes?`I want to build a life with you, one beautiful day at a time.\nDate: ${dateText}`:"Take all the time you need.\nI only wanted to ask with my whole heart."));
  if(yes)burst($('#marry-yes'),true);
  box.focus({preventScroll:true});
}

const marriageNoButton = $('#marry-not-yet');
function dodgeMarriageNoButton(){
  if(!marriageNoButton) return;
  const parent = marriageNoButton.parentElement;
  if(!parent) return;
  parent.style.position = 'relative';
  parent.style.minHeight = '110px';
  marriageNoButton.style.position = 'absolute';
  const maxX = Math.max(10, parent.clientWidth - marriageNoButton.offsetWidth - 18);
  const maxY = Math.max(10, parent.clientHeight - marriageNoButton.offsetHeight - 18);
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  marriageNoButton.style.left = `${x}px`;
  marriageNoButton.style.top = `${y}px`;
  marriageNoButton.style.transform = 'none';
}
marriageNoButton.addEventListener('pointerenter', dodgeMarriageNoButton);
marriageNoButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  dodgeMarriageNoButton();
});
marriageNoButton.addEventListener('focus', dodgeMarriageNoButton);
$('#marry-yes').addEventListener('click',()=>answerMarriage(true));

