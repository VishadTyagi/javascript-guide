// Import all category data
import { core_js } from './categories/core-js'
import { advanced_js } from './categories/advanced-js'
import { react } from './categories/react'
import { nodejs } from './categories/nodejs'
import { databases } from './categories/databases'
import { system_design } from './categories/system-design'

// Combine all categories into learningData object
export const learningData = {
    'core-js': core_js,
    'advanced-js': advanced_js,
    'react': react,
    'nodejs': nodejs,
    'databases': databases,
    'system-design': system_design
}
