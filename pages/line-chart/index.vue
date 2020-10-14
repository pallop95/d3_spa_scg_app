<template>
  <div class="container">
    <h1>Line Chart Diagram</h1>
    <DiagramSelect v-model="selected" v-bind="{ select }">
      Mesurement:
    </DiagramSelect>
    <gf-linechart
      :options="{ width: 580, height: 180 }"
      :dataset="dataset"
      :dataSetForAxes="dataSetForAxes"
    ></gf-linechart>
  </div>
</template>

<script>
import * as SensorData from "~/utilities/sensor_data";
import axios from "axios";

export default {
  data() {
    return {
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
      dataset: [],
      dataSetForAxes: [],
    };
  },
  methods: {
    async setData(selected) {
      try {
        let response = await axios.get(
          "http://trinity-es-backend-dev-alb-1321395360.ap-southeast-1.elb.amazonaws.com/RawSensorData/userId/6"
        );
        this.data = SensorData.getLinearLineResult(
          response.data,
          selected,
          "Temperature And Humidity Sensor(THZ2ZT)"
        );
        // console.log(this.data2);
        this.dataset = this.data;
        this.dataSetForAxes = SensorData.getDataForSetAxes(this.data, selected);
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    this.setData(this.selected);
  },
  watch: {
    selected() {
      console.log('selected is changed => ' + this.selected)
      this.setData(this.selected);
    }
  }
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
