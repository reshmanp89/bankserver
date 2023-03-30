const jwt=require("jsonwebtoken")
 userDetails={//database name
    1000:{username:"anup",acno:1000,password:"123",balance:0,transactions:[]}, //object ,key is account number
    1001:{username:"amal",acno:1001,password:"123",balance:0,transactions:[]},
    1002:{username:"bipin",acno:1002,password:"123",balance:0,transactions:[]},
    1003:{username:"reshma",acno:1003,password:"123",balance:0,transactions:[]},
    1004:{username:"anusree",acno:1004,password:"123",balance:0,transactions:[]}
  }

 register=(acno,uname,psw)=>
{
  //var  userDetails=this.userDetails
  if(acno in userDetails)
  {
    return {
        staus:false,
        message:"user already present",
         statusCode:404
    }



  }
  else{
    userDetails[acno]={username:uname,acno,password:psw,balance:0,transactions:[]}
   // console.log(userDetails);
   // this.saveDetails()
    
   return {
    staus:true,
    message:"registered",
     statusCode:200
}

  }
}
login=(acno,psw)=>
{   //userDetails=this.userDetails
  if(acno in userDetails)
  {
    if(psw==userDetails[acno]["password"])
    {  //store current user
      currentUser=  userDetails[acno]["username"]
      currentAcno=acno
      //token create
      const token=jwt.sign({acno},"superkey123")
      //this.saveDetails()
      return {
        staus:true,
        message:"login success",
         statusCode:200,
         currentUser,
         currentAcno,
         token
    }
      
    }
    else
  {
    return {
        staus:false,
        message:"incorrect password",
         statusCode:404
    }
  }
   
  }
  
  else{
    return {
        staus:false,
        message:"not registerd yet",
         statusCode:404
    }
  }

}
deposit=(acno,psw,amnt)=>
{
   var amount=parseInt(amnt)//  to convert string amount to int
  // var  userDetails=this.userDetails
   if(acno in userDetails)
   {
    if(psw==userDetails[acno]["password"])
    {
      userDetails[acno]["balance"]+=amount
      //console.log(userDetails);
      //add transaction data
      userDetails[acno]["transactions"].push(
        {
          Type:"Credit",
          Amount:amnt
        }
      )
      //this.saveDetails()
      return {
        staus:true,
        message:`your ac has been credicted with amount ${amount}
        and the balance is ${ userDetails[acno]["balance"]}`,
         statusCode:200
         
        
      
    }
}
    else{
        return {
            staus:false,
            message:"incorrect password",
             statusCode:404
        }
    }

   }
   else{
    return {
        staus:false,
        message:"incorrect acno",
         statusCode:404
    }
   }
}
withdraw=(acno,psw,amnt)=>
{ 
  var amount=parseInt(amnt)
  //var userDetails=this.userDetails
  if(acno in userDetails)
  {
    if(psw==userDetails[acno]["password"])
    { 
      if(amount<=userDetails[acno]["balance"])
      {
        userDetails[acno]["balance"]-=amount
        console.log(userDetails);
        //add transaction details
        userDetails[acno]["transactions"].push(
          {
            Type:"Debit",
            Amount:amnt
          }
        )
        //this.saveDetails()
        //console.log(userDetails);
        
       // return userDetails[acno]["balance"]
       return {
        staus:true,
        message:`your ac has been debited with amount ${amount}
        and the balance is ${ userDetails[acno]["balance"]}`,
         statusCode:200
         
        
      
        
       }
      }
      else{
        //alert('insufficient balance')

        return {
            staus:false,
            message:"insufficient balance",
             statusCode:404
        }
      }

    }
    else{
        return {
            staus:false,
            message:"incorrect password",
             statusCode:404
        }
    }

  }
  else{
    return {
        staus:false,
        message:"incorrect acno",
         statusCode:404
    }
  }

}
getTransaction=(acno)=>
{
// return this.userDetails[acno].transactions
return{
    staus:true,
       transactions: userDetails[acno].transactions,
         statusCode:200

}
}


module.exports={  //expotorted into another file
    register,login,deposit,withdraw,getTransaction
}