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
      setTimeout('ww.style.opacity=0;s.r41v=1',2000);
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
  C.plane({w:1100,x:100,y:-100-1050,html:"<h1>CASTLE &nbsp;  &nbsp; ESCAPE"});
  C.plane({w:1100,x:100,y:30-1050,html:"<h2>New game",cl:"ng"});
  if(localStorage.castleescape) { 
    C.plane({w:1100,x:100,y:85-1050,html:"<h2>Continue",cl:"cg"});
    C.plane({w:1100,x:100,y:140-1050,html:"<h2>Best scores",cl:"bs"});
    }
  setTimeout('scene.style.transition="2s all";scene.style.transform="translateY(1000px)translateZ(0)"',500);
}

// new game
ng = () => {
  s = {inv:[],r40c:300,r40d:300,day:801,clicks:0,time:0};
  stop();
  inventory.style.display="block";
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
  setInterval("s.time++;save()",1000);
}

// continue game
cg = () => {
  s = JSON.parse(localStorage.castleescape);
  stop();
  inventory.style.display="block";
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
  setInterval("s.time++;save()",1000);
}

bs = () => {
  window.open("//xem.github.io/js13k23/leaderboards/");
}


muted = 1;
stop = (A) => {
  muted = 1 - muted;
  mute.innerHTML = ["🔊","🔇"][muted];
  if(muted){
    for(A of acs){ if(A.state != "closed") A.close() }
    clearInterval(AA);
  }
  else {
    song();
    AA=setInterval(song,26600);
  }
}

acs=[];
song = (G,D,i,O,a,s,A) => {
  a=(notes,center,duration,decaystart,decayduration,interval,volume,waveform,i)=>{
    with(A=new AudioContext){
      acs.push(A);
      with(G=createGain())
        for(i of notes){
          with(O=createOscillator()){
            connect(G),
            G.connect(destination),
            start(i[0]*interval),
            frequency.setValueAtTime(center*1.06**(13-i[1]),i[0]*interval),
            type=waveform,
            gain.setValueAtTime(volume,i[0]*interval),
            gain.setTargetAtTime(1e-5,i[0]*interval+decaystart,decayduration),
            stop(i[0]*interval+duration);
          }
       }
    }
  }
  
  a([[0,21],[4,21],[2,14],[6,19],[10,19],[11,17],[12,16],[16,17],[17,19],[18,17],[21,21],[24,21],[26,14],[28,21],[30,19],[34,19],[35,21],[36,23],[41,19],[42,21],[40,21],[48,21],[48,9],[50,14],[52,9],[54,11],[57,12],[60,14],[62,21],[64,14],[66,16],[69,17],[72,17],[74,16],[76,14],[78,11],[81,12],[84,14],[86,17],[88,21],[90,19],[96,21],[98,21],[101,21],[102,21],[100,21],[108,21],[110,21],[112,21],[113,21],[114,21],[108,19],[110,19],[113,19],[114,19],[112,19],[120,21],[122,21],[124,21],[125,21],[126,21],[120,19],[122,19],[124,19],[125,19],[126,19],[120,16],[122,16],[125,16],[124,16],[126,16],[132,21],[134,21],[136,21],[137,21],[138,21],[132,19],[134,19],[136,19],[138,19],[137,19],[132,16],[136,16],[137,16],[134,16],[138,16],[132,14],[134,14],[136,14],[138,14],[137,14],[144,21],[146,21],[148,21],[149,21],[150,21],[144,19],[146,19],[148,19],[149,19],[150,19],[144,16]],400,.16,.1,.05,.17,.02,'triangle');
  a([[0,21],[4,21],[5,21],[6,21],[9,21],[12,21],[15,21],[16,21],[17,21],[18,21],[21,21],[24,21],[27,21],[28,21],[29,21],[30,21],[33,21],[36,21],[39,21],[40,21],[41,21],[42,21],[45,21],[48,21],[51,21],[52,21],[53,21],[54,21],[57,21],[60,21],[63,21],[64,21],[65,21],[66,21],[69,21],[72,21],[75,21],[76,21],[77,21],[78,21],[81,21],[84,21],[87,21],[88,21],[89,21],[90,21],[93,21],[96,21],[99,21],[100,21],[101,21],[102,21],[105,21],[108,21],[111,21],[112,21],[113,21],[114,21],[117,21],[120,21],[123,21],[124,21],[125,21],[126,21],[129,21],[132,21],[135,21],[137,21],[136,21],[138,21],[141,21],[144,21],[147,21],[148,21],[149,21],[150,21],[153,21],[3,21]],135,.11,.05,.05,.17,.05,'triangle');
  a([[0,9],[12,9],[0,14],[12,14],[24,9],[24,14],[36,9],[36,14],[0,2],[12,2],[36,2],[24,2]],100,.5,.1,.3,.17,.05,'triangle');

}

// Sounds

t=(i,n)=>(n-i)/n;

nudge = function(i){
  var n=6e3;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.01*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q/15;
}

lock = function(i){
  var n=8e3;
  if (i > n) return null;
  return (((Math.pow(Math.pow(i,0.9)+Math.sin(i*1.06)*1000,0.8)&200)?0.5:-0.5)*Math.pow(t(i,n),1))/2;
}

paper = function(i){
  var n=2e4-9000;
  if (i > n) return null;
  var q = t(i+10000,n);
  return Math.sin(-i*0.03*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))*q/15;
}

burn = function(i){
  var n=30e4;
  if (i > n) return null;
  var q = t(i,n);
  return (Math.sin(-i*0.03*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))/q/(i>5e4?i/8e3:5))/9;
}

miniburn = function(i){
  var n=3e4;
  if (i > n) return null;
  var q = t(3e4-i,n);
  return Math.sin(-i*0.03*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))/q/(i>5e4?i/8e3:5)/15;
}

wand = function(i){
  var n=5e4;
  var n1=1e5;
  if (i > n) return null;
  i=Math.pow(i,1.2-Math.sin(i*2/n1))*6;
  var x=Math.sin(i/30+Math.sin(i/1500));
  return Math.pow(x,9)*t(i,n)/9;
}

sword = function(i){
  var n=15e3;
  if (i > n) return null;
  var q = t(i,n);
  return (Math.sin(i*0.001*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q)/9;
}

downbridge = function(i){
  var n=60e4;
  if (i > n) return null;
  return (((Math.pow(i+Math.sin(i*0.001)*1000,0.8)&200)?0.5:-0.5)*Math.pow(t(i,n),1))/9;
}

cannonfire = function(i){
  var n=4e4;
  if (i > n) return null;
  return (Math.sin(i/200 - Math.sin(i/331)*Math.sin(i/61) + Math.sin(Math.sin(i/59)/39) * 33)*t(i,n)*9)/2;
}

fiou = function(i){
  var n=5e4;
  if (i > n) return null;
  var q = t(i,n);
  i=i*0.7;
  return (Math.pow(i*50,0.8)&34)?q/9:-q/9;
}

dooropen = function(i){
  var n=3e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.001*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q/9;
}

step = function(i){
  var n=3800;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.01*Math.sin(0.001*i+Math.sin(i/200))+Math.sin(i/200))*q*q/9;
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