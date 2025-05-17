// This file uses Vitest for unit testing
import { describe, it, expect } from 'vitest'
import tailwindConfig from '../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

const fullConfig = resolveConfig(tailwindConfig)

describe('Tailwind CSS configuration', () => {
  it('defines a non-empty array of content globs', () => {
    expect(Array.isArray(tailwindConfig.content)).toBe(true)
    expect(tailwindConfig.content.length).toBeGreaterThan(0)
    tailwindConfig.content.forEach((glob) => {
      expect(typeof glob).toBe('string')
      expect(glob.length).toBeGreaterThan(0)
    })
  })

  it('does not include empty string globs in content', () => {
    tailwindConfig.content.forEach((glob) => {
      expect(glob.trim()).not.toBe('')
    })
  })

  it('defines the correct screen breakpoints', () => {
    const screens = fullConfig.theme!.screens as Record<string, string>
    expect(Object.keys(screens)).toEqual(Object.keys(tailwindConfig.theme!.screens!))
    Object.entries(screens).forEach(([key, value]) => {
      expect(typeof key).toBe('string')
      expect(/^\d+px$/.test(value)).toBe(true)
    })
  })

  it('extends colors with custom brand palette', () => {
    const extendedColors = (fullConfig.theme as any).colors
    expect(extendedColors).toHaveProperty('brand')
    expect(extendedColors.brand).toMatchObject({
      DEFAULT: '#1a202c',
      light: '#2d3748'
    })
  })

  it('registers all plugins as functions', () => {
    expect(Array.isArray(tailwindConfig.plugins)).toBe(true)
    tailwindConfig.plugins!.forEach((plugin) => {
      expect(typeof plugin).toBe('function')
    })
  })

  it('resolves to a complete config object', () => {
    expect(fullConfig).toHaveProperty('theme')
    expect(fullConfig).toHaveProperty('variants')
    expect(fullConfig).toHaveProperty('plugins')
  })

  it('does not include undefined experimental flags by default', () => {
    expect((tailwindConfig as any).experimental).toBeUndefined()
  })
})