/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/zh.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/zh.js":
/*!*********************!*\
  !*** ./build/zh.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_utils_langUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/utils/langUtils */ \"./src/utils/langUtils.js\");\n\nwindow.gd = {\n  locale: 'zh',\n  strings: {\n    \"core\": {\n      \"a_few_links\": \"一些链接\",\n      \"about\": \"关于\",\n      \"about_para1\": \"有事你需要伪造一些数据来测试软件,填充数据库和创建逼真的模型.对于文本来说,我们有了.但是对于其他事情的事情呢?这个工具提供一种快速和简单的方式,让你生成很大量批的自定义格式的数据.\",\n      \"about_para2\": \"<b>生成</b>页包含了全部的脚本:在页面中只填充各种字段就可以构造你感兴趣的数据集,之后点击生成按钮.看,简单吧!\",\n      \"about_para3\": \"即开即用的脚本包含了一般需要的功能性需求.但是没有完成的是 - 可能你需要生成随机深奥的数学等式,填充随机的推文或者显示来自Flickr标题为\\\\\\\"红背鼠\\\\\\\"随机的图片.谁知道呢.毕竟每个人的用例是不一样的.\",\n      \"about_para4\": \"以防忘记,新版本(3.0.0+)的设计被充分扩展:开发人员可以写入他们自己的数据类型来生成新的随机数据,甚至可以自定义导出数据类型 - 比如,格式化输出的数据.人们关心生成更加准确的地理定位数据,他们也可以增加新的城市插件,提供区域名称(州,县,区等),城市名称和邮编号码格式来供城市选择.\",\n      \"about_para5\": \"更多信息如何拓展它,请访问<a href=\\\\\\\"docs/\\\\\\\">开发人员文档</a>.\",\n      \"about_title\": \"这个<i>是</i>什么?\",\n      \"account_created\": \"账户创建\",\n      \"account_created_msg\": \"该账户已创建.\",\n      \"account_info\": \"账户信息\",\n      \"account_settings\": \"账户设置\",\n      \"account_type\": \"账户类型\",\n      \"account_updated\": \"你的账户已更新.\",\n      \"accounts\": \"账号\",\n      \"add\": \"增加\",\n      \"admin\": \"管理员\",\n      \"admin_account\": \"管理员账户\",\n      \"africa\": \"非洲\",\n      \"all_countries\": \"所有城市\",\n      \"all_data_type_plugins\": \"所有的数据类型插件\",\n      \"all_export_type_plugins\": \"所有的导出类型插件\",\n      \"anonymous_access\": \"匿名访问\",\n      \"anonymous_admin_account\": \"匿名管理员账号\",\n      \"anonymous_user_default_message\": \"请登录或发送邮件 someone@yoursite.com 来获得一个用户.\",\n      \"anonymous_user_desc\": \"匿名用户可以使用脚本,但是有访问限制:他们不能保存,不能连接他们的数据集或一次生成多于100行的数据.\",\n      \"anonymous_user_message\": \"尝试保存时信息会显示给匿名用户:\",\n      \"asia\": \"亚洲\",\n      \"back\": \"回退\",\n      \"blog\": \"博客\",\n      \"cancel\": \"取消\",\n      \"cannot_change_num_rows\": \"对不起,不允许更改生成行数的数字.\",\n      \"central_america\": \"中美洲\",\n      \"check_database_info\": \"检查数据库信息\",\n      \"clear_the_page\": \"清空该页面\",\n      \"close\": \"关闭\",\n      \"complete_excl\": \"完成!\",\n      \"confirm_delete_form\": \"确定删除当前表格吗?\",\n      \"confirm_delete_user_account\": \"确定删除此账号?\",\n      \"confirm_empty_form\": \"确定清空页面吗?\",\n      \"confirm_file_exists\": \"文件确认已存在\",\n      \"continue_rightarrow\": \"继续 &raquo;\",\n      \"countries\": \"国家\",\n      \"country_specific_data\": \"自定义城市数据\",\n      \"create_account\": \"创建账号\",\n      \"create_account_rightarrow\": \"创建账户 &raquo;\",\n      \"create_file_rightarrow\": \"创建文件 &raquo;\",\n      \"create_settings_file\": \"创建配置文件\",\n      \"credit_card_data\": \"信用卡数据\",\n      \"data_created\": \"创建数据\",\n      \"data_format\": \"数据格式化\",\n      \"data_set\": \"数据集\",\n      \"data_set_help\": \"在这里你可以生成你想要的数据.尝试填充一行并且点击生成按钮.你会很快的掌握它\",\n      \"data_set_name\": \"数据集名称\",\n      \"data_type\": \"数据类型\",\n      \"data_types\": \"数据类型\",\n      \"database_info\": \"数据库信息\",\n      \"database_name\": \"数据库名称\",\n      \"date_account_created\": \"创建账户日期\",\n      \"date_created\": \"数据创建\",\n      \"default_language\": \"默认语言\",\n      \"default_save_form_empty_str\": \"输入表单名称\",\n      \"del\": \"删除\",\n      \"del_uc\": \"删除\",\n      \"delete\": \"删除\",\n      \"delete_1_data_set\": \"删除1个数据集\",\n      \"delete_N_data_sets\": \"删除 %1 个数据集\",\n      \"delete_account\": \"删除账号\",\n      \"developer\": \"开发者\",\n      \"developer_doc\": \"开发人员文档\",\n      \"developer_intro\": \"出于开发目的,以下区域你可以在javascript控制台中微调.\",\n      \"documentation\": \"文档\",\n      \"donate\": \"捐赠!\",\n      \"download\": \"下载\",\n      \"edit\": \"编辑\",\n      \"email\": \"邮件地址\",\n      \"email_c\": \"邮件地址:\",\n      \"email_not_sent\": \"我们不能发出邮件通知.\",\n      \"email_user_login_info\": \"发送邮件包含用户登录信息\",\n      \"empty_form\": \"清空表单\",\n      \"enter_email_address_to_reset_password\": \"输入你的邮箱地址来重置你的密码.\",\n      \"enter_user_account_details\": \"请输入你的用户详细信息.\",\n      \"error\": \"失败\",\n      \"europe\": \"欧洲\",\n      \"examples\": \"示例\",\n      \"export_type_validate_error\": \"应答!在导出类型中validate()的函数中有一个错误.对不起,我们不能进行 - 联系开发人员!\",\n      \"export_types\": \"导出类型\",\n      \"export_types_help\": \"本区域控制生成数据的格式.每种格式会提供不同的选项,以便准确的输出你想要的数据\",\n      \"extend_id\": \"扩展\",\n      \"extend_it\": \"拓展\",\n      \"fatal_error\": \"发生了一个严重错误.\",\n      \"feature_enabled\": \"可用\",\n      \"first_name\": \"名字\",\n      \"forgot_password\": \"忘记密码\",\n      \"forgotten_your_password_q\": \"忘记密码?\",\n      \"fork_on_github\": \"获取github代码\",\n      \"fork_this_project_on_github\": \"在Github上Fork该项目\",\n      \"form_deleted\": \"该表单已删除.\",\n      \"form_exists_overwrite_confirmation\": \"该表单已存在.是否要覆盖它?\",\n      \"form_not_deleted\": \"对不起,不能删除该表单.请重新登录后删除.\",\n      \"form_saved\": \"表单已保存.\",\n      \"forums\": \"论坛\",\n      \"generate\": \"生成\",\n      \"generate_in_page\": \"在页面中显示\",\n      \"generated_X_of_Y_results\": \"生成 <span id=\\\\\\\"gdGenerateTotal\\\\\\\"></span>结果中的 <span id=\\\\\\\"gdGenerateCount\\\\\\\"></span>\",\n      \"generator\": \"生成器\",\n      \"geo\": \"Geo\",\n      \"goto_script_rightarrow\": \"访问脚本 &raquo;\",\n      \"goto_website\": \"访问网站\",\n      \"help\": \"帮助\",\n      \"help_intro\": \"安装脚本做两件事情.第一,自动生成<b>settings.php</b> 文件,该文件包含唯一的数据库连接信息, 所以你无论什么时候访问该脚本,都知道如何连接数据库. 第二,他能填充你需要的各种各种的信息: 比如常规设置,用户账号和未经加工的数据,比如人名,国家和城市名称.\",\n      \"help_prereq_info\": \"几乎类似于其他PHP/MySQL的脚本,你需要在运行安装脚本之前,已创建一个数据库. <i>安装脚本不会创建数据库,它仅会尝试连接数据库并创建表.</i> 如果你不确定在当前环境下如何创建一个数据库, 你或许需要联系你的主机提供商, 或者花费一些时间用Google搜索一下.请见谅!\",\n      \"help_prerequisites\": \"前提条件\",\n      \"hide_data_format_options\": \"隐藏数据格式化选项\",\n      \"hide_error\": \"隐藏错误\",\n      \"host_name\": \"主机名称\",\n      \"host_name_desc\": \"你的数据库连接名称. 通常是<i>localhost</i>, 但有时会是<i>mysql.yoursite.com</i>.\",\n      \"human_data\": \"人类数据\",\n      \"info_and_stats\": \"信息和状态\",\n      \"install\": \"安装\",\n      \"install_invalid_db_info\": \"我们不会使用您提供的信息来链接数据库. 数据库返回错误信息为: <i>{\\\\$db_connection_error}</i>\",\n      \"install_no_db_connection\": \"请检查你的数据库名称和登录信息.尽管我们会连接数据库主机,但不会连接数据库.数据库返回错误信息为: <i>{\\\\$db_select_error}</i>\",\n      \"install_plugins_rightarrow\": \"安装插件 &raquo;\",\n      \"install_user_doc_link\": \"更多关于安装流程的详细信息,可以访问<a href=\\\\\\\"http://benkeen.github.io/generatedata/install.html\\\\\\\" target=\\\\\\\"_blank\\\\\\\">user documentation</a>.\",\n      \"installation\": \"配置\",\n      \"installation_complete_text\": \"数据生成器成功安装!点击按钮来访问脚本.\",\n      \"installation_error\": \"安装错误\",\n      \"installation_failed_create_settings_file\": \"脚本不能创建你的<b>settings.php</b>文件.\",\n      \"installation_failed_create_settings_file_msg\": \"通常发生在没有权限写入文件夹.请手动创建文件,并且放到数据生成器的跟目录下.当你做完这些后.下一步按钮继续安装.\",\n      \"installation_intro\": \"好了，让我们安装它.输入你创建数据库表格的信息. 如果你对这些事情不是很了解,点击帮助标签获取更多信息.\",\n      \"installation_plugin_intro\": \"快要完了!现在我们将要安装插件:这些插件会使数据生成器真实<i>有用</i> - 比如. 你生成的类型数据(数据类型),格式化生成的数据(导出类型)和所有明确国家的数据,类似区,城市.\",\n      \"installation_step2_intro\": \"到目前为止一切都好!现在点击以下按钮创建你的 <b>settings.php</b> 文件. 该文件存储在本程序的根目录下,而且是唯一的地方(这一点和数据库不同)存储你安装的自定义数据\",\n      \"installation_step3_intro\": \"你有三种选择来安装操作用户账户.\",\n      \"invalid_account_id\": \"该账户ID无效.\",\n      \"invalid_custom_xml\": \"输入的自定义XML 标记有问题.请查阅用户手册了解更多详情.\",\n      \"invalid_num_results\": \"请输入一个有效的结果编号.\",\n      \"invalid_password\": \"对不起,密码不正确.请重试.\",\n      \"invalid_table_names\": \"数据库列名只能是含有字母和数字并且以字母开头.请修改下述行:\",\n      \"language\": \"中文\",\n      \"last_edited\": \"最新编辑\",\n      \"last_logged_in\": \"上次登入\",\n      \"last_modified\": \"最新修正\",\n      \"last_name\": \"姓氏\",\n      \"last_saved\": \"最新保存\",\n      \"latest_project_news\": \"最新项目新闻\",\n      \"limit_pub_sub_console_messages\": \"通过确定模块来限制公布/申请 控制台信息:\",\n      \"link_to_data_set\": \"连接数据集\",\n      \"link_to_this_data_set\": \"链接到该数据\",\n      \"list_console_warn_events\": \"遍历 console.warn() 事件\",\n      \"list_core_events\": \"遍历 <b>核心</b> 事件\",\n      \"list_module_publish_events\": \"遍历模块 <b>公布</b> 事件\",\n      \"list_module_subscribe_events\": \"遍历模块 <b>申请</b> 事件\",\n      \"load\": \"加载\",\n      \"load_uc\": \"加载\",\n      \"loading\": \"加载...\",\n      \"login\": \"登录\",\n      \"login_url_c\": \"登录 URL:\",\n      \"logout\": \"登出\",\n      \"make_data_set_public_agreement\": \"我要分享该数据集,并且需要公开它.\",\n      \"math\": \"数学\",\n      \"meta_description\": \"GenerateData.com: 用于生成测试软件中自定义随机数据,采用免费GNU协议\",\n      \"meta_keywords\": \"随机数据, 测试数据, 示例数据, 数据生成器, 生成数据\",\n      \"misc\": \"杂项\",\n      \"missing_node_names\": \"下述行找不到节点名称:\",\n      \"missing_table_names\": \"下述行找不到表列名称:\",\n      \"multiple_accounts\": \"多重账户\",\n      \"mysql_password\": \"MySQL 密码\",\n      \"mysql_username\": \"MySQL 用户名\",\n      \"new_window_or_tab\": \"新的窗口/标签页\",\n      \"no\": \"取消\",\n      \"no_account_found\": \"对不起,账户没有找到.\",\n      \"no_additional_export_type_settings\": \"没有额外的导出类型设置.\",\n      \"no_csv_delimiter\": \"请输入CSV分隔符.\",\n      \"no_data\": \"噢,什么也没有生成!输入一些数据来生成.\",\n      \"no_data_types_found\": \"没有找到数据类型\",\n      \"no_examples_available\": \"没有可用的示例.\",\n      \"no_export_types_found\": \"没有找到导出类型\",\n      \"no_form_name\": \"请输入一个表单名称.\",\n      \"no_js\": \"请允许在浏览器中使用javascript.\",\n      \"no_js_blurb\": \"你知道,这类似于21世纪? 数据生成器脚本大量依赖于javascript - 工作中没有它顿感无趣. 刷新该页面,你就能在浏览器中使用它了.\",\n      \"no_num_rows\": \"请输入增加的行数.\",\n      \"no_options_available\": \"没有可用选项.\",\n      \"no_saved_data_sets\": \"你没有保存任何数据集.\",\n      \"no_user_accounts_defined\": \"没有此用户账号.\",\n      \"none\": \"毫无影响\",\n      \"north_america\": \"北美州\",\n      \"not_saved\": \"未保存\",\n      \"notify_settings_updated\": \"配置已更新.\",\n      \"num_records_generated\": \"生成\",\n      \"num_results\": \"结果数\",\n      \"num_rows_too_large\": \"对不起,你被限制一次生成<b>%1</b> 行.点击生成继续.\",\n      \"num_saved_data_sets\": \"已保存数据集数量\",\n      \"numeric\": \"数值型\",\n      \"oceania\": \"大洋洲\",\n      \"ok\": \"确定\",\n      \"options\": \"选项\",\n      \"order\": \"顺序\",\n      \"other\": \"其他\",\n      \"password\": \"密码\",\n      \"password_c\": \"密码:\",\n      \"password_change_note\": \"如果你想要修改它,你只需要填写密码.\",\n      \"password_reset_complete\": \"你的密码已重置,已经发出新密码邮件.\",\n      \"password_reset_email_content1\": \"你的密码已重置.你可以使用当前密码登录: %1\",\n      \"password_reset_email_content2\": \"一旦你已经登录,请修改它.\",\n      \"please_confirm\": \"请确认\",\n      \"please_enter_all\": \"请输入全部内容\",\n      \"please_enter_data_set_name\": \"请输入新数据集的名称.\",\n      \"please_fix_errors\": \"请修正下述错误然后重新提交:\",\n      \"please_login\": \"请登录\",\n      \"please_select\": \"请选择\",\n      \"plugins\": \"插件\",\n      \"plugins_intro\": \"任何时候添加或移除插件,你需要重置该插件.它会更新数据库,并且保证你可以访问需要的插件.\",\n      \"prompt_to_download\": \"提示下载\",\n      \"public_q\": \"公开?\",\n      \"read_developer_doc\": \"阅读开发人员文档\",\n      \"reenter_password\": \"重新输入密码\",\n      \"refresh_page\": \"刷新页面\",\n      \"regenerate\": \"重新生成\",\n      \"report_bug\": \"反馈问题\",\n      \"reset_password\": \"重置密码\",\n      \"reset_plugins\": \"重置插件\",\n      \"reset_plugins_with_bundling\": \"<b>捆绑/压缩可用</b>.点击该按钮之后,你需要运行重新创建捆绑.更多信息<a href=\\\\\\\"http://benkeen.github.io/generatedata/developer.html#bundling\\\\\\\" target=\\\\\\\"_blank\\\\\\\">阅读文档页</a>.如果你有任何问题, 你可以关闭捆绑.\",\n      \"result_type\": \"结果类型\",\n      \"row_label\": \"列标题\",\n      \"row_label_plural\": \"列标题\",\n      \"row_sp\": \"行数\",\n      \"rows\": \"行\",\n      \"rows_generated\": \"列生成\",\n      \"save\": \"保存\",\n      \"save_data_set_to_link\": \"拒绝. 为了和别人分享该数据集,您首先需要保存它.\",\n      \"save_uc\": \"保存\",\n      \"script_thinking\": \"噢,请稍等. 脚本正在考虑中.\",\n      \"see_help_dialog\": \"查看帮助对话框.\",\n      \"select_data_type\": \"选择数据类型\",\n      \"select_language\": \"选择语言\",\n      \"settings\": \"设置\",\n      \"settings_file_exists\": \"配置文件已存在.对于新的配置来说, settings.php 文件不会存在.删除它后继续安装脚本或尝试使用已存在的配置重新加载脚本.\",\n      \"show_data_format_options\": \"显示数据格式化选项\",\n      \"single_anonymous_user_account\": \"单一,匿名用户账户\",\n      \"single_user_account_requires_login\": \"单一用户账户,需要注册\",\n      \"south_america\": \"南美洲\",\n      \"still_stuck\": \"一直未响应?\",\n      \"success\": \"成功\",\n      \"table_column\": \"表格列\",\n      \"table_prefix\": \"表单前缀\",\n      \"text\": \"文本\",\n      \"theme\": \"主题\",\n      \"tip_country_data\": \"该区域会控制特定国家的数据应当在你的生成文件.该值会影响你选择的数据类型 ,比如 <i>区域</i>, <i>邮局/邮编</i> 和 <i>国家</i>.</p><p>为了更好地说明该含义,尝试在数据配置区域为某一行选择<i>区域</i>数据类型, 然后从特定的过节数据区域添加 / 删除国家. 你会看见行设置会直接影响你选择的国家:你只能生成该国家下的子集选项.\",\n      \"title\": \"generatedata.com\",\n      \"total_rows_generated\": \"总生成行数\",\n      \"update\": \"更新\",\n      \"update_account\": \"更新账号\",\n      \"update_settings\": \"更新设置\",\n      \"use_custom_xml_format\": \"使用自定义XML格式\",\n      \"user\": \"用户\",\n      \"user_account\": \"用户账户\",\n      \"user_account_section_intro\": \"该区域你可以常见任何账户号码,允许人们访问该脚本.只有你可以创建或删除账户.\",\n      \"user_accounts\": \"用户账户\",\n      \"user_not_found\": \"对不起,我们不能识别你.\",\n      \"validation_account_already_exists\": \"对不起,一个账户的邮件地址已存在.\",\n      \"validation_invalid_chars\": \"仅支持含有字母和数字,下划线字符.\",\n      \"validation_invalid_email\": \"请输入一个有效的邮件地址.\",\n      \"validation_invalid_permissions\": \"你没有权限.\",\n      \"validation_no_db_hostname\": \"请输入你的数据库主机名称.\",\n      \"validation_no_db_name\": \"请输入你的数据库名称.\",\n      \"validation_no_email\": \"请输入邮件地址.\",\n      \"validation_no_first_name\": \"请输入你的名字.\",\n      \"validation_no_last_name\": \"请输入你的姓氏.\",\n      \"validation_no_mysql_username\": \"请输入MySQL 用户名.\",\n      \"validation_no_password\": \"请输入密码.\",\n      \"validation_not_logged_in\": \"显示未登录.请重新登录.\",\n      \"version\": \"版本\",\n      \"website\": \"网站\",\n      \"yes\": \"确认\",\n      \"your_account\": \"你的账号\",\n      \"your_data_set_name_here\": \"在这里写数据集名称\",\n      \"your_data_sets\": \"你的数据集\",\n      \"zip_q\": \"Zip?\"\n    },\n    \"dataTypes\": {}\n  }\n};\n\n//# sourceURL=webpack:///./build/zh.js?");

/***/ }),

/***/ "./src/utils/langUtils.js":
/*!********************************!*\
  !*** ./src/utils/langUtils.js ***!
  \********************************/
/*! exports provided: setLocale, getStrings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setLocale\", function() { return setLocale; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStrings\", function() { return getStrings; });\n// standalone location for the selected locale. Keeping this out of redux lets us just import it wherever\nvar currentLocale = null;\nvar langStrings = {};\nvar setLocale = (locale, localeStrings) => {\n  currentLocale = locale;\n  langStrings[locale] = localeStrings;\n};\nvar getStrings = locale => langStrings[locale ? locale : currentLocale];\n\n//# sourceURL=webpack:///./src/utils/langUtils.js?");

/***/ })

/******/ });