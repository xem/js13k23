// Left window
windowleft = (bars) => {
  C.plane({x:-300+30,y:-95+92,z:-40,w:100,h:100,html:svgwindow,css:"window"});
  if(bars) C.plane({x:-300-20,y:-95+40,z:-40,html:svgbars,css:"bars",on:""});
}

windowright = (bars) => {
  C.plane({x:300-70,y:-95+72,z:-40,w:100,h:100,html:svgwindow,css:"window",sx:-1});
  if(bars) C.plane({x:300,y:-95,z:-40,html:svgbars,css:"bars",on:"",sx:-1});
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
        x = i*98 - 300 - dx + Math.random();
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
room = (skyleft, skyright, skytop, tower,i,j,x,y,z,w,dx,ry,no) => {
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
          C.plane({x:x-dx,y:j*48-300 + Math.random(),w,h:50,b:`hsl(50 0% ${63}%)`,z:-20,css:"brick"});
        }
      }
      
      
    }
  }
}

// Room 0-0, start cell
room00 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",on:"",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",on:"",rx:60,css:"c"});
  C.plane({x:-145,y:110,html:"🚪",css:"door",ry:5});
  C.plane({x:-100-15,y:120,html:"🔒",css:"lock",rz:-2});
  C.plane({x:120-15,y:-10-15,html:"🖼️",css:"frame",rz:2});
  C.plane({x:165-15,y:32-45,html:"️🧔🏻‍♂️",css:"framehead",on:"",rz:2});
  C.plane({x:165-15,y:14-40,html:"👑️",css:"framecrown",on:"",rz:2,sy:.5});
  C.plane({x:260-15,y:120,html:"🛏️",css:"bed",sx:-1});
  C.plane({x:-250-15,y:208-15,z:-50,html:"🕳️",css:"hole",rz:90,ry:10,sy:2});
  windowleft(1);
  addsun(1,0);
}

// Room 0-1: cannon
room01 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c",on:""});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c",on:""});
  C.plane({x:10,y:-50,html:"🛡️",css:"shield",rz:2});
  C.plane({x:-160,y:195,w:100,h:200,html:svgdoorstair,on:"door",ry:9,sx:1.6,sy:1.6});
  C.plane({x:40,y:195,z:0,w:90,h:50,html:svgcannon,css:"cannon",sx:2.7,sy:2.7});
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
  C.plane({x:-50,y:150,w:50,h:100,z:-20,html:svgdoorstair,on:"door",sx:1.6,sy:1.6});
  windowleft(0);
  addsun(1,1);
}

// room 0-3: throne
room03 = () => {
  room(1,0,0,0)
  C.plane({x:25,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  C.plane({x:-90,y:125,w:30,h:30,html:"💺",css:"throne",sx:-1});
  C.plane({x:250,y:185,w:30,h:30,html:"🪨",css:"rock",sx:-1});
  C.plane({x:210,y:135,z:-5,w:30,h:30,html:"🗡️",css:"sword",sx:-1,rz:40,rx:-30});
  wallside(1,0);
}




// room 1-2: library
room12 = (i,j) => {
  room(0,0,1,0)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  C.plane({x:-150,y:95,html:"🪜",css:"shelf"});
  addsun(0,0);
  
  for(i=0;i<5;i++){
    for(j=0;j<4;j++){
      C.plane({x:i*22-42 + Math.random()*4,y:j*65-30,w:15+Math.random()*2,h:45,b:`hsl(${(i*5+j*15)*20} 50% ${63}%)`,z:20,css:"book"});
    }
  }
  C.plane({x:-270,y:60,html:"🛡️",css:"shield",rz:2});
  C.plane({x:255,y:145,w:50,h:100,html:svgdoor,on:"door",sx:-1.6,sy:1.6});
  
}

// room 1-3: knight
room13 = () => {
  room(0,0,0,0)
  C.plane({x:-25,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:-25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  C.plane({x:-290,y:105,w:50,h:100,html:svgknight,css:"knight",sx:2.8,sy:2.8});
  C.plane({x:215,y:145,w:50,h:100,html:svgdoorstair,on:"door",sx:-1.6,sy:1.6});
}




// Room 2-0
room20 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:130,y:50,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:160,y:100,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:100,y:100,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:190,y:150,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:130,y:150,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:70,y:150,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:-30,y:-80,w:30,h:30,html:"🛡️",css:"shield",rz:2});
  C.plane({x:-250,y:20,w:30,h:30,html:"🔒",css:"lock",rz:-2,z:10});
  C.plane({x:-260,y:0,w:30,h:30,html:"🔗",css:"chain",rz:40});
  C.plane({x:-155,y:-20,w:30,h:30,z:-20,html:svgdoor,ry:5,sx:1.6,sy:1.6});
  windowleft(1);
  windowright(0);
  addsun(1,0);
}

// Room 2-1
room21 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:-55,y:-130,w:30,h:30,z:-20,html:svghay,sx:2.8,sy:2.8});
  C.plane({x:-195,y:-20,w:30,h:30,z:-20,html:svgdoorstair,ry:5,sx:1.5,sy:1.6});
  windowright(0);
  addsun(0,0);
}

