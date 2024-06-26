class Transaction{
    amount: number;
    date: Date;
    constructor(amount: number){
        this.amount = amount;
        this.date = new Date();
    }
}

class Customer {
    name: string;
    id: number;
    transactions: Transaction[];
    constructor(name: string, id: number){
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
    addTransactions(amount: number){
        const transaction = new Transaction(amount);
        const result = this.transactions.push(transaction);
        return result > 0 ? true : false;
    }
    getBalance(){
        return this.transactions.reduce((total, transaction) => total + transaction.amount, 0)
    }
}

class Branch{
    name: string;
    customers: Customer[];
    constructor(name: string){
        this.name = name;
        this.customers = [];
    }
    getBranch(){
        return this.name;
    }
    getCustomers(){
        return this.customers;
    }
    addCustomer(customer:Customer){
        if(!this.customers.includes(customer)){
        const result = this.customers.push(customer);
        return result > 0 ? true : false;
        }
    }
    addCustomerTransaction(customerId: number, amount:number){
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
    name: string;
    branches: Branch[];
    constructor(name:string){
        this.name = name;
        this.branches = [];
    }
    
    addBranch(branch: Branch){
        if(!this.branches.includes(branch)){
            const result = this.branches.push(branch);
            return result > 0 ? true : false;
        }
    }
    addCustomer(branch: Branch, customer:Customer){
        if(this.branches.includes(branch)){
            const result = branch.addCustomer(customer);
            if (result){
                return true;
            } else {
                return false;
            }
        }
    }
    findBranchByName(branchName: string){
        return this.branches.find((branch)=> branch.name === branchName);
    }
    checkBranch(branch: Branch){
        return this.branches.includes(branch);
    }
    addCustomerTransaction(branch: Branch,customerId: number, amount:number){
        const targetBranch = this.findBranchByName(branch.name);
        if (targetBranch){
            targetBranch.addCustomerTransaction(customerId, amount);
            return true;
        } else {
            return false;
        }
    }
    listCustomers(branch :Branch, includeTransactions: Boolean){
        if (this.branches.includes(branch)){
            if (includeTransactions){
                console.log('Customers with their transaction details : ')
                return branch.customers;
            } else {
                branch.customers.map((customer,object)=> (object = {id: customer.id, name: customer.name}));
            }
        } else {
            console.log('Branch not founded');
        }
    } 
}
