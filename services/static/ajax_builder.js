"use strict";

function AJAX_BUILDER(){
  var _self = this;

  _self.response = {};
  _self.api = {
    'protocol' : 'http',
    'domain'   : 'example.com',
    'endpoint' : '/get/data'
  };

  _self.apiparams = {
  };

  _self.buildRequestQuery = function(){
    return $.param(_self.apiparams);
  };

  _self.getRequestURL = function(){
    var url = _self.api.protocol + '://'
        + _self.api.domain
        + _self.api.endpoint
        //+ '&' + _self.buildRequestQuery()
    ;
    return url;
  };

  return {
    // クエリパラメータの設定
    setParam : function(obj){
      _self.apiparams = obj
    },
    setDomain : function(domain) {
      _self.api.domain = domain;
    },
    setEndpoint : function(endpoint) {
      _self.api.endpoint = endpoint;
    },

    // AJAX実行
    get : function(){
      $.ajax({
        type: 'GET',
        url: _self.getRequestURL(),
        cache:false,
        dataType: 'json'
      }).done(function(json){
        _self.response = json;
        if(_self.callback){
          _self.callback();
        }
        return _self.response;
      }).fail(function(json){
        // エラー
        return json;
      });
    },

    // AJAX結果のjsonを返す。
    getResponse : function(){
      return _self.response;
    },

    // Callbackをsetする。
    setCallback : function(fn){
      _self.callback = fn;
      return;
    }
  };

}

