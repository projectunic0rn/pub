(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{x91E:function(e,t,n){"use strict";n.r(t);n("VRzm"),n("Btvt"),n("OG14");var a=n("o0o1"),r=n.n(a),o=(n("ls82"),n("q1tI")),c=n.n(o),i=n("Wbzz"),l=n("/p1/"),u=n("eZYV"),s=n("p02q"),p=n("YwZP"),v=n("woEc");function m(e,t,n,a,r,o,c){try{var i=e[o](c),l=i.value}catch(u){return void n(u)}i.done?t(l):Promise.resolve(l).then(a,r)}function w(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var o=e.apply(t,n);function c(e){m(o,a,r,c,i,"next",e)}function i(e){m(o,a,r,c,i,"throw",e)}c(void 0)}))}}t.default=function(){var e=Object(o.useState)("Logging in..."),t=e[0],n=e[1],a=Object(u.d)();return c.a.createElement(l.g,null,c.a.createElement(p.Location,null,(function(e){var t,a=e.location;return t=new URLSearchParams(a.search).get("token"),setTimeout(w(r.a.mark((function e(){var a,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t&&null!==t){e.next=3;break}return n("Login token missing."),e.abrupt("return");case 3:return a=s.a.authResolver(),e.prev=4,e.next=7,a.signIn({email:"token",password:t});case 7:(o=e.sent).ok?(v.a.storeJwt(o.data),Object(i.navigate)("/app/projects/")):n(o.data.message),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),n("Invalid credentials");case 14:case"end":return e.stop()}}),e,null,[[4,11]])}))),600),c.a.createElement(c.a.Fragment,null)})),c.a.createElement(l.o,{title:a.title+" - Contact Us",description:"Contact page for "+a.title+" website",urlSlug:"contact/"}),c.a.createElement(l.e,null,c.a.createElement(l.l,null,t),c.a.createElement(l.k,null)))}}}]);
//# sourceMappingURL=component---src-pages-magic-login-tsx-c96c0bee8996cb034aa6.js.map