animation = 0;
anim1 = () => {
  animation = 1;
  room20(1);
  r2099.style.transformOrigin = "250px 150px";
  r2099.style.transition = "1s all";
  
  setTimeout('C.move({n:"r2099",x:-200,rz:100,z:30})',100);
}


// BOOKS
book00 = (i,j) => {
  i=0,j=0;
  bookcover.innerHTML = "The big book of inventions"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "Things invented so far<br>Castles<br>Cannons<br>Clocks<br>Telescopes<br>...<br><br>Coming soon<br>Electricity<br>Microwaves<br>Nuclear fission<br>JavaScript (eww)<br>..."
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
  bookcover.innerHTML = "Horse naming"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = `Sir 1: why did you call your<br>horse "Mayo" ?<br>Sir 2: You'll see...<br>Mayo: *neighs*`
  bookcover.className = "";
}

book01 = () => {
  i=0,j=1;
  bookcover.innerHTML = "Decoding shields"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "I've been told that<br>symbols must be read<br>from top to bottom<br>while colors are read<br>from left to right.<br>What does it mean?"
  bookcover.className = "";
}


book02 = () => {
  i=0,j=2;
  bookcover.innerHTML = "How to get a horse to sleep"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = `Tell him "it's pasture bedtime"`
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
  book.innerHTML = "A moon cycle is 30 days long.<br>🌑 🌓 🌔 🌕 🌖 🌘 🌑<br>new -------- full -------- new<br>I could elaborate more but<br>my zip is almost full now,<br>so you see, I shouldn't waste<br>any more bytes by <br>writing useless stuff<br>that no one will read anyway,<br>in a virtual book.<br>For example, just this one <br>costs me almost a kilobyte,<br>which is totally unreasonable,<br>so let's stop this nonsense,<br>shall we?"
  bookcover.className = "";
}

book23 = () => {
  i=2,j=3;
  bookcover.innerHTML = "On which side does a horse have the most hair?"
  bookcover.style.background = `hsl(${(i*5+j*15)*20} 50% ${63}%)`
  book.innerHTML = "The outside"
  bookcover.className = "";
}