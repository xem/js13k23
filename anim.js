animation = 0;

// Cannon
anim1 = () => {
  animation = 1;
  room20();
  r2099.style.transformOrigin = "250px 150px";
  r2099.style.transition = ".7s all linear";
  
  setTimeout('C.move({n:"r2099",x:-200,rz:100,z:30})',100);
  
  // Window 2-0 open
  if(r20pf){
    setTimeout(room41,800);
    
    // Wolf
    if((day % 8) == 4 && r40c < 300 && r40c > 60 && !r41v){
      setTimeout('r2099.style.transition=".5s all";C.move({n:"r2099",x:-155,y:65})',900);
      setTimeout('r2099.style.transition="1s all";C.move({n:"r2099",x:-280,y:185});C.move({n:"ww",x:5,y:165,z:50,rx:65,rz:75,sx:2,sy:2})',1410);
      setTimeout('ww.style.opacity=0;r41v=1;',2000);
      setTimeout('C.move({n:"key",y:0});',2500);
      setTimeout(fadeout,5500);
      setTimeout('r41w=r41y=1;room01();fadein();animation=0',6000);
    }
    else {
      setTimeout('r2099.style.transition=".5s all";C.move({n:"r2099",x:-80,y:185})',900);
      setTimeout('r2099.style.transition="2s all";C.move({n:"r2099",x:55,y:185})',1410);
      setTimeout(fadeout,5000);
      setTimeout('r41y=1;room01();fadein();animation=0',5500);
    }
  }
  
  else {
    
    setTimeout('r2099.style.transition=".3s all";C.move({n:"r2099",x:-310,y:115,rz:100,z:30})',800);
    setTimeout(fadeout,2500);
    setTimeout('r20g=0;room01();fadein();animation=0',3000);
  }
}


// BOOKS
book00 = (i,j) => {
  i=0,j=0;
  bookcover.innerHTML = "The big book of inventions"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "Things invented so far:<br>Castles<br>Cannons<br>Clocks<br>Telescopes<br>Books<br>...<br><br>Coming soon:<br>Electricity<br>Microwaves<br>Nuclear fission<br>JavaScript<br>..."
  bookcover.className = "";
}

book10 = (i,j) => {
  i=1,j=0;
  bookcover.innerHTML = "King's diary"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "Dear diary,<br><br>A wild beast attacked me today.<br>It swallowed the key of my castle.<br>I managed to capture it,<br>but I need to find a way to get<br>my key back...<br><br>Also, my drawbridge mechanism<br>is broken!<br><br>- King Andrzej";
  bookcover.className = "";
}

book20 = () => {
  i=2,j=0;
  bookcover.innerHTML = "How Arthur Became King"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "Knight Arthur,<br>On the stone saw the sword,<br>Nudged twice up, twice down,<br>And twice on both sides,<br>Making him the king,<br>In the land of Britain<br><br><br><br><br><br>"
  bookcover.className = "";
}

book11 = () => {
  i=1,j=1;
  bookcover.innerHTML = "Horse Jokes"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = `Sir 1: why did you call your<br>horse "Mayo" ?<br>Sir 2: You'll see...<br>Mayo: *neighs*<br><br>~~~<br><br>On which side does a horse<br>have the most hair?<br>The outside<br><br>~~~<br><br>How to get a horse to sleep?<br>Tell him "it's pasture bedtime"`
  bookcover.className = "";
}

book01 = () => {
  i=0,j=1;
  bookcover.innerHTML = "Decoding shields"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "I've been told that<br>symbols must be read<br>from top to bottom<br>while colors are read<br>from left to right."
  bookcover.className = "";
}


book02 = () => {
  i=0,j=2;
  bookcover.innerHTML = "Map of the castle"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML += "<br><br><br><br><br><br><br>Thou are here";
  C.plane({g:"book",html:svgplan,x:40,y:-200,sx:1.5,sy:1.5,css:"plan"});
  bookcover.className = "";
}

book13 = () => {
  i=1,j=3;
  bookcover.innerHTML = "The gears of power"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = `I guess they look like this:`
  if(!b13b) C.plane({g:"book",html:"⚙️",x:10,y:100,css:"gear",cl:"b13a"});
  bookcover.className = "";
}

b13b = 0;
b13a = () => {
  add_inv("gear");
  b13b = 1;
}

book22 = () => {
  i=2,j=2;
  bookcover.innerHTML = "Phases of the moon"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "In this magical world,<br>a moon cycle is 8 days long.<br><br>🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌑 <br>new ------------- full ------------ new<br><br>(Actually, it's because there<br>aren't more moon emoji than that)"
  bookcover.className = "";
}

book23 = () => {
  i=2,j=3;
  bookcover.innerHTML = "Drag on"
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