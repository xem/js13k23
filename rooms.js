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
  for(i = 0; i < 6; i++){
    if(inv[i] == "hanger"){
      C.plane({g:"i"+i,x:0,y:0,html:svghanger,css:"hanger",sx:4,sy:4});
    }
    else {
      self["i"+i].innerHTML = "";
    }
  }
}

use = n => {
  console.log(using,n);
  if(using == n){
    self["i"+n].style.background="";
    text.innerHTML = "";
    usingstr = "";
    using = -1;
  }
  else {
    usingstr = "";
    using = -1;
    for(i = 0; i < 6; i++){
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
  console.log(using,n);
}

// Text
lasttxt="";
to=0;
txt = s => {
  if(s.length && s != "c"){
    if(using > -1) {text.innerHTML = usingstr + s;}
    else {text.innerHTML = s; }
    clearTimeout(to);
    to=setTimeout(`if(using == -1) text.innerHTML=""`, 2000);
  }
}




// Left window
windowleft = (bars) => {
  C.plane({x:-300+30,y:-95+92,z:-40,w:100,h:100,html:svgwindow,css:"window"});
  if(bars) C.plane({x:-300-20,y:-95+40,z:-40,html:svgbars,css:"bars",on:""});
}

windowright = (bars) => {
  C.plane({x:300-70,y:-95+92,z:-40,w:100,h:100,html:svgwindow,css:"window",sx:-1});
  if(bars) C.plane({x:278,y:-55,z:-40,html:svgbars,css:"bars",on:"",sx:-1});
}

addsun = (left,right) => {
  if(left){
    C.plane({x:-555,y:-222,z:-100,w:400,h:400,b:"radial-gradient(#ffb 5%,#fff0 50%)",css:"sun",on:""});
    C.plane({x:0,y:0,z:0,w:700,h:500,b:"#f000",css:"sunwrapper",html:"<canvas id=sun width=700 height=500>"});
    ctx=sun.getContext("2d");
    ctx.fillStyle = "#ffb3";
    ctx.beginPath();
    ctx.moveTo(65,295);
    ctx.lineTo(165,470);
    ctx.lineTo(285,470);
    ctx.lineTo(85,220);
    ctx.closePath();
    ctx.fill();
  }
}

wallside = (left,offset,skytop,i,j,dx) => {
  C.group({n:"wall", x:left?-427:offset?370:320,y:-65+(skytop?110:0),z:left?-88:-40,ry:left ? 65 : 120});
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
          dx = 47;
          if((i == 0)) { w = 50; dx = 22 }
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
          if(half && j > 1 && j < 12 && (j%2) && i ==10) C.plane({x:x-dx+25,y:j*48-300 + Math.random(),w:50,h:50,b:`hsl(50 0% ${63}%)`,z:-20,css:"brick"});
          else C.plane({x:x-dx,y:j*48-300 + Math.random(),w,h:50,b:`hsl(50 0% ${63}%)`,z:-20,css:"brick"});
        }
      }
      
      
    }
  }
}

// Room 0-0, start cell
room00 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  
  C.plane({x:-65,y:115,html:svgdoor,w:60,h:100,css:"door",sx:1.6,sy:1.6,ry:5});
  C.plane({x:-80,y:80,z:5,html:"⬇️",css:"arrow",on:"down",cl:"room01",ry:5});
  
  if(!r00d)C.plane({x:145,y:-30,w:20,h:15,html:svghanger,css:"hanger",sx:2,sy:2,n:"r002",cl:"r00c"});
  
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
  C.plane({x:45,y:32-45,html:"️🧔🏻‍♂️",css:"framehead",on:"",rz:2,g:"frame"});
  C.plane({x:45,y:14-40,html:"👑️",css:"framecrown",on:"",rz:2,sy:.5,g:"frame"});
  C.plane({x:260-15,y:120,html:"🛏️",css:"bed",sx:-1});
  C.plane({x:-250-15,y:208-15,z:-50,html:"🕳️",css:"hole",rz:90,ry:10,sy:2});
  windowleft(1);
  addsun(1,0);
}

// Tear frame
r00b = 0;// frame tearing attempts
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
r00d = 0; // hanger removed
r00c = () => {
  add_inv("hanger");
  r002.remove();
  r00d = 1;
}

// Use hanger on lock
r00f = 0; // lock open
r00e = () => {
  if(inv[using] == "hanger"){
    C.move({n:"r003",x:-120,y:200,rz:-80});
    C.move({n:"r004",x:-100,y:115,z:15,ry:120});
    rem_inv("hanger");
    r00f = 1;
  }
}

