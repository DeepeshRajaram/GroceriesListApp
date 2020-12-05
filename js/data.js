let userData = [
    {name:"user1", groceryList:['Fruits','Vegetables','Bread']},
    {name:"user2", groceryList:['Bread','Jam']},
    {name:"user3", groceryList:['Sugar','Salt','Oil', 'Rice','Cookies']}
];

localStorage.setItem("userData", JSON.stringify(userData));