/**
 * @fileoverview ��Ŀ�������ã����������õ�
 * @author ����, ��ƽ�����ӣ�
 */
KISSY.add("fb/env",function(S){
    window.ENV = window.FB = window.FB || {/**@lends ENV*/
        /**
         * �汾
         */
        version: 1.0,
        /**
         * Դ��·��ģ��
         */
        srcPathTpl:"{path}/{name}/{version}/",
        /**
         * ����·��ģ��
         */
        pubPathTpl:"{path}/{name}/{pub}/",
        /**
         * ��������İ���
         */
        definePkgs:{
            COMMON:'common',
            UTILS:'utils',
            PAGE:'page'
        },
        /**
         * ����kissy1.2ҳ��Ļ������ã���Ҫ����FB���߹�����Ŀ¼�ṹ
         * @param {Object} config
         *  @param config.name     ҳ��������ƴ��ģ��js·���У�
         *  @param config.version  Դ��Ŀ¼����fb��Ŀ¼Լ���汾��Ŀ¼��Դ��Ŀ¼����Ҳ��ƴ��ģ��js·����
         *  @param config.pub      ����Ŀ¼��ģ������Ŀ¼����ҳ���������kissy-min.js����ȥ���ø��ļ��е�ģ��js������apply-min.js��
         *  @param config.path      ��·����ģ��·��Ѱַ�Ļ��㣩
         *  @param config.charset ����
         *  @param config.tag      ·��β��ʱ���
         */
        config: function (config) {
            if (!config.path)  config.path = '';
            config.path.replace(/\/$/, '');
            var pkgs = [],
                packageConfig = {},
                pagePath = S.substitute(ENV.srcPathTpl, config),
                pagePathBuild = S.substitute(ENV.pubPathTpl, config);
            //switch dev or production env
            var isDebug = ENV.isDebug();
            //kissy config
            S.each(['charset', 'tag'], function (key) {
                if (config[key]) {
                    packageConfig[key] = config[key];
                }
            });

            //common package
            pkgs.push(S.merge(packageConfig, {
                name: ENV.definePkgs.COMMON,
                path: config.path
            }));

            //utils package is only for dev mode
            if (isDebug) {
                pkgs.push(S.merge(packageConfig, {
                    name: ENV.definePkgs.UTILS,
                    path: config.path
                }));
            }

            //page packages
            pkgs.push(S.merge(packageConfig, {
                name: ENV.definePkgs.PAGE,
                path: isDebug? pagePath : pagePathBuild
            }));

            S.config({
                packages: pkgs
            });
        },
        /**
         * �Ƿ����˵���
         * @return {Boolean}
         */
        isDebug:function(){
            return S.Config.debug;
        },
        /**
         * �Ƿ���daily����·��
         * @return {Boolean}
         */
        isDaily : function(){
            return document.domain.indexOf('daily.') > -1;
        },
        /**
         * ��ȡcdn��·��
         * @return {String} cdn·����daily�����ϣ�
         */
        getCdn : function(){
            var isDaily = ENV.isDaily();
            return isDaily && 'http://assets.daily.taobao.net' || 'http://a.tbcdn.cn';
        }
    };
    //ȫ���¼�����
    ENV.eventCenter = S.mix({}, S.EventTarget);
    return ENV;
});