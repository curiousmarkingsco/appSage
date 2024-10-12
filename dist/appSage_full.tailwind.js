/* File: ./app/js/tailwind.js */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*                                                                           */
/* This file is pulled from:                                                 */
/* https://cdn.tailwindcss.com/3.4.5                                         */
/* This is so that offline development is possible.                          */
/* To make this work, comment out any instances in this repository of        */
/* `<script src="https://cdn.tailwindcss.com"></script>` and uncomment:      */
/* <script src="./js/tailwind.js"></script>                                  */
/*                                                                           */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
(()=>{var wb=Object.create;var li=Object.defineProperty;var bb=Object.getOwnPropertyDescriptor;var vb=Object.getOwnPropertyNames;var xb=Object.getPrototypeOf,kb=Object.prototype.hasOwnProperty;var au=i=>li(i,"__esModule",{value:!0});var ou=i=>{if(typeof require!="undefined")return require(i);throw new Error('Dynamic require of "'+i+'" is not supported')};var C=(i,e)=>()=>(i&&(e=i(i=0)),e);var v=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports),_e=(i,e)=>{au(i);for(var t in e)li(i,t,{get:e[t],enumerable:!0})},Sb=(i,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of vb(e))!kb.call(i,r)&&r!=="default"&&li(i,r,{get:()=>e[r],enumerable:!(t=bb(e,r))||t.enumerable});return i},X=i=>Sb(au(li(i!=null?wb(xb(i)):{},"default",i&&i.__esModule&&"default"in i?{get:()=>i.default,enumerable:!0}:{value:i,enumerable:!0})),i);var h,l=C(()=>{h={platform:"",env:{},versions:{node:"14.17.6"}}});var Cb,re,je=C(()=>{l();Cb=0,re={readFileSync:i=>self[i]||"",statSync:()=>({mtimeMs:Cb++}),promises:{readFile:i=>Promise.resolve(self[i]||"")}}});var Qn=v((PO,uu)=>{l();"use strict";var lu=class{constructor(e={}){if(!(e.maxSize&&e.maxSize>0))throw new TypeError("`maxSize` must be a number greater than 0");if(typeof e.maxAge=="number"&&e.maxAge===0)throw new TypeError("`maxAge` must be a number greater than 0");this.maxSize=e.maxSize,this.maxAge=e.maxAge||1/0,this.onEviction=e.onEviction,this.cache=new Map,this.oldCache=new Map,this._size=0}_emitEvictions(e){if(typeof this.onEviction=="function")for(let[t,r]of e)this.onEviction(t,r.value)}_deleteIfExpired(e,t){return typeof t.expiry=="number"&&t.expiry<=Date.now()?(typeof this.onEviction=="function"&&this.onEviction(e,t.value),this.delete(e)):!1}_getOrDeleteIfExpired(e,t){if(this._deleteIfExpired(e,t)===!1)return t.value}_getItemValue(e,t){return t.expiry?this._getOrDeleteIfExpired(e,t):t.value}_peek(e,t){let r=t.get(e);return this._getItemValue(e,r)}_set(e,t){this.cache.set(e,t),this._size++,this._size>=this.maxSize&&(this._size=0,this._emitEvictions(this.oldCache),this.oldCache=this.cache,this.cache=new Map)}_moveToRecent(e,t){this.oldCache.delete(e),this._set(e,t)}*_entriesAscending(){for(let e of this.oldCache){let[t,r]=e;this.cache.has(t)||this._deleteIfExpired(t,r)===!1&&(yield e)}for(let e of this.cache){let[t,r]=e;this._deleteIfExpired(t,r)===!1&&(yield e)}}get(e){if(this.cache.has(e)){let t=this.cache.get(e);return this._getItemValue(e,t)}if(this.oldCache.has(e)){let t=this.oldCache.get(e);if(this._deleteIfExpired(e,t)===!1)return this._moveToRecent(e,t),t.value}}set(e,t,{maxAge:r=this.maxAge===1/0?void 0:Date.now()+this.maxAge}={}){this.cache.has(e)?this.cache.set(e,{value:t,maxAge:r}):this._set(e,{value:t,expiry:r})}has(e){return this.cache.has(e)?!this._deleteIfExpired(e,this.cache.get(e)):this.oldCache.has(e)?!this._deleteIfExpired(e,this.oldCache.get(e)):!1}peek(e){if(this.cache.has(e))return this._peek(e,this.cache);if(this.oldCache.has(e))return this._peek(e,this.oldCache)}delete(e){let t=this.cache.delete(e);return t&&this._size--,this.oldCache.delete(e)||t}clear(){this.cache.clear(),this.oldCache.clear(),this._size=0}resize(e){if(!(e&&e>0))throw new TypeError("`maxSize` must be a number greater than 0");let t=[...this._entriesAscending()],r=t.length-e;r<0?(this.cache=new Map(t),this.oldCache=new Map,this._size=t.length):(r>0&&this._emitEvictions(t.slice(0,r)),this.oldCache=new Map(t.slice(r)),this.cache=new Map,this._size=0),this.maxSize=e}*keys(){for(let[e]of this)yield e}*values(){for(let[,e]of this)yield e}*[Symbol.iterator](){for(let e of this.cache){let[t,r]=e;this._deleteIfExpired(t,r)===!1&&(yield[t,r.value])}for(let e of this.oldCache){let[t,r]=e;this.cache.has(t)||this._deleteIfExpired(t,r)===!1&&(yield[t,r.value])}}*entriesDescending(){let e=[...this.cache];for(let t=e.length-1;t>=0;--t){let r=e[t],[n,a]=r;this._deleteIfExpired(n,a)===!1&&(yield[n,a.value])}e=[...this.oldCache];for(let t=e.length-1;t>=0;--t){let r=e[t],[n,a]=r;this.cache.has(n)||this._deleteIfExpired(n,a)===!1&&(yield[n,a.value])}}*entriesAscending(){for(let[e,t]of this._entriesAscending())yield[e,t.value]}get size(){if(!this._size)return this.oldCache.size;let e=0;for(let t of this.oldCache.keys())this.cache.has(t)||e++;return Math.min(this._size+e,this.maxSize)}};uu.exports=lu});var fu,cu=C(()=>{l();fu=i=>i&&i._hash});function ui(i){return fu(i,{ignoreUnknown:!0})}var pu=C(()=>{l();cu()});function Xe(i){if(i=`${i}`,i==="0")return"0";if(/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(i))return i.replace(/^[+-]?/,t=>t==="-"?"":"-");let e=["var","calc","min","max","clamp"];for(let t of e)if(i.includes(`${t}(`))return`calc(${i} * -1)`}var fi=C(()=>{l()});var du,hu=C(()=>{l();du=["preflight","container","accessibility","pointerEvents","visibility","position","inset","isolation","zIndex","order","gridColumn","gridColumnStart","gridColumnEnd","gridRow","gridRowStart","gridRowEnd","float","clear","margin","boxSizing","lineClamp","display","aspectRatio","size","height","maxHeight","minHeight","width","minWidth","maxWidth","flex","flexShrink","flexGrow","flexBasis","tableLayout","captionSide","borderCollapse","borderSpacing","transformOrigin","translate","rotate","skew","scale","transform","animation","cursor","touchAction","userSelect","resize","scrollSnapType","scrollSnapAlign","scrollSnapStop","scrollMargin","scrollPadding","listStylePosition","listStyleType","listStyleImage","appearance","columns","breakBefore","breakInside","breakAfter","gridAutoColumns","gridAutoFlow","gridAutoRows","gridTemplateColumns","gridTemplateRows","flexDirection","flexWrap","placeContent","placeItems","alignContent","alignItems","justifyContent","justifyItems","gap","space","divideWidth","divideStyle","divideColor","divideOpacity","placeSelf","alignSelf","justifySelf","overflow","overscrollBehavior","scrollBehavior","textOverflow","hyphens","whitespace","textWrap","wordBreak","borderRadius","borderWidth","borderStyle","borderColor","borderOpacity","backgroundColor","backgroundOpacity","backgroundImage","gradientColorStops","boxDecorationBreak","backgroundSize","backgroundAttachment","backgroundClip","backgroundPosition","backgroundRepeat","backgroundOrigin","fill","stroke","strokeWidth","objectFit","objectPosition","padding","textAlign","textIndent","verticalAlign","fontFamily","fontSize","fontWeight","textTransform","fontStyle","fontVariantNumeric","lineHeight","letterSpacing","textColor","textOpacity","textDecoration","textDecorationColor","textDecorationStyle","textDecorationThickness","textUnderlineOffset","fontSmoothing","placeholderColor","placeholderOpacity","caretColor","accentColor","opacity","backgroundBlendMode","mixBlendMode","boxShadow","boxShadowColor","outlineStyle","outlineWidth","outlineOffset","outlineColor","ringWidth","ringColor","ringOpacity","ringOffsetWidth","ringOffsetColor","blur","brightness","contrast","dropShadow","grayscale","hueRotate","invert","saturate","sepia","filter","backdropBlur","backdropBrightness","backdropContrast","backdropGrayscale","backdropHueRotate","backdropInvert","backdropOpacity","backdropSaturate","backdropSepia","backdropFilter","transitionProperty","transitionDelay","transitionDuration","transitionTimingFunction","willChange","contain","content","forcedColorAdjust"]});function mu(i,e){return i===void 0?e:Array.isArray(i)?i:[...new Set(e.filter(r=>i!==!1&&i[r]!==!1).concat(Object.keys(i).filter(r=>i[r]!==!1)))]}var gu=C(()=>{l()});var yu={};_e(yu,{default:()=>Oe});var Oe,ci=C(()=>{l();Oe=new Proxy({},{get:()=>String})});function Jn(i,e,t){typeof h!="undefined"&&h.env.JEST_WORKER_ID||t&&wu.has(t)||(t&&wu.add(t),console.warn(""),e.forEach(r=>console.warn(i,"-",r)))}function Xn(i){return Oe.dim(i)}var wu,F,Ee=C(()=>{l();ci();wu=new Set;F={info(i,e){Jn(Oe.bold(Oe.cyan("info")),...Array.isArray(i)?[i]:[e,i])},warn(i,e){["content-problems"].includes(i)||Jn(Oe.bold(Oe.yellow("warn")),...Array.isArray(i)?[i]:[e,i])},risk(i,e){Jn(Oe.bold(Oe.magenta("risk")),...Array.isArray(i)?[i]:[e,i])}}});var bu={};_e(bu,{default:()=>Kn});function ar({version:i,from:e,to:t}){F.warn(`${e}-color-renamed`,[`As of Tailwind CSS ${i}, \`${e}\` has been renamed to \`${t}\`.`,"Update your configuration file to silence this warning."])}var Kn,Zn=C(()=>{l();Ee();Kn={inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000",white:"#fff",slate:{50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617"},gray:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712"},zinc:{50:"#fafafa",100:"#f4f4f5",200:"#e4e4e7",300:"#d4d4d8",400:"#a1a1aa",500:"#71717a",600:"#52525b",700:"#3f3f46",800:"#27272a",900:"#18181b",950:"#09090b"},neutral:{50:"#fafafa",100:"#f5f5f5",200:"#e5e5e5",300:"#d4d4d4",400:"#a3a3a3",500:"#737373",600:"#525252",700:"#404040",800:"#262626",900:"#171717",950:"#0a0a0a"},stone:{50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},orange:{50:"#fff7ed",100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12",950:"#431407"},amber:{50:"#fffbeb",100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f",950:"#451a03"},yellow:{50:"#fefce8",100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12",950:"#422006"},lime:{50:"#f7fee7",100:"#ecfccb",200:"#d9f99d",300:"#bef264",400:"#a3e635",500:"#84cc16",600:"#65a30d",700:"#4d7c0f",800:"#3f6212",900:"#365314",950:"#1a2e05"},green:{50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",950:"#052e16"},emerald:{50:"#ecfdf5",100:"#d1fae5",200:"#a7f3d0",300:"#6ee7b7",400:"#34d399",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46",900:"#064e3b",950:"#022c22"},teal:{50:"#f0fdfa",100:"#ccfbf1",200:"#99f6e4",300:"#5eead4",400:"#2dd4bf",500:"#14b8a6",600:"#0d9488",700:"#0f766e",800:"#115e59",900:"#134e4a",950:"#042f2e"},cyan:{50:"#ecfeff",100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63",950:"#083344"},sky:{50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e",950:"#082f49"},blue:{50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a",950:"#172554"},indigo:{50:"#eef2ff",100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",800:"#3730a3",900:"#312e81",950:"#1e1b4b"},violet:{50:"#f5f3ff",100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed",700:"#6d28d9",800:"#5b21b6",900:"#4c1d95",950:"#2e1065"},purple:{50:"#faf5ff",100:"#f3e8ff",200:"#e9d5ff",300:"#d8b4fe",400:"#c084fc",500:"#a855f7",600:"#9333ea",700:"#7e22ce",800:"#6b21a8",900:"#581c87",950:"#3b0764"},fuchsia:{50:"#fdf4ff",100:"#fae8ff",200:"#f5d0fe",300:"#f0abfc",400:"#e879f9",500:"#d946ef",600:"#c026d3",700:"#a21caf",800:"#86198f",900:"#701a75",950:"#4a044e"},pink:{50:"#fdf2f8",100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843",950:"#500724"},rose:{50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c",800:"#9f1239",900:"#881337",950:"#4c0519"},get lightBlue(){return ar({version:"v2.2",from:"lightBlue",to:"sky"}),this.sky},get warmGray(){return ar({version:"v3.0",from:"warmGray",to:"stone"}),this.stone},get trueGray(){return ar({version:"v3.0",from:"trueGray",to:"neutral"}),this.neutral},get coolGray(){return ar({version:"v3.0",from:"coolGray",to:"gray"}),this.gray},get blueGray(){return ar({version:"v3.0",from:"blueGray",to:"slate"}),this.slate}}});function es(i,...e){for(let t of e){for(let r in t)i?.hasOwnProperty?.(r)||(i[r]=t[r]);for(let r of Object.getOwnPropertySymbols(t))i?.hasOwnProperty?.(r)||(i[r]=t[r])}return i}var vu=C(()=>{l()});function Ke(i){if(Array.isArray(i))return i;let e=i.split("[").length-1,t=i.split("]").length-1;if(e!==t)throw new Error(`Path is invalid. Has unbalanced brackets: ${i}`);return i.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean)}var pi=C(()=>{l()});function Z(i,e){return di.future.includes(e)?i.future==="all"||(i?.future?.[e]??xu[e]??!1):di.experimental.includes(e)?i.experimental==="all"||(i?.experimental?.[e]??xu[e]??!1):!1}function ku(i){return i.experimental==="all"?di.experimental:Object.keys(i?.experimental??{}).filter(e=>di.experimental.includes(e)&&i.experimental[e])}function Su(i){if(h.env.JEST_WORKER_ID===void 0&&ku(i).length>0){let e=ku(i).map(t=>Oe.yellow(t)).join(", ");F.warn("experimental-flags-enabled",[`You have enabled experimental features: ${e}`,"Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time."])}}var xu,di,ze=C(()=>{l();ci();Ee();xu={optimizeUniversalDefaults:!1,generalizedModifiers:!0,disableColorOpacityUtilitiesByDefault:!1,relativeContentPathsByDefault:!1},di={future:["hoverOnlyWhenSupported","respectDefaultRingColorOpacity","disableColorOpacityUtilitiesByDefault","relativeContentPathsByDefault"],experimental:["optimizeUniversalDefaults","generalizedModifiers"]}});function Cu(i){(()=>{if(i.purge||!i.content||!Array.isArray(i.content)&&!(typeof i.content=="object"&&i.content!==null))return!1;if(Array.isArray(i.content))return i.content.every(t=>typeof t=="string"?!0:!(typeof t?.raw!="string"||t?.extension&&typeof t?.extension!="string"));if(typeof i.content=="object"&&i.content!==null){if(Object.keys(i.content).some(t=>!["files","relative","extract","transform"].includes(t)))return!1;if(Array.isArray(i.content.files)){if(!i.content.files.every(t=>typeof t=="string"?!0:!(typeof t?.raw!="string"||t?.extension&&typeof t?.extension!="string")))return!1;if(typeof i.content.extract=="object"){for(let t of Object.values(i.content.extract))if(typeof t!="function")return!1}else if(!(i.content.extract===void 0||typeof i.content.extract=="function"))return!1;if(typeof i.content.transform=="object"){for(let t of Object.values(i.content.transform))if(typeof t!="function")return!1}else if(!(i.content.transform===void 0||typeof i.content.transform=="function"))return!1;if(typeof i.content.relative!="boolean"&&typeof i.content.relative!="undefined")return!1}return!0}return!1})()||F.warn("purge-deprecation",["The `purge`/`content` options have changed in Tailwind CSS v3.0.","Update your configuration file to eliminate this warning.","https://tailwindcss.com/docs/upgrade-guide#configure-content-sources"]),i.safelist=(()=>{let{content:t,purge:r,safelist:n}=i;return Array.isArray(n)?n:Array.isArray(t?.safelist)?t.safelist:Array.isArray(r?.safelist)?r.safelist:Array.isArray(r?.options?.safelist)?r.options.safelist:[]})(),i.blocklist=(()=>{let{blocklist:t}=i;if(Array.isArray(t)){if(t.every(r=>typeof r=="string"))return t;F.warn("blocklist-invalid",["The `blocklist` option must be an array of strings.","https://tailwindcss.com/docs/content-configuration#discarding-classes"])}return[]})(),typeof i.prefix=="function"?(F.warn("prefix-function",["As of Tailwind CSS v3.0, `prefix` cannot be a function.","Update `prefix` in your configuration to be a string to eliminate this warning.","https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function"]),i.prefix=""):i.prefix=i.prefix??"",i.content={relative:(()=>{let{content:t}=i;return t?.relative?t.relative:Z(i,"relativeContentPathsByDefault")})(),files:(()=>{let{content:t,purge:r}=i;return Array.isArray(r)?r:Array.isArray(r?.content)?r.content:Array.isArray(t)?t:Array.isArray(t?.content)?t.content:Array.isArray(t?.files)?t.files:[]})(),extract:(()=>{let t=(()=>i.purge?.extract?i.purge.extract:i.content?.extract?i.content.extract:i.purge?.extract?.DEFAULT?i.purge.extract.DEFAULT:i.content?.extract?.DEFAULT?i.content.extract.DEFAULT:i.purge?.options?.extractors?i.purge.options.extractors:i.content?.options?.extractors?i.content.options.extractors:{})(),r={},n=(()=>{if(i.purge?.options?.defaultExtractor)return i.purge.options.defaultExtractor;if(i.content?.options?.defaultExtractor)return i.content.options.defaultExtractor})();if(n!==void 0&&(r.DEFAULT=n),typeof t=="function")r.DEFAULT=t;else if(Array.isArray(t))for(let{extensions:a,extractor:s}of t??[])for(let o of a)r[o]=s;else typeof t=="object"&&t!==null&&Object.assign(r,t);return r})(),transform:(()=>{let t=(()=>i.purge?.transform?i.purge.transform:i.content?.transform?i.content.transform:i.purge?.transform?.DEFAULT?i.purge.transform.DEFAULT:i.content?.transform?.DEFAULT?i.content.transform.DEFAULT:{})(),r={};return typeof t=="function"?r.DEFAULT=t:typeof t=="object"&&t!==null&&Object.assign(r,t),r})()};for(let t of i.content.files)if(typeof t=="string"&&/{([^,]*?)}/g.test(t)){F.warn("invalid-glob-braces",[`The glob pattern ${Xn(t)} in your Tailwind CSS configuration is invalid.`,`Update it to ${Xn(t.replace(/{([^,]*?)}/g,"$1"))} to silence this warning.`]);break}return i}var Au=C(()=>{l();ze();Ee()});function se(i){if(Object.prototype.toString.call(i)!=="[object Object]")return!1;let e=Object.getPrototypeOf(i);return e===null||Object.getPrototypeOf(e)===null}var Ct=C(()=>{l()});function Ze(i){return Array.isArray(i)?i.map(e=>Ze(e)):typeof i=="object"&&i!==null?Object.fromEntries(Object.entries(i).map(([e,t])=>[e,Ze(t)])):i}var hi=C(()=>{l()});function gt(i){return i.replace(/\\,/g,"\\2c ")}var mi=C(()=>{l()});var ts,_u=C(()=>{l();ts={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});function or(i,{loose:e=!1}={}){if(typeof i!="string")return null;if(i=i.trim(),i==="transparent")return{mode:"rgb",color:["0","0","0"],alpha:"0"};if(i in ts)return{mode:"rgb",color:ts[i].map(a=>a.toString())};let t=i.replace(_b,(a,s,o,u,c)=>["#",s,s,o,o,u,u,c?c+c:""].join("")).match(Ab);if(t!==null)return{mode:"rgb",color:[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)].map(a=>a.toString()),alpha:t[4]?(parseInt(t[4],16)/255).toString():void 0};let r=i.match(Ob)??i.match(Eb);if(r===null)return null;let n=[r[2],r[3],r[4]].filter(Boolean).map(a=>a.toString());return n.length===2&&n[0].startsWith("var(")?{mode:r[1],color:[n[0]],alpha:n[1]}:!e&&n.length!==3||n.length<3&&!n.some(a=>/^var\(.*?\)$/.test(a))?null:{mode:r[1],color:n,alpha:r[5]?.toString?.()}}function rs({mode:i,color:e,alpha:t}){let r=t!==void 0;return i==="rgba"||i==="hsla"?`${i}(${e.join(", ")}${r?`, ${t}`:""})`:`${i}(${e.join(" ")}${r?` / ${t}`:""})`}var Ab,_b,et,gi,Ou,tt,Ob,Eb,is=C(()=>{l();_u();Ab=/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,_b=/^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,et=/(?:\d+|\d*\.\d+)%?/,gi=/(?:\s*,\s*|\s+)/,Ou=/\s*[,/]\s*/,tt=/var\(--(?:[^ )]*?)(?:,(?:[^ )]*?|var\(--[^ )]*?\)))?\)/,Ob=new RegExp(`^(rgba?)\\(\\s*(${et.source}|${tt.source})(?:${gi.source}(${et.source}|${tt.source}))?(?:${gi.source}(${et.source}|${tt.source}))?(?:${Ou.source}(${et.source}|${tt.source}))?\\s*\\)$`),Eb=new RegExp(`^(hsla?)\\(\\s*((?:${et.source})(?:deg|rad|grad|turn)?|${tt.source})(?:${gi.source}(${et.source}|${tt.source}))?(?:${gi.source}(${et.source}|${tt.source}))?(?:${Ou.source}(${et.source}|${tt.source}))?\\s*\\)$`)});function qe(i,e,t){if(typeof i=="function")return i({opacityValue:e});let r=or(i,{loose:!0});return r===null?t:rs({...r,alpha:e})}function oe({color:i,property:e,variable:t}){let r=[].concat(e);if(typeof i=="function")return{[t]:"1",...Object.fromEntries(r.map(a=>[a,i({opacityVariable:t,opacityValue:`var(${t})`})]))};let n=or(i);return n===null?Object.fromEntries(r.map(a=>[a,i])):n.alpha!==void 0?Object.fromEntries(r.map(a=>[a,i])):{[t]:"1",...Object.fromEntries(r.map(a=>[a,rs({...n,alpha:`var(${t})`})]))}}var lr=C(()=>{l();is()});function ie(i,e){let t=[],r=[],n=0,a=!1;for(let s=0;s<i.length;s++){let o=i[s];t.length===0&&o===e[0]&&!a&&(e.length===1||i.slice(s,s+e.length)===e)&&(r.push(i.slice(n,s)),n=s+e.length),a=a?!1:o==="\\",o==="("||o==="["||o==="{"?t.push(o):(o===")"&&t[t.length-1]==="("||o==="]"&&t[t.length-1]==="["||o==="}"&&t[t.length-1]==="{")&&t.pop()}return r.push(i.slice(n)),r}var yt=C(()=>{l()});function yi(i){return ie(i,",").map(t=>{let r=t.trim(),n={raw:r},a=r.split(Pb),s=new Set;for(let o of a)Eu.lastIndex=0,!s.has("KEYWORD")&&Tb.has(o)?(n.keyword=o,s.add("KEYWORD")):Eu.test(o)?s.has("X")?s.has("Y")?s.has("BLUR")?s.has("SPREAD")||(n.spread=o,s.add("SPREAD")):(n.blur=o,s.add("BLUR")):(n.y=o,s.add("Y")):(n.x=o,s.add("X")):n.color?(n.unknown||(n.unknown=[]),n.unknown.push(o)):n.color=o;return n.valid=n.x!==void 0&&n.y!==void 0,n})}function Tu(i){return i.map(e=>e.valid?[e.keyword,e.x,e.y,e.blur,e.spread,e.color].filter(Boolean).join(" "):e.raw).join(", ")}var Tb,Pb,Eu,ns=C(()=>{l();yt();Tb=new Set(["inset","inherit","initial","revert","unset"]),Pb=/\ +(?![^(]*\))/g,Eu=/^-?(\d+|\.\d+)(.*?)$/g});function ss(i){return Db.some(e=>new RegExp(`^${e}\\(.*\\)`).test(i))}function N(i,e=null,t=!0){let r=e&&Ib.has(e.property);return i.startsWith("--")&&!r?`var(${i})`:i.includes("url(")?i.split(/(url\(.*?\))/g).filter(Boolean).map(n=>/^url\(.*?\)$/.test(n)?n:N(n,e,!1)).join(""):(i=i.replace(/([^\\])_+/g,(n,a)=>a+" ".repeat(n.length-1)).replace(/^_/g," ").replace(/\\_/g,"_"),t&&(i=i.trim()),i=qb(i),i)}function qb(i){let e=["theme"],t=["min-content","max-content","fit-content","safe-area-inset-top","safe-area-inset-right","safe-area-inset-bottom","safe-area-inset-left","titlebar-area-x","titlebar-area-y","titlebar-area-width","titlebar-area-height","keyboard-inset-top","keyboard-inset-right","keyboard-inset-bottom","keyboard-inset-left","keyboard-inset-width","keyboard-inset-height","radial-gradient","linear-gradient","conic-gradient","repeating-radial-gradient","repeating-linear-gradient","repeating-conic-gradient"];return i.replace(/(calc|min|max|clamp)\(.+\)/g,r=>{let n="";function a(){let s=n.trimEnd();return s[s.length-1]}for(let s=0;s<r.length;s++){let o=function(f){return f.split("").every((d,p)=>r[s+p]===d)},u=function(f){let d=1/0;for(let m of f){let b=r.indexOf(m,s);b!==-1&&b<d&&(d=b)}let p=r.slice(s,d);return s+=p.length-1,p},c=r[s];if(o("var"))n+=u([")",","]);else if(t.some(f=>o(f))){let f=t.find(d=>o(d));n+=f,s+=f.length-1}else e.some(f=>o(f))?n+=u([")"]):o("[")?n+=u(["]"]):["+","-","*","/"].includes(c)&&!["(","+","-","*","/",","].includes(a())?n+=` ${c} `:n+=c}return n.replace(/\s+/g," ")})}function as(i){return i.startsWith("url(")}function os(i){return!isNaN(Number(i))||ss(i)}function ur(i){return i.endsWith("%")&&os(i.slice(0,-1))||ss(i)}function fr(i){return i==="0"||new RegExp(`^[+-]?[0-9]*.?[0-9]+(?:[eE][+-]?[0-9]+)?${Mb}$`).test(i)||ss(i)}function Pu(i){return Bb.has(i)}function Du(i){let e=yi(N(i));for(let t of e)if(!t.valid)return!1;return!0}function Iu(i){let e=0;return ie(i,"_").every(r=>(r=N(r),r.startsWith("var(")?!0:or(r,{loose:!0})!==null?(e++,!0):!1))?e>0:!1}function qu(i){let e=0;return ie(i,",").every(r=>(r=N(r),r.startsWith("var(")?!0:as(r)||Nb(r)||["element(","image(","cross-fade(","image-set("].some(n=>r.startsWith(n))?(e++,!0):!1))?e>0:!1}function Nb(i){i=N(i);for(let e of Fb)if(i.startsWith(`${e}(`))return!0;return!1}function Ru(i){let e=0;return ie(i,"_").every(r=>(r=N(r),r.startsWith("var(")?!0:Lb.has(r)||fr(r)||ur(r)?(e++,!0):!1))?e>0:!1}function Mu(i){let e=0;return ie(i,",").every(r=>(r=N(r),r.startsWith("var(")?!0:r.includes(" ")&&!/(['"])([^"']+)\1/g.test(r)||/^\d/g.test(r)?!1:(e++,!0)))?e>0:!1}function Bu(i){return $b.has(i)}function Fu(i){return jb.has(i)}function Nu(i){return zb.has(i)}var Db,Ib,Rb,Mb,Bb,Fb,Lb,$b,jb,zb,cr=C(()=>{l();is();ns();yt();Db=["min","max","clamp","calc"];Ib=new Set(["scroll-timeline-name","timeline-scope","view-timeline-name","font-palette","anchor-name","anchor-scope","position-anchor","position-try-options","scroll-timeline","animation-timeline","view-timeline","position-try"]);Rb=["cm","mm","Q","in","pc","pt","px","em","ex","ch","rem","lh","rlh","vw","vh","vmin","vmax","vb","vi","svw","svh","lvw","lvh","dvw","dvh","cqw","cqh","cqi","cqb","cqmin","cqmax"],Mb=`(?:${Rb.join("|")})`;Bb=new Set(["thin","medium","thick"]);Fb=new Set(["conic-gradient","linear-gradient","radial-gradient","repeating-conic-gradient","repeating-linear-gradient","repeating-radial-gradient"]);Lb=new Set(["center","top","right","bottom","left"]);$b=new Set(["serif","sans-serif","monospace","cursive","fantasy","system-ui","ui-serif","ui-sans-serif","ui-monospace","ui-rounded","math","emoji","fangsong"]);jb=new Set(["xx-small","x-small","small","medium","large","x-large","xx-large","xxx-large"]);zb=new Set(["larger","smaller"])});function Lu(i){let e=["cover","contain"];return ie(i,",").every(t=>{let r=ie(t,"_").filter(Boolean);return r.length===1&&e.includes(r[0])?!0:r.length!==1&&r.length!==2?!1:r.every(n=>fr(n)||ur(n)||n==="auto")})}var $u=C(()=>{l();cr();yt()});function ju(i,e){i.walkClasses(t=>{t.value=e(t.value),t.raws&&t.raws.value&&(t.raws.value=gt(t.raws.value))})}function zu(i,e){if(!rt(i))return;let t=i.slice(1,-1);if(!!e(t))return N(t)}function Vb(i,e={},t){let r=e[i];if(r!==void 0)return Xe(r);if(rt(i)){let n=zu(i,t);return n===void 0?void 0:Xe(n)}}function wi(i,e={},{validate:t=()=>!0}={}){let r=e.values?.[i];return r!==void 0?r:e.supportsNegativeValues&&i.startsWith("-")?Vb(i.slice(1),e.values,t):zu(i,t)}function rt(i){return i.startsWith("[")&&i.endsWith("]")}function Vu(i){let e=i.lastIndexOf("/"),t=i.lastIndexOf("[",e),r=i.indexOf("]",e);return i[e-1]==="]"||i[e+1]==="["||t!==-1&&r!==-1&&t<e&&e<r&&(e=i.lastIndexOf("/",t)),e===-1||e===i.length-1?[i,void 0]:rt(i)&&!i.includes("]/[")?[i,void 0]:[i.slice(0,e),i.slice(e+1)]}function At(i){if(typeof i=="string"&&i.includes("<alpha-value>")){let e=i;return({opacityValue:t=1})=>e.replace(/<alpha-value>/g,t)}return i}function Uu(i){return N(i.slice(1,-1))}function Ub(i,e={},{tailwindConfig:t={}}={}){if(e.values?.[i]!==void 0)return At(e.values?.[i]);let[r,n]=Vu(i);if(n!==void 0){let a=e.values?.[r]??(rt(r)?r.slice(1,-1):void 0);return a===void 0?void 0:(a=At(a),rt(n)?qe(a,Uu(n)):t.theme?.opacity?.[n]===void 0?void 0:qe(a,t.theme.opacity[n]))}return wi(i,e,{validate:Iu})}function Wb(i,e={}){return e.values?.[i]}function ge(i){return(e,t)=>wi(e,t,{validate:i})}function Gb(i,e){let t=i.indexOf(e);return t===-1?[void 0,i]:[i.slice(0,t),i.slice(t+1)]}function us(i,e,t,r){if(t.values&&e in t.values)for(let{type:a}of i??[]){let s=ls[a](e,t,{tailwindConfig:r});if(s!==void 0)return[s,a,null]}if(rt(e)){let a=e.slice(1,-1),[s,o]=Gb(a,":");if(!/^[\w-_]+$/g.test(s))o=a;else if(s!==void 0&&!Wu.includes(s))return[];if(o.length>0&&Wu.includes(s))return[wi(`[${o}]`,t),s,null]}let n=fs(i,e,t,r);for(let a of n)return a;return[]}function*fs(i,e,t,r){let n=Z(r,"generalizedModifiers"),[a,s]=Vu(e);if(n&&t.modifiers!=null&&(t.modifiers==="any"||typeof t.modifiers=="object"&&(s&&rt(s)||s in t.modifiers))||(a=e,s=void 0),s!==void 0&&a===""&&(a="DEFAULT"),s!==void 0&&typeof t.modifiers=="object"){let u=t.modifiers?.[s]??null;u!==null?s=u:rt(s)&&(s=Uu(s))}for(let{type:u}of i??[]){let c=ls[u](a,t,{tailwindConfig:r});c!==void 0&&(yield[c,u,s??null])}}var ls,Wu,pr=C(()=>{l();mi();lr();cr();fi();$u();ze();ls={any:wi,color:Ub,url:ge(as),image:ge(qu),length:ge(fr),percentage:ge(ur),position:ge(Ru),lookup:Wb,"generic-name":ge(Bu),"family-name":ge(Mu),number:ge(os),"line-width":ge(Pu),"absolute-size":ge(Fu),"relative-size":ge(Nu),shadow:ge(Du),size:ge(Lu)},Wu=Object.keys(ls)});function L(i){return typeof i=="function"?i({}):i}var cs=C(()=>{l()});function _t(i){return typeof i=="function"}function dr(i,...e){let t=e.pop();for(let r of e)for(let n in r){let a=t(i[n],r[n]);a===void 0?se(i[n])&&se(r[n])?i[n]=dr({},i[n],r[n],t):i[n]=r[n]:i[n]=a}return i}function Hb(i,...e){return _t(i)?i(...e):i}function Yb(i){return i.reduce((e,{extend:t})=>dr(e,t,(r,n)=>r===void 0?[n]:Array.isArray(r)?[n,...r]:[n,r]),{})}function Qb(i){return{...i.reduce((e,t)=>es(e,t),{}),extend:Yb(i)}}function Gu(i,e){if(Array.isArray(i)&&se(i[0]))return i.concat(e);if(Array.isArray(e)&&se(e[0])&&se(i))return[i,...e];if(Array.isArray(e))return e}function Jb({extend:i,...e}){return dr(e,i,(t,r)=>!_t(t)&&!r.some(_t)?dr({},t,...r,Gu):(n,a)=>dr({},...[t,...r].map(s=>Hb(s,n,a)),Gu))}function*Xb(i){let e=Ke(i);if(e.length===0||(yield e,Array.isArray(i)))return;let t=/^(.*?)\s*\/\s*([^/]+)$/,r=i.match(t);if(r!==null){let[,n,a]=r,s=Ke(n);s.alpha=a,yield s}}function Kb(i){let e=(t,r)=>{for(let n of Xb(t)){let a=0,s=i;for(;s!=null&&a<n.length;)s=s[n[a++]],s=_t(s)&&(n.alpha===void 0||a<=n.length-1)?s(e,ps):s;if(s!==void 0){if(n.alpha!==void 0){let o=At(s);return qe(o,n.alpha,L(o))}return se(s)?Ze(s):s}}return r};return Object.assign(e,{theme:e,...ps}),Object.keys(i).reduce((t,r)=>(t[r]=_t(i[r])?i[r](e,ps):i[r],t),{})}function Hu(i){let e=[];return i.forEach(t=>{e=[...e,t];let r=t?.plugins??[];r.length!==0&&r.forEach(n=>{n.__isOptionsFunction&&(n=n()),e=[...e,...Hu([n?.config??{}])]})}),e}function Zb(i){return[...i].reduceRight((t,r)=>_t(r)?r({corePlugins:t}):mu(r,t),du)}function e0(i){return[...i].reduceRight((t,r)=>[...t,...r],[])}function ds(i){let e=[...Hu(i),{prefix:"",important:!1,separator:":"}];return Cu(es({theme:Kb(Jb(Qb(e.map(t=>t?.theme??{})))),corePlugins:Zb(e.map(t=>t.corePlugins)),plugins:e0(i.map(t=>t?.plugins??[]))},...e))}var ps,Yu=C(()=>{l();fi();hu();gu();Zn();vu();pi();Au();Ct();hi();pr();lr();cs();ps={colors:Kn,negative(i){return Object.keys(i).filter(e=>i[e]!=="0").reduce((e,t)=>{let r=Xe(i[t]);return r!==void 0&&(e[`-${t}`]=r),e},{})},breakpoints(i){return Object.keys(i).filter(e=>typeof i[e]=="string").reduce((e,t)=>({...e,[`screen-${t}`]:i[t]}),{})}}});var bi=v((qE,Qu)=>{l();Qu.exports={content:[],presets:[],darkMode:"media",theme:{accentColor:({theme:i})=>({...i("colors"),auto:"auto"}),animation:{none:"none",spin:"spin 1s linear infinite",ping:"ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",pulse:"pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",bounce:"bounce 1s infinite"},aria:{busy:'busy="true"',checked:'checked="true"',disabled:'disabled="true"',expanded:'expanded="true"',hidden:'hidden="true"',pressed:'pressed="true"',readonly:'readonly="true"',required:'required="true"',selected:'selected="true"'},aspectRatio:{auto:"auto",square:"1 / 1",video:"16 / 9"},backdropBlur:({theme:i})=>i("blur"),backdropBrightness:({theme:i})=>i("brightness"),backdropContrast:({theme:i})=>i("contrast"),backdropGrayscale:({theme:i})=>i("grayscale"),backdropHueRotate:({theme:i})=>i("hueRotate"),backdropInvert:({theme:i})=>i("invert"),backdropOpacity:({theme:i})=>i("opacity"),backdropSaturate:({theme:i})=>i("saturate"),backdropSepia:({theme:i})=>i("sepia"),backgroundColor:({theme:i})=>i("colors"),backgroundImage:{none:"none","gradient-to-t":"linear-gradient(to top, var(--tw-gradient-stops))","gradient-to-tr":"linear-gradient(to top right, var(--tw-gradient-stops))","gradient-to-r":"linear-gradient(to right, var(--tw-gradient-stops))","gradient-to-br":"linear-gradient(to bottom right, var(--tw-gradient-stops))","gradient-to-b":"linear-gradient(to bottom, var(--tw-gradient-stops))","gradient-to-bl":"linear-gradient(to bottom left, var(--tw-gradient-stops))","gradient-to-l":"linear-gradient(to left, var(--tw-gradient-stops))","gradient-to-tl":"linear-gradient(to top left, var(--tw-gradient-stops))"},backgroundOpacity:({theme:i})=>i("opacity"),backgroundPosition:{bottom:"bottom",center:"center",left:"left","left-bottom":"left bottom","left-top":"left top",right:"right","right-bottom":"right bottom","right-top":"right top",top:"top"},backgroundSize:{auto:"auto",cover:"cover",contain:"contain"},blur:{0:"0",none:"",sm:"4px",DEFAULT:"8px",md:"12px",lg:"16px",xl:"24px","2xl":"40px","3xl":"64px"},borderColor:({theme:i})=>({...i("colors"),DEFAULT:i("colors.gray.200","currentColor")}),borderOpacity:({theme:i})=>i("opacity"),borderRadius:{none:"0px",sm:"0.125rem",DEFAULT:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem",full:"9999px"},borderSpacing:({theme:i})=>({...i("spacing")}),borderWidth:{DEFAULT:"1px",0:"0px",2:"2px",4:"4px",8:"8px"},boxShadow:{sm:"0 1px 2px 0 rgb(0 0 0 / 0.05)",DEFAULT:"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",md:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",lg:"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",xl:"0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)","2xl":"0 25px 50px -12px rgb(0 0 0 / 0.25)",inner:"inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",none:"none"},boxShadowColor:({theme:i})=>i("colors"),brightness:{0:"0",50:".5",75:".75",90:".9",95:".95",100:"1",105:"1.05",110:"1.1",125:"1.25",150:"1.5",200:"2"},caretColor:({theme:i})=>i("colors"),colors:({colors:i})=>({inherit:i.inherit,current:i.current,transparent:i.transparent,black:i.black,white:i.white,slate:i.slate,gray:i.gray,zinc:i.zinc,neutral:i.neutral,stone:i.stone,red:i.red,orange:i.orange,amber:i.amber,yellow:i.yellow,lime:i.lime,green:i.green,emerald:i.emerald,teal:i.teal,cyan:i.cyan,sky:i.sky,blue:i.blue,indigo:i.indigo,violet:i.violet,purple:i.purple,fuchsia:i.fuchsia,pink:i.pink,rose:i.rose}),columns:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12","3xs":"16rem","2xs":"18rem",xs:"20rem",sm:"24rem",md:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem"},container:{},content:{none:"none"},contrast:{0:"0",50:".5",75:".75",100:"1",125:"1.25",150:"1.5",200:"2"},cursor:{auto:"auto",default:"default",pointer:"pointer",wait:"wait",text:"text",move:"move",help:"help","not-allowed":"not-allowed",none:"none","context-menu":"context-menu",progress:"progress",cell:"cell",crosshair:"crosshair","vertical-text":"vertical-text",alias:"alias",copy:"copy","no-drop":"no-drop",grab:"grab",grabbing:"grabbing","all-scroll":"all-scroll","col-resize":"col-resize","row-resize":"row-resize","n-resize":"n-resize","e-resize":"e-resize","s-resize":"s-resize","w-resize":"w-resize","ne-resize":"ne-resize","nw-resize":"nw-resize","se-resize":"se-resize","sw-resize":"sw-resize","ew-resize":"ew-resize","ns-resize":"ns-resize","nesw-resize":"nesw-resize","nwse-resize":"nwse-resize","zoom-in":"zoom-in","zoom-out":"zoom-out"},divideColor:({theme:i})=>i("borderColor"),divideOpacity:({theme:i})=>i("borderOpacity"),divideWidth:({theme:i})=>i("borderWidth"),dropShadow:{sm:"0 1px 1px rgb(0 0 0 / 0.05)",DEFAULT:["0 1px 2px rgb(0 0 0 / 0.1)","0 1px 1px rgb(0 0 0 / 0.06)"],md:["0 4px 3px rgb(0 0 0 / 0.07)","0 2px 2px rgb(0 0 0 / 0.06)"],lg:["0 10px 8px rgb(0 0 0 / 0.04)","0 4px 3px rgb(0 0 0 / 0.1)"],xl:["0 20px 13px rgb(0 0 0 / 0.03)","0 8px 5px rgb(0 0 0 / 0.08)"],"2xl":"0 25px 25px rgb(0 0 0 / 0.15)",none:"0 0 #0000"},fill:({theme:i})=>({none:"none",...i("colors")}),flex:{1:"1 1 0%",auto:"1 1 auto",initial:"0 1 auto",none:"none"},flexBasis:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%","1/12":"8.333333%","2/12":"16.666667%","3/12":"25%","4/12":"33.333333%","5/12":"41.666667%","6/12":"50%","7/12":"58.333333%","8/12":"66.666667%","9/12":"75%","10/12":"83.333333%","11/12":"91.666667%",full:"100%"}),flexGrow:{0:"0",DEFAULT:"1"},flexShrink:{0:"0",DEFAULT:"1"},fontFamily:{sans:["ui-sans-serif","system-ui","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"','"Noto Color Emoji"'],serif:["ui-serif","Georgia","Cambria",'"Times New Roman"',"Times","serif"],mono:["ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas",'"Liberation Mono"','"Courier New"',"monospace"]},fontSize:{xs:["0.75rem",{lineHeight:"1rem"}],sm:["0.875rem",{lineHeight:"1.25rem"}],base:["1rem",{lineHeight:"1.5rem"}],lg:["1.125rem",{lineHeight:"1.75rem"}],xl:["1.25rem",{lineHeight:"1.75rem"}],"2xl":["1.5rem",{lineHeight:"2rem"}],"3xl":["1.875rem",{lineHeight:"2.25rem"}],"4xl":["2.25rem",{lineHeight:"2.5rem"}],"5xl":["3rem",{lineHeight:"1"}],"6xl":["3.75rem",{lineHeight:"1"}],"7xl":["4.5rem",{lineHeight:"1"}],"8xl":["6rem",{lineHeight:"1"}],"9xl":["8rem",{lineHeight:"1"}]},fontWeight:{thin:"100",extralight:"200",light:"300",normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},gap:({theme:i})=>i("spacing"),gradientColorStops:({theme:i})=>i("colors"),gradientColorStopPositions:{"0%":"0%","5%":"5%","10%":"10%","15%":"15%","20%":"20%","25%":"25%","30%":"30%","35%":"35%","40%":"40%","45%":"45%","50%":"50%","55%":"55%","60%":"60%","65%":"65%","70%":"70%","75%":"75%","80%":"80%","85%":"85%","90%":"90%","95%":"95%","100%":"100%"},grayscale:{0:"0",DEFAULT:"100%"},gridAutoColumns:{auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"},gridAutoRows:{auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"},gridColumn:{auto:"auto","span-1":"span 1 / span 1","span-2":"span 2 / span 2","span-3":"span 3 / span 3","span-4":"span 4 / span 4","span-5":"span 5 / span 5","span-6":"span 6 / span 6","span-7":"span 7 / span 7","span-8":"span 8 / span 8","span-9":"span 9 / span 9","span-10":"span 10 / span 10","span-11":"span 11 / span 11","span-12":"span 12 / span 12","span-full":"1 / -1"},gridColumnEnd:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13"},gridColumnStart:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13"},gridRow:{auto:"auto","span-1":"span 1 / span 1","span-2":"span 2 / span 2","span-3":"span 3 / span 3","span-4":"span 4 / span 4","span-5":"span 5 / span 5","span-6":"span 6 / span 6","span-7":"span 7 / span 7","span-8":"span 8 / span 8","span-9":"span 9 / span 9","span-10":"span 10 / span 10","span-11":"span 11 / span 11","span-12":"span 12 / span 12","span-full":"1 / -1"},gridRowEnd:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13"},gridRowStart:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13"},gridTemplateColumns:{none:"none",subgrid:"subgrid",1:"repeat(1, minmax(0, 1fr))",2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))",4:"repeat(4, minmax(0, 1fr))",5:"repeat(5, minmax(0, 1fr))",6:"repeat(6, minmax(0, 1fr))",7:"repeat(7, minmax(0, 1fr))",8:"repeat(8, minmax(0, 1fr))",9:"repeat(9, minmax(0, 1fr))",10:"repeat(10, minmax(0, 1fr))",11:"repeat(11, minmax(0, 1fr))",12:"repeat(12, minmax(0, 1fr))"},gridTemplateRows:{none:"none",subgrid:"subgrid",1:"repeat(1, minmax(0, 1fr))",2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))",4:"repeat(4, minmax(0, 1fr))",5:"repeat(5, minmax(0, 1fr))",6:"repeat(6, minmax(0, 1fr))",7:"repeat(7, minmax(0, 1fr))",8:"repeat(8, minmax(0, 1fr))",9:"repeat(9, minmax(0, 1fr))",10:"repeat(10, minmax(0, 1fr))",11:"repeat(11, minmax(0, 1fr))",12:"repeat(12, minmax(0, 1fr))"},height:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%",full:"100%",screen:"100vh",svh:"100svh",lvh:"100lvh",dvh:"100dvh",min:"min-content",max:"max-content",fit:"fit-content"}),hueRotate:{0:"0deg",15:"15deg",30:"30deg",60:"60deg",90:"90deg",180:"180deg"},inset:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%",full:"100%"}),invert:{0:"0",DEFAULT:"100%"},keyframes:{spin:{to:{transform:"rotate(360deg)"}},ping:{"75%, 100%":{transform:"scale(2)",opacity:"0"}},pulse:{"50%":{opacity:".5"}},bounce:{"0%, 100%":{transform:"translateY(-25%)",animationTimingFunction:"cubic-bezier(0.8,0,1,1)"},"50%":{transform:"none",animationTimingFunction:"cubic-bezier(0,0,0.2,1)"}}},letterSpacing:{tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},lineHeight:{none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2",3:".75rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem"},listStyleType:{none:"none",disc:"disc",decimal:"decimal"},listStyleImage:{none:"none"},margin:({theme:i})=>({auto:"auto",...i("spacing")}),lineClamp:{1:"1",2:"2",3:"3",4:"4",5:"5",6:"6"},maxHeight:({theme:i})=>({...i("spacing"),none:"none",full:"100%",screen:"100vh",svh:"100svh",lvh:"100lvh",dvh:"100dvh",min:"min-content",max:"max-content",fit:"fit-content"}),maxWidth:({theme:i,breakpoints:e})=>({...i("spacing"),none:"none",xs:"20rem",sm:"24rem",md:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem",full:"100%",min:"min-content",max:"max-content",fit:"fit-content",prose:"65ch",...e(i("screens"))}),minHeight:({theme:i})=>({...i("spacing"),full:"100%",screen:"100vh",svh:"100svh",lvh:"100lvh",dvh:"100dvh",min:"min-content",max:"max-content",fit:"fit-content"}),minWidth:({theme:i})=>({...i("spacing"),full:"100%",min:"min-content",max:"max-content",fit:"fit-content"}),objectPosition:{bottom:"bottom",center:"center",left:"left","left-bottom":"left bottom","left-top":"left top",right:"right","right-bottom":"right bottom","right-top":"right top",top:"top"},opacity:{0:"0",5:"0.05",10:"0.1",15:"0.15",20:"0.2",25:"0.25",30:"0.3",35:"0.35",40:"0.4",45:"0.45",50:"0.5",55:"0.55",60:"0.6",65:"0.65",70:"0.7",75:"0.75",80:"0.8",85:"0.85",90:"0.9",95:"0.95",100:"1"},order:{first:"-9999",last:"9999",none:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12"},outlineColor:({theme:i})=>i("colors"),outlineOffset:{0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},outlineWidth:{0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},padding:({theme:i})=>i("spacing"),placeholderColor:({theme:i})=>i("colors"),placeholderOpacity:({theme:i})=>i("opacity"),ringColor:({theme:i})=>({DEFAULT:i("colors.blue.500","#3b82f6"),...i("colors")}),ringOffsetColor:({theme:i})=>i("colors"),ringOffsetWidth:{0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},ringOpacity:({theme:i})=>({DEFAULT:"0.5",...i("opacity")}),ringWidth:{DEFAULT:"3px",0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},rotate:{0:"0deg",1:"1deg",2:"2deg",3:"3deg",6:"6deg",12:"12deg",45:"45deg",90:"90deg",180:"180deg"},saturate:{0:"0",50:".5",100:"1",150:"1.5",200:"2"},scale:{0:"0",50:".5",75:".75",90:".9",95:".95",100:"1",105:"1.05",110:"1.1",125:"1.25",150:"1.5"},screens:{sm:"640px",md:"768px",lg:"1024px",xl:"1280px","2xl":"1536px"},scrollMargin:({theme:i})=>({...i("spacing")}),scrollPadding:({theme:i})=>i("spacing"),sepia:{0:"0",DEFAULT:"100%"},skew:{0:"0deg",1:"1deg",2:"2deg",3:"3deg",6:"6deg",12:"12deg"},space:({theme:i})=>({...i("spacing")}),spacing:{px:"1px",0:"0px",.5:"0.125rem",1:"0.25rem",1.5:"0.375rem",2:"0.5rem",2.5:"0.625rem",3:"0.75rem",3.5:"0.875rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem",11:"2.75rem",12:"3rem",14:"3.5rem",16:"4rem",20:"5rem",24:"6rem",28:"7rem",32:"8rem",36:"9rem",40:"10rem",44:"11rem",48:"12rem",52:"13rem",56:"14rem",60:"15rem",64:"16rem",72:"18rem",80:"20rem",96:"24rem"},stroke:({theme:i})=>({none:"none",...i("colors")}),strokeWidth:{0:"0",1:"1",2:"2"},supports:{},data:{},textColor:({theme:i})=>i("colors"),textDecorationColor:({theme:i})=>i("colors"),textDecorationThickness:{auto:"auto","from-font":"from-font",0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},textIndent:({theme:i})=>({...i("spacing")}),textOpacity:({theme:i})=>i("opacity"),textUnderlineOffset:{auto:"auto",0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},transformOrigin:{center:"center",top:"top","top-right":"top right",right:"right","bottom-right":"bottom right",bottom:"bottom","bottom-left":"bottom left",left:"left","top-left":"top left"},transitionDelay:{0:"0s",75:"75ms",100:"100ms",150:"150ms",200:"200ms",300:"300ms",500:"500ms",700:"700ms",1e3:"1000ms"},transitionDuration:{DEFAULT:"150ms",0:"0s",75:"75ms",100:"100ms",150:"150ms",200:"200ms",300:"300ms",500:"500ms",700:"700ms",1e3:"1000ms"},transitionProperty:{none:"none",all:"all",DEFAULT:"color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",colors:"color, background-color, border-color, text-decoration-color, fill, stroke",opacity:"opacity",shadow:"box-shadow",transform:"transform"},transitionTimingFunction:{DEFAULT:"cubic-bezier(0.4, 0, 0.2, 1)",linear:"linear",in:"cubic-bezier(0.4, 0, 1, 1)",out:"cubic-bezier(0, 0, 0.2, 1)","in-out":"cubic-bezier(0.4, 0, 0.2, 1)"},translate:({theme:i})=>({...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%",full:"100%"}),size:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%","1/12":"8.333333%","2/12":"16.666667%","3/12":"25%","4/12":"33.333333%","5/12":"41.666667%","6/12":"50%","7/12":"58.333333%","8/12":"66.666667%","9/12":"75%","10/12":"83.333333%","11/12":"91.666667%",full:"100%",min:"min-content",max:"max-content",fit:"fit-content"}),width:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%","1/12":"8.333333%","2/12":"16.666667%","3/12":"25%","4/12":"33.333333%","5/12":"41.666667%","6/12":"50%","7/12":"58.333333%","8/12":"66.666667%","9/12":"75%","10/12":"83.333333%","11/12":"91.666667%",full:"100%",screen:"100vw",svw:"100svw",lvw:"100lvw",dvw:"100dvw",min:"min-content",max:"max-content",fit:"fit-content"}),willChange:{auto:"auto",scroll:"scroll-position",contents:"contents",transform:"transform"},zIndex:{auto:"auto",0:"0",10:"10",20:"20",30:"30",40:"40",50:"50"}},plugins:[]}});function vi(i){let e=(i?.presets??[Ju.default]).slice().reverse().flatMap(n=>vi(n instanceof Function?n():n)),t={respectDefaultRingColorOpacity:{theme:{ringColor:({theme:n})=>({DEFAULT:"#3b82f67f",...n("colors")})}},disableColorOpacityUtilitiesByDefault:{corePlugins:{backgroundOpacity:!1,borderOpacity:!1,divideOpacity:!1,placeholderOpacity:!1,ringOpacity:!1,textOpacity:!1}}},r=Object.keys(t).filter(n=>Z(i,n)).map(n=>t[n]);return[i,...r,...e]}var Ju,Xu=C(()=>{l();Ju=X(bi());ze()});var Ku={};_e(Ku,{default:()=>hr});function hr(...i){let[,...e]=vi(i[0]);return ds([...i,...e])}var hs=C(()=>{l();Yu();Xu()});var Zu={};_e(Zu,{default:()=>ee});var ee,wt=C(()=>{l();ee={resolve:i=>i,extname:i=>"."+i.split(".").pop()}});function xi(i){return typeof i=="object"&&i!==null}function r0(i){return Object.keys(i).length===0}function ef(i){return typeof i=="string"||i instanceof String}function ms(i){return xi(i)&&i.config===void 0&&!r0(i)?null:xi(i)&&i.config!==void 0&&ef(i.config)?ee.resolve(i.config):xi(i)&&i.config!==void 0&&xi(i.config)?null:ef(i)?ee.resolve(i):i0()}function i0(){for(let i of t0)try{let e=ee.resolve(i);return re.accessSync(e),e}catch(e){}return null}var t0,tf=C(()=>{l();je();wt();t0=["./tailwind.config.js","./tailwind.config.cjs","./tailwind.config.mjs","./tailwind.config.ts","./tailwind.config.cts","./tailwind.config.mts"]});var rf={};_e(rf,{default:()=>gs});var gs,ys=C(()=>{l();gs={parse:i=>({href:i})}});var ws=v(()=>{l()});var ki=v((VE,af)=>{l();"use strict";var nf=(ci(),yu),sf=ws(),Ot=class extends Error{constructor(e,t,r,n,a,s){super(e);this.name="CssSyntaxError",this.reason=e,a&&(this.file=a),n&&(this.source=n),s&&(this.plugin=s),typeof t!="undefined"&&typeof r!="undefined"&&(typeof t=="number"?(this.line=t,this.column=r):(this.line=t.line,this.column=t.column,this.endLine=r.line,this.endColumn=r.column)),this.setMessage(),Error.captureStackTrace&&Error.captureStackTrace(this,Ot)}setMessage(){this.message=this.plugin?this.plugin+": ":"",this.message+=this.file?this.file:"<css input>",typeof this.line!="undefined"&&(this.message+=":"+this.line+":"+this.column),this.message+=": "+this.reason}showSourceCode(e){if(!this.source)return"";let t=this.source;e==null&&(e=nf.isColorSupported),sf&&e&&(t=sf(t));let r=t.split(/\r?\n/),n=Math.max(this.line-3,0),a=Math.min(this.line+2,r.length),s=String(a).length,o,u;if(e){let{bold:c,red:f,gray:d}=nf.createColors(!0);o=p=>c(f(p)),u=p=>d(p)}else o=u=c=>c;return r.slice(n,a).map((c,f)=>{let d=n+1+f,p=" "+(" "+d).slice(-s)+" | ";if(d===this.line){let m=u(p.replace(/\d/g," "))+c.slice(0,this.column-1).replace(/[^\t]/g," ");return o(">")+u(p)+c+`
 `+m+o("^")}return" "+u(p)+c}).join(`
`)}toString(){let e=this.showSourceCode();return e&&(e=`

`+e+`
`),this.name+": "+this.message+e}};af.exports=Ot;Ot.default=Ot});var Si=v((UE,bs)=>{l();"use strict";bs.exports.isClean=Symbol("isClean");bs.exports.my=Symbol("my")});var vs=v((WE,lf)=>{l();"use strict";var of={colon:": ",indent:"    ",beforeDecl:`
`,beforeRule:`
`,beforeOpen:" ",beforeClose:`
`,beforeComment:`
`,after:`
`,emptyBody:"",commentLeft:" ",commentRight:" ",semicolon:!1};function n0(i){return i[0].toUpperCase()+i.slice(1)}var Ci=class{constructor(e){this.builder=e}stringify(e,t){if(!this[e.type])throw new Error("Unknown AST node type "+e.type+". Maybe you need to change PostCSS stringifier.");this[e.type](e,t)}document(e){this.body(e)}root(e){this.body(e),e.raws.after&&this.builder(e.raws.after)}comment(e){let t=this.raw(e,"left","commentLeft"),r=this.raw(e,"right","commentRight");this.builder("/*"+t+e.text+r+"*/",e)}decl(e,t){let r=this.raw(e,"between","colon"),n=e.prop+r+this.rawValue(e,"value");e.important&&(n+=e.raws.important||" !important"),t&&(n+=";"),this.builder(n,e)}rule(e){this.block(e,this.rawValue(e,"selector")),e.raws.ownSemicolon&&this.builder(e.raws.ownSemicolon,e,"end")}atrule(e,t){let r="@"+e.name,n=e.params?this.rawValue(e,"params"):"";if(typeof e.raws.afterName!="undefined"?r+=e.raws.afterName:n&&(r+=" "),e.nodes)this.block(e,r+n);else{let a=(e.raws.between||"")+(t?";":"");this.builder(r+n+a,e)}}body(e){let t=e.nodes.length-1;for(;t>0&&e.nodes[t].type==="comment";)t-=1;let r=this.raw(e,"semicolon");for(let n=0;n<e.nodes.length;n++){let a=e.nodes[n],s=this.raw(a,"before");s&&this.builder(s),this.stringify(a,t!==n||r)}}block(e,t){let r=this.raw(e,"between","beforeOpen");this.builder(t+r+"{",e,"start");let n;e.nodes&&e.nodes.length?(this.body(e),n=this.raw(e,"after")):n=this.raw(e,"after","emptyBody"),n&&this.builder(n),this.builder("}",e,"end")}raw(e,t,r){let n;if(r||(r=t),t&&(n=e.raws[t],typeof n!="undefined"))return n;let a=e.parent;if(r==="before"&&(!a||a.type==="root"&&a.first===e||a&&a.type==="document"))return"";if(!a)return of[r];let s=e.root();if(s.rawCache||(s.rawCache={}),typeof s.rawCache[r]!="undefined")return s.rawCache[r];if(r==="before"||r==="after")return this.beforeAfter(e,r);{let o="raw"+n0(r);this[o]?n=this[o](s,e):s.walk(u=>{if(n=u.raws[t],typeof n!="undefined")return!1})}return typeof n=="undefined"&&(n=of[r]),s.rawCache[r]=n,n}rawSemicolon(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length&&r.last.type==="decl"&&(t=r.raws.semicolon,typeof t!="undefined"))return!1}),t}rawEmptyBody(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length===0&&(t=r.raws.after,typeof t!="undefined"))return!1}),t}rawIndent(e){if(e.raws.indent)return e.raws.indent;let t;return e.walk(r=>{let n=r.parent;if(n&&n!==e&&n.parent&&n.parent===e&&typeof r.raws.before!="undefined"){let a=r.raws.before.split(`
`);return t=a[a.length-1],t=t.replace(/\S/g,""),!1}}),t}rawBeforeComment(e,t){let r;return e.walkComments(n=>{if(typeof n.raws.before!="undefined")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r=="undefined"?r=this.raw(t,null,"beforeDecl"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeDecl(e,t){let r;return e.walkDecls(n=>{if(typeof n.raws.before!="undefined")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r=="undefined"?r=this.raw(t,null,"beforeRule"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeRule(e){let t;return e.walk(r=>{if(r.nodes&&(r.parent!==e||e.first!==r)&&typeof r.raws.before!="undefined")return t=r.raws.before,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawBeforeClose(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length>0&&typeof r.raws.after!="undefined")return t=r.raws.after,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawBeforeOpen(e){let t;return e.walk(r=>{if(r.type!=="decl"&&(t=r.raws.between,typeof t!="undefined"))return!1}),t}rawColon(e){let t;return e.walkDecls(r=>{if(typeof r.raws.between!="undefined")return t=r.raws.between.replace(/[^\s:]/g,""),!1}),t}beforeAfter(e,t){let r;e.type==="decl"?r=this.raw(e,null,"beforeDecl"):e.type==="comment"?r=this.raw(e,null,"beforeComment"):t==="before"?r=this.raw(e,null,"beforeRule"):r=this.raw(e,null,"beforeClose");let n=e.parent,a=0;for(;n&&n.type!=="root";)a+=1,n=n.parent;if(r.includes(`
`)){let s=this.raw(e,null,"indent");if(s.length)for(let o=0;o<a;o++)r+=s}return r}rawValue(e,t){let r=e[t],n=e.raws[t];return n&&n.value===r?n.raw:r}};lf.exports=Ci;Ci.default=Ci});var mr=v((GE,uf)=>{l();"use strict";var s0=vs();function xs(i,e){new s0(e).stringify(i)}uf.exports=xs;xs.default=xs});var gr=v((HE,ff)=>{l();"use strict";var{isClean:Ai,my:a0}=Si(),o0=ki(),l0=vs(),u0=mr();function ks(i,e){let t=new i.constructor;for(let r in i){if(!Object.prototype.hasOwnProperty.call(i,r)||r==="proxyCache")continue;let n=i[r],a=typeof n;r==="parent"&&a==="object"?e&&(t[r]=e):r==="source"?t[r]=n:Array.isArray(n)?t[r]=n.map(s=>ks(s,t)):(a==="object"&&n!==null&&(n=ks(n)),t[r]=n)}return t}var _i=class{constructor(e={}){this.raws={},this[Ai]=!1,this[a0]=!0;for(let t in e)if(t==="nodes"){this.nodes=[];for(let r of e[t])typeof r.clone=="function"?this.append(r.clone()):this.append(r)}else this[t]=e[t]}error(e,t={}){if(this.source){let{start:r,end:n}=this.rangeBy(t);return this.source.input.error(e,{line:r.line,column:r.column},{line:n.line,column:n.column},t)}return new o0(e)}warn(e,t,r){let n={node:this};for(let a in r)n[a]=r[a];return e.warn(t,n)}remove(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}toString(e=u0){e.stringify&&(e=e.stringify);let t="";return e(this,r=>{t+=r}),t}assign(e={}){for(let t in e)this[t]=e[t];return this}clone(e={}){let t=ks(this);for(let r in e)t[r]=e[r];return t}cloneBefore(e={}){let t=this.clone(e);return this.parent.insertBefore(this,t),t}cloneAfter(e={}){let t=this.clone(e);return this.parent.insertAfter(this,t),t}replaceWith(...e){if(this.parent){let t=this,r=!1;for(let n of e)n===this?r=!0:r?(this.parent.insertAfter(t,n),t=n):this.parent.insertBefore(t,n);r||this.remove()}return this}next(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e+1]}prev(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e-1]}before(e){return this.parent.insertBefore(this,e),this}after(e){return this.parent.insertAfter(this,e),this}root(){let e=this;for(;e.parent&&e.parent.type!=="document";)e=e.parent;return e}raw(e,t){return new l0().raw(this,e,t)}cleanRaws(e){delete this.raws.before,delete this.raws.after,e||delete this.raws.between}toJSON(e,t){let r={},n=t==null;t=t||new Map;let a=0;for(let s in this){if(!Object.prototype.hasOwnProperty.call(this,s)||s==="parent"||s==="proxyCache")continue;let o=this[s];if(Array.isArray(o))r[s]=o.map(u=>typeof u=="object"&&u.toJSON?u.toJSON(null,t):u);else if(typeof o=="object"&&o.toJSON)r[s]=o.toJSON(null,t);else if(s==="source"){let u=t.get(o.input);u==null&&(u=a,t.set(o.input,a),a++),r[s]={inputId:u,start:o.start,end:o.end}}else r[s]=o}return n&&(r.inputs=[...t.keys()].map(s=>s.toJSON())),r}positionInside(e){let t=this.toString(),r=this.source.start.column,n=this.source.start.line;for(let a=0;a<e;a++)t[a]===`
`?(r=1,n+=1):r+=1;return{line:n,column:r}}positionBy(e){let t=this.source.start;if(e.index)t=this.positionInside(e.index);else if(e.word){let r=this.toString().indexOf(e.word);r!==-1&&(t=this.positionInside(r))}return t}rangeBy(e){let t={line:this.source.start.line,column:this.source.start.column},r=this.source.end?{line:this.source.end.line,column:this.source.end.column+1}:{line:t.line,column:t.column+1};if(e.word){let n=this.toString().indexOf(e.word);n!==-1&&(t=this.positionInside(n),r=this.positionInside(n+e.word.length))}else e.start?t={line:e.start.line,column:e.start.column}:e.index&&(t=this.positionInside(e.index)),e.end?r={line:e.end.line,column:e.end.column}:e.endIndex?r=this.positionInside(e.endIndex):e.index&&(r=this.positionInside(e.index+1));return(r.line<t.line||r.line===t.line&&r.column<=t.column)&&(r={line:t.line,column:t.column+1}),{start:t,end:r}}getProxyProcessor(){return{set(e,t,r){return e[t]===r||(e[t]=r,(t==="prop"||t==="value"||t==="name"||t==="params"||t==="important"||t==="text")&&e.markDirty()),!0},get(e,t){return t==="proxyOf"?e:t==="root"?()=>e.root().toProxy():e[t]}}}toProxy(){return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),this.proxyCache}addToError(e){if(e.postcssNode=this,e.stack&&this.source&&/\n\s{4}at /.test(e.stack)){let t=this.source;e.stack=e.stack.replace(/\n\s{4}at /,`$&${t.input.from}:${t.start.line}:${t.start.column}$&`)}return e}markDirty(){if(this[Ai]){this[Ai]=!1;let e=this;for(;e=e.parent;)e[Ai]=!1}}get proxyOf(){return this}};ff.exports=_i;_i.default=_i});var yr=v((YE,cf)=>{l();"use strict";var f0=gr(),Oi=class extends f0{constructor(e){e&&typeof e.value!="undefined"&&typeof e.value!="string"&&(e={...e,value:String(e.value)});super(e);this.type="decl"}get variable(){return this.prop.startsWith("--")||this.prop[0]==="$"}};cf.exports=Oi;Oi.default=Oi});var Ss=v((QE,pf)=>{l();pf.exports=function(i,e){return{generate:()=>{let t="";return i(e,r=>{t+=r}),[t]}}}});var wr=v((JE,df)=>{l();"use strict";var c0=gr(),Ei=class extends c0{constructor(e){super(e);this.type="comment"}};df.exports=Ei;Ei.default=Ei});var it=v((XE,kf)=>{l();"use strict";var{isClean:hf,my:mf}=Si(),gf=yr(),yf=wr(),p0=gr(),wf,Cs,As,bf;function vf(i){return i.map(e=>(e.nodes&&(e.nodes=vf(e.nodes)),delete e.source,e))}function xf(i){if(i[hf]=!1,i.proxyOf.nodes)for(let e of i.proxyOf.nodes)xf(e)}var be=class extends p0{push(e){return e.parent=this,this.proxyOf.nodes.push(e),this}each(e){if(!this.proxyOf.nodes)return;let t=this.getIterator(),r,n;for(;this.indexes[t]<this.proxyOf.nodes.length&&(r=this.indexes[t],n=e(this.proxyOf.nodes[r],r),n!==!1);)this.indexes[t]+=1;return delete this.indexes[t],n}walk(e){return this.each((t,r)=>{let n;try{n=e(t,r)}catch(a){throw t.addToError(a)}return n!==!1&&t.walk&&(n=t.walk(e)),n})}walkDecls(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="decl"&&e.test(r.prop))return t(r,n)}):this.walk((r,n)=>{if(r.type==="decl"&&r.prop===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="decl")return t(r,n)}))}walkRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="rule"&&e.test(r.selector))return t(r,n)}):this.walk((r,n)=>{if(r.type==="rule"&&r.selector===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="rule")return t(r,n)}))}walkAtRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="atrule"&&e.test(r.name))return t(r,n)}):this.walk((r,n)=>{if(r.type==="atrule"&&r.name===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="atrule")return t(r,n)}))}walkComments(e){return this.walk((t,r)=>{if(t.type==="comment")return e(t,r)})}append(...e){for(let t of e){let r=this.normalize(t,this.last);for(let n of r)this.proxyOf.nodes.push(n)}return this.markDirty(),this}prepend(...e){e=e.reverse();for(let t of e){let r=this.normalize(t,this.first,"prepend").reverse();for(let n of r)this.proxyOf.nodes.unshift(n);for(let n in this.indexes)this.indexes[n]=this.indexes[n]+r.length}return this.markDirty(),this}cleanRaws(e){if(super.cleanRaws(e),this.nodes)for(let t of this.nodes)t.cleanRaws(e)}insertBefore(e,t){let r=this.index(e),n=r===0?"prepend":!1,a=this.normalize(t,this.proxyOf.nodes[r],n).reverse();r=this.index(e);for(let o of a)this.proxyOf.nodes.splice(r,0,o);let s;for(let o in this.indexes)s=this.indexes[o],r<=s&&(this.indexes[o]=s+a.length);return this.markDirty(),this}insertAfter(e,t){let r=this.index(e),n=this.normalize(t,this.proxyOf.nodes[r]).reverse();r=this.index(e);for(let s of n)this.proxyOf.nodes.splice(r+1,0,s);let a;for(let s in this.indexes)a=this.indexes[s],r<a&&(this.indexes[s]=a+n.length);return this.markDirty(),this}removeChild(e){e=this.index(e),this.proxyOf.nodes[e].parent=void 0,this.proxyOf.nodes.splice(e,1);let t;for(let r in this.indexes)t=this.indexes[r],t>=e&&(this.indexes[r]=t-1);return this.markDirty(),this}removeAll(){for(let e of this.proxyOf.nodes)e.parent=void 0;return this.proxyOf.nodes=[],this.markDirty(),this}replaceValues(e,t,r){return r||(r=t,t={}),this.walkDecls(n=>{t.props&&!t.props.includes(n.prop)||t.fast&&!n.value.includes(t.fast)||(n.value=n.value.replace(e,r))}),this.markDirty(),this}every(e){return this.nodes.every(e)}some(e){return this.nodes.some(e)}index(e){return typeof e=="number"?e:(e.proxyOf&&(e=e.proxyOf),this.proxyOf.nodes.indexOf(e))}get first(){if(!!this.proxyOf.nodes)return this.proxyOf.nodes[0]}get last(){if(!!this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}normalize(e,t){if(typeof e=="string")e=vf(wf(e).nodes);else if(Array.isArray(e)){e=e.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type==="root"&&this.type!=="document"){e=e.nodes.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type)e=[e];else if(e.prop){if(typeof e.value=="undefined")throw new Error("Value field is missed in node creation");typeof e.value!="string"&&(e.value=String(e.value)),e=[new gf(e)]}else if(e.selector)e=[new Cs(e)];else if(e.name)e=[new As(e)];else if(e.text)e=[new yf(e)];else throw new Error("Unknown node type in node creation");return e.map(n=>(n[mf]||be.rebuild(n),n=n.proxyOf,n.parent&&n.parent.removeChild(n),n[hf]&&xf(n),typeof n.raws.before=="undefined"&&t&&typeof t.raws.before!="undefined"&&(n.raws.before=t.raws.before.replace(/\S/g,"")),n.parent=this.proxyOf,n))}getProxyProcessor(){return{set(e,t,r){return e[t]===r||(e[t]=r,(t==="name"||t==="params"||t==="selector")&&e.markDirty()),!0},get(e,t){return t==="proxyOf"?e:e[t]?t==="each"||typeof t=="string"&&t.startsWith("walk")?(...r)=>e[t](...r.map(n=>typeof n=="function"?(a,s)=>n(a.toProxy(),s):n)):t==="every"||t==="some"?r=>e[t]((n,...a)=>r(n.toProxy(),...a)):t==="root"?()=>e.root().toProxy():t==="nodes"?e.nodes.map(r=>r.toProxy()):t==="first"||t==="last"?e[t].toProxy():e[t]:e[t]}}}getIterator(){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1;let e=this.lastEach;return this.indexes[e]=0,e}};be.registerParse=i=>{wf=i};be.registerRule=i=>{Cs=i};be.registerAtRule=i=>{As=i};be.registerRoot=i=>{bf=i};kf.exports=be;be.default=be;be.rebuild=i=>{i.type==="atrule"?Object.setPrototypeOf(i,As.prototype):i.type==="rule"?Object.setPrototypeOf(i,Cs.prototype):i.type==="decl"?Object.setPrototypeOf(i,gf.prototype):i.type==="comment"?Object.setPrototypeOf(i,yf.prototype):i.type==="root"&&Object.setPrototypeOf(i,bf.prototype),i[mf]=!0,i.nodes&&i.nodes.forEach(e=>{be.rebuild(e)})}});var Ti=v((KE,Af)=>{l();"use strict";var d0=it(),Sf,Cf,Et=class extends d0{constructor(e){super({type:"document",...e});this.nodes||(this.nodes=[])}toResult(e={}){return new Sf(new Cf,this,e).stringify()}};Et.registerLazyResult=i=>{Sf=i};Et.registerProcessor=i=>{Cf=i};Af.exports=Et;Et.default=Et});var _s=v((ZE,Of)=>{l();"use strict";var _f={};Of.exports=function(e){_f[e]||(_f[e]=!0,typeof console!="undefined"&&console.warn&&console.warn(e))}});var Os=v((eT,Ef)=>{l();"use strict";var Pi=class{constructor(e,t={}){if(this.type="warning",this.text=e,t.node&&t.node.source){let r=t.node.rangeBy(t);this.line=r.start.line,this.column=r.start.column,this.endLine=r.end.line,this.endColumn=r.end.column}for(let r in t)this[r]=t[r]}toString(){return this.node?this.node.error(this.text,{plugin:this.plugin,index:this.index,word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}};Ef.exports=Pi;Pi.default=Pi});var Ii=v((tT,Tf)=>{l();"use strict";var h0=Os(),Di=class{constructor(e,t,r){this.processor=e,this.messages=[],this.root=t,this.opts=r,this.css=void 0,this.map=void 0}toString(){return this.css}warn(e,t={}){t.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(t.plugin=this.lastPlugin.postcssPlugin);let r=new h0(e,t);return this.messages.push(r),r}warnings(){return this.messages.filter(e=>e.type==="warning")}get content(){return this.css}};Tf.exports=Di;Di.default=Di});var Rf=v((rT,qf)=>{l();"use strict";var Es="'".charCodeAt(0),Pf='"'.charCodeAt(0),qi="\\".charCodeAt(0),Df="/".charCodeAt(0),Ri=`
`.charCodeAt(0),br=" ".charCodeAt(0),Mi="\f".charCodeAt(0),Bi="	".charCodeAt(0),Fi="\r".charCodeAt(0),m0="[".charCodeAt(0),g0="]".charCodeAt(0),y0="(".charCodeAt(0),w0=")".charCodeAt(0),b0="{".charCodeAt(0),v0="}".charCodeAt(0),x0=";".charCodeAt(0),k0="*".charCodeAt(0),S0=":".charCodeAt(0),C0="@".charCodeAt(0),Ni=/[\t\n\f\r "#'()/;[\\\]{}]/g,Li=/[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,A0=/.[\n"'(/\\]/,If=/[\da-f]/i;qf.exports=function(e,t={}){let r=e.css.valueOf(),n=t.ignoreErrors,a,s,o,u,c,f,d,p,m,b,x=r.length,y=0,w=[],k=[];function S(){return y}function _(R){throw e.error("Unclosed "+R,y)}function E(){return k.length===0&&y>=x}function I(R){if(k.length)return k.pop();if(y>=x)return;let J=R?R.ignoreUnclosed:!1;switch(a=r.charCodeAt(y),a){case Ri:case br:case Bi:case Fi:case Mi:{s=y;do s+=1,a=r.charCodeAt(s);while(a===br||a===Ri||a===Bi||a===Fi||a===Mi);b=["space",r.slice(y,s)],y=s-1;break}case m0:case g0:case b0:case v0:case S0:case x0:case w0:{let fe=String.fromCharCode(a);b=[fe,fe,y];break}case y0:{if(p=w.length?w.pop()[1]:"",m=r.charCodeAt(y+1),p==="url"&&m!==Es&&m!==Pf&&m!==br&&m!==Ri&&m!==Bi&&m!==Mi&&m!==Fi){s=y;do{if(f=!1,s=r.indexOf(")",s+1),s===-1)if(n||J){s=y;break}else _("bracket");for(d=s;r.charCodeAt(d-1)===qi;)d-=1,f=!f}while(f);b=["brackets",r.slice(y,s+1),y,s],y=s}else s=r.indexOf(")",y+1),u=r.slice(y,s+1),s===-1||A0.test(u)?b=["(","(",y]:(b=["brackets",u,y,s],y=s);break}case Es:case Pf:{o=a===Es?"'":'"',s=y;do{if(f=!1,s=r.indexOf(o,s+1),s===-1)if(n||J){s=y+1;break}else _("string");for(d=s;r.charCodeAt(d-1)===qi;)d-=1,f=!f}while(f);b=["string",r.slice(y,s+1),y,s],y=s;break}case C0:{Ni.lastIndex=y+1,Ni.test(r),Ni.lastIndex===0?s=r.length-1:s=Ni.lastIndex-2,b=["at-word",r.slice(y,s+1),y,s],y=s;break}case qi:{for(s=y,c=!0;r.charCodeAt(s+1)===qi;)s+=1,c=!c;if(a=r.charCodeAt(s+1),c&&a!==Df&&a!==br&&a!==Ri&&a!==Bi&&a!==Fi&&a!==Mi&&(s+=1,If.test(r.charAt(s)))){for(;If.test(r.charAt(s+1));)s+=1;r.charCodeAt(s+1)===br&&(s+=1)}b=["word",r.slice(y,s+1),y,s],y=s;break}default:{a===Df&&r.charCodeAt(y+1)===k0?(s=r.indexOf("*/",y+2)+1,s===0&&(n||J?s=r.length:_("comment")),b=["comment",r.slice(y,s+1),y,s],y=s):(Li.lastIndex=y+1,Li.test(r),Li.lastIndex===0?s=r.length-1:s=Li.lastIndex-2,b=["word",r.slice(y,s+1),y,s],w.push(b),y=s);break}}return y++,b}function q(R){k.push(R)}return{back:q,nextToken:I,endOfFile:E,position:S}}});var $i=v((iT,Bf)=>{l();"use strict";var Mf=it(),vr=class extends Mf{constructor(e){super(e);this.type="atrule"}append(...e){return this.proxyOf.nodes||(this.nodes=[]),super.append(...e)}prepend(...e){return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...e)}};Bf.exports=vr;vr.default=vr;Mf.registerAtRule(vr)});var Tt=v((nT,$f)=>{l();"use strict";var Ff=it(),Nf,Lf,bt=class extends Ff{constructor(e){super(e);this.type="root",this.nodes||(this.nodes=[])}removeChild(e,t){let r=this.index(e);return!t&&r===0&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[r].raws.before),super.removeChild(e)}normalize(e,t,r){let n=super.normalize(e);if(t){if(r==="prepend")this.nodes.length>1?t.raws.before=this.nodes[1].raws.before:delete t.raws.before;else if(this.first!==t)for(let a of n)a.raws.before=t.raws.before}return n}toResult(e={}){return new Nf(new Lf,this,e).stringify()}};bt.registerLazyResult=i=>{Nf=i};bt.registerProcessor=i=>{Lf=i};$f.exports=bt;bt.default=bt;Ff.registerRoot(bt)});var Ts=v((sT,jf)=>{l();"use strict";var xr={split(i,e,t){let r=[],n="",a=!1,s=0,o=!1,u="",c=!1;for(let f of i)c?c=!1:f==="\\"?c=!0:o?f===u&&(o=!1):f==='"'||f==="'"?(o=!0,u=f):f==="("?s+=1:f===")"?s>0&&(s-=1):s===0&&e.includes(f)&&(a=!0),a?(n!==""&&r.push(n.trim()),n="",a=!1):n+=f;return(t||n!=="")&&r.push(n.trim()),r},space(i){let e=[" ",`
`,"	"];return xr.split(i,e)},comma(i){return xr.split(i,[","],!0)}};jf.exports=xr;xr.default=xr});var ji=v((aT,Vf)=>{l();"use strict";var zf=it(),_0=Ts(),kr=class extends zf{constructor(e){super(e);this.type="rule",this.nodes||(this.nodes=[])}get selectors(){return _0.comma(this.selector)}set selectors(e){let t=this.selector?this.selector.match(/,\s*/):null,r=t?t[0]:","+this.raw("between","beforeOpen");this.selector=e.join(r)}};Vf.exports=kr;kr.default=kr;zf.registerRule(kr)});var Yf=v((oT,Hf)=>{l();"use strict";var O0=yr(),E0=Rf(),T0=wr(),P0=$i(),D0=Tt(),Uf=ji(),Wf={empty:!0,space:!0};function I0(i){for(let e=i.length-1;e>=0;e--){let t=i[e],r=t[3]||t[2];if(r)return r}}var Gf=class{constructor(e){this.input=e,this.root=new D0,this.current=this.root,this.spaces="",this.semicolon=!1,this.customProperty=!1,this.createTokenizer(),this.root.source={input:e,start:{offset:0,line:1,column:1}}}createTokenizer(){this.tokenizer=E0(this.input)}parse(){let e;for(;!this.tokenizer.endOfFile();)switch(e=this.tokenizer.nextToken(),e[0]){case"space":this.spaces+=e[1];break;case";":this.freeSemicolon(e);break;case"}":this.end(e);break;case"comment":this.comment(e);break;case"at-word":this.atrule(e);break;case"{":this.emptyRule(e);break;default:this.other(e);break}this.endFile()}comment(e){let t=new T0;this.init(t,e[2]),t.source.end=this.getPosition(e[3]||e[2]);let r=e[1].slice(2,-2);if(/^\s*$/.test(r))t.text="",t.raws.left=r,t.raws.right="";else{let n=r.match(/^(\s*)([^]*\S)(\s*)$/);t.text=n[2],t.raws.left=n[1],t.raws.right=n[3]}}emptyRule(e){let t=new Uf;this.init(t,e[2]),t.selector="",t.raws.between="",this.current=t}other(e){let t=!1,r=null,n=!1,a=null,s=[],o=e[1].startsWith("--"),u=[],c=e;for(;c;){if(r=c[0],u.push(c),r==="("||r==="[")a||(a=c),s.push(r==="("?")":"]");else if(o&&n&&r==="{")a||(a=c),s.push("}");else if(s.length===0)if(r===";")if(n){this.decl(u,o);return}else break;else if(r==="{"){this.rule(u);return}else if(r==="}"){this.tokenizer.back(u.pop()),t=!0;break}else r===":"&&(n=!0);else r===s[s.length-1]&&(s.pop(),s.length===0&&(a=null));c=this.tokenizer.nextToken()}if(this.tokenizer.endOfFile()&&(t=!0),s.length>0&&this.unclosedBracket(a),t&&n){if(!o)for(;u.length&&(c=u[u.length-1][0],!(c!=="space"&&c!=="comment"));)this.tokenizer.back(u.pop());this.decl(u,o)}else this.unknownWord(u)}rule(e){e.pop();let t=new Uf;this.init(t,e[0][2]),t.raws.between=this.spacesAndCommentsFromEnd(e),this.raw(t,"selector",e),this.current=t}decl(e,t){let r=new O0;this.init(r,e[0][2]);let n=e[e.length-1];for(n[0]===";"&&(this.semicolon=!0,e.pop()),r.source.end=this.getPosition(n[3]||n[2]||I0(e));e[0][0]!=="word";)e.length===1&&this.unknownWord(e),r.raws.before+=e.shift()[1];for(r.source.start=this.getPosition(e[0][2]),r.prop="";e.length;){let c=e[0][0];if(c===":"||c==="space"||c==="comment")break;r.prop+=e.shift()[1]}r.raws.between="";let a;for(;e.length;)if(a=e.shift(),a[0]===":"){r.raws.between+=a[1];break}else a[0]==="word"&&/\w/.test(a[1])&&this.unknownWord([a]),r.raws.between+=a[1];(r.prop[0]==="_"||r.prop[0]==="*")&&(r.raws.before+=r.prop[0],r.prop=r.prop.slice(1));let s=[],o;for(;e.length&&(o=e[0][0],!(o!=="space"&&o!=="comment"));)s.push(e.shift());this.precheckMissedSemicolon(e);for(let c=e.length-1;c>=0;c--){if(a=e[c],a[1].toLowerCase()==="!important"){r.important=!0;let f=this.stringFrom(e,c);f=this.spacesFromEnd(e)+f,f!==" !important"&&(r.raws.important=f);break}else if(a[1].toLowerCase()==="important"){let f=e.slice(0),d="";for(let p=c;p>0;p--){let m=f[p][0];if(d.trim().indexOf("!")===0&&m!=="space")break;d=f.pop()[1]+d}d.trim().indexOf("!")===0&&(r.important=!0,r.raws.important=d,e=f)}if(a[0]!=="space"&&a[0]!=="comment")break}e.some(c=>c[0]!=="space"&&c[0]!=="comment")&&(r.raws.between+=s.map(c=>c[1]).join(""),s=[]),this.raw(r,"value",s.concat(e),t),r.value.includes(":")&&!t&&this.checkMissedSemicolon(e)}atrule(e){let t=new P0;t.name=e[1].slice(1),t.name===""&&this.unnamedAtrule(t,e),this.init(t,e[2]);let r,n,a,s=!1,o=!1,u=[],c=[];for(;!this.tokenizer.endOfFile();){if(e=this.tokenizer.nextToken(),r=e[0],r==="("||r==="["?c.push(r==="("?")":"]"):r==="{"&&c.length>0?c.push("}"):r===c[c.length-1]&&c.pop(),c.length===0)if(r===";"){t.source.end=this.getPosition(e[2]),this.semicolon=!0;break}else if(r==="{"){o=!0;break}else if(r==="}"){if(u.length>0){for(a=u.length-1,n=u[a];n&&n[0]==="space";)n=u[--a];n&&(t.source.end=this.getPosition(n[3]||n[2]))}this.end(e);break}else u.push(e);else u.push(e);if(this.tokenizer.endOfFile()){s=!0;break}}t.raws.between=this.spacesAndCommentsFromEnd(u),u.length?(t.raws.afterName=this.spacesAndCommentsFromStart(u),this.raw(t,"params",u),s&&(e=u[u.length-1],t.source.end=this.getPosition(e[3]||e[2]),this.spaces=t.raws.between,t.raws.between="")):(t.raws.afterName="",t.params=""),o&&(t.nodes=[],this.current=t)}end(e){this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.semicolon=!1,this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.spaces="",this.current.parent?(this.current.source.end=this.getPosition(e[2]),this.current=this.current.parent):this.unexpectedClose(e)}endFile(){this.current.parent&&this.unclosedBlock(),this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.current.raws.after=(this.current.raws.after||"")+this.spaces}freeSemicolon(e){if(this.spaces+=e[1],this.current.nodes){let t=this.current.nodes[this.current.nodes.length-1];t&&t.type==="rule"&&!t.raws.ownSemicolon&&(t.raws.ownSemicolon=this.spaces,this.spaces="")}}getPosition(e){let t=this.input.fromOffset(e);return{offset:e,line:t.line,column:t.col}}init(e,t){this.current.push(e),e.source={start:this.getPosition(t),input:this.input},e.raws.before=this.spaces,this.spaces="",e.type!=="comment"&&(this.semicolon=!1)}raw(e,t,r,n){let a,s,o=r.length,u="",c=!0,f,d;for(let p=0;p<o;p+=1)a=r[p],s=a[0],s==="space"&&p===o-1&&!n?c=!1:s==="comment"?(d=r[p-1]?r[p-1][0]:"empty",f=r[p+1]?r[p+1][0]:"empty",!Wf[d]&&!Wf[f]?u.slice(-1)===","?c=!1:u+=a[1]:c=!1):u+=a[1];if(!c){let p=r.reduce((m,b)=>m+b[1],"");e.raws[t]={value:u,raw:p}}e[t]=u}spacesAndCommentsFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],!(t!=="space"&&t!=="comment"));)r=e.pop()[1]+r;return r}spacesAndCommentsFromStart(e){let t,r="";for(;e.length&&(t=e[0][0],!(t!=="space"&&t!=="comment"));)r+=e.shift()[1];return r}spacesFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],t==="space");)r=e.pop()[1]+r;return r}stringFrom(e,t){let r="";for(let n=t;n<e.length;n++)r+=e[n][1];return e.splice(t,e.length-t),r}colon(e){let t=0,r,n,a;for(let[s,o]of e.entries()){if(r=o,n=r[0],n==="("&&(t+=1),n===")"&&(t-=1),t===0&&n===":")if(!a)this.doubleColon(r);else{if(a[0]==="word"&&a[1]==="progid")continue;return s}a=r}return!1}unclosedBracket(e){throw this.input.error("Unclosed bracket",{offset:e[2]},{offset:e[2]+1})}unknownWord(e){throw this.input.error("Unknown word",{offset:e[0][2]},{offset:e[0][2]+e[0][1].length})}unexpectedClose(e){throw this.input.error("Unexpected }",{offset:e[2]},{offset:e[2]+1})}unclosedBlock(){let e=this.current.source.start;throw this.input.error("Unclosed block",e.line,e.column)}doubleColon(e){throw this.input.error("Double colon",{offset:e[2]},{offset:e[2]+e[1].length})}unnamedAtrule(e,t){throw this.input.error("At-rule without name",{offset:t[2]},{offset:t[2]+t[1].length})}precheckMissedSemicolon(){}checkMissedSemicolon(e){let t=this.colon(e);if(t===!1)return;let r=0,n;for(let a=t-1;a>=0&&(n=e[a],!(n[0]!=="space"&&(r+=1,r===2)));a--);throw this.input.error("Missed semicolon",n[0]==="word"?n[3]+1:n[2])}};Hf.exports=Gf});var Qf=v(()=>{l()});var Xf=v((fT,Jf)=>{l();var q0="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",R0=(i,e=21)=>(t=e)=>{let r="",n=t;for(;n--;)r+=i[Math.random()*i.length|0];return r},M0=(i=21)=>{let e="",t=i;for(;t--;)e+=q0[Math.random()*64|0];return e};Jf.exports={nanoid:M0,customAlphabet:R0}});var Ps=v((cT,Kf)=>{l();Kf.exports={}});var Vi=v((pT,rc)=>{l();"use strict";var{SourceMapConsumer:B0,SourceMapGenerator:F0}=Qf(),{fileURLToPath:Zf,pathToFileURL:zi}=(ys(),rf),{resolve:Ds,isAbsolute:Is}=(wt(),Zu),{nanoid:N0}=Xf(),qs=ws(),ec=ki(),L0=Ps(),Rs=Symbol("fromOffsetCache"),$0=Boolean(B0&&F0),tc=Boolean(Ds&&Is),Sr=class{constructor(e,t={}){if(e===null||typeof e=="undefined"||typeof e=="object"&&!e.toString)throw new Error(`PostCSS received ${e} instead of CSS string`);if(this.css=e.toString(),this.css[0]==="\uFEFF"||this.css[0]==="\uFFFE"?(this.hasBOM=!0,this.css=this.css.slice(1)):this.hasBOM=!1,t.from&&(!tc||/^\w+:\/\//.test(t.from)||Is(t.from)?this.file=t.from:this.file=Ds(t.from)),tc&&$0){let r=new L0(this.css,t);if(r.text){this.map=r;let n=r.consumer().file;!this.file&&n&&(this.file=this.mapResolve(n))}}this.file||(this.id="<input css "+N0(6)+">"),this.map&&(this.map.file=this.from)}fromOffset(e){let t,r;if(this[Rs])r=this[Rs];else{let a=this.css.split(`
`);r=new Array(a.length);let s=0;for(let o=0,u=a.length;o<u;o++)r[o]=s,s+=a[o].length+1;this[Rs]=r}t=r[r.length-1];let n=0;if(e>=t)n=r.length-1;else{let a=r.length-2,s;for(;n<a;)if(s=n+(a-n>>1),e<r[s])a=s-1;else if(e>=r[s+1])n=s+1;else{n=s;break}}return{line:n+1,col:e-r[n]+1}}error(e,t,r,n={}){let a,s,o;if(t&&typeof t=="object"){let c=t,f=r;if(typeof c.offset=="number"){let d=this.fromOffset(c.offset);t=d.line,r=d.col}else t=c.line,r=c.column;if(typeof f.offset=="number"){let d=this.fromOffset(f.offset);s=d.line,o=d.col}else s=f.line,o=f.column}else if(!r){let c=this.fromOffset(t);t=c.line,r=c.col}let u=this.origin(t,r,s,o);return u?a=new ec(e,u.endLine===void 0?u.line:{line:u.line,column:u.column},u.endLine===void 0?u.column:{line:u.endLine,column:u.endColumn},u.source,u.file,n.plugin):a=new ec(e,s===void 0?t:{line:t,column:r},s===void 0?r:{line:s,column:o},this.css,this.file,n.plugin),a.input={line:t,column:r,endLine:s,endColumn:o,source:this.css},this.file&&(zi&&(a.input.url=zi(this.file).toString()),a.input.file=this.file),a}origin(e,t,r,n){if(!this.map)return!1;let a=this.map.consumer(),s=a.originalPositionFor({line:e,column:t});if(!s.source)return!1;let o;typeof r=="number"&&(o=a.originalPositionFor({line:r,column:n}));let u;Is(s.source)?u=zi(s.source):u=new URL(s.source,this.map.consumer().sourceRoot||zi(this.map.mapFile));let c={url:u.toString(),line:s.line,column:s.column,endLine:o&&o.line,endColumn:o&&o.column};if(u.protocol==="file:")if(Zf)c.file=Zf(u);else throw new Error("file: protocol is not available in this PostCSS build");let f=a.sourceContentFor(s.source);return f&&(c.source=f),c}mapResolve(e){return/^\w+:\/\//.test(e)?e:Ds(this.map.consumer().sourceRoot||this.map.root||".",e)}get from(){return this.file||this.id}toJSON(){let e={};for(let t of["hasBOM","css","file","id"])this[t]!=null&&(e[t]=this[t]);return this.map&&(e.map={...this.map},e.map.consumerCache&&(e.map.consumerCache=void 0)),e}};rc.exports=Sr;Sr.default=Sr;qs&&qs.registerInput&&qs.registerInput(Sr)});var Wi=v((dT,ic)=>{l();"use strict";var j0=it(),z0=Yf(),V0=Vi();function Ui(i,e){let t=new V0(i,e),r=new z0(t);try{r.parse()}catch(n){throw n}return r.root}ic.exports=Ui;Ui.default=Ui;j0.registerParse(Ui)});var Fs=v((mT,oc)=>{l();"use strict";var{isClean:Re,my:U0}=Si(),W0=Ss(),G0=mr(),H0=it(),Y0=Ti(),hT=_s(),nc=Ii(),Q0=Wi(),J0=Tt(),X0={document:"Document",root:"Root",atrule:"AtRule",rule:"Rule",decl:"Declaration",comment:"Comment"},K0={postcssPlugin:!0,prepare:!0,Once:!0,Document:!0,Root:!0,Declaration:!0,Rule:!0,AtRule:!0,Comment:!0,DeclarationExit:!0,RuleExit:!0,AtRuleExit:!0,CommentExit:!0,RootExit:!0,DocumentExit:!0,OnceExit:!0},Z0={postcssPlugin:!0,prepare:!0,Once:!0},Pt=0;function Cr(i){return typeof i=="object"&&typeof i.then=="function"}function sc(i){let e=!1,t=X0[i.type];return i.type==="decl"?e=i.prop.toLowerCase():i.type==="atrule"&&(e=i.name.toLowerCase()),e&&i.append?[t,t+"-"+e,Pt,t+"Exit",t+"Exit-"+e]:e?[t,t+"-"+e,t+"Exit",t+"Exit-"+e]:i.append?[t,Pt,t+"Exit"]:[t,t+"Exit"]}function ac(i){let e;return i.type==="document"?e=["Document",Pt,"DocumentExit"]:i.type==="root"?e=["Root",Pt,"RootExit"]:e=sc(i),{node:i,events:e,eventIndex:0,visitors:[],visitorIndex:0,iterator:0}}function Ms(i){return i[Re]=!1,i.nodes&&i.nodes.forEach(e=>Ms(e)),i}var Bs={},Ve=class{constructor(e,t,r){this.stringified=!1,this.processed=!1;let n;if(typeof t=="object"&&t!==null&&(t.type==="root"||t.type==="document"))n=Ms(t);else if(t instanceof Ve||t instanceof nc)n=Ms(t.root),t.map&&(typeof r.map=="undefined"&&(r.map={}),r.map.inline||(r.map.inline=!1),r.map.prev=t.map);else{let a=Q0;r.syntax&&(a=r.syntax.parse),r.parser&&(a=r.parser),a.parse&&(a=a.parse);try{n=a(t,r)}catch(s){this.processed=!0,this.error=s}n&&!n[U0]&&H0.rebuild(n)}this.result=new nc(e,n,r),this.helpers={...Bs,result:this.result,postcss:Bs},this.plugins=this.processor.plugins.map(a=>typeof a=="object"&&a.prepare?{...a,...a.prepare(this.result)}:a)}get[Symbol.toStringTag](){return"LazyResult"}get processor(){return this.result.processor}get opts(){return this.result.opts}get css(){return this.stringify().css}get content(){return this.stringify().content}get map(){return this.stringify().map}get root(){return this.sync().root}get messages(){return this.sync().messages}warnings(){return this.sync().warnings()}toString(){return this.css}then(e,t){return this.async().then(e,t)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}async(){return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),this.processing)}sync(){if(this.error)throw this.error;if(this.processed)return this.result;if(this.processed=!0,this.processing)throw this.getAsyncError();for(let e of this.plugins){let t=this.runOnRoot(e);if(Cr(t))throw this.getAsyncError()}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[Re];)e[Re]=!0,this.walkSync(e);if(this.listeners.OnceExit)if(e.type==="document")for(let t of e.nodes)this.visitSync(this.listeners.OnceExit,t);else this.visitSync(this.listeners.OnceExit,e)}return this.result}stringify(){if(this.error)throw this.error;if(this.stringified)return this.result;this.stringified=!0,this.sync();let e=this.result.opts,t=G0;e.syntax&&(t=e.syntax.stringify),e.stringifier&&(t=e.stringifier),t.stringify&&(t=t.stringify);let n=new W0(t,this.result.root,this.result.opts).generate();return this.result.css=n[0],this.result.map=n[1],this.result}walkSync(e){e[Re]=!0;let t=sc(e);for(let r of t)if(r===Pt)e.nodes&&e.each(n=>{n[Re]||this.walkSync(n)});else{let n=this.listeners[r];if(n&&this.visitSync(n,e.toProxy()))return}}visitSync(e,t){for(let[r,n]of e){this.result.lastPlugin=r;let a;try{a=n(t,this.helpers)}catch(s){throw this.handleError(s,t.proxyOf)}if(t.type!=="root"&&t.type!=="document"&&!t.parent)return!0;if(Cr(a))throw this.getAsyncError()}}runOnRoot(e){this.result.lastPlugin=e;try{if(typeof e=="object"&&e.Once){if(this.result.root.type==="document"){let t=this.result.root.nodes.map(r=>e.Once(r,this.helpers));return Cr(t[0])?Promise.all(t):t}return e.Once(this.result.root,this.helpers)}else if(typeof e=="function")return e(this.result.root,this.result)}catch(t){throw this.handleError(t)}}getAsyncError(){throw new Error("Use process(css).then(cb) to work with async plugins")}handleError(e,t){let r=this.result.lastPlugin;try{t&&t.addToError(e),this.error=e,e.name==="CssSyntaxError"&&!e.plugin?(e.plugin=r.postcssPlugin,e.setMessage()):r.postcssVersion}catch(n){console&&console.error&&console.error(n)}return e}async runAsync(){this.plugin=0;for(let e=0;e<this.plugins.length;e++){let t=this.plugins[e],r=this.runOnRoot(t);if(Cr(r))try{await r}catch(n){throw this.handleError(n)}}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[Re];){e[Re]=!0;let t=[ac(e)];for(;t.length>0;){let r=this.visitTick(t);if(Cr(r))try{await r}catch(n){let a=t[t.length-1].node;throw this.handleError(n,a)}}}if(this.listeners.OnceExit)for(let[t,r]of this.listeners.OnceExit){this.result.lastPlugin=t;try{if(e.type==="document"){let n=e.nodes.map(a=>r(a,this.helpers));await Promise.all(n)}else await r(e,this.helpers)}catch(n){throw this.handleError(n)}}}return this.processed=!0,this.stringify()}prepareVisitors(){this.listeners={};let e=(t,r,n)=>{this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push([t,n])};for(let t of this.plugins)if(typeof t=="object")for(let r in t){if(!K0[r]&&/^[A-Z]/.test(r))throw new Error(`Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);if(!Z0[r])if(typeof t[r]=="object")for(let n in t[r])n==="*"?e(t,r,t[r][n]):e(t,r+"-"+n.toLowerCase(),t[r][n]);else typeof t[r]=="function"&&e(t,r,t[r])}this.hasListener=Object.keys(this.listeners).length>0}visitTick(e){let t=e[e.length-1],{node:r,visitors:n}=t;if(r.type!=="root"&&r.type!=="document"&&!r.parent){e.pop();return}if(n.length>0&&t.visitorIndex<n.length){let[s,o]=n[t.visitorIndex];t.visitorIndex+=1,t.visitorIndex===n.length&&(t.visitors=[],t.visitorIndex=0),this.result.lastPlugin=s;try{return o(r.toProxy(),this.helpers)}catch(u){throw this.handleError(u,r)}}if(t.iterator!==0){let s=t.iterator,o;for(;o=r.nodes[r.indexes[s]];)if(r.indexes[s]+=1,!o[Re]){o[Re]=!0,e.push(ac(o));return}t.iterator=0,delete r.indexes[s]}let a=t.events;for(;t.eventIndex<a.length;){let s=a[t.eventIndex];if(t.eventIndex+=1,s===Pt){r.nodes&&r.nodes.length&&(r[Re]=!0,t.iterator=r.getIterator());return}else if(this.listeners[s]){t.visitors=this.listeners[s];return}}e.pop()}};Ve.registerPostcss=i=>{Bs=i};oc.exports=Ve;Ve.default=Ve;J0.registerLazyResult(Ve);Y0.registerLazyResult(Ve)});var uc=v((yT,lc)=>{l();"use strict";var ev=Ss(),tv=mr(),gT=_s(),rv=Wi(),iv=Ii(),Gi=class{constructor(e,t,r){t=t.toString(),this.stringified=!1,this._processor=e,this._css=t,this._opts=r,this._map=void 0;let n,a=tv;this.result=new iv(this._processor,n,this._opts),this.result.css=t;let s=this;Object.defineProperty(this.result,"root",{get(){return s.root}});let o=new ev(a,n,this._opts,t);if(o.isMap()){let[u,c]=o.generate();u&&(this.result.css=u),c&&(this.result.map=c)}}get[Symbol.toStringTag](){return"NoWorkResult"}get processor(){return this.result.processor}get opts(){return this.result.opts}get css(){return this.result.css}get content(){return this.result.css}get map(){return this.result.map}get root(){if(this._root)return this._root;let e,t=rv;try{e=t(this._css,this._opts)}catch(r){this.error=r}if(this.error)throw this.error;return this._root=e,e}get messages(){return[]}warnings(){return[]}toString(){return this._css}then(e,t){return this.async().then(e,t)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}async(){return this.error?Promise.reject(this.error):Promise.resolve(this.result)}sync(){if(this.error)throw this.error;return this.result}};lc.exports=Gi;Gi.default=Gi});var cc=v((wT,fc)=>{l();"use strict";var nv=uc(),sv=Fs(),av=Ti(),ov=Tt(),Dt=class{constructor(e=[]){this.version="8.4.24",this.plugins=this.normalize(e)}use(e){return this.plugins=this.plugins.concat(this.normalize([e])),this}process(e,t={}){return this.plugins.length===0&&typeof t.parser=="undefined"&&typeof t.stringifier=="undefined"&&typeof t.syntax=="undefined"?new nv(this,e,t):new sv(this,e,t)}normalize(e){let t=[];for(let r of e)if(r.postcss===!0?r=r():r.postcss&&(r=r.postcss),typeof r=="object"&&Array.isArray(r.plugins))t=t.concat(r.plugins);else if(typeof r=="object"&&r.postcssPlugin)t.push(r);else if(typeof r=="function")t.push(r);else if(!(typeof r=="object"&&(r.parse||r.stringify)))throw new Error(r+" is not a PostCSS plugin");return t}};fc.exports=Dt;Dt.default=Dt;ov.registerProcessor(Dt);av.registerProcessor(Dt)});var dc=v((bT,pc)=>{l();"use strict";var lv=yr(),uv=Ps(),fv=wr(),cv=$i(),pv=Vi(),dv=Tt(),hv=ji();function Ar(i,e){if(Array.isArray(i))return i.map(n=>Ar(n));let{inputs:t,...r}=i;if(t){e=[];for(let n of t){let a={...n,__proto__:pv.prototype};a.map&&(a.map={...a.map,__proto__:uv.prototype}),e.push(a)}}if(r.nodes&&(r.nodes=i.nodes.map(n=>Ar(n,e))),r.source){let{inputId:n,...a}=r.source;r.source=a,n!=null&&(r.source.input=e[n])}if(r.type==="root")return new dv(r);if(r.type==="decl")return new lv(r);if(r.type==="rule")return new hv(r);if(r.type==="comment")return new fv(r);if(r.type==="atrule")return new cv(r);throw new Error("Unknown node type: "+i.type)}pc.exports=Ar;Ar.default=Ar});var ye=v((vT,vc)=>{l();"use strict";var mv=ki(),hc=yr(),gv=Fs(),yv=it(),Ns=cc(),wv=mr(),bv=dc(),mc=Ti(),vv=Os(),gc=wr(),yc=$i(),xv=Ii(),kv=Vi(),Sv=Wi(),Cv=Ts(),wc=ji(),bc=Tt(),Av=gr();function j(...i){return i.length===1&&Array.isArray(i[0])&&(i=i[0]),new Ns(i)}j.plugin=function(e,t){let r=!1;function n(...s){console&&console.warn&&!r&&(r=!0,console.warn(e+`: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`),h.env.LANG&&h.env.LANG.startsWith("cn")&&console.warn(e+`: \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:
https://www.w3ctech.com/topic/2226`));let o=t(...s);return o.postcssPlugin=e,o.postcssVersion=new Ns().version,o}let a;return Object.defineProperty(n,"postcss",{get(){return a||(a=n()),a}}),n.process=function(s,o,u){return j([n(u)]).process(s,o)},n};j.stringify=wv;j.parse=Sv;j.fromJSON=bv;j.list=Cv;j.comment=i=>new gc(i);j.atRule=i=>new yc(i);j.decl=i=>new hc(i);j.rule=i=>new wc(i);j.root=i=>new bc(i);j.document=i=>new mc(i);j.CssSyntaxError=mv;j.Declaration=hc;j.Container=yv;j.Processor=Ns;j.Document=mc;j.Comment=gc;j.Warning=vv;j.AtRule=yc;j.Result=xv;j.Input=kv;j.Rule=wc;j.Root=bc;j.Node=Av;gv.registerPostcss(j);vc.exports=j;j.default=j});var U,z,xT,kT,ST,CT,AT,_T,OT,ET,TT,PT,DT,IT,qT,RT,MT,BT,FT,NT,LT,$T,jT,zT,VT,UT,nt=C(()=>{l();U=X(ye()),z=U.default,xT=U.default.stringify,kT=U.default.fromJSON,ST=U.default.plugin,CT=U.default.parse,AT=U.default.list,_T=U.default.document,OT=U.default.comment,ET=U.default.atRule,TT=U.default.rule,PT=U.default.decl,DT=U.default.root,IT=U.default.CssSyntaxError,qT=U.default.Declaration,RT=U.default.Container,MT=U.default.Processor,BT=U.default.Document,FT=U.default.Comment,NT=U.default.Warning,LT=U.default.AtRule,$T=U.default.Result,jT=U.default.Input,zT=U.default.Rule,VT=U.default.Root,UT=U.default.Node});var Ls=v((GT,xc)=>{l();xc.exports=function(i,e,t,r,n){for(e=e.split?e.split("."):e,r=0;r<e.length;r++)i=i?i[e[r]]:n;return i===n?t:i}});var Yi=v((Hi,kc)=>{l();"use strict";Hi.__esModule=!0;Hi.default=Ev;function _v(i){for(var e=i.toLowerCase(),t="",r=!1,n=0;n<6&&e[n]!==void 0;n++){var a=e.charCodeAt(n),s=a>=97&&a<=102||a>=48&&a<=57;if(r=a===32,!s)break;t+=e[n]}if(t.length!==0){var o=parseInt(t,16),u=o>=55296&&o<=57343;return u||o===0||o>1114111?["\uFFFD",t.length+(r?1:0)]:[String.fromCodePoint(o),t.length+(r?1:0)]}}var Ov=/\\/;function Ev(i){var e=Ov.test(i);if(!e)return i;for(var t="",r=0;r<i.length;r++){if(i[r]==="\\"){var n=_v(i.slice(r+1,r+7));if(n!==void 0){t+=n[0],r+=n[1];continue}if(i[r+1]==="\\"){t+="\\",r++;continue}i.length===r+1&&(t+=i[r]);continue}t+=i[r]}return t}kc.exports=Hi.default});var Cc=v((Qi,Sc)=>{l();"use strict";Qi.__esModule=!0;Qi.default=Tv;function Tv(i){for(var e=arguments.length,t=new Array(e>1?e-1:0),r=1;r<e;r++)t[r-1]=arguments[r];for(;t.length>0;){var n=t.shift();if(!i[n])return;i=i[n]}return i}Sc.exports=Qi.default});var _c=v((Ji,Ac)=>{l();"use strict";Ji.__esModule=!0;Ji.default=Pv;function Pv(i){for(var e=arguments.length,t=new Array(e>1?e-1:0),r=1;r<e;r++)t[r-1]=arguments[r];for(;t.length>0;){var n=t.shift();i[n]||(i[n]={}),i=i[n]}}Ac.exports=Ji.default});var Ec=v((Xi,Oc)=>{l();"use strict";Xi.__esModule=!0;Xi.default=Dv;function Dv(i){for(var e="",t=i.indexOf("/*"),r=0;t>=0;){e=e+i.slice(r,t);var n=i.indexOf("*/",t+2);if(n<0)return e;r=n+2,t=i.indexOf("/*",r)}return e=e+i.slice(r),e}Oc.exports=Xi.default});var _r=v(Me=>{l();"use strict";Me.__esModule=!0;Me.unesc=Me.stripComments=Me.getProp=Me.ensureObject=void 0;var Iv=Ki(Yi());Me.unesc=Iv.default;var qv=Ki(Cc());Me.getProp=qv.default;var Rv=Ki(_c());Me.ensureObject=Rv.default;var Mv=Ki(Ec());Me.stripComments=Mv.default;function Ki(i){return i&&i.__esModule?i:{default:i}}});var Ue=v((Or,Dc)=>{l();"use strict";Or.__esModule=!0;Or.default=void 0;var Tc=_r();function Pc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function Bv(i,e,t){return e&&Pc(i.prototype,e),t&&Pc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}var Fv=function i(e,t){if(typeof e!="object"||e===null)return e;var r=new e.constructor;for(var n in e)if(!!e.hasOwnProperty(n)){var a=e[n],s=typeof a;n==="parent"&&s==="object"?t&&(r[n]=t):a instanceof Array?r[n]=a.map(function(o){return i(o,r)}):r[n]=i(a,r)}return r},Nv=function(){function i(t){t===void 0&&(t={}),Object.assign(this,t),this.spaces=this.spaces||{},this.spaces.before=this.spaces.before||"",this.spaces.after=this.spaces.after||""}var e=i.prototype;return e.remove=function(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this},e.replaceWith=function(){if(this.parent){for(var r in arguments)this.parent.insertBefore(this,arguments[r]);this.remove()}return this},e.next=function(){return this.parent.at(this.parent.index(this)+1)},e.prev=function(){return this.parent.at(this.parent.index(this)-1)},e.clone=function(r){r===void 0&&(r={});var n=Fv(this);for(var a in r)n[a]=r[a];return n},e.appendToPropertyAndEscape=function(r,n,a){this.raws||(this.raws={});var s=this[r],o=this.raws[r];this[r]=s+n,o||a!==n?this.raws[r]=(o||s)+a:delete this.raws[r]},e.setPropertyAndEscape=function(r,n,a){this.raws||(this.raws={}),this[r]=n,this.raws[r]=a},e.setPropertyWithoutEscape=function(r,n){this[r]=n,this.raws&&delete this.raws[r]},e.isAtPosition=function(r,n){if(this.source&&this.source.start&&this.source.end)return!(this.source.start.line>r||this.source.end.line<r||this.source.start.line===r&&this.source.start.column>n||this.source.end.line===r&&this.source.end.column<n)},e.stringifyProperty=function(r){return this.raws&&this.raws[r]||this[r]},e.valueToString=function(){return String(this.stringifyProperty("value"))},e.toString=function(){return[this.rawSpaceBefore,this.valueToString(),this.rawSpaceAfter].join("")},Bv(i,[{key:"rawSpaceBefore",get:function(){var r=this.raws&&this.raws.spaces&&this.raws.spaces.before;return r===void 0&&(r=this.spaces&&this.spaces.before),r||""},set:function(r){(0,Tc.ensureObject)(this,"raws","spaces"),this.raws.spaces.before=r}},{key:"rawSpaceAfter",get:function(){var r=this.raws&&this.raws.spaces&&this.raws.spaces.after;return r===void 0&&(r=this.spaces.after),r||""},set:function(r){(0,Tc.ensureObject)(this,"raws","spaces"),this.raws.spaces.after=r}}]),i}();Or.default=Nv;Dc.exports=Or.default});var ae=v(W=>{l();"use strict";W.__esModule=!0;W.UNIVERSAL=W.TAG=W.STRING=W.SELECTOR=W.ROOT=W.PSEUDO=W.NESTING=W.ID=W.COMMENT=W.COMBINATOR=W.CLASS=W.ATTRIBUTE=void 0;var Lv="tag";W.TAG=Lv;var $v="string";W.STRING=$v;var jv="selector";W.SELECTOR=jv;var zv="root";W.ROOT=zv;var Vv="pseudo";W.PSEUDO=Vv;var Uv="nesting";W.NESTING=Uv;var Wv="id";W.ID=Wv;var Gv="comment";W.COMMENT=Gv;var Hv="combinator";W.COMBINATOR=Hv;var Yv="class";W.CLASS=Yv;var Qv="attribute";W.ATTRIBUTE=Qv;var Jv="universal";W.UNIVERSAL=Jv});var Zi=v((Er,Mc)=>{l();"use strict";Er.__esModule=!0;Er.default=void 0;var Xv=Zv(Ue()),We=Kv(ae());function Ic(i){if(typeof WeakMap!="function")return null;var e=new WeakMap,t=new WeakMap;return(Ic=function(n){return n?t:e})(i)}function Kv(i,e){if(!e&&i&&i.__esModule)return i;if(i===null||typeof i!="object"&&typeof i!="function")return{default:i};var t=Ic(e);if(t&&t.has(i))return t.get(i);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in i)if(a!=="default"&&Object.prototype.hasOwnProperty.call(i,a)){var s=n?Object.getOwnPropertyDescriptor(i,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=i[a]}return r.default=i,t&&t.set(i,r),r}function Zv(i){return i&&i.__esModule?i:{default:i}}function ex(i,e){var t=typeof Symbol!="undefined"&&i[Symbol.iterator]||i["@@iterator"];if(t)return(t=t.call(i)).next.bind(t);if(Array.isArray(i)||(t=tx(i))||e&&i&&typeof i.length=="number"){t&&(i=t);var r=0;return function(){return r>=i.length?{done:!0}:{done:!1,value:i[r++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function tx(i,e){if(!!i){if(typeof i=="string")return qc(i,e);var t=Object.prototype.toString.call(i).slice(8,-1);if(t==="Object"&&i.constructor&&(t=i.constructor.name),t==="Map"||t==="Set")return Array.from(i);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return qc(i,e)}}function qc(i,e){(e==null||e>i.length)&&(e=i.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=i[t];return r}function Rc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function rx(i,e,t){return e&&Rc(i.prototype,e),t&&Rc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function ix(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,$s(i,e)}function $s(i,e){return $s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},$s(i,e)}var nx=function(i){ix(e,i);function e(r){var n;return n=i.call(this,r)||this,n.nodes||(n.nodes=[]),n}var t=e.prototype;return t.append=function(n){return n.parent=this,this.nodes.push(n),this},t.prepend=function(n){return n.parent=this,this.nodes.unshift(n),this},t.at=function(n){return this.nodes[n]},t.index=function(n){return typeof n=="number"?n:this.nodes.indexOf(n)},t.removeChild=function(n){n=this.index(n),this.at(n).parent=void 0,this.nodes.splice(n,1);var a;for(var s in this.indexes)a=this.indexes[s],a>=n&&(this.indexes[s]=a-1);return this},t.removeAll=function(){for(var n=ex(this.nodes),a;!(a=n()).done;){var s=a.value;s.parent=void 0}return this.nodes=[],this},t.empty=function(){return this.removeAll()},t.insertAfter=function(n,a){a.parent=this;var s=this.index(n);this.nodes.splice(s+1,0,a),a.parent=this;var o;for(var u in this.indexes)o=this.indexes[u],s<=o&&(this.indexes[u]=o+1);return this},t.insertBefore=function(n,a){a.parent=this;var s=this.index(n);this.nodes.splice(s,0,a),a.parent=this;var o;for(var u in this.indexes)o=this.indexes[u],o<=s&&(this.indexes[u]=o+1);return this},t._findChildAtPosition=function(n,a){var s=void 0;return this.each(function(o){if(o.atPosition){var u=o.atPosition(n,a);if(u)return s=u,!1}else if(o.isAtPosition(n,a))return s=o,!1}),s},t.atPosition=function(n,a){if(this.isAtPosition(n,a))return this._findChildAtPosition(n,a)||this},t._inferEndPosition=function(){this.last&&this.last.source&&this.last.source.end&&(this.source=this.source||{},this.source.end=this.source.end||{},Object.assign(this.source.end,this.last.source.end))},t.each=function(n){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach++;var a=this.lastEach;if(this.indexes[a]=0,!!this.length){for(var s,o;this.indexes[a]<this.length&&(s=this.indexes[a],o=n(this.at(s),s),o!==!1);)this.indexes[a]+=1;if(delete this.indexes[a],o===!1)return!1}},t.walk=function(n){return this.each(function(a,s){var o=n(a,s);if(o!==!1&&a.length&&(o=a.walk(n)),o===!1)return!1})},t.walkAttributes=function(n){var a=this;return this.walk(function(s){if(s.type===We.ATTRIBUTE)return n.call(a,s)})},t.walkClasses=function(n){var a=this;return this.walk(function(s){if(s.type===We.CLASS)return n.call(a,s)})},t.walkCombinators=function(n){var a=this;return this.walk(function(s){if(s.type===We.COMBINATOR)return n.call(a,s)})},t.walkComments=function(n){var a=this;return this.walk(function(s){if(s.type===We.COMMENT)return n.call(a,s)})},t.walkIds=function(n){var a=this;return this.walk(function(s){if(s.type===We.ID)return n.call(a,s)})},t.walkNesting=function(n){var a=this;return this.walk(function(s){if(s.type===We.NESTING)return n.call(a,s)})},t.walkPseudos=function(n){var a=this;return this.walk(function(s){if(s.type===We.PSEUDO)return n.call(a,s)})},t.walkTags=function(n){var a=this;return this.walk(function(s){if(s.type===We.TAG)return n.call(a,s)})},t.walkUniversals=function(n){var a=this;return this.walk(function(s){if(s.type===We.UNIVERSAL)return n.call(a,s)})},t.split=function(n){var a=this,s=[];return this.reduce(function(o,u,c){var f=n.call(a,u);return s.push(u),f?(o.push(s),s=[]):c===a.length-1&&o.push(s),o},[])},t.map=function(n){return this.nodes.map(n)},t.reduce=function(n,a){return this.nodes.reduce(n,a)},t.every=function(n){return this.nodes.every(n)},t.some=function(n){return this.nodes.some(n)},t.filter=function(n){return this.nodes.filter(n)},t.sort=function(n){return this.nodes.sort(n)},t.toString=function(){return this.map(String).join("")},rx(e,[{key:"first",get:function(){return this.at(0)}},{key:"last",get:function(){return this.at(this.length-1)}},{key:"length",get:function(){return this.nodes.length}}]),e}(Xv.default);Er.default=nx;Mc.exports=Er.default});var zs=v((Tr,Fc)=>{l();"use strict";Tr.__esModule=!0;Tr.default=void 0;var sx=ox(Zi()),ax=ae();function ox(i){return i&&i.__esModule?i:{default:i}}function Bc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function lx(i,e,t){return e&&Bc(i.prototype,e),t&&Bc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function ux(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,js(i,e)}function js(i,e){return js=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},js(i,e)}var fx=function(i){ux(e,i);function e(r){var n;return n=i.call(this,r)||this,n.type=ax.ROOT,n}var t=e.prototype;return t.toString=function(){var n=this.reduce(function(a,s){return a.push(String(s)),a},[]).join(",");return this.trailingComma?n+",":n},t.error=function(n,a){return this._error?this._error(n,a):new Error(n)},lx(e,[{key:"errorGenerator",set:function(n){this._error=n}}]),e}(sx.default);Tr.default=fx;Fc.exports=Tr.default});var Us=v((Pr,Nc)=>{l();"use strict";Pr.__esModule=!0;Pr.default=void 0;var cx=dx(Zi()),px=ae();function dx(i){return i&&i.__esModule?i:{default:i}}function hx(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Vs(i,e)}function Vs(i,e){return Vs=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Vs(i,e)}var mx=function(i){hx(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=px.SELECTOR,r}return e}(cx.default);Pr.default=mx;Nc.exports=Pr.default});var en=v((QT,Lc)=>{l();"use strict";var gx={},yx=gx.hasOwnProperty,wx=function(e,t){if(!e)return t;var r={};for(var n in t)r[n]=yx.call(e,n)?e[n]:t[n];return r},bx=/[ -,\.\/:-@\[-\^`\{-~]/,vx=/[ -,\.\/:-@\[\]\^`\{-~]/,xx=/(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,Ws=function i(e,t){t=wx(t,i.options),t.quotes!="single"&&t.quotes!="double"&&(t.quotes="single");for(var r=t.quotes=="double"?'"':"'",n=t.isIdentifier,a=e.charAt(0),s="",o=0,u=e.length;o<u;){var c=e.charAt(o++),f=c.charCodeAt(),d=void 0;if(f<32||f>126){if(f>=55296&&f<=56319&&o<u){var p=e.charCodeAt(o++);(p&64512)==56320?f=((f&1023)<<10)+(p&1023)+65536:o--}d="\\"+f.toString(16).toUpperCase()+" "}else t.escapeEverything?bx.test(c)?d="\\"+c:d="\\"+f.toString(16).toUpperCase()+" ":/[\t\n\f\r\x0B]/.test(c)?d="\\"+f.toString(16).toUpperCase()+" ":c=="\\"||!n&&(c=='"'&&r==c||c=="'"&&r==c)||n&&vx.test(c)?d="\\"+c:d=c;s+=d}return n&&(/^-[-\d]/.test(s)?s="\\-"+s.slice(1):/\d/.test(a)&&(s="\\3"+a+" "+s.slice(1))),s=s.replace(xx,function(m,b,x){return b&&b.length%2?m:(b||"")+x}),!n&&t.wrap?r+s+r:s};Ws.options={escapeEverything:!1,isIdentifier:!1,quotes:"single",wrap:!1};Ws.version="3.0.0";Lc.exports=Ws});var Hs=v((Dr,zc)=>{l();"use strict";Dr.__esModule=!0;Dr.default=void 0;var kx=$c(en()),Sx=_r(),Cx=$c(Ue()),Ax=ae();function $c(i){return i&&i.__esModule?i:{default:i}}function jc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function _x(i,e,t){return e&&jc(i.prototype,e),t&&jc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function Ox(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Gs(i,e)}function Gs(i,e){return Gs=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Gs(i,e)}var Ex=function(i){Ox(e,i);function e(r){var n;return n=i.call(this,r)||this,n.type=Ax.CLASS,n._constructed=!0,n}var t=e.prototype;return t.valueToString=function(){return"."+i.prototype.valueToString.call(this)},_x(e,[{key:"value",get:function(){return this._value},set:function(n){if(this._constructed){var a=(0,kx.default)(n,{isIdentifier:!0});a!==n?((0,Sx.ensureObject)(this,"raws"),this.raws.value=a):this.raws&&delete this.raws.value}this._value=n}}]),e}(Cx.default);Dr.default=Ex;zc.exports=Dr.default});var Qs=v((Ir,Vc)=>{l();"use strict";Ir.__esModule=!0;Ir.default=void 0;var Tx=Dx(Ue()),Px=ae();function Dx(i){return i&&i.__esModule?i:{default:i}}function Ix(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Ys(i,e)}function Ys(i,e){return Ys=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Ys(i,e)}var qx=function(i){Ix(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=Px.COMMENT,r}return e}(Tx.default);Ir.default=qx;Vc.exports=Ir.default});var Xs=v((qr,Uc)=>{l();"use strict";qr.__esModule=!0;qr.default=void 0;var Rx=Bx(Ue()),Mx=ae();function Bx(i){return i&&i.__esModule?i:{default:i}}function Fx(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Js(i,e)}function Js(i,e){return Js=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Js(i,e)}var Nx=function(i){Fx(e,i);function e(r){var n;return n=i.call(this,r)||this,n.type=Mx.ID,n}var t=e.prototype;return t.valueToString=function(){return"#"+i.prototype.valueToString.call(this)},e}(Rx.default);qr.default=Nx;Uc.exports=qr.default});var tn=v((Rr,Hc)=>{l();"use strict";Rr.__esModule=!0;Rr.default=void 0;var Lx=Wc(en()),$x=_r(),jx=Wc(Ue());function Wc(i){return i&&i.__esModule?i:{default:i}}function Gc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function zx(i,e,t){return e&&Gc(i.prototype,e),t&&Gc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function Vx(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Ks(i,e)}function Ks(i,e){return Ks=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Ks(i,e)}var Ux=function(i){Vx(e,i);function e(){return i.apply(this,arguments)||this}var t=e.prototype;return t.qualifiedName=function(n){return this.namespace?this.namespaceString+"|"+n:n},t.valueToString=function(){return this.qualifiedName(i.prototype.valueToString.call(this))},zx(e,[{key:"namespace",get:function(){return this._namespace},set:function(n){if(n===!0||n==="*"||n==="&"){this._namespace=n,this.raws&&delete this.raws.namespace;return}var a=(0,Lx.default)(n,{isIdentifier:!0});this._namespace=n,a!==n?((0,$x.ensureObject)(this,"raws"),this.raws.namespace=a):this.raws&&delete this.raws.namespace}},{key:"ns",get:function(){return this._namespace},set:function(n){this.namespace=n}},{key:"namespaceString",get:function(){if(this.namespace){var n=this.stringifyProperty("namespace");return n===!0?"":n}else return""}}]),e}(jx.default);Rr.default=Ux;Hc.exports=Rr.default});var ea=v((Mr,Yc)=>{l();"use strict";Mr.__esModule=!0;Mr.default=void 0;var Wx=Hx(tn()),Gx=ae();function Hx(i){return i&&i.__esModule?i:{default:i}}function Yx(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Zs(i,e)}function Zs(i,e){return Zs=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Zs(i,e)}var Qx=function(i){Yx(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=Gx.TAG,r}return e}(Wx.default);Mr.default=Qx;Yc.exports=Mr.default});var ra=v((Br,Qc)=>{l();"use strict";Br.__esModule=!0;Br.default=void 0;var Jx=Kx(Ue()),Xx=ae();function Kx(i){return i&&i.__esModule?i:{default:i}}function Zx(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,ta(i,e)}function ta(i,e){return ta=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},ta(i,e)}var e1=function(i){Zx(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=Xx.STRING,r}return e}(Jx.default);Br.default=e1;Qc.exports=Br.default});var na=v((Fr,Jc)=>{l();"use strict";Fr.__esModule=!0;Fr.default=void 0;var t1=i1(Zi()),r1=ae();function i1(i){return i&&i.__esModule?i:{default:i}}function n1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,ia(i,e)}function ia(i,e){return ia=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},ia(i,e)}var s1=function(i){n1(e,i);function e(r){var n;return n=i.call(this,r)||this,n.type=r1.PSEUDO,n}var t=e.prototype;return t.toString=function(){var n=this.length?"("+this.map(String).join(",")+")":"";return[this.rawSpaceBefore,this.stringifyProperty("value"),n,this.rawSpaceAfter].join("")},e}(t1.default);Fr.default=s1;Jc.exports=Fr.default});var Xc={};_e(Xc,{deprecate:()=>a1});function a1(i){return i}var Kc=C(()=>{l()});var ep=v((JT,Zc)=>{l();Zc.exports=(Kc(),Xc).deprecate});var fa=v($r=>{l();"use strict";$r.__esModule=!0;$r.default=void 0;$r.unescapeValue=la;var Nr=aa(en()),o1=aa(Yi()),l1=aa(tn()),u1=ae(),sa;function aa(i){return i&&i.__esModule?i:{default:i}}function tp(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function f1(i,e,t){return e&&tp(i.prototype,e),t&&tp(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function c1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,oa(i,e)}function oa(i,e){return oa=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},oa(i,e)}var Lr=ep(),p1=/^('|")([^]*)\1$/,d1=Lr(function(){},"Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead."),h1=Lr(function(){},"Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead."),m1=Lr(function(){},"Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");function la(i){var e=!1,t=null,r=i,n=r.match(p1);return n&&(t=n[1],r=n[2]),r=(0,o1.default)(r),r!==i&&(e=!0),{deprecatedUsage:e,unescaped:r,quoteMark:t}}function g1(i){if(i.quoteMark!==void 0||i.value===void 0)return i;m1();var e=la(i.value),t=e.quoteMark,r=e.unescaped;return i.raws||(i.raws={}),i.raws.value===void 0&&(i.raws.value=i.value),i.value=r,i.quoteMark=t,i}var rn=function(i){c1(e,i);function e(r){var n;return r===void 0&&(r={}),n=i.call(this,g1(r))||this,n.type=u1.ATTRIBUTE,n.raws=n.raws||{},Object.defineProperty(n.raws,"unquoted",{get:Lr(function(){return n.value},"attr.raws.unquoted is deprecated. Call attr.value instead."),set:Lr(function(){return n.value},"Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")}),n._constructed=!0,n}var t=e.prototype;return t.getQuotedValue=function(n){n===void 0&&(n={});var a=this._determineQuoteMark(n),s=ua[a],o=(0,Nr.default)(this._value,s);return o},t._determineQuoteMark=function(n){return n.smart?this.smartQuoteMark(n):this.preferredQuoteMark(n)},t.setValue=function(n,a){a===void 0&&(a={}),this._value=n,this._quoteMark=this._determineQuoteMark(a),this._syncRawValue()},t.smartQuoteMark=function(n){var a=this.value,s=a.replace(/[^']/g,"").length,o=a.replace(/[^"]/g,"").length;if(s+o===0){var u=(0,Nr.default)(a,{isIdentifier:!0});if(u===a)return e.NO_QUOTE;var c=this.preferredQuoteMark(n);if(c===e.NO_QUOTE){var f=this.quoteMark||n.quoteMark||e.DOUBLE_QUOTE,d=ua[f],p=(0,Nr.default)(a,d);if(p.length<u.length)return f}return c}else return o===s?this.preferredQuoteMark(n):o<s?e.DOUBLE_QUOTE:e.SINGLE_QUOTE},t.preferredQuoteMark=function(n){var a=n.preferCurrentQuoteMark?this.quoteMark:n.quoteMark;return a===void 0&&(a=n.preferCurrentQuoteMark?n.quoteMark:this.quoteMark),a===void 0&&(a=e.DOUBLE_QUOTE),a},t._syncRawValue=function(){var n=(0,Nr.default)(this._value,ua[this.quoteMark]);n===this._value?this.raws&&delete this.raws.value:this.raws.value=n},t._handleEscapes=function(n,a){if(this._constructed){var s=(0,Nr.default)(a,{isIdentifier:!0});s!==a?this.raws[n]=s:delete this.raws[n]}},t._spacesFor=function(n){var a={before:"",after:""},s=this.spaces[n]||{},o=this.raws.spaces&&this.raws.spaces[n]||{};return Object.assign(a,s,o)},t._stringFor=function(n,a,s){a===void 0&&(a=n),s===void 0&&(s=rp);var o=this._spacesFor(a);return s(this.stringifyProperty(n),o)},t.offsetOf=function(n){var a=1,s=this._spacesFor("attribute");if(a+=s.before.length,n==="namespace"||n==="ns")return this.namespace?a:-1;if(n==="attributeNS"||(a+=this.namespaceString.length,this.namespace&&(a+=1),n==="attribute"))return a;a+=this.stringifyProperty("attribute").length,a+=s.after.length;var o=this._spacesFor("operator");a+=o.before.length;var u=this.stringifyProperty("operator");if(n==="operator")return u?a:-1;a+=u.length,a+=o.after.length;var c=this._spacesFor("value");a+=c.before.length;var f=this.stringifyProperty("value");if(n==="value")return f?a:-1;a+=f.length,a+=c.after.length;var d=this._spacesFor("insensitive");return a+=d.before.length,n==="insensitive"&&this.insensitive?a:-1},t.toString=function(){var n=this,a=[this.rawSpaceBefore,"["];return a.push(this._stringFor("qualifiedAttribute","attribute")),this.operator&&(this.value||this.value==="")&&(a.push(this._stringFor("operator")),a.push(this._stringFor("value")),a.push(this._stringFor("insensitiveFlag","insensitive",function(s,o){return s.length>0&&!n.quoted&&o.before.length===0&&!(n.spaces.value&&n.spaces.value.after)&&(o.before=" "),rp(s,o)}))),a.push("]"),a.push(this.rawSpaceAfter),a.join("")},f1(e,[{key:"quoted",get:function(){var n=this.quoteMark;return n==="'"||n==='"'},set:function(n){h1()}},{key:"quoteMark",get:function(){return this._quoteMark},set:function(n){if(!this._constructed){this._quoteMark=n;return}this._quoteMark!==n&&(this._quoteMark=n,this._syncRawValue())}},{key:"qualifiedAttribute",get:function(){return this.qualifiedName(this.raws.attribute||this.attribute)}},{key:"insensitiveFlag",get:function(){return this.insensitive?"i":""}},{key:"value",get:function(){return this._value},set:function(n){if(this._constructed){var a=la(n),s=a.deprecatedUsage,o=a.unescaped,u=a.quoteMark;if(s&&d1(),o===this._value&&u===this._quoteMark)return;this._value=o,this._quoteMark=u,this._syncRawValue()}else this._value=n}},{key:"insensitive",get:function(){return this._insensitive},set:function(n){n||(this._insensitive=!1,this.raws&&(this.raws.insensitiveFlag==="I"||this.raws.insensitiveFlag==="i")&&(this.raws.insensitiveFlag=void 0)),this._insensitive=n}},{key:"attribute",get:function(){return this._attribute},set:function(n){this._handleEscapes("attribute",n),this._attribute=n}}]),e}(l1.default);$r.default=rn;rn.NO_QUOTE=null;rn.SINGLE_QUOTE="'";rn.DOUBLE_QUOTE='"';var ua=(sa={"'":{quotes:"single",wrap:!0},'"':{quotes:"double",wrap:!0}},sa[null]={isIdentifier:!0},sa);function rp(i,e){return""+e.before+i+e.after}});var pa=v((jr,ip)=>{l();"use strict";jr.__esModule=!0;jr.default=void 0;var y1=b1(tn()),w1=ae();function b1(i){return i&&i.__esModule?i:{default:i}}function v1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,ca(i,e)}function ca(i,e){return ca=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},ca(i,e)}var x1=function(i){v1(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=w1.UNIVERSAL,r.value="*",r}return e}(y1.default);jr.default=x1;ip.exports=jr.default});var ha=v((zr,np)=>{l();"use strict";zr.__esModule=!0;zr.default=void 0;var k1=C1(Ue()),S1=ae();function C1(i){return i&&i.__esModule?i:{default:i}}function A1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,da(i,e)}function da(i,e){return da=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},da(i,e)}var _1=function(i){A1(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=S1.COMBINATOR,r}return e}(k1.default);zr.default=_1;np.exports=zr.default});var ga=v((Vr,sp)=>{l();"use strict";Vr.__esModule=!0;Vr.default=void 0;var O1=T1(Ue()),E1=ae();function T1(i){return i&&i.__esModule?i:{default:i}}function P1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,ma(i,e)}function ma(i,e){return ma=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},ma(i,e)}var D1=function(i){P1(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=E1.NESTING,r.value="&",r}return e}(O1.default);Vr.default=D1;sp.exports=Vr.default});var op=v((nn,ap)=>{l();"use strict";nn.__esModule=!0;nn.default=I1;function I1(i){return i.sort(function(e,t){return e-t})}ap.exports=nn.default});var ya=v(D=>{l();"use strict";D.__esModule=!0;D.word=D.tilde=D.tab=D.str=D.space=D.slash=D.singleQuote=D.semicolon=D.plus=D.pipe=D.openSquare=D.openParenthesis=D.newline=D.greaterThan=D.feed=D.equals=D.doubleQuote=D.dollar=D.cr=D.comment=D.comma=D.combinator=D.colon=D.closeSquare=D.closeParenthesis=D.caret=D.bang=D.backslash=D.at=D.asterisk=D.ampersand=void 0;var q1=38;D.ampersand=q1;var R1=42;D.asterisk=R1;var M1=64;D.at=M1;var B1=44;D.comma=B1;var F1=58;D.colon=F1;var N1=59;D.semicolon=N1;var L1=40;D.openParenthesis=L1;var $1=41;D.closeParenthesis=$1;var j1=91;D.openSquare=j1;var z1=93;D.closeSquare=z1;var V1=36;D.dollar=V1;var U1=126;D.tilde=U1;var W1=94;D.caret=W1;var G1=43;D.plus=G1;var H1=61;D.equals=H1;var Y1=124;D.pipe=Y1;var Q1=62;D.greaterThan=Q1;var J1=32;D.space=J1;var lp=39;D.singleQuote=lp;var X1=34;D.doubleQuote=X1;var K1=47;D.slash=K1;var Z1=33;D.bang=Z1;var ek=92;D.backslash=ek;var tk=13;D.cr=tk;var rk=12;D.feed=rk;var ik=10;D.newline=ik;var nk=9;D.tab=nk;var sk=lp;D.str=sk;var ak=-1;D.comment=ak;var ok=-2;D.word=ok;var lk=-3;D.combinator=lk});var cp=v(Ur=>{l();"use strict";Ur.__esModule=!0;Ur.FIELDS=void 0;Ur.default=mk;var O=uk(ya()),It,V;function up(i){if(typeof WeakMap!="function")return null;var e=new WeakMap,t=new WeakMap;return(up=function(n){return n?t:e})(i)}function uk(i,e){if(!e&&i&&i.__esModule)return i;if(i===null||typeof i!="object"&&typeof i!="function")return{default:i};var t=up(e);if(t&&t.has(i))return t.get(i);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in i)if(a!=="default"&&Object.prototype.hasOwnProperty.call(i,a)){var s=n?Object.getOwnPropertyDescriptor(i,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=i[a]}return r.default=i,t&&t.set(i,r),r}var fk=(It={},It[O.tab]=!0,It[O.newline]=!0,It[O.cr]=!0,It[O.feed]=!0,It),ck=(V={},V[O.space]=!0,V[O.tab]=!0,V[O.newline]=!0,V[O.cr]=!0,V[O.feed]=!0,V[O.ampersand]=!0,V[O.asterisk]=!0,V[O.bang]=!0,V[O.comma]=!0,V[O.colon]=!0,V[O.semicolon]=!0,V[O.openParenthesis]=!0,V[O.closeParenthesis]=!0,V[O.openSquare]=!0,V[O.closeSquare]=!0,V[O.singleQuote]=!0,V[O.doubleQuote]=!0,V[O.plus]=!0,V[O.pipe]=!0,V[O.tilde]=!0,V[O.greaterThan]=!0,V[O.equals]=!0,V[O.dollar]=!0,V[O.caret]=!0,V[O.slash]=!0,V),wa={},fp="0123456789abcdefABCDEF";for(sn=0;sn<fp.length;sn++)wa[fp.charCodeAt(sn)]=!0;var sn;function pk(i,e){var t=e,r;do{if(r=i.charCodeAt(t),ck[r])return t-1;r===O.backslash?t=dk(i,t)+1:t++}while(t<i.length);return t-1}function dk(i,e){var t=e,r=i.charCodeAt(t+1);if(!fk[r])if(wa[r]){var n=0;do t++,n++,r=i.charCodeAt(t+1);while(wa[r]&&n<6);n<6&&r===O.space&&t++}else t++;return t}var hk={TYPE:0,START_LINE:1,START_COL:2,END_LINE:3,END_COL:4,START_POS:5,END_POS:6};Ur.FIELDS=hk;function mk(i){var e=[],t=i.css.valueOf(),r=t,n=r.length,a=-1,s=1,o=0,u=0,c,f,d,p,m,b,x,y,w,k,S,_,E;function I(q,R){if(i.safe)t+=R,w=t.length-1;else throw i.error("Unclosed "+q,s,o-a,o)}for(;o<n;){switch(c=t.charCodeAt(o),c===O.newline&&(a=o,s+=1),c){case O.space:case O.tab:case O.newline:case O.cr:case O.feed:w=o;do w+=1,c=t.charCodeAt(w),c===O.newline&&(a=w,s+=1);while(c===O.space||c===O.newline||c===O.tab||c===O.cr||c===O.feed);E=O.space,p=s,d=w-a-1,u=w;break;case O.plus:case O.greaterThan:case O.tilde:case O.pipe:w=o;do w+=1,c=t.charCodeAt(w);while(c===O.plus||c===O.greaterThan||c===O.tilde||c===O.pipe);E=O.combinator,p=s,d=o-a,u=w;break;case O.asterisk:case O.ampersand:case O.bang:case O.comma:case O.equals:case O.dollar:case O.caret:case O.openSquare:case O.closeSquare:case O.colon:case O.semicolon:case O.openParenthesis:case O.closeParenthesis:w=o,E=c,p=s,d=o-a,u=w+1;break;case O.singleQuote:case O.doubleQuote:_=c===O.singleQuote?"'":'"',w=o;do for(m=!1,w=t.indexOf(_,w+1),w===-1&&I("quote",_),b=w;t.charCodeAt(b-1)===O.backslash;)b-=1,m=!m;while(m);E=O.str,p=s,d=o-a,u=w+1;break;default:c===O.slash&&t.charCodeAt(o+1)===O.asterisk?(w=t.indexOf("*/",o+2)+1,w===0&&I("comment","*/"),f=t.slice(o,w+1),y=f.split(`
`),x=y.length-1,x>0?(k=s+x,S=w-y[x].length):(k=s,S=a),E=O.comment,s=k,p=k,d=w-S):c===O.slash?(w=o,E=c,p=s,d=o-a,u=w+1):(w=pk(t,o),E=O.word,p=s,d=w-a),u=w+1;break}e.push([E,s,o-a,p,d,o,u]),S&&(a=S,S=null),o=u}return e}});var bp=v((Wr,wp)=>{l();"use strict";Wr.__esModule=!0;Wr.default=void 0;var gk=ve(zs()),ba=ve(Us()),yk=ve(Hs()),pp=ve(Qs()),wk=ve(Xs()),bk=ve(ea()),va=ve(ra()),vk=ve(na()),dp=an(fa()),xk=ve(pa()),xa=ve(ha()),kk=ve(ga()),Sk=ve(op()),A=an(cp()),T=an(ya()),Ck=an(ae()),Y=_r(),vt,ka;function hp(i){if(typeof WeakMap!="function")return null;var e=new WeakMap,t=new WeakMap;return(hp=function(n){return n?t:e})(i)}function an(i,e){if(!e&&i&&i.__esModule)return i;if(i===null||typeof i!="object"&&typeof i!="function")return{default:i};var t=hp(e);if(t&&t.has(i))return t.get(i);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in i)if(a!=="default"&&Object.prototype.hasOwnProperty.call(i,a)){var s=n?Object.getOwnPropertyDescriptor(i,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=i[a]}return r.default=i,t&&t.set(i,r),r}function ve(i){return i&&i.__esModule?i:{default:i}}function mp(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function Ak(i,e,t){return e&&mp(i.prototype,e),t&&mp(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}var Sa=(vt={},vt[T.space]=!0,vt[T.cr]=!0,vt[T.feed]=!0,vt[T.newline]=!0,vt[T.tab]=!0,vt),_k=Object.assign({},Sa,(ka={},ka[T.comment]=!0,ka));function gp(i){return{line:i[A.FIELDS.START_LINE],column:i[A.FIELDS.START_COL]}}function yp(i){return{line:i[A.FIELDS.END_LINE],column:i[A.FIELDS.END_COL]}}function xt(i,e,t,r){return{start:{line:i,column:e},end:{line:t,column:r}}}function qt(i){return xt(i[A.FIELDS.START_LINE],i[A.FIELDS.START_COL],i[A.FIELDS.END_LINE],i[A.FIELDS.END_COL])}function Ca(i,e){if(!!i)return xt(i[A.FIELDS.START_LINE],i[A.FIELDS.START_COL],e[A.FIELDS.END_LINE],e[A.FIELDS.END_COL])}function Rt(i,e){var t=i[e];if(typeof t=="string")return t.indexOf("\\")!==-1&&((0,Y.ensureObject)(i,"raws"),i[e]=(0,Y.unesc)(t),i.raws[e]===void 0&&(i.raws[e]=t)),i}function Aa(i,e){for(var t=-1,r=[];(t=i.indexOf(e,t+1))!==-1;)r.push(t);return r}function Ok(){var i=Array.prototype.concat.apply([],arguments);return i.filter(function(e,t){return t===i.indexOf(e)})}var Ek=function(){function i(t,r){r===void 0&&(r={}),this.rule=t,this.options=Object.assign({lossy:!1,safe:!1},r),this.position=0,this.css=typeof this.rule=="string"?this.rule:this.rule.selector,this.tokens=(0,A.default)({css:this.css,error:this._errorGenerator(),safe:this.options.safe});var n=Ca(this.tokens[0],this.tokens[this.tokens.length-1]);this.root=new gk.default({source:n}),this.root.errorGenerator=this._errorGenerator();var a=new ba.default({source:{start:{line:1,column:1}}});this.root.append(a),this.current=a,this.loop()}var e=i.prototype;return e._errorGenerator=function(){var r=this;return function(n,a){return typeof r.rule=="string"?new Error(n):r.rule.error(n,a)}},e.attribute=function(){var r=[],n=this.currToken;for(this.position++;this.position<this.tokens.length&&this.currToken[A.FIELDS.TYPE]!==T.closeSquare;)r.push(this.currToken),this.position++;if(this.currToken[A.FIELDS.TYPE]!==T.closeSquare)return this.expected("closing square bracket",this.currToken[A.FIELDS.START_POS]);var a=r.length,s={source:xt(n[1],n[2],this.currToken[3],this.currToken[4]),sourceIndex:n[A.FIELDS.START_POS]};if(a===1&&!~[T.word].indexOf(r[0][A.FIELDS.TYPE]))return this.expected("attribute",r[0][A.FIELDS.START_POS]);for(var o=0,u="",c="",f=null,d=!1;o<a;){var p=r[o],m=this.content(p),b=r[o+1];switch(p[A.FIELDS.TYPE]){case T.space:if(d=!0,this.options.lossy)break;if(f){(0,Y.ensureObject)(s,"spaces",f);var x=s.spaces[f].after||"";s.spaces[f].after=x+m;var y=(0,Y.getProp)(s,"raws","spaces",f,"after")||null;y&&(s.raws.spaces[f].after=y+m)}else u=u+m,c=c+m;break;case T.asterisk:if(b[A.FIELDS.TYPE]===T.equals)s.operator=m,f="operator";else if((!s.namespace||f==="namespace"&&!d)&&b){u&&((0,Y.ensureObject)(s,"spaces","attribute"),s.spaces.attribute.before=u,u=""),c&&((0,Y.ensureObject)(s,"raws","spaces","attribute"),s.raws.spaces.attribute.before=u,c=""),s.namespace=(s.namespace||"")+m;var w=(0,Y.getProp)(s,"raws","namespace")||null;w&&(s.raws.namespace+=m),f="namespace"}d=!1;break;case T.dollar:if(f==="value"){var k=(0,Y.getProp)(s,"raws","value");s.value+="$",k&&(s.raws.value=k+"$");break}case T.caret:b[A.FIELDS.TYPE]===T.equals&&(s.operator=m,f="operator"),d=!1;break;case T.combinator:if(m==="~"&&b[A.FIELDS.TYPE]===T.equals&&(s.operator=m,f="operator"),m!=="|"){d=!1;break}b[A.FIELDS.TYPE]===T.equals?(s.operator=m,f="operator"):!s.namespace&&!s.attribute&&(s.namespace=!0),d=!1;break;case T.word:if(b&&this.content(b)==="|"&&r[o+2]&&r[o+2][A.FIELDS.TYPE]!==T.equals&&!s.operator&&!s.namespace)s.namespace=m,f="namespace";else if(!s.attribute||f==="attribute"&&!d){u&&((0,Y.ensureObject)(s,"spaces","attribute"),s.spaces.attribute.before=u,u=""),c&&((0,Y.ensureObject)(s,"raws","spaces","attribute"),s.raws.spaces.attribute.before=c,c=""),s.attribute=(s.attribute||"")+m;var S=(0,Y.getProp)(s,"raws","attribute")||null;S&&(s.raws.attribute+=m),f="attribute"}else if(!s.value&&s.value!==""||f==="value"&&!(d||s.quoteMark)){var _=(0,Y.unesc)(m),E=(0,Y.getProp)(s,"raws","value")||"",I=s.value||"";s.value=I+_,s.quoteMark=null,(_!==m||E)&&((0,Y.ensureObject)(s,"raws"),s.raws.value=(E||I)+m),f="value"}else{var q=m==="i"||m==="I";(s.value||s.value==="")&&(s.quoteMark||d)?(s.insensitive=q,(!q||m==="I")&&((0,Y.ensureObject)(s,"raws"),s.raws.insensitiveFlag=m),f="insensitive",u&&((0,Y.ensureObject)(s,"spaces","insensitive"),s.spaces.insensitive.before=u,u=""),c&&((0,Y.ensureObject)(s,"raws","spaces","insensitive"),s.raws.spaces.insensitive.before=c,c="")):(s.value||s.value==="")&&(f="value",s.value+=m,s.raws.value&&(s.raws.value+=m))}d=!1;break;case T.str:if(!s.attribute||!s.operator)return this.error("Expected an attribute followed by an operator preceding the string.",{index:p[A.FIELDS.START_POS]});var R=(0,dp.unescapeValue)(m),J=R.unescaped,fe=R.quoteMark;s.value=J,s.quoteMark=fe,f="value",(0,Y.ensureObject)(s,"raws"),s.raws.value=m,d=!1;break;case T.equals:if(!s.attribute)return this.expected("attribute",p[A.FIELDS.START_POS],m);if(s.value)return this.error('Unexpected "=" found; an operator was already defined.',{index:p[A.FIELDS.START_POS]});s.operator=s.operator?s.operator+m:m,f="operator",d=!1;break;case T.comment:if(f)if(d||b&&b[A.FIELDS.TYPE]===T.space||f==="insensitive"){var he=(0,Y.getProp)(s,"spaces",f,"after")||"",Ie=(0,Y.getProp)(s,"raws","spaces",f,"after")||he;(0,Y.ensureObject)(s,"raws","spaces",f),s.raws.spaces[f].after=Ie+m}else{var te=s[f]||"",le=(0,Y.getProp)(s,"raws",f)||te;(0,Y.ensureObject)(s,"raws"),s.raws[f]=le+m}else c=c+m;break;default:return this.error('Unexpected "'+m+'" found.',{index:p[A.FIELDS.START_POS]})}o++}Rt(s,"attribute"),Rt(s,"namespace"),this.newNode(new dp.default(s)),this.position++},e.parseWhitespaceEquivalentTokens=function(r){r<0&&(r=this.tokens.length);var n=this.position,a=[],s="",o=void 0;do if(Sa[this.currToken[A.FIELDS.TYPE]])this.options.lossy||(s+=this.content());else if(this.currToken[A.FIELDS.TYPE]===T.comment){var u={};s&&(u.before=s,s=""),o=new pp.default({value:this.content(),source:qt(this.currToken),sourceIndex:this.currToken[A.FIELDS.START_POS],spaces:u}),a.push(o)}while(++this.position<r);if(s){if(o)o.spaces.after=s;else if(!this.options.lossy){var c=this.tokens[n],f=this.tokens[this.position-1];a.push(new va.default({value:"",source:xt(c[A.FIELDS.START_LINE],c[A.FIELDS.START_COL],f[A.FIELDS.END_LINE],f[A.FIELDS.END_COL]),sourceIndex:c[A.FIELDS.START_POS],spaces:{before:s,after:""}}))}}return a},e.convertWhitespaceNodesToSpace=function(r,n){var a=this;n===void 0&&(n=!1);var s="",o="";r.forEach(function(c){var f=a.lossySpace(c.spaces.before,n),d=a.lossySpace(c.rawSpaceBefore,n);s+=f+a.lossySpace(c.spaces.after,n&&f.length===0),o+=f+c.value+a.lossySpace(c.rawSpaceAfter,n&&d.length===0)}),o===s&&(o=void 0);var u={space:s,rawSpace:o};return u},e.isNamedCombinator=function(r){return r===void 0&&(r=this.position),this.tokens[r+0]&&this.tokens[r+0][A.FIELDS.TYPE]===T.slash&&this.tokens[r+1]&&this.tokens[r+1][A.FIELDS.TYPE]===T.word&&this.tokens[r+2]&&this.tokens[r+2][A.FIELDS.TYPE]===T.slash},e.namedCombinator=function(){if(this.isNamedCombinator()){var r=this.content(this.tokens[this.position+1]),n=(0,Y.unesc)(r).toLowerCase(),a={};n!==r&&(a.value="/"+r+"/");var s=new xa.default({value:"/"+n+"/",source:xt(this.currToken[A.FIELDS.START_LINE],this.currToken[A.FIELDS.START_COL],this.tokens[this.position+2][A.FIELDS.END_LINE],this.tokens[this.position+2][A.FIELDS.END_COL]),sourceIndex:this.currToken[A.FIELDS.START_POS],raws:a});return this.position=this.position+3,s}else this.unexpected()},e.combinator=function(){var r=this;if(this.content()==="|")return this.namespace();var n=this.locateNextMeaningfulToken(this.position);if(n<0||this.tokens[n][A.FIELDS.TYPE]===T.comma){var a=this.parseWhitespaceEquivalentTokens(n);if(a.length>0){var s=this.current.last;if(s){var o=this.convertWhitespaceNodesToSpace(a),u=o.space,c=o.rawSpace;c!==void 0&&(s.rawSpaceAfter+=c),s.spaces.after+=u}else a.forEach(function(E){return r.newNode(E)})}return}var f=this.currToken,d=void 0;n>this.position&&(d=this.parseWhitespaceEquivalentTokens(n));var p;if(this.isNamedCombinator()?p=this.namedCombinator():this.currToken[A.FIELDS.TYPE]===T.combinator?(p=new xa.default({value:this.content(),source:qt(this.currToken),sourceIndex:this.currToken[A.FIELDS.START_POS]}),this.position++):Sa[this.currToken[A.FIELDS.TYPE]]||d||this.unexpected(),p){if(d){var m=this.convertWhitespaceNodesToSpace(d),b=m.space,x=m.rawSpace;p.spaces.before=b,p.rawSpaceBefore=x}}else{var y=this.convertWhitespaceNodesToSpace(d,!0),w=y.space,k=y.rawSpace;k||(k=w);var S={},_={spaces:{}};w.endsWith(" ")&&k.endsWith(" ")?(S.before=w.slice(0,w.length-1),_.spaces.before=k.slice(0,k.length-1)):w.startsWith(" ")&&k.startsWith(" ")?(S.after=w.slice(1),_.spaces.after=k.slice(1)):_.value=k,p=new xa.default({value:" ",source:Ca(f,this.tokens[this.position-1]),sourceIndex:f[A.FIELDS.START_POS],spaces:S,raws:_})}return this.currToken&&this.currToken[A.FIELDS.TYPE]===T.space&&(p.spaces.after=this.optionalSpace(this.content()),this.position++),this.newNode(p)},e.comma=function(){if(this.position===this.tokens.length-1){this.root.trailingComma=!0,this.position++;return}this.current._inferEndPosition();var r=new ba.default({source:{start:gp(this.tokens[this.position+1])}});this.current.parent.append(r),this.current=r,this.position++},e.comment=function(){var r=this.currToken;this.newNode(new pp.default({value:this.content(),source:qt(r),sourceIndex:r[A.FIELDS.START_POS]})),this.position++},e.error=function(r,n){throw this.root.error(r,n)},e.missingBackslash=function(){return this.error("Expected a backslash preceding the semicolon.",{index:this.currToken[A.FIELDS.START_POS]})},e.missingParenthesis=function(){return this.expected("opening parenthesis",this.currToken[A.FIELDS.START_POS])},e.missingSquareBracket=function(){return this.expected("opening square bracket",this.currToken[A.FIELDS.START_POS])},e.unexpected=function(){return this.error("Unexpected '"+this.content()+"'. Escaping special characters with \\ may help.",this.currToken[A.FIELDS.START_POS])},e.unexpectedPipe=function(){return this.error("Unexpected '|'.",this.currToken[A.FIELDS.START_POS])},e.namespace=function(){var r=this.prevToken&&this.content(this.prevToken)||!0;if(this.nextToken[A.FIELDS.TYPE]===T.word)return this.position++,this.word(r);if(this.nextToken[A.FIELDS.TYPE]===T.asterisk)return this.position++,this.universal(r);this.unexpectedPipe()},e.nesting=function(){if(this.nextToken){var r=this.content(this.nextToken);if(r==="|"){this.position++;return}}var n=this.currToken;this.newNode(new kk.default({value:this.content(),source:qt(n),sourceIndex:n[A.FIELDS.START_POS]})),this.position++},e.parentheses=function(){var r=this.current.last,n=1;if(this.position++,r&&r.type===Ck.PSEUDO){var a=new ba.default({source:{start:gp(this.tokens[this.position-1])}}),s=this.current;for(r.append(a),this.current=a;this.position<this.tokens.length&&n;)this.currToken[A.FIELDS.TYPE]===T.openParenthesis&&n++,this.currToken[A.FIELDS.TYPE]===T.closeParenthesis&&n--,n?this.parse():(this.current.source.end=yp(this.currToken),this.current.parent.source.end=yp(this.currToken),this.position++);this.current=s}else{for(var o=this.currToken,u="(",c;this.position<this.tokens.length&&n;)this.currToken[A.FIELDS.TYPE]===T.openParenthesis&&n++,this.currToken[A.FIELDS.TYPE]===T.closeParenthesis&&n--,c=this.currToken,u+=this.parseParenthesisToken(this.currToken),this.position++;r?r.appendToPropertyAndEscape("value",u,u):this.newNode(new va.default({value:u,source:xt(o[A.FIELDS.START_LINE],o[A.FIELDS.START_COL],c[A.FIELDS.END_LINE],c[A.FIELDS.END_COL]),sourceIndex:o[A.FIELDS.START_POS]}))}if(n)return this.expected("closing parenthesis",this.currToken[A.FIELDS.START_POS])},e.pseudo=function(){for(var r=this,n="",a=this.currToken;this.currToken&&this.currToken[A.FIELDS.TYPE]===T.colon;)n+=this.content(),this.position++;if(!this.currToken)return this.expected(["pseudo-class","pseudo-element"],this.position-1);if(this.currToken[A.FIELDS.TYPE]===T.word)this.splitWord(!1,function(s,o){n+=s,r.newNode(new vk.default({value:n,source:Ca(a,r.currToken),sourceIndex:a[A.FIELDS.START_POS]})),o>1&&r.nextToken&&r.nextToken[A.FIELDS.TYPE]===T.openParenthesis&&r.error("Misplaced parenthesis.",{index:r.nextToken[A.FIELDS.START_POS]})});else return this.expected(["pseudo-class","pseudo-element"],this.currToken[A.FIELDS.START_POS])},e.space=function(){var r=this.content();this.position===0||this.prevToken[A.FIELDS.TYPE]===T.comma||this.prevToken[A.FIELDS.TYPE]===T.openParenthesis||this.current.nodes.every(function(n){return n.type==="comment"})?(this.spaces=this.optionalSpace(r),this.position++):this.position===this.tokens.length-1||this.nextToken[A.FIELDS.TYPE]===T.comma||this.nextToken[A.FIELDS.TYPE]===T.closeParenthesis?(this.current.last.spaces.after=this.optionalSpace(r),this.position++):this.combinator()},e.string=function(){var r=this.currToken;this.newNode(new va.default({value:this.content(),source:qt(r),sourceIndex:r[A.FIELDS.START_POS]})),this.position++},e.universal=function(r){var n=this.nextToken;if(n&&this.content(n)==="|")return this.position++,this.namespace();var a=this.currToken;this.newNode(new xk.default({value:this.content(),source:qt(a),sourceIndex:a[A.FIELDS.START_POS]}),r),this.position++},e.splitWord=function(r,n){for(var a=this,s=this.nextToken,o=this.content();s&&~[T.dollar,T.caret,T.equals,T.word].indexOf(s[A.FIELDS.TYPE]);){this.position++;var u=this.content();if(o+=u,u.lastIndexOf("\\")===u.length-1){var c=this.nextToken;c&&c[A.FIELDS.TYPE]===T.space&&(o+=this.requiredSpace(this.content(c)),this.position++)}s=this.nextToken}var f=Aa(o,".").filter(function(b){var x=o[b-1]==="\\",y=/^\d+\.\d+%$/.test(o);return!x&&!y}),d=Aa(o,"#").filter(function(b){return o[b-1]!=="\\"}),p=Aa(o,"#{");p.length&&(d=d.filter(function(b){return!~p.indexOf(b)}));var m=(0,Sk.default)(Ok([0].concat(f,d)));m.forEach(function(b,x){var y=m[x+1]||o.length,w=o.slice(b,y);if(x===0&&n)return n.call(a,w,m.length);var k,S=a.currToken,_=S[A.FIELDS.START_POS]+m[x],E=xt(S[1],S[2]+b,S[3],S[2]+(y-1));if(~f.indexOf(b)){var I={value:w.slice(1),source:E,sourceIndex:_};k=new yk.default(Rt(I,"value"))}else if(~d.indexOf(b)){var q={value:w.slice(1),source:E,sourceIndex:_};k=new wk.default(Rt(q,"value"))}else{var R={value:w,source:E,sourceIndex:_};Rt(R,"value"),k=new bk.default(R)}a.newNode(k,r),r=null}),this.position++},e.word=function(r){var n=this.nextToken;return n&&this.content(n)==="|"?(this.position++,this.namespace()):this.splitWord(r)},e.loop=function(){for(;this.position<this.tokens.length;)this.parse(!0);return this.current._inferEndPosition(),this.root},e.parse=function(r){switch(this.currToken[A.FIELDS.TYPE]){case T.space:this.space();break;case T.comment:this.comment();break;case T.openParenthesis:this.parentheses();break;case T.closeParenthesis:r&&this.missingParenthesis();break;case T.openSquare:this.attribute();break;case T.dollar:case T.caret:case T.equals:case T.word:this.word();break;case T.colon:this.pseudo();break;case T.comma:this.comma();break;case T.asterisk:this.universal();break;case T.ampersand:this.nesting();break;case T.slash:case T.combinator:this.combinator();break;case T.str:this.string();break;case T.closeSquare:this.missingSquareBracket();case T.semicolon:this.missingBackslash();default:this.unexpected()}},e.expected=function(r,n,a){if(Array.isArray(r)){var s=r.pop();r=r.join(", ")+" or "+s}var o=/^[aeiou]/.test(r[0])?"an":"a";return a?this.error("Expected "+o+" "+r+', found "'+a+'" instead.',{index:n}):this.error("Expected "+o+" "+r+".",{index:n})},e.requiredSpace=function(r){return this.options.lossy?" ":r},e.optionalSpace=function(r){return this.options.lossy?"":r},e.lossySpace=function(r,n){return this.options.lossy?n?" ":"":r},e.parseParenthesisToken=function(r){var n=this.content(r);return r[A.FIELDS.TYPE]===T.space?this.requiredSpace(n):n},e.newNode=function(r,n){return n&&(/^ +$/.test(n)&&(this.options.lossy||(this.spaces=(this.spaces||"")+n),n=!0),r.namespace=n,Rt(r,"namespace")),this.spaces&&(r.spaces.before=this.spaces,this.spaces=""),this.current.append(r)},e.content=function(r){return r===void 0&&(r=this.currToken),this.css.slice(r[A.FIELDS.START_POS],r[A.FIELDS.END_POS])},e.locateNextMeaningfulToken=function(r){r===void 0&&(r=this.position+1);for(var n=r;n<this.tokens.length;)if(_k[this.tokens[n][A.FIELDS.TYPE]]){n++;continue}else return n;return-1},Ak(i,[{key:"currToken",get:function(){return this.tokens[this.position]}},{key:"nextToken",get:function(){return this.tokens[this.position+1]}},{key:"prevToken",get:function(){return this.tokens[this.position-1]}}]),i}();Wr.default=Ek;wp.exports=Wr.default});var xp=v((Gr,vp)=>{l();"use strict";Gr.__esModule=!0;Gr.default=void 0;var Tk=Pk(bp());function Pk(i){return i&&i.__esModule?i:{default:i}}var Dk=function(){function i(t,r){this.func=t||function(){},this.funcRes=null,this.options=r}var e=i.prototype;return e._shouldUpdateSelector=function(r,n){n===void 0&&(n={});var a=Object.assign({},this.options,n);return a.updateSelector===!1?!1:typeof r!="string"},e._isLossy=function(r){r===void 0&&(r={});var n=Object.assign({},this.options,r);return n.lossless===!1},e._root=function(r,n){n===void 0&&(n={});var a=new Tk.default(r,this._parseOptions(n));return a.root},e._parseOptions=function(r){return{lossy:this._isLossy(r)}},e._run=function(r,n){var a=this;return n===void 0&&(n={}),new Promise(function(s,o){try{var u=a._root(r,n);Promise.resolve(a.func(u)).then(function(c){var f=void 0;return a._shouldUpdateSelector(r,n)&&(f=u.toString(),r.selector=f),{transform:c,root:u,string:f}}).then(s,o)}catch(c){o(c);return}})},e._runSync=function(r,n){n===void 0&&(n={});var a=this._root(r,n),s=this.func(a);if(s&&typeof s.then=="function")throw new Error("Selector processor returned a promise to a synchronous call.");var o=void 0;return n.updateSelector&&typeof r!="string"&&(o=a.toString(),r.selector=o),{transform:s,root:a,string:o}},e.ast=function(r,n){return this._run(r,n).then(function(a){return a.root})},e.astSync=function(r,n){return this._runSync(r,n).root},e.transform=function(r,n){return this._run(r,n).then(function(a){return a.transform})},e.transformSync=function(r,n){return this._runSync(r,n).transform},e.process=function(r,n){return this._run(r,n).then(function(a){return a.string||a.root.toString()})},e.processSync=function(r,n){var a=this._runSync(r,n);return a.string||a.root.toString()},i}();Gr.default=Dk;vp.exports=Gr.default});var kp=v(G=>{l();"use strict";G.__esModule=!0;G.universal=G.tag=G.string=G.selector=G.root=G.pseudo=G.nesting=G.id=G.comment=G.combinator=G.className=G.attribute=void 0;var Ik=xe(fa()),qk=xe(Hs()),Rk=xe(ha()),Mk=xe(Qs()),Bk=xe(Xs()),Fk=xe(ga()),Nk=xe(na()),Lk=xe(zs()),$k=xe(Us()),jk=xe(ra()),zk=xe(ea()),Vk=xe(pa());function xe(i){return i&&i.__esModule?i:{default:i}}var Uk=function(e){return new Ik.default(e)};G.attribute=Uk;var Wk=function(e){return new qk.default(e)};G.className=Wk;var Gk=function(e){return new Rk.default(e)};G.combinator=Gk;var Hk=function(e){return new Mk.default(e)};G.comment=Hk;var Yk=function(e){return new Bk.default(e)};G.id=Yk;var Qk=function(e){return new Fk.default(e)};G.nesting=Qk;var Jk=function(e){return new Nk.default(e)};G.pseudo=Jk;var Xk=function(e){return new Lk.default(e)};G.root=Xk;var Kk=function(e){return new $k.default(e)};G.selector=Kk;var Zk=function(e){return new jk.default(e)};G.string=Zk;var eS=function(e){return new zk.default(e)};G.tag=eS;var tS=function(e){return new Vk.default(e)};G.universal=tS});var _p=v($=>{l();"use strict";$.__esModule=!0;$.isComment=$.isCombinator=$.isClassName=$.isAttribute=void 0;$.isContainer=dS;$.isIdentifier=void 0;$.isNamespace=hS;$.isNesting=void 0;$.isNode=_a;$.isPseudo=void 0;$.isPseudoClass=pS;$.isPseudoElement=Ap;$.isUniversal=$.isTag=$.isString=$.isSelector=$.isRoot=void 0;var Q=ae(),ce,rS=(ce={},ce[Q.ATTRIBUTE]=!0,ce[Q.CLASS]=!0,ce[Q.COMBINATOR]=!0,ce[Q.COMMENT]=!0,ce[Q.ID]=!0,ce[Q.NESTING]=!0,ce[Q.PSEUDO]=!0,ce[Q.ROOT]=!0,ce[Q.SELECTOR]=!0,ce[Q.STRING]=!0,ce[Q.TAG]=!0,ce[Q.UNIVERSAL]=!0,ce);function _a(i){return typeof i=="object"&&rS[i.type]}function ke(i,e){return _a(e)&&e.type===i}var Sp=ke.bind(null,Q.ATTRIBUTE);$.isAttribute=Sp;var iS=ke.bind(null,Q.CLASS);$.isClassName=iS;var nS=ke.bind(null,Q.COMBINATOR);$.isCombinator=nS;var sS=ke.bind(null,Q.COMMENT);$.isComment=sS;var aS=ke.bind(null,Q.ID);$.isIdentifier=aS;var oS=ke.bind(null,Q.NESTING);$.isNesting=oS;var Oa=ke.bind(null,Q.PSEUDO);$.isPseudo=Oa;var lS=ke.bind(null,Q.ROOT);$.isRoot=lS;var uS=ke.bind(null,Q.SELECTOR);$.isSelector=uS;var fS=ke.bind(null,Q.STRING);$.isString=fS;var Cp=ke.bind(null,Q.TAG);$.isTag=Cp;var cS=ke.bind(null,Q.UNIVERSAL);$.isUniversal=cS;function Ap(i){return Oa(i)&&i.value&&(i.value.startsWith("::")||i.value.toLowerCase()===":before"||i.value.toLowerCase()===":after"||i.value.toLowerCase()===":first-letter"||i.value.toLowerCase()===":first-line")}function pS(i){return Oa(i)&&!Ap(i)}function dS(i){return!!(_a(i)&&i.walk)}function hS(i){return Sp(i)||Cp(i)}});var Op=v(Te=>{l();"use strict";Te.__esModule=!0;var Ea=ae();Object.keys(Ea).forEach(function(i){i==="default"||i==="__esModule"||i in Te&&Te[i]===Ea[i]||(Te[i]=Ea[i])});var Ta=kp();Object.keys(Ta).forEach(function(i){i==="default"||i==="__esModule"||i in Te&&Te[i]===Ta[i]||(Te[i]=Ta[i])});var Pa=_p();Object.keys(Pa).forEach(function(i){i==="default"||i==="__esModule"||i in Te&&Te[i]===Pa[i]||(Te[i]=Pa[i])})});var Be=v((Hr,Tp)=>{l();"use strict";Hr.__esModule=!0;Hr.default=void 0;var mS=wS(xp()),gS=yS(Op());function Ep(i){if(typeof WeakMap!="function")return null;var e=new WeakMap,t=new WeakMap;return(Ep=function(n){return n?t:e})(i)}function yS(i,e){if(!e&&i&&i.__esModule)return i;if(i===null||typeof i!="object"&&typeof i!="function")return{default:i};var t=Ep(e);if(t&&t.has(i))return t.get(i);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in i)if(a!=="default"&&Object.prototype.hasOwnProperty.call(i,a)){var s=n?Object.getOwnPropertyDescriptor(i,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=i[a]}return r.default=i,t&&t.set(i,r),r}function wS(i){return i&&i.__esModule?i:{default:i}}var Da=function(e){return new mS.default(e)};Object.assign(Da,gS);delete Da.__esModule;var bS=Da;Hr.default=bS;Tp.exports=Hr.default});function Ge(i){return["fontSize","outline"].includes(i)?e=>(typeof e=="function"&&(e=e({})),Array.isArray(e)&&(e=e[0]),e):i==="fontFamily"?e=>{typeof e=="function"&&(e=e({}));let t=Array.isArray(e)&&se(e[1])?e[0]:e;return Array.isArray(t)?t.join(", "):t}:["boxShadow","transitionProperty","transitionDuration","transitionDelay","transitionTimingFunction","backgroundImage","backgroundSize","backgroundColor","cursor","animation"].includes(i)?e=>(typeof e=="function"&&(e=e({})),Array.isArray(e)&&(e=e.join(", ")),e):["gridTemplateColumns","gridTemplateRows","objectPosition"].includes(i)?e=>(typeof e=="function"&&(e=e({})),typeof e=="string"&&(e=z.list.comma(e).join(" ")),e):(e,t={})=>(typeof e=="function"&&(e=e(t)),e)}var Yr=C(()=>{l();nt();Ct()});var Bp=v((a3,Ba)=>{l();var{Rule:Pp,AtRule:vS}=ye(),Dp=Be();function Ia(i,e){let t;try{Dp(r=>{t=r}).processSync(i)}catch(r){throw i.includes(":")?e?e.error("Missed semicolon"):r:e?e.error(r.message):r}return t.at(0)}function Ip(i,e){let t=!1;return i.each(r=>{if(r.type==="nesting"){let n=e.clone({});r.value!=="&"?r.replaceWith(Ia(r.value.replace("&",n.toString()))):r.replaceWith(n),t=!0}else"nodes"in r&&r.nodes&&Ip(r,e)&&(t=!0)}),t}function qp(i,e){let t=[];return i.selectors.forEach(r=>{let n=Ia(r,i);e.selectors.forEach(a=>{if(!a)return;let s=Ia(a,e);Ip(s,n)||(s.prepend(Dp.combinator({value:" "})),s.prepend(n.clone({}))),t.push(s.toString())})}),t}function on(i,e){let t=i.prev();for(e.after(i);t&&t.type==="comment";){let r=t.prev();e.after(t),t=r}return i}function xS(i){return function e(t,r,n,a=n){let s=[];if(r.each(o=>{o.type==="rule"&&n?a&&(o.selectors=qp(t,o)):o.type==="atrule"&&o.nodes?i[o.name]?e(t,o,a):r[Ra]!==!1&&s.push(o):s.push(o)}),n&&s.length){let o=t.clone({nodes:[]});for(let u of s)o.append(u);r.prepend(o)}}}function qa(i,e,t){let r=new Pp({selector:i,nodes:[]});return r.append(e),t.after(r),r}function Rp(i,e){let t={};for(let r of i)t[r]=!0;if(e)for(let r of e)t[r.replace(/^@/,"")]=!0;return t}function kS(i){i=i.trim();let e=i.match(/^\((.*)\)$/);if(!e)return{type:"basic",selector:i};let t=e[1].match(/^(with(?:out)?):(.+)$/);if(t){let r=t[1]==="with",n=Object.fromEntries(t[2].trim().split(/\s+/).map(s=>[s,!0]));if(r&&n.all)return{type:"noop"};let a=s=>!!n[s];return n.all?a=()=>!0:r&&(a=s=>s==="all"?!1:!n[s]),{type:"withrules",escapes:a}}return{type:"unknown"}}function SS(i){let e=[],t=i.parent;for(;t&&t instanceof vS;)e.push(t),t=t.parent;return e}function CS(i){let e=i[Mp];if(!e)i.after(i.nodes);else{let t=i.nodes,r,n=-1,a,s,o,u=SS(i);if(u.forEach((c,f)=>{if(e(c.name))r=c,n=f,s=o;else{let d=o;o=c.clone({nodes:[]}),d&&o.append(d),a=a||o}}),r?s?(a.append(t),r.after(s)):r.after(t):i.after(t),i.next()&&r){let c;u.slice(0,n+1).forEach((f,d,p)=>{let m=c;c=f.clone({nodes:[]}),m&&c.append(m);let b=[],y=(p[d-1]||i).next();for(;y;)b.push(y),y=y.next();c.append(b)}),c&&(s||t[t.length-1]).after(c)}}i.remove()}var Ra=Symbol("rootRuleMergeSel"),Mp=Symbol("rootRuleEscapes");function AS(i){let{params:e}=i,{type:t,selector:r,escapes:n}=kS(e);if(t==="unknown")throw i.error(`Unknown @${i.name} parameter ${JSON.stringify(e)}`);if(t==="basic"&&r){let a=new Pp({selector:r,nodes:i.nodes});i.removeAll(),i.append(a)}i[Mp]=n,i[Ra]=n?!n("all"):t==="noop"}var Ma=Symbol("hasRootRule");Ba.exports=(i={})=>{let e=Rp(["media","supports","layer","container"],i.bubble),t=xS(e),r=Rp(["document","font-face","keyframes","-webkit-keyframes","-moz-keyframes"],i.unwrap),n=(i.rootRuleName||"at-root").replace(/^@/,""),a=i.preserveEmpty;return{postcssPlugin:"postcss-nested",Once(s){s.walkAtRules(n,o=>{AS(o),s[Ma]=!0})},Rule(s){let o=!1,u=s,c=!1,f=[];s.each(d=>{d.type==="rule"?(f.length&&(u=qa(s.selector,f,u),f=[]),c=!0,o=!0,d.selectors=qp(s,d),u=on(d,u)):d.type==="atrule"?(f.length&&(u=qa(s.selector,f,u),f=[]),d.name===n?(o=!0,t(s,d,!0,d[Ra]),u=on(d,u)):e[d.name]?(c=!0,o=!0,t(s,d,!0),u=on(d,u)):r[d.name]?(c=!0,o=!0,t(s,d,!1),u=on(d,u)):c&&f.push(d)):d.type==="decl"&&c&&f.push(d)}),f.length&&(u=qa(s.selector,f,u)),o&&a!==!0&&(s.raws.semicolon=!0,s.nodes.length===0&&s.remove())},RootExit(s){s[Ma]&&(s.walkAtRules(n,CS),s[Ma]=!1)}}};Ba.exports.postcss=!0});var $p=v((o3,Lp)=>{l();"use strict";var Fp=/-(\w|$)/g,Np=(i,e)=>e.toUpperCase(),_S=i=>(i=i.toLowerCase(),i==="float"?"cssFloat":i.startsWith("-ms-")?i.substr(1).replace(Fp,Np):i.replace(Fp,Np));Lp.exports=_S});var La=v((l3,jp)=>{l();var OS=$p(),ES={boxFlex:!0,boxFlexGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,strokeDashoffset:!0,strokeOpacity:!0,strokeWidth:!0};function Fa(i){return typeof i.nodes=="undefined"?!0:Na(i)}function Na(i){let e,t={};return i.each(r=>{if(r.type==="atrule")e="@"+r.name,r.params&&(e+=" "+r.params),typeof t[e]=="undefined"?t[e]=Fa(r):Array.isArray(t[e])?t[e].push(Fa(r)):t[e]=[t[e],Fa(r)];else if(r.type==="rule"){let n=Na(r);if(t[r.selector])for(let a in n)t[r.selector][a]=n[a];else t[r.selector]=n}else if(r.type==="decl"){r.prop[0]==="-"&&r.prop[1]==="-"||r.parent&&r.parent.selector===":export"?e=r.prop:e=OS(r.prop);let n=r.value;!isNaN(r.value)&&ES[e]&&(n=parseFloat(r.value)),r.important&&(n+=" !important"),typeof t[e]=="undefined"?t[e]=n:Array.isArray(t[e])?t[e].push(n):t[e]=[t[e],n]}}),t}jp.exports=Na});var ln=v((u3,Wp)=>{l();var Qr=ye(),zp=/\s*!important\s*$/i,TS={"box-flex":!0,"box-flex-group":!0,"column-count":!0,flex:!0,"flex-grow":!0,"flex-positive":!0,"flex-shrink":!0,"flex-negative":!0,"font-weight":!0,"line-clamp":!0,"line-height":!0,opacity:!0,order:!0,orphans:!0,"tab-size":!0,widows:!0,"z-index":!0,zoom:!0,"fill-opacity":!0,"stroke-dashoffset":!0,"stroke-opacity":!0,"stroke-width":!0};function PS(i){return i.replace(/([A-Z])/g,"-$1").replace(/^ms-/,"-ms-").toLowerCase()}function Vp(i,e,t){t===!1||t===null||(e.startsWith("--")||(e=PS(e)),typeof t=="number"&&(t===0||TS[e]?t=t.toString():t+="px"),e==="css-float"&&(e="float"),zp.test(t)?(t=t.replace(zp,""),i.push(Qr.decl({prop:e,value:t,important:!0}))):i.push(Qr.decl({prop:e,value:t})))}function Up(i,e,t){let r=Qr.atRule({name:e[1],params:e[3]||""});typeof t=="object"&&(r.nodes=[],$a(t,r)),i.push(r)}function $a(i,e){let t,r,n;for(t in i)if(r=i[t],!(r===null||typeof r=="undefined"))if(t[0]==="@"){let a=t.match(/@(\S+)(\s+([\W\w]*)\s*)?/);if(Array.isArray(r))for(let s of r)Up(e,a,s);else Up(e,a,r)}else if(Array.isArray(r))for(let a of r)Vp(e,t,a);else typeof r=="object"?(n=Qr.rule({selector:t}),$a(r,n),e.push(n)):Vp(e,t,r)}Wp.exports=function(i){let e=Qr.root();return $a(i,e),e}});var ja=v((f3,Gp)=>{l();var DS=La();Gp.exports=function(e){return console&&console.warn&&e.warnings().forEach(t=>{let r=t.plugin||"PostCSS";console.warn(r+": "+t.text)}),DS(e.root)}});var Yp=v((c3,Hp)=>{l();var IS=ye(),qS=ja(),RS=ln();Hp.exports=function(e){let t=IS(e);return async r=>{let n=await t.process(r,{parser:RS,from:void 0});return qS(n)}}});var Jp=v((p3,Qp)=>{l();var MS=ye(),BS=ja(),FS=ln();Qp.exports=function(i){let e=MS(i);return t=>{let r=e.process(t,{parser:FS,from:void 0});return BS(r)}}});var Kp=v((d3,Xp)=>{l();var NS=La(),LS=ln(),$S=Yp(),jS=Jp();Xp.exports={objectify:NS,parse:LS,async:$S,sync:jS}});var Mt,Zp,h3,m3,g3,y3,ed=C(()=>{l();Mt=X(Kp()),Zp=Mt.default,h3=Mt.default.objectify,m3=Mt.default.parse,g3=Mt.default.async,y3=Mt.default.sync});function Bt(i){return Array.isArray(i)?i.flatMap(e=>z([(0,td.default)({bubble:["screen"]})]).process(e,{parser:Zp}).root.nodes):Bt([i])}var td,za=C(()=>{l();nt();td=X(Bp());ed()});function Ft(i,e,t=!1){if(i==="")return e;let r=typeof e=="string"?(0,rd.default)().astSync(e):e;return r.walkClasses(n=>{let a=n.value,s=t&&a.startsWith("-");n.value=s?`-${i}${a.slice(1)}`:`${i}${a}`}),typeof e=="string"?r.toString():r}var rd,un=C(()=>{l();rd=X(Be())});function pe(i){let e=id.default.className();return e.value=i,gt(e?.raws?.value??e.value)}var id,Nt=C(()=>{l();id=X(Be());mi()});function Va(i){return gt(`.${pe(i)}`)}function fn(i,e){return Va(Jr(i,e))}function Jr(i,e){return e==="DEFAULT"?i:e==="-"||e==="-DEFAULT"?`-${i}`:e.startsWith("-")?`-${i}${e}`:e.startsWith("/")?`${i}${e}`:`${i}-${e}`}var Ua=C(()=>{l();Nt();mi()});function P(i,e=[[i,[i]]],{filterDefault:t=!1,...r}={}){let n=Ge(i);return function({matchUtilities:a,theme:s}){for(let o of e){let u=Array.isArray(o[0])?o:[o];a(u.reduce((c,[f,d])=>Object.assign(c,{[f]:p=>d.reduce((m,b)=>Array.isArray(b)?Object.assign(m,{[b[0]]:b[1]}):Object.assign(m,{[b]:n(p)}),{})}),{}),{...r,values:t?Object.fromEntries(Object.entries(s(i)??{}).filter(([c])=>c!=="DEFAULT")):s(i)})}}}var nd=C(()=>{l();Yr()});function st(i){return i=Array.isArray(i)?i:[i],i.map(e=>{let t=e.values.map(r=>r.raw!==void 0?r.raw:[r.min&&`(min-width: ${r.min})`,r.max&&`(max-width: ${r.max})`].filter(Boolean).join(" and "));return e.not?`not all and ${t}`:t}).join(", ")}var cn=C(()=>{l()});function Wa(i){return i.split(YS).map(t=>{let r=t.trim(),n={value:r},a=r.split(QS),s=new Set;for(let o of a)!s.has("DIRECTIONS")&&zS.has(o)?(n.direction=o,s.add("DIRECTIONS")):!s.has("PLAY_STATES")&&VS.has(o)?(n.playState=o,s.add("PLAY_STATES")):!s.has("FILL_MODES")&&US.has(o)?(n.fillMode=o,s.add("FILL_MODES")):!s.has("ITERATION_COUNTS")&&(WS.has(o)||JS.test(o))?(n.iterationCount=o,s.add("ITERATION_COUNTS")):!s.has("TIMING_FUNCTION")&&GS.has(o)||!s.has("TIMING_FUNCTION")&&HS.some(u=>o.startsWith(`${u}(`))?(n.timingFunction=o,s.add("TIMING_FUNCTION")):!s.has("DURATION")&&sd.test(o)?(n.duration=o,s.add("DURATION")):!s.has("DELAY")&&sd.test(o)?(n.delay=o,s.add("DELAY")):s.has("NAME")?(n.unknown||(n.unknown=[]),n.unknown.push(o)):(n.name=o,s.add("NAME"));return n})}var zS,VS,US,WS,GS,HS,YS,QS,sd,JS,ad=C(()=>{l();zS=new Set(["normal","reverse","alternate","alternate-reverse"]),VS=new Set(["running","paused"]),US=new Set(["none","forwards","backwards","both"]),WS=new Set(["infinite"]),GS=new Set(["linear","ease","ease-in","ease-out","ease-in-out","step-start","step-end"]),HS=["cubic-bezier","steps"],YS=/\,(?![^(]*\))/g,QS=/\ +(?![^(]*\))/g,sd=/^(-?[\d.]+m?s)$/,JS=/^(\d+)$/});var od,ne,ld=C(()=>{l();od=i=>Object.assign({},...Object.entries(i??{}).flatMap(([e,t])=>typeof t=="object"?Object.entries(od(t)).map(([r,n])=>({[e+(r==="DEFAULT"?"":`-${r}`)]:n})):[{[`${e}`]:t}])),ne=od});var fd,ud=C(()=>{fd="3.4.5"});function at(i,e=!0){return Array.isArray(i)?i.map(t=>{if(e&&Array.isArray(t))throw new Error("The tuple syntax is not supported for `screens`.");if(typeof t=="string")return{name:t.toString(),not:!1,values:[{min:t,max:void 0}]};let[r,n]=t;return r=r.toString(),typeof n=="string"?{name:r,not:!1,values:[{min:n,max:void 0}]}:Array.isArray(n)?{name:r,not:!1,values:n.map(a=>pd(a))}:{name:r,not:!1,values:[pd(n)]}}):at(Object.entries(i??{}),!1)}function pn(i){return i.values.length!==1?{result:!1,reason:"multiple-values"}:i.values[0].raw!==void 0?{result:!1,reason:"raw-values"}:i.values[0].min!==void 0&&i.values[0].max!==void 0?{result:!1,reason:"min-and-max"}:{result:!0,reason:null}}function cd(i,e,t){let r=dn(e,i),n=dn(t,i),a=pn(r),s=pn(n);if(a.reason==="multiple-values"||s.reason==="multiple-values")throw new Error("Attempted to sort a screen with multiple values. This should never happen. Please open a bug report.");if(a.reason==="raw-values"||s.reason==="raw-values")throw new Error("Attempted to sort a screen with raw values. This should never happen. Please open a bug report.");if(a.reason==="min-and-max"||s.reason==="min-and-max")throw new Error("Attempted to sort a screen with both min and max values. This should never happen. Please open a bug report.");let{min:o,max:u}=r.values[0],{min:c,max:f}=n.values[0];e.not&&([o,u]=[u,o]),t.not&&([c,f]=[f,c]),o=o===void 0?o:parseFloat(o),u=u===void 0?u:parseFloat(u),c=c===void 0?c:parseFloat(c),f=f===void 0?f:parseFloat(f);let[d,p]=i==="min"?[o,c]:[f,u];return d-p}function dn(i,e){return typeof i=="object"?i:{name:"arbitrary-screen",values:[{[e]:i}]}}function pd({"min-width":i,min:e=i,max:t,raw:r}={}){return{min:e,max:t,raw:r}}var hn=C(()=>{l()});function mn(i,e){i.walkDecls(t=>{if(e.includes(t.prop)){t.remove();return}for(let r of e)t.value.includes(`/ var(${r})`)&&(t.value=t.value.replace(`/ var(${r})`,""))})}var dd=C(()=>{l()});var H,Pe,Fe,K,hd,md=C(()=>{l();je();wt();nt();nd();cn();Nt();ad();ld();lr();cs();Ct();Yr();ud();Ee();hn();ns();dd();ze();cr();Xr();H={childVariant:({addVariant:i})=>{i("*","& > *")},pseudoElementVariants:({addVariant:i})=>{i("first-letter","&::first-letter"),i("first-line","&::first-line"),i("marker",[({container:e})=>(mn(e,["--tw-text-opacity"]),"& *::marker"),({container:e})=>(mn(e,["--tw-text-opacity"]),"&::marker")]),i("selection",["& *::selection","&::selection"]),i("file","&::file-selector-button"),i("placeholder","&::placeholder"),i("backdrop","&::backdrop"),i("before",({container:e})=>(e.walkRules(t=>{let r=!1;t.walkDecls("content",()=>{r=!0}),r||t.prepend(z.decl({prop:"content",value:"var(--tw-content)"}))}),"&::before")),i("after",({container:e})=>(e.walkRules(t=>{let r=!1;t.walkDecls("content",()=>{r=!0}),r||t.prepend(z.decl({prop:"content",value:"var(--tw-content)"}))}),"&::after"))},pseudoClassVariants:({addVariant:i,matchVariant:e,config:t,prefix:r})=>{let n=[["first","&:first-child"],["last","&:last-child"],["only","&:only-child"],["odd","&:nth-child(odd)"],["even","&:nth-child(even)"],"first-of-type","last-of-type","only-of-type",["visited",({container:s})=>(mn(s,["--tw-text-opacity","--tw-border-opacity","--tw-bg-opacity"]),"&:visited")],"target",["open","&[open]"],"default","checked","indeterminate","placeholder-shown","autofill","optional","required","valid","invalid","in-range","out-of-range","read-only","empty","focus-within",["hover",Z(t(),"hoverOnlyWhenSupported")?"@media (hover: hover) and (pointer: fine) { &:hover }":"&:hover"],"focus","focus-visible","active","enabled","disabled"].map(s=>Array.isArray(s)?s:[s,`&:${s}`]);for(let[s,o]of n)i(s,u=>typeof o=="function"?o(u):o);let a={group:(s,{modifier:o})=>o?[`:merge(${r(".group")}\\/${pe(o)})`," &"]:[`:merge(${r(".group")})`," &"],peer:(s,{modifier:o})=>o?[`:merge(${r(".peer")}\\/${pe(o)})`," ~ &"]:[`:merge(${r(".peer")})`," ~ &"]};for(let[s,o]of Object.entries(a))e(s,(u="",c)=>{let f=N(typeof u=="function"?u(c):u);f.includes("&")||(f="&"+f);let[d,p]=o("",c),m=null,b=null,x=0;for(let y=0;y<f.length;++y){let w=f[y];w==="&"?m=y:w==="'"||w==='"'?x+=1:m!==null&&w===" "&&!x&&(b=y)}return m!==null&&b===null&&(b=f.length),f.slice(0,m)+d+f.slice(m+1,b)+p+f.slice(b)},{values:Object.fromEntries(n),[ot]:{respectPrefix:!1}})},directionVariants:({addVariant:i})=>{i("ltr",'&:where([dir="ltr"], [dir="ltr"] *)'),i("rtl",'&:where([dir="rtl"], [dir="rtl"] *)')},reducedMotionVariants:({addVariant:i})=>{i("motion-safe","@media (prefers-reduced-motion: no-preference)"),i("motion-reduce","@media (prefers-reduced-motion: reduce)")},darkVariants:({config:i,addVariant:e})=>{let[t,r=".dark"]=[].concat(i("darkMode","media"));if(t===!1&&(t="media",F.warn("darkmode-false",["The `darkMode` option in your Tailwind CSS configuration is set to `false`, which now behaves the same as `media`.","Change `darkMode` to `media` or remove it entirely.","https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration"])),t==="variant"){let n;if(Array.isArray(r)||typeof r=="function"?n=r:typeof r=="string"&&(n=[r]),Array.isArray(n))for(let a of n)a===".dark"?(t=!1,F.warn("darkmode-variant-without-selector",["When using `variant` for `darkMode`, you must provide a selector.",'Example: `darkMode: ["variant", ".your-selector &"]`'])):a.includes("&")||(t=!1,F.warn("darkmode-variant-without-ampersand",["When using `variant` for `darkMode`, your selector must contain `&`.",'Example `darkMode: ["variant", ".your-selector &"]`']));r=n}t==="selector"?e("dark",`&:where(${r}, ${r} *)`):t==="media"?e("dark","@media (prefers-color-scheme: dark)"):t==="variant"?e("dark",r):t==="class"&&e("dark",`&:is(${r} *)`)},printVariant:({addVariant:i})=>{i("print","@media print")},screenVariants:({theme:i,addVariant:e,matchVariant:t})=>{let r=i("screens")??{},n=Object.values(r).every(w=>typeof w=="string"),a=at(i("screens")),s=new Set([]);function o(w){return w.match(/(\D+)$/)?.[1]??"(none)"}function u(w){w!==void 0&&s.add(o(w))}function c(w){return u(w),s.size===1}for(let w of a)for(let k of w.values)u(k.min),u(k.max);let f=s.size<=1;function d(w){return Object.fromEntries(a.filter(k=>pn(k).result).map(k=>{let{min:S,max:_}=k.values[0];if(w==="min"&&S!==void 0)return k;if(w==="min"&&_!==void 0)return{...k,not:!k.not};if(w==="max"&&_!==void 0)return k;if(w==="max"&&S!==void 0)return{...k,not:!k.not}}).map(k=>[k.name,k]))}function p(w){return(k,S)=>cd(w,k.value,S.value)}let m=p("max"),b=p("min");function x(w){return k=>{if(n)if(f){if(typeof k=="string"&&!c(k))return F.warn("minmax-have-mixed-units",["The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."]),[]}else return F.warn("mixed-screen-units",["The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."]),[];else return F.warn("complex-screen-config",["The `min-*` and `max-*` variants are not supported with a `screens` configuration containing objects."]),[];return[`@media ${st(dn(k,w))}`]}}t("max",x("max"),{sort:m,values:n?d("max"):{}});let y="min-screens";for(let w of a)e(w.name,`@media ${st(w)}`,{id:y,sort:n&&f?b:void 0,value:w});t("min",x("min"),{id:y,sort:b})},supportsVariants:({matchVariant:i,theme:e})=>{i("supports",(t="")=>{let r=N(t),n=/^\w*\s*\(/.test(r);return r=n?r.replace(/\b(and|or|not)\b/g," $1 "):r,n?`@supports ${r}`:(r.includes(":")||(r=`${r}: var(--tw)`),r.startsWith("(")&&r.endsWith(")")||(r=`(${r})`),`@supports ${r}`)},{values:e("supports")??{}})},hasVariants:({matchVariant:i,prefix:e})=>{i("has",t=>`&:has(${N(t)})`,{values:{},[ot]:{respectPrefix:!1}}),i("group-has",(t,{modifier:r})=>r?`:merge(${e(".group")}\\/${r}):has(${N(t)}) &`:`:merge(${e(".group")}):has(${N(t)}) &`,{values:{},[ot]:{respectPrefix:!1}}),i("peer-has",(t,{modifier:r})=>r?`:merge(${e(".peer")}\\/${r}):has(${N(t)}) ~ &`:`:merge(${e(".peer")}):has(${N(t)}) ~ &`,{values:{},[ot]:{respectPrefix:!1}})},ariaVariants:({matchVariant:i,theme:e})=>{i("aria",t=>`&[aria-${N(t)}]`,{values:e("aria")??{}}),i("group-aria",(t,{modifier:r})=>r?`:merge(.group\\/${r})[aria-${N(t)}] &`:`:merge(.group)[aria-${N(t)}] &`,{values:e("aria")??{}}),i("peer-aria",(t,{modifier:r})=>r?`:merge(.peer\\/${r})[aria-${N(t)}] ~ &`:`:merge(.peer)[aria-${N(t)}] ~ &`,{values:e("aria")??{}})},dataVariants:({matchVariant:i,theme:e})=>{i("data",t=>`&[data-${N(t)}]`,{values:e("data")??{}}),i("group-data",(t,{modifier:r})=>r?`:merge(.group\\/${r})[data-${N(t)}] &`:`:merge(.group)[data-${N(t)}] &`,{values:e("data")??{}}),i("peer-data",(t,{modifier:r})=>r?`:merge(.peer\\/${r})[data-${N(t)}] ~ &`:`:merge(.peer)[data-${N(t)}] ~ &`,{values:e("data")??{}})},orientationVariants:({addVariant:i})=>{i("portrait","@media (orientation: portrait)"),i("landscape","@media (orientation: landscape)")},prefersContrastVariants:({addVariant:i})=>{i("contrast-more","@media (prefers-contrast: more)"),i("contrast-less","@media (prefers-contrast: less)")},forcedColorsVariants:({addVariant:i})=>{i("forced-colors","@media (forced-colors: active)")}},Pe=["translate(var(--tw-translate-x), var(--tw-translate-y))","rotate(var(--tw-rotate))","skewX(var(--tw-skew-x))","skewY(var(--tw-skew-y))","scaleX(var(--tw-scale-x))","scaleY(var(--tw-scale-y))"].join(" "),Fe=["var(--tw-blur)","var(--tw-brightness)","var(--tw-contrast)","var(--tw-grayscale)","var(--tw-hue-rotate)","var(--tw-invert)","var(--tw-saturate)","var(--tw-sepia)","var(--tw-drop-shadow)"].join(" "),K=["var(--tw-backdrop-blur)","var(--tw-backdrop-brightness)","var(--tw-backdrop-contrast)","var(--tw-backdrop-grayscale)","var(--tw-backdrop-hue-rotate)","var(--tw-backdrop-invert)","var(--tw-backdrop-opacity)","var(--tw-backdrop-saturate)","var(--tw-backdrop-sepia)"].join(" "),hd={preflight:({addBase:i})=>{let e=z.parse(`*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:theme('borderColor.DEFAULT', currentColor)}::after,::before{--tw-content:''}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:theme('fontFamily.sans', ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:theme('fontFamily.sans[1].fontFeatureSettings', normal);font-variation-settings:theme('fontFamily.sans[1].fontVariationSettings', normal);-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:theme('fontFamily.mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:theme('fontFamily.mono[1].fontFeatureSettings', normal);font-variation-settings:theme('fontFamily.mono[1].fontVariationSettings', normal);font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:theme('colors.gray.4', #9ca3af)}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}`);i([z.comment({text:`! tailwindcss v${fd} | MIT License | https://tailwindcss.com`}),...e.nodes])},container:(()=>{function i(t=[]){return t.flatMap(r=>r.values.map(n=>n.min)).filter(r=>r!==void 0)}function e(t,r,n){if(typeof n=="undefined")return[];if(!(typeof n=="object"&&n!==null))return[{screen:"DEFAULT",minWidth:0,padding:n}];let a=[];n.DEFAULT&&a.push({screen:"DEFAULT",minWidth:0,padding:n.DEFAULT});for(let s of t)for(let o of r)for(let{min:u}of o.values)u===s&&a.push({minWidth:s,padding:n[o.name]});return a}return function({addComponents:t,theme:r}){let n=at(r("container.screens",r("screens"))),a=i(n),s=e(a,n,r("container.padding")),o=c=>{let f=s.find(d=>d.minWidth===c);return f?{paddingRight:f.padding,paddingLeft:f.padding}:{}},u=Array.from(new Set(a.slice().sort((c,f)=>parseInt(c)-parseInt(f)))).map(c=>({[`@media (min-width: ${c})`]:{".container":{"max-width":c,...o(c)}}}));t([{".container":Object.assign({width:"100%"},r("container.center",!1)?{marginRight:"auto",marginLeft:"auto"}:{},o(0))},...u])}})(),accessibility:({addUtilities:i})=>{i({".sr-only":{position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"},".not-sr-only":{position:"static",width:"auto",height:"auto",padding:"0",margin:"0",overflow:"visible",clip:"auto",whiteSpace:"normal"}})},pointerEvents:({addUtilities:i})=>{i({".pointer-events-none":{"pointer-events":"none"},".pointer-events-auto":{"pointer-events":"auto"}})},visibility:({addUtilities:i})=>{i({".visible":{visibility:"visible"},".invisible":{visibility:"hidden"},".collapse":{visibility:"collapse"}})},position:({addUtilities:i})=>{i({".static":{position:"static"},".fixed":{position:"fixed"},".absolute":{position:"absolute"},".relative":{position:"relative"},".sticky":{position:"sticky"}})},inset:P("inset",[["inset",["inset"]],[["inset-x",["left","right"]],["inset-y",["top","bottom"]]],[["start",["inset-inline-start"]],["end",["inset-inline-end"]],["top",["top"]],["right",["right"]],["bottom",["bottom"]],["left",["left"]]]],{supportsNegativeValues:!0}),isolation:({addUtilities:i})=>{i({".isolate":{isolation:"isolate"},".isolation-auto":{isolation:"auto"}})},zIndex:P("zIndex",[["z",["zIndex"]]],{supportsNegativeValues:!0}),order:P("order",void 0,{supportsNegativeValues:!0}),gridColumn:P("gridColumn",[["col",["gridColumn"]]]),gridColumnStart:P("gridColumnStart",[["col-start",["gridColumnStart"]]],{supportsNegativeValues:!0}),gridColumnEnd:P("gridColumnEnd",[["col-end",["gridColumnEnd"]]],{supportsNegativeValues:!0}),gridRow:P("gridRow",[["row",["gridRow"]]]),gridRowStart:P("gridRowStart",[["row-start",["gridRowStart"]]],{supportsNegativeValues:!0}),gridRowEnd:P("gridRowEnd",[["row-end",["gridRowEnd"]]],{supportsNegativeValues:!0}),float:({addUtilities:i})=>{i({".float-start":{float:"inline-start"},".float-end":{float:"inline-end"},".float-right":{float:"right"},".float-left":{float:"left"},".float-none":{float:"none"}})},clear:({addUtilities:i})=>{i({".clear-start":{clear:"inline-start"},".clear-end":{clear:"inline-end"},".clear-left":{clear:"left"},".clear-right":{clear:"right"},".clear-both":{clear:"both"},".clear-none":{clear:"none"}})},margin:P("margin",[["m",["margin"]],[["mx",["margin-left","margin-right"]],["my",["margin-top","margin-bottom"]]],[["ms",["margin-inline-start"]],["me",["margin-inline-end"]],["mt",["margin-top"]],["mr",["margin-right"]],["mb",["margin-bottom"]],["ml",["margin-left"]]]],{supportsNegativeValues:!0}),boxSizing:({addUtilities:i})=>{i({".box-border":{"box-sizing":"border-box"},".box-content":{"box-sizing":"content-box"}})},lineClamp:({matchUtilities:i,addUtilities:e,theme:t})=>{i({"line-clamp":r=>({overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":`${r}`})},{values:t("lineClamp")}),e({".line-clamp-none":{overflow:"visible",display:"block","-webkit-box-orient":"horizontal","-webkit-line-clamp":"none"}})},display:({addUtilities:i})=>{i({".block":{display:"block"},".inline-block":{display:"inline-block"},".inline":{display:"inline"},".flex":{display:"flex"},".inline-flex":{display:"inline-flex"},".table":{display:"table"},".inline-table":{display:"inline-table"},".table-caption":{display:"table-caption"},".table-cell":{display:"table-cell"},".table-column":{display:"table-column"},".table-column-group":{display:"table-column-group"},".table-footer-group":{display:"table-footer-group"},".table-header-group":{display:"table-header-group"},".table-row-group":{display:"table-row-group"},".table-row":{display:"table-row"},".flow-root":{display:"flow-root"},".grid":{display:"grid"},".inline-grid":{display:"inline-grid"},".contents":{display:"contents"},".list-item":{display:"list-item"},".hidden":{display:"none"}})},aspectRatio:P("aspectRatio",[["aspect",["aspect-ratio"]]]),size:P("size",[["size",["width","height"]]]),height:P("height",[["h",["height"]]]),maxHeight:P("maxHeight",[["max-h",["maxHeight"]]]),minHeight:P("minHeight",[["min-h",["minHeight"]]]),width:P("width",[["w",["width"]]]),minWidth:P("minWidth",[["min-w",["minWidth"]]]),maxWidth:P("maxWidth",[["max-w",["maxWidth"]]]),flex:P("flex"),flexShrink:P("flexShrink",[["flex-shrink",["flex-shrink"]],["shrink",["flex-shrink"]]]),flexGrow:P("flexGrow",[["flex-grow",["flex-grow"]],["grow",["flex-grow"]]]),flexBasis:P("flexBasis",[["basis",["flex-basis"]]]),tableLayout:({addUtilities:i})=>{i({".table-auto":{"table-layout":"auto"},".table-fixed":{"table-layout":"fixed"}})},captionSide:({addUtilities:i})=>{i({".caption-top":{"caption-side":"top"},".caption-bottom":{"caption-side":"bottom"}})},borderCollapse:({addUtilities:i})=>{i({".border-collapse":{"border-collapse":"collapse"},".border-separate":{"border-collapse":"separate"}})},borderSpacing:({addDefaults:i,matchUtilities:e,theme:t})=>{i("border-spacing",{"--tw-border-spacing-x":0,"--tw-border-spacing-y":0}),e({"border-spacing":r=>({"--tw-border-spacing-x":r,"--tw-border-spacing-y":r,"@defaults border-spacing":{},"border-spacing":"var(--tw-border-spacing-x) var(--tw-border-spacing-y)"}),"border-spacing-x":r=>({"--tw-border-spacing-x":r,"@defaults border-spacing":{},"border-spacing":"var(--tw-border-spacing-x) var(--tw-border-spacing-y)"}),"border-spacing-y":r=>({"--tw-border-spacing-y":r,"@defaults border-spacing":{},"border-spacing":"var(--tw-border-spacing-x) var(--tw-border-spacing-y)"})},{values:t("borderSpacing")})},transformOrigin:P("transformOrigin",[["origin",["transformOrigin"]]]),translate:P("translate",[[["translate-x",[["@defaults transform",{}],"--tw-translate-x",["transform",Pe]]],["translate-y",[["@defaults transform",{}],"--tw-translate-y",["transform",Pe]]]]],{supportsNegativeValues:!0}),rotate:P("rotate",[["rotate",[["@defaults transform",{}],"--tw-rotate",["transform",Pe]]]],{supportsNegativeValues:!0}),skew:P("skew",[[["skew-x",[["@defaults transform",{}],"--tw-skew-x",["transform",Pe]]],["skew-y",[["@defaults transform",{}],"--tw-skew-y",["transform",Pe]]]]],{supportsNegativeValues:!0}),scale:P("scale",[["scale",[["@defaults transform",{}],"--tw-scale-x","--tw-scale-y",["transform",Pe]]],[["scale-x",[["@defaults transform",{}],"--tw-scale-x",["transform",Pe]]],["scale-y",[["@defaults transform",{}],"--tw-scale-y",["transform",Pe]]]]],{supportsNegativeValues:!0}),transform:({addDefaults:i,addUtilities:e})=>{i("transform",{"--tw-translate-x":"0","--tw-translate-y":"0","--tw-rotate":"0","--tw-skew-x":"0","--tw-skew-y":"0","--tw-scale-x":"1","--tw-scale-y":"1"}),e({".transform":{"@defaults transform":{},transform:Pe},".transform-cpu":{transform:Pe},".transform-gpu":{transform:Pe.replace("translate(var(--tw-translate-x), var(--tw-translate-y))","translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)")},".transform-none":{transform:"none"}})},animation:({matchUtilities:i,theme:e,config:t})=>{let r=a=>pe(t("prefix")+a),n=Object.fromEntries(Object.entries(e("keyframes")??{}).map(([a,s])=>[a,{[`@keyframes ${r(a)}`]:s}]));i({animate:a=>{let s=Wa(a);return[...s.flatMap(o=>n[o.name]),{animation:s.map(({name:o,value:u})=>o===void 0||n[o]===void 0?u:u.replace(o,r(o))).join(", ")}]}},{values:e("animation")})},cursor:P("cursor"),touchAction:({addDefaults:i,addUtilities:e})=>{i("touch-action",{"--tw-pan-x":" ","--tw-pan-y":" ","--tw-pinch-zoom":" "});let t="var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)";e({".touch-auto":{"touch-action":"auto"},".touch-none":{"touch-action":"none"},".touch-pan-x":{"@defaults touch-action":{},"--tw-pan-x":"pan-x","touch-action":t},".touch-pan-left":{"@defaults touch-action":{},"--tw-pan-x":"pan-left","touch-action":t},".touch-pan-right":{"@defaults touch-action":{},"--tw-pan-x":"pan-right","touch-action":t},".touch-pan-y":{"@defaults touch-action":{},"--tw-pan-y":"pan-y","touch-action":t},".touch-pan-up":{"@defaults touch-action":{},"--tw-pan-y":"pan-up","touch-action":t},".touch-pan-down":{"@defaults touch-action":{},"--tw-pan-y":"pan-down","touch-action":t},".touch-pinch-zoom":{"@defaults touch-action":{},"--tw-pinch-zoom":"pinch-zoom","touch-action":t},".touch-manipulation":{"touch-action":"manipulation"}})},userSelect:({addUtilities:i})=>{i({".select-none":{"user-select":"none"},".select-text":{"user-select":"text"},".select-all":{"user-select":"all"},".select-auto":{"user-select":"auto"}})},resize:({addUtilities:i})=>{i({".resize-none":{resize:"none"},".resize-y":{resize:"vertical"},".resize-x":{resize:"horizontal"},".resize":{resize:"both"}})},scrollSnapType:({addDefaults:i,addUtilities:e})=>{i("scroll-snap-type",{"--tw-scroll-snap-strictness":"proximity"}),e({".snap-none":{"scroll-snap-type":"none"},".snap-x":{"@defaults scroll-snap-type":{},"scroll-snap-type":"x var(--tw-scroll-snap-strictness)"},".snap-y":{"@defaults scroll-snap-type":{},"scroll-snap-type":"y var(--tw-scroll-snap-strictness)"},".snap-both":{"@defaults scroll-snap-type":{},"scroll-snap-type":"both var(--tw-scroll-snap-strictness)"},".snap-mandatory":{"--tw-scroll-snap-strictness":"mandatory"},".snap-proximity":{"--tw-scroll-snap-strictness":"proximity"}})},scrollSnapAlign:({addUtilities:i})=>{i({".snap-start":{"scroll-snap-align":"start"},".snap-end":{"scroll-snap-align":"end"},".snap-center":{"scroll-snap-align":"center"},".snap-align-none":{"scroll-snap-align":"none"}})},scrollSnapStop:({addUtilities:i})=>{i({".snap-normal":{"scroll-snap-stop":"normal"},".snap-always":{"scroll-snap-stop":"always"}})},scrollMargin:P("scrollMargin",[["scroll-m",["scroll-margin"]],[["scroll-mx",["scroll-margin-left","scroll-margin-right"]],["scroll-my",["scroll-margin-top","scroll-margin-bottom"]]],[["scroll-ms",["scroll-margin-inline-start"]],["scroll-me",["scroll-margin-inline-end"]],["scroll-mt",["scroll-margin-top"]],["scroll-mr",["scroll-margin-right"]],["scroll-mb",["scroll-margin-bottom"]],["scroll-ml",["scroll-margin-left"]]]],{supportsNegativeValues:!0}),scrollPadding:P("scrollPadding",[["scroll-p",["scroll-padding"]],[["scroll-px",["scroll-padding-left","scroll-padding-right"]],["scroll-py",["scroll-padding-top","scroll-padding-bottom"]]],[["scroll-ps",["scroll-padding-inline-start"]],["scroll-pe",["scroll-padding-inline-end"]],["scroll-pt",["scroll-padding-top"]],["scroll-pr",["scroll-padding-right"]],["scroll-pb",["scroll-padding-bottom"]],["scroll-pl",["scroll-padding-left"]]]]),listStylePosition:({addUtilities:i})=>{i({".list-inside":{"list-style-position":"inside"},".list-outside":{"list-style-position":"outside"}})},listStyleType:P("listStyleType",[["list",["listStyleType"]]]),listStyleImage:P("listStyleImage",[["list-image",["listStyleImage"]]]),appearance:({addUtilities:i})=>{i({".appearance-none":{appearance:"none"},".appearance-auto":{appearance:"auto"}})},columns:P("columns",[["columns",["columns"]]]),breakBefore:({addUtilities:i})=>{i({".break-before-auto":{"break-before":"auto"},".break-before-avoid":{"break-before":"avoid"},".break-before-all":{"break-before":"all"},".break-before-avoid-page":{"break-before":"avoid-page"},".break-before-page":{"break-before":"page"},".break-before-left":{"break-before":"left"},".break-before-right":{"break-before":"right"},".break-before-column":{"break-before":"column"}})},breakInside:({addUtilities:i})=>{i({".break-inside-auto":{"break-inside":"auto"},".break-inside-avoid":{"break-inside":"avoid"},".break-inside-avoid-page":{"break-inside":"avoid-page"},".break-inside-avoid-column":{"break-inside":"avoid-column"}})},breakAfter:({addUtilities:i})=>{i({".break-after-auto":{"break-after":"auto"},".break-after-avoid":{"break-after":"avoid"},".break-after-all":{"break-after":"all"},".break-after-avoid-page":{"break-after":"avoid-page"},".break-after-page":{"break-after":"page"},".break-after-left":{"break-after":"left"},".break-after-right":{"break-after":"right"},".break-after-column":{"break-after":"column"}})},gridAutoColumns:P("gridAutoColumns",[["auto-cols",["gridAutoColumns"]]]),gridAutoFlow:({addUtilities:i})=>{i({".grid-flow-row":{gridAutoFlow:"row"},".grid-flow-col":{gridAutoFlow:"column"},".grid-flow-dense":{gridAutoFlow:"dense"},".grid-flow-row-dense":{gridAutoFlow:"row dense"},".grid-flow-col-dense":{gridAutoFlow:"column dense"}})},gridAutoRows:P("gridAutoRows",[["auto-rows",["gridAutoRows"]]]),gridTemplateColumns:P("gridTemplateColumns",[["grid-cols",["gridTemplateColumns"]]]),gridTemplateRows:P("gridTemplateRows",[["grid-rows",["gridTemplateRows"]]]),flexDirection:({addUtilities:i})=>{i({".flex-row":{"flex-direction":"row"},".flex-row-reverse":{"flex-direction":"row-reverse"},".flex-col":{"flex-direction":"column"},".flex-col-reverse":{"flex-direction":"column-reverse"}})},flexWrap:({addUtilities:i})=>{i({".flex-wrap":{"flex-wrap":"wrap"},".flex-wrap-reverse":{"flex-wrap":"wrap-reverse"},".flex-nowrap":{"flex-wrap":"nowrap"}})},placeContent:({addUtilities:i})=>{i({".place-content-center":{"place-content":"center"},".place-content-start":{"place-content":"start"},".place-content-end":{"place-content":"end"},".place-content-between":{"place-content":"space-between"},".place-content-around":{"place-content":"space-around"},".place-content-evenly":{"place-content":"space-evenly"},".place-content-baseline":{"place-content":"baseline"},".place-content-stretch":{"place-content":"stretch"}})},placeItems:({addUtilities:i})=>{i({".place-items-start":{"place-items":"start"},".place-items-end":{"place-items":"end"},".place-items-center":{"place-items":"center"},".place-items-baseline":{"place-items":"baseline"},".place-items-stretch":{"place-items":"stretch"}})},alignContent:({addUtilities:i})=>{i({".content-normal":{"align-content":"normal"},".content-center":{"align-content":"center"},".content-start":{"align-content":"flex-start"},".content-end":{"align-content":"flex-end"},".content-between":{"align-content":"space-between"},".content-around":{"align-content":"space-around"},".content-evenly":{"align-content":"space-evenly"},".content-baseline":{"align-content":"baseline"},".content-stretch":{"align-content":"stretch"}})},alignItems:({addUtilities:i})=>{i({".items-start":{"align-items":"flex-start"},".items-end":{"align-items":"flex-end"},".items-center":{"align-items":"center"},".items-baseline":{"align-items":"baseline"},".items-stretch":{"align-items":"stretch"}})},justifyContent:({addUtilities:i})=>{i({".justify-normal":{"justify-content":"normal"},".justify-start":{"justify-content":"flex-start"},".justify-end":{"justify-content":"flex-end"},".justify-center":{"justify-content":"center"},".justify-between":{"justify-content":"space-between"},".justify-around":{"justify-content":"space-around"},".justify-evenly":{"justify-content":"space-evenly"},".justify-stretch":{"justify-content":"stretch"}})},justifyItems:({addUtilities:i})=>{i({".justify-items-start":{"justify-items":"start"},".justify-items-end":{"justify-items":"end"},".justify-items-center":{"justify-items":"center"},".justify-items-stretch":{"justify-items":"stretch"}})},gap:P("gap",[["gap",["gap"]],[["gap-x",["columnGap"]],["gap-y",["rowGap"]]]]),space:({matchUtilities:i,addUtilities:e,theme:t})=>{i({"space-x":r=>(r=r==="0"?"0px":r,{"& > :not([hidden]) ~ :not([hidden])":{"--tw-space-x-reverse":"0","margin-right":`calc(${r} * var(--tw-space-x-reverse))`,"margin-left":`calc(${r} * calc(1 - var(--tw-space-x-reverse)))`}}),"space-y":r=>(r=r==="0"?"0px":r,{"& > :not([hidden]) ~ :not([hidden])":{"--tw-space-y-reverse":"0","margin-top":`calc(${r} * calc(1 - var(--tw-space-y-reverse)))`,"margin-bottom":`calc(${r} * var(--tw-space-y-reverse))`}})},{values:t("space"),supportsNegativeValues:!0}),e({".space-y-reverse > :not([hidden]) ~ :not([hidden])":{"--tw-space-y-reverse":"1"},".space-x-reverse > :not([hidden]) ~ :not([hidden])":{"--tw-space-x-reverse":"1"}})},divideWidth:({matchUtilities:i,addUtilities:e,theme:t})=>{i({"divide-x":r=>(r=r==="0"?"0px":r,{"& > :not([hidden]) ~ :not([hidden])":{"@defaults border-width":{},"--tw-divide-x-reverse":"0","border-right-width":`calc(${r} * var(--tw-divide-x-reverse))`,"border-left-width":`calc(${r} * calc(1 - var(--tw-divide-x-reverse)))`}}),"divide-y":r=>(r=r==="0"?"0px":r,{"& > :not([hidden]) ~ :not([hidden])":{"@defaults border-width":{},"--tw-divide-y-reverse":"0","border-top-width":`calc(${r} * calc(1 - var(--tw-divide-y-reverse)))`,"border-bottom-width":`calc(${r} * var(--tw-divide-y-reverse))`}})},{values:t("divideWidth"),type:["line-width","length","any"]}),e({".divide-y-reverse > :not([hidden]) ~ :not([hidden])":{"@defaults border-width":{},"--tw-divide-y-reverse":"1"},".divide-x-reverse > :not([hidden]) ~ :not([hidden])":{"@defaults border-width":{},"--tw-divide-x-reverse":"1"}})},divideStyle:({addUtilities:i})=>{i({".divide-solid > :not([hidden]) ~ :not([hidden])":{"border-style":"solid"},".divide-dashed > :not([hidden]) ~ :not([hidden])":{"border-style":"dashed"},".divide-dotted > :not([hidden]) ~ :not([hidden])":{"border-style":"dotted"},".divide-double > :not([hidden]) ~ :not([hidden])":{"border-style":"double"},".divide-none > :not([hidden]) ~ :not([hidden])":{"border-style":"none"}})},divideColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({divide:r=>t("divideOpacity")?{["& > :not([hidden]) ~ :not([hidden])"]:oe({color:r,property:"border-color",variable:"--tw-divide-opacity"})}:{["& > :not([hidden]) ~ :not([hidden])"]:{"border-color":L(r)}}},{values:(({DEFAULT:r,...n})=>n)(ne(e("divideColor"))),type:["color","any"]})},divideOpacity:({matchUtilities:i,theme:e})=>{i({"divide-opacity":t=>({["& > :not([hidden]) ~ :not([hidden])"]:{"--tw-divide-opacity":t}})},{values:e("divideOpacity")})},placeSelf:({addUtilities:i})=>{i({".place-self-auto":{"place-self":"auto"},".place-self-start":{"place-self":"start"},".place-self-end":{"place-self":"end"},".place-self-center":{"place-self":"center"},".place-self-stretch":{"place-self":"stretch"}})},alignSelf:({addUtilities:i})=>{i({".self-auto":{"align-self":"auto"},".self-start":{"align-self":"flex-start"},".self-end":{"align-self":"flex-end"},".self-center":{"align-self":"center"},".self-stretch":{"align-self":"stretch"},".self-baseline":{"align-self":"baseline"}})},justifySelf:({addUtilities:i})=>{i({".justify-self-auto":{"justify-self":"auto"},".justify-self-start":{"justify-self":"start"},".justify-self-end":{"justify-self":"end"},".justify-self-center":{"justify-self":"center"},".justify-self-stretch":{"justify-self":"stretch"}})},overflow:({addUtilities:i})=>{i({".overflow-auto":{overflow:"auto"},".overflow-hidden":{overflow:"hidden"},".overflow-clip":{overflow:"clip"},".overflow-visible":{overflow:"visible"},".overflow-scroll":{overflow:"scroll"},".overflow-x-auto":{"overflow-x":"auto"},".overflow-y-auto":{"overflow-y":"auto"},".overflow-x-hidden":{"overflow-x":"hidden"},".overflow-y-hidden":{"overflow-y":"hidden"},".overflow-x-clip":{"overflow-x":"clip"},".overflow-y-clip":{"overflow-y":"clip"},".overflow-x-visible":{"overflow-x":"visible"},".overflow-y-visible":{"overflow-y":"visible"},".overflow-x-scroll":{"overflow-x":"scroll"},".overflow-y-scroll":{"overflow-y":"scroll"}})},overscrollBehavior:({addUtilities:i})=>{i({".overscroll-auto":{"overscroll-behavior":"auto"},".overscroll-contain":{"overscroll-behavior":"contain"},".overscroll-none":{"overscroll-behavior":"none"},".overscroll-y-auto":{"overscroll-behavior-y":"auto"},".overscroll-y-contain":{"overscroll-behavior-y":"contain"},".overscroll-y-none":{"overscroll-behavior-y":"none"},".overscroll-x-auto":{"overscroll-behavior-x":"auto"},".overscroll-x-contain":{"overscroll-behavior-x":"contain"},".overscroll-x-none":{"overscroll-behavior-x":"none"}})},scrollBehavior:({addUtilities:i})=>{i({".scroll-auto":{"scroll-behavior":"auto"},".scroll-smooth":{"scroll-behavior":"smooth"}})},textOverflow:({addUtilities:i})=>{i({".truncate":{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"},".overflow-ellipsis":{"text-overflow":"ellipsis"},".text-ellipsis":{"text-overflow":"ellipsis"},".text-clip":{"text-overflow":"clip"}})},hyphens:({addUtilities:i})=>{i({".hyphens-none":{hyphens:"none"},".hyphens-manual":{hyphens:"manual"},".hyphens-auto":{hyphens:"auto"}})},whitespace:({addUtilities:i})=>{i({".whitespace-normal":{"white-space":"normal"},".whitespace-nowrap":{"white-space":"nowrap"},".whitespace-pre":{"white-space":"pre"},".whitespace-pre-line":{"white-space":"pre-line"},".whitespace-pre-wrap":{"white-space":"pre-wrap"},".whitespace-break-spaces":{"white-space":"break-spaces"}})},textWrap:({addUtilities:i})=>{i({".text-wrap":{"text-wrap":"wrap"},".text-nowrap":{"text-wrap":"nowrap"},".text-balance":{"text-wrap":"balance"},".text-pretty":{"text-wrap":"pretty"}})},wordBreak:({addUtilities:i})=>{i({".break-normal":{"overflow-wrap":"normal","word-break":"normal"},".break-words":{"overflow-wrap":"break-word"},".break-all":{"word-break":"break-all"},".break-keep":{"word-break":"keep-all"}})},borderRadius:P("borderRadius",[["rounded",["border-radius"]],[["rounded-s",["border-start-start-radius","border-end-start-radius"]],["rounded-e",["border-start-end-radius","border-end-end-radius"]],["rounded-t",["border-top-left-radius","border-top-right-radius"]],["rounded-r",["border-top-right-radius","border-bottom-right-radius"]],["rounded-b",["border-bottom-right-radius","border-bottom-left-radius"]],["rounded-l",["border-top-left-radius","border-bottom-left-radius"]]],[["rounded-ss",["border-start-start-radius"]],["rounded-se",["border-start-end-radius"]],["rounded-ee",["border-end-end-radius"]],["rounded-es",["border-end-start-radius"]],["rounded-tl",["border-top-left-radius"]],["rounded-tr",["border-top-right-radius"]],["rounded-br",["border-bottom-right-radius"]],["rounded-bl",["border-bottom-left-radius"]]]]),borderWidth:P("borderWidth",[["border",[["@defaults border-width",{}],"border-width"]],[["border-x",[["@defaults border-width",{}],"border-left-width","border-right-width"]],["border-y",[["@defaults border-width",{}],"border-top-width","border-bottom-width"]]],[["border-s",[["@defaults border-width",{}],"border-inline-start-width"]],["border-e",[["@defaults border-width",{}],"border-inline-end-width"]],["border-t",[["@defaults border-width",{}],"border-top-width"]],["border-r",[["@defaults border-width",{}],"border-right-width"]],["border-b",[["@defaults border-width",{}],"border-bottom-width"]],["border-l",[["@defaults border-width",{}],"border-left-width"]]]],{type:["line-width","length"]}),borderStyle:({addUtilities:i})=>{i({".border-solid":{"border-style":"solid"},".border-dashed":{"border-style":"dashed"},".border-dotted":{"border-style":"dotted"},".border-double":{"border-style":"double"},".border-hidden":{"border-style":"hidden"},".border-none":{"border-style":"none"}})},borderColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({border:r=>t("borderOpacity")?oe({color:r,property:"border-color",variable:"--tw-border-opacity"}):{"border-color":L(r)}},{values:(({DEFAULT:r,...n})=>n)(ne(e("borderColor"))),type:["color","any"]}),i({"border-x":r=>t("borderOpacity")?oe({color:r,property:["border-left-color","border-right-color"],variable:"--tw-border-opacity"}):{"border-left-color":L(r),"border-right-color":L(r)},"border-y":r=>t("borderOpacity")?oe({color:r,property:["border-top-color","border-bottom-color"],variable:"--tw-border-opacity"}):{"border-top-color":L(r),"border-bottom-color":L(r)}},{values:(({DEFAULT:r,...n})=>n)(ne(e("borderColor"))),type:["color","any"]}),i({"border-s":r=>t("borderOpacity")?oe({color:r,property:"border-inline-start-color",variable:"--tw-border-opacity"}):{"border-inline-start-color":L(r)},"border-e":r=>t("borderOpacity")?oe({color:r,property:"border-inline-end-color",variable:"--tw-border-opacity"}):{"border-inline-end-color":L(r)},"border-t":r=>t("borderOpacity")?oe({color:r,property:"border-top-color",variable:"--tw-border-opacity"}):{"border-top-color":L(r)},"border-r":r=>t("borderOpacity")?oe({color:r,property:"border-right-color",variable:"--tw-border-opacity"}):{"border-right-color":L(r)},"border-b":r=>t("borderOpacity")?oe({color:r,property:"border-bottom-color",variable:"--tw-border-opacity"}):{"border-bottom-color":L(r)},"border-l":r=>t("borderOpacity")?oe({color:r,property:"border-left-color",variable:"--tw-border-opacity"}):{"border-left-color":L(r)}},{values:(({DEFAULT:r,...n})=>n)(ne(e("borderColor"))),type:["color","any"]})},borderOpacity:P("borderOpacity",[["border-opacity",["--tw-border-opacity"]]]),backgroundColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({bg:r=>t("backgroundOpacity")?oe({color:r,property:"background-color",variable:"--tw-bg-opacity"}):{"background-color":L(r)}},{values:ne(e("backgroundColor")),type:["color","any"]})},backgroundOpacity:P("backgroundOpacity",[["bg-opacity",["--tw-bg-opacity"]]]),backgroundImage:P("backgroundImage",[["bg",["background-image"]]],{type:["lookup","image","url"]}),gradientColorStops:(()=>{function i(e){return qe(e,0,"rgb(255 255 255 / 0)")}return function({matchUtilities:e,theme:t,addDefaults:r}){r("gradient-color-stops",{"--tw-gradient-from-position":" ","--tw-gradient-via-position":" ","--tw-gradient-to-position":" "});let n={values:ne(t("gradientColorStops")),type:["color","any"]},a={values:t("gradientColorStopPositions"),type:["length","percentage"]};e({from:s=>{let o=i(s);return{"@defaults gradient-color-stops":{},"--tw-gradient-from":`${L(s)} var(--tw-gradient-from-position)`,"--tw-gradient-to":`${o} var(--tw-gradient-to-position)`,"--tw-gradient-stops":"var(--tw-gradient-from), var(--tw-gradient-to)"}}},n),e({from:s=>({"--tw-gradient-from-position":s})},a),e({via:s=>{let o=i(s);return{"@defaults gradient-color-stops":{},"--tw-gradient-to":`${o}  var(--tw-gradient-to-position)`,"--tw-gradient-stops":`var(--tw-gradient-from), ${L(s)} var(--tw-gradient-via-position), var(--tw-gradient-to)`}}},n),e({via:s=>({"--tw-gradient-via-position":s})},a),e({to:s=>({"@defaults gradient-color-stops":{},"--tw-gradient-to":`${L(s)} var(--tw-gradient-to-position)`})},n),e({to:s=>({"--tw-gradient-to-position":s})},a)}})(),boxDecorationBreak:({addUtilities:i})=>{i({".decoration-slice":{"box-decoration-break":"slice"},".decoration-clone":{"box-decoration-break":"clone"},".box-decoration-slice":{"box-decoration-break":"slice"},".box-decoration-clone":{"box-decoration-break":"clone"}})},backgroundSize:P("backgroundSize",[["bg",["background-size"]]],{type:["lookup","length","percentage","size"]}),backgroundAttachment:({addUtilities:i})=>{i({".bg-fixed":{"background-attachment":"fixed"},".bg-local":{"background-attachment":"local"},".bg-scroll":{"background-attachment":"scroll"}})},backgroundClip:({addUtilities:i})=>{i({".bg-clip-border":{"background-clip":"border-box"},".bg-clip-padding":{"background-clip":"padding-box"},".bg-clip-content":{"background-clip":"content-box"},".bg-clip-text":{"background-clip":"text"}})},backgroundPosition:P("backgroundPosition",[["bg",["background-position"]]],{type:["lookup",["position",{preferOnConflict:!0}]]}),backgroundRepeat:({addUtilities:i})=>{i({".bg-repeat":{"background-repeat":"repeat"},".bg-no-repeat":{"background-repeat":"no-repeat"},".bg-repeat-x":{"background-repeat":"repeat-x"},".bg-repeat-y":{"background-repeat":"repeat-y"},".bg-repeat-round":{"background-repeat":"round"},".bg-repeat-space":{"background-repeat":"space"}})},backgroundOrigin:({addUtilities:i})=>{i({".bg-origin-border":{"background-origin":"border-box"},".bg-origin-padding":{"background-origin":"padding-box"},".bg-origin-content":{"background-origin":"content-box"}})},fill:({matchUtilities:i,theme:e})=>{i({fill:t=>({fill:L(t)})},{values:ne(e("fill")),type:["color","any"]})},stroke:({matchUtilities:i,theme:e})=>{i({stroke:t=>({stroke:L(t)})},{values:ne(e("stroke")),type:["color","url","any"]})},strokeWidth:P("strokeWidth",[["stroke",["stroke-width"]]],{type:["length","number","percentage"]}),objectFit:({addUtilities:i})=>{i({".object-contain":{"object-fit":"contain"},".object-cover":{"object-fit":"cover"},".object-fill":{"object-fit":"fill"},".object-none":{"object-fit":"none"},".object-scale-down":{"object-fit":"scale-down"}})},objectPosition:P("objectPosition",[["object",["object-position"]]]),padding:P("padding",[["p",["padding"]],[["px",["padding-left","padding-right"]],["py",["padding-top","padding-bottom"]]],[["ps",["padding-inline-start"]],["pe",["padding-inline-end"]],["pt",["padding-top"]],["pr",["padding-right"]],["pb",["padding-bottom"]],["pl",["padding-left"]]]]),textAlign:({addUtilities:i})=>{i({".text-left":{"text-align":"left"},".text-center":{"text-align":"center"},".text-right":{"text-align":"right"},".text-justify":{"text-align":"justify"},".text-start":{"text-align":"start"},".text-end":{"text-align":"end"}})},textIndent:P("textIndent",[["indent",["text-indent"]]],{supportsNegativeValues:!0}),verticalAlign:({addUtilities:i,matchUtilities:e})=>{i({".align-baseline":{"vertical-align":"baseline"},".align-top":{"vertical-align":"top"},".align-middle":{"vertical-align":"middle"},".align-bottom":{"vertical-align":"bottom"},".align-text-top":{"vertical-align":"text-top"},".align-text-bottom":{"vertical-align":"text-bottom"},".align-sub":{"vertical-align":"sub"},".align-super":{"vertical-align":"super"}}),e({align:t=>({"vertical-align":t})})},fontFamily:({matchUtilities:i,theme:e})=>{i({font:t=>{let[r,n={}]=Array.isArray(t)&&se(t[1])?t:[t],{fontFeatureSettings:a,fontVariationSettings:s}=n;return{"font-family":Array.isArray(r)?r.join(", "):r,...a===void 0?{}:{"font-feature-settings":a},...s===void 0?{}:{"font-variation-settings":s}}}},{values:e("fontFamily"),type:["lookup","generic-name","family-name"]})},fontSize:({matchUtilities:i,theme:e})=>{i({text:(t,{modifier:r})=>{let[n,a]=Array.isArray(t)?t:[t];if(r)return{"font-size":n,"line-height":r};let{lineHeight:s,letterSpacing:o,fontWeight:u}=se(a)?a:{lineHeight:a};return{"font-size":n,...s===void 0?{}:{"line-height":s},...o===void 0?{}:{"letter-spacing":o},...u===void 0?{}:{"font-weight":u}}}},{values:e("fontSize"),modifiers:e("lineHeight"),type:["absolute-size","relative-size","length","percentage"]})},fontWeight:P("fontWeight",[["font",["fontWeight"]]],{type:["lookup","number","any"]}),textTransform:({addUtilities:i})=>{i({".uppercase":{"text-transform":"uppercase"},".lowercase":{"text-transform":"lowercase"},".capitalize":{"text-transform":"capitalize"},".normal-case":{"text-transform":"none"}})},fontStyle:({addUtilities:i})=>{i({".italic":{"font-style":"italic"},".not-italic":{"font-style":"normal"}})},fontVariantNumeric:({addDefaults:i,addUtilities:e})=>{let t="var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)";i("font-variant-numeric",{"--tw-ordinal":" ","--tw-slashed-zero":" ","--tw-numeric-figure":" ","--tw-numeric-spacing":" ","--tw-numeric-fraction":" "}),e({".normal-nums":{"font-variant-numeric":"normal"},".ordinal":{"@defaults font-variant-numeric":{},"--tw-ordinal":"ordinal","font-variant-numeric":t},".slashed-zero":{"@defaults font-variant-numeric":{},"--tw-slashed-zero":"slashed-zero","font-variant-numeric":t},".lining-nums":{"@defaults font-variant-numeric":{},"--tw-numeric-figure":"lining-nums","font-variant-numeric":t},".oldstyle-nums":{"@defaults font-variant-numeric":{},"--tw-numeric-figure":"oldstyle-nums","font-variant-numeric":t},".proportional-nums":{"@defaults font-variant-numeric":{},"--tw-numeric-spacing":"proportional-nums","font-variant-numeric":t},".tabular-nums":{"@defaults font-variant-numeric":{},"--tw-numeric-spacing":"tabular-nums","font-variant-numeric":t},".diagonal-fractions":{"@defaults font-variant-numeric":{},"--tw-numeric-fraction":"diagonal-fractions","font-variant-numeric":t},".stacked-fractions":{"@defaults font-variant-numeric":{},"--tw-numeric-fraction":"stacked-fractions","font-variant-numeric":t}})},lineHeight:P("lineHeight",[["leading",["lineHeight"]]]),letterSpacing:P("letterSpacing",[["tracking",["letterSpacing"]]],{supportsNegativeValues:!0}),textColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({text:r=>t("textOpacity")?oe({color:r,property:"color",variable:"--tw-text-opacity"}):{color:L(r)}},{values:ne(e("textColor")),type:["color","any"]})},textOpacity:P("textOpacity",[["text-opacity",["--tw-text-opacity"]]]),textDecoration:({addUtilities:i})=>{i({".underline":{"text-decoration-line":"underline"},".overline":{"text-decoration-line":"overline"},".line-through":{"text-decoration-line":"line-through"},".no-underline":{"text-decoration-line":"none"}})},textDecorationColor:({matchUtilities:i,theme:e})=>{i({decoration:t=>({"text-decoration-color":L(t)})},{values:ne(e("textDecorationColor")),type:["color","any"]})},textDecorationStyle:({addUtilities:i})=>{i({".decoration-solid":{"text-decoration-style":"solid"},".decoration-double":{"text-decoration-style":"double"},".decoration-dotted":{"text-decoration-style":"dotted"},".decoration-dashed":{"text-decoration-style":"dashed"},".decoration-wavy":{"text-decoration-style":"wavy"}})},textDecorationThickness:P("textDecorationThickness",[["decoration",["text-decoration-thickness"]]],{type:["length","percentage"]}),textUnderlineOffset:P("textUnderlineOffset",[["underline-offset",["text-underline-offset"]]],{type:["length","percentage","any"]}),fontSmoothing:({addUtilities:i})=>{i({".antialiased":{"-webkit-font-smoothing":"antialiased","-moz-osx-font-smoothing":"grayscale"},".subpixel-antialiased":{"-webkit-font-smoothing":"auto","-moz-osx-font-smoothing":"auto"}})},placeholderColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({placeholder:r=>t("placeholderOpacity")?{"&::placeholder":oe({color:r,property:"color",variable:"--tw-placeholder-opacity"})}:{"&::placeholder":{color:L(r)}}},{values:ne(e("placeholderColor")),type:["color","any"]})},placeholderOpacity:({matchUtilities:i,theme:e})=>{i({"placeholder-opacity":t=>({["&::placeholder"]:{"--tw-placeholder-opacity":t}})},{values:e("placeholderOpacity")})},caretColor:({matchUtilities:i,theme:e})=>{i({caret:t=>({"caret-color":L(t)})},{values:ne(e("caretColor")),type:["color","any"]})},accentColor:({matchUtilities:i,theme:e})=>{i({accent:t=>({"accent-color":L(t)})},{values:ne(e("accentColor")),type:["color","any"]})},opacity:P("opacity",[["opacity",["opacity"]]]),backgroundBlendMode:({addUtilities:i})=>{i({".bg-blend-normal":{"background-blend-mode":"normal"},".bg-blend-multiply":{"background-blend-mode":"multiply"},".bg-blend-screen":{"background-blend-mode":"screen"},".bg-blend-overlay":{"background-blend-mode":"overlay"},".bg-blend-darken":{"background-blend-mode":"darken"},".bg-blend-lighten":{"background-blend-mode":"lighten"},".bg-blend-color-dodge":{"background-blend-mode":"color-dodge"},".bg-blend-color-burn":{"background-blend-mode":"color-burn"},".bg-blend-hard-light":{"background-blend-mode":"hard-light"},".bg-blend-soft-light":{"background-blend-mode":"soft-light"},".bg-blend-difference":{"background-blend-mode":"difference"},".bg-blend-exclusion":{"background-blend-mode":"exclusion"},".bg-blend-hue":{"background-blend-mode":"hue"},".bg-blend-saturation":{"background-blend-mode":"saturation"},".bg-blend-color":{"background-blend-mode":"color"},".bg-blend-luminosity":{"background-blend-mode":"luminosity"}})},mixBlendMode:({addUtilities:i})=>{i({".mix-blend-normal":{"mix-blend-mode":"normal"},".mix-blend-multiply":{"mix-blend-mode":"multiply"},".mix-blend-screen":{"mix-blend-mode":"screen"},".mix-blend-overlay":{"mix-blend-mode":"overlay"},".mix-blend-darken":{"mix-blend-mode":"darken"},".mix-blend-lighten":{"mix-blend-mode":"lighten"},".mix-blend-color-dodge":{"mix-blend-mode":"color-dodge"},".mix-blend-color-burn":{"mix-blend-mode":"color-burn"},".mix-blend-hard-light":{"mix-blend-mode":"hard-light"},".mix-blend-soft-light":{"mix-blend-mode":"soft-light"},".mix-blend-difference":{"mix-blend-mode":"difference"},".mix-blend-exclusion":{"mix-blend-mode":"exclusion"},".mix-blend-hue":{"mix-blend-mode":"hue"},".mix-blend-saturation":{"mix-blend-mode":"saturation"},".mix-blend-color":{"mix-blend-mode":"color"},".mix-blend-luminosity":{"mix-blend-mode":"luminosity"},".mix-blend-plus-darker":{"mix-blend-mode":"plus-darker"},".mix-blend-plus-lighter":{"mix-blend-mode":"plus-lighter"}})},boxShadow:(()=>{let i=Ge("boxShadow"),e=["var(--tw-ring-offset-shadow, 0 0 #0000)","var(--tw-ring-shadow, 0 0 #0000)","var(--tw-shadow)"].join(", ");return function({matchUtilities:t,addDefaults:r,theme:n}){r("box-shadow",{"--tw-ring-offset-shadow":"0 0 #0000","--tw-ring-shadow":"0 0 #0000","--tw-shadow":"0 0 #0000","--tw-shadow-colored":"0 0 #0000"}),t({shadow:a=>{a=i(a);let s=yi(a);for(let o of s)!o.valid||(o.color="var(--tw-shadow-color)");return{"@defaults box-shadow":{},"--tw-shadow":a==="none"?"0 0 #0000":a,"--tw-shadow-colored":a==="none"?"0 0 #0000":Tu(s),"box-shadow":e}}},{values:n("boxShadow"),type:["shadow"]})}})(),boxShadowColor:({matchUtilities:i,theme:e})=>{i({shadow:t=>({"--tw-shadow-color":L(t),"--tw-shadow":"var(--tw-shadow-colored)"})},{values:ne(e("boxShadowColor")),type:["color","any"]})},outlineStyle:({addUtilities:i})=>{i({".outline-none":{outline:"2px solid transparent","outline-offset":"2px"},".outline":{"outline-style":"solid"},".outline-dashed":{"outline-style":"dashed"},".outline-dotted":{"outline-style":"dotted"},".outline-double":{"outline-style":"double"}})},outlineWidth:P("outlineWidth",[["outline",["outline-width"]]],{type:["length","number","percentage"]}),outlineOffset:P("outlineOffset",[["outline-offset",["outline-offset"]]],{type:["length","number","percentage","any"],supportsNegativeValues:!0}),outlineColor:({matchUtilities:i,theme:e})=>{i({outline:t=>({"outline-color":L(t)})},{values:ne(e("outlineColor")),type:["color","any"]})},ringWidth:({matchUtilities:i,addDefaults:e,addUtilities:t,theme:r,config:n})=>{let a=(()=>{if(Z(n(),"respectDefaultRingColorOpacity"))return r("ringColor.DEFAULT");let s=r("ringOpacity.DEFAULT","0.5");return r("ringColor")?.DEFAULT?qe(r("ringColor")?.DEFAULT,s,`rgb(147 197 253 / ${s})`):`rgb(147 197 253 / ${s})`})();e("ring-width",{"--tw-ring-inset":" ","--tw-ring-offset-width":r("ringOffsetWidth.DEFAULT","0px"),"--tw-ring-offset-color":r("ringOffsetColor.DEFAULT","#fff"),"--tw-ring-color":a,"--tw-ring-offset-shadow":"0 0 #0000","--tw-ring-shadow":"0 0 #0000","--tw-shadow":"0 0 #0000","--tw-shadow-colored":"0 0 #0000"}),i({ring:s=>({"@defaults ring-width":{},"--tw-ring-offset-shadow":"var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)","--tw-ring-shadow":`var(--tw-ring-inset) 0 0 0 calc(${s} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,"box-shadow":["var(--tw-ring-offset-shadow)","var(--tw-ring-shadow)","var(--tw-shadow, 0 0 #0000)"].join(", ")})},{values:r("ringWidth"),type:"length"}),t({".ring-inset":{"@defaults ring-width":{},"--tw-ring-inset":"inset"}})},ringColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({ring:r=>t("ringOpacity")?oe({color:r,property:"--tw-ring-color",variable:"--tw-ring-opacity"}):{"--tw-ring-color":L(r)}},{values:Object.fromEntries(Object.entries(ne(e("ringColor"))).filter(([r])=>r!=="DEFAULT")),type:["color","any"]})},ringOpacity:i=>{let{config:e}=i;return P("ringOpacity",[["ring-opacity",["--tw-ring-opacity"]]],{filterDefault:!Z(e(),"respectDefaultRingColorOpacity")})(i)},ringOffsetWidth:P("ringOffsetWidth",[["ring-offset",["--tw-ring-offset-width"]]],{type:"length"}),ringOffsetColor:({matchUtilities:i,theme:e})=>{i({"ring-offset":t=>({"--tw-ring-offset-color":L(t)})},{values:ne(e("ringOffsetColor")),type:["color","any"]})},blur:({matchUtilities:i,theme:e})=>{i({blur:t=>({"--tw-blur":t.trim()===""?" ":`blur(${t})`,"@defaults filter":{},filter:Fe})},{values:e("blur")})},brightness:({matchUtilities:i,theme:e})=>{i({brightness:t=>({"--tw-brightness":`brightness(${t})`,"@defaults filter":{},filter:Fe})},{values:e("brightness")})},contrast:({matchUtilities:i,theme:e})=>{i({contrast:t=>({"--tw-contrast":`contrast(${t})`,"@defaults filter":{},filter:Fe})},{values:e("contrast")})},dropShadow:({matchUtilities:i,theme:e})=>{i({"drop-shadow":t=>({"--tw-drop-shadow":Array.isArray(t)?t.map(r=>`drop-shadow(${r})`).join(" "):`drop-shadow(${t})`,"@defaults filter":{},filter:Fe})},{values:e("dropShadow")})},grayscale:({matchUtilities:i,theme:e})=>{i({grayscale:t=>({"--tw-grayscale":`grayscale(${t})`,"@defaults filter":{},filter:Fe})},{values:e("grayscale")})},hueRotate:({matchUtilities:i,theme:e})=>{i({"hue-rotate":t=>({"--tw-hue-rotate":`hue-rotate(${t})`,"@defaults filter":{},filter:Fe})},{values:e("hueRotate"),supportsNegativeValues:!0})},invert:({matchUtilities:i,theme:e})=>{i({invert:t=>({"--tw-invert":`invert(${t})`,"@defaults filter":{},filter:Fe})},{values:e("invert")})},saturate:({matchUtilities:i,theme:e})=>{i({saturate:t=>({"--tw-saturate":`saturate(${t})`,"@defaults filter":{},filter:Fe})},{values:e("saturate")})},sepia:({matchUtilities:i,theme:e})=>{i({sepia:t=>({"--tw-sepia":`sepia(${t})`,"@defaults filter":{},filter:Fe})},{values:e("sepia")})},filter:({addDefaults:i,addUtilities:e})=>{i("filter",{"--tw-blur":" ","--tw-brightness":" ","--tw-contrast":" ","--tw-grayscale":" ","--tw-hue-rotate":" ","--tw-invert":" ","--tw-saturate":" ","--tw-sepia":" ","--tw-drop-shadow":" "}),e({".filter":{"@defaults filter":{},filter:Fe},".filter-none":{filter:"none"}})},backdropBlur:({matchUtilities:i,theme:e})=>{i({"backdrop-blur":t=>({"--tw-backdrop-blur":t.trim()===""?" ":`blur(${t})`,"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K})},{values:e("backdropBlur")})},backdropBrightness:({matchUtilities:i,theme:e})=>{i({"backdrop-brightness":t=>({"--tw-backdrop-brightness":`brightness(${t})`,"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K})},{values:e("backdropBrightness")})},backdropContrast:({matchUtilities:i,theme:e})=>{i({"backdrop-contrast":t=>({"--tw-backdrop-contrast":`contrast(${t})`,"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K})},{values:e("backdropContrast")})},backdropGrayscale:({matchUtilities:i,theme:e})=>{i({"backdrop-grayscale":t=>({"--tw-backdrop-grayscale":`grayscale(${t})`,"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K})},{values:e("backdropGrayscale")})},backdropHueRotate:({matchUtilities:i,theme:e})=>{i({"backdrop-hue-rotate":t=>({"--tw-backdrop-hue-rotate":`hue-rotate(${t})`,"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K})},{values:e("backdropHueRotate"),supportsNegativeValues:!0})},backdropInvert:({matchUtilities:i,theme:e})=>{i({"backdrop-invert":t=>({"--tw-backdrop-invert":`invert(${t})`,"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K})},{values:e("backdropInvert")})},backdropOpacity:({matchUtilities:i,theme:e})=>{i({"backdrop-opacity":t=>({"--tw-backdrop-opacity":`opacity(${t})`,"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K})},{values:e("backdropOpacity")})},backdropSaturate:({matchUtilities:i,theme:e})=>{i({"backdrop-saturate":t=>({"--tw-backdrop-saturate":`saturate(${t})`,"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K})},{values:e("backdropSaturate")})},backdropSepia:({matchUtilities:i,theme:e})=>{i({"backdrop-sepia":t=>({"--tw-backdrop-sepia":`sepia(${t})`,"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K})},{values:e("backdropSepia")})},backdropFilter:({addDefaults:i,addUtilities:e})=>{i("backdrop-filter",{"--tw-backdrop-blur":" ","--tw-backdrop-brightness":" ","--tw-backdrop-contrast":" ","--tw-backdrop-grayscale":" ","--tw-backdrop-hue-rotate":" ","--tw-backdrop-invert":" ","--tw-backdrop-opacity":" ","--tw-backdrop-saturate":" ","--tw-backdrop-sepia":" "}),e({".backdrop-filter":{"@defaults backdrop-filter":{},"-webkit-backdrop-filter":K,"backdrop-filter":K},".backdrop-filter-none":{"-webkit-backdrop-filter":"none","backdrop-filter":"none"}})},transitionProperty:({matchUtilities:i,theme:e})=>{let t=e("transitionTimingFunction.DEFAULT"),r=e("transitionDuration.DEFAULT");i({transition:n=>({"transition-property":n,...n==="none"?{}:{"transition-timing-function":t,"transition-duration":r}})},{values:e("transitionProperty")})},transitionDelay:P("transitionDelay",[["delay",["transitionDelay"]]]),transitionDuration:P("transitionDuration",[["duration",["transitionDuration"]]],{filterDefault:!0}),transitionTimingFunction:P("transitionTimingFunction",[["ease",["transitionTimingFunction"]]],{filterDefault:!0}),willChange:P("willChange",[["will-change",["will-change"]]]),contain:({addDefaults:i,addUtilities:e})=>{let t="var(--tw-contain-size) var(--tw-contain-layout) var(--tw-contain-paint) var(--tw-contain-style)";i("contain",{"--tw-contain-size":" ","--tw-contain-layout":" ","--tw-contain-paint":" ","--tw-contain-style":" "}),e({".contain-none":{contain:"none"},".contain-content":{contain:"content"},".contain-strict":{contain:"strict"},".contain-size":{"@defaults contain":{},"--tw-contain-size":"size",contain:t},".contain-inline-size":{"@defaults contain":{},"--tw-contain-size":"inline-size",contain:t},".contain-layout":{"@defaults contain":{},"--tw-contain-layout":"layout",contain:t},".contain-paint":{"@defaults contain":{},"--tw-contain-paint":"paint",contain:t},".contain-style":{"@defaults contain":{},"--tw-contain-style":"style",contain:t}})},content:P("content",[["content",["--tw-content",["content","var(--tw-content)"]]]]),forcedColorAdjust:({addUtilities:i})=>{i({".forced-color-adjust-auto":{"forced-color-adjust":"auto"},".forced-color-adjust-none":{"forced-color-adjust":"none"}})}}});function KS(i){if(i===void 0)return!1;if(i==="true"||i==="1")return!0;if(i==="false"||i==="0")return!1;if(i==="*")return!0;let e=i.split(",").map(t=>t.split(":")[0]);return e.includes("-tailwindcss")?!1:!!e.includes("tailwindcss")}var De,gd,yd,gn,Ga,He,Kr,lt=C(()=>{l();De=typeof h!="undefined"?{NODE_ENV:"production",DEBUG:KS(h.env.DEBUG)}:{NODE_ENV:"production",DEBUG:!1},gd=new Map,yd=new Map,gn=new Map,Ga=new Map,He=new String("*"),Kr=Symbol("__NONE__")});function Lt(i){let e=[],t=!1;for(let r=0;r<i.length;r++){let n=i[r];if(n===":"&&!t&&e.length===0)return!1;if(ZS.has(n)&&i[r-1]!=="\\"&&(t=!t),!t&&i[r-1]!=="\\"){if(wd.has(n))e.push(n);else if(bd.has(n)){let a=bd.get(n);if(e.length<=0||e.pop()!==a)return!1}}}return!(e.length>0)}var wd,bd,ZS,Ha=C(()=>{l();wd=new Map([["{","}"],["[","]"],["(",")"]]),bd=new Map(Array.from(wd.entries()).map(([i,e])=>[e,i])),ZS=new Set(['"',"'","`"])});function $t(i){let[e]=vd(i);return e.forEach(([t,r])=>t.removeChild(r)),i.nodes.push(...e.map(([,t])=>t)),i}function vd(i){let e=[],t=null;for(let r of i.nodes)if(r.type==="combinator")e=e.filter(([,n])=>Qa(n).includes("jumpable")),t=null;else if(r.type==="pseudo"){eC(r)?(t=r,e.push([i,r,null])):t&&tC(r,t)?e.push([i,r,t]):t=null;for(let n of r.nodes??[]){let[a,s]=vd(n);t=s||t,e.push(...a)}}return[e,t]}function xd(i){return i.value.startsWith("::")||Ya[i.value]!==void 0}function eC(i){return xd(i)&&Qa(i).includes("terminal")}function tC(i,e){return i.type!=="pseudo"||xd(i)?!1:Qa(e).includes("actionable")}function Qa(i){return Ya[i.value]??Ya.__default__}var Ya,yn=C(()=>{l();Ya={"::after":["terminal","jumpable"],"::backdrop":["terminal","jumpable"],"::before":["terminal","jumpable"],"::cue":["terminal"],"::cue-region":["terminal"],"::first-letter":["terminal","jumpable"],"::first-line":["terminal","jumpable"],"::grammar-error":["terminal"],"::marker":["terminal","jumpable"],"::part":["terminal","actionable"],"::placeholder":["terminal","jumpable"],"::selection":["terminal","jumpable"],"::slotted":["terminal"],"::spelling-error":["terminal"],"::target-text":["terminal"],"::file-selector-button":["terminal","actionable"],"::deep":["actionable"],"::v-deep":["actionable"],"::ng-deep":["actionable"],":after":["terminal","jumpable"],":before":["terminal","jumpable"],":first-letter":["terminal","jumpable"],":first-line":["terminal","jumpable"],":where":[],":is":[],":has":[],__default__:["terminal","actionable"]}});function jt(i,{context:e,candidate:t}){let r=e?.tailwindConfig.prefix??"",n=i.map(s=>{let o=(0,Ne.default)().astSync(s.format);return{...s,ast:s.respectPrefix?Ft(r,o):o}}),a=Ne.default.root({nodes:[Ne.default.selector({nodes:[Ne.default.className({value:pe(t)})]})]});for(let{ast:s}of n)[a,s]=iC(a,s),s.walkNesting(o=>o.replaceWith(...a.nodes[0].nodes)),a=s;return a}function Sd(i){let e=[];for(;i.prev()&&i.prev().type!=="combinator";)i=i.prev();for(;i&&i.type!=="combinator";)e.push(i),i=i.next();return e}function rC(i){return i.sort((e,t)=>e.type==="tag"&&t.type==="class"?-1:e.type==="class"&&t.type==="tag"?1:e.type==="class"&&t.type==="pseudo"&&t.value.startsWith("::")?-1:e.type==="pseudo"&&e.value.startsWith("::")&&t.type==="class"?1:i.index(e)-i.index(t)),i}function Xa(i,e){let t=!1;i.walk(r=>{if(r.type==="class"&&r.value===e)return t=!0,!1}),t||i.remove()}function wn(i,e,{context:t,candidate:r,base:n}){let a=t?.tailwindConfig?.separator??":";n=n??ie(r,a).pop();let s=(0,Ne.default)().astSync(i);if(s.walkClasses(f=>{f.raws&&f.value.includes(n)&&(f.raws.value=pe((0,kd.default)(f.raws.value)))}),s.each(f=>Xa(f,n)),s.length===0)return null;let o=Array.isArray(e)?jt(e,{context:t,candidate:r}):e;if(o===null)return s.toString();let u=Ne.default.comment({value:"/*__simple__*/"}),c=Ne.default.comment({value:"/*__simple__*/"});return s.walkClasses(f=>{if(f.value!==n)return;let d=f.parent,p=o.nodes[0].nodes;if(d.nodes.length===1){f.replaceWith(...p);return}let m=Sd(f);d.insertBefore(m[0],u),d.insertAfter(m[m.length-1],c);for(let x of p)d.insertBefore(m[0],x.clone());f.remove(),m=Sd(u);let b=d.index(u);d.nodes.splice(b,m.length,...rC(Ne.default.selector({nodes:m})).nodes),u.remove(),c.remove()}),s.walkPseudos(f=>{f.value===Ja&&f.replaceWith(f.nodes)}),s.each(f=>$t(f)),s.toString()}function iC(i,e){let t=[];return i.walkPseudos(r=>{r.value===Ja&&t.push({pseudo:r,value:r.nodes[0].toString()})}),e.walkPseudos(r=>{if(r.value!==Ja)return;let n=r.nodes[0].toString(),a=t.find(c=>c.value===n);if(!a)return;let s=[],o=r.next();for(;o&&o.type!=="combinator";)s.push(o),o=o.next();let u=o;a.pseudo.parent.insertAfter(a.pseudo,Ne.default.selector({nodes:s.map(c=>c.clone())})),r.remove(),s.forEach(c=>c.remove()),u&&u.type==="combinator"&&u.remove()}),[i,e]}var Ne,kd,Ja,Ka=C(()=>{l();Ne=X(Be()),kd=X(Yi());Nt();un();yn();yt();Ja=":merge"});function bn(i,e){let t=(0,Za.default)().astSync(i);return t.each(r=>{r.nodes[0].type==="pseudo"&&r.nodes[0].value===":is"&&r.nodes.every(a=>a.type!=="combinator")||(r.nodes=[Za.default.pseudo({value:":is",nodes:[r.clone()]})]),$t(r)}),`${e} ${t.toString()}`}var Za,eo=C(()=>{l();Za=X(Be());yn()});function to(i){return nC.transformSync(i)}function*sC(i){let e=1/0;for(;e>=0;){let t,r=!1;if(e===1/0&&i.endsWith("]")){let s=i.indexOf("[");i[s-1]==="-"?t=s-1:i[s-1]==="/"?(t=s-1,r=!0):t=-1}else e===1/0&&i.includes("/")?(t=i.lastIndexOf("/"),r=!0):t=i.lastIndexOf("-",e);if(t<0)break;let n=i.slice(0,t),a=i.slice(r?t:t+1);e=t-1,!(n===""||a==="/")&&(yield[n,a])}}function aC(i,e){if(i.length===0||e.tailwindConfig.prefix==="")return i;for(let t of i){let[r]=t;if(r.options.respectPrefix){let n=z.root({nodes:[t[1].clone()]}),a=t[1].raws.tailwind.classCandidate;n.walkRules(s=>{let o=a.startsWith("-");s.selector=Ft(e.tailwindConfig.prefix,s.selector,o)}),t[1]=n.nodes[0]}}return i}function oC(i,e){if(i.length===0)return i;let t=[];function r(n){return n.parent&&n.parent.type==="atrule"&&n.parent.name==="keyframes"}for(let[n,a]of i){let s=z.root({nodes:[a.clone()]});s.walkRules(o=>{if(r(o))return;let u=(0,vn.default)().astSync(o.selector);u.each(c=>Xa(c,e)),ju(u,c=>c===e?`!${c}`:c),o.selector=u.toString(),o.walkDecls(c=>c.important=!0)}),t.push([{...n,important:!0},s.nodes[0]])}return t}function lC(i,e,t){if(e.length===0)return e;let r={modifier:null,value:Kr};{let[n,...a]=ie(i,"/");if(a.length>1&&(n=n+"/"+a.slice(0,-1).join("/"),a=a.slice(-1)),a.length&&!t.variantMap.has(i)&&(i=n,r.modifier=a[0],!Z(t.tailwindConfig,"generalizedModifiers")))return[]}if(i.endsWith("]")&&!i.startsWith("[")){let n=/(.)(-?)\[(.*)\]/g.exec(i);if(n){let[,a,s,o]=n;if(a==="@"&&s==="-")return[];if(a!=="@"&&s==="")return[];i=i.replace(`${s}[${o}]`,""),r.value=o}}if(no(i)&&!t.variantMap.has(i)){let n=t.offsets.recordVariant(i),a=N(i.slice(1,-1)),s=ie(a,",");if(s.length>1)return[];if(!s.every(Cn))return[];let o=s.map((u,c)=>[t.offsets.applyParallelOffset(n,c),Zr(u.trim())]);t.variantMap.set(i,o)}if(t.variantMap.has(i)){let n=no(i),a=t.variantOptions.get(i)?.[ot]??{},s=t.variantMap.get(i).slice(),o=[],u=(()=>!(n||a.respectPrefix===!1))();for(let[c,f]of e){if(c.layer==="user")continue;let d=z.root({nodes:[f.clone()]});for(let[p,m,b]of s){let w=function(){x.raws.neededBackup||(x.raws.neededBackup=!0,x.walkRules(E=>E.raws.originalSelector=E.selector))},k=function(E){return w(),x.each(I=>{I.type==="rule"&&(I.selectors=I.selectors.map(q=>E({get className(){return to(q)},selector:q})))}),x},x=(b??d).clone(),y=[],S=m({get container(){return w(),x},separator:t.tailwindConfig.separator,modifySelectors:k,wrap(E){let I=x.nodes;x.removeAll(),E.append(I),x.append(E)},format(E){y.push({format:E,respectPrefix:u})},args:r});if(Array.isArray(S)){for(let[E,I]of S.entries())s.push([t.offsets.applyParallelOffset(p,E),I,x.clone()]);continue}if(typeof S=="string"&&y.push({format:S,respectPrefix:u}),S===null)continue;x.raws.neededBackup&&(delete x.raws.neededBackup,x.walkRules(E=>{let I=E.raws.originalSelector;if(!I||(delete E.raws.originalSelector,I===E.selector))return;let q=E.selector,R=(0,vn.default)(J=>{J.walkClasses(fe=>{fe.value=`${i}${t.tailwindConfig.separator}${fe.value}`})}).processSync(I);y.push({format:q.replace(R,"&"),respectPrefix:u}),E.selector=I})),x.nodes[0].raws.tailwind={...x.nodes[0].raws.tailwind,parentLayer:c.layer};let _=[{...c,sort:t.offsets.applyVariantOffset(c.sort,p,Object.assign(r,t.variantOptions.get(i))),collectedFormats:(c.collectedFormats??[]).concat(y)},x.nodes[0]];o.push(_)}}return o}return[]}function ro(i,e,t={}){return!se(i)&&!Array.isArray(i)?[[i],t]:Array.isArray(i)?ro(i[0],e,i[1]):(e.has(i)||e.set(i,Bt(i)),[e.get(i),t])}function fC(i){return uC.test(i)}function cC(i){if(!i.includes("://"))return!1;try{let e=new URL(i);return e.scheme!==""&&e.host!==""}catch(e){return!1}}function Cd(i){let e=!0;return i.walkDecls(t=>{if(!Ad(t.prop,t.value))return e=!1,!1}),e}function Ad(i,e){if(cC(`${i}:${e}`))return!1;try{return z.parse(`a{${i}:${e}}`).toResult(),!0}catch(t){return!1}}function pC(i,e){let[,t,r]=i.match(/^\[([a-zA-Z0-9-_]+):(\S+)\]$/)??[];if(r===void 0||!fC(t)||!Lt(r))return null;let n=N(r,{property:t});return Ad(t,n)?[[{sort:e.offsets.arbitraryProperty(i),layer:"utilities",options:{respectImportant:!0}},()=>({[Va(i)]:{[t]:n}})]]:null}function*dC(i,e){e.candidateRuleMap.has(i)&&(yield[e.candidateRuleMap.get(i),"DEFAULT"]),yield*function*(o){o!==null&&(yield[o,"DEFAULT"])}(pC(i,e));let t=i,r=!1,n=e.tailwindConfig.prefix,a=n.length,s=t.startsWith(n)||t.startsWith(`-${n}`);t[a]==="-"&&s&&(r=!0,t=n+t.slice(a+1)),r&&e.candidateRuleMap.has(t)&&(yield[e.candidateRuleMap.get(t),"-DEFAULT"]);for(let[o,u]of sC(t))e.candidateRuleMap.has(o)&&(yield[e.candidateRuleMap.get(o),r?`-${u}`:u])}function hC(i,e){return i===He?[He]:ie(i,e)}function*mC(i,e){for(let t of i)t[1].raws.tailwind={...t[1].raws.tailwind,classCandidate:e,preserveSource:t[0].options?.preserveSource??!1},yield t}function*io(i,e){let t=e.tailwindConfig.separator,[r,...n]=hC(i,t).reverse(),a=!1;r.startsWith("!")&&(a=!0,r=r.slice(1));for(let s of dC(r,e)){let o=[],u=new Map,[c,f]=s,d=c.length===1;for(let[p,m]of c){let b=[];if(typeof m=="function")for(let x of[].concat(m(f,{isOnlyPlugin:d}))){let[y,w]=ro(x,e.postCssNodeCache);for(let k of y)b.push([{...p,options:{...p.options,...w}},k])}else if(f==="DEFAULT"||f==="-DEFAULT"){let x=m,[y,w]=ro(x,e.postCssNodeCache);for(let k of y)b.push([{...p,options:{...p.options,...w}},k])}if(b.length>0){let x=Array.from(fs(p.options?.types??[],f,p.options??{},e.tailwindConfig)).map(([y,w])=>w);x.length>0&&u.set(b,x),o.push(b)}}if(no(f)){if(o.length>1){let b=function(y){return y.length===1?y[0]:y.find(w=>{let k=u.get(w);return w.some(([{options:S},_])=>Cd(_)?S.types.some(({type:E,preferOnConflict:I})=>k.includes(E)&&I):!1)})},[p,m]=o.reduce((y,w)=>(w.some(([{options:S}])=>S.types.some(({type:_})=>_==="any"))?y[0].push(w):y[1].push(w),y),[[],[]]),x=b(m)??b(p);if(x)o=[x];else{let y=o.map(k=>new Set([...u.get(k)??[]]));for(let k of y)for(let S of k){let _=!1;for(let E of y)k!==E&&E.has(S)&&(E.delete(S),_=!0);_&&k.delete(S)}let w=[];for(let[k,S]of y.entries())for(let _ of S){let E=o[k].map(([,I])=>I).flat().map(I=>I.toString().split(`
`).slice(1,-1).map(q=>q.trim()).map(q=>`      ${q}`).join(`
`)).join(`

`);w.push(`  Use \`${i.replace("[",`[${_}:`)}\` for \`${E.trim()}\``);break}F.warn([`The class \`${i}\` is ambiguous and matches multiple utilities.`,...w,`If this is content and not a class, replace it with \`${i.replace("[","&lsqb;").replace("]","&rsqb;")}\` to silence this warning.`]);continue}}o=o.map(p=>p.filter(m=>Cd(m[1])))}o=o.flat(),o=Array.from(mC(o,r)),o=aC(o,e),a&&(o=oC(o,r));for(let p of n)o=lC(p,o,e);for(let p of o)p[1].raws.tailwind={...p[1].raws.tailwind,candidate:i},p=gC(p,{context:e,candidate:i}),p!==null&&(yield p)}}function gC(i,{context:e,candidate:t}){if(!i[0].collectedFormats)return i;let r=!0,n;try{n=jt(i[0].collectedFormats,{context:e,candidate:t})}catch{return null}let a=z.root({nodes:[i[1].clone()]});return a.walkRules(s=>{if(!xn(s))try{let o=wn(s.selector,n,{candidate:t,context:e});if(o===null){s.remove();return}s.selector=o}catch{return r=!1,!1}}),!r||a.nodes.length===0?null:(i[1]=a.nodes[0],i)}function xn(i){return i.parent&&i.parent.type==="atrule"&&i.parent.name==="keyframes"}function yC(i){if(i===!0)return e=>{xn(e)||e.walkDecls(t=>{t.parent.type==="rule"&&!xn(t.parent)&&(t.important=!0)})};if(typeof i=="string")return e=>{xn(e)||(e.selectors=e.selectors.map(t=>bn(t,i)))}}function kn(i,e,t=!1){let r=[],n=yC(e.tailwindConfig.important);for(let a of i){if(e.notClassCache.has(a))continue;if(e.candidateRuleCache.has(a)){r=r.concat(Array.from(e.candidateRuleCache.get(a)));continue}let s=Array.from(io(a,e));if(s.length===0){e.notClassCache.add(a);continue}e.classCache.set(a,s);let o=e.candidateRuleCache.get(a)??new Set;e.candidateRuleCache.set(a,o);for(let u of s){let[{sort:c,options:f},d]=u;if(f.respectImportant&&n){let m=z.root({nodes:[d.clone()]});m.walkRules(n),d=m.nodes[0]}let p=[c,t?d.clone():d];o.add(p),e.ruleCache.add(p),r.push(p)}}return r}function no(i){return i.startsWith("[")&&i.endsWith("]")}var vn,nC,uC,Sn=C(()=>{l();nt();vn=X(Be());za();Ct();un();pr();Ee();lt();Ka();Ua();cr();Xr();Ha();yt();ze();eo();nC=(0,vn.default)(i=>i.first.filter(({type:e})=>e==="class").pop().value);uC=/^[a-z_-]/});var _d,Od=C(()=>{l();_d={}});function wC(i){try{return _d.createHash("md5").update(i,"utf-8").digest("binary")}catch(e){return""}}function Ed(i,e){let t=e.toString();if(!t.includes("@tailwind"))return!1;let r=Ga.get(i),n=wC(t),a=r!==n;return Ga.set(i,n),a}var Td=C(()=>{l();Od();lt()});function An(i){return(i>0n)-(i<0n)}var Pd=C(()=>{l()});function Dd(i,e){let t=0n,r=0n;for(let[n,a]of e)i&n&&(t=t|n,r=r|a);return i&~t|r}var Id=C(()=>{l()});function qd(i){let e=null;for(let t of i)e=e??t,e=e>t?e:t;return e}function bC(i,e){let t=i.length,r=e.length,n=t<r?t:r;for(let a=0;a<n;a++){let s=i.charCodeAt(a)-e.charCodeAt(a);if(s!==0)return s}return t-r}var so,Rd=C(()=>{l();Pd();Id();so=class{constructor(){this.offsets={defaults:0n,base:0n,components:0n,utilities:0n,variants:0n,user:0n},this.layerPositions={defaults:0n,base:1n,components:2n,utilities:3n,user:4n,variants:5n},this.reservedVariantBits=0n,this.variantOffsets=new Map}create(e){return{layer:e,parentLayer:e,arbitrary:0n,variants:0n,parallelIndex:0n,index:this.offsets[e]++,propertyOffset:0n,property:"",options:[]}}arbitraryProperty(e){return{...this.create("utilities"),arbitrary:1n,property:e}}forVariant(e,t=0){let r=this.variantOffsets.get(e);if(r===void 0)throw new Error(`Cannot find offset for unknown variant ${e}`);return{...this.create("variants"),variants:r<<BigInt(t)}}applyVariantOffset(e,t,r){return r.variant=t.variants,{...e,layer:"variants",parentLayer:e.layer==="variants"?e.parentLayer:e.layer,variants:e.variants|t.variants,options:r.sort?[].concat(r,e.options):e.options,parallelIndex:qd([e.parallelIndex,t.parallelIndex])}}applyParallelOffset(e,t){return{...e,parallelIndex:BigInt(t)}}recordVariants(e,t){for(let r of e)this.recordVariant(r,t(r))}recordVariant(e,t=1){return this.variantOffsets.set(e,1n<<this.reservedVariantBits),this.reservedVariantBits+=BigInt(t),{...this.create("variants"),variants:this.variantOffsets.get(e)}}compare(e,t){if(e.layer!==t.layer)return this.layerPositions[e.layer]-this.layerPositions[t.layer];if(e.parentLayer!==t.parentLayer)return this.layerPositions[e.parentLayer]-this.layerPositions[t.parentLayer];for(let r of e.options)for(let n of t.options){if(r.id!==n.id||!r.sort||!n.sort)continue;let a=qd([r.variant,n.variant])??0n,s=~(a|a-1n),o=e.variants&s,u=t.variants&s;if(o!==u)continue;let c=r.sort({value:r.value,modifier:r.modifier},{value:n.value,modifier:n.modifier});if(c!==0)return c}return e.variants!==t.variants?e.variants-t.variants:e.parallelIndex!==t.parallelIndex?e.parallelIndex-t.parallelIndex:e.arbitrary!==t.arbitrary?e.arbitrary-t.arbitrary:e.propertyOffset!==t.propertyOffset?e.propertyOffset-t.propertyOffset:e.index-t.index}recalculateVariantOffsets(){let e=Array.from(this.variantOffsets.entries()).filter(([n])=>n.startsWith("[")).sort(([n],[a])=>bC(n,a)),t=e.map(([,n])=>n).sort((n,a)=>An(n-a));return e.map(([,n],a)=>[n,t[a]]).filter(([n,a])=>n!==a)}remapArbitraryVariantOffsets(e){let t=this.recalculateVariantOffsets();return t.length===0?e:e.map(r=>{let[n,a]=r;return n={...n,variants:Dd(n.variants,t)},[n,a]})}sortArbitraryProperties(e){let t=new Set;for(let[s]of e)s.arbitrary===1n&&t.add(s.property);if(t.size===0)return e;let r=Array.from(t).sort(),n=new Map,a=1n;for(let s of r)n.set(s,a++);return e.map(s=>{let[o,u]=s;return o={...o,propertyOffset:n.get(o.property)??0n},[o,u]})}sort(e){return e=this.remapArbitraryVariantOffsets(e),e=this.sortArbitraryProperties(e),e.sort(([t],[r])=>An(this.compare(t,r)))}}});function uo(i,e){let t=i.tailwindConfig.prefix;return typeof t=="function"?t(e):t+e}function Bd({type:i="any",...e}){let t=[].concat(i);return{...e,types:t.map(r=>Array.isArray(r)?{type:r[0],...r[1]}:{type:r,preferOnConflict:!1})}}function vC(i){let e=[],t="",r=0;for(let n=0;n<i.length;n++){let a=i[n];if(a==="\\")t+="\\"+i[++n];else if(a==="{")++r,e.push(t.trim()),t="";else if(a==="}"){if(--r<0)throw new Error("Your { and } are unbalanced.");e.push(t.trim()),t=""}else t+=a}return t.length>0&&e.push(t.trim()),e=e.filter(n=>n!==""),e}function xC(i,e,{before:t=[]}={}){if(t=[].concat(t),t.length<=0){i.push(e);return}let r=i.length-1;for(let n of t){let a=i.indexOf(n);a!==-1&&(r=Math.min(r,a))}i.splice(r,0,e)}function Fd(i){return Array.isArray(i)?i.flatMap(e=>!Array.isArray(e)&&!se(e)?e:Bt(e)):Fd([i])}function kC(i,e){return(0,ao.default)(r=>{let n=[];return e&&e(r),r.walkClasses(a=>{n.push(a.value)}),n}).transformSync(i)}function SC(i){i.walkPseudos(e=>{e.value===":not"&&e.remove()})}function CC(i,e={containsNonOnDemandable:!1},t=0){let r=[],n=[];i.type==="rule"?n.push(...i.selectors):i.type==="atrule"&&i.walkRules(a=>n.push(...a.selectors));for(let a of n){let s=kC(a,SC);s.length===0&&(e.containsNonOnDemandable=!0);for(let o of s)r.push(o)}return t===0?[e.containsNonOnDemandable||r.length===0,r]:r}function _n(i){return Fd(i).flatMap(e=>{let t=new Map,[r,n]=CC(e);return r&&n.unshift(He),n.map(a=>(t.has(e)||t.set(e,e),[a,t.get(e)]))})}function Cn(i){return i.startsWith("@")||i.includes("&")}function Zr(i){i=i.replace(/\n+/g,"").replace(/\s{1,}/g," ").trim();let e=vC(i).map(t=>{if(!t.startsWith("@"))return({format:a})=>a(t);let[,r,n]=/@(\S*)( .+|[({].*)?/g.exec(t);return({wrap:a})=>a(z.atRule({name:r,params:n?.trim()??""}))}).reverse();return t=>{for(let r of e)r(t)}}function AC(i,e,{variantList:t,variantMap:r,offsets:n,classList:a}){function s(p,m){return p?(0,Md.default)(i,p,m):i}function o(p){return Ft(i.prefix,p)}function u(p,m){return p===He?He:m.respectPrefix?e.tailwindConfig.prefix+p:p}function c(p,m,b={}){let x=Ke(p),y=s(["theme",...x],m);return Ge(x[0])(y,b)}let f=0,d={postcss:z,prefix:o,e:pe,config:s,theme:c,corePlugins:p=>Array.isArray(i.corePlugins)?i.corePlugins.includes(p):s(["corePlugins",p],!0),variants:()=>[],addBase(p){for(let[m,b]of _n(p)){let x=u(m,{}),y=n.create("base");e.candidateRuleMap.has(x)||e.candidateRuleMap.set(x,[]),e.candidateRuleMap.get(x).push([{sort:y,layer:"base"},b])}},addDefaults(p,m){let b={[`@defaults ${p}`]:m};for(let[x,y]of _n(b)){let w=u(x,{});e.candidateRuleMap.has(w)||e.candidateRuleMap.set(w,[]),e.candidateRuleMap.get(w).push([{sort:n.create("defaults"),layer:"defaults"},y])}},addComponents(p,m){m=Object.assign({},{preserveSource:!1,respectPrefix:!0,respectImportant:!1},Array.isArray(m)?{}:m);for(let[x,y]of _n(p)){let w=u(x,m);a.add(w),e.candidateRuleMap.has(w)||e.candidateRuleMap.set(w,[]),e.candidateRuleMap.get(w).push([{sort:n.create("components"),layer:"components",options:m},y])}},addUtilities(p,m){m=Object.assign({},{preserveSource:!1,respectPrefix:!0,respectImportant:!0},Array.isArray(m)?{}:m);for(let[x,y]of _n(p)){let w=u(x,m);a.add(w),e.candidateRuleMap.has(w)||e.candidateRuleMap.set(w,[]),e.candidateRuleMap.get(w).push([{sort:n.create("utilities"),layer:"utilities",options:m},y])}},matchUtilities:function(p,m){m=Bd({...{respectPrefix:!0,respectImportant:!0,modifiers:!1},...m});let x=n.create("utilities");for(let y in p){let S=function(E,{isOnlyPlugin:I}){let[q,R,J]=us(m.types,E,m,i);if(q===void 0)return[];if(!m.types.some(({type:te})=>te===R))if(I)F.warn([`Unnecessary typehint \`${R}\` in \`${y}-${E}\`.`,`You can safely update it to \`${y}-${E.replace(R+":","")}\`.`]);else return[];if(!Lt(q))return[];let fe={get modifier(){return m.modifiers||F.warn(`modifier-used-without-options-for-${y}`,["Your plugin must set `modifiers: true` in its options to support modifiers."]),J}},he=Z(i,"generalizedModifiers");return[].concat(he?k(q,fe):k(q)).filter(Boolean).map(te=>({[fn(y,E)]:te}))},w=u(y,m),k=p[y];a.add([w,m]);let _=[{sort:x,layer:"utilities",options:m},S];e.candidateRuleMap.has(w)||e.candidateRuleMap.set(w,[]),e.candidateRuleMap.get(w).push(_)}},matchComponents:function(p,m){m=Bd({...{respectPrefix:!0,respectImportant:!1,modifiers:!1},...m});let x=n.create("components");for(let y in p){let S=function(E,{isOnlyPlugin:I}){let[q,R,J]=us(m.types,E,m,i);if(q===void 0)return[];if(!m.types.some(({type:te})=>te===R))if(I)F.warn([`Unnecessary typehint \`${R}\` in \`${y}-${E}\`.`,`You can safely update it to \`${y}-${E.replace(R+":","")}\`.`]);else return[];if(!Lt(q))return[];let fe={get modifier(){return m.modifiers||F.warn(`modifier-used-without-options-for-${y}`,["Your plugin must set `modifiers: true` in its options to support modifiers."]),J}},he=Z(i,"generalizedModifiers");return[].concat(he?k(q,fe):k(q)).filter(Boolean).map(te=>({[fn(y,E)]:te}))},w=u(y,m),k=p[y];a.add([w,m]);let _=[{sort:x,layer:"components",options:m},S];e.candidateRuleMap.has(w)||e.candidateRuleMap.set(w,[]),e.candidateRuleMap.get(w).push(_)}},addVariant(p,m,b={}){m=[].concat(m).map(x=>{if(typeof x!="string")return(y={})=>{let{args:w,modifySelectors:k,container:S,separator:_,wrap:E,format:I}=y,q=x(Object.assign({modifySelectors:k,container:S,separator:_},b.type===oo.MatchVariant&&{args:w,wrap:E,format:I}));if(typeof q=="string"&&!Cn(q))throw new Error(`Your custom variant \`${p}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`);return Array.isArray(q)?q.filter(R=>typeof R=="string").map(R=>Zr(R)):q&&typeof q=="string"&&Zr(q)(y)};if(!Cn(x))throw new Error(`Your custom variant \`${p}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`);return Zr(x)}),xC(t,p,b),r.set(p,m),e.variantOptions.set(p,b)},matchVariant(p,m,b){let x=b?.id??++f,y=p==="@",w=Z(i,"generalizedModifiers");for(let[S,_]of Object.entries(b?.values??{}))S!=="DEFAULT"&&d.addVariant(y?`${p}${S}`:`${p}-${S}`,({args:E,container:I})=>m(_,w?{modifier:E?.modifier,container:I}:{container:I}),{...b,value:_,id:x,type:oo.MatchVariant,variantInfo:lo.Base});let k="DEFAULT"in(b?.values??{});d.addVariant(p,({args:S,container:_})=>S?.value===Kr&&!k?null:m(S?.value===Kr?b.values.DEFAULT:S?.value??(typeof S=="string"?S:""),w?{modifier:S?.modifier,container:_}:{container:_}),{...b,id:x,type:oo.MatchVariant,variantInfo:lo.Dynamic})}};return d}function On(i){return fo.has(i)||fo.set(i,new Map),fo.get(i)}function Nd(i,e){let t=!1,r=new Map;for(let n of i){if(!n)continue;let a=gs.parse(n),s=a.hash?a.href.replace(a.hash,""):a.href;s=a.search?s.replace(a.search,""):s;let o=re.statSync(decodeURIComponent(s),{throwIfNoEntry:!1})?.mtimeMs;!o||((!e.has(n)||o>e.get(n))&&(t=!0),r.set(n,o))}return[t,r]}function Ld(i){i.walkAtRules(e=>{["responsive","variants"].includes(e.name)&&(Ld(e),e.before(e.nodes),e.remove())})}function _C(i){let e=[];return i.each(t=>{t.type==="atrule"&&["responsive","variants"].includes(t.name)&&(t.name="layer",t.params="utilities")}),i.walkAtRules("layer",t=>{if(Ld(t),t.params==="base"){for(let r of t.nodes)e.push(function({addBase:n}){n(r,{respectPrefix:!1})});t.remove()}else if(t.params==="components"){for(let r of t.nodes)e.push(function({addComponents:n}){n(r,{respectPrefix:!1,preserveSource:!0})});t.remove()}else if(t.params==="utilities"){for(let r of t.nodes)e.push(function({addUtilities:n}){n(r,{respectPrefix:!1,preserveSource:!0})});t.remove()}}),e}function OC(i,e){let t=Object.entries({...H,...hd}).map(([u,c])=>i.tailwindConfig.corePlugins.includes(u)?c:null).filter(Boolean),r=i.tailwindConfig.plugins.map(u=>(u.__isOptionsFunction&&(u=u()),typeof u=="function"?u:u.handler)),n=_C(e),a=[H.childVariant,H.pseudoElementVariants,H.pseudoClassVariants,H.hasVariants,H.ariaVariants,H.dataVariants],s=[H.supportsVariants,H.reducedMotionVariants,H.prefersContrastVariants,H.screenVariants,H.orientationVariants,H.directionVariants,H.darkVariants,H.forcedColorsVariants,H.printVariant];return(i.tailwindConfig.darkMode==="class"||Array.isArray(i.tailwindConfig.darkMode)&&i.tailwindConfig.darkMode[0]==="class")&&(s=[H.supportsVariants,H.reducedMotionVariants,H.prefersContrastVariants,H.darkVariants,H.screenVariants,H.orientationVariants,H.directionVariants,H.forcedColorsVariants,H.printVariant]),[...t,...a,...r,...s,...n]}function EC(i,e){let t=[],r=new Map;e.variantMap=r;let n=new so;e.offsets=n;let a=new Set,s=AC(e.tailwindConfig,e,{variantList:t,variantMap:r,offsets:n,classList:a});for(let f of i)if(Array.isArray(f))for(let d of f)d(s);else f?.(s);n.recordVariants(t,f=>r.get(f).length);for(let[f,d]of r.entries())e.variantMap.set(f,d.map((p,m)=>[n.forVariant(f,m),p]));let o=(e.tailwindConfig.safelist??[]).filter(Boolean);if(o.length>0){let f=[];for(let d of o){if(typeof d=="string"){e.changedContent.push({content:d,extension:"html"});continue}if(d instanceof RegExp){F.warn("root-regex",["Regular expressions in `safelist` work differently in Tailwind CSS v3.0.","Update your `safelist` configuration to eliminate this warning.","https://tailwindcss.com/docs/content-configuration#safelisting-classes"]);continue}f.push(d)}if(f.length>0){let d=new Map,p=e.tailwindConfig.prefix.length,m=f.some(b=>b.pattern.source.includes("!"));for(let b of a){let x=Array.isArray(b)?(()=>{let[y,w]=b,S=Object.keys(w?.values??{}).map(_=>Jr(y,_));return w?.supportsNegativeValues&&(S=[...S,...S.map(_=>"-"+_)],S=[...S,...S.map(_=>_.slice(0,p)+"-"+_.slice(p))]),w.types.some(({type:_})=>_==="color")&&(S=[...S,...S.flatMap(_=>Object.keys(e.tailwindConfig.theme.opacity).map(E=>`${_}/${E}`))]),m&&w?.respectImportant&&(S=[...S,...S.map(_=>"!"+_)]),S})():[b];for(let y of x)for(let{pattern:w,variants:k=[]}of f)if(w.lastIndex=0,d.has(w)||d.set(w,0),!!w.test(y)){d.set(w,d.get(w)+1),e.changedContent.push({content:y,extension:"html"});for(let S of k)e.changedContent.push({content:S+e.tailwindConfig.separator+y,extension:"html"})}}for(let[b,x]of d.entries())x===0&&F.warn([`The safelist pattern \`${b}\` doesn't match any Tailwind CSS classes.`,"Fix this pattern or remove it from your `safelist` configuration.","https://tailwindcss.com/docs/content-configuration#safelisting-classes"])}}let u=[].concat(e.tailwindConfig.darkMode??"media")[1]??"dark",c=[uo(e,u),uo(e,"group"),uo(e,"peer")];e.getClassOrder=function(d){let p=[...d].sort((y,w)=>y===w?0:y<w?-1:1),m=new Map(p.map(y=>[y,null])),b=kn(new Set(p),e,!0);b=e.offsets.sort(b);let x=BigInt(c.length);for(let[,y]of b){let w=y.raws.tailwind.candidate;m.set(w,m.get(w)??x++)}return d.map(y=>{let w=m.get(y)??null,k=c.indexOf(y);return w===null&&k!==-1&&(w=BigInt(k)),[y,w]})},e.getClassList=function(d={}){let p=[];for(let m of a)if(Array.isArray(m)){let[b,x]=m,y=[],w=Object.keys(x?.modifiers??{});x?.types?.some(({type:_})=>_==="color")&&w.push(...Object.keys(e.tailwindConfig.theme.opacity??{}));let k={modifiers:w},S=d.includeMetadata&&w.length>0;for(let[_,E]of Object.entries(x?.values??{})){if(E==null)continue;let I=Jr(b,_);if(p.push(S?[I,k]:I),x?.supportsNegativeValues&&Xe(E)){let q=Jr(b,`-${_}`);y.push(S?[q,k]:q)}}p.push(...y)}else p.push(m);return p},e.getVariants=function(){let d=Math.random().toString(36).substring(7).toUpperCase(),p=[];for(let[m,b]of e.variantOptions.entries())b.variantInfo!==lo.Base&&p.push({name:m,isArbitrary:b.type===Symbol.for("MATCH_VARIANT"),values:Object.keys(b.values??{}),hasDash:m!=="@",selectors({modifier:x,value:y}={}){let w=`TAILWINDPLACEHOLDER${d}`,k=z.rule({selector:`.${w}`}),S=z.root({nodes:[k.clone()]}),_=S.toString(),E=(e.variantMap.get(m)??[]).flatMap(([le,me])=>me),I=[];for(let le of E){let me=[],ai={args:{modifier:x,value:b.values?.[y]??y},separator:e.tailwindConfig.separator,modifySelectors(Ae){return S.each(Yn=>{Yn.type==="rule"&&(Yn.selectors=Yn.selectors.map(su=>Ae({get className(){return to(su)},selector:su})))}),S},format(Ae){me.push(Ae)},wrap(Ae){me.push(`@${Ae.name} ${Ae.params} { & }`)},container:S},oi=le(ai);if(me.length>0&&I.push(me),Array.isArray(oi))for(let Ae of oi)me=[],Ae(ai),I.push(me)}let q=[],R=S.toString();_!==R&&(S.walkRules(le=>{let me=le.selector,ai=(0,ao.default)(oi=>{oi.walkClasses(Ae=>{Ae.value=`${m}${e.tailwindConfig.separator}${Ae.value}`})}).processSync(me);q.push(me.replace(ai,"&").replace(w,"&"))}),S.walkAtRules(le=>{q.push(`@${le.name} (${le.params}) { & }`)}));let J=!(y in(b.values??{})),fe=b[ot]??{},he=(()=>!(J||fe.respectPrefix===!1))();I=I.map(le=>le.map(me=>({format:me,respectPrefix:he}))),q=q.map(le=>({format:le,respectPrefix:he}));let Ie={candidate:w,context:e},te=I.map(le=>wn(`.${w}`,jt(le,Ie),Ie).replace(`.${w}`,"&").replace("{ & }","").trim());return q.length>0&&te.push(jt(q,Ie).toString().replace(`.${w}`,"&")),te}});return p}}function $d(i,e){!i.classCache.has(e)||(i.notClassCache.add(e),i.classCache.delete(e),i.applyClassCache.delete(e),i.candidateRuleMap.delete(e),i.candidateRuleCache.delete(e),i.stylesheetCache=null)}function TC(i,e){let t=e.raws.tailwind.candidate;if(!!t){for(let r of i.ruleCache)r[1].raws.tailwind.candidate===t&&i.ruleCache.delete(r);$d(i,t)}}function co(i,e=[],t=z.root()){let r={disposables:[],ruleCache:new Set,candidateRuleCache:new Map,classCache:new Map,applyClassCache:new Map,notClassCache:new Set(i.blocklist??[]),postCssNodeCache:new Map,candidateRuleMap:new Map,tailwindConfig:i,changedContent:e,variantMap:new Map,stylesheetCache:null,variantOptions:new Map,markInvalidUtilityCandidate:a=>$d(r,a),markInvalidUtilityNode:a=>TC(r,a)},n=OC(r,t);return EC(n,r),r}function jd(i,e,t,r,n,a){let s=e.opts.from,o=r!==null;De.DEBUG&&console.log("Source path:",s);let u;if(o&&zt.has(s))u=zt.get(s);else if(ei.has(n)){let p=ei.get(n);ut.get(p).add(s),zt.set(s,p),u=p}let c=Ed(s,i);if(u){let[p,m]=Nd([...a],On(u));if(!p&&!c)return[u,!1,m]}if(zt.has(s)){let p=zt.get(s);if(ut.has(p)&&(ut.get(p).delete(s),ut.get(p).size===0)){ut.delete(p);for(let[m,b]of ei)b===p&&ei.delete(m);for(let m of p.disposables.splice(0))m(p)}}De.DEBUG&&console.log("Setting up new context...");let f=co(t,[],i);Object.assign(f,{userConfigPath:r});let[,d]=Nd([...a],On(f));return ei.set(n,f),zt.set(s,f),ut.has(f)||ut.set(f,new Set),ut.get(f).add(s),[f,!0,d]}var Md,ao,ot,oo,lo,fo,zt,ei,ut,Xr=C(()=>{l();je();ys();nt();Md=X(Ls()),ao=X(Be());Yr();za();un();Ct();Nt();Ua();pr();md();lt();lt();pi();Ee();fi();Ha();Sn();Td();Rd();ze();Ka();ot=Symbol(),oo={AddVariant:Symbol.for("ADD_VARIANT"),MatchVariant:Symbol.for("MATCH_VARIANT")},lo={Base:1<<0,Dynamic:1<<1};fo=new WeakMap;zt=gd,ei=yd,ut=gn});function po(i){return i.ignore?[]:i.glob?h.env.ROLLUP_WATCH==="true"?[{type:"dependency",file:i.base}]:[{type:"dir-dependency",dir:i.base,glob:i.glob}]:[{type:"dependency",file:i.base}]}var zd=C(()=>{l()});function Vd(i,e){return{handler:i,config:e}}var Ud,Wd=C(()=>{l();Vd.withOptions=function(i,e=()=>({})){let t=function(r){return{__options:r,handler:i(r),config:e(r)}};return t.__isOptionsFunction=!0,t.__pluginFunction=i,t.__configFunction=e,t};Ud=Vd});var ho={};_e(ho,{default:()=>PC});var PC,mo=C(()=>{l();Wd();PC=Ud});var Hd=v((c6,Gd)=>{l();var DC=(mo(),ho).default,IC={overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical"},qC=DC(function({matchUtilities:i,addUtilities:e,theme:t,variants:r}){let n=t("lineClamp");i({"line-clamp":a=>({...IC,"-webkit-line-clamp":`${a}`})},{values:n}),e([{".line-clamp-none":{"-webkit-line-clamp":"unset"}}],r("lineClamp"))},{theme:{lineClamp:{1:"1",2:"2",3:"3",4:"4",5:"5",6:"6"}},variants:{lineClamp:["responsive"]}});Gd.exports=qC});function go(i){i.content.files.length===0&&F.warn("content-problems",["The `content` option in your Tailwind CSS configuration is missing or empty.","Configure your content sources or your generated CSS will be missing styles.","https://tailwindcss.com/docs/content-configuration"]);try{let e=Hd();i.plugins.includes(e)&&(F.warn("line-clamp-in-core",["As of Tailwind CSS v3.3, the `@tailwindcss/line-clamp` plugin is now included by default.","Remove it from the `plugins` array in your configuration to eliminate this warning."]),i.plugins=i.plugins.filter(t=>t!==e))}catch{}return i}var Yd=C(()=>{l();Ee()});var Qd,Jd=C(()=>{l();Qd=()=>!1});var En,Xd=C(()=>{l();En={sync:i=>[].concat(i),generateTasks:i=>[{dynamic:!1,base:".",negative:[],positive:[].concat(i),patterns:[].concat(i)}],escapePath:i=>i}});var yo,Kd=C(()=>{l();yo=i=>i});var Zd,eh=C(()=>{l();Zd=()=>""});function th(i){let e=i,t=Zd(i);return t!=="."&&(e=i.substr(t.length),e.charAt(0)==="/"&&(e=e.substr(1))),e.substr(0,2)==="./"?e=e.substr(2):e.charAt(0)==="/"&&(e=e.substr(1)),{base:t,glob:e}}var rh=C(()=>{l();eh()});function ih(i,e){let t=e.content.files;t=t.filter(o=>typeof o=="string"),t=t.map(yo);let r=En.generateTasks(t),n=[],a=[];for(let o of r)n.push(...o.positive.map(u=>nh(u,!1))),a.push(...o.negative.map(u=>nh(u,!0)));let s=[...n,...a];return s=MC(i,s),s=s.flatMap(BC),s=s.map(RC),s}function nh(i,e){let t={original:i,base:i,ignore:e,pattern:i,glob:null};return Qd(i)&&Object.assign(t,th(i)),t}function RC(i){let e=yo(i.base);return e=En.escapePath(e),i.pattern=i.glob?`${e}/${i.glob}`:e,i.pattern=i.ignore?`!${i.pattern}`:i.pattern,i}function MC(i,e){let t=[];return i.userConfigPath&&i.tailwindConfig.content.relative&&(t=[ee.dirname(i.userConfigPath)]),e.map(r=>(r.base=ee.resolve(...t,r.base),r))}function BC(i){let e=[i];try{let t=re.realpathSync(i.base);t!==i.base&&e.push({...i,base:t})}catch{}return e}function sh(i,e,t){let r=i.tailwindConfig.content.files.filter(s=>typeof s.raw=="string").map(({raw:s,extension:o="html"})=>({content:s,extension:o})),[n,a]=FC(e,t);for(let s of n){let o=ee.extname(s).slice(1);r.push({file:s,extension:o})}return[r,a]}function FC(i,e){let t=i.map(s=>s.pattern),r=new Map,n=new Set;De.DEBUG&&console.time("Finding changed files");let a=En.sync(t,{absolute:!0});for(let s of a){let o=e.get(s)||-1/0,u=re.statSync(s).mtimeMs;u>o&&(n.add(s),r.set(s,u))}return De.DEBUG&&console.timeEnd("Finding changed files"),[n,r]}var ah=C(()=>{l();je();wt();Jd();Xd();Kd();rh();lt()});function oh(){}var lh=C(()=>{l()});function jC(i,e){for(let t of e){let r=`${i}${t}`;if(re.existsSync(r)&&re.statSync(r).isFile())return r}for(let t of e){let r=`${i}/index${t}`;if(re.existsSync(r))return r}return null}function*uh(i,e,t,r=ee.extname(i)){let n=jC(ee.resolve(e,i),NC.includes(r)?LC:$C);if(n===null||t.has(n))return;t.add(n),yield n,e=ee.dirname(n),r=ee.extname(n);let a=re.readFileSync(n,"utf-8");for(let s of[...a.matchAll(/import[\s\S]*?['"](.{3,}?)['"]/gi),...a.matchAll(/import[\s\S]*from[\s\S]*?['"](.{3,}?)['"]/gi),...a.matchAll(/require\(['"`](.+)['"`]\)/gi)])!s[1].startsWith(".")||(yield*uh(s[1],e,t,r))}function wo(i){return i===null?new Set:new Set(uh(i,ee.dirname(i),new Set))}var NC,LC,$C,fh=C(()=>{l();je();wt();NC=[".js",".cjs",".mjs"],LC=["",".js",".cjs",".mjs",".ts",".cts",".mts",".jsx",".tsx"],$C=["",".ts",".cts",".mts",".tsx",".js",".cjs",".mjs",".jsx"]});function zC(i,e){if(bo.has(i))return bo.get(i);let t=ih(i,e);return bo.set(i,t).get(i)}function VC(i){let e=ms(i);if(e!==null){let[r,n,a,s]=ph.get(e)||[],o=wo(e),u=!1,c=new Map;for(let p of o){let m=re.statSync(p).mtimeMs;c.set(p,m),(!s||!s.has(p)||m>s.get(p))&&(u=!0)}if(!u)return[r,e,n,a];for(let p of o)delete ou.cache[p];let f=go(hr(oh(e))),d=ui(f);return ph.set(e,[f,d,o,c]),[f,e,d,o]}let t=hr(i?.config??i??{});return t=go(t),[t,null,ui(t),[]]}function vo(i){return({tailwindDirectives:e,registerDependency:t})=>(r,n)=>{let[a,s,o,u]=VC(i),c=new Set(u);if(e.size>0){c.add(n.opts.from);for(let b of n.messages)b.type==="dependency"&&c.add(b.file)}let[f,,d]=jd(r,n,a,s,o,c),p=On(f),m=zC(f,a);if(e.size>0){for(let y of m)for(let w of po(y))t(w);let[b,x]=sh(f,m,p);for(let y of b)f.changedContent.push(y);for(let[y,w]of x.entries())d.set(y,w)}for(let b of u)t({type:"dependency",file:b});for(let[b,x]of d.entries())p.set(b,x);return f}}var ch,ph,bo,dh=C(()=>{l();je();ch=X(Qn());pu();hs();tf();Xr();zd();Yd();ah();lh();fh();ph=new ch.default({maxSize:100}),bo=new WeakMap});function xo(i){let e=new Set,t=new Set,r=new Set;if(i.walkAtRules(n=>{n.name==="apply"&&r.add(n),n.name==="import"&&(n.params==='"tailwindcss/base"'||n.params==="'tailwindcss/base'"?(n.name="tailwind",n.params="base"):n.params==='"tailwindcss/components"'||n.params==="'tailwindcss/components'"?(n.name="tailwind",n.params="components"):n.params==='"tailwindcss/utilities"'||n.params==="'tailwindcss/utilities'"?(n.name="tailwind",n.params="utilities"):(n.params==='"tailwindcss/screens"'||n.params==="'tailwindcss/screens'"||n.params==='"tailwindcss/variants"'||n.params==="'tailwindcss/variants'")&&(n.name="tailwind",n.params="variants")),n.name==="tailwind"&&(n.params==="screens"&&(n.params="variants"),e.add(n.params)),["layer","responsive","variants"].includes(n.name)&&(["responsive","variants"].includes(n.name)&&F.warn(`${n.name}-at-rule-deprecated`,[`The \`@${n.name}\` directive has been deprecated in Tailwind CSS v3.0.`,"Use `@layer utilities` or `@layer components` instead.","https://tailwindcss.com/docs/upgrade-guide#replace-variants-with-layer"]),t.add(n))}),!e.has("base")||!e.has("components")||!e.has("utilities")){for(let n of t)if(n.name==="layer"&&["base","components","utilities"].includes(n.params)){if(!e.has(n.params))throw n.error(`\`@layer ${n.params}\` is used but no matching \`@tailwind ${n.params}\` directive is present.`)}else if(n.name==="responsive"){if(!e.has("utilities"))throw n.error("`@responsive` is used but `@tailwind utilities` is missing.")}else if(n.name==="variants"&&!e.has("utilities"))throw n.error("`@variants` is used but `@tailwind utilities` is missing.")}return{tailwindDirectives:e,applyDirectives:r}}var hh=C(()=>{l();Ee()});function kt(i,e=void 0,t=void 0){return i.map(r=>{let n=r.clone();return t!==void 0&&(n.raws.tailwind={...n.raws.tailwind,...t}),e!==void 0&&mh(n,a=>{if(a.raws.tailwind?.preserveSource===!0&&a.source)return!1;a.source=e}),n})}function mh(i,e){e(i)!==!1&&i.each?.(t=>mh(t,e))}var gh=C(()=>{l()});function ko(i){return i=Array.isArray(i)?i:[i],i=i.map(e=>e instanceof RegExp?e.source:e),i.join("")}function we(i){return new RegExp(ko(i),"g")}function ft(i){return`(?:${i.map(ko).join("|")})`}function So(i){return`(?:${ko(i)})?`}function wh(i){return i&&UC.test(i)?i.replace(yh,"\\$&"):i||""}var yh,UC,bh=C(()=>{l();yh=/[\\^$.*+?()[\]{}|]/g,UC=RegExp(yh.source)});function vh(i){let e=Array.from(WC(i));return t=>{let r=[];for(let n of e)for(let a of t.match(n)??[])r.push(YC(a));for(let n of r.slice()){let a=ie(n,".");for(let s=0;s<a.length;s++){let o=a[s];if(s>=a.length-1){r.push(o);continue}let u=parseInt(a[s+1]);isNaN(u)?r.push(o):s++}}return r}}function*WC(i){let e=i.tailwindConfig.separator,t=i.tailwindConfig.prefix!==""?So(we([/-?/,wh(i.tailwindConfig.prefix)])):"",r=ft([/\[[^\s:'"`]+:[^\s\[\]]+\]/,/\[[^\s:'"`\]]+:[^\s]+?\[[^\s]+\][^\s]+?\]/,we([ft([/-?(?:\w+)/,/@(?:\w+)/]),So(ft([we([ft([/-(?:\w+-)*\['[^\s]+'\]/,/-(?:\w+-)*\["[^\s]+"\]/,/-(?:\w+-)*\[`[^\s]+`\]/,/-(?:\w+-)*\[(?:[^\s\[\]]+\[[^\s\[\]]+\])*[^\s:\[\]]+\]/]),/(?![{([]])/,/(?:\/[^\s'"`\\><$]*)?/]),we([ft([/-(?:\w+-)*\['[^\s]+'\]/,/-(?:\w+-)*\["[^\s]+"\]/,/-(?:\w+-)*\[`[^\s]+`\]/,/-(?:\w+-)*\[(?:[^\s\[\]]+\[[^\s\[\]]+\])*[^\s\[\]]+\]/]),/(?![{([]])/,/(?:\/[^\s'"`\\$]*)?/]),/[-\/][^\s'"`\\$={><]*/]))])]),n=[ft([we([/@\[[^\s"'`]+\](\/[^\s"'`]+)?/,e]),we([/([^\s"'`\[\\]+-)?\[[^\s"'`]+\]\/[\w_-]+/,e]),we([/([^\s"'`\[\\]+-)?\[[^\s"'`]+\]/,e]),we([/[^\s"'`\[\\]+/,e])]),ft([we([/([^\s"'`\[\\]+-)?\[[^\s`]+\]\/[\w_-]+/,e]),we([/([^\s"'`\[\\]+-)?\[[^\s`]+\]/,e]),we([/[^\s`\[\\]+/,e])])];for(let a of n)yield we(["((?=((",a,")+))\\2)?",/!?/,t,r])}function YC(i){if(!i.includes("-["))return i;let e=0,t=[],r=i.matchAll(GC);r=Array.from(r).flatMap(n=>{let[,...a]=n;return a.map((s,o)=>Object.assign([],n,{index:n.index+o,0:s}))});for(let n of r){let a=n[0],s=t[t.length-1];if(a===s?t.pop():(a==="'"||a==='"'||a==="`")&&t.push(a),!s){if(a==="["){e++;continue}else if(a==="]"){e--;continue}if(e<0)return i.substring(0,n.index-1);if(e===0&&!HC.test(a))return i.substring(0,n.index)}}return i}var GC,HC,xh=C(()=>{l();bh();yt();GC=/([\[\]'"`])([^\[\]'"`])?/g,HC=/[^"'`\s<>\]]+/});function QC(i,e){let t=i.tailwindConfig.content.extract;return t[e]||t.DEFAULT||Sh[e]||Sh.DEFAULT(i)}function JC(i,e){let t=i.content.transform;return t[e]||t.DEFAULT||Ch[e]||Ch.DEFAULT}function XC(i,e,t,r){ti.has(e)||ti.set(e,new kh.default({maxSize:25e3}));for(let n of i.split(`
`))if(n=n.trim(),!r.has(n))if(r.add(n),ti.get(e).has(n))for(let a of ti.get(e).get(n))t.add(a);else{let a=e(n).filter(o=>o!=="!*"),s=new Set(a);for(let o of s)t.add(o);ti.get(e).set(n,s)}}function KC(i,e){let t=e.offsets.sort(i),r={base:new Set,defaults:new Set,components:new Set,utilities:new Set,variants:new Set};for(let[n,a]of t)r[n.layer].add(a);return r}function Co(i){return async e=>{let t={base:null,components:null,utilities:null,variants:null};if(e.walkAtRules(y=>{y.name==="tailwind"&&Object.keys(t).includes(y.params)&&(t[y.params]=y)}),Object.values(t).every(y=>y===null))return e;let r=new Set([...i.candidates??[],He]),n=new Set;Ye.DEBUG&&console.time("Reading changed files");let a=[];for(let y of i.changedContent){let w=JC(i.tailwindConfig,y.extension),k=QC(i,y.extension);a.push([y,{transformer:w,extractor:k}])}let s=500;for(let y=0;y<a.length;y+=s){let w=a.slice(y,y+s);await Promise.all(w.map(async([{file:k,content:S},{transformer:_,extractor:E}])=>{S=k?await re.promises.readFile(k,"utf8"):S,XC(_(S),E,r,n)}))}Ye.DEBUG&&console.timeEnd("Reading changed files");let o=i.classCache.size;Ye.DEBUG&&console.time("Generate rules"),Ye.DEBUG&&console.time("Sorting candidates");let u=new Set([...r].sort((y,w)=>y===w?0:y<w?-1:1));Ye.DEBUG&&console.timeEnd("Sorting candidates"),kn(u,i),Ye.DEBUG&&console.timeEnd("Generate rules"),Ye.DEBUG&&console.time("Build stylesheet"),(i.stylesheetCache===null||i.classCache.size!==o)&&(i.stylesheetCache=KC([...i.ruleCache],i)),Ye.DEBUG&&console.timeEnd("Build stylesheet");let{defaults:c,base:f,components:d,utilities:p,variants:m}=i.stylesheetCache;t.base&&(t.base.before(kt([...f,...c],t.base.source,{layer:"base"})),t.base.remove()),t.components&&(t.components.before(kt([...d],t.components.source,{layer:"components"})),t.components.remove()),t.utilities&&(t.utilities.before(kt([...p],t.utilities.source,{layer:"utilities"})),t.utilities.remove());let b=Array.from(m).filter(y=>{let w=y.raws.tailwind?.parentLayer;return w==="components"?t.components!==null:w==="utilities"?t.utilities!==null:!0});t.variants?(t.variants.before(kt(b,t.variants.source,{layer:"variants"})),t.variants.remove()):b.length>0&&e.append(kt(b,e.source,{layer:"variants"})),e.source.end=e.source.end??e.source.start;let x=b.some(y=>y.raws.tailwind?.parentLayer==="utilities");t.utilities&&p.size===0&&!x&&F.warn("content-problems",["No utility classes were detected in your source files. If this is unexpected, double-check the `content` option in your Tailwind CSS configuration.","https://tailwindcss.com/docs/content-configuration"]),Ye.DEBUG&&(console.log("Potential classes: ",r.size),console.log("Active contexts: ",gn.size)),i.changedContent=[],e.walkAtRules("layer",y=>{Object.keys(t).includes(y.params)&&y.remove()})}}var kh,Ye,Sh,Ch,ti,Ah=C(()=>{l();je();kh=X(Qn());lt();Sn();Ee();gh();xh();Ye=De,Sh={DEFAULT:vh},Ch={DEFAULT:i=>i,svelte:i=>i.replace(/(?:^|\s)class:/g," ")};ti=new WeakMap});function Pn(i){let e=new Map;z.root({nodes:[i.clone()]}).walkRules(a=>{(0,Tn.default)(s=>{s.walkClasses(o=>{let u=o.parent.toString(),c=e.get(u);c||e.set(u,c=new Set),c.add(o.value)})}).processSync(a.selector)});let r=Array.from(e.values(),a=>Array.from(a)),n=r.flat();return Object.assign(n,{groups:r})}function Ao(i){return ZC.astSync(i)}function _h(i,e){let t=new Set;for(let r of i)t.add(r.split(e).pop());return Array.from(t)}function Oh(i,e){let t=i.tailwindConfig.prefix;return typeof t=="function"?t(e):t+e}function*Eh(i){for(yield i;i.parent;)yield i.parent,i=i.parent}function e2(i,e={}){let t=i.nodes;i.nodes=[];let r=i.clone(e);return i.nodes=t,r}function t2(i){for(let e of Eh(i))if(i!==e){if(e.type==="root")break;i=e2(e,{nodes:[i]})}return i}function r2(i,e){let t=new Map;return i.walkRules(r=>{for(let s of Eh(r))if(s.raws.tailwind?.layer!==void 0)return;let n=t2(r),a=e.offsets.create("user");for(let s of Pn(r)){let o=t.get(s)||[];t.set(s,o),o.push([{layer:"user",sort:a,important:!1},n])}}),t}function i2(i,e){for(let t of i){if(e.notClassCache.has(t)||e.applyClassCache.has(t))continue;if(e.classCache.has(t)){e.applyClassCache.set(t,e.classCache.get(t).map(([n,a])=>[n,a.clone()]));continue}let r=Array.from(io(t,e));if(r.length===0){e.notClassCache.add(t);continue}e.applyClassCache.set(t,r)}return e.applyClassCache}function n2(i){let e=null;return{get:t=>(e=e||i(),e.get(t)),has:t=>(e=e||i(),e.has(t))}}function s2(i){return{get:e=>i.flatMap(t=>t.get(e)||[]),has:e=>i.some(t=>t.has(e))}}function Th(i){let e=i.split(/[\s\t\n]+/g);return e[e.length-1]==="!important"?[e.slice(0,-1),!0]:[e,!1]}function Ph(i,e,t){let r=new Set,n=[];if(i.walkAtRules("apply",u=>{let[c]=Th(u.params);for(let f of c)r.add(f);n.push(u)}),n.length===0)return;let a=s2([t,i2(r,e)]);function s(u,c,f){let d=Ao(u),p=Ao(c),b=Ao(`.${pe(f)}`).nodes[0].nodes[0];return d.each(x=>{let y=new Set;p.each(w=>{let k=!1;w=w.clone(),w.walkClasses(S=>{S.value===b.value&&(k||(S.replaceWith(...x.nodes.map(_=>_.clone())),y.add(w),k=!0))})});for(let w of y){let k=[[]];for(let S of w.nodes)S.type==="combinator"?(k.push(S),k.push([])):k[k.length-1].push(S);w.nodes=[];for(let S of k)Array.isArray(S)&&S.sort((_,E)=>_.type==="tag"&&E.type==="class"?-1:_.type==="class"&&E.type==="tag"?1:_.type==="class"&&E.type==="pseudo"&&E.value.startsWith("::")?-1:_.type==="pseudo"&&_.value.startsWith("::")&&E.type==="class"?1:0),w.nodes=w.nodes.concat(S)}x.replaceWith(...y)}),d.toString()}let o=new Map;for(let u of n){let[c]=o.get(u.parent)||[[],u.source];o.set(u.parent,[c,u.source]);let[f,d]=Th(u.params);if(u.parent.type==="atrule"){if(u.parent.name==="screen"){let p=u.parent.params;throw u.error(`@apply is not supported within nested at-rules like @screen. We suggest you write this as @apply ${f.map(m=>`${p}:${m}`).join(" ")} instead.`)}throw u.error(`@apply is not supported within nested at-rules like @${u.parent.name}. You can fix this by un-nesting @${u.parent.name}.`)}for(let p of f){if([Oh(e,"group"),Oh(e,"peer")].includes(p))throw u.error(`@apply should not be used with the '${p}' utility`);if(!a.has(p))throw u.error(`The \`${p}\` class does not exist. If \`${p}\` is a custom class, make sure it is defined within a \`@layer\` directive.`);let m=a.get(p);for(let[,b]of m)b.type!=="atrule"&&b.walkRules(()=>{throw u.error([`The \`${p}\` class cannot be used with \`@apply\` because \`@apply\` does not currently support nested CSS.`,"Rewrite the selector without nesting or configure the `tailwindcss/nesting` plugin:","https://tailwindcss.com/docs/using-with-preprocessors#nesting"].join(`
`))});c.push([p,d,m])}}for(let[u,[c,f]]of o){let d=[];for(let[m,b,x]of c){let y=[m,..._h([m],e.tailwindConfig.separator)];for(let[w,k]of x){let S=Pn(u),_=Pn(k);if(_=_.groups.filter(R=>R.some(J=>y.includes(J))).flat(),_=_.concat(_h(_,e.tailwindConfig.separator)),S.some(R=>_.includes(R)))throw k.error(`You cannot \`@apply\` the \`${m}\` utility here because it creates a circular dependency.`);let I=z.root({nodes:[k.clone()]});I.walk(R=>{R.source=f}),(k.type!=="atrule"||k.type==="atrule"&&k.name!=="keyframes")&&I.walkRules(R=>{if(!Pn(R).some(te=>te===m)){R.remove();return}let J=typeof e.tailwindConfig.important=="string"?e.tailwindConfig.important:null,he=u.raws.tailwind!==void 0&&J&&u.selector.indexOf(J)===0?u.selector.slice(J.length):u.selector;he===""&&(he=u.selector),R.selector=s(he,R.selector,m),J&&he!==u.selector&&(R.selector=bn(R.selector,J)),R.walkDecls(te=>{te.important=w.important||b});let Ie=(0,Tn.default)().astSync(R.selector);Ie.each(te=>$t(te)),R.selector=Ie.toString()}),!!I.nodes[0]&&d.push([w.sort,I.nodes[0]])}}let p=e.offsets.sort(d).map(m=>m[1]);u.after(p)}for(let u of n)u.parent.nodes.length>1?u.remove():u.parent.remove();Ph(i,e,t)}function _o(i){return e=>{let t=n2(()=>r2(e,i));Ph(e,i,t)}}var Tn,ZC,Dh=C(()=>{l();nt();Tn=X(Be());Sn();Nt();eo();yn();ZC=(0,Tn.default)()});var Ih=v((uD,Dn)=>{l();(function(){"use strict";function i(r,n,a){if(!r)return null;i.caseSensitive||(r=r.toLowerCase());var s=i.threshold===null?null:i.threshold*r.length,o=i.thresholdAbsolute,u;s!==null&&o!==null?u=Math.min(s,o):s!==null?u=s:o!==null?u=o:u=null;var c,f,d,p,m,b=n.length;for(m=0;m<b;m++)if(f=n[m],a&&(f=f[a]),!!f&&(i.caseSensitive?d=f:d=f.toLowerCase(),p=t(r,d,u),(u===null||p<u)&&(u=p,a&&i.returnWinningObject?c=n[m]:c=f,i.returnFirstMatch)))return c;return c||i.nullResultValue}i.threshold=.4,i.thresholdAbsolute=20,i.caseSensitive=!1,i.nullResultValue=null,i.returnWinningObject=null,i.returnFirstMatch=!1,typeof Dn!="undefined"&&Dn.exports?Dn.exports=i:window.didYouMean=i;var e=Math.pow(2,32)-1;function t(r,n,a){a=a||a===0?a:e;var s=r.length,o=n.length;if(s===0)return Math.min(a+1,o);if(o===0)return Math.min(a+1,s);if(Math.abs(s-o)>a)return a+1;var u=[],c,f,d,p,m;for(c=0;c<=o;c++)u[c]=[c];for(f=0;f<=s;f++)u[0][f]=f;for(c=1;c<=o;c++){for(d=e,p=1,c>a&&(p=c-a),m=o+1,m>a+c&&(m=a+c),f=1;f<=s;f++)f<p||f>m?u[c][f]=a+1:n.charAt(c-1)===r.charAt(f-1)?u[c][f]=u[c-1][f-1]:u[c][f]=Math.min(u[c-1][f-1]+1,Math.min(u[c][f-1]+1,u[c-1][f]+1)),u[c][f]<d&&(d=u[c][f]);if(d>a)return a+1}return u[o][s]}})()});var Rh=v((fD,qh)=>{l();var Oo="(".charCodeAt(0),Eo=")".charCodeAt(0),In="'".charCodeAt(0),To='"'.charCodeAt(0),Po="\\".charCodeAt(0),Vt="/".charCodeAt(0),Do=",".charCodeAt(0),Io=":".charCodeAt(0),qn="*".charCodeAt(0),a2="u".charCodeAt(0),o2="U".charCodeAt(0),l2="+".charCodeAt(0),u2=/^[a-f0-9?-]+$/i;qh.exports=function(i){for(var e=[],t=i,r,n,a,s,o,u,c,f,d=0,p=t.charCodeAt(d),m=t.length,b=[{nodes:e}],x=0,y,w="",k="",S="";d<m;)if(p<=32){r=d;do r+=1,p=t.charCodeAt(r);while(p<=32);s=t.slice(d,r),a=e[e.length-1],p===Eo&&x?S=s:a&&a.type==="div"?(a.after=s,a.sourceEndIndex+=s.length):p===Do||p===Io||p===Vt&&t.charCodeAt(r+1)!==qn&&(!y||y&&y.type==="function"&&!1)?k=s:e.push({type:"space",sourceIndex:d,sourceEndIndex:r,value:s}),d=r}else if(p===In||p===To){r=d,n=p===In?"'":'"',s={type:"string",sourceIndex:d,quote:n};do if(o=!1,r=t.indexOf(n,r+1),~r)for(u=r;t.charCodeAt(u-1)===Po;)u-=1,o=!o;else t+=n,r=t.length-1,s.unclosed=!0;while(o);s.value=t.slice(d+1,r),s.sourceEndIndex=s.unclosed?r:r+1,e.push(s),d=r+1,p=t.charCodeAt(d)}else if(p===Vt&&t.charCodeAt(d+1)===qn)r=t.indexOf("*/",d),s={type:"comment",sourceIndex:d,sourceEndIndex:r+2},r===-1&&(s.unclosed=!0,r=t.length,s.sourceEndIndex=r),s.value=t.slice(d+2,r),e.push(s),d=r+2,p=t.charCodeAt(d);else if((p===Vt||p===qn)&&y&&y.type==="function")s=t[d],e.push({type:"word",sourceIndex:d-k.length,sourceEndIndex:d+s.length,value:s}),d+=1,p=t.charCodeAt(d);else if(p===Vt||p===Do||p===Io)s=t[d],e.push({type:"div",sourceIndex:d-k.length,sourceEndIndex:d+s.length,value:s,before:k,after:""}),k="",d+=1,p=t.charCodeAt(d);else if(Oo===p){r=d;do r+=1,p=t.charCodeAt(r);while(p<=32);if(f=d,s={type:"function",sourceIndex:d-w.length,value:w,before:t.slice(f+1,r)},d=r,w==="url"&&p!==In&&p!==To){r-=1;do if(o=!1,r=t.indexOf(")",r+1),~r)for(u=r;t.charCodeAt(u-1)===Po;)u-=1,o=!o;else t+=")",r=t.length-1,s.unclosed=!0;while(o);c=r;do c-=1,p=t.charCodeAt(c);while(p<=32);f<c?(d!==c+1?s.nodes=[{type:"word",sourceIndex:d,sourceEndIndex:c+1,value:t.slice(d,c+1)}]:s.nodes=[],s.unclosed&&c+1!==r?(s.after="",s.nodes.push({type:"space",sourceIndex:c+1,sourceEndIndex:r,value:t.slice(c+1,r)})):(s.after=t.slice(c+1,r),s.sourceEndIndex=r)):(s.after="",s.nodes=[]),d=r+1,s.sourceEndIndex=s.unclosed?r:d,p=t.charCodeAt(d),e.push(s)}else x+=1,s.after="",s.sourceEndIndex=d+1,e.push(s),b.push(s),e=s.nodes=[],y=s;w=""}else if(Eo===p&&x)d+=1,p=t.charCodeAt(d),y.after=S,y.sourceEndIndex+=S.length,S="",x-=1,b[b.length-1].sourceEndIndex=d,b.pop(),y=b[x],e=y.nodes;else{r=d;do p===Po&&(r+=1),r+=1,p=t.charCodeAt(r);while(r<m&&!(p<=32||p===In||p===To||p===Do||p===Io||p===Vt||p===Oo||p===qn&&y&&y.type==="function"&&!0||p===Vt&&y.type==="function"&&!0||p===Eo&&x));s=t.slice(d,r),Oo===p?w=s:(a2===s.charCodeAt(0)||o2===s.charCodeAt(0))&&l2===s.charCodeAt(1)&&u2.test(s.slice(2))?e.push({type:"unicode-range",sourceIndex:d,sourceEndIndex:r,value:s}):e.push({type:"word",sourceIndex:d,sourceEndIndex:r,value:s}),d=r}for(d=b.length-1;d;d-=1)b[d].unclosed=!0,b[d].sourceEndIndex=t.length;return b[0].nodes}});var Bh=v((cD,Mh)=>{l();Mh.exports=function i(e,t,r){var n,a,s,o;for(n=0,a=e.length;n<a;n+=1)s=e[n],r||(o=t(s,n,e)),o!==!1&&s.type==="function"&&Array.isArray(s.nodes)&&i(s.nodes,t,r),r&&t(s,n,e)}});var $h=v((pD,Lh)=>{l();function Fh(i,e){var t=i.type,r=i.value,n,a;return e&&(a=e(i))!==void 0?a:t==="word"||t==="space"?r:t==="string"?(n=i.quote||"",n+r+(i.unclosed?"":n)):t==="comment"?"/*"+r+(i.unclosed?"":"*/"):t==="div"?(i.before||"")+r+(i.after||""):Array.isArray(i.nodes)?(n=Nh(i.nodes,e),t!=="function"?n:r+"("+(i.before||"")+n+(i.after||"")+(i.unclosed?"":")")):r}function Nh(i,e){var t,r;if(Array.isArray(i)){for(t="",r=i.length-1;~r;r-=1)t=Fh(i[r],e)+t;return t}return Fh(i,e)}Lh.exports=Nh});var zh=v((dD,jh)=>{l();var Rn="-".charCodeAt(0),Mn="+".charCodeAt(0),qo=".".charCodeAt(0),f2="e".charCodeAt(0),c2="E".charCodeAt(0);function p2(i){var e=i.charCodeAt(0),t;if(e===Mn||e===Rn){if(t=i.charCodeAt(1),t>=48&&t<=57)return!0;var r=i.charCodeAt(2);return t===qo&&r>=48&&r<=57}return e===qo?(t=i.charCodeAt(1),t>=48&&t<=57):e>=48&&e<=57}jh.exports=function(i){var e=0,t=i.length,r,n,a;if(t===0||!p2(i))return!1;for(r=i.charCodeAt(e),(r===Mn||r===Rn)&&e++;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;if(r=i.charCodeAt(e),n=i.charCodeAt(e+1),r===qo&&n>=48&&n<=57)for(e+=2;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;if(r=i.charCodeAt(e),n=i.charCodeAt(e+1),a=i.charCodeAt(e+2),(r===f2||r===c2)&&(n>=48&&n<=57||(n===Mn||n===Rn)&&a>=48&&a<=57))for(e+=n===Mn||n===Rn?3:2;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;return{number:i.slice(0,e),unit:i.slice(e)}}});var Gh=v((hD,Wh)=>{l();var d2=Rh(),Vh=Bh(),Uh=$h();function ct(i){return this instanceof ct?(this.nodes=d2(i),this):new ct(i)}ct.prototype.toString=function(){return Array.isArray(this.nodes)?Uh(this.nodes):""};ct.prototype.walk=function(i,e){return Vh(this.nodes,i,e),this};ct.unit=zh();ct.walk=Vh;ct.stringify=Uh;Wh.exports=ct});function Mo(i){return typeof i=="object"&&i!==null}function h2(i,e){let t=Ke(e);do if(t.pop(),(0,ri.default)(i,t)!==void 0)break;while(t.length);return t.length?t:void 0}function Ut(i){return typeof i=="string"?i:i.reduce((e,t,r)=>t.includes(".")?`${e}[${t}]`:r===0?t:`${e}.${t}`,"")}function Yh(i){return i.map(e=>`'${e}'`).join(", ")}function Qh(i){return Yh(Object.keys(i))}function Bo(i,e,t,r={}){let n=Array.isArray(e)?Ut(e):e.replace(/^['"]+|['"]+$/g,""),a=Array.isArray(e)?e:Ke(n),s=(0,ri.default)(i.theme,a,t);if(s===void 0){let u=`'${n}' does not exist in your theme config.`,c=a.slice(0,-1),f=(0,ri.default)(i.theme,c);if(Mo(f)){let d=Object.keys(f).filter(m=>Bo(i,[...c,m]).isValid),p=(0,Hh.default)(a[a.length-1],d);p?u+=` Did you mean '${Ut([...c,p])}'?`:d.length>0&&(u+=` '${Ut(c)}' has the following valid keys: ${Yh(d)}`)}else{let d=h2(i.theme,n);if(d){let p=(0,ri.default)(i.theme,d);Mo(p)?u+=` '${Ut(d)}' has the following keys: ${Qh(p)}`:u+=` '${Ut(d)}' is not an object.`}else u+=` Your theme has the following top-level keys: ${Qh(i.theme)}`}return{isValid:!1,error:u}}if(!(typeof s=="string"||typeof s=="number"||typeof s=="function"||s instanceof String||s instanceof Number||Array.isArray(s))){let u=`'${n}' was found but does not resolve to a string.`;if(Mo(s)){let c=Object.keys(s).filter(f=>Bo(i,[...a,f]).isValid);c.length&&(u+=` Did you mean something like '${Ut([...a,c[0]])}'?`)}return{isValid:!1,error:u}}let[o]=a;return{isValid:!0,value:Ge(o)(s,r)}}function m2(i,e,t){e=e.map(n=>Jh(i,n,t));let r=[""];for(let n of e)n.type==="div"&&n.value===","?r.push(""):r[r.length-1]+=Ro.default.stringify(n);return r}function Jh(i,e,t){if(e.type==="function"&&t[e.value]!==void 0){let r=m2(i,e.nodes,t);e.type="word",e.value=t[e.value](i,...r)}return e}function g2(i,e,t){return Object.keys(t).some(n=>e.includes(`${n}(`))?(0,Ro.default)(e).walk(n=>{Jh(i,n,t)}).toString():e}function*w2(i){i=i.replace(/^['"]+|['"]+$/g,"");let e=i.match(/^([^\s]+)(?![^\[]*\])(?:\s*\/\s*([^\/\s]+))$/),t;yield[i,void 0],e&&(i=e[1],t=e[2],yield[i,t])}function b2(i,e,t){let r=Array.from(w2(e)).map(([n,a])=>Object.assign(Bo(i,n,t,{opacityValue:a}),{resolvedPath:n,alpha:a}));return r.find(n=>n.isValid)??r[0]}function Xh(i){let e=i.tailwindConfig,t={theme:(r,n,...a)=>{let{isValid:s,value:o,error:u,alpha:c}=b2(e,n,a.length?a:void 0);if(!s){let p=r.parent,m=p?.raws.tailwind?.candidate;if(p&&m!==void 0){i.markInvalidUtilityNode(p),p.remove(),F.warn("invalid-theme-key-in-class",[`The utility \`${m}\` contains an invalid theme value and was not generated.`]);return}throw r.error(u)}let f=At(o),d=f!==void 0&&typeof f=="function";return(c!==void 0||d)&&(c===void 0&&(c=1),o=qe(f,c,f)),o},screen:(r,n)=>{n=n.replace(/^['"]+/g,"").replace(/['"]+$/g,"");let s=at(e.theme.screens).find(({name:o})=>o===n);if(!s)throw r.error(`The '${n}' screen does not exist in your theme.`);return st(s)}};return r=>{r.walk(n=>{let a=y2[n.type];a!==void 0&&(n[a]=g2(n,n[a],t))})}}var ri,Hh,Ro,y2,Kh=C(()=>{l();ri=X(Ls()),Hh=X(Ih());Yr();Ro=X(Gh());hn();cn();pi();lr();pr();Ee();y2={atrule:"params",decl:"value"}});function Zh({tailwindConfig:{theme:i}}){return function(e){e.walkAtRules("screen",t=>{let r=t.params,a=at(i.screens).find(({name:s})=>s===r);if(!a)throw t.error(`No \`${r}\` screen found.`);t.name="media",t.params=st(a)})}}var em=C(()=>{l();hn();cn()});function v2(i){let e=i.filter(o=>o.type!=="pseudo"||o.nodes.length>0?!0:o.value.startsWith("::")||[":before",":after",":first-line",":first-letter"].includes(o.value)).reverse(),t=new Set(["tag","class","id","attribute"]),r=e.findIndex(o=>t.has(o.type));if(r===-1)return e.reverse().join("").trim();let n=e[r],a=tm[n.type]?tm[n.type](n):n;e=e.slice(0,r);let s=e.findIndex(o=>o.type==="combinator"&&o.value===">");return s!==-1&&(e.splice(0,s),e.unshift(Bn.default.universal())),[a,...e.reverse()].join("").trim()}function k2(i){return Fo.has(i)||Fo.set(i,x2.transformSync(i)),Fo.get(i)}function No({tailwindConfig:i}){return e=>{let t=new Map,r=new Set;if(e.walkAtRules("defaults",n=>{if(n.nodes&&n.nodes.length>0){r.add(n);return}let a=n.params;t.has(a)||t.set(a,new Set),t.get(a).add(n.parent),n.remove()}),Z(i,"optimizeUniversalDefaults"))for(let n of r){let a=new Map,s=t.get(n.params)??[];for(let o of s)for(let u of k2(o.selector)){let c=u.includes(":-")||u.includes("::-")||u.includes(":has")?u:"__DEFAULT__",f=a.get(c)??new Set;a.set(c,f),f.add(u)}if(Z(i,"optimizeUniversalDefaults")){if(a.size===0){n.remove();continue}for(let[,o]of a){let u=z.rule({source:n.source});u.selectors=[...o],u.append(n.nodes.map(c=>c.clone())),n.before(u)}}n.remove()}else if(r.size){let n=z.rule({selectors:["*","::before","::after"]});for(let s of r)n.append(s.nodes),n.parent||s.before(n),n.source||(n.source=s.source),s.remove();let a=n.clone({selectors:["::backdrop"]});n.after(a)}}}var Bn,tm,x2,Fo,rm=C(()=>{l();nt();Bn=X(Be());ze();tm={id(i){return Bn.default.attribute({attribute:"id",operator:"=",value:i.value,quoteMark:'"'})}};x2=(0,Bn.default)(i=>i.map(e=>{let t=e.split(r=>r.type==="combinator"&&r.value===" ").pop();return v2(t)})),Fo=new Map});function Lo(){function i(e){let t=null;e.each(r=>{if(!S2.has(r.type)){t=null;return}if(t===null){t=r;return}let n=im[r.type];r.type==="atrule"&&r.name==="font-face"?t=r:n.every(a=>(r[a]??"").replace(/\s+/g," ")===(t[a]??"").replace(/\s+/g," "))?(r.nodes&&t.append(r.nodes),r.remove()):t=r}),e.each(r=>{r.type==="atrule"&&i(r)})}return e=>{i(e)}}var im,S2,nm=C(()=>{l();im={atrule:["name","params"],rule:["selector"]},S2=new Set(Object.keys(im))});function $o(){return i=>{i.walkRules(e=>{let t=new Map,r=new Set([]),n=new Map;e.walkDecls(a=>{if(a.parent===e){if(t.has(a.prop)){if(t.get(a.prop).value===a.value){r.add(t.get(a.prop)),t.set(a.prop,a);return}n.has(a.prop)||n.set(a.prop,new Set),n.get(a.prop).add(t.get(a.prop)),n.get(a.prop).add(a)}t.set(a.prop,a)}});for(let a of r)a.remove();for(let a of n.values()){let s=new Map;for(let o of a){let u=A2(o.value);u!==null&&(s.has(u)||s.set(u,new Set),s.get(u).add(o))}for(let o of s.values()){let u=Array.from(o).slice(0,-1);for(let c of u)c.remove()}}})}}function A2(i){let e=/^-?\d*.?\d+([\w%]+)?$/g.exec(i);return e?e[1]??C2:null}var C2,sm=C(()=>{l();C2=Symbol("unitless-number")});function _2(i){if(!i.walkAtRules)return;let e=new Set;if(i.walkAtRules("apply",t=>{e.add(t.parent)}),e.size!==0)for(let t of e){let r=[],n=[];for(let a of t.nodes)a.type==="atrule"&&a.name==="apply"?(n.length>0&&(r.push(n),n=[]),r.push([a])):n.push(a);if(n.length>0&&r.push(n),r.length!==1){for(let a of[...r].reverse()){let s=t.clone({nodes:[]});s.append(a),t.after(s)}t.remove()}}}function Fn(){return i=>{_2(i)}}var am=C(()=>{l()});function Nn(i){return async function(e,t){let{tailwindDirectives:r,applyDirectives:n}=xo(e);Fn()(e,t);let a=i({tailwindDirectives:r,applyDirectives:n,registerDependency(s){t.messages.push({plugin:"tailwindcss",parent:t.opts.from,...s})},createContext(s,o){return co(s,o,e)}})(e,t);if(a.tailwindConfig.separator==="-")throw new Error("The '-' character cannot be used as a custom separator in JIT mode due to parsing ambiguity. Please use another character like '_' instead.");Su(a.tailwindConfig),await Co(a)(e,t),Fn()(e,t),_o(a)(e,t),Xh(a)(e,t),Zh(a)(e,t),No(a)(e,t),Lo(a)(e,t),$o(a)(e,t)}}var om=C(()=>{l();hh();Ah();Dh();Kh();em();rm();nm();sm();am();Xr();ze()});function lm(i,e){let t=null,r=null;return i.walkAtRules("config",n=>{if(r=n.source?.input.file??e.opts.from??null,r===null)throw n.error("The `@config` directive cannot be used without setting `from` in your PostCSS config.");if(t)throw n.error("Only one `@config` directive is allowed per file.");let a=n.params.match(/(['"])(.*?)\1/);if(!a)throw n.error("A path is required when using the `@config` directive.");let s=a[2];if(ee.isAbsolute(s))throw n.error("The `@config` directive cannot be used with an absolute path.");if(t=ee.resolve(ee.dirname(r),s),!re.existsSync(t))throw n.error(`The config file at "${s}" does not exist. Make sure the path is correct and the file exists.`);n.remove()}),t||null}var um=C(()=>{l();je();wt()});var fm=v((XD,jo)=>{l();dh();om();lt();um();jo.exports=function(e){return{postcssPlugin:"tailwindcss",plugins:[De.DEBUG&&function(t){return console.log(`
`),console.time("JIT TOTAL"),t},async function(t,r){e=lm(t,r)??e;let n=vo(e);if(t.type==="document"){let a=t.nodes.filter(s=>s.type==="root");for(let s of a)s.type==="root"&&await Nn(n)(s,r);return}await Nn(n)(t,r)},De.DEBUG&&function(t){return console.timeEnd("JIT TOTAL"),console.log(`
`),t}].filter(Boolean)}};jo.exports.postcss=!0});var pm=v((KD,cm)=>{l();cm.exports=fm()});var zo=v((ZD,dm)=>{l();dm.exports=()=>["and_chr 114","and_uc 15.5","chrome 114","chrome 113","chrome 109","edge 114","firefox 114","ios_saf 16.5","ios_saf 16.4","ios_saf 16.3","ios_saf 16.1","opera 99","safari 16.5","samsung 21"]});var Ln={};_e(Ln,{agents:()=>O2,feature:()=>E2});function E2(){return{status:"cr",title:"CSS Feature Queries",stats:{ie:{"6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","5.5":"n"},edge:{"12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","79":"y","80":"y","81":"y","83":"y","84":"y","85":"y","86":"y","87":"y","88":"y","89":"y","90":"y","91":"y","92":"y","93":"y","94":"y","95":"y","96":"y","97":"y","98":"y","99":"y","100":"y","101":"y","102":"y","103":"y","104":"y","105":"y","106":"y","107":"y","108":"y","109":"y","110":"y","111":"y","112":"y","113":"y","114":"y"},firefox:{"2":"n","3":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y","45":"y","46":"y","47":"y","48":"y","49":"y","50":"y","51":"y","52":"y","53":"y","54":"y","55":"y","56":"y","57":"y","58":"y","59":"y","60":"y","61":"y","62":"y","63":"y","64":"y","65":"y","66":"y","67":"y","68":"y","69":"y","70":"y","71":"y","72":"y","73":"y","74":"y","75":"y","76":"y","77":"y","78":"y","79":"y","80":"y","81":"y","82":"y","83":"y","84":"y","85":"y","86":"y","87":"y","88":"y","89":"y","90":"y","91":"y","92":"y","93":"y","94":"y","95":"y","96":"y","97":"y","98":"y","99":"y","100":"y","101":"y","102":"y","103":"y","104":"y","105":"y","106":"y","107":"y","108":"y","109":"y","110":"y","111":"y","112":"y","113":"y","114":"y","115":"y","116":"y","117":"y","3.5":"n","3.6":"n"},chrome:{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y","45":"y","46":"y","47":"y","48":"y","49":"y","50":"y","51":"y","52":"y","53":"y","54":"y","55":"y","56":"y","57":"y","58":"y","59":"y","60":"y","61":"y","62":"y","63":"y","64":"y","65":"y","66":"y","67":"y","68":"y","69":"y","70":"y","71":"y","72":"y","73":"y","74":"y","75":"y","76":"y","77":"y","78":"y","79":"y","80":"y","81":"y","83":"y","84":"y","85":"y","86":"y","87":"y","88":"y","89":"y","90":"y","91":"y","92":"y","93":"y","94":"y","95":"y","96":"y","97":"y","98":"y","99":"y","100":"y","101":"y","102":"y","103":"y","104":"y","105":"y","106":"y","107":"y","108":"y","109":"y","110":"y","111":"y","112":"y","113":"y","114":"y","115":"y","116":"y","117":"y"},safari:{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","17":"y","9.1":"y","10.1":"y","11.1":"y","12.1":"y","13.1":"y","14.1":"y","15.1":"y","15.2-15.3":"y","15.4":"y","15.5":"y","15.6":"y","16.0":"y","16.1":"y","16.2":"y","16.3":"y","16.4":"y","16.5":"y","16.6":"y",TP:"y","3.1":"n","3.2":"n","5.1":"n","6.1":"n","7.1":"n"},opera:{"9":"n","11":"n","12":"n","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y","45":"y","46":"y","47":"y","48":"y","49":"y","50":"y","51":"y","52":"y","53":"y","54":"y","55":"y","56":"y","57":"y","58":"y","60":"y","62":"y","63":"y","64":"y","65":"y","66":"y","67":"y","68":"y","69":"y","70":"y","71":"y","72":"y","73":"y","74":"y","75":"y","76":"y","77":"y","78":"y","79":"y","80":"y","81":"y","82":"y","83":"y","84":"y","85":"y","86":"y","87":"y","88":"y","89":"y","90":"y","91":"y","92":"y","93":"y","94":"y","95":"y","96":"y","97":"y","98":"y","99":"y","100":"y","12.1":"y","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11.1":"n","11.5":"n","11.6":"n"},ios_saf:{"8":"n","17":"y","9.0-9.2":"y","9.3":"y","10.0-10.2":"y","10.3":"y","11.0-11.2":"y","11.3-11.4":"y","12.0-12.1":"y","12.2-12.5":"y","13.0-13.1":"y","13.2":"y","13.3":"y","13.4-13.7":"y","14.0-14.4":"y","14.5-14.8":"y","15.0-15.1":"y","15.2-15.3":"y","15.4":"y","15.5":"y","15.6":"y","16.0":"y","16.1":"y","16.2":"y","16.3":"y","16.4":"y","16.5":"y","16.6":"y","3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8.1-8.4":"n"},op_mini:{all:"y"},android:{"3":"n","4":"n","114":"y","4.4":"y","4.4.3-4.4.4":"y","2.1":"n","2.2":"n","2.3":"n","4.1":"n","4.2-4.3":"n"},bb:{"7":"n","10":"n"},op_mob:{"10":"n","11":"n","12":"n","73":"y","11.1":"n","11.5":"n","12.1":"n"},and_chr:{"114":"y"},and_ff:{"115":"y"},ie_mob:{"10":"n","11":"n"},and_uc:{"15.5":"y"},samsung:{"4":"y","20":"y","21":"y","5.0-5.4":"y","6.2-6.4":"y","7.2-7.4":"y","8.2":"y","9.2":"y","10.1":"y","11.1-11.2":"y","12.0":"y","13.0":"y","14.0":"y","15.0":"y","16.0":"y","17.0":"y","18.0":"y","19.0":"y"},and_qq:{"13.1":"y"},baidu:{"13.18":"y"},kaios:{"2.5":"y","3.0-3.1":"y"}}}}var O2,$n=C(()=>{l();O2={ie:{prefix:"ms"},edge:{prefix:"webkit",prefix_exceptions:{"12":"ms","13":"ms","14":"ms","15":"ms","16":"ms","17":"ms","18":"ms"}},firefox:{prefix:"moz"},chrome:{prefix:"webkit"},safari:{prefix:"webkit"},opera:{prefix:"webkit",prefix_exceptions:{"9":"o","11":"o","12":"o","9.5-9.6":"o","10.0-10.1":"o","10.5":"o","10.6":"o","11.1":"o","11.5":"o","11.6":"o","12.1":"o"}},ios_saf:{prefix:"webkit"},op_mini:{prefix:"o"},android:{prefix:"webkit"},bb:{prefix:"webkit"},op_mob:{prefix:"o",prefix_exceptions:{"73":"webkit"}},and_chr:{prefix:"webkit"},and_ff:{prefix:"moz"},ie_mob:{prefix:"ms"},and_uc:{prefix:"webkit",prefix_exceptions:{"15.5":"webkit"}},samsung:{prefix:"webkit"},and_qq:{prefix:"webkit"},baidu:{prefix:"webkit"},kaios:{prefix:"moz"}}});var hm=v(()=>{l()});var ue=v((r4,pt)=>{l();var{list:Vo}=ye();pt.exports.error=function(i){let e=new Error(i);throw e.autoprefixer=!0,e};pt.exports.uniq=function(i){return[...new Set(i)]};pt.exports.removeNote=function(i){return i.includes(" ")?i.split(" ")[0]:i};pt.exports.escapeRegexp=function(i){return i.replace(/[$()*+-.?[\\\]^{|}]/g,"\\$&")};pt.exports.regexp=function(i,e=!0){return e&&(i=this.escapeRegexp(i)),new RegExp(`(^|[\\s,(])(${i}($|[\\s(,]))`,"gi")};pt.exports.editList=function(i,e){let t=Vo.comma(i),r=e(t,[]);if(t===r)return i;let n=i.match(/,\s*/);return n=n?n[0]:", ",r.join(n)};pt.exports.splitSelector=function(i){return Vo.comma(i).map(e=>Vo.space(e).map(t=>t.split(/(?=\.|#)/g)))}});var dt=v((i4,ym)=>{l();var T2=zo(),mm=($n(),Ln).agents,P2=ue(),gm=class{static prefixes(){if(this.prefixesCache)return this.prefixesCache;this.prefixesCache=[];for(let e in mm)this.prefixesCache.push(`-${mm[e].prefix}-`);return this.prefixesCache=P2.uniq(this.prefixesCache).sort((e,t)=>t.length-e.length),this.prefixesCache}static withPrefix(e){return this.prefixesRegexp||(this.prefixesRegexp=new RegExp(this.prefixes().join("|"))),this.prefixesRegexp.test(e)}constructor(e,t,r,n){this.data=e,this.options=r||{},this.browserslistOpts=n||{},this.selected=this.parse(t)}parse(e){let t={};for(let r in this.browserslistOpts)t[r]=this.browserslistOpts[r];return t.path=this.options.from,T2(e,t)}prefix(e){let[t,r]=e.split(" "),n=this.data[t],a=n.prefix_exceptions&&n.prefix_exceptions[r];return a||(a=n.prefix),`-${a}-`}isSelected(e){return this.selected.includes(e)}};ym.exports=gm});var ii=v((n4,wm)=>{l();wm.exports={prefix(i){let e=i.match(/^(-\w+-)/);return e?e[0]:""},unprefixed(i){return i.replace(/^-\w+-/,"")}}});var Wt=v((s4,vm)=>{l();var D2=dt(),bm=ii(),I2=ue();function Uo(i,e){let t=new i.constructor;for(let r of Object.keys(i||{})){let n=i[r];r==="parent"&&typeof n=="object"?e&&(t[r]=e):r==="source"||r===null?t[r]=n:Array.isArray(n)?t[r]=n.map(a=>Uo(a,t)):r!=="_autoprefixerPrefix"&&r!=="_autoprefixerValues"&&r!=="proxyCache"&&(typeof n=="object"&&n!==null&&(n=Uo(n,t)),t[r]=n)}return t}var jn=class{static hack(e){return this.hacks||(this.hacks={}),e.names.map(t=>(this.hacks[t]=e,this.hacks[t]))}static load(e,t,r){let n=this.hacks&&this.hacks[e];return n?new n(e,t,r):new this(e,t,r)}static clone(e,t){let r=Uo(e);for(let n in t)r[n]=t[n];return r}constructor(e,t,r){this.prefixes=t,this.name=e,this.all=r}parentPrefix(e){let t;return typeof e._autoprefixerPrefix!="undefined"?t=e._autoprefixerPrefix:e.type==="decl"&&e.prop[0]==="-"?t=bm.prefix(e.prop):e.type==="root"?t=!1:e.type==="rule"&&e.selector.includes(":-")&&/:(-\w+-)/.test(e.selector)?t=e.selector.match(/:(-\w+-)/)[1]:e.type==="atrule"&&e.name[0]==="-"?t=bm.prefix(e.name):t=this.parentPrefix(e.parent),D2.prefixes().includes(t)||(t=!1),e._autoprefixerPrefix=t,e._autoprefixerPrefix}process(e,t){if(!this.check(e))return;let r=this.parentPrefix(e),n=this.prefixes.filter(s=>!r||r===I2.removeNote(s)),a=[];for(let s of n)this.add(e,s,a.concat([s]),t)&&a.push(s);return a}clone(e,t){return jn.clone(e,t)}};vm.exports=jn});var M=v((a4,Sm)=>{l();var q2=Wt(),R2=dt(),xm=ue(),km=class extends q2{check(){return!0}prefixed(e,t){return t+e}normalize(e){return e}otherPrefixes(e,t){for(let r of R2.prefixes())if(r!==t&&e.includes(r))return!0;return!1}set(e,t){return e.prop=this.prefixed(e.prop,t),e}needCascade(e){return e._autoprefixerCascade||(e._autoprefixerCascade=this.all.options.cascade!==!1&&e.raw("before").includes(`
`)),e._autoprefixerCascade}maxPrefixed(e,t){if(t._autoprefixerMax)return t._autoprefixerMax;let r=0;for(let n of e)n=xm.removeNote(n),n.length>r&&(r=n.length);return t._autoprefixerMax=r,t._autoprefixerMax}calcBefore(e,t,r=""){let a=this.maxPrefixed(e,t)-xm.removeNote(r).length,s=t.raw("before");return a>0&&(s+=Array(a).fill(" ").join("")),s}restoreBefore(e){let t=e.raw("before").split(`
`),r=t[t.length-1];this.all.group(e).up(n=>{let a=n.raw("before").split(`
`),s=a[a.length-1];s.length<r.length&&(r=s)}),t[t.length-1]=r,e.raws.before=t.join(`
`)}insert(e,t,r){let n=this.set(this.clone(e),t);if(!(!n||e.parent.some(s=>s.prop===n.prop&&s.value===n.value)))return this.needCascade(e)&&(n.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,n)}isAlready(e,t){let r=this.all.group(e).up(n=>n.prop===t);return r||(r=this.all.group(e).down(n=>n.prop===t)),r}add(e,t,r,n){let a=this.prefixed(e.prop,t);if(!(this.isAlready(e,a)||this.otherPrefixes(e.value,t)))return this.insert(e,t,r,n)}process(e,t){if(!this.needCascade(e)){super.process(e,t);return}let r=super.process(e,t);!r||!r.length||(this.restoreBefore(e),e.raws.before=this.calcBefore(r,e))}old(e,t){return[this.prefixed(e,t)]}};Sm.exports=km});var Am=v((o4,Cm)=>{l();Cm.exports=function i(e){return{mul:t=>new i(e*t),div:t=>new i(e/t),simplify:()=>new i(e),toString:()=>e.toString()}}});var Em=v((l4,Om)=>{l();var M2=Am(),B2=Wt(),Wo=ue(),F2=/(min|max)-resolution\s*:\s*\d*\.?\d+(dppx|dpcm|dpi|x)/gi,N2=/(min|max)-resolution(\s*:\s*)(\d*\.?\d+)(dppx|dpcm|dpi|x)/i,_m=class extends B2{prefixName(e,t){return e==="-moz-"?t+"--moz-device-pixel-ratio":e+t+"-device-pixel-ratio"}prefixQuery(e,t,r,n,a){return n=new M2(n),a==="dpi"?n=n.div(96):a==="dpcm"&&(n=n.mul(2.54).div(96)),n=n.simplify(),e==="-o-"&&(n=n.n+"/"+n.d),this.prefixName(e,t)+r+n}clean(e){if(!this.bad){this.bad=[];for(let t of this.prefixes)this.bad.push(this.prefixName(t,"min")),this.bad.push(this.prefixName(t,"max"))}e.params=Wo.editList(e.params,t=>t.filter(r=>this.bad.every(n=>!r.includes(n))))}process(e){let t=this.parentPrefix(e),r=t?[t]:this.prefixes;e.params=Wo.editList(e.params,(n,a)=>{for(let s of n){if(!s.includes("min-resolution")&&!s.includes("max-resolution")){a.push(s);continue}for(let o of r){let u=s.replace(F2,c=>{let f=c.match(N2);return this.prefixQuery(o,f[1],f[2],f[3],f[4])});a.push(u)}a.push(s)}return Wo.uniq(a)})}};Om.exports=_m});var Pm=v((u4,Tm)=>{l();var Go="(".charCodeAt(0),Ho=")".charCodeAt(0),zn="'".charCodeAt(0),Yo='"'.charCodeAt(0),Qo="\\".charCodeAt(0),Gt="/".charCodeAt(0),Jo=",".charCodeAt(0),Xo=":".charCodeAt(0),Vn="*".charCodeAt(0),L2="u".charCodeAt(0),$2="U".charCodeAt(0),j2="+".charCodeAt(0),z2=/^[a-f0-9?-]+$/i;Tm.exports=function(i){for(var e=[],t=i,r,n,a,s,o,u,c,f,d=0,p=t.charCodeAt(d),m=t.length,b=[{nodes:e}],x=0,y,w="",k="",S="";d<m;)if(p<=32){r=d;do r+=1,p=t.charCodeAt(r);while(p<=32);s=t.slice(d,r),a=e[e.length-1],p===Ho&&x?S=s:a&&a.type==="div"?(a.after=s,a.sourceEndIndex+=s.length):p===Jo||p===Xo||p===Gt&&t.charCodeAt(r+1)!==Vn&&(!y||y&&y.type==="function"&&y.value!=="calc")?k=s:e.push({type:"space",sourceIndex:d,sourceEndIndex:r,value:s}),d=r}else if(p===zn||p===Yo){r=d,n=p===zn?"'":'"',s={type:"string",sourceIndex:d,quote:n};do if(o=!1,r=t.indexOf(n,r+1),~r)for(u=r;t.charCodeAt(u-1)===Qo;)u-=1,o=!o;else t+=n,r=t.length-1,s.unclosed=!0;while(o);s.value=t.slice(d+1,r),s.sourceEndIndex=s.unclosed?r:r+1,e.push(s),d=r+1,p=t.charCodeAt(d)}else if(p===Gt&&t.charCodeAt(d+1)===Vn)r=t.indexOf("*/",d),s={type:"comment",sourceIndex:d,sourceEndIndex:r+2},r===-1&&(s.unclosed=!0,r=t.length,s.sourceEndIndex=r),s.value=t.slice(d+2,r),e.push(s),d=r+2,p=t.charCodeAt(d);else if((p===Gt||p===Vn)&&y&&y.type==="function"&&y.value==="calc")s=t[d],e.push({type:"word",sourceIndex:d-k.length,sourceEndIndex:d+s.length,value:s}),d+=1,p=t.charCodeAt(d);else if(p===Gt||p===Jo||p===Xo)s=t[d],e.push({type:"div",sourceIndex:d-k.length,sourceEndIndex:d+s.length,value:s,before:k,after:""}),k="",d+=1,p=t.charCodeAt(d);else if(Go===p){r=d;do r+=1,p=t.charCodeAt(r);while(p<=32);if(f=d,s={type:"function",sourceIndex:d-w.length,value:w,before:t.slice(f+1,r)},d=r,w==="url"&&p!==zn&&p!==Yo){r-=1;do if(o=!1,r=t.indexOf(")",r+1),~r)for(u=r;t.charCodeAt(u-1)===Qo;)u-=1,o=!o;else t+=")",r=t.length-1,s.unclosed=!0;while(o);c=r;do c-=1,p=t.charCodeAt(c);while(p<=32);f<c?(d!==c+1?s.nodes=[{type:"word",sourceIndex:d,sourceEndIndex:c+1,value:t.slice(d,c+1)}]:s.nodes=[],s.unclosed&&c+1!==r?(s.after="",s.nodes.push({type:"space",sourceIndex:c+1,sourceEndIndex:r,value:t.slice(c+1,r)})):(s.after=t.slice(c+1,r),s.sourceEndIndex=r)):(s.after="",s.nodes=[]),d=r+1,s.sourceEndIndex=s.unclosed?r:d,p=t.charCodeAt(d),e.push(s)}else x+=1,s.after="",s.sourceEndIndex=d+1,e.push(s),b.push(s),e=s.nodes=[],y=s;w=""}else if(Ho===p&&x)d+=1,p=t.charCodeAt(d),y.after=S,y.sourceEndIndex+=S.length,S="",x-=1,b[b.length-1].sourceEndIndex=d,b.pop(),y=b[x],e=y.nodes;else{r=d;do p===Qo&&(r+=1),r+=1,p=t.charCodeAt(r);while(r<m&&!(p<=32||p===zn||p===Yo||p===Jo||p===Xo||p===Gt||p===Go||p===Vn&&y&&y.type==="function"&&y.value==="calc"||p===Gt&&y.type==="function"&&y.value==="calc"||p===Ho&&x));s=t.slice(d,r),Go===p?w=s:(L2===s.charCodeAt(0)||$2===s.charCodeAt(0))&&j2===s.charCodeAt(1)&&z2.test(s.slice(2))?e.push({type:"unicode-range",sourceIndex:d,sourceEndIndex:r,value:s}):e.push({type:"word",sourceIndex:d,sourceEndIndex:r,value:s}),d=r}for(d=b.length-1;d;d-=1)b[d].unclosed=!0,b[d].sourceEndIndex=t.length;return b[0].nodes}});var Im=v((f4,Dm)=>{l();Dm.exports=function i(e,t,r){var n,a,s,o;for(n=0,a=e.length;n<a;n+=1)s=e[n],r||(o=t(s,n,e)),o!==!1&&s.type==="function"&&Array.isArray(s.nodes)&&i(s.nodes,t,r),r&&t(s,n,e)}});var Bm=v((c4,Mm)=>{l();function qm(i,e){var t=i.type,r=i.value,n,a;return e&&(a=e(i))!==void 0?a:t==="word"||t==="space"?r:t==="string"?(n=i.quote||"",n+r+(i.unclosed?"":n)):t==="comment"?"/*"+r+(i.unclosed?"":"*/"):t==="div"?(i.before||"")+r+(i.after||""):Array.isArray(i.nodes)?(n=Rm(i.nodes,e),t!=="function"?n:r+"("+(i.before||"")+n+(i.after||"")+(i.unclosed?"":")")):r}function Rm(i,e){var t,r;if(Array.isArray(i)){for(t="",r=i.length-1;~r;r-=1)t=qm(i[r],e)+t;return t}return qm(i,e)}Mm.exports=Rm});var Nm=v((p4,Fm)=>{l();var Un="-".charCodeAt(0),Wn="+".charCodeAt(0),Ko=".".charCodeAt(0),V2="e".charCodeAt(0),U2="E".charCodeAt(0);function W2(i){var e=i.charCodeAt(0),t;if(e===Wn||e===Un){if(t=i.charCodeAt(1),t>=48&&t<=57)return!0;var r=i.charCodeAt(2);return t===Ko&&r>=48&&r<=57}return e===Ko?(t=i.charCodeAt(1),t>=48&&t<=57):e>=48&&e<=57}Fm.exports=function(i){var e=0,t=i.length,r,n,a;if(t===0||!W2(i))return!1;for(r=i.charCodeAt(e),(r===Wn||r===Un)&&e++;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;if(r=i.charCodeAt(e),n=i.charCodeAt(e+1),r===Ko&&n>=48&&n<=57)for(e+=2;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;if(r=i.charCodeAt(e),n=i.charCodeAt(e+1),a=i.charCodeAt(e+2),(r===V2||r===U2)&&(n>=48&&n<=57||(n===Wn||n===Un)&&a>=48&&a<=57))for(e+=n===Wn||n===Un?3:2;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;return{number:i.slice(0,e),unit:i.slice(e)}}});var Gn=v((d4,jm)=>{l();var G2=Pm(),Lm=Im(),$m=Bm();function ht(i){return this instanceof ht?(this.nodes=G2(i),this):new ht(i)}ht.prototype.toString=function(){return Array.isArray(this.nodes)?$m(this.nodes):""};ht.prototype.walk=function(i,e){return Lm(this.nodes,i,e),this};ht.unit=Nm();ht.walk=Lm;ht.stringify=$m;jm.exports=ht});var Gm=v((h4,Wm)=>{l();var{list:H2}=ye(),zm=Gn(),Y2=dt(),Vm=ii(),Um=class{constructor(e){this.props=["transition","transition-property"],this.prefixes=e}add(e,t){let r,n,a=this.prefixes.add[e.prop],s=this.ruleVendorPrefixes(e),o=s||a&&a.prefixes||[],u=this.parse(e.value),c=u.map(m=>this.findProp(m)),f=[];if(c.some(m=>m[0]==="-"))return;for(let m of u){if(n=this.findProp(m),n[0]==="-")continue;let b=this.prefixes.add[n];if(!(!b||!b.prefixes))for(r of b.prefixes){if(s&&!s.some(y=>r.includes(y)))continue;let x=this.prefixes.prefixed(n,r);x!=="-ms-transform"&&!c.includes(x)&&(this.disabled(n,r)||f.push(this.clone(n,x,m)))}}u=u.concat(f);let d=this.stringify(u),p=this.stringify(this.cleanFromUnprefixed(u,"-webkit-"));if(o.includes("-webkit-")&&this.cloneBefore(e,`-webkit-${e.prop}`,p),this.cloneBefore(e,e.prop,p),o.includes("-o-")){let m=this.stringify(this.cleanFromUnprefixed(u,"-o-"));this.cloneBefore(e,`-o-${e.prop}`,m)}for(r of o)if(r!=="-webkit-"&&r!=="-o-"){let m=this.stringify(this.cleanOtherPrefixes(u,r));this.cloneBefore(e,r+e.prop,m)}d!==e.value&&!this.already(e,e.prop,d)&&(this.checkForWarning(t,e),e.cloneBefore(),e.value=d)}findProp(e){let t=e[0].value;if(/^\d/.test(t)){for(let[r,n]of e.entries())if(r!==0&&n.type==="word")return n.value}return t}already(e,t,r){return e.parent.some(n=>n.prop===t&&n.value===r)}cloneBefore(e,t,r){this.already(e,t,r)||e.cloneBefore({prop:t,value:r})}checkForWarning(e,t){if(t.prop!=="transition-property")return;let r=!1,n=!1;t.parent.each(a=>{if(a.type!=="decl"||a.prop.indexOf("transition-")!==0)return;let s=H2.comma(a.value);if(a.prop==="transition-property"){s.forEach(o=>{let u=this.prefixes.add[o];u&&u.prefixes&&u.prefixes.length>0&&(r=!0)});return}return n=n||s.length>1,!1}),r&&n&&t.warn(e,"Replace transition-property to transition, because Autoprefixer could not support any cases of transition-property and other transition-*")}remove(e){let t=this.parse(e.value);t=t.filter(s=>{let o=this.prefixes.remove[this.findProp(s)];return!o||!o.remove});let r=this.stringify(t);if(e.value===r)return;if(t.length===0){e.remove();return}let n=e.parent.some(s=>s.prop===e.prop&&s.value===r),a=e.parent.some(s=>s!==e&&s.prop===e.prop&&s.value.length>r.length);if(n||a){e.remove();return}e.value=r}parse(e){let t=zm(e),r=[],n=[];for(let a of t.nodes)n.push(a),a.type==="div"&&a.value===","&&(r.push(n),n=[]);return r.push(n),r.filter(a=>a.length>0)}stringify(e){if(e.length===0)return"";let t=[];for(let r of e)r[r.length-1].type!=="div"&&r.push(this.div(e)),t=t.concat(r);return t[0].type==="div"&&(t=t.slice(1)),t[t.length-1].type==="div"&&(t=t.slice(0,-2+1||void 0)),zm.stringify({nodes:t})}clone(e,t,r){let n=[],a=!1;for(let s of r)!a&&s.type==="word"&&s.value===e?(n.push({type:"word",value:t}),a=!0):n.push(s);return n}div(e){for(let t of e)for(let r of t)if(r.type==="div"&&r.value===",")return r;return{type:"div",value:",",after:" "}}cleanOtherPrefixes(e,t){return e.filter(r=>{let n=Vm.prefix(this.findProp(r));return n===""||n===t})}cleanFromUnprefixed(e,t){let r=e.map(a=>this.findProp(a)).filter(a=>a.slice(0,t.length)===t).map(a=>this.prefixes.unprefixed(a)),n=[];for(let a of e){let s=this.findProp(a),o=Vm.prefix(s);!r.includes(s)&&(o===t||o==="")&&n.push(a)}return n}disabled(e,t){let r=["order","justify-content","align-self","align-content"];if(e.includes("flex")||r.includes(e)){if(this.prefixes.options.flexbox===!1)return!0;if(this.prefixes.options.flexbox==="no-2009")return t.includes("2009")}}ruleVendorPrefixes(e){let{parent:t}=e;if(t.type!=="rule")return!1;if(!t.selector.includes(":-"))return!1;let r=Y2.prefixes().filter(n=>t.selector.includes(":"+n));return r.length>0?r:!1}};Wm.exports=Um});var Ht=v((m4,Ym)=>{l();var Q2=ue(),Hm=class{constructor(e,t,r,n){this.unprefixed=e,this.prefixed=t,this.string=r||t,this.regexp=n||Q2.regexp(t)}check(e){return e.includes(this.string)?!!e.match(this.regexp):!1}};Ym.exports=Hm});var Se=v((g4,Jm)=>{l();var J2=Wt(),X2=Ht(),K2=ii(),Z2=ue(),Qm=class extends J2{static save(e,t){let r=t.prop,n=[];for(let a in t._autoprefixerValues){let s=t._autoprefixerValues[a];if(s===t.value)continue;let o,u=K2.prefix(r);if(u==="-pie-")continue;if(u===a){o=t.value=s,n.push(o);continue}let c=e.prefixed(r,a),f=t.parent;if(!f.every(b=>b.prop!==c)){n.push(o);continue}let d=s.replace(/\s+/," ");if(f.some(b=>b.prop===t.prop&&b.value.replace(/\s+/," ")===d)){n.push(o);continue}let m=this.clone(t,{value:s});o=t.parent.insertBefore(t,m),n.push(o)}return n}check(e){let t=e.value;return t.includes(this.name)?!!t.match(this.regexp()):!1}regexp(){return this.regexpCache||(this.regexpCache=Z2.regexp(this.name))}replace(e,t){return e.replace(this.regexp(),`$1${t}$2`)}value(e){return e.raws.value&&e.raws.value.value===e.value?e.raws.value.raw:e.value}add(e,t){e._autoprefixerValues||(e._autoprefixerValues={});let r=e._autoprefixerValues[t]||this.value(e),n;do if(n=r,r=this.replace(r,t),r===!1)return;while(r!==n);e._autoprefixerValues[t]=r}old(e){return new X2(this.name,e+this.name)}};Jm.exports=Qm});var mt=v((y4,Xm)=>{l();Xm.exports={}});var el=v((w4,eg)=>{l();var Km=Gn(),eA=Se(),tA=mt().insertAreas,rA=/(^|[^-])linear-gradient\(\s*(top|left|right|bottom)/i,iA=/(^|[^-])radial-gradient\(\s*\d+(\w*|%)\s+\d+(\w*|%)\s*,/i,nA=/(!\s*)?autoprefixer:\s*ignore\s+next/i,sA=/(!\s*)?autoprefixer\s*grid:\s*(on|off|(no-)?autoplace)/i,aA=["width","height","min-width","max-width","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size"];function Zo(i){return i.parent.some(e=>e.prop==="grid-template"||e.prop==="grid-template-areas")}function oA(i){let e=i.parent.some(r=>r.prop==="grid-template-rows"),t=i.parent.some(r=>r.prop==="grid-template-columns");return e&&t}var Zm=class{constructor(e){this.prefixes=e}add(e,t){let r=this.prefixes.add["@resolution"],n=this.prefixes.add["@keyframes"],a=this.prefixes.add["@viewport"],s=this.prefixes.add["@supports"];e.walkAtRules(f=>{if(f.name==="keyframes"){if(!this.disabled(f,t))return n&&n.process(f)}else if(f.name==="viewport"){if(!this.disabled(f,t))return a&&a.process(f)}else if(f.name==="supports"){if(this.prefixes.options.supports!==!1&&!this.disabled(f,t))return s.process(f)}else if(f.name==="media"&&f.params.includes("-resolution")&&!this.disabled(f,t))return r&&r.process(f)}),e.walkRules(f=>{if(!this.disabled(f,t))return this.prefixes.add.selectors.map(d=>d.process(f,t))});function o(f){return f.parent.nodes.some(d=>{if(d.type!=="decl")return!1;let p=d.prop==="display"&&/(inline-)?grid/.test(d.value),m=d.prop.startsWith("grid-template"),b=/^grid-([A-z]+-)?gap/.test(d.prop);return p||m||b})}function u(f){return f.parent.some(d=>d.prop==="display"&&/(inline-)?flex/.test(d.value))}let c=this.gridStatus(e,t)&&this.prefixes.add["grid-area"]&&this.prefixes.add["grid-area"].prefixes;return e.walkDecls(f=>{if(this.disabledDecl(f,t))return;let d=f.parent,p=f.prop,m=f.value;if(p==="grid-row-span"){t.warn("grid-row-span is not part of final Grid Layout. Use grid-row.",{node:f});return}else if(p==="grid-column-span"){t.warn("grid-column-span is not part of final Grid Layout. Use grid-column.",{node:f});return}else if(p==="display"&&m==="box"){t.warn("You should write display: flex by final spec instead of display: box",{node:f});return}else if(p==="text-emphasis-position")(m==="under"||m==="over")&&t.warn("You should use 2 values for text-emphasis-position For example, `under left` instead of just `under`.",{node:f});else if(/^(align|justify|place)-(items|content)$/.test(p)&&u(f))(m==="start"||m==="end")&&t.warn(`${m} value has mixed support, consider using flex-${m} instead`,{node:f});else if(p==="text-decoration-skip"&&m==="ink")t.warn("Replace text-decoration-skip: ink to text-decoration-skip-ink: auto, because spec had been changed",{node:f});else{if(c&&this.gridStatus(f,t))if(f.value==="subgrid"&&t.warn("IE does not support subgrid",{node:f}),/^(align|justify|place)-items$/.test(p)&&o(f)){let x=p.replace("-items","-self");t.warn(`IE does not support ${p} on grid containers. Try using ${x} on child elements instead: ${f.parent.selector} > * { ${x}: ${f.value} }`,{node:f})}else if(/^(align|justify|place)-content$/.test(p)&&o(f))t.warn(`IE does not support ${f.prop} on grid containers`,{node:f});else if(p==="display"&&f.value==="contents"){t.warn("Please do not use display: contents; if you have grid setting enabled",{node:f});return}else if(f.prop==="grid-gap"){let x=this.gridStatus(f,t);x==="autoplace"&&!oA(f)&&!Zo(f)?t.warn("grid-gap only works if grid-template(-areas) is being used or both rows and columns have been declared and cells have not been manually placed inside the explicit grid",{node:f}):(x===!0||x==="no-autoplace")&&!Zo(f)&&t.warn("grid-gap only works if grid-template(-areas) is being used",{node:f})}else if(p==="grid-auto-columns"){t.warn("grid-auto-columns is not supported by IE",{node:f});return}else if(p==="grid-auto-rows"){t.warn("grid-auto-rows is not supported by IE",{node:f});return}else if(p==="grid-auto-flow"){let x=d.some(w=>w.prop==="grid-template-rows"),y=d.some(w=>w.prop==="grid-template-columns");Zo(f)?t.warn("grid-auto-flow is not supported by IE",{node:f}):m.includes("dense")?t.warn("grid-auto-flow: dense is not supported by IE",{node:f}):!x&&!y&&t.warn("grid-auto-flow works only if grid-template-rows and grid-template-columns are present in the same rule",{node:f});return}else if(m.includes("auto-fit")){t.warn("auto-fit value is not supported by IE",{node:f,word:"auto-fit"});return}else if(m.includes("auto-fill")){t.warn("auto-fill value is not supported by IE",{node:f,word:"auto-fill"});return}else p.startsWith("grid-template")&&m.includes("[")&&t.warn("Autoprefixer currently does not support line names. Try using grid-template-areas instead.",{node:f,word:"["});if(m.includes("radial-gradient"))if(iA.test(f.value))t.warn("Gradient has outdated direction syntax. New syntax is like `closest-side at 0 0` instead of `0 0, closest-side`.",{node:f});else{let x=Km(m);for(let y of x.nodes)if(y.type==="function"&&y.value==="radial-gradient")for(let w of y.nodes)w.type==="word"&&(w.value==="cover"?t.warn("Gradient has outdated direction syntax. Replace `cover` to `farthest-corner`.",{node:f}):w.value==="contain"&&t.warn("Gradient has outdated direction syntax. Replace `contain` to `closest-side`.",{node:f}))}m.includes("linear-gradient")&&rA.test(m)&&t.warn("Gradient has outdated direction syntax. New syntax is like `to left` instead of `right`.",{node:f})}aA.includes(f.prop)&&(f.value.includes("-fill-available")||(f.value.includes("fill-available")?t.warn("Replace fill-available to stretch, because spec had been changed",{node:f}):f.value.includes("fill")&&Km(m).nodes.some(y=>y.type==="word"&&y.value==="fill")&&t.warn("Replace fill to stretch, because spec had been changed",{node:f})));let b;if(f.prop==="transition"||f.prop==="transition-property")return this.prefixes.transition.add(f,t);if(f.prop==="align-self"){if(this.displayType(f)!=="grid"&&this.prefixes.options.flexbox!==!1&&(b=this.prefixes.add["align-self"],b&&b.prefixes&&b.process(f)),this.gridStatus(f,t)!==!1&&(b=this.prefixes.add["grid-row-align"],b&&b.prefixes))return b.process(f,t)}else if(f.prop==="justify-self"){if(this.gridStatus(f,t)!==!1&&(b=this.prefixes.add["grid-column-align"],b&&b.prefixes))return b.process(f,t)}else if(f.prop==="place-self"){if(b=this.prefixes.add["place-self"],b&&b.prefixes&&this.gridStatus(f,t)!==!1)return b.process(f,t)}else if(b=this.prefixes.add[f.prop],b&&b.prefixes)return b.process(f,t)}),this.gridStatus(e,t)&&tA(e,this.disabled),e.walkDecls(f=>{if(this.disabledValue(f,t))return;let d=this.prefixes.unprefixed(f.prop),p=this.prefixes.values("add",d);if(Array.isArray(p))for(let m of p)m.process&&m.process(f,t);eA.save(this.prefixes,f)})}remove(e,t){let r=this.prefixes.remove["@resolution"];e.walkAtRules((n,a)=>{this.prefixes.remove[`@${n.name}`]?this.disabled(n,t)||n.parent.removeChild(a):n.name==="media"&&n.params.includes("-resolution")&&r&&r.clean(n)});for(let n of this.prefixes.remove.selectors)e.walkRules((a,s)=>{n.check(a)&&(this.disabled(a,t)||a.parent.removeChild(s))});return e.walkDecls((n,a)=>{if(this.disabled(n,t))return;let s=n.parent,o=this.prefixes.unprefixed(n.prop);if((n.prop==="transition"||n.prop==="transition-property")&&this.prefixes.transition.remove(n),this.prefixes.remove[n.prop]&&this.prefixes.remove[n.prop].remove){let u=this.prefixes.group(n).down(c=>this.prefixes.normalize(c.prop)===o);if(o==="flex-flow"&&(u=!0),n.prop==="-webkit-box-orient"){let c={"flex-direction":!0,"flex-flow":!0};if(!n.parent.some(f=>c[f.prop]))return}if(u&&!this.withHackValue(n)){n.raw("before").includes(`
`)&&this.reduceSpaces(n),s.removeChild(a);return}}for(let u of this.prefixes.values("remove",o)){if(!u.check||!u.check(n.value))continue;if(o=u.unprefixed,this.prefixes.group(n).down(f=>f.value.includes(o))){s.removeChild(a);return}}})}withHackValue(e){return e.prop==="-webkit-background-clip"&&e.value==="text"}disabledValue(e,t){return this.gridStatus(e,t)===!1&&e.type==="decl"&&e.prop==="display"&&e.value.includes("grid")||this.prefixes.options.flexbox===!1&&e.type==="decl"&&e.prop==="display"&&e.value.includes("flex")||e.type==="decl"&&e.prop==="content"?!0:this.disabled(e,t)}disabledDecl(e,t){if(this.gridStatus(e,t)===!1&&e.type==="decl"&&(e.prop.includes("grid")||e.prop==="justify-items"))return!0;if(this.prefixes.options.flexbox===!1&&e.type==="decl"){let r=["order","justify-content","align-items","align-content"];if(e.prop.includes("flex")||r.includes(e.prop))return!0}return this.disabled(e,t)}disabled(e,t){if(!e)return!1;if(e._autoprefixerDisabled!==void 0)return e._autoprefixerDisabled;if(e.parent){let n=e.prev();if(n&&n.type==="comment"&&nA.test(n.text))return e._autoprefixerDisabled=!0,e._autoprefixerSelfDisabled=!0,!0}let r=null;if(e.nodes){let n;e.each(a=>{a.type==="comment"&&/(!\s*)?autoprefixer:\s*(off|on)/i.test(a.text)&&(typeof n!="undefined"?t.warn("Second Autoprefixer control comment was ignored. Autoprefixer applies control comment to whole block, not to next rules.",{node:a}):n=/on/i.test(a.text))}),n!==void 0&&(r=!n)}if(!e.nodes||r===null)if(e.parent){let n=this.disabled(e.parent,t);e.parent._autoprefixerSelfDisabled===!0?r=!1:r=n}else r=!1;return e._autoprefixerDisabled=r,r}reduceSpaces(e){let t=!1;if(this.prefixes.group(e).up(()=>(t=!0,!0)),t)return;let r=e.raw("before").split(`
`),n=r[r.length-1].length,a=!1;this.prefixes.group(e).down(s=>{r=s.raw("before").split(`
`);let o=r.length-1;r[o].length>n&&(a===!1&&(a=r[o].length-n),r[o]=r[o].slice(0,-a),s.raws.before=r.join(`
`))})}displayType(e){for(let t of e.parent.nodes)if(t.prop==="display"){if(t.value.includes("flex"))return"flex";if(t.value.includes("grid"))return"grid"}return!1}gridStatus(e,t){if(!e)return!1;if(e._autoprefixerGridStatus!==void 0)return e._autoprefixerGridStatus;let r=null;if(e.nodes){let n;e.each(a=>{if(a.type==="comment"&&sA.test(a.text)){let s=/:\s*autoplace/i.test(a.text),o=/no-autoplace/i.test(a.text);typeof n!="undefined"?t.warn("Second Autoprefixer grid control comment was ignored. Autoprefixer applies control comments to the whole block, not to the next rules.",{node:a}):s?n="autoplace":o?n=!0:n=/on/i.test(a.text)}}),n!==void 0&&(r=n)}if(e.type==="atrule"&&e.name==="supports"){let n=e.params;n.includes("grid")&&n.includes("auto")&&(r=!1)}if(!e.nodes||r===null)if(e.parent){let n=this.gridStatus(e.parent,t);e.parent._autoprefixerSelfDisabled===!0?r=!1:r=n}else typeof this.prefixes.options.grid!="undefined"?r=this.prefixes.options.grid:typeof h.env.AUTOPREFIXER_GRID!="undefined"?h.env.AUTOPREFIXER_GRID==="autoplace"?r="autoplace":r=!0:r=!1;return e._autoprefixerGridStatus=r,r}};eg.exports=Zm});var rg=v((b4,tg)=>{l();tg.exports={A:{A:{"2":"K E F G A B JC"},B:{"1":"C L M H N D O P Q R S T U V W X Y Z a b c d e f g h i j n o p q r s t u v w x y z I"},C:{"1":"2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB WB XB YB ZB aB bB cB 0B dB 1B eB fB gB hB iB jB kB lB mB nB oB m pB qB rB sB tB P Q R 2B S T U V W X Y Z a b c d e f g h i j n o p q r s t u v w x y z I uB 3B 4B","2":"0 1 KC zB J K E F G A B C L M H N D O k l LC MC"},D:{"1":"8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB WB XB YB ZB aB bB cB 0B dB 1B eB fB gB hB iB jB kB lB mB nB oB m pB qB rB sB tB P Q R S T U V W X Y Z a b c d e f g h i j n o p q r s t u v w x y z I uB 3B 4B","2":"0 1 2 3 4 5 6 7 J K E F G A B C L M H N D O k l"},E:{"1":"G A B C L M H D RC 6B vB wB 7B SC TC 8B 9B xB AC yB BC CC DC EC FC GC UC","2":"0 J K E F NC 5B OC PC QC"},F:{"1":"1 2 3 4 5 6 7 8 9 H N D O k l AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB m pB qB rB sB tB P Q R 2B S T U V W X Y Z a b c d e f g h i j wB","2":"G B C VC WC XC YC vB HC ZC"},G:{"1":"D fC gC hC iC jC kC lC mC nC oC pC qC rC sC tC 8B 9B xB AC yB BC CC DC EC FC GC","2":"F 5B aC IC bC cC dC eC"},H:{"1":"uC"},I:{"1":"I zC 0C","2":"zB J vC wC xC yC IC"},J:{"2":"E A"},K:{"1":"m","2":"A B C vB HC wB"},L:{"1":"I"},M:{"1":"uB"},N:{"2":"A B"},O:{"1":"xB"},P:{"1":"J k l 1C 2C 3C 4C 5C 6B 6C 7C 8C 9C AD yB BD CD DD"},Q:{"1":"7B"},R:{"1":"ED"},S:{"1":"FD GD"}},B:4,C:"CSS Feature Queries"}});var ag=v((v4,sg)=>{l();function ig(i){return i[i.length-1]}var ng={parse(i){let e=[""],t=[e];for(let r of i){if(r==="("){e=[""],ig(t).push(e),t.push(e);continue}if(r===")"){t.pop(),e=ig(t),e.push("");continue}e[e.length-1]+=r}return t[0]},stringify(i){let e="";for(let t of i){if(typeof t=="object"){e+=`(${ng.stringify(t)})`;continue}e+=t}return e}};sg.exports=ng});var cg=v((x4,fg)=>{l();var lA=rg(),{feature:uA}=($n(),Ln),{parse:fA}=ye(),cA=dt(),tl=ag(),pA=Se(),dA=ue(),og=uA(lA),lg=[];for(let i in og.stats){let e=og.stats[i];for(let t in e){let r=e[t];/y/.test(r)&&lg.push(i+" "+t)}}var ug=class{constructor(e,t){this.Prefixes=e,this.all=t}prefixer(){if(this.prefixerCache)return this.prefixerCache;let e=this.all.browsers.selected.filter(r=>lg.includes(r)),t=new cA(this.all.browsers.data,e,this.all.options);return this.prefixerCache=new this.Prefixes(this.all.data,t,this.all.options),this.prefixerCache}parse(e){let t=e.split(":"),r=t[0],n=t[1];return n||(n=""),[r.trim(),n.trim()]}virtual(e){let[t,r]=this.parse(e),n=fA("a{}").first;return n.append({prop:t,value:r,raws:{before:""}}),n}prefixed(e){let t=this.virtual(e);if(this.disabled(t.first))return t.nodes;let r={warn:()=>null},n=this.prefixer().add[t.first.prop];n&&n.process&&n.process(t.first,r);for(let a of t.nodes){for(let s of this.prefixer().values("add",t.first.prop))s.process(a);pA.save(this.all,a)}return t.nodes}isNot(e){return typeof e=="string"&&/not\s*/i.test(e)}isOr(e){return typeof e=="string"&&/\s*or\s*/i.test(e)}isProp(e){return typeof e=="object"&&e.length===1&&typeof e[0]=="string"}isHack(e,t){return!new RegExp(`(\\(|\\s)${dA.escapeRegexp(t)}:`).test(e)}toRemove(e,t){let[r,n]=this.parse(e),a=this.all.unprefixed(r),s=this.all.cleaner();if(s.remove[r]&&s.remove[r].remove&&!this.isHack(t,a))return!0;for(let o of s.values("remove",a))if(o.check(n))return!0;return!1}remove(e,t){let r=0;for(;r<e.length;){if(!this.isNot(e[r-1])&&this.isProp(e[r])&&this.isOr(e[r+1])){if(this.toRemove(e[r][0],t)){e.splice(r,2);continue}r+=2;continue}typeof e[r]=="object"&&(e[r]=this.remove(e[r],t)),r+=1}return e}cleanBrackets(e){return e.map(t=>typeof t!="object"?t:t.length===1&&typeof t[0]=="object"?this.cleanBrackets(t[0]):this.cleanBrackets(t))}convert(e){let t=[""];for(let r of e)t.push([`${r.prop}: ${r.value}`]),t.push(" or ");return t[t.length-1]="",t}normalize(e){if(typeof e!="object")return e;if(e=e.filter(t=>t!==""),typeof e[0]=="string"){let t=e[0].trim();if(t.includes(":")||t==="selector"||t==="not selector")return[tl.stringify(e)]}return e.map(t=>this.normalize(t))}add(e,t){return e.map(r=>{if(this.isProp(r)){let n=this.prefixed(r[0]);return n.length>1?this.convert(n):r}return typeof r=="object"?this.add(r,t):r})}process(e){let t=tl.parse(e.params);t=this.normalize(t),t=this.remove(t,e.params),t=this.add(t,e.params),t=this.cleanBrackets(t),e.params=tl.stringify(t)}disabled(e){if(!this.all.options.grid&&(e.prop==="display"&&e.value.includes("grid")||e.prop.includes("grid")||e.prop==="justify-items"))return!0;if(this.all.options.flexbox===!1){if(e.prop==="display"&&e.value.includes("flex"))return!0;let t=["order","justify-content","align-items","align-content"];if(e.prop.includes("flex")||t.includes(e.prop))return!0}return!1}};fg.exports=ug});var hg=v((k4,dg)=>{l();var pg=class{constructor(e,t){this.prefix=t,this.prefixed=e.prefixed(this.prefix),this.regexp=e.regexp(this.prefix),this.prefixeds=e.possible().map(r=>[e.prefixed(r),e.regexp(r)]),this.unprefixed=e.name,this.nameRegexp=e.regexp()}isHack(e){let t=e.parent.index(e)+1,r=e.parent.nodes;for(;t<r.length;){let n=r[t].selector;if(!n)return!0;if(n.includes(this.unprefixed)&&n.match(this.nameRegexp))return!1;let a=!1;for(let[s,o]of this.prefixeds)if(n.includes(s)&&n.match(o)){a=!0;break}if(!a)return!0;t+=1}return!0}check(e){return!(!e.selector.includes(this.prefixed)||!e.selector.match(this.regexp)||this.isHack(e))}};dg.exports=pg});var Yt=v((S4,gg)=>{l();var{list:hA}=ye(),mA=hg(),gA=Wt(),yA=dt(),wA=ue(),mg=class extends gA{constructor(e,t,r){super(e,t,r);this.regexpCache=new Map}check(e){return e.selector.includes(this.name)?!!e.selector.match(this.regexp()):!1}prefixed(e){return this.name.replace(/^(\W*)/,`$1${e}`)}regexp(e){if(!this.regexpCache.has(e)){let t=e?this.prefixed(e):this.name;this.regexpCache.set(e,new RegExp(`(^|[^:"'=])${wA.escapeRegexp(t)}`,"gi"))}return this.regexpCache.get(e)}possible(){return yA.prefixes()}prefixeds(e){if(e._autoprefixerPrefixeds){if(e._autoprefixerPrefixeds[this.name])return e._autoprefixerPrefixeds}else e._autoprefixerPrefixeds={};let t={};if(e.selector.includes(",")){let n=hA.comma(e.selector).filter(a=>a.includes(this.name));for(let a of this.possible())t[a]=n.map(s=>this.replace(s,a)).join(", ")}else for(let r of this.possible())t[r]=this.replace(e.selector,r);return e._autoprefixerPrefixeds[this.name]=t,e._autoprefixerPrefixeds}already(e,t,r){let n=e.parent.index(e)-1;for(;n>=0;){let a=e.parent.nodes[n];if(a.type!=="rule")return!1;let s=!1;for(let o in t[this.name]){let u=t[this.name][o];if(a.selector===u){if(r===o)return!0;s=!0;break}}if(!s)return!1;n-=1}return!1}replace(e,t){return e.replace(this.regexp(),`$1${this.prefixed(t)}`)}add(e,t){let r=this.prefixeds(e);if(this.already(e,r,t))return;let n=this.clone(e,{selector:r[this.name][t]});e.parent.insertBefore(e,n)}old(e){return new mA(this,e)}};gg.exports=mg});var bg=v((C4,wg)=>{l();var bA=Wt(),yg=class extends bA{add(e,t){let r=t+e.name;if(e.parent.some(s=>s.name===r&&s.params===e.params))return;let a=this.clone(e,{name:r});return e.parent.insertBefore(e,a)}process(e){let t=this.parentPrefix(e);for(let r of this.prefixes)(!t||t===r)&&this.add(e,r)}};wg.exports=yg});var xg=v((A4,vg)=>{l();var vA=Yt(),rl=class extends vA{prefixed(e){return e==="-webkit-"?":-webkit-full-screen":e==="-moz-"?":-moz-full-screen":`:${e}fullscreen`}};rl.names=[":fullscreen"];vg.exports=rl});var Sg=v((_4,kg)=>{l();var xA=Yt(),il=class extends xA{possible(){return super.possible().concat(["-moz- old","-ms- old"])}prefixed(e){return e==="-webkit-"?"::-webkit-input-placeholder":e==="-ms-"?"::-ms-input-placeholder":e==="-ms- old"?":-ms-input-placeholder":e==="-moz- old"?":-moz-placeholder":`::${e}placeholder`}};il.names=["::placeholder"];kg.exports=il});var Ag=v((O4,Cg)=>{l();var kA=Yt(),nl=class extends kA{prefixed(e){return e==="-ms-"?":-ms-input-placeholder":`:${e}placeholder-shown`}};nl.names=[":placeholder-shown"];Cg.exports=nl});var Og=v((E4,_g)=>{l();var SA=Yt(),CA=ue(),sl=class extends SA{constructor(e,t,r){super(e,t,r);this.prefixes&&(this.prefixes=CA.uniq(this.prefixes.map(n=>"-webkit-")))}prefixed(e){return e==="-webkit-"?"::-webkit-file-upload-button":`::${e}file-selector-button`}};sl.names=["::file-selector-button"];_g.exports=sl});var de=v((T4,Eg)=>{l();Eg.exports=function(i){let e;return i==="-webkit- 2009"||i==="-moz-"?e=2009:i==="-ms-"?e=2012:i==="-webkit-"&&(e="final"),i==="-webkit- 2009"&&(i="-webkit-"),[e,i]}});var Ig=v((P4,Dg)=>{l();var Tg=ye().list,Pg=de(),AA=M(),Qt=class extends AA{prefixed(e,t){let r;return[r,t]=Pg(t),r===2009?t+"box-flex":super.prefixed(e,t)}normalize(){return"flex"}set(e,t){let r=Pg(t)[0];if(r===2009)return e.value=Tg.space(e.value)[0],e.value=Qt.oldValues[e.value]||e.value,super.set(e,t);if(r===2012){let n=Tg.space(e.value);n.length===3&&n[2]==="0"&&(e.value=n.slice(0,2).concat("0px").join(" "))}return super.set(e,t)}};Qt.names=["flex","box-flex"];Qt.oldValues={auto:"1",none:"0"};Dg.exports=Qt});var Mg=v((D4,Rg)=>{l();var qg=de(),_A=M(),al=class extends _A{prefixed(e,t){let r;return[r,t]=qg(t),r===2009?t+"box-ordinal-group":r===2012?t+"flex-order":super.prefixed(e,t)}normalize(){return"order"}set(e,t){return qg(t)[0]===2009&&/\d/.test(e.value)?(e.value=(parseInt(e.value)+1).toString(),super.set(e,t)):super.set(e,t)}};al.names=["order","flex-order","box-ordinal-group"];Rg.exports=al});var Fg=v((I4,Bg)=>{l();var OA=M(),ol=class extends OA{check(e){let t=e.value;return!t.toLowerCase().includes("alpha(")&&!t.includes("DXImageTransform.Microsoft")&&!t.includes("data:image/svg+xml")}};ol.names=["filter"];Bg.exports=ol});var Lg=v((q4,Ng)=>{l();var EA=M(),ll=class extends EA{insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);let a=this.clone(e),s=e.prop.replace(/end$/,"start"),o=t+e.prop.replace(/end$/,"span");if(!e.parent.some(u=>u.prop===o)){if(a.prop=o,e.value.includes("span"))a.value=e.value.replace(/span\s/i,"");else{let u;if(e.parent.walkDecls(s,c=>{u=c}),u){let c=Number(e.value)-Number(u.value)+"";a.value=c}else e.warn(n,`Can not prefix ${e.prop} (${s} is not found)`)}e.cloneBefore(a)}}};ll.names=["grid-row-end","grid-column-end"];Ng.exports=ll});var jg=v((R4,$g)=>{l();var TA=M(),ul=class extends TA{check(e){return!e.value.split(/\s+/).some(t=>{let r=t.toLowerCase();return r==="reverse"||r==="alternate-reverse"})}};ul.names=["animation","animation-direction"];$g.exports=ul});var Vg=v((M4,zg)=>{l();var PA=de(),DA=M(),fl=class extends DA{insert(e,t,r){let n;if([n,t]=PA(t),n!==2009)return super.insert(e,t,r);let a=e.value.split(/\s+/).filter(d=>d!=="wrap"&&d!=="nowrap"&&"wrap-reverse");if(a.length===0||e.parent.some(d=>d.prop===t+"box-orient"||d.prop===t+"box-direction"))return;let o=a[0],u=o.includes("row")?"horizontal":"vertical",c=o.includes("reverse")?"reverse":"normal",f=this.clone(e);return f.prop=t+"box-orient",f.value=u,this.needCascade(e)&&(f.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,f),f=this.clone(e),f.prop=t+"box-direction",f.value=c,this.needCascade(e)&&(f.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,f)}};fl.names=["flex-flow","box-direction","box-orient"];zg.exports=fl});var Wg=v((B4,Ug)=>{l();var IA=de(),qA=M(),cl=class extends qA{normalize(){return"flex"}prefixed(e,t){let r;return[r,t]=IA(t),r===2009?t+"box-flex":r===2012?t+"flex-positive":super.prefixed(e,t)}};cl.names=["flex-grow","flex-positive"];Ug.exports=cl});var Hg=v((F4,Gg)=>{l();var RA=de(),MA=M(),pl=class extends MA{set(e,t){if(RA(t)[0]!==2009)return super.set(e,t)}};pl.names=["flex-wrap"];Gg.exports=pl});var Qg=v((N4,Yg)=>{l();var BA=M(),Jt=mt(),dl=class extends BA{insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);let a=Jt.parse(e),[s,o]=Jt.translate(a,0,2),[u,c]=Jt.translate(a,1,3);[["grid-row",s],["grid-row-span",o],["grid-column",u],["grid-column-span",c]].forEach(([f,d])=>{Jt.insertDecl(e,f,d)}),Jt.warnTemplateSelectorNotFound(e,n),Jt.warnIfGridRowColumnExists(e,n)}};dl.names=["grid-area"];Yg.exports=dl});var Xg=v((L4,Jg)=>{l();var FA=M(),ni=mt(),hl=class extends FA{insert(e,t,r){if(t!=="-ms-")return super.insert(e,t,r);if(e.parent.some(s=>s.prop==="-ms-grid-row-align"))return;let[[n,a]]=ni.parse(e);a?(ni.insertDecl(e,"grid-row-align",n),ni.insertDecl(e,"grid-column-align",a)):(ni.insertDecl(e,"grid-row-align",n),ni.insertDecl(e,"grid-column-align",n))}};hl.names=["place-self"];Jg.exports=hl});var Zg=v(($4,Kg)=>{l();var NA=M(),ml=class extends NA{check(e){let t=e.value;return!t.includes("/")||t.includes("span")}normalize(e){return e.replace("-start","")}prefixed(e,t){let r=super.prefixed(e,t);return t==="-ms-"&&(r=r.replace("-start","")),r}};ml.names=["grid-row-start","grid-column-start"];Kg.exports=ml});var ry=v((j4,ty)=>{l();var ey=de(),LA=M(),Xt=class extends LA{check(e){return e.parent&&!e.parent.some(t=>t.prop&&t.prop.startsWith("grid-"))}prefixed(e,t){let r;return[r,t]=ey(t),r===2012?t+"flex-item-align":super.prefixed(e,t)}normalize(){return"align-self"}set(e,t){let r=ey(t)[0];if(r===2012)return e.value=Xt.oldValues[e.value]||e.value,super.set(e,t);if(r==="final")return super.set(e,t)}};Xt.names=["align-self","flex-item-align"];Xt.oldValues={"flex-end":"end","flex-start":"start"};ty.exports=Xt});var ny=v((z4,iy)=>{l();var $A=M(),jA=ue(),gl=class extends $A{constructor(e,t,r){super(e,t,r);this.prefixes&&(this.prefixes=jA.uniq(this.prefixes.map(n=>n==="-ms-"?"-webkit-":n)))}};gl.names=["appearance"];iy.exports=gl});var oy=v((V4,ay)=>{l();var sy=de(),zA=M(),yl=class extends zA{normalize(){return"flex-basis"}prefixed(e,t){let r;return[r,t]=sy(t),r===2012?t+"flex-preferred-size":super.prefixed(e,t)}set(e,t){let r;if([r,t]=sy(t),r===2012||r==="final")return super.set(e,t)}};yl.names=["flex-basis","flex-preferred-size"];ay.exports=yl});var uy=v((U4,ly)=>{l();var VA=M(),wl=class extends VA{normalize(){return this.name.replace("box-image","border")}prefixed(e,t){let r=super.prefixed(e,t);return t==="-webkit-"&&(r=r.replace("border","box-image")),r}};wl.names=["mask-border","mask-border-source","mask-border-slice","mask-border-width","mask-border-outset","mask-border-repeat","mask-box-image","mask-box-image-source","mask-box-image-slice","mask-box-image-width","mask-box-image-outset","mask-box-image-repeat"];ly.exports=wl});var cy=v((W4,fy)=>{l();var UA=M(),Le=class extends UA{insert(e,t,r){let n=e.prop==="mask-composite",a;n?a=e.value.split(","):a=e.value.match(Le.regexp)||[],a=a.map(c=>c.trim()).filter(c=>c);let s=a.length,o;if(s&&(o=this.clone(e),o.value=a.map(c=>Le.oldValues[c]||c).join(", "),a.includes("intersect")&&(o.value+=", xor"),o.prop=t+"mask-composite"),n)return s?(this.needCascade(e)&&(o.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,o)):void 0;let u=this.clone(e);return u.prop=t+u.prop,s&&(u.value=u.value.replace(Le.regexp,"")),this.needCascade(e)&&(u.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,u),s?(this.needCascade(e)&&(o.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,o)):e}};Le.names=["mask","mask-composite"];Le.oldValues={add:"source-over",subtract:"source-out",intersect:"source-in",exclude:"xor"};Le.regexp=new RegExp(`\\s+(${Object.keys(Le.oldValues).join("|")})\\b(?!\\))\\s*(?=[,])`,"ig");fy.exports=Le});var hy=v((G4,dy)=>{l();var py=de(),WA=M(),Kt=class extends WA{prefixed(e,t){let r;return[r,t]=py(t),r===2009?t+"box-align":r===2012?t+"flex-align":super.prefixed(e,t)}normalize(){return"align-items"}set(e,t){let r=py(t)[0];return(r===2009||r===2012)&&(e.value=Kt.oldValues[e.value]||e.value),super.set(e,t)}};Kt.names=["align-items","flex-align","box-align"];Kt.oldValues={"flex-end":"end","flex-start":"start"};dy.exports=Kt});var gy=v((H4,my)=>{l();var GA=M(),bl=class extends GA{set(e,t){return t==="-ms-"&&e.value==="contain"&&(e.value="element"),super.set(e,t)}insert(e,t,r){if(!(e.value==="all"&&t==="-ms-"))return super.insert(e,t,r)}};bl.names=["user-select"];my.exports=bl});var by=v((Y4,wy)=>{l();var yy=de(),HA=M(),vl=class extends HA{normalize(){return"flex-shrink"}prefixed(e,t){let r;return[r,t]=yy(t),r===2012?t+"flex-negative":super.prefixed(e,t)}set(e,t){let r;if([r,t]=yy(t),r===2012||r==="final")return super.set(e,t)}};vl.names=["flex-shrink","flex-negative"];wy.exports=vl});var xy=v((Q4,vy)=>{l();var YA=M(),xl=class extends YA{prefixed(e,t){return`${t}column-${e}`}normalize(e){return e.includes("inside")?"break-inside":e.includes("before")?"break-before":"break-after"}set(e,t){return(e.prop==="break-inside"&&e.value==="avoid-column"||e.value==="avoid-page")&&(e.value="avoid"),super.set(e,t)}insert(e,t,r){if(e.prop!=="break-inside")return super.insert(e,t,r);if(!(/region/i.test(e.value)||/page/i.test(e.value)))return super.insert(e,t,r)}};xl.names=["break-inside","page-break-inside","column-break-inside","break-before","page-break-before","column-break-before","break-after","page-break-after","column-break-after"];vy.exports=xl});var Sy=v((J4,ky)=>{l();var QA=M(),kl=class extends QA{prefixed(e,t){return t+"print-color-adjust"}normalize(){return"color-adjust"}};kl.names=["color-adjust","print-color-adjust"];ky.exports=kl});var Ay=v((X4,Cy)=>{l();var JA=M(),Zt=class extends JA{insert(e,t,r){if(t==="-ms-"){let n=this.set(this.clone(e),t);this.needCascade(e)&&(n.raws.before=this.calcBefore(r,e,t));let a="ltr";return e.parent.nodes.forEach(s=>{s.prop==="direction"&&(s.value==="rtl"||s.value==="ltr")&&(a=s.value)}),n.value=Zt.msValues[a][e.value]||e.value,e.parent.insertBefore(e,n)}return super.insert(e,t,r)}};Zt.names=["writing-mode"];Zt.msValues={ltr:{"horizontal-tb":"lr-tb","vertical-rl":"tb-rl","vertical-lr":"tb-lr"},rtl:{"horizontal-tb":"rl-tb","vertical-rl":"bt-rl","vertical-lr":"bt-lr"}};Cy.exports=Zt});var Oy=v((K4,_y)=>{l();var XA=M(),Sl=class extends XA{set(e,t){return e.value=e.value.replace(/\s+fill(\s)/,"$1"),super.set(e,t)}};Sl.names=["border-image"];_y.exports=Sl});var Py=v((Z4,Ty)=>{l();var Ey=de(),KA=M(),er=class extends KA{prefixed(e,t){let r;return[r,t]=Ey(t),r===2012?t+"flex-line-pack":super.prefixed(e,t)}normalize(){return"align-content"}set(e,t){let r=Ey(t)[0];if(r===2012)return e.value=er.oldValues[e.value]||e.value,super.set(e,t);if(r==="final")return super.set(e,t)}};er.names=["align-content","flex-line-pack"];er.oldValues={"flex-end":"end","flex-start":"start","space-between":"justify","space-around":"distribute"};Ty.exports=er});var Iy=v((eI,Dy)=>{l();var ZA=M(),Ce=class extends ZA{prefixed(e,t){return t==="-moz-"?t+(Ce.toMozilla[e]||e):super.prefixed(e,t)}normalize(e){return Ce.toNormal[e]||e}};Ce.names=["border-radius"];Ce.toMozilla={};Ce.toNormal={};for(let i of["top","bottom"])for(let e of["left","right"]){let t=`border-${i}-${e}-radius`,r=`border-radius-${i}${e}`;Ce.names.push(t),Ce.names.push(r),Ce.toMozilla[t]=r,Ce.toNormal[r]=t}Dy.exports=Ce});var Ry=v((tI,qy)=>{l();var e_=M(),Cl=class extends e_{prefixed(e,t){return e.includes("-start")?t+e.replace("-block-start","-before"):t+e.replace("-block-end","-after")}normalize(e){return e.includes("-before")?e.replace("-before","-block-start"):e.replace("-after","-block-end")}};Cl.names=["border-block-start","border-block-end","margin-block-start","margin-block-end","padding-block-start","padding-block-end","border-before","border-after","margin-before","margin-after","padding-before","padding-after"];qy.exports=Cl});var By=v((rI,My)=>{l();var t_=M(),{parseTemplate:r_,warnMissedAreas:i_,getGridGap:n_,warnGridGap:s_,inheritGridGap:a_}=mt(),Al=class extends t_{insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);if(e.parent.some(m=>m.prop==="-ms-grid-rows"))return;let a=n_(e),s=a_(e,a),{rows:o,columns:u,areas:c}=r_({decl:e,gap:s||a}),f=Object.keys(c).length>0,d=Boolean(o),p=Boolean(u);return s_({gap:a,hasColumns:p,decl:e,result:n}),i_(c,e,n),(d&&p||f)&&e.cloneBefore({prop:"-ms-grid-rows",value:o,raws:{}}),p&&e.cloneBefore({prop:"-ms-grid-columns",value:u,raws:{}}),e}};Al.names=["grid-template"];My.exports=Al});var Ny=v((iI,Fy)=>{l();var o_=M(),_l=class extends o_{prefixed(e,t){return t+e.replace("-inline","")}normalize(e){return e.replace(/(margin|padding|border)-(start|end)/,"$1-inline-$2")}};_l.names=["border-inline-start","border-inline-end","margin-inline-start","margin-inline-end","padding-inline-start","padding-inline-end","border-start","border-end","margin-start","margin-end","padding-start","padding-end"];Fy.exports=_l});var $y=v((nI,Ly)=>{l();var l_=M(),Ol=class extends l_{check(e){return!e.value.includes("flex-")&&e.value!=="baseline"}prefixed(e,t){return t+"grid-row-align"}normalize(){return"align-self"}};Ol.names=["grid-row-align"];Ly.exports=Ol});var zy=v((sI,jy)=>{l();var u_=M(),tr=class extends u_{keyframeParents(e){let{parent:t}=e;for(;t;){if(t.type==="atrule"&&t.name==="keyframes")return!0;({parent:t}=t)}return!1}contain3d(e){if(e.prop==="transform-origin")return!1;for(let t of tr.functions3d)if(e.value.includes(`${t}(`))return!0;return!1}set(e,t){return e=super.set(e,t),t==="-ms-"&&(e.value=e.value.replace(/rotatez/gi,"rotate")),e}insert(e,t,r){if(t==="-ms-"){if(!this.contain3d(e)&&!this.keyframeParents(e))return super.insert(e,t,r)}else if(t==="-o-"){if(!this.contain3d(e))return super.insert(e,t,r)}else return super.insert(e,t,r)}};tr.names=["transform","transform-origin"];tr.functions3d=["matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","perspective"];jy.exports=tr});var Wy=v((aI,Uy)=>{l();var Vy=de(),f_=M(),El=class extends f_{normalize(){return"flex-direction"}insert(e,t,r){let n;if([n,t]=Vy(t),n!==2009)return super.insert(e,t,r);if(e.parent.some(f=>f.prop===t+"box-orient"||f.prop===t+"box-direction"))return;let s=e.value,o,u;s==="inherit"||s==="initial"||s==="unset"?(o=s,u=s):(o=s.includes("row")?"horizontal":"vertical",u=s.includes("reverse")?"reverse":"normal");let c=this.clone(e);return c.prop=t+"box-orient",c.value=o,this.needCascade(e)&&(c.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,c),c=this.clone(e),c.prop=t+"box-direction",c.value=u,this.needCascade(e)&&(c.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,c)}old(e,t){let r;return[r,t]=Vy(t),r===2009?[t+"box-orient",t+"box-direction"]:super.old(e,t)}};El.names=["flex-direction","box-direction","box-orient"];Uy.exports=El});var Hy=v((oI,Gy)=>{l();var c_=M(),Tl=class extends c_{check(e){return e.value==="pixelated"}prefixed(e,t){return t==="-ms-"?"-ms-interpolation-mode":super.prefixed(e,t)}set(e,t){return t!=="-ms-"?super.set(e,t):(e.prop="-ms-interpolation-mode",e.value="nearest-neighbor",e)}normalize(){return"image-rendering"}process(e,t){return super.process(e,t)}};Tl.names=["image-rendering","interpolation-mode"];Gy.exports=Tl});var Qy=v((lI,Yy)=>{l();var p_=M(),d_=ue(),Pl=class extends p_{constructor(e,t,r){super(e,t,r);this.prefixes&&(this.prefixes=d_.uniq(this.prefixes.map(n=>n==="-ms-"?"-webkit-":n)))}};Pl.names=["backdrop-filter"];Yy.exports=Pl});var Xy=v((uI,Jy)=>{l();var h_=M(),m_=ue(),Dl=class extends h_{constructor(e,t,r){super(e,t,r);this.prefixes&&(this.prefixes=m_.uniq(this.prefixes.map(n=>n==="-ms-"?"-webkit-":n)))}check(e){return e.value.toLowerCase()==="text"}};Dl.names=["background-clip"];Jy.exports=Dl});var Zy=v((fI,Ky)=>{l();var g_=M(),y_=["none","underline","overline","line-through","blink","inherit","initial","unset"],Il=class extends g_{check(e){return e.value.split(/\s+/).some(t=>!y_.includes(t))}};Il.names=["text-decoration"];Ky.exports=Il});var rw=v((cI,tw)=>{l();var ew=de(),w_=M(),rr=class extends w_{prefixed(e,t){let r;return[r,t]=ew(t),r===2009?t+"box-pack":r===2012?t+"flex-pack":super.prefixed(e,t)}normalize(){return"justify-content"}set(e,t){let r=ew(t)[0];if(r===2009||r===2012){let n=rr.oldValues[e.value]||e.value;if(e.value=n,r!==2009||n!=="distribute")return super.set(e,t)}else if(r==="final")return super.set(e,t)}};rr.names=["justify-content","flex-pack","box-pack"];rr.oldValues={"flex-end":"end","flex-start":"start","space-between":"justify","space-around":"distribute"};tw.exports=rr});var nw=v((pI,iw)=>{l();var b_=M(),ql=class extends b_{set(e,t){let r=e.value.toLowerCase();return t==="-webkit-"&&!r.includes(" ")&&r!=="contain"&&r!=="cover"&&(e.value=e.value+" "+e.value),super.set(e,t)}};ql.names=["background-size"];iw.exports=ql});var aw=v((dI,sw)=>{l();var v_=M(),Rl=mt(),Ml=class extends v_{insert(e,t,r){if(t!=="-ms-")return super.insert(e,t,r);let n=Rl.parse(e),[a,s]=Rl.translate(n,0,1);n[0]&&n[0].includes("span")&&(s=n[0].join("").replace(/\D/g,"")),[[e.prop,a],[`${e.prop}-span`,s]].forEach(([u,c])=>{Rl.insertDecl(e,u,c)})}};Ml.names=["grid-row","grid-column"];sw.exports=Ml});var uw=v((hI,lw)=>{l();var x_=M(),{prefixTrackProp:ow,prefixTrackValue:k_,autoplaceGridItems:S_,getGridGap:C_,inheritGridGap:A_}=mt(),__=el(),Bl=class extends x_{prefixed(e,t){return t==="-ms-"?ow({prop:e,prefix:t}):super.prefixed(e,t)}normalize(e){return e.replace(/^grid-(rows|columns)/,"grid-template-$1")}insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);let{parent:a,prop:s,value:o}=e,u=s.includes("rows"),c=s.includes("columns"),f=a.some(k=>k.prop==="grid-template"||k.prop==="grid-template-areas");if(f&&u)return!1;let d=new __({options:{}}),p=d.gridStatus(a,n),m=C_(e);m=A_(e,m)||m;let b=u?m.row:m.column;(p==="no-autoplace"||p===!0)&&!f&&(b=null);let x=k_({value:o,gap:b});e.cloneBefore({prop:ow({prop:s,prefix:t}),value:x});let y=a.nodes.find(k=>k.prop==="grid-auto-flow"),w="row";if(y&&!d.disabled(y,n)&&(w=y.value.trim()),p==="autoplace"){let k=a.nodes.find(_=>_.prop==="grid-template-rows");if(!k&&f)return;if(!k&&!f){e.warn(n,"Autoplacement does not work without grid-template-rows property");return}!a.nodes.find(_=>_.prop==="grid-template-columns")&&!f&&e.warn(n,"Autoplacement does not work without grid-template-columns property"),c&&!f&&S_(e,n,m,w)}}};Bl.names=["grid-template-rows","grid-template-columns","grid-rows","grid-columns"];lw.exports=Bl});var cw=v((mI,fw)=>{l();var O_=M(),Fl=class extends O_{check(e){return!e.value.includes("flex-")&&e.value!=="baseline"}prefixed(e,t){return t+"grid-column-align"}normalize(){return"justify-self"}};Fl.names=["grid-column-align"];fw.exports=Fl});var dw=v((gI,pw)=>{l();var E_=M(),Nl=class extends E_{prefixed(e,t){return t+"scroll-chaining"}normalize(){return"overscroll-behavior"}set(e,t){return e.value==="auto"?e.value="chained":(e.value==="none"||e.value==="contain")&&(e.value="none"),super.set(e,t)}};Nl.names=["overscroll-behavior","scroll-chaining"];pw.exports=Nl});var gw=v((yI,mw)=>{l();var T_=M(),{parseGridAreas:P_,warnMissedAreas:D_,prefixTrackProp:I_,prefixTrackValue:hw,getGridGap:q_,warnGridGap:R_,inheritGridGap:M_}=mt();function B_(i){return i.trim().slice(1,-1).split(/["']\s*["']?/g)}var Ll=class extends T_{insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);let a=!1,s=!1,o=e.parent,u=q_(e);u=M_(e,u)||u,o.walkDecls(/-ms-grid-rows/,d=>d.remove()),o.walkDecls(/grid-template-(rows|columns)/,d=>{if(d.prop==="grid-template-rows"){s=!0;let{prop:p,value:m}=d;d.cloneBefore({prop:I_({prop:p,prefix:t}),value:hw({value:m,gap:u.row})})}else a=!0});let c=B_(e.value);a&&!s&&u.row&&c.length>1&&e.cloneBefore({prop:"-ms-grid-rows",value:hw({value:`repeat(${c.length}, auto)`,gap:u.row}),raws:{}}),R_({gap:u,hasColumns:a,decl:e,result:n});let f=P_({rows:c,gap:u});return D_(f,e,n),e}};Ll.names=["grid-template-areas"];mw.exports=Ll});var ww=v((wI,yw)=>{l();var F_=M(),$l=class extends F_{set(e,t){return t==="-webkit-"&&(e.value=e.value.replace(/\s*(right|left)\s*/i,"")),super.set(e,t)}};$l.names=["text-emphasis-position"];yw.exports=$l});var vw=v((bI,bw)=>{l();var N_=M(),jl=class extends N_{set(e,t){return e.prop==="text-decoration-skip-ink"&&e.value==="auto"?(e.prop=t+"text-decoration-skip",e.value="ink",e):super.set(e,t)}};jl.names=["text-decoration-skip-ink","text-decoration-skip"];bw.exports=jl});var _w=v((vI,Aw)=>{l();"use strict";Aw.exports={wrap:xw,limit:kw,validate:Sw,test:zl,curry:L_,name:Cw};function xw(i,e,t){var r=e-i;return((t-i)%r+r)%r+i}function kw(i,e,t){return Math.max(i,Math.min(e,t))}function Sw(i,e,t,r,n){if(!zl(i,e,t,r,n))throw new Error(t+" is outside of range ["+i+","+e+")");return t}function zl(i,e,t,r,n){return!(t<i||t>e||n&&t===e||r&&t===i)}function Cw(i,e,t,r){return(t?"(":"[")+i+","+e+(r?")":"]")}function L_(i,e,t,r){var n=Cw.bind(null,i,e,t,r);return{wrap:xw.bind(null,i,e),limit:kw.bind(null,i,e),validate:function(a){return Sw(i,e,a,t,r)},test:function(a){return zl(i,e,a,t,r)},toString:n,name:n}}});var Tw=v((xI,Ew)=>{l();var Vl=Gn(),$_=_w(),j_=Ht(),z_=Se(),V_=ue(),Ow=/top|left|right|bottom/gi,Qe=class extends z_{replace(e,t){let r=Vl(e);for(let n of r.nodes)if(n.type==="function"&&n.value===this.name)if(n.nodes=this.newDirection(n.nodes),n.nodes=this.normalize(n.nodes),t==="-webkit- old"){if(!this.oldWebkit(n))return!1}else n.nodes=this.convertDirection(n.nodes),n.value=t+n.value;return r.toString()}replaceFirst(e,...t){return t.map(n=>n===" "?{type:"space",value:n}:{type:"word",value:n}).concat(e.slice(1))}normalizeUnit(e,t){return`${parseFloat(e)/t*360}deg`}normalize(e){if(!e[0])return e;if(/-?\d+(.\d+)?grad/.test(e[0].value))e[0].value=this.normalizeUnit(e[0].value,400);else if(/-?\d+(.\d+)?rad/.test(e[0].value))e[0].value=this.normalizeUnit(e[0].value,2*Math.PI);else if(/-?\d+(.\d+)?turn/.test(e[0].value))e[0].value=this.normalizeUnit(e[0].value,1);else if(e[0].value.includes("deg")){let t=parseFloat(e[0].value);t=$_.wrap(0,360,t),e[0].value=`${t}deg`}return e[0].value==="0deg"?e=this.replaceFirst(e,"to"," ","top"):e[0].value==="90deg"?e=this.replaceFirst(e,"to"," ","right"):e[0].value==="180deg"?e=this.replaceFirst(e,"to"," ","bottom"):e[0].value==="270deg"&&(e=this.replaceFirst(e,"to"," ","left")),e}newDirection(e){if(e[0].value==="to"||(Ow.lastIndex=0,!Ow.test(e[0].value)))return e;e.unshift({type:"word",value:"to"},{type:"space",value:" "});for(let t=2;t<e.length&&e[t].type!=="div";t++)e[t].type==="word"&&(e[t].value=this.revertDirection(e[t].value));return e}isRadial(e){let t="before";for(let r of e)if(t==="before"&&r.type==="space")t="at";else if(t==="at"&&r.value==="at")t="after";else{if(t==="after"&&r.type==="space")return!0;if(r.type==="div")break;t="before"}return!1}convertDirection(e){return e.length>0&&(e[0].value==="to"?this.fixDirection(e):e[0].value.includes("deg")?this.fixAngle(e):this.isRadial(e)&&this.fixRadial(e)),e}fixDirection(e){e.splice(0,2);for(let t of e){if(t.type==="div")break;t.type==="word"&&(t.value=this.revertDirection(t.value))}}fixAngle(e){let t=e[0].value;t=parseFloat(t),t=Math.abs(450-t)%360,t=this.roundFloat(t,3),e[0].value=`${t}deg`}fixRadial(e){let t=[],r=[],n,a,s,o,u;for(o=0;o<e.length-2;o++)if(n=e[o],a=e[o+1],s=e[o+2],n.type==="space"&&a.value==="at"&&s.type==="space"){u=o+3;break}else t.push(n);let c;for(o=u;o<e.length;o++)if(e[o].type==="div"){c=e[o];break}else r.push(e[o]);e.splice(0,o,...r,c,...t)}revertDirection(e){return Qe.directions[e.toLowerCase()]||e}roundFloat(e,t){return parseFloat(e.toFixed(t))}oldWebkit(e){let{nodes:t}=e,r=Vl.stringify(e.nodes);if(this.name!=="linear-gradient"||t[0]&&t[0].value.includes("deg")||r.includes("px")||r.includes("-corner")||r.includes("-side"))return!1;let n=[[]];for(let a of t)n[n.length-1].push(a),a.type==="div"&&a.value===","&&n.push([]);this.oldDirection(n),this.colorStops(n),e.nodes=[];for(let a of n)e.nodes=e.nodes.concat(a);return e.nodes.unshift({type:"word",value:"linear"},this.cloneDiv(e.nodes)),e.value="-webkit-gradient",!0}oldDirection(e){let t=this.cloneDiv(e[0]);if(e[0][0].value!=="to")return e.unshift([{type:"word",value:Qe.oldDirections.bottom},t]);{let r=[];for(let a of e[0].slice(2))a.type==="word"&&r.push(a.value.toLowerCase());r=r.join(" ");let n=Qe.oldDirections[r]||r;return e[0]=[{type:"word",value:n},t],e[0]}}cloneDiv(e){for(let t of e)if(t.type==="div"&&t.value===",")return t;return{type:"div",value:",",after:" "}}colorStops(e){let t=[];for(let r=0;r<e.length;r++){let n,a=e[r],s;if(r===0)continue;let o=Vl.stringify(a[0]);a[1]&&a[1].type==="word"?n=a[1].value:a[2]&&a[2].type==="word"&&(n=a[2].value);let u;r===1&&(!n||n==="0%")?u=`from(${o})`:r===e.length-1&&(!n||n==="100%")?u=`to(${o})`:n?u=`color-stop(${n}, ${o})`:u=`color-stop(${o})`;let c=a[a.length-1];e[r]=[{type:"word",value:u}],c.type==="div"&&c.value===","&&(s=e[r].push(c)),t.push(s)}return t}old(e){if(e==="-webkit-"){let t=this.name==="linear-gradient"?"linear":"radial",r="-gradient",n=V_.regexp(`-webkit-(${t}-gradient|gradient\\(\\s*${t})`,!1);return new j_(this.name,e+this.name,r,n)}else return super.old(e)}add(e,t){let r=e.prop;if(r.includes("mask")){if(t==="-webkit-"||t==="-webkit- old")return super.add(e,t)}else if(r==="list-style"||r==="list-style-image"||r==="content"){if(t==="-webkit-"||t==="-webkit- old")return super.add(e,t)}else return super.add(e,t)}};Qe.names=["linear-gradient","repeating-linear-gradient","radial-gradient","repeating-radial-gradient"];Qe.directions={top:"bottom",left:"right",bottom:"top",right:"left"};Qe.oldDirections={top:"left bottom, left top",left:"right top, left top",bottom:"left top, left bottom",right:"left top, right top","top right":"left bottom, right top","top left":"right bottom, left top","right top":"left bottom, right top","right bottom":"left top, right bottom","bottom right":"left top, right bottom","bottom left":"right top, left bottom","left top":"right bottom, left top","left bottom":"right top, left bottom"};Ew.exports=Qe});var Iw=v((kI,Dw)=>{l();var U_=Ht(),W_=Se();function Pw(i){return new RegExp(`(^|[\\s,(])(${i}($|[\\s),]))`,"gi")}var Ul=class extends W_{regexp(){return this.regexpCache||(this.regexpCache=Pw(this.name)),this.regexpCache}isStretch(){return this.name==="stretch"||this.name==="fill"||this.name==="fill-available"}replace(e,t){return t==="-moz-"&&this.isStretch()?e.replace(this.regexp(),"$1-moz-available$3"):t==="-webkit-"&&this.isStretch()?e.replace(this.regexp(),"$1-webkit-fill-available$3"):super.replace(e,t)}old(e){let t=e+this.name;return this.isStretch()&&(e==="-moz-"?t="-moz-available":e==="-webkit-"&&(t="-webkit-fill-available")),new U_(this.name,t,t,Pw(t))}add(e,t){if(!(e.prop.includes("grid")&&t!=="-webkit-"))return super.add(e,t)}};Ul.names=["max-content","min-content","fit-content","fill","fill-available","stretch"];Dw.exports=Ul});var Mw=v((SI,Rw)=>{l();var qw=Ht(),G_=Se(),Wl=class extends G_{replace(e,t){return t==="-webkit-"?e.replace(this.regexp(),"$1-webkit-optimize-contrast"):t==="-moz-"?e.replace(this.regexp(),"$1-moz-crisp-edges"):super.replace(e,t)}old(e){return e==="-webkit-"?new qw(this.name,"-webkit-optimize-contrast"):e==="-moz-"?new qw(this.name,"-moz-crisp-edges"):super.old(e)}};Wl.names=["pixelated"];Rw.exports=Wl});var Fw=v((CI,Bw)=>{l();var H_=Se(),Gl=class extends H_{replace(e,t){let r=super.replace(e,t);return t==="-webkit-"&&(r=r.replace(/("[^"]+"|'[^']+')(\s+\d+\w)/gi,"url($1)$2")),r}};Gl.names=["image-set"];Bw.exports=Gl});var Lw=v((AI,Nw)=>{l();var Y_=ye().list,Q_=Se(),Hl=class extends Q_{replace(e,t){return Y_.space(e).map(r=>{if(r.slice(0,+this.name.length+1)!==this.name+"(")return r;let n=r.lastIndexOf(")"),a=r.slice(n+1),s=r.slice(this.name.length+1,n);if(t==="-webkit-"){let o=s.match(/\d*.?\d+%?/);o?(s=s.slice(o[0].length).trim(),s+=`, ${o[0]}`):s+=", 0.5"}return t+this.name+"("+s+")"+a}).join(" ")}};Hl.names=["cross-fade"];Nw.exports=Hl});var jw=v((_I,$w)=>{l();var J_=de(),X_=Ht(),K_=Se(),Yl=class extends K_{constructor(e,t){super(e,t);e==="display-flex"&&(this.name="flex")}check(e){return e.prop==="display"&&e.value===this.name}prefixed(e){let t,r;return[t,e]=J_(e),t===2009?this.name==="flex"?r="box":r="inline-box":t===2012?this.name==="flex"?r="flexbox":r="inline-flexbox":t==="final"&&(r=this.name),e+r}replace(e,t){return this.prefixed(t)}old(e){let t=this.prefixed(e);if(!!t)return new X_(this.name,t)}};Yl.names=["display-flex","inline-flex"];$w.exports=Yl});var Vw=v((OI,zw)=>{l();var Z_=Se(),Ql=class extends Z_{constructor(e,t){super(e,t);e==="display-grid"&&(this.name="grid")}check(e){return e.prop==="display"&&e.value===this.name}};Ql.names=["display-grid","inline-grid"];zw.exports=Ql});var Ww=v((EI,Uw)=>{l();var e5=Se(),Jl=class extends e5{constructor(e,t){super(e,t);e==="filter-function"&&(this.name="filter")}};Jl.names=["filter","filter-function"];Uw.exports=Jl});var Qw=v((TI,Yw)=>{l();var Gw=ii(),B=M(),Hw=Em(),t5=Gm(),r5=el(),i5=cg(),Xl=dt(),ir=Yt(),n5=bg(),$e=Se(),nr=ue(),s5=xg(),a5=Sg(),o5=Ag(),l5=Og(),u5=Ig(),f5=Mg(),c5=Fg(),p5=Lg(),d5=jg(),h5=Vg(),m5=Wg(),g5=Hg(),y5=Qg(),w5=Xg(),b5=Zg(),v5=ry(),x5=ny(),k5=oy(),S5=uy(),C5=cy(),A5=hy(),_5=gy(),O5=by(),E5=xy(),T5=Sy(),P5=Ay(),D5=Oy(),I5=Py(),q5=Iy(),R5=Ry(),M5=By(),B5=Ny(),F5=$y(),N5=zy(),L5=Wy(),$5=Hy(),j5=Qy(),z5=Xy(),V5=Zy(),U5=rw(),W5=nw(),G5=aw(),H5=uw(),Y5=cw(),Q5=dw(),J5=gw(),X5=ww(),K5=vw(),Z5=Tw(),eO=Iw(),tO=Mw(),rO=Fw(),iO=Lw(),nO=jw(),sO=Vw(),aO=Ww();ir.hack(s5);ir.hack(a5);ir.hack(o5);ir.hack(l5);B.hack(u5);B.hack(f5);B.hack(c5);B.hack(p5);B.hack(d5);B.hack(h5);B.hack(m5);B.hack(g5);B.hack(y5);B.hack(w5);B.hack(b5);B.hack(v5);B.hack(x5);B.hack(k5);B.hack(S5);B.hack(C5);B.hack(A5);B.hack(_5);B.hack(O5);B.hack(E5);B.hack(T5);B.hack(P5);B.hack(D5);B.hack(I5);B.hack(q5);B.hack(R5);B.hack(M5);B.hack(B5);B.hack(F5);B.hack(N5);B.hack(L5);B.hack($5);B.hack(j5);B.hack(z5);B.hack(V5);B.hack(U5);B.hack(W5);B.hack(G5);B.hack(H5);B.hack(Y5);B.hack(Q5);B.hack(J5);B.hack(X5);B.hack(K5);$e.hack(Z5);$e.hack(eO);$e.hack(tO);$e.hack(rO);$e.hack(iO);$e.hack(nO);$e.hack(sO);$e.hack(aO);var Kl=new Map,si=class{constructor(e,t,r={}){this.data=e,this.browsers=t,this.options=r,[this.add,this.remove]=this.preprocess(this.select(this.data)),this.transition=new t5(this),this.processor=new r5(this)}cleaner(){if(this.cleanerCache)return this.cleanerCache;if(this.browsers.selected.length){let e=new Xl(this.browsers.data,[]);this.cleanerCache=new si(this.data,e,this.options)}else return this;return this.cleanerCache}select(e){let t={add:{},remove:{}};for(let r in e){let n=e[r],a=n.browsers.map(u=>{let c=u.split(" ");return{browser:`${c[0]} ${c[1]}`,note:c[2]}}),s=a.filter(u=>u.note).map(u=>`${this.browsers.prefix(u.browser)} ${u.note}`);s=nr.uniq(s),a=a.filter(u=>this.browsers.isSelected(u.browser)).map(u=>{let c=this.browsers.prefix(u.browser);return u.note?`${c} ${u.note}`:c}),a=this.sort(nr.uniq(a)),this.options.flexbox==="no-2009"&&(a=a.filter(u=>!u.includes("2009")));let o=n.browsers.map(u=>this.browsers.prefix(u));n.mistakes&&(o=o.concat(n.mistakes)),o=o.concat(s),o=nr.uniq(o),a.length?(t.add[r]=a,a.length<o.length&&(t.remove[r]=o.filter(u=>!a.includes(u)))):t.remove[r]=o}return t}sort(e){return e.sort((t,r)=>{let n=nr.removeNote(t).length,a=nr.removeNote(r).length;return n===a?r.length-t.length:a-n})}preprocess(e){let t={selectors:[],"@supports":new i5(si,this)};for(let n in e.add){let a=e.add[n];if(n==="@keyframes"||n==="@viewport")t[n]=new n5(n,a,this);else if(n==="@resolution")t[n]=new Hw(n,a,this);else if(this.data[n].selector)t.selectors.push(ir.load(n,a,this));else{let s=this.data[n].props;if(s){let o=$e.load(n,a,this);for(let u of s)t[u]||(t[u]={values:[]}),t[u].values.push(o)}else{let o=t[n]&&t[n].values||[];t[n]=B.load(n,a,this),t[n].values=o}}}let r={selectors:[]};for(let n in e.remove){let a=e.remove[n];if(this.data[n].selector){let s=ir.load(n,a);for(let o of a)r.selectors.push(s.old(o))}else if(n==="@keyframes"||n==="@viewport")for(let s of a){let o=`@${s}${n.slice(1)}`;r[o]={remove:!0}}else if(n==="@resolution")r[n]=new Hw(n,a,this);else{let s=this.data[n].props;if(s){let o=$e.load(n,[],this);for(let u of a){let c=o.old(u);if(c)for(let f of s)r[f]||(r[f]={}),r[f].values||(r[f].values=[]),r[f].values.push(c)}}else for(let o of a){let u=this.decl(n).old(n,o);if(n==="align-self"){let c=t[n]&&t[n].prefixes;if(c){if(o==="-webkit- 2009"&&c.includes("-webkit-"))continue;if(o==="-webkit-"&&c.includes("-webkit- 2009"))continue}}for(let c of u)r[c]||(r[c]={}),r[c].remove=!0}}}return[t,r]}decl(e){return Kl.has(e)||Kl.set(e,B.load(e)),Kl.get(e)}unprefixed(e){let t=this.normalize(Gw.unprefixed(e));return t==="flex-direction"&&(t="flex-flow"),t}normalize(e){return this.decl(e).normalize(e)}prefixed(e,t){return e=Gw.unprefixed(e),this.decl(e).prefixed(e,t)}values(e,t){let r=this[e],n=r["*"]&&r["*"].values,a=r[t]&&r[t].values;return n&&a?nr.uniq(n.concat(a)):n||a||[]}group(e){let t=e.parent,r=t.index(e),{length:n}=t.nodes,a=this.unprefixed(e.prop),s=(o,u)=>{for(r+=o;r>=0&&r<n;){let c=t.nodes[r];if(c.type==="decl"){if(o===-1&&c.prop===a&&!Xl.withPrefix(c.value)||this.unprefixed(c.prop)!==a)break;if(u(c)===!0)return!0;if(o===1&&c.prop===a&&!Xl.withPrefix(c.value))break}r+=o}return!1};return{up(o){return s(-1,o)},down(o){return s(1,o)}}}};Yw.exports=si});var Xw=v((PI,Jw)=>{l();Jw.exports={"backdrop-filter":{feature:"css-backdrop-filter",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","safari 16.5"]},element:{props:["background","background-image","border-image","mask","list-style","list-style-image","content","mask-image"],feature:"css-element-function",browsers:["firefox 114"]},"user-select":{mistakes:["-khtml-"],feature:"user-select-none",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","safari 16.5"]},"background-clip":{feature:"background-clip-text",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},hyphens:{feature:"css-hyphens",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","safari 16.5"]},fill:{props:["width","min-width","max-width","height","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size","grid","grid-template","grid-template-rows","grid-template-columns","grid-auto-columns","grid-auto-rows"],feature:"intrinsic-width",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"fill-available":{props:["width","min-width","max-width","height","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size","grid","grid-template","grid-template-rows","grid-template-columns","grid-auto-columns","grid-auto-rows"],feature:"intrinsic-width",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},stretch:{props:["width","min-width","max-width","height","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size","grid","grid-template","grid-template-rows","grid-template-columns","grid-auto-columns","grid-auto-rows"],feature:"intrinsic-width",browsers:["firefox 114"]},"fit-content":{props:["width","min-width","max-width","height","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size","grid","grid-template","grid-template-rows","grid-template-columns","grid-auto-columns","grid-auto-rows"],feature:"intrinsic-width",browsers:["firefox 114"]},"text-decoration-style":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration-color":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration-line":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration-skip":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration-skip-ink":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-size-adjust":{feature:"text-size-adjust",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"mask-clip":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-composite":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-image":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-origin":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-repeat":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-repeat":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-source":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},mask:{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-position":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-size":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-outset":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-width":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-slice":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"clip-path":{feature:"css-clip-path",browsers:["samsung 21"]},"box-decoration-break":{feature:"css-boxdecorationbreak",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","opera 99","safari 16.5","samsung 21"]},appearance:{feature:"css-appearance",browsers:["samsung 21"]},"image-set":{props:["background","background-image","border-image","cursor","mask","mask-image","list-style","list-style-image","content"],feature:"css-image-set",browsers:["and_uc 15.5","chrome 109","samsung 21"]},"cross-fade":{props:["background","background-image","border-image","mask","list-style","list-style-image","content","mask-image"],feature:"css-cross-fade",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},isolate:{props:["unicode-bidi"],feature:"css-unicode-bidi",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","safari 16.5"]},"color-adjust":{feature:"css-color-adjust",browsers:["chrome 109","chrome 113","chrome 114","edge 114","opera 99"]}}});var Zw=v((DI,Kw)=>{l();Kw.exports={}});var ib=v((II,rb)=>{l();var oO=zo(),{agents:lO}=($n(),Ln),Zl=hm(),uO=dt(),fO=Qw(),cO=Xw(),pO=Zw(),eb={browsers:lO,prefixes:cO},tb=`
  Replace Autoprefixer \`browsers\` option to Browserslist config.
  Use \`browserslist\` key in \`package.json\` or \`.browserslistrc\` file.

  Using \`browsers\` option can cause errors. Browserslist config can
  be used for Babel, Autoprefixer, postcss-normalize and other tools.

  If you really need to use option, rename it to \`overrideBrowserslist\`.

  Learn more at:
  https://github.com/browserslist/browserslist#readme
  https://twitter.com/browserslist

`;function dO(i){return Object.prototype.toString.apply(i)==="[object Object]"}var eu=new Map;function hO(i,e){e.browsers.selected.length!==0&&(e.add.selectors.length>0||Object.keys(e.add).length>2||i.warn(`Autoprefixer target browsers do not need any prefixes.You do not need Autoprefixer anymore.
Check your Browserslist config to be sure that your targets are set up correctly.

  Learn more at:
  https://github.com/postcss/autoprefixer#readme
  https://github.com/browserslist/browserslist#readme

`))}rb.exports=sr;function sr(...i){let e;if(i.length===1&&dO(i[0])?(e=i[0],i=void 0):i.length===0||i.length===1&&!i[0]?i=void 0:i.length<=2&&(Array.isArray(i[0])||!i[0])?(e=i[1],i=i[0]):typeof i[i.length-1]=="object"&&(e=i.pop()),e||(e={}),e.browser)throw new Error("Change `browser` option to `overrideBrowserslist` in Autoprefixer");if(e.browserslist)throw new Error("Change `browserslist` option to `overrideBrowserslist` in Autoprefixer");e.overrideBrowserslist?i=e.overrideBrowserslist:e.browsers&&(typeof console!="undefined"&&console.warn&&(Zl.red?console.warn(Zl.red(tb.replace(/`[^`]+`/g,n=>Zl.yellow(n.slice(1,-1))))):console.warn(tb)),i=e.browsers);let t={ignoreUnknownVersions:e.ignoreUnknownVersions,stats:e.stats,env:e.env};function r(n){let a=eb,s=new uO(a.browsers,i,n,t),o=s.selected.join(", ")+JSON.stringify(e);return eu.has(o)||eu.set(o,new fO(a.prefixes,s,e)),eu.get(o)}return{postcssPlugin:"autoprefixer",prepare(n){let a=r({from:n.opts.from,env:e.env});return{OnceExit(s){hO(n,a),e.remove!==!1&&a.processor.remove(s,n),e.add!==!1&&a.processor.add(s,n)}}},info(n){return n=n||{},n.from=n.from||h.cwd(),pO(r(n))},options:e,browsers:i}}sr.postcss=!0;sr.data=eb;sr.defaults=oO.defaults;sr.info=()=>sr().info()});var nb={};_e(nb,{default:()=>mO});var mO,sb=C(()=>{l();mO=[]});var ob={};_e(ob,{default:()=>gO});var ab,gO,lb=C(()=>{l();hi();ab=X(bi()),gO=Ze(ab.default.theme)});var fb={};_e(fb,{default:()=>yO});var ub,yO,cb=C(()=>{l();hi();ub=X(bi()),yO=Ze(ub.default)});l();"use strict";var wO=Je(pm()),bO=Je(ye()),vO=Je(ib()),xO=Je((sb(),nb)),kO=Je((lb(),ob)),SO=Je((cb(),fb)),CO=Je((Zn(),bu)),AO=Je((mo(),ho)),_O=Je((hs(),Ku));function Je(i){return i&&i.__esModule?i:{default:i}}console.warn("cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation");var Hn="tailwind",tu="text/tailwindcss",pb="/template.html",St,db=!0,hb=0,ru=new Set,iu,mb="",gb=(i=!1)=>({get(e,t){return(!i||t==="config")&&typeof e[t]=="object"&&e[t]!==null?new Proxy(e[t],gb()):e[t]},set(e,t,r){return e[t]=r,(!i||t==="config")&&nu(!0),!0}});window[Hn]=new Proxy({config:{},defaultTheme:kO.default,defaultConfig:SO.default,colors:CO.default,plugin:AO.default,resolveConfig:_O.default},gb(!0));function yb(i){iu.observe(i,{attributes:!0,attributeFilter:["type"],characterData:!0,subtree:!0,childList:!0})}new MutationObserver(async i=>{let e=!1;if(!iu){iu=new MutationObserver(async()=>await nu(!0));for(let t of document.querySelectorAll(`style[type="${tu}"]`))yb(t)}for(let t of i)for(let r of t.addedNodes)r.nodeType===1&&r.tagName==="STYLE"&&r.getAttribute("type")===tu&&(yb(r),e=!0);await nu(e)}).observe(document.documentElement,{attributes:!0,attributeFilter:["class"],childList:!0,subtree:!0});async function nu(i=!1){i&&(hb++,ru.clear());let e="";for(let r of document.querySelectorAll(`style[type="${tu}"]`))e+=r.textContent;let t=new Set;for(let r of document.querySelectorAll("[class]"))for(let n of r.classList)ru.has(n)||t.add(n);if(document.body&&(db||t.size>0||e!==mb||!St||!St.isConnected)){for(let n of t)ru.add(n);db=!1,mb=e,self[pb]=Array.from(t).join(" ");let{css:r}=await(0,bO.default)([(0,wO.default)({...window[Hn].config,_hash:hb,content:{files:[pb],extract:{html:n=>n.split(" ")}},plugins:[...xO.default,...Array.isArray(window[Hn].config.plugins)?window[Hn].config.plugins:[]]}),(0,vO.default)({remove:!1})]).process(`@tailwind base;@tailwind components;@tailwind utilities;${e}`);(!St||!St.isConnected)&&(St=document.createElement("style"),document.head.append(St)),St.textContent=r}}})();
/*! https://mths.be/cssesc v3.0.0 by @mathias */

/* File: ./app/js/tailwind.config.js */
/*

  tailwind.config.js

  TODO: Make this editable from the (as of yet created) app/settings.html page
  Then, update these comments with any contextually relevant information.

*/
tailwind.config = {
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      slate: {
        '50': '#F7F9FA',
        '100': '#EDF2F5',
        '200': '#D3DDE3',
        '300': '#BAC8D1',
        '400': '#8D9EB0',
        '500': '#64748b',
        '600': '#536580',
        '700': '#384A69',
        '800': '#243454',
        '900': '#142140'
      },
      amber: {
        '50': '#FFFCF2',
        '100': '#FFFAE6',
        '200': '#FCEEC0',
        '300': '#FAE29B',
        '400': '#F7C352',
        '500': '#f59e0b',
        '600': '#DB8709',
        '700': '#B86706',
        '800': '#944B03',
        '900': '#6E3402'
      },
      emerald: {
        '50': '#F0FCFA',
        '100': '#E1F7F3',
        '200': '#B7EDE2',
        '300': '#91E3D0',
        '400': '#4ACFA9',
        '500': '#10b981',
        '600': '#0DA870',
        '700': '#0A8C56',
        '800': '#06703E',
        '900': '#03542A'
      },
      rose: {
        '50': '#FFF5FB',
        '100': '#FFEDF7',
        '200': '#FCCFE5',
        '300': '#FAAFCE',
        '400': '#F7779B',
        '500': '#f43f5e',
        '600': '#DB324F',
        '700': '#B82339',
        '800': '#941828',
        '900': '#6E0D18'
      },
      sky: {
        '50': '#F2FDFF',
        '100': '#E6F9FC',
        '200': '#C0EEFA',
        '300': '#98E1F5',
        '400': '#51C6F0',
        '500': '#0ea5e9',
        '600': '#0A8CD1',
        '700': '#076BAD',
        '800': '#06508C',
        '900': '#033669'
      },
      indigo: {
        '50': '#eef2ff',
        '100': '#e0e7ff',
        '200': '#c7d2fe',
        '300': '#a5b4fc',
        '400': '#818cf8',
        '500': '#6366f1',
        '600': '#4f46e5',
        '700': '#4338ca',
        '800': '#3730a3',
        '900': '#312e81',
        '950': '#1e1b4b',
      },
      'gray': {
        '50': '#f9fafb',
        '100': '#f3f4f6',
        '200': '#e5e7eb',
        '300': '#d1d5db',
        '400': '#9ca3af',
        '500': '#6b7280',
        '600': '#4b5563',
        '700': '#374151',
        '800': '#1f2937',
        '900': '#111827',
        '950': '#030712',
      }
    },
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      serif: ['Source Serif Pro', 'serif'],
    },
    extend: {},
  }
}


/* File: ./app/js/editor/globals.js */
/*

  editor/globals.js
  
  These house all the icons needed for the editor. Many icons are from
  FontAwesome, added to this repository in July 2024 under a paid license
  under the ownership of Ian McKenzie (https://psychosage.io/contact/)

  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - 
  https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

*/

if (typeof customAppSageStorage !== 'undefined') {
  // This allows developers to set a custom storage name so that if people
  // are using multiple appSage derived products, the object won't get too
  // bogged down or confused. This was originally made to support dashSage.
  var appSageStorageString = customAppSageStorage;
  var appSageSettingsString = `${customAppSageStorage}Settings`;
  var appSageTitleIdMapString = `${customAppSageStorage}TitleIdMap`;
  var appSageDatabaseString = `${customAppSageStorage}Database`; // See: `function openDatabase() {...}` in content.js
} else {
  var appSageStorageString = 'appSageStorage';
  var appSageSettingsString = 'appSageSettings';
  var appSageTitleIdMapString = 'appSageTitleIdMap';
  var appSageDatabaseString = 'appSageDatabase';
}

var advancedMode = false;
const settingsForAdvCheck = JSON.parse(localStorage.getItem(appSageSettingsString));
if (settingsForAdvCheck) advancedMode = settingsForAdvCheck.advancedMode;

window.addEventListener('load', function () {
  if (advancedMode === true) {
    const pasteHtmlBtn = document.getElementById('addHtml');
    if (pasteHtmlBtn) pasteHtmlBtn.classList.remove('hidden');
    const addContainerBtn = document.getElementById('addContainer')
    if (addContainerBtn) addContainerBtn.classList.remove('hidden');
    const copyMetaBtn = document.getElementById('copyMetadata')
    if (copyMetaBtn) copyMetaBtn.classList.remove('hidden');
  }
});

updateTailwindConfig();
var tailwindColors = mergeTailwindColors(tailwind.config.theme);

var colorArray = extractColorNames(tailwindColors);
colorArray.push('reset');
var interactivityState = '';
var interactivityStates = {
  "default": ['', 'Default'],
  "hover": ['hover', 'When the user taps (mobile) or has their cursor on top of the element (desktop)'],
  "focus": ['focus', 'When the user has tapped the element to use it in some way'],
  "active": ['active', 'When the element has been activated by the user from interacting in some way']
}

var currentBreakpoint = 'xs';
var plainEnglishBreakpointNames = {
  "xs": 'Extra Small',
  "sm": 'Small-Sized',
  "md": 'Medium-Sized',
  "lg": 'Large',
  "xl": 'Extra Large',
  "2xl": 'Extra, Extra Large'
}

var tooltips = {
  'justify-items-start': "Put columns in columns in the grid to the left-most side of the column's maximum span",
  'justify-items-end': "Put columns in columns in the grid to the right-most side of the column's maximum span",
  'justify-items-center': "Put columns in columns in the grid to the horizontal middle of the column's maximum span",
  'justify-items-stretch': "Stretch the columns across the column's maximum span",
  'justify-items-reset': "Reset justification of items to default",
  'content-start': "Align columns to the top left of the grid. Choosing this option may not be obvious unless you also choose 'Place Items Start'",
  'content-end': "Align columns to the bottom right of the grid. Choosing this option may not be obvious unless you also choose 'Place Items End'",
  'content-center': "Align columns to the center of the grid.",
  'content-stretch': "Stretch columns to fill the height of the grid",
  'content-between': "Align columns evenly from the very top and very bottom of the grid",
  'content-around': "Align columns evenly within the height of the grid",
  'content-evenly': "Align columns evenly between the columns and the space around the columns",
  'content-reset': "Reset column vertical alignment",
  'place-items-start': "Place content within your columns to the columns to the top left of the columns",
  'place-items-end': "Place content within your columns to the columns to the bottom right of the columns",
  'place-items-center': "Place content within your columns to the columns to the center of the columns",
  'place-items-stretch': "Stretch content to the full dimensions of your columns",
  'place-items-reset': "Reset items placement alignment",
  'bg-no-repeat': "Do not repeat the background, this option pairs well with 'contain' or 'cover' background sizing",
  'bg-repeat': "Repeat images to make a background pattern",
  'bg-repeat-x': "Repeat images to make a pattern horizontally",
  'bg-repeat-y': "Repeat images to make a pattern vertically",
  'move-column': "Move this column to the ",
  'remove-column': "Remove this column forever (that\'s a long time!)",
  'add-column': "Add another column to this grid",
  'add-container': "Add another container to this element",
  'add-content': "Add content to this element",
  'remove-content': "Remove this content forever (that\'s a long time!)",
  'move-content-up': "Move this content upward in the column",
  'move-content-down': "Move this content downward in the column",
  'remove-grid': "Remove this grid forever (that\'s a long time!)",
  'remove-container': "Remove this container forever (that\'s a long time!)",
  'move-grid-up': "Move this grid upward in the document",
  'move-grid-down': "Move this grid downward in the document",
  'move-container-up': "Move this container left or upward in the document",
  'move-container-down': "Move this container right or downward in the document",
  'color-vision-impairement': "Please remember to make colors contrast well for people with vision impairments.",
  'text-alignment-justify': "Make text expand across the entire box. If you're not a professional designer, this option is a bad idea",
  'text-alignment-other': "Align text to the ",
  'border-style-none': "Remove border styles from this element",
  'border-style-other': "Change the border style to be a ",
  'background-size-cover': "Make your background image cover the entire box; cropping will occur",
  'background-size-contain': "Make your background image stay contained inside the box, empty space may become seen",
  'background-position': "Align the position of the image to the element's ",
  'swatchboard': "TailwindCSS class name: ",
  'bg-icon': "Position your background image to the ",
  'italicize': "Italicize your text",
  'underline': "Underline your text",
  'padding': "Create space between the edge of the box and content inside of it.",
  'margin': "Create space between the edge of the box and content inside of it.",
  'opacity': "Change how transparent the element is. Careful! This changes the opacity of everything inside the element.",
  'reset': "Reset to default settings.",
  'items-start': "Shrink inside boxes toward the beginning of the box.",
  'items-end': "Shrink inside boxes toward the end of the box.",
  'items-center': "Shrink inside boxes toward the middle of the box.",
  'items-stretch': "Stretch inside boxes along the whole of the box.",
  'items-reset': "Reset items' alignment rules.",
  'self-start': "Shrink this box toward the top of the box containing it.",
  'self-end': "Shrink this box toward the bottom of the box containing it.",
  'self-center': "Shrink this box toward the middle of the box containing it.",
  'self-stretch': "Stretch this box toward along the whole of the box containing it.",
  'self-reset': "Reset self alignment rules.",
  'justify-start': "Move all items toward the beginning of the box.",
  'justify-end': "Move all items toward the end of the box.",
  'justify-center': "Move all items toward the middle of the box.",
  'justify-stretch': "Stretch all items to fill along the whole of the box.",
  'justify-between': "Move all items to be evenly spaced from the beginning to end of the box.",
  'justify-around': "Move all items to have an equal amount of space around them.",
  'justify-evenly': "Move all items to be evenly spaced from the edge of the box and each other.",
  'justify-reset': "Reset justification rules."
}

// global variable
var appSageEditorIcons = {
  "responsive": {
    "xs": '<svg data-extra-info="For smartwatch screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 48l256 0c0-26.5-21.5-48-48-48L112 0C85.5 0 64 21.5 64 48zM80 80C35.8 80 0 115.8 0 160L0 352c0 44.2 35.8 80 80 80l224 0c44.2 0 80-35.8 80-80l0-192c0-44.2-35.8-80-80-80L80 80zM192 213.3a42.7 42.7 0 1 1 0 85.3 42.7 42.7 0 1 1 0-85.3zM213.3 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm74.7-160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 512l160 0c26.5 0 48-21.5 48-48L64 464c0 26.5 21.5 48 48 48z"/></svg>',
    "sm": '<svg data-extra-info="For mobile phone screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/></svg>',
    "md": '<svg data-extra-info="For tall tablet screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>',
    "lg": '<svg data-extra-info="For wide tablet screens & larger" fill="currentColor" class="h-full w-full rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>',
    "xl": '<svg data-extra-info="For laptop screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 32C92.7 32 64 60.7 64 96l0 256 64 0 0-256 384 0 0 256 64 0 0-256c0-35.3-28.7-64-64-64L128 32zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480l486.4 0c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2L19.2 384z"/></svg>',
    "2xl": '<svg data-extra-info="For desktop screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"/></svg>'
  },
  "html-states": {
    "hover": '<svg data-extra-info="When the mouse is over the element" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M320 112c59.2 0 109.6 37.9 128.3 90.7c5 14.2 7.7 29.4 7.7 45.3c0 0-40 40-136 40s-136-40-136-40c0-15.9 2.7-31.1 7.7-45.3c18.7-52.8 69-90.7 128.3-90.7zm0-48c-90.1 0-165.2 64.8-180.9 150.4C55.1 237.5 0 276.2 0 320c0 70.7 143.3 128 320 128s320-57.3 320-128c0-43.8-55.1-82.5-139.1-105.6C485.2 128.8 410.2 64 320 64zm0 288a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM104 328a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm408-24a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>'
  },
  "heading": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 112 224 0 0-112-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 144 0 176 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-144-224 0 0 144 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-176L48 96 32 96C14.3 96 0 81.7 0 64z"/></svg>',
  "media": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M192 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 69.6c-12.9-6.1-27.9-7.1-41.7-2.5l-98.9 33-37.8-60.5c-2.9-4.7-8.1-7.5-13.6-7.5s-10.6 2.8-13.6 7.5L388 177.9l-15.3-19.7c-3-3.9-7.7-6.2-12.6-6.2s-9.6 2.3-12.6 6.2l-56 72c-3.8 4.8-4.4 11.4-1.7 16.9s8.3 9 14.4 9l64 0 0 64-112 0c-35.3 0-64-28.7-64-64l0-192zM319.5 404.6c-13.8 10.3-25.2 25.2-29.6 43.4L64 448c-35.3 0-64-28.7-64-64L0 160c0-35.3 28.7-64 64-64l96 0 0 264c0 17.7 14.3 32 32 32l150.2 0c-8.2 3.3-15.8 7.5-22.6 12.6zM320 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM56 168l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0zM56 360l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16zM630 164.5c6.3 4.5 10 11.8 10 19.5l0 48 0 160c0 1.2-.1 2.4-.3 3.6c.2 1.5 .3 2.9 .3 4.4c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48c5.5 0 10.9 .5 16 1.5l0-88.2-144 48L448 464c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48c5.5 0 10.9 .5 16 1.5L400 296l0-48c0-10.3 6.6-19.5 16.4-22.8l192-64c7.3-2.4 15.4-1.2 21.6 3.3z"/></svg>',
  "paragraph": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M192 32l64 0 160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0 0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352-32 0 0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-32 0c-88.4 0-160-71.6-160-160s71.6-160 160-160z"/></svg>',
  "button": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM377 273L265 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L88 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l214.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L377 239c9.4 9.4 9.4 24.6 0 33.9z"/></svg>',
  "form": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/></svg>',
  "text-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 64c0-17.7-14.3-32-32-32L128 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32l-192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32z"/></svg>',
  "text-right": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 64c0 17.7-14.3 32-32 32L192 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>',
  "text-left": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>',
  "text-justify": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 64c0-17.7-14.3-32-32-32L32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32L32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32z"/></svg>',
  "text-color": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M221.5 51.7C216.6 39.8 204.9 32 192 32s-24.6 7.8-29.5 19.7l-120 288-40 96c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L93.3 384l197.3 0 31.8 76.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-40-96-120-288zM264 320l-144 0 72-172.8L264 320z"/></svg>',
  "background-color": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>',
  "bg-contain": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M9.4 9.4C21.9-3.1 42.1-3.1 54.6 9.4L160 114.7 160 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 128c0 17.7-14.3 32-32 32L64 224c-17.7 0-32-14.3-32-32s14.3-32 32-32l50.7 0L9.4 54.6C-3.1 42.1-3.1 21.9 9.4 9.4zm448 0c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L397.3 160l50.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32l0-128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 50.7L457.4 9.4zM32 320c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-50.7L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L114.7 352 64 352c-17.7 0-32-14.3-32-32zm256 0c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-50.7 0L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L352 397.3l0 50.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128z"/></svg>',
  "bg-cover": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l50.7 0L256 210.7 141.3 96 192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32C46.3 32 32 46.3 32 64l0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-50.7L210.7 256 96 370.7 96 320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-50.7 0L256 301.3 370.7 416 320 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 50.7L301.3 256 416 141.3l0 50.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L320 32z"/></svg>',
  "bg-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="152" cy="176" r="24"/><path fill="currentColor" d="M317.9,277.2l-66-96c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6s6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4h0Z"/><path fill="currentColor" d="M317.9,277.2l-66-96c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6s6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4h0Z"/><circle fill="currentColor" cx="152" cy="176" r="24"/><path fill="currentColor" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6s6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96h0Z"/><circle fill="currentColor" cx="152" cy="176" r="24"/><path fill="white" d="M320,128h-192c-13.3,0-24,10.7-24,24v144c0,13.3,10.7,24,24,24h192c13.3,0,24-10.7,24-24v-144c0-13.3-10.7-24-24-24ZM152,152c13.3,0,24,10.7,24,24s-10.7,24-24,24-24-10.7-24-24,10.7-24,24-24ZM318.7,289.6c-2.1,4-6.2,6.4-10.7,6.4h-168c-4.5,0-8.7-2.5-10.7-6.6s-1.6-9,1.1-12.6l21.6-28.8,14.4-19.2c2.2-3,5.8-4.8,9.6-4.8s7.3,1.8,9.6,4.8l7.2,9.6,39.3-57.2c2.2-3.2,5.9-5.2,9.9-5.2s7.7,1.9,9.9,5.2l66,96c2.5,3.7,2.8,8.4.8,12.4Z"/></svg>',
  "bg-top": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="137.6" cy="73.6" r="28.8"/><path fill="currentColor" d="M336.7,195l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M336.7,195l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="137.6" cy="73.6" r="28.8"/><path fill="currentColor" d="M257.5,79.8c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="137.6" cy="73.6" r="28.8"/><path fill="white" d="M339.2,16H108.8c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8V44.8c0-16-12.8-28.8-28.8-28.8ZM137.6,44.8c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM337.6,209.9c-2.5,4.8-7.4,7.7-12.8,7.7H123.2c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9Z"/></svg>',
  "bg-right": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="201.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M400.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M400.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="201.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M321.5,172.6c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="201.6" cy="166.4" r="28.8"/><path fill="white" d="M403.2,108.8h-230.4c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8v-172.8c0-16-12.8-28.8-28.8-28.8ZM201.6,137.6c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM401.6,302.7c-2.5,4.8-7.4,7.7-12.8,7.7h-201.6c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9h0Z"/></svg>',
  "bg-bottom": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="137.6" cy="259.2" r="28.8"/><path fill="currentColor" d="M336.7,380.6l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M336.7,380.6l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="137.6" cy="259.2" r="28.8"/><path fill="currentColor" d="M257.5,265.4c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="137.6" cy="259.2" r="28.8"/><path fill="white" d="M339.2,201.6H108.8c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8v-172.8c0-16-12.8-28.8-28.8-28.8ZM137.6,230.4c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM337.6,395.5c-2.5,4.8-7.4,7.7-12.8,7.7H123.2c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9h0Z"/></svg>',
  "bg-left": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="73.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M272.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M272.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="73.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M193.5,172.6c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="73.6" cy="166.4" r="28.8"/><path fill="white" d="M275.2,108.8H44.8c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8v-172.8c0-16-12.8-28.8-28.8-28.8ZM73.6,137.6c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM273.6,302.7c-2.5,4.8-7.4,7.7-12.8,7.7H59.2c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9h0Z"/></svg>',
  "bg-repeat": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="white" d="M447.8,128v-64c0-10.6-2.6-20.5-7.1-29.3h.1c-7.4-14.2-20-25.4-35.2-30.9h0c-3.4-1.2-6.8-2.1-10.4-2.8-3.6-.7-7.3-1-11.1-1H64c-13.7,0-26.3,4.3-36.7,11.6C10.8,23.2,0,42.3,0,64v320c0,35.1,28.3,63.6,63.3,64h322.6c8.8-.2,17.2-2.3,24.8-5.8,7.6-3.5,14.4-8.5,20-14.5,10.7-11.4,17.2-26.8,17.2-43.7V128h-.1Z"/><circle fill="black" cx="392" cy="176" r="24"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/><circle fill="black" cx="392" cy="368" r="24"/><circle fill="black" cx="152" cy="368" r="24"/><path fill="black" d="M440.9,34.7c-7.4-14.2-20-25.4-35.2-30.9h0c-3.4-1.2-6.8-2.2-10.4-2.8-.9-.2-1.8-.3-2.7-.5-2.7-.4-5.5-.5-8.4-.5H64c-13.7,0-26.3,4.3-36.7,11.6C10.8,23.2,0,42.3,0,64v320c0,35.1,28.3,63.6,63.3,64h.1c0,.1,0,0,0,0h322.7c8.8-.2,17.2-2.3,24.8-5.8,7.6-3.5,14.3-8.5,20-14.5,10.7-11.4,17.2-26.8,17.2-43.7V64c0-10.6-2.6-20.5-7.1-29.3ZM419.3,416.5s0,0,0,0c0,0,0,0,0,0-1-.3.5-.5-3.3-.5s-7.3,1.8-9.6,4.8l-6.4,8.5-.2.2c-4.9,1.7-10.1,2.7-15.6,2.7h-91.7c0,0-40.5-59-40.5-59-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-8.5,11.3h0c0,0-93.8,0-93.8,0-4.5,0-8.8-.6-12.8-1.8h0l-35.1-51.1v-83.3h51.9c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-61.8-89.9v-83.3h51.9c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4L36.3,24.8s0,0,0,0c7.8-5.5,17.4-8.8,27.7-8.8h149.6l-20.9,30.4-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4h0c2.1-4,1.8-8.7-.8-12.4l-47.6-69.2h113.7c14.6,0,27.8,6.6,36.6,16.9,0,0,0,0,0,0,0,0-.1,0-.2,0-1.4-.6-.8-.9-4.6-.9s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h52v133.3l-6.4-8.5c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h52v88c0,12.5-4.8,23.9-12.7,32.5Z"/></svg>',
  "bg-no-repeat": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><rect fill="white" x="104" y="128" width="240" height="192"/><path fill="black" d="M384,0H64C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64ZM432,384c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320c26.5,0,48,21.5,48,48v320Z"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/></svg>',
  "bg-repeat-x": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><polygon fill="white" points="344 128 104 128 0 128 0 320 104 320 344 320 448 320 448 128 344 128"/><circle fill="black" cx="392" cy="176" r="24"/><path fill="black" d="M384,0H64C28.7,0,0,28.7,0,64v112h0v119.8h0v88.2c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64ZM432,384c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48v-88.1h53.8c3.7-.5,6.9-2.7,8.7-5.9,0,0,0-.1,0-.1.1-.1.1-.2.1-.2v-.2l-.3-.4c.2-.5.5-1,.6-1.5,1.3-3.6.8-7.7-1.5-10.9l-61.6-89.6v-123.1c0-26.5,21.5-48,48-48h320c26.5,0,48,21.5,48,48v173.2l-6.3-8.4c-1.4-2-3.5-3.4-5.8-4.2-.3-.1-.7-.3-1-.3-.9-.2-1.8-.3-2.8-.3s-1.9.1-2.8.3c-.3.1-.7.2-1,.3-2.3.8-4.3,2.2-5.8,4.2l-14.4,19.2-21.6,28.8c-.6.8-1.1,1.6-1.5,2.5-.2.3-.3.7-.4,1.1-.9,2.9-.7,6.2.8,9,1.3,2.6,3.5,4.6,6.1,5.7.1,0,.3.2.5.2,1.2.5,2.6.7,4,.7h52v88Z"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/></svg>',
  "bg-repeat-y": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><polygon fill="white" points="104 0 104 128 104 320 104 448 344 448 344 320 344 128 344 0 104 0"/><circle fill="black" cx="152" cy="368" r="24"/><path fill="black" d="M384,0H64C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64ZM432,384c0,26.5-21.5,48-48,48h-91.7l-40.4-58.8c-.1-.2-.2-.4-.4-.6-.2-.2-.3-.4-.4-.5-1.8-2.1-4.3-3.5-7-4h-4.2c-2.7.5-5.2,1.9-7,4-.2.2-.3.3-.4.5,0,.2-.3.4-.4.6l-39.3,57.2-7.2-9.6c-1.4-2-3.5-3.4-5.8-4.2-.3,0-.7-.3-1-.3-.9-.2-1.8-.3-2.8-.3s-1.9,0-2.8.3c-.3.1-.7.2-1,.3-2.3.8-4.3,2.2-5.8,4.2l-8.4,11.2h-94c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h149.6l-20.8,30.3-7.2-9.6c-1.4-2-3.5-3.4-5.8-4.2-.3,0-.7-.3-1-.3-.9-.3-1.8-.3-2.8-.3s-1.9,0-2.8.3c-.3,0-.7.3-1,.3-2.3.8-4.3,2.2-5.8,4.2l-14.4,19.2-21.6,28.8c-.6.8-1.1,1.6-1.5,2.5-.2.3-.3.7-.4,1.1-.9,2.9-.7,6.2.8,9,1.3,2.6,3.5,4.6,6.1,5.7,0,.2.3.2.5.2,1.2.5,2.6.7,4,.7h169.7c3.6-.6,6.8-2.7,8.7-5.7.2-.2.3-.4.4-.6h0c2.1-4,1.8-8.7-.8-12.4l-47.6-69.2h113.6c26.5,0,48,21.5,48,48v320Z"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/></svg>',
  "font-size": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 128l0-32 96 0 0 320-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-320 96 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48c0-26.5-21.5-48-48-48L192 32 48 32C21.5 32 0 53.5 0 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32zM384 304l0-16 64 0 0 128-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-128 64 0 0 16c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-26.5-21.5-48-48-48l-224 0c-26.5 0-48 21.5-48 48l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>',
  "font-weight": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l48 0 16 0 128 0c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128L96 480l-16 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-160L48 96 32 96C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64L112 96l0 128 112 0zM112 288l0 128 144 0c35.3 0 64-28.7 64-64s-28.7-64-64-64l-32 0-112 0z"/></svg>',
  "italic": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 64c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-58.7 0L160 416l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l58.7 0L224 96l-64 0c-17.7 0-32-14.3-32-32z"/></svg>',
  "underline": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M16 64c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 53 43 96 96 96s96-43 96-96l0-128-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 88.4-71.6 160-160 160s-160-71.6-160-160L64 96 48 96C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32z"/></svg>',
  "margin-t": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm96 0a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zM320 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm-9.4 233.4l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 269.3l0 66.7 0 112c0 17.7 14.3 32 32 32s32-14.3 32-32l0-112 0-66.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>',
  "margin-r": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm96 0a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zM320 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm-9.4 233.4l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 269.3l0 66.7 0 112c0 17.7 14.3 32 32 32s32-14.3 32-32l0-112 0-66.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>',
  "margin-b": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 214.6l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 242.7l0-66.7 0-112c0-17.7 14.3-32 32-32s32 14.3 32 32l0 112 0 66.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96 0a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm128-32a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"/></svg>',
  "margin-l": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 214.6l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 242.7l0-66.7 0-112c0-17.7 14.3-32 32-32s32 14.3 32 32l0 112 0 66.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96 0a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm128-32a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"/></svg>',
  "margin-all": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle fill="black" cx="256" cy="488" r="24"/><circle fill="black" cx="140" cy="488" r="24"/><circle fill="black" cx="24" cy="488" r="24"/><circle fill="black" cx="488" cy="488" r="24"/><circle fill="black" cx="372" cy="488" r="24"/><circle fill="black" cx="256" cy="24" r="24"/><circle fill="black" cx="140" cy="24" r="24"/><circle fill="black" cx="24" cy="24" r="24"/><circle fill="black" cx="488" cy="24" r="24"/><circle fill="black" cx="372" cy="24" r="24"/><path fill="black" d="M411.5,245.4l-45-45c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.7-4.3,10.6,1.4,7.7,4.3,10.6l19.3,19.3h-93.6v-93.8l19.3,19.3c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.7h0l-45-44.9c-5.8-5.8-15.3-5.8-21.2,0l-45,45c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.7,4.3,10.6,4.3,7.7-1.4,10.6-4.3l19.3-19.3v93.7h-93.8l19.3-19.3c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.7,4.3h0l-45,45.1c-5.8,5.8-5.8,15.3,0,21.2l45,45c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.6l-19.3-19.3h93.7v40h0v53.7l-19.3-19.3c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.8-4.3,10.6,1.5,7.7,4.3,10.6l45,45c5.8,5.8,15.3,5.8,21.2,0l45-45c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.6,4.3l-19.3,19.3v-37.3h0v-56.2h93.7l-19.3,19.3c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.8,4.3,10.6,4.3,7.7-1.5,10.6-4.3l45-45c5.8-5.8,5.8-15.3,0-21.2h0v-.2Z"/><circle fill="black" cx="24" cy="256" r="24"/><circle fill="black" cx="24" cy="140" r="24"/><circle fill="black" cx="24" cy="372" r="24"/><circle fill="black" cx="488" cy="256" r="24"/><circle fill="black" cx="488" cy="140" r="24"/><circle fill="black" cx="488" cy="372" r="24"/></svg>',
  "padding-t": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 297.4l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 269.3 192 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3zM64 160l0-64c0-17.7 14.3-32 32-32l256 0c17.7 0 32 14.3 32 32l0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64c0-53-43-96-96-96L96 0C43 0 0 43 0 96l0 64c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>',
  "padding-r": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>',
  "padding-b": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 214.6l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 242.7 192 32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM64 352l0 64c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 64c0 53-43 96-96 96L96 512c-53 0-96-43-96-96l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>',
  "padding-l": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32zm9.4 182.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L269.3 224 480 224c17.7 0 32 14.3 32 32s-14.3 32-32 32l-210.7 0 73.4 73.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-128-128z"/></svg>',
  "padding-all": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M402.3,0H109.7C49.1,0,0,49.1,0,109.7v292.6c0,60.6,49.1,109.7,109.7,109.7h292.6c60.6,0,109.7-49.1,109.7-109.7V109.7c0-60.6-49.1-109.7-109.7-109.7ZM464,422.4c0,23-18.6,41.6-41.6,41.6H89.6c-23,0-41.6-18.6-41.6-41.6V89.6c0-23,18.6-41.6,41.6-41.6h332.8c23,0,41.6,18.6,41.6,41.6v332.8Z"/><path fill="black" d="M411.5,245.4l-45-45c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.7-4.3,10.6,1.4,7.7,4.3,10.6l19.3,19.3h-93.6v-93.8l19.3,19.3c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.7h0l-45-44.9c-5.8-5.8-15.3-5.8-21.2,0l-45,45c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.7,4.3,10.6,4.3,7.7-1.4,10.6-4.3l19.3-19.3v93.7h-93.8l19.3-19.3c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.7,4.3h0l-45,45.1c-5.8,5.8-5.8,15.3,0,21.2l45,45c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.6l-19.3-19.3h93.7v40h0v53.7l-19.3-19.3c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.8-4.3,10.6,1.5,7.7,4.3,10.6l45,45c5.8,5.8,15.3,5.8,21.2,0l45-45c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.6,4.3l-19.3,19.3v-37.3h0v-56.2h93.7l-19.3,19.3c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.8,4.3,10.6,4.3,7.7-1.5,10.6-4.3l45-45c5.8-5.8,5.8-15.3,0-21.2h0v-.2Z"/></svg>',
  "border-color": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>',
  "border-dashed": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M96 32l32 0 0 64L96 96c-17.7 0-32 14.3-32 32l0 32L0 160l0-32C0 75 43 32 96 32zM0 192l64 0 0 128L0 320 0 192zm384 0l64 0 0 128-64 0 0-128zm64-32l-64 0 0-32c0-17.7-14.3-32-32-32l-32 0 0-64 32 0c53 0 96 43 96 96l0 32zm0 192l0 32c0 53-43 96-96 96l-32 0 0-64 32 0c17.7 0 32-14.3 32-32l0-32 64 0zM64 352l0 32c0 17.7 14.3 32 32 32l32 0 0 64-32 0c-53 0-96-43-96-96l0-32 64 0zm96 128l0-64 128 0 0 64-128 0zm0-384l0-64 128 0 0 64L160 96z"/></svg>',
  "border-dotted": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><circle cx="32" cy="448" r="32"/><circle cx="128" cy="448" r="32"/><circle cx="128" cy="64" r="32"/><circle cx="320" cy="448" r="32"/><circle cx="320" cy="64" r="32"/><circle cx="224" cy="448" r="32"/><circle cx="224" cy="64" r="32"/><circle cx="416" cy="448" r="32"/><circle cx="416" cy="64" r="32"/><circle cx="32" cy="64" r="32"/><circle cx="416" cy="256" r="32"/><circle cx="32" cy="256" r="32"/><circle cx="416" cy="352" r="32"/><circle cx="32" cy="352" r="32"/><circle cx="416" cy="160" r="32"/><circle cx="32" cy="160" r="32"/></svg>',
  "border-double": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384,48c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V96c0-26.5,21.5-48,48-48h320ZM64,32C28.7,32,0,60.7,0,96v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V96c0-35.3-28.7-64-64-64H64Z"/><path d="M366.9,70.3c23.7,0,42.9,19.2,42.9,42.9v285.7c0,23.7-19.2,42.9-42.9,42.9H81.1c-23.7,0-42.9-19.2-42.9-42.9V113.1c0-23.7,19.2-42.9,42.9-42.9h285.7ZM81.1,56c-31.5,0-57.1,25.6-57.1,57.1v285.7c0,31.5,25.6,57.1,57.1,57.1h285.7c31.5,0,57.1-25.6,57.1-57.1V113.1c0-31.5-25.6-57.1-57.1-57.1H81.1Z"/></svg>',
  "border-solid": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"/></svg>',
  "border-radius": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96,32h32v64h-32c-17.7,0-32,14.3-32,32v32H0v-32C0,75,43,32,96,32Z"/><path d="M448,160h-64v-32c0-17.7-14.3-32-32-32h-32V32h32c53,0,96,43,96,96v32Z"/><path d="M448,352v32c0,53-43,96-96,96h-32v-64h32c17.7,0,32-14.3,32-32v-32h64Z"/><path d="M64,352v32c0,17.7,14.3,32,32,32h32v64h-32c-53,0-96-43-96-96v-32h64Z"/></svg>',
  "border-width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0,370c0-17.7,14.3-32,32-32h576c17.7,0,32,14.3,32,32s-14.3,32-32,32H32c-17.7,0-32-14.3-32-32Z"/><rect y="110" width="640" height="32" rx="16" ry="16"/><rect y="216" width="640" height="48" rx="24" ry="24"/></svg>',
  "border-none": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M486.8,479.6h0c0,0,0,0,0,0,0,0,0,0-.1,0h0Z"/><path d="M426.4,432H160c-8.8,0-16-7.2-16-16v-206.6l-.6-.5-47.4-37.4v244.4c0,35.3,28.7,64,64,64h320c1.8,0,3.5,0,5.3-.2.5,0,1-.1,1.5-.2l-60.3-47.5h0Z"/><path d="M630.8,469.1l-86.8-68V96c0-35.3-28.7-64-64-64H160c-.8,0-1.6,0-2.4,0-.4,0-.8,0-1.2,0-.4,0-.8,0-1.1,0-.5,0-1,0-1.5.1-.3,0-.6,0-.9.1-.3,0-.7,0-1,.1-.6,0-1.2.1-1.8.2-.6,0-1.2.2-1.8.3,0,0-.2,0-.3,0-.5,0-1,.2-1.5.3-.5,0-.9.2-1.4.3-.4,0-.7.2-1.1.3-.5.1-1,.3-1.5.4-.8.2-1.5.4-2.2.7h0c-.7.2-1.5.5-2.2.8-1.5.5-2.9,1.1-4.3,1.8-.5.2-.9.4-1.4.7-.5.2-.9.5-1.4.7-.5.3-1.1.6-1.6.9-.3.2-.6.3-.9.5-.9.5-1.8,1-2.7,1.6-.3.2-.6.4-.9.6-2.3,1.5-4.4,3.1-6.5,4.9-.4.4-.8.7-1.2,1.1,0,0,0,0-.1,0-.2.2-.4.4-.6.6,0,0-.2.1-.2.2-.3.3-.7.6-1,1-1.6,1.5-3,3.1-4.4,4.8-1,1.3-2.1,2.6-3,3.9L38.8,5.1C28.4-3.1,13.3-1.2,5.1,9.2-3.1,19.6-1.2,34.7,9.2,42.9l86.8,68,47.4,37.1.6.5,2,1.6v.4l349.9,274.2c0-.1,0-.2.1-.3l36.3,28.4,68.9,54c10.4,8.2,25.5,6.3,33.7-4.1,8.2-10.4,6.3-25.5-4.1-33.7ZM160,80h320c8.8,0,16,7.2,16,16v268.4l-.6-.5v-.4L145.5,89.3c2.5-5.5,8.1-9.3,14.5-9.3Z"/></svg>',
  "justify-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h0Z"/><rect x="318.5" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.5" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M488.2,130.9H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h464.5c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8h0Z"/><rect y="204" width="104" height="104" rx="20.8" ry="20.8"/><rect x="114.5" y="204" width="104" height="104" rx="20.8" ry="20.8"/><rect x="229" y="204" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="408" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="293.5" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="179" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="178" y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect x="356" y="204" width="156" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-around": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="392" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="16" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-between": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h0Z"/><rect x="408" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-evenly": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="358" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="50" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-items-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect  x="89" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect  x="319" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect  x="319" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect class="opacity-25" x="32.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect  x="89" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect class="opacity-25" x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect  x="319" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect class="opacity-25" x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/><rect  x="89" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/></svg>',
  "justify-items-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="262.2" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="32.2" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32.2" y="204.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="32.2" y="204.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="262.2" y="204.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="262.2" y="204.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="32.2" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="262.2" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-items-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect  x="145.8" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(395.5 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect  x="375.8" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(855.5 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect  x="375.8" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(855.5 511) rotate(180)"/><rect class="opacity-25" x="32.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect  x="145.8" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(395.5 511) rotate(180)"/><rect class="opacity-25" x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect  x="375.8" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(855.5 283) rotate(180)"/><rect class="opacity-25" x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/><rect  x="145.8" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(395.5 283) rotate(180)"/></svg>',
  "justify-items-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect  x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect  x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect  x="262.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect  x="32.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect  x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect  x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/></svg>',
  "content-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="262.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="147" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="376" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="261" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="262.2" y="261" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="261.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="146.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="262.2" y="146.5" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-between": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="262.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="376" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-around": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="262.2" y="89" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="89" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="319" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="86.1" width="217.5" height="163.9" rx="20.8" ry="20.8"/><rect x="262.2" y="86.1" width="217.5" height="163.9" rx="20.8" ry="20.8"/><rect x="32.2" y="262" width="217.5" height="164" rx="20.8" ry="20.8"/></svg>',
  "content-evenly": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g>  <rect x="262.2" y="101.6" width="217.5" height="104" rx="20.8" ry="20.8"/>  <rect x="32.2" y="101.6" width="217.5" height="104" rx="20.8" ry="20.8"/></g><rect x="32.2" y="306.4" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261.2" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261.2" y="261" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261.2" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261.2" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-between": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-around": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="318.5" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="cls-3" x="89.4" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="318.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.4" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261.2" y="261" width="219" height="219" rx="43.8" ry="43.8"/><rect x="31.7" y="261" width="219" height="219" rx="43.8" ry="43.8"/><rect x="261.2" y="32" width="219" height="219" rx="43.8" ry="43.8"/><rect x="31.7" y="32" width="219" height="219" rx="43.8" ry="43.8"/></svg>',
  "place-content-evenly": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="318.5" y="306.4" width="104" height="104" rx="20.8" ry="20.8"/><rect class="cls-3" x="89.4" y="306.4" width="104" height="104" rx="20.8" ry="20.8"/><rect x="318.5" y="101.6" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.4" y="101.6" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-items-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/><rect x="32" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-items-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect x="146.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-items-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="318.5" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.5" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="318.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/></svg>',
  "place-items-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/></svg>',
  "place-self-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="rgba(0,0,0,0.2)" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="black" x="318.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-self-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="rgba(0,0,0,0.2)" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="black" x="261.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-self-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="rgba(0,0,0,0.2)" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="black" x="375.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-self-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="black" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/></svg>',
  "items-baseline": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.8,130.9C10.6,130.9,0,141.6,0,154.7v202.7c0,13.2,10.7,23.8,23.8,23.8h464.5c13.2,0,23.8-10.7,23.8-23.8v-202.7c0-13.2-10.7-23.8-23.8-23.8H23.9s-.1,0-.1,0Z"/><path fill="black" d="M178,336.1v-135c0-24.9,9.3-45,20.8-45h114.4c11.5,0,20.8,20.1,20.8,45v135c0,24.9-9.3,45-20.8,45h-114.4c-11.5,0-20.8-20.1-20.8-45Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><rect fill="black" x="0" y="224" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M356,270.9v-105c0-19.3,9.3-35,20.8-35h114.4c11.5,0,20.8,15.7,20.8,35v105c0,19.3-9.3,35-20.8,35h-114.4c-11.5,0-20.8-15.7-20.8-35Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
  "items-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50h0Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><rect fill="black" y="130.9" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="60" y="170.9" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,130.9h114.4c11.5,0,20.8,15.7,20.8,35v105c0,19.3-9.3,35-20.8,35h-114.4c-11.5,0-20.8-15.7-20.8-35v-105c0-19.3,9.3-35,20.8-35Z"/><rect fill="white" x="416" y="206.4" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
  "items-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50h0Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><rect fill="black" y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,168.5h114.4c11.5,0,20.8,15.7,20.8,35v105c0,19.3-9.3,35-20.8,35h-114.4c-11.5,0-20.8-15.7-20.8-35v-105c0-19.3,9.3-35,20.8-35Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
  "items-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
  "items-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><rect fill="black" y="277.2" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="60" y="317.2" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,206.2h114.4c11.5,0,20.8,15.7,20.8,35v105c0,19.3-9.3,35-20.8,35h-114.4c-11.5,0-20.8-15.7-20.8-35v-105c0-19.3,9.3-35,20.8-35Z"/><rect fill="white" x="416" y="281.7" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
  "self-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect fill="black" x="178" y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
  "self-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect fill="black" x="178" y="277.2" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="238" y="317.2" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
  "self-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect fill="black" x="178" y="130.9" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="238" y="170.9" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
  "self-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
  "reset": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/></svg>',
  "minimum-height": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M406.6,374.6l96-96c12.5-12.5,12.5-32.8,0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3l41.4,41.4H109.2l41.4-41.4c12.5-12.5,12.5-32.8,0-45.3s-32.8-12.5-45.3,0L9.3,233.3c-12.5,12.5-12.5,32.8,0,45.3l96,96c12.5,12.5,32.8,12.5,45.3,0s12.5-32.8,0-45.3l-41.3-41.3h293.5l-41.4,41.4c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0h0Z"/><path fill="black" d="M288,96v320c0,17.7-14.3,32-32,32s-32-14.3-32-32V96c0-17.7,14.3-32,32-32s32,14.3,32,32Z"/></svg>',
  "height": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
  "maximum-height": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-320c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>',
  "minimum-width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M406.6,374.6l96-96c12.5-12.5,12.5-32.8,0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3l41.4,41.4H109.2l41.4-41.4c12.5-12.5,12.5-32.8,0-45.3s-32.8-12.5-45.3,0L9.3,233.3c-12.5,12.5-12.5,32.8,0,45.3l96,96c12.5,12.5,32.8,12.5,45.3,0s12.5-32.8,0-45.3l-41.3-41.3h293.5l-41.4,41.4c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0h0Z"/><path fill="black" d="M288,96v320c0,17.7-14.3,32-32,32s-32-14.3-32-32V96c0-17.7,14.3-32,32-32s32,14.3,32,32Z"/></svg>',
  "width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
  "maximum-width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-320c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>',
  "gap-x": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
  "gap-y": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
  "gap-all": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="cls-1" d="M505,239.1l-72-72c-4.7-4.7-10.8-7-16.9-7-6.2,0-12.3,2.3-17,7s-7,10.8-7,17c0,6.2,2.3,12.3,7,17l31,31h-59.8s-90.1,0-90.1,0V81.9l31,31c4.7,4.7,10.8,7,16.9,7,6.2,0,12.3-2.3,17-7s7-10.8,7-16.9c0-6.2-2.3-12.4-7-17.1h0c0,0-72-71.9-72-71.9-9.4-9.4-24.6-9.4-34,0l-72,72c-4.7,4.7-7,10.8-7,16.9,0,6.2,2.3,12.3,7,17,4.7,4.7,10.8,7,17,7,6.2,0,12.3-2.3,17-7l31-31v150H81.9l31-31c4.7-4.7,7-10.8,7-16.9,0-6.2-2.3-12.3-7-17s-10.8-7-16.9-7c-6.2,0-12.4,2.3-17.1,7h0c0,0-72,72.1-72,72.1-9.4,9.4-9.4,24.6,0,34l72,72c4.7,4.7,10.8,7,16.9,7,6.2,0,12.3-2.3,17-7,4.7-4.7,7-10.8,7-17,0-6.2-2.3-12.3-7-17l-31-31h150.1v64h0v86.1l-31-31c-4.7-4.7-10.8-7-16.9-7-6.2,0-12.3,2.3-17,7-4.7,4.7-7,10.9-7,17,0,6.1,2.4,12.3,7,16.9l72,72c9.4,9.4,24.6,9.4,34,0l72-72c4.7-4.7,7-10.8,7-16.9,0-6.2-2.3-12.3-7-17s-10.8-7-17-7c-6.2,0-12.3,2.3-17,7l-31,31v-59.8h0v-90.1h64s86.1,0,86.1,0l-31,31c-4.7,4.7-7,10.8-7,16.9,0,6.2,2.3,12.3,7,17,4.7,4.7,10.9,7,17,7,6.1,0,12.3-2.4,16.9-7l72-72c9.4-9.4,9.4-24.6,0-34Z"/></svg>',
  "opacity": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>'
}

// This function is for supporting any editor capabilities that involve color.
// It gives the designer access to the color palette they labored over and
// keeps them focused on only those colors.
// DATA IN: JSON Object
function extractColorNames(colorObject) {
  let colorArray = [];
  for (const colorFamily in colorObject) {
    if (typeof colorObject[colorFamily] == 'string') {
      colorArray.push(colorFamily);
    } else {
      for (const shade in colorObject[colorFamily]) {
        colorArray.push(`${colorFamily}-${shade}`);
      }
    }
  }
  return colorArray;
} // DATA OUT: Array

function mergeFontsIntoTailwindConfig() {
  // Retrieve the fonts from localStorage
  let appSageSettings = JSON.parse(localStorage.getItem('appSageSettings'));
  let storedFonts = appSageSettings?.fonts || {}; // Fallback to an empty object if fonts do not exist

  // Ensure tailwind.config exists and has the theme and fontFamily objects
  if (!tailwind.config) {
    tailwind.config = {};
  }

  if (!tailwind.config.theme) {
    tailwind.config.theme = {};
  }

  if (!tailwind.config.theme.fontFamily) {
    tailwind.config.theme.fontFamily = {};
  }

  // Merge each stored font into tailwind.config.theme.fontFamily
  Object.keys(storedFonts).forEach(fontKey => {
    tailwind.config.theme.fontFamily[fontKey] = [storedFonts[fontKey].replace(/\+/g, ' ')];
  });

  // The tailwind.config.theme.fontFamily now contains the merged fonts
}

function mergeTailwindColors(theme) {
  // Check if `theme.extend.colors` exists
  if (theme.extend && theme.extend.colors) {
    // Merge `theme.colors` and `theme.extend.colors`, maintaining structure
    return {
      ...theme.extend.colors,
      ...theme.colors
    };
  }

  // Return `theme.colors` if no `theme.extend.colors` exists
  return theme.colors;
}

// Function to dynamically update Tailwind config with multiple fonts/colors
function updateTailwindConfig() {
  const settings = JSON.parse(localStorage.getItem(appSageSettingsString));
  if (settings !== null) {
    // Handle custom fonts
    if (settings.fonts.length > 0) {
      if (!tailwind.config.theme.fontFamily) {
        tailwind.config.theme.fontFamily = {};
      }
      tailwind.config.theme.fontFamily.custom = settings.fonts;
    }

    // Handle custom colors
    if (Object.keys(settings.colors).length > 0) {
      if (!tailwind.config.theme.extend) {
        tailwind.config.theme.extend = {};
      }
      if (!tailwind.config.theme.extend.colors) {
        tailwind.config.theme.extend.colors = {};
      }

      Object.keys(settings.colors).forEach(function (customColor) {
        tailwind.config.theme.extend.colors[customColor] = settings.colors[customColor];
      });
    }
  }
}

// Restore settings from localStorage
function restoreSettings() {
  let storedData = localStorage.getItem(appSageSettingsString);
  if (storedData) {
    let settings = JSON.parse(storedData);

    // Restore fonts: dynamically add any manually entered fonts to the <select> options
    let fonts = document.getElementById('fonts');
    if (fonts && settings.fonts) {
      // Loop through the keys of the fonts object
      Object.keys(settings.fonts).forEach(fontKey => {
        let font = settings.fonts[fontKey]; // Get the font value from the object

        // Check if the font already exists in the <select>
        let optionExists = Array.from(fonts.options).some(option => option.value === font);
        if (!optionExists) {
          let newOption = document.createElement('option');
          newOption.value = font;
          newOption.textContent = font;
          newOption.selected = true;
          fonts.appendChild(newOption);
        } else {
          // Select existing option if it's already present
          Array.from(fonts.options).forEach(option => {
            if (option.value === font) {
              option.selected = true;
            }
          });
        }
      });
    }

    // Restore colors
    let colorsContainer = document.getElementById('colorsContainer');
    if (colorsContainer && settings.colors) {
      colorsContainer.innerHTML = ''; // Clear existing entries

      Object.keys(settings.colors).forEach(colorName => {
        let shades = settings.colors[colorName];

        // Create color group container
        let colorGroup = document.createElement('div');
        colorGroup.classList.add('color-group', 'space-y-4');

        // Color name input
        colorGroup.innerHTML = `
          <div class="color-name-section">
            <label for="customColorName" class="block text-slate-600 font-medium">Color Name:</label>
            <input type="text" class="customColorName shadow border rounded py-2 px-3 text-slate-700 leading-tight w-full focus:outline-none focus:shadow-outline" name="customColorName[]" value="${colorName}" placeholder="Enter color name (e.g., 'primary')">
          </div>
          <div class="shades-container space-y-2"></div>
          <button type="button" class="addShade mt-2 py-2 px-4 border border-sky-500 font-semibold text-sky-600 rounded shadow">Add Shade</button>
        `;

        let shadesContainer = colorGroup.querySelector('.shades-container');

        // Add each shade to the color group
        Object.keys(shades).forEach(shade => {
          let shadeEntry = document.createElement('div');
          shadeEntry.classList.add('shade-entry', 'flex', 'space-x-4');

          shadeEntry.innerHTML = `
            <div>
              <label for="colorShade" class="block text-slate-600 font-medium">Shade:</label>
              <select name="colorShade[]" class="colorShade shadow border rounded py-2 px-3 text-slate-700 w-full">
                <option value="50" ${shade === '50' ? 'selected' : ''}>50</option>
                <option value="100" ${shade === '100' ? 'selected' : ''}>100</option>
                <option value="200" ${shade === '200' ? 'selected' : ''}>200</option>
                <option value="300" ${shade === '300' ? 'selected' : ''}>300</option>
                <option value="400" ${shade === '400' ? 'selected' : ''}>400</option>
                <option value="500" ${shade === '500' ? 'selected' : ''}>500</option>
                <option value="600" ${shade === '600' ? 'selected' : ''}>600</option>
                <option value="700" ${shade === '700' ? 'selected' : ''}>700</option>
                <option value="800" ${shade === '800' ? 'selected' : ''}>800</option>
                <option value="900" ${shade === '900' ? 'selected' : ''}>900</option>
                <option value="950" ${shade === '950' ? 'selected' : ''}>950</option>
              </select>
            </div>
            <div>
              <label for="customColorValue" class="block text-slate-600 font-medium">Color Value:</label>
              <input type="color" class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline" name="customColorValue[]" value="${shades[shade]}">
            </div>
          `;

          shadesContainer.appendChild(shadeEntry);
        });

        // Append the color group to the container
        colorsContainer.appendChild(colorGroup);

        // Add event listener to add shades dynamically to each color group
        colorGroup.querySelector('.addShade').addEventListener('click', function () {
          let newShadeEntry = document.createElement('div');
          newShadeEntry.classList.add('shade-entry', 'flex', 'space-x-4');

          newShadeEntry.innerHTML = `
            <div>
              <label for="colorShade" class="block text-slate-600 font-medium">Shade:</label>
              <select name="colorShade[]" class="colorShade shadow border rounded py-2 px-3 text-slate-700 w-full">
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
                <option value="950">950</option>
              </select>
            </div>
            <div>
              <label for="customColorValue" class="block text-slate-600 font-medium">Color Value:</label>
              <input type="color" class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline" name="customColorValue[]">
            </div>
          `;

          shadesContainer.appendChild(newShadeEntry);
        });
      });
    }

    // Restore advanced mode
    if (fonts && colorsContainer) {
      document.getElementById('advancedMode').checked = settings.advancedMode || false;
    }
  }
}

// Call restoreSettings when the page loads
window.addEventListener('load', restoreSettings);
window.addEventListener('load', mergeFontsIntoTailwindConfig);

function appSageLocalNuke(){
  localStorage.removeItem(appSageStorageString);
  localStorage.removeItem(appSageSettingsString);
  localStorage.removeItem(appSageTitleIdMapString);
}

/* File: ./app/js/editor/settings.js */
// editor/settings.js

document.addEventListener("DOMContentLoaded", function () {
  const advancedModeCheckbox = document.getElementById("advancedMode");
  const storedSettings = JSON.parse(localStorage.getItem(appSageSettingsString)) || {};

  // Set advanced mode state if previously stored
  if (storedSettings.advancedMode) {
    advancedModeCheckbox.checked = true;
  }

  // Add event listener for adding new font fields
  document.getElementById("addFont").addEventListener("click", function () {
    const fontsContainer = document.getElementById("fontsContainer");
    const fontEntry = document.createElement("div");
    fontEntry.classList.add("font-entry");
    fontEntry.innerHTML = `
      <input type="text" placeholder="Enter a Google Font name" class="shadow border rounded py-2 px-3 text-slate-700 leading-tight w-full focus:outline-none focus:shadow-outline">
    `;
    fontsContainer.appendChild(fontEntry);
  });


  // Function to save settings
  document.getElementById('appSageSettingsForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Collect selected fonts and manually added fonts
    let selectedFonts = Array.from(document.getElementById('fonts').selectedOptions).map(option => option.value);
    let manualFonts = Array.from(document.querySelectorAll('#fontsContainer input[type="text"]'))
      .map(input => input.value)
      .filter(Boolean); // Remove empty entries
  
    // Combine selected and manually entered fonts
    let allFonts = [...new Set([...selectedFonts, ...manualFonts])]; // Avoid duplicates
  
    // Convert font names to object with kebab-case keys
    let fontsObject = allFonts.reduce((acc, font) => {
      const fontKey = font.toLowerCase().replace(/\+/g, '').replace(/\ /g, ''); // Convert to kebab-case
      acc[fontKey] = font.replace(/\ /g, '+');
      return acc;
    }, {});
  
    // Create a structure for colors where each color has multiple shades
    let colors = Array.from(document.querySelectorAll('.color-group')).reduce((acc, group) => {
      const colorName = group.querySelector('.customColorName').value;
      
      // Ensure a color name is entered
      if (colorName) {
        acc[colorName] = {};
  
        // For each color group, collect the shades
        group.querySelectorAll('.shade-entry').forEach(entry => {
          const shade = entry.querySelector('.colorShade').value;
          const colorValue = entry.querySelector('.customColorValue').value;
  
          // Add the shade and color value to the color group
          acc[colorName][shade] = colorValue;
        });
      }
  
      return acc;
    }, {});
  
    let formData = {
      fonts: fontsObject, // Save the fonts object
      colors: colors,     // Save the grouped colors
      advancedMode: document.getElementById('advancedMode').checked
    };
  
    // Store in localStorage
    localStorage.setItem(appSageSettingsString, JSON.stringify(formData));
    generateGfontsEmbedCode();
  
    const params = new URLSearchParams(window.location.search);
    params.set('settingsSaved', 'true');
    window.location.href = window.location.pathname + '?' + params.toString();
  });
  

  // Functionality to add more shades to a color group
  document.querySelectorAll('.addShade').forEach(button => {
    button.addEventListener('click', function () {
      let shadesContainer = button.previousElementSibling; // Find the associated shades container
      let newShadeEntry = document.createElement('div');
      newShadeEntry.classList.add('shade-entry', 'flex', 'space-x-4');
      
      newShadeEntry.innerHTML = `
        <div>
          <label for="colorShade" class="block text-slate-600 font-medium">Shade:</label>
          <select name="colorShade[]" class="colorShade shadow border rounded py-2 px-3 text-slate-700 w-full">
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
            <option value="950">950</option>
          </select>
        </div>
        <div>
          <label for="customColorValue" class="block text-slate-600 font-medium">Color Value:</label>
          <input type="color" class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline" name="customColorValue[]">
        </div>
      `;
      
      shadesContainer.appendChild(newShadeEntry); // Append the new shade entry to the container
    });
  });

  // Functionality to add a new color group
  document.getElementById('addColorGroup').addEventListener('click', function () {
    let colorsContainer = document.getElementById('colorsContainer');
    
    let newColorGroup = document.createElement('div');
    newColorGroup.classList.add('color-group', 'space-y-4');
    
    newColorGroup.innerHTML = `
      <div class="color-name-section">
        <label for="customColorName" class="block text-slate-600 font-medium">Color Name:</label>
        <input type="text" class="customColorName shadow border rounded py-2 px-3 text-slate-700 leading-tight w-full focus:outline-none focus:shadow-outline" name="customColorName[]" placeholder="Enter color name (e.g., 'secondary')">
      </div>
      <div class="shades-container space-y-2">
        <div class="shade-entry flex space-x-4">
          <div>
            <label for="colorShade" class="block text-slate-600 font-medium">Shade:</label>
            <select name="colorShade[]" class="colorShade shadow border rounded py-2 px-3 text-slate-700 w-full">
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
              <option value="800">800</option>
              <option value="900">900</option>
              <option value="950">950</option>
            </select>
          </div>
          <div>
            <label for="customColorValue" class="block text-slate-600 font-medium">Color Value:</label>
            <input type="color" class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline" name="customColorValue[]">
          </div>
        </div>
      </div>
      <button type="button" class="addShade mt-2 py-2 px-4 border border-sky-500 font-semibold text-sky-600 rounded shadow">Add Shade</button>
    `;
    
    colorsContainer.appendChild(newColorGroup); // Append the new color group to the container
  });
});

function generateGfontsEmbedCode(fonts) {
  const selectedFonts = fonts || Array.from(document.getElementById('fonts').selectedOptions).map(option => option.value).join('&family=');
  if (selectedFonts) {
    const embedTag = {
      content: `https://fonts.googleapis.com/css2?family=${selectedFonts}&display=swap`,
      name: 'stylesheet',
      type: 'link'
    }
    const params = new URLSearchParams(window.location.search);
    const page_id = params.get('config') || params.get('page');
    saveMetadataToLocalStorage(page_id, [embedTag])
  }
  console.log('Fonts saved to metadata.')
}

function showSettingsModal() {
  const settingsModal = document.getElementById('settingsModal');
  settingsModal.classList.remove('hidden');

  document.getElementById('confirmSaveSettings').addEventListener('click', function () {
    document.getElementById('appSageSettingsForm').submit();
  });

  document.getElementById('cancelSaveSettings').addEventListener('click', function () {
    settingsModal.classList.add('hidden');
  });
}


function showSettingsSavedModal() {
  // Parse the query parameters from the URL
  const params = new URLSearchParams(window.location.search);

  // Check if the "settingsSaved" parameter is true
  if (params.get('settingsSaved') === 'true') {
      // Create the modal HTML and insert it into the DOM
      const modal = document.createElement('div');
      modal.innerHTML = `
          <div class="fixed inset-0 z-[1000] bg-slate-800 bg-opacity-50 flex justify-center items-center">
              <div class="bg-slate-100 p-4 rounded-lg max-w-sm mx-auto">
                  <p class="text-slate-900">Your settings have been successfully saved!</p>
                  <div class="flex justify-center mt-4">
                      <button id="closeModal" class="bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded">
                          OK
                      </button>
                  </div>
              </div>
          </div>
      `;
      document.body.appendChild(modal);

      // Add event listener to close the modal
      document.getElementById('closeModal').addEventListener('click', () => {
          // Remove the modal from the DOM
          modal.remove();
      });

      // Remove the "settingsSaved" parameter from the URL without reloading the page
      params.delete('settingsSaved');
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', newUrl);
  }
}

document.addEventListener('DOMContentLoaded', showSettingsSavedModal);


/* File: ./app/js/main.js */
/*

  main.js

  This file is primarily for interface elements on index.html, though is also
  used in editor.html.

*/

// This function is for confirmation of deleting pages and elements.
// DATA IN: ['String', 'function()']
function showConfirmationModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[1000] bg-slate-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-slate-100 p-4 rounded-lg max-w-sm mx-auto">
          <p class="text-slate-900">${message}</p>
          <div class="flex justify-between mt-4">
              <button id="confirmDelete" class="bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded">Delete</button>
              <button id="cancelDelete" class="bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded">Cancel</button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('confirmDelete').addEventListener('click', function () {
    onConfirm();
    document.body.removeChild(modal);
  });

  document.getElementById('cancelDelete').addEventListener('click', function () {
    document.body.removeChild(modal);
  });
} // DATA OUT: null

// This function is for permanently deleting a page from localStorage.
// DATA IN: ['String', 'HTML Element, <div>']
function deletePage(page_id, element) {
  const message = "Are you sure you want to delete this page? This action cannot be undone.";

  showConfirmationModal(message, function () {
    const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
    const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString) || '{}');

    if (appSageStorage.pages && appSageStorage.pages[page_id]) {
      delete appSageStorage.pages[page_id];
    }

    for (let title in titleIdMap) {
      if (titleIdMap[title] === page_id) {
        delete titleIdMap[title];
        break;
      }
    }

    localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
    localStorage.setItem(appSageTitleIdMapString, JSON.stringify(titleIdMap));
    element.remove();

    console.log(`Page with ID ${page_id} has been deleted successfully.`);
  });
} // DATA OUT: null


/* File: ./app/js/editor/grid.js */
/*

  editor/grid.js

  This file is intended to be the primary location for anything related to adding, editing, and removing grids.

*/

// This function populates the sidebar with relevant editing options for grids.
// DATA IN: HTML Element, <div>
function addGridOptions(grid) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Grid</strong></div>${generateSidebarTabs()}`;
  activateTabs();

  if (grid) {
    const moveButtons = document.createElement('div');
    moveButtons.className = 'flex justify-between my-2'
    moveButtons.id = 'moveGridButtons'
    sidebar.prepend(moveButtons);

    let gridCount = document.getElementById('page').querySelectorAll('.pagegrid').length
    const contentCount = document.getElementById('page').querySelectorAll('.pastedHtmlContainer').length
    const flexCount = document.getElementById('page').querySelectorAll('.pageflex').length
    gridCount = gridCount + contentCount + flexCount;
    if (gridCount > 1) moveButtons.appendChild(createVerticalMoveGridButton(grid, 'up'));
    moveButtons.appendChild(addRemoveGridButton(grid, sidebar));
    if (gridCount > 1) moveButtons.appendChild(createVerticalMoveGridButton(grid, 'down'));

    // Grid-specific editing options
    addEditableColumns(sidebar, grid);
    addGridAlignmentOptions(sidebar, grid);
    addEditableColumnGaps(sidebar, grid);

    // Standard editing options
    addEditableBorders(sidebar, grid);
    addEditableOpacity(sidebar, grid);
    addEditableBackgroundColor(sidebar, grid);
    addEditableBackgroundImage(sidebar, grid);
    addEditableBackgroundImageURL(sidebar, grid);
    addEditableBackgroundFeatures(sidebar, grid);
    addEditableMarginAndPadding(sidebar, grid);
    addEditableDimensions(sidebar, grid);
    highlightEditingElement(grid);
    addIdAndClassToElements();
    addManualClassEditor(sidebar, grid);
    addManualCssEditor(sidebar, grid);
  }
} // DATA OUT: null

// This function creates the button for deleting the grid currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the 'move grid'
// buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div id="sidebar-dynamic">']
function addRemoveGridButton(grid, sidebar) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-grid'])
  button.className = 'removeGrid bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l512 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64zm32 64l512 0L517.3 421.8c-3 33-30.6 58.2-63.7 58.2l-331.1 0c-33.1 0-60.7-25.2-63.7-58.2L32 128zm256 88c2.2 0 4.3 1.1 5.5 2.9l20.7 29.6c7.3 10.5 21.6 13.4 32.4 6.6c11.7-7.3 14.8-22.9 6.9-34.1l-20.7-29.6c-10.2-14.6-27-23.3-44.8-23.3s-34.6 8.7-44.8 23.3l-20.7 29.6c-7.9 11.3-4.7 26.8 6.9 34.1c10.8 6.8 25.1 3.9 32.4-6.6l20.7-29.6c1.3-1.8 3.3-2.9 5.5-2.9zm-88.3 77.1c-10.8-6.8-25.1-3.9-32.4 6.6l-21.5 30.7c-6.4 9.1-9.8 20-9.8 31.2c0 30.1 24.4 54.4 54.4 54.4l49.6 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-49.6 0c-3.5 0-6.4-2.9-6.4-6.4c0-1.3 .4-2.6 1.2-3.7l21.5-30.7c7.9-11.3 4.7-26.8-6.9-34.1zM312 392c0 13.3 10.7 24 24 24l49.6 0c30.1 0 54.4-24.4 54.4-54.4c0-11.2-3.4-22.1-9.8-31.2l-21.5-30.7c-7.3-10.5-21.6-13.4-32.4-6.6c-11.7 7.3-14.8 22.9-6.9 34.1l21.5 30.7c.8 1.1 1.2 2.4 1.2 3.7c0 3.5-2.9 6.4-6.4 6.4L336 368c-13.3 0-24 10.7-24 24z"/></svg>';
  button.onclick = function () {
    showConfirmationModal('Are you sure you want to delete this entire grid?', () => {
      grid.parentNode.removeChild(grid);
      sidebar.innerHTML = '<p>Nothing to edit. Add a grid by clicking the Plus (+) button.</p>';
    });
  };
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for moving the element it belongs to upward
// and downward in the DOM. Currently, these buttons live at the top of the
// editor sidebar when the grid is/has been selected for editing.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function createVerticalMoveGridButton(grid, direction) {
  const button = document.createElement('button');
  button.className = 'moveGrid inline ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold pt-1 pb-1.5 rounded w-12';
  if (direction == 'up') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-grid-up'])
  } else {
    button.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M246.6 502.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 192 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128zM64 160c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 43 43 0 96 0L352 0c53 0 96 43 96 96l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7-14.3-32-32-32L96 64C78.3 64 64 78.3 64 96l0 64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-grid-down'])
  }
  button.addEventListener('click', function () {
    moveVertical(grid, direction);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function is intended to present the sidebar editing options when a grid
// is clicked.
// DATA IN: HTML Element, <div>
function enableEditGridOnClick(grid) {
  grid.addEventListener('click', function (event) {
    event.stopPropagation();
    addGridOptions(grid);
    highlightEditingElement(grid);
    addIdAndClassToElements();
  });
} // DATA OUT: null


/* File: ./app/js/editor/style/grid.js */
/*

  editor/style/grid.js

  This file is intended to be the primary location for anything adding editor
  options to the sidebar in a context primarily for grids & seldom elsewhere.
  All functions here rely on `addDeviceTargetedOptions` which helps segregate
  styles between targeted device sizes.

*/

// This function gives the grid editor sidebar the ability to use alignment
// options from TailwindCSS.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addGridAlignmentOptions(sidebar, grid) {
  const justifyItemsOptions = ['start', 'end', 'center', 'stretch', 'reset'];
  const alignContentOptions = ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly', 'reset'];
  const placeItemsOptions = ['start', 'end', 'center', 'stretch', 'reset'];

  // Justify Items - See: https://tailwindcss.com/docs/justify-items
  addDeviceTargetedOptions(sidebar, grid, 'Justify Items', 'justify-items', justifyItemsOptions, 'icon-select');
  // Align Content - See: https://tailwindcss.com/docs/align-content
  addDeviceTargetedOptions(sidebar, grid, 'Align Content', 'content', alignContentOptions, 'icon-select');
  // Place Items - See: https://tailwindcss.com/docs/place-items
  addDeviceTargetedOptions(sidebar, grid, 'Place Items', 'place-items', placeItemsOptions, 'icon-select');
} // DATA OUT: null

// This function is for chooding the number of columns (vertical) that exist
// within the grid.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableColumns(sidebar, grid) {
  // Arbitrary constraint of 12 columns to reduce laymen designers making
  // things messy.
  const columns = Array.from({ length: 12 }, (_, i) => i + 1);

  // See: https://tailwindcss.com/docs/grid-template-columns
  addDeviceTargetedOptions(sidebar, grid, 'Number of Columns', 'grid-cols', columns, 'select');
} // DATA OUT: null


/* File: ./app/js/editor/container.js */
/*

  editor/container.js

  This file is intended to be the primary location for anything related to adding, editing, and removing container box.

*/

// This function populates the sidebar with relevant editing options for container box.
// DATA IN: HTML Element, <div>
function addContainerOptions(container) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Flexible Container</strong></div>${generateSidebarTabs()}`;
  activateTabs();

  if (container) {
    const moveButtons = document.createElement('div');
    moveButtons.className = 'flex justify-between my-2'
    moveButtons.id = 'moveContainerButtons'
    sidebar.prepend(moveButtons);

    let containerCount = document.getElementById('page').querySelectorAll('.pagecontainer').length
    const contentCount = document.getElementById('page').querySelectorAll('.pastedHtmlContainer').length
    const gridCount = document.getElementById('page').querySelectorAll('.pagegrid').length
    containerCount = containerCount + contentCount + gridCount;
    if (containerCount > 1) moveButtons.appendChild(createVerticalMoveContainerButton(container, 'up'));
    moveButtons.appendChild(addRemoveContainerButton(container, sidebar));
    if (containerCount > 1) moveButtons.appendChild(createVerticalMoveContainerButton(container, 'down'));

    // Container-specific editing options
    addContainerAlignmentOptions(sidebar, container);

    // Standard editing options
    addEditableBorders(sidebar, container);
    addEditableOpacity(sidebar, container);
    addEditableBackgroundColor(sidebar, container);
    addEditableBackgroundImage(sidebar, container);
    addEditableBackgroundImageURL(sidebar, container);
    addEditableBackgroundFeatures(sidebar, container);
    addEditableMarginAndPadding(sidebar, container);
    addEditableDimensions(sidebar, container);
    highlightEditingElement(container);
    addIdAndClassToElements();
    addManualClassEditor(sidebar, container);
    addManualCssEditor(sidebar, container);
  }
} // DATA OUT: null

function createAddHtmlButton(containingBox) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', 'Paste in a Tailwind template');
  button.className = 'addContainer highlightButton hidden w-16 h-12 absolute -bottom-12 left-44 ugc-discard bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded-b z-50';
  button.innerHTML = `<svg class="h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33"><g clip-path="url(#prefix__clip0)"><path fill="#ffffff" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"clip-rule="evenodd" /></g><defs><clipPath id="prefix__clip0"><path fill="#fff" d="M0 0h54v32.4H0z" /></clipPath></defs></svg>`

  button.addEventListener('click', function (e) {
    showHtmlModal(containingBox, () => { });
  });
  return button;
}

function createAddContainerButton(containingBox) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['add-container']);
  button.className = 'addContainer highlightButton hidden w-16 h-12 absolute -bottom-12 left-4 ugc-discard bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded-b z-50';
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg><svg class="w-4 h-4 inline" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M48 32C21.5 32 0 53.5 0 80L0 240c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-160c0-26.5-21.5-48-48-48L48 32zM304 224c-26.5 0-48 21.5-48 48l0 160c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-160c0-26.5-21.5-48-48-48l-96 0zM0 400l0 32c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-32c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48zM304 32c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-32c0-26.5-21.5-48-48-48l-96 0z"/></svg>`;
  button.addEventListener('click', function () {
    const containerContainer = document.createElement('div');
    containerContainer.className = 'group w-auto min-w-auto max-w-auto min-h-auto h-auto max-h-auto pagecontainer ml-0 mr-0 mt-0 mb-0 p-4';

    containingBox.appendChild(containerContainer);

    addContainerOptions(containerContainer);
    addIdAndClassToElements();

    // Enable recursive boxes
    const addContainerButton = createAddContainerButton(containerContainer);
    containerContainer.appendChild(addContainerButton);

    if (advancedMode === true){
      const addHtmlButton = createAddHtmlButton(containerContainer);
      containerContainer.appendChild(addHtmlButton);
    }

    // Append add content button at the end
    const addContentButton = createAddContentButton(containerContainer);
    containerContainer.appendChild(addContentButton);

    enableEditContainerOnClick(containerContainer);
    highlightEditingElement(containerContainer);
  });
  // This creates a reliable hover effect for many nested elements
  // containingBox.addEventListener('mouseover', function(event){
  //   event.stopPropagation();
  //   button.classList.add('block');
  //   button.classList.remove('hidden');
  // });
  // containingBox.addEventListener('mouseout', function(event){
  //   event.stopPropagation();
  //   button.classList.add('hidden');
  //   button.classList.remove('block');
  // });
  return button;
} 

// This function creates the button for deleting the container currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the 'move container'
// buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div id="sidebar-dynamic">']
function addRemoveContainerButton(container, sidebar) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-container'])
  button.className = 'removeContainer bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l512 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64zm32 64l512 0L517.3 421.8c-3 33-30.6 58.2-63.7 58.2l-331.1 0c-33.1 0-60.7-25.2-63.7-58.2L32 128zm256 88c2.2 0 4.3 1.1 5.5 2.9l20.7 29.6c7.3 10.5 21.6 13.4 32.4 6.6c11.7-7.3 14.8-22.9 6.9-34.1l-20.7-29.6c-10.2-14.6-27-23.3-44.8-23.3s-34.6 8.7-44.8 23.3l-20.7 29.6c-7.9 11.3-4.7 26.8 6.9 34.1c10.8 6.8 25.1 3.9 32.4-6.6l20.7-29.6c1.3-1.8 3.3-2.9 5.5-2.9zm-88.3 77.1c-10.8-6.8-25.1-3.9-32.4 6.6l-21.5 30.7c-6.4 9.1-9.8 20-9.8 31.2c0 30.1 24.4 54.4 54.4 54.4l49.6 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-49.6 0c-3.5 0-6.4-2.9-6.4-6.4c0-1.3 .4-2.6 1.2-3.7l21.5-30.7c7.9-11.3 4.7-26.8-6.9-34.1zM312 392c0 13.3 10.7 24 24 24l49.6 0c30.1 0 54.4-24.4 54.4-54.4c0-11.2-3.4-22.1-9.8-31.2l-21.5-30.7c-7.3-10.5-21.6-13.4-32.4-6.6c-11.7 7.3-14.8 22.9-6.9 34.1l21.5 30.7c.8 1.1 1.2 2.4 1.2 3.7c0 3.5-2.9 6.4-6.4 6.4L336 368c-13.3 0-24 10.7-24 24z"/></svg>';
  button.onclick = function () {
    showConfirmationModal('Are you sure you want to delete this entire container?', () => {
      container.parentNode.removeChild(container);
      sidebar.innerHTML = '<p>Nothing to edit. Add a container by clicking the Plus (+) button.</p>';
    });
  };
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for moving the element it belongs to upward
// and downward in the DOM. Currently, these buttons live at the top of the
// editor sidebar when the container is/has been selected for editing.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function createVerticalMoveContainerButton(container, direction) {
  const button = document.createElement('button');
  button.className = 'moveContainer inline ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold pt-1 pb-1.5 rounded w-12';
  if (direction == 'up') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-container-up'])
  } else {
    button.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M246.6 502.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 192 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128zM64 160c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 43 43 0 96 0L352 0c53 0 96 43 96 96l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7-14.3-32-32-32L96 64C78.3 64 64 78.3 64 96l0 64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-container-down'])
  }
  button.addEventListener('click', function () {
    moveVertical(container, direction);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function is intended to present the sidebar editing options when a container
// is clicked.
// DATA IN: HTML Element, <div>
function enableEditContainerOnClick(container) {
  container.addEventListener('click', function (event) {
    event.stopPropagation();
    addContainerOptions(container);
    highlightEditingElement(container);
    addIdAndClassToElements();
  });
} // DATA OUT: null


/* File: ./app/js/editor/style/container.js */
/*

  editor/style/container.js

  This file is intended to be the primary location for anything adding editor
  options to the sidebar in a context primarily for container boxes & seldom
  elsewhere. All functions here rely on `addDeviceTargetedOptions` which helps
  segregate styles between targeted device sizes.

*/

// This function gives the container box editor sidebar the ability to use alignment
// options from TailwindCSS.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addContainerAlignmentOptions(sidebar, container) {
  const justifyContentOptions = ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly', 'reset'];
  const alignOptions = ['start', 'end', 'center', 'stretch', 'reset'];

  // Justify Content - See: https://tailwindcss.com/docs/justify-content
  addDeviceTargetedOptions(sidebar, container, 'Justify Content', 'justify', justifyContentOptions, 'icon-select');
  // Align Items - See: https://tailwindcss.com/docs/align-items
  addDeviceTargetedOptions(sidebar, container, 'Align Items', 'items', alignOptions, 'icon-select');
  // Align Self - See: https://tailwindcss.com/docs/place-items
  addDeviceTargetedOptions(sidebar, container, 'Align Self', 'self', alignOptions, 'icon-select');
} // DATA OUT: null


/* File: ./app/js/editor/column.js */
/*

  editor/column.js

  This file is intended to be the primary location for anything related to
  adding, editing, and removing columns.

  TODO: Currently, if a column has no margins, padding, or content inside of
        it, it can be extremely hard to click. How do we resolve this?

*/

// This function used to be more complex, but has been simplified over time.
// It is still here under a "don't fix it if it ain't broke" line of thinking.
// DATA IN: null
function createColumn() {
  const column = document.createElement('div');
  column.className = 'col-span-1 pagecolumn group p-4';
  enableEditColumnOnClick(column);
  return column;
} // DATA OUT: HTML Element, <div>

// This function makes it so that when you click on a column, the editing options
// will be revealed in the sidebar to the left of the screen. It does this by
// first making the label and supporting elements for moving and removing the
// column, and then adding the editor buttons, dropdowns, etc.
// DATA IN: HTML Element, <div>
function enableEditColumnOnClick(column) {
  column.addEventListener('click', function (event) {
    event.stopPropagation();
    addColumnOptions(column);
  });
} // DATA OUT: null

function addColumnOptions(column) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Column</strong></div>${generateSidebarTabs()}`;
  activateTabs();
  highlightEditingElement(column);
  addIdAndClassToElements();

  const moveButtons = document.createElement('div');
  moveButtons.className = 'flex justify-between my-2'
  moveButtons.id = 'moveColumnButtons'
  sidebar.prepend(moveButtons);
  moveButtons.appendChild(createHorizontalMoveColumnButton(column, 'left'));
  moveButtons.appendChild(createRemoveColumnButton(column, column.parentElement));
  moveButtons.appendChild(createHorizontalMoveColumnButton(column, 'right'));

  // Column-specific editing options
  addColumnAlignmentOptions(sidebar, column);

  // Standard editing options
  addEditableBorders(sidebar, column);
  addEditableOpacity(sidebar, column);
  addEditableBackgroundColor(sidebar, column);
  addEditableBackgroundImage(sidebar, column);
  addEditableBackgroundImageURL(sidebar, column);
  addEditableBackgroundFeatures(sidebar, column);
  addEditableMarginAndPadding(sidebar, column);
  addEditableDimensions(sidebar, column);
  addManualClassEditor(sidebar, column);
  addManualCssEditor(sidebar, column);
}

// This function creates the button for moving the element it belongs to upward
// and downward in the DOM. Because it is a column, this sometimes or often
// means it will be moving left/right, rather than literally 'upward/downward.'
// Currently, these buttons live at the top of the editor sidebar when the
// column is/has been selected for editing.
// DATA IN: ['HTML Element', 'String:left/right']
function createHorizontalMoveColumnButton(column, direction) {
  const button = document.createElement('button');
  button.className = 'moveColumn ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold p-2 rounded h-12 w-16';
  button.setAttribute('data-extra-info', tooltips['move-column'] + direction);
  if (direction == 'left') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 224 320 224c17.7 0 32 14.3 32 32s-14.3 32-32 32l-210.7 0 73.4 73.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-128-128zM352 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM192 96l0 320L64 416 64 96l128 0zm64 0l128 0 0 320-128 0 0-320zm320 0l0 320-128 0 0-320 128 0z"/></svg>';
  } else {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM192 96l0 320L64 416 64 96l128 0zm64 0l128 0 0 320-128 0 0-320zm320 0l0 320-128 0 0-320 128 0z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>';
  }
  button.addEventListener('click', function () {
    moveColumnHorizontal(column, direction);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for deleting the column currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the Move Column
// buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function createRemoveColumnButton(column, gridContainer) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-column'])
  button.className = 'removeColumn ugc-discard  bg-rose-500 top-2 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l512 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64zm32 64l512 0L517.3 421.8c-3 33-30.6 58.2-63.7 58.2l-331.1 0c-33.1 0-60.7-25.2-63.7-58.2L32 128zm256 88c2.2 0 4.3 1.1 5.5 2.9l20.7 29.6c7.3 10.5 21.6 13.4 32.4 6.6c11.7-7.3 14.8-22.9 6.9-34.1l-20.7-29.6c-10.2-14.6-27-23.3-44.8-23.3s-34.6 8.7-44.8 23.3l-20.7 29.6c-7.9 11.3-4.7 26.8 6.9 34.1c10.8 6.8 25.1 3.9 32.4-6.6l20.7-29.6c1.3-1.8 3.3-2.9 5.5-2.9zm-88.3 77.1c-10.8-6.8-25.1-3.9-32.4 6.6l-21.5 30.7c-6.4 9.1-9.8 20-9.8 31.2c0 30.1 24.4 54.4 54.4 54.4l49.6 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-49.6 0c-3.5 0-6.4-2.9-6.4-6.4c0-1.3 .4-2.6 1.2-3.7l21.5-30.7c7.9-11.3 4.7-26.8-6.9-34.1zM312 392c0 13.3 10.7 24 24 24l49.6 0c30.1 0 54.4-24.4 54.4-54.4c0-11.2-3.4-22.1-9.8-31.2l-21.5-30.7c-7.3-10.5-21.6-13.4-32.4-6.6c-11.7 7.3-14.8 22.9-6.9 34.1l21.5 30.7c.8 1.1 1.2 2.4 1.2 3.7c0 3.5-2.9 6.4-6.4 6.4L336 368c-13.3 0-24 10.7-24 24z"/></svg>';
  button.addEventListener('click', function () {
    if (columnHasContent(column)) {
      showConfirmationModal('Are you sure you want to delete this column?', () => {
        gridContainer.removeChild(column);
      });
    } else {
      gridContainer.removeChild(column);
    }
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for making a new column. This button exists
// inside an already existing grid. You are able to see this button when
// hovering the mouse over said existing grid. Once it makes the new column,
// it updates the sidebar to reveal all of the editing options someone at some
// point deemed to be available for columns.
// DATA IN: HTML Element, <div>
function createAddColumnButton(gridContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  const menuItem = document.createElement('button');
  menuItem.setAttribute('data-extra-info', tooltips['add-column']);
  menuItem.className = 'addColumn highlightButton hidden w-16 h-12 absolute -bottom-12 left-4 ugc-discard bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded-b z-50';
  menuItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM192 96l0 320L64 416 64 96l128 0zm64 0l128 0 0 320-128 0 0-320zm320 0l0 320-128 0 0-320 128 0z"/></svg>`;
  menuItem.onclick = function () {
    const newColumn = createColumn();
    gridContainer.insertBefore(newColumn, this);
    newColumn.appendChild(createAddContentButton(newColumn));

    addColumnAlignmentOptions(sidebar, newColumn);
    addEditableBorders(sidebar, newColumn);
    addEditableBackgroundColor(sidebar, newColumn);
    addEditableBackgroundImage(sidebar, newColumn);
    addEditableBackgroundImageURL(sidebar, newColumn);
    addEditableBackgroundFeatures(sidebar, newColumn);
    addEditableMarginAndPadding(sidebar, newColumn);

    highlightEditingElement(newColumn);
    addIdAndClassToElements();
  };
  return menuItem;
} // DATA OUT: HTML Element, <button>

// This function checks if content exists in a column so that the designer
// is warned when they click the 'delete column' button.
// DATA IN: HTML Element, <div>
function columnHasContent(column) {
  if (column) {
    // Check if column contains any significant elements
    // We assume here that only certain tags are considered "content"
    const contentTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'video', 'audio', 'form', 'button', 'a']; // Add other tags as needed
    return Array.from(column.querySelectorAll('*')).some(child => {
      // Check if the element is one of the content types and not empty
      return contentTags.includes(child.tagName.toLowerCase()) && (
        child.textContent.trim() !== '' || // Text content is not empty
        (child.src && child.src.trim() !== '') || // For media elements with src
        (child.href && child.href.trim() !== '') // For links
      );
    });
  }
} // DATA OUT: null

// This function is the ...function...al bit of the 'move column' buttons.
// DATA IN: ['HTML Element, <div>', 'String:left/right']
function moveColumnHorizontal(column, direction) {
  const parent = column.parentNode;
  let targetSibling = getNextValidSibling(column, direction);

  if (direction === 'left' && targetSibling) {
    parent.insertBefore(column, targetSibling);
  } else if (direction === 'right' && targetSibling) {
    parent.insertBefore(targetSibling, column);
  }
} // DATA OUT: null


/* File: ./app/js/editor/style/column.js */
/*

  editor/style/column.js

  This file is intended to be the primary location for anything adding editor
  options to the sidebar in a context primarily for columns & seldom elsewhere.
  All functions here rely on `addDeviceTargetedOptions` which helps segregate
  styles between targeted device sizes.

*/

// This function gives the column editor sidebar the ability to use alignment
// options from TailwindCSS.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addColumnAlignmentOptions(sidebar, column) {
  const justifyContentsOptions = ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly', 'reset'];
  const colSpanOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

  // Add 'Justify Content' as an icon-select
  addDeviceTargetedOptions(sidebar, column, 'Justify Content', 'justify', justifyContentsOptions, 'icon-select');

  // Add 'Column Span' as an icon-select or select
  addDeviceTargetedOptions(sidebar, column, 'Column Span', 'col-span', colSpanOptions, 'select'); // 'icon-select' is also possible
}  // DATA OUT: null


/* File: ./app/js/editor/content.js */
/*

  editor/content.js

*/

// This function creates a container for individual HTML elements. This is
// intended to make it easier to comprehend, within the code, movements of
// elements through the DOM and to be able to do things like add background
// images while still being able to give the actual element a background color
// so that legibility is still possible.
// TODO: Additionally, adding a background color to a button, for example,
//       creates confusing results since clicking that background doesn't
//       actually result in clicking the link. This needs to be fixed and
//       crafted more intentionally for certain elements.
// DATA IN: null
function addContentContainer() {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container pagecontent w-auto'; // A new class specifically for content
  const contentTag = document.createElement('p'); // create a paragraph by default
  contentContainer.append(contentTag);

  displayMediaFromIndexedDB(contentContainer.firstElementChild);
  enableEditContentOnClick(contentContainer);
  observeClassManipulation(contentContainer);
  addContentOptions(contentContainer);

  return contentContainer;
} // DATA OUT: HTML Element, <div class="pagecontent">

// This function adds a lot of the standard editing options that should be
// available for all elements. This listens for any clicks on editable content
// and also adds more important editing options before the standard options,
// such as the actual text being added, hrefs for links, form fields, etc.
// DATA IN: HTML Element, <div>
function enableEditContentOnClick(contentContainer) {
  contentContainer.addEventListener('click', function (event) {
    event.stopPropagation();
    addContentOptions(contentContainer);
  });
} // DATA OUT: null

// This function creates the button for adding content to the column currently
// being hovered over by the designer.
// DATA IN: HTML Element, <div>
function createAddContentButton(column) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['add-content']);
  button.className = `addContent highlightButton ugc-discard z-50 absolute hidden -bottom-12 left-24 bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded-b h-12 w-16`;
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`;
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    const contentContainer = addContentContainer();
    column.appendChild(contentContainer);
    highlightEditingElement(column);
    addIdAndClassToElements();
  });
  // This creates a reliable hover effect for many nested elements
  // column.addEventListener('mouseover', function(event){
  //   event.stopPropagation();
  //   button.classList.add('block');
  //   button.classList.remove('hidden');
  // });
  // column.addEventListener('mouseout', function(event){
  //   event.stopPropagation();
  //   button.classList.add('hidden');
  //   button.classList.remove('block');
  // });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for deleting the content currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the
// 'move content' buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div id="sidebar-dynamic">']
function createRemoveContentButton(contentContainer) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-content'])
  button.className = 'removeContent ugc-discard bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L409.6 295.8l42.1-42.1L474.3 231l11.3-11.3-33.9-33.9-62.1-62.1L355.7 89.8l-11.3 11.3-22.6 22.6-57.8 57.8L38.8 5.1zM306.2 214.7l50.5-50.5c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-47.8 47.8-25.4-19.9zM195.5 250l-72.9 72.9c-10.4 10.4-18 23.3-22.2 37.4L65 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2l88.3-88.3-77.9-61.4-27.6 27.6c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l24.9-24.9L195.5 250zM224 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9l-78.1 23 23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM426.7 18.7L412.3 33.2 389.7 55.8 378.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L517.3 18.7c-25-25-65.5-25-90.5 0z"/></svg>';
  button.addEventListener('click', function () {
    showConfirmationModal('Are you sure you want to delete this content?', () => {
      contentContainer.remove();
      document.getElementById('sidebar-dynamic').innerHTML = '';
    });
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for moving the element the content belongs
// to upward and downward in the column. Currently, these buttons live at the
// top of the editor sidebar when the grid is/has been selected for editing.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function createVerticalMoveContentButton(contentContainer, direction) {
  const button = document.createElement('button');
  button.className = 'moveContent ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold p-2 rounded h-12 w-16';
  if (direction == 'up') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-content-up'])
  } else {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M246.6 502.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 192 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128zM64 160c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 43 43 0 96 0L352 0c53 0 96 43 96 96l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7-14.3-32-32-32L96 64C78.3 64 64 78.3 64 96l0 64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-content-down'])
  }
  button.addEventListener('click', function () {
    moveVertical(contentContainer, direction);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function and the one below it creates various buttons to choose from
// available elements that can be created.
// DATA IN: HTML Element, <div>
function addContentOptions(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  updateSidebarForTextElements(sidebar, contentContainer);

  const moveButtons = document.createElement('div');
  moveButtons.className = 'flex justify-between my-2';
  moveButtons.id = 'moveContentButtons';
  sidebar.prepend(moveButtons);

  let multipleContent;
  let contentCount;
  if (contentContainer.classList.contains('pastedHtmlContainer')) {
    let gridCount = document.getElementById('page').querySelectorAll('.pagegrid').length
    contentCount = document.getElementById('page').querySelectorAll('.pastedHtmlContainer').length
    const flexCount = document.getElementById('page').querySelectorAll('.pageflex').length
    contentCount = gridCount + contentCount + flexCount;
  } else {
  // Minus one to remove the 'Add Content' button from the count
    multipleContent = contentContainer.parentNode === null ? contentContainer.children : contentContainer.parentNode.children;
    contentCount = multipleContent.length - 1;
  }
  if (contentCount > 1) moveButtons.appendChild(createVerticalMoveContentButton(contentContainer, 'up'));
  moveButtons.appendChild(createRemoveContentButton(contentContainer));
  if (contentCount > 1) moveButtons.appendChild(createVerticalMoveContentButton(contentContainer, 'down'));

  highlightEditingElement(contentContainer);
  addIdAndClassToElements();
} // DATA OUT: null

// This cobbles together all the needed bits for adding/editing form fields.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function updateSidebarFields(form, sidebarForm, submitButton, inputTypes) {
  // Remove all existing field editors except the add new field section
  const existingEditors = sidebarForm.querySelectorAll('.field-editor');
  existingEditors.forEach(editor => editor.remove());

  // Iterate over form inputs and create corresponding editors in the sidebar form
  form.querySelectorAll('input, select, textarea').forEach(input => {
    if (input === submitButton) return;

    const fieldEditor = document.createElement('div');
    fieldEditor.className = 'field-editor group my-4 bg-slate-50';

    const idLabel = document.createElement('label');
    idLabel.setAttribute('for', 'idField');
    idLabel.textContent = 'Input ID:';
    idLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const idField = document.createElement('input');
    idField.setAttribute('name', 'idField');
    idField.type = 'text';
    idField.value = input.id;
    idField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    idField.oninput = function () {
      input.id = idField.value;
    };

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'nameField');
    nameLabel.textContent = 'Input Name:';
    nameLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const nameField = document.createElement('input');
    nameField.setAttribute('name', 'nameField');
    nameField.type = 'text';
    nameField.value = input.name;
    nameField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    nameField.oninput = function () {
      input.name = nameField.value;
    };

    const fieldLabel = document.createElement('label');
    fieldLabel.setAttribute('for', 'fieldInput');
    fieldLabel.textContent = 'Edit Field Label:';
    fieldLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const fieldInput = document.createElement('input');
    fieldInput.setAttribute('name', 'fieldInput');
    fieldInput.type = 'text';
    fieldInput.value = input.placeholder;
    fieldInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    fieldInput.oninput = function () {
      input.placeholder = fieldInput.value;
    };

    const fieldTypeLabel = document.createElement('label');
    fieldTypeLabel.setAttribute('for', 'fieldType');
    fieldTypeLabel.textContent = 'Edit Field Type:';
    fieldTypeLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const fieldType = document.createElement('select');
    fieldType.setAttribute('name', 'fieldType');
    fieldType.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    inputTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      if (type === input.type) {
        option.selected = true;
      }
      fieldType.appendChild(option);
    });
    fieldType.onchange = function () {
      input.type = fieldType.value;
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold py-1.5 px-4 rounded mt-2 inline-block';
    deleteButton.onclick = function () {
      input.remove();
      fieldEditor.remove();
    };

    fieldEditor.appendChild(fieldLabel);
    fieldEditor.appendChild(fieldInput);
    fieldEditor.appendChild(fieldTypeLabel);
    fieldEditor.appendChild(fieldType);
    fieldEditor.appendChild(idLabel);
    fieldEditor.appendChild(idField);
    fieldEditor.appendChild(nameLabel);
    fieldEditor.appendChild(nameField);
    fieldEditor.appendChild(deleteButton);

    sidebarForm.appendChild(fieldEditor);
  });
} // DATA OUT: null

// This function is the operational bits of the "Move Grid" and "Move Content"
// buttons.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function moveVertical(element, direction) {
  const parent = element.parentNode;
  let targetSibling = getNextValidSibling(element, direction);

  if (direction === 'up' && targetSibling) {
    parent.insertBefore(element, targetSibling);
  } else if (direction === 'down' && targetSibling) {
    // For moving down, we need to insert before the next element of the targetSibling
    const nextToTarget = targetSibling.nextElementSibling;
    if (nextToTarget) {
      parent.insertBefore(element, nextToTarget);
    } else {
      parent.appendChild(element);  // If there's no next sibling, append to the end of the parent
    }
  }
} // DATA OUT: null

// This function makes those all-caps labels with the icon to the left of them.
// DATA IN: null
function createLabelAllDevices() {
  const label = document.createElement('span');
  label.className = 'inline-block col-span-5 text-slate-700 text-xs uppercase mt-2';
  label.textContent = 'All Devices';
  const breakpoints = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  breakpoints.forEach(bp => {
    const responsiveIcon = document.createElement('span');
    responsiveIcon.className = 'h-3 w-3 mr-2 inline-block';
    responsiveIcon.innerHTML = `${appSageEditorIcons['responsive'][bp]}`;
    label.prepend(responsiveIcon);
  });
  return label;
} // DATA OUT: HTML Element, <span>

// This function helps media tags generate the correct text needed for the
// value of their `src` attribute.
// DATA IN: ['HTML Element Event', 'HTML Element, <div>', 'String']
function generateMediaUrl(event, contentContainer, background) {
  const file = event.target.files ? event.target.files[0] : null;

  if (file) {
    const reader = new FileReader();

    reader.onload = async function (e) {

      // Store the media file in IndexedDB
      const mediaId = contentContainer.getAttribute('data-media-id') || Date.now().toString();
      await saveMediaToIndexedDB(file, mediaId);
      contentContainer.setAttribute('data-media-id', mediaId);

      if (background) {
        contentContainer.style.backgroundImage = `url(${e.target.result})`;
      } else {
        contentContainer.src = e.target.result;
      }
    };

    reader.readAsDataURL(file);
  }
} // DATA OUT: null

// Helper functions for IndexedDB storage
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(appSageDatabaseString, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('mediaStore', { keyPath: 'id' });
      db.createObjectStore('mediaStore', { keyPath: 'blob' });
      db.createObjectStore('mediaStore', { keyPath: 'url' });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('Error opening database');
    };
  });
}

async function saveMediaToIndexedDB(mediaBlob, mediaId) {
  const db = await openDatabase();
  const transaction = db.transaction(['mediaStore'], 'readwrite');
  const store = transaction.objectStore('mediaStore');
  const mediaEntry = { id: mediaId, blob: mediaBlob, url: '/app/placeholder_media/lightmode_jpg/landscape_placeholder.jpg' };
  store.put(mediaEntry);
}

async function getMediaFromIndexedDB(mediaId) {
  const db = await openDatabase();
  const transaction = db.transaction(['mediaStore'], 'readonly');
  const store = transaction.objectStore('mediaStore');

  return new Promise((resolve, reject) => {
    const request = store.get(mediaId);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject('Error fetching media');
  });
}

function displayMediaFromIndexedDB(targetElement) {
  const mediaId = targetElement.getAttribute('data-media-id');

  if (mediaId) {
    getMediaFromIndexedDB(mediaId).then((mediaEntry) => {
      if (mediaEntry) {
        const mediaElement = ['IMG', 'VIDEO', 'AUDIO'].includes(targetElement.tagName);
        const mediaUrl = mediaEntry.url === '/app/placeholder_media/lightmode_jpg/landscape_placeholder.jpg' ? URL.createObjectURL(mediaEntry.blob) : mediaEntry.url;
        mediaEntry.url = mediaUrl;
        if (mediaElement) {
          targetElement.src = mediaUrl;
        } else {
          if (targetElement.classList.contains('pagecontainer') || targetElement.classList.contains('pagegrid') || targetElement.classList.contains('pagecolumn')){
            targetElement.style.backgroundImage = `url(${mediaUrl})`;
          } else {
            targetElement.parent.style.backgroundImage = `url(${mediaUrl})`;
          }
        }
      }
    }).catch((error) => {
      console.error('Error displaying media from IndexedDB:', error);
    });
  }
}

// This function is a half-complete attempt as a catch-all way of editing any
// and all HTML elements, particularly those that may have been copy/pasted in.
// DATA IN: HTML Element, <div>
function updateSidebarForTextElements(sidebar, container) {
  sidebar.innerHTML = `${generateSidebarTabs()}`;
  activateTabs();
  const targetElement = container.firstElementChild;
  let directEditing = false;

  let contentContainer;
  if (targetElement && ['IMG', 'VIDEO', 'AUDIO', 'A', 'BUTTON'].includes(targetElement.tagName)) {
    directEditing = true;
    contentContainer = targetElement;
  } else {
    contentContainer = container;
  }

  const tagDropdown = document.createElement('select');
  tagDropdown.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  const options = [
    { label: 'Paragraph', value: 'p' },
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Heading 3', value: 'h3' },
    { label: 'Heading 4', value: 'h4' },
    { label: 'Heading 5', value: 'h5' },
    { label: 'Heading 6', value: 'h6' },
    { label: 'Line of text', value: 'span' },
    { label: 'Block of text', value: 'div' },
    // { label: 'Form', value: 'form' },
    { label: 'Link / Button', value: 'a' },
    { label: 'Button', value: 'button' },
    { label: 'Image', value: 'img' },
    { label: 'Video', value: 'video' },
    { label: 'Audio', value: 'audio' }
  ];

  const formContainer = document.createElement('div');

  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    tagDropdown.appendChild(option);
  });

  const textInput = document.createElement('textarea');
  textInput.placeholder = 'Enter content here...';
  textInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  const srOnly = document.createElement('input');
  srOnly.placeholder = 'Text for screen readers';
  srOnly.className = 'shadow border hidden rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  srOnly.setAttribute('data-extra-info', 'If your element relies on imagery or visual references to make sense, add text here to give more detail.');
  if (advancedMode === true) srOnly.classList.remove('hidden');

  srOnly.addEventListener('change', function () {
    const selectedTag = tagDropdown.value;
    let element;
    const srOnlyElement = document.createElement('span')
    srOnlyElement.className = 'sr-only';
    srOnlyElement.textContent = srOnly.value;

    if (directEditing) {
      // This predicates that an img/video/audio (media) tag already exists
      element = contentContainer;
    } else {
      element = contentContainer.querySelector(selectedTag);
    }

    // If no element exists for the media tag, create one
    if (!element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element = document.createElement(selectedTag);
      element.appendChild(srOnlyElement);
      contentContainer.appendChild(element);
    }

    // If it's not a media tag, update the text
    if (element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element.textContent = textInput.value;
      element.appendChild(srOnlyElement);
    }
  });

  const mediaUrlInput = document.createElement('input');
  mediaUrlInput.type = 'text';
  mediaUrlInput.placeholder = 'Enter media URL...';
  mediaUrlInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*, video/*, audio/*'; // Accept multiple media types
  fileInput.className = 'shadow border rounded py-2 bg-[#ffffff] px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  fileInput.onchange = function (event) {
    generateMediaUrl(event, targetElement, false);
  }

  function toggleInputs(selectedTag) {
    if (['img', 'video', 'audio'].includes(selectedTag)) {
      mediaUrlInput.style.display = 'block';
      fileInput.style.display = 'block';
      textInput.style.display = 'none';
    } else {
      mediaUrlInput.style.display = 'none';
      fileInput.style.display = 'none';
      textInput.style.display = 'block';
    }
  }

  tagDropdown.addEventListener('change', function () {
    const selectedTag = tagDropdown.value;
    let element;
    let tempContentContainer;

    if (!contentContainer.classList.contains('pagecontent')) {
      tempContentContainer = contentContainer.parentNode;
      element = tempContentContainer.querySelector(selectedTag);
    } else {
      tempContentContainer = contentContainer;
      element = tempContentContainer.querySelector(selectedTag);
    }

    if (element === null) {
      element = document.createElement(selectedTag);
      tempContentContainer.innerHTML = '';  // Clear existing content within tempContentContainer
      tempContentContainer.appendChild(element);
    }

    toggleInputs(selectedTag);


    // if (targetElement.classList.contains('pagecontent')) {
    //   contentContainer.style.backgroundImage = `url(${event.target.value})`;
    // } else {
    // targetElement.style.backgroundImage = `url(${e.target.result})`;
    // targetElement.classList.add(`bg-[url('${e.target.result}')]`);

    if (selectedTag === 'img' || selectedTag === 'video' || selectedTag === 'audio') {
      element.src = mediaUrlInput.value || '/app/placeholder_media/lightmode_jpg/square_placeholder.jpg'; // Fallback to a placeholder if no URL
    } else {
      element.textContent = textInput.value;
    }

    // Call handleButtonFields for 'Link' selection
    if (['a', 'button'].includes(selectedTag)) {
      // Reload tab to ensure proper editing options for targetting the tag itself
      tempContentContainer.addEventListener('click', function(e) { e.preventDefault(); });
    } else {
      const linkOpts = document.getElementById('linkOpts');
      if (linkOpts) linkOpts.remove();
    }
    addContentOptions(tempContentContainer);
    // if (element.tagName === 'FORM') updateSidebarForTextElements(sidebar, tempContentContainer, true);
  });

  textInput.addEventListener('input', function () {
    const selectedTag = tagDropdown.value;
    let element;
    const srOnlyElement = document.createElement('span')
    srOnlyElement.className = 'sr-only';
    srOnlyElement.textContent = srOnly.value;

    if (directEditing) {
      // This predicates that an img/video/audio (media) tag already exists
      element = contentContainer;
    } else {
      element = contentContainer.querySelector(selectedTag);
    }

    // If no element exists for the media tag, create one
    if (!element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element = document.createElement(selectedTag);
      element.appendChild(srOnlyElement);
      contentContainer.appendChild(element);
    }

    // If it's not a media tag, update the text
    if (element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element.textContent = textInput.value;
      element.appendChild(srOnlyElement);
    }
  });

  mediaUrlInput.addEventListener('input', function () {
    const selectedTag = tagDropdown.value;
    let element = contentContainer.querySelector(selectedTag);

    if (element && ['img', 'video', 'audio'].includes(selectedTag)) {
      element.src = mediaUrlInput.value;
    }
  });

  if (targetElement) {
    if (['IMG', 'VIDEO', 'AUDIO'].includes(targetElement.tagName)) {
      mediaUrlInput.value = targetElement.src;
    } else {
      textInput.value = getTextWithoutSROnly(targetElement);
      if (typeof targetElement.children !== 'undefined') {
        const srOnlySpan = targetElement.querySelector('.sr-only');
        if (srOnlySpan) {
          srOnly.value = srOnlySpan.textContent;
        }
      }
    }
    tagDropdown.value = targetElement.tagName.toLowerCase();
    toggleInputs(tagDropdown.value);
  }

  const titleElement = document.createElement('h2');
  titleElement.textContent = 'Editing Content';
  titleElement.className = 'font-bold text-xl';


  if (targetElement && ['A', 'BUTTON'].includes(targetElement.tagName)) {
    handleButtonFields(formContainer, contentContainer, targetElement);

    sidebar.prepend(formContainer);
    formContainer.prepend(tagDropdown);
    formContainer.prepend(srOnly);
    formContainer.prepend(textInput);
    formContainer.prepend(titleElement);
    addTextOptions(sidebar, targetElement);
  } else {
    const linkOpts = document.getElementById('linkOpts');
    if (linkOpts) linkOpts.remove();

    sidebar.prepend(formContainer);
    formContainer.prepend(tagDropdown);
    formContainer.prepend(srOnly);
    formContainer.prepend(textInput);
    formContainer.prepend(mediaUrlInput);
    formContainer.prepend(fileInput);
    formContainer.prepend(titleElement);
    addTextOptions(sidebar, contentContainer);
  }

  // Standard editing options
  addEditableBorders(sidebar, contentContainer);
  addEditableOpacity(sidebar, contentContainer);
  addEditableBackgroundColor(sidebar, contentContainer);
  addEditableBackgroundImage(sidebar, contentContainer);
  addEditableBackgroundImageURL(sidebar, contentContainer);
  addEditableBackgroundFeatures(sidebar, contentContainer);
  addEditableMarginAndPadding(sidebar, contentContainer);
  addEditableDimensions(sidebar, contentContainer);
  addManualClassEditor(sidebar, contentContainer);
  addManualCssEditor(sidebar, contentContainer);
  highlightEditingElement(contentContainer);
  addIdAndClassToElements();
}

function getTextWithoutSROnly(element) {
  const clonedElement = element.cloneNode(true);
  if (typeof clonedElement.children === 'undefined') {
    return '';
  } else {
    // Remove all elements with the class 'sr-only'
    clonedElement.querySelectorAll('.sr-only').forEach(el => el.remove());

    return clonedElement.textContent.trim();
  }
}

function handleButtonFields(formContainer, contentContainer, button) {
  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.placeholder = 'Button/Link URL';
  urlInput.className = 'mt-2 p-2 border border-slate-300 w-full';

  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', 'checkbox');
  checkboxLabel.textContent = ' Open in new tab';
  checkboxLabel.className = 'inline-flex items-center mt-2';

  const checkbox = document.createElement('input');
  checkbox.setAttribute('name', 'checkbox');
  checkbox.type = 'checkbox';
  checkbox.className = 'ml-2';

  if (button) {
    urlInput.value = button.href;
    checkbox.checked = button.target === '_blank';
  }

  checkboxLabel.insertBefore(checkbox, checkboxLabel.firstChild);

  const buttonUpdate = function () {
    if (!button) {
      button = document.createElement('a');
      button.className = 'bg-link text-background hover:bg-background hover:text-link font-bold p-2 rounded';
      contentContainer.appendChild(button);
    }
    button.href = urlInput.value;
    button.target = checkbox.checked ? '_blank' : '';
  };

  urlInput.oninput = buttonUpdate;
  checkbox.onchange = buttonUpdate;
  const linkOpts = document.createElement('div');
  linkOpts.id = 'linkOpts';

  linkOpts.append(urlInput);
  linkOpts.append(checkboxLabel);
  formContainer.append(linkOpts);
}

function adjustClassesForInteractiveElements(container) {
  const excludedClasses = ['content-container', 'pagecontent'];
  const interactiveElements = container.querySelectorAll('a, button, input, textarea, select, label, iframe, details, summary');

  if (interactiveElements.length === 0) {
    return;
  }

  const containerClasses = Array.from(container.classList);
  const classesToTransfer = containerClasses.filter(cls => !excludedClasses.includes(cls));

  if (classesToTransfer.length > 0) {
    interactiveElements.forEach(element => {
      element.classList.add(...classesToTransfer);
    });
    container.classList.remove(...classesToTransfer);
  }
}


// Map to track transferred classes from container to child elements
const classTransferMap = new Map();

// Function to transfer class to child element
function transferClassToChild(container, className, childElement) {
  childElement.classList.add(className);
  container.classList.remove(className);

  if (!classTransferMap.has(container)) {
    classTransferMap.set(container, new Map());
  }
  const containerMap = classTransferMap.get(container);
  containerMap.set(className, childElement);
}

// Function to adjust classes for interactive elements
function adjustClassesForInteractiveElements(container) {
  const excludedClasses = ['content-container', 'pagecontent'];
  const interactiveElements = container.querySelectorAll('a, button, input, textarea, select, label, iframe, details, summary');

  if (interactiveElements.length === 0) {
    return;
  }

  const containerClasses = Array.from(container.classList);
  const classesToTransfer = containerClasses.filter(cls => !excludedClasses.includes(cls));

  if (classesToTransfer.length > 0) {
    interactiveElements.forEach(element => {
      classesToTransfer.forEach(className => {
        transferClassToChild(container, className, element);
      });
    });
  }
}

// Function to dispatch a custom event when a class is added
function dispatchClassAdded(container, className) {
  const event = new CustomEvent('classAdded', {
    detail: { className }
  });
  container.dispatchEvent(event);
}

// Function to dispatch a custom event when a class is removed
function dispatchClassRemoved(container, className) {
  const event = new CustomEvent('classRemoved', {
    detail: { className }
  });
  container.dispatchEvent(event);
}

// Modify class manipulation to dispatch events
function addClassToContainer(container, ...classNames) {
  classNames.forEach(className => {
    if (!container.classList.contains(className)) {
      container.classList.add(className);
      dispatchClassAdded(container, className); // Dispatch custom event for each class
    }
  });
}

function removeClassFromContainer(container, ...classNames) {
  classNames.forEach(className => {
    if (container.classList.contains(className)) {
      container.classList.remove(className);
      dispatchClassRemoved(container, className); // Dispatch custom event for each class
    }
  });
}

// Handle custom event for class added
function handleClassAddedEvent(event) {
  const container = event.target;
  const className = event.detail.className;

  // Logic to handle the class added to the container
  adjustClassesForInteractiveElements(container);
}

// Handle custom event for class removed
function handleClassRemovedEvent(event) {
  const container = event.target;
  const className = event.detail.className;

  // If the class was removed from the container, remove it from the child elements too
  const containerMap = classTransferMap.get(container);
  if (containerMap && containerMap.has(className)) {
    const childElement = containerMap.get(className);
    childElement.classList.remove(className);
    containerMap.delete(className);  // Clean up the mapping
  }
}

// Setup listeners for custom events on the container
function observeClassManipulation(container) {
  container.addEventListener('classAdded', handleClassAddedEvent);
  container.addEventListener('classRemoved', handleClassRemovedEvent);
}

/* File: ./app/js/editor/sidebar.js */
/*

  editor/sidebar.js

  This file is dedicated to housing the functions that exist entirely within
  the sidebar and don't directly touch anything else.

*/

// This function creates the tabs in the bottom-left screen of the editor page.
// These tabs represent the selected targeted viewport for the designer's
// editing actions.
// DATA IN: null
function generateSidebarTabs() {
  const icons = {
    'xs': ['Smartwatch & larger', '<svg fill="currentColor" class="h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 48l256 0c0-26.5-21.5-48-48-48L112 0C85.5 0 64 21.5 64 48zM80 80C35.8 80 0 115.8 0 160L0 352c0 44.2 35.8 80 80 80l224 0c44.2 0 80-35.8 80-80l0-192c0-44.2-35.8-80-80-80L80 80zM192 213.3a42.7 42.7 0 1 1 0 85.3 42.7 42.7 0 1 1 0-85.3zM213.3 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm74.7-160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 512l160 0c26.5 0 48-21.5 48-48L64 464c0 26.5 21.5 48 48 48z"/></svg>'],
    'sm': ['Mobile & larger', '<svg fill="currentColor" class="h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/></svg>'],
    'md': ['Tall tablet & larger', '<svg fill="currentColor" class="h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>'],
    'lg': ['Wide tablet & larger', '<svg fill="currentColor" class="h-5 w-5 mx-auto rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>'],
    'xl': ['Laptop & larger', '<svg fill="currentColor" class="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 32C92.7 32 64 60.7 64 96l0 256 64 0 0-256 384 0 0 256 64 0 0-256c0-35.3-28.7-64-64-64L128 32zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480l486.4 0c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2L19.2 384z"/></svg>'],
    '2xl': ['Desktop & larger', '<svg fill="currentColor" class="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"/></svg>']
  };

  return `
  <div id="mobileTabContainer" class="flex fixed w-72 z-50 h-16 left-0 align-items-stretch justify-stretch bottom-0 bg-slate-300">
    ${Object.entries(icons).map(([size, icon]) => `
      <div title="${size.toUpperCase()} Screens" data-extra-info="${icon[0]}" class="tab-${size} ${size !== currentBreakpoint ? 'border-slate-200' : 'bg-slate-50 border-slate-50'} w-12 text-slate-900 h-full inline-block responsive-tab cursor-pointer flex items-center p-2 hover:bg-slate-200 border-t-4">
        ${icon[1]}
      </div>
    `).join('')}
  </div>
  <div id="interactivityTabContainer" class="flex fixed w-72 z-50 h-10 left-0 align-items-stretch justify-stretch top-0 bg-slate-300">
  ${Object.entries(interactivityStates).map(([name, prependClass]) => `
    <div title="${name}" data-extra-info="${prependClass[1]}" class="tab-${name} ${prependClass[0] !== interactivityState ? 'border-slate-200' : 'bg-slate-50 border-slate-50'} w-full text-center text-slate-900 h-full inline-block interactivity-tab cursor-pointer p-2 hover:bg-slate-200 border-b-4">
      ${name}
    </div>
  `).join('')}
  </div>
  <div id="mobileTabContent">
    ${Object.entries(icons).map(([size]) => `
      <div class="${size !== currentBreakpoint ? 'hidden ' : ''}tab-content tab-content-${size} grid grid-cols-5 gap-x-1 gap-y-2">
        <h3 class="relative text-lg font-bold text-slate-900 mt-4 -mb-3 col-span-5"><span class="inline-block text-slate-700 text-xs w-7 h-7 p-1 rounded-md border border-slate-500">${appSageEditorIcons["responsive"][size]}</span> <span class="inline-block absolute left-10 top-0">${plainEnglishBreakpointNames[size]} Styles</span></h3>
      </div>
    `).join('')}
  </div>
  `;
} // DATA OUT: String (of HTML)

// This function creates listeners for swapping out the sidebar with the
// editing options relevant to the designer's selected device target:
// xs, sm, md, lg, xl, 2xl
// All classes under these tabs are prepended with these letters followed by a
// colon (:), such as `md:`.
// With 'xs' there is no prepending as it is the mobile-first default.
// DATA IN: null
function activateTabs() {
  // Add event listeners to toggle visibility
  document.querySelectorAll('#mobileTabContainer div').forEach(tab => {
    tab.addEventListener('click', function () {
      // Toggle display of associated content or styles when a tab is clicked
      const allTabs = document.querySelectorAll('.responsive-tab');
      allTabs.forEach(t => {
        t.classList.remove('bg-slate-50');
        t.classList.remove('border-slate-50');
        t.classList.add('border-slate-200');
      });  // Remove highlight from all tabs
      this.classList.remove('border-slate-200');
      this.classList.add('bg-slate-50');  // Highlight the clicked tab
      this.classList.add('border-slate-50');

      // Get the breakpoint from the class, assumes class is first in the list!
      const bp = this.classList[0].replace('tab-', '');
      currentBreakpoint = bp;

      // Assuming you have sections with IDs corresponding to breakpoints
      document.querySelectorAll('.tab-content').forEach(section => {
        if (section.classList.contains(`tab-content-${bp}`)) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });
    });
  });

  document.querySelectorAll('#interactivityTabContainer div').forEach(tab => {
    tab.addEventListener('click', function () {
      // Toggle display of associated content or styles when a tab is clicked
      const allTabs = document.querySelectorAll('.interactivity-tab');
      allTabs.forEach(t => {
        t.classList.remove('bg-slate-50');
        t.classList.remove('border-slate-50');
        t.classList.add('border-slate-200');
      }); // Remove highlight from all tabs
      this.classList.remove('border-slate-200');
      this.classList.add('bg-slate-50');  // Highlight the clicked tab
      this.classList.add('border-slate-50');

      const state = this.classList[0].replace('tab-', '');
      interactivityState = state === 'default' ? '' : state;

      const currentlyEditingElement = document.getElementById('editing-highlight');

      if (currentlyEditingElement.classList.contains('pagegrid')) {
        addGridOptions(currentlyEditingElement);
      } else if (currentlyEditingElement.classList.contains('pagecolumn')) {
        addColumnOptions(currentlyEditingElement);
      } else if (currentlyEditingElement.classList.contains('pagecontent')) {
        addContentOptions(currentlyEditingElement);
      }

      // Highlight sidebar for passive visual indication of interactivity state
      const sidebar = document.getElementById('sidebar');
      // Reset
      Object.keys(interactivityStates).forEach((state) => sidebar.classList.remove(state));
      // Add current state
      if (interactivityState !== '') sidebar.classList.add(interactivityState);
    });
  });
} // DATA OUT: null

/* File: ./app/js/editor/style.js */
/*

  editor/style.js

*/

// This function gives a scrollable box for editing background colors.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundColor(sidebar, element) {
  const colors = colorArray;
  const labelPrefix = 'Background Color';
  const cssClassBase = 'bg';

  addDeviceTargetedOptions(sidebar, element, labelPrefix, cssClassBase, colors, 'icon-select');
} // DATA OUT: null

// This function gives all the bits needed for changing border colors & styles.
// Like background color, it is in a handy little scrollable box.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBorders(sidebar, element) {
  const labels = ['Border Width', 'Border Radius', 'Border Color', 'Border Style'];
  const properties = ['width', 'radius', 'color', 'style'];
  const options = {
    color: colorArray,
    width: ['1', '2', '4', '8'],
    radius: ['none', 'sm', 'md', 'lg'],
    style: ['solid', 'dashed', 'dotted', 'double', 'none'],
    input_type: ['single-icon-select', 'single-icon-select', 'icon-select', 'icon-select']
  };

  properties.forEach((prop, index) => {
    const cssClassBase = prop === 'color' ? 'border' : (prop === 'width' ? 'border' : (prop === 'radius' ? 'rounded' : (prop === 'style' ? 'border' : '')));

    addDeviceTargetedOptions(sidebar, element, labels[index], cssClassBase, options[prop], options.input_type[index]);
  });
} // DATA OUT: null

// This function adds brevity to sidebar populating functions since if one is
// being added, I can't think of a scenario where the other wouldn't be as well
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableMarginAndPadding(sidebar, element) {
  addEditableMargin(sidebar, element);
  addEditablePadding(sidebar, element);
} // DATA OUT: null

// This function gives all the necessary bits for editing paddings.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditablePadding(sidebar, element) {
  const sides = ['t', 'b', 'l', 'r', 'a']; // added a for all sides
  const values = ['0', '1', '2', '4', '8', '16'];

  sides.forEach(side => {
    let cssClassBase;

    if (side === 'a') {
      cssClassBase = 'p';
      element.classList.remove('pt', 'pb', 'pl', 'pr');
    } else {
      cssClassBase = `p${side}`;
    }

    addDeviceTargetedOptions(sidebar, element, `Padding (${side === 'a' ? 'All' : side})`, cssClassBase, values, 'single-icon-select');
  });

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const paddingContainer = document.createElement('div');
    paddingContainer.className = 'grid grid-cols-4 col-span-5'
    const paddingElements = container.querySelectorAll('.Padding');
    paddingElements.forEach(paddingDropdown => {
      paddingContainer.appendChild(paddingDropdown);
    });

    container.appendChild(paddingContainer);

    const resetPaddingElement = document.createElement('div');
    const label = createLabel(bp, `Reset Padding`, `${bp}-padding`);
    label.className = 'hidden';
    paddingContainer.appendChild(label);
    paddingContainer.appendChild(resetPaddingElement);
    handleReset(bp, element, ['pt', 'pr', 'pb', 'pl', 'p'], values, resetPaddingElement);
    resetPaddingElement.classList.add('col-span-1');
  });
} // DATA OUT: null

// This function gives all the necessary bits for editing margins.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableMargin(sidebar, element) {
  const sides = ['t', 'b', 'l', 'r', 'a']; // added a for all sides
  const values = ['0', '1', '2', '4', '8', '16'];

  sides.forEach(side => {
    const cssClassBase = side === 'a' ? 'm' : `m${side}`;

    addDeviceTargetedOptions(sidebar, element, `Margin (${side === 'a' ? 'All' : side})`, cssClassBase, values, 'single-icon-select');
  });

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const marginContainer = document.createElement('div');
    marginContainer.className = 'grid grid-cols-4 col-span-5'
    const marginElements = container.querySelectorAll('.Margin');
    marginElements.forEach(marginDropdown => {
      marginContainer.appendChild(marginDropdown);
    });

    container.appendChild(marginContainer);

    const resetMarginElement = document.createElement('div');
    const label = createLabel(bp, `Reset Margins`, `${bp}-margin`);
    label.className = 'hidden';
    marginContainer.appendChild(label);
    marginContainer.appendChild(resetMarginElement);
    handleReset(bp, element, ['mt', 'mr', 'mb', 'ml', 'm'], values, resetMarginElement);
    resetMarginElement.classList.add('col-span-1');
  });
} // DATA OUT: null

// This function allows the laoding of a background image via remote URL.
// See `addEditableBackgroundFeatures` for the styling specific editing options.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundImageURL(sidebar, grid) {
  const labelPrefix = 'Background Image URL';
  const cssClassBase = 'bg';

  addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, null, 'input');
} // DATA OUT: null

// This function is for adding the background image itself via direct "upload".
// The word "upload" is in quotes because the attachment is simply being put
// into the document as a plaintext base64 image blob.
// See `addEditableBackgroundFeatures` for the styling specific editing options.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundImage(sidebar, grid) {
  const labelPrefix = 'Background Image File';
  const cssClassBase = 'bg';

  // Add file input for direct image selection
  addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, null, 'input');
} // DATA OUT: null

// This function is dedicated for adding the necessary editing options for
// background images and the styles applicable to them.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundFeatures(sidebar, grid) {
  const bgSizeOptions = ['cover', 'contain', 'reset'];
  const bgPositionOptions = ['center', 'top', 'bottom', 'left', 'right', 'reset'];
  const bgRepeatOptions = ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'reset'];

  // Function to update background image size
  function addBackgroundSizeOptions() {
    const labelPrefix = 'Background Size';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgSizeOptions, 'icon-select');
  }

  // Function to update background position
  function addBackgroundPositionOptions() {
    const labelPrefix = 'Background Position';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgPositionOptions, 'icon-select');
  }

  // Function to update background repeat
  function addBackgroundRepeatOptions() {
    const labelPrefix = 'Background Repeat';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgRepeatOptions, 'icon-select');
  }

  // Calling all functions to add options and reset buttons
  addBackgroundSizeOptions();
  addBackgroundPositionOptions();
  addBackgroundRepeatOptions();
}// DATA OUT: null

// This funciton is dedicated to adding the editing elements relevant to the
// suite of expected editing options for stylizing text and its placement.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableOpacity(sidebar, element) {
  const labelPrefix = 'Opacity';
  const cssClassBase = 'opacity';
  const opacityOptions = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']

  addDeviceTargetedOptions(sidebar, element, labelPrefix, cssClassBase, opacityOptions, 'single-icon-select');
}// DATA OUT: null

// This funciton is dedicated to adding the editing elements relevant to the
// suite of expected editing options for stylizing text and its placement.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addTextOptions(sidebar, element) {
  const textColorOptions = colorArray;
  const textSizeOptions = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
  let fontOptions = ['sans-serif', 'serif']
  if (localStorage.getItem(appSageSettingsString)) {
    fontOptions = Object.values(JSON.parse(localStorage.getItem(appSageSettingsString)).fonts).map(font => font);
  }
  const textAlignOptions = ['left', 'center', 'right', 'justify'];
  const fontWeightOptions = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
  const fontStyleOptions = ['italic', 'not-italic'];
  const fontUnderlineOptions = ['underline', 'not-underline'];

  addDeviceTargetedOptions(sidebar, element, 'Text Color', 'text', textColorOptions, 'icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Family', 'font', fontOptions, 'select');
  addDeviceTargetedOptions(sidebar, element, 'Font Size', 'text', textSizeOptions, 'single-icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Style', 'italic', fontStyleOptions, 'toggle');
  addDeviceTargetedOptions(sidebar, element, 'Font Weight', 'font', fontWeightOptions, 'single-icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Style', 'underline', fontUnderlineOptions, 'toggle');
  addDeviceTargetedOptions(sidebar, element, 'Text Alignment', 'text', textAlignOptions, 'icon-select');
} // DATA OUT: null

// TODO: This doesn't quite work properly yet
// This particular HTML function should most likely be a dedicated content.js content feature
function addManualHtmlElement(sidebar, element) {
  if (localStorage.getItem(appSageSettingsString)) {
    if (advancedMode) {
      addDeviceTargetedOptions(sidebar, element, 'html', '', [], 'textarea');
    }
  }
} // DATA OUT: null

function addManualClassEditor(sidebar, element) {
  if (localStorage.getItem(appSageSettingsString)) {
    if (advancedMode) {
      addDeviceTargetedOptions(sidebar, element, 'class', '', [], 'textarea');
    }
  }
} // DATA OUT: null

function addManualCssEditor(sidebar, element) {
  if (localStorage.getItem(appSageSettingsString)) {
    if (advancedMode) {
      addDeviceTargetedOptions(sidebar, element, 'css', '', [], 'textarea');
    }
  }
} // DATA OUT: null

function addEditableDimensions(sidebar, element) {
  const heightOpts = [['min-h', 'Minimum Height'], ['h', 'Height'], ['max-h', 'Maximum Height']];
  const widthOpts = [['min-w', 'Minimum Width'], ['w', 'Width'], ['max-w', 'Maximum Width']];
  const lengthOptions = ['auto', 'full', 'screen', '1/2', '1/3', '2/3', '1/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '5/6', '8', '10', '12', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '64', '72', '96'];
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'grid grid-cols-4 col-span-5';

    widthOpts.forEach(widthOpt => {
      // 0 = class prefix, e.g. `min-w`
      // 1 = Plain English, e.g. 'Minimum Width'
      const label = createLabel(bp, widthOpt[1], `${bp}-${widthOpt[0]}`);
      control = document.createElement('div');
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(control);
      handleSingleIconSelect(bp, widthOpt[1], lengthOptions, widthOpt[0], element, control);
    });

    resetHeightElement = document.createElement('div');
    const label = createLabel(bp, `Reset`, `${bp}-min-w,max-w,w`);
    label.className = 'hidden';
    sizeContainer.appendChild(label);
    sizeContainer.appendChild(resetHeightElement);
    handleReset(bp, element, ['min-w', 'max-w', 'w'], lengthOptions, resetHeightElement);
    resetHeightElement.classList.add('col-span-1');

    container.appendChild(sizeContainer);
  });

  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'grid grid-cols-4 col-span-5';

    heightOpts.forEach(heightOpt => {
      // 0 = class prefix, e.g. `min-h`
      // 1 = Plain English, e.g. 'Minimum Height'
      const label = createLabel(bp, heightOpt[1], `${bp}-${heightOpt[0]}`);
      control = document.createElement('div');
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(control);
      handleSingleIconSelect(bp, heightOpt[1], lengthOptions, heightOpt[0], element, control);
    });

    resetHeightElement = document.createElement('div');
    const label = createLabel(bp, `Reset`, `${bp}-min-h,max-h,h`);
    label.className = 'hidden';
    sizeContainer.appendChild(label);
    sizeContainer.appendChild(resetHeightElement);
    handleReset(bp, element, ['min-h', 'max-h', 'h'], lengthOptions, resetHeightElement);
    resetHeightElement.classList.add('col-span-1');

    container.appendChild(sizeContainer);
  });
} // DATA OUT: null

function addEditableColumnGaps(sidebar, element) {
  const axis = ['x', 'y', 'all'];
  const lengthOptions = ['0', '1', '2', '4', '8', '16'];
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const gapContainer = document.createElement('div');
    gapContainer.className = 'grid grid-cols-4 col-span-5';

    axis.forEach(axisOpt => {
      const cssClassBase = `gap-${axisOpt}`;
      const label = createLabel(bp, `Gap (${axisOpt})`, `${bp}-${`Gap (${axisOpt})`.replace(' ', '-')}-${cssClassBase}`);
      control = document.createElement('div');
      gapContainer.appendChild(label);
      gapContainer.appendChild(control);
      handleSingleIconSelect(bp, `Gap (${axisOpt})`, lengthOptions, cssClassBase, element, control);
    });

    resetElement = document.createElement('div');
    const label = createLabel(bp, `Reset`, `${bp}-gap-x,gap-y,gap`);
    label.className = 'hidden';
    gapContainer.appendChild(label);
    gapContainer.appendChild(resetElement);
    handleReset(bp, element, ['gap-x', 'gap-y', 'gap'], lengthOptions, resetElement);
    resetElement.classList.add('col-span-1');

    container.appendChild(gapContainer);
  });
} // DATA OUT: null

/* File: ./app/js/editor/main.js */
/*

  editor/main.js

  This file is to support the initial setup or re-setup of a page.

*/

// This big chunk does everything necessary for initial page setup which is
// largely comprised of setting up all the listeners that allow various editing
// functions that show up in the sidebar.
// DATA IN: null
document.addEventListener('DOMContentLoaded', function () {
  const editPageButton = document.getElementById('editPageSettings');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const pageSettingsButton = document.getElementById('pageSettings');
  const appSageSettingsButton = document.getElementById('appSageSettings');

  // Show/hide the drop-up menu
  editPageButton.addEventListener('click', function (event) {
    dropdownMenu.classList.toggle('hidden');
    event.stopPropagation(); // Prevent the event from propagating further
  });

  // Clicking outside the dropdown menu hides it
  document.addEventListener('click', function () {
    dropdownMenu.classList.add('hidden');
  });

  // Prevent click inside the menu from closing it
  dropdownMenu.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  // Handle Page Settings button click
  pageSettingsButton.addEventListener('click', function () {
    addPageOptions(); // Call your existing function
    dropdownMenu.classList.add('hidden'); // Hide the menu after click
  });

  // Handle appSage Settings button click
  appSageSettingsButton.addEventListener('click', function () {
    showSettingsModal();
  });

  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function () {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full min-w-full max-w-full min-h-auto h-auto max-h-auto pagegrid grid grid-cols-1 p-4 ml-0 mr-0 mt-0 mb-0 ugc-keep';

    const initialColumn = createColumn();
    gridContainer.appendChild(initialColumn);
    initialColumn.appendChild(createAddContentButton(initialColumn));

    document.getElementById('page').appendChild(gridContainer);

    addGridOptions(gridContainer);
    addIdAndClassToElements();

    // Append add column button at the end
    const addColumnButton = createAddColumnButton(gridContainer);
    gridContainer.appendChild(addColumnButton);

    enableEditGridOnClick(gridContainer);
    highlightEditingElement(gridContainer);
  });

  const addContainerButton = document.getElementById('addContainer');
  addContainerButton.addEventListener('click', function () {
    const containerContainer = document.createElement('div');
    containerContainer.className = 'group w-full min-w-full max-w-full min-h-auto h-auto max-h-auto maincontainer pagecontainer ml-0 mr-0 mt-0 mb-0 p-4 ugc-keep';
    const page = document.getElementById('page');
    page.appendChild(containerContainer);

    addContainerOptions(containerContainer);
    addIdAndClassToElements();

    // Enable recursive boxes
    const addContainerButton = createAddContainerButton(containerContainer);
    containerContainer.appendChild(addContainerButton);

    if (advancedMode === true){
      const addHtmlButton = createAddHtmlButton(containerContainer);
      containerContainer.appendChild(addHtmlButton);
    }

    // Append add content button at the end
    const addContentButton = createAddContentButton(containerContainer);
    containerContainer.appendChild(addContentButton);

    enableEditContainerOnClick(containerContainer);
    highlightEditingElement(containerContainer);
  });

  // Mouse enter event
  document.body.addEventListener('mouseenter', function (e) {
    if (e.target.matches('[data-extra-info]') && e.target.getAttribute('data-extra-info')) {
      updateTooltip(e, true);
    }
  }, true); // Use capture phase to ensure tooltip updates immediately

  // Mouse leave event
  document.body.addEventListener('mouseleave', function (e) {
    if (e.target.matches('[data-extra-info]')) {
      updateTooltip(e, false);
    }
  }, true);
}); // DATA OUT: null

// Function to save metadata to localStorage, ensuring no duplicate tags
function saveMetadataToLocalStorage(page_id, newMetaTags) {
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = JSON.parse(storedData.pages[page_id].settings);

  if (!settings.metaTags) {
    settings.metaTags = [];
  }

  // Helper function to check if the meta tag already exists
  function tagExists(newTag) {
    return settings.metaTags.some(tag => tag.type === newTag.type && tag.name === newTag.name);
  }

  // Iterate over the newMetaTags and add them if they don't already exist
  newMetaTags.forEach(newTag => {
    if (!tagExists(newTag)) {
      settings.metaTags.push(newTag); // Add new meta tag only if it doesn't exist
    } else {
      console.warn(`Meta tag with type: "${newTag.type}" and name: "${newTag.name}" already exists.`);
    }
  });

  // Save updated settings back to localStorage
  storedData.pages[page_id].settings = JSON.stringify(settings);
  localStorage.setItem(appSageStorageString, JSON.stringify(storedData));

  console.log('Metadata saved successfully!');
}


// This function is for adding to the sidebar all the options available for
// styles that impact the entire page, or metadata like page titles, og:image
// tags, descriptions, etc.
// DATA IN: null
function addPageOptions() {
  const page = document.getElementById('page');
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `${generateSidebarTabs()}`; // Clear existing editor
  const editTitle = document.createElement('div');
  editTitle.innerHTML = `<strong>Edit Page Styles &amp; Metadata</strong>`
  activateTabs();

  if (page) {
    addEditableMetadata(sidebar, 'prepend');
    addEditablePageTitle(sidebar, 'prepend');
    sidebar.prepend(editTitle);
    addEditableBackgroundColor(sidebar, page);
    addEditableBackgroundImage(sidebar, page);
    addEditableBackgroundImageURL(sidebar, page);
    addEditableBackgroundFeatures(sidebar, page);
  }
} // DATA OUT: null

// This function makes tooltips show up anywhere you hover over an element that
// has the `data-extra-info` attribute. This functional is critical for
// elaborating on WTF something does for the designer making a page.
// DATA IN: ['HTML Element', 'Boolean']
function updateTooltip(e, show) {
  const tooltip = document.getElementById('tooltip');
  const extraClasses = e.target.getAttribute('data-extra-info-class') || '';

  if (show) {
    const targetRect = e.target.getBoundingClientRect();
    tooltip.innerHTML = e.target.getAttribute('data-extra-info') || '';
    let tooltipX = targetRect.left + (targetRect.width / 2) - (tooltip.offsetWidth / 2);
    let tooltipY = targetRect.top - tooltip.offsetHeight - 5;

    // Ensure the tooltip does not overflow horizontally
    const rightOverflow = tooltipX + tooltip.offsetWidth - document.body.clientWidth;
    if (rightOverflow > 0) {
      tooltipX -= rightOverflow;  // Adjust to the left if overflowing on the right
    }
    if (tooltipX < 0) {
      tooltipX = 5;  // Keep some space from the left edge if overflowing on the left
    }

    // Adjust vertically if there is not enough space above the target
    if (targetRect.top < tooltip.offsetHeight + 10) {
      tooltipY = targetRect.bottom + 5;
    }

    // Set tooltip position
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;

    // Show tooltip with extra classes
    tooltip.classList.replace('opacity-0', 'opacity-100');
    tooltip.classList.remove('invisible');
    tooltip.classList.add('visible');
    if (extraClasses !== '') extraClasses.split(' ').forEach(cls => tooltip.classList.add(cls));
  } else {
    // Hide tooltip and remove extra classes
    tooltip.classList.replace('opacity-100', 'opacity-0');
    tooltip.classList.remove('visible');
    tooltip.classList.add('invisible');
    if (extraClasses !== '') extraClasses.split(' ').forEach(cls => tooltip.classList.remove(cls));
  }
} // DATA OUT: null

// This hulking function brings up a modal for pasting in HTML with Tailwind
// classes. This is for folks who have/bought existing HTML that uses
// TailwindCSS.
// TODO: Validate that the HTML is indeed Tailwind-y before proceeding to litter
// the page/page editor with the markup. Or... do we just ignore the fact that
// it isn't Tailwind-y and let them edit it anyway? In which case, nothing to do here.
// DATA IN: Optional function()
function showHtmlModal(element, onConfirm = null) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[1000] bg-slate-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-slate-100 p-4 rounded-lg max-w-2xl mx-auto w-full">
          <p class="text-slate-900">Add HTML with TailwindCSS classes:</p>
          <textarea id="tailwindHtml" rows="20" class="shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline"></textarea>
          <div class="flex justify-between mt-4" id="btnContainer">
            <button id="cancelHtml" class="bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded">Cancel</button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  const btnContainer = document.getElementById('btnContainer');
  const confButton = document.createElement('button');
  confButton.className = 'bg-emerald-500 hover:bg-emerald-700 text-slate-50 font-bold p-2 rounded';
  confButton.textContent = 'Add HTML';
  btnContainer.prepend(confButton);
  confButton.addEventListener('click', function () {
    if (onConfirm) onConfirm();
    const content = document.getElementById('tailwindHtml').value;
    convertTailwindHtml(content, element);
    document.body.removeChild(modal);
  });

  document.getElementById('cancelHtml').addEventListener('click', function () {
    document.body.removeChild(modal);
  });
} // DATA OUT: null

function convertTailwindHtml(content, element) {
  // Create a container to hold the pasted content
  const parentElement = document.createElement('div');
  parentElement.classList = 'pastedHtmlContainer pagecontainer';
  parentElement.innerHTML = content;
  element.appendChild(parentElement);

  wrapElements(parentElement);
}

function wrapElements(container) {
  const children = Array.from(container.childNodes);

  const structureTags = ['ARTICLE', 'SECTION', 'DIV', 'NAV', 'ASIDE', 'HEADER', 'FOOTER', 'MAIN', 'TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR'];

  const contentTags = ['P', 'BUTTON', 'A', 'SPAN', 'BLOCKQUOTE', 
    'IMG', 'VIDEO', 'AUDIO', 'FIGURE', 'IFRAME',
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 
    'FIGCAPTION', 'CAPTION', 'TIME', 'MARK', 'SUMMARY', 'DETAILS', 
    'PROGRESS', 'METER', 'DL', 'DT', 'DD'];

  const tableTags = ['TH', 'TD', 'COL', 'COLGROUP'];

  children.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      // Check if child is part of a grid structure by looking at its immediate parent
      const isInGrid = container.classList.contains('grid');

      // Check if the element is holding content children
      const hasContentChildren = Array.from(child.children).some(el => 
        contentTags.includes(el.tagName) || tableTags.includes(el.tagName)
      );

      // Apply grid-related classes
      if (child.classList.contains('grid')) {
        child.classList.add('pagegrid');
      }

      // If child is inside a grid, apply `pagecolumn` class
      if (isInGrid) {
        child.classList.add('pagecolumn');
      }

      // Handle structured elements like `th`, `td`, etc.
      if (tableTags.includes(child.tagName)) {
        child.classList.add('pagecontent', 'content-container');
        const wrapper = document.createElement('div');
        // Wrap the internal HTML content of `th`, `td`, etc.
        wrapper.innerHTML = child.innerHTML;
        child.innerHTML = ''; // Clear original content
        child.appendChild(wrapper);
        // Enable editing and observation for the element
        displayMediaFromIndexedDB(child.firstElementChild);
        enableEditContentOnClick(child);
        observeClassManipulation(child);
      } else if (hasContentChildren && child.tagName === 'DIV' && child.children.length === 1) {
        // For divs with single content elements, add classes directly without wrapping
        child.classList.add('pagecontent', 'content-container');
      } else if (contentTags.includes(child.tagName)) {
        // Wrap content elements in a div with `pagecontent content-container` classes
        const wrapper = document.createElement('div');
        wrapper.classList.add('pagecontent', 'content-container');
        wrapper.appendChild(child.cloneNode(true));
        container.replaceChild(wrapper, child);

        // Enable editing and observation for the wrapper
        displayMediaFromIndexedDB(wrapper.firstElementChild);
        enableEditContentOnClick(wrapper);
        observeClassManipulation(wrapper);

        // Recursively apply wrapping to the children of the new wrapper
        wrapElements(wrapper.firstChild);
      } else if (hasContentChildren) {
        // If the element houses content, add `pagecontainer` class but don't wrap
        child.classList.add('pagecontainer');

        // Recursively apply wrapping to children
        wrapElements(child);
      } else {
        // Recursively handle child elements for non-wrapped cases
        child.classList.add('pagecontainer');
        wrapElements(child);
      }
    }
  });
}

// This function adds a cyan glow around the element being edited to give a visual
// breadcrumb of what element is currently going to be effected by any changes
// made from the sidebar.
// DATA IN: null
function highlightEditingElement(element) {
  removeEditingHighlights(); // Clear existing highlights
  document.getElementById('page').querySelectorAll('.highlightButton').forEach(btn => {
    btn.classList.add('hidden');
    btn.classList.remove('block');
  });
  if (element) {
    element.id = 'editing-highlight'; // Highlight the current element
    element.querySelectorAll(':scope > .highlightButton').forEach(btn => {
      btn.classList.add('block');
      btn.classList.remove('hidden');
    });
  }
} // DATA OUT: null

// This function removes the above visual breadcrumb making way for a new
// highlight. This function should ideally always be called prior to its
// antithetical counterpart.
// DATA IN: null
function removeEditingHighlights() {
  const highlight = document.getElementById('editing-highlight');
  if (highlight) {
    highlight.id = '';
  }
} // DATA OUT: null

// This function helps move column/content buttons figure out where to go
// when moving their element without getting confused by editor-specific
// elements potentially confusing where to go in the finished product.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function getNextValidSibling(element, direction) {
  let sibling = (direction === 'left' || direction === 'up') ? element.previousElementSibling : element.nextElementSibling;
  while (sibling && sibling.classList.contains('ugc-discard')) {
    sibling = (direction === 'left' || direction === 'up') ? sibling.previousElementSibling : sibling.nextElementSibling;
  }
  return sibling;
} // DATA OUT: HTML Element, <div>

// This is a way for people who don't know how to integrate a back-end to
// simply copy/paste page contents into their own document or back-end repo.
// DATA IN: HTML Element
function copyPageHTML(element) {
  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const html_content = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].page_data;
  const container_settings = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].settings;
  const textToCopy = `<style>${getCompiledCSS()}</style>
                      ${flattenJSONToHTML(html_content, container_settings)}`;
  copyText(textToCopy, element);
} // DATA OUT: null

// This is a way for people who don't know how to integrate a back-end to
// simply copy/paste page metadata into their own document or back-end repo.
// DATA IN: HTML Element
function copyMetadata(element) {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = JSON.parse(storedData.pages[config].settings);
  const metaTags = settings.metaTags;
  let metaTagsString = '';

  metaTags.forEach(tag => {
    if (tag.type === 'link') {
      metaTagsString += `<link rel="${tag.name}" href="${tag.content}">`;
    } else {
      metaTagsString += `<meta ${tag.type}="${tag.name}" content="${tag.content}">`;
    }
  });

  copyText(metaTagsString, element);
} // DATA OUT: null

// This is the workhorse function for `copyMetadata` and `copyPageHTML`
// DATA IN: ['String', 'HTML Element, <div>']
function copyText(textToCopy, element) {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      element.innerHTML = '<svg id="poppyCopy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 1 64 0A32 32 0 1 1 32 32zM448 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM167 153c-9.4-9.4-9.4-24.6 0-33.9l8.3-8.3c16.7-16.7 27.2-38.6 29.8-62.1l3-27.4C209.6 8.2 221.5-1.3 234.7 .1s22.7 13.3 21.2 26.5l-3 27.4c-3.8 34.3-19.2 66.3-43.6 90.7L201 153c-9.4 9.4-24.6 9.4-33.9 0zM359 311l8.2-8.3c24.4-24.4 56.4-39.8 90.7-43.6l27.4-3c13.2-1.5 25 8 26.5 21.2s-8 25-21.2 26.5l-27.4 3c-23.5 2.6-45.4 13.1-62.1 29.8L393 345c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9zM506.3 8.5c8.6 10.1 7.3 25.3-2.8 33.8l-10 8.5c-14.8 12.5-33.7 19.1-53 18.6c-16.6-.4-30.6 12.4-31.6 29l-1.8 30c-2.5 42.5-38.3 75.3-80.8 74.2c-7.6-.2-15 2.4-20.7 7.3l-10 8.5c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l10-8.5c14.8-12.5 33.7-19.1 53-18.6c16.6 .4 30.6-12.4 31.6-29l1.8-30c2.5-42.5 38.3-75.3 80.8-74.2c7.6 .2 15-2.4 20.7-7.3l10-8.5c10.1-8.6 25.3-7.3 33.8 2.8zM150.6 201.4l160 160c7.7 7.7 10.9 18.8 8.6 29.4s-9.9 19.4-20 23.2l-39.7 14.9L83.1 252.5 98 212.8c3.8-10.2 12.6-17.7 23.2-20s21.7 1 29.4 8.6zM48.2 345.6l22.6-60.2L226.6 441.2l-60.2 22.6L48.2 345.6zM35.9 378.5l97.6 97.6L43.2 510c-11.7 4.4-25 1.5-33.9-7.3S-2.4 480.5 2 468.8l33.8-90.3z"/></svg>';
      resetCopyPageButton(element);
    })
    .catch(err => {
      return String(console.error("Failed to copy text: ", err));
    });
} // DATA OUT: String

// When a copy button is clicked, the icon is replaced with a "Tada!" emoji.
// This function swaps it back to the regular icon after 0.75 seconds.
// DATA IN: HTML Element
function resetCopyPageButton(element) {
  setTimeout(function () {
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="white" class="h-5 w-5 mx-auto" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>';
  }, 750)
} // DATA OUT: null

// This function creates the form input for changing the page's title.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
// This function creates the form input for changing the page's title.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
function addEditablePageTitle(container, placement) {
  const params = new URLSearchParams(window.location.search);

  const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
  let currentTitle = Object.entries(titleIdMap).find(([title, id]) => id === params.get('config'))?.[0];

  const titleLabel = document.createElement('label');
  titleLabel.className = 'text-slate-700 text-xs uppercase mt-2';
  titleLabel.setAttribute('for', 'page-title');
  titleLabel.textContent = 'Page Title'
  const titleInput = document.createElement('input');
  titleInput.className = 'metadata meta-content my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  titleInput.setAttribute('name', 'page-title');
  titleInput.type = 'text';
  titleInput.value = currentTitle;
  titleInput.placeholder = 'Page Title';

  titleInput.addEventListener('change', function () {
    newTitle = titleInput.value;
    changeLocalStoragePageTitle(newTitle);
  });
  if (placement === 'prepend') {
    container.prepend(titleInput);
    container.prepend(titleLabel);
  } else {
    container.appendChild(titleLabel);
    container.appendChild(titleInput);
  }
} // DATA OUT: null

// This function changes the page's title. Because localStorage data for the
// page is identified by the page's title, we have to copy the data over to a
// new object, then delete the old one.
// TODO: On page creation, generate an alphanumeric ID and store the object
//       that way instead. We will then need to update how localStorage loads
//       the page, perhaps by creating a new key-value object in the
//       localStorage like { page-title: 'thea-lpha-nume-rici-d123-4567'}
//       That way, we only have to replace that object and no longer risk
//       losing the entire page data like we potentially could with this
//       implementation as it exists now.
// DATA IN: String
function changeLocalStoragePageTitle(newTitle) {
  const params = new URLSearchParams(window.location.search);
  const currentPageId = params.get('config');

  // Retrieve the title-ID mapping from localStorage
  const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};

  // Find the current title using the page ID
  let currentTitle = null;
  for (let [title, id] of Object.entries(titleIdMap)) {
    if (id === currentPageId) {
      currentTitle = title;
      break;
    }
  }

  if (currentTitle) {
    // Update the mapping with the new title
    delete titleIdMap[currentTitle];
    titleIdMap[newTitle] = currentPageId;

    // Save the updated mapping back to localStorage
    localStorage.setItem(appSageTitleIdMapString, JSON.stringify(titleIdMap));

    // Update the URL parameters (the page ID remains the same)
    params.set('config', currentPageId);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  } else {
    console.error(`Page with ID "${currentPageId}" does not exist.`);
  }
} // DATA OUT: null

// This function generates the area for creating as many items of metadata as
// the designer deems necessary.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
function addEditableMetadata(container, placement) {
  /* 
  defaults:
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  automatically generate?:
    <meta name="description" content="This page was built using appSage">
    <meta property="og:title" content="Untitled | Built w/ appSage">
  */
  const metaDataContainer = document.createElement('div');
  if (placement === 'prepend') {
    container.prepend(metaDataContainer);
  } else {
    container.appendChild(metaDataContainer);
  }

  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const metaDataPairsContainer = document.createElement('div');
  metaDataPairsContainer.innerHTML = '<h3 class="font-semibold text-lg mb-2">Metadata</h3>';
  metaDataPairsContainer.className = 'my-2 col-span-5 border rounded-md border-slate-200 overflow-y-scroll p-2 max-h-48';
  metaDataContainer.appendChild(metaDataPairsContainer);

  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = storedData.pages[page_id].settings;
  if (typeof settings.length !== 'undefined') {
    const metaTags = JSON.parse(settings).metaTags;

    if (metaTags) {
      metaTags.forEach(tag => {
        addMetadataPair(tag.type, tag.name, tag.content);
      });
    }
  }



  // Add initial empty metadata pair
  function addMetadataPair(meta_type, meta_name, meta_content) {
    const pair = document.createElement('div');
    pair.className = 'metadata-pair mt-2'

    const select = document.createElement('select');
    select.className = 'metadata meta-type my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    const optionName = document.createElement('option');
    optionName.value = 'name';
    optionName.selected = 'name' === meta_type;
    optionName.text = 'Name';
    const optionProperty = document.createElement('option');
    optionProperty.value = 'property';
    optionName.selected = 'property' === meta_type;
    optionProperty.text = 'Property';
    const optionLink = document.createElement('option');
    optionLink.value = 'link';
    optionLink.selected = 'link' === meta_type;
    optionLink.text = 'Link';
    select.appendChild(optionName);
    select.appendChild(optionProperty);
    select.appendChild(optionLink);

    const nameInput = document.createElement('input');
    nameInput.className = 'metadata meta-name my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    nameInput.type = 'text';
    nameInput.value = meta_name || '';
    nameInput.placeholder = 'Name/Property';

    const contentInput = document.createElement('input');
    contentInput.className = 'metadata meta-content my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    contentInput.type = 'text';
    contentInput.value = meta_content || '';
    contentInput.placeholder = 'Content';

    pair.appendChild(select);
    pair.appendChild(nameInput);
    pair.appendChild(contentInput);
    metaDataPairsContainer.appendChild(pair);
  }

  addMetadataPair();

  const addButton = document.createElement('button');
  addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline mb-1"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg> Metadata';
  addButton.className = 'col-span-2 bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded h-12 w-28 mt-2';
  addButton.id = 'add-metadata-button';
  metaDataContainer.appendChild(addButton);

  addButton.addEventListener('click', function () {
    addMetadataPair();
  });

  document.querySelectorAll('.metadata').forEach(input => {
    input.addEventListener('change', function () {
      const metaTags = [];
      document.querySelectorAll('.metadata-pair').forEach(pair => {
        const type = pair.querySelector('.meta-type').value;
        const name = pair.querySelector('.meta-name').value;
        const content = pair.querySelector('.meta-content').value;
        if (name && content) {
          metaTags.push({ type, name, content });
        }
      });

      saveMetadataToLocalStorage(page_id, metaTags);
    });
  });
} // DATA OUT: null

// This used to be in an inline script on the page:
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
  let pageTitle = Object.entries(titleIdMap).find(([title, id]) => id === config)?.[0] || 'Untitled';
  document.querySelector('title').textContent = `Editing: ${pageTitle} | appSage`;

  if (config) {
    const json = loadPage(config);
    if (json && json.length > 0) {
      loadChanges(json);
      loadPageSettings(config);
      loadPageBlobs(config);
      loadPageMetadata(config);
    }
    setupAutoSave(config);
  } else {
    let pageId = createNewConfigurationFile();
    setupAutoSave(pageId);
  }
});

function createNewConfigurationFile() {
  const pageId = generateAlphanumericId();
  let title = 'Untitled';
  let counter = 1;
  // Load or create the title-ID mapping from localStorage
  const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
  while (title in titleIdMap) {
    title = `Untitled-${counter}`;
    counter++;
  }
  // Save the mapping of title to ID
  titleIdMap[title] = pageId;
  localStorage.setItem(appSageTitleIdMapString, JSON.stringify(titleIdMap));
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  if (!appSageStorage.pages) {
    appSageStorage.pages = {};
  }
  appSageStorage.pages[pageId] = { page_data: [], title: title, settings: {}, blobs: {} };
  localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));

  window.location.search = `?config=${pageId}`; // Redirect with the new file as a parameter
  return pageId;
}

function generateAlphanumericId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function addIdAndClassToElements() {
  const targetClasses = ['pagecontent', 'pagegrid', 'pagecolumn', 'pageflex', 'pagecontainer'];

  // Helper function to generate a random alphanumeric string of a given length
  function generateRandomId(length = 8) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Function to ensure the generated ID is unique on the page
  function generateUniqueId() {
    let the_id;
    do {
      the_id = generateRandomId();
    } while (document.getElementById(the_id)); // Keep generating until a unique ID is found
    return the_id;
  }

  // Find elements that match the specified classes
  const elements = document.querySelectorAll(targetClasses.map(cls => `.${cls}`).join(','));

  elements.forEach(element => {
    // Check if the element already has a class like 'group/some_id'
    const hasGroupClass = Array.from(element.classList).some(cls => cls.startsWith('group/'));

    if (!hasGroupClass) { // Only add ID and class if no group/ID class exists
      const newId = generateUniqueId();
      element.classList.add(`group/[${newId}]`);
    }
  });
}


/* File: ./app/js/editor/save.js */
/*

  editor/save.js

  This file is intended to be the primary location for functions that save
  content from active/previous edits. This saving happens on the editor page.

*/

// Remove editor elements so that localStorage is not cluttered with unneeded
// elements making them production-ready for app/js/load.js
// DATA IN: HTML Element, <div>
function getCleanInnerHTML(element) {
  const clone = element.cloneNode(true);
  const discardElements = clone.querySelectorAll('.ugc-discard');
  discardElements.forEach(el => el.parentNode.removeChild(el));
  const cloneBox = document.createElement('div');
  cloneBox.appendChild(clone);
  return cloneBox.innerHTML;
} // DATA OUT: HTML Element, <div>

// This mutation observer ensures that the majority, if not all, changes
// occuring in #page will be saved to localStorage.
// DATA IN: String
function setupAutoSave(page) {
  const targetNode = document.getElementById('page');
  const config = {
    childList: true,
    attributes: true,
    subtree: true,
    characterData: true
  };
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (['childList', 'attributes', 'characterData'].includes(mutation.type)) {
        saveChanges(page);
        savePageSettingsChanges(page);
        break;
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  console.log('Auto-save setup complete.');
} // DATA OUT: null

// This function saves all active element and style additions/changes/removals
// during the designer's traditional editor workflow.
// DATA IN: String
function saveChanges(page) {
  const pageContainer = document.getElementById('page');
  // Query only elements with 'ugc-keep' that are meant to be saved
  const elements = pageContainer.querySelectorAll('.ugc-keep:not([data-editor-temp])');
  const data = Array.from(elements).map(element => ({
    tagName: element.tagName, // in the future, this could be a section name
    className: element.className, // deprecated
    content: getCleanInnerHTML(element)
  }));
  const json = JSON.stringify(data);
  savePage(page, json);
  console.log('Changes saved successfully!');
} // DATA OUT: null

// This function creates or prepares the necessary localStorage object in order
// for subsequent content to be stored. If this objects already exists, it
// proceeds by properly setting existing content to these objects.
// DATA IN: ['String', 'JSON Object']
function savePage(pageId, data) {
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  if (!appSageStorage.pages) {
    appSageStorage.pages = {};
  }
  if (!appSageStorage.pages[pageId]) {
    appSageStorage.pages[pageId] = { page_data: [], title: 'Untitled', settings: {}, blobs: {} };
  }
  appSageStorage.pages[pageId].page_data = data;

  localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
} // DATA OUT: null

// This function saves all page's settings from the designer's additions,
// changes, and removals during the designer's traditional editor workflow
// from the dedicated Page Settings sidebar.
// DATA IN: ['String', 'JSON Object']
function savePageSettings(pageId, data) {
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  if (!appSageStorage.pages) {
    appSageStorage.pages = {};
  }
  if (!appSageStorage.pages[pageId]) {
    appSageStorage.pages[pageId] = { page_data: {}, settings: {}, blobs: {} };
  }
  appSageStorage.pages[pageId].settings = data;
  localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
} // DATA OUT: null

// This function creates or prepares the necessary localStorage object in order
// for subsequent settings to be stored. If this objects already exists, it
// proceeds by properly setting existing settings to these objects.
// DATA IN: String
function savePageSettingsChanges(pageId) {
  const page = document.getElementById('page');
  const settings = {
    id: page.id,
    className: page.className,
    metaTags: ''
  }
  const json = JSON.stringify(settings);
  savePageSettings(pageId, json);
} // DATA OUT: null


/* File: ./app/js/editor/load.js */
/*

  editor/load.js
  
  This file is intended to be the primary location for functions that load
  saved content from previous edits. This loading is only for the editor page.

*/

// Passed data from local storage, this function iterates through all elements
// and appends them to the page.
// DATA IN: JSON Object
function loadChanges(json) {
  const pageContainer = document.getElementById('page');
  pageContainer.innerHTML = '';
  const data = JSON.parse(json);
  data.forEach(item => {
    pageContainer.innerHTML += item.content;
  });

  pageContainer.querySelectorAll('.pagegrid').forEach(grid => {
    restoreGridCapabilities(grid);
  });

  pageContainer.querySelectorAll('.maincontainer').forEach(maincontainer => {
    restoreContainerCapabilities(maincontainer);
  });

  pageContainer.querySelectorAll('.pagecontent').forEach(contentContainer => {
    displayMediaFromIndexedDB(contentContainer.firstElementChild);
    enableEditContentOnClick(contentContainer);
    observeClassManipulation(contentContainer);
  });

  const grid = document.querySelector('#page .grid');
  if (grid) {
    addGridOptions(grid);
  }

  document.querySelectorAll('.pagecontent a, .pagecontent button').forEach(linkElement => {
    linkElement.addEventListener('click', function(e) { e.preventDefault(); });
  });
} // DATA OUT: null

// This function makes it so that saved elements related to grids can be edited once more.
// DATA IN: HTML Element, <div>
function restoreGridCapabilities(grid) {
  const addColumnButton = createAddColumnButton(grid);
  grid.appendChild(addColumnButton);
  enableEditGridOnClick(grid);
  displayMediaFromIndexedDB(grid);
  Array.from(grid.querySelectorAll('.pagecolumn')).forEach(column => {
    enableEditColumnOnClick(column);
    displayMediaFromIndexedDB(column);
    column.appendChild(createAddContentButton(column));
    Array.from(column.querySelectorAll('.pagecontent')).forEach(contentContainer => {
      displayMediaFromIndexedDB(contentContainer.firstElementChild);
      enableEditContentOnClick(contentContainer);
      observeClassManipulation(contentContainer);
    });
  });
} // DATA OUT: null

// This function makes it so that saved elements related to container box can be edited once more.
// DATA IN: HTML Element, <div>
function restoreContainerCapabilities(container) {
  const addContentButton = createAddContentButton(container);
  container.appendChild(addContentButton);
  const addContainerButton = createAddContainerButton(container);
  container.appendChild(addContainerButton);
  if (advancedMode === true){
    const addHtmlButton = createAddHtmlButton(container);
    container.appendChild(addHtmlButton);
  }
  enableEditContainerOnClick(container);
  displayMediaFromIndexedDB(container);
  Array.from(container.querySelectorAll('.pagecontainer')).forEach(contentContainer => {
    const addChildContentButton = createAddContentButton(contentContainer);
    contentContainer.appendChild(addChildContentButton);
    const addChildContainerButton = createAddContainerButton(contentContainer);
    contentContainer.appendChild(addChildContainerButton);
    if (advancedMode === true){
      const addChildHtmlButton = createAddHtmlButton(contentContainer);
      contentContainer.appendChild(addChildHtmlButton);
    }
    enableEditContainerOnClick(contentContainer);
    displayMediaFromIndexedDB(contentContainer);
  });
  Array.from(container.querySelectorAll('.pagecontent')).forEach(contentContainer => {
    displayMediaFromIndexedDB(contentContainer.firstElementChild);
    enableEditContentOnClick(contentContainer);
    observeClassManipulation(contentContainer);
  });
} // DATA OUT: null




/* File: ./app/js/load.js */
/*

  load.js
  
  This file is intended to be the primary location for functions that load
  saved content from previous edits. This loading is not just for the editor,
  but the preview page as well. As such, final outputs, particularly for
  preview, should present as production-ready.

*/

// Utility functions for managing localStorage with a 'appSageStorage' object
// DATA IN: String
function loadPage(pageId) {
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  if (appSageStorage.pages && appSageStorage.pages[pageId] && appSageStorage.pages[pageId].page_data) {
    return appSageStorage.pages[pageId].page_data;
  } else {
    return null;
  }
} // DATA OUT: String || null

// Currently, media added through the file selector is stored as base64 plain
// text in the document (and consequently, storage). To keep things a bit
// tidier, these blobs are stored in an object separate from the HTML content.
// DATA IN: String
async function loadPageBlobs(config) {
  const db = await openDatabase();
  const transaction = db.transaction(['mediaStore'], 'readonly');
  const store = transaction.objectStore('mediaStore');
  
  const blobsRequest = store.get(config);

  blobsRequest.onsuccess = function(event) {
    const blobs = event.target.result ? event.target.result.blobs : null;
    const page = document.getElementById('page');
    
    if (blobs) {
      Object.keys(blobs).forEach(key => {
        const element = page.querySelector(`.bg-local-${key}`);
        if (element) element.style.backgroundImage = `url(${URL.createObjectURL(blobs[key])})`;
      });
    }
  };

  blobsRequest.onerror = function(event) {
    console.error('Error fetching blobs from IndexedDB:', event.target.error);
  };
} // DATA OUT: null

// Because metadata needs to be added to the <head> tag rather than the
// expected '#page' div, metadata is stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'HTML Element, <div>']
function loadPageMetadata(page_id) {
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const metaTags = storedData.pages[page_id].settings.metaTags;
  const fontSettings = JSON.parse(localStorage.getItem(appSageSettingsString));
  if (metaTags && metaTags !== '') {
    const element = document.querySelector('head');

    metaTags.forEach(tag => {
      if (tag.type === 'link') {
        const metaTag = document.createElement('link');
        metaTag.setAttribute('href', tag.content);
        metaTag.setAttribute('rel', tag.name);
        element.appendChild(metaTag);
      } else {
        const metaTag = document.createElement('meta');
        metaTag.setAttribute(tag.type, tag.name);
        metaTag.setAttribute('content', tag.content);
        element.appendChild(metaTag);
      }
    });
  }

  if (fontSettings) {
    const element = document.querySelector('head');
    let fonts = Object.values(fontSettings.fonts).join('&family=');
    const metaTag = document.createElement('link');
    metaTag.setAttribute('href', `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`);
    metaTag.setAttribute('rel', 'stylesheet');
    element.appendChild(metaTag);
  }
} // DATA OUT: String || null

// Because page settings need to be added to various locations other than the
// expected '#page' div, page settings are stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'Boolean']
function loadPageSettings(config, view = false) {
  // Load the appSageStorage object from localStorage
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');

  // Check if the page and settings exist
  if (appSageStorage.pages && appSageStorage.pages[config] && appSageStorage.pages[config].settings) {
    let settings;
    try {
      settings = JSON.parse(appSageStorage.pages[config].settings);
    } catch {
      settings = appSageStorage.pages[config].settings;
    }

    // Find the element by config and set the className if it exists
    const element = document.getElementById(settings.id);
    if (element && settings.className) {
      element.className = settings.className;
    }

    // Append metaTags to the head if they exist
    if (settings.metaTags) {
      const head = document.getElementsByTagName('head')[0];
      const div = document.createElement('div');
      div.innerHTML = settings.metaTags;

      // Append each meta tag found in the div to the head
      Array.from(div.childNodes).forEach(tag => {
        if (tag.nodeType === Node.ELEMENT_NODE) { // Ensure it is an element
          head.appendChild(tag);
        }
      });
    }
    if (element && view) {
      element.classList.remove('w-[calc(100%-18rem)]', 'ml-72', 'mb-24');
      element.classList.add('w-full', 'min-h-screen');
    }
  } else {
    console.log('Settings for the specified page do not exist.');
  }
} // DATA OUT: null

function addMetasToHead() {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config') || params.get('page');
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  let settings;

  if (storedData && storedData.pages && storedData.pages[config]){
    settings = storedData.pages[config].settings;
    const metaTags = settings.metaTags;
    if (typeof metaTags !== 'undefined') {
      const headTag = document.getElementsByTagName('head')[0];
    
      if (metaTags !== '') metaTags.forEach(tag => {
        if (tag.type === 'link') {
          const metatag = document.createElement('link');
          metatag.setAttribute('rel', tag.name);
          metatag.setAttribute('href', tag.content);
          headTag.appendChild(metatag);
        } else {
          const metatag = document.createElement('meta');
          metatag.setAttribute(tag.type, tag.name);
          metatag.setAttribute('content', tag.content);
          headTag.appendChild(metatag);
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', addMetasToHead);


/* File: ./app/js/editor/responsive.js */
/*

  editor/responsive.js

  This file is dedicated to spitting out all sidebar editor options to the
  sidebar for each of the supported breakpoints; xs, sm, md, lg, xl, and 2xl.

*/

// This function orchestrates which where everything goes based on the input
// type and spits it out to all the breakpoints provided in the array.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>', 'String || Array:String', 'String || Array:String', 'String || Array:String', 'String']
function addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, options, inputType = 'select') {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const label = createLabel(bp, labelPrefix, `${bp}-${labelPrefix.replace(' ', '-')}-${cssClassBase}`);
    let control;
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);

    switch (inputType) {
      case 'input':
        control = document.createElement('input');
        container.appendChild(label);
        container.appendChild(control);
        handleInput(bp, labelPrefix, options, cssClassBase, grid, control);
        // If this is for a background image file, append the placeholder dropdown
        if (labelPrefix === 'Background Image File') {
          addPlaceholderDropdown(control, grid);
        }
        control.classList.add('col-span-5');
        break;
      case 'textarea':
        control = document.createElement('textarea');
        container.appendChild(label);
        container.appendChild(control);
        handleTextareaType(labelPrefix, grid, control);
        control.classList.add('col-span-5');
        break;
      case 'single-icon-select':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control);
        break;
      case 'reset':
        control = document.createElement('div');
        label.className = 'hidden';
        container.appendChild(label);
        container.appendChild(control);
        handleReset(bp, grid, options, cssClassBase, control);
        control.classList.add('col-span-1');
        break;
      case 'icon-select':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleIconSelect(bp, grid, options, labelPrefix, cssClassBase, control);
        control.classList.add('col-span-5');
        break;
      case 'toggle':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleToggle(bp, options, grid, cssClassBase, control);
        control.classList.add('col-span-1');
        break;
      case 'select':
        control = document.createElement('select');
        container.appendChild(label);
        container.appendChild(control);
        handleSelect(bp, grid, control, options, cssClassBase, labelPrefix);
        control.classList.add('col-span-5');
        break;
      default:
        console.error('Unsupported input type specified.');
        return;
    }
  });
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting resetting styles for the sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleReset(bp, grid, options, cssClassBase, control) {
  const resetButton = document.createElement('button');
  resetButton.innerHTML = appSageEditorIcons['reset'];
  resetButton.className = 'iconButton h-12 w-12 p-4 bg-slate-100 hover:bg-slate-200 p-2 rounded';
  resetButton.setAttribute('data-extra-info', tooltips['reset']);
  control.appendChild(resetButton);

  resetButton.onclick = () => {
    options.forEach(opt => {
      // Check if cssClassBase is an array or a string
      if (Array.isArray(cssClassBase)) {
        // If it's an array, loop through each class and remove the class from the grid
        cssClassBase.forEach(cssClass => {
          if (opt.includes('gap') || (/^p(t|r|b|l)?$/.test(opt)) || (/^m(t|r|b|l)?$/.test(opt))) {
            grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${opt}-${cssClass}`);
          } else {
            grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClass}-${opt}`);
          }
        });
      } else {
        // If it's a string, directly remove the class from the grid
        if (opt.includes('gap') || (/^p(t|r|b|l)?$/.test(opt)) || (/^m(t|r|b|l)?$/.test(opt))) {
          grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${opt}-${cssClassBase}`);
        } else {
          grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
        }
      }
    });
  };
} // DATA OUT: null

// This function is intended to facilitate manual CSS styling for the textarea
// field dedicated for this activity.
// DATA IN: ['HTML Element, <div>', 'String']
function handleStyles(element, controlValue, mode = 'apply') {
  if (element) {
    if (mode === 'apply') {
      // Apply styles to the element
      const styles = controlValue.split(';');
      styles.forEach(style => {
        const [property, value] = style.split(':');
        if (property && value) {
          const camelCaseProperty = property.trim().replace(/-([a-z])/g, (match, p1) => p1.toUpperCase());
          element.style[camelCaseProperty] = value.trim();
        }
      });
    } else if (mode === 'retrieve') {
      // Retrieve inline styles from the element
      const computedStyles = element.style;
      const retrievedStyles = [];

      for (let i = 0; i < computedStyles.length; i++) {
        const property = computedStyles[i];
        const value = computedStyles.getPropertyValue(property);

        if (value) {
          // Convert camelCase properties back to kebab-case
          const kebabCaseProperty = property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
          retrievedStyles.push(`${kebabCaseProperty}:${value}`);
        }
      }

      // Join styles into a semicolon-separated string
      return retrievedStyles.join(';') + ';';
    }
  }
}
// DATA OUT: null

// This function attempts to find existing styles so that other functions know
// what/where to replace new classes, if applicable.
// DATA IN: ['String:Breakpoint class name', 'Array:String', 'String', 'HTML Element, <div>]
function getCurrentStyle(bp, options, cssClassBase, grid) {
  if (options) {
    return options.find(option => {
      const className = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}${cssClassBase !== '' ? '-': ''}${option}`;
      return grid.classList.contains(className);
    }) || '';
  }
} // DATA OUT: String

// This function is the catch-all for handling labels of the sidebar editor
// elements. Its primary purpose is to reduce label clutter by narrowing
// certain groupings of style elements into categories where the label can
// represent all elements of that category, while the redundant ones remain
// in the document for accessibility, but invisible to the naked eye.
// DATA IN: ['String:Breakpoint class name', 'String', 'String']
function createLabel(bp, labelPrefix, forAttr) {
  const collapseLabels = (labelPrefix.includes('Margin') || labelPrefix.includes('Padding') || labelPrefix.includes('Font') || labelPrefix.includes('Border Radius') || labelPrefix.includes('Border Color') || labelPrefix.includes('Height') || labelPrefix.includes('Width') || labelPrefix.includes('Gap'));
  let keepLabel = (labelPrefix === 'Margin (t)' ? true : false || labelPrefix === 'Padding (t)' ? true : false || labelPrefix === 'Font Family' ? true : false || labelPrefix === 'Border Width' ? true : false || labelPrefix === 'Minimum Height' ? true : false || labelPrefix === 'Minimum Width' ? true : false || labelPrefix === 'Gap (x)' ? true : false);
  let advanced = false;
  if (labelPrefix === 'class' || labelPrefix === 'css') {
    advanced = true;
  }
  if (collapseLabels && keepLabel === false) {
    const label = document.createElement('label');
    label.className = 'hidden';
    return label
  } else {
    keepLabel = labelPrefix.replace(' (t)', '');
    keepLabel = labelPrefix.replace('Minimum ', '');
    keepLabel = keepLabel.includes('Font Family') ? 'Font Styles' : keepLabel;
    keepLabel = keepLabel.includes('Border Width') ? 'Border Width & Radius' : keepLabel;
    keepLabel = keepLabel.includes('Gap') ? 'Gaps Between Columns' : keepLabel;
    const label = document.createElement('label');
    const mobileIcon = document.createElement('span')
    mobileIcon.className = 'h-3 w-3 mr-2 inline-block';
    mobileIcon.innerHTML = `${appSageEditorIcons['responsive'][bp]}`;
    label.innerHTML = `<span class="inline-block">${keepLabel}${advanced === true ? ' (Advanced Option)' : ''}</span>`;
    label.className = 'block col-span-5 text-slate-700 text-xs uppercase mt-2';
    label.setAttribute('for', forAttr);
    label.prepend(mobileIcon);
    return label;
  }
} // DATA OUT: HTML Element, <label>

// This function messily handles all the nuance thus far encountered from
// supporting file-based input elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleInput(bp, labelPrefix, options, cssClassBase, grid, control) {
  const isFile = labelPrefix.includes('File');
  const isUrl = (labelPrefix === 'Background Image URL');
  control.type = isFile ? 'file' : 'text';
  if (isFile) control.setAttribute('accept', 'image/*');
  if (isUrl) {
    const url = String(grid.classList).match(/bg-\[url\('([^']*)'\)\]/);
    if (url) control.value = url[1] || '';
  } else if (!isFile) { 
    control.value = getCurrentStyle(bp, options, cssClassBase, grid);
  }
  control.className = 'shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  let newValue;
  control.onchange = (event) => {
    if (isUrl) {
      // assumes 'bg' is URL
      newValue = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${cssClassBase === 'bg' ? '[url(\'' : ''}${control.value}${cssClassBase === 'bg' ? '\')]' : ''}`;
      const classRegex = new RegExp(`\\b${bp === 'xs' ? ' ' : bp + ':'}${cssClassBase}-\\d+\\b`, 'g');
      grid.className = grid.className.replace(classRegex, '').trim() + ` ${newValue}`;
    } else if (labelPrefix === 'Background Image File') {
      grid.style.backgroundImage = '';
      generateMediaUrl(event, grid, true);
      displayMediaFromIndexedDB(grid);
    }
  };
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting textarea elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleTextareaType(labelPrefix, grid, control) {
  control.type = 'text';
  if (labelPrefix == 'class') {
    control.value = (grid.classList);
  }
  if (labelPrefix == 'css') {
    control.value = handleStyles(grid, '', 'retrieve');
  }
  control.className = 'shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  control.onchange = () => {
    if (labelPrefix == 'class') grid.className = control.value;
    if (labelPrefix == 'html') {
      const newHtmlElement = document.createElement('div');
      newHtmlElement.innerHTML = control.value;
      control.innerHTML = newHtmlElement;
    }
    if (labelPrefix == 'css') {
      handleStyles(grid, control.value, 'apply');
    }
  };
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting select elements using icons for each option in sidebar controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control) {
  cssClassBase = cssClassBase.includes('-all') ? cssClassBase.replace('-all', '') : cssClassBase;
  const fontSize = (labelPrefix === 'Font Size' || labelPrefix === 'Font Weight');
  const borderOption = (labelPrefix === 'Border Width' || labelPrefix === 'Border Radius');
  const smallSelect = (labelPrefix.includes('Margin') || labelPrefix.includes('Padding') || labelPrefix.includes('Gap') || labelPrefix.includes('Height') || labelPrefix.includes('Width'));
  const iconTargetName = labelPrefix.toLowerCase().replace(' ', '-').replace(/[()]/g, '');

  control.className = `flex relative h-12 ${borderOption ? 'w-24 col-span-2 ' : ''}${fontSize ? 'w-48 col-span-4 ' : ''}${(smallSelect && !borderOption) ? (labelPrefix + ' w-20 ') : ''}`;

  const iconTarget = appSageEditorIcons[iconTargetName];
  const iconButton = document.createElement('span');
  iconButton.innerHTML = iconTarget;
  iconButton.className = `absolute ${(smallSelect && !borderOption) ? 'right-4 top-1 bg-none h-10 w-10' : 'right-0.5 top-0.5 bg-slate-50 h-11 w-11'} px-2 py-1 rounded-sm border-none pointer-events-none`;

  const selectControl = document.createElement('select');
  let extraInfo;
  if (labelPrefix.includes('Padding')) {
    extraInfo = tooltips['padding']
  } else if (labelPrefix.includes('Margin')) {
    extraInfo = tooltips['margin']
  } else if (labelPrefix.includes('Opacity')) {
    extraInfo = tooltips['opacity']
  } else {
    const attribute = labelPrefix.replace('Border ', '').replace('Font ', '').toLowerCase();
    extraInfo = `Change the <span class="${attribute === 'size' ? 'text-base' : ''}${attribute === 'weight' ? 'font-bold' : ''}">${attribute}</span>${borderOption ? ' of this element\'s border' : ''}${fontSize ? ' of your text' : ''}${attribute === 'weight' ? '<br>Nothing happening when making weight a selection? Not all fonts support these options' : ''}`;
  }

  selectControl.setAttribute('data-extra-info', extraInfo);
  selectControl.className = `appearance-none w-full bg-slate-50 p-2 border border-slate-300 ${(smallSelect && !borderOption) ? 'max-w-16 ' : ''}${fontSize ? 'pr-24 ' : ''}relative rounded`;

  options.forEach(option => {
    const value = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;
    optionElement.selected = String(grid.classList).includes(value);
    selectControl.appendChild(optionElement);
  });

  selectControl.onchange = () => {
    options.forEach(opt => {
      const classToRemove = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`;
      grid.classList.remove(classToRemove);
    });

    // Remove any individual side-specific classes for both margin and padding
    if (cssClassBase === 'm') {
      grid.classList.remove('mt-0', 'mb-0', 'ml-0', 'mr-0', 'mt-1', 'mb-1', 'ml-1', 'mr-1', 'mt-2', 'mb-2', 'ml-2', 'mr-2', 'mt-4', 'mb-4', 'ml-4', 'mr-4', 'mt-8', 'mb-8', 'ml-8', 'mr-8', 'mt-16', 'mb-16', 'ml-16', 'mr-16');
    }

    if (cssClassBase === 'p') {
      grid.classList.remove('pt-0', 'pb-0', 'pl-0', 'pr-0', 'pt-1', 'pb-1', 'pl-1', 'pr-1', 'pt-2', 'pb-2', 'pl-2', 'pr-2', 'pt-4', 'pb-4', 'pl-4', 'pr-4', 'pt-8', 'pb-8', 'pl-8', 'pr-8', 'pt-16', 'pb-16', 'pl-16', 'pr-16');
    }

    grid.classList.add(selectControl.value);
  };

  control.appendChild(selectControl);
  control.appendChild(iconButton);
}// DATA OUT: null

// This function messily handles all the nuance thus far encountered from 
// supporting icon styled select dropdowns for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleIconSelect(bp, grid, options, labelPrefix, cssClassBase, control) {
  if (!options) {
    console.error('No options provided for icons input type.');
    return;
  }
  const swatchboard = (labelPrefix === 'Text Color' || labelPrefix === 'Background Color' || labelPrefix === 'Border Color');
  const bgIcon = (labelPrefix === 'Background Position' || labelPrefix === 'Background Repeat');
  control.className = `grid grid-cols-5 col-span-5 gap-x-1 gap-y-2 overflow-y-scroll ${swatchboard ? 'hidden h-40 p-2 border bg-[#000000] dark:bg-[#ffffff] border-slate-400' : ''}`;
  if (swatchboard) {
    const toggleButton = document.createElement('button')
    toggleButton.className = `${labelPrefix === 'Border Color' ? 'col-span-1' : 'col-span-5'} w-full bg-[#ffffff] text-left shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline`;
    toggleButton.innerHTML = `<svg class="h-5 w-5 inline mr-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>${labelPrefix === 'Border Color' ? '' : ' ' + labelPrefix}`;
    toggleButton.setAttribute('data-extra-info', tooltips['color-vision-impairement']);
    toggleButton.addEventListener('click', function () {
      if (control.classList.contains('hidden')) {
        control.classList.remove('hidden');
      } else {
        control.classList.add('hidden');
      }
    });
    control.parentElement.insertBefore(toggleButton, control);
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.className = 'col-span-5 mb-2 w-full h-10 p-1 rounded';

    colorPicker.addEventListener('input', () => {
      const selectedColor = colorPicker.value;
      const tailwindColorClass = `${labelPrefix === 'Text Color' ? 'text' : labelPrefix === 'Background Color' ? 'bg' : 'border'}-[${selectedColor}]`;

      // Remove any existing Tailwind color classes
      grid.classList.forEach(cls => {
        if (/^text-\[.*\]$|^bg-\[.*\]$|^border-\[.*\]$/.test(cls)) {
          grid.classList.remove(cls);
        }
      });

      // Add the new Tailwind color class
      grid.classList.add(tailwindColorClass);
    });

    control.appendChild(colorPicker);
  }
  options.forEach(option => {
    const iconButton = document.createElement('button');
    iconButton.className = `iconButton ${option === 'reset' ? 'p-4 bg-slate-100 hover:bg-slate-200 ' : (swatchboard ? 'border-2 hover:border-sky-200 ' : 'bg-slate-200 hover:bg-slate-300 ')}${(bgIcon && option !== 'reset') ? 'p-0' : 'p-2'} rounded ${labelPrefix === 'Text Color' ? 'backdrop-invert' : ''}`;
    if (getCurrentStyle(bp, options, cssClassBase, grid) === option) {
      iconButton.classList.remove('bg-slate-200');
      iconButton.classList.add('bg-sky-200');
    }
    let iconTextCandidate1 = `${cssClassBase}-${option}`;
    let iconTextCandidate2 = labelPrefix.toLowerCase().replace(' ', '-');
    const iconTarget = appSageEditorIcons[iconTextCandidate1] || appSageEditorIcons[iconTextCandidate2] || appSageEditorIcons[option];
    iconButton.innerHTML = iconTarget;
    if (labelPrefix === 'Text Alignment') {
      iconButton.setAttribute('data-extra-info', `${option === 'justify' ? tooltips['text-alignment-justify'] : tooltips['text-alignment-other'] + option}`);
    } else if (labelPrefix === 'Border Style') {
      iconButton.setAttribute('data-extra-info', option === 'none' ? tooltips['border-style-none'] : tooltips['border-style-other'] + option + ' line');
    } else if (labelPrefix === 'Background Size') {
      iconButton.setAttribute('data-extra-info', option === 'cover' ? tooltips['background-size-cover'] : tooltips['background-size-contain']);
    } else if (labelPrefix === 'Background Position') {
      iconButton.setAttribute('data-extra-info', option === 'reset' ? tooltips['reset'] : `${tooltips['background-position']} ${option + '.'}`);
    } else if (labelPrefix === 'Background Repeat') {
      iconButton.setAttribute('data-extra-info', option === 'cover' ? tooltips['background-size-cover'] : tooltips['background-size-contain']);
    } else if (swatchboard) {
      iconButton.setAttribute('data-extra-info', tooltips['swatchboard'] + `${cssClassBase}-${option}`);
    } else if (bgIcon) {
      iconButton.setAttribute('data-extra-info', tooltips['bg-icon'] + option + " of the box it's inside");
    } else {
      handleTooltips(`${cssClassBase}-${option}`, iconButton);
    }
    if ((grid.classList).contains(iconTextCandidate1) && !swatchboard) {
      // Candidate1 means it is not a color icon, so we add a highlight to it.
      iconButton.classList.add('bg-sky-200');
    }
    if ((grid.classList).contains(iconTextCandidate1) && swatchboard) {
      iconButton.classList.add('border-sky-300');
    }
    iconButton.onclick = () => {
      options.forEach(opt => {
        grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
        control.querySelectorAll('.iconButton').forEach(b => {
          if (!swatchboard) b.classList.remove('bg-sky-200');
          if (!swatchboard) b.classList.add('bg-slate-200');
          if (swatchboard) b.classList.remove('border-sky-300');
        });
        if (cssClassBase === 'justify') grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}flex`);
      });
      if (option !== 'reset') {
        grid.classList.add(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`);
        if (swatchboard) iconButton.classList.add('border-sky-300');
        if (!swatchboard) iconButton.classList.add('bg-sky-200');
        if (!swatchboard) iconButton.classList.remove('bg-slate-200');
        // column justification requires flex to work as expected
        if (cssClassBase === 'justify') grid.classList.add(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}flex`);
      }
    };
    if (/^(text|bg|border)-(black|white|.*-(50|[1-9]00))$/.test(iconTextCandidate1)) {
      if (iconTextCandidate1.includes('text')) {
        iconButton.querySelector('svg').classList.add(iconTextCandidate1);
        iconTextCandidate1 = iconTextCandidate1.replace('text', 'border');
        iconButton.classList.add('border-[0.175rem]', iconTextCandidate1);
      } else if (iconTextCandidate1.includes('bg')) {
        iconButton.classList.add(iconTextCandidate1);
        iconButton.querySelector('svg').classList.add('opacity-0');
      } else if (iconTextCandidate1.includes('border')) {
        iconTextCandidate1 = iconTextCandidate1.replace('border', 'bg');
        iconButton.classList.add(iconTextCandidate1);
        iconButton.querySelector('svg').classList.add('opacity-0');
      }
    }
    control.appendChild(iconButton);
  });
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting toggle elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleToggle(bp, options, grid, cssClassBase, control) {
  control.className = 'relative bg-slate-50 h-12 w-12 border-2 border-slate-30 rounded'
  if (cssClassBase === 'italic') {
    control.setAttribute('data-extra-info', tooltips['italicize']);
    control.setAttribute('data-extra-info-class', 'italic');
  } else if (cssClassBase === 'underline') {
    control.setAttribute('data-extra-info', tooltips['underline']);
    control.setAttribute('data-extra-info-class', 'underline');
  }
  const iconButton = document.createElement('span');
  iconButton.innerHTML = appSageEditorIcons[cssClassBase];
  iconButton.className = `absolute top-0.5 right-0 h-11 w-11 px-2 py-1 rounded-sm border-none pointer-events-none`;

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox';
  checkbox.className = 'rounded py-2 px-3 h-full w-full appearance-none checked:bg-sky-200';
  // In this particular case, cssClassBase needs to not get passed due to Tailwind class syntax
  checkbox.checked = getCurrentStyle(bp, options, '', grid) === cssClassBase;
  checkbox.onchange = () => {
    const className = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}`;
    grid.classList.toggle(className);
  };
  control.appendChild(checkbox);
  control.appendChild(iconButton);
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting select elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleSelect(bp, grid, control, options, cssClassBase, labelPrefix) {
  if (!options) {
    console.error('No options provided for select input type.');
    return;
  }
  control.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  options.forEach(option => {
    const optionElement = document.createElement('option');
    let option_key = null;
    if (labelPrefix === 'Font Family') {
      option_key = option.replace(/\+/g, '').toLowerCase();
      optionElement.textContent = option.replace(/\+/g, ' ');
      optionElement.selected = getCurrentStyle(bp, [option_key], cssClassBase, grid) === option_key;
    } else {
      optionElement.textContent = option;
      optionElement.selected = getCurrentStyle(bp, options, cssClassBase, grid) === option;
    }
    const value = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option_key ? option_key : option}`;
    optionElement.value = value;
    control.appendChild(optionElement);
  });
  control.onchange = () => {
    options.forEach(opt => {
      grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
    });
    grid.classList.add(control.value);
  };

} // DATA OUT: null

// This function is an all-in-one place for any and all tooltips necessary for
// the functions in this file.
// DATA IN: ['String', 'HTML Element']
function handleTooltips(cssClassToEvaluate, control) {
  const tooltipText = tooltips[cssClassToEvaluate] || "This tooltip is missing, tell the dev to fix it!";
  control.setAttribute('data-extra-info', tooltipText);
} // DATA OUT: null

function handlePlaceholderMedia(bp, grid, control, options, cssClassBase, isBackgroundImage = false) {
  // Populate the dropdown with placeholder media options
  for (const key in appSagePlaceholderMedia) {
    const selectedMedia = appSagePlaceholderMedia[key];
    if (isBackgroundImage && selectedMedia.endsWith('.mp3')) {
      continue; // Skip audio files
    }
    const option = document.createElement('option');
    option.value = selectedMedia;
    option.textContent = key;
    control.appendChild(option);
  }

  control.addEventListener('change', function (event) {
    const selectedMedia = event.target.value;
    let mediaElement = grid.querySelector(`.${bp}-media`);
    // Clear existing background styles if background image is being updated
    if (isBackgroundImage) {
      grid.style.backgroundImage = ''; // Clear existing background
      grid.classList.remove(...Array.from(grid.classList).filter(c => c.startsWith('bg-'))); // Remove existing bg- classes
    }
    // Apply media or background
    if (isBackgroundImage && (selectedMedia.endsWith('.jpg') || selectedMedia.endsWith('.png') || selectedMedia.endsWith('.svg'))) {
      grid.classList.add(`bg-[url('${selectedMedia}')]`);
      grid.style.backgroundSize = 'cover';
      grid.style.backgroundPosition = 'center'; // Center the background
    } else {
      if (mediaElement) {
        mediaElement.remove();
      }
      if (selectedMedia.endsWith('.mp4')) {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
      } else if (selectedMedia.endsWith('.mp3')) {
        mediaElement = document.createElement('audio');
        mediaElement.controls = true;
      }
      if (mediaElement) {
        mediaElement.classList.add(`${bp}-media`);
        mediaElement.src = selectedMedia;
        grid.appendChild(mediaElement);
      }
    }
  });
}

// Function to handle the dropdown for selecting placeholder images
function addPlaceholderDropdown(fileInput, grid) {
  const placeholderDropdown = document.createElement('select');
  placeholderDropdown.className = 'background-file-input shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline col-span-5';

  fileInput.parentElement.appendChild(placeholderDropdown);

  const imageOnlyMedia = Object.keys(appSagePlaceholderMedia).filter(key => {
    return appSagePlaceholderMedia[key].endsWith('.jpg') ||
      appSagePlaceholderMedia[key].endsWith('.png') ||
      appSagePlaceholderMedia[key].endsWith('.svg');
  }).reduce((obj, key) => {
    obj[key] = appSagePlaceholderMedia[key];
    return obj;
  }, {});

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select Placeholder Image';
  placeholderDropdown.appendChild(defaultOption);

  for (const key in imageOnlyMedia) {
    const option = document.createElement('option');
    option.value = imageOnlyMedia[key];
    option.textContent = key;
    placeholderDropdown.appendChild(option);
  }

  fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) {
      placeholderDropdown.value = '';
      placeholderDropdown.disabled = false;
    }
  });

  placeholderDropdown.addEventListener('change', function () {
    if (placeholderDropdown.value) {
      fileInput.value = '';
      fileInput.disabled = false;

      // Apply background using Tailwind-style class or inline CSS
      grid.style.backgroundImage = '';
      grid.classList.remove(...Array.from(grid.classList).filter(c => c.startsWith('bg-'))); // Clear previous background classes
      grid.classList.add(`bg-[url('${placeholderDropdown.value}')]`);
      grid.style.backgroundSize = 'cover';
      grid.style.backgroundPosition = 'center';
    }
  });
}

/* File: ./app/js/remote_save.js */
/*

  remote_save.js

  This file is not currently being used. It is an aspirational boilerplate for
  sending payloads to remote servers that will receive them and decide how they
  want to process the JSON object they receive.

  TODO: Add field on settings page for remote storage URL
  TODO: Add a button somewhere for these functions to actually be accessible

*/

// This function is the meat and bones of the fetch request to POST the data
// to the user's selected remote server. It may or may not be operational.
// DATA IN: ['String', 'String', 'String:Optional']
function saveDataToServer(url, page_id, css_content = null) {
  const html_content = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id];
  const fullPath = url + (page_id ? ('/' + page_id) : '');
  fetch(fullPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page_id: page_id, css: css_content, html_content: html_content })
  })
    .then(response => response.json())
    // TODO: Have these messages show up in a modal or something
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
} // DATA OUT: null

function generateHTMLString() {
  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const html_content = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].page_data;
  const container_settings = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].settings;
  const finalHtml = `${flattenJSONToHTML(html_content, container_settings)}`;
  return finalHtml
}

// This function is to support the copyPageHTML function.
// DATA IN: ['String', 'HTML Element, <div>']
function flattenJSONToHTML(jsonString, parentInfo) {
  try {
    const jsonArray = JSON.parse(jsonString);
    let parentClassName = JSON.parse(parentInfo).className || '';
    parentClassName = parentClassName.replace('w-[calc(100%-18rem)]', 'w-full');
    parentClassName = parentClassName.replace('ml-72', 'min-h-screen');
    parentClassName = parentClassName.replace('mb-24', '');

    const content = jsonArray.map(obj => {
      if (obj.tagName === "DIV" && obj.className && obj.content) {
        return `<div class="${obj.className}">${obj.content}</div>`;
      }
      return '';
    }).join('');

    return `<div class="${parentClassName}">${content}</div>`;
  } catch (error) {
    console.error("Invalid JSON string provided:", error);
    return '';
  }
} // DATA OUT: String (of an HTML element)

// Since the original developer doesn't yet want to load this repo up with NPM
// packages, we forgo something like PostCSS and just grab the compiled CSS
// generated by the Tailwind Play CDN (or its local cached equivalent). This
// may need to be fixed later. Dunno!
// DATA IN: null
function getCompiledCSS() {
  const styles = document.querySelectorAll('style');
  let tailwindStyles = '';

  for (let style of styles) {
    if (style.innerHTML.includes("/* ! tailwindcss v")) {
      tailwindStyles = style.innerHTML;
      break;
    }
  }

  if (tailwindStyles) {
    return tailwindStyles;
  } else {
    console.log('No TailwindCSS styles found.');
  }
} // DATA IN: String


/* File: ./app/js/editor/media.js */
/*

  editor/media.js

  This file is some syntax sugar for adding placeholder media.
  See `app/placeholder_media/README.md` for more info.

*/

/*

Examples:

   appSagePlaceholderMedia['photo_square']
=> './placeholder_media/square.jpg'

   appSagePlaceholderMedia['video']
=> './placeholder_media/video.mp4'

   randomImage()
=> './placeholder_media/square.jpg'

   randomMedia()
=> './placeholder_media/audio.mp3'

*/

// Global variable — These paths are relative to the HTML page loading them, not this file.
var appSagePlaceholderMedia = {
  "audio": './placeholder_media/audio.mp3',
  "video": './placeholder_media/video.mp4',
  "photo_avatar_darkmode_jpg": './placeholder_media/darkmode_jpg/avatar_placeholder.jpg',
  "photo_iframe_darkmode_jpg": './placeholder_media/darkmode_jpg/iframe_placeholder.jpg',
  "photo_landscape_darkmode_jpg": './placeholder_media/darkmode_jpg/landscape_placeholder.jpg',
  "photo_logo_darkmode_jpg": './placeholder_media/darkmode_jpg/logo_placeholder.jpg',
  "photo_portrait_darkmode_jpg": './placeholder_media/darkmode_jpg/portrait_placeholder.jpg',
  "photo_square_darkmode_jpg": './placeholder_media/darkmode_jpg/square_placeholder.jpg',
  "photo_avatar_darkmode_png": './placeholder_media/darkmode_png/avatar-dark.png',
  "photo_iframe_darkmode_png": './placeholder_media/darkmode_png/iframe-dark.png',
  "photo_landscape_darkmode_png": './placeholder_media/darkmode_png/landscape-dark.png',
  "photo_logo_darkmode_png": './placeholder_media/darkmode_png/logo-dark.png',
  "photo_portrait_darkmode_png": './placeholder_media/darkmode_png/portrait-dark.png',
  "photo_square_darkmode_png": './placeholder_media/darkmode_png/square-dark.png',
  "photo_avatar_darkmode_svg": './placeholder_media/darkmode_svg/avatar_placeholder.svg',
  "photo_iframe_darkmode_svg": './placeholder_media/darkmode_svg/iframe_placeholder.svg',
  "photo_landscape_darkmode_svg": './placeholder_media/darkmode_svg/landscape_placeholder.svg',
  "photo_logo_darkmode_svg": './placeholder_media/darkmode_svg/logo_placeholder.svg',
  "photo_portrait_darkmode_svg": './placeholder_media/darkmode_svg/portrait_placeholder.svg',
  "photo_square_darkmode_svg": './placeholder_media/darkmode_svg/square_placeholder.svg',
  "photo_avatar_lightmode_jpg": './placeholder_media/lightmode_jpg/avatar_placeholder.jpg',
  "photo_iframe_lightmode_jpg": './placeholder_media/lightmode_jpg/iframe_placeholder.jpg',
  "photo_landscape_lightmode_jpg": './placeholder_media/lightmode_jpg/landscape_placeholder.jpg',
  "photo_logo_lightmode_jpg": './placeholder_media/lightmode_jpg/logo_placeholder.jpg',
  "photo_portrait_lightmode_jpg": './placeholder_media/lightmode_jpg/portrait_placeholder.jpg',
  "photo_square_lightmode_jpg": './placeholder_media/lightmode_jpg/square_placeholder.jpg',
  "photo_avatar_lightmode_png": './placeholder_media/lightmode_png/avatar.png',
  "photo_iframe_lightmode_png": './placeholder_media/lightmode_png/iframe.png',
  "photo_landscape_lightmode_png": './placeholder_media/lightmode_png/landscape.png',
  "photo_logo_lightmode_png": './placeholder_media/lightmode_png/logo.png',
  "photo_portrait_lightmode_png": './placeholder_media/lightmode_png/portrait.png',
  "photo_square_lightmode_png": './placeholder_media/lightmode_png/square_placeholder.png',
  "photo_avatar_lightmode_svg": './placeholder_media/lightmode_svg/avatar_placeholder.svg',
  "photo_iframe_lightmode_svg": './placeholder_media/lightmode_svg/iframe_placeholder.svg',
  "photo_landscape_lightmode_svg": './placeholder_media/lightmode_svg/landscape_placeholder.svg',
  "photo_logo_lightmode_svg": './placeholder_media/lightmode_svg/logo_placeholder.svg',
  "photo_portrait_lightmode_svg": './placeholder_media/lightmode_svg/portrait_placeholder.svg',
  "photo_square_lightmode_svg": './placeholder_media/lightmode_svg/square_placeholder.svg'
}

// Keep in mind this does not output video or audio. If you want that, see
// the randomMedia() function.
// DATA IN: null
function randomImage() {
  const darkmodeOptions = placeholderDarkmodeOptions();
  const lightmodeOptions = placeholderLightmodeOptions();

  const options = darkmodeOptions.concat(lightmodeOptions);
  const result = options[Math.floor(Math.random() * options.length)];
  return appSagePlaceholderMedia[result];
} // DATA OUT: String

// For some apps like with user-generated content, they could be posting not
// just images, but other media. This is a good way for the designer to battle
// test their layout under these conditions.
// DATA IN: null
function randomMedia() {
  const darkmodeOptions = placeholderDarkmodeOptions();
  const lightmodeOptions = placeholderLightmodeOptions();

  const options = [
    'audio',
    'video',
    ...darkmodeOptions,
    ...lightmodeOptions
  ];

  const result = options[Math.floor(Math.random() * options.length)];
  return appSagePlaceholderMedia[result];
} // DATA OUT: String

// This is to bring brevity to multiple functions needing the same array.
// DATA IN: null
function placeholderDarkmodeOptions() {
  return [
    'photo_landscape_darkmode_jpg',
    'photo_square_darkmode_jpg',
    'photo_portrait_darkmode_jpg',
    'photo_landscape_darkmode_png',
    'photo_square_darkmode_png',
    'photo_portrait_darkmode_png',
    'photo_landscape_darkmode_svg',
    'photo_square_darkmode_svg',
    'photo_portrait_darkmode_svg'
  ];
} // DATA OUT: Array

// This is to bring brevity to multiple functions needing the same array.
// DATA IN: null
function placeholderLightmodeOptions() {
  return [
    'photo_landscape_lightmode_jpg',
    'photo_square_lightmode_jpg',
    'photo_portrait_lightmode_jpg',
    'photo_landscape_lightmode_png',
    'photo_square_lightmode_png',
    'photo_portrait_lightmode_png',
    'photo_landscape_lightmode_svg',
    'photo_square_lightmode_svg',
    'photo_portrait_lightmode_svg'
  ];
} // DATA OUT: Array


/* File: ./app/js/preview/main.js */
/*

  preview/main.js

  This file is intended to clean up any residual content that could pop up from
  the designer editing the page. And, of course, load the necessary data from
  localStorage to show the final page design without the sidebar cluttering up
  their eyes, giving an unadultered view of the page.

*/

// This function does everything described above, though this comment should
// probably be reviewed and updated if anything is ever added to this file.
// DATA IN: String
function loadPreview(pageId) {
  const json = loadPage(pageId);
  if (json) {
    const pageContainer = document.getElementById('page');
    pageContainer.innerHTML = ''; // Clear existing content

    document.querySelector('title').textContent = pageId;

    const data = JSON.parse(json);
    data.forEach(item => {
      const element = document.createElement(item.tagName);
      element.className = item.className;
      element.innerHTML = item.content;
      pageContainer.appendChild(element);
    });

    loadPageSettings(pageId, true);
    loadPageBlobs(pageId);
    loadPageMetadata(pageId);
  } else {
    console.error('No saved data found for pageId:', pageId);
  }
} // DATA OUT: null

// This used to be in an inline script on the page:
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const previewPageId = urlParams.get('page');

  if (previewPageId) {
    loadPreview(previewPageId);
  }
});

