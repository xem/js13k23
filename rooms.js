// Debug
debug = 1;

fadeout = () => { fo.style.opacity = 1; }
fadein = () => { fo.style.opacity = 0; }

// Inventory
inv = [];
using = -1; // using an inventory item
usingstr = ""; // using an inventory item (string)
add_inv = n => {
  if(!inv.includes(n)){
    inv.push(n);
  }
  draw_inv();
}

rem_inv = n => {
  use(n);
  inv = inv.filter(i => i != n);
  draw_inv();
}

draw_inv = () => {
  for(i = 0; i < 12; i++){
    self["i"+i].innerHTML = "";
    if(inv[i] == "hanger"){
      C.plane({g:"i"+i,x:10,y:20,html:svghanger,css:"hanger",on:"",sx:2,sy:2});
    }
    else if(inv[i] == "telescope"){
      C.plane({g:"i"+i,x:20,y:35,html:"🔭",css:"telescope",on:""});
    }
    else if(inv[i] == "torch"){
      C.plane({g:"i"+i,x:40,y:15,w:40,h:30,html:svgtorch,css:"torch",on:""});
    }
    else if(inv[i] == "lit torch"){
      C.plane({g:"i"+i,x:40,y:15,w:40,h:30,html:svgtorch,css:"lit torch",on:""});
      C.plane({g:"i"+i,x:50,y:25,z:2,w:30,h:30,html:"🔥",css:"fire",on:"",sx:.5,sy:.5});
    }
    else if(inv[i] == "hammer"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🔨",css:"hammer",on:""});
    }
    else if(inv[i] == "wood"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🪵",css:"wood",on:""});
    }
    else if(inv[i] == "boulder"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"⬤",css:"boulder",on:""});
    }
    else if(inv[i] == "mouse"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🐁",css:"mouse",on:""});
    }
    else if(inv[i] == "soup"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🍲",css:"soup",on:""});
    }
    else if(inv[i] == "hot soup"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🍲",css:"hot soup",on:""});
    }
    else if(inv[i] == "crown"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"👑",css:"crown",on:""});
    }
    else if(inv[i] == "gear"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"⚙️",css:"gear",on:""});
    }
    else if(inv[i] == "cheese"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🧀",css:"cheese",on:""});
    }
    else if(inv[i] == "wand"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🪄",css:"wand",on:""});
    }
    else if(inv[i] == "sword"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🗡️",css:"sword",on:""});
    }
  }
}

use = n => {
  
  //console.log(using,n);
  if(using == n && n > -1){
    if(self["i"+n])self["i"+n].style.background="";
    text.innerHTML = "";
    usingstr = "";
    using = -1;
  }
  else {
    usingstr = "";
    using = -1;
    for(i = 0; i < 12; i++){
      self["i"+i].style.background="";
    }
    if(inv[n]){
      self["i"+n].style.background="#fff";
      text.innerHTML = "use " + inv[n] + " with ";
      using = n;
      usingstr = "use " + inv[n] + " with ";
    }
    else {
      text.innerHTML = "";
    }
  }
  //console.log(using,n);
}

// Text
lasttxt="";
to=0;
txt = s => {
  //console.log(s);
  if(s.length && s != "c"){
    if(using > -1 && !["up","right","down","left"].includes(s[0])) {text.innerHTML = usingstr + s;}
    else {text.innerHTML = s; }
    clearTimeout(to);
    to=setTimeout(`if(using == -1) text.innerHTML=""`, 2000);
  }
}

if(debug) { inv=["telescope", "torch","hammer","wood","boulder","crown","gear","cheese","mouse","wand","sword","soup"]; draw_inv() }



// Left window
windowleft = (bars,tower) => {
  C.plane({x:-280,y:-95+92,z:-50,w:100,h:100,html:svgwindow,css:"window",ry:tower?10:0});
  if(bars) C.plane({x:-300-20,y:-95+40,z:-40,html:svgbars,css:"bars",on:""});
}

windowright = (bars,tower,cl='') => {
  C.plane({x:300-70,y:-95+92,z:-50,w:100,h:100,html:svgwindow,css:"window",sx:-1,ry:tower?-10:0,cl});
  if(bars) C.plane({x:278,y:-55,z:-40,html:svgbars,css:"bars",on:"",sx:-1});
}

addsun = (left,right) => {
  if(left){
    C.plane({x:-555,y:-222,z:-100,w:400,h:400,b:"radial-gradient(#ffb 5%,#fff0 50%)",css:"sun",on:""});
    C.plane({x:0,y:0,z:0,w:700,h:500,b:"#f000",css:"sunwrapper",html:"<canvas id=sun width=700 height=500>"});
    ctx=sun.getContext("2d");
    ctx.fillStyle = "#ffb3";
    ctx.beginPath();
    ctx.moveTo(65,285);
    ctx.lineTo(165,470);
    ctx.lineTo(285,470);
    ctx.lineTo(85,230);
    ctx.closePath();
    ctx.fill();
  }
}

