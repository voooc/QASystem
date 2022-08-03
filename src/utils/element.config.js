import 'element-plus/dist/index.css'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElAutocomplete,
  ElMenu,
  ElMenuItem,
  ElAvatar,
  ElLoading
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElAutocomplete,
  ElMenu,
  ElMenuItem,
  ElAvatar,
  ElLoading
]

export default function (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
