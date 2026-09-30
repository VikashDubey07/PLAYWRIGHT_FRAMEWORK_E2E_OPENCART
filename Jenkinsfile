// ═══════════════════════════════════════════════════════════════
// Jenkinsfile — Master CI/CD Pipeline
// Playwright TypeScript Framework
// Naveen Automation Labs
// ═══════════════════════════════════════════════════════════════

pipeline {
    agent any

    tools {
        nodejs 'NodeJS-24'
        maven 'Maven-3.9'
        jdk 'JDK-21'
        allure 'Allure'
    }

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['QA', 'dev', 'stage', 'Prod'],
            description: 'Select environment to run tests'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select browser'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'smoke', 'regression', 'api-smoke'],
            description: 'Select test suite'
        )
    }

    // environment {
    //     SLACK_CHANNEL = '#general'
    // }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
    }

    stages {

        // ═════════════════════════════════════════════════
        // STAGE 1: BUILD APP + UNIT TESTS
        // ═════════════════════════════════════════════════
        stage('Build & Unit Tests') {
            steps {
                echo "========================================="
                echo "  Building App + Running Unit Tests"
                echo "========================================="
                dir('dev-app') {
                    git url: 'https://github.com/jglick/simple-maven-project-with-tests.git',
                        branch: 'master'
                    bat 'mvn clean install -Dmaven.test.failure.ignore=true'
                }
            }
            post {
                always {
                    junit 'dev-app/target/surefire-reports/*.xml'
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 2: INSTALL PLAYWRIGHT DEPENDENCIES
        // ═════════════════════════════════════════════════
        stage('Install Dependencies') {
            steps {
                echo "========================================="
                echo "  Installing Playwright Dependencies"
                echo "========================================="
                dir('qa-tests') {
                    git url: 'https://github.com/VikashDubey07/PLAYWRIGHT_FRAMEWORK_E2E_OPENCART.git',
                        branch: 'master'
                    bat 'npm ci'
                    bat 'npx playwright install chromium'
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 3: DEPLOY DEV + SANITY
        // ═════════════════════════════════════════════════
        stage('Deploy to DEV') {
            steps {
                echo "========================================="
                echo "  Deploying to DEV..."
                echo "========================================="
                echo "DEV deployment complete ✅"
            }
        }

        stage('DEV - Sanity Tests') {
            steps {
                echo "========================================="
                echo "  Running SANITY @smoke on DEV"
                echo "========================================="
                dir('qa-tests') {
                    bat 'if exist allure-results rmdir /s /q allure-results\nif exist reports rmdir /s /q reports'
                    withCredentials([
                        usernamePassword(credentialsId: 'dev-credentials',
                            usernameVariable: 'USERNAME1', passwordVariable: 'PASSWORD1'),
                        string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                        string(credentialsId: 'dev-base-url', variable: 'BASE_URL'),
                        string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                    ]) {
                        bat '''
    set "ENV=dev"
    set "BASE_URL=%BASE_URL%"
    set "USERNAME1=%USERNAME1%"
    set "PASSWORD1=%PASSWORD1%"
    set "API_BASE_URL=%API_BASE_URL%"
    set "API_TOKEN=%API_TOKEN%"
    npx playwright test --project=chromium --grep @smoke
'''
                    }
                }
            }
            post {
                always {
                    bat 'if not exist reports-dev\\html mkdir reports-dev\\html\nif not exist reports-dev\\allure mkdir reports-dev\\allure'
                    bat 'xcopy /E /I /Y qa-tests\\reports\\html-report\\* reports-dev\\html\\ >nul 2>&1 || exit /b 0'
                    bat 'allure generate qa-tests\\allure-results --clean -o reports-dev\\allure || exit /b 0'
                    publishHTML(target: [
                        reportName: 'DEV Sanity - PW HTML Report',
                        reportDir: 'reports-dev/html',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                    publishHTML(target: [
                        reportName: 'DEV Sanity - Allure Report',
                        reportDir: 'reports-dev/allure',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 4: DEPLOY QA + REGRESSION
        // ═════════════════════════════════════════════════
        stage('Deploy to QA') {
            steps {
                echo "========================================="
                echo "  Deploying to QA..."
                echo "========================================="
                echo "QA deployment complete ✅"
            }
        }

        stage('QA - Regression Tests') {
            steps {
                echo "========================================="
                echo "  Running REGRESSION (all tests) on QA"
                echo "========================================="
                dir('qa-tests') {
                    bat 'if exist allure-results rmdir /s /q allure-results\nif exist reports rmdir /s /q reports'
                    withCredentials([
                        usernamePassword(credentialsId: 'qa-credentials',
                            usernameVariable: 'USERNAME1', passwordVariable: 'PASSWORD1'),
                        string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                        string(credentialsId: 'qa-base-url', variable: 'BASE_URL'),
                        string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                    ]) {
                        bat '''
    set "ENV=qa"
    set "BASE_URL=%BASE_URL%"
    set "USERNAME1=%USERNAME1%"
    set "PASSWORD1=%PASSWORD1%"
    set "API_BASE_URL=%API_BASE_URL%"
    set "API_TOKEN=%API_TOKEN%"
    npx playwright test --project=chromium
'''
                    }
                }
            }
            post {
                always {
                    bat 'if not exist reports-qa\\html mkdir reports-qa\\html\nif not exist reports-qa\\allure mkdir reports-qa\\allure'
                    bat 'xcopy /E /I /Y qa-tests\\reports\\html-report\\* reports-qa\\html\\ >nul 2>&1 || exit /b 0'
                    bat 'allure generate qa-tests\\allure-results --clean -o reports-qa\\allure || exit /b 0'
                    publishHTML(target: [
                        reportName: 'QA Regression - PW HTML Report',
                        reportDir: 'reports-qa/html',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                    publishHTML(target: [
                        reportName: 'QA Regression - Allure Report',
                        reportDir: 'reports-qa/allure',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 5: DEPLOY STAGE + SANITY
        // ═════════════════════════════════════════════════
        stage('Deploy to STAGE') {
            steps {
                echo "========================================="
                echo "  Deploying to STAGE..."
                echo "========================================="
                echo "STAGE deployment complete ✅"
            }
        }

        stage('STAGE - Sanity Tests') {
            steps {
                echo "========================================="
                echo "  Running SANITY @smoke on STAGE"
                echo "========================================="
                dir('qa-tests') {
                    bat 'if exist allure-results rmdir /s /q allure-results\nif exist reports rmdir /s /q reports'
                    withCredentials([
                        usernamePassword(credentialsId: 'stage-credentials',
                            usernameVariable: 'USERNAME1', passwordVariable: 'PASSWORD1'),
                        string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                        string(credentialsId: 'stage-base-url', variable: 'BASE_URL'),
                        string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                    ]) {
                        bat '''
    set "ENV=stage"
    set "BASE_URL=%BASE_URL%"
    set "USERNAME1=%USERNAME1%"
    set "PASSWORD1=%PASSWORD1%"
    set "API_BASE_URL=%API_BASE_URL%"
    set "API_TOKEN=%API_TOKEN%"
    npx playwright test --project=chromium --grep @smoke
'''
                    }
                }
            }
            post {
                always {
                    bat 'if not exist reports-stage\\html mkdir reports-stage\\html\nif not exist reports-stage\\allure mkdir reports-stage\\allure'
                    bat 'xcopy /E /I /Y qa-tests\\reports\\html-report\\* reports-stage\\html\\ >nul 2>&1 || exit /b 0'
                    bat 'allure generate qa-tests\\allure-results --clean -o reports-stage\\allure || exit /b 0'
                    publishHTML(target: [
                        reportName: 'STAGE Sanity - PW HTML Report',
                        reportDir: 'reports-stage/html',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                    publishHTML(target: [
                        reportName: 'STAGE Sanity - Allure Report',
                        reportDir: 'reports-stage/allure',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 6: DEPLOY PROD + SMOKE (with approval)
        // ═════════════════════════════════════════════════
        stage('Approval for PROD') {
            steps {
                input message: 'Deploy to PROD?',
                    ok: 'Yes, Deploy!',
                    submitter: 'admin,naveen'
            }
        }

        stage('Deploy to PROD') {
            steps {
                echo "========================================="
                echo "  Deploying to PROD..."
                echo "========================================="
                echo "PROD deployment complete ✅"
            }
        }

        stage('PROD - Smoke Tests') {
            steps {
                echo "========================================="
                echo "  Running SMOKE @smoke on PROD"
                echo "========================================="
                dir('qa-tests') {
                    bat 'if exist allure-results rmdir /s /q allure-results\nif exist reports rmdir /s /q reports'
                    withCredentials([
                        usernamePassword(credentialsId: 'prod-credentials',
                            usernameVariable: 'USERNAME1', passwordVariable: 'PASSWORD1'),
                        string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                        string(credentialsId: 'prod-base-url', variable: 'BASE_URL'),
                        string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                    ]) {
                        bat '''
    set "ENV=prod"
    set "BASE_URL=%BASE_URL%"
    set "USERNAME1=%USERNAME1%"
    set "PASSWORD1=%PASSWORD1%"
    set "API_BASE_URL=%API_BASE_URL%"
    set "API_TOKEN=%API_TOKEN%"
    npx playwright test --project=chromium --grep @smoke
'''
                    }
                }
            }
            post {
                always {
                    bat 'if not exist reports-prod\\html mkdir reports-prod\\html\nif not exist reports-prod\\allure mkdir reports-prod\\allure'
                    bat 'xcopy /E /I /Y qa-tests\\reports\\html-report\\* reports-prod\\html\\ >nul 2>&1 || exit /b 0'
                    bat 'allure generate qa-tests\\allure-results --clean -o reports-prod\\allure || exit /b 0'
                    publishHTML(target: [
                        reportName: 'PROD Smoke - PW HTML Report',
                        reportDir: 'reports-prod/html',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                    publishHTML(target: [
                        reportName: 'PROD Smoke - Allure Report',
                        reportDir: 'reports-prod/allure',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }
    }
}

    