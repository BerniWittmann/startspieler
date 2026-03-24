import { test, expect } from '@playwright/test'

test('happy path: add players, pick starting player', async ({ page }) => {
  await page.goto('/')

  // Navigate to settings
  await page.click('a[aria-label="Settings"]')
  await expect(page).toHaveURL(/settings/)

  // Add two players
  await page.locator('button:has-text("ADD PERSONNEL")').click()
  await page.locator('button:has-text("ADD PERSONNEL")').click()

  // Verify two players exist
  const playerRows = page.locator('[data-testid="player-row"]')
  await expect(playerRows).toHaveCount(2)

  // Verify both are selected by default (checkbox aria-label starts with "Deselect")
  const checkboxes = page.locator('button[aria-label^="Deselect"]')
  await expect(checkboxes).toHaveCount(2)

  // Go back to main
  await page.click('a[aria-label="Back"]')
  await expect(page).toHaveURL(/\/$|localhost:3000\/$/)

  // Click pick starting player
  await page.locator('button:has-text("PICK STARTING PLAYER")').click()

  // Wait for card flip animation (300ms delay + 700ms transition)
  await page.waitForTimeout(1200)

  // Status HUD shows PROTOCOL COMPLETE once a winner is picked
  await expect(page.locator('text=PROTOCOL COMPLETE')).toHaveCount(1)
})
