// [ Global Object ]
var arrayDamName = [];
var arrayDamHtml = [];
var arrayDam = [];

$(document).ready(function () {
  set_header();
  define_select2();
  define_goToTop();

  var url_string = window.location.href;
  var url = new URL(url_string);
  var get_dam = url.searchParams.get('dam');

  // [ Test Loading modal ... ]
  // $('#loadModal').modal('toggle');
  // Swal.fire({
  //   title: 'กำลังส่งข้อมูล',
  //   html: 'กรุณารอสักครู่...',
  //   didOpen: () => {
  //     Swal.showLoading()
  //   },
  // });

  var dam_menu = ['info', 'mechanic', 'water', 'gallery'];
  if (dam_menu.includes(get_dam) == true) {
    define_damMenu();
  }
});

$("#inputDam").change(function() {
  // toggle_damContent();
  // changeAutoComplete();
});

$("#inputDam_btn").click(function() {
  // toggle_damContent();
  // changeAutoComplete();
});

function toggle_damContent() {
  setTimeout(function() {
    let timerInterval
    Swal.fire({
      title: 'กำลังส่งข้อมูล',
      html: 'กรุณารอสักครู่...',
      timer: 750,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        var inputDam = $("#inputDam").val();
        console.log( inputDam );
        console.log( arrayDamName );

        var div_content = $("#div_content");
        var div_content = document.getElementById("div_content").childNodes;

        for (let i = 0; i < div_content.length; i++) {
          var dam_name = div_content[i].getAttribute('dam_name');

          if( inputDam != '' ) {
            if( dam_name != inputDam ) {
              div_content[i].hidden = true;
            }else if( dam_name == inputDam ) {
              div_content[i].hidden = false;
            }
          } else {
            div_content[i].hidden = false;
          }
        }
      }
    });
  },500);
}

function define_autoComplete( arrayDamName ) {
  autocomplete_0(document.getElementById("inputDam"), arrayDamName);
}

function define_goToTop() {
  //Get the button:
  var backToTopButton = document.querySelector('#btn_goToTop');

  // When the user scrolls down 100px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  }

  var goToTop = () => {
    document.body.scrollIntoView();
  };
  backToTopButton.addEventListener('click', goToTop);
}

function define_select2() {
  $('.select2').select2();
}

function set_header() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var get_dam = url.searchParams.get('dam');

  var text = '';
  if (get_dam == 'getDam') {
    $('#section_filterDam').removeAttr('hidden');
    $('#div_content').removeAttr('hidden');
    $('#section_menu').attr('hidden' ,true);
    


    text = 'ระบบค้นหาเขื่อน';
    // } else if (get_dam == 0) {
    //   $('#section_filterDam').removeAttr('hidden');
    //   text = 'เขื่อนขนาดใหญ่';
    // } else if (get_dam == 1) {
    //   $('#section_filterDam').removeAttr('hidden');
    //   text = 'เขื่อนขนาดกลาง';
    // } else if (get_dam == 2) {
    //   $('#section_filterDam').removeAttr('hidden');
    //   text = 'เขื่อนขนาดเล็ก';
  } else if (get_dam == 'info') {
    $('#section_info').removeAttr('hidden');
    $('#div_damname').removeAttr('hidden');
    $('#section_menu').removeAttr('hidden');
    text = 'ข้อมูลเขื่อนทั่วไป';
    // body.style.backgroundColor = '#C78484';
  } else if (get_dam == 'mechanic') {
    $('#section_mechanic').removeAttr('hidden');
    $('#div_damname').removeAttr('hidden');
    $('#section_menu').removeAttr('hidden');
    
    text = 'ข้อมูลทางวิศวกรรม';
    // body.style.backgroundColor = '#AAFFAA';
  } else if (get_dam == 'water') {
    $('#section_water').removeAttr('hidden');
    $('#div_damname').removeAttr('hidden');
    $('#section_menu').removeAttr('hidden');
    text = 'ระดับน้ำและความจุ';
    // body.style.backgroundColor = '#FDF9AB';
  } else if (get_dam == 'gallery') {
    $('#section_gallery').removeAttr('hidden');
    $('#div_damname').removeAttr('hidden');
    text = 'อัลบั้มโครงการ';
    // body.style.backgroundColor = '#AADEFF';
  }

  html = '<h2 style="margin: auto;">' + text + '</h2>';
  console.log(html);

  $('#div_damname').html(html);
}

