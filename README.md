# Ulmo

# To deploy the project locally
1. Install docker for windows / linux (if necessary)
2. Run docker-compose up
3. Run npm install
4. Run node (nodemon) db/create_database.js
5. Run node (nodemon) index.js

---
# Routes

**Once running you can then browse to localhost:3000{route} to use the api**  
Below are the routes implemented in this project:

- /users/:id/products -> Fetch products bought by a given user (:id)
- /users/:id/balancePaid -> Fetch total amount spent by a user (:id)
- /users/balanceOver/:amount -> Fetch all users whose net balance is over a given amount (:amount)
- /users/:id/salary -> Fetch the salary records for a given user (:id) 
- /users/:id/balanceGained -> Fetch summed salary records for a given user (:id)
- /users/:id/netBalance -> Fetch the net balance of a given user (:id)

## Summary

Create a system for retrieving users and displaying information about:

- Products they have purchased
- Salary payments into their bank accounts
- Their current balance

All information is stored in a MySQL database, with tables detailed below. A user's current balance is the sum of their incoming salary payments, minus the sum of any purchases they have made. Take into account any discounts the user is entitled to when purchasing a give product.

The UserFactory should be able to retrieve individual users, all users and users matching a given predicate. For example, it should return users with balances over 100. The system handles thousands of active users.

Add any classes that you need, include unit tests, and make note of any suggested improvements to the database schema.

## Setup

Run "npm install" to install the required packages, and "npm test" to run the test suite.

## Tables

### USERS

Users are identified by a unique userId, along with their name and email address.

```
userId			VARCHAR(45)
userName		VARCHAR(45)
userEmail		VARCHAR(45)
```

#### Sample Reponse

```
(
	("abc123", "Brick", "brick@gmail.com"),
)
```

### PRODUCTS

Products are identified by a unique productId, along with their name and price.

```
productId		VARCHAR(45)
productName		VARCHAR(45)
productPrice	DOUBLE
```

#### Sample Reponse

```
(
	("def456", "Lamp", 10.0),
)
```

### TRANSACTIONS

Transactions record purchases made by a user, for a particular product. A transaction also records the time of the transaction.

```
transactionId	VARCHAR(45)
userId			VARCHAR(45)
productId		VARCHAR(45)
timestamp		DATETIME
```

#### Sample Reponse

```
(
	("ghi789", "abc123", "def456", "2011-12-18 13:17:17"),
)
```

### SALARIES

Salaries record money into a user's bank account at regular intervals.

```
userId			VARCHAR(45)
amount			DOUBLE
timestamp		DATETIME
```

#### Sample Reponse

```
(
	("abc123", 100, "2011-11-18 13:17:17"),
)
```

### DISCOUNTS

Some users are entitled to a percentage discount on certain products, which can be up to 100%.

```
userId			VARCHAR(45)
productId		VARCHAR(45)
percentage		DOUBLE
```

#### Sample Reponse

```
(
	("abc123", "def456", 25.0),
)
```

## Database API

The UserFactory class is instantiated with a databaseConnection object which has the following methods:

```
/**
 * Executes a query
 *
 * @param String 							queryString
 * @param (Error error, Obj[] rows) => {} 	callback
 */
query(queryString, callback)

/**
 * Executes a query with an array of input values
 *
 * @param String 							queryString
 * @param [][]								inputValues
 * @param (Error error, Obj[] rows) => {} 	callback
 */
query(queryString, inputValues, callback)
```
