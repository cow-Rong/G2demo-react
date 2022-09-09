import { TimestampToString } from 'src/utils'
import { ApiOutlined, ClusterOutlined, ContainerOutlined, FontSizeOutlined, ForkOutlined } from "@ant-design/icons"
/* ------------卡片编辑--------------- */

export const SCREEN_WIDTH = 1920
export const SCREEN_HEIGHT = 1080

export const ItemTypes = {
  CARD: 'box',
}

export const addBtnFackData = {
  id: '-1',
  name: 'addPage',
  description: '',
  used: false,
  icon: '',
  visual_type: 'bigscreen',
  isdefault: true,
  background: {
    color: 'dark',
    picture: '',
  },
  pages: '{}',
}

export const pagesEditDetailpagedata = [
  {
    title: '可视化编排配置',
    url: '',
  },
  {
    title: '大屏管理',
    url: '',
  },
  {
    title: '大屏编辑',
    url: '',
  },
]

/* ------------公共样式--------------- */
export const sliderStyle = {
  backgroundColor: '#383b3e',
  borderRight: '1px solid #0d0e10'
}
export const searchStyle = {
  paddingTop: '6px',
  marginBottom: '20px',
}

/* -----------数据来源管理列表------------- */

export const UPLOAD_DATAS_URL = ''

export const pagesManagepagedata = [
  {
    title: '可视化编排配置',
    url: '',
  },
  {
    title: '大屏管理',
    url: '',
  },
]

export interface pageManagerListDataType {
  id: React.Key
  key: string
  name: string
  type: string
  category: string
  dataType: string
  is_default: number
  description: string
  icon: string
  update_time: string
  version: string
  file_path: string
  author: string
  props: any
  config: any
}

export const pageManagerFormConfig = [
  {
    name: 'label',
    label: '标签：',
    type: 'SelectTag',
    rules: [],
    data: {
      tagsData: [],
    },
  },
  // {
  //   name: 'time',
  //   label: '时间',
  //   type: 'TimeRange',
  //   rules: [],
  //   data: {
  //     dateFormat: 'YYYY/MM/DD',
  //   },
  // },
  {
    name: 'name',
    label: '名称',
    type: 'Input',
    rules: [
      {
        max: 64,
        message: '不能大于64个字符',
      }
    ],
  },
  {
    name: 'is_default',
    label: '是否内置',
    type: 'Select',
    span: 4,
    rules: [],
    data: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
      defaultValue: undefined,
    },
  },
  {
    name: 'is_release',
    label: '是否发布',
    type: 'Select',
    span: 4,
    rules: [],
    data: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
      defaultValue: undefined,
    },
  },
  {
    name: 'user_name',
    label: '创建者',
    type: 'Input',
    span: 3,
    rules: [
      {
        max: 64,
        message: '不能大于64个字符',
      }
    ],
  },
]

export const pageManagerMap: any = {
  is_default: {
    valuetolabel: {
      '0': '否',
      '1': '是',
    },
    labeltovalue: {
      否: '0',
      是: '1',
    },
  },
  is_release: {
    valuetolabel: {
      '0': '否',
      '1': '是',
    },
    labeltovalue: {
      否: '0',
      是: '1',
    },
  },
}

export const handlePagesManageList = (pagesManageList: any) => {
  return pagesManageList.map((item: any) => ({
    ...item,
    is_default: pageManagerMap['is_default']['valuetolabel'][item.is_default],
    is_release: pageManagerMap['is_release']['valuetolabel'][item.is_release],
    update_time: TimestampToString(item.update_time),
  }))
}

export const handlePagesManageListValue = (pagesManageData: any) => {
  return {
    ...pagesManageData,
    is_default:pageManagerMap['is_default']['labeltovalue'][pagesManageData.is_default],
    is_release:pageManagerMap['is_release']['labeltovalue'][pagesManageData.is_release],
  }
}

export const handlePagesManageLabels = (pagesManageLabels: any) => {
  return pagesManageLabels.map((item: any) => ({ label: item, value: item }))
}