// Room 4-0
room40 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:80,y:-120,w:30,h:30,html:svgwitch,css:"witch",sx:2.5,sy:2.5});
  C.plane({x:-240,y:-180,w:30,h:30,html:svgtime,css:"time",sx:2,sy:2});
  C.plane({x:-170,y:-40,z:10,w:30,h:30,html:"▼",css:"triangle",sx:2,sy:2});
  C.plane({x:-30,y:-25,w:30,h:30,z:-20,html:svgdoor,ry:0,sx:1.6,sy:1.6});
}

// Room 4-1
room41 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:80,y:60,w:30,h:30,html:"🧍‍♂️",css:"man"});
  C.plane({x:190,y:140,w:30,h:30,html:"🔗",css:"chain",rz:20});
  C.plane({x:210,y:130,w:30,h:30,html:"🔗",css:"chain",rz:5});
  C.plane({x:220,y:100,w:30,h:30,html:"🔗",css:"chain",rz:-35});
  C.plane({x:-250,y:20,w:30,h:30,html:"🔒",css:"lock",rz:-2,z:10});
  C.plane({x:-260,y:0,w:30,h:30,html:"🔗",css:"chain",rz:40});
  C.plane({x:-100,y:-25,w:30,h:30,z:-20,html:svgdoorstair,sx:1.6,sy:1.6});
  C.plane({x:50,y:140,w:30,h:30,html:"🔗",css:"chain"});
  C.plane({x:70,y:120,w:30,h:30,html:"🔗",css:"chain"});
  C.plane({x:90,y:100,w:30,h:30,html:"🔗",css:"chain"});
  C.plane({x:0,y:160,z:10,w:30,h:30,html:"💀",css:"skeleton",rz:-30});
  C.plane({x:20,y:180,w:30,h:30,html:"🦴",css:"skeleton",rz:-30});
  C.plane({x:10,y:200,w:30,h:30,html:"🦴",css:"skeleton",rz:-60});
  C.plane({x:0,y:190,w:30,h:30,html:"🦴",css:"skeleton",rz:-90});
  windowleft(1);
  addsun(1,0);
  
}





// room 2-2
room22 = (i,j) => {
  room(0,0,1,1)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  C.plane({x:-205,y:-5,w:30,h:30,html:svgdoorstair,sx:1.6,sy:1.6});
  C.plane({x:55,y:45,w:30,h:30,html:"📜",css:"note",sx:1.6,sy:1.6});
  C.plane({x:-55,y:-65,w:30,h:30,z:10,html:svgtorchsupport,css:"torchsupport",sx:1.6,sy:1.6});
  C.plane({x:-45,y:-75,w:30,h:30,html:svgtorch,css:"torch",sx:1.6,sy:1.6});
  
}

