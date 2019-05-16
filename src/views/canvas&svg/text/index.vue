<template>
  <div id="main"></div>
</template>
<script>
import zrender from "zrender";
export default {
  data() {
    return {
      timer: null
    };
  },
  methods: {
    render(zr, zrender) {
      document.getElementById("main").style.background = "rgb(51, 51, 51)";
      let w = zr.getWidth();
      let h = zr.getHeight();

      var t1 = new zrender.Text({
        style: {
          text: "hello world",
          textAlign: "center",
          textVerticalAlign: "middle",
          fontSize: 200,
          fontFamily: "Lato",
          fontWeight: "bolder",
          textFill: "#f0f",
          blend: "lighten"
        },
        position: [w / 2 + 5, h / 2]
      });
      zr.add(t1);

      var t2 = new zrender.Text({
        style: {
          text: "hello world",
          textAlign: "center",
          textVerticalAlign: "middle",
          fontSize: 200,
          fontFamily: "Lato",
          fontWeight: "bolder",
          textFill: "#fff",
          blend: "lighten"
        },
        position: [w / 2, h / 2]
      });
      zr.add(t2);

      let lines = [];
      for (let i = 0; i < 16; i++) {
        let line = new zrender.Rect({
          shape: {
            x: w * (Math.random() - 0.3),
            y: h * Math.random(),
            width: w * (Math.random() + 0.3),
            height: Math.random() * 8
          },
          style: {
            fill: ["#ff0", "#f0f", "#0ff", "#00f"][
              Math.floor(Math.random() * 4)
            ],
            blend: "lighten",
            opacity: 0
          }
        });

        zr.add(line);
        lines.push(line);
      }

      this.timer = window.setInterval(function() {
        if (Math.random() > 0.2) {
          t2.attr("position", [w / 2 + Math.random() * 50, h / 2]);

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            line.attr("shape", {
              x: w * Math.random(),
              y: h * Math.random(),
              width: w * Math.random(),
              height: Math.random() * 8
            });

            line.attr("style", {
              opacity: 1
            });
          }

          setTimeout(function() {
            t2.attr("position", [w / 2, h / 2]);

            for (let i = 0; i < lines.length; ++i) {
              const line = lines[i];
              line.attr("style", {
                opacity: 0
              });
            }
          }, 100);
        }
      }, 500);
    }
  },
  mounted() {
    setTimeout(() => {
      let zr = zrender.init(document.getElementById("main"));
      this.render(zr, zrender);
    }, 2000);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  }
};
</script>
<style lang="scss" scoped>
#main {
  height: 100%;
}
</style>
