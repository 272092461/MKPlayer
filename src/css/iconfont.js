;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-18" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M818.752 478.656c-2.368-17.664-6.016-34.88-11.264-51.52l91.648-137.216-74.88-94.08-154.24 59.008c-14.848-8.704-30.528-16.32-46.72-22.528L572.992 74.24l-120.32 0L402.368 232.384C386.432 238.464 371.072 245.888 356.48 254.4L200.896 194.944 125.888 288.896 218.24 427.008C213.184 442.816 209.664 459.328 207.168 476.096l-144 84.928L89.92 678.4l165.504 13.76c9.344 14.144 20.032 27.264 31.616 39.616L263.68 897.024l108.288 52.096 113.728-120.384c8.896 0.896 17.92 1.344 27.136 1.344 8.192 0 16.256-0.448 24.256-1.216l114.176 120.896 108.224-52.224-23.104-163.392c12.032-12.736 23.232-26.24 33.024-40.896l164.608-13.696 26.752-117.312L818.752 478.656zM512.832 727.104c-113.856 0-206.144-92.352-206.144-206.272 0-113.792 92.288-206.144 206.144-206.144 113.792 0 206.08 92.288 206.08 206.144C718.848 634.752 626.624 727.104 512.832 727.104"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jinlingyingcaiwangtubiao44" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M411.5712 584.832l-320.768 320.768 19.9936-169.5488c1.2544-10.5472-6.2976-20.0704-16.8192-21.3248-10.496-1.3312-20.0704 6.2976-21.3248 16.8192l-26.4704 224.4864c-0.6912 5.8368 1.3312 11.6736 5.4784 15.8208 3.6352 3.6352 8.5248 5.632 13.568 5.632 0.7424 0 1.5104-0.0256 2.2528-0.128l224.4864-26.4704c10.5216-1.2288 18.0736-10.7776 16.8192-21.3248-1.2288-10.5216-10.752-18.176-21.3248-16.8192l-169.5488 19.9936 320.768-320.768c7.5008-7.5008 7.5008-19.6608 0-27.1616S419.072 577.3312 411.5712 584.832z"  ></path>' +
    '' +
    '<path d="M117.9648 100.6848l169.5488 19.9936c10.5984 1.408 20.0704-6.2976 21.3248-16.8192 1.2544-10.5472-6.2976-20.0704-16.8192-21.3248L67.5072 56.064c-5.8624-0.768-11.6736 1.3056-15.8208 5.4784-4.1728 4.1472-6.1952 9.984-5.4784 15.8208l26.4704 224.4864c1.152 9.7536 9.4464 16.9472 19.0464 16.9472 0.7424 0 1.5104-0.0256 2.2784-0.128 10.5216-1.2288 18.0736-10.7776 16.8192-21.3248L90.8032 127.8208l320.768 320.768c3.7376 3.7376 8.6528 5.632 13.568 5.632s9.8304-1.8688 13.568-5.632c7.5008-7.5008 7.5008-19.6608 0-27.1616L117.9648 100.6848z"  ></path>' +
    '' +
    '<path d="M918.4512 714.7264c-10.5216 1.2288-18.0736 10.7776-16.8192 21.3248l19.9936 169.5488-320.768-320.768c-7.5008-7.5008-19.6608-7.5008-27.1616 0s-7.5008 19.6608 0 27.1616l320.768 320.768-169.5488-19.9936c-10.624-1.3312-20.0704 6.2976-21.3248 16.8192-1.2544 10.5472 6.2976 20.0704 16.8192 21.3248l224.4864 26.4704c0.7424 0.1024 1.5104 0.128 2.2528 0.128 5.0688 0 9.9584-1.9968 13.568-5.632 4.1728-4.1472 6.1696-9.984 5.4784-15.8208l-26.4704-224.4864C938.5472 721.024 928.8704 713.3696 918.4512 714.7264z"  ></path>' +
    '' +
    '<path d="M587.2896 454.2208c4.9152 0 9.8304-1.8688 13.568-5.632l320.768-320.768-19.9936 169.5488c-1.2544 10.5472 6.2976 20.0704 16.8192 21.3248 0.768 0.1024 1.536 0.128 2.2784 0.128 9.6 0 17.8944-7.1936 19.0464-16.9472l26.4704-224.4864c0.6912-5.8368-1.3312-11.6736-5.4784-15.8208-4.1728-4.1728-10.0608-6.2464-15.8208-5.4784l-224.4864 26.4704c-10.5216 1.2288-18.0736 10.7776-16.8192 21.3248 1.2288 10.5216 10.6752 18.176 21.3248 16.8192l169.5488-19.9936-320.768 320.768c-7.5008 7.5008-7.5008 19.6608 0 27.1616C577.4592 452.352 582.3744 454.2208 587.2896 454.2208z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-menu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M41.116444 94.606222l0 106.254222 941.041778 0L982.158222 94.606222 41.116444 94.606222zM41.116444 565.12l941.041778 0 0-106.254222L41.116444 458.865778 41.116444 565.12zM41.116444 929.408l941.041778 0 0-106.24L41.116444 823.168 41.116444 929.408z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-weibiaoti102" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M113.038956 0 113.038956 1024 910.961034 512Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-pause" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M221.184 0l172.032 0 0 1024-172.032 0 0-1024Z"  ></path>' +
    '' +
    '<path d="M630.784 0l172.032 0 0 1024-172.032 0 0-1024Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-pinglun" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M847.36 107.52h-665.6c-69.12 0-125.44 56.32-125.44 125.44v401.92c0 69.12 56.32 125.44 125.44 125.44h38.4l15.36 181.76 158.72-181.76h453.12c69.12 0 125.44-56.32 125.44-125.44V232.96c0-69.12-56.32-125.44-125.44-125.44z m-563.2 376.32c-33.28 0-61.44-28.16-61.44-61.44 0-33.28 28.16-61.44 61.44-61.44 33.28 0 61.44 28.16 61.44 61.44 2.56 33.28-25.6 61.44-61.44 61.44z m230.4 0c-33.28 0-61.44-28.16-61.44-61.44 0-33.28 28.16-61.44 61.44-61.44 33.28 0 61.44 28.16 61.44 61.44 0 33.28-28.16 61.44-61.44 61.44z m227.84 0c-33.28 0-61.44-28.16-61.44-61.44 0-33.28 28.16-61.44 61.44-61.44 33.28 0 61.44 28.16 61.44 61.44 2.56 33.28-25.6 61.44-61.44 61.44z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yinliang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M153.6 384h89.6l296.96-217.6c25.6-23.04 48.64-17.92 48.64 35.84v619.52c0 56.32-23.04 58.88-48.64 35.84L243.2 640H153.6c-28.16 0-51.2-23.04-51.2-51.2v-153.6c0-28.16 23.04-51.2 51.2-51.2z" fill="" ></path>' +
    '' +
    '<path d="M724.48 368.64C752.64 409.6 768 458.24 768 512c0 51.2-15.36 99.84-40.96 138.24l-43.52-23.04c20.48-33.28 33.28-74.24 33.28-115.2 0-43.52-12.8-84.48-35.84-120.32l43.52-23.04z" fill="" ></path>' +
    '' +
    '<path d="M862.72 721.92l-43.52-23.04c33.28-53.76 51.2-120.32 51.2-186.88 0-71.68-20.48-138.24-53.76-194.56l43.52-23.04c40.96 64 64 138.24 64 217.6-2.56 76.8-23.04 148.48-61.44 209.92z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)