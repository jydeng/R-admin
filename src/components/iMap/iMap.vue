<template>
  <div id="iMap" style="height:100%"></div>
</template>
<script>
import BMap from "BMap";
export default {
  name: "iMap",
  props: {
    center: {
      type: Object,
      default: function() {
        return {
          lng: 118.203393,
          lat: 24.492139
        };
      }
    },
    level: {
      type: Number,
      default: 14
    }
  },
  mounted() {
    let map = new BMap.Map("iMap");
    let point = new BMap.Point(this.center.lng, this.center.lat);
    map.centerAndZoom(point, this.level);
    map.addControl(new BMap.MapTypeControl());
    map.enableScrollWheelZoom(true);
    map.enableDoubleClickZoom(true);
  }
};
</script>
