(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"0mN4":function(e,t,i){"use strict";i("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"9eSz":function(e,t,i){"use strict";i("rGqo"),i("yt8O"),i("Btvt"),i("XfO3"),i("EK0E"),i("INYr"),i("0mN4");var n=i("TqRt");t.__esModule=!0,t.default=void 0;var a,r=n(i("PJYZ")),o=n(i("VbXa")),l=n(i("8OQS")),s=n(i("pVnL")),d=n(i("q1tI")),c=n(i("17x9")),u=function(e){var t=(0,s.default)({},e),i=t.resolutions,n=t.sizes,a=t.critical;return i&&(t.fixed=i,delete t.resolutions),n&&(t.fluid=n,delete t.sizes),a&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(w&&!!window.matchMedia(t).matches)},m=function(e){var t=e.fluid,i=e.fixed;return h(t||i).src},h=function(e){if(w&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t];var i=e.findIndex((function(e){return void 0===e.media}));if(-1!==i)return e[i]}return e[0]},p=Object.create({}),g=function(e){var t=u(e),i=m(t);return p[i]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,w="undefined"!=typeof window,y=w&&window.IntersectionObserver,v=new WeakMap;function x(e){return e.map((function(e){var t=e.src,i=e.srcSet,n=e.srcSetWebp,a=e.media,r=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},n&&d.default.createElement("source",{type:"image/webp",media:a,srcSet:n,sizes:r}),d.default.createElement("source",{media:a,srcSet:i,sizes:r}))}))}function E(e){var t=[],i=[];return e.forEach((function(e){return(e.media?t:i).push(e)})),[].concat(t,i)}function I(e){return e.map((function(e){var t=e.src,i=e.media,n=e.tracedSVG;return d.default.createElement("source",{key:t,media:i,srcSet:n})}))}function _(e){return e.map((function(e){var t=e.src,i=e.media,n=e.base64;return d.default.createElement("source",{key:t,media:i,srcSet:n})}))}function S(e,t){var i=e.srcSet,n=e.srcSetWebp,a=e.media,r=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(a?'media="'+a+'" ':"")+'srcset="'+(t?n:i)+'" '+(r?'sizes="'+r+'" ':"")+"/>"}var k=function(e,t){var i=(void 0===a&&"undefined"!=typeof window&&window.IntersectionObserver&&(a=new window.IntersectionObserver((function(e){e.forEach((function(e){if(v.has(e.target)){var t=v.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(a.unobserve(e.target),v.delete(e.target),t())}}))}),{rootMargin:"200px"})),a);return i&&(i.observe(e),v.set(e,t)),function(){i.unobserve(e),v.delete(e)}},N=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',i=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSet?'srcset="'+e.srcSet+'" ':"",a=e.title?'title="'+e.title+'" ':"",r=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",s=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?S(e,!0):"")+S(e)})).join("")+"<img "+d+o+l+i+n+t+r+a+s+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},C=d.default.forwardRef((function(e,t){var i=e.src,n=e.imageVariants,a=e.generateSources,r=e.spreadProps,o=e.ariaHidden,l=d.default.createElement(L,(0,s.default)({ref:t,src:i},r,{ariaHidden:o}));return n.length>1?d.default.createElement("picture",null,a(n),l):l})),L=d.default.forwardRef((function(e,t){var i=e.sizes,n=e.srcSet,a=e.src,r=e.style,o=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,m=e.ariaHidden,h=(0,l.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return d.default.createElement("img",(0,s.default)({"aria-hidden":m,sizes:i,srcSet:n,src:a},h,{onLoad:o,onError:c,ref:t,loading:u,draggable:f,style:(0,s.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},r)}))}));L.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var z=function(e){function t(t){var i;(i=e.call(this,t)||this).seenBefore=w&&g(t),i.isCritical="eager"===t.loading||t.critical,i.addNoScript=!(i.isCritical&&!t.fadeIn),i.useIOSupport=!b&&y&&!i.isCritical&&!i.seenBefore;var n=i.isCritical||w&&(b||!i.useIOSupport);return i.state={isVisible:n,imgLoaded:!1,imgCached:!1,fadeIn:!i.seenBefore&&t.fadeIn},i.imageRef=d.default.createRef(),i.placeholderRef=t.placeholderRef||d.default.createRef(),i.handleImageLoaded=i.handleImageLoaded.bind((0,r.default)(i)),i.handleRef=i.handleRef.bind((0,r.default)(i)),i}(0,o.default)(t,e);var i=t.prototype;return i.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:g(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},i.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},i.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=k(e,(function(){var e=g(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},i.handleImageLoaded=function(){var e,t,i;e=this.props,t=u(e),i=m(t),p[i]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},i.render=function(){var e=u(this.props),t=e.title,i=e.alt,n=e.className,a=e.style,r=void 0===a?{}:a,o=e.imgStyle,l=void 0===o?{}:o,c=e.placeholderStyle,f=void 0===c?{}:c,m=e.placeholderClassName,p=e.fluid,g=e.fixed,b=e.backgroundColor,w=e.durationFadeIn,y=e.Tag,v=e.itemProp,E=e.loading,S=e.draggable,k=!1===this.state.fadeIn||this.state.imgLoaded,z=!0===this.state.fadeIn&&!this.state.imgCached,O=(0,s.default)({opacity:k?1:0,transition:z?"opacity "+w+"ms":"none"},l),j="boolean"==typeof b?"lightgray":b,R={transitionDelay:w+"ms"},P=(0,s.default)({opacity:this.state.imgLoaded?0:1},z&&R,{},l,{},f),V={title:t,alt:this.state.isVisible?"":i,style:P,className:m,itemProp:v};if(p){var T=p,W=h(p);return d.default.createElement(y,{className:(n||"")+" gatsby-image-wrapper",style:(0,s.default)({position:"relative",overflow:"hidden"},r),ref:this.handleRef,key:"fluid-"+JSON.stringify(W.srcSet)},d.default.createElement(y,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/W.aspectRatio+"%"}}),j&&d.default.createElement(y,{"aria-hidden":!0,title:t,style:(0,s.default)({backgroundColor:j,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},z&&R)}),W.base64&&d.default.createElement(C,{ariaHidden:!0,ref:this.placeholderRef,src:W.base64,spreadProps:V,imageVariants:T,generateSources:_}),W.tracedSVG&&d.default.createElement(C,{ariaHidden:!0,ref:this.placeholderRef,src:W.tracedSVG,spreadProps:V,imageVariants:T,generateSources:I}),this.state.isVisible&&d.default.createElement("picture",null,x(T),d.default.createElement(L,{alt:i,title:t,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:O,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:E,draggable:S})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:N((0,s.default)({alt:i,title:t,loading:E},W,{imageVariants:T}))}}))}if(g){var H=g,G=h(g),q=(0,s.default)({position:"relative",overflow:"hidden",display:"inline-block",width:G.width,height:G.height},r);return"inherit"===r.display&&delete q.display,d.default.createElement(y,{className:(n||"")+" gatsby-image-wrapper",style:q,ref:this.handleRef,key:"fixed-"+JSON.stringify(G.srcSet)},j&&d.default.createElement(y,{"aria-hidden":!0,title:t,style:(0,s.default)({backgroundColor:j,width:G.width,opacity:this.state.imgLoaded?0:1,height:G.height},z&&R)}),G.base64&&d.default.createElement(C,{ariaHidden:!0,ref:this.placeholderRef,src:G.base64,spreadProps:V,imageVariants:H,generateSources:_}),G.tracedSVG&&d.default.createElement(C,{ariaHidden:!0,ref:this.placeholderRef,src:G.tracedSVG,spreadProps:V,imageVariants:H,generateSources:I}),this.state.isVisible&&d.default.createElement("picture",null,x(H),d.default.createElement(L,{alt:i,title:t,width:G.width,height:G.height,sizes:G.sizes,src:G.src,crossOrigin:this.props.crossOrigin,srcSet:G.srcSet,style:O,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:E,draggable:S})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:N((0,s.default)({alt:i,title:t,loading:E},G,{imageVariants:H}))}}))}return null},t}(d.default.Component);z.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var O=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),j=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});z.propTypes={resolutions:O,sizes:j,fixed:c.default.oneOfType([O,c.default.arrayOf(O)]),fluid:c.default.oneOfType([j,c.default.arrayOf(j)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var R=z;t.default=R},INYr:function(e,t,i){"use strict";var n=i("XKFU"),a=i("CkkT")(6),r="findIndex",o=!0;r in[]&&Array(1)[r]((function(){o=!1})),n(n.P+n.F*o,"Array",{findIndex:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),i("nGyu")(r)},KcTm:function(e,t,i){"use strict";i.d(t,"a",(function(){return c})),i.d(t,"b",(function(){return h})),i.d(t,"e",(function(){return w})),i.d(t,"f",(function(){return S})),i.d(t,"j",(function(){return z})),i.d(t,"c",(function(){return H})),i.d(t,"d",(function(){return q})),i.d(t,"g",(function(){return U})),i.d(t,"h",(function(){return Z})),i.d(t,"i",(function(){return ee}));i("f3/d");var n=i("q1tI"),a=i.n(n),r=i("vOnD"),o=i("/p1/"),l=r.c.div.withConfig({displayName:"author-meta__Wrapper",componentId:"sc-1h799e6-0"})(["display:flex;flex-direction:column;align-items:center;margin-bottom:2em;svg{width:1em;font-size:24px;& path{transition:0.2s;fill:",";opacity:0.7;}@media (hover:hover){&:hover path{fill:",";opacity:1;}}}"],(function(e){return e.theme.colors.text}),(function(e){return e.theme.colors.highlight})),s=r.c.div.withConfig({displayName:"author-meta__SocialAccounts",componentId:"sc-1h799e6-1"})(["display:flex;"]),d=r.c.h2.withConfig({displayName:"author-meta__Name",componentId:"sc-1h799e6-2"})(["margin:1em 0 0.5em;"]),c=function(e){var t=e.author,i=t.avatar,n=t.name,r=t.bio,c=t.github,u=t.twitter;return a.a.createElement(l,null,i&&a.a.createElement(h,{fluid:i.childImageSharp.fluid,alt:"",title:n,alignment:"vertical"}),a.a.createElement(d,null,n),a.a.createElement("p",null,r),a.a.createElement(s,null,a.a.createElement(o.o,{link:!0,socialName:"github",href:"https://github.com/"+c,title:n+" on GitHub"}),u&&a.a.createElement(o.o,{link:!0,socialName:"twitter",href:"https://twitter.com/"+u,title:n+" on Twitter"})))},u=(i("rGqo"),i("yt8O"),i("Btvt"),i("RW0V"),i("91GP"),i("9eSz")),f=i.n(u);var m=Object(r.c)(f.a).attrs((function(){return{small:!1}})).withConfig({displayName:"avatar__Image",componentId:"sc-1j62m5n-0"})(["min-height:4em;max-height:4em;min-width:4em;max-width:4em;border-radius:50%;margin-right:",";"],(function(e){return"horizontal"===e.alignment?"1.6em":0})),h=function(e){var t=e.alignment,i=void 0===t?"horizontal":t,n=function(e,t){if(null==e)return{};var i,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||(a[i]=e[i]);return a}(e,["alignment"]);return a.a.createElement(m,Object.assign({alignment:i},n))},p=(i("84bF"),r.c.section.withConfig({displayName:"hero__Wrapper",componentId:"sc-6u66w2-0"})(["position:relative;min-height:300px;"])),g=Object(r.c)(f.a).withConfig({displayName:"hero__BgImg",componentId:"sc-6u66w2-1"})(["position:absolute;top:0;left:0;width:100%;z-index:-1;min-height:300px;height:auto;@media (min-width:","){height:",";}& > img{object-fit:"," !important;object-position:"," !important;}&::before{content:'';background:rgba(0,0,0,0.25);position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;z-index:1;}"],(function(e){return e.theme.responsive.small}),(function(e){return e.height||"auto"}),(function(e){return e.fit||"cover"}),(function(e){return e.position||"50% 50%"})),b=r.c.h1.withConfig({displayName:"hero__Title",componentId:"sc-6u66w2-2"})(["font-size:3em;text-transform:capitalize;font-weight:600;position:absolute;width:100%;max-width:",";padding:0 1rem;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:white;margin-top:0;"],(function(e){return e.theme.sizes.width.maxCentered})),w=function(e){var t=e.height,i=e.fluid,n=e.title;return a.a.createElement(p,null,a.a.createElement(g,{height:t,fluid:i,backgroundColor:"#eeeeee",title:n,alt:""}),a.a.createElement(b,null,n))},y=i("Wbzz"),v=i("eZYV"),x=r.c.div.withConfig({displayName:"pagination__Wrapper",componentId:"sc-1atbv3i-0"})(["position:relative;display:flex;justify-content:space-between;margin:-2em auto 0;width:100%;max-width:",";padding:0 1.5em 2em;a{background:transparent;color:",";padding:1em 0.8em;border-color:",";border-radius:2px;text-decoration:none;transition:0.2s;@media (hover:hover){&:hover{background:",";color:white;}}}"],(function(e){return e.theme.sizes.width.max}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight}),(function(e){return e.theme.colors.highlight})),E=Object(r.c)(y.Link).withConfig({displayName:"pagination__PreviousLink",componentId:"sc-1atbv3i-1"})(["margin-right:auto;order:1;"]),I=Object(r.c)(y.Link).withConfig({displayName:"pagination__NextLink",componentId:"sc-1atbv3i-2"})(["margin-left:auto;order:3;"]),_=r.c.span.withConfig({displayName:"pagination__PageIndicator",componentId:"sc-1atbv3i-3"})(["color:",";position:absolute;left:0;right:0;width:100%;text-align:center;padding:1em 1.5em;z-index:-1;opacity:0.7;"],(function(e){return e.theme.colors.text})),S=function(e){var t=e.context,i=e.prefix,n=Object(v.d)(),r=t.numPages,o=t.currentPage,l=void 0===o?1:o,s=1===l,d=l===r,c=s&&d,u=l-1==1?"":l-1,f=l+1,m=i?"/"+i+"/":"/",h=s?null:""+m+u+"/",p=d?null:""+m+f+"/";return a.a.createElement(x,null,!s&&h&&a.a.createElement(E,{to:h,title:n.title+" blog page "+u},"← Prev Page"),!c&&a.a.createElement(_,null,l,"/",r),!d&&p&&a.a.createElement(I,{to:p,title:n.title+" blog page "+f},"Next Page →"))},k=(i("pIFo"),i("0lfv")),N=r.c.div.withConfig({displayName:"share__Wrapper",componentId:"sc-1o4rs90-0"})(["display:flex;flex-direction:column;align-items:center;"]),C=r.c.div.withConfig({displayName:"share__List",componentId:"sc-1o4rs90-1"})(["max-width:",";display:flex;flex-direction:row;margin:0 auto 1em auto;svg{path{transition:0.2s;fill:",";opacity:0.7;}}@media (hover:hover){& a:hover{cursor:pointer;svg{path{fill:",";opacity:1;}}}}"],(function(e){return e.theme.sizes.width.maxCentered}),(function(e){return e.theme.colors.text}),(function(e){return e.theme.colors.highlight})),L=r.c.p.withConfig({displayName:"share__Label",componentId:"sc-1o4rs90-2"})(["font-weight:800;"]),z=function(e){var t=e.post,i=Object(v.d)(),n=i.social,r=i.siteUrl,l=n.twitter.replace("@",""),s=r+"/blog/"+t.slug;return a.a.createElement(N,null,a.a.createElement(L,null,"Share this post"),a.a.createElement(C,null,a.a.createElement(o.o,{link:!0,socialName:"facebook",title:'Share "'+t.title+'" on Facebook',href:Object(k.e)("facebook",{u:s})}),a.a.createElement(o.o,{link:!0,socialName:"twitter",title:'Share "'+t.title+'" on Twitter',href:Object(k.e)("twitter",{text:t.title,url:s,via:l})}),a.a.createElement(o.o,{link:!0,socialName:"linkedin",title:'Share "'+t.title+'" on LinkedIn',href:Object(k.e)("linkedin",{url:s})}),a.a.createElement(o.o,{link:!0,socialName:"reddit",title:'Share "'+t.title+'" on Reddit',href:Object(k.e)("reddit",{url:s})})))},O=r.c.li.withConfig({displayName:"card__Post",componentId:"sc-19k4708-0"})(["position:relative;border-radius:0.3125em;width:100%;transition:0.2s;@media screen and (min-width:","){flex:",";margin:0 0 2vw 0;}@media screen and (min-width:","){flex:",";}a{display:flex;flex-flow:column;height:100%;width:100%;color:",";text-decoration:none;h2{transition:color 0.2s;}@media (hover:hover){&:hover{color:",";h2{color:",";}}}.gatsby-image-wrapper{height:0;padding-bottom:60%;@media screen and (min-width:","){padding-bottom:",";}}}"],(function(e){return e.theme.responsive.small}),(function(e){return e.featured?"0 0 100%":"0 0 49%"}),(function(e){return e.theme.responsive.medium}),(function(e){return e.featured?"0 0 100%":"0 0 32%"}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight}),(function(e){return e.theme.responsive.small}),(function(e){return e.featured?"40%":"60%"})),j=Object(r.c)(y.Link).withConfig({displayName:"card__StyledLink",componentId:"sc-19k4708-1"})(["background-image:none;"]),R=Object(r.c)(f.a).withConfig({displayName:"card__StyledImg",componentId:"sc-19k4708-2"})(["border-radius:0.375em;"]),P=r.c.div.withConfig({displayName:"card__Text",componentId:"sc-19k4708-3"})(["margin:0;padding:1em;"]),V=r.c.h2.withConfig({displayName:"card__Title",componentId:"sc-19k4708-4"})(["text-transform:capitalize;margin:0.5em 0 1em;"]),T=r.c.p.withConfig({displayName:"card__Date",componentId:"sc-19k4708-5"})(["margin:0 0 0.5em 0;color:",";"],(function(e){return e.theme.colors.text})),W=r.c.p.withConfig({displayName:"card__Excerpt",componentId:"sc-19k4708-6"})(["color:",";"],(function(e){return e.theme.colors.text})),H=function(e){var t=e.slug,i=e.title,n=e.publishDate,r=e.excerpt,o=e.featured,l=void 0!==o&&o,s=e.fluid;return a.a.createElement(O,{featured:l},a.a.createElement(j,{to:"/blog/"+t+"/",title:i},a.a.createElement(R,{fluid:s,backgroundColor:"#eeeeee",title:i,alt:""}),a.a.createElement(P,null,a.a.createElement(V,null,i),a.a.createElement(T,null,n),a.a.createElement(W,{dangerouslySetInnerHTML:{__html:r}}))))},G=r.c.ul.withConfig({displayName:"card-list__List",componentId:"sc-14di3yx-0"})(["list-style:none;display:flex;flex-flow:row wrap;justify-content:space-between;margin:0 auto;&::after{content:'';flex:0 0 32%;}"]),q=function(e){var t=e.children;return a.a.createElement(G,null,t)},B=r.c.div.withConfig({displayName:"post-links__Wrapper",componentId:"th262h-0"})(["margin:-2em 0 0 0;padding:0 1.5em 2em;"]),F=r.c.div.withConfig({displayName:"post-links__Box",componentId:"th262h-1"})(["display:flex;justify-content:space-between;margin:0 auto;width:100%;max-width:",";a{background:transparent;color:",";padding:1em;border-radius:0.3125em;text-decoration:none;transition:0.2s;@media (hover:hover){&:hover{background:",";color:white;}}}"],(function(e){return e.theme.sizes.width.maxCentered}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight})),M=Object(r.c)(y.Link).withConfig({displayName:"post-links__PreviousLink",componentId:"th262h-2"})(["margin-right:auto;order:1;"]),A=Object(r.c)(y.Link).withConfig({displayName:"post-links__NextLink",componentId:"th262h-3"})(["margin-left:auto;order:2;"]),U=function(e){var t=e.prefix,i=e.previous,n=e.next,r=t?t+"/":"";return a.a.createElement(B,null,a.a.createElement(F,null,i&&a.a.createElement(M,{to:"/"+r+i.fields.slug+"/",title:i.frontmatter.title},"← Prev Post"),n&&a.a.createElement(A,{to:"/"+r+n.fields.slug+"/",title:n.frontmatter.title},"Next Post →")))},D=r.c.div.withConfig({displayName:"post-meta__Wrapper",componentId:"uaozvw-0"})(["margin:0 auto 2.4em;max-width:",";display:flex;justify-content:center;align-items:center;"],(function(e){return e.theme.sizes.width.maxCentered})),J=r.c.div.withConfig({displayName:"post-meta__Body",componentId:"uaozvw-1"})(["flex:1;color:",";"],(function(e){return e.theme.colors.text})),Y=r.c.header.withConfig({displayName:"post-meta__Header",componentId:"uaozvw-2"})(["display:inline-flex;a{color:",";display:inline-flex;align-items:center;}svg{width:1em;font-size:24px;& path{transition:0.2s;fill:",";opacity:0.7;}@media (hover:hover){&:hover path{fill:",";opacity:1;}}}"],(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.text}),(function(e){return e.theme.colors.highlight})),K=Object(r.c)(y.Link).withConfig({displayName:"post-meta__AuthorLink",componentId:"uaozvw-3"})(["font-weight:600;font-size:1.2em;margin:0 0.8em 0 0;text-decoration:none;display:inline-block;transition:0.2s;background-image:none;&&{color:",";&:hover{color:",";}}"],(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight})),X=r.c.p.withConfig({displayName:"post-meta__Bio",componentId:"uaozvw-4"})(["margin:0;"]),Z=function(e){var t=e.date,i=e.author,n=i.avatar,r=i.bio,l=i.id,s=i.name,d=i.github,c=i.twitter;return a.a.createElement(D,null,n&&a.a.createElement(h,{fluid:n.childImageSharp.fluid,alt:"",title:s}),a.a.createElement(J,null,a.a.createElement(Y,null,a.a.createElement(K,{to:"/blog/author/"+l,title:"Posts by "+s},s),a.a.createElement(o.o,{link:!0,socialName:"github",href:"https://github.com/"+d,title:s+" on GitHub"}),c&&a.a.createElement(o.o,{link:!0,socialName:"twitter",href:"https://twitter.com/"+c,title:s+" on Twitter"})),a.a.createElement(X,null,r),"Published on ",t))},Q=r.c.ul.withConfig({displayName:"post-tags__List",componentId:"sc-1blc8xz-0"})(["width:100%;margin:0 auto 1em auto;max-width:",";"],(function(e){return e.theme.sizes.width.maxCentered})),$=r.c.li.withConfig({displayName:"post-tags__Tag",componentId:"sc-1blc8xz-1"})(["display:inline-block;margin:0 0.25em 0.25em 0;a{float:left;font-size:0.8em;transition:0.2s;background:",";padding:0.5em;border-radius:2px;text-transform:capitalize;text-decoration:none;color:",";border:1px solid ",";@media (hover:hover){&:hover{background:",";color:",";}}}"],(function(e){return e.theme.colors.tertiary}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.base})),ee=function(e){var t=e.tags;return a.a.createElement(Q,null,t.map((function(e){return a.a.createElement($,{key:e},a.a.createElement(y.Link,{to:"/blog/tag/"+Object(k.g)(e)+"/",title:"Posts tagged with "+e},e))})))}}}]);
//# sourceMappingURL=e402457ede973269b08bf4da3574509943fe710c-7f6f65872ec7c9df95e3.js.map