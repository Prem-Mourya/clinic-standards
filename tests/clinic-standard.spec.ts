import { test, expect } from '@playwright/test';

test.describe('Aarogya Family Clinic (Master Template A)', () => {
  const BASE_URL = 'http://localhost:5173';

  test('Multi-page routing and navigation across all clinic sections', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // 1. Home Page Verification
    await expect(page).toHaveURL(`${BASE_URL}/`);
    await expect(page.locator('h1')).toContainText('The family doctor you can talk to');
    await expect(page.locator('text=Dr. Arjun Mehta').first()).toBeVisible();
    await expect(page.locator('text=MBBS, MD (General Medicine)').first()).toBeVisible();
    await expect(page.locator('text=₹400 Standard').first()).toBeVisible();
    await expect(page.locator('text=7-Day Free').first()).toBeVisible();
    await expect(page.locator('nav >> text=Home')).toBeVisible();
    await expect(page.locator('nav >> text=Services & Fees')).toBeVisible();
    await expect(page.locator('nav >> text=About Doctor')).toBeVisible();
    await expect(page.locator('nav >> text=Timings & Location')).toBeVisible();
    await expect(page.locator('nav >> text=Patient Reviews')).toBeVisible();
    await expect(page.locator('nav >> text=FAQs')).toBeVisible();
    await expect(page.locator('nav >> text=Existing Patients')).toBeVisible();

    // 2. Services & Fees Page
    await page.locator('nav >> text=Services & Fees').click();
    await expect(page).toHaveURL(`${BASE_URL}/services`);
    await expect(page.locator('h1')).toContainText('Evidence-based outpatient consultations');
    await expect(page.locator('text=Fever, Viral & Infection Management').first()).toBeVisible();
    await expect(page.locator('text=Consultation Fee').first()).toBeVisible();
    await expect(page.locator('text=What to Bring for Your Consultation').first()).toBeVisible();

    // Test service category filter
    await page.locator('button:has-text("Chronic Conditions")').click();
    await expect(page.locator('text=Diabetes & Hypertension Care').first()).toBeVisible();

    // 3. About Doctor Page
    await page.locator('nav >> text=About Doctor').click();
    await expect(page).toHaveURL(`${BASE_URL}/about`);
    await expect(page.locator('h1')).toContainText('Meet Dr. Arjun Mehta');
    await expect(page.locator('text=King George\'s Medical University (KGMU)').first()).toBeVisible();
    await expect(page.locator('text=DMC/R/58492').first()).toBeVisible();
    await expect(page.locator('text=Zero Tolerance for Polypharmacy').first()).toBeVisible();

    // 4. Timings & Location Page
    await page.locator('nav >> text=Timings & Location').click();
    await expect(page).toHaveURL(`${BASE_URL}/timings`);
    await expect(page.locator('h1')).toContainText('Clinic timings, location & directions');
    await expect(page.locator('text=Morning OPD').first()).toBeVisible();
    await expect(page.locator('text=10:00 AM – 1:30 PM').first()).toBeVisible();
    await expect(page.locator('text=Shanti Vihar Commercial Complex').first()).toBeVisible();
    await expect(page.locator('iframe[title*="Google Maps Location"]')).toBeVisible();

    // 5. Patient Reviews Page
    await page.locator('nav >> text=Patient Reviews').click();
    await expect(page).toHaveURL(`${BASE_URL}/reviews`);
    await expect(page.locator('h1')).toContainText('Real feedback from our patients');
    await expect(page.locator('text=Rajeshwar Sharma').first()).toBeVisible();
    await expect(page.locator('text=Patient Consent & Clinical Transparency').first()).toBeVisible();

    // Filter by Chronic Care
    await page.locator('button:has-text("Chronic Care")').click();
    await expect(page.locator('text=Rajeshwar Sharma').first()).toBeVisible();

    // 6. FAQs Page with Live Search
    await page.locator('nav >> text=FAQs').click();
    await expect(page).toHaveURL(`${BASE_URL}/faqs`);
    await expect(page.locator('h1')).toContainText('Frequently asked questions');
    await expect(page.locator('text=What is the consultation fee and what payment methods are accepted?')).toBeVisible();

    // Search query for 'walk-in'
    await page.fill('input[placeholder*="Search questions"]', 'walk-in');
    await expect(page.locator('text=Do I need an appointment or can I walk in directly?')).toBeVisible();

    // 7. Existing Patients & 7-Day Free Follow-Up Portal
    await page.locator('nav >> text=Existing Patients').click();
    await expect(page).toHaveURL(`${BASE_URL}/existing-patients`);
    await expect(page.locator('h1')).toContainText('Welcome back to Aarogya Family Clinic');
    await expect(page.locator('text=Follow-Up Within 7 Days is Completely Free (₹0)')).toBeVisible();
    await expect(page.locator('text=WhatsApp Report Sharing')).toBeVisible();

    // 8. Test Route Aliases
    await page.goto(`${BASE_URL}/doctor`);
    await expect(page.locator('h1')).toContainText('Meet Dr. Arjun Mehta');

    await page.goto(`${BASE_URL}/contact`);
    await expect(page.locator('h1')).toContainText('Clinic timings, location & directions');

    await page.goto(`${BASE_URL}/follow-up`);
    await expect(page.locator('h1')).toContainText('Welcome back to Aarogya Family Clinic');
  });

  test('Dual appointment enquiry system: Web form and WhatsApp handoff', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Click hero button to open appointment modal
    await page.locator('button:has-text("Request Consultation Slot")').first().click();

    // Verify modal opened
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal.locator('h2')).toContainText('Request Clinic Consultation');

    // Fill Web Enquiry Form
    await modal.locator('input[placeholder*="Rajesh Kumar"]').fill('Suresh Patel');
    await modal.locator('input[placeholder*="98260 12345"]').fill('9826099999');
    await modal.locator('button:has-text("7-Day Follow-Up")').click();

    // Submit Web Form
    await modal.locator('button[type="submit"]:has-text("Submit Appointment Enquiry")').click();

    // Verify confirmation view and Reference Token
    await expect(modal.locator('h3')).toContainText('Enquiry Dispatched Successfully');
    await expect(modal.locator('text=Reference Token: ENQ-')).toBeVisible();
    await expect(modal.locator('text=Send via WhatsApp for Instant Queue')).toBeVisible();

    // Close Modal
    await modal.locator('button:has-text("Close Window")').click();
    await expect(modal).not.toBeVisible();

    // Re-open and test Direct WhatsApp tab
    await page.locator('button:has-text("Book Visit")').first().click();
    await expect(modal).toBeVisible();
    await modal.locator('button:has-text("2. Direct WhatsApp")').click();
    await expect(modal.locator('text=Direct WhatsApp Appointment Request')).toBeVisible();
    const waLink = modal.locator('a:has-text("Open WhatsApp & Send Message")');
    await expect(waLink).toHaveAttribute('href', /wa\.me\/919826012345/);
  });

  test('Signature Theme Switcher updates document theme token dynamically', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Open Theme Switcher
    await page.locator('button[aria-label="Select signature theme"]').click();
    await expect(page.locator('text=SiteForge Theme Gallery')).toBeVisible();

    // Select Quiet Luxury Alabaster
    await page.locator('button:has-text("Quiet Luxury Alabaster")').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'quiet-luxury');

    // Select Deep Moss & Lemon Laser
    await page.locator('button[aria-label="Select signature theme"]').click();
    await page.locator('button:has-text("Deep Moss & Lemon Laser")').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'deep-moss');

    // Revert to Warm Editorial Tech
    await page.locator('button[aria-label="Select signature theme"]').click();
    await page.locator('button:has-text("Warm Editorial Tech")').click();
    const themeAttr = await page.locator('html').getAttribute('data-theme');
    expect(themeAttr === null || themeAttr === '').toBeTruthy();
  });

  test('Mobile viewport responsiveness and bottom action bar', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check sticky bottom mobile action bar
    await expect(page.locator('a:has-text("Call Clinic")').first()).toBeVisible();
    await expect(page.locator('a:has-text("WhatsApp")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Book Slot")').first()).toBeVisible();

    // Check mobile hamburger menu
    const menuBtn = page.locator('button[aria-label="Toggle navigation menu"]');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();
    await expect(page.locator('a:visible:has-text("Services & Fees")').first()).toBeVisible();
  });
});