$('#selectDamtype').change(function () {
  Swal.fire({
    title: 'กำลังส่งข้อมูล',
    html: 'กรุณารอสักครู่...',
    didOpen: () => {
      Swal.showLoading()
    },
  });

  $("#inputDam").val('');

  if( $('#selectDamtype').val() != '' ) {
    select_Province();
    select_Dam();
  } else {
    $("#div_content").html('');
  }
  Swal.close();
});

$('#selectDepartment').change(function () {
  $("#inputDam").val('');

  select_Province();
  // setTimeout(function () {
  select_Dam();
  // }, 500);
});

function select_Province() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  // var get_dam = url.searchParams.get('dam');
  var get_dam = $('#selectDamtype').val();
  var department = $('#selectDepartment').val();

  if (department == '') {
    var data = {
      action: 'province',
      dam: get_dam,
    };
  } else {
    var data = {
      action: 'province',
      dam: get_dam,
      department: department,
    };
  }

  $('#selectProvince').html('<option value="">เลือกจังหวัด</option>');
  $.ajax({
    type: 'post',
    url: 'https://misfund.rid.go.th/damsafetyapi/api.php',
    data: data,
    dataType: 'json',
    success: function (response) {
      var option = "<option value=''>เลือกจังหวัด</option>";
      for (var i = 0; i < response.length; i++) {
        option +=
          "<option value='" +
          response[i].province_name +
          "'>" +
          response[i].province_name +
          ' ( ' +
          response[i].number_of_dams +
          ' ) ' +
          '</option>';
      }
      $('#selectProvince').html(option);
      swal.close();
    },
    error: function (xhr, exception) {
      var msg = xhr.status;
      console.log('Province Error : ', msg);
    },
  });
}

$('#selectProvince').change(function () {
  select_Dam();
});

function select_Dam() {
  // ! ====================================================
  var url_string = window.location.href;
  var url = new URL(url_string);
  // var get_dam = url.searchParams.get('dam');
  var get_dam = $('#selectDamtype').val();
  var department = $('#selectDepartment').val();
  var province = $('#selectProvince').val();
  // ! ====================================================
  if (department == '' && province == '') {
    var data = {
      action: 'dam_name',
      dam: get_dam,
    };
  } else if (department != '' && province != '') {
    var data = {
      action: 'dam_name',
      dam: get_dam,
      department: department,
      province: province,
    };
  } else {
    if (department != '') {
      var data = {
        action: 'dam_name',
        dam: get_dam,
        department: department,
      };
    } else if (province != '') {
      var data = {
        action: 'dam_name',
        dam: get_dam,
        province: province,
      };
    }
  }
  // ! ====================================================
  // Define arrayDam = array object
  $.ajax({
    type: 'post',
    url: 'https://misfund.rid.go.th/damsafetyapi/api.php',
    data: data,
    dataType: 'json',
    success: function (response) {
      console.log('response : ',response);

      arrayDamName = [];
      arrayDamHtml = [];
      arrayDam = [];

      var div_content = '';
      for (var i = 0; i < response.length; i++) {
        var html = '';
        var objectDam = {};
        
        html += '<section class="section_content" style="margin-top: 2%;" ';
        html += 'dam_id="' + response[i].id + '" ';
        html += 'dam_name="' + response[i].dam_name + '" ';
        // html += 'onclick="$(\'#btnSend\').click();" ';
        // html += 'onclick="console.log(".section_content click");" ';
        html += '>';

        html += '<div class="row">';
        html +=
          '<p> ต.' +
          response[i].sub_district_name +
          ', อ.' +
          response[i].district_name +
          ', จ.' +
          response[i].province_name +
          '</p>';
        html += '<span class="col-2 badge bg-primary text-wrap" style="align-self:    center; padding:2%">' +
          'สชป. ' +
          response[i].department +
          '</span>';
        html += '<div class="col-10 display-6">';
        html += response[i].dam_name;
        html += '</div>';
        html += '</div>';
        html += '</section>';

        div_content += html;

        arrayDamName.push(response[i].dam_name);
        arrayDamHtml.push(html);

        objectDam['name'] = response[i].dam_name;
        objectDam['html'] = html;
        arrayDam.push(objectDam);
      }
      $('#div_content').html(div_content);
      click_section_content();
    },
    error: function (xhr, exception) {
      var msg = xhr.status;
      console.log('Dam Error : ', msg);
    },
  });
  // ! ====================================================
}

