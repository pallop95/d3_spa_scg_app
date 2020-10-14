<template>
  <div class="container">
    <h1>Circle Pack Diagram</h1>
    <DiagramSelect v-model="selected" v-bind="{ select }">
      Mesurement:
    </DiagramSelect>
    <SimpleCirclePack v-bind="{ data: hierarchy, width, height }" />
  </div>
</template>

<script>
import axios from "axios";
import * as SensorData from "~/utilities/sensor_data";
import { hierarchy, pack } from "d3-hierarchy";
// import SimpleCirclePack from '../components/SimpleCirclePack'
// import DiagramSelect from '../components/DiagramSelect'

export default {
  // components: {
  //   SimpleCirclePack,
  //   DiagramSelect
  // },
  data() {
    return {
      data: [],
      select: [
        {
          label: "Humidity",
          value: "humidity",
        },
        {
          label: "Temperature",
          value: "temperature",
        },
      ],
      selected: "humidity",
      items: [],
      height: 500,
      width: 600,
      radius: 300,
    };
  },
  methods: {
    async setData(selected) {
      try {
        let response = await axios.get(
          "http://trinity-es-backend-dev-alb-1321395360.ap-southeast-1.elb.amazonaws.com/RawSensorData/userId/6"
        );
        // console.log(response.data)

        this.data = SensorData.getCountCircleIndicator(
          response.data,
          selected,
          "Temperature And Humidity Sensor(THZ2ZT)"
        );
        console.log(this.data);

        this.items = this.data;

      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    selected() {
      this.setData(this.selected);
    }
  },
  async mounted() {
    await this.setData(this.selected);
  },
  // async created() {
  //   let response = await axios.get(
  //     "http://trinity-es-backend-dev-alb-1321395360.ap-southeast-1.elb.amazonaws.com/RawSensorData/userId/6"
  //   );
  //   // console.log(response.data)

  //   this.items = SensorData.getCountIndicator(
  //     response.data,
  //     this.selected,
  //     "Temperature And Humidity Sensor(THZ2ZT)"
  //   );
  // },
  computed: {
    nestedData() {
      return {
        name: "root",
        children: this.h,
      };
    },
    h() {
      let h = this.items;
      // add color key
      h.forEach(
        (x, i) => (x.color = `hsl(${(360 / this.items.length) * i}, 70%, 50%)`)
      );
      return h;
    },
    hierarchy() {
      const h = hierarchy(this.nestedData)
        // build sum with dropdown selected value
        .sum((v) => v["count"]);
      console.log(h);
      this.packLayout(h);
      return h;
    },
    packLayout() {
      return pack().size([this.width, this.height]).padding(1);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}
</style>
