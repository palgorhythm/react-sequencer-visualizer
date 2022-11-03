import*as c from"https://unpkg.com/three@0.119.1/build/three.module.js";import{OrbitControls as M}from"https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js";import{r as p,u as S,R as b,j as g,a as R,L as u,S as B,b as y,c as N,d as T}from"./vendor.f0f70c4f.js";const H=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const h of s.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&a(h)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}};H();function O(){let e=new c.Scene,t=new c.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3);t.position.z=5;let n=new c.WebGLRenderer;n.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(n.domElement);let a=new M(t,n.domElement);a.target.set(0,0,-10),a.autoRotate=!0,a.autoRotateSpeed=3;function r(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight)}return window.addEventListener("resize",r,!1),{scene:e,camera:t,renderer:n,controls:a}}let{scene:G,camera:L,renderer:z,controls:I}=O();function j(){requestAnimationFrame(j),I.update(),W(),z.render(G,L)}let d=P(),m=[];for(let e=0;e<d.length;e+=1)m.push([Math.random()*.03,Math.random()*.03,Math.random()*.03]);j();function x(){let e=["#ffadad","#ffd6a5","#fdffb6","#caffbf","#9bf6ff","#a0c4ff","#bdb2ff","#ffc6ff","#007BFF","#FFAAEE","#B7BB4E","#FBBFAA","#00D2E0","#BBFFAA","#FFAA44","#55AA55","#FF6437"],t=Math.round(Math.random()*e.length);return e[t]}function D(){let e=[c.BoxGeometry,c.CircleGeometry,c.ConeGeometry,c.CylinderGeometry,c.DodecahedronGeometry,c.IcosahedronGeometry,c.OctahedronGeometry,c.SphereGeometry,c.TetrahedronGeometry,c.TorusGeometry,c.TorusKnotGeometry],t=Math.floor(Math.random()*e.length),n=e[t];return new n}function l(e){let t=D(),n=new c.MeshBasicMaterial({color:x()});n.wireframe=!0;let a=new c.Mesh(t,n);return a.position.set(e[0],e[1],e[2]),G.add(a),a}function P(){let e=2.5,t=5,n=4.5;return[l([-e*3,t,-n]),l([-e,t,-n]),l([e,t,-n]),l([e*3,t,-n]),l([-e*3,t/3,-n]),l([-e,t/3,-n]),l([e,t/3,-n]),l([e*3,t/3,-n]),l([-e*3,-t/3,-n]),l([-e,-t/3,-n]),l([e,-t/3,-n]),l([e*3,-t/3,-n]),l([-e*3,-t,-n]),l([-e,-t,-n]),l([e,-t,-n]),l([e*3,-t,-n])]}function W(){if(!!d)for(let e=0;e<d.length;e+=1)d[e].rotation.x+=m[e][0],d[e].rotation.y+=m[e][1],d[e].rotation.z+=m[e][2]}let $={volume:-20,portamento:50,oscillator:{type:"sine"},filterEnvelope:{attack:.01,decay:0,sustain:.5,release:.2},envelope:{attack:.01,decay:0,sustain:.5,release:.2}},q={volume:-20,portamento:100,oscillator:{type:"sawtooth"},filterEnvelope:{attack:.01,decay:0,sustain:.5,release:.2},envelope:{attack:.01,decay:0,sustain:.5,release:.2}},U={vibratoAmount:.5,vibratoRate:5,harmonicity:1,voice0:$,voice1:q},f,A,F,V=document.getElementById("start-button");V.addEventListener("click",J);function J(){A=new Tone.DuoSynth(U).toDestination(),f=new Tone.Part(K,F).start(0),f.loop=1/0,Tone.Transport.bpm.value=90,Tone.Transport.start()}F=[{time:"0:0:0",note:"C2",velocity:1},{time:"0:0:1",note:"E4",velocity:.6},{time:"0:0:2",note:"G4",velocity:.7},{time:"0:0:3",note:"B4",velocity:.8},{time:"0:0:4",note:"D5",velocity:.9},{time:"0:0:5",note:"A4",velocity:.6},{time:"0:0:6",note:"B4",velocity:.3},{time:"0:0:7",note:"D4",velocity:.4},{time:"0:0:8",note:"C4",velocity:.8},{time:"0:0:9",note:"E4",velocity:.5},{time:"0:0:10",note:"G4",velocity:.2},{time:"0:0:11",note:"B4",velocity:.7},{time:"0:0:12",note:"D5",velocity:.9},{time:"0:0:13",note:"F#5",velocity:.2},{time:"0:0:14",note:"B4",velocity:.3},{time:"0:0:15",note:"G4",velocity:.4}];function K(e,t){let n=Math.round((f?f.progress:0)*16);Y(n),A.triggerAttackRelease(t.note,"32n",e,t.velocity)}function Y(e){for(let t=0;t<d.length;t+=1)t===e?d[t].scale.set(1.5,1.5,1.5):d[t].scale.set(1,1,1),e===0&&(d[t].scale.set(2,2,2),d[t].material.color.set(x()))}function _({x:e=0,y:t=0,rotation:n=0,scale:a=1,timing:r=150,springConfig:s={tension:300,friction:10}}){const[h,w]=p.exports.useState(!1),E=S({transform:h?`translate(${e}px, ${t}px) rotate(${n}deg) scale(${a})`:"translate(0px, 0px) rotate(0deg) scale(1)",config:s});b.useEffect(()=>{if(!h)return;const C=window.setTimeout(()=>{w(!1)},r);return()=>{window.clearTimeout(C)}},[h]);const k=p.exports.useCallback(()=>{w(!0)},[]);return[E,k]}const o=g.exports.jsx,i=g.exports.jsxs,Q=g.exports.Fragment,v=["Hello React","Salut React","Hola React","\uC548\uB155 React","Hej React"];function X(){return v[Math.floor(Math.random()*v.length)]}function Z(){const[e,t]=p.exports.useState(v[0]),[n,a]=_({x:5,y:5,scale:1}),r=()=>{const s=X();t(s)};return i(Q,{children:[i("h1",{className:"title",children:[e,"!"]}),o(R.div,{onMouseEnter:a,style:n,children:o("img",{src:"https://cdn.glitch.com/2f80c958-3bc4-4f47-8e97-6a5c8684ac2c%2Fillustration.svg?v=1618196579405",className:"illustration",onClick:r,alt:"Illustration click to change language"})}),o("div",{className:"navigation",children:o(R.div,{onMouseEnter:a,children:o("a",{className:"btn--click-me",onClick:r,children:"Psst, click me"})})}),i("div",{className:"instructions",children:[o("h2",{children:"Using this project"}),i("p",{children:["This is the Glitch ",o("strong",{children:"Hello React"})," project. You can use it to build your own app. See more info in the"," ",o(u,{href:"/about",children:"About"})," page, and check out README.md in the editor for additional detail plus next steps you can take!"]})]})]})}function ee(){return i("div",{className:"page",children:[o("h1",{className:"title",children:"About this site"}),o("p",{children:"Welcome to the Creative Coding with React and ThreeJS starter project!"}),o("p",{children:i("em",{children:["If you're completely new to React, learning the"," ",o("a",{href:"https://reactjs.org/docs/hello-world.html",children:"main concepts"})," ","will get you off to a great start. You'll also see comments and links to supporting resources throughout the code."]})}),i("p",{children:["This page is a great spot to tell the world a few details about the new React app you built on Glitch! Check out your project's"," ",o("code",{children:"readme"})," file to learn more about how to customize your content."]}),i("ul",{children:[i("li",{children:["\u{1F389} Right now, your site is ",o("strong",{children:"live on the web"})," \u{1F310} with a real URL (a secure HTTPS address!) that updates as soon as you make changes."]}),i("li",{children:["\u{1F4A5} ",o("strong",{children:"Add a domain"})," to your new Glitch project! Just go to the ",o("strong",{children:"Tools"})," menu in the Glitch editor, and click"," ",o("strong",{children:"Custom Domains"}),"."]}),i("li",{children:["\u{1F308} Use the ",o("strong",{children:"Share"})," button in the Glitch editor to invite others in to edit your new React project by typing in their email address or Glitch username. ",o("br",{})]})]}),i("p",{children:["Built with ",o("a",{href:"https://reactjs.org/",children:"React"})," and"," ",o("a",{href:"https://vitejs.dev/",children:"Vite"})," on"," ",o("a",{href:"https://glitch.com/",children:"Glitch"}),"."]})]})}function te(){return o("div",{className:"page",children:"FOOBER"})}var oe=()=>i(B,{children:[o(y,{path:"/",component:Z}),o(y,{path:"/about",component:ee}),o(y,{path:"/visualizer",component:te})]});function ne(){return i(N,{children:[o("main",{role:"main",className:"wrapper",children:o("div",{className:"content",children:o(oe,{})})}),i("footer",{className:"footer",children:[i("div",{className:"links",children:[o(u,{href:"/",children:"Home"}),o("span",{className:"divider",children:"|"}),o(u,{href:"/about",children:"About"}),o("span",{className:"divider",children:"|"}),o(u,{href:"/visualizer",children:"Visualizer"})]}),i("a",{className:"btn--remix",target:"_top",href:"https://glitch.com/edit/#!/remix/glitch-hello-react",children:[o("img",{src:"https://cdn.glitch.com/605e2a51-d45f-4d87-a285-9410ad350515%2FLogo_Color.svg?v=1618199565140",alt:""}),"Remix on Glitch"]})]})]})}const re=document.getElementById("root"),ie=T(re);ie.render(o(b.StrictMode,{children:o(ne,{})}));
