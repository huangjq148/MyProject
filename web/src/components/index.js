import Vue from 'vue'
import JqTable from '@/components/base/JqTable'
import JqUpload from '@/components/base/JqUpload'

let components = [JqTable, JqUpload]

components.map(component => {
    Vue.component(component.name, component)
})
