import {
	Notification
} from 'element-ui';




/**
 * 混合了消息弹出框的函数
 */




function iNotify(title, type, msg) {
	Notification({
		title: title,
		message: msg,
		type: type
	});
};

const sCallBack = (res) => {

	if (res.solely_code == '100000') {
		iNotify(res.msg, 'success');
		return 'success';
	} else {
		iNotify(res.msg, 'error');
		return false;
	};

};

const notify = (title, type, msg) => {

	Notification({
		title: title,
		message: msg,
		type: type
	});

};

const cloneForm = (form) => {

	var res = JSON.parse(JSON.stringify(form));
	return res;

};

const imgchange = (self, data, formName, attrName) => {


	data.forEach((item, index) => {

		if (item['response']) {
			item['url'] = item['response'];
		};
		delete item['percentage'];
		delete item['raw'];
		delete item['size'];
		delete item['status'];
		delete item['response'];
		delete item['uid'];

	});


	if (data.length) {
		self[formName][attrName] = data;
	} else {
		self[formName][attrName] = 'empty';
	};

};




const changeInt = (arr) => {
	var data = [];
	arr.forEach((item,index)=>{
		data.push(parseInt(item))
	})
	return data;
};


const resetForm = (formName) => {
	self.$refs[formName].resetFields();
	console.log('restform');
	if (formName == 'searchform') {
		self[formName] = {};
	}
};


function padLeftZero(str) {
	return ('00' + str).substr(str.length);
};


const formatDate = (date, fmt) => {

	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};





const getParentNames = (array, id, results) => {

	if (!results) {
		var results = [id];
	};
	var pid = '';
	getParentId(array, id);

	if (pid) {
		results.push(pid);

		if (pid > 0) {
			getParentNames(array, pid, results);
		}
	};
	return results;

	function getParentId(array, id) {

		for (var i = 0; i < array.length; i++) {
			if (pid > 0) {
				return false;
			};
			var item = array[i];
			if (item.id == id) {
				pid = item.parentid;
				return false;
			} else if (item.child && item.child.length > 0) {
				getParentId(item.child, id);
			};
		};
	};
};








const getArrayByTarget = (array, targetName, target) => {

	var results = [];
	getItemsBytarget(array, targetName, target);
	return results;

	function getItemsBytarget(array, targetName, target) {

		for (var i = 0; i < array.length; i++) {
			if (results.length > 0) {
				return false;
			}
			var item = array[i];
			if (item[targetName] == target) {
				results.push(item);
			} else if (item.child && item.child.length > 0) {
				getItemsBytarget(item.child, targetName, target);
			}
		};

	};

};




const isArrayFn = (value) => {

	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}

};

const isTest = (value) => {

	return value

};



export default {
	isArrayFn,
	getArrayByTarget,
	isTest,
	cloneForm,
	imgchange,
	resetForm,
	formatDate,
	getParentNames,
	sCallBack,
	notify,
	formatDate,
	changeInt
}