wallside = (left,offset,skytop,kitchen,i,j,dx) => {
  if(kitchen){
    C.group({n:"wall", x:left?-427:offset?370:320,y:-65+(skytop?110:0),z:left?-88:-40,ry:left ? 65 : 120,cl:"r33i",css:"wall"});
  }
  else {
    C.group({n:"wall", x:left?-427:offset?370:320,y:-65+(skytop?110:0),z:left?-88:-40,ry:left ? 65 : 120});
  }
  for(i = 0; i < 3; i++){
    for(j = 11; j--;){
      
        dx = (j%2) ? 6:0;
        C.plane({g:"wall",x:i*12+dx,y:j*50-200,z:50,w:102,h:52,b:`hsl(50 0% ${50-i*5}%)`,css:"brick"});
    }
  }
}

// Tower top/bottom
tower = (top,i,j,x,y,z,w,dx,ry) => {
  scene.className = "";
  scene.innerHTML=text.innerHTML="";
  setTimeout('scene.className = "t"',200);
  for(i = 0; i < 8; i++){
    for(j = 15; j--;){
      if(((top && j > 1) || !top) && ((top && !(j==2 && i % 2)) || !top) && !(!(j % 2) && i == 7)){
        
        // Back
        dx = 0;
        w = 104;
        if(j % 2){
          dx = 50;
          if((i == 0)) { w = 50; dx = 25 }
          if((i == 7)) { w = 50; dx = 75 }
        }
        x = i*98 - 300 - dx + Math.random()+(i>4?2:0);
        ry = -(x+10)/22;
        z = -(Math.cos(x/320) * 90);
        C.plane({x,y:j*48-300 + Math.random(),w,h:50,b:`hsl(50 0% ${30-z/3}%)`,ry,z,css:"brick"});
      
        // front
        if(j>(top ? 3 : 2) && j < 11){
          
          // left
          if(i == 0){
            w = 35 + ((j%2) ? 10 : 0);
            x = i*98 - 300 - 36 + Math.random()*4+ ((j%2) ? 5 : 0);
            ry = (x+10)/22;
            z = (Math.cos(x/300) * 90)-50;
            C.plane({x,y:j*51-302 + Math.random()-8,w,h:52,b:`hsl(50 0% 70%)`,ry,z,css:"brick"});
          }
          
          // right
          if(i == (j%2 ? 7 : 6)){
            w = 35 + ((j%2) ? 10 : 0);
            x = i*98 - 300 - 65 + Math.random()*4 + ((j%2) ? -5 : 100);
            ry = (x+10)/22;
            z = (Math.cos(x/300) * 90)-50;
            C.plane({x,y:j*51-302 + Math.random()-8,w,h:52,b:`hsl(50 0% 70%)`,ry,z,css:"brick"});
          }
        }
        
        // top, bottom
        else {
          dx = 0;
          w = 102;
          if(j % 2){
            dx = 47;
            if(i == 0) { w = 50; dx = 22 }
            if((i == 7)) { w = 50; dx = 75 }
          }
          if(i > 3) { dx -=2 }
          x = i*98 - 300 - dx + Math.random();
          ry = (x+10)/22;
          z = (Math.cos(x/300) * 90)-45;
          C.plane({x,y:j*50-300 + Math.random()-5,w,h:52,b:`hsl(50 0% ${70+z/4}%)`,ry,z,css:"brick"});
        }
      }
    }
  }
}

// Room (sky on left / right / top, tower on top or not)
room = (skyleft, skyright, skytop, tower,half,i,j,x,y,z,w,dx,ry,no) => {
  scene.className = "";
  scene.innerHTML=text.innerHTML="";
  setTimeout('scene.className = "t"',200);
  for(i = 0; i < 12; i++){
    for(j = 13; j--;){
      
      // tower
      if(skytop && tower && i < 8 && j < 4) {
        dx = 0;
        w = 102;
        no = 0; if(j % 2){
          dx = 47;
          if(i == 0) { w = 50; dx = 22 }
          if((i == 7)) { w = 50; dx = 75 }
        }
        else{
          if(i == 7) no = 1;
        }
        x = i*98 - 300 - dx + Math.random();
        ry = (x+10)/22;
        z = (Math.cos(x/300) * 90)-145;
        if(!no)C.plane({x,y:j*50-300 + Math.random()-5,w,h:52,b:`hsl(50 0% ${90+z/3}%)`,ry,z,css:"brick"});
      }
      
      // Back & front
      if((skytop && (j > 2 || (j == 2 && (i%2)))) || !skytop){
        dx = 0;
        w = 104;
        if((j % 2)){
          dx = 50;
        }
        x = i*98 - 500 + Math.random()*2;
        if(skyleft){
          if(i == 0) continue;
          if(i == 1 && (j%2)){
            w = 52;
            dx -= 25;
          }
        }
        
        if(skyright){
          if(i == 11 || (i == 10 && !(j%2))) continue;
          if(i == 10 && (j%2)){
            w = 52;
            dx += 25;
          }
        }
        z = -50;
        
        // Back
        if(j>(skytop ? 2 : 0)){
          C.plane({x:x-dx,y:j*48-300 + Math.random(),w,h:50,b:`hsl(50 0% ${43}%)`,z,css:"brick"});
        }
        
        // front
        if(((i < 2) || (i > (skyright ? 8 : 9)) || (j < (skytop ? 4 : 2)) || (j > 11))){
          if(j>(skytop ? 3 : 1) && j < 12 && !(j%2) && i == 1 && !skyleft) continue;
          if(j>(skytop ? 4 : 2) && j < 12 && (j%2) && i == 9) continue;
          if(r33h && half && j > 1 && j < 12 && i > 8) { continue; }
          if(!r33h && half && j > 1 && j < 12 && (j%2) && i ==10) C.plane({x:x-dx+25,y:j*48-300 + Math.random(),w:50,h:50,b:`hsl(50 0% ${63}%)`,z:-20,css:"brick"});
          else C.plane({x:x-dx,y:j*48-300 + Math.random(),w,h:50,b:`hsl(50 0% ${63}%)`,z:-20,css:"brick"});
        }
      }
      
      
    }
  }
}

