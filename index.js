class Transaction{
    constructor(amount){
        this.amount = amount;
        this.date = new Date();
    }
}

class Customer {
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.transactions = [];
    }

    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getTransactions(){
        return this.transactions;
    }
    addTransactions(amount){
        const transaction = new Transaction(amount);
        const result = this.transactions.push(transaction);
        return result > 0 ? true : false;
    }
    getBalance(){
        return this.transactions.reduce((total, transaction) => total + transaction.amount)
    }
}

class Branch{
    constructor(name){
        this.name = name;
        this.customers = [];
    }
    getBranch(){
        return this.name;
    }
    getCustomers(){
        return this.customers;
    }
    addCustomer(customer){
        if(!this.customers.includes(customer)){
        const result = this.customers.push(customer);
        return result > 0 ? true : false;
        }
    }
    addCustomerTransaction(customerId, amount){
        const customer = this.customers.find((customer)=> customer.id === customerId);
        if (customer){
            customer.addTransactions(amount);
            return true;
        } else {
            return false;
        }
    }
}

class Bank{
    constructor(name){
        this.name = name;
        this.branches = [];
    }
    
    addBranch(branch){
        if(!this.branches.includes(branch)){
            const result = this.branches.push(branch);
            return result > 0 ? true : false;
        }
    }
    addCustomer(branch, customer){
        if(this.branches.includes(branch)){
            const result = branch.addCustomer(customer);
            return result > 0 ? true : false;
        }
    }
    findBranchByName(branchName){
        return this.branches.find((branch)=> branch.name === branchName);
    }
    checkBranch(branch){
        return this.branches.includes(branch);
    }
    addCustomerTransaction(branch,customerId, amount){
        const targetBranch = this.findBranchByName(branch.name);
        if (targetBranch){
            targetBranch.addCustomerTransaction(customerId, amount);
            return true;
        } else {
            return false;
        }
    }
    listCustomers(branch, includeTransactions){
        if (this.branches.includes(branch)){
            if (includeTransactions){
                return branch.customers;
            } else {
                branch.customers.map((customer,object)=> (object = {id: customer.id, name: customer.name}));
            }
        } else {
            console.log('Branch not founded');
        }
    } 
}