// Room 0-1: cannon
room01 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:10,y:-50,html:"🛡️",css:"shield",rz:2});
  C.plane({x:-160,y:195,w:100,h:200,html:svgdoorstair,ry:9,sx:1.6,sy:1.6});
  C.plane({x:40,y:195,z:0,w:90,h:50,html:svgcannon,css:"cannon",sx:2.7,sy:2.7});
  C.plane({x:-165,y:65,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room02"});
  C.plane({x:-207,y:65,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room00"});
  windowright(0);
  addsun(0,1);
}

// room 0-2: telescope
room02 = () => {
  room(1,0,1,1)
  C.plane({x:25,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  wallside(1,0,1);
  C.plane({x:190,y:170,w:30,h:30,html:"🔭",css:"telescope",rz:2,sx:-1});
  C.plane({x:-50,y:150,w:50,h:100,z:-20,html:svgdoorstair,sx:1.6,sy:1.6});
  C.plane({x:-45,y:95,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room01"});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room12"});
  windowleft(0);
  addsun(1,1);
}

// room 0-3: throne
room03 = () => {
  room(1,0,0,0)
  C.plane({x:25,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-90,y:125,w:30,h:30,html:"💺",css:"throne",sx:-1});
  C.plane({x:250,y:185,w:30,h:30,html:"🪨",css:"rock",sx:-1});
  C.plane({x:210,y:135,z:-5,w:30,h:30,html:"🗡️",css:"sword",sx:-1,rz:40,rx:-30});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room13"});
  wallside(1,0);
}




// room 1-2: library
room12 = (i,j) => {
  room(0,0,1,0)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-150,y:95,html:"🪜",css:"shelf"});
  addsun(0,0);
  
  for(i=0;i<5;i++){
    for(j=0;j<4;j++){
      C.plane({x:i*22-42 + Math.random()*4,y:j*65-30,w:15+Math.random()*2,h:45,b:`hsl(${(i*5+j*15)*20} 50% ${63}%)`,z:20,css:"book"});
    }
  }
  C.plane({x:-270,y:60,html:"🛡️",css:"shield",rz:2});
  C.plane({x:235,y:145,w:50,h:100,html:svgdoor,sx:-1.6,sy:1.6});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room22"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room02"});
  C.plane({x:195,y:165,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room13"});
  
}

// room 1-3: knight
room13 = () => {
  room(0,0,0,0)
  C.plane({x:-25,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-220,y:105,w:50,h:100,html:svgknight,css:"knight",sx:2.8,sy:2.8});
  C.plane({x:215,y:140,w:50,h:100,html:svgdoorstair,sx:-1.6,sy:1.6});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room23"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room03"});
  C.plane({x:175,y:85,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room12"});
}




// Room 2-0: boulders
room20 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:130-40,y:50+30,html:"⬤",css:"boulder"});
  C.plane({x:160-40,y:100+30,html:"⬤",css:"boulder"});
  C.plane({x:100-40,y:100+30,html:"⬤",css:"boulder"});
  C.plane({x:190-40,y:150+30,html:"⬤",css:"boulder"});
  C.plane({x:130-40,y:150+30,html:"⬤",css:"boulder"});
  C.plane({x:70-40,y:150+30,html:"⬤",css:"boulder"});
  C.plane({x:-50,y:-20,html:"🛡️",css:"shield",rz:2});
  C.plane({x:210,y:20,html:"🔒",css:"lock",rz:-2,z:10});
  C.plane({x:210,y:-15,html:"🔗",css:"chain",rz:40});
  C.plane({x:-85,y:120,w:50,h:100,z:-20,html:svgdoor,ry:5,sx:-1.6,sy:1.6});
  C.plane({x:-95,y:65,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room21"})
  windowleft(0);
  windowright(1);
  addsun(1,0);
}

// Room 2-1: hay
room21 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:15,y:120,z:-20,w:100,h:100,html:svghay,on:"hay",sx:2.8,sy:2.8});
  C.plane({x:-195,y:125,w:50,h:100,z:-20,html:svgdoorstair,ry:5,sx:1.5,sy:1.6});
  C.plane({x:-190,y:70,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room20"});
  C.plane({x:-153,y:70,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room22"});
  windowright(0);
  addsun(0,0);
}

// room 2-2: torch
room22 = (i,j) => {
  room(0,0,1,1)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:85,y:75,html:"📜",css:"note",sx:1.6,sy:1.6});
  C.plane({x:-25,y:85,w:50,h:10,z:10,html:svgtorchsupport,css:"torch holder",sx:1.6,sy:1.6});
  C.plane({x:-40,y:45,w:50,h:50,html:svgtorch,on:"torch",sx:1.6,sy:1.6});
  C.plane({x:-205,y:140,w:50,h:100,html:svgdoorstair,sx:1.6,sy:1.6});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room32"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room12"});
  C.plane({x:-190,y:85,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room21"});
  
}

// room 2-3: exit
room23 = () => {
  room(0,0,0,0)
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-150,y:35,w:60,h:100,html:svgexit,css:"doors",sx:4,sy:4});
  C.plane({x:10,y:35,w:60,h:100,html:svgexit,css:"doors",sx:-4,sy:4});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room33"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room13"});
}