// Mountains bg
mount = () => {
  C.plane({x:0,y:250,z:-80,w:1800,h:400,b:"radial-gradient(#582,#9c6)",css:"mount",on:""});
}

// ===========================================================================
// Room 0-0, start cell (todo: mouse)
room00 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  
  C.plane({x:-65,y:115,html:svgdoor,w:60,h:100,css:"door",sx:1.6,sy:1.6,ry:5});
  C.plane({x:-80,y:80,z:5,html:"⬇️",css:"arrow",on:"down",cl:"room01",ry:5});
  
  if(!r00d)C.plane({x:145,y:-30,w:20,h:15,html:svghanger,css:"hanger",n:"r002",cl:"r00c"});
  
  if(!r00f){
    C.plane({x:-105,y:120,z:20,html:"🔒",css:"lock",rz:-2,cl:"r00e",n:"r003"});
    C.plane({x:-132,y:110,html:"🚪",css:"door",ry:5,z:10,n:"r004",o:"100px 100px"});
  }
  else {
    C.plane({x:-105,y:120,z:20,html:"🔒",css:"lock",rz:-2,cl:"r00e",n:"r003",x:-120,y:200,rz:-80});
    C.plane({x:-132,y:110,html:"🚪",css:"door",ry:5,z:10,n:"r004",o:"100px 100px",x:-100,y:115,z:15,ry:120});
  }
  
  if(r00b>=1){C.group({x:120-15,y:-10,z:10,n:"frame",y:140,rx:-80});}
  else{C.group({x:120-15,y:-10,z:10,n:"frame"});}


  C.plane({x:0,y:-10-15,html:"🖼️",css:"frame",rz:2,cl:"r00a",n:"r001",g:"frame"});
  C.plane({x:40,y:32-47,html:"️🧔🏻‍♂️",css:"framehead nofont",on:"",rz:2,g:"frame"});
  C.plane({x:45,y:14-40,html:"👑️",css:"framecrown",on:"",rz:2,sy:.5,g:"frame"});
  C.plane({x:260-15,y:120,html:"🛏️",css:"bed",sx:-1});
  C.plane({x:-250-15,y:208-15,z:-50,html:"🕳️",css:"hole",rz:90,ry:10,sy:2});
  windowleft(1,1);
  addsun(1,0);
}

// Tear frame
r00b = debug ? 3 : 0;// frame tearing attempts
r00a = () => {
  frame.style.animation="wiggle .5s";
  setTimeout('frame.style.animation="";',600);
  r00b++;
  if(r00b>=1){
    r001.onclick="";
    C.move({n:"frame",y:140,rx:-80});
  }
}

// Take hanger
r00d = debug ? 1 : 0; // hanger removed
r00c = () => {
  add_inv("hanger");
  r002.remove();
  r00d = 1;
}

// Use hanger on lock
r00f = debug ? 1 : 0; // lock/door open
r00e = () => {
  if(inv[using] == "hanger"){
    C.move({n:"r003",x:-120,y:200,rz:-80});
    C.move({n:"r004",x:-100,y:115,z:15,ry:120});
    rem_inv("hanger");
    r00f = 1;
  }
}

