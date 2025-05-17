import { describe, it, expect } from 'vitest'
import astroConfig from '../../astro.config'

describe('Astro Config', () => {
  it('should export a valid configuration object', () => {
    expect(typeof astroConfig).toBe('object')
  })

  it('should have the correct site URL', () => {
    expect(astroConfig.site).toBe('https://www.example.com')
  })

  it('should have the correct base path', () => {
    expect(astroConfig.base).toBe('/blog/')
  })

  it('should include required integrations', () => {
    expect(Array.isArray(astroConfig.integrations)).toBe(true)
    expect(astroConfig.integrations.length).toBe(2)
  })

  it('should set markdown.syntaxHighlight to prism', () => {
    expect(astroConfig.markdown.syntaxHighlight).toBe('prism')
  })

  it('should configure Vite aliases correctly', () => {
    expect(astroConfig.vite.resolve.alias['@components']).toBe('./src/components')
    expect(astroConfig.vite.resolve.alias['@utils']).toBe('./src/utils')
  })
})