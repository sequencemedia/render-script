import debug from 'debug'

import {
  readFile
} from 'fs/promises'

import {
  exec
} from 'child_process'

const OPTIONS = {
  maxBuffer: 1024 * 500
}

const BRANCH = 'master'

const log = debug('render-script:build:gulp:post-commit')
const error = debug('render-script:build:gulp:post-commit:error')

log('`render-script` is awake')

const PACKAGE_VERSION_CHANGES = /\-+\s+"version":\s+"(\d+\.\d+\.\d+)",+\s+\++\s+"version":\s+"(\d+\.\d+\.\d+)",+\s+/ /* eslint-disable-line no-useless-escape */

const trim = (v) => v.split('\n').map((v) => v.trimEnd()).join('\n').trim()

function use (key) {
  const log = debug(`render-script:${key}`)

  return function use (v) {
    log(trim(v))
  }
}

export function getGitRemoteShowOriginHeadBranch () {
  log('getGitRemoteShowOriginHeadBranch')

  return (
    new Promise((resolve, reject) => {
      const command = 'git remote show origin | awk \'/HEAD branch/ {print $NF}\''

      const {
        stdout,
        stderr
      } = exec(command, OPTIONS, (e, v = '') => (!e) ? resolve(trim(v)) : reject(e))

      stdout.on('data', use('git-remote-show-origin-head-branch'))
      stderr.on('data', use('git-remote-show-origin-head-branch'))
    })
  )
}

export function notPackageVersionChanges (branch = BRANCH) {
  log('notPackageVersionChanges')

  return (
    new Promise((resolve, reject) => {
      exec(`git diff HEAD origin/${branch} package.json`, OPTIONS, (e, v) => (!e) ? resolve(PACKAGE_VERSION_CHANGES.test(v) !== true) : reject(e))
    })
  )
}

export async function getPackageVersion () {
  log('getPackageVersion')

  const {
    version = '0.0.0'
  } = JSON.parse(await readFile('./package.json', 'utf8'))

  return version
}

export function gitTag (a = '0.0.0', m = `v${a}`) {
  log('gitTag')

  return (
    new Promise((resolve, reject) => {
      exec(`git tag -a v${a} -m "${m}"`, OPTIONS, (e, v) => (!e) ? resolve(v) : reject(e))
    })
  )
}

export default async function postCommit () {
  log('post-commit')

  try {
    if (await notPackageVersionChanges(await getGitRemoteShowOriginHeadBranch())) {
      await gitTag(await getPackageVersion())
    }
  } catch ({ code = 'NONE', message = 'No error message defined' }) {
    error({ code, message })
  }
}