// ===========================================================================
// Room 0-1: cannon (todo: shield, finish window animations)
room01 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:10,y:-50,html:"🛡️",css:"shield",rz:2});
  C.plane({x:-160,y:198,w:100,h:200,html:svgdoorstair,ry:9,sx:1.6,sy:1.6});
  if(r01a){
    C.plane({x:0,y:170,html:"🪵",css:"wood",z:-5});
      C.plane({x:-50,y:220,z:0,w:90,h:50,html:svgcannon,css:r01b ? "loaded cannon" : "cannon",sx:2.7,sy:2.7,o:"bottom left",cl:"r01d",n:"r011",rz:-25});
  }
  else {
    C.plane({x:-50,y:220,z:0,w:90,h:50,html:svgcannon,css:r01b ? "loaded cannon" : "cannon",sx:2.7,sy:2.7,o:"bottom left",cl:"r01d",n:"r011"});
  }
  C.plane({x:-165,y:65,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room02"});
  C.plane({x:-207,y:65,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room00"});
  C.plane({x:-50,y:r01a?125:180,z:-5,html:"⬤",css:"boulder",n:"r012",cl:"r01e"});
  windowright(0,1);
  addsun(0,1);
  
}

// Use wood with cannon
r01a = debug ? 1 : 0;

// Use boulder with cannon
r01b = debug ? 1 : 0;

// Shot on wall
r01c = 0;

r01d = () => {
  if(usingstr == "use wood with "){
    r01a = 1;
    C.plane({x:0,y:170,html:"🪵",css:"wood",z:-5});
    C.move({n:"r011",rz:-25});
    rem_inv("wood");
    C.move({n:"r012",y:125});
    use(-1);
  }
  else if(usingstr == "use boulder with "){
    r01b = 1;
    rem_inv("boulder");
    r011.className = "loaded cannon";
    r011.setAttribute("onmouseover","txt`loaded cannon`");
    use(-1);
  }
  if(usingstr == "use lit torch with " && r01a && r01b){ // in window
    r01b = 0;
    r011.className = "cannon";
    r011.setAttribute("onmouseover","txt`cannon`");
    C.move({n:"r012",x:600,y:-170,z:-135});
    use(-1);
    animation = 1;
    setTimeout(anim1,500);
  }
  if(usingstr == "use lit torch with " && !r01a && r01b){ // in wall
    r01b = 0;
    r011.className = "cannon";
    r011.setAttribute("onmouseover","txt`cannon`");
    C.move({n:"r012",x:235});
    setTimeout('C.move({n:"r012",x:215})',510);
    use(-1);
  }
}

// Pick up boulder shot on wall
r01e = () => {
  add_inv("boulder");
  r012.remove();
}

// ===========================================================================
// room 0-2: telescope (ok)
room02 = () => {
  room(1,0,1,1)
  C.plane({x:25,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  wallside(1,0,1);
  if(!r02a) C.plane({x:190,y:170,w:30,h:30,html:"🔭",css:"telescope",rz:2,sx:-1,n:"r021",cl:"r02b"});
  C.plane({x:-50,y:150,w:50,h:100,z:-20,html:svgdoorstair,sx:1.6,sy:1.6});
  C.plane({x:-45,y:95,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room01"});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room12"});
  windowleft(0);
  addsun(1,1);
}

// Take telescope
r02a = debug ? 1 : 0; // taken
r02b = () => {
  add_inv("telescope");
  r021.remove();
  r02a = 1;
}

// ===========================================================================
// room 0-3: throne room (ok)
room03 = () => {
  note.className = "h";
  room(1,0,0,0);
  mount();
  C.plane({x:25,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-90,y:125,w:30,h:30,html:"💺",css:"throne",sx:-1});
  C.plane({x:250,y:185,w:30,h:30,html:"🪨",css:"rock",sx:-1});
  if(!inv.includes("sword"))C.plane({x:210,y:135,z:-5,w:30,h:30,html:"🗡️",css:"sword",sx:-1,rz:40,rx:-30,cl:"room03p"});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room13"});
  wallside(1,0);
}

// Sword puzzle
room03p = () => {
  r03pm = "";
  room(1,0,0,0);
  C.plane({x:25,y:0,z:50,w:950,h:650,b:"linear-gradient(#333,#555)"});
  C.plane({x:-170,y:30,z:70,html:"🪨",css:"rock",sx:-1,sx:2,sy:2});
  C.plane({x:50,y:55,z:50,w:30,h:30,html:"🗡️",css:"sword2",on:"pull sword",sx:-1,rz:54,rx:-50,n:"r03p1",cl:"r03pp"});
  C.plane({x:-360,y:-180,z:80,html:"❌",css:"cross",on:"exit",cl:"room03"});
  C.plane({x:-30,y:-180,z:80,html:"⬆️",css:"arrow",on:"up",cl:"r03pu"});
  C.plane({x:180,y:0,z:80,html:"➡️",css:"arrow",on:"right",cl:"r03pr"});
  C.plane({x:-230,y:0,z:80,html:"⬅️",css:"arrow",on:"left",cl:"r03pl"});
  C.plane({x:-30,y:140,z:80,html:"⬇️",css:"arrow",on:"down",cl:"r03pd"});
}

// moves
r03pm = "";

// pull
r03pp = () => {
  if(r03pm.endsWith('uuddlrlr')) {
    C.move({n:"r03p1",x:80,y:-50,z:200});
    setTimeout(room03,510);
    add_inv("sword");
  }
  
  else {
    r03p1.style.animation="wiggle .2s 2";
    setTimeout('r03p1.style.animation=""',510);
  }
}

// move
r03pu = () => {
  C.move({n:"r03p1",rx:-30})
  setTimeout('C.move({n:"r03p1",rx:-50})',510);
  r03pm+="u";
}

r03pl = () => {
  C.move({n:"r03p1",rz:30})
  setTimeout('C.move({n:"r03p1",rz:55})',510);
  r03pm+="l";
}

r03pr = () => {
  C.move({n:"r03p1",rz:70})
  setTimeout('C.move({n:"r03p1",rz:55})',510);
  r03pm+="r";
}

r03pd = () => {
  C.move({n:"r03p1",rx:-70})
  setTimeout('C.move({n:"r03p1",rx:-50})',510);
  r03pm+="d";
}



// ===========================================================================
// room 1-2: library (ok)
room12 = (i,j) => {
  room(0,0,1,0)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-150,y:95,html:"🪜",css:"shelf"});
  addsun(0,0);
  
  for(i=0;i<3;i++){
    for(j=0;j<4;j++){
      if(!(j>0&&!((i+j-3)%3))&&!(i==1&&j==0))C.plane({x:i*32-35 + Math.random()*10,y:j*65-30,w:20+Math.random()*2,h:45,b:`hsl(${(i*5+j*15)*20} 50% ${63}%)`,z:20,css:"book",cl:"book"+i+j});
    }
  }
  C.plane({x:235,y:145,w:50,h:100,html:svgdoor,sx:-1.6,sy:1.6});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room22"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room02"});
  C.plane({x:195,y:165,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room13"});
}
  



// ===========================================================================
// room 1-3: knight (ok)
room13 = () => {
  r13b = 0;
  room(0,0,0,0)
  C.plane({x:-25,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-220,y:105,w:50,h:100,html:svgknight,css:"knight",sx:2.8,sy:2.8,cl:"r13a"});
  C.plane({x:215,y:140,w:50,h:100,html:svgdoorstair,sx:-1.6,sy:1.6});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room23"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"r13a"});
  C.plane({x:175,y:85,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room12"});
}

r13b = 0; // dialog count
r13c = 0; // passage open

// Talk to knight
r13a = () => {
  if(r13c){
    room03();
    use(-1);
  }
  else if(usingstr == "use crown with " && !r13c){
    note.innerHTML = "Welcome, sir";
    note.className = "";
    setTimeout(room03,1000);
    r13c = 1;
    use(-1);
  }
  else {
    note.innerHTML = r13b == 1 ? "(I'm new here,<br>I haven't seen him in person yet)":"Only the king can enter the throne room!";
    note.className = "";
    r13b++;
  }
}




// ===========================================================================
// Room 2-0: boulders (todo: anim, lock)
room20 = (anim=1) => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:130-40,y:50+30,html:"⬤",css:"boulder",n:"r201",cl:"r20a"});
  C.plane({x:160-40,y:100+30,html:"⬤",css:"boulder",n:"r202",cl:"r20b"});
  C.plane({x:100-40,y:100+30,html:"⬤",css:"boulder",n:"r203",cl:"r20c"});
  C.plane({x:190-40,y:150+30,html:"⬤",css:"boulder",n:"r204",cl:"r20d"});
  C.plane({x:130-40,y:150+30,html:"⬤",css:"boulder",n:"r205",cl:"r20e"});
  C.plane({x:70-40,y:150+30,html:"⬤",css:"boulder",n:"r206",cl:"r20f"});
  if(anim) C.plane({x:-300,y:20,html:"⬤",css:"boulder",n:"r2099",cl:"r20z"});
  C.plane({x:-50,y:-20,html:"🛡️",css:"shield",rz:2});
  C.plane({x:210,y:20,html:"🔒",css:"lock",rz:-2,z:10});
  C.plane({x:210,y:-15,html:"🔗",css:"chain",rz:40});
  C.plane({x:-85,y:120,w:50,h:100,z:-20,html:svgdoor,ry:5,sx:-1.6,sy:1.6});
  if(!anim) C.plane({x:-95,y:65,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room21"})
  windowleft(0);
  windowright(1);
  addsun(1,0);
}

// Take boulder 1-6
r20g = 0; // removed
r20h = 0; // removed
r20i = 0; // removed
r20j = 0; // removed
r20k = 0; // removed
r20l = 0; // removed

r20a = () => {
  add_inv("boulder");
  r201.remove();
  r20g = 1;
}
r20b = () => {
  if(r20g && !inv.includes("boulder")){
    add_inv("boulder");
    r202.remove();
    r20h = 1;
  }
}
r20c = () => {
  if(r20g && !inv.includes("boulder")){
    add_inv("boulder");
    r203.remove();
    r20i = 1;
  }
}
r20d = () => {
  if(r20h && r20i && !inv.includes("boulder")){
    add_inv("boulder");
    r204.remove();
    r20j = 1;
  }
}
r20e = () => {
  if(r20h && r20i && !inv.includes("boulder")){
    add_inv("boulder");
    r205.remove();
    r20k = 1;
  }
}
r20f = () => {
  if(r20h && r20i && !inv.includes("boulder")){
    add_inv("boulder");
    r206.remove();
    r20l = 1;
  }
}


// ===========================================================================
// Room 2-1: hay (todo: anim,pick gear)
room21 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:-40,y:120,z:-20,w:100,h:100,html:svghay,on:"hay",sx:2.8,sy:2.8,cl:"r21a"});
  C.plane({x:-235,y:130,w:50,h:100,z:-20,html:svgdoorstair,ry:5,sx:1.5,sy:1.6});
  C.plane({x:-185-35,y:70,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room20"});
  C.plane({x:-145-35,y:70,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room22"});
  windowright(0,1,"r21a");
  addsun(0,0);
}

// Put telescope on window/hay
r21b = 0;
r21a = () => {
  if(usingstr == "use telescope with "){
    C.plane({x:180,y:140,w:30,h:30,html:"🔭",css:"telescope",rz:2,sx:-1,sy:1.1});
  }
}

// ===========================================================================
// room 2-2: torch (ok)
room22 = (i,j) => {
  room(0,0,1,1)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:85,y:75,html:"📜",css:"note",sx:1.6,sy:1.6,cl:"r22a"});
  C.plane({x:-25,y:85,w:50,h:10,z:10,html:svgtorchsupport,css:"torch holder",sx:1.6,sy:1.6,cl:"r22f"});
  if(!r22b) C.plane({x:-40,y:45,w:50,h:50,html:svgtorch,on:"torch",sx:1.6,sy:1.6,cl:"r22c",n:"r221"});
  if(!r22b && r22e){
    C.plane({x:-35,y:50,z:20,w:30,h:30,html:"🔥",css:"fire",on:"torch",n:"r222",cl:"r22c"});
  }
  C.plane({x:-205,y:140,w:50,h:100,html:svgdoorstair,sx:1.6,sy:1.6});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room32"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room12"});
  C.plane({x:-190,y:85,z:40,html:"⬆️",css:"arrow",on:"up",cl:"r22d"});//"room21"});
}

// Note
r22a = () => {
  note.className="";
  note.innerHTML = "This tower contains flammable material, please leave torch here before going up";
}

// Take/leave torch
r22b = debug?1:0; // torch removed
r22e = 0; // torch lit

// Put down torch
r22f = () => {
  if(inv.includes("lit torch")){
    rem_inv("lit torch");
    r22b = 0;
    r22e = 1;
    C.plane({x:-40,y:45,w:50,h:50,html:svgtorch,on:"torch",sx:1.6,sy:1.6,cl:"r22c",n:"r221"});
    C.plane({x:-35,y:50,z:20,w:30,h:30,html:"🔥",css:"fire",on:"torch",n:"r222",cl:"r22c"});
  }
  else if(inv.includes("torch")){
    rem_inv("torch");
    r22b = 0;
    r22e = 0;
    C.plane({x:-40,y:45,w:50,h:50,html:svgtorch,on:"torch",sx:1.6,sy:1.6,cl:"r22c",n:"r221"});
  }
  else {
    r22c();
  }
  use(-1);
}

// Take torch
r22c = () => {
  if(r22e) {
    add_inv("lit torch");
    r222.remove();
  } else {
    add_inv("torch");
  }
  r221.remove();
  r22b = 1;
}

// Go up
r22d = () => {
  if(r22b){
    r22a();
  }
  else {
    room21();
  }
}


// ===========================================================================
// room 2-3: exit (todo)
room23 = () => {
  room(0,0,0,0)
  mount();
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-150,y:35,w:60,h:100,html:svgexit,css:"doors",sx:4,sy:4});
  C.plane({x:10,y:35,w:60,h:100,html:svgexit,css:"doors",sx:-4,sy:4});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room33"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room13"});
}









