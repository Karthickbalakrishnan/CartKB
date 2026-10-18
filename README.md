# CartKB
Smart Shopping & AR Store Navigation

## Overview
CartKB is a mobile-first smart shopping prototype designed to improve the in-store retail experience. The application helps users discover nearby stores, compare product prices, build shopping lists, locate products inside the store using AR-inspired aisle guidance, and complete a quick scan-and-pay checkout flow.

This project represents a concept-level retail solution focused on convenience, price transparency, and navigation efficiency for customers.

## Reviewer-Focused Requirement Summary

### Problem Statement
Customers often spend significant time searching for products, comparing prices across stores, and navigating large retail spaces. A better shopping experience should reduce this effort by combining store discovery, product search, list management, and guided in-store navigation in a single interface.

### Core Functional Requirement
The system should provide a smart shopping experience that allows users to:
- Find nearby stores using location-aware discovery
- Search and compare products across multiple stores
- Add products to a shopping list
- Navigate to products inside the store using AR-style directional guidance
- Complete a quick checkout using scan-and-pay functionality
- Use a mobile-friendly, bilingual or multilingual interface

### Expected User Journey
1. User opens the app and sees nearby stores around their current location.
2. User selects a store and enters a pre-ride or in-store shopping mode.
3. User searches for products and compares prices before visiting the store.
4. User creates or updates a shopping list.
5. User follows AR navigation to locate items inside the shop.
6. User scans items and pays using a quick UPI-style payment flow.

## Features Implemented
- Nearby verified store cards with distance and stock information
- Product search and price comparison
- Department/category filtering
- Shopping list creation and management
- AR-style navigation screen with target item guidance
- Scan-and-pay flow for express checkout
- Digital exit QR pass after payment
- Multi-language UI (English, Tamil, Hindi)
- Responsive mobile app layout

## Project Scope and Status
This repository is a front-end prototype/demo of the smart shopping experience. It uses simulated store data, mock product catalogs, and UI-driven interactions to demonstrate the concept.

It is intended for:
- Proof-of-concept evaluation
- Reviewer demonstration
- UX and feature validation
- Future extension into a real backend-integrated system

It is not a production-ready retail platform and does not yet include full backend integration, real-time inventory sync, or live payment processing.

## Technology Stack
- HTML
- Tailwind CSS
- JavaScript
- Font Awesome Icons
- Google Fonts

## File Structure
- `index.html` — main application interface and interaction logic
- `README.md` — project overview and reviewer documentation

## How to Run
Open `index.html` directly in a browser, or serve the project locally:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Reviewer Notes
This project highlights a complete customer-facing shopping workflow in a single prototype experience. The key value is the combination of store discovery, product matching, list generation, guided in-store navigation, and seamless checkout simulation.

## Future Enhancements
- Integration with real store and product APIs
- Real GPS and map navigation
- Live inventory management
- Real-time price comparison and promotions
- Barcode/QR scanning with backend validation
- Secure payment gateway integration
- Admin dashboard for store and catalog management

## Conclusion
CartKB demonstrates a concept for a smarter, faster, and more guided shopping experience. It is suitable for review and concept validation as a retail innovation prototype focused on convenience, efficiency, and customer experience.
