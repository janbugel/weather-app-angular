import{B as Y,Ba as se,Ca as oe,E as Z,L as U,T as Q,X as H,Ya as z,ca as ee,f as K,ic as ie,la as T,ma as re,n as C,o as L,oa as m,oc as ae,ra as te,s as R,va as p,wa as g,yc as ce,za as ne}from"./chunk-IXJXUEQ5.js";var A=class{},I=class{},v=class e{constructor(r){this.normalizedNames=new Map,this.lazyUpdate=null,r?typeof r=="string"?this.lazyInit=()=>{this.headers=new Map,r.split(`
`).forEach(n=>{let t=n.indexOf(":");if(t>0){let s=n.slice(0,t),o=s.toLowerCase(),a=n.slice(t+1).trim();this.maybeSetNormalizedName(s,o),this.headers.has(o)?this.headers.get(o).push(a):this.headers.set(o,[a])}})}:typeof Headers<"u"&&r instanceof Headers?(this.headers=new Map,r.forEach((n,t)=>{this.setHeaderEntries(t,n)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(r).forEach(([n,t])=>{this.setHeaderEntries(n,t)})}:this.headers=new Map}has(r){return this.init(),this.headers.has(r.toLowerCase())}get(r){this.init();let n=this.headers.get(r.toLowerCase());return n&&n.length>0?n[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(r){return this.init(),this.headers.get(r.toLowerCase())||null}append(r,n){return this.clone({name:r,value:n,op:"a"})}set(r,n){return this.clone({name:r,value:n,op:"s"})}delete(r,n){return this.clone({name:r,value:n,op:"d"})}maybeSetNormalizedName(r,n){this.normalizedNames.has(n)||this.normalizedNames.set(n,r)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(r=>this.applyUpdate(r)),this.lazyUpdate=null))}copyFrom(r){r.init(),Array.from(r.headers.keys()).forEach(n=>{this.headers.set(n,r.headers.get(n)),this.normalizedNames.set(n,r.normalizedNames.get(n))})}clone(r){let n=new e;return n.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,n.lazyUpdate=(this.lazyUpdate||[]).concat([r]),n}applyUpdate(r){let n=r.name.toLowerCase();switch(r.op){case"a":case"s":let t=r.value;if(typeof t=="string"&&(t=[t]),t.length===0)return;this.maybeSetNormalizedName(r.name,n);let s=(r.op==="a"?this.headers.get(n):void 0)||[];s.push(...t),this.headers.set(n,s);break;case"d":let o=r.value;if(!o)this.headers.delete(n),this.normalizedNames.delete(n);else{let a=this.headers.get(n);if(!a)return;a=a.filter(i=>o.indexOf(i)===-1),a.length===0?(this.headers.delete(n),this.normalizedNames.delete(n)):this.headers.set(n,a)}break}}setHeaderEntries(r,n){let t=(Array.isArray(n)?n:[n]).map(o=>o.toString()),s=r.toLowerCase();this.headers.set(s,t),this.maybeSetNormalizedName(r,s)}forEach(r){this.init(),Array.from(this.normalizedNames.keys()).forEach(n=>r(this.normalizedNames.get(n),this.headers.get(n)))}};var _=class{encodeKey(r){return le(r)}encodeValue(r){return le(r)}decodeKey(r){return decodeURIComponent(r)}decodeValue(r){return decodeURIComponent(r)}};function Pe(e,r){let n=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(s=>{let o=s.indexOf("="),[a,i]=o==-1?[r.decodeKey(s),""]:[r.decodeKey(s.slice(0,o)),r.decodeValue(s.slice(o+1))],d=n.get(a)||[];d.push(i),n.set(a,d)}),n}var Re=/%(\d[a-f0-9])/gi,Ne={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function le(e){return encodeURIComponent(e).replace(Re,(r,n)=>Ne[n]??r)}function M(e){return`${e}`}var w=class e{constructor(r={}){if(this.updates=null,this.cloneFrom=null,this.encoder=r.encoder||new _,r.fromString){if(r.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=Pe(r.fromString,this.encoder)}else r.fromObject?(this.map=new Map,Object.keys(r.fromObject).forEach(n=>{let t=r.fromObject[n],s=Array.isArray(t)?t.map(M):[M(t)];this.map.set(n,s)})):this.map=null}has(r){return this.init(),this.map.has(r)}get(r){this.init();let n=this.map.get(r);return n?n[0]:null}getAll(r){return this.init(),this.map.get(r)||null}keys(){return this.init(),Array.from(this.map.keys())}append(r,n){return this.clone({param:r,value:n,op:"a"})}appendAll(r){let n=[];return Object.keys(r).forEach(t=>{let s=r[t];Array.isArray(s)?s.forEach(o=>{n.push({param:t,value:o,op:"a"})}):n.push({param:t,value:s,op:"a"})}),this.clone(n)}set(r,n){return this.clone({param:r,value:n,op:"s"})}delete(r,n){return this.clone({param:r,value:n,op:"d"})}toString(){return this.init(),this.keys().map(r=>{let n=this.encoder.encodeKey(r);return this.map.get(r).map(t=>n+"="+this.encoder.encodeValue(t)).join("&")}).filter(r=>r!=="").join("&")}clone(r){let n=new e({encoder:this.encoder});return n.cloneFrom=this.cloneFrom||this,n.updates=(this.updates||[]).concat(r),n}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(r=>this.map.set(r,this.cloneFrom.map.get(r))),this.updates.forEach(r=>{switch(r.op){case"a":case"s":let n=(r.op==="a"?this.map.get(r.param):void 0)||[];n.push(M(r.value)),this.map.set(r.param,n);break;case"d":if(r.value!==void 0){let t=this.map.get(r.param)||[],s=t.indexOf(M(r.value));s!==-1&&t.splice(s,1),t.length>0?this.map.set(r.param,t):this.map.delete(r.param)}else{this.map.delete(r.param);break}}}),this.cloneFrom=this.updates=null)}};var S=class{constructor(){this.map=new Map}set(r,n){return this.map.set(r,n),this}get(r){return this.map.has(r)||this.map.set(r,r.defaultValue()),this.map.get(r)}delete(r){return this.map.delete(r),this}has(r){return this.map.has(r)}keys(){return this.map.keys()}};function Ae(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function he(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function de(e){return typeof Blob<"u"&&e instanceof Blob}function ue(e){return typeof FormData<"u"&&e instanceof FormData}function De(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var N=class e{constructor(r,n,t,s){this.url=n,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=r.toUpperCase();let o;if(Ae(this.method)||s?(this.body=t!==void 0?t:null,o=s):o=t,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new v,this.context??=new S,!this.params)this.params=new w,this.urlWithParams=n;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=n;else{let i=n.indexOf("?"),d=i===-1?"?":i<n.length-1?"&":"";this.urlWithParams=n+d+a}}}serializeBody(){return this.body===null?null:he(this.body)||de(this.body)||ue(this.body)||De(this.body)||typeof this.body=="string"?this.body:this.body instanceof w?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||ue(this.body)?null:de(this.body)?this.body.type||null:he(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof w?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(r={}){let n=r.method||this.method,t=r.url||this.url,s=r.responseType||this.responseType,o=r.body!==void 0?r.body:this.body,a=r.withCredentials!==void 0?r.withCredentials:this.withCredentials,i=r.reportProgress!==void 0?r.reportProgress:this.reportProgress,d=r.headers||this.headers,c=r.params||this.params,y=r.context??this.context;return r.setHeaders!==void 0&&(d=Object.keys(r.setHeaders).reduce((b,f)=>b.set(f,r.setHeaders[f]),d)),r.setParams&&(c=Object.keys(r.setParams).reduce((b,f)=>b.set(f,r.setParams[f]),c)),new e(n,t,o,{params:c,headers:d,context:y,reportProgress:i,responseType:s,withCredentials:a})}},P=function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e}(P||{}),D=class{constructor(r,n=k.Ok,t="OK"){this.headers=r.headers||new v,this.status=r.status!==void 0?r.status:n,this.statusText=r.statusText||t,this.url=r.url||null,this.ok=this.status>=200&&this.status<300}},$=class e extends D{constructor(r={}){super(r),this.type=P.ResponseHeader}clone(r={}){return new e({headers:r.headers||this.headers,status:r.status!==void 0?r.status:this.status,statusText:r.statusText||this.statusText,url:r.url||this.url||void 0})}},O=class e extends D{constructor(r={}){super(r),this.type=P.Response,this.body=r.body!==void 0?r.body:null}clone(r={}){return new e({body:r.body!==void 0?r.body:this.body,headers:r.headers||this.headers,status:r.status!==void 0?r.status:this.status,statusText:r.statusText||this.statusText,url:r.url||this.url||void 0})}},x=class extends D{constructor(r){super(r,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${r.url||"(unknown url)"}`:this.message=`Http failure response for ${r.url||"(unknown url)"}: ${r.status} ${r.statusText}`,this.error=r.error||null}},k=function(e){return e[e.Continue=100]="Continue",e[e.SwitchingProtocols=101]="SwitchingProtocols",e[e.Processing=102]="Processing",e[e.EarlyHints=103]="EarlyHints",e[e.Ok=200]="Ok",e[e.Created=201]="Created",e[e.Accepted=202]="Accepted",e[e.NonAuthoritativeInformation=203]="NonAuthoritativeInformation",e[e.NoContent=204]="NoContent",e[e.ResetContent=205]="ResetContent",e[e.PartialContent=206]="PartialContent",e[e.MultiStatus=207]="MultiStatus",e[e.AlreadyReported=208]="AlreadyReported",e[e.ImUsed=226]="ImUsed",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.Found=302]="Found",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.Unused=306]="Unused",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.LengthRequired=411]="LengthRequired",e[e.PreconditionFailed=412]="PreconditionFailed",e[e.PayloadTooLarge=413]="PayloadTooLarge",e[e.UriTooLong=414]="UriTooLong",e[e.UnsupportedMediaType=415]="UnsupportedMediaType",e[e.RangeNotSatisfiable=416]="RangeNotSatisfiable",e[e.ExpectationFailed=417]="ExpectationFailed",e[e.ImATeapot=418]="ImATeapot",e[e.MisdirectedRequest=421]="MisdirectedRequest",e[e.UnprocessableEntity=422]="UnprocessableEntity",e[e.Locked=423]="Locked",e[e.FailedDependency=424]="FailedDependency",e[e.TooEarly=425]="TooEarly",e[e.UpgradeRequired=426]="UpgradeRequired",e[e.PreconditionRequired=428]="PreconditionRequired",e[e.TooManyRequests=429]="TooManyRequests",e[e.RequestHeaderFieldsTooLarge=431]="RequestHeaderFieldsTooLarge",e[e.UnavailableForLegalReasons=451]="UnavailableForLegalReasons",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout",e[e.HttpVersionNotSupported=505]="HttpVersionNotSupported",e[e.VariantAlsoNegotiates=506]="VariantAlsoNegotiates",e[e.InsufficientStorage=507]="InsufficientStorage",e[e.LoopDetected=508]="LoopDetected",e[e.NotExtended=510]="NotExtended",e[e.NetworkAuthenticationRequired=511]="NetworkAuthenticationRequired",e}(k||{});function B(e,r){return{body:r,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,transferCache:e.transferCache}}var V=(()=>{let r=class r{constructor(t){this.handler=t}request(t,s,o={}){let a;if(t instanceof N)a=t;else{let c;o.headers instanceof v?c=o.headers:c=new v(o.headers);let y;o.params&&(o.params instanceof w?y=o.params:y=new w({fromObject:o.params})),a=new N(t,s,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:y,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache})}let i=L(a).pipe(Z(c=>this.handler.handle(c)));if(t instanceof N||o.observe==="events")return i;let d=i.pipe(Y(c=>c instanceof O));switch(o.observe||"body"){case"body":switch(a.responseType){case"arraybuffer":return d.pipe(R(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return c.body}));case"blob":return d.pipe(R(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new Error("Response is not a Blob.");return c.body}));case"text":return d.pipe(R(c=>{if(c.body!==null&&typeof c.body!="string")throw new Error("Response is not a string.");return c.body}));case"json":default:return d.pipe(R(c=>c.body))}case"response":return d;default:throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)}}delete(t,s={}){return this.request("DELETE",t,s)}get(t,s={}){return this.request("GET",t,s)}head(t,s={}){return this.request("HEAD",t,s)}jsonp(t,s){return this.request("JSONP",t,{params:new w().append(s,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,s={}){return this.request("OPTIONS",t,s)}patch(t,s,o={}){return this.request("PATCH",t,B(o,s))}post(t,s,o={}){return this.request("POST",t,B(o,s))}put(t,s,o={}){return this.request("PUT",t,B(o,s))}};r.\u0275fac=function(s){return new(s||r)(p(A))},r.\u0275prov=T({token:r,factory:r.\u0275fac});let e=r;return e})();function me(e,r){return r(e)}function Me(e,r){return(n,t)=>r.intercept(n,{handle:s=>e(s,t)})}function Ie(e,r,n){return(t,s)=>oe(n,()=>r(t,o=>e(o,s)))}var Oe=new m(""),X=new m(""),xe=new m(""),ke=new m("");function Fe(){let e=null;return(r,n)=>{e===null&&(e=(g(Oe,{optional:!0})??[]).reduceRight(Me,me));let t=g(z),s=t.add();return e(r,n).pipe(U(()=>t.remove(s)))}}var fe=(()=>{let r=class r extends A{constructor(t,s){super(),this.backend=t,this.injector=s,this.chain=null,this.pendingTasks=g(z);let o=g(ke,{optional:!0});this.backend=o??t}handle(t){if(this.chain===null){let o=Array.from(new Set([...this.injector.get(X),...this.injector.get(xe,[])]));this.chain=o.reduceRight((a,i)=>Ie(a,i,this.injector),me)}let s=this.pendingTasks.add();return this.chain(t,o=>this.backend.handle(o)).pipe(U(()=>this.pendingTasks.remove(s)))}};r.\u0275fac=function(s){return new(s||r)(p(I),p(se))},r.\u0275prov=T({token:r,factory:r.\u0275fac});let e=r;return e})();var je=/^\)\]\}',?\n/;function Le(e){return"responseURL"in e&&e.responseURL?e.responseURL:/^X-Request-URL:/m.test(e.getAllResponseHeaders())?e.getResponseHeader("X-Request-URL"):null}var pe=(()=>{let r=class r{constructor(t){this.xhrFactory=t}handle(t){if(t.method==="JSONP")throw new H(-2800,!1);let s=this.xhrFactory;return(s.\u0275loadImpl?C(s.\u0275loadImpl()):L(null)).pipe(Q(()=>new K(a=>{let i=s.build();if(i.open(t.method,t.urlWithParams),t.withCredentials&&(i.withCredentials=!0),t.headers.forEach((l,h)=>i.setRequestHeader(l,h.join(","))),t.headers.has("Accept")||i.setRequestHeader("Accept","application/json, text/plain, */*"),!t.headers.has("Content-Type")){let l=t.detectContentTypeHeader();l!==null&&i.setRequestHeader("Content-Type",l)}if(t.responseType){let l=t.responseType.toLowerCase();i.responseType=l!=="json"?l:"text"}let d=t.serializeBody(),c=null,y=()=>{if(c!==null)return c;let l=i.statusText||"OK",h=new v(i.getAllResponseHeaders()),E=Le(i)||t.url;return c=new $({headers:h,status:i.status,statusText:l,url:E}),c},b=()=>{let{headers:l,status:h,statusText:E,url:G}=y(),u=null;h!==k.NoContent&&(u=typeof i.response>"u"?i.responseText:i.response),h===0&&(h=u?k.Ok:0);let j=h>=200&&h<300;if(t.responseType==="json"&&typeof u=="string"){let ve=u;u=u.replace(je,"");try{u=u!==""?JSON.parse(u):null}catch(be){u=ve,j&&(j=!1,u={error:be,text:u})}}j?(a.next(new O({body:u,headers:l,status:h,statusText:E,url:G||void 0})),a.complete()):a.error(new x({error:u,headers:l,status:h,statusText:E,url:G||void 0}))},f=l=>{let{url:h}=y(),E=new x({error:l,status:i.status||0,statusText:i.statusText||"Unknown Error",url:h||void 0});a.error(E)},J=!1,W=l=>{J||(a.next(y()),J=!0);let h={type:P.DownloadProgress,loaded:l.loaded};l.lengthComputable&&(h.total=l.total),t.responseType==="text"&&i.responseText&&(h.partialText=i.responseText),a.next(h)},q=l=>{let h={type:P.UploadProgress,loaded:l.loaded};l.lengthComputable&&(h.total=l.total),a.next(h)};return i.addEventListener("load",b),i.addEventListener("error",f),i.addEventListener("timeout",f),i.addEventListener("abort",f),t.reportProgress&&(i.addEventListener("progress",W),d!==null&&i.upload&&i.upload.addEventListener("progress",q)),i.send(d),a.next({type:P.Sent}),()=>{i.removeEventListener("error",f),i.removeEventListener("abort",f),i.removeEventListener("load",b),i.removeEventListener("timeout",f),t.reportProgress&&(i.removeEventListener("progress",W),d!==null&&i.upload&&i.upload.removeEventListener("progress",q)),i.readyState!==i.DONE&&i.abort()}})))}};r.\u0275fac=function(s){return new(s||r)(p(ce))},r.\u0275prov=T({token:r,factory:r.\u0275fac});let e=r;return e})(),ge=new m(""),Ue="XSRF-TOKEN",ze=new m("",{providedIn:"root",factory:()=>Ue}),Be="X-XSRF-TOKEN",_e=new m("",{providedIn:"root",factory:()=>Be}),F=class{},Se=(()=>{let r=class r{constructor(t,s,o){this.doc=t,this.platform=s,this.cookieName=o,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if(this.platform==="server")return null;let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=ae(t,this.cookieName),this.lastCookieString=t),this.lastToken}};r.\u0275fac=function(s){return new(s||r)(p(ie),p(te),p(ze))},r.\u0275prov=T({token:r,factory:r.\u0275fac});let e=r;return e})();function $e(e,r){let n=e.url.toLowerCase();if(!g(ge)||e.method==="GET"||e.method==="HEAD"||n.startsWith("http://")||n.startsWith("https://"))return r(e);let t=g(F).getToken(),s=g(_e);return t!=null&&!e.headers.has(s)&&(e=e.clone({headers:e.headers.set(s,t)})),r(e)}var we=function(e){return e[e.Interceptors=0]="Interceptors",e[e.LegacyInterceptors=1]="LegacyInterceptors",e[e.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",e[e.NoXsrfProtection=3]="NoXsrfProtection",e[e.JsonpSupport=4]="JsonpSupport",e[e.RequestsMadeViaParent=5]="RequestsMadeViaParent",e[e.Fetch=6]="Fetch",e}(we||{});function Ve(e,r){return{\u0275kind:e,\u0275providers:r}}function Xe(...e){let r=[V,pe,fe,{provide:A,useExisting:fe},{provide:I,useExisting:pe},{provide:X,useValue:$e,multi:!0},{provide:ge,useValue:!0},{provide:F,useClass:Se}];for(let n of e)r.push(...n.\u0275providers);return ne(r)}var ye=new m("");function Je(){return Ve(we.LegacyInterceptors,[{provide:ye,useFactory:Fe},{provide:X,useExisting:ye,multi:!0}])}var yr=(()=>{let r=class r{};r.\u0275fac=function(s){return new(s||r)},r.\u0275mod=ee({type:r}),r.\u0275inj=re({providers:[Xe(Je())]});let e=r;return e})();function gr(e){let r=new Date(e),n=r.getDate().toString().padStart(2,"0"),t=(r.getMonth()+1).toString().padStart(2,"0"),s=r.getFullYear().toString(),o=`${n}.${t}.${s}`,a=r.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit",hour12:!1});return`${o}, ${a}`}function wr(e){let r=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),t=e.getDate().toString().padStart(2,"0");return`${r}-${n}-${t}`}function Te(e){switch(e){case 0:return"Clear sky";case 1:return"Mainly clear";case 2:return"Partly cloudy";case 3:return"Cloudy";case 45:return"Fog";case 48:return"Depositing rime fog";case 51:return"Light drizzle";case 53:return"Moderate drizzle";case 55:return"Dense drizzle";case 56:return"Light freezing drizzle";case 57:return"Dense freezing drizzle";case 61:return"Slight rain";case 63:return"Moderate rain";case 65:return"Heavy rain";case 66:return"Light freezing rain";case 67:return"Heavy freezing rain";case 71:return"Slight snow fall";case 73:return"Moderate snow fall";case 75:return"Heavy snow fall";case 77:return"Snow grains";case 80:return"Slight rain showers";case 81:return"Moderate rain showers";case 82:return"Heavy rain showers";case 85:return"Slight snow showers";case 86:return"Heavy snow showers";case 95:return"Thunderstorm: Slight or moderate";case 96:return"Thunderstorm with light hail";case 99:return"Thunderstorm with heavy hail";default:return"Unknown"}}var Er=(()=>{let r=class r{constructor(t){this.http=t,this.forecastBaseUrl="https://api.open-meteo.com/v1/forecast",this.historicalBaseUrl="https://archive-api.open-meteo.com/v1/archive",this.mapWeatherCodeToState=Te}getWeatherForecast(t){let s={latitude:51.5074,longitude:-.1278,hourly:"temperature_2m,relative_humidity_2m,pressure_msl,weather_code",past_days:t};return this.http.get(this.forecastBaseUrl,{params:s})}getHistoricalWeather(t,s){let o={latitude:51.5074,longitude:-.1278,start_date:t,end_date:s,hourly:"temperature_2m,relative_humidity_2m,pressure_msl,weather_code"};return this.http.get(this.historicalBaseUrl,{params:o})}};r.\u0275fac=function(s){return new(s||r)(p(V))},r.\u0275prov=T({token:r,factory:r.\u0275fac,providedIn:"root"});let e=r;return e})();export{yr as a,gr as b,wr as c,Te as d,Er as e};