// ===========================================================================
// room 3-2: anvil fire (ok)
room32 = () => {
  room(0,0,1,0)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-120,y:230,w:30,h:30,html:"🔨",css:"hammer",on:"",rz:-45});
  if(!r32a) C.plane({x:-120,y:180,z:40,w:20,h:20,on:"???",n:"r321",cl:"r32b"});
  C.plane({x:-330+20,y:230,html:"🪵",css:"wood",rz:-90});
  C.plane({x:-290+20,y:230,z:10,html:"🪵",css:"wood",rz:-90});
  if(!r32c) C.plane({x:-310+20,y:200,html:"🪵",css:"wood",rz:-90,n:"r322",cl:"r32d"});
  C.plane({x:110-40,y:125,html:"🏦",css:"fireplace",cl:"r32e"});
  C.plane({x:160-40+3,y:185,z:20,w:30,h:30,html:"🔥",css:"fire",cl:"r32e"});
  C.plane({x:215-40+3,y:185,z:20,w:30,h:30,html:"🔥",css:"fire",cl:"r32e",sx:-1});
  C.plane({x:230-40+3,y:185,z:20,w:30,h:30,html:"🔥",css:"fire",cl:"r32e"});
  C.plane({x:208-40,y:163,z:10,w:115,h:70,b:"#444",on:"fireplace",cl:"r32e"});
  C.plane({x:220-40,y:25,z:-40,w:80,h:300,b:"#555",on:"fireplace",cl:"r32e"});
  C.plane({x:-100,y:185,w:100,h:50,html:svganvil,css:"anvil",sx:2,sy:2});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room42"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room22"});
  addsun(0,0);
}

