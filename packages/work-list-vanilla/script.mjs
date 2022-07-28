import fse from 'fs-extra'
import { resolve, join, dirname } from 'path'
import { globby } from 'globby'

const distDir = resolve('../../docs', 'work-list-vanilla')

globby('./src/**').then(paths => {
    paths.forEach(path => {
        const targetPath = resolve(path)
        const distPath = join(distDir, path.slice(5))
        const dir = dirname(distPath)
        if (! fse.existsSync(dir)) {
            fse.mkdirSync(dir, { recursive: true })
        }
        fse.copyFileSync(targetPath, distPath)
    })
})