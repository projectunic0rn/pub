(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"+kg1":function(e,t,i){"use strict";i.r(t),i.d(t,"pageQuery",(function(){return d}));i("f3/d");var a=i("q1tI"),n=i.n(a),r=i("KcTm"),o=i("/p1/"),l=i("eZYV"),d="1036689229";t.default=function(e){var t=e.data,i=e.pageContext,a=Object(l.a)(),d=Object(l.b)(),s=Object(l.d)(),c=t.markdownRemark,u=c.excerpt,m=c.frontmatter,f=c.fields,h=m.title,p=m.tags,g=m.date,b=m.author,w=m.image,v=i.previous,y=i.next,x=f.slug;return b.avatar||(b.avatar={childImageSharp:a.childImageSharp}),n.a.createElement(o.e,null,n.a.createElement(o.k,{title:h,description:c.excerpt,twitter:b.twitter,author:b.name,urlSlug:"blog/"+x+"/",image:s.siteUrl+w.childImageSharp.fluid.src,pageType:"article",publishedAt:new Date(g).toISOString(),keywords:p}),n.a.createElement(r.e,{title:h,fluid:w?w.childImageSharp.fluid:d.childImageSharp.fluid,height:"50vh"}),n.a.createElement(o.b,null,n.a.createElement(r.h,{date:g,author:b}),n.a.createElement(o.i,{body:c.html}),p&&n.a.createElement(r.i,{tags:p}),n.a.createElement(r.j,{post:{title:h,slug:x,excerpt:u}})),n.a.createElement(r.g,{prefix:"blog",previous:v,next:y}))}},"0mN4":function(e,t,i){"use strict";i("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"9eSz":function(e,t,i){"use strict";i("rGqo"),i("yt8O"),i("Btvt"),i("XfO3"),i("EK0E"),i("INYr"),i("0mN4");var a=i("TqRt");t.__esModule=!0,t.default=void 0;var n,r=a(i("PJYZ")),o=a(i("VbXa")),l=a(i("8OQS")),d=a(i("pVnL")),s=a(i("q1tI")),c=a(i("17x9")),u=function(e){var t=(0,d.default)({},e),i=t.resolutions,a=t.sizes,n=t.critical;return i&&(t.fixed=i,delete t.resolutions),a&&(t.fluid=a,delete t.sizes),n&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},m=function(e){var t=e.media;return!!t&&(w&&!!window.matchMedia(t).matches)},f=function(e){var t=e.fluid,i=e.fixed;return h(t||i).src},h=function(e){if(w&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(m);if(-1!==t)return e[t]}return e[0]},p=Object.create({}),g=function(e){var t=u(e),i=f(t);return p[i]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,w="undefined"!=typeof window,v=w&&window.IntersectionObserver,y=new WeakMap;function x(e){return e.map((function(e){var t=e.src,i=e.srcSet,a=e.srcSetWebp,n=e.media,r=e.sizes;return s.default.createElement(s.default.Fragment,{key:t},a&&s.default.createElement("source",{type:"image/webp",media:n,srcSet:a,sizes:r}),s.default.createElement("source",{media:n,srcSet:i,sizes:r}))}))}function E(e){var t=[],i=[];return e.forEach((function(e){return(e.media?t:i).push(e)})),[].concat(t,i)}function I(e){return e.map((function(e){var t=e.src,i=e.media,a=e.tracedSVG;return s.default.createElement("source",{key:t,media:i,srcSet:a})}))}function S(e){return e.map((function(e){var t=e.src,i=e.media,a=e.base64;return s.default.createElement("source",{key:t,media:i,srcSet:a})}))}function _(e,t){var i=e.srcSet,a=e.srcSetWebp,n=e.media,r=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(n?'media="'+n+'" ':"")+'srcset="'+(t?a:i)+'" '+(r?'sizes="'+r+'" ':"")+"/>"}var k=function(e,t){var i=(void 0===n&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=new window.IntersectionObserver((function(e){e.forEach((function(e){if(y.has(e.target)){var t=y.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(n.unobserve(e.target),y.delete(e.target),t())}}))}),{rootMargin:"200px"})),n);return i&&(i.observe(e),y.set(e,t)),function(){i.unobserve(e),y.delete(e)}},N=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',i=e.sizes?'sizes="'+e.sizes+'" ':"",a=e.srcSet?'srcset="'+e.srcSet+'" ':"",n=e.title?'title="'+e.title+'" ':"",r=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",d=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",s=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?_(e,!0):"")+_(e)})).join("")+"<img "+s+o+l+i+a+t+r+n+d+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},C=function(e){var t=e.src,i=e.imageVariants,a=e.generateSources,n=e.spreadProps,r=e.ariaHidden,o=s.default.createElement(L,(0,d.default)({src:t},n,{ariaHidden:r}));return i.length>1?s.default.createElement("picture",null,a(i),o):o},L=s.default.forwardRef((function(e,t){var i=e.sizes,a=e.srcSet,n=e.src,r=e.style,o=e.onLoad,c=e.onError,u=e.loading,m=e.draggable,f=e.ariaHidden,h=(0,l.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return s.default.createElement("img",(0,d.default)({"aria-hidden":f,sizes:i,srcSet:a,src:n},h,{onLoad:o,onError:c,ref:t,loading:u,draggable:m,style:(0,d.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},r)}))}));L.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var O=function(e){function t(t){var i;(i=e.call(this,t)||this).seenBefore=w&&g(t),i.isCritical="eager"===t.loading||t.critical,i.addNoScript=!(i.isCritical&&!t.fadeIn),i.useIOSupport=!b&&v&&!i.isCritical&&!i.seenBefore;var a=i.isCritical||w&&(b||!i.useIOSupport);return i.state={isVisible:a,imgLoaded:!1,imgCached:!1,fadeIn:!i.seenBefore&&t.fadeIn},i.imageRef=s.default.createRef(),i.handleImageLoaded=i.handleImageLoaded.bind((0,r.default)(i)),i.handleRef=i.handleRef.bind((0,r.default)(i)),i}(0,o.default)(t,e);var i=t.prototype;return i.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:g(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},i.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},i.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=k(e,(function(){var e=g(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})}))})))},i.handleImageLoaded=function(){var e,t,i;e=this.props,t=u(e),i=f(t),p[i]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},i.render=function(){var e=u(this.props),t=e.title,i=e.alt,a=e.className,n=e.style,r=void 0===n?{}:n,o=e.imgStyle,l=void 0===o?{}:o,c=e.placeholderStyle,m=void 0===c?{}:c,f=e.placeholderClassName,p=e.fluid,g=e.fixed,b=e.backgroundColor,w=e.durationFadeIn,v=e.Tag,y=e.itemProp,E=e.loading,_=e.draggable,k=!1===this.state.fadeIn||this.state.imgLoaded,O=!0===this.state.fadeIn&&!this.state.imgCached,z=(0,d.default)({opacity:k?1:0,transition:O?"opacity "+w+"ms":"none"},l),j="boolean"==typeof b?"lightgray":b,P={transitionDelay:w+"ms"},R=(0,d.default)({opacity:this.state.imgLoaded?0:1},O&&P,{},l,{},m),T={title:t,alt:this.state.isVisible?"":i,style:R,className:f,itemProp:y};if(p){var V=p,W=h(p);return s.default.createElement(v,{className:(a||"")+" gatsby-image-wrapper",style:(0,d.default)({position:"relative",overflow:"hidden"},r),ref:this.handleRef,key:"fluid-"+JSON.stringify(W.srcSet)},s.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/W.aspectRatio+"%"}}),j&&s.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,d.default)({backgroundColor:j,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},O&&P)}),W.base64&&s.default.createElement(C,{ariaHidden:!0,src:W.base64,spreadProps:T,imageVariants:V,generateSources:S}),W.tracedSVG&&s.default.createElement(C,{ariaHidden:!0,src:W.tracedSVG,spreadProps:T,imageVariants:V,generateSources:I}),this.state.isVisible&&s.default.createElement("picture",null,x(V),s.default.createElement(L,{alt:i,title:t,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:z,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:y,loading:E,draggable:_})),this.addNoScript&&s.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:N((0,d.default)({alt:i,title:t,loading:E},W,{imageVariants:V}))}}))}if(g){var H=g,q=h(g),G=(0,d.default)({position:"relative",overflow:"hidden",display:"inline-block",width:q.width,height:q.height},r);return"inherit"===r.display&&delete G.display,s.default.createElement(v,{className:(a||"")+" gatsby-image-wrapper",style:G,ref:this.handleRef,key:"fixed-"+JSON.stringify(q.srcSet)},j&&s.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,d.default)({backgroundColor:j,width:q.width,opacity:this.state.imgLoaded?0:1,height:q.height},O&&P)}),q.base64&&s.default.createElement(C,{ariaHidden:!0,src:q.base64,spreadProps:T,imageVariants:H,generateSources:S}),q.tracedSVG&&s.default.createElement(C,{ariaHidden:!0,src:q.tracedSVG,spreadProps:T,imageVariants:H,generateSources:I}),this.state.isVisible&&s.default.createElement("picture",null,x(H),s.default.createElement(L,{alt:i,title:t,width:q.width,height:q.height,sizes:q.sizes,src:q.src,crossOrigin:this.props.crossOrigin,srcSet:q.srcSet,style:z,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:y,loading:E,draggable:_})),this.addNoScript&&s.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:N((0,d.default)({alt:i,title:t,loading:E},q,{imageVariants:H}))}}))}return null},t}(s.default.Component);O.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var z=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),j=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});O.propTypes={resolutions:z,sizes:j,fixed:c.default.oneOfType([z,c.default.arrayOf(z)]),fluid:c.default.oneOfType([j,c.default.arrayOf(j)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var P=O;t.default=P},INYr:function(e,t,i){"use strict";var a=i("XKFU"),n=i("CkkT")(6),r="findIndex",o=!0;r in[]&&Array(1)[r]((function(){o=!1})),a(a.P+a.F*o,"Array",{findIndex:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),i("nGyu")(r)},KcTm:function(e,t,i){"use strict";i("f3/d");var a=i("q1tI"),n=i.n(a),r=i("vOnD"),o=i("/p1/"),l=r.d.div.withConfig({displayName:"author-meta__Wrapper",componentId:"sc-1h799e6-0"})(["display:flex;flex-direction:column;align-items:center;margin-bottom:2em;svg{width:1em;font-size:24px;& path{transition:0.2s;fill:",";opacity:0.7;}@media (hover:hover){&:hover path{fill:",";opacity:1;}}}"],(function(e){return e.theme.colors.text}),(function(e){return e.theme.colors.highlight})),d=r.d.div.withConfig({displayName:"author-meta__SocialAccounts",componentId:"sc-1h799e6-1"})(["display:flex;"]),s=r.d.h2.withConfig({displayName:"author-meta__Name",componentId:"sc-1h799e6-2"})(["margin:1em 0 0.5em;"]),c=function(e){var t=e.author,i=t.avatar,a=t.name,r=t.bio,c=t.github,u=t.twitter;return n.a.createElement(l,null,i&&n.a.createElement(h,{fluid:i.childImageSharp.fluid,alt:"",title:a,alignment:"vertical"}),n.a.createElement(s,null,a),n.a.createElement("p",null,r),n.a.createElement(d,null,n.a.createElement(o.n,{link:!0,socialName:"github",href:"https://github.com/"+c,title:a+" on GitHub"}),u&&n.a.createElement(o.n,{link:!0,socialName:"twitter",href:"https://twitter.com/"+u,title:a+" on Twitter"})))},u=(i("rGqo"),i("yt8O"),i("Btvt"),i("RW0V"),i("91GP"),i("9eSz")),m=i.n(u);var f=Object(r.d)(m.a).attrs((function(){return{small:!1}})).withConfig({displayName:"avatar__Image",componentId:"sc-1j62m5n-0"})(["min-height:4em;max-height:4em;min-width:4em;max-width:4em;border-radius:50%;margin-right:",";"],(function(e){return"horizontal"===e.alignment?"1.6em":0})),h=function(e){var t=e.alignment,i=void 0===t?"horizontal":t,a=function(e,t){if(null==e)return{};var i,a,n={},r=Object.keys(e);for(a=0;a<r.length;a++)i=r[a],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,["alignment"]);return n.a.createElement(f,Object.assign({alignment:i},a))},p=(i("84bF"),r.d.section.withConfig({displayName:"hero__Wrapper",componentId:"sc-6u66w2-0"})(["position:relative;min-height:300px;"])),g=Object(r.d)(m.a).withConfig({displayName:"hero__BgImg",componentId:"sc-6u66w2-1"})(["position:absolute;top:0;left:0;width:100%;z-index:-1;min-height:300px;height:auto;@media (min-width:","){height:",";}& > img{object-fit:"," !important;object-position:"," !important;}&::before{content:'';background:rgba(0,0,0,0.25);position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;z-index:1;}"],(function(e){return e.theme.responsive.small}),(function(e){return e.height||"auto"}),(function(e){return e.fit||"cover"}),(function(e){return e.position||"50% 50%"})),b=r.d.h1.withConfig({displayName:"hero__Title",componentId:"sc-6u66w2-2"})(["font-size:3em;text-transform:capitalize;font-weight:600;position:absolute;width:100%;max-width:",";padding:0 1rem;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:white;margin-top:0;"],(function(e){return e.theme.sizes.width.maxCentered})),w=function(e){var t=e.height,i=e.fluid,a=e.title;return n.a.createElement(p,null,n.a.createElement(g,{height:t,fluid:i,backgroundColor:"#eeeeee",title:a,alt:""}),n.a.createElement(b,null,a))},v=i("Wbzz"),y=i("eZYV"),x=r.d.div.withConfig({displayName:"pagination__Wrapper",componentId:"sc-1atbv3i-0"})(["position:relative;display:flex;justify-content:space-between;margin:-2em auto 0;width:100%;max-width:",";padding:0 1.5em 2em;a{background:transparent;color:",";padding:1em 0.8em;border-color:",";border-radius:2px;text-decoration:none;transition:0.2s;@media (hover:hover){&:hover{background:",";color:white;}}}"],(function(e){return e.theme.sizes.width.max}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight}),(function(e){return e.theme.colors.highlight})),E=Object(r.d)(v.Link).withConfig({displayName:"pagination__PreviousLink",componentId:"sc-1atbv3i-1"})(["margin-right:auto;order:1;"]),I=Object(r.d)(v.Link).withConfig({displayName:"pagination__NextLink",componentId:"sc-1atbv3i-2"})(["margin-left:auto;order:3;"]),S=r.d.span.withConfig({displayName:"pagination__PageIndicator",componentId:"sc-1atbv3i-3"})(["color:",";position:absolute;left:0;right:0;width:100%;text-align:center;padding:1em 1.5em;z-index:-1;opacity:0.7;"],(function(e){return e.theme.colors.text})),_=function(e){var t=e.context,i=e.prefix,a=Object(y.d)(),r=t.numPages,o=t.currentPage,l=void 0===o?1:o,d=1===l,s=l===r,c=d&&s,u=l-1==1?"":l-1,m=l+1,f=i?"/"+i+"/":"/",h=d?null:""+f+u+"/",p=s?null:""+f+m+"/";return n.a.createElement(x,null,!d&&h&&n.a.createElement(E,{to:h,title:a.title+" blog page "+u},"← Prev Page"),!c&&n.a.createElement(S,null,l,"/",r),!s&&p&&n.a.createElement(I,{to:p,title:a.title+" blog page "+m},"Next Page →"))},k=(i("pIFo"),i("0lfv")),N=r.d.div.withConfig({displayName:"share__Wrapper",componentId:"sc-1o4rs90-0"})(["display:flex;flex-direction:column;align-items:center;"]),C=r.d.div.withConfig({displayName:"share__List",componentId:"sc-1o4rs90-1"})(["max-width:",";display:flex;flex-direction:row;margin:0 auto 1em auto;svg{path{transition:0.2s;fill:",";opacity:0.7;}}@media (hover:hover){& a:hover{cursor:pointer;svg{path{fill:",";opacity:1;}}}}"],(function(e){return e.theme.sizes.width.maxCentered}),(function(e){return e.theme.colors.text}),(function(e){return e.theme.colors.highlight})),L=r.d.p.withConfig({displayName:"share__Label",componentId:"sc-1o4rs90-2"})(["font-weight:800;"]),O=function(e){var t=e.post,i=Object(y.d)(),a=i.social,r=i.siteUrl,l=a.twitter.replace("@",""),d=r+"/blog/"+t.slug;return n.a.createElement(N,null,n.a.createElement(L,null,"Share this post"),n.a.createElement(C,null,n.a.createElement(o.n,{link:!0,socialName:"facebook",title:'Share "'+t.title+'" on Facebook',href:Object(k.c)("facebook",{u:d})}),n.a.createElement(o.n,{link:!0,socialName:"twitter",title:'Share "'+t.title+'" on Twitter',href:Object(k.c)("twitter",{text:t.title,url:d,via:l})}),n.a.createElement(o.n,{link:!0,socialName:"linkedin",title:'Share "'+t.title+'" on LinkedIn',href:Object(k.c)("linkedin",{url:d})}),n.a.createElement(o.n,{link:!0,socialName:"reddit",title:'Share "'+t.title+'" on Reddit',href:Object(k.c)("reddit",{url:d})})))},z=r.d.li.withConfig({displayName:"card__Post",componentId:"sc-19k4708-0"})(["position:relative;border-radius:0.3125em;width:100%;transition:0.2s;@media screen and (min-width:","){flex:",";margin:0 0 2vw 0;}@media screen and (min-width:","){flex:",";}a{display:flex;flex-flow:column;height:100%;width:100%;color:",";text-decoration:none;h2{transition:color 0.2s;}@media (hover:hover){&:hover{color:",";h2{color:",";}}}.gatsby-image-wrapper{height:0;padding-bottom:60%;@media screen and (min-width:","){padding-bottom:",";}}}"],(function(e){return e.theme.responsive.small}),(function(e){return e.featured?"0 0 100%":"0 0 49%"}),(function(e){return e.theme.responsive.medium}),(function(e){return e.featured?"0 0 100%":"0 0 32%"}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight}),(function(e){return e.theme.responsive.small}),(function(e){return e.featured?"40%":"60%"})),j=Object(r.d)(v.Link).withConfig({displayName:"card__StyledLink",componentId:"sc-19k4708-1"})(["background-image:none;"]),P=Object(r.d)(m.a).withConfig({displayName:"card__StyledImg",componentId:"sc-19k4708-2"})(["border-radius:0.375em;"]),R=r.d.div.withConfig({displayName:"card__Text",componentId:"sc-19k4708-3"})(["margin:0;padding:1em;"]),T=r.d.h2.withConfig({displayName:"card__Title",componentId:"sc-19k4708-4"})(["text-transform:capitalize;margin:0.5em 0 1em;"]),V=r.d.p.withConfig({displayName:"card__Date",componentId:"sc-19k4708-5"})(["margin:0 0 0.5em 0;color:",";"],(function(e){return e.theme.colors.text})),W=r.d.p.withConfig({displayName:"card__Excerpt",componentId:"sc-19k4708-6"})(["color:",";"],(function(e){return e.theme.colors.text})),H=function(e){var t=e.slug,i=e.title,a=e.publishDate,r=e.excerpt,o=e.featured,l=void 0!==o&&o,d=e.fluid;return n.a.createElement(z,{featured:l},n.a.createElement(j,{to:"/blog/"+t+"/",title:i},n.a.createElement(P,{fluid:d,backgroundColor:"#eeeeee",title:i,alt:""}),n.a.createElement(R,null,n.a.createElement(T,null,i),n.a.createElement(V,null,a),n.a.createElement(W,{dangerouslySetInnerHTML:{__html:r}}))))},q=r.d.ul.withConfig({displayName:"card-list__List",componentId:"sc-14di3yx-0"})(["list-style:none;display:flex;flex-flow:row wrap;justify-content:space-between;margin:0 auto;&::after{content:'';flex:0 0 32%;}"]),G=function(e){var t=e.children;return n.a.createElement(q,null,t)},B=r.d.div.withConfig({displayName:"post-links__Wrapper",componentId:"th262h-0"})(["margin:-2em 0 0 0;padding:0 1.5em 2em;"]),F=r.d.div.withConfig({displayName:"post-links__Box",componentId:"th262h-1"})(["display:flex;justify-content:space-between;margin:0 auto;width:100%;max-width:",";a{background:transparent;color:",";padding:1em;border-radius:0.3125em;text-decoration:none;transition:0.2s;@media (hover:hover){&:hover{background:",";color:white;}}}"],(function(e){return e.theme.sizes.width.maxCentered}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight})),M=Object(r.d)(v.Link).withConfig({displayName:"post-links__PreviousLink",componentId:"th262h-2"})(["margin-right:auto;order:1;"]),A=Object(r.d)(v.Link).withConfig({displayName:"post-links__NextLink",componentId:"th262h-3"})(["margin-left:auto;order:2;"]),U=function(e){var t=e.prefix,i=e.previous,a=e.next,r=t?t+"/":"";return n.a.createElement(B,null,n.a.createElement(F,null,i&&n.a.createElement(M,{to:"/"+r+i.fields.slug+"/",title:i.frontmatter.title},"← Prev Post"),a&&n.a.createElement(A,{to:"/"+r+a.fields.slug+"/",title:a.frontmatter.title},"Next Post →")))},D=r.d.div.withConfig({displayName:"post-meta__Wrapper",componentId:"uaozvw-0"})(["margin:0 auto 2.4em;max-width:",";display:flex;justify-content:center;align-items:center;"],(function(e){return e.theme.sizes.width.maxCentered})),J=r.d.div.withConfig({displayName:"post-meta__Body",componentId:"uaozvw-1"})(["flex:1;color:",";"],(function(e){return e.theme.colors.text})),Y=r.d.header.withConfig({displayName:"post-meta__Header",componentId:"uaozvw-2"})(["display:inline-flex;a{color:",";display:inline-flex;align-items:center;}svg{width:1em;font-size:24px;& path{transition:0.2s;fill:",";opacity:0.7;}@media (hover:hover){&:hover path{fill:",";opacity:1;}}}"],(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.text}),(function(e){return e.theme.colors.highlight})),K=Object(r.d)(v.Link).withConfig({displayName:"post-meta__AuthorLink",componentId:"uaozvw-3"})(["font-weight:600;font-size:1.2em;margin:0 0.8em 0 0;text-decoration:none;display:inline-block;transition:0.2s;background-image:none;&&{color:",";&:hover{color:",";}}"],(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight})),X=r.d.p.withConfig({displayName:"post-meta__Bio",componentId:"uaozvw-4"})(["margin:0;"]),Z=function(e){var t=e.date,i=e.author,a=i.avatar,r=i.bio,l=i.id,d=i.name,s=i.github,c=i.twitter;return n.a.createElement(D,null,a&&n.a.createElement(h,{fluid:a.childImageSharp.fluid,alt:"",title:d}),n.a.createElement(J,null,n.a.createElement(Y,null,n.a.createElement(K,{to:"/blog/author/"+l,title:"Posts by "+d},d),n.a.createElement(o.n,{link:!0,socialName:"github",href:"https://github.com/"+s,title:d+" on GitHub"}),c&&n.a.createElement(o.n,{link:!0,socialName:"twitter",href:"https://twitter.com/"+c,title:d+" on Twitter"})),n.a.createElement(X,null,r),"Published on ",t))},Q=r.d.ul.withConfig({displayName:"post-tags__List",componentId:"sc-1blc8xz-0"})(["width:100%;margin:0 auto 1em auto;max-width:",";"],(function(e){return e.theme.sizes.width.maxCentered})),$=r.d.li.withConfig({displayName:"post-tags__Tag",componentId:"sc-1blc8xz-1"})(["display:inline-block;margin:0 0.25em 0.25em 0;a{float:left;font-size:0.8em;transition:0.2s;background:",";padding:0.5em;border-radius:2px;text-transform:capitalize;text-decoration:none;color:",";border:1px solid ",";@media (hover:hover){&:hover{background:",";color:",";}}}"],(function(e){return e.theme.colors.tertiary}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.base})),ee=function(e){var t=e.tags;return n.a.createElement(Q,null,t.map((function(e){return n.a.createElement($,{key:e},n.a.createElement(v.Link,{to:"/blog/tag/"+Object(k.e)(e)+"/",title:"Posts tagged with "+e},e))})))};i.d(t,"a",(function(){return c})),i.d(t,"b",(function(){return h})),i.d(t,"e",(function(){return w})),i.d(t,"f",(function(){return _})),i.d(t,"j",(function(){return O})),i.d(t,"c",(function(){return H})),i.d(t,"d",(function(){return G})),i.d(t,"g",(function(){return U})),i.d(t,"h",(function(){return Z})),i.d(t,"i",(function(){return ee}))}}]);
//# sourceMappingURL=component---src-templates-post-tsx-d471bb4318a1f49447d5.js.map