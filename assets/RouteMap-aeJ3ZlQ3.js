import{r as k,a9 as A,a5 as w,j as c,F as _,a6 as J,aY as p,bg as I,aa as O,b2 as C}from"./index-Cl4Zppla.js";import{c as T,l as G,d as W,e as B,f as D,a as v,L as b,M as Z,B as H,b as P}from"./BaseTile-CeEn-Qiz.js";import{S as V,C as q}from"./CompassControl-DFOp6dI1.js";import"./App-CeKK5MfZ.js";import"./index-CBbQNJSI.js";const L=T(function({data:n,...r},l){const o=new G.GeoJSON(n,r);return W(o,B(l,{overlayContainer:o}))},function(n,r,l){r.style!==l.style&&(r.style==null?n.resetStyle():n.setStyle(r.style))}),K=(t,n)=>{const[r,l]=k.useState(null),{db:{routeList:o}}=k.useContext(A),{gtfsId:h,bound:d,co:M}=o[t];return k.useEffect(()=>{let S="";return h?S=`${h}-${d[M[0]]==="I"?"I":"O"}.json`:M.includes("mtr")&&(S=`${t.split("-")[0].toLowerCase()}.json`),fetch(`https://hkbus.github.io/route-waypoints/${S}`).then($=>$.json()).then($=>{l($)}).catch(()=>{l({features:[{type:"Feature",geometry:{type:"LineString",coordinates:n.reduce(($,{location:{lat:y,lng:u}})=>($.push([u,y]),$),[])}}],type:"FeatureCollection"})}),()=>{l(null)}},[t,h,d,M,n]),r},U=()=>{const[t,n]=k.useState(X),r=w(),l=D();return k.useEffect(()=>{fetch("https://data.hkbus.app/exits.mtr.json").then(o=>o.json()).then(o=>{n(h=>({...h,exits:o}))}),l.on("zoomend",function(){n(o=>({...o,icon:l.getZoom()>=17,label:l.getZoom()>=18}))})},[l]),c.jsx(c.Fragment,{children:t.exits.map(o=>c.jsxs(_.Fragment,{children:[t.icon&&c.jsx(v,{position:o,icon:b.divIcon({iconSize:[15,12],iconAnchor:[7.5,5],className:"mtr-exit"}),alt:o.name[r]}),t.label&&c.jsx(v,{position:o,icon:b.divIcon({html:o.exit,iconAnchor:[-9,7.5],className:"mtr-exit-label"})}),t.label&&o.barrierFree&&c.jsx(v,{position:o,icon:b.divIcon({iconSize:[12,11],iconAnchor:[-20,5],className:"mtr-exit-barrier-free"})})]},`${o.name.en}-${o.exit}`))})},X={exits:[],icon:!1,label:!1},ae=({routeId:t,stopIds:n,stopIdx:r,route:l,companies:o,onMarkerClick:h})=>{var x;const{geolocation:d,geoPermission:M,updateGeoPermission:S}=k.useContext(J),{db:{stopList:$}}=k.useContext(A),y=w(),[u,E]=k.useState(null),i=k.useMemo(()=>n.map(s=>$[s]),[$,n]),f=K(t,i),a=k.useRef({initialCenter:i[r]?i[r].location:p(),currentStopCenter:i[r]?i[r].location:p(),center:i[r]?i[r].location:p(),isFollow:!1,stops:i,stopIdx:r});k.useEffect(()=>{var N,F;let s,g;a.current.stops!==i||a.current.stopIdx!==r?s=!1:s=a.current.isFollow,a.current.stops===i&&a.current.stopIdx===r&&s?g=d.current:g=i[r]?i[r].location:p();const j=a.current.center;j!==g&&!I(g,j)&&(a.current.stops!==i?(N=a.current.map)==null||N.setView(g):(F=a.current.map)==null||F.flyTo(g)),a.current={...a.current,center:g,currentStopCenter:i[r]?i[r].location:p(),stops:i,stopIdx:r,isFollow:s}},[i,r,d]),k.useEffect(()=>{if(u){a.current={...a.current,map:u};const s=()=>{a.current={...a.current,center:a.current.currentStopCenter,isFollow:!1}};return u==null||u.on({dragend:s,dragstart:s}),u==null||u.setView(a.current.center),u==null||u.invalidateSize(),()=>{u.off({dragstart:s,dragend:s})}}},[u]);const R=k.useCallback(()=>{var s;M==="granted"?((s=a.current.map)==null||s.flyTo(d.current),a.current={...a.current,center:d.current,isFollow:!0}):M!=="denied"&&(a.current={...a.current,isFollow:!0},S("opening"))},[d,M,S]);return c.jsx(O,{id:"route-map",sx:Q,children:c.jsxs(Z,{center:a.current.initialCenter,zoom:16,scrollWheelZoom:!1,className:e.mapContainer,ref:E,children:[c.jsx(H,{}),c.jsx(U,{}),i.map((s,g)=>c.jsx(v,{position:s.location,icon:Y({active:g===r,passed:g<r,companies:o}),alt:`${g}. ${s.name[y]}`,eventHandlers:{click:j=>{h(g,j)}}},`${s.location.lng}-${s.location.lat}-${g}`)),((x=f==null?void 0:f.features)==null?void 0:x.length)&&c.jsxs(c.Fragment,{children:[c.jsx(L,{data:f,style:z(o,l,!0)},f==null?void 0:f.timeStamp),c.jsx(L,{data:f,style:z(o,l,!1)},f==null?void 0:f.timeStamp)]}),c.jsx(V,{}),c.jsx(P,{onClick:R}),c.jsx(q,{})]})})},z=(t,n,r)=>function(){return{color:r?"#000000":C(t,n),weight:r?6:4,className:t.includes("ctb")&&t.includes("kmb")&&!r?e.jointlyLine:void 0}},Y=({active:t,passed:n,companies:r})=>r[0]==="mtr"?b.divIcon({iconSize:[20,20],iconAnchor:[10,10],className:`${e.mtrMarker} ${e.marker} ${t?e.active:""} ${n?e.passed:""}`}):r.includes("lightRail")?b.divIcon({iconSize:[20,20],iconAnchor:[10,10],className:`${e.mtrMarker} ${e.marker} ${t?e.active:""} ${n?e.passed:""}`}):r[0].startsWith("gmb")?b.divIcon({iconSize:[30,30],iconAnchor:[15,30],className:`${e.gmbMarker} ${e.marker} ${t?e.active:""} ${n?e.passed:""}`}):r.includes("lrtfeeder")?b.divIcon({iconSize:[30,30],iconAnchor:[15,30],className:`${e.lrtfeederMarker} ${e.marker} ${t?e.active:""} ${n?e.passed:""}`}):r.includes("nlb")?b.divIcon({iconSize:[30,30],iconAnchor:[15,30],className:`${e.nlbMarker} ${e.marker} ${t?e.active:""} ${n?e.passed:""}`}):r.includes("ctb")&&r.includes("kmb")?b.divIcon({iconSize:[30,30],iconAnchor:[15,30],className:`${e.jointlyMarker} ${e.marker} ${t?e.active:""} ${n?e.passed:""}`}):r.includes("ctb")?b.divIcon({iconSize:[30,30],iconAnchor:[15,30],className:`${e.ctbMarker} ${e.marker} ${t?e.active:""} ${n?e.passed:""}`}):b.divIcon({iconSize:[30,30],iconAnchor:[15,30],className:`${e.kmbMarker} ${e.marker} ${t?e.active:""} ${n?e.passed:""}`}),m="map",e={mapContainerBox:`${m}-mapContainerBox`,mapContainer:`${m}-mapContainer`,centerControl:`${m}-centerControl`,marker:`${m}-marker`,mtrMarker:`${m}-mtrMarker`,gmbMarker:`${m}-gmbMarker`,ctbMarker:`${m}-ctbMarker`,jointlyMarker:`${m}-jointlyMarker`,lrtfeederMarker:`${m}-lrtfeederMarker`,nlbMarker:`${m}-nlbMarker`,kmbMarker:`${m}-kmbMarker`,jointlyLine:`${m}-jointlyLine`,active:`${m}-active`,passed:`${m}-passed`},Q={height:"35vh",filter:t=>t.palette.mode==="dark"?"brightness(0.8)":"none",[`& .${e.mapContainer}`]:{height:"35vh"},[`& .${e.mtrMarker}`]:{backgroundImage:"url(/img/mtr.svg)"},[`& .${e.gmbMarker}`]:{backgroundImage:"url(/img/minibus.svg)"},[`& .${e.ctbMarker}`]:{backgroundImage:"url(/img/bus_ctb.svg)"},[`& .${e.jointlyMarker}`]:{backgroundImage:"url(/img/bus_jointly.svg)"},[`& .${e.lrtfeederMarker}`]:{backgroundImage:"url(/img/bus_lrtfeeder.svg)"},[`& .${e.nlbMarker}`]:{backgroundImage:"url(/img/bus_nlb.svg)"},[`& .${e.kmbMarker}`]:{backgroundImage:"url(/img/bus_kmb.svg)"},[`& .${e.jointlyLine}`]:{stroke:C(["kmb"],""),animation:`${e.jointlyLine}-color 10s infinite linear 1.5s`},[`@keyframes ${e.jointlyLine}-color`]:{"50%":{stroke:C(["ctb"],"")},"100%":{stroke:C(["kmb"],"")}},[`& .${e.active}`]:{animation:"blinker 1.5s infinite"},[`& .${e.passed}`]:{filter:"grayscale(100%)"},"& .self-center":{backgroundImage:"url(/img/self.svg)",backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",transition:"transform 0.1s ease-out",transformOrigin:"center"},"& .mtr-exit":{backgroundImage:"url(/img/HK_MTR_logo.svg)"},"& .mtr-exit-label":{background:"transparent",color:"#AC2E44",fontWeight:600},"& .mtr-exit-barrier-free":{backgroundImage:"url(/img/Wheelchair_symbol.svg)",backgroundSize:"12px 11px"}};export{ae as default};
