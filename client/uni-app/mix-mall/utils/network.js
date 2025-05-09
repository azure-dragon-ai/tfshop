/** +----------------------------------------------------------------------
 * | TFSHOP [ 轻量级易扩展低代码开源商城系统 ]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020~2023 https://www.dswjcms.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉TFSHOP相关版权
 * +----------------------------------------------------------------------
 * | Author: Purl <383354826@qq.com>
 * +----------------------------------------------------------------------
 */
import { getPlatform,getLogin } from 'utils'
import configURL from './config.js'
import store from '@/store'
import i18n from '@/utils/lang/index'
function request(url, method, params, header, success, fail) {
  this.requestLoading(url, method, params, header, "", success, fail)
}

// get请求
function setGet(url,  params, success, fail) {
  this.requestLoading(url, 'get', params, "", "", success, fail)
}

// get请求带提示
function setGetMessage(url, params, message, success, fail) {
  this.requestLoading(url, 'get', params, "", message, success, fail)
}

// post请求
function setPost(url, params, success, fail) {
  this.requestLoading(url, 'post', params, "", "", success, fail)
}

// post请求带提示
function setPostMessage(url, params, message, success, fail) {
  this.requestLoading(url, 'post', params, "", message, success, fail)
}

// put请求
function setPut(url, params, success, fail) {
  this.requestLoading(url, 'put', params, "", "", success, fail)
}

// Put请求带提示
function setPutMessage(url, params, message, success, fail) {
  this.requestLoading(url, 'put', params, "", message, success, fail)
}

// delete请求
function setDelete(url, params, success, fail) {
  this.requestLoading(url, 'delete', params, "", "", success, fail)
}

// delete请求带提示
function setDeleteMessage(url, params, message, success, fail) {
  this.requestLoading(url, 'delete', params, "", message, success, fail)
}

//获取URL参数
function getUrlKey(name){
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

// 展示进度条的网络请求
// url:网络请求的url
// method: HTTP 请求方法
// params:请求参数
// header: header头
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, method, params, header, message, success, fail) {
  // console.log(params)
  
  uni.showNavigationBarLoading()
  
  if (message != "") {
	// #ifndef APP-PLUS
    uni.showLoading({
      title: message,
    })
	// #endif
  }

  let applytoken = uni.getStorageSync('tfshopApplytoken')
  // #ifndef MP
  // 微信内部加载H5时
	// if(getUrlKey('api_token')){
	// 	applytoken = getUrlKey('api_token')
	// }
  // #endif
  
  uni.request({
    url: configURL.BaseURL + url,
    data: params,
    header: header ? header : {
      //'Content-Type': 'application/x-www-form-urlencoded'
      'content-type': 'application/json',
      'apply-secret': configURL.secret,
      'openid': uni.getStorageSync('applyDsshopOpenid'),
	    'Authorization': uni.getStorageSync('tfshopTokenType') + ' ' + applytoken,
      'Lang': uni.getStorageSync('language') || 'zh'
    },
    method: method ? method : 'get',
    success: function (res) {
      //console.log(res.data)
      uni.hideNavigationBarLoading()
      if (message != "") {
        uni.hideLoading()
      }
      if (res.statusCode == 200) {
		  if(res.data.result === 'ok'){
			  success(res.data.message)
		  }else{
			  fail({message: res.data})
		  }
		  
	  }else if (res.statusCode == 500) {
		  if(res.data.message.indexOf('The refresh token is invalid') !== -1 || res.data.message.indexOf('Unauthenticated') !== -1 || res.data.message.indexOf(i18n.t('login.timed.out')) !== -1){
			  store.commit('logout')
			  setTimeout(()=>{
			  	uni.navigateTo({
			  		url:'/pages/public/login'
			  	})
			  }, 600)
		  }else{
			  fail({message: res.data.message})
		  }
	  }else if (res.statusCode == 302) {
		  // #ifdef MP
		  getLogin()
		  // #endif
		  fail({message: i18n.t('request.login.timed.out')})
	  }else if (res.statusCode == 401) {
		  fail({message: res.data.message})
      } else {
        fail({message: i18n.t('request.server_exception')})
      }

    },
    fail: function (res) {
      uni.hideNavigationBarLoading()
      if (message != "") {
        uni.hideLoading()
      }
      if(res.data){
      		fail({message: res.data.message})
      }else{
      		fail({message: i18n.t('request.server_exception')})
      }
    },
    complete: function (res) {
		
    },
  })
}
module.exports = {
  request: request,
  setGet: setGet,
  setGetMessage: setGetMessage,
  setPost: setPost,
  setPostMessage: setPostMessage,
  setPut: setPut,
  setPutMessage: setPutMessage,
  setDelete: setDelete,
  setDeleteMessage: setDeleteMessage,
  requestLoading: requestLoading
}