// room 3-2
room32 = () => {
  room(0,0,1,0)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  C.plane({x:-120,y:200-2,w:30,h:30,html:"🔨",css:"hammer",rz:-45});
  C.plane({x:-330,y:230,w:30,h:30,html:"🪵",css:"wood",rz:-90});
  C.plane({x:-290,y:230,z:10,w:30,h:30,html:"🪵",css:"wood",rz:-90});
  C.plane({x:-310,y:200,w:30,h:30,html:"🪵",css:"wood",rz:-90});
  C.plane({x:110,y:25,w:30,h:30,html:"🏦",css:"fireplace"});
  C.plane({x:150,y:155,z:20,w:30,h:30,html:"🔥",css:"fire"});
  C.plane({x:195,y:155,z:20,w:30,h:30,html:"🔥",css:"fire",sx:-1});
  C.plane({x:210,y:155,z:20,w:30,h:30,html:"🔥",css:"fire"});
  C.plane({x:190,y:156,z:10,w:115,h:70,b:"#444",css:""});
  C.plane({x:210,y:25,z:-40,w:80,h:300,b:"#555",css:""});
  C.plane({x:-130,y:-55,w:30,h:30,html:svganvil,css:"anvil",sx:2,sy:2});
  
  addsun(0,0);
}

// room 4-2
room42 = () => {
  room(0,1,1,1)
  C.plane({x:-45,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  wallside(0,0,1);
  C.plane({x:-205,y:-5,w:30,h:30,html:svgdoorstair,sx:1.6,sy:1.6});
  C.plane({x:-250,y:55,w:30,h:30,html:"🚪",css:"door"});
  C.plane({x:-220,y:130,w:30,h:30,html:"🔒",css:"lock",rz:-2});
  C.plane({x:55,y:45,w:30,h:30,html:"📜",css:"note",sx:1.6,sy:1.6});
  C.plane({x:250,y:230,z:-50,w:45,h:30,html:"🕳️",css:"hole",rz:90,sx:-1,sy:2});
  windowright(1);
  addsun(0,0);
}

// room 4-3
room43 = () => {
  room(0,1,0,0)
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  C.plane({x:0,y:-35,w:30,h:30,html:svgchest,css:"chest",sx:2,sy:2});
  C.plane({x:70,y:140,w:30,h:30,html:"🔒",css:"lock",rz:-2});
  //C.plane({x:-250,y:55,w:30,h:30,html:"👑",css:"realcrown"});
  //C.plane({x:-250,y:55,w:30,h:30,html:"💰",css:"money"});
  //C.plane({x:-250,y:55,w:30,h:30,html:"💰",css:"money"});
  //C.plane({x:-250,y:55,w:30,h:30,html:"💰",css:"money"});
  wallside(0);
  windowright(1);
  addsun(0,0);
}

// room 3-3
room33 = () => {
  room(0,0,0,0)
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  C.plane({x:-50,y:-185,w:30,h:30,html:svgtable,css:"table",sx:3,sy:3});
  C.plane({x:10,y:-0,w:30,h:30,html:"🧑🏻‍🍳",css:"cook"});
  C.plane({x:-40,y:60,w:30,h:30,html:"🧀",css:"cheese"});
  C.plane({x:130,y:30,w:30,h:30,html:"🍲",css:"pot"});
  C.plane({x:-250,y:-60,w:30,h:30,html:"🛡️",css:"shield",rz:2});
  wallside(0,1);
}

// room 2-3
room23 = () => {
  room(0,0,0,0)
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  C.plane({x:-210,y:-315,w:30,h:30,html:svgdoor,css:"exit",sx:4,sy:4});
  C.plane({x:70,y:-315,w:30,h:30,html:svgdoor,css:"exit",sx:-4,sy:4});
}




// Text
lasttxt="";
to=0;
txt = s => {
  if(s.length){
    text.innerHTML = s;
    clearTimeout(to);
    to=setTimeout(`text.innerHTML=""`, 2000);
  }
}