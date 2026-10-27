---
name: Barberous
description: Minimal luxury barbershop showcase in a dark editorial style.
colors:
  background: "#0b0b0b"
  foreground: "#f5f5f2"
  surface: "#121212"
  muted: "#ababaa"
  rule: "#343434"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(44px, 5.4vw, 72px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  arabic:
    fontFamily: "Noto Sans Arabic, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  none: "0px"
spacing:
  shell: "clamp(24px, 5vw, 80px)"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    typography: "12px Manrope, Arial, sans-serif; weight 600"
    rounded: "{rounded.none}"
    padding: "14px 22px"
    height: "52px"
---

# Design System: Barberous

## Overview

**Creative North Star: “The Editorial Barber Shop”**

Barberous presents a minimal luxury identity through a near-black canvas, off-white typography, restrained rules, and prominent real haircut photography. Its approved editorial split hero gives the brand and booking action room to breathe while making the work the visual focus. The site is a showcase for the shop and its people; service listings support discovery and route questions to WhatsApp.

The same system supports English and Arabic. Arabic switches the page to right-to-left flow, uses Noto Sans Arabic, and applies logical spacing and alignment so the composition remains coherent.

**Key Characteristics:**
- Minimal black-and-white palette with tonal depth.
- Strong type paired with large, square-edged imagery.
- Editorial asymmetry and quiet dividers.
- WhatsApp booking through in-page actions.

## Colors

The palette is predominantly neutral: off-white carries text and primary actions against near-black, while a slightly raised charcoal surface and muted gray support hierarchy.

### Primary
- **Off-white**: Main text and light booking buttons; buttons use near-black text.

### Neutral
- **Near-black**: Main page background.
- **Charcoal surface**: Barber profile section and image backing.
- **Muted gray**: Supporting copy, captions, and secondary labels.
- **Dark rule**: Borders, separators, and section divisions.

## Typography

**Display Font:** Manrope (Arial, sans-serif fallback)  
**Body Font:** Manrope (Arial, sans-serif fallback)  
**Arabic Font:** Noto Sans Arabic (Arial, sans-serif fallback)

**Character:** Manrope supplies compact, confident English headlines and clear supporting text. Arabic uses a locally bundled Noto Sans Arabic face with right-to-left direction.

### Hierarchy
- **Display** (800 first line, 400 second line, responsive 44–72px, line-height 1.04): Uppercase two-line English hero, with the lighter second line aligned to the far edge. Arabic retains its natural case and looser line height.
- **Headline** (600, responsive 24–34px): Section headings.
- **Title** (600, 20–24px): Service and barber names.
- **Body** (400, 15px, line-height 1.7): Main copy; paragraphs are kept to a readable measure.
- **Label** (400–600, 9–12px): Navigation, captions, actions, and metadata; labels remain restrained.

## Layout

The desktop page uses a centered shell capped at 1180px, with responsive outer gutters. A compact 96px header leads into a 550px two-column editorial hero, with tightly cropped haircut photography. Services use ruled horizontal rows: service, description, and action. The four-column gallery places tall images in columns one and three, with paired smaller images in columns two and four. The barber section pairs biographies and a portrait capped at 430px; visit details use three columns. A high-contrast off-white closing panel contains a dark booking button. Instagram appears below the hero action and in contact details.

At 1050px, spacing and type tighten. At 760px and below, the hero stacks, service descriptions sit below their names, visit details become single-column, and the gallery becomes two columns with alternating vertical offsets. Booking stays within the page; no fixed bar covers the mobile viewport. In RTL mode, direction-sensitive spacing and placement use logical properties; the phone number and Instagram handle remain left-to-right.

## Elevation & Depth

Depth comes from tonal layering, photography, and fine dividers rather than card shadows. The profile area uses the charcoal surface against the near-black page.

## Shapes

The interface uses square corners and crisp rectangular imagery; no rounded card language is present. Thin rules divide sections and service entries. Desktop gallery images alternate between tall and compact crops; mobile images maintain a 3:4 ratio, while the owner portrait stays 4:5.

## Components

### Booking buttons
- **Shape:** Square corners (0px radius).
- **Primary:** Off-white fill, near-black text, compact label typography, and a directional icon.
- **Hover:** Light gray background; color and background transition over 0.2 seconds.
- **Destination:** Booking actions open the shop’s WhatsApp conversation.

### Navigation
Desktop navigation is a quiet inline row. Hover adds an underline offset below the label. On mobile, desktop links are replaced by a menu toggle and a stacked, ruled navigation list. The Arabic switch updates language and RTL direction.

### Gallery
Images are edge-to-edge rectangles in an asymmetric grid. They are grayscale at rest and reveal their original color on hover. Captions sit below each image in muted, small text.

### Mobile booking
Booking actions remain within the hero, mobile menu, services, and contact section. No fixed booking bar or reserved bottom space.

## Do's and Don'ts

### Do:
- **Do** keep the palette neutral and the photography prominent.
- **Do** preserve square image edges, restrained dividers, and generous spacing.
- **Do** keep booking actions connected to WhatsApp.
- **Do** maintain the stacked mobile hero, two-column gallery, in-page booking actions, and RTL support.

### Don't:
- **Don't** add service prices; the established showcase lists services without prices.
- **Don't** introduce rounded-card styling or decorative color accents that conflict with the restrained monochrome system.
