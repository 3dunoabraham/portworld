# Inventory Management System Front-End
This repository contains the front-end for Abraham Duno's Portfolio. This NextJs app provides a web-based user interface for managing an inventory of projects for different categories.

## Tech Stack
* This project uses the following technologies:
    * [Next.js](https://nextjs.org/)
    * [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)



## Getting Started
To get started with the project, first install the required dependencies:
```bash
npm install
```


Then run the development server:
```bash
npm run dev
```
Alternatively, you can run the server using https:
```bash
node server.js
```


Finally, run the test suite:
```bash
npm run test
```
You can view the app by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.
### Demo
Check out a live demo of the project at [portworld.vercel.app (demo)](https://portworld.vercel.app/) (dev)



## Project Structure
- public/
- scripts/
- src/
    - items/
        - 3d/
        - atoms/
        - ims/
        - molecules/
        - organisms/
    - pages/
        - api/
            - auth/
                - [...nextAuth].js
            - crud.ts
            - generator.ts
            - users.ts
        - config/
            - [key].tsx
            - local.tsx
        - test/
            - inventory.tsx
        - unit/
            - [id].tsx
            - add.tsx
        - _app.tsx
        - _documents.tsx
        - agreements.tsx
        - index.tsx
        - inventory.tsx
        - users.tsx
    - partials/
        - ims
            - FilterSidebar.tsx
            - FooterLayout.tsx
            - ImsCard.tsx
            - SessionSidebar.tsx
            - SidebarContainer.tsx
            - SidebarHeader.tsx
        - index
            - Landing.tsx
        - inventory
            - EmptyInventory.tsx
            - ExportCsv.tsx
            - InventoryPage.tsx
            - InventoryTable.tsx
            - LoadingInventory.tsx
        - unit
            - BottomForm.tsx
            - BottomSectionInputModule.tsx
            - BottomSectionOutputModule.tsx
            - DocumentsCRUD.tsx
            - LogsCRUD.tsx
            - MainForm.tsx
            - MainFormInputSelect.tsx
            - ModalsSection.tsx
            - NotesCRUD.tsx
            - SalesStatusBadge.tsx
            - SalesStatusBadgePlus.tsx
            - SaveEditButtonLoadings.tsx
            - SuccessBlock.tsx
            - TopForm.tsx
            - TopSummary.tsx
            - UnitAddComponent.tsx
            - UnitPageComponent.tsx
            - UnitViewEdit.tsx
    - middleware.ts
- styles/
- localJson.json
- package.json
- server.js
- StarJSON.js



## SRC/ITEMS/
```text      
    items/
    ├── 3d/
    │   ├── BoxContainer.tsx
    │   ├── CameraControl.tsx
    │   ├── CustomBox.tsx
    │   ├── CustomHorizontalWall.tsx
    │   ├── CustomHorizontalWallDoor.tsx
    │   ├── CustomLight.tsx
    │   ├── CustomPillars.tsx
    │   ├── CustomWall.tsx
    │   ├── FieldFloorScale.tsx
    │   ├── HumanScale.tsx
    │   ├── JSONShape.tsx
    │   ├── RoofContainer.tsx
    │   └── ShapeContainer.tsx
    ├── atoms/
    │   ├── AppClientDesc.tsx
    │   ├── AppServerDesc.tsx
    │   ├── BreadCrumbs.tsx
    │   ├── ErrorBlock.tsx
    │   ├── FailedRequest.tsx
    │   ├── FeetAndInches.tsx
    │   ├── FileJustUploaded.tsx
    │   ├── LoadingPill.tsx
    │   ├── LoginBtn.tsx
    │   ├── PagePlaceholder.tsx
    │   ├── PostButton.tsx
    │   ├── Providers.tsx
    │   ├── SectionPlaceholder.tsx
    │   └── user-information.tsx
    ├── inputs/
    │   ├── InputColor.tsx
    │   ├── InputDate.tsx
    │   ├── InputFile.tsx
    │   ├── InputImage.tsx
    │   ├── InputItemsPP.tsx
    │   ├── InputNEnum.tsx
    │   ├── InputSelect.tsx
    │   ├── InputText.tsx
    │   ├── OInputNImages.tsx
    │   ├── OInputNImagesJustUploaded.tsx
    │   ├── OInputNMeasure.tsx
    │   └── OInputRadioSelect.tsx
    ├── molecules/
    │   ├── AlertContainer.tsx
    │   ├── AlertNotification.tsx
    │   ├── APICrudForm.tsx
    │   ├── BrowserCRUDButtons.tsx
    │   ├── BrowserCRUDContainer.tsx
    │   ├── ImageSlider.tsx
    │   ├── ItemsPerPage.tsx
    │   ├── StandardModal.tsx
    │   ├── StandardTable.tsx
    │   ├── StandardTablePagination.tsx
    │   ├── StandardTableRest.tsx
    │   └── UserModule.tsx
    └── organisms/
        ├── JSONCrud.tsx
        ├── JSONCrudForm.tsx
        ├── LocalStorageCRUD.tsx
        ├── SidebarFilterButton.tsx
        ├── SidebarFilterSection.tsx
        ├── SidebarFilterToolbar.tsx
        └──  SliderCarousel.tsx
```