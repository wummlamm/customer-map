import { test, expect } from '@playwright/test';

const MARKER = '.leaflet-marker-icon, path.leaflet-interactive';

test.describe('customer-map', () => {
  test('Startseite lädt und zeigt die Karte', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.leaflet-container')).toBeVisible();
  });

  test('Firmen aus der API erscheinen als Marker', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(MARKER).first()).toBeVisible({ timeout: 30_000 });
  });

  test('Regression: kein "Load failed" nach dem Laden der Daten', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(MARKER).first()).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText('Load failed')).toHaveCount(0);
  });
});
