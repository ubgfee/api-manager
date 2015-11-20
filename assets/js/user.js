/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/23
 * Time: 14:06
 */

$(function(){
  if($('.mh600').height()<window.innerHeight-200){
    $('.mh600').css('height', window.innerHeight-200);
  }

  var $json =  $('#json');
  var isAdmin = $('#isAdmin').val() == 1;

  isAdmin && $.getJSON('/interface/list', {type: 'projects'}, function(json){
    renderProjectSelect(json.data);
  });

  $('#select').on('click', function(){
    $.getJSON('/interface/list', {type: $('#type').val()}, function(json){
      $json.empty();
      if(json.isSuccess && json.data.length > 0){
        json.data.forEach(function(item, i){
          $json.append(JSON.stringify(item)  + '<br>');
        });
      }else{
        $json.html('无数据');
      }
    });
  });
  $('#addUser').on('click', function(){
    $.post('/interface/addUser', $('#addUserForm').serialize(), function(json){
      alert(json.message);
      if(json.isSuccess){
        $('#addUserForm')[0].reset();
      }
    }, 'json');
    return false;
  });

  //项目管理
  $('#addProject').on('click', function(){
    var $this = $(this),
      $form = $this.closest('form'),
      isNew = $this.attr('data-new') == 1 ? true : false,
      url = isNew ? '/interface/addProject' : '/interface/updateProject';
    if(!$form.validator('isFormValid')){
      return false;
    }

    $.post(url, $form.serialize(), function(json){
      if(isNew && json.isSuccess){
        var data = json.data;
        window.location.href = "/project/" + data.id;
      }

      if(!json.isSuccess){
        apiAlert(json.message);
      }

      if(!isNew && json.isSuccess){
        apiAlert(json.message);
      }
    }, 'json');
    return false;
  });

  $('#deleteProject').on('click', function(){
    var pid = $(this).attr('data-id');
    apiConfirm(function(){
      $.post('/interface/delProject', {id: pid}, function (json) {
        if (json.isSuccess) {
          location.href = "/";
        }else{
          apiAlert(json.message);
        }
      }, 'json');
    }, undefined, "确定删除该项目及其所有模块和api？")

  });

  //模块管理
  $('#addModule').on('click', function(){
    var $this = $(this),
      $form = $this.closest('form'),
      isNew = $this.attr('data-new') == 1 ? true : false,
      url = isNew ? '/interface/addModule' : '/interface/updateModule',
      projectId = $('#projectId').val();

    if(!projectId){
      apiAlert('请先选择项目，如果没有项目，必须先添加项目！');
      return false;
    }
    $.post(url, $form.serialize(), function(json){
      if(json.isSuccess){
        location.href = '/module/index?pid='+projectId;
      }else{
        apiAlert(json.message);
      }
    }, 'json');
    return false;
  });
  $('.deleteModule').on('click', function(){
    var mid = $(this).attr('data-id');
    apiConfirm(function(){
      $.post('/interface/delModule', {id: mid}, function (json) {
        if (json.isSuccess) {
          location.reload();
        }else{
          apiAlert(json.message);
        }
      }, 'json');
    })
  });

  function renderProjectSelect(data){
    var $select = $('[name=projectId]');
    if(data && data.length > 0){
      $select.empty().append('<option value="">请选择项目</option>');
      data.forEach(function(item, i){
        $select.append('<option value="' + item['id'] + '">' + item['name'] + '</option>');
      });
    }
  }

  //增加api
  $('#moduleId').on('change', function(){
    var $this = $(this);
    if(!!$this.val()){
      $('#moduleName').val($this.find(':selected').text());
      $('#moduleController').val($this.find(':selected').attr('data-controller'));
    }
  });
  var paramIndex = $('[data-params-counter]').length;
  $('#addParam').on('click', function(){
    var $row = $('.paramRow').eq(0).clone().show();
    $row.find('[name=param1]').attr('name', 'paramName[' + paramIndex + ']');
    $row.find('[name=param2]').attr('name', 'paramType[' + paramIndex + ']');
    $row.find('[name=param3]').attr('name', 'paramRequired[' + paramIndex + ']');
    $row.find('[name=param4]').attr('name', 'paramDesc[' + paramIndex + ']');

    $('#paramsDiv').append($row);
    paramIndex += 1;
  });

  $(document).on('click', '.delParam', function(){
    $(this).closest('.paramRow').remove();
  })

  $('#addApi').on('click', function(){
    var $this = $(this),
      $form = $this.closest('form'),
      isNew = $this.attr('data-new') == 1 ? true : false,
      url = isNew ? '/interface/addApi' : '/interface/editApi',
      projectId = $('#projectId').val();
    if(!$form.validator('isFormValid')){
      return false;
    }

    //默认模块名时
    var moduleName = $.trim($('#moduleName').val());
    if(moduleName === ''){
      $('#moduleName').val($('#moduleId').find(':selected').text());
      $('#moduleController').val($('#moduleId').find(':selected').attr('data-controller'));
    }

    $.post(url, $form.serialize(), function(json){
      if(json.isSuccess){
        window.location.href = '/api/index?pid=' + $('#projectId').val();
      }else{
        apiAlert(json.message);
      }
    }, 'json');
    return false;
  });
  $('#editApi').on('click', function(){
    $.post('/interface/editApi', $('#editApiForm').serialize(), function(json){
      alert(json.message);
    }, 'json');
    return false;
  });
  $('.del-api').on('click', function(){

    var aid = $(this).attr('data-aid');
    apiConfirm(function(){
      $.post('/interface/delApi', {id: aid}, function (json) {
        if (json.isSuccess) {
          location.reload();
        }else{
          apiAlert(json.message);
        }
      }, 'json');
    })
  });

  $('#signup').on('click', function(){
    var $this = $(this),
      $form = $this.closest('form');

    if(!$form.validator('isFormValid')){
      return false;
    }

    $.post('/signup', $form.serialize(), function(json){
      if(json.isSuccess){
        apiAlert(json.message);
        setTimeout(function(){
          window.location.href = '/';
        },2000)
      }else{
        apiAlert(json.message);
      }
    }, 'json');
    return false;
  });


  function apiAlert(message){
    var $alert = $('#api-alert');
    $alert.find('.content').html(message);
    $alert.modal();
  }

  function apiConfirm(onConfirm, onCancel, text) {
    var $confirm = $('#api-confirm');
    if(text){
      $confirm.find('.content').html(text);
    }
    $confirm.modal({
      relatedTarget: this,
      onConfirm: onConfirm,
      onCancel: onCancel
    })
  }

  //消息通知
  /*setTimeout(function(){
    showNotice('测试一条消息看看 ：）');
  }, 3000);*/
  $('#closeNotice').on('click', closeNotice);
  function showNotice(message){
    $('#api-notice-content').html(message || '一条未设置消息内容的消息！');
    $('.api-notice-wrap').addClass('api-notice-show');
    setTimeout(function(){
      closeNotice();
    }, 5000);
  }
  function closeNotice(){
    $('.api-notice-wrap').removeClass('api-notice-show');
  }

  //socket
  io.socket.on('notice', function(data) {
    showNotice(data.message);
  });


  //接口测试
  var errorHtml = 'No error!';
  var $viewErrorHtml = $('#viewErrorHtml');
  $('#doTest').on('click', function(){
    var $result = $('#doTestResult');
    var apiUrl = $.trim($('#apiUrl').html());
    var params = {};
    var paramsArr = [];
    $('#apiParams').find('[data-key]').each(function(){
      var $this = $(this);
      params[$this.attr('data-key')] = $this.val();
      paramsArr.push($this.attr('data-key') + '=' + $this.val());
    });
    $result.html('请求已发出，请稍等...');
    $.post('/interface/doTest', {
      apiUrl: apiUrl,
      params: params,
      paramsArr: paramsArr.join('&'),
      method: $('#method').val()
    }, function (json) {
      if(json.isSuccess){
        $result.html('调用成功!');
        $('#test_returns').val(JSON.stringify(json.data));
        $viewErrorHtml.hide();
      }else{
        $result.html(json.message);
        errorHtml = json.data;
        //apiAlert(json.message);
        $('#test_returns').val(JSON.stringify({
          "api_response": json.data
        }));
        $viewErrorHtml.show();
      }
      setTimeout(function(){
        Process('test_returns');
      }, 10);
    }, 'json');
  });
  $viewErrorHtml.on('click', function(){
    var opener = window.open();
    opener.document.body.innerHTML = errorHtml;
  });

  //导出excel
  $('#export-excel').click(function(){
    var $this = $(this),
      pid = $this.attr('data-id');

    location.href = '/project/exportExcel?pid='+pid;
  })


  $('.prj-item').click(function(){
    var $this = $(this),
      pid = $this.attr('data-pid');

    location.href = '/api/index?pid='+pid;
  })



});
