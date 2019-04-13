import Vue from 'vue'
import JqTable from '@/components/JqTable'
import JqUpload from '@/components/JqUpload'

let components = [JqTable, JqUpload]

components.map(component => {
    Vue.component(component.name, component)
})
