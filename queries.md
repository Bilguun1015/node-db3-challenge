# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.
    SELECT p.ProductName, c.CategoryName
    FROM [Products] as p
    join Categories as c 
    on p.categoryId = c.categoryId;
### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.
    SELECT o.OrderID, s.ShipperName
    FROM [Orders] as o
    JOIN Shippers as s
    on o.ShipperID = s.ShipperID
    where OrderDate < '1997-01-09';

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.
    SELECT p.ProductName, od.Quantity
    FROM [Products] as p
    JOIN OrderDetails as od
    on p.ProductID = od.ProductID
    where od.OrderID = 10251

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.
    SELECT o.OrderID, c.CustomerName, e.LastName as EmployeeLastName
    FROM [Orders] as o
    JOIN Customers as c on o.CustomerID = c.CustomerID
    JOIN Employees as e on o.employeeID = e.employeeID

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.
    SELECT CategoryName, count(productID) as [Count] 
    FROM [Products] as p
    join categories as c 
    on p.CategoryID = c.CategoryID
    group by CategoryName

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 
    SELECT OrderID, count(quantity) as ItemCount
    FROM [OrderDetails]
    group by OrderID
    order by ItemCount desc
