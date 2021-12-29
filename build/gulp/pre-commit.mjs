import debug from 'debug'

import {
  notStagedChanges,
  hasStagedChanges,
  getGitRemoteShowOriginHeadBranch,
  notPackageVersionChanges,
  patchPackageVersion,
  addPackageVersionChanges
} from '#build/gulp/common'

const log = debug('render-script:build:gulp:pre-commit')
const error = debug('render-script:build:gulp:pre-commit:error')

log('`render-script` is awake')

export default async function preCommit () {
  log('pre-commit')

  try {
    /**
     *  Not changes added, exit
     */
    if (await notStagedChanges()) return
    /**
     *  Has changes added, continue
     */
    if (await hasStagedChanges()) {
      /**
       *  Not package version changes, continue
       */
      if (await notPackageVersionChanges(await getGitRemoteShowOriginHeadBranch())) {
        await patchPackageVersion()
        await addPackageVersionChanges()
      }
    }
  } catch ({ code = 'NONE', message = 'No error message defined' }) {
    error({ code, message })
  }
}
