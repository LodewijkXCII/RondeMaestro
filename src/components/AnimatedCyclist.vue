<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="800"
    height="600"
    viewBox="0 0 800 600"
    class="animatedRenner"
  >
    <title>Artboard</title>
    <desc>Created with Sketch.</desc>
    <path
      id="road"
      d="M0,-3L1748,-3"
      stroke="#e7e7e7"
      fill="none"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="10"
      stroke-dashoffset="0.45392234450744851"
      transform="translate(800,418.237) scale(0.930206,1) translate(-874,3)"
    />
    <g id="fence" transform="translate(400,384.737) translate(-400,-33.5)">
      <path
        d="M0,0L800,0"
        stroke="#f0f0f0"
        fill="none"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="opacity(1)"
        transform="translate(0,51.3103)"
      />
      <path
        d="M0,0L800,0"
        stroke="#f0f0f0"
        fill="none"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="opacity(1)"
        transform="translate(0,36.2414)"
      />
      <path
        d="M0,0L800,0"
        stroke="#f0f0f0"
        fill="none"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="opacity(1)"
        transform="translate(0,18)"
      />
      <path
        d="M0,0L800,0"
        stroke="#f0f0f0"
        fill="none"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="opacity(1)"
      />
    </g>
    <g
      id="Artboard"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      transform="translate(400,296.237) scale(4.91304,4.91304) translate(-32,-32)"
    >
      <g id="biking" transform="translate(5,9)">
        <path
          id="leg_l"
          stroke="#54759a"
          stroke-width="4.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.4706,14.2759L27,20.6207L25.4118,33.3103"
          transform="translate(17.4706,14.2759) translate(-17.4706,-14.2759)"
        />
        <g
          id="tyres"
          stroke="#363434"
          stroke-width="3.2"
          transform="translate(0,23.7931)"
        >
          <ellipse
            id="back"
            rx="11.1176"
            ry="11.1034"
            transform="translate(0,0) translate(11.1176,11.1034)"
          />
          <path
            id="front"
            d="M34.9203,3.35399C32.9677,5.35476,31.7647,8.0888,31.7647,11.1034C31.7647,17.2357,36.7422,22.2069,42.8824,22.2069L42.8824,22.2069C49.0225,22.2069,54,17.2357,54,11.1034C54,6.72975,51.468,2.94668,47.788,1.13661"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <path
          id="leg_r"
          stroke="#54759a"
          stroke-width="4.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.2941,11.1034L20.6471,25.3793L17.4706,38.069"
          transform="translate(14.2941,11.1034) translate(-14.2941,-11.1034)"
        />
        <g
          id="body_moves_up_down"
          transform="translate(29.3824,11.1034) translate(0,0) translate(-18.2647,-11.1035)"
        >
          <path
            id="hand"
            stroke="#54759a"
            stroke-width="4.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M34.1471,14.2759L34.1471,22.2069L43.6765,22.2069"
            transform="translate(-11.1176,0)"
          />
          <path
            id="body"
            d="M15.8763,4.75862L31.7294,4.75862C34.3804,4.75862,36.5294,6.90765,36.5294,9.55862L36.5294,14.2759L15.8763,14.2759C13.2482,14.2759,11.1176,12.1454,11.1176,9.51724L11.1176,9.51724C11.1176,6.88913,13.2482,4.75862,15.8763,4.75862Z"
            fill="#54759a"
            transform="translate(-11.1176,0)"
          />
          <ellipse
            id="head"
            fill="#54759a"
            rx="4.76471"
            ry="4.75862"
            transform="translate(-11.1176,0) translate(42.8824,4.75862)"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<style lang="scss">
.animatedRenner {
  position: absolute;
  width: 100%;
}
</style>

<script>
export default {
  mounted() {
    if (KeyshapeJS.version.indexOf('1.') != 0)
      throw Error('Expected KeyshapeJS v1.*.*');
    window.ks = document.ks = KeyshapeJS;
    (function(ks) {
      ks.animate(
        '#road',
        [
          { p: 'scaleX', t: [0, 800], v: [0.930206, 1], e: [[0], [0]] },
          { p: 'scaleY', t: [0, 800], v: [1, 1], e: [[0], [0]] },
        ],
        '#leg_l',
        [
          {
            p: 'rotate',
            t: [0, 300, 600, 800],
            v: [0, 36.1371, -0.438673, 0],
            e: [
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [0],
            ],
          },
          {
            p: 'd',
            t: [0, 300, 600, 800],
            v: [
              "path('M17.4706,14.2759L27,20.6207L25.4118,33.3103')",
              "path('M17.4706,14.2759L27,20.6207L34.6384,29.2583')",
              "path('M17.4706,14.2759L27,20.6207L20.368,31.5227')",
              "path('M17.4706,14.2759L27,20.6207L25.4118,33.3103')",
            ],
            e: [
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [0],
            ],
          },
        ],
        '#leg_r',
        [
          {
            p: 'rotate',
            t: [0, 300, 800],
            v: [0, -43.1243, 0],
            e: [
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
            ],
          },
          {
            p: 'd',
            t: [0, 200, 300, 400, 600, 800],
            v: [
              "path('M14.2941,11.1034L20.6471,25.3793L17.4706,38.069')",
              "path('M14.2941,11.1034L20.6471,25.3793L10.0939,33.2867')",
              "path('M14.2941,11.1034L20.6471,25.3793L10.3086,33.946')",
              "path('M14.2941,11.1034L20.6471,25.3793L13.4702,36.8399')",
              "path('M14.2941,11.1034L20.6471,25.3793L15.3256,37.8131')",
              "path('M14.2941,11.1034L20.6471,25.3793L17.4706,38.069')",
            ],
            e: [
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
            ],
          },
        ],
        '#body_moves_up_down',
        [
          {
            p: 'mpath',
            t: [0, 100, 200, 300, 400, 500, 600, 700, 800],
            v: [
              '0%',
              '7.142946%',
              '21.428816%',
              '35.714686%',
              '50.000579%',
              '64.286472%',
              '78.572364%',
              '92.858257%',
              '100%',
            ],
            e: [
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [1, 0.42, 0, 0.58, 1],
              [0],
            ],
            mp:
              'M29.3824,11.1035L29.3824,11.4035L29.3824,10.8035L29.3824,11.4035L29.3824,10.8034L29.3824,11.4035L29.3824,10.8034L29.3824,11.4035L29.3824,11.1035',
          },
        ],
        { autoremove: false }
      )
        .range(0, 800)
        .loop(true);
      if (
        document.location.search
          .substr(1)
          .split('&')
          .indexOf('global=paused') >= 0
      )
        ks.globalPause();
    })(KeyshapeJS);
  },
};
</script>
