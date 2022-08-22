<?php

namespace app\api\service\project;

use app\api\service\beforeModel\Common as BeforeModel;

use app\api\model\Common as CommonModel;

use think\Exception;

use think\Model;

use think\Cache; 


use app\api\validate\CommonValidate;

use app\lib\exception\SuccessMessage;

use app\lib\exception\ErrorMessage;


class Solely{


	function __construct($data){

	}

	/*
	 *留言接口
	 *不校验token
	 */
	public static function addMessage($data)
	{
		if (!isset($data['data']['user_type'])) {
			$data['data']['user_type'] = 0;
		}
		$modelData = [];
		$modelData['FuncName'] = 'add';
		$modelData['data'] = $data['data'];
		$addMsg =  BeforeModel::CommonSave("Message",$modelData);

		if ($addMsg>0) {
			throw new SuccessMessage([
				'msg' => '留言成功',
			]);
		}else{
			throw new ErrorMessage([
				'msg' => '留言失败',
			]);
		}
	}


	/**
	 * 修改账户权限
	 */
	public static function setAuth($data)
	{

		$data = checkTokenAndScope($data,config('scope.two'));

		if (!isset($data['data']['auth'])) {
			throw new ErrorMessage([
				'msg' => '缺少权限信息',
			]);
		}

		$modelData = [];
		$modelData['searchItem'] = $data['searchItem'];
		$o_authList = BeforeModel::CommonGet('Auth',$modelData);

		$o_auth = [];

		if (count($o_authList['data'])) {
			
			foreach ($o_authList['data'] as $l_key => $l_value) {
			
				array_push($o_auth,$l_value['path']);

			};

		}

		foreach ($data['data']['auth'] as $n_key => $n_value) {
			
			/*判断新增的权限*/
			if (!in_array($n_value,$o_auth)) {

				/*判断是否已删除*/
				$modelData = [];
				$modelData['searchItem']['user_no'] = $data['searchItem']['user_no'];
				$modelData['searchItem']['path'] = $n_value;
				$modelData['searchItem']['status'] = -1;
				$check = BeforeModel::CommonGet('Auth',$modelData);

				if (count($check['data'])>0) {

					$modelData = [];
					$modelData['FuncName'] = 'update';
					$modelData['searchItem']['id'] = $check['data'][0]['id'];
					$modelData['data']['status'] = 1;
					$addAuth = BeforeModel::CommonSave('Auth',$modelData);
				   
				}else{

					$modelData = [];
					$modelData['FuncName'] = 'add';
					$modelData['data']['user_no'] = $data['searchItem']['user_no'];
					$modelData['data']['thirdapp_id'] = Cache::get($data['token'])['thirdapp_id'];
					$modelData['data']['path'] = $n_value;
					$addAuth = BeforeModel::CommonSave('Auth',$modelData);

				}

			}

		}

		foreach ($o_auth as $o_key => $o_value) {
			
			/*判断删除的权限*/
			if (!in_array($o_value,$data['data']['auth'])) {

				$modelData = [];
				$modelData['FuncName'] = 'update';
				$modelData['searchItem']['user_no'] = $data['searchItem']['user_no'];
				$modelData['searchItem']['path'] = $o_value;
				$modelData['data']['status'] = -1;
				$addAuth = BeforeModel::CommonSave('Auth',$modelData);

			}

		}

		throw new SuccessMessage([
			'msg' => '更新权限成功',
		]);

	}


	/**
	 * 物理删除图片
	 */
	public static function realDelImg($data)
	{

		checkTokenAndScope($data,config('scope.two'));

		$img = BeforeModel::CommonGet('File',$data);

		if (count($img['data'])>0) {
			
		   $img = $img['data'][0];
		
		}else{
			throw new ErrorMessage([
				'msg' => '图片不存在',
			]);
		}

		$modelData = [];
		$modelData['searchItem']['id'] = $img['id'];
		$upImg = CommonModel::CommonDelete('File',$modelData);

		if ($img['origin']==2) {

			$path = ROOT_PATH.'/public/uploads/'.$img['thirdapp_id'].'/'.$img['title'];
			$realDel = unlink($path);

		}

		if (count($upImg)>0&&$realDel) {
			throw new SuccessMessage([
				'msg' => '删除成功',
			]);
		}else{
			throw new ErrorMessage([
				'msg' => '删除失败',
			]);
		}

	}


	/**
	 * 模拟前端用户登录
	 */
	public static function getToken($data)
	{
		$user = BeforeModel::CommonGet('User',$data);
		if (count($user['data'])==0) {
			throw new ErrorMessage([
				'msg' => '用户信息不存在',
			]);
		}
		$user = $user['data'][0];
		$modelData = [];
		$modelData['searchItem']['id'] = $user['thirdapp_id'];
		$thirdApp = BeforeModel::CommonGet('ThirdApp',$modelData);
		$user['thirdApp'] = $thirdApp['data'][0];

		$token = generateToken();
		$cacheResult = Cache::set($token,$user,7200);
		if (!$cacheResult){
			throw new ErrorMessage([
				'msg' => '服务器缓存异常',
				'errorCode' => 10005
			]);
		};
		throw new SuccessMessage([
			'msg'=>'登录成功',
			'token'=>$token,
			'info'=>$user
		]);

	}


