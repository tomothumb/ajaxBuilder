/*
 * This file is part of ajaxbuilder.
 * v1.0.0
 * (c) 2015-2016 Tomoyuki Tsujimoto
 * https://github.com/tomothumb/ajaxBuilder
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


"use strict";


// WordpressのAjax用のの抽象クラス
function WP_AJAX_BUILDER(){
  var _self = this;

  _self.response = {};
  _self.api = {
    'protocol' : window.location.protocol.replace(/\:/,''),
    'domain'   : window.location.host,
    'endpoint' : '/wp-json/posts?'
  };

  _self.apiparams = {
      // 'type[]' : "post",
      // 'filter[meta_key]'   :'foo',
      // 'filter[meta_value]' :'bar',
      // 'filter[posts_per_page]':'2'
      // 'filter[orderby]'    :'rand',
  };

  _self.buildRequestQuery = function(){
    return $.param(_self.apiparams);
  };

  _self.getRequestURL = function(){
    var url = _self.api.protocol + '://'
            + _self.api.domain
            + _self.api.endpoint
            + '&' + _self.buildRequestQuery()
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

    // AJAX実行
    get : function(){
      $.ajax({
        type: 'GET',
        url: _self.getRequestURL(),
        cache: false,
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

