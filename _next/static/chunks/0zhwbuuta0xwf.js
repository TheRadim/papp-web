(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,10716,e=>{"use strict";var t=e.i(43476),i=e.i(57688),r=e.i(71645),n=e.i(40446),a=e.i(90072),s=e.i(8560);let o=`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`,l=`
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform sampler2D u_noise;
  uniform sampler2D u_buffer;
  uniform bool u_renderpass;

  const float blurMultiplier = 0.95;
  const float circleSize = .25;
  const float blurStrength = .98;
  const float threshold = .5;
  const float scale = 4.;

  #define PI 3.141592653589793
  #define pow2(x) (x * x)

  const int samples = 8;
  const float sigma = float(samples) * 0.25;

  float gaussian(vec2 i) {
    return 1.0 / (2.0 * PI * pow2(sigma)) * exp(-((pow2(i.x) + pow2(i.y)) / (2.0 * pow2(sigma))));
  }

  vec3 hash33(vec3 p) {
    float n = sin(dot(p, vec3(7, 157, 113)));
    return fract(vec3(2097152, 262144, 32768) * n);
  }

  vec3 blur(sampler2D sp, vec2 uv, vec2 blurScale) {
    vec3 col = vec3(0.0);
    float accum = 0.0;
    float weight;
    vec2 offset;

    for (int x = -samples / 2; x < samples / 2; ++x) {
      for (int y = -samples / 2; y < samples / 2; ++y) {
        offset = vec2(x, y);
        weight = gaussian(offset);
        col += texture2D(sp, uv + blurScale * offset).rgb * weight;
        accum += weight;
      }
    }

    return col / accum;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    uv *= scale;
    vec2 mouse = u_mouse * scale;

    vec2 ps = vec2(1.0) / u_resolution.xy;
    vec2 sample = gl_FragCoord.xy / u_resolution.xy;
    vec2 o = mouse * .2 + vec2(.65, .5);
    float d = .98;
    sample = d * (sample - o);
    sample += o;
    sample += vec2(sin((u_time + uv.y * .5) * 10.) * .001, -.00);

    vec3 fragcolour;
    vec4 tex;
    if (u_renderpass) {
      tex = vec4(blur(u_buffer, sample, ps * blurStrength) * blurMultiplier, 1.);
      float df = length(mouse - uv);
      fragcolour = vec3(0.64, 0.87, 1.0) * smoothstep(circleSize, 0., df);
    } else {
      tex = texture2D(u_buffer, sample, 2.) * .98;
      tex = vec4(
        smoothstep(0.0, threshold - fwidth(tex.x), tex.x),
        smoothstep(0.2, threshold - fwidth(tex.y) + .2, tex.y),
        smoothstep(-0.05, threshold - fwidth(tex.z) - .2, tex.z),
        1.);
      vec3 n = hash33(vec3(uv, u_time * .1));
      tex.rgb += n * .12 - .06;
      tex.rgb = mix(vec3(1.0), vec3(0.72, 0.9, 1.0), tex.rgb * 0.65);
    }

    gl_FragColor = vec4(fragcolour, 1.0);
    gl_FragColor += tex;
    gl_FragColor.a = .38;
  }
`;function d(){let e=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t=e.current;if(!t)return;let i=new s.WebGLRenderer({alpha:!0,antialias:!1,powerPreference:"low-power"});i.setPixelRatio(Math.min(window.devicePixelRatio||1,1.4)),i.setClearColor(0xffffff,0),t.appendChild(i.domElement);let r=new a.Camera;r.position.z=1;let n=new a.Scene,d=new a.PlaneGeometry(2,2),u=function(){let e=new Uint8Array(262144);for(let t=0;t<e.length;t+=4)e[t]=255*Math.random(),e[t+1]=255*Math.random(),e[t+2]=255*Math.random(),e[t+3]=255;let t=new a.DataTexture(e,256,256,a.RGBAFormat);return t.wrapS=a.RepeatWrapping,t.wrapT=a.RepeatWrapping,t.minFilter=a.LinearFilter,t.magFilter=a.LinearFilter,t.needsUpdate=!0,t}(),c=new a.WebGLRenderTarget(1,1),m=new a.WebGLRenderTarget(1,1),h={x:0,y:0},p={u_time:{value:1},u_resolution:{value:new a.Vector2(1,1)},u_noise:{value:u},u_buffer:{value:c.texture},u_mouse:{value:new a.Vector2(0,0)},u_renderpass:{value:!1}},f=new a.ShaderMaterial({uniforms:p,vertexShader:o,fragmentShader:l,transparent:!0});f.extensions.derivatives=!0;let v=new a.Mesh(d,f);function g(){let e=t.getBoundingClientRect(),r=Math.max(1,Math.floor(e.width)),n=Math.max(1,Math.floor(e.height)),s=Math.max(1,Math.floor(.22*r)),o=Math.max(1,Math.floor(.22*n));i.setSize(r,n,!1),p.u_resolution.value.set(i.domElement.width,i.domElement.height),c.dispose(),m.dispose(),c=new a.WebGLRenderTarget(s,o),m=new a.WebGLRenderTarget(s,o),p.u_buffer.value=c.texture}function x(e){let i=t.getBoundingClientRect(),r=i.height/Math.max(i.width,1);h.x=(e.clientX-i.left-i.width/2)/Math.max(i.width,1)/Math.max(r,.1),h.y=-((e.clientY-i.top-i.height/2)/Math.max(i.height,1)*1)}n.add(v);let w=0;return g(),w=window.requestAnimationFrame(function e(t){let a,s;p.u_mouse.value.x+=(h.x-p.u_mouse.value.x)*.1,p.u_mouse.value.y+=(h.y-p.u_mouse.value.y)*.1,p.u_time.value=5e-4*t,i.render(n,r),a=p.u_resolution.value.clone(),p.u_resolution.value.set(c.width,c.height),p.u_buffer.value=m.texture,p.u_renderpass.value=!0,i.setRenderTarget(c),i.render(n,r),i.setRenderTarget(null),s=c,c=m,m=s,p.u_buffer.value=c.texture,p.u_resolution.value.copy(a),p.u_renderpass.value=!1,w=window.requestAnimationFrame(e)}),window.addEventListener("resize",g),t.addEventListener("pointermove",x,{passive:!0}),()=>{window.cancelAnimationFrame(w),window.removeEventListener("resize",g),t.removeEventListener("pointermove",x),d.dispose(),f.dispose(),u.dispose(),c.dispose(),m.dispose(),i.dispose(),i.domElement.remove()}},[]),(0,t.jsx)("div",{className:"timeline-glow-field",ref:e,"aria-hidden":"true"})}e.s(["AboutTimeline",0,function({items:e,locale:a}){let s=(0,r.useRef)(null),o=(0,r.useRef)(0),l=(0,r.useRef)(0),u=(0,r.useRef)(0),[c,m]=(0,r.useState)(0),[h,p]=(0,r.useState)(0);(0,r.useEffect)(()=>{function e(){let t=l.current,i=o.current,r=t+(i-t)*.16;l.current=.001>Math.abs(i-r)?i:r,m(l.current),Math.abs(i-l.current)>.001?u.current=window.requestAnimationFrame(e):u.current=0}function t(){!function(){let e=s.current;if(!e)return;let t=e.getBoundingClientRect(),i=Array.from(e.querySelectorAll("[data-timeline-card]")),r=.5*window.innerHeight,n=window.scrollY+r,a=i.map(e=>{let t=e.getBoundingClientRect();return window.scrollY+t.top+.36*t.height});if(a.length>1){let e=0;for(let t=0;t<a.length-1;t+=1)n>=a[t]&&(e=t);let t=a[e],i=Math.min(Math.max((n-t)/Math.max(a[Math.min(e+1,a.length-1)]-t,1),0),1),r=(e+i)/(a.length-1);o.current=n<=a[0]?0:Math.min(Math.max(r,0),1)}else{let e=t.top+window.scrollY,i=e+t.height;o.current=Math.min(Math.max((n-e)/Math.max(i-e,1),0),1)}p(i.reduce((e,t,i)=>{let n=t.getBoundingClientRect(),a=Math.abs(n.top+.36*n.height-r);return a<e.distance?{index:i,distance:a}:e},{index:0,distance:1/0}).index)}(),u.current||(u.current=window.requestAnimationFrame(e))}return t(),window.addEventListener("scroll",t,{passive:!0}),window.addEventListener("resize",t),()=>{window.cancelAnimationFrame(u.current),window.removeEventListener("scroll",t),window.removeEventListener("resize",t)}},[]);let f={"--timeline-progress":`${c}`,"--timeline-progress-percent":`${100*c}%`};return(0,t.jsxs)("div",{className:"history-timeline",ref:s,style:f,children:[(0,t.jsx)(d,{}),(0,t.jsxs)("nav",{className:"history-timeline__nav","aria-label":"da"===a?"Historie år":"Timeline years",children:[(0,t.jsx)("span",{className:"history-timeline__rail","aria-hidden":"true"}),(0,t.jsx)("ol",{children:e.map((e,i)=>(0,t.jsx)("li",{className:i<=h?"is-passed":void 0,children:(0,t.jsxs)("a",{className:i===h?"is-active":void 0,href:`#timeline-${i}`,children:[(0,t.jsx)("span",{"aria-hidden":"true"}),e.date[a]]})},e.date.da))})]}),(0,t.jsx)("div",{className:"history-timeline__stream",children:e.map((e,r)=>(0,t.jsxs)("article",{className:r<=h?"is-passed":void 0,"data-timeline-card":!0,id:`timeline-${r}`,children:[(0,t.jsx)("div",{className:"history-timeline__date","aria-label":e.date[a],children:(0,t.jsx)("p",{children:e.date[a]})}),(0,t.jsxs)("div",{className:"history-timeline__card",children:[(0,t.jsx)("h3",{children:e.title[a]}),(0,t.jsx)("span",{children:e.body[a]}),e.image?(0,t.jsx)("div",{className:`history-timeline__media history-timeline__media--${e.imageFit??"cover"}`,children:(0,t.jsx)(i.default,{src:(0,n.withBasePath)(e.image),alt:"",width:860,height:520,sizes:"(max-width: 768px) 100vw, 42vw"})}):null]})]},e.date.da))})]})}],10716)},15408,e=>{"use strict";var t=e.i(43476),i=e.i(71645);let r=(0,e.i(75254).default)("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);var n=e.i(59962);e.s(["OpenApplication",0,function({locale:e}){let[a,s]=(0,i.useState)(!1);return(0,t.jsxs)("section",{className:"open-application","data-open":a,children:[(0,t.jsx)("p",{className:"open-application__kicker",children:"da"===e?"Slut dig til os!":"Join us!"}),(0,t.jsxs)("button",{type:"button",className:"open-application__toggle","aria-expanded":a,onClick:()=>s(e=>!e),children:[(0,t.jsx)("span",{children:"da"===e?"Åben ansøgning(m/f/d)":"Open application (m/f/d)"}),(0,t.jsx)("em",{children:"da"===e?"København/Aarhus/eksternt":"Copenhagen/Aarhus/remote"}),(0,t.jsx)(r,{"aria-hidden":"true",size:28,strokeWidth:2.2})]}),(0,t.jsx)("div",{className:"open-application__panel","aria-hidden":!a,children:(0,t.jsxs)("div",{className:"open-application__body",children:[(0,t.jsx)("h3",{children:"da"===e?"Jobbeskrivelse":"Job description"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{children:"da"===e?"Klar til at være en del af noget større? Hos Papp Mobility er vi altid på udkig efter passionerede, fremsynede personer, der er lige så begejstrede for urban mobilitet, som vi er.":"Ready to be part of something bigger? At Papp Mobility, we are always looking for passionate, forward-thinking people who are as excited about urban mobility as we are."}),(0,t.jsx)("p",{children:"da"===e?"Uanset om du er en studerende, der leder efter en praktikplads, en professionel, der overvejer et karriereskift, eller en ekspert, der søger nye udfordringer, vil vi gerne høre fra dig. Dine unikke færdigheder og dit perspektiv kan være den manglende brik i vores stræben efter at omdefinere urban mobilitet.":"Whether you are a student looking for an internship, a professional considering a career move, or an expert seeking new challenges, we would like to hear from you. Your skills and perspective may be the missing piece in our work to redefine urban mobility."}),(0,t.jsx)("a",{href:n.company.linkedinUrl,target:"_blank",rel:"noreferrer",children:"da"===e?"Ansøg på Linkedin":"Apply on LinkedIn"})]})]})})]})}],15408)}]);