	/**
	 * 承接前端的参数，依据项目执行特定的方法
	 * @param saveFunction
	 */
	public static function saveFunction($data)
	{
		foreach($data as $key => $value){
			if(isset($value['FuncName'])){
				if($value['FuncName']=="viewArticle"){
					$modelData = [];
					$modelData['searchItem'] = $value['searchItem'];
					$modelData['getOne'] = 'true';
					$article = BeforeModel::CommonGet('Article',$modelData);
					if(count($article['data'])>0){
						$article = $article['data'][0];
						$modelData = [];
						$modelData['FuncName'] = 'update';
						$modelData['searchItem'] = $value['searchItem'];
						$modelData['data']['view_count'] = $article['view_count']+1;
						$article = BeforeModel::CommonSave('Article',$modelData);
					};
				};
				if($value['FuncName']=="viewProduct"){
					$modelData = [];
					$modelData['searchItem'] = $value['searchItem'];
					$modelData['getOne'] = 'true';
					$product = BeforeModel::CommonGet('Product',$modelData);
					if(count($product['data'])>0){
						$product = $product['data'][0];
						$modelData = [];
						$modelData['FuncName'] = 'update';
						$modelData['searchItem'] = $value['searchItem'];
						$modelData['data']['view_count'] = $product['view_count']+1;
						$product = BeforeModel::CommonSave('Product',$modelData);
					};
				};
			};
		};

	}


	public static function getParent($data)
	{

		if(!isset($data['searchItem']['id'])){
			throw new ErrorMessage([
				'msg'=>'缺少商品ID',
			]);
		};
		
		$modelData = [];
		$modelData['getOne'] = 'true';
		$modelData['searchItem'] = $data['searchItem'];
		$modelData['searchItem']['type'] = 5;
		$product = BeforeModel::CommonGet('Article',$modelData);
		if(count($product['data'])>0){
			$product = $product['data'][0];
			$menu_id = 0;
			$parent_id = 0;
			$modelData = [];
			$modelData['getOne'] = 'true';
			$modelData['searchItem']['id'] = $product['menu_id'];
			$modelData['searchItem']['type'] = 5;
			$modelData['getAfter'] = [
				'Parent'=>[
					'tableName'=>'Label',
					'middleKey'=>'parentid',
					'key'=>'id',
					'condition'=>'=',
					'searchItem'=>[
						'status'=>1,
					],
					'info'=>['title'],
				],
				'Label'=>[
					'tableName'=>'Label',
					'middleKey'=>'title',
					'key'=>'title',
					'condition'=>'=',
					'searchItem'=>[
						'type'=>2,
					],
					'info'=>['title','id'],
				],
			];
			$label = BeforeModel::CommonGet('Label',$modelData);
			if(count($label['data'])>0){
				$label = $label['data'][0];
				if(!empty($label['Parent'])&&!empty($label['Label'])){
					$menu_id = $label['Label']['id'];
					$modelData = [];
					$modelData['getOne'] = 'true';
					$modelData['searchItem']['title'] = $label['Parent']['title'];
					$modelData['searchItem']['type'] = 2;
					$parent = BeforeModel::CommonGet('Label',$modelData);
					if(count($parent['data'])>0){
						$parent_id = $parent['data'][0]['id'];
					};
				};
			};
			$res = [];
			$res['menu_id'] = $menu_id;
			$res['parent_id'] = $parent_id;
			throw new SuccessMessage([
				'msg'=>'查询成功',
				'info'=>$res,
			]);
		}else{
			throw new ErrorMessage([
				'msg'=>'缺少商品不存在',
			]);
		};
		
	}


	public static function test()
	{
		$modelData = [];
		$modelData['searchItem']['status'] = 1;
		$modelData['info'] = ['login_name','user_no'];
		$test = BeforeModel::CommonGet('User',$modelData);
		var_dump($test['data']);
	}
	
	
	public static function getCompanyInfo($data)
	{
		$modelData = [];
		$modelData['searchItem'] = $data['searchItem'];
		$Article = BeforeModel::CommonGet('Article',$modelData)['data'];
		
		
		$res = [];
		foreach($Article as $key=>$value){
			if(!(empty($value['lng'])&&empty($value['lat']))){
				$newData = [];
				$newData['mainImg'] = $value['mainImg'];
				$newData['title'] = $value['title'];
				$newData['title_e'] = $value['title_e'];
				$newData['title_f'] = $value['title_f'];
				$newData['phone'] = $value['phone'];
				$newData['phone_e'] = $value['phone_e'];
				$newData['phone_f'] = $value['phone_f'];
				$newData['description'] = $value['description'];
				$newData['description_e'] = $value['description_e'];
				$newData['description_f'] = $value['description_f'];
				$newData['mainEX'] = $value['mainEX'];
				$newData['mainEX_e'] = $value['mainEX_e'];
				$newData['mainEX_f'] = $value['mainEX_f'];
				$newData['mixer'] = $value['mixer'];
				$newData['mixer_e'] = $value['mixer_e'];
				$newData['mixer_f'] = $value['mixer_f'];
				$newData['passage1'] = $value['passage1'];
				$newData['passage1_e'] = $value['passage1_e'];
				$newData['passage1_f'] = $value['passage1_f'];
				$newData['lng'] = $value['lng'];
				$newData['lat'] = $value['lat'];
				array_push($res,$newData);
			};
		};
		
		throw new SuccessMessage([
			'msg'=>'查询成功',
			'info'=>$res,
		]);
		
	}
}