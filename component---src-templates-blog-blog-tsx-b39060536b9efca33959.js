(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"0mN4":function(e,t,i){"use strict";i("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"9eSz":function(e,t,i){"use strict";i("rGqo"),i("yt8O"),i("Btvt"),i("XfO3"),i("EK0E"),i("INYr"),i("0mN4");var n=i("TqRt");t.__esModule=!0,t.default=void 0;var r,a=n(i("PJYZ")),o=n(i("VbXa")),l=n(i("8OQS")),s=n(i("pVnL")),d=n(i("q1tI")),c=n(i("17x9")),u=function(e){var t=(0,s.default)({},e),i=t.resolutions,n=t.sizes,r=t.critical;return i&&(t.fixed=i,delete t.resolutions),n&&(t.fluid=n,delete t.sizes),r&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},m=function(e){var t=e.media;return!!t&&(y&&!!window.matchMedia(t).matches)},f=function(e){var t=e.fluid,i=e.fixed;return h(t||i).src},h=function(e){if(y&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(m);if(-1!==t)return e[t]}return e[0]},g=Object.create({}),p=function(e){var t=u(e),i=f(t);return g[i]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,y="undefined"!=typeof window,w=y&&window.IntersectionObserver,v=new WeakMap;function x(e){return e.map((function(e){var t=e.src,i=e.srcSet,n=e.srcSetWebp,r=e.media,a=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},n&&d.default.createElement("source",{type:"image/webp",media:r,srcSet:n,sizes:a}),d.default.createElement("source",{media:r,srcSet:i,sizes:a}))}))}function E(e){var t=[],i=[];return e.forEach((function(e){return(e.media?t:i).push(e)})),[].concat(t,i)}function I(e){return e.map((function(e){var t=e.src,i=e.media,n=e.tracedSVG;return d.default.createElement("source",{key:t,media:i,srcSet:n})}))}function S(e){return e.map((function(e){var t=e.src,i=e.media,n=e.base64;return d.default.createElement("source",{key:t,media:i,srcSet:n})}))}function _(e,t){var i=e.srcSet,n=e.srcSetWebp,r=e.media,a=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(r?'media="'+r+'" ':"")+'srcset="'+(t?n:i)+'" '+(a?'sizes="'+a+'" ':"")+"/>"}var k=function(e,t){var i=(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver((function(e){e.forEach((function(e){if(v.has(e.target)){var t=v.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(e.target),v.delete(e.target),t())}}))}),{rootMargin:"200px"})),r);return i&&(i.observe(e),v.set(e,t)),function(){i.unobserve(e),v.delete(e)}},N=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',i=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSet?'srcset="'+e.srcSet+'" ':"",r=e.title?'title="'+e.title+'" ':"",a=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",s=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?_(e,!0):"")+_(e)})).join("")+"<img "+d+o+l+i+n+t+a+r+s+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},z=function(e){var t=e.src,i=e.imageVariants,n=e.generateSources,r=e.spreadProps,a=e.ariaHidden,o=d.default.createElement(C,(0,s.default)({src:t},r,{ariaHidden:a}));return i.length>1?d.default.createElement("picture",null,n(i),o):o},C=d.default.forwardRef((function(e,t){var i=e.sizes,n=e.srcSet,r=e.src,a=e.style,o=e.onLoad,c=e.onError,u=e.loading,m=e.draggable,f=e.ariaHidden,h=(0,l.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return d.default.createElement("img",(0,s.default)({"aria-hidden":f,sizes:i,srcSet:n,src:r},h,{onLoad:o,onError:c,ref:t,loading:u,draggable:m,style:(0,s.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},a)}))}));C.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var L=function(e){function t(t){var i;(i=e.call(this,t)||this).seenBefore=y&&p(t),i.isCritical="eager"===t.loading||t.critical,i.addNoScript=!(i.isCritical&&!t.fadeIn),i.useIOSupport=!b&&w&&!i.isCritical&&!i.seenBefore;var n=i.isCritical||y&&(b||!i.useIOSupport);return i.state={isVisible:n,imgLoaded:!1,imgCached:!1,fadeIn:!i.seenBefore&&t.fadeIn},i.imageRef=d.default.createRef(),i.handleImageLoaded=i.handleImageLoaded.bind((0,a.default)(i)),i.handleRef=i.handleRef.bind((0,a.default)(i)),i}(0,o.default)(t,e);var i=t.prototype;return i.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:p(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},i.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},i.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=k(e,(function(){var e=p(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})}))})))},i.handleImageLoaded=function(){var e,t,i;e=this.props,t=u(e),i=f(t),g[i]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},i.render=function(){var e=u(this.props),t=e.title,i=e.alt,n=e.className,r=e.style,a=void 0===r?{}:r,o=e.imgStyle,l=void 0===o?{}:o,c=e.placeholderStyle,m=void 0===c?{}:c,f=e.placeholderClassName,g=e.fluid,p=e.fixed,b=e.backgroundColor,y=e.durationFadeIn,w=e.Tag,v=e.itemProp,E=e.loading,_=e.draggable,k=!1===this.state.fadeIn||this.state.imgLoaded,L=!0===this.state.fadeIn&&!this.state.imgCached,O=(0,s.default)({opacity:k?1:0,transition:L?"opacity "+y+"ms":"none"},l),j="boolean"==typeof b?"lightgray":b,P={transitionDelay:y+"ms"},T=(0,s.default)({opacity:this.state.imgLoaded?0:1},L&&P,{},l,{},m),V={title:t,alt:this.state.isVisible?"":i,style:T,className:f,itemProp:v};if(g){var R=g,W=h(g);return d.default.createElement(w,{className:(n||"")+" gatsby-image-wrapper",style:(0,s.default)({position:"relative",overflow:"hidden"},a),ref:this.handleRef,key:"fluid-"+JSON.stringify(W.srcSet)},d.default.createElement(w,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/W.aspectRatio+"%"}}),j&&d.default.createElement(w,{"aria-hidden":!0,title:t,style:(0,s.default)({backgroundColor:j,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},L&&P)}),W.base64&&d.default.createElement(z,{ariaHidden:!0,src:W.base64,spreadProps:V,imageVariants:R,generateSources:S}),W.tracedSVG&&d.default.createElement(z,{ariaHidden:!0,src:W.tracedSVG,spreadProps:V,imageVariants:R,generateSources:I}),this.state.isVisible&&d.default.createElement("picture",null,x(R),d.default.createElement(C,{alt:i,title:t,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:O,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:E,draggable:_})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:N((0,s.default)({alt:i,title:t,loading:E},W,{imageVariants:R}))}}))}if(p){var H=p,q=h(p),G=(0,s.default)({position:"relative",overflow:"hidden",display:"inline-block",width:q.width,height:q.height},a);return"inherit"===a.display&&delete G.display,d.default.createElement(w,{className:(n||"")+" gatsby-image-wrapper",style:G,ref:this.handleRef,key:"fixed-"+JSON.stringify(q.srcSet)},j&&d.default.createElement(w,{"aria-hidden":!0,title:t,style:(0,s.default)({backgroundColor:j,width:q.width,opacity:this.state.imgLoaded?0:1,height:q.height},L&&P)}),q.base64&&d.default.createElement(z,{ariaHidden:!0,src:q.base64,spreadProps:V,imageVariants:H,generateSources:S}),q.tracedSVG&&d.default.createElement(z,{ariaHidden:!0,src:q.tracedSVG,spreadProps:V,imageVariants:H,generateSources:I}),this.state.isVisible&&d.default.createElement("picture",null,x(H),d.default.createElement(C,{alt:i,title:t,width:q.width,height:q.height,sizes:q.sizes,src:q.src,crossOrigin:this.props.crossOrigin,srcSet:q.srcSet,style:O,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:E,draggable:_})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:N((0,s.default)({alt:i,title:t,loading:E},q,{imageVariants:H}))}}))}return null},t}(d.default.Component);L.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var O=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),j=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});L.propTypes={resolutions:O,sizes:j,fixed:c.default.oneOfType([O,c.default.arrayOf(O)]),fluid:c.default.oneOfType([j,c.default.arrayOf(j)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var P=L;t.default=P},INYr:function(e,t,i){"use strict";var n=i("XKFU"),r=i("CkkT")(6),a="findIndex",o=!0;a in[]&&Array(1)[a]((function(){o=!1})),n(n.P+n.F*o,"Array",{findIndex:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),i("nGyu")(a)},KcTm:function(e,t,i){"use strict";i("f3/d");var n=i("q1tI"),r=i("/p1/"),a=i("vOnD"),o=a.d.div.withConfig({displayName:"author-meta__Wrapper",componentId:"u1uzmp-0"})(["display:flex;flex-direction:column;align-items:center;margin-bottom:2em;svg{width:1em;font-size:24px;& path{transition:0.2s;fill:",";opacity:0.7;}@media (hover:hover){&:hover path{fill:",";opacity:1;}}}"],(function(e){return e.theme.colors.text}),(function(e){return e.theme.colors.highlight})),l=a.d.div.withConfig({displayName:"author-meta__SocialAccounts",componentId:"u1uzmp-1"})(["display:flex;"]),s=a.d.h2.withConfig({displayName:"author-meta__Name",componentId:"u1uzmp-2"})(["margin:1em 0 0.5em;"]),d=function(e){var t=e.author,i=t.avatar,a=t.name,d=t.bio,c=t.github,u=t.twitter;return n.createElement(o,null,i&&n.createElement(f,{fluid:i.childImageSharp.fluid,alt:"",title:a,alignment:"vertical"}),n.createElement(s,null,a),n.createElement("p",null,d),n.createElement(l,null,n.createElement(r.r,{link:!0,socialName:"github",href:"https://github.com/"+c,title:a+" on GitHub"}),u&&n.createElement(r.r,{link:!0,socialName:"twitter",href:"https://twitter.com/"+u,title:a+" on Twitter"})))},c=(i("rGqo"),i("yt8O"),i("Btvt"),i("RW0V"),i("91GP"),i("9eSz")),u=i.n(c);var m=Object(a.d)(u.a).attrs((function(){return{small:!1}})).withConfig({displayName:"avatar__Image",componentId:"vlw4r0-0"})(["min-height:4em;max-height:4em;min-width:4em;max-width:4em;border-radius:50%;margin-right:",";"],(function(e){return"horizontal"===e.alignment?"1.6em":0})),f=function(e){var t=e.alignment,i=void 0===t?"horizontal":t,r=function(e,t){if(null==e)return{};var i,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)i=a[n],t.indexOf(i)>=0||(r[i]=e[i]);return r}(e,["alignment"]);return n.createElement(m,Object.assign({alignment:i},r))},h=(i("84bF"),a.d.section.withConfig({displayName:"hero__Wrapper",componentId:"sc-19vaa23-0"})(["position:relative;min-height:300px;"])),g=Object(a.d)(u.a).withConfig({displayName:"hero__BgImg",componentId:"sc-19vaa23-1"})(["position:absolute;top:0;left:0;width:100%;z-index:-1;min-height:300px;height:auto;@media (min-width:","){height:",";}& > img{object-fit:"," !important;object-position:"," !important;}&::before{content:'';background:rgba(0,0,0,0.25);position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;z-index:1;}"],(function(e){return e.theme.responsive.small}),(function(e){return e.height||"auto"}),(function(e){return e.fit||"cover"}),(function(e){return e.position||"50% 50%"})),p=a.d.h1.withConfig({displayName:"hero__Title",componentId:"sc-19vaa23-2"})(["font-size:3em;text-transform:capitalize;font-weight:600;position:absolute;width:100%;max-width:",";padding:0 1rem;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:white;margin-top:0;"],(function(e){return e.theme.sizes.width.maxCentered})),b=function(e){var t=e.height,i=e.fluid,r=e.title;return n.createElement(h,null,n.createElement(g,{height:t,fluid:i,backgroundColor:"#eeeeee",title:r,alt:""}),n.createElement(p,null,r))},y=i("Wbzz"),w=i("eZYV"),v=a.d.div.withConfig({displayName:"pagination__Wrapper",componentId:"mehen9-0"})(["position:relative;display:flex;justify-content:space-between;margin:-2em auto 0;width:100%;max-width:",";padding:0 1.5em 2em;a{background:transparent;color:",";padding:1em 0.8em;border-color:",";border-radius:2px;text-decoration:none;transition:0.2s;@media (hover:hover){&:hover{background:",";color:white;}}}"],(function(e){return e.theme.sizes.width.max}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight}),(function(e){return e.theme.colors.highlight})),x=Object(a.d)(y.Link).withConfig({displayName:"pagination__PreviousLink",componentId:"mehen9-1"})(["margin-right:auto;order:1;"]),E=Object(a.d)(y.Link).withConfig({displayName:"pagination__NextLink",componentId:"mehen9-2"})(["margin-left:auto;order:3;"]),I=a.d.span.withConfig({displayName:"pagination__PageIndicator",componentId:"mehen9-3"})(["color:",";position:absolute;left:0;right:0;width:100%;text-align:center;padding:1em 1.5em;z-index:-1;opacity:0.7;"],(function(e){return e.theme.colors.text})),S=function(e){var t=e.context,i=e.prefix,r=Object(w.d)(),a=t.numPages,o=t.currentPage,l=void 0===o?1:o,s=1===l,d=l===a,c=s&&d,u=l-1==1?"":l-1,m=l+1,f=i?"/"+i+"/":"/",h=s?null:""+f+u+"/",g=d?null:""+f+m+"/";return n.createElement(v,null,!s&&h&&n.createElement(x,{to:h,title:r.title+" blog page "+u},"← Prev Page"),!c&&n.createElement(I,null,l,"/",a),!d&&g&&n.createElement(E,{to:g,title:r.title+" blog page "+m},"Next Page →"))},_=(i("pIFo"),i("0lfv")),k=a.d.div.withConfig({displayName:"share__Wrapper",componentId:"sc-56ik4p-0"})(["display:flex;flex-direction:column;align-items:center;"]),N=a.d.div.withConfig({displayName:"share__List",componentId:"sc-56ik4p-1"})(["max-width:",";display:flex;flex-direction:row;margin:0 auto 1em auto;svg{path{transition:0.2s;fill:",";opacity:0.7;}}@media (hover:hover){& a:hover{cursor:pointer;svg{path{fill:",";opacity:1;}}}}"],(function(e){return e.theme.sizes.width.maxCentered}),(function(e){return e.theme.colors.text}),(function(e){return e.theme.colors.highlight})),z=a.d.p.withConfig({displayName:"share__Label",componentId:"sc-56ik4p-2"})(["font-weight:800;"]),C=function(e){var t=e.post,i=Object(w.d)(),a=i.social,o=i.siteUrl,l=a.twitter.replace("@",""),s=o+"/blog/"+t.slug;return n.createElement(k,null,n.createElement(z,null,"Share this post"),n.createElement(N,null,n.createElement(r.r,{link:!0,socialName:"facebook",title:'Share "'+t.title+'" on Facebook',href:Object(_.b)("facebook",{u:s})}),n.createElement(r.r,{link:!0,socialName:"twitter",title:'Share "'+t.title+'" on Twitter',href:Object(_.b)("twitter",{text:t.title,url:s,via:l})}),n.createElement(r.r,{link:!0,socialName:"linkedin",title:'Share "'+t.title+'" on LinkedIn',href:Object(_.b)("linkedin",{url:s})}),n.createElement(r.r,{link:!0,socialName:"reddit",title:'Share "'+t.title+'" on Reddit',href:Object(_.b)("reddit",{url:s})})))},L=a.d.li.withConfig({displayName:"card__Post",componentId:"en5oce-0"})(["position:relative;border-radius:0.3125em;width:100%;transition:0.2s;@media screen and (min-width:","){flex:",";margin:0 0 2vw 0;}@media screen and (min-width:","){flex:",";}a{display:flex;flex-flow:column;height:100%;width:100%;color:",";text-decoration:none;h2{transition:color 0.2s;}@media (hover:hover){&:hover{color:",";h2{color:",";}}}.gatsby-image-wrapper{height:0;padding-bottom:60%;@media screen and (min-width:","){padding-bottom:",";}}}"],(function(e){return e.theme.responsive.small}),(function(e){return e.featured?"0 0 100%":"0 0 49%"}),(function(e){return e.theme.responsive.medium}),(function(e){return e.featured?"0 0 100%":"0 0 32%"}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight}),(function(e){return e.theme.responsive.small}),(function(e){return e.featured?"40%":"60%"})),O=Object(a.d)(y.Link).withConfig({displayName:"card__StyledLink",componentId:"en5oce-1"})(["background-image:none;"]),j=Object(a.d)(u.a).withConfig({displayName:"card__StyledImg",componentId:"en5oce-2"})(["border-radius:0.375em;"]),P=a.d.div.withConfig({displayName:"card__Text",componentId:"en5oce-3"})(["margin:0;padding:1em;"]),T=a.d.h2.withConfig({displayName:"card__Title",componentId:"en5oce-4"})(["text-transform:capitalize;margin:0.5em 0 1em;"]),V=a.d.p.withConfig({displayName:"card__Date",componentId:"en5oce-5"})(["margin:0 0 0.5em 0;color:",";"],(function(e){return e.theme.colors.text})),R=a.d.p.withConfig({displayName:"card__Excerpt",componentId:"en5oce-6"})(["color:",";"],(function(e){return e.theme.colors.text})),W=function(e){var t=e.slug,i=e.title,r=e.publishDate,a=e.excerpt,o=e.featured,l=void 0!==o&&o,s=e.fluid;return n.createElement(L,{featured:l},n.createElement(O,{to:"/blog/"+t+"/",title:i},n.createElement(j,{fluid:s,backgroundColor:"#eeeeee",title:i,alt:""}),n.createElement(P,null,n.createElement(T,null,i),n.createElement(V,null,r),n.createElement(R,{dangerouslySetInnerHTML:{__html:a}}))))},H=a.d.ul.withConfig({displayName:"card-list__List",componentId:"sc-1m8k5nm-0"})(["list-style:none;display:flex;flex-flow:row wrap;justify-content:space-between;margin:0 auto;&::after{content:'';flex:0 0 32%;}"]),q=function(e){var t=e.children;return n.createElement(H,null,t)},G=a.d.div.withConfig({displayName:"post-links__Wrapper",componentId:"sc-1x8u7h3-0"})(["margin:-2em 0 0 0;padding:0 1.5em 2em;"]),A=a.d.div.withConfig({displayName:"post-links__Box",componentId:"sc-1x8u7h3-1"})(["display:flex;justify-content:space-between;margin:0 auto;width:100%;max-width:",";a{background:transparent;color:",";padding:1em;border-radius:0.3125em;text-decoration:none;transition:0.2s;@media (hover:hover){&:hover{background:",";color:white;}}}"],(function(e){return e.theme.sizes.width.maxCentered}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight})),B=Object(a.d)(y.Link).withConfig({displayName:"post-links__PreviousLink",componentId:"sc-1x8u7h3-2"})(["margin-right:auto;order:1;"]),F=Object(a.d)(y.Link).withConfig({displayName:"post-links__NextLink",componentId:"sc-1x8u7h3-3"})(["margin-left:auto;order:2;"]),M=function(e){var t=e.prefix,i=e.previous,r=e.next,a=t?t+"/":"";return n.createElement(G,null,n.createElement(A,null,i&&n.createElement(B,{to:"/"+a+i.fields.slug+"/",title:i.frontmatter.title},"← Prev Post"),r&&n.createElement(F,{to:"/"+a+r.fields.slug+"/",title:r.frontmatter.title},"Next Post →")))},D=a.d.div.withConfig({displayName:"post-meta__Wrapper",componentId:"zs3sza-0"})(["margin:0 auto 2.4em;max-width:",";display:flex;justify-content:center;align-items:center;"],(function(e){return e.theme.sizes.width.maxCentered})),J=a.d.div.withConfig({displayName:"post-meta__Body",componentId:"zs3sza-1"})(["flex:1;color:",";"],(function(e){return e.theme.colors.text})),U=a.d.header.withConfig({displayName:"post-meta__Header",componentId:"zs3sza-2"})(["display:inline-flex;a{color:",";display:inline-flex;align-items:center;}svg{width:1em;font-size:24px;& path{transition:0.2s;fill:",";opacity:0.7;}@media (hover:hover){&:hover path{fill:",";opacity:1;}}}"],(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.text}),(function(e){return e.theme.colors.highlight})),Y=Object(a.d)(y.Link).withConfig({displayName:"post-meta__AuthorLink",componentId:"zs3sza-3"})(["font-weight:600;font-size:1.2em;margin:0 0.8em 0 0;text-decoration:none;display:inline-block;transition:0.2s;background-image:none;&&{color:",";&:hover{color:",";}}"],(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.highlight})),K=a.d.p.withConfig({displayName:"post-meta__Bio",componentId:"zs3sza-4"})(["margin:0;"]),X=function(e){var t=e.date,i=e.author,a=i.avatar,o=i.bio,l=i.id,s=i.name,d=i.github,c=i.twitter;return n.createElement(D,null,a&&n.createElement(f,{fluid:a.childImageSharp.fluid,alt:"",title:s}),n.createElement(J,null,n.createElement(U,null,n.createElement(Y,{to:"/blog/author/"+l,title:"Posts by "+s},s),n.createElement(r.r,{link:!0,socialName:"github",href:"https://github.com/"+d,title:s+" on GitHub"}),c&&n.createElement(r.r,{link:!0,socialName:"twitter",href:"https://twitter.com/"+c,title:s+" on Twitter"})),n.createElement(K,null,o),"Published on ",t))},Z=a.d.ul.withConfig({displayName:"post-tags__List",componentId:"sc-3sbxxt-0"})(["width:100%;margin:0 auto 1em auto;max-width:",";"],(function(e){return e.theme.sizes.width.maxCentered})),Q=a.d.li.withConfig({displayName:"post-tags__Tag",componentId:"sc-3sbxxt-1"})(["display:inline-block;margin:0 0.25em 0.25em 0;a{float:left;font-size:0.8em;transition:0.2s;background:",";padding:0.5em;border-radius:2px;text-transform:capitalize;text-decoration:none;color:",";border:1px solid ",";@media (hover:hover){&:hover{background:",";color:",";}}}"],(function(e){return e.theme.colors.tertiary}),(function(e){return e.theme.colors.base}),(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.base})),$=function(e){var t=e.tags;return n.createElement(Z,null,t.map((function(e){return n.createElement(Q,{key:e},n.createElement(y.Link,{to:"/blog/tag/"+Object(_.d)(e)+"/",title:"Posts tagged with "+e},e))})))};i.d(t,"a",(function(){return d})),i.d(t,"b",(function(){return f})),i.d(t,"e",(function(){return b})),i.d(t,"f",(function(){return S})),i.d(t,"j",(function(){return C})),i.d(t,"c",(function(){return W})),i.d(t,"d",(function(){return q})),i.d(t,"g",(function(){return M})),i.d(t,"h",(function(){return X})),i.d(t,"i",(function(){return $}))},VjTJ:function(e,t,i){"use strict";i.r(t);var n=i("q1tI"),r=i.n(n),a=(i("XfO3"),i("HEwt"),i("a1Th"),i("Btvt"),i("rE2o"),i("ioFf"),i("rGqo"),i("Wbzz")),o=i("V+Oa"),l=i("/p1/");var s,d=[{item:r.a.createElement(a.Link,{to:"/blog/tags"},"Tags"),key:"/blog/tags",show:o.d.Always}].concat(function(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}(s=l.u)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(s)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()),c=i("KcTm"),u=i("eZYV");i.d(t,"pageQuery",(function(){return m}));var m="3507936326";t.default=function(e){var t=e.data,i=e.pageContext,n=Object(u.d)(),a=Object(u.b)(),o=t.allMarkdownRemark.nodes,s=i.currentPage,m=1===s;return r.a.createElement(l.g,{navItems:d},m?r.a.createElement(l.o,{title:"Blog",urlSlug:"blog/"}):r.a.createElement(l.o,{title:"Page "+s+" - "+n.title,urlSlug:"blog/"}),r.a.createElement(l.e,null,r.a.createElement(c.d,null,o.map((function(e){var t=e.fields,i=e.excerpt,n=e.frontmatter;return r.a.createElement(c.c,{key:t.slug,slug:t.slug,excerpt:i,fluid:n.image?n.image.childImageSharp.fluid:a.childImageSharp.fluid,publishDate:n.date,title:n.title||t.slug})})))),r.a.createElement(c.f,{prefix:"blog",context:i}))}}}]);
//# sourceMappingURL=component---src-templates-blog-blog-tsx-b39060536b9efca33959.js.map