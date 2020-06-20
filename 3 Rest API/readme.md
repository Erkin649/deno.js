### After downloading this folder install Deno to local machine
For windows With Shell:

`curl -fsSL https://deno.land/x/install/install.sh | sh`

### Then run this application by 

`deno run --allow-net server.ts`

### To check requests open your Postman and test this requests

`/api/v1/products` to get all products

`/api/v1/products/:id` to get single product by id

`/api/v1/products` add product by degenrating id with uuid v4

`/api/v1/products/:id` to update product 

`/api/v1/products/:id` to remove product
