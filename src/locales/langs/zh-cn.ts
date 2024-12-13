const local: App.I18n.Schema = {
  system: {
    title: 'Soybean 管理系统',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说'
  },
  common: {
    action: '操作',
    preview: '预览',
    register: '注册',
    add: '新增',
    addSuccess: '添加成功',
    backToHome: '返回首页',
    batchDelete: '批量删除',
    cancel: '取消',
    close: '关闭',
    check: '勾选',
    expandColumn: '展开列',
    columnSetting: '列设置',
    config: '配置',
    confirm: '确认',
    delete: '删除',
    deleteSuccess: '删除成功',
    confirmDelete: '确认删除吗？',
    edit: '编辑',
    warning: '警告',
    error: '错误',
    index: '序号',
    keywordSearch: '请输入关键词搜索',
    logout: '退出登录',
    logoutConfirm: '确认退出登录吗？',
    lookForward: '敬请期待',
    modify: '修改',
    modifySuccess: '修改成功',
    noData: '无数据',
    operate: '操作',
    pleaseCheckValue: '请检查输入的值是否合法',
    refresh: '刷新',
    reset: '重置',
    search: '搜索',
    switch: '切换',
    tip: '提示',
    trigger: '触发',
    update: '更新',
    updateSuccess: '更新成功',
    userCenter: '个人中心',
    enter: '请输入',
    yesOrNo: {
      yes: '是',
      no: '否'
    }
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  theme: {
    themeSchema: {
      title: '主题模式',
      light: '亮色模式',
      dark: '暗黑模式',
      auto: '跟随系统'
    },
    grayscale: '灰色模式',
    colourWeakness: '色弱模式',
    layoutMode: {
      title: '布局模式',
      vertical: '左侧菜单模式',
      'vertical-mix': '左侧菜单混合模式',
      horizontal: '顶部菜单模式',
      'horizontal-mix': '顶部菜单混合模式',
      reverseHorizontalMix: '一级菜单与子级菜单位置反转'
    },
    recommendColor: '应用推荐算法的颜色',
    recommendColorDesc: '推荐颜色的算法参照',
    themeColor: {
      title: '主题颜色',
      primary: '主色',
      info: '信息色',
      success: '成功色',
      warning: '警告色',
      error: '错误色',
      followPrimary: '跟随主色'
    },
    scrollMode: {
      title: '滚动模式',
      wrapper: '外层滚动',
      content: '主体滚动'
    },
    page: {
      animate: '页面切换动画',
      mode: {
        title: '页面切换动画类型',
        'fade-slide': '滑动',
        fade: '淡入淡出',
        'fade-bottom': '底部消退',
        'fade-scale': '缩放消退',
        'zoom-fade': '渐变',
        'zoom-out': '闪现',
        none: '无'
      }
    },
    fixedHeaderAndTab: '固定头部和标签栏',
    header: {
      height: '头部高度',
      breadcrumb: {
        visible: '显示面包屑',
        showIcon: '显示面包屑图标'
      }
    },
    tab: {
      visible: '显示标签栏',
      cache: '缓存标签页',
      height: '标签栏高度',
      mode: {
        title: '标签栏风格',
        chrome: '谷歌风格',
        button: '按钮风格'
      }
    },
    sider: {
      inverted: '深色侧边栏',
      width: '侧边栏宽度',
      collapsedWidth: '侧边栏折叠宽度',
      mixWidth: '混合布局侧边栏宽度',
      mixCollapsedWidth: '混合布局侧边栏折叠宽度',
      mixChildMenuWidth: '混合布局子菜单宽度'
    },
    footer: {
      visible: '显示底部',
      fixed: '固定底部',
      height: '底部高度',
      right: '底部局右'
    },
    watermark: {
      visible: '显示全屏水印',
      text: '水印文本'
    },
    themeDrawerTitle: '主题配置',
    pageFunTitle: '页面功能',
    configOperation: {
      copyConfig: '复制配置',
      copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
      resetConfig: '重置配置',
      resetSuccessMsg: '重置成功'
    }
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    system: '系统管理',
    user: '用户管理',
    role: '角色管理',
    resource: '资源管理',
    data: '数据管理',
    module: '模块管理',
    'module-item': '模块详情',
    'data-item': '数据详情',
    dict: '字典管理',
    'dict-data': '字典数据',
    'oauth-client': '客户端管理',
    'oss-config': '配置管理',
    oss: '文件管理'
  },
  page: {
    login: {
      common: {
        loginOrRegister: '登录 / 注册',
        usernamePlaceholder: '请输入用户名',
        phonePlaceholder: '请输入手机号',
        codePlaceholder: '请输入验证码',
        passwordPlaceholder: '请输入密码',
        confirmPasswordPlaceholder: '请再次输入密码',
        codeLogin: '验证码登录',
        confirm: '确定',
        back: '返回',
        validateSuccess: '验证成功',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来，{username} ！'
      },
      pwdLogin: {
        title: '密码登录',
        rememberMe: '记住我',
        forgetPassword: '忘记密码？',
        register: '注册账号',
        otherLoginMode: '其他登录方式'
      },
      codeLogin: {
        title: '验证码登录',
        getCode: '获取验证码',
        reGetCode: '{time}秒后重新获取',
        sendCodeSuccess: '验证码发送成功',
        imageCodePlaceholder: '请输入图片验证码'
      },
      register: {
        title: '注册账号',
        agreement: '我已经仔细阅读并接受',
        protocol: '《用户协议》',
        policy: '《隐私权政策》'
      },
      resetPwd: {
        title: '重置密码'
      },
      bindWeChat: {
        title: '绑定微信'
      }
    },
    home: {
      greeting: '早安，{username}, 今天又是充满活力的一天!',
      weatherDesc: '今日多云转晴，20℃ - 25℃!',
      projectCount: '项目数',
      todo: '待办',
      message: '消息',
      downloadCount: '下载量',
      registerCount: '注册量',
      schedule: '作息安排',
      study: '学习',
      work: '工作',
      rest: '休息',
      entertainment: '娱乐',
      visitCount: '访问量',
      turnover: '成交额',
      dealCount: '成交量',
      projectNews: {
        title: '项目动态',
        moreNews: '更多动态',
        desc1: 'Soybean 在2021年5月28日创建了开源项目 soybean-admin!',
        desc2: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
        desc3: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
        desc4: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
        desc5: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！'
      },
      creativity: '创意'
    },
    system: {
      common: {
        status: {
          enable: '启用',
          disable: '禁用'
        }
      },
      role: {
        title: '角色列表',
        name: '角色名称',
        code: '角色编码',
        status: '角色状态',
        remark: '角色描述',
        resourceAuth: '资源权限',
        form: {
          name: '请输入角色名称',
          code: '请输入角色编码',
          status: '请选择角色状态',
          remark: '请输入角色描述'
        },
        addRole: '新增角色',
        editRole: '编辑角色'
      },
      user: {
        title: '用户列表',
        username: '用户名',
        nickname: '昵称',
        phone: '手机号',
        email: '邮箱',
        status: '用户状态',
        role: '用户角色',
        form: {
          username: '请输入用户名',
          nickname: '请输入昵称',
          phone: '请输入手机号',
          email: '请输入邮箱',
          status: '请选择用户状态',
          role: '请选择用户角色'
        },
        addUser: '新增用户',
        editUser: '编辑用户'
      },
      resource: {
        title: '资源列表',
        id: 'ID',
        parentId: '父级资源ID',
        type: '资源类型',
        name: '资源名称',
        path: '路由路径',
        param: '路径参数',
        component: '路由组件',
        i18nKey: '国际化key',
        icon: '图标',
        localIcon: '本地图标',
        iconTypeTitle: '图标类型',
        sort: '排序',
        constant: '常量路由',
        cache: '缓存路由',
        frame: '是否外链',
        href: '外链',
        visible: '展示菜单',
        perms: '资源权限',
        query: '路由参数',
        status: '资源状态',
        form: {
          home: '请选择首页',
          type: '请选择菜单类型',
          name: '请输入资源名称',
          path: '请输入路由路径',
          param: '请输入路径参数',
          component: '请输入路由组件',
          i18nKey: '请输入国际化key',
          icon: '请输入图标',
          localIcon: '请选择本地图标',
          sort: '请输入排序',
          cache: '请选择是否缓存路由',
          frame: '请选择是否外链',
          href: '请输入外链',
          visible: '请选择是否展示菜单',
          perms: '请输入资源权限',
          queryKey: '请输入路由参数Key',
          queryValue: '请输入路由参数Value',
          status: '请选择菜单状态'
        },
        addResource: '新增资源',
        editResource: '编辑资源',
        addChildResource: '新增子资源',
        resourceType: {
          directory: '目录',
          menu: '菜单',
          button: '按钮'
        },
        iconType: {
          iconify: 'iconify图标',
          local: '本地图标'
        }
      },
      dictType: {
        title: '字典类型列表',
        name: '字典名称',
        type: '字典类型',
        status: '字典状态',
        remark: '字典描述',
        form: {
          name: '请输入字典名称',
          type: '请输入字典类型',
          status: '请选择字典状态',
          remark: '请输入字典描述'
        },
        addDictType: '新增字典类型',
        editDictType: '编辑字典类型'
      },
      dictData: {
        title: '字典数据列表',
        label: '字典标签',
        value: '字典键值',
        sort: '字典排序',
        dictType: '字典类型',
        status: '字典数据状态',
        remark: '字典数据描述',
        form: {
          label: '请输入字典标签',
          value: '请输入字典键值',
          sort: '请输入字典排序',
          dictType: '请输入字典类型',
          status: '请选择字典数据状态',
          remark: '请输入字典数据描述'
        },
        addDictData: '新增字典数据',
        editDictData: '编辑字典数据'
      },
      oauthClient: {
        title: '客户端列表',
        clientId: '客户端',
        clientSecret: '客户端密钥',
        grantType: '授权方式',
        scope: '作用域',
        redirectUri: '回调地址',
        accessTimeout: 'Access 超时',
        refreshTimeout: 'Refresh 超时',
        status: '客户端状态',
        form: {
          clientId: '请输入客户端',
          clientSecret: '请输入客户端密钥',
          grantType: '请输入授权方式',
          scope: '请输入作用域',
          redirectUri: '请输入回调地址',
          accessTimeout: '请输入 Access 超时',
          refreshTimeout: '请输入 Refresh 超时',
          status: '请选择客户端状态',
        },
        addOauthClient: '新增客户端',
        editOauthClient: '编辑客户端'
      },
      ossConfig: {
        title: '配置列表',
        configKey: '配置 key',
        accessKey: 'accessKey',
        secretKey: '秘钥',
        bucketName: '桶名称',
        prefix: '前缀',
        endpoint: '访问站点',
        domain: '自定义域名',
        isHttps: '是否 https',
        region: '域',
        accessPolicy: '桶权限类型',
        remark: '备注',
        status: '是否默认',
        form: {
          configKey: '请输入配置 key',
          accessKey: '请输入 accessKey',
          secretKey: '请输入秘钥',
          bucketName: '请输入桶名称',
          prefix: '请输入前缀',
          endpoint: '请输入访问站点',
          domain: '请输入自定义域名',
          isHttps: '请输入是否 https',
          region: '请输入域',
          accessPolicy: '请输入桶权限类型',
          remark: '请输入备注',
          status: '请选择是否默认'
        },
        addOssConfig: '新增配置',
        editOssConfig: '编辑配置',
        accessPolicyOption: {
          private: 'private',
          public: 'public',
          custom: 'custom'
        }
      },
      oss: {
        title: '文件列表',
        service: '服务商',
        fileName: '文件名',
        originalName: '原名',
        fileSuffix: '文件后缀名',
        url: 'URL 地址',
        form: {
          service: '请输入服务商',
          fileName: '请输入文件名',
          originalName: '请输入原名',
          fileSuffix: '请输入文件后缀名',
          url: '请输入 URL 地址'
        },
        addOss: '新增文件',
        editOss: '编辑文件',
        ossConfig: '配置管理',
        uploadFile: '文件上传',
        uploadFileSuccess: '文件上传成功',
        chooseFile: '选择文件',
        downloadFile: '下载'
      }
    },
    data: {
      common: {
        status: {
          enable: '启用',
          disable: '禁用'
        }
      },
      module: {
        title: '模块列表',
        name: '模块名称',
        code: '模块代码',
        path: '模块路径',
        status: '模块状态',
        remark: '模块描述',
        form: {
          name: '请输入模块名称',
          code: '请输入模块代码',
          path: '请输入模块路径',
          status: '请选择模块状态',
          remark: '请输入模块描述'
        },
        importModule: '导入'
      },
      table: {
        title: '业务表列表',
        name: '表名称',
        comment: '表描述',
        status: '表状态',
        remark: '表备注',
        tableImport: '导入表',
        moduleInfo: '模块信息',
        tableInfo: '表信息',
        columnInfo: '字段信息',
        form: {
          name: '请输入表名称',
          comment: '请输入表描述',
          status: '请选择表状态',
          remark: '请输入表备注',
          tableImport: '请选择要导入的表'
        }
      },
      column: {
        name: '字段名称',
        comment: '字段描述',
        pk: '主键',
        form: '编辑',
        visible: '列表'
      }
    }
  },
  form: {
    required: '不能为空',
    username: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    phone: {
      required: '请输入手机号',
      invalid: '手机号格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    },
    confirmPwd: {
      required: '请输入确认密码',
      invalid: '两次输入密码不一致'
    },
    code: {
      required: '请输入验证码',
      invalid: '验证码格式不正确'
    },
    email: {
      required: '请输入邮箱',
      invalid: '邮箱格式不正确'
    }
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定'
  },
  datatable: {
    itemCount: '共 {total} 条'
  }
};

export default local;
