<template>
  <div>
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
      dataset: [],
      dataSetForAxes: []
    };
  },
  async mounted() {
    try {
      let response = await axios.get(
        "http://trinity-es-backend-dev-alb-1321395360.ap-southeast-1.elb.amazonaws.com/RawSensorData/userId/6"
      );
      //   console.log(response.data)

      // this.data = SensorData.getCountIndicator(response.data, 'humidity', 'Temperature And Humidity Sensor(THZ2ZT)')
      // console.log(this.data)
      this.data = SensorData.getLinearLineResult(
        response.data,
        "humidity",
        "Temperature And Humidity Sensor(THZ2ZT)"
      );
      // console.log(this.data2);
      this.dataset = this.data;
      this.dataSetForAxes = SensorData.getDataForSetAxes( this.data );
    } catch (err) {
      console.log(err);
    }
  },
};
</script>