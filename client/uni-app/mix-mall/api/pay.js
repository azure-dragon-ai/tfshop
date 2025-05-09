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
import Network from '../utils/network.js'
import i18n from '@/utils/lang/index'
export default {
	unifiedPayment(data, success, fail) {
		Network.setPostMessage('unifiedPayment', data, i18n.t('common.processing'), function(res) {
			success(res)
		}, function(res) {
			fail(res)
		})
	},
	balancePay(data, success, fail) {
		Network.setPostMessage('balancePay', data, i18n.t('common.processing'), function(res) {
			success(res)
		}, function(res) {
			uni.showToast({
				title: res.message,
				icon: 'none',
				duration: 2000
			})
		})
	},
};
