# 🪐 Saturn FE Assignment – Meeting Summary Interface

This project is a web application that replicates a structured meeting summary interface. The goal was to translate a provided [Figma design](https://www.figma.com/design/CZFH9G1yvRZeL6EM1pMOi9/FE-dev-Assignment?node-id=0-1&t=Ab45nYCFSqDRSfrq-0) into a fully working frontend using ReactJS, Tailwind CSS, and Vite as the build tool, with a focus on interactivity and modular UI components.

![Watch Video Demo](https://github.com/ritiknagdeve/saturnweb/blob/main/Readme%20Frames/Saturn%20UI%20Demo.gif)

---

## How to Run This Project Locally

Follow these steps to get the project running on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/ritiknagdeve/saturnweb.git
cd saturnweb
```

### 2. Install Dependencies
Make sure you have Node.js (v18 or higher) installed.

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

---

## 🔗 Live Demo 👨🏻‍💻
Check out the live version of this project here: https://saturnweb-virid.vercel.app/

---

## What I Implemented

### 1. Layout Structure
- **Top Header:** Includes meeting title, back button, participant details, date, and tags.
- **Left Sidebar:** Shows the list of meeting overview sections for quick navigation.
- **Central Content Area:** Contains all meeting sections and points inside each. The points are draggable within and across sections.
- **Right Transcript Panel:** Opens up as a contextual panel to show transcript content based on selected sections.

![Layout Structure](https://github.com/ritiknagdeve/saturnweb/blob/main/Readme%20Frames/Saturn%20Main%20Page.png)

---

### 2. Drag and Drop of Summary List Items
- Summary Section are divided into blocks and subsections.
- Each point inside a section (called "facts") is a separate draggable component.
- Implemented drag-and-drop functionality to reorder facts inside the same section or move them to another.
- Used [Hello Pangea's DnD library](https://github.com/hello-pangea/dnd) for multi-section drag and drop functionality.

![Draggable Component](https://github.com/ritiknagdeve/saturnweb/blob/main/Readme%20Frames/DragnDrop.png)

---

### 3. Transcript Integration
- Clicking on a section loads corresponding transcript data into a sliding panel on the right.
- Transcript search bar included to filter through content.

![Transcript Integration](https://github.com/ritiknagdeve/saturnweb/blob/main/Readme%20Frames/Transcription.png)

---

### 4. Components Breakdown
The UI is broken down into modular components for scalability:
- `MeetingHeader`, `BackButton`, `MeetingTypeTag`, `DateDisplay` for the top section.
- `Sidebar`, `OverviewSectionList`, `OverviewSectionItem` for the side navigation.
- `MainSection`, `SectionBlock`, `SubSectionBlock`, and `FactItem` for meeting structure.
- `TranscriptionWrapper`, `TranscriptList`, `TranscriptSearchBar` for transcript handling.

![Component Breakdown](https://github.com/ritiknagdeve/saturnweb/blob/main/Readme%20Frames/VS%20Code%20SS.png)

---

## Folder Structure Highlights

```
src/
├── components/          # All UI components
├── context/             # Global context and state management
├── data/                # Sample data and content
├── assets/              # Images, icons, etc.
├── App.jsx              # Root app component
└── main.jsx             # Entry point
```

## Acknowledgment
Thanks to the Saturn team for this challenge, and to the creators of React, Tailwind CSS, and @hello-pangea.