// ! ====================================================
// Exam = ห้วยชิบาโบ ห้วยหอย ห้วยเดื่อ
let inputField = document.getElementById('inputDam');
let div_content = document.getElementById('div_content');

inputField.addEventListener('input', changeAutoComplete);
function changeAutoComplete({ target }) {
  let data = target.value;
  // function changeAutoComplete() {
  //   let data = inputField.value;

  div_content.innerHTML = ``;
  if (data.length) {
    let autoCompleteValues = autoComplete(data);
    // console.log('autoCompleteValues : ',autoCompleteValues);
    // console.log('test : ',autoCompleteValues.length);

    if(autoCompleteValues.length > 500) {
      let timerInterval
      Swal.fire({
        title: 'กำลังส่งข้อมูล',
        html: 'กรุณารอสักครู่...',
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    }
    autoCompleteValues.forEach((value, index) => { 
      // addItem(value); 

      if( index < 100 ) {
        addItem(value); 
      } else {
        setTimeout(function() {
          addItem(value); 
        },250);
      }

      click_section_content();
    });
  }
}

function autoComplete(inputValue) {
  // var testArrObj = [{ "name": 'Jean', "price": 925 }, 
  //   { "name": 'Picard', "price": 1425 }];
  // var arrObj = testArrObj;
  var arrObj = arrayDam;
  // const filteredHomes = arrObj.filter( x => x.price > 900 );
  const filteredHomes = arrObj.filter( 
    (x) => x.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  return filteredHomes;
}

function addItem(value) {
  var html = value.html;
  // div_content.innerHTML = div_content.innerHTML + `<li>${html}</li>`;
  div_content.innerHTML = div_content.innerHTML + html;
}
// ! ====================================================

function click_section_content() {
  // Click .section_content = dam's content
  $('.section_content').click(function (this) {
    var dam_id = $(this).attr('dam_id');

    // $('#loadModal').modal('toggle');
    Swal.fire({
      title: 'กำลังส่งข้อมูล',
      html: 'กรุณารอสักครู่...',
      didOpen: () => {
        Swal.showLoading()
      },
    });
    callPushMessage(dam_id);
    // $('#btnSend').click();
  });
}

function select_Dam_0() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  // var get_dam = url.searchParams.get('dam');
  var get_dam = $('#selectDamtype').val();
  var department = $('#selectDepartment').val();
  var province = $('#selectProvince').val();

  // ! ====================================================
  if (department == '' && province == '') {
    var data = {
      action: 'dam_name',
      dam: get_dam,
    };
  } else if (department != '' && province != '') {
    var data = {
      action: 'dam_name',
      dam: get_dam,
      department: department,
      province: province,
    };
  } else {
    if (department != '') {
      var data = {
        action: 'dam_name',
        dam: get_dam,
        department: department,
      };
    } else if (province != '') {
      var data = {
        action: 'dam_name',
        dam: get_dam,
        province: province,
      };
    }
  }
  // ! ====================================================

  // $('#selectDam').html('<option value="">เลือกเขื่อน</option>');
  $.ajax({
    type: 'post',
    url: 'https://misfund.rid.go.th/damsafetyapi/api.php',
    data: data,
    dataType: 'json',
    success: function (response) {
      arrayDamName = [];
      var html = '';
      for (var i = 0; i < response.length; i++) {
        html += '<section class="section_content" style="margin-top: 2%;" ';
        html += 'dam_id="' + response[i].id + '" ';
        html += 'dam_name="' + response[i].dam_name + '" ';
        // html += 'onclick="$(\'#btnSend\').click();" ';
        // html += 'onclick="console.log(".section_content click");" ';
        html += '>';

        html += '<div class="row">';
        html +=
          '<p> ต.' +
          response[i].sub_district_name +
          ', อ.' +
          response[i].district_name +
          ', จ.' +
          response[i].province_name +
          '</p>';
        html += '<span class="col-2 badge bg-primary text-wrap" style="align-self:    center; padding:2%">' +
          'สชป. ' +
          response[i].department +
          '</span>';
        html += '<div class="col-10 display-6">';
        html += response[i].dam_name;
        html += '</div>';
        html += '</div>';
        html += '</section>';

        arrayDamName.push(response[i].dam_name);
      }
      $('#div_content').html(html);
      define_autoComplete( arrayDamName );

      // Click .section_content = dam's content
      $('.section_content').click(function (this) {
        var dam_id = $(this).attr('dam_id');

        // $('#loadModal').modal('toggle');
        Swal.fire({
          title: 'กำลังส่งข้อมูล',
          html: 'กรุณารอสักครู่...',
          didOpen: () => {
            Swal.showLoading()
          },
        });
        callPushMessage(dam_id);
        // $('#btnSend').click();
      });
    },
    error: function (xhr, exception) {
      var msg = xhr.status;
      console.log('Dam Error : ', msg);
    },
  });
}

function callPushMessage(selectDam) {
  var userId = $('#userId').val();
  // var selectDam = $('#selectDam').val();
  // console.log(selectDam);

  // [ Raw Data ]
  var data = {
    action: 'dam_info',
    id: selectDam,
  };

  $.ajax({
    type: 'post',
    url: 'https://misfund.rid.go.th/damsafetyapi/api.php',
    data: data,
    dataType: 'json',
    success: function (response) {
      var dam_name = response[0].dam_information.dam_name;
      var images_1 = response[0].images.image_1;
      // ajax to pushFlex.php
      var data = {
        userId: userId,
        dam_name: dam_name,
        images_1: images_1,
        damId: selectDam,
      };
      // console.log(data);
      $.ajax({
        type: 'post',
        url: 'https://misfund.rid.go.th/damSafetyPushMessage/pushFlex.php',
        data: data,
        dataType: 'json',
        success: function (response) {
          // console.log(response);
          if( response.result == 'S' ) {
            $('#btnSend').click();
          } else if( response.result == 'E' ) {
            // $('#loadModal').modal('toggle');
            Swal.fire({
              icon: 'error',
              title: 'ไม่สามารถส่งข้อมูลได้',
              text: response.message.message,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ออก',
            });
          }
        },
        error: function (xhr, exception) {
          // console.log(xhr);
          var msg = xhr.status;
          // $('#loadModal').modal('toggle');
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถส่งข้อมูลได้',
            text: msg,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ออก',
          });
        },
      });
    },
    error: function (xhr, exception) {
      var msg = xhr.status;
      console.log('Dam Error : ', msg);
    },
  });

}

