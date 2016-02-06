/*
 * Ajax Helper Library.
 * v1.0.0
 * (c) 2015-2016 Tomoyuki Tsujimoto
 * https://github.com/tomothumb/ajaxBuilder
 *
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

function AJAX_BUILDER(){
  var _self = this;

  _self.response = {};
  _self.api = {
    'protocol' : window.location.protocol.replace(/\:/,''),
    'domain'   : window.location.host,
    'endpoint' : '/get/data'
  };

  _self.apiparams = {
  };

  _self.$formEle;

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
    setProtocol : function(protocol) {
      _self.api.protocol = protocol;
    },
    protocol : function(protocol) {
      _self.api.protocol = protocol;
    },
    setDomain : function(domain) {
      _self.api.domain = domain;
    },
    domain : function(domain) {
      _self.api.domain = domain;
    },
    setEndpoint : function(endpoint) {
      _self.api.endpoint = endpoint;
    },
    setForm : function(targetID) {
      _self.$formEle = $(targetID);
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

    post : function(){
      $.ajax({
        type: 'POST',
        url: _self.getRequestURL(),
        data: _self.$formEle.serialize(),
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

