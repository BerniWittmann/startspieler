import { test, expect } from '@playwright/test'

test('happy path: add players, pick starting player', async ({ page }) => {
  await page.goto('/')

  // Navigate to settings
  await page.click('a[aria-label="Settings"]')
  await expect(page).toHaveURL(/settings/)

  // Add two players
  await page.click('button:has-text("Add Player")')
  await page.click('button:has-text("Add Player")')

  // Verify two players exist
  const playerRows = page.locator('[class*="rounded-xl"][class*="p-4"]')
  await expect(playerRows).toHaveCount(2)

  // Verify both are checked (selected by default)
  const checkboxes = page.locator('button[aria-label*="player"]')
  for (let i = 0; i < 2; i++) {
    await expect(checkboxes.nth(i)).toHaveAttribute('aria-label', 'Deselect player')
  }

  // Go back to main
  await page.click('a[aria-label="Back to main screen"]')
  await expect(page).toHaveURL(/\/$|localhost:3000\/$/)

  // Click pick starting player
  await page.click('button:has-text("Pick Starting Player")')

  // Wait for card flip animation (300ms delay + 700ms transition)
  await page.waitForTimeout(1200)

  // Assert exactly one card is face-up (flipped)
  // The flipped card's front face should be visible and contain a player name
  const flippedCards = page.locator('[style*="rotateY(180deg)"]')
  // The inner element with rotateY(180deg) is the card inner container
  // The winner card shows "Starting Player" text
  const winnerLabel = page.locator('text=Starting Player')
  await expect(winnerLabel).toHaveCount(1)
})
