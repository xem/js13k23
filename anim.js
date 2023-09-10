animation = 0;

// Cannon
anim1 = () => {
  sound(fiou);
  animation = 1;
  room20();
  r2099.style.transformOrigin = "250px 150px";
  r2099.style.transition = ".7s all linear";
  
  setTimeout('C.move({n:"r2099",x:-200,rz:100,z:30})',100);
  
  // Window 2-0 open
  if(s.r20pf){
    setTimeout(room41,800);
    
    
    // Wolf
    if(s.day >= 790 && (s.day % 8) == 4 && s.r40c < 300 && s.r40c > 60 && !s.r41v){
      setTimeout('r2099.style.transition=".5s all";C.move({n:"r2099",x:-155,y:65})',900);
      setTimeout('r2099.style.transition="1s all";C.move({n:"r2099",x:-280,y:185});C.move({n:"ww",x:5,y:165,z:50,rx:65,rz:75,sx:.2,sy:.2})',1410);
      setTimeout('ww.style.opacity=0;s.r41v=1;',2000);
      setTimeout('C.move({n:"key",y:0});',2500);
      setTimeout(fadeout,5500);
      setTimeout('s.r41w=s.r41y=1;room01();fadein();animation=0;save()',6000);
    }
    else {
      setTimeout('r2099.style.transition=".5s all";C.move({n:"r2099",x:-80,y:185})',900);
      setTimeout('r2099.style.transition="2s all";C.move({n:"r2099",x:55,y:185})',1410);
      setTimeout(fadeout,5000);
      setTimeout('s.r41y=1;room01();fadein();animation=0;save()',5500);
    }
  }
  
  // 2-0 closed
  else {
    
    setTimeout('r2099.style.transition=".3s all";C.move({n:"r2099",x:-310,y:115,rz:100,z:30})',800);
    setTimeout(fadeout,2500);
    setTimeout('s.r20g=0;room01();fadein();animation=0;save()',3000);
  }
}


// BOOKS
book00 = (i,j) => {
  i=0,j=0;
  sound(paper);
  bookcover.innerHTML = "The big book of inventions"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "Things invented so far:<br>Castles<br>Cannons<br>Clocks<br>Telescopes<br>Books<br>...<br><br>Coming soon:<br>Electricity<br>Microwaves<br>Nuclear fission<br>JavaScript<br>..."
  bookcover.className = "";
}

book11 = (i,j) => {
  i=1,j=1;
  sound(paper);
  bookcover.innerHTML = "King's diary"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "Dear diary,<br><br>Last night the moon was very bright.<br>A wild beast attacked me<br>in the woods.<br>It swallowed the key of my castle.<br>I managed to capture it,<br>but I need to find a way to get<br>my key back...<br><br>Also, my drawbridge mechanism<br>is broken!<br><br>- King Andrzej";
  bookcover.className = "";
}

book20 = (i,j) => {
  i=2,j=0;
  sound(paper);
  bookcover.innerHTML = "How Arthur Became King"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "Knight Arthur,<br>On the stone saw the sword,<br>Nudged twice up, twice down,<br>And twice on both sides,<br>Making him the king,<br>In the land of Britain<br><br><br><br><br><br>"
  bookcover.className = "";
}

book01 = (i,j) => {
  i=0,j=1;
  sound(paper);
  bookcover.innerHTML = "Decoding shields"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "I've been told that<br>symbols must be read<br>from top to bottom<br>while colors are read<br>from left to right."
  bookcover.className = "";
}


book02 = (i,j) => {
  i=0,j=2;
  sound(paper);
  bookcover.innerHTML = "Map of the castle"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML += "<br><br><br><br><br><br><br>Thou are here";
  C.plane({g:"book",html:svgplan,x:40,y:-200,sx:1.5,sy:1.5,css:"plan"});
  bookcover.className = "";
}

