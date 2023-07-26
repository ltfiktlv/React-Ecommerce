After npx create-react app ; 
Screens: 
Index.js: Renders App.js 

App.js : It routes components and pass data to some of the child components also have cart functionality init. 

Home Screen: Fetched product data with axios and mapped the all data to send each data to Product.js component and render the data there to screen to show all products in database.User can add to cart from home screen by clicking “ADD TO CART” button. 

Product Screen: Fetched product by it’s id and showed the product’s name, image, description, price and stock information. User can also add to cart 1 product or more than 1 product by clicking “Add to Cart ” button. And also there is a go back button which navigates to homes page when clicking on that button. 

Cart Screen: It’s functionality comes from App.js, handleClick() is to add to cart functionality; if product exist only increase the number of it, if doesn’t exist add to cart by localStorage and set the quantity of it to 1. handleChange() is to increase or decrease the quantity of the product functionality, if it’s quantitity is 0 set to 1 and if + increase if - decrease. handleRemove() if user wants to remove the product from cart user can do it by clicking Remove button it simply filters the array. handlePrice() is to calculate price of the individual product and sum of all products.

Register Screen: If user doesn’t have an account, can create an account by entering name, email, password, confirm password. It checks if the paswords are same and also checks if email is already taken. Inside of the form tag with the help of the React hook of useState I assigned every field to them and post the data with axios to backend after submit with handleSubmit function, if user already logged-in can not see this page. If register is successful it redirects to login page. If it’s not successful it shows an alert on the top.

Login Screen: If user have an account, simply can enter email and password after entering data it is read by onChange event and assign it to the useState hooks. And post the entered data to backend to compara entered data with registered users, if user didn’t register before it warns the user, and if user wants to register, user can click to sign up text and it redirects it. If user successully logs-in, it will redirect to the homepage, if it fails it will warn the user based on the error(Invalid password or Invalid email and/or password).

User Profile Screen: With the help of the useEffect I fetched the data from backend with axios and assign it to useState, and filled the empty texts as user info, if user wants to change it’s name, email or password can do it very easily after entering currently used password. And also user can see it’s orders under the MY ORDERS tag again I fetched it with axios from backend orderRoutes. User can click on Details button if wants to see detailed version of it’s past order.

Shipping Address Screen: If user wants to continue to process to buy, firstly needs to enter address and contact number information.(City, District, Street, Postal Code, Detailed Address, Contact Number fields.) After getting all entered data with useState, I assigned all data to localStorage shipping Address and if all the fields are entered and clicked on continue it navigates to payment screen.

Payment Screen: User sees an overview of shipping address, order details and order summary(product price with shipping price) and after user is sure abot all of the info that user entered, select payment method and click on continue button, after that continue button will be disabled, order has been created with the isPaid is false and stripe API shows up which is a test credit card API with the Order ID on the top of it after entered the Card number MM/YY CVC and click on Pay button it will send a put request to backend to change the isPaid true. After it is successfully paid button will be changed to Check My Orders, if user clicks on that button it will redirect to user profile screen to see all past orders.

Order Detail Screen: User can see detailed order screen by clicking Details on user profile under the MY ORDERS tag. This page covers shipping address details, product details, and order summary.
It is fetched with axios get request to backend orderRoutes with passing order params.
Admin User List Screen: It is fetched from axios get request from backend userRoutes, it fetches all the registered user info such as name, id, email, isAdmin, created, updated times. Admin can remove a user with axios delete request by passing user id.

Admin Edit User Profile Screen: When admin clicks on Edit button it redirects to admin/user/edit/userId location, it fetches user information and fills the empty texts, Admin can set user’s name, email or admin status by entering admin password.

Admin Product List Screen: Admin can fetch all the products that has been created before with the help of axios get request to backend productRoutes, and takes product info such as product id, name, category, rating, reviews, price, stock, created at, updated at. If admin wants to delete a product, admin can simply click on delete button, it will fire handleDeleteProduct function and deletes it in a second.

Admin Edit Product Screen: It fetches data with the help of axios get reques to backend productRoutes and fulfills the empty texts with setting useState with the data comes from backend. If Admin wants to update the product, simply can rewrite desired info or select new image. After set the new info it will be submitted to backend productRoutes with axios put request.

Admin Create New Product Screen: When admin wants to add a new product, simply can click on Create a Product button and it redirects it to admin/create-product screen, after admin fills the name, category, price, stock info, image, description, admin needs to enter admin password to create a new product. And it will be send backend productRoutes with the help of axios post request.

Admin Order List Screen: Admin can see all the orders made by users, and see order id, user id, username, price, paid info, ordered at, delivered, and delivered at info. If admin sets an paid order to mark as delivered, it will send a put request to backend orderRoutes with axios and it will change the value of isPaid to true and a delivered time assignes after clicking on it. After clicking button it will be disabled(it will be disabled if order is not paid too).

Admin Order Details Screen: If admin wants to see detailed screen of ordered made by user, admin can click on Order Details button and it will redirect to order details screen with the shipping details(name,province etc.), order details(product), and order summary (product price, shipping price, total price).