function define_damMenu() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var get_dam = url.searchParams.get('dam');
  var get_damId = url.searchParams.get('damId');

  // [ Raw Data ]
  var data = {
    action: 'dam_info',
    id: get_damId,
  };
  $.ajax({
    type: 'post',
    // 
    url: 'https://dam-database.rid.go.th/damSafetyApi/api.php',
    // url: 'https://misfund.rid.go.th/damsafetyapi/api_v2.php',
    data: data,
    dataType: 'json',
    success: function (response) {
      var data = response[0];
      console.log('data : ', data);
      var info = data.dam_information;
      var mechanic = data.engineering_information;
      var water = data.water_level;
      var gallery = data.images;

      if (get_dam == 'info') {
        // info from dam_information
        // html = '<h4>';
        
        
        html += '<div class="info">';
        html +=
          '<span>' +
          info.sub_district_name_detail +
          ' : ' +
          info.sub_district_name +
          '<br>';
        html += info.district_name_detail + ' : ' + info.district_name + '<br>';
        html += info.province_name_detail + ' : ' + info.province_name + '<br>';
        html +=
          '<div class="badge bg-primary text-wrap" style="font-size:16px;">' +
          info.department_name +
          '</div>';

        html +=
          '<p class="mt-1">ปีที่ก่อสร้างแล้วเสร็จ : <span class="font-dotted">' +
          info.year +
          '</span></p>';
        html +=
          '<p class="font-weight-bold">อายุเขื่อน <span class="font-dotted">' +
          info.age +
          ' ปี</span></p><p class="font-weight-bold">พิกัด <span class="font-dotted"><a href="https://www.google.co.th/maps/@' +
          info.lat +
          ',' +
          info.long +
          ',15z">' +
          info.lat +
          ',' +
          info.long +
          '</a></span></p></div>';
        html += '<div>';

        $('#section_info').html(html);
        $('#header').html(info.dam_name);
      } else if (get_dam == 'mechanic') {
        // mechanic from engineering_information
        html += '<div class=" fs-5">';
        if (mechanic.spillway_maximum != null) {
          html += mechanic.dam_long +
            
           
            '</p>';
        }
        if (mechanic.dam_height != null) {
          html += mechanic.dam_height +
            // '<p>ความสูง' +
            // // mechanic.dam_height_detail +
            // ' <span class="font-dotted">' +
            // mechanic.dam_height +
            // ' </span> ' +
            // mechanic.dam_height_unit +
            '</p>';
        }
        if (mechanic.dam_wide != null) {
          html +=
            '<p>ความกว้าง' +
            // mechanic.dam_wide_detail +
            ' <span class="font-dotted">' +
            mechanic.dam_wide +
            ' </span> ' +
            mechanic.dam_wide_unit +
            '</p>';
        }
        if (mechanic.spillway_maximum != null) {
          html +=
            '<p>อาคารท่อส่งน้ำ/ระบายน้ำ</p><p>' +
            // mechanic.dam_wide_detail +
            
            mechanic.spillway_maximum +
            
            '</p>';
        }
        if (mechanic.turnout_maximum != null) {
          html +=
            '<p>อาคารระบายน้ำล้น</p><p>' +
            // mechanic.dam_wide_detail +
            
            mechanic.turnout_maximum +
            
            '</p>';
        }

        html += '</div>';
        $('#section_mechanic').html(html);
      } else if (get_dam == 'water') {
        // water from water_level
        // html = '<h4>';
          html += '<div class="fs-5">';
          
          if (water.capacity_1 != null) {
            
            html += '<p>' + water.capacity_1 ;
          }
          if (water.water_level_1 != null) {
            
            html += '<span> ' + water.water_level_1  + '</span></p>';
          }
          if (water.capacity_2 != null) {
            
            html += '<p>' + water.capacity_2 ;
          }
          if (water.water_level_2 != null) {
            
            html += '<span> ' + water.water_level_2  + '</span></p>';
          }
          if (water.capacity_3 != null) {
            
            html += '<p>' + water.capacity_3 + '</p>';
          }
          if (water.water_level_3 != null) {
            
            html += '<p>' + water.water_level_3  + '</p>';
          }
          if (water.water_level_4 != null) {
            
            html += '<p>' + water.water_level_4 + '</p>';
          }
          if (water.water_level_5 != null) {
            
            html += '<p>' + water.water_level_5  + '</p>';
          }



        // if (water.water_level_1 != null) {
        //   html += '<p class="mb-1">ร.น.ส. <span class="font-dotted"> +';
        //   html += water.water_level_1 + ' </span> ';
        //   html += water.water_level_1_unit;
        //   html +=
        //     '</p><p class="pt-0"> ปริมาตร <span class="font-dotted">' +
        //     water.capacity_1 +
        //     ' </span>';
        //   html += water.capacity_1_unit + '</p>';
        // }
        // if (water.water_level_2 != null) {
        //   html += '<p class="mb-1">ร.น.ก. <span class="font-dotted">+';
        //   html += water.water_level_2 + ' </span>';
        //   html += water.water_level_2_unit + '';
        //   html +=
        //     '</p><p>ปริมาตร <span class="font-dotted">' +
        //     water.capacity_2 +
        //     ' </span>';
        //   html += water.capacity_2_unit + '';
        // }
        // if (water.water_level_3 != null) {
        //   html += '<p class="mb-1">ร.น.ต. <span class="font-dotted"> +';
        //   html += water.water_level_3 + ' </span>';
        //   html += water.water_level_3_unit + '';
        //   html +=
        //     '<p> ปริมาตร <span class="font-dotted"> ' +
        //     water.capacity_3 +
        //     ' </span>';
        //   html += water.capacity_3_unit + '</p>';
        // }
        // if (water.dam_level != null) {
        //   html +=
        //     '<p class="mb">' +
        //     water.dam_level_detail +
        //     '<span class="font-dotted"> 00 ';
        //   html += water.dam_level + ' </span>';
        //   html += water.dam_level_unit;
        // }
        // ปัจจุบัน ไม่มีข้อมูล swoc
        // html += '<p class="mb-1">ปัจจุบัน <span class="font-dotted"> +0.000';
        // html += '</span> ม.รทก.';
        // html += '</p><p>ปริมาตร';
        // html += '<span class="font-dotted"> +0.000 </span>';
        // html += 'ล้าน ลบ.ม.</p>';

        // html += '</h4>';
        $('#section_water').html(html);
      } else if (get_dam == 'gallery') {
        var gallery_length = Object.keys(gallery).length;
        for (var i = 0; i < gallery_length; i++) {
          var images_i = Object.values(gallery)[i];

          html += '<a href="' + images_i + '">';
          html += '<img src="' + images_i + '" ';
          html += 'title="' + info.dam_name + '" ';
          html += 'alt="' + 'รูปที่ ' + (i+1) + '" ';
          html += '/> </a>';
        }
        $('#galleria').html(html);
        // Initialize Galleria
        define_galleria();
      }
      const damname = '<h2>'+info.dam_name+'</h2>';
      $('#header').html(damname);
      $(".div_menu a").prop("href", "https://quickstart-liff-rxsms9.stackblitz.io/?dam=mechanic&damId="+get_damId);
      $(".bg_menu_center a").prop("href", "https://quickstart-liff-rxsms9.stackblitz.io/?dam=water&damId="+get_damId);
      $(".bg_menu_right a").prop("href", "https://quickstart-liff-rxsms9.stackblitz.io/?dam=gallery&damId="+get_damId);


    },
    error: function (xhr, exception) {
      var msg = xhr.status;
      console.log('Dam Error : ', msg);
    },
  });
}