book13 = (i,j) => {
  i=1,j=3;
  sound(paper);
  bookcover.innerHTML = "The gears of power"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = `I guess they look like this:`
  if(!s.b13b) C.plane({g:"book",html:"⚙️",x:10,y:100,css:"gear",cl:"b13a"});
  bookcover.className = "";
}

//b13b = 0;
b13a = () => {
  add_inv("gear");
  s.b13b = 1;
}

book22 = (i,j) => {
  i=2,j=2;
  sound(paper);
  bookcover.innerHTML = "Phases of the moon"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "In this magical world,<br>a moon cycle is 8 days long.<br><br>🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌑 <br>new ------------- full ------------ new<br><br>(Actually, it's because there<br>aren't more moon emoji than that)"
  bookcover.className = "";
}

book23 = (i,j) => {
  i=2,j=3;
  sound(paper);
  bookcover.innerHTML = "How to turn your dragon"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  C.plane({g:"book",w:50,h:50,html:"🐉️",x:50,y:30+30-5,css:"dragon",o:"20px 20px"});
  C.plane({g:"book",w:50,h:50,html:"🐉️",x:70,y:30+70-8,rz:-90,css:"dragon",o:"20px 20px"});
  C.plane({g:"book",w:50,h:50,html:"🐉️",x:50,y:30+30+110-11,rz:0,css:"dragon",o:"20px 20px"});
  C.plane({g:"book",w:50,h:50,html:"🐉️",x:30,y:30+30+150-14,rz:90,css:"dragon",o:"20px 20px"});
  C.plane({g:"book",w:50,h:50,html:"🐉️",x:50,y:30+30+190-17,rz:180,css:"dragon",o:"20px 20px"});
  C.plane({g:"book",w:50,h:50,html:"🐉️",x:70,y:30+30+60+230-23,rz:270,css:"dragon",o:"20px 20px"});
  C.plane({g:"book",w:50,h:50,html:"🐉️",x:50,y:30+30+60+270-26,rz:180,css:"dragon",o:"20px 20px"});
  C.plane({g:"book",w:50,h:50,html:"🐉️",x:70,y:30+30+60+350-29,rz:270,css:"dragon",o:"20px 20px"});
  bookcover.className = "";
}

title = () => {
  C.plane({w:1100,x:100,y:-100-1000,html:"<h1>CASTLE &nbsp;  &nbsp; ESCAPE"});
  C.plane({w:1100,x:100,y:30-1000,html:"<h2>New game",cl:"ng"});
  if(localStorage.castleescape) { 
    C.plane({w:1100,x:100,y:85-1000,html:"<h2>Continue",cl:"cg"});
    C.plane({w:1100,x:100,y:140-1000,html:"<h2>Best scores",cl:"bs"});
    }
  setTimeout('scene.style.transition="2s all";scene.style.transform="translateY(1000px)translateZ(0)"',500);
}

// new game
ng = () => {
  s = {inv:[],r40c:300,r40d:300,day:801,clicks:0,time:0};
  scene.style.transform="translateY(0)";
  setTimeout(()=> {
    room00();
  },550);
  setTimeout(()=> {
    inventory.style.opacity=1;
    mute.style.opacity=1;
    scene.style.transform="";
  },2000);
  draw_inv();
  /*song();
  bass();
  AA=setInterval(song,8200);
  BB=setInterval(bass,8200);*/
  setInterval("s.time++;save()",1000);
}

// continue game
cg = () => {
  s = JSON.parse(localStorage.castleescape);
  scene.style.transform="translateY(0)";
  setTimeout(()=> {
    room00();
  },550);
  setTimeout(()=> {
    inventory.style.opacity=1;
    mute.style.opacity=1;
    scene.style.transform="";
  },2000);
  draw_inv();
  /*song();
  bass();
  AA=setInterval(song,8200);
  BB=setInterval(bass,8200);*/
  setInterval("s.time++;save()",1000);
}

bs = () => {
  alert("todo");
}


