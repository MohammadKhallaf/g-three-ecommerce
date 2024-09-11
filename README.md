# Session 11 Sept.

## Create React App -> CRA
1. `npx create-react-app ecommerce`
2. `cd ecommerce` only in react app creation
3. `npm start`

## Install Bootstrap
1. `npm install react-bootstrap bootstrap`
2. `import 'bootstrap/dist/css/bootstrap.min.css';` in `index.js` or `App.js`
3. `import { Button } from 'react-bootstrap';`

## Install React Router Dom




## Split components to separate files
- **components** folder
  - ProductCard
- **pages** folder
  - ProductsGallery

## Navigation to the page --> React Router Dom
- Wrap the App within `<BrowserRouter>`
- 


## Component from external library --> styling bootstrap component
as={Ext.Co}

## How to access local storage
- window.localStorage => localStorage
-  read <- `localStorage.getItem("key")`
-  write <- `localStorage.setItem("key",value)`
-  Note -> item @ save | read --> string
-  JSON.strigify() <- from JS to string
-  JSON.parse() -> from string to JS
-  

## lifecycle
```jsx
useEffect(()=>{ //==>

},[])
```

## Notes
- How to check if bootstrap is installed
  - `package.json` -> look for `bootstrap` & `react-bootstrap`
- all imports should be at the top of the file

## Task 
- Cart
  - add to cart
  - remove from cart
- wishlist
  - add and remove 
  - protected
- navbar -> cart & wishlist counters

## Projects 
- Electronics -> categories
- MealMaster -> filters-> Recipe (plan) -> cart (list of products for recipes)
- Book store -> categories -> cart , wishlist
- Restaurant -> meals -> categories, offers -> cart
- Clothes 
- .. 
- Cars
- Admin Dashboard <-
- TaskFlow -> to do list -> trello
  - roles 
  - -> admins assign tasks
  - -> employees do and finish task
- E-learning