function define_galleria() {
  // Initialize Galleria
  Galleria.loadTheme(
    'https://cdnjs.cloudflare.com/ajax/libs/galleria/1.6.1/themes/classic/galleria.classic.min.js'
    // 'https://cdnjs.cloudflare.com/ajax/libs/galleria/1.6.1/themes/fullscreen/galleria.fullscreen.min.js'
    // 'https://cdnjs.cloudflare.com/ajax/libs/galleria/1.6.1/themes/twelve/galleria.twelve.min.js'
  );
  Galleria.configure({
    transition: 'fade',
    // autoplay: 4000, // forward every 4 seconds
    pauseOnInteraction: true,
    imageCrop: false,
    fullscreenCrop: false,
    fullscreenDoubleTap: true,
    fullscreenTransition: true,
    lightbox: true,
  });
  // $('#galleria').galleria();
  Galleria.run('#galleria');

  Galleria.on('image', function (e) {
    // $(e.imageTarget).parent().zoom();
    // console.log('on image : ', e);
  });

  $('.galleria-image img').each(function () {
    console.log('each : ', this);
  });

  // $('#galleria').height($(window).height() - 20);
  document.getElementById('galleria').style.height = '80vh';

  // full screen by defualt
  Galleria.ready(function (options) {
    // this.enterFullscreen();
  });
}

function autocomplete_0(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}