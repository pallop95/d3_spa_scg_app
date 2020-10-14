export function getCountIndicator(data, indicatorType, deviceType) {
    /*   
        data => json data
        indicatorType => humidity, temperature
        deviceType => Temperature And Humidity Sensor(THZ2ZT)
    */

    console.log("start getCountEachOfHumiDataValue")
    var result = getDataDetailFromDeviceType(data, deviceType);

    // pv เป็นตัวตั้ง
    return result.reduce(function (pv, cv) {
        var index = -1;
        var val = cv[indicatorType].value;

        // หา index ไอเท็ม cv ใน pv 
        pv.find(function (item, i) {
            if (item[indicatorType] === val) {
                index = i;
                return i;
            }
        });

        // ถ้ามากกว่าเท่ากับ 0 ให้บวกหนึ่ง : มิฉะนั้น เพิ่มค่าลงใน pv โดยบวกหนึ่ง
        if (index >= 0) {
            pv[index].count += 1;
        } else {
            var obj = {};
            obj[indicatorType] = val;
            obj.count = 1;
            pv.push(obj);
        }

        return pv;
    }, []);
}

export function getCountCircleIndicator(data, indicatorType, deviceType) {
  console.log("start getCountEachOfHumiDataValue")
  var result = getDataDetailFromDeviceType(data, deviceType);

  // pv เป็นตัวตั้ง
  return result.reduce(function (pv, cv) {
      var index = -1;
      var val = cv[indicatorType].value;

      // หา index ไอเท็ม cv ใน pv 
      pv.find(function (item, i) {
          if (item[indicatorType] === val) {
              index = i;
              return i;
          }
      });

      // ถ้ามากกว่าเท่ากับ 0 ให้บวกหนึ่ง : มิฉะนั้น เพิ่มค่าลงใน pv โดยบวกหนึ่ง
      if (index >= 0) {
          pv[index].count += 1;
      } else {
          var obj = {};
          obj[indicatorType] = val;
          obj.count = 1;
          pv.push(obj);
      }

      return pv;
  }, []);
}

export function getDataForSetAxes(data) {
  var day = data[0].x;
  console.log( day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() );
  var minDayTime = subtrackHours(new Date( day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() ), 0);
  var maxDayTime = subtrackHours(new Date( day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + (day.getDate() + 1) ), - 1);

  var result = [];

  var obj = {};

  obj.x = minDayTime;
  obj.y = 0;
  result.unshift(obj)

  obj = {};
  obj.x = maxDayTime;
  obj.y = 110;
  result.push(obj)
  console.log('getDataForSetAxes result...')
  console.log(result)
  return result;
}

function subtrackHours(day, second) {
  day.setTime(day.getTime() - (7 *60*60*1000) + second);
  return day;
}

export function getLinearLineResult(data, indicatorType, deviceType) {
  var result = getDataDetailFromDeviceType(data, deviceType);

  return result.map( e => {
    var obj = {};
    /*obj[indicatorType] = e[indicatorType].value;
    obj.created_at = e.created_at;*/
    obj.x = new Date(e.created_at);
    obj.y = e[indicatorType].value;
    return obj;
  })
}

export function getDataDetailFromDeviceType(data, deviceType) {
    // deviceType => Temperature And Humidity Sensor(THZ2ZT)

    /*return data
        .filter(
            e => (e.value1.indexOf("\"deviceType\":\"" + deviceType + "\"") >= 0)
        )
        .map(e => JSON.parse(e.value1))
        .map(e => JSON.parse(e.dataDetail));*/

    // ค่า create_date มันอยู่ layer ต้นๆเลยทำให้โค้ดซับซ้อน ถ้าจะจัด format
    return data.filter(
            e => (e.value1.indexOf("\"deviceType\":\"" + deviceType + "\"") >= 0)
        )
        .map(e => { 
            var value1 = JSON.parse(e.value1)
            value1.created_at = e.created_at
            return value1
        }).map(e => { 
            var dataDetail = JSON.parse(e.dataDetail)
            dataDetail.created_at = e.created_at
            return dataDetail
        });
}