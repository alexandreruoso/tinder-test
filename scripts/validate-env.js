#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const environments = ['development', 'staging', 'production']
const requiredVars = [
    'VITE_APP_TITLE',
    'VITE_API_BASE_URL',
    'VITE_BASE_URL',
    'VITE_APP_VERSION',
    'VITE_APP_ENVIRONMENT',
    'VITE_APP_DEBUG_MODE',
]

function validateEnvironmentFile(envName) {
    const envPath = join(process.cwd(), `.env.${envName}`)

    if (!existsSync(envPath)) {
        console.error(`❌ Missing environment file: .env.${envName}`)
        return false
    }

    const envContent = readFileSync(envPath, 'utf8')
    const envVars = envContent
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#'))
        .map((line) => line.split('=')[0])

    const missingVars = requiredVars.filter(
        (varName) => !envVars.includes(varName)
    )

    if (missingVars.length > 0) {
        console.error(
            `❌ Missing required variables in .env.${envName}:`,
            missingVars
        )
        return false
    }

    console.log(`✅ .env.${envName} is valid`)
    return true
}

function main() {
    console.log('🔍 Validating environment files...\n')

    let allValid = true

    for (const env of environments) {
        if (!validateEnvironmentFile(env)) {
            allValid = false
        }
    }

    if (allValid) {
        console.log('\n🎉 All environment files are valid!')
        process.exit(0)
    } else {
        console.error(
            '\n❌ Some environment files are invalid. Please fix the issues above.'
        )
        process.exit(1)
    }
}

main()
