/**
填充行政区划
xuzhenpeng 
20160428
**/
var cityArea;
var p_cityArea;
$(function () {
  var area = administrative_division;

  var province = $('#province');
  var city = $('#city');
  var county = $('#county');

  province.append("<option value='-1'>-请选择-</option>");
  city.append("<option value='-1'>-请选择-</option>");
  county.append("<option value='-1'>-请选择-</option>");

  for (var key in area) {
    province.append("<option value='" + key + "'>" + getNameByKey(key, area) + "</option>");
  }

  province.on('change', function () {
    cleanSelect(city);
    cleanSelect(county);
    cityArea = getChilden($(this).val(), area);
    for (var key in cityArea) {
      city.append("<option value='" + key + "'>" + getNameByKey(key, cityArea) + "</option>");
    }
  });

  city.on('change', function () {
    cleanSelect(county);
    var countyArea = getChilden($(this).val(), cityArea);
    for (var key in countyArea) {
      county.append("<option value='" + key + "'>" + countyArea[key] + "</option>");
    }
  });

  var p_province = $('#p-province');
  var p_city = $('#p-city');
  var p_county = $('#p-county');

  p_province.append("<option value='-1'>-请选择-</option>");
  p_city.append("<option value='-1'>-请选择-</option>");
  p_county.append("<option value='-1'>-请选择-</option>");

  for (var key in area) {
    p_province.append("<option value='" + key + "'>" + getNameByKey(key, area) + "</option>");
  }

  p_province.on('change', function () {
    cleanSelect(p_city);
    cleanSelect(p_county);
    p_cityArea = getChilden($(this).val(), area);
    for (var key in p_cityArea) {
      p_city.append("<option value='" + key + "'>" + getNameByKey(key, p_cityArea) + "</option>");
    }
  });

  p_city.on('change', function () {
    cleanSelect(p_county);
    var p_countyArea = getChilden($(this).val(), p_cityArea);
    for (var key in p_countyArea) {
      p_county.append("<option value='" + key + "'>" + p_countyArea[key] + "</option>");
    }
  });
});

//根据key获取名称
var getNameByKey = function (key, obj) {
  var temp = obj[key];
  for (var key1 in temp) {
    return key1;
  }
}

//获取子集
var getChilden = function (key1, obj) {
  var ab = obj[key1];
  for (var key in ab) {
    return ab[key];
  }

}

//清空选择框
var cleanSelect = function ($obj) {
  $obj.empty();
  $obj.append("<option value='-1'>-请选择-</option>");
}
