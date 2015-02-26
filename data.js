//

var Data = new function() {

	var self = this;

	var users;
	
	init();

	function init()
	{
		if(localStorage.getItem('data'))
		{
			users = JSON.parse(localStorage.getItem('data'));
			console.log('user retrieved from cache');
		}
		else
		{
			createDefaultUser();
			saveData();
			console.log('default user created');
		}
	}

	this.submitTransaction = function(userId, accountId, amount)
	{
		var user = users.get('userId', userId);
		if(user)
		{
			var account = user.accounts.get('accountId', accountId);
			if(account)
			{
				if(account.balance + amount >= 0)
				{
					account.balance += amount;
					recordTransaction(user, account, amount);
					saveData();
					return { success: true };
				}
				else
				{
					return { success: false, errormsg: 'Not enough money in account' };
				}
			}
			else
			{
				return { success: false, errormsg: 'Account does not exist' };
			}
		}
		else
		{
			return { success: false, errormsg: 'User does not exist' };
		}
	}

	this.submitTransfer = function(userId, accountIdFrom, accountIdTo, amount)
	{
		var user = users.get('userId', userId);
		if(user)
		{
			var accountFrom = user.accounts.get('accountId', accountIdFrom);
			var accountTo = user.accounts.get('accountId', accountIdTo);
			
			if(accountFrom && accountTo)
			{
				if(accountFrom.balance - amount >= 0)
				{
					accountFrom.balance -= amount;
					accountTo.balance += amount;
					
					recordTransaction(user, accountFrom, amount * -1);
					recordTransaction(user, accountTo, amount);
					
					saveData();
					return { success: true };
				}
			}
			else
			{
				return { success: false, errormsg: 'Accounts does not exist' };
			}
		}
		else
		{
			return { success: false, errormsg: 'User does not exist' };
		}
	}
	
	this.getUsers = function()
	{
		return users;
	}

	this.getAccounts = function(userId)
	{
		var user = users.get('userId', userId);
		if(user)
		{
			return { success: true, return: user.accounts };
		}
		else
		{
			return { success: false, errormsg: 'User does not exist' };
		}
	}
	
	this.resetData = function()
	{
		createDefaultUser();
		saveData();
	}
    
    this.checkPin = function(userId, pin)
    {
        var user = users.get('userId', userId);
        return user.pin == pin;
    }
	
	/* Private functions */
	
	function recordTransaction(user, account, amount)
	{
		var trans = {
			accountId: account.accountId,
			amount: amount,
			date: Date.now()
		};
		
		user.tansactions.push(trans);
	}
	
	function saveData()
	{
		localStorage.setItem('data', JSON.stringify(users));
	}
	
	function createDefaultUser()
	{
		users = [
			{
				userId: 1,
				pin: 1234,
				firstName: 'John',
				lastName: 'Tamminga',
				accounts: [
					{
						accountId: 1,
						name: 'Savings',
						balance: 1000000
					},
					{
						accountId: 2,
						name: 'Checkings',
						balance: 20000
					}
				],
				tansactions: [
					{ 
						accountId: 1,
						amount: 5000,
						date: 1424906745502
					},
					{
						accountId: 1,
						amount: 5000,
						date: 1424907002374
					}
				]
			}
		];
	}
};

Array.prototype.get = function(attr, val) {

	for(var i = 0; i < this.length; i++) {
		if(this[i][attr] === val) {
			return this[i];
		}
	}
}