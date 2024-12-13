const local: App.I18n.Schema = {
  system: {
    title: 'SoybeanAdmin',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  common: {
    action: 'Action',
    preview: 'Preview',
    register: 'Register',
    add: 'Add',
    addSuccess: 'Add Success',
    backToHome: 'Back to home',
    batchDelete: 'Batch Delete',
    cancel: 'Cancel',
    close: 'Close',
    check: 'Check',
    expandColumn: 'Expand Column',
    columnSetting: 'Column Setting',
    config: 'Config',
    confirm: 'Confirm',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    confirmDelete: 'Are you sure you want to delete?',
    edit: 'Edit',
    warning: 'Warning',
    error: 'Error',
    index: 'Index',
    keywordSearch: 'Please enter keyword',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    lookForward: 'Coming soon',
    modify: 'Modify',
    modifySuccess: 'Modify Success',
    noData: 'No Data',
    operate: 'Operate',
    pleaseCheckValue: 'Please check whether the value is valid',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    switch: 'Switch',
    tip: 'Tip',
    trigger: 'Trigger',
    update: 'Update',
    updateSuccess: 'Update Success',
    userCenter: 'User Center',
    enter: 'Please enter ',
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    }
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then log out user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired'
  },
  theme: {
    themeSchema: {
      title: 'Theme Schema',
      light: 'Light',
      dark: 'Dark',
      auto: 'Follow System'
    },
    grayscale: 'Grayscale',
    colourWeakness: 'Colour Weakness',
    layoutMode: {
      title: 'Layout Mode',
      vertical: 'Vertical Menu Mode',
      horizontal: 'Horizontal Menu Mode',
      'vertical-mix': 'Vertical Mix Menu Mode',
      'horizontal-mix': 'Horizontal Mix menu Mode',
      reverseHorizontalMix: 'Reverse first level menus and child level menus position'
    },
    recommendColor: 'Apply Recommended Color Algorithm',
    recommendColorDesc: 'The recommended color algorithm refers to',
    themeColor: {
      title: 'Theme Color',
      primary: 'Primary',
      info: 'Info',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      followPrimary: 'Follow Primary'
    },
    scrollMode: {
      title: 'Scroll Mode',
      wrapper: 'Wrapper',
      content: 'Content'
    },
    page: {
      animate: 'Page Animate',
      mode: {
        title: 'Page Animate Mode',
        fade: 'Fade',
        'fade-slide': 'Slide',
        'fade-bottom': 'Fade Zoom',
        'fade-scale': 'Fade Scale',
        'zoom-fade': 'Zoom Fade',
        'zoom-out': 'Zoom Out',
        none: 'None'
      }
    },
    fixedHeaderAndTab: 'Fixed Header And Tab',
    header: {
      height: 'Header Height',
      breadcrumb: {
        visible: 'Breadcrumb Visible',
        showIcon: 'Breadcrumb Icon Visible'
      }
    },
    tab: {
      visible: 'Tab Visible',
      cache: 'Tab Cache',
      height: 'Tab Height',
      mode: {
        title: 'Tab Mode',
        chrome: 'Chrome',
        button: 'Button'
      }
    },
    sider: {
      inverted: 'Dark Sider',
      width: 'Sider Width',
      collapsedWidth: 'Sider Collapsed Width',
      mixWidth: 'Mix Sider Width',
      mixCollapsedWidth: 'Mix Sider Collapse Width',
      mixChildMenuWidth: 'Mix Child Menu Width'
    },
    footer: {
      visible: 'Footer Visible',
      fixed: 'Fixed Footer',
      height: 'Footer Height',
      right: 'Right Footer'
    },
    watermark: {
      visible: 'Watermark Full Screen Visible',
      text: 'Watermark Text'
    },
    themeDrawerTitle: 'Theme Configuration',
    pageFunTitle: 'Page Function',
    configOperation: {
      copyConfig: 'Copy Config',
      copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: 'Reset Config',
      resetSuccessMsg: 'Reset Success'
    }
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    'iframe-page': 'Iframe',
    home: 'Home',
    system: 'System Manage',
    user: 'User Manage',
    role: 'Role Manage',
    resource: 'Resource Manage',
    data: 'Data Manage',
    module: 'Module Manage',
    'module-item': 'Module Item',
    'data-item': 'Data Item',
    dict: 'Dict Manage',
    'dict-data': 'Dict Data',
    'oauth-client': 'Client Manage',
    'oss-config': 'Oss Config',
    oss: 'Oss Manage'
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Login / Register',
        usernamePlaceholder: 'Please enter user name',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {username} !'
      },
      pwdLogin: {
        title: 'Password Login',
        rememberMe: 'Remember me',
        forgetPassword: 'Forget password?',
        register: 'Register',
        otherLoginMode: 'Other Login Mode'
      },
      codeLogin: {
        title: 'Verification Code Login',
        getCode: 'Get verification code',
        reGetCode: 'Reacquire after {time}s',
        sendCodeSuccess: 'Verification code sent successfully',
        imageCodePlaceholder: 'Please enter image verification code'
      },
      register: {
        title: 'Register',
        agreement: 'I have read and agree to',
        protocol: '《User Agreement》',
        policy: '《Privacy Policy》'
      },
      resetPwd: {
        title: 'Reset Password'
      },
      bindWeChat: {
        title: 'Bind WeChat'
      }
    },
    home: {
      greeting: 'Good morning, {username}, today is another day full of vitality!',
      weatherDesc: 'Today is cloudy to clear, 20℃ - 25℃!',
      projectCount: 'Project Count',
      todo: 'Todo',
      message: 'Message',
      downloadCount: 'Download Count',
      registerCount: 'Register Count',
      schedule: 'Work and rest Schedule',
      study: 'Study',
      work: 'Work',
      rest: 'Rest',
      entertainment: 'Entertainment',
      visitCount: 'Visit Count',
      turnover: 'Turnover',
      dealCount: 'Deal Count',
      projectNews: {
        title: 'Project News',
        moreNews: 'More News',
        desc1: 'Soybean created the open source project soybean-admin on May 28, 2021!',
        desc2: 'Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.',
        desc3: 'Soybean is ready to do sufficient preparation for the release of soybean-admin!',
        desc4: 'Soybean is busy writing project documentation for soybean-admin!',
        desc5: 'Soybean just wrote some of the workbench pages casually, and it was enough to see!'
      },
      creativity: 'Creativity'
    },
    system: {
      common: {
        status: {
          enable: 'Enable',
          disable: 'Disable'
        }
      },
      role: {
        title: 'Role List',
        name: 'Role Name',
        code: 'Role Code',
        status: 'Role Status',
        remark: 'Role Remark',
        resourceAuth: 'Resource Auth',
        form: {
          name: 'Please enter role name',
          code: 'Please enter role code',
          status: 'Please select role status',
          remark: 'Please enter role remark'
        },
        addRole: 'Add Role',
        editRole: 'Edit Role'
      },
      user: {
        title: 'User List',
        username: 'User Name',
        nickname: 'Nick Name',
        phone: 'Phone Number',
        email: 'Email',
        status: 'User Status',
        role: 'User Role',
        form: {
          username: 'Please enter user name',
          nickname: 'Please enter nick name',
          phone: 'Please enter phone number',
          email: 'Please enter email',
          status: 'Please select user status',
          role: 'Please select user role'
        },
        addUser: 'Add User',
        editUser: 'Edit User'
      },
      resource: {
        title: 'Resource List',
        id: 'ID',
        parentId: 'Parent ID',
        type: 'Resource Type',
        name: 'Resource Name',
        path: 'Route Path',
        param: 'Path Param',
        component: 'Route Component',
        i18nKey: 'I18n Key',
        icon: 'Icon',
        localIcon: 'Local Icon',
        iconTypeTitle: 'Icon Type',
        sort: 'Sort',
        constant: 'Constant',
        cache: 'Keep Alive',
        frame: 'Is Frame',
        href: 'Href',
        visible: 'Show In Menu',
        perms: 'Resource permissions',
        query: 'Query Params',
        status: 'Resource Status',
        form: {
          home: 'Please select home',
          type: 'Please select resource type',
          name: 'Please enter resource name',
          path: 'Please enter route path',
          param: 'Please enter path param',
          component: 'Please enter route component',
          i18nKey: 'Please enter i18n key',
          icon: 'Please enter iconify name',
          localIcon: 'Please enter local icon name',
          sort: 'Please enter sort',
          cache: 'Please select whether to cache route',
          frame: 'Please select whether to frame',
          href: 'Please enter href',
          visible: 'Please select whether to show menu',
          perms: 'Please enter resource permissions',
          queryKey: 'Please enter route parameter Key',
          queryValue: 'Please enter route parameter Value',
          status: 'Please select resource status'
        },
        addResource: 'Add Resource',
        editResource: 'Edit Resource',
        addChildResource: 'Add Child Resource',
        resourceType: {
          directory: 'Directory',
          menu: 'Menu',
          button: 'Button'
        },
        iconType: {
          iconify: 'Iconify Icon',
          local: 'Local Icon'
        }
      },
      dictType: {
        title: 'Dict Type List',
        name: 'Dict Name',
        type: 'Dict Type',
        status: 'Dict Status',
        remark: 'Dict Remark',
        form: {
          name: 'Please enter dict name',
          type: 'Please enter dict type',
          status: 'Please select dict status',
          remark: 'Please enter dict remark'
        },
        addDictType: 'Add Dict Type',
        editDictType: 'Edit Dict Type'
      },
      dictData: {
        title: 'Dict Data List',
        label: 'Dict Label',
        value: 'Dict Value',
        sort: 'Dict Sort',
        dictType: 'Dict Type',
        status: 'Dict Data Status',
        remark: 'Dict Data Remark',
        form: {
          label: 'Please enter dict label',
          value: 'Please enter dict value',
          sort: 'Please enter dict sort',
          dictType: 'Please enter dict type',
          status: 'Please select dict data status',
          remark: 'Please enter dict data remark'
        },
        addDictData: 'Add Dict Data',
        editDictData: 'Edit Dict Data'
      },
      oauthClient: {
        title: 'Client List',
        clientId: 'Client Id',
        clientSecret: 'Client Secret',
        grantType: 'Grant Type',
        scope: 'Scope',
        redirectUri: 'Redirect Uri',
        accessTimeout: 'Access Timeout',
        refreshTimeout: 'Refresh Timeout',
        status: 'Client Status',
        form: {
          clientId: 'Please enter client id',
          clientSecret: 'Please enter client secret',
          grantType: 'Please enter grant type',
          scope: 'Please enter scope',
          redirectUri: 'Please enter redirect uri',
          accessTimeout: 'Please enter access timeout',
          refreshTimeout: 'Please enter refresh timeout',
          status: 'Please select client status',
        },
        addOauthClient: 'Add Client',
        editOauthClient: 'Edit Client'
      },
      ossConfig: {
        title: 'Oss Config List',
        configKey: 'Config Key',
        accessKey: 'Access Key',
        secretKey: 'Secret Key',
        bucketName: 'Bucket Name',
        prefix: 'Prefix',
        endpoint: 'Endpoint',
        domain: 'Domain',
        isHttps: 'Is Https',
        region: 'Region',
        accessPolicy: 'Access Policy',
        remark: 'Remark',
        status: 'Status',
        form: {
          configKey: 'Please enter config key',
          accessKey: 'Please enter  access key',
          secretKey: 'Please enter secret key',
          bucketName: 'Please enter bucket name',
          prefix: 'Please enter prefix',
          endpoint: 'Please enter endpoint',
          domain: 'Please enter domain',
          isHttps: 'Please enter is https',
          region: 'Please enter region',
          accessPolicy: 'Please enter access policy',
          remark: 'Please enter remark',
          status: 'Please select status'
        },
        addOssConfig: 'Add Oss Config',
        editOssConfig: 'Edit Oss Config',
        accessPolicyOption: {
          private: 'private',
          public: 'public',
          custom: 'custom'
        }
      },
      oss: {
        title: 'Oss List',
        service: 'Service',
        fileName: 'File Name',
        originalName: 'Original Name',
        fileSuffix: 'File Suffix',
        url: 'URL',
        form: {
          service: 'Please enter service',
          fileName: 'Please enter file name',
          originalName: 'Please enter original name',
          fileSuffix: 'Please enter file suffix',
          url: 'Please enter url'
        },
        addOss: 'Add Oss',
        editOss: 'Edit Oss',
        ossConfig: 'Oss Config',
        uploadFile: 'Upload File',
        uploadFileSuccess: 'Upload File Success',
        chooseFile: 'Choose File',
        downloadFile: 'Download'
      }
    },
    data: {
      common: {
        status: {
          enable: 'Enable',
          disable: 'Disable'
        }
      },
      module: {
        title: 'Module List',
        name: 'Module Name',
        code: 'Module Code',
        path: 'Module Path',
        status: 'Module Status',
        remark: 'Module Remark',
        form: {
          name: 'Please enter module name',
          code: 'Please enter module code',
          path: 'Please enter module path',
          status: 'Please select module status',
          remark: 'Please enter module remark'
        },
        importModule: 'Import'
      },
      table: {
        title: 'Business Table List',
        name: 'Table Name',
        comment: 'Table Comment',
        status: 'Table Status',
        remark: 'Table Remark',
        tableImport: 'Table Import',
        moduleInfo: 'Module Info',
        tableInfo: 'Table Info',
        columnInfo: 'Column Info',
        form: {
          name: 'Please enter table name',
          comment: 'Please enter table comment',
          status: 'Please select table status',
          remark: 'Please enter table remark',
          tableImport: 'Please select table to import'
        }
      },
      column: {
        name: 'Column Nane',
        comment: 'Column Comment',
        pk: 'Is Pk',
        form: 'Is Form',
        visible: 'Is Visible'
      }
    }
  },
  form: {
    required: 'Cannot be empty',
    username: {
      required: 'Please enter user name',
      invalid: 'User name format is incorrect'
    },
    phone: {
      required: 'Please enter phone number',
      invalid: 'Phone number format is incorrect'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    confirmPwd: {
      required: 'Please enter password again',
      invalid: 'The two passwords are inconsistent'
    },
    code: {
      required: 'Please enter verification code',
      invalid: 'Verification code format is incorrect'
    },
    email: {
      required: 'Please enter email',
      invalid: 'Email format is incorrect'
    }
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  datatable: {
    itemCount: 'Total {total} items'
  }
};

export default local;
