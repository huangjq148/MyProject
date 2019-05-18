import Vue from 'vue'
import JqSelect from '@/components/base/JqSelect'
import JqTable from '@/components/base/JqTable'
import JqUpload from '@/components/base/JqUpload'

let components = [JqTable, JqUpload, JqSelect]

components.map(component => {
    Vue.component(component.name, component)
})
