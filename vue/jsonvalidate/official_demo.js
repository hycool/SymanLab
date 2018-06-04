
document.querySelector('h1').innerHTML += " v"+neatJSON.version;
var opts = document.querySelectorAll('input');
[].forEach.call(opts,function(opt){
  opt.addEventListener('input',neaten,false);
  opt.addEventListener('change',neaten,false);
  opt.addEventListener('click',neaten,false);
})

var inp = document.querySelector('#input'),
  cde = document.querySelector('#code'),
  out = document.querySelector('#output');
var opts;

var wrap  = document.querySelector('#wrap'),
  wdth  = document.querySelector('#wrapSize'),
  shrt  = document.querySelector('#short'),
  dec0  = document.querySelector('#useDecimals'),
  decN  = document.querySelector('#decimals'),
  sort  = document.querySelector('#sorted'),
  algn  = document.querySelector('#aligned'),
  tabs  = document.querySelector('#tabs'),
  indN  = document.querySelector('#indent'),
  indL  = document.querySelector('#indentlast'),
  arrayPadding  = document.querySelector('#arrayPadding'),
  objectPadding = document.querySelector('#objectPadding'),
  beforeComma   = document.querySelector('#beforeComma'),
  afterComma    = document.querySelector('#afterComma'),
  beforeColon1  = document.querySelector('#beforeColon1'),
  afterColon1   = document.querySelector('#afterColon1'),
  beforeColonN  = document.querySelector('#beforeColonN'),
  afterColonN   = document.querySelector('#afterColonN');

window.onload = neaten;
inp.addEventListener('input',neaten,false);

var lastInput,lastCommand,commandText;
function neaten(){
  changeOptions();
  if (isEmpty(opts)) commandText = "neatJSON(obj)";
  else{
    var parts=[];
    for (var k in opts) parts.push('<b>'+k+'<\/b>:'+JSON.stringify(opts[k]));
    commandText = "neatJSON(obj,{ "+parts.join(', ')+" })";
  }
  if (commandText==lastCommand && inp.value==lastInput) return;
  lastCommand = commandText;
  lastInput   = inp.value;

  var error;
  try {
    var obj = JSON.parse(inp.value);
  } catch(e1){
    error=e1;
    if (e1 instanceof SyntaxError){
      try {
        eval("var obj = "+inp.value);
      } catch(e2){
        obj = undefined;
      }
    }
  }
  if (obj===undefined){
    out.innerHTML = error;
  }else{
    var start = new Date;
    out.innerHTML = neatJSON(obj,opts).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    var elapsed = new Date-start;
    console.log(commandText.replace(/<\/?b>/g,'')+" took "+elapsed+"ms");
    code.innerHTML = "var json = "+commandText+"; <i>// took ~"+elapsed+"ms<\/i>";
  }
}

function changeOptions() {
  opts = {};
  if (!wrap.checked || wdth.value!=80) opts.wrap = wrap.checked ? (wdth.value=='' ? true : wdth.value*1) : false;
  if (wrap.checked && shrt.checked) opts.short = true;
  document.querySelector('#wrapopts1').style.visibility = wrap.checked ? '' : 'hidden';
  document.querySelector('#wrapopts2').style.visibility = wrap.checked ? '' : 'hidden';
  document.querySelector('#wrapopts3').style.visibility = wrap.checked ? '' : 'hidden';
  document.querySelector('#wrapopts4').style.visibility = wrap.checked ? (shrt.checked ? 'hidden' : '') : 'hidden';
  document.querySelector('#wrapopts5').style.visibility = wrap.checked ? (shrt.checked ? 'hidden' : '') : 'hidden';

  if ((indN.value!=2 || tabs.checked) && (wrap.checked && !shrt.checked)) opts.indent = repeat(tabs.checked ? '\t' : ' ',indN.value*1);
  if (indL.checked && wrap.checked && !shrt.checked) opts.indentLast = true;

  if (dec0.checked){
    opts.decimals = decN.value*1;
    decN.style.display = '';
  }else{
    decN.style.display = 'none';
  }

  if (sort.checked) opts.sort = true;
  if (wrap.checked && algn.checked) opts.aligned = true;

  if (arrayPadding.value!=0 && objectPadding.value==arrayPadding.value){
    opts.padding = arrayPadding.value*1;
  }else{
    if (arrayPadding.value!=0) opts.arrayPadding = arrayPadding.value*1;
    if (objectPadding.value!=0) opts.objectPadding = objectPadding.value*1;
  }
  if (beforeComma.value!=0 && beforeComma.value==afterComma.value){
    opts.aroundComma = beforeComma.value*1;
  }else{
    if (beforeComma.value!=0) opts.beforeComma = beforeComma.value*1;
    if (afterComma.value!=0) opts.afterComma = afterComma.value*1;
  }
  if (beforeColon1.value!=0 && afterColon1.value!=0 && beforeColonN.value!=0 && afterColonN.value==beforeColonN.value && beforeColon1.value==afterColon1.value && beforeColon1.value==beforeColonN.value){
    opts.aroundColon = beforeColon1.value*1;
  }else{
    if (beforeColon1.value!=0 && beforeColon1.value==afterColon1.value){
      opts.aroundColon1 = beforeColon1.value*1;
    }else{
      if (beforeColon1.value!=0) opts.beforeColon1 = beforeColon1.value*1;
      if (afterColon1.value!=0)  opts.afterColon1  = afterColon1.value*1;
    }
    if (beforeColonN.value!=0 && beforeColonN.value==afterColonN.value){
      opts.aroundColonN = beforeColonN.value*1;
    }else{
      if (beforeColonN.value!=0) opts.beforeColonN = beforeColonN.value*1;
      if (afterColonN.value!=0)  opts.afterColonN  = afterColonN.value*1;
    }
  }
}

function repeat(str,times){ // http://stackoverflow.com/a/17800645/405017
  var result = '';
  while(true){
    if (times & 1) result += str;
    times >>= 1;
    if (times) str += str;
    else break;
  }
  return result;
}

function isEmpty(obj){
  for (var k in obj) return false;
  return true;
}