Components:

Header component: It is a navbar that shows brand(if clicked redirects to main page), cart button and if user not logged in Login/Signup button, if user logged-in it will shows user name, if user clicks on it’s name it will dropdown and there will be two options; Profile and Logout. If admin logs-in and clicks on it’s name, admin will see Profile, User List, Product List, Order List and Logout with dropdown.

Rating Component:
This component made for assigning stars according to rate that user gives, if user gives 4.5 start it will fulfills 4.5 stars.

Footer Component:
It will have business name with copyright text.
In Public folder: There is an images folder with index.html
In backend/config folder there is an db.js file to import mongoose and set a function named connectDB. This will connect mongoose with MongoDB.
![resim_2023-07-27_005516012](https://github.com/ltfiktlv/React-CoffeeShop/assets/89079032/7a5b4849-ad7f-4398-ad62-07d4e3a4dc2b)
In backend/data folder there is startup dummy data as product.js and users.js.
In backend/models folder; there is 3 mongoose models file;
In backend/midllewareAuthorization: It is for authorization it checks if the user’s token is valid, and also it check is the user isAdmin.
![resim_2023-07-27_005546172](https://github.com/ltfiktlv/React-CoffeeShop/assets/89079032/26e94118-e878-47bc-9447-c028062633a0)
In backend/seeder: it is dummy file, at first I created it to push and delete data to test database.
In backend/server.js: it is the server file it listens to the port and activates the routes.
![resim_2023-07-27_005620977](https://github.com/ltfiktlv/React-CoffeeShop/assets/89079032/7e05ce58-a09e-4a3b-90e0-5302f0afc143)

1.userModel: it is an user model, first I created an user schema with name, email, password, and isAdmin and assign it to a model.

2.productModel: it is a product model with 2 schema. 1. reviewSchema with name, rating and comment of product object of objects. 2. productSchema with user.id(comes from userModel which admin created or updated this product), name, category, image, description, reviews, rating, numReviews,price, countInStock and defaultCartStock(the reason I created this to handle cart screen)
and assigned it to model

3.orderModel: it is an order model with user.id(which user ordered), orderedItems array(name, image,price,defaultCartStock, product), shippingAddress array(fullAddress,city,district,street, postalCode, contactNumber), paymentMethod, shippingPrice, itemsPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt and assigned it to mongoose.model.
In backend/routes folder there are 4 routes file. I created them to fill models and manipulate the data with what I want

1. userRoutes: I produced a token with JWT(JSON web tokens) to authorize users,
   router.post(“/login) : it takes email and password from request.body and search if it is in the database, if finds it with email match it compares with passwords if password is matches too it sends data back with the new produced token.
  router.post(“/register”): it takes name,email and password from user and searches if it is already exist in database, if it is exist in database it returns res.status(400)
if not, it will create a new user and set it’s simple password to bcrypt hash password to make the password stronger. After user created it will send data back with produced new token.
router.route(“/profile).get : It is protected with auth middleware because it is private page, it take req.user._id and sends data back.  
  router.route(“profile”).put : it is protected with auth middleware because it is private page, it updates the user with the requested data, if user changes it’s name, email or password with the correct entered currently used password, it sends data back with new set values.
  router.route(“/”).get: it is protected with auth middleware and also it is protected with isAdmin, it means user can not get the data if it is not admin, basically it sends all user list back.
  router.route(“/:id).delete: it is protected with token and isAdmin auth, it’s for deleting user
from database by an admin account.
  router.route(“/:id”).get : it is protected with token and isAdmin auth, it’s for fetching desired user data.
  router.route(“/:id”).put : it is protected with token and isAdmin auth, it’s for updating user data by an admin account.

2.productRoutes:
  router.get(“/”) : send all products in database.
  Router.get(“/:id): send desired product’s information
  Router.route(“/”).get : it is protected with token and isAdmin auth, it’s for fetching all products.
  Router.route(“/:id).delete : it is protected with token and isAdmin auth, it’s for deleting a specific product by an admin acc.
  Router.route(“/:id”).put : it is protected with token and isAdmin auth, it’s for updating a specific product’s information.
  Router.route(“/new-product”).post : it is protected with token and isAdmin auth, it’s for creating a new product.

3.orderRoutes:
  Router.route(“/”).post : it is protected with token auth, user can give an order with this route.
  Router.route(“/”).get : it is protected with token auth, user can see all the past orders that user made.
  Router.route(“/:id”).put : it is protected with token auth, when user pays successfully it sets isPaid to true.
  Router.route(“/myorders”).get: it is protected with token auth when user wants to see all past orders.
  Router.route(“/id”).get : it is protected token auth, user can see order details
  Router.route(“/deliver/:id”).put: it is protected with token and isAdmin auth, it’s for whenever the order is delivered it sets isDelivered to true.

4.uploadImagesRoutes:it is created for when admin wants a create new product or update a product’s image, this route helps to do that function with the help of npm multer.
uploadImages folder is for uploadImagesRoutes