// room 3-2: anvil fire
room32 = () => {
  room(0,0,1,0)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-120,y:230,w:30,h:30,html:"🔨",css:"hammer",on:"",rz:-45});
  C.plane({x:-120,y:180,z:40,w:20,h:20,on:"???"});
  C.plane({x:-330+20,y:230,html:"🪵",css:"wood",rz:-90});
  C.plane({x:-290+20,y:230,z:10,html:"🪵",css:"wood",rz:-90});
  C.plane({x:-310+20,y:200,html:"🪵",css:"wood",rz:-90});
  C.plane({x:110,y:125,html:"🏦",css:"fireplace"});
  C.plane({x:160,y:185,z:20,w:30,h:30,html:"🔥",css:"fire"});
  C.plane({x:215,y:185,z:20,w:30,h:30,html:"🔥",css:"fire",sx:-1});
  C.plane({x:230,y:185,z:20,w:30,h:30,html:"🔥",css:"fire"});
  C.plane({x:208,y:163,z:10,w:115,h:70,b:"#444"});
  C.plane({x:220,y:25,z:-40,w:80,h:300,b:"#555"});
  C.plane({x:-100,y:185,w:100,h:50,html:svganvil,css:"anvil",sx:2,sy:2});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room42"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room22"});
  addsun(0,0);
}

// room 3-3: kitchen
room33 = () => {
  room(0,0,0,0,1)
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:380,y:0,z:40,w:60,h:400,on:""}); // wall
  C.plane({x:-60,y:-55,html:svgtable,css:"counter",sx:3,sy:3});
  C.plane({x:10,y:45,html:"🧑🏻‍🍳",css:"cook"});
  C.plane({x:-40,y:75,html:"🧀",css:"cheese"});
  C.plane({x:130,y:60,html:"🍲",css:"pot"});
  C.plane({x:-250,y:-60,html:"🛡️",css:"shield",rz:2});
  //C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room43"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room23"});
  wallside(0,1);
}





// Room 4-0: witch
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

// Room 4-1: wolf
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

// room 4-2: stairs hole
room42 = () => {
  room(0,1,1,1)
  C.plane({x:-45,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  wallside(0,0,1);
  C.plane({x:-205,y:145,w:50,h:100,html:svgdoorstair,sx:1.6,sy:1.6});
  C.plane({x:-270,y:145,html:"🚪",css:"door"});
  C.plane({x:-230,y:140,html:"🔒",css:"lock",rz:-2});
  C.plane({x:-55,y:65,html:"📜",css:"note",sx:1.6,sy:1.6});
  C.plane({x:250,y:255,z:-50,html:"🕳️",css:"hole",rz:90,sx:-1,sy:2});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room32"});
  C.plane({x:-175,y:85,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room41"});
  windowright(0);
  addsun(0,0);
}

// room 4-3: treasure
room43 = () => {
  room(0,1,0,0)
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:70,y:95,w:100,h:50,html:svgchest,css:"chest",sx:2,sy:2});
  C.plane({x:50,y:140,html:"🔒",css:"lock",rz:-2});
  C.plane({x:-250,y:185,html:"👑",css:"crown"});
  //C.plane({x:-250,y:55,w:30,h:30,html:"💰",css:"money"});
  //C.plane({x:-250,y:55,w:30,h:30,html:"💰",css:"money"});
  //C.plane({x:-250,y:55,w:30,h:30,html:"💰",css:"money"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room33"});
  wallside(0);
  windowright(1);
  addsun(0,0);
}







