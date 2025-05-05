# Online Store Catalogue – Requirements

## Functional Requirements

1. **Product Display**  
   Users must be able to view a list of products with images, names, and prices.

2. **Category Filtering**  
   Users can filter the displayed products by selecting a category (Electronics, Clothing, Books).

3. **Static Product Data**  
   Products are hardcoded into the HTML and displayed on page load without needing a backend.

4. **Responsive Layout**  
   The product grid adjusts automatically based on the screen size (desktop, tablet, mobile).

---

## Non-Functional Requirements

1. **Usability**  
   - Simple and user-friendly interface.  
   - Filtering is immediate, intuitive, and does not reload the page.

2. **Performance**  
   - All interactions (like filtering) happen client-side using JavaScript.  
   - Lightweight placeholder images ensure fast loading.

3. **Compatibility**  
   - Works in all modern web browsers (HTML5, CSS3, Vanilla JavaScript).  
   - Mobile and desktop responsive design.

4. **Maintainability**  
   - Clean code separation: HTML (structure), CSS (style), JS (behavior).  
   - Easy to extend by adding new products or categories.

5. **Basic Accessibility**  
   - Semantic tags (`<header>`, `<label>`, etc.) used.  
   - `alt` text provided for all images.