// Take hammer
r32a = debug?1:0; // hammer removed
r32b = () => {
  add_inv("hammer");
  r321.remove();
  r32a = 1;
}

// Take wood
r32c = debug?1:0; // wood removed
r32d = () => {
  add_inv("wood");
  r322.remove();
  r32b = 1;
}

// Lit torch / heat soup
r32e = () => {
  if(usingstr == "use torch with "){
    inv[using] = "lit torch";
    usingstr = "use lit torch with ";
    draw_inv();
  }
  else if(usingstr == "use soup with "){
    animation = 1;
    rem_inv("soup");
    use(-1);
    C.plane({x:130,y:150,z:30,html:"🍲",css:"soup",n:"r323",cl:"r32g"});
    C.plane({x:130,y:150,z:31,html:"🍲",css:"hot soup o0",n:"r324",cl:"r32g"});
    setTimeout('r324.className="plane hot soup";r324.setAttribute("onmouseover","txt`hot soup`");animation=0',2000);
  }
}

// Take hot soup
r32f = 0; // removed
r32g = () => {
  add_inv("hot soup");
  r323.remove();
  r324.remove();
  r32f = 1;
}


// ===========================================================================
// room 3-3: kitchen (ok)
room33 = () => {
  room(0,0,0,0,1)
  C.plane({x:25,y:-220,z:-50,w:1050,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:25,y:235,z:-50,w:1050,h:70,b:"linear-gradient(#333,#555)",rx:60});
  if(!r33h) C.plane({x:400,y:0,z:40,w:120,h:400,on:"wall",cl:"r33i",n:"r334"}); // wall
  C.plane({x:-60,y:-55,html:svgtable,css:"",sx:3,sy:3});
  C.plane({x:10,y:45,html:"🧑🏻‍🍳",css:"cook",cl:"r33g"});
  if(!r33e) C.plane({x:-40,y:75,html:"🧀",css:"cheese",cl:"r33f",n:"r332"});
  if(!r33c){
    if(r33b) C.plane({x:130,y:60,html:"🍲",css:"hot soup",cl:"r33c",n:"r331"});
    else C.plane({x:130,y:60,html:"🍲",css:"soup",cl:"r33d",n:"r331"});
  }
  C.plane({x:-250,y:-60,html:"🛡️",css:"shield",rz:2});
  if(r33h) C.plane({x:325,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room43"});
  if(r33h) C.plane({x:495,y:15,z:40,html:svgrock,css:"",sx:-2,sy:2});
  if(r33h) C.plane({x:295,y:15,z:40,html:svgrock,css:"",sx:2,sy:2});
  if(r33h) C.plane({x:435,y:25,z:40,html:svgrock,css:"",sx:-2,sy:2});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room23"});
  if(!r33h)wallside(0,1,0,1);
}

// soup is hot
r33b = 1;

// Talk to cook
r33a = () => {
  note.innerHTML = (r33b && !r33c) ? "Thanks! You can take the cheese" : "Please help me heating up the soup!"
  note.className = "";
}

// Take soup
r33c = 0; // taken
r33d = () => {
  if(!r33b){
    r33a();
    add_inv("soup");
    r331.remove();
    r33c = 1;
  }
}

// Take cheese
r33e = 0; // taken
r33f = () => {
  if(r33b && !r33c){
    add_inv("cheese");
    r332.remove();
    r33e = 1;
  }
  else {
    note.innerHTML = "Please help me heating up the soup first!"
    note.className = "";
  }
}

// Put hot soup
r33g = () => {
  if(usingstr == "use hot soup with "){
    C.plane({x:130,y:60,html:"🍲",css:"hot soup",cl:"r33c",n:"r331"});
    rem_inv("hot soup");
    r33c = 0;
    r33a();
    use(-1);
    draw_inv();
  }
  else r33a();
}

// Break wall
r33h = 0; // broken
r33i = () => {
  if(usingstr == "use hammer with "){
    r33h = 1;
    use(-1);
    rem_inv("hammer");
    draw_inv();
    fadeout();
    setTimeout(room33,200);
    setTimeout(fadein,800);
  }
}



// ===========================================================================
// Room 4-0: witch (todo: give wand, change time)
room40 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:80,y:100,w:60,h:100,html:svgwitch,css:"witch",sx:2.5,sy:2.5});
  C.plane({x:80,y:-100,html:"🦇",css:"bat",sy:-1});
  C.plane({x:150,y:-95,html:"🦇",css:"bat",sy:-1});
  //C.plane({x:-240,y:-180,w:100,h:50,html:svgtime,css:"time",sx:2,sy:2});
  C.plane({x:-170,y:-40,z:10,w:30,h:30,html:"▼",css:"triangle",on:"",sx:2,sy:2});
  C.plane({x:-30,y:120,w:50,h:100,z:-20,html:svgdoor,ry:0,sx:1.6,sy:1.6});
  C.plane({x:-25,y:70,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room41"});
  C.plane({x:0,y:0,z:0,w:700,h:500,b:"#f000",css:"sunwrapper",html:"<canvas id=clock width=700 height=500>"});
  ctx=clock.getContext("2d");
  ctx.fillStyle = "#333";
  ctx.beginPath();
  ctx.arc(175,255,75,0,7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(100,250,150,200);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// ===========================================================================
// Room 4-1: wolf (todo: wolf on full moon, guy alive in the past)
room41 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:80,y:130,html:"🧍‍♂️",css:"prisoner"});
  C.plane({x:190,y:120,html:"🔗",css:"chain",rz:20});
  C.plane({x:220,y:100,html:"🔗",css:"chain",rz:5});
  C.plane({x:240,y:80,html:"🔗",css:"chain",rz:-35});
  //C.plane({x:-250,y:20,html:"🔒",css:"lock",rz:-2,z:10});
  //C.plane({x:-260,y:0,html:"🔗",css:"chain",rz:40});
  C.plane({x:-110,y:125,w:50,h:100,z:-20,html:svgdoorstair,ry:5,sx:1.6,sy:1.6});
  C.plane({x:50,y:140,html:"🔗",css:"chain"});
  C.plane({x:70,y:120,html:"🔗",css:"chain"});
  C.plane({x:90,y:100,html:"🔗",css:"chain"});
  C.plane({x:30,y:160+20,z:10,html:"💀",css:"skeleton",rz:-30});
  C.plane({x:50,y:180+20,html:"🦴",css:"skeleton",rz:-30});
  C.plane({x:40,y:200+20,html:"🦴",css:"skeleton",rz:-60});
  C.plane({x:30,y:190+20,html:"🦴",css:"skeleton",rz:-90});
  C.plane({x:-115,y:70,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room40"});
  C.plane({x:-78,y:70,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room42"});
  windowleft(0);
  addsun(1,0);
  
}

// ===========================================================================
// room 4-2: stairs hole (todo: take mouse with cheese)
room42 = () => {
  room(0,1,1,1)
  C.plane({x:-45,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  wallside(0,0,1);
  C.plane({x:-205,y:145,w:50,h:100,html:svgdoorstair,sx:1.6,sy:1.6});
  C.plane({x:-262,y:145,z:10,html:"🚪",css:"door"});
  C.plane({x:-230,y:140,z:15,html:"🔒",css:"lock",rz:-2});
  C.plane({x:-75,y:65,html:"📜",css:"note",sx:1.6,sy:1.6,cl:"r42a"});
  C.plane({x:250,y:255,z:-50,html:"🕳️",css:"hole",rz:90,sx:-1,sy:2});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room32"});
  C.plane({x:-195,y:95,z:5,html:"⬆️",css:"arrow",on:"up",cl:"room41"});
  C.plane({x:50,y:60,html:"🛡️",css:"shield",rz:2});
  windowright(0);
  addsun(0,0);
}

r42a = () => {
  note.className="";
  note.innerHTML = "This tower contains dangerous prisoners";
}

// ===========================================================================
// room 4-3: treasure (ok)
room43 = () => {
  room(0,1,0,0)
  mount();
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  if(r43c) C.plane({x:70,y:145,w:100,h:100,html:svgchestopen,css:"chest",sx:2,sy:2,cl:"room43p"});
  else C.plane({x:70,y:145,w:100,h:100,html:svgchest,css:"chest",sx:2,sy:2,cl:"room43p"});
  if(!r43c)C.plane({x:50,y:140,html:"🔒",css:"lock",rz:-2,cl:"room43p"});
  if(r43c && !r43d)C.plane({x:50,y:110,html:"🪄",css:"wand",rz:30,cl:"r43e",n:"r432"});
  if(!r43a) C.plane({x:-250,y:185,html:"👑",css:"crown",cl:"r43b",n:"r431"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room33"});
  wallside(0);
  windowright(1);
  addsun(0,0);
}

// Take crown
r43a = 0; // taken
r43b = () => {
  add_inv("crown");
  r431.remove();
  r43a = 1;
}

// Take wand
r43d = 0; // taken
r43e = () => {
  add_inv("wand");
  r432.remove();
  r43d  = 1;
}

r43c = 1; // chest open

// Puzzle
room43p = () => {
  r43pm = "";
  r43pa = 0;
  room(1,0,0,0);
  C.plane({x:25,y:0,z:50,w:950,h:650,b:"linear-gradient(#853,#642 50%,#000 50%,#000 50.5%,#642 50.5%,#431)"});
  C.plane({x:-360,y:-180,z:80,html:"❌",css:"cross",on:"exit",cl:"room43"});
  C.plane({x:150,y:50,z:80,html:"↩️",css:"arrow",on:"right",cl:"r43pr"});
  C.plane({x:-200,y:50,z:80,html:"↪️",css:"arrow",on:"left",cl:"r43pl"});
  C.plane({x:-130,y:20,z:50,html:"🔒",css:"big lock",on:"lock",rz:-2});
  C.plane({x:-10,y:100,z:50,w:50,h:50,o:"30px 0px",html:"🐉",css:"dragon",on:"",n:"r43p1",sx:2,sy:2,rz:-2});
}


r43pm = "";
r43pa = 0;

r43pl = () => {
  r43pa -=90;
  r43pm += "l";
  C.move({n:"r43p1",rz:r43pa});
  if(r43pm.endsWith("lrrrrlr")){
    fadeout();
    r43c = 1;
    setTimeout("room43();fadein()",500);
  }
}

r43pr = () => {
  r43pa +=90;
  r43pm += "r";
  C.move({n:"r43p1",rz:r43pa});
  if(r43pm.endsWith("lrrrrlr")){
    fadeout();
    r43c = 1;
    setTimeout("room43();fadein()",500);
  }
}