muted = 1;
stop = () => {
  muted = 1-muted;
  mute.innerHTML = ["🔇","🔊"][muted];
  if(muted){
    A.close();
    B.close();
    clearInterval(AA);
    clearInterval(BB);
  }
  else {
    song();
    bass();
    AA=setInterval(song,8200);
    BB=setInterval(bass,8200);
  }
}


song = (G,D,i) => {
  with(A = new AudioContext)
  with(G=createGain())
  for(i in D=[22,,15,,22,,20,,,,20,18,17,,,,18,20,18,,,22,,,22,,15,,22,,20,,,,20,22,24,,,,,22,20,22])
  with(createOscillator())
  if(D[i])
  connect(G),
  G.connect(destination),
  start(i*.17),
  frequency.setValueAtTime(400*1.06**(13-D[i]),i*.17),type='triangle',
  gain.setValueAtTime(.02,i*.17),
  gain.setTargetAtTime(.0001,i*.17+.12,.005),
  stop(i*.17+.16)
}

bass = (G,D,i) => {
  with(B = new AudioContext)
  with(G=createGain())
  for(i in D=[22,,,22,22,22,22,,,22,,,22,,,22,22,22,22,,,22,,,22,,,22,22,22,22,,,22,,,22,,22,22,22,22,,,22])
  with(createOscillator())
  if(D[i])
  connect(G),
  G.connect(destination),
  start(i*.17),
  frequency.setValueAtTime(100*1.06**(13-D[i]),i*.17),type='triangle',
  gain.setValueAtTime(.05,i*.17),
  gain.setTargetAtTime(.0001,i*.17+.10,.005),
  stop(i*.17+.16)
}

// Sounds

t=(i,n)=>(n-i)/n;

nudge = function(i){
  var n=6e3;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.01*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q/4;
}

lock = function(i){
  var n=8e3;
  if (i > n) return null;
  return ((Math.pow(Math.pow(i,0.9)+Math.sin(i*1.06)*1000,0.8)&200)?0.5:-0.5)*Math.pow(t(i,n),1);
}

paper = function(i){
  var n=2e4-9000;
  if (i > n) return null;
  var q = t(i+10000,n);
  return Math.sin(-i*0.03*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))*q;
}

burn = function(i){
  var n=30e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(-i*0.03*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))/q/(i>5e4?i/8e3:5);
}

miniburn = function(i){
  var n=3e4;
  if (i > n) return null;
  var q = t(3e4-i,n);
  return Math.sin(-i*0.03*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))/q/(i>5e4?i/8e3:5)/2;
}

wand = function(i){
  var n=5e4;
  var n1=1e5;
  if (i > n) return null;
  i=Math.pow(i,1.2-Math.sin(i*2/n1))*6;
  var x=Math.sin(i/30+Math.sin(i/1500));
  return Math.pow(x,9)*t(i,n);
}

sword = function(i){
  var n=15e3;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.001*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q;
}

downbridge = function(i){
  var n=60e4;
  if (i > n) return null;
  return ((Math.pow(i+Math.sin(i*0.001)*1000,0.8)&200)?0.5:-0.5)*Math.pow(t(i,n),1);
}

cannonfire = function(i){
  var n=4e4;
  if (i > n) return null;
  return Math.sin(i/200 - Math.sin(i/331)*Math.sin(i/61) + Math.sin(Math.sin(i/59)/39) * 33)*t(i,n)*9;
}

fiou = function(i){
  var n=5e4;
  if (i > n) return null;
  var q = t(i,n);
  i=i*0.7;
  return (Math.pow(i*50,0.8)&34)?q:-q;
}

dooropen = function(i){
  var n=3e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.001*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q;
}


// Sound player
sound = (f,t,A,s,m,b) => {
  
  A=new AudioContext()
  m=A.createBuffer(1,96e3,48e3)
  b=m.getChannelData(0)
  for(i=96e3;i--;)b[i]=f(i)
  s=A.createBufferSource()
  s.buffer=m
  s.connect(A.destination)
  s.start()
}