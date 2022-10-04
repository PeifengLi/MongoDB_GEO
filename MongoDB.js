// select database
db = db.getSiblingDB("instacart");
use instacart;

// create a collection
db.createCollection("customers");

// add a document
db.customers.insert({first_name:"John", last_name:"Doe"});

// show data
db.customers.find();

// add multiple documents
db.customers.insert([{first_name:"Jack", last_name:"Contractor"},{first_name:"Samanta", last_name:"Boro", age:35}]);

// update document
db.customers.update({first_name:"John"},{first_name:"John", last_name:"Doe", age:42});

// update document with a new attribute
db.customers.update({first_name:"Jack"},{$set:{gender:"male"}});

// update incrementally
db.customers.update({first_name:"John"},{$inc:{age:5}});

// The $unset is an attribute update operator that completely removes a particular field from a document
db.customers.update({first_name:"Samanta"},{$unset:{age:1}});

// upsert is a combination of update and insert
db.customers.update({first_name:"Mary"},{first_name:"Mary", last_name:"Black", age:22},{upsert:true});

// rename an attribute
db.customers.update({first_name:"Jack"},{$rename:{"gender":"sex"}});;

// remove one or more documents
db.customers.remove({first_name:"Jack"});

// remove just one document
db.customers.remove({first_name:"John"},{justone:true});

// add nested documents
db.customers.insert({
	first_name:"Sharon",
	last_name: "Thompson",
	gender:"female",
	age:35,
	memberships: ["mem1","mem2"],
	address:{
		strret:"4 main st",
		city:"Boston",
		state:"NJ"},
	contacts:[
		{name:"Brad", relationship:"friend"},
		{name:"Samanta", relationship:"girlfriend"}]
});

db.customers.insert({
	first_name:"George",
	last_name: "Foreman",
	gender:"male",
	age:65,
	memberships: ["mem1","mem2"],
	address:{
		strret:"4 main st",
		city:"New York",
		state:"NY"},
	contacts:[
		{name:"Ali", relationship:"no-friend"},
		{name:"Frazer", relationship:"bithim"}]
});

// search by filter
db.customers.find({first_name:"Sharon"});

// search by filter and logical operators
db.customers.find({$or:[{first_name:"Sharon"},{first_name:"Mary"}]}).pretty();

// search by filter and numerical operator
db.customers.find({age:{$lt:40}}).pretty();

// search a nested document
db.customers.find({"address.city":"Boston"}).pretty();

// search a document by attribute with multiple values
db.customers.find({memberships:"mem1"}).pretty();

// sort documents ascendingly
db.customers.find().sort({last_name:1}).pretty();

// sort documents descendingly
db.customers.find().sort({last_name:-1}).pretty();

// count documents
db.customers.find().count();

// search + count
db.customers.find({gender:"male"}).count();

// documents resultset limit
db.customers.find().limit(2).pretty();

// search by loop
db.customers.find().forEach(function(doc){print("Customer Name: "+doc.first_name)});

// drop collection
db.customers.drop();

// add user
db.createUser({
	user:"brad",
	pwd:"1234",
	roles:["readWrite","dbAdmin"]
})

// drop user
db.dropUser("brad", {w: "majority", wtimeout: 5000})

