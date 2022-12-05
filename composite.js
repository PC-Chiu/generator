$(function () {
    $('#p-birthday').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        language: 'zh-CN',
        todayBtn: true,
        minView: 'month'
    
    });

    $("#p-random").on('change', function () {
        var isChecked = $(this).prop('checked');
        if (isChecked) {
            $('#p-province').attr("disabled","disabled");
            $('#p-city').attr("disabled","disabled");
            $('#p-county').attr("disabled","disabled");
            $('#p-birthday').attr("disabled","disabled");
            $('input[name="p-sex"]').attr("disabled","disabled");
        } else {
            $('#p-province').removeAttr("disabled");
            $('#p-city').removeAttr("disabled");
            $('#p-county').removeAttr("disabled");
            $('#p-birthday').removeAttr("disabled");
            $('input[name="p-sex"]').removeAttr("disabled");
        }
    });
    
});

/**生成身份证号、手机号、银行卡号**/
function generatePersonalId() {
    toastr.options.positionClass = 'toast-center-center';
    toastr.options.timeOut = 1000;

    var province = $('#p-province').val();
    var city = $('#p-city').val();
    var county = $('#p-county').val();
    var birthday = $('#p-birthday').val();
    var sex = $('input[name="p-sex"]:checked').val();
    var flag = true;

    if (province == '-1') {
        toastr.warning('请选择省份!');
        flag = false;
    }
    if (city == '-1') {
        toastr.warning('请选择城市!');
        flag = false;
    }
    if (county == '-1') {
        toastr.warning('请选择区县!');
        flag = false;
    }
    if (birthday == '') {
        toastr.warning('请选择时间!');
        flag = false;
    }
    if (sex == undefined || sex == '') {
        toastr.warning('请选择性别!');
        flag = false;
    }
    if (!flag) {
        return;
    }
    var IDcard;
    var bd = birthday.replace(/\-/g, "");
    var Rand = Math.floor(100 + Math.random() * (999 - 100));
    if (sex == '1') {
        if (Rand % 2 == 0) {
            Rand += 1;
        }
    } else if (sex == '2') {
        if (Rand % 2 != 0) {
            Rand += 1;
        }
    }
    IDcard = county + bd + Rand;
    var verify = getVerifyCode(IDcard);
    IDcard = IDcard + verify;
    $('#p-IDCard').val(IDcard);

    var haoma = generatorPhoneNo();
	$("#p-phoneNo").val(haoma);

    var bankaccount = generatorBankAccount();
    $("#p-bankaccount").val(bankaccount);
}

function generatorCompany() {
    var creditCode = generatorCreditCode();
    $("#c-creditCode").val(creditCode);
    var orgCode =  generatorOrgCode();
	$("#c-orgCode").val(orgCode);
}

function keyArray(obj) {
    var size = 0, key;
    var keys = new Array();
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys[size] = key;
        size++;
      }
    }
    return keys;
};

function randomPersonInfo() {
    var area = administrative_division;
    var provinceArray = keyArray(area);
    var ridx = Math.floor(Math.random() * provinceArray.length);
    var province = provinceArray[ridx];
    var cityArea = getChilden(province, area);
    var cityArray = keyArray(cityArea);
    ridx = Math.floor(Math.random() * cityArray.length);
    var city = cityArray[ridx];
    var countyArea = getChilden(city, cityArea);
    var countyArray = keyArray(countyArea);
    ridx = Math.floor(Math.random() * countyArray.length);
    var county = countyArray[ridx];

    // 截止现在，年龄在 18~120 岁之间
    var startDate = moment().subtract(120, 'years');
    var endDate = moment().subtract(18, 'years');
    var between = endDate.valueOf() - startDate.valueOf();
    var birthdayTimestamp = Math.floor(Math.random() * between + startDate.valueOf());
    var birthday = moment(birthdayTimestamp).format('YYYY-MM-DD');
    var sex = Math.ceil(Math.random() * 2);

    var selectProvince = $('#p-province');
    var selectCity = $('#p-city');
    var selectCounty = $('#p-county');
    var inputBirthday = $('#p-birthday');

    selectProvince.val(province);
    selectProvince.trigger("change");
    selectCity.val(city);
    selectCity.trigger("change");
    selectCounty.val(county);
    inputBirthday.val(birthday);
    if (sex == 1) {
        $('#p-sex1').prop("checked", "true");
        $('#p-sex2').removeAttr("checked");
    } else {
        $('#p-sex1').removeAttr("checked");
        $('#p-sex2').prop("checked", "true");
    }
}
