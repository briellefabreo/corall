# CORAL — Community Online Reports and Alerts Link
**Target Community:** Municipality of Corcuera (Simara Island), Romblon, Philippines  
**Project Type:** Android-First Mobile Community Information and Monitoring Web/PWA Application  
**Primary Platform:** Mobile Web / Android PWA  

---

## 🌟 Overview

**CORAL** centralizes verified community announcements for residents of Corcuera, Romblon across three essential categories:
1. **Power Interruption Information** (TIELCO Corcuera Sub-Office)
2. **Sea Travel Status Information** (Philippine Coast Guard Sub-Station Corcuera)
3. **Disaster Advisories & Storm Preparedness** (Corcuera MDRRMO)

Residents can browse verified advisories freely without registering or logging in. Authorized administrators authenticate using designated role-based credentials to publish, edit, correct, or archive announcements with mandatory verification tracing.

---

## 🚀 How to Put This Project on GitHub (Step-by-Step for Students)

Follow these exact steps in your terminal or Command Prompt to push this repository to your GitHub account:

### Step 1: Create a New Repository on GitHub
1. Open your browser and go to: **[https://github.com/new](https://github.com/new)**
2. Enter your repository name (for example: `coral-corcuera-mobile`).
3. Set visibility to **Public** (or **Private** if you only want your groupmates to see).
4. **DO NOT** check "Add a README file" or "Add .gitignore" (we already have them here).
5. Click **Create repository**.
6. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/coral-corcuera-mobile.git`).

---

### Step 2: Initialize Git and Push from Your Computer
Open your terminal in the project folder and run these commands one by one:

```bash
# 1. Initialize local git repository
git init

# 2. Stage all project files (node_modules is automatically ignored)
git add .

# 3. Create your first commit
git commit -m "Initial release: CORAL Mobile App with animations, multi-language & PWA offline cache"

# 4. Set the default branch name to main
git branch -M main

# 5. Connect your local project to your GitHub repository
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual GitHub username and repository name!
git remote add origin https://github.com/YOUR_USERNAME/coral-corcuera-mobile.git

# 6. Push the code to GitHub
git push -u origin main
```

---

### Step 3: How to Edit the Code Directly on GitHub
If you need to make quick edits to the code after pushing to GitHub:
1. Go to your repository on GitHub (`https://github.com/YOUR_USERNAME/coral-corcuera-mobile`).
2. Press the **`.` (period/dot)** key on your keyboard.
3. This opens a full **web-based Visual Studio Code editor** directly inside your browser!
4. You can edit any files (like `src/data/seedData.ts` or `src/components/Header.tsx`), click the Source Control tab on the left, and commit your changes instantly.

---

### Step 4: How to Deploy Online for Free (For Your Panel and Defense)

To show this running on real Android phones during your thesis/capstone defense:

#### Option A: Vercel (Recommended — Takes 1 minute)
1. Go to **[https://vercel.com](https://vercel.com)** and log in with your GitHub account.
2. Click **Add New Project** and select your `coral-corcuera-mobile` repository.
3. Keep the default settings (Framework: Vite) and click **Deploy**.
4. In under 60 seconds, you will get a live URL (e.g., `https://coral-corcuera.vercel.app`).
5. Open this URL on your Android phone, tap "Install CORAL" or "Add to Home screen" to experience it as an installed Android app!

#### Option B: Netlify
1. Go to **[https://app.netlify.com](https://app.netlify.com)** and sign in with GitHub.
2. Import repository and set Build Command to `npm run build` and Publish Directory to `dist`.
3. Click **Deploy Site**.

---

## 🛠️ Code Customization Guide for Students

### 1. How to Change or Add Your Own Custom Logo
- Save your logo image as **`logo.png`** inside the **`/public/`** folder (`/public/logo.png`).
- In **`src/components/Header.tsx`** (line 98) and **`src/components/SplashScreen.tsx`** (line 74), change `src="/coral-icon.svg"` to `src="/logo.png"`.

### 2. How to Update Corcuera Emergency Contacts
- Open **`src/data/seedData.ts`** and scroll down to `INITIAL_EMERGENCY_CONTACTS`.
- You can directly update the telephone and cellphone numbers for MDRRMO, TIELCO, PCG Sub-station, BFP, and RHU.

### 3. How to Update or Add Seed Announcements
- Open **`src/data/seedData.ts`** and edit `INITIAL_ANNOUNCEMENTS`.
- Each advisory supports:
  - `category`: `'power' | 'sea_travel' | 'disaster'`
  - `status`: specific statuses like `trips_suspended`, `unscheduled_outage`, `blue_alert`
  - `coverImageUrl`: image banner URL
  - `source`: organization, issuance time, document reference, and publishing admin

---

## 🔐 Authorized Administrator Accounts (Offline Pre-configured)

For demonstrations and defense testing, authorized administrators can sign in using their role-specific username and PIN:

| Organization | Role / Department | Username | Secret PIN |
| :--- | :--- | :--- | :--- |
| **MDRRMO Corcuera** | Local Disaster Risk Reduction Officer | `mdrrmo_admin` | `Simara2026!` |
| **TIELCO** | Electric Cooperative Line Dispatcher | `tielco_corcuera` | `TielcoPower2026` |
| **PCG Sub-Station** | Coast Guard Maritime Liaison | `pcg_corcuera` | `CoastGuard@Simara` |
| **Student Developers** | Capstone Systems Administrator | `coral_dev` | `AdminCoral2026` |

*Note: For production municipal release, credentials should be integrated with an encrypted backend service.*

---

## 🌐 Multi-Language & Accessibility Support

CORAL supports three languages:
- **English** (Standard municipal advisory format)
- **Filipino / Tagalog** (Wikang pambansa)
- **Asi / Simaranhon** (Native mother tongue spoken in Corcuera, Romblon)

Accessibility features include:
- Adjustable Font Size (Regular 100%, Large 115%, Extra Large 130%)
- High Contrast Display Mode (for bright sunlight on boats and piers)
- Web Audio API notification alerts and vibration haptic feedback
- Reduced motion toggle for smoother performance on budget Android devices
- PWA offline caching for internet outages on the island
