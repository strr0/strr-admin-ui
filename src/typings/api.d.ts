/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /**
     * common params of paginating
     */
    interface PaginatingCommonParams {
      /**
       * current page number
       */
      page: number;
      /**
       * page size
       */
      size: number;
      /**
       * total count
       */
      total: number;
    }

    /**
     * common params of paginating query list data
     */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      content: T[];
    }

    /**
     * enable status
     *
     * - "1": enabled
     * - "0": disabled
     */
    type EnableStatus = '1' | '0';

    /**
     * common record
     */
    type CommonRecord<T = any> = {
      /**
       * record id
       */
      id: number | null;
      /**
       * record creator
       */
      createBy: string;
      /**
       * record create time
       */
      createTime: string;
      /**
       * record updater
       */
      updateBy: string;
      /**
       * record update time
       */
      updateTime: string;
      /**
       * record status
       */
      status: EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      accessToken: string;
      refreshToken: string;
    }

    /**
     * user info
     */
    interface UserInfo {
      /**
       * user id
       */
      userId: string;
      /**
       * username
       */
      username: string;
      /**
       * perms
       */
      perms: string[];
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type CustomRoute = import('vue-router').CustomRoute;

    interface MenuRoute extends CustomRoute {
      id: string;
    }
  }

  /**
   * namespace System
   *
   * backend api module: "system"
   */
  namespace System {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /**
     * role
     */
    type Role = Common.CommonRecord<{
      /**
       * role name
       */
      name: string;
      /**
       * role code
       */
      code: string;
      /**
       * role description
       */
      remark?: string;
    }>;

    /**
     * role search params
     */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.System.Role, 'name' | 'code' | 'status'> & CommonSearchParams
    >;

    /**
     * role list
     */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /**
     * all role
     */
    type AllRole = Pick<Role, 'id' | 'name' | 'code'>;

    /**
     * user
     */
    type User = Common.CommonRecord<{
      /**
       * user name
       */
      username: string;
      /**
       * user nick name
       */
      nickname: string;
      /**
       * user phone
       */
      phone: string;
      /**
       * user email
       */
      email: string;
      /**
       * avatar
       */
      avatar?: string;
      /**
       * remark
       */
      remark?: string;
      /**
       * user role code collection
       */
      roleIds: string[];
    }>;

    /**
     * user search params
     */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.System.User, 'username' | 'nickname' | 'phone' | 'email' | 'status'> &
        CommonSearchParams
    >;

    /**
     * user list
     */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * resource type
     *
     * - "D": directory
     * - "M": menu
     * - "B": button
     */
    type ResourceType = 'D' | 'M' | 'B';

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type ResourcePropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'order'
      | 'query'
    >;

    type Resource = Common.CommonRecord<{
      /**
       * parent resource id
       */
      parentId: number;
      /**
       * resource type
       */
      type: ResourceType;
      /**
       * resource name
       */
      name: string;
      /**
       * route path
       */
      path: string;
      /**
       * component
       */
      component?: string;
      /**
       * is frame
       */
      frame: string;
      /**
       * is cache
       */
      cache: string;
      /**
       * iconify icon name or local icon name
       */
      icon: string;
      /**
       * icon type
       */
      iconType: IconType;
      /**
       * is visible
       */
      visible: string;
      /**
       * permissions
       */
      perms?: string;
      /**
       * remark
       */
      remark?: string;
      /**
       * children resource
       */
      children?: Resource[] | null;
    }> &
      ResourcePropsOfRoute;

    /**
     * dict type
     */
    type DictType = Common.CommonRecord<{
      /**
       * dict name
       */
      name: string;
      /**
       * dict type
       */
      type: string;
      /**
       * dict description
       */
      remark?: string;
    }>;

    /**
     * dict type search params
     */
    type DictTypeSearchParams = CommonType.RecordNullable<
      Pick<Api.System.DictType, 'name' | 'type' | 'status'> & CommonSearchParams
    >;

    /**
     * dict type list
     */
    type DictTypeList = Common.PaginatingQueryRecord<DictType>;

    /**
     * dict data
     */
    type DictData = Common.CommonRecord<{
      /**
       * dict sort
       */
      sort: number;
      /**
       * dict label
       */
      label: string;
      /**
       * dict value
       */
      value: string;
      /**
       * dict type
       */
      dictType: string;
      /**
       * dict description
       */
      remark?: string;
    }>;

    /**
     * dict data search params
     */
    type DictDataSearchParams = CommonType.RecordNullable<
      Pick<Api.System.DictData, 'label' | 'value' | 'dictType' | 'status'> & CommonSearchParams
    >;

    /**
     * dict data list
     */
    type DictDataList = Common.PaginatingQueryRecord<DictData>;

    /**
     * oauth client
     */
    type OauthClient = Common.CommonRecord<{
      /**
       * client id
       */
      clientId: string;
      /**
       * client secret
       */
      clientSecret: string;
      /**
       * grant type
       */
      grantType: string;
      /**
       * scope
       */
      scope: string;
      /**
       * redirect uri
       */
      redirectUri: string;
      /**
       * access timeout
       */
      accessTimeout: number | null;
      /**
       * refresh timeout
       */
      refreshTimeout: number | null;
    }>;

    /**
     * oauth client search params
     */
    type OauthClientSearchParams = CommonType.RecordNullable<
      Pick<Api.System.OauthClient, 'clientId' | 'grantType' | 'status'> & CommonSearchParams
    >;

    /**
     * oauth client list
     */
    type OauthClientList = Common.PaginatingQueryRecord<OauthClient>;
  }

  /**
   * namespace Data
   */
  namespace Data {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /**
     * table
     */
    type Table = Common.CommonRecord<{
      /**
       * table name
       */
      name: string;
      /**
       * table comment
       */
      comment?: string;
      /**
       * table remark
       */
      remark?: string;
    }>;

    /**
     * table search params
     */
    type TableSearchParams = CommonType.RecordNullable<
      Pick<Api.Data.Table, 'name' | 'comment' | 'status'> & CommonSearchParams
    >;

    /**
     * table list
     */
    type TableList = Common.PaginatingQueryRecord<Table>;

    /**
     * column
     */
    type Column = Common.CommonRecord<{
      /**
       * table id
       */
      tableId: number | null;
      /**
       * column name
       */
      name: string;
      /**
       * column comment
       */
      comment: string;
      /**
       * is pk
       */
      pk: string;
      /**
       * is form
       */
      form: string;
      /**
       * is visible
       */
      visible: string;
      /**
       * column order
       */
      order: number;
    }>;

    /**
     * module
     */
    type Module = Common.CommonRecord<{
      /**
       * table id
       */
      tableId: number | null;
      /**
       * module name
       */
      name: string;
      /**
       * module code
       */
      code: string;
      /**
       * module path
       */
      path: string;
      /**
       * module remark
       */
      remark: string;
    }>;

    /**
     * module info
     */
    type ModuleInfo = Module & {
      /**
       * table
       */
      table: Table,
      /**
       * columns
       */
      columns: Column[]
    }

    /**
     * module search params
     */
    type ModuleSearchParams = CommonType.RecordNullable<
      Pick<Api.Data.Module, 'name' | 'code' | 'path' | 'status'> & CommonSearchParams
    >;

    /**
     * table list
     */
    type ModuleList = Common.PaginatingQueryRecord<Module>;
  }
